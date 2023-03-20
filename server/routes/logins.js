const fs = require("fs");
const path = require('path');
const User = require("../models/users.json");
var iconv = require('iconv-lite');

var ini = require("ini");
const appconfig = require('../appConfig.json');



//登录
exports.login = function (req, res, next) {

    let obj = {};
    // obj.RoleID = rows[0].RoleID;//menus
    // fs.readFile(path.resolve(__dirname, "../models/users.json"), function (err, data) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     var person = data.toString();//将二进制的数据转换为字符串
    //     if (person != "") {
    //         obj.users = JSON.parse(person);//将字符串转换为json对象
    //     }
    obj.Loginedname = User.defaultuser.name;
    obj.RoleID = User.defaultuser.role;
    return res.status(200).send(obj).end();
    // fs.readFile(path.resolve(__dirname,"../../../caiji/SystemConfig.ini" ),{encoding:'utf-8'}, function (err, data) { //"../appConfig.json"
    //     if (err) {
    //         return console.error(err);
    //     }
    //     var person =data.toString();; //将二进制的数据转换为字符串 data.toString();
    //     if (person != "") {
    //         obj.appConfig = JSON.parse(person);//将字符串转换为json对象
    //         return    res.status(200).send(obj).end();
    //     }
    // })

    // const iopath = path.join(__dirname,  appconfig.sysIniUrl); // 引用Pos.ini的相对地址 "../../caiji/SystemConfig.ini" 
    //    const iopath =path.resolve(appconfig.sysIniUrl);
    //     console.log('sysiniUrl=', path.resolve(iopath));

    //   const Info = ini.parse(fs.readFileSync(iopath));//utf-8   ANSI

    // let data=fs.readFileSync(iopath);
    // var str = iconv.decode(data, 'GB2312');
    // console.log(str);
    // const Info = ini.parse(str);
    //         var fileStr = fs.readFileSync(iopath, {encoding:'binary'});
    //         var buf = Buffer.from(fileStr, 'binary');
    //         var Infos = iconv.decode(buf, 'GBK');

    // console.log('Infos',Infos)


    // if (Info != ""&& Info != null&& Info != undefined) {
    //     obj.appConfig = Info;//将字符串转换为json对象
    //     return    res.status(200).send(obj).end();
    // }else{
    //     return console.error("未找到配置文件");
    // }



    // }) 
}

