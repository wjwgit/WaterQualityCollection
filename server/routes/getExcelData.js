const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const iconv = require('iconv-lite');
// var jschardet = require('jschardet');


exports.getdriversData = function (req, res, next) {
   
    try {
        // var drivers= path.join(__dirname, req.query.driverUrl)
        console.log('读取driver文件地址:', path.resolve(req.query.driverUrl));

        var rs = fs.createReadStream(path.resolve(req.query.driverUrl), { encoding: 'utf-8' });
  
        // rs.setEncoding('utf8');
        // var str = path.resolve(req.query.configurl);
        // var result = jschardet.detect(str);
        // console.log('编码方式:' + result.encoding + "; " + result.confidence);
        var data = '';
        rs.on('data', function (trunk) {
            data += trunk;
        });
        rs.on('end', function () {
            // var person = Buffer.from(data, 'binary')
            // var persons = iconv.decode(person, 'gbk')
            var persons = data.toString('utf-8')
            if (persons != "") {
                var table = new Array();
                var rows = new Array();
                rows = persons.split("\r\n");
                var num = rows.length;
                var newRows = rows.splice(0, num)
                // console.log(newRows)
                for (var i = 0; i < newRows.length; i++) {
                    if (newRows[i] != "") {
                        table.push(newRows[i].split(","));
                    }
                }
                // obj.lcbjConfig = JSON.parse(persons);//将字符串转换为json对象
                // console.log('obj',obj);
                return res.status(200).send(table).end();
            }
        });
    }
    catch (err) {
        if (err) {
            res.status(409).send("文件未找到").end();
            return console.error(err);
        }
    }


}


//servers配置信息修改
exports.UpdatedriversData = function (req, res, next) {
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        let driverdata = "";
        // var person = data.toString();//将二进制的数据转换为字符串
        fs.readFile(path.resolve(fields.configurl), 'utf-8', function (err, data) {
            if (err) {
                return console.error(err);
            }
            // var person = iconv.decode(data, 'gbk')
            var person = data.toString();//将二进制的数据转换为字符串
            console.log(person)

            // obj = JSON.parse(person);
            if (person != "") {
                var table = "";
                var rows = new Array();
                rows = person.split("\r\n");
                var num = rows.length;
                var newrows = rows.splice(0, num)
                for (var i = 0; i < newrows.length; i++) {
                    //    var name= fields.str.split(',')[7];  // 旧：name
                    var id = fields.str.split(',')[0];  //新：id
                    if (newrows[i].split(',')[0] == id) {
                        console.log('=====')
                        // console.log(rows[i])
                        // console.log('=====')
                        // console.log(fields.str)

                        newrows[i] = fields.str;
                        // console.log('=====')

                        // console.log(rows[i])
                    }
                    if (i < newrows.length - 1) {
                        table += newrows[i].toString() + "\r\n";

                    } else {
                        table += newrows[i].toString()
                    }
                }
                console.log('=====')

                console.log(table)
                console.log('=====')

                // obj.lcbjConfig = JSON.parse(persons);//将字符串转换为json对象
                // console.log('obj',obj);
                // return res.status(200).send(table).end("1");
            }
            driverdata = table
            // var driverdatas = iconv.decode(data, 'gbk')

            // fs.writeFileSync(path.resolve(__dirname, "../../../caiji/caiji/Debug/WQMS/drivers.csv"),driverdata,{encoding:'utf-8'})
            //'\ufeff' +driverdata
            fs.writeFile(path.resolve(fields.configurl), driverdata, { encoding: 'utf-8' }, function (err) {
                if (err) {
                    res.status(409).send("修改失败").end();
                    return;
                }
                res.status(200).send("修改成功").end();
            })
        })
    })
}

