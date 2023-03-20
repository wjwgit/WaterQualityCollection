const fs = require("fs");
const path = require('path');
const db = require('./dbRoutes.js');
var ini = require("ini");
var iconv = require('iconv-lite');

const appconfig = require('../appConfig.json');


//登录
exports.login = function (req, res, next) {
    let loginName = req.query.name;
    let loginPwd = req.query.pwd;

    var sql;
    if (loginName == undefined || loginName == "" || loginPwd == null || loginPwd == "") {
        return res.status(200).end("2");
    }
    else {
        sql = "select  *  from tbuser where  Account='" + loginName + "' and Pwd='" + loginPwd + "'  "
    }
    db.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        } else {
            if (rows.length == 0) {
                return res.status(200).end("2");
            } else {
                let obj = {};
                obj.RoleID = rows[0].RoleID;//menus
                return res.status(200).send(obj).end();
                //const iopath =path.resolve(appconfig.sysIniUrl)  
                // const iopath = path.join(__dirname, appconfig.sysIniUrl); // 引用Pos.ini的相对地址 "../../caiji/SystemConfig.ini"
                // const Info = ini.parse(fs.readFileSync(iopath, 'utf-8'));
                // console.log("登录读取ini地址", iopath)

                // let data = fs.readFileSync(iopath);
                // var str = iconv.decode(data, 'GB2312');
                // console.log(str);
                // const Info = ini.parse(str);
                // var fileStr = fs.readFileSync(iopath, {encoding:'binary'});
                // var buf = Buffer.from(fileStr, 'binary');
                // const Infos= iconv.decode(buf, 'GBK');


                // if (Info != "" && Info != null && Info != undefined) {
                //     //obj.appConfig = Info;//将字符串转换为json对象
                //     return res.status(200).send(obj).end();
                // } else {
                //     return console.error("未找到配置文件");
                // }
            }

            // })
        }
    });
}

