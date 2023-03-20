const moment = require('moment');
const ExeRtn = require('./ExeRtn.json');
const Polltants = require('../uploadpollutants.json');
const ver2017 = require('./ver2017');
const utils = require('./utils');

const updateReq = "UPDATE remoterequest SET ExeRtn= ?, ExeResult= ? WHERE QN = ?;"
class CN {
    constructor(fsm, conn) {
        this.FSM = fsm;
        this.MysqlConn = conn;
    }
    cnxxxx(cn, qn, cmdargs) {
        switch (cn) {
            case '1000':
                this.cn1000(qn, cmdargs);
                break;
            case '1011':
                this.cn1011(qn, cmdargs);
                break;
            case '2041':
            case '2051':
            case '2061':
                this.cn20415161(qn, cmdargs);
                break;
            default:
                break;
        }
    }
    cn1000(qn, cmdargs) {

    }
    cn1011(qn, cmdargs) {
        cmdargs["SystemTime"] = moment().format('YYYYMMDDhhmmssSSS');
        this.MysqlConn.query(updateReq, [ExeRtn.OK, JSON.stringify(cmdargs), qn], (error, results, fields) => {
            if (error) {
                this.FSM.exertn = ExeRtn.FAILED;
                this.FSM.state = this.FSM._END;
            }
            else {
                this.FSM.exertn = ExeRtn.OK;
            }
        });
    }
    //取污染物小时数据
    cn20415161(qn, cmdargs) {
        let begin = moment(cmdargs['BeginTime'], 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
        let end = moment(cmdargs['EndTime'], 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
        let tname = "日报表a";
        switch (this.FSM.Req.CN) {
            case "2041":
                tname = "月报表a";
                break;
            case "2051":
                tname = "分钟数据a";
                break;
            case "2061":
                tname = "日报表a";
                break;
            default:
                break;
        }
        let sql = "SELECT * FROM " + tname + " WHERE 时间>= ? AND 时间 <= ?;"
        this.MysqlConn.query(sql, [begin, end], (error, results, fields) => {
            if (error) {
                this.FSM.exertn = ExeRtn.FAILED;
                this.FSM.state = this.FSM._END;
            }
            else {
                let num = results.length;
                for (let i = 0; i < num; i++) {
                    let qni = moment().format('YYYYMMDDHHmm')
                        + utils.pad0Left(parseInt(i / 1000), 2) + utils.pad0Left(parseInt(i % 1000), 3);
                    let res = ver2017.send(qni, this.FSM.Req.ST, this.FSM.Req.MN, this.FSM.Req.PW, 0);
                    this.FSM.Client.write(res.setPNumNo(num,i).cp_C161718(Polltants, results[i]).pkg(this.FSM.Req.CN, 6).PKG);//flag = 4, 不应答
                }
                this.FSM.exertn = ExeRtn.OK;
            }
            this.updateReq(this.FSM.exertn, qn);
        });
    }
    updateReq(exertn, qn) {
        this.MysqlConn.query(updateReq, [exertn, "", qn], (error, results, fields) => {
            if (error) {
                this.FSM.exertn = ExeRtn.FAILED;
                this.FSM.state = this.FSM._END;
            }
            else {
                this.FSM.exertn = ExeRtn.OK;
            }
        });
    }
}

class ExecuteResult {
    constructor(rtn, args) {
        this.ExeRtn = rtn;
        this.CpVals = args;
    }
}

exports.createCN = function (fsm, conn) {
    return new CN(fsm, conn);
};

