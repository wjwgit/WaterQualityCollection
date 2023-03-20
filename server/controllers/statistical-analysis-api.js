/**
 * 统计分析接口
 */

const moment = require('moment');
const db = require('../routes/dbRoutes.js');

//获取超标数据统计
exports.getOverDatas = function (req, res, next) {

	//默认查询近3个月的数据
	var condition = {
		StartDate: req.query.StartDate || moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
		EndDate: req.query.EndDate || moment().endOf("month").format("YYYY-MM-DD")
	};
	
	var sql = `SELECT
	t.PollutantCode,
	SUM(
		CASE
		WHEN t.DataFlag IN ('L', 'T') THEN
			1
		ELSE
			0
		END
	) AS OverNum
FROM
	(
		SELECT
			DataTime,
			'w01001' AS PollutantCode,
			w01001_Avg AS DataValue,
			w01001_Flag AS DataFlag
		FROM
			小时数据
		UNION ALL
			SELECT
				DataTime,
				'w01010',
				w01010_Avg,
				w01010_Flag
			FROM
				小时数据
			UNION ALL
				SELECT
					DataTime,
					'w01019',
					w01019_Avg,
					w01019_Flag
				FROM
					小时数据
				UNION ALL
					SELECT
						DataTime,
						'w21003',
						w21003_Avg,
						w21003_Flag
					FROM
						小时数据
					UNION ALL
						SELECT
							DataTime,
							'w21011',
							w21011_Avg,
							w21011_Flag
						FROM
							小时数据
						UNION ALL
							SELECT
								DataTime,
								'w21001',
								w21001_Avg,
								w21001_Flag
							FROM
								小时数据
							UNION ALL
								SELECT
									DataTime,
									'w01016',
									w01016_Avg,
									w01016_Flag
								FROM
									小时数据
								UNION ALL
									SELECT
										DataTime,
										'w19011',
										w19011_Avg,
										w19011_Flag
									FROM
										小时数据
									UNION ALL
										SELECT
											DataTime,
											'w01018',
											w01018_Avg,
											w01018_Flag
										FROM
											小时数据
	) t
WHERE
	DataTime >= '${condition.StartDate}'
AND DataTime <= '${condition.EndDate}'
GROUP BY
	PollutantCode
ORDER BY
	PollutantCode,
	DataTime DESC;`;

	console.log('sql=', sql);

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

//获取超标数据统计-明细
exports.getOverDataDetails = function (req, res, next) {

	var condition = {
		PolId: req.query.PolId,
		StartDate: req.query.StartDate,
		EndDate: req.query.EndDate
	};
	var where = " 1=1 "
	if (condition.PolId) {
		where += ` and PolId='${condition.PolId}'`
	}
	var sql = `SELECT
	DataTime,
	'${condition.PolId}' AS PollutantCode,
	${condition.PolId}_Avg AS DataValue,
	${condition.PolId}_Flag AS DataFlag
FROM
	小时数据
WHERE
    DataTime >= '${condition.StartDate}'
AND DataTime <= '${condition.EndDate}'
AND ${condition.PolId}_Flag IN ('L', 'T')
ORDER BY
	DataTime DESC;`;

	console.log('sql=', sql);

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

//获取运维周期统计
exports.getOptCycleDatas = function (req, res, next) {

	var condition = {
		StartDate: req.query.StartDate,
		EndDate: req.query.EndDate
	};

	var sql = `SELECT
	DATE_FORMAT(DataTime, '%Y-%m') AS DataTime,
	count(0) AS OptNum
FROM
	tbdevopslog
WHERE
DataTime >= '${condition.StartDate}'
AND DataTime <= '${condition.EndDate} 23:59:59'
GROUP BY
	DATE_FORMAT(DataTime, '%Y-%m');`;

	console.log('sql=', sql);

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

//获取运维周期统计-明细
exports.getOptCycleDetails = function (req, res, next) {

	var condition = {
		StartDate: req.query.StartDate,
		EndDate: req.query.EndDate
	};

	var sql = `SELECT
	*, CASE
WHEN TaskID = '1' THEN
	'周运维'
WHEN TaskID = '2' THEN
	'月运维'
WHEN TaskID = '3' THEN
	'季度运维'
WHEN TaskID = '4' THEN
	'其他运维'
ELSE
	'未知'
END AS TaskName
FROM
	tbdevopslog
WHERE
DataTime >= '${condition.StartDate}'
AND DataTime <= '${condition.EndDate} 23:59:59'
ORDER BY
	DataTime DESC;`;

	console.log('sql=', sql);

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

//获取无效数据统计
exports.getEffectiveDatas = function (req, res, next) {

	var condition = {
		StartDate: req.query.StartDate,
		EndDate: req.query.EndDate
	};

	var sql = `SELECT
	c.PollutantCode,
	SUM(c.EffectiveNum) AS EffectiveNum,
	SUM(c.InvalidNum) AS InvalidNum
FROM
	(
		SELECT
			DATE_FORMAT(DataTime, '%Y-%m-%d') AS DataTime,
			PollutantCode,
			CASE
		WHEN PollutantValid = 1 THEN
			1
		ELSE
			0
		END AS EffectiveNum,
		CASE
	WHEN PollutantValid = 0 THEN
		1
	ELSE
		0
	END AS InvalidNum
	FROM
		(
			SELECT
				DataTime,
				'w01018' AS PollutantCode,
				w01018_Avg AS PollutantValue,
				w01018_Flag AS PollutantFlag,
				w01018_Valid AS PollutantValid
			FROM
				小时数据
			UNION ALL
            SELECT
                DataTime,
                'w21001' AS PollutantCode,
                w21001_Avg,
                w21001_Flag,
                w21001_Valid
            FROM
                小时数据
            UNION ALL
            SELECT
                DataTime,
                'w21011' AS PollutantCode,
                w21011_Avg,
                w21011_Flag,
                w21011_Valid
            FROM
                小时数据
            UNION ALL
            SELECT
                DataTime,
                'w21003' AS PollutantCode,
                w21003_Avg,
                w21003_Flag,
                w21003_Valid
            FROM
                小时数据
            WHERE
            DataTime >= '${condition.StartDate}'
            AND DataTime <= '${condition.EndDate}'
		) a
	GROUP BY
		DATE_FORMAT(DataTime, '%Y-%m-%d'),
		PollutantCode
	ORDER BY
		DATE_FORMAT(DataTime, '%Y-%m-%d') ASC
	) c
GROUP BY
	c.PollutantCode;`;

	console.log('sql=', sql);

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

//获取无效数据统计-明细
exports.getEffectiveDetails = function (req, res, next) {

	var condition = {
		PolId: req.query.PolId,
		StartDate: req.query.StartDate,
		EndDate: req.query.EndDate
	};

	var sql = `SELECT
	DataTime,
	'${condition.PolId}' AS PollutantCode,
	${condition.PolId}_Avg AS DataValue,
	${condition.PolId}_Flag AS DataFlag
	${condition.PolId}_Valid AS PollutantValid
FROM
	小时数据
WHERE
${condition.PolId}_Valid = 0;`;

	console.log('sql=', sql);

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

//获取运行时长统计-明细
exports.getRunTimeDetails = function (req, res, next) {

	var condition = {
		PolId: req.query.PolId,
		DataFlag: req.query.DataFlag,//0:无效；1：有效；
		StartDate: req.query.StartDate,
		EndDate: req.query.EndDate
	};

	var sql = `SELECT
	DATE_FORMAT(DataTime, '%Y-%m-%d') AS DataTime
FROM
	小时数据
WHERE
${condition.PolId}_Valid = ${condition.DataFlag}
AND DataTime >= '${condition.StartDate}'
AND DataTime <= '${condition.EndDate}'
GROUP BY
	DATE_FORMAT(DataTime, '%Y-%m-%d')`;

	console.log('sql=', sql);

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
