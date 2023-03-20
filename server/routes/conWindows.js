const { exec } = require('child_process')
const formidable = require('formidable');

const child_process = require('child_process')
const os = require('os')
const path = require('path')

// class ControlVirtualKeyBoard {

//     constructor() { }

//     static OpenVirtualKeyBoard() {
//         if (os.platform() === 'win32') {
//             exec('osk.exe')
//         } else {
//             exec('onboard')
//         }

//     }
// }

// 打开键盘
exports.ControlVirtualKeyBoard = function (req, res, next) {

    console.log('11');
    if (os.platform() === 'win32') {
        // exec('osk.exe')
        try {
            // exec('osk.exe')

            exec(`osk.exe`, (error, stdout, stderr) => { //ping -c 3
                // if (error) {
                //     console.log('打开键盘失败');
                //     res.status(400).send("500").end();
                // } else {
                // console.log('打开键盘成功')
                // res.status(200).send("200").end();
                // }
                console.log('打开键盘成功')
                res.status(200).send("200").end();
            })
        }
        catch (e) {
            console.log('ControlVirtualKeyBoard:', e);

        }


        // exec(`osk.exe`, (error, stdout, stderr) => { //ping -c 3
        //     if (error) {
        //         console.log('打开键盘失败');
        //         res.status(400).send("400").end();
        //     } else {
        //         console.log('打开键盘成功')
        //         res.status(200).send("200").end();
        //     }
        // });
    } else {
        exec('onboard')
    }
}
// ping ip
const ip = '172.16.12.199'
exports.testIP = function (req, res, next) {

    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            console.log(fields);

            if (os.platform() === 'win32') {
                exec(`ping  ${fields.PlatformIP}`, (error, stdout, stderr) => { //ping -c 3
                    if (error) {
                        console.log('ip is inactive.');
                        res.status(400).send("400").end();
                    } else {
                        console.log('ip is active.')
                        res.status(200).send("200").end();
                    }
                });
            } else {
                console.log('win21 is not.')
            }
        })
    }
    catch (e) {
        console.log('testIP:', e);
    }



}




//
exports.execFile = function (req, res, next) {
    if (os.platform() === 'win32') {
        let form = new formidable();
        form.parse(req, function (err, fields, files) {
            console.log(fields.baturl);
            console.log(path.resolve(fields.baturl));
            // console.log(fields.baturl + '/数据库备份.bat')
            // exec( 'F:\水质子站系统\水质采集\Y_源代码\202003\water\caiji\数据库备份.bat')
            //    const aa= "F:/水质子站系统/水质采集/Y_源代码/202003/water/caiji"

            // child_process.execFile("数据库备份.bat", null, { cwd: fields.baturl }, function (error, stdout, stderr) {
            //     if (error !== null) {
            //         console.log("exec error" + error);
            //         res.status(400).send("400").end();
            //     }
            //     else{
            //         res.status(200).send(path.resolve(fields.conurl)).end();
            //         console.log("成功")
            //     } 

            //     console.log('stdout: ' + stdout);
            //     console.log('stderr: ' + stderr);
            // })
            res.status(200).send(path.resolve(fields.conurl)).end();
            // console.log("成功")
            //   exec( 'F:\水质子站系统\水质采集\Y_源代码\202003\water\caiji\数据库备份.bat')

        })


        // execs.execFile("数据库备份.bat", null, { cwd: req.query.baturl }, function (error, stdout, stderr) {
        //     if (error !== null) {
        //         console.log("exec error" + error)
        //     }
        //     else console.log("成功")
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        // })
    }
}

