const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const { config } = require('process');

exports.getconfig = function (req, res, next) {
   
    fs.readFile(path.resolve(__dirname, req.query.configurl), function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        if (person != "") {
            person = JSON.parse(person);//将字符串转换为json对象
            res.status(200).send(person).end();
        }
    })
}