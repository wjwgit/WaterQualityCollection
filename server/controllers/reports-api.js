/**
 * 报表统计 sbgl-api  getAllReports(type) 日、月、年， param
 */


const moment = require('moment');

const db = require('../routes/dbRoutes.js');
const formidable = require('formidable');

//总磷：w21011、总氮：w21001、氨氮：w21003、、化学需氧量：w01018 、pH 值：w01001

//查询日月年统计数据
exports.getTJData = function (req, res, next) {
	let tableName = '';
	let wherestr = ' 1=1';
	// if()
	// wherestr += ' and sa=' + 123;
	if (req.query.defaultDateType == "5") {
		tableName = "tbhourdata";
	} else if (req.query.defaultDateType == "6") {
		tableName = "tbdaydata";
	} else if (req.query.defaultDateType == "7") {
		tableName = "tbmonthdata";
	}
	if (req.query.condition != '') {
		//     "DataTime like '%" +
		//     this.dateValue +
		//     "%'" + " ORDER BY DataTime ";
		wherestr += ` and DataTime like '%${req.query.condition}%' `
	}
	// UNION ALL
	//SELECT '样本数',count(w21011_Cvd),NULL,count(w21001_Cvd),NULL,count(w21003_Cvd),NULL,count(w01018_Cvd),NULL,count(w01001_Cvd),NULL FROM ${tableName} where ${wherestr}

	var sql;
	sql = `SELECT DataTime,w21011_Cvd,w21011_Cou,w21001_Cvd,w21001_Cou,w21003_Cvd,w21003_Cou,w01018_Cvd,w01018_Cou ,w01001_Cvd ,w00000_Cou,CumulativeFlow      FROM    ${tableName} where ${wherestr}
	UNION ALL
	SELECT '平均值',avg(w21011_Cvd), NULL,avg(w21001_Cvd),NULL,avg(w21003_Cvd),NULL,avg(w01018_Cvd),NULL,avg(w01001_Cvd),avg(w00000_Cou),NULL FROM ${tableName} where ${wherestr}
	UNION ALL
SELECT '最大值',MAX(w21011_Cvd),NULL,MAX(w21001_Cvd),NULL,MAX(w21003_Cvd),NULL,MAX(w01018_Cvd),NULL,MAX(w01001_Cvd) ,MAX(w00000_Cou),NULL FROM ${tableName}  where ${wherestr}
UNION ALL
SELECT '最小值',min(w21011_Cvd),NULL,min(w21001_Cvd),NULL,min(w21003_Cvd),NULL ,min(w01018_Cvd),NULL,min(w01001_Cvd),min(w00000_Cou),NULL FROM ${tableName} where ${wherestr}
UNION ALL
SELECT '总量',NULL,sum(w21011_Cou),NULL,sum(w21001_Cou),NULL,sum(w21003_Cou) ,NULL,sum(w01018_Cou),NULL,sum(w00000_Cou),sum(CumulativeFlow)   FROM ${tableName} where ${wherestr} `;


// 四川定制污染源
// sql = `SELECT DataTime,w21011_Cvd,w21011_Cou,w21001_Cvd,w21001_Cou,w21003_Cvd,w21003_Cou,w01018_Cvd,w01018_Cou ,w01001_Cvd ,w01010_Cvd ,w00000_Cou ,w22001_Cvd ,w01012_Cvd  ,CumulativeFlow      FROM    ${tableName} where ${wherestr}
// UNION ALL
// SELECT '平均值',avg(w21011_Cvd), NULL,avg(w21001_Cvd),NULL,avg(w21003_Cvd),NULL,avg(w01018_Cvd),NULL,avg(w01001_Cvd) ,avg(w01010_Cvd),avg(w00000_Cou),avg(w22001_Cvd),avg(w01012_Cvd) ,NULL FROM ${tableName} where ${wherestr}
// UNION ALL
// SELECT '最大值',MAX(w21011_Cvd),NULL,MAX(w21001_Cvd),NULL,MAX(w21003_Cvd),NULL,MAX(w01018_Cvd),NULL,MAX(w01001_Cvd),MAX(w01010_Cvd) ,MAX(w00000_Cou) ,MAX(w22001_Cvd),MAX(w01012_Cvd) ,NULL FROM ${tableName}  where ${wherestr}
// UNION ALL
// SELECT '最小值',min(w21011_Cvd),NULL,min(w21001_Cvd),NULL,min(w21003_Cvd),NULL ,min(w01018_Cvd),NULL,min(w01001_Cvd) ,min(w01010_Cvd),min(w00000_Cou) ,min(w22001_Cvd) ,min(w01012_Cvd),NULL FROM ${tableName} where ${wherestr}
// UNION ALL
// SELECT '总量',NULL,sum(w21011_Cou),NULL,sum(w21001_Cou),NULL,sum(w21003_Cou) ,NULL,sum(w01018_Cou),NULL ,sum(w01010_Cvd),sum(w00000_Cou) ,sum(w22001_Cvd) ,sum(w01012_Cvd),sum(CumulativeFlow)   FROM ${tableName} where ${wherestr} `;

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

// 污染源： 查询实时，分钟，小时，周期分页数据
exports.getTablePageData = function (req, res, next) {
	let tableName = '';
	let wherestr = ' 1=1';

	// 实时
	if (req.query.defaultDateType == "1") {
		tableName = "tbrealtimedata";
	}
	// 分钟
	else if (req.query.defaultDateType == "2") {
		tableName = "tbmindata";
	}
	// 小时
	else if (req.query.defaultDateType == "3") {
		tableName = "tbhourdata";
	}
	// 周期
	else if (req.query.defaultDateType == "4") {
		tableName = "小时数据";
	}
	// if (req.query.startTime != '') {
	// "DataTime BETWEEN '" +
	// this.dateValues[0] +
	// "' and '" +
	// this.dateValues[1] +
	// "'" + " ORDER BY `DataTime` DESC  ";
	wherestr += ` and DataTime BETWEEN '${req.query.startTime}' and '${req.query.endTime}' ORDER BY DataTime DESC`;
	// }



	var sql;
	if (req.query.pageSize > 0) {

		sql = `SELECT * FROM    ${tableName} INNER JOIN (SELECT DataTime from ${tableName}  where ${wherestr}   LIMIT ${req.query.pageIndex},${req.query.pageSize})AS b USING(DataTime) ; `;
		sql += ` SELECT count(*) as dataTotal FROM    ${tableName} where ${wherestr}`;
	} else {
		sql = `SELECT * FROM    ${tableName} where ${wherestr} `;
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

//地表水：实时、小时（周期测量数据）
exports.getjcsjTable = function (req, res, next) {
	let tableName = '';
	let wherestr = ' 1=1';

	// 实时
	if (req.query.defaultDateType == 1) {
		tableName = "实时数据";
	}
	// 小时
	else if (req.query.defaultDateType == 2) {
		tableName = "小时数据a";
	}

	wherestr += ` and DataTime BETWEEN '${req.query.startTime}' and '${req.query.endTime}' ORDER BY DataTime DESC`;

	var sql;
	if (req.query.pageSize > 0) {

		sql = `SELECT * FROM    ${tableName} INNER JOIN (SELECT DataTime from ${tableName}  where ${wherestr}   LIMIT ${req.query.pageIndex},${req.query.pageSize})AS b USING(DataTime) ; `;
		sql += ` SELECT count(*) as dataTotal FROM    ${tableName} where ${wherestr}`;
	} else {
		sql = `SELECT * FROM    ${tableName} where ${wherestr} `;
	}

	console.log('getjcsjTable-sql=', sql);

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


// //默认查询近3个月的数据
// var condition = {
// 	StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
// 	EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
// 	PageIndex: req.query.PageIndex || 0,
// 	PageSize: req.query.PageSize || 20
// };

//质控数据查询
exports.getZkcxTable = function (req, res, next) {
	var condition = {
		defaultDataType: req.query.defaultDataType || 1,
		startTime: req.query.startTime || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		endTime: req.query.endTime || moment().endOf("month").format("YYYY-MM-DD"),
		Pol: req.query.jcyz || '',
		pageIndex: req.query.pageIndex || 1,
		pageSize: req.query.pageSize
	};

	let tableName = '';
	let wherestr = ' 1=1';

	// 实时
	if (condition.defaultDataType == 1) {
		tableName = "水样测量";
	}
	else if (condition.defaultDataType == 2) {
		tableName = "标样核查";
	}
	else if (condition.defaultDataType == 3) {
		tableName = "零点核查";
	}
	else if (condition.defaultDataType == 4) {
		tableName = "跨度核查";
	}
	else if (condition.defaultDataType == 5) {
		tableName = "空白测试";
	}
	else if (condition.defaultDataType == 6) {
		tableName = "平行样";
	}
	else if (condition.defaultDataType == 7) {
		tableName = "加标回收";
	}
	else if (condition.defaultDataType == 8) {
		tableName = "仪表校准";
	}
	if (condition.Pol != '') {
		wherestr += ` and Pol = '${condition.Pol}' `;

	}
	wherestr += ` and a.DataTime BETWEEN '${condition.startTime} 00:00:00' and '${condition.endTime} 23:59:59' ORDER BY a.DataTime DESC`;

	var sql;
	if (condition.pageSize > 0) {

		if (condition.defaultDataType == 7) {

			sql = `SELECT DataTime,Pol,WaterTime,Water,a.Check,Volume,Chroma,(Volume+DVolume) as DVolume,Flag,P FROM    ${tableName} as a 
			WHERE ${wherestr}  LIMIT ${condition.pageIndex},${condition.pageSize}
			; `;
			sql += ` SELECT count(*) as dataTotal FROM    ${tableName} as a where ${wherestr}`;

		} else {
			sql = `SELECT *,a.DataTime as DataTime FROM    ${tableName} as a 
			left  JOIN 上传参数 as b on a.DataTime=b.DataTime and a.Pol=CONVERT(b.PolID USING utf8) COLLATE utf8_unicode_ci  
			WHERE ${wherestr}  LIMIT ${condition.pageIndex},${condition.pageSize}
			; `;
			sql += ` SELECT count(*) as dataTotal FROM    ${tableName} as a 
			left  JOIN 上传参数 as b on a.DataTime=b.DataTime and a.Pol=CONVERT(b.PolID USING utf8) COLLATE utf8_unicode_ci  
			where ${wherestr}`;
		}

	} else {

		if (condition.defaultDataType == 7) {
			sql = `SELECT DataTime,Pol,WaterTime,Water,a.Check,Volume,Chroma,(Volume+DVolume) as DVolume,Flag,P FROM    ${tableName} as a 
			WHERE ${wherestr}  
			; `;
		} else {
			sql = `SELECT *,a.DataTime as DataTime FROM    ${tableName} as a left  JOIN 上传参数 as b on a.DataTime=b.DataTime and a.Pol=CONVERT(b.PolID USING utf8) COLLATE utf8_unicode_ci  where ${wherestr} `;

		}

	}

	console.log('getjcsjTable-sql=', sql);

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

// 上报数据
exports.getSbsjTable = function (req, res, next) {




	var condition = {
		startTime: req.query.startTime || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		endTime: req.query.endTime || moment().endOf("month").format("YYYY-MM-DD"),
		Platformid: req.query.Platformid || '',
		stateType: req.query.stateType || '',
		suorceType: req.query.suorceType || '',
		content: req.query.content || '',
		pageIndex: req.query.pageIndex || 1,
		pageSize: req.query.pageSize
	};


	let wherestr = ' 1=1';
	
	// select t.*,c.`PlatformName`  from 
	// (SELECT * FROM tbuplog AS a WHERE AddTime BETWEEN '2022-11-21 13:51:12' and '2022-11-22 13:51:12' 
	// and Status = '-2' and Source = '1' and DataPacket like '%=202211221350%' 
	// and  IPEndPoint = '172.16.22.15:4015' ORDER BY addtime DESC LIMIT  0,30 )
	//  AS t LEFT JOIN `tbupconfig` c ON t.IPEndPoint = CONCAT(c.PlatformIP,':',c.PlatformPort)   
	wherestr += ` and  AddTime BETWEEN '${condition.startTime} 00:00:00' and '${condition.endTime} 23:59:59'`;
	if (condition.stateType != "") {
        wherestr +=  ` and Status =${condition.stateType}`;
      }
      if (condition.suorceType != "") {
        wherestr += ` and Source =${condition.suorceType} `;
      }
      if (condition.content != "") {
        wherestr += `and DataPacket like  '%${condition.content}%' `;
      }
      // 分页后查询
      if (condition.Platformid != "") {
        wherestr += ` and  IPEndPoint =${condition.Platformid} `;
      }
	
	var sql;
	if (condition.pageSize > 0) {

		sql = `SELECT t.*,c.PlatformName as PlatformName FROM (SELECT * FROM tbuplog AS a WHERE  ${wherestr} ORDER BY addtime DESC  LIMIT ${condition.pageIndex},${condition.pageSize} )
	    	AS t LEFT JOIN tbupconfig c ON t.IPEndPoint = CONCAT(c.PlatformIP,':',c.PlatformPort) 
			; `;
		sql += ` SELECT count(1) as dataTotal  from tbuplog   a LEFT  JOIN tbupconfig c  ON a.IPEndPoint=CONCAT( c.PlatformIP,':',c.PlatformPort)
			where ${wherestr}`;

	} else {

		sql = ` SELECT * from tbuplog a LEFT  JOIN tbupconfig c  ON a.IPEndPoint=CONCAT( c.PlatformIP,':',c.PlatformPort)
		WHERE  ${wherestr} `;

	}

	console.log('getSbsjTable-sql=', sql);

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

//获取预警数据列表
exports.getYjsjData = function (req, res, next) {

	//默认查询近3个月的数据
	var condition = {
		startTime: req.query.startTime || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		endTime: req.query.endTime || moment().endOf("month").format("YYYY-MM-DD"),
		PolId:req.query.PolId,
		WarnType:req.query.alarmType,
		PageIndex: req.query.PageIndex || 0,
		PageSize: req.query.PageSize || 20
	};
	// select `DataTime`,`PolId`,`WarnType`,`Status`,`Info`  from `仪表日志` INNER JOIN 
	//  (SELECT id from `仪表日志` where DataTime BETWEEN '2022-11-21 15:45:24' and '2022-11-22 15:45:24' and Type in (6)  
	// ORDER BY `Status`, `DataTime` DESC LIMIT 0,30)AS b USING(id)   
	var where = ` where 1=1 and DataTime >= '${condition.startTime}' AND DataTime <= '${condition.endTime}' and Type in (6)`;

	if (req.query.PolId) {
		where += ` and PolId='${req.query.PolId}'`;
	}
	if (req.query.WarnType) {
		where += ` and WarnType='${req.query.WarnType}'`;
	}
	
	var sql = `SELECT * FROM 仪表日志 INNER JOIN  (SELECT id from 仪表日志   ${where} ORDER BY  DataTime DESC LIMIT ${condition.PageIndex},${condition.PageSize}) AS b USING(id);
	SELECT count(0) as dataTotal FROM 仪表日志 ${where};
	`;

	console.log('getYjsjData-sql=', sql);

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
//获取报警数据列表
exports.getBjsjData = function (req, res, next) {

	//默认查询近3个月的数据
	var condition = {
		startTime: req.query.startTime || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		endTime: req.query.endTime || moment().endOf("month").format("YYYY-MM-DD"),
		PolId:req.query.PolId,
		PageIndex: req.query.PageIndex || 0,
		PageSize: req.query.PageSize || 20
	};
	// select `DataTime`,`PolId`,`Info`,`AlarmID`   from `仪表日志` INNER JOIN  
	// (SELECT id from `仪表日志` where DataTime BETWEEN '2022-10-03 16:24:50' and '2022-11-22 16:24:50'
	//  and Type in (1,2,3,0)   ORDER BY `DataTime` DESC LIMIT 0,30)AS b USING(id)   
	// sss select count(*) from 仪表日志 where DataTime BETWEEN '2022-10-03 16:24:50' and '2022-11-22 16:24:50' and Type in (1,2,3,0) 
	var where = ` where 1=1 and DataTime >= '${condition.startTime}' AND DataTime <= '${condition.endTime}' and Type in (1,2,3,0)`;

	if (req.query.PolId) {
		where += ` and PolId='${req.query.PolId}'`;
	}

	var sql = `SELECT * FROM 仪表日志 INNER JOIN  (SELECT id from 仪表日志   ${where} ORDER BY  DataTime DESC LIMIT ${condition.PageIndex},${condition.PageSize} ) AS b USING(id);
	SELECT count(0) as dataTotal FROM 仪表日志 ${where};
	`;

	console.log('getYjsjData-sql=', sql);

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

//获取电池组数据列表
exports.getDCSJData = function (req, res, next) {

	//默认查询近3个月的数据

	var condition = {
		StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD"),
		GroupID:req.query.GroupID,
		PageIndex: req.query.PageIndex || 0,
		PageSize: req.query.PageSize || 20
	};

	var where = ` where 1=1 and DataTime >= '${condition.StartDate}' AND DataTime <= '${condition.EndDate}' `;

	if (req.query.GroupID ) {
		where += ` and GroupID='${req.query.GroupID}'`;
	}

	var sql = `SELECT * FROM tbbattery  ${where} ORDER BY  DataTime DESC LIMIT ${condition.PageIndex},${condition.PageSize};
	SELECT count(0) as total FROM tbbattery ${where};
	`;

	console.log('getYjsjData-sql=', sql);

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