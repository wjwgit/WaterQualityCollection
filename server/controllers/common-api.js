/**
 * 功能业务接口
 */

const moment = require('moment');
const ini = require('ini');
var iconv = require('iconv-lite');
const db = require('../routes/dbRoutes.js');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const _appConfig = require('../appConfig.json');
const { json } = require('body-parser');


//获取预处理方式设置列表
exports.getPretreatment = function (req, res, next) {


	var condition = {};

	var sql = `SELECT * FROM tbfilterplan`;

	console.log('getPretreatment-sql=', sql);

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
//获取离心机启动方案列表
exports.gettbcentrifugeplan = function (req, res, next) {


	var condition = {};

	var sql = `SELECT * FROM tbcentrifugeplan`;

	console.log('getcentrifugeplan-sql=', sql);

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
//修改离心机启动方案列表
exports.updatetbcentrifugeplan = function (req, res, next) {

    let form = new formidable();
    try {
        form.parse(req, function (err, fields, files) {
            let condition = fields;
            let sql = '';

            sql = `
            UPDATE tbcentrifugeplan
            SET 
            MinVal = '${condition.MinVal}',
            MaxVal = '${condition.MaxVal}',
            TP = '${condition.TP}',
            TN = '${condition.TN}',
            NH3 = '${condition.NH3}',
            COD = '${condition.COD}',
            CODCR = '${condition.CODCR}'
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
//获取自检数据列表
exports.getZJSJData = function (req, res, next) {

	//默认查询近3个月的数据
	var condition = {
		StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
		PageIndex: req.query.PageIndex || 0,
		PageSize: req.query.PageSize || 20
	};

	var where = ` where 1=1 and DataTime >= '${condition.StartDate}' AND DataTime <= '${condition.EndDate}'`;

	if (req.query.PolId) {
		where += ` and Pol='${req.query.PolId}'`;
	}

	var sql = `SELECT * FROM 仪表自检  ${where} ORDER BY  DataTime DESC LIMIT ${condition.PageIndex},${condition.PageSize};
	SELECT count(0) as total FROM 仪表自检 ${where};
	`;

	console.log('getZJSJData-sql=', sql);

	db.query(sql, function (err, rows, fields) {
		if (err) {
			console.log(err);
			// console.log(sql);
			res.status(500).send(rows).end();
			return;
		}
		res.status(200).send(rows).end();
	});
}

// 批量添加比对数据
exports.addCompareList = function (req, res, next) {

	var sql = '';
	let form = new formidable();
	try {
		form.parse(req, function (err, fields, files) {
			console.log(fields);
			let condition = eval(fields.compareArray);
			condition.map(function (item) {
				sql += `
				INSERT INTO tbquartercompare (
					DataTime,
					PolId,
					AutoValue,
					ManualValue,
					CompareValue,
					CompareResult,
					DataType,
					TestOrder
				)
				VALUES
					(
						'${item.DataTime}',
						'${item.PolId}',
						${item.AutoValue},
						${item.ManualValue},
						${item.CompareValue},
						${item.CompareResult},
						${item.DataType},
						${item.TestOrder}
					);
					`;
			})

			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
				// res.status(200).send(fields).end();
			});
		})
	} catch (e) {
		console.log('addCompare:err=', e);
	}
}

// 读取appconfig.json
exports.getAppConfig = function (req, res, next) {

	// const _appConfigurl = path.join(__dirname, _appConfig._appConfigurl);

	// console.log('_appConfigurl1=',path.resolve(_appConfigurl));

	console.log('_appConfigurl=', path.resolve(_appConfig._appConfigurl));


	var data = fs.readFileSync(path.resolve(_appConfig._appConfigurl), 'utf-8');
	console.log('_appConfigData=', JSON.parse(data));

	res.json({ Code: 200, Msg: '保存成功', Data: JSON.parse(data) });
}


// 读取ini配置文件
exports.getInIConfig = function (req, res, next) {

	console.log('sysIniUrl=', path.resolve(_appConfig.sysIniUrl));

	let data = fs.readFileSync(path.resolve(_appConfig.sysIniUrl));
	var str = iconv.decode(data, 'GB2312');
	const Info = ini.parse(str);

	console.log('getInIConfig=', Info);

	res.json({ Code: 200, Msg: '操作成功', Data: Info.config });
}

//获取前后端配置文件
exports.getSysConfig = function (req, res, next) {

	try {
		console.log('clientConfigUrl=', path.resolve(_appConfig._appConfigurl));
		console.log('serverConfingUrl=', path.resolve(_appConfig.sysIniUrl));
		//读取前端配置文件
		var clientConfigInfo = fs.readFileSync(path.resolve(_appConfig._appConfigurl), 'utf-8');

		// if(!clientConfigInfo['customPointName'])
		// {
		// 	clientConfigInfo['customPointName']='';
		// }
		
		console.log('clientConfigInfo=', clientConfigInfo);
		//读取后端ini文件
		let data = fs.readFileSync(path.resolve(_appConfig.sysIniUrl));
		let serverConfingInfo = ini.parse(iconv.decode(data, 'GB2312'));

		console.log('serverConfingInfo=', serverConfingInfo.config);
		
		serverConfingInfo.config.InstallDate = serverConfingInfo.update.InstallDate;

		res.json({
			Code: 200, Msg: '操作成功', Data: {
				clientConfigInfo: JSON.parse(clientConfigInfo),
				serverConfingInfo: serverConfingInfo.config
			}
		});
	} catch (error) {
		console.log('getSysConfig-error=', error);
		res.json({
			Code: 500, Msg: '操作失败', Data: {
				clientConfigInfo: {},
				serverConfingInfo: {}
			}
		});
	}

}

/**
 * 保存ini文件
 * @param {*} req 
 * @param {*} res 
 */
exports.postSaveINI = async function (req, res) {
	let form = new formidable();
	form.parse(req, function (err, fields, files) {
		try {
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				FormDatas: eval(fields.FormDatas),
			};
			// const iopath = path.join(__dirname, appconfig.sysIniUrl); // 引用Pos.ini的相对地址
			const iopath = path.resolve(_appConfig.sysIniUrl);

			const Info = ini.parse(iconv.decode(fs.readFileSync(iopath), 'GB2312'));
			//增加系统安装时间
			if (!Info.update.InstallDate) {
				Info.update.InstallDate = moment().format('YYYY-MM-DD HH:mm:ss');
			}

			Info.config = fields;
			Info.config.RunMode = true;
			Info.config.DBBakHour = fields.DBBakDateTime.split(':')[0];
			Info.config.DBBakMinute = fields.DBBakDateTime.split(':')[1];
			Info.config.MySQLDir = "C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\";
			// _config.DBIP = fields.DBIP;
			// _config.DBPort = fields.DBPort;
			// _config.DBUID = fields.DBUID;
			// _config.DBPWD = fields.DBPWD;
			// _config.DBName = fields.DBName;
			// _config.DBBakHour = fields.DBBakHour;
			// _config.DBBakMinute = fields.DBBakMinute;
			// _config.RunMode = fields.RunMode;
			// _config.Cycle = fields.Cycle;
			// _config.WebSocket_WS = fields.WebSocket_WS;
			// _config.ScanType = fields.ScanType;
			// _config.PLC = fields.PLC;
			// _config.Drivers_Dir = fields.Drivers_Dir;
			// _config.KeepLogDays = fields.KeepLogDays;
			// _config.MeterVersion = fields.MeterVersion;
			// _config.AutoUpRepairDays = fields.AutoUpRepairDays;
			// _config.ResUpLogStorage = fields.ResUpLogStorage;
			// _config.MachineCode = fields.MachineCode;
			// _config.SoftKey = fields.SoftKey;
			// _config.Version = fields.Version;
			// _config.MySQLDir = fields.MySQLDir;
			// _config.SoftType = fields.SoftType;
			// _config.ProName = fields.ProName;
			// _config.ProType = fields.ProType;
			// _config.ProCode = fields.ProCode;


			let IniData = ini.stringify(Info);
			var iniList = iconv.encode(IniData, 'GB2312');

			fs.writeFileSync(path.resolve(iopath), iniList, { flag: 'w+', encoding: 'ascii' })
			res.json({
				Code: 200, Msg: '配置文件修改成功，请重启软件', Data: {}
			});
		}
		catch (error) {
			res.json({
				Code: 500, Msg: '配置文件修改失败,请联系管理员', Data: {}
			});
			console.log('postSaveINI=', error)
		}
	})
}

//pdf路径
// exports.getpdfURL = function (req, res, next){
// 	let form = new formidable();
// 	form.parse(req, function (err, fields, files) {
// 		console.log(path.resolve(fields.PDFUrl));
	
// 		res.status(200).send(path.resolve(fields.PDFUrl)).end();
// 	})
// }