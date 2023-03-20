/**
 * 设备管理接口 sbgl-api
 */


const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const _appConfig = require('../appConfig.json');

let _softType = 21;
//''、'龙感湖浮船站'、'天水超级站' 、'四川高速污染源' 
//为空则为标准站
const _customPointName= _appConfig.customPointName //'龙感湖浮船站';

function groupBy(array, f) {
	let groups = {};
	array.forEach(function (o) {
		let group = JSON.stringify(f(o));
		groups[group] = groups[group] || [];
		groups[group].push(o);
	});
	return Object.keys(groups).map(function (group) {
		return groups[group];
	});
}

// const appconfig = require('./appConfig.json');

//根据开发或生产版本，获取修改因子配置文件
const pollutantConfigUrl = _appConfig.pro_ev == 1 ? _appConfig.pollutantConfigUrl_pro : _appConfig.pollutantConfigUrl_dev;

//获取模板文件地址
function getTemplateUrl(softType) {
	return `${_appConfig.Templateconfigurl + ((+softType) == 32 ? 'WWMS' : 'WQMS')}/`;
}

/**
 * 获取采集目录下配置文件地址
 * @param {int} softType  软件类型 
 */
function getCJConfigUrl(softType) {
	return `${_appConfig.caijiUrl + ((+softType) == 32 ? 'WWMS' : 'WQMS')}/`;
}


// 页面config.js配置
function SaveFrontConfig(_driverList, TemplateUrl) {
	// 读取模板文件
	// let Ramurl = TemplateUrl + "config.js";
	// var TemplateconfigUrl= path.join(__dirname, TemplateUrl);

	let configUrl = TemplateUrl + "config.js";
	console.log('configTemplate=', path.resolve(configUrl));

	fs.readFile(path.resolve(configUrl), 'utf-8', function (err, data) {
		if (err) {
			return console.error(err);
		}
		var jsonStr = data.toString();//将二进制的数据转换为字符串
		console.log('_driverList=', _driverList)

		_driverList.map((a) => {
			let r = a[0];
			if (a.length > 1) {
				// TN;TP;COD;CODCR;NH3
				a.map((c) => {
					jsonStr = jsonStr.replace(RegExp(`{{${c.DevTag}启用}}`, "g"), c.Used);
					jsonStr = jsonStr.replace(RegExp(`{{${c.DevTag}Series}}`, "g"), `'${c.Series}'`);
					jsonStr = jsonStr.replace(RegExp(`{{${c.DevTag}Factory}}`, "g"), `'${c.Factory}'`);
				})
			}
			else {

				if (r.DevTag == 'VOCS' || r.DevTag == 'HM') {
					r.pollutantList.map((v) => {
						jsonStr = jsonStr.replace(RegExp(`{{${v.ID}启用}}`, "g"), v.Status);
					})
				}

				jsonStr = jsonStr.replace(RegExp(`{{${r.DevTag}启用}}`, "g"), r.Used);
				jsonStr = jsonStr.replace(RegExp(`{{${r.DevTag}Series}}`, "g"), `'${r.Series}'`);
				jsonStr = jsonStr.replace(RegExp(`{{${r.DevTag}Factory}}`, "g"), `'${r.Factory}'`);
			}
		});

		// var polConfigUrl= path.join(__dirname, pollutantConfigUrl);

		console.log('config文件地址', path.resolve(pollutantConfigUrl));

		fs.writeFile(path.resolve(pollutantConfigUrl), jsonStr, { encoding: 'utf-8' }, function (err) {
			if (err) {
				// res.status(409).send("页面配置修改失败").end();
				console.log('页面配置修改失败')
			}
			// res.status(200).send("修改成功").end();
			console.log('页面配置修改成功')

		})
	})
}

//保存并更新配置文件
exports.saveCJConfig = async function (req, res) {
	let form = new formidable();
	form.parse(req, function (err, fields, files) {
		try {
			// 合并
			//预处理判断
			let evalStr = eval(fields.str);

			if (_customPointName == '龙感湖浮船站') {
				evalStr.map((es) => {
					if(es.id=='13'||es.id=='24'|| es.id=='25' ){
						es.id=13;
						es.TagFile= "other.csv";
					}
				})
			}
			if (_customPointName == '四川高速污染源') {
				evalStr.map((es) => {
					if(es.id=='12'||es.id=='21'|| es.id=='31' ){
						es.id=12;
						es.TagFile= "wc.csv";
					}
				})
			}
// console.log(evalStr);
			// if (nowPointName == '其他') {
			// 	evalStr.map(function () {

			// 	})
			// }

			let _driverList = groupBy(evalStr.filter(m => m.Used), function (item) {
				return [item.id];
			});
			// let _driverList = groupBy(eval(fields.str).filter(m => m.Used), function (item) {
			// 	return [item.id];
			// });

			_softType = (+fields.SoftType);


			// 调取修改文件方法

			//1、修改driver文件
			updateDrivers(_driverList, getCJConfigUrl(fields.SoftType));
			//2、修改Read_RAM文件
			updateRead_RAM(_driverList, getCJConfigUrl(fields.SoftType), getTemplateUrl(fields.SoftType));
			//3、修改Mete文件
			updateMeter(_driverList, getCJConfigUrl(fields.SoftType), getTemplateUrl(fields.SoftType));
			//4、因子前端配置文件
			//前端配置文件
			let _driverLists = groupBy(eval(fields.str), function (item) {
				return [item.id];
			});
			SaveFrontConfig(_driverLists, getTemplateUrl(fields.SoftType));
			//5、生成json文件，后端采集需要
			createJsonFile(_driverLists);

			return res.json({ Code: 200, Msg: '保存成功，请重启软件', Data: [] });
		}
		catch (err) {
			return res.json({ Code: 500, Msg: '保存采集csv文件失败', Data: err.toString() });
		}
	})
}

/**
 * 驱动配置
 * @param {*} req 
 * @param {*} res 
 */
function updateDrivers(_driverList, ConfigsUrl) {

	// driver文件表头
	let _str = "ID,Driver,Protocal,ParseClass,ConnStr,TagFile,Used,DevTag,Factory,Series,DevTagName\r\n";
	// form.parse(req, function (err, fields, files) {
	try {
		let _DevTag = [], _Series = [], _DevTagName = [];
		_driverList.map((a) => {

			let r = a[0];
			_DevTag = []; _Series = []; _DevTagName = [];
			if (r.DevTag.toUpperCase() == 'VOCS' || r.DevTag.toUpperCase() == 'HM') {
				_DevTag.push(r.DevTag);
				_Series.push(r.Series);
				r.pollutantList.filter(m => m.Status).map((v) => {
					_DevTagName.push(v.Name);
				})
				// console.log('_DevTagName',_DevTagName)
			} else {
				_DevTag.push(r.DevTag);
				_Series.push(r.Series);
				_DevTagName.push(r.DevTagName);
			}


			if (a.length > 1) {
				_DevTag = []; _Series = []; _DevTagName = [];
				a.filter(m => m.Used).map((c) => {
					_DevTag.push(c.DevTag);
					_Series.push(c.Series);
					_DevTagName.push(c.DevTagName);
				})
			}
			// if (_DevTag == 'LLJ' && r.Factory == '水治清' && r.ConnStr.indexOf('true') == -1) {
			// 	r.ConnStr = r.ConnStr + ":true";
			// }
			// if (_DevTag == 'LLJ' && r.Factory != '水治清' && r.ConnStr.indexOf('true') > -1) {
			// 	r.ConnStr = r.ConnStr.substring(0, r.ConnStr.lastIndexOf(':'));
			// }

			_str += `${r.id},${r.Driver},${r.Protocal},${r.ParseClass},${r.ConnStr},${(_softType == 32 ? '/WWMS/' : '/WQMS/') + r.TagFile},${r.Used.toString().toUpperCase()},${_DevTag.join(';')},${r.Factory},${_Series.join(';')},${_DevTagName.join(';')}\r\n`;
		});

		let FilePath = ConfigsUrl + 'drivers.csv';

		console.log('driverUrl=', path.resolve(FilePath));

		fs.writeFile(path.resolve(FilePath), _str, { encoding: 'utf-8' }, function (err) {
			if (err) {
				console.log('driver修改失败')
			}
			console.log('driver修改成功')
		});

	}
	catch (err) {
		console.log("updateDrivers-err=", err);
	}
	// })
}
// 修改Read_RAM
function updateRead_RAM(_driverList, ConfigsUrl, TemplateUrl) {
	try {
		// var TemplateRAMUrl= path.join(__dirname, TemplateUrl);

		let Template_RAMUrl = TemplateUrl + "Read_RAM.csv";
		console.log('Template_RAM=', path.resolve(Template_RAMUrl));

		fs.readFile(path.resolve(Template_RAMUrl), 'utf-8', function (err, data) {
			if (err) {
				return console.error(err);
			}
			var ramStr = data.toString();//将二进制的数据转换为字符串

			// let Str = IO.ReadFile(path.join(__dirname, '../Template/WQMS/Read_RAM.csv'))
			_driverList.map((a) => {
				let other = a[0];

				if (a[0].id == 100 || a[0].id == 103 || a[0].id == 13 || a[0].id == 12) {

					a.filter(m => m.Used).map((item) => {
						if (item.DevTag == 'TP') {
							ramStr = ramStr + "\r\nTP_com,TP通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TP_因子编码,0,RAM,,";
						}
						if (item.DevTag == 'TN') ramStr = ramStr + "\r\nTN_com,TN通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TN_因子编码,0,RAM,,";
						if (item.DevTag == 'NH3') ramStr = ramStr + "\r\nNH3_com,NH3通讯状态,INT,,,FALSE,,NONE,,ComStatus,,NH3_因子编码,0,RAM,,";
						if (item.DevTag == 'COD') ramStr = ramStr + "\r\nCOD_com,COD通讯状态,INT,,,FALSE,,NONE,,ComStatus,,COD_因子编码,0,RAM,,";
						if (item.DevTag == 'CODCR') ramStr = ramStr + "\r\nCODCR_com,CODCR通讯状态,INT,,,FALSE,,NONE,,ComStatus,,CODCR_因子编码,0,RAM,,";
						if (item.DevTag == 'YLS') ramStr = ramStr + "\r\nYLS_com,叶绿素,INT,,,FALSE,,NONE,,ComStatus,,yls_叶绿素,0,RAM,,";
						// 浮船
						if (item.DevTag == 'YWJ') ramStr = ramStr + "\r\nYWJ_com,液位计通讯状态,INT,,,FALSE,,NONE,,ComStatus,,YWJ_水位,0,RAM,,";
						if (item.DevTag == 'YGQ') ramStr = ramStr + "\r\nYGQ_com,烟感器通讯状态,INT,,,FALSE,,NONE,,ComStatus,,YGQ_报警,0,RAM,,";
						if (item.DevTag == 'ZF') ramStr = ramStr + "\r\nZF_com,站房通讯状态,INT,,,FALSE,,NONE,,ComStatus,,zf_大气温度,0,RAM,,";
                        // 四川高速
						if (other.DevTag == 'WC') ramStr = ramStr + "\r\nWC_com,五参数通讯状态,INT,,,FALSE,,NONE,,ComStatus,,wc_pH值,0,RAM,,";
 

					})
				} else {
					if (other.DevTag == 'WC') ramStr = ramStr + "\r\nWC_com,五参数通讯状态,INT,,,FALSE,,NONE,,ComStatus,,wc_pH值,0,RAM,,";
					if (other.DevTag == 'LY') ramStr = ramStr + "\r\nLY_com,留样通讯状态,INT,,,FALSE,,NONE,,ComStatus,,LY_留样瓶号,0,RAM,,";
					if (other.DevTag == 'ZF') ramStr = ramStr + "\r\nZF_com,站房通讯状态,INT,,,FALSE,,NONE,,ComStatus,,zf_大气温度,0,RAM,,";

					if (other.DevTag == 'HM') ramStr = ramStr + "\r\nHM_com,重金属通讯状态,INT,,,FALSE,,NONE,,ComStatus,,HM_报警,0,RAM,,";
					if (other.DevTag == 'VOCS') ramStr = ramStr + "\r\nVOCS_com,VOCS通讯状态,INT,,,FALSE,,NONE,,ComStatus,,VOCS_w24003,0,RAM,,";
					// && other.Factory == '力合'
					if (other.DevTag == 'LLJ') ramStr = ramStr + "\r\nLLJ_com,流量计通讯状态,INT,,,FALSE,,NONE,,ComStatus,,F_瞬时流量,0,RAM,,";
					if (other.DevTag == 'CYQ') ramStr = ramStr + "\r\nCYQ_com,采样器通讯状态,INT,,,FALSE,,NONE,,ComStatus,,CYQ_留样瓶号,0,RAM,,";

					if (other.DevTag == 'SZY') ramStr = ramStr + "\r\nSZY_com,水中油通讯状态,INT,,,FALSE,,NONE,,ComStatus,,SZY_水中油,0,RAM,,";
					if (other.DevTag == 'SWDX') ramStr = ramStr + "\r\nSWDX_com,生物毒性通讯状态,INT,,,FALSE,,NONE,,ComStatus,,SWDX_毒性度,0,RAM,,";
					// if (other.DevTag == 'VOCS' && other.Factory == '天水自定义') ramStr = ramStr + "\r\nVOCS_com,VOCS通讯状态,INT,,,FALSE,,NONE,,ComStatus,,VOCS_数据时间,0,RAM,,";

					
					if (other.DevTag == 'YWJ') ramStr = ramStr + "\r\nYWJ_com,液位计通讯状态,INT,,,FALSE,,NONE,,ComStatus,,YWJ_水位,0,RAM,,";
					
					if (other.DevTag == 'LXJ') ramStr = ramStr + "\r\nLXJ_com,离心机通讯状态,INT,,,FALSE,,NONE,,TcpDriverStatus,,lxj_浊度值,0,RAM,,";

					if (other.DevTag == 'AN') ramStr = ramStr + "\r\nAN_com,苯胺通讯状态,INT,,,FALSE,,NONE,,ComStatus,,AN_水样实测值,0,RAM,,";
					//  浮船
					if (other.DevTag == 'YGQ') ramStr = ramStr + "\r\nYGQ_com,烟感器通讯状态,INT,,,FALSE,,NONE,,ComStatus,,YGQ_报警,0,RAM,,";
					if (other.DevTag == 'BMS') ramStr = ramStr + "\r\nBMS_com,电池通讯状态,INT,,,FALSE,,NONE,,ComStatus,,BMS_1组剩余容量,0,RAM,,";
					if (other.DevTag == 'GPS') ramStr = ramStr + "\r\nGPS_com,电池通讯状态,INT,,,FALSE,,NONE,,ComStatus,,GPS_经度,0,RAM,,";
					if (other.DevTag == 'QX') ramStr = ramStr + "\r\nQX_com,气象通讯状态,INT,,,FALSE,,NONE,,ComStatus,,QX_风速,0,RAM,,";
					if (other.DevTag == 'ZFY') ramStr = ramStr + "\r\nZFY_com,蒸发仪通讯状态,INT,,,FALSE,,NONE,,ComStatus,,ZFY_蒸发量,0,RAM,,";


				}

			})
			let FilePath = ConfigsUrl + 'Read_RAM.csv';

			// var RAMUrl= path.join(__dirname, FilePath);

			console.log('Read_RAM_Url=', path.resolve(FilePath));

			fs.writeFileSync(path.resolve(FilePath), ramStr, { flag: 'w+' });
			console.log('Read_RAM成功')
		})
	}
	catch (err) {
		console.log("updateRead_RAM-err=", err);
	};
}
// 修改Mater文件
function updateMeter(_driverList, ConfigsUrl, TemplateUrl) {
	try {

		let TPurl = TemplateUrl + "TP.csv";
		let TNurl = TemplateUrl + "TN.csv";
		let NH3url = TemplateUrl + "NH3.csv";
		let CODurl = TemplateUrl + "COD.csv";
		let CODCRurl = TemplateUrl + "CODCR.csv";

		console.log('Template_Meter_TN', path.resolve(TNurl));

		// let urlList = [TPurl, TNurl, NH3url, CODurl, CODCRurl]
		// console.log(urlList)

		var MaterStr = "Symbol,Name,数据类型,寄存器,地址,归档,量程,报警类型,报警,函数,函数参数,依赖,DriverID,IOType,GroupID,功能码,字节序";
		_driverList.map((a) => {
			// let item = a[0];
			if (a.length > 0) {

				a.filter(m => m.Used).map((item) => {
					if (item.DevTag == 'TP') {
						MaterStr = MaterStr + "\r\n" + fs.readFileSync(path.resolve(TPurl), 'utf-8').slice(1);
					}
					if (item.DevTag == 'TN') MaterStr = MaterStr + "\r\n" + fs.readFileSync(path.resolve(TNurl), 'utf-8').slice(1);
					if (item.DevTag == 'NH3') MaterStr = MaterStr + "\r\n" + fs.readFileSync(path.resolve(NH3url), 'utf-8').slice(1);
					if (item.DevTag == 'COD') MaterStr = MaterStr + "\r\n" + fs.readFileSync(path.resolve(CODurl), 'utf-8').slice(1);
					if (item.DevTag == 'CODCR') MaterStr = MaterStr + "\r\n" + fs.readFileSync(path.resolve(CODCRurl), 'utf-8').slice(1);

				})
			}

		})

		let FilePath = ConfigsUrl + "Meter.csv"

		// console.log('Meter6=', Str)
		// var MeterUrl= path.join(__dirname, FilePath);

		console.log('Meter_Url=', path.resolve(FilePath));
		fs.writeFileSync(path.resolve(FilePath), MaterStr, { flag: 'w+' });
		console.log('修改Meter.csv成功')

	}
	catch (err) {
		console.log("updateMeter-err=", err);
	}
}
// 生成json文件，后端采集需要
function createJsonFile(_driverList) {
	try {
		let zjsJson = { "Factory": "LH", "Series": "USTD", "Factors": [] };
		let vocsJson = { "Factory": "LH", "Series": "USTD", "Factors": [] };
		let szyJson = { "Factory": "KZ", "Series": "STD", "Factors": [] };

		_driverList.map((a) => {

			let r = a[0];

			if (r.DevTag.toUpperCase() == 'VOCS') {

				if (r.Factory == "力合") {
					vocsJson.Factory = "LH";
				} else if (r.Factory == "哈希") {
					vocsJson.Factory = "HX";
				} else if (r.Factory == "天水自定义") {
					vocsJson.Factory = "TSHJ212";
				}

				r.pollutantList.filter(m => m.Status).map((v) => {
					vocsJson.Factors.push({
						Code: v.ID,
						Name: v.mlName
					});
				})
			} else if (r.DevTag.toUpperCase() == 'HM') {
				if (r.Factory == "力合") {
					zjsJson.Factory = "LH";
				} else if (r.Factory == "哈希") {
					zjsJson.Factory = "HX";
				}
				r.pollutantList.filter(m => m.Status).map((v) => {
					zjsJson.Factors.push({
						Code: v.ID,
						Name: v.mlName
					});
				})
			} else if (r.DevTag.toUpperCase() == 'SZY') {
				if (r.Factory == "柯泽") {
					szyJson.Factory = "KZ";
				} else if (r.Factory == "纳清") {
					szyJson.Factory = "NQ";
				}
				// r.pollutantList.filter(m => m.Status).map((v) => {
				szyJson.Factors.push({
					Code: 'w22001',
					Name: '水中油'
				});
				// })
			}
		});
		let jsonPath = _appConfig.caijiUrl + '\\json\\';
		if (zjsJson.Factors.length > 0) {

			//判断目录是否存在  不存在则创建
			mkdirs(jsonPath, function (e) {

				console.log('jsonPath=', path.resolve(jsonPath + 'HM.json'))
				// try {
				fs.writeFileSync(path.resolve(jsonPath + 'HM.json'), JSON.stringify(zjsJson), { flag: 'w+' });
				console.log("创建HM.json成功");
			});
		}

		if (vocsJson.Factors.length > 0) {

			//判断目录是否存在  不存在则创建
			mkdirs(jsonPath, function (e) {

				console.log('jsonPath=', path.resolve(jsonPath + 'VOCS.json'))
				fs.writeFileSync(path.resolve(jsonPath + 'VOCS.json'), JSON.stringify(vocsJson), { flag: 'w+' });
				console.log("创建VOCS.json成功");
			});
		}
		if (szyJson.Factors.length > 0) {
			//判断目录是否存在  不存在则创建
			mkdirs(jsonPath, function (e) {

				console.log('jsonPath=', path.resolve(jsonPath + 'SZY.json'))
				fs.writeFileSync(path.resolve(jsonPath + 'SZY.json'), JSON.stringify(szyJson), { flag: 'w+' });
				console.log("创建SZY.json成功");
			});
		}
	} catch (err) {
		console.log("createJsonFile-err=", err);
	}
}




//递归创建目录 异步方法  
function mkdirs(dirname, callback) {
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
}