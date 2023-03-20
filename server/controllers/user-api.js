/**
 * 用户管理接口
 */

const db = require('../routes/dbRoutes.js');
const formidable = require('formidable');

//登录接口
exports.postLogin = function (req, res, next) {

	let form = new formidable();
	form.parse(req, function (err, fields, files) {
		var condition = {
			loginName: fields.name,
			loginPwd: fields.pwd
		};
		if (!condition.loginName || !condition.loginName) {
			return res.json({ Code: 500, Msg: '用户名或密码不能为空', Data: [] });
		}

		var sql = "select  *  from tbuser where  Account='" + condition.loginName + "' and Pwd='" + condition.loginPwd + "'  "

		console.log('getUserList-sql=', sql);

		db.query(sql, function (err, rows, fields) {
			if (err) {
				console.log(err);
				return res.json({ Code: 500, Msg: '登录发生错误', Data: [] });
			}
			let obj = {};
			if (rows.length > 0) {
				obj.RoleID = rows[0].RoleID;//menus
				return res.json({ Code: 200, Msg: '登录成功', Data: obj });
			}

			return res.json({ Code: 500, Msg: '用户名或密码错误', Data: {} });
		});
	});

}

//获取用户列表
exports.getUserList = function (req, res, next) {

	//默认查询近3个月的数据
	var condition = {
		RoleID: req.query.RoleID || 0,
		Account: req.query.Account,
	};

	var where = ` where 1=1 `;

	if (condition.RoleID == 0) {
		where += ` and RoleID in (0)`;
	} else if (condition.RoleID == 1) {
		where += ` and RoleID in (1,2)`;
	} else if (condition.RoleID == 2) {
		where += ` and RoleID in (2) and Account='${condition.Account}'`;
	}
	else if (condition.RoleID == 3) {

	} else {
		where += ` and RoleID =-1`;
	}

	var sql = `select  *  from tbuser ${where}`

	console.log('getUserList-sql=', sql);

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
