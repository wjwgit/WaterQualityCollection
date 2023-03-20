const mysql = require('mysql');
const moment = require('moment');
const HJ212 = require('./lib/HJ212');
const Polltants = require('./uploadpollutants.json')
// const hj212servers = require('../../models/hj212servers.json')
var servers = new Map()

const Second = 1000;
const Minute = 60 * Second;
const Hour = 60 * Minute;

function createHJ212(ip, port, mn, pw, conns) {
    var hj = new HJ212(ip, port, '22', mn, pw, false, Polltants, conns);
    hj.on("response", function (res) {
        if (res.QN in hj.C_Sessions) {
            delete hj.C_Sessions[res.QN];
        }
    });
    hj.start();
    // 重连定时器
    setInterval(function () {
        if (hj.Client.destroyed) {
            console.log('重连');
            hj.start();
        }
    }, Minute);
    // 自动上传定时器
    const T = 5; // 实时数据周期, 单位：秒
    setInterval(function () {
        let t = moment();
        hj.upload_rtd(t, T);
    }, Second);
    setInterval(function () {
        hj.upload_md();
    }, Minute);
    setInterval(function () {
        hj.upload_hd();
    }, 0.5 * Hour);
    //命令请求
    setInterval(function () {
        for (let k in hj.C_Sessions) {
            let s = hj.C_Sessions[k];
            if (s.needResend(hj.OverTime)) {
                hj.Client.write(s.PKG);
            }
            if (s.ResendTimes <= 0) {
                delete hj.C_Sessions[k];
            }
        }
        for (let k in hj.S_Sessions) {
            let lsm = hj.S_Sessions[k];
            if (lsm.state != 0) {
                lsm.m_checkexertn(k);
            }
            if (lsm.state == 0) {
                delete hj.S_Sessions[k];
            }
        }
    }, 1 * 60 * 1000);
    return hj;
}

exports.createServers = function (conninfo) {
    var conns = mysql.createPool(conninfo);
    // hj212servers.servers.forEach(cfg => {
    //     let svr = createHJ212(cfg.IP, cfg.Port, cfg.MN, cfg.PW, conns);
    //     servers[cfg.serverName] = svr;
    // });
}
exports.servers = servers;