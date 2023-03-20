/**
 * 运维功能相关业务接口
 */

const moment = require('moment');
const db = require('../routes/dbRoutes.js');
const formidable = require('formidable');

//废液储存
//列表
exports.getYW_FYCCList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}

	var sql = `SELECT * FROM tbywfycc ${where}`;

	console.log('getYW_FYCCList-sql=', sql);

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
//批量更新
exports.updateYW_FYCCList = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				FormDatas: eval(fields.FormDatas),
			};
			var sql = `DELETE FROM tbywfycc where FID='${condition.DevOpsNum}';`;
			condition.FormDatas.map(function (item) {


				sql += `
				INSERT INTO tbywfycc (
					id,
					FID,
					Code,
					EntName,
					OptCompanyName,
					SiteAddress,
					OptUserName,
					FYStorageDate,
					Name,
					DisposalMethod,
					Unit,
					Quantity,
					Remark,
					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${item.EntName}', 
				'${item.OptCompanyName}', 
				'${item.SiteAddress}', 
				'${item.OptUserName}', 
				'${item.FYStorageDate}', 
				'${item.Name}', 
				'${item.DisposalMethod}', 
				'${item.Unit}', 
				'${item.Quantity}', 
				'${item.Remark}', 
				'${item.CreateName}', 
				'${item.CreateDate}', 
				'${item.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			});
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_FYCCList:err=', e);
	}
}

//废液处置
//列表
exports.getYW_FYCZList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}

	var sql = `SELECT * FROM tbywfycz ${where}`;

	console.log('getYW_FYCZList-sql=', sql);

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
//批量更新
exports.updateYW_FYCZList = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				FormDatas: eval(fields.FormDatas),
			};
			var sql = `DELETE FROM tbywfycz where FID='${condition.DevOpsNum}';`;
			condition.FormDatas.map(function (item) {
				sql += `
				INSERT INTO tbywfycz (
					id,
					FID,
					Code,
					EntName,
					OptCompanyName,
					SiteAddress,
					OptUserName,
					HandlDate,
					Name,
					DisposalMethod,
					Unit,
					Quantity,
					ReceiveUserName,
					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${item.EntName}', 
				'${item.OptCompanyName}', 
				'${item.SiteAddress}', 
				'${item.OptUserName}', 
				'${item.HandlDate}', 
				'${item.Name}', 
				'${item.DisposalMethod}', 
				'${item.Unit}', 
				'${item.Quantity}', 
				'${item.ReceiveUserName}', 
				'${item.CreateName}', 
				'${item.CreateDate}', 
				'${item.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			});
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_FYCCList:err=', e);
	}
}

//标准溶液
//列表
exports.getYW_BZRYList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}

	var sql = `SELECT * FROM tbywbzryhc ${where}`;

	console.log('getYW_BZRYList-sql=', sql);

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

//标样核查
//列表
exports.getYW_BYHCList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DataTime: req.query.hechaTime,
		Pol: req.query.Pol,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DataTime) {
		where += ` AND DataTime like'${condition.DataTime}%'`;
	}
	if (condition.Pol) {
		where += ` AND Pol ='${condition.Pol}'`;

	}

	var sql = `SELECT * FROM 标样核查 ${where}`;

	console.log('getYW_BYHCList-sql=', sql);

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

//批量更新
exports.updateYW_BYHCList = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				FormDatas: eval(fields.FormDatas),
			};
			var sql = `DELETE FROM tbywbzryhc where FID='${condition.DevOpsNum}';`;
			condition.FormDatas.map(function (item) {
				sql += `
				INSERT INTO tbywbzryhc (
					id,
					FID,
					Code,
					EntName,
					OptCompanyName,
					SiteAddress,
					OptUserName,
					CompleteDate,
					Name,
					Unit,
					StandardValue,
					YQTestValue,
					TestRrror,
					RequireInfo,
					Status,
					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${item.EntName}', 
				'${item.OptCompanyName}', 
				'${item.SiteAddress}', 
				'${item.OptUserName}', 
				'${item.CompleteDate}', 
				'${item.Name}', 
				'${item.Unit}', 
				'${item.StandardValue}', 
				'${item.YQTestValue}', 
				'${item.TestRrror}', 
				'${item.RequireInfo}', 
				${item.Status}, 

				'${item.CreateName}', 
				'${item.CreateDate}', 
				'${item.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			});
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_FYCCList:err=', e);
	}
}

//标准样品
//列表
exports.getYW_BZYPList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}

	var sql = `SELECT * FROM tbywbzypgh ${where}`;

	console.log('getYW_BZYPList-sql=', sql);

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

//批量更新
exports.updateYW_BZYPList = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				FormDatas: eval(fields.FormDatas),
			};
			var sql = `DELETE FROM tbywbzypgh where FID='${condition.DevOpsNum}';`;
			condition.FormDatas.map(function (item) {
				sql += `
				INSERT INTO tbywbzypgh (
					id,
					FID,
					Code,
					EntName,
					OptCompanyName,
					SiteAddress,
					OptUserName,
					Name,
					ConcentrationValue,
					ConfigDate,
					ConfigUserName,
					ChangeDate,
					ChangeUserName,
					Quantity,

					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${item.EntName}', 
				'${item.OptCompanyName}', 
				'${item.SiteAddress}', 
				'${item.OptUserName}', 

				'${item.Name}', 
				${item.ConcentrationValue}, 
				'${item.ConfigDate}', 
				'${item.ConfigUserName}', 
				'${item.ChangeDate}', 
				'${item.ChangeUserName}', 
				'${item.Quantity}', 

				'${item.CreateName}', 
				'${item.CreateDate}', 
				'${item.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			});
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_FYCCList:err=', e);
	}
}

//标样校准
//列表
exports.getYW_BYJZList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		YQName:req.query.YQName
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}
	if(condition.YQName!=''){
		where += ` AND YQName='${condition.YQName}'`;

	}

	var sql = `SELECT * FROM tbywbyhcjzjg ${where}`;

	console.log('getYW_BYJZList-sql=', sql);

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

//批量更新
exports.updateYW_BYJZList = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				YQName:fields.YQName,
				FormDatas: JSON.parse(fields.FormDatas),
			};

			let ThisCheckDate = condition.FormDatas.ThisCheckDate == '' ? null : "'" + condition.FormDatas.ThisCheckDate + "'"; //condition.FormDatas.ThisCheckDate
			condition.FormDatas.ThisCheckValue = condition.FormDatas.ThisCheckValue == '' ? null : condition.FormDatas.ThisCheckValue;
			// condition.FormDatas.ThisCheckDate=condition.FormDatas.ThisCheckDate==''?null:condition.FormDatas.ThisCheckDate;
			let FirstCalibrationDate = condition.FormDatas.FirstCalibrationDate == '' ? null : "'" + condition.FormDatas.FirstCalibrationDate + "'";
			let FirstCalibrationType = condition.FormDatas.FirstCalibrationType == '' ? null : "'" + condition.FormDatas.FirstCalibrationType + "'";

			//  condition.FormDatas.FirstCalibrationDate=condition.FormDatas.FirstCalibrationDate==''?null:condition.FormDatas.FirstCalibrationDate;
			condition.FormDatas.FirstCalibrationType = condition.FormDatas.FirstCalibrationType == '' ? null : condition.FormDatas.FirstCalibrationType;
			// condition.FormDatas.FirstCalibrationDate=condition.FormDatas.FirstCalibrationDate==''?null:condition.FormDatas.FirstCalibrationDate;

			let SecondCalibrationDate = condition.FormDatas.SecondCalibrationDate == '' ? null : "'" + condition.FormDatas.SecondCalibrationDate + "'";
			let SecondCalibrationType = condition.FormDatas.SecondCalibrationType == '' ? null : "'" + condition.FormDatas.SecondCalibrationType + "'";
			condition.FormDatas.SecondCalibrationType = condition.FormDatas.SecondCalibrationType == '' ? null : condition.FormDatas.SecondCalibrationType;

			let NextCheckDate = condition.FormDatas.NextCheckDate == '' ? null : "'" + condition.FormDatas.NextCheckDate + "'";
			condition.FormDatas.NextCheckValue = condition.FormDatas.NextCheckValue == '' ? null : condition.FormDatas.NextCheckValue;
			// condition.FormDatas.NextCheckDate=condition.FormDatas.NextCheckDate==''?null:condition.FormDatas.NextCheckDate;
			condition.FormDatas.ThisCheckStatus = condition.FormDatas.ThisCheckStatus == '' ? null : condition.FormDatas.ThisCheckStatus == '合格' ? 1 : 0
			condition.FormDatas.FirstCalibrationStatus = condition.FormDatas.FirstCalibrationStatus == '' ? null : condition.FormDatas.FirstCalibrationStatus == '通过' ? 1 : 0
			condition.FormDatas.SecondCalibrationStatus = condition.FormDatas.SecondCalibrationStatus == '' ? null : condition.FormDatas.SecondCalibrationStatus == '通过' ? 1 : 0

			condition.FormDatas.NextCheckStatus = condition.FormDatas.NextCheckStatus == '' ? null : condition.FormDatas.NextCheckStatus == '合格' ? 1 : 0



			var sql = `DELETE FROM tbywbyhcjzjg where FID='${condition.DevOpsNum}' and YQName ='${condition.YQName}';`;
			// condition.FormDatas.map(function (item) {
			sql += `
				INSERT INTO tbywbyhcjzjg (
					id,
					FID,
					Code,
					SiteAddress,
					YQName,
					OptCompanyName,
					YQModel,
					YQNumber,

					ThisCheckDate,
					ThisCheckValue,
					ThisCheckStatus,
					FirstCalibrationDate,
					FirstCalibrationType,
					FirstCalibrationStatus,
					SecondCalibrationDate,
					SecondCalibrationType,
					SecondCalibrationStatus,
					NextCheckDate,
					NextCheckValue,
					NextCheckStatus,

					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${condition.FormDatas.SiteAddress}', 
				'${condition.FormDatas.YQName}', 
				'${condition.FormDatas.OptCompanyName}', 
				'${condition.FormDatas.YQModel}', 
				'${condition.FormDatas.YQNumber}', 

				 ${ThisCheckDate}, 
				 ${condition.FormDatas.ThisCheckValue}, 
				 ${condition.FormDatas.ThisCheckStatus}, 
				${FirstCalibrationDate}, 
				${FirstCalibrationType}, 
				 ${condition.FormDatas.FirstCalibrationStatus}, 
				${SecondCalibrationDate}, 
				${SecondCalibrationType}, 
				 ${condition.FormDatas.SecondCalibrationStatus}, 
				${NextCheckDate}, 
			  	${condition.FormDatas.NextCheckValue}, 
				 ${condition.FormDatas.NextCheckStatus}, 

				'${condition.FormDatas.CreateName}', 
				'${condition.FormDatas.CreateDate}', 
				'${condition.FormDatas.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			// });
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_FYCCList:err=', e);
	}
}

//易耗品更换
//列表
exports.getYW_YHPGHList = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}

	var sql = `SELECT * FROM tbywyhpgh ${where}`;

	console.log('getYW_YHPGHList-sql=', sql);

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

//批量更新
exports.updateYW_YHPGHList = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,
				FormDatas: eval(fields.FormDatas),
			};
			var sql = `DELETE FROM tbywyhpgh where FID='${condition.DevOpsNum}';`;
			condition.FormDatas.map(function (item) {
				sql += `
				INSERT INTO tbywyhpgh (
					id,
					FID,
					Code,
					EntName,
					OptCompanyName,
					SiteAddress,
					OptUserName,
					Name,
					Model,
					Unit,
					Quantity,
					Remark,

					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${item.EntName}', 
				'${item.OptCompanyName}', 
				'${item.SiteAddress}', 
				'${item.OptUserName}', 

				'${item.Name}', 
				${item.Model}, 
				'${item.Unit}', 
				'${item.Quantity}', 
				'${item.Remark}', 
		
				'${item.CreateName}', 
				'${item.CreateDate}', 
				'${item.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			});
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_YHPGHList:err=', e);
	}
}


//设备检修
//列表
exports.getYW_SBJX1List = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		YQName:req.query.YQName

		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND FID='${condition.DevOpsNum}'`;
	}
	if(condition.YQName!=''){
		where += ` AND YQName='${condition.YQName}'`;

	}
	var sql = `SELECT * FROM tbywsbjx1 ${where}`;

	console.log('getYW_SBJX1List-sql=', sql);

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


//批量更新
exports.updateYW_SBJX1List = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum, 
				YQName:fields.YQName,
				FormDatas: JSON.parse(fields.FormDatas),
			};

			let YQInstallDate = condition.FormDatas.YQInstallDate == '' ? null : "'" + condition.FormDatas.YQInstallDate + "'";

			
			var sql = `DELETE FROM tbywsbjx1 where FID='${condition.DevOpsNum}' and YQName ='${condition.YQName}';`;

			sql += `
				INSERT INTO tbywsbjx1 (
					id,
					FID,
					Code,
					EntName,
					OptCompanyName,
					SiteAddress,
					OptUserName,

					YQName,
					YQModel,
					YQNumber,
					YQInstallDate,
					FaultRemark,
					RepairRemark,
					NormalRemark,

					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${condition.FormDatas.EntName}', 
				'${condition.FormDatas.OptCompanyName}', 
				'${condition.FormDatas.SiteAddress}', 
				'${condition.FormDatas.OptUserName}', 

				'${condition.FormDatas.YQName}', 
				'${condition.FormDatas.YQModel}', 
				'${condition.FormDatas.YQNumber}', 
				${YQInstallDate}, 
				'${condition.FormDatas.FaultRemark}', 
				'${condition.FormDatas.RepairRemark}', 
				'${condition.FormDatas.NormalRemark}', 
		
				'${condition.FormDatas.CreateName}', 
				'${condition.FormDatas.CreateDate}', 
				'${condition.FormDatas.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_SBJX1List:err=', e);
	}
}

//设备检修2
//列表
exports.getYW_SBJX2List = function (req, res, next) {

	//巡检记录单号
	var condition = {
		DevOpsNum: req.query.DevOpsNum,
		// StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		// EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
	};

	//var where = ` where 1=1 AND FID='${condition.DevOpsNum}' and CreateDate >= '${condition.StartDate}' AND CreateDate <= '${condition.EndDate} 23:59:59'`;
	var where = ` where 1=1`;
	if (condition.DevOpsNum) {
		where += ` AND a.FID='${condition.DevOpsNum}'`;
	}

	var sql = `SELECT
	a.SiteAddress,
	a.DownTime,
	a.StationClean,
	a.DownTimeRemark,
	a.Remark,
	b.YQName,
	b.ProjectName,
	b.ProjectValue,
	b.ProjectValueNum,
	b.ProjectValueCode
FROM
	tbywsbjx2main a

INNER JOIN tbywsbjx2sub b ON a.FID = b.FID  ${where}`;

	console.log('getYW_SBJX2List-sql=', sql);

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

//批量更新
exports.updateYW_SBJX2List = function (req, res, next) {
	let form = new formidable();
	try {

		form.parse(req, function (err, fields, files) {
			console.log(fields);
			var condition = {
				DevOpsNum: fields.DevOpsNum,

				jianXiuLog: JSON.parse(fields.jianXiuLog),
				FormDatas: JSON.parse(fields.FormDatas),
			};

			let DownTime = condition.jianXiuLog.DownTime == '' ? null : "'" + condition.jianXiuLog.DownTime + "'";


			var sql = `DELETE FROM tbywsbjx2main where FID='${condition.DevOpsNum}';`;

			sql += `
				INSERT INTO tbywsbjx2main (
					id,
					FID,
					Code,
					SiteAddress,
					DownTime,

					StationClean,
					DownTimeRemark,
					Remark,

					CreateName,
					CreateDate,
					UpdateName,
					UpdateDate
				) VALUES 
				(null, 
				'${condition.DevOpsNum}', 
				null, 
				'${condition.jianXiuLog.SiteAddress}', 
				${DownTime}, 
			
				'${condition.jianXiuLog.StationClean}', 
				'${condition.jianXiuLog.DownTimeRemark}', 
				'${condition.jianXiuLog.Remark}', 
		
				'${condition.jianXiuLog.CreateName}', 
				'${condition.jianXiuLog.CreateDate}', 
				'${condition.jianXiuLog.UpdateName}', 
				'${moment().format("YYYY-MM-DD HH:mm:ss")}');
					`;
			sql += `DELETE FROM tbywsbjx2sub where FID='${condition.DevOpsNum}';`;
			condition.FormDatas.map(function (item) {
				item.childs.map(function (child) {
					sql += `
							INSERT INTO tbywsbjx2sub (
								id,
								FID,
	
								YQName,
								ProjectName,
								ProjectValue,
								ProjectValueNum,
								ProjectValueCode,
						
			
								CreateName,
								CreateDate,
								UpdateName,
								UpdateDate
							) VALUES 
							(null, 
							'${condition.DevOpsNum}', 
							
							'${item.YQName}', 

							'${child.ProjectName}', 
							'${child.ProjectValue}', 
							'${child.ProjectValueNum}', 
							'${child.ProjectValueCode}', 
						
							'${item.CreateName}', 
							'${item.CreateDate}', 
							'${item.UpdateName}', 
							'${moment().format("YYYY-MM-DD HH:mm:ss")}');
								`;
				})

			});
			if (condition.FormDatas.length == 0) {
				res.json({ Code: 500, Msg: '数据不能为空', Data: [] });
				return;
			}
			console.log("sql", sql);
			db.query(sql, function (err, fields, files) {
				if (err) {
					console.log(err);
					return;
				}
				res.json({ Code: 200, Msg: '保存成功', Data: [] });
			});
		})
	} catch (e) {
		console.log('updateYW_SBJX1List:err=', e);
	}
}