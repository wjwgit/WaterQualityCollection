var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'userdatabase'
});
 
connection.connect();
 
connection.query('SELECT * from 分钟数据a', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', JSON.stringify(results[11]));
});
 
connection.end();