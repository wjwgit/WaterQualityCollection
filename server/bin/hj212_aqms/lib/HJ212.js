const net = require('net');
const Event = require('events');
const moment = require('moment');
const utils = require('./utils');
const ver2017 = require('./ver2017');
const Codes = require('../columnCodes.json');

var FsmR1 = require('./fsm');
const ReqCodes = require('./RequestCode.json');

class HJ212_2017_Client extends Event {
    constructor(ip, port, st, mn, pw, crc, polls, conns) {
        super();
        this.IP = ip;
        this.Port = port;
        this.ST = st;
        this.MN = mn;
        this.PW = pw;
        this.CRC = crc || false;
        this.OverTime = 5;  //超时
        this.ReCount = 3;//重传次数
        this.Pollutants = polls;// 发送的污染因子列表
        this.C_Sessions = {}; //客户端发起的会话
        this.S_Sessions = {};   //服务端发起的会话
        this.recvbuff = ""; //接收缓冲区
        this.S_CN = ['1000', '1011', '1012', '3011', '3013', '2041', '2051', '2061'];//支持的命令

        this.MysqlConn = conns;

        this.Client = new net.Socket();
        this.Client.on('error', () => {
            console.log("网络错误: " + this.IP + " : " + this.Port);
        });
        this.Client.on('data', (data) => {
            this.recvbuff += data;
            this.parseBuf();
        });
        this.Client.on('end', () => {
            console.log('服务端断开连接: ' + this.IP + " : " + this.Port);
        });
        this.Client.on('close', () => {
            //清理
            console.log('连接已关闭: ' + this.IP + " : " + this.Port);
        });
    }

    start() {
        this.Client.connect(this.Port, this.IP);
    }
    /**
     * 连接的状态
     */
    currentState() {
        if (this.Client == null || this.Client.connecting) {
            return false;
        }
        if (this.Client != null && !this.Client.destroyed) {
            return true;
        }
    }

    parseBuf() {
        let buffs = this.recvbuff.split('\n');
        for (let i = 0; i < buffs.length; i++) {
            if (buffs[i].indexOf('\r') > 0) {
                buffs[i] += '\n';
                if (this.CRC & utils.checkCrc16(buffs[i]) ^ !this.CRC) {
                    //解析
                    var r = ver2017.recv(buffs[i]);
                    r.parsePkg();
                    if (r.ST == '91') {
                        this.emit("response", r);
                    } else {
                        this.request(r);
                    }
                }
            } else {
                if (i == buffs.length - 1) {
                    this.recvbuff = buffs[i];
                }
            }
        }
    }

    request(req) {
        // 通知命令
        if (ReqCodes[req.CN].Type == "N2") {
            this.Notice2CMD_Host2Client(req);
        }
        else {
            this.RequestCMD(req);
        }
    }

    /**
     * 请求命令
     * 上位机发起
     */
    RequestCMD(req, callback) {
        if (req.Flag & 1) {
            let fsm = new FsmR1(req, this.Client, this.MysqlConn, this);
            fsm.start();
            this.S_Sessions[req.QN] = fsm;
        }
    }
    /**
     * 上传命令
     * @param {string} cn cn命令
     * @param {int} flag 是否应答
     * @param {object} vals mysql查询结果，行-->object
     */
    UpLoadCMD(cn, flag, vals) {
        let qn = moment().format('YYYYMMDDhhmmssSSS');
        let hj = ver2017.send(qn, this.ST, this.MN, this.PW, this.ReCount);
        if (cn == '2011') {
            hj.cp_C14(this.Pollutants, vals);
        }
        else {
            hj.cp_C161718(this.Pollutants, vals);
        }
        hj.pkg(cn, flag);
        this.Client.write(hj.PKG);
        if (flag == 5) {
            this.C_Sessions[qn] = hj;
        }
    }
    /**
     * 通知命令
     * 下位机 -通知-> 上位机
     */
    Notice1CMD_Client2Host() {

    }

    /**
     * 通知命令
     * 上位机 -通知-> 下位机
     */
    Notice2CMD_Host2Client(n2) {
        if (n2.Flag == 5) {
            let s = ver2017.send(n2.QN, "91", n2.MN, n2.PW, 0);
            s.pkg(9013, 4);
            this.Client.write(s.PKG);
        }
    }

    //
    // 管理上述四个命令执行流程
    // 利用 QN 管理
    // 每次通讯 QN 均不同
    //
    /**
     * 报送实时数据
     * @param {实时数据周期} T 
     */
    upload_rtd(t, T) {
        let s = t.subtract(1, 'm').second();
        if (s % T == 0) {
            let sql = "SELECT * FROM 实时数据a WHERE CYTIME = ?;"
            let a = t.subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');
            if (this.MysqlConn != undefined) {
                this.MysqlConn.query(sql, [a], (error, results, fields) => {
                    if (error) return;
                    if (results.length != 0) {
                        this.UpLoadCMD('2011', 4, results[0]);
                    }
                });
            }
        }
    }
    /**
     * 报送分钟数据
     */
    upload_md() {
        let sql = "SELECT * FROM 分钟数据a WHERE 时间 = ?;"
        let t = moment().subtract(2, 'm').format('YYYY-MM-DD HH:mm:00'); // 当前时刻，报送2分钟前的数据
        if (this.MysqlConn != undefined) {
            this.MysqlConn.query(sql, [t], (error, results, fields) => {
                if (error) return;
                if (results.length != 0) {
                    this.UpLoadCMD('2051', 4, results[0]);
                }
            });
        }
    }
    /**
     * 报送小时数据，如果是零点，同时将日数据上报
     */
    upload_hd() {
        // 报送小时数据
        if (moment().minute() < 30) {
            let sql = "SELECT * FROM 小时数据a WHERE 时间 = ?;"
            let t = moment().format('YYYY-MM-DD HH:00:00');
            if (this.MysqlConn != undefined) {
                this.MysqlConn.query(sql, [t], (error, results, fields) => {
                    if (error) return;
                    if (results.length != 0) {
                        this.UpLoadCMD('2061', 4, results[0]);
                    }
                });
            }
        }
        // 报送日数据
        if (moment().hour() == 0 && moment().minute() >= 30) {
            let sql = "SELECT * FROM 日数据a WHERE 时间 = ?;"
            let t = moment().format('YYYY-MM-DD 00:00:00');
            if (this.MysqlConn != undefined) {
                this.MysqlConn.query(sql, [t], (error, results, fields) => {
                    if (error) return;
                    if (results.length != 0) {
                        this.UpLoadCMD('2031', 4, results[0]);
                    }
                });
            }
        }
    }
    /**
     * 报送指定时间段内的分钟数据
     * @param {Date} begin 
     * @param {Date} end 
     */
    upload_mds(begin, end) {
        let sql = "SELECT * FROM 分钟数据a WHERE 时间 > ? and 时间 < ?;"
        let a = moment(begin).format('YYYY-MM-DD HH:mm:ss');
        let b = moment(end).format('YYYY-MM-DD HH:mm:ss');
        if (this.MysqlConn != undefined) {
            this.MysqlConn.query(sql, [a, b], (error, results, fields) => {
                if (error) return;
                results.forEach(r => {
                    this.UpLoadCMD('2051', 4, r);
                });
            });
        }
    }
    /**
     * 报送指定时间段内的小时数据
     * @param {Date} begin 
     * @param {Date} end 
     */
    upload_hds(begin, end) {
        let sql = "SELECT * FROM 小时数据a WHERE 时间 > ? and 时间 < ?;"
        let a = moment(begin).format('YYYY-MM-DD HH:mm:00');
        let b = moment(end).format('YYYY-MM-DD HH:mm:00');
        if (this.MysqlConn != undefined) {
            this.MysqlConn.query(sql, [a, b], (error, results, fields) => {
                if (error) return;
                results.forEach(r => {
                    this.UpLoadCMD('2061', 4, r);
                });
            });
        }
    }
}

module.exports = HJ212_2017_Client;


