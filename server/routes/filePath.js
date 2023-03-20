const path = require('path');
const fs = require("fs");
const multiparty = require('multiparty');
const images = require('images');
const db = require('./dbRoutes.js');
const moment = require('moment');

let imgPath = path.resolve(__dirname, '../images/zdgl');
let hcbjimgPath = path.resolve(__dirname, '../images/bjgl');
let httpUrls = "http://127.0.0.1:6060/";

// let httpUrls = "http://172.16.12.199:6061/";

//获取报警诊断数据
exports.gettbhelpguide = function (req, res, next) {

    var sql = " ";

    if (req.query.comdition == undefined || req.query.comdition == "" || req.query.comdition == null) {
        sql = "SELECT * from tbhelpguide  "
    }
    else {
        sql = "SELECT * from tbhelpguide where " + req.query.comdition + "  "
    };

    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(400).send(rows).end();
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].ImgUrl != " " && rows[i].ImgUrl != "" && rows[i].ImgUrl != null) {
                let newRow = rows[i].ImgUrl.substring(0, rows[i].ImgUrl.length - 1).split(";");
                for (var k = 0; k < newRow.length; k++) {

                    newRow[k] = httpUrls + newRow[k];
                }
                rows[i].ImgUrl = newRow;
            }
        }
        res.status(200).send(rows).end();
    });
}
exports.updatetbhelpguide = function (req, res, next) {

    // form.parse(req, function (err, fields, files) {
    //     let fields = fields;
    //     let sql = '';
    //     if (fields.ID > 0) {
    //         sql = `UPDATE tbhelpguide
    //             SET GuideType = '${fields.GuideType}',
    //             ProblemDes = '${fields.ProblemDes}',
    //             Solution = '${fields.Solution}',
    //             ImgUrl='${fields.ImgUrl}',
    //             AddTime='${moment().format('YYYY-MM-DD HH:mm:ss')}'
    //             WHERE
    //                 ID = ${fields.ID} ;`;
    //         // sql += `
    //         // INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
    //         //     VALUES (${fields.ID},${fields.Quantity},'${moment().format('YYYY-MM-DD hh:mm:ss')}');`;

    //         // sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${fields.PolId}' and Type=6 ;`;
    //     } else {
    //         sql = `
    //             INSERT INTO tbhelpguide (
    //                 GuideType,
    //                 ProblemDes,
    //                 Solution,
    //                 AddTime
    //             )
    //             VALUES
    //                 (
    //                     '${fields.GuideType}',
    //                     '${fields.ProblemDes}',
    //                     '${fields.Solution}',
    //                     '${moment().format('YYYY-MM-DD HH:mm:ss')}'
    //                 );
    //            `
    //     }
    //     console.log(sql);
    //     db.query(sql, function (err, fields, files) {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         res.status(200).send(fields).end();
    //     });
    // })

    var form = new multiparty.Form();
    try {

        form.parse(req, function (err, fields, files) {
            //存储位置
            // let imgUrl = imgPath + fields.SID[0] + "/"   + "\\" + fields.GuideType[0] + "\\"
            let imgUrl = '';
            if (fields.AlarmIDs[0] == '') {
                imgUrl = 'spaceImage';
            } else {
                imgUrl = imgPath + "\\" + fields.AlarmIDs[0] + "\\";
            }


            // imgUrls = imgPath + "/" + fields.GuideType[0] + "/"
            var imgUrls = ""

            //判断目录是否存在  不存在则创建
            mkdirs(imgUrl, function (e) {
                if (imgUrl != 'spaceImage') {

                    if (Object.keys(files).length != 0) {
                        let uploadFile = files.file1;
                        uploadFile.forEach((f, index) => {
                            // //找到上传的图片上传之前的名字
                            var orgFilename = f.originalFilename;
                            // //切割orgFilename 找到图片的扩展名 以证明图片是什么格式的
                            // //切割后是一个数组，找到数组最后一个
                            var formate = orgFilename.split(".");
                            // //拼接新的图片名称
                            var fileName = index + "." + formate[formate.length - 1];
                            fileName = moment().unix() + fileName
                            images(f.path) //Load image from file 
                                // .size(400)
                                .save(imgUrl + fileName, {
                                    quality: 1000
                                });
                            imgUrls +='zdgl/'+ fields.AlarmIDs[0] + '/' + fileName + ';'
                        });
                    }
                }
                // 更新数据库
                if (fields.ID > 0 && fields.file2 != undefined) {

                    if (fields.file2.length > 0) {

                        fields.file2.forEach((fd, index) => {
                            imgUrls +='zdgl/'+ fields.AlarmIDs[0] + '/' + fd + ';'
                        });

                    }
                }
                console.log('imgUrls=', imgUrls);
                if (fields.ID > 0) {
                    sql = `UPDATE tbhelpguide
                                  SET GuideType = '${fields.GuideType}',
                                  ProblemDes = '${fields.ProblemDes}',
                                  Solution = '${fields.Solution}',
                                  ImgUrl='${imgUrls}',
                                  AddTime='${moment().format('YYYY-MM-DD HH:mm:ss')}'
                           WHERE
                                    ID = ${fields.ID} ;`;
                } else {
                    sql = `
                INSERT INTO tbhelpguide (
                    GuideType,
                    ProblemDes,
                    Solution,
                    AddTime,
                    imgUrl
                )
                VALUES
                    (
                        '${fields.GuideType}',
                        '${fields.ProblemDes}',
                        '${fields.Solution}',
                        '${moment().format('YYYY-MM-DD hh:mm:ss')}',
                        '${imgUrls}'
                    );
               `
                }
                   console.log('sql=',sql)
                db.query(sql, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.status(200).send("操作失败").end();

                        return;
                    }

                    res.status(200).send("操作成功").end();
                });

            });

        })
    } catch (e) {
        console.log('updatetbhelpguide:err=', e);
    }
};



// 上传图片
exports.uplodeImges = function (req, res, next) {

    var form = new multiparty.Form();
    try {

        form.parse(req, function (err, fields, files) {
            //存储位置
            // let imgUrl = imgPath + fields.SID[0] + "/"   + "\\" + fields.GuideType[0] + "\\"
            let imgUrl = hcbjimgPath + "\\" + fields.dircName[0] + "\\"

            // imgUrls = imgPath + "/" + fields.GuideType[0] + "/"
            var imgUrls = ""

            //判断目录是否存在  不存在则创建
            mkdirs(imgUrl, function (e) {
                if (Object.keys(files).length != 0) {
                    let uploadFile = files.file1;
                    uploadFile.forEach((f, index) => {
                        // //找到上传的图片上传之前的名字
                        var orgFilename = f.originalFilename;
                        // //切割orgFilename 找到图片的扩展名 以证明图片是什么格式的
                        // //切割后是一个数组，找到数组最后一个
                        var formate = orgFilename.split(".");
                        // //拼接新的图片名称
                        var fileName = index + "." + formate[formate.length - 1];
                        fileName = moment().unix() + fileName
                        images(f.path) //Load image from file 
                            // .size(400)
                            .save(imgUrl + fileName, {
                                quality: 1000
                            });
                        imgUrls += fields.dircName[0] + '/' + fileName 
                    });

                }
                console.log('imgUrls=', imgUrls);
                res.status(200).send(imgUrls).end();

            });

        })
    } catch (e) {
        console.log('uplodeImges:err=', e);
    }
};

// mkdirs(imgPath, function (e) {
//     console.log("目录创建完毕")
// });
//递归创建目录 异步方法  
function mkdirs(dirname, callback) {
    // if(dirname!='spaceImage'){
        fs.exists(dirname, function (exists) {
            if (exists) {
                callback();
            } else {
                console.log(path.dirname(dirname));
                mkdirs(path.dirname(dirname), function () {
                    fs.mkdir(dirname, callback);
                });
            }
        });
    // }
}

