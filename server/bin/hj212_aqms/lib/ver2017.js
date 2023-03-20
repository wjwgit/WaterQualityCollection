const utils = require('./utils');
const moment = require('moment');
const codes = require('../columnCodes.json');
exports.send = function (qn, st, mn, pw, resendtimes) {
    return new HJ212_2017_Client_s(qn, st, mn, pw, resendtimes);
}
exports.recv = function (buf) {
    return new HJ212_2017_Client_r(buf);
}

class HJ212_2017_Client_s {
    constructor(qn, st, mn, pw, resendtimes) {
        this.QN = qn;
        this.ST = st;
        this.CN = "0000";
        this.MN = mn;
        this.PW = pw;
        this.CP = "";
        this.PKG = "";
        this.ResendTimes = resendtimes;
        this.TimeStamp = Date.now();
        this.PNUMNO = "";
    }

    needResend(overtime) {
        let b = false;
        let t = Date.now();
        let s = moment.duration(t - this.TimeStamp).asSeconds();
        if (s >= overtime && this.ResendTimes > 0) {
            this.TimeStamp = t;
            this.ResendTimes -= 1;
            b = true;
        }
        return b;
    }
    cp_C14(polls, vals) {
        let dtime = moment(vals['时间']).format('YYYYMMDDHHmm00');
        let cp = "DataTime=" + dtime + ";";
        for (let i = 0; i < polls.length; i++) {
            let md = new CP_C14(polls[i].ColName, vals)
            cp += md.toString() + ';';
        }
        this.CP = cp.slice(0, cp.length - 1);
        return this;
    }
    cp_C161718(polls, vals) {
        let dtime = moment(vals['时间']).format('YYYYMMDDHHmmss');
        let cp = "DataTime=" + dtime + ";";
        let flag = vals['Flagstr'];
        for (let i = 0; i < polls.length; i++) {
            let md = new CP_C161718(polls[i].ColName, vals, flag, polls[i].Zs, polls[i].Cou, polls[i].HJ212)
            cp += md.toString() + ';';
        }
        this.CP = cp.slice(0, cp.length - 1);
        return this;
    }

    cp_C(vals) {
        let cp = "";
        for (let k in vals) {
            cp += k + '=' + vals[k] + ';'
        }
        this.CP = cp.slice(0, cp.length - 1);
        return this;
    }
    setPNumNo(num, no) {
        this.PNUMNO = ';PNUM=' + num + ';PNO=' + no;
        return this;
    }
    //数据段
    formatPDU(cn, flag) {
        return 'QN=' + this.QN + ';ST=' + this.ST + ';CN=' + cn + ';PW=' + this.PW
            + ';MN=' + this.MN + ';Flag=' + flag + this.PNUMNO + ';CP=&&' + this.CP + '&&';
    }

    setQnRtn(num) {
        this.CP = "QnRtn=" + num;
        return this;
    }
    setExeRtn(num) {
        this.CP = "ExeRtn=" + num;
        return this;
    }

    pkg(cn, flag) {
        let pdu = this.formatPDU(cn, flag, '');
        let len = utils.pad0Left(pdu.length, 4);
        let crc = utils.crc16(pdu);
        this.CN = cn;
        this.PKG = "##" + len + pdu + crc + "\r\n";
        return this;
    }
}

class HJ212_2017_Client_r {
    constructor(buf) {
        this.pkg = buf;
        this.QN = null;
        this.ST = null;
        this.CN = null;
        this.PW = null;
        this.MN = null;
        this.Flag = null;
        this.ACK = 0; //应答：1 应答 0 不应答
        this.CMDs = {};
        this.RecvTime = Date.now(); //收到数据包时间
    }

    parsePkg() {
        // if (false == utils.checkCrc16(this.pkg)) {
        //     return false;
        // }
        let pdu = this.pkg.slice(6, this.pkg.length - 6);
        let pairs = pdu.split(';CP=');
        this.parseFields(pairs[0]);
        this.parseCP(pairs[1]);
    }

    parseFields(fields) {
        fields = fields.split(';');
        let len = fields.length;
        for (let i = 0; i < len; i++) {
            let kv = fields[i].split('=');
            switch (kv[0]) {
                case 'QN':
                    this.QN = kv[1];
                    break;
                case 'ST':
                    this.ST = kv[1];
                    break;
                case 'CN':
                    this.CN = kv[1];
                    break;
                case 'PW':
                    this.PW = kv[1];
                    break;
                case 'MN':
                    this.MN = kv[1];
                    break;
                case 'Flag':
                    this.Flag = parseInt(kv[1]);
                    this.ACK = this.Flag & 1;
                    break;
                default:
                    break;
            }
        }
    }

    parseCP(cps) {
        cps = cps.slice(2, cps.length - 2).split(';');
        let len = cps.length;
        for (let i = 0; i < len; i++) {
            let kv = cps[i].split('=');
            this.CMDs[kv[0]] = kv[1];
        }
    }

    toArray(qnrtn, remoteip) {
        let a = [];
        a.push(moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'));
        a.push(this.MN);
        a.push(this.QN);
        a.push(this.CN);
        a.push(qnrtn);
        a.push(null);
        a.push(remoteip);
        a.push(JSON.stringify(this.CMDs));//args;
        a.push(null);
        return a;
    }
}

/**
 * 实时数据
 */
class CP_C14 {
    constructor(colName, vals) {
        this.Code = codes[colName].hj2017;
        this.Rtd = vals[colName] ? vals[colName] : 0;
        this.Flag = vals[colName + '-flag'] ? vals[colName + '-flag'] : 'D';
    }
    toString() {
        return this.Code + '-Rtd=' + this.Rtd + ',' + this.Code + '-flag=' + this.Flag;
    }
}
/**
 * 分钟、小时、日数据
 */
class CP_C161718 {
    constructor(colName, vals, flag, bZs, bCou) {
        this.Code = codes[colName].hj2017;
        this.Avg = vals[colName];
        this.Min = vals[colName + 'MIN'];
        this.Max = vals[colName + 'MAX'];
        this.bZs = bZs || false;
        this.bCou = bCou || bCou;
        if (this.bZs) {
            this.Avg = vals[colName + '折算'];
            this.Min = vals[colName + '折算MIN'];
            this.Max = vals[colName + '折算MAX'];
        }
        if (this.bCou) {
            this.Cou = vals[colName + 'COU'];
        }
        this.Flag = vals[colName+ "-flag"];
    }
    toString() {
        let s1 = this.Code + '-Avg=' + this.Avg + ','
            + this.Code + '-Min=' + this.Min + ','
            + this.Code + '-Max=' + this.Max;
        if (this.bZs) {
            s1 += ',' + this.Code + '-ZsAvg=' + this.Avg + ','
                + this.Code + '-ZsMin=' + this.Min + ','
                + this.Code + '-ZsMax=' + this.Min;
        }
        if (this.bCou) {
            s1 += ',' + this.Code + '-Cou=' + this.Cou;
        }
        s1 += ',' + this.Code + '-Flag=' + this.Flag;
        return s1;
    }
}
