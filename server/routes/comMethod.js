const moment = require('moment');
const fs = require("fs");
const db = require('./dbRoutes.js');
const formidable = require('formidable');

let httpUrls = "http://127.0.0.1:6060/";
// let httpUrls = "http://172.16.12.199:6061/";
//查询
exports.getData = function (req, res, next) {
    var sql;
    if (req.query.comdition == undefined || req.query.comdition == "" || req.query.comdition == null) {
        sql = "select " + req.query.columnName + " from " + req.query.tabelName + "  "
    }
    else {
        sql = "select " + req.query.columnName + " from " + req.query.tabelName + " where " + req.query.comdition + "  "
    }
    console.log('sss', sql);

    db.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            // console.log(sql);
            res.status(400).send(rows).end();

            return;
        }
        res.status(200).send(rows).end();
    });

}


//获取手工比对数据
exports.gettbquartercompare = function (req, res, next) {

    var sql = " ";

    if (req.query.comdition == undefined || req.query.comdition == "" || req.query.comdition == null) {
        sql = "SELECT * from tbquartercompare  "
    }
    else {
        sql = "SELECT * from  " + req.query.comdition + "  "
    };

    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(400).send(rows).end();
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].ImgUrl != "" && rows[i].ImgUrl != null) {
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
//添加手工比对数据
exports.addCompare = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            let condition = fields;

            sql = `
            INSERT INTO tbquartercompare (
                DataTime,
                PolId,
                AutoValue,
                ManualValue,
                CompareValue,
                CompareResult,
                DataType,
                TestOrder,
                ImgUrl
            )
            VALUES
                (
                    '${condition.DataTime}',
                    '${condition.PolId}',
                    ${condition.AutoValue},
                    ${condition.ManualValue},
                    ${condition.CompareValue},
                    ${condition.CompareResult},
                    ${condition.DataType},
                    ${condition.TestOrder},
                    '${condition.ImgUrl}'
                );
           `

            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('addCompare:err=', e);
    }

}
//修改手工比对数据
exports.updateCompare = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            let condition = fields;

            sql = `UPDATE tbquartercompare
            SET AutoValue = '${condition.AutoValue}',
            ManualValue = '${condition.ManualValue}',
            CompareValue = '${condition.CompareValue}',
            CompareResult = '${condition.CompareResult}',
            UpdateTime='${moment().format('YYYY-MM-DD hh:mm:ss')}',
            ImgUrl='${condition.ImgUrl}'
            WHERE
            ID = ${condition.ID} ;`

            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updateCompare:err=', e);
    }
}
//修改浓度参数
exports.updatelcbj = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            // console.log(fields);
            let condition = fields;

            // sql = "update  tbalarmarea  set DDLimit=" + fields.DDLimit + " ,DLimit=" + fields.DLimit + " ,ULimit=" + fields.ULimit + ", UULimit=" + fields.UULimit + "  where Code=" + fields.Code + " and AlarmType in " + fields.AlarmType + " "
            sql = `
            UPDATE tbalarmarea
            SET DDLimit = ${condition.DDLimit},
            DLimit = ${condition.DLimit},
            ULimit = ${condition.ULimit},
            UULimit = ${condition.UULimit}
            where
            Code= '${condition.Code}' 
            and
            AlarmType in (${condition.AlarmType}) 
            `
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    }
    catch (e) {
        console.log('updatelcbj:err=', e);
    }
}
//修改浓度参数
exports.updateglobalvar = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            console.log(fields);
            sql = "update  globalvar  set value=" + fields.value + " where symbol=" + fields.symbol + " "
            // //  console.log("sql",sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    }
    catch (e) {
        console.log('updateglobalvar:err=', e);
    }
}
//修改调试模式参数
exports.updateTSMode = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            console.log(fields);
            sql = "update  tbtestmodelconfig  set TestCount=" + fields.TestCount + ",SortIndex=" + fields.SortIndex + ",Status=" + fields.Status + " where ID=" + fields.ID + " "
            // //  console.log("sql",sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    }
    catch (e) {
        console.log('updateTSMode:err=', e);
    }
}
// 修改预处理方式
exports.updatetbfilterplan = function (req, res, next) {

    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';

            sql = `
            UPDATE tbfilterplan
            SET Title = '${condition.Title}',
            MinVal = '${condition.MinVal}',
            MaxVal = '${condition.MaxVal}',
            TankTime = '${condition.TankTime}',
            TPTime = '${condition.TPTime}',
            TNTime = '${condition.TNTime}',
            NH3Time = '${condition.NH3Time}',
            CODTime = '${condition.CODTime}'
            WHERE
            ID = '${condition.ID}' ;
            `
            //     INSERT INTO tbdevopslogdetail (DevOpsNum,ItemID,Status,Remark)
            //         VALUES (${condition.DevOpsNum},${condition.ItemID},${condition.Status},${condition.Remark});`;

            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updatetbfilterplan:err=', e);
    }
}


//添加通讯配置
exports.addupload = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            // let condition = fields;

            // console.log(fields);
            // sql = "update  globalvar  set value=" + fields.value + " where symbol="+fields.symbol+" "
            // sql = "INSERT INTO `tbupconfig` (PlatformName, PlatformIP,PlatformPort,PlatformPW,Protocol,UpShiShiData,UpXiaoShiData,UpBiaoYangData,UpLingDianData,UpKuaDuData,UpPingXingYangData,UpJiaBiaoData,UpKongBaiData,UpPowerOnData,UpLiuYangData,UpMeterArgs,UpMeterStatus,UpRunLog,HasResponse,LocalIP,LocalPort,COMStr,NetType,Status) VALUES  ('" + fields.PlatformName + "','" + fields.PlatformIP + "','" + fields.PlatformPort + "','" + fields.PlatformPW + "','" + fields.Protocol + "','" + fields.UpShiShiData + "','" + fields.UpXiaoShiData + "','" + fields.UpBiaoYangData + "','" + fields.UpLingDianData + "','" + fields.UpKuaDuData + "','" + fields.UpPingXingYangData + "','" + fields.UpJiaBiaoData + "','" + fields.UpKongBaiData + "','" + fields.UpPowerOnData + "','" + fields.UpLiuYangData + "','" + fields.UpMeterArgs + "','" + fields.UpMeterStatus + "','" + fields.UpRunLog + "','" + fields.HasResponse + "','" + fields.LocalIP + "','" + fields.LocalPort + "','" + fields.COMStr + "','" + fields.NetType + "','" + fields.Status + "')"
            let condition = fields;
            sql = `
            INSERT INTO tbupconfig (
                PlatformName,
                 PlatformIP,
                 PlatformPort,
                 PlatformPW,
                 Protocol,
                 UpShiShiData,
                 UpXiaoShiData,
                 UpBiaoYangData,
                 UpLingDianData,
                 UpKuaDuData,
                 UpPingXingYangData,
                 UpJiaBiaoData,
                 UpKongBaiData,
                 UpPowerOnData,
                 UpLiuYangData,
                 UpMeterArgs,
                 UpMeterStatus,
                 UpRunLog,
                 HasResponse,
                 LocalIP,
                 LocalPort,
                 COMStr,
                 NetType,
                 Status,
                 EnableCtrl
            )
            VALUES
                (
                    '${condition.PlatformName}',
                    '${condition.PlatformIP}',
                    '${condition.PlatformPort}',
                    '${condition.PlatformPW}',
                    '${condition.Protocol}',
                    '${condition.UpShiShiData}',
                    '${condition.UpXiaoShiData}',
                    '${condition.UpBiaoYangData}',
                    '${condition.UpLingDianData}',
                    '${condition.UpKuaDuData}',
                    '${condition.UpPingXingYangData}',
                    '${condition.UpJiaBiaoData}',
                    '${condition.UpKongBaiData}',
                    '${condition.UpPowerOnData}',
                    '${condition.UpLiuYangData}',
                    '${condition.UpMeterArgs}',
                    '${condition.UpMeterStatus}',
                    '${condition.UpRunLog}',
                    '${condition.HasResponse}',
                    '${condition.LocalIP}',
                    '${condition.LocalPort}',
                    '${condition.COMStr}',
                    '${condition.NetType}',
                    '${condition.Status}',
                    '${condition.EnableCtrl}'

                );
           `
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    }
    catch (e) {
        console.log('addupload:err=', e);
    }
}
// 修改通讯配置
exports.updateUpload = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            // console.log(fields);
            // sql = "update  globalvar  set value=" + fields.value + " where symbol="+fields.symbol+" "
            sql = "update   `tbupconfig`  set  PlatformName='" + fields.PlatformName + "', PlatformIP='" + fields.PlatformIP + "',PlatformPort='" + fields.PlatformPort + "',PlatformPW='" + fields.PlatformPW + "',Protocol='" + fields.Protocol + "',UpShiShiData='" + fields.UpShiShiData + "',UpXiaoShiData='" + fields.UpXiaoShiData + "',UpBiaoYangData='" + fields.UpBiaoYangData + "',UpLingDianData='" + fields.UpLingDianData + "',UpKuaDuData='" + fields.UpKuaDuData + "',UpPingXingYangData='" + fields.UpPingXingYangData + "',UpJiaBiaoData='" + fields.UpJiaBiaoData + "',UpKongBaiData='" + fields.UpKongBaiData + "',UpPowerOnData='" + fields.UpPowerOnData + "',UpLiuYangData='" + fields.UpLiuYangData + "',UpMeterArgs='" + fields.UpMeterArgs + "',UpMeterStatus='" + fields.UpMeterStatus + "',UpRunLog='" + fields.UpRunLog + "',HasResponse='" + fields.HasResponse + "',LocalIP='" + fields.LocalIP + "',LocalPort='" + fields.LocalPort + "',COMStr='" + fields.COMStr + "',NetType='" + fields.NetType + "',Status='" + fields.Status + "' ,EnableCtrl='" + fields.EnableCtrl + "'    where id='" + fields.id + "' "
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updateUpload:err=', e);
    }
}


//添加日志
exports.addlog = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            // console.log(fields);
            // sql = "update  globalvar  set value=" + fields.value + " where symbol="+fields.symbol+" "
            sql = "INSERT INTO `操作日志` (OPTIME, username,operator,cmdargs) VALUES  ('" + fields.OPTIME + "','" + fields.username + "','" + fields.operator + "','" + fields.cmdargs + "')"
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('addlog:err=', e);
    }
}
//添加用户
exports.addUser = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            // sql = "update  globalvar  set value=" + fields.value + " where symbol="+fields.symbol+" "
            sql = "INSERT INTO tbuser ( Account, Pwd,RoleID,RoleName,Status ,Remark) VALUES ('" + fields.Account + "','" + fields.Pwd + "','" + fields.RoleID + "','" + fields.RoleName + "','" + fields.Status + "','" + fields.Remark + "')"
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('addUser:err=', e);
    }
}
//删除用户
exports.delUser = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            console.log(fields);
            // sql = "update  globalvar  set value=" + fields.value + " where symbol="+fields.symbol+" "
            sql = "DELETE FROM tbuser WHERE ID=" + fields.ID + ""
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('delUser:err=', e);
    }
}

//修改用户
exports.updateUser = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            sql = "update  tbuser  set Account='" + fields.Account + "',Pwd='" + fields.Pwd + "',RoleID='" + fields.RoleID + "',RoleName='" + fields.RoleName + "',Status='" + fields.Status + "',Remark='" + fields.Remark + "'  where ID='" + fields.ID + "' "
            // //  console.log("sql",sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updateUser:err=', e);
    }

}

// 添加运维记录
exports.adddevopsLogData = function (req, res, next) {

    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';
            let LastTime = condition.LastTime == '' ? null : condition.LastTime;
            if (LastTime == null) {
                sql = `
                INSERT INTO tbdevopslog (
                    DevOpsNum,
                    DataTime,
                    TaskID,
                    remark,
                    DevOpsPerson,
                    LastTime,
                    DeviceName,
                    ModelNum,
                    DeviceNo,
                    Address,
                    Enterprise,
                    Company,
                    Summary
                )
                VALUES
                    (
                        '${condition.DevOpsNum || 0}',
                        '${moment().format('YYYY-MM-DD HH:mm:ss')}',
                        '${condition.TaskID}',
                        '${condition.remark}',
                        '${condition.DevOpsPerson}',
                        ${LastTime},
                        '${condition.DeviceName}',
                        '${condition.ModelNum}',
                        '${condition.DeviceNo}',
                        '${condition.Address}',
                        '${condition.Enterprise}',
                        '${condition.Company}',
                        '${condition.Summary}'

                    );
               `
            } else {
                sql = `
                INSERT INTO tbdevopslog (
                    DevOpsNum,
                    DataTime,
                    TaskID,
                    remark,
                    DevOpsPerson,
                    LastTime,
                    DeviceName,
                    ModelNum,
                    DeviceNo,
                    Address,
                    Enterprise,
                    Company,
                    Summary
                )
                VALUES
                    (
                        '${condition.DevOpsNum || 0}',
                        '${moment().format('YYYY-MM-DD HH:mm:ss')}',
                        '${condition.TaskID}',
                        '${condition.remark}',
                        '${condition.DevOpsPerson}',
                        '${condition.LastTime}',
                        '${condition.DeviceName}',
                        '${condition.ModelNum}',
                        '${condition.DeviceNo}',
                        '${condition.Address}',
                        '${condition.Enterprise}',
                        '${condition.Company}',
                        '${condition.Summary}'
                    );
               `
            }

            //    sql += `
            //     INSERT INTO tbdevopslogdetail (DevOpsNum,ItemID,Status,Remark)
            //         VALUES (${condition.DevOpsNum},${condition.ItemID},${condition.Status},${condition.Remark});`;

            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('adddevopsLogData:err=', e);
    }
}

// 更新运维到期时间
exports.updatedevopstaskData = function (req, res, next) {

    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';

            sql = `
            UPDATE tbdevopstask
            SET ExpireTime = '${condition.ExpireTime}'
            WHERE
            ID = '${condition.ID}' ;
            `

            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updatedevopstaskData:err=', e);
    }
}

// 修改运维记录
exports.updatedevopsLogData = function (req, res, next) {

    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';


            sql = `
            UPDATE tbdevopslog
            SET DevOpsPerson = '${condition.DevOpsPerson}',
            remark = '${condition.remark}',
            DeviceName='${condition.DeviceName}',
            ModelNum='${condition.ModelNum}',
            DeviceNo='${condition.DeviceNo}',
            Address='${condition.Address}',
            Enterprise='${condition.Enterprise}',
            Company='${condition.Company}',
            Summary='${condition.Summary}'
            WHERE
            DevOpsNum = '${condition.DevOpsNum}' ;
            `


            //     INSERT INTO tbdevopslogdetail (DevOpsNum,ItemID,Status,Remark)
            //         VALUES (${condition.DevOpsNum},${condition.ItemID},${condition.Status},${condition.Remark});`;

            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updatedevopsLogData:err=', e);
    }
}


// 添加/修改报备信息
exports.updateReport = function (req, res, next) {

    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';
            let EndTime = condition.EndTime == '' ? null : condition.EndTime;
            if (EndTime == null) {
                if (condition.ID > 0) {
                    sql = `UPDATE tbreport
                    SET PolId = '${condition.PolId}',
                    ReasonType = '${condition.ReasonType}',
                    StartTime = '${condition.StartTime}',
                    EndTime=${EndTime},
                    TimeLen=${condition.TimeLen},
                    Status=${condition.Status},
                    Remark='${condition.Remark}'
                    WHERE
                        ID = ${condition.ID} ;`;
                    // sql += `
                    // INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
                    //     VALUES (${condition.ID},${condition.Quantity},'${moment().format('YYYY-MM-DD hh:mm:ss')}');`;

                    // sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${condition.PolId}' and Type=6 ;`;
                } else {

                    sql = `
                    INSERT INTO tbreport (
                        PolId,
                        ReasonType,
                        StartTime,
                        EndTime,
                        TimeLen,
                        Status,
                        CreateDate,
                        ReportName,
                        Remark
                    )
                    VALUES
                        (
                            '${condition.PolId}',
                            '${condition.ReasonType}',
                            '${condition.StartTime}',
                            ${EndTime},
                            ${condition.TimeLen},
                            ${condition.Status},
                            '${moment().format('YYYY-MM-DD HH:mm:ss')}',
                            '${condition.ReportName}',
                            '${condition.Remark}'
                        );
                   `
                }
            } else {
                if (condition.ID > 0) {
                    sql = `UPDATE tbreport
                    SET PolId = '${condition.PolId}',
                    ReasonType = '${condition.ReasonType}',
                    StartTime = '${condition.StartTime}',
                    EndTime='${condition.EndTime}',
                    TimeLen=${condition.TimeLen},
                    Status=${condition.Status},
                    Remark='${condition.Remark}'
                    WHERE
                        ID = ${condition.ID} ;`;
                    // sql += `
                    // INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
                    //     VALUES (${condition.ID},${condition.Quantity},'${moment().format('YYYY-MM-DD hh:mm:ss')}');`;

                    // sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${condition.PolId}' and Type=6 ;`;
                } else {

                    sql = `
                    INSERT INTO tbreport (
                        PolId,
                        ReasonType,
                        StartTime,
                        EndTime,
                        TimeLen,
                        Status,
                        CreateDate,
                        ReportName,
                        Remark
                    )
                    VALUES
                        (
                            '${condition.PolId}',
                            '${condition.ReasonType}',
                            '${condition.StartTime}',
                            '${condition.EndTime}',
                            ${condition.TimeLen},
                            ${condition.Status},
                            '${moment().format('YYYY-MM-DD HH:mm:ss')}',
                            '${condition.ReportName}',
                            '${condition.Remark}'
                        );
                   `
                }
            }

            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })


    } catch (e) {
        console.log('updateReport:err=', e);
    }
}


// 添加运维子项
exports.adddevopsLogdetailData = function (req, res, next) {

    let form = new formidable();

    try {
        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';

            sql = `
                INSERT INTO tbdevopslogdetail (
                    DevOpsNum,
                    ItemID,
                    Status,
                    Remark
                )
                VALUES
                    (
                        '${condition.DevOpsNum || 0}',
                        ${condition.ItemID},
                        ${condition.Status},
                        '${condition.Remark}'
                    );
               `
            //    sql += `
            //     INSERT INTO tbdevopslogdetail (DevOpsNum,ItemID,Status,Remark)
            //         VALUES (${condition.DevOpsNum},${condition.ItemID},${condition.Status},${condition.Remark});`;


            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })


    } catch (e) {
        console.log('adddevopsLogdetailData:err=', e);
    }
}
// 修改运维子项
exports.updatedevopsLogdetailData = function (req, res, next) {

    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';

            sql = `UPDATE tbdevopslogdetail
                SET  Status = ${condition.Status},
                Remark = '${condition.Remark}'
                WHERE
                ID = '${condition.ID}' ;`;

            // sql += `
            // INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
            //     VALUES (${condition.ID},${condition.Quantity},'${moment().format('YYYY-MM-DD hh:mm:ss')}');`;

            // sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${condition.PolId}' and Type=6 ;`;

            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })


    } catch (e) {
        console.log('updatedevopsLogdetailData:err=', e);
    }
}

// 添加视频监控
exports.addVideo = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            console.log(fields);
            // sql = "update  globalvar  set value=" + fields.value + " where symbol="+fields.symbol+" "
            // ,  ,                   
            sql = "INSERT INTO tbvideo ( CameraName, AppKey,Secret,PreUrl,ReviewUrl,  SerialNumber, VerificationCode ,  Version, Remark) VALUES ('" + fields.CameraName + "','" + fields.AppKey + "','" + fields.Secret + "','" + fields.PreUrl + "','" + fields.ReviewUrl + "','" + fields.SerialNumber + "','" + fields.VerificationCode + "','" + fields.Version + "','" + fields.Remark + "')"
            console.log("sql", sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })

    } catch (e) {
        console.log('addVideo:err=', e);
    }
}

//修改视频监控
exports.updateVideo = function (req, res, next) {
    var sql;
    let form = new formidable();
    try {

        form.parse(req, function (err, fields, files) {
            console.log(fields);
            sql = "update  tbvideo  set CameraName='" + fields.CameraName + "',AppKey='" + fields.AppKey + "',Secret='" + fields.Secret + "',PreUrl='" + fields.PreUrl + "',ReviewUrl='" + fields.ReviewUrl + "',SerialNumber='" + fields.SerialNumber + "',VerificationCode='" + fields.VerificationCode + "',Version='" + fields.Version + "',Remark='" + fields.Remark + "'  where ID='" + fields.ID + "' "
            // //  console.log("sql",sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })
    } catch (e) {
        console.log('updateVideo:err=', e);
    }
}

//获取备件耗材数据
exports.getSparePartsDatas = function (req, res, next) {
    

    var condition = {
        PolId: req.query.PolId.join('\',\''),
        NameOrStockCode: req.query.NameOrStockCode,
        Category: req.query.Category,
        ExpireTime: req.query.ExpireTime
    };
    var where = " 1=1 "
    if (condition.PolId) {
        where += ` and PolId in ('${condition.PolId}')`
    }
    if (condition.NameOrStockCode) {
        where += ` and  (Name like '%${condition.NameOrStockCode}%' OR StockCode like '%${condition.NameOrStockCode}%')`
    }
    if (condition.Category) {
        where += ` and Category='${condition.Category}'`
    }
    var sql = `select * from tbsparepart where ${where}  ORDER BY SortIndex, UpdateTime desc`;


    //TODO：待定
    // if(!condition.ExpireTime)
    // {

    // }
    console.log('sql=', sql);

    db.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            // console.log(sql);
            res.status(400).send(rows).end();

            return;
        }
        // for (var i = 0; i < rows.length; i++) {
        //     if (rows[i].ImgUrl != " " && rows[i].ImgUrl != "" && rows[i].ImgUrl != null) {
        //         let newRow = rows[i].ImgUrl.substring(0, rows[i].ImgUrl.length - 1).split(";");
        //         for (var k = 0; k < newRow.length; k++) {

        //             newRow[k] = httpUrls + newRow[k];
        //         }
        //         rows[i].ImgUrl = newRow;
        //     }
        // }
        res.status(200).send(rows).end();
    });
}
// 添加/修改报警原因
exports.updatetbhelpguide = function (req, res, next) {

    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';
            if (condition.ID > 0) {
                sql = `UPDATE tbhelpguide
                SET GuideType = '${condition.GuideType}',
                ProblemDes = '${condition.ProblemDes}',
                Solution = '${condition.Solution}',
                ImgUrl='${condition.ImgUrl}',
                AddTime='${moment().format('YYYY-MM-DD HH:mm:ss')}'
                WHERE
                    ID = ${condition.ID} ;`;
                // sql += `
                // INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
                //     VALUES (${condition.ID},${condition.Quantity},'${moment().format('YYYY-MM-DD hh:mm:ss')}');`;

                // sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${condition.PolId}' and Type=6 ;`;
            } else {
                sql = `
                INSERT INTO tbhelpguide (
                    GuideType,
                    ProblemDes,
                    Solution,
                    AddTime
                )
                VALUES
                    (
                        '${condition.GuideType}',
                        '${condition.ProblemDes}',
                        '${condition.Solution}',
                        '${moment().format('YYYY-MM-DD HH:mm:ss')}'
                    );
               `
            }
            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })


    } catch (e) {
        console.log('updatetbhelpguide:err=', e);
    }
}

// 添加/修改备件耗材数据
exports.updateSparePartsData = function (req, res, next) {

    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';
            if (condition.ID > 0) {
                sql = `UPDATE tbsparepart
                SET NAME = '${condition.Name}',
                 ModelNum = '${condition.ModelNum}',
                 StockCode = '${condition.StockCode}',
                 Unit = '${condition.Unit}',
                 Quantity = ${condition.Quantity},
                 Category = ${condition.Category},
                 CycleMonth = ${condition.CycleMonth},
                 CycleNum = ${condition.CycleNum || 0},
                 PolId = '${condition.PolId}',
                 ExpireTime = '${condition.ExpireTime}',
                 ImgUrl= '${condition.imageList}',
                 UpdateTime='${moment().format('YYYY-MM-DD HH:mm:ss')}'
                WHERE
                    ID = ${condition.ID} ;`;
                // sql += `
                // INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
                //     VALUES (${condition.ID},${condition.Quantity},'${moment().format('YYYY-MM-DD hh:mm:ss')}');`;

                // sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${condition.PolId}' and Type=6 ;`;
            } else {
                sql = `
                INSERT INTO tbsparepart (
                    StockCode,
                    NAME,
                    ModelNum,
                    Unit,
                    Quantity,
                    Category,
                    CycleMonth,
                    CycleNum,
                    PolId,
                    ExpireTime,
                    ImgUrl,
                    UpdateTime
                )
                VALUES
                    (
                        '${condition.StockCode || 0}',
                        '${condition.Name}',
                        '${condition.ModelNum}',
                        '${condition.Unit}',
                        ${condition.Quantity},
                        ${condition.Category},
                        ${condition.CycleMonth},
                        ${condition.CycleNum},
                        '${condition.PolId}',
                        '${condition.ExpireTime}',
                        '${condition.imageList}',
                        '${moment().format('YYYY-MM-DD HH:mm:ss')}'
                    );
               `
            }
            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })


    } catch (e) {
        console.log('updateSparePartsData:err=', e);
    }
}


// 更新备件耗材过期时间
exports.updateSparePartsExpireData = function (req, res, next) {
    //更新只替换：更换周期、试剂更换次数、过期时间
    //更新备件表、插入更换记录表、更新仪表日志表，接触预警记录
    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';
            if (condition.ID > 0) {
                // if (condition.Category == 3) {
                //     condition.Category = 0;//试剂预警标识

                //     sql += `UPDATE globalvar
                //     SET value = ${condition.CycleNum}
                //     WHERE
                //         symbol = '${condition.PolName}试剂总量' OR symbol = '${condition.PolName}试剂余量';

                //     UPDATE globalvar
                //     SET value = '${condition.ExpireTime}'
                //     WHERE
                //         symbol = '${condition.PolName}试剂到期时间';`

                // } else {
                //     condition.Category = 3;//耗材预警标识
                // }+
                sql = `UPDATE tbsparepart 
                SET  
                 CycleMonth = ${condition.CycleMonth},
                 CycleNum = ${condition.CycleNum},
                 ExpireTime = '${condition.ExpireTime}',
                 UpdateTime='${moment().format('YYYY-MM-DD HH:mm:ss')}'
                WHERE
                    ID = ${condition.ID} ;`;
                sql += `
                 INSERT INTO tbsparepartuse (SparePartID,UseCount,AddTime)
                     VALUES (${condition.ID},${condition.Quantity},'${moment().format('YYYY-MM-DD HH:mm:ss')}');`;

                sql += ` UPDATE 仪表日志 SET Status = 1 WHERE PolId = '${condition.PolId}' and Type=6 and WarnType=${condition.Category} ;`;


            }
            console.log(sql);
            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });
        })


    } catch (e) {
        console.log('updateSparePartsExpireData:err=', e);
    }
}

//获取首页小铃铛获取预警消息
exports.getWarningDatas = function (req, res, next) {

    var sql = `SELECT * from 仪表日志 where Type=6 AND Status=0 ORDER BY DataTime DESC`;

    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(400).send(rows).end();
            return;
        }
        res.status(200).send(rows).end();
    });
}

//更新预警记录(更换备件、更换试剂、更新运维周期都需要调用此方法)
exports.updateWarningDatas = function (req, res, next) {

    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';
            if (condition.ids.length > 0) {
                sql = `UPDATE 仪表日志
                SET Status = 1 
                
                WHERE
                    id in (${condition.ids}) and Type=6 ;`

                db.query(sql, function (err, fields, files) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.status(200).send(fields).end();
                });

            } else {
                console.log('ids参数不能为空');
                return;
            }
        })
    } catch (e) {
        console.log('updateWarningDatas:err=', e);
    }
}

//更新定点模式参数
exports.updatetbfixedtask = function (req, res, next) {

    let form = new formidable();

    try {

        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';

            sql = `UPDATE tbfixedtask
                SET ${condition.colName}  = '${condition.colData}';
                `
            console.log("sql", sql);

            db.query(sql, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).send(fields).end();
            });


        })
    } catch (e) {
        console.log('updatetbfixedtask:err=', e);
    }
}
