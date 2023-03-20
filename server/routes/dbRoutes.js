/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'ipcmain',
  password : 'password',
  database : 'test'
});

connection.connect();

connection.query('SELECT * FROM category', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
*/
const fs = require("fs");

const path = require('path');

var ini = require("ini");
const appconfig = require('../appConfig.json');

// const iopath = path.join(__dirname, appconfig.sysIniUrl); // 引用Pos.ini的相对地址CaiJi "../../caiji/SystemConfig.ini"
const iopath = path.resolve(appconfig.sysIniUrl);  // 引用Pos.ini的相对地址CaiJi "../../caiji/SystemConfig.ini"
const Info = ini.parse(fs.readFileSync(iopath, 'utf-8'));


// if (Info != ""&& Info != null&& Info != undefined) {
//   const   appConfig = Info;//将字符串转换为json对象
// }else{
//      console.error("未找到配置文件");
// }

// const appcfg = require('../appConfig');

// #数据库地址
// DBIP = "127.0.0.1"  
// #数据库端口
// DBPort = 3306
// #数据账号
// DBUID = "root" 
// #数据账号密码
// DBPWD = "123456" 
// #数据库名
// DBName = "shuizhi"

var mysql = require('mysql');
let DBConfig = {
  database: Info.config.DBName,
  host: Info.config.DBIP,
  password: Info.config.DBPWD,
  user: Info.config.DBUID,
  multipleStatements: true
};//Info.config.DBIP
var pool = mysql.createPool(DBConfig);
// var pool = mysql.createPool(appcfg.mysql);
// console.log(appcfg.mysql);
// console.log(pool);
console.log('读取mysql地址', iopath);
// 让我们的方法支持两种模式
// 一种是只传入SQL语句和回调函数
// 一种是传入SQL语句、参数数据、回调函数
exports.query = function (sql, P, C) {
  var params = [];
  var callback;
  // 如果用户传入了两个参数，就是SQL和callback
  if (arguments.length == 2 && typeof arguments[1] == 'function') {
    callback = P;
  } else if (arguments.length == 3 && Array.isArray(arguments[1]) && typeof arguments[2] == 'function') {
    params = P;
    callback = C;
  } else {
    throw new Error('对不起，参数个数不匹配或者参数类型错误');
  }
  // 如果用户传入了三个参数，那么就是SQL和参数数组、回调函数
  // 从池子里面拿一个可以使用的连接
  pool.getConnection(function (err, connection) {

    try {
      // Use the connection
      connection.query(sql, params, function () {
        // 使用完毕之后，将该连接释放回连接池
        connection.release();
        callback.apply(null, arguments);
      });
    }
    catch {
      console.log("数据库连接失败")

      throw new Error('数据库连接失败');

    }

  });
};

