const EventEmitter = require('events');
const QnRtn = require('./QnRtn.json');
const ExeRtn = require('./ExeRtn.json');
const ver2017 = require('./ver2017');
const ver2017fun = require('./ver2017fun');

/**
 * lsm:有限状态机
 */
const insertReq = "INSERT INTO remoterequest \
    (RecvTime, MN, QN, CN, QnRtn, ExeRtn, IPPort, Args, ExeResult)\
    VALUES (?,?,?,?,?,?,?,?,?);";
const queryExeRtn = "SELECT RecvTime,ExeRtn, ExeResult FROM remoterequest WHERE QN = ? AND ExeRtn IS NOT null;"
class Lsm_R1 extends EventEmitter {
    constructor(request, client, conn, dev) {
        super();
        //状态机状态
        this._END = 0; //结束
        this._REQ = 1;  //请求
        this._QNRTN = 2;    //
        this._EXE = 3;  //执行完成
        this._EXERTN = 4;
        this.state = this._END;
        //现场机应答及其执行结果
        this.qnrtn = 0;// 用于记录应答结果
        this.exertn = 0;//用于记录执行结果

        this.TimeOut = 15;
        this.Times = 0;
        this.Dev = dev;
        this.cnfun = ver2017fun.createCN(this,conn);
        if (request.ACK == 1) {
            this.state = this._REQ;
            this.Client = client;
            this.Req = request;
            this.MysqlConn = conn;
        }
        this.on("cn9011", this.m_cn9011);
        this.on("cn9012", this.m_cn9012);

    }
    start() {
        if (this.state == this._REQ) {
            this.emit("cn9011")
        }
    }
    m_cn9011() {
        this.updateQnRtn(this.Req);
        let res = ver2017.send(this.Req.QN, this.Req.ST, this.Req.MN, this.Req.PW, 0);
        if (this.qnrtn == QnRtn.READY) {
            console.log("准备执行入库操作");
            let row = this.Req.toArray(this.qnrtn, this.Client.remoteAddress);
            this.MysqlConn.query(insertReq, row, (error) => {
                if (error) {
                    console.log('拒绝-请求: 插入数据库成功');
                    this.qnrtn = QnRtn.REJECT;
                    this.state = this._END;
                }
                else {
                    console.log('接受-请求: 插入数据库成功');
                    this.state = this._EXE;
                    this.cnfun.cnxxxx(this.Req.CN, this.Req.QN, this.Req.CMDs)
                }
                this.Client.write(res.setQnRtn(this.qnrtn).pkg("9011", 4).PKG);
            });
        }
        else {
            console.log("请求非法");
            this.Client.write(res.setQnRtn(this.qnrtn).pkg("9011", 4).PKG);
            this.state = this._END;
        }
    }

    m_checkexertn(qn) {
        if (this.state == this._EXE) {
            console.log("检查执行结果");
            this.MysqlConn.query(queryExeRtn, qn, (error, results, fields) => {
                if (error || results.length != 1) {
                    let res = ver2017.send(this.Req.QN, this.Req.ST, this.Req.MN, this.Req.PW, 0);
                    this.exertn = ExeRtn.FAILED;
                    this.Client.write(res.setExeRtn(this.exertn).pkg("9012", 4).PKG);
                    this.state = this._END;
                }
                else {
                    let res = ver2017.send(this.Req.QN, this.Req.ST, this.Req.MN, this.Req.PW, 0);
                    this.exertn = results[0].ExeRtn;
                    if(results[0].ExeResult!=""){
                        let vals = JSON.parse(results[0].ExeResult);
                        this.Client.write(res.cp_C(vals).pkg(this.Req.CN,4).PKG);
                    }
                    this.Client.write(res.setExeRtn(this.exertn).pkg("9012", 4).PKG);
                    this.state = this._END;
                }
            });
        }
    }

    m_cn9012(rtn) {
        console.log("执行结束：" + rtn);
        this.state = this._END;
    }

    updateQnRtn(req) {
        if (req.MN != this.Dev.MN) {
            return this.qnrtn = QnRtn.E_MN;
        }
        if (req.PW != this.Dev.PW) {
            return this.qnrtn = QnRtn.E_PW;
        }
        if (req.ST != this.Dev.ST) {
            return this.qnrtn = QnRtn.E_ST;
        }
        if (this.Dev.S_CN.indexOf(req.CN) >= 0) {
            return this.qnrtn = QnRtn.READY;
        }
        return this.qnrtn = QnRtn.UNKNOWN;
    }
}

module.exports = Lsm_R1;