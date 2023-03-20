var express = require('express');
var fs = require('fs');
var path = require('path');
//var bodyParser = require('body-parser');
/*访问服务*/
const login = require('./routes/login');
const logins = require('./routes/logins');

const getExcelData = require('./routes/getExcelData');

const ProjectCtrl = require('./routes/ProjectCtrl');
const filePath = require('./routes/filePath');

const comMethod = require('./routes/comMethod');

const conWindows = require('./routes/conWindows');

const tjfxapi = require('./controllers/statistical-analysis-api');

const comapi = require('./controllers/common-api');

const sbglapi = require('./controllers/sbgl-api');

// 报表查询
const reportsapi = require('./controllers/reports-api');

// 运维功能接口
const optapi = require('./controllers/opt-api');
//用户信息
const userapi = require('./controllers/user-api');

/*访问服务*/
var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));


app.use(express.static(path.resolve(__dirname, './images')));
// 访问单页
// app.get('*', function (req, res) {
//     var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
//     res.send(html);
// });

// 登录
app.get("/login", login.login);
app.get("/logins", logins.login);

// 登录接口
app.post("/postLogin", userapi.postLogin);
//获取登录列表
app.get("/getUserList", userapi.getUserList);


// 修改sysIni文件
app.post("/postSaveINI", comapi.postSaveINI);

// 污染源-报表统计api
app.get("/getTJData", reportsapi.getTJData);
// 污染源-报表数据分页
app.get("/getTablePageData", reportsapi.getTablePageData);

// 地表水-监测数据
app.get("/getjcsjTable", reportsapi.getjcsjTable);

// 质控数据查询
app.get("/getZkcxTable", reportsapi.getZkcxTable);

// 数据上报
app.get("/getSbsjTable", reportsapi.getSbsjTable);
// 预警数据
app.get("/getYjsjData", reportsapi.getYjsjData);
// 报警数据
app.get("/getBjsjData", reportsapi.getBjsjData);
// 获取电池数据
app.get("/getDCSJData", reportsapi.getDCSJData);


//添加上传地址
app.post("/addupload", comMethod.addupload);
app.post("/updateUpload", comMethod.updateUpload);

//excel读取
app.get("/getdriversData", getExcelData.getdriversData);
// 不用
app.post("/UpdatedriversData", getExcelData.UpdatedriversData);

//  sbgl-api.js设备管理
app.post("/saveCJConfig", sbglapi.saveCJConfig);

//授权保存ini
app.post("/SaveIni", ProjectCtrl.SaveIni);

//用户管理sql
app.post("/addUser", comMethod.addUser);
app.post("/delUser", comMethod.delUser);
app.post("/updateUser", comMethod.updateUser);

//添加操作日志
app.post("/addlog", comMethod.addlog);

//操作widows
app.get("/ControlVirtualKeyBoard", conWindows.ControlVirtualKeyBoard)
app.post("/testIP", conWindows.testIP)
app.post("/execFile", conWindows.execFile)


app.get("/getData", comMethod.getData);
app.post("/updateglobalvar", comMethod.updateglobalvar);
app.post("/updatelcbj", comMethod.updatelcbj);
app.post("/updateTSMode", comMethod.updateTSMode);

// 获取预处理方式设置列表
app.get("/getPretreatment", comapi.getPretreatment);
// 修改预处理方式
app.post("/updatetbfilterplan", comMethod.updatetbfilterplan);

//获取离心机启动方案列表
app.get("/gettbcentrifugeplan", comapi.gettbcentrifugeplan);
//修改离心机启动方案列表
app.post("/updatetbcentrifugeplan", comapi.updatetbcentrifugeplan);

// 获取仪表自检检查结果
app.get("/getZJSJData", comapi.getZJSJData);

// 批量添加比对数据
app.post("/addCompareList", comapi.addCompareList);

// 获取appConfig.JSON文件
app.get("/getAppConfig", comapi.getAppConfig);

// 获取sysIni文件
app.get("/getInIConfig", comapi.getInIConfig);

// 获取系统前后端配置信息
app.get("/getSysConfig", comapi.getSysConfig);



//添加视频监控
app.post("/addVideo", comMethod.addVideo);
app.post("/updateVideo", comMethod.updateVideo);

// 添加、修改运维记录
app.post("/updatedevopsLogData", comMethod.updatedevopsLogData);
app.post("/adddevopsLogData", comMethod.adddevopsLogData);
app.post("/updatedevopsLogdetailData", comMethod.updatedevopsLogdetailData);
app.post("/adddevopsLogdetailData", comMethod.adddevopsLogdetailData);
// 更新运维到期时间
app.post("/updatedevopstaskData", comMethod.updatedevopstaskData);


// 添加手工比对数据
app.post("/addCompare", comMethod.addCompare);
// 编辑手工比对数据
app.post("/updateCompare", comMethod.updateCompare);
// 获取手工比对数据
app.get("/gettbquartercompare", comMethod.gettbquartercompare);

// 上传图片
app.post("/uplodeImges", filePath.uplodeImges);

// 添加、编辑报备信息
app.post("/updateReport", comMethod.updateReport);
// 编辑定点模式参数
app.post("/updatetbfixedtask", comMethod.updatetbfixedtask);


//获取备件耗材数据
app.get("/getSparePartsDatas", comMethod.getSparePartsDatas);
//添加、编辑备件耗材数据
app.post("/updateSparePartsData", comMethod.updateSparePartsData);
//更新备件耗材过期时间
app.post("/updateSparePartsExpireData", comMethod.updateSparePartsExpireData);
//添加、编辑备件耗材数据
// app.post("/updatetbhelpguide", comMethod.updatetbhelpguide);
app.post("/updatetbhelpguide", filePath.updatetbhelpguide);
//智能诊断
app.get("/gettbhelpguide", filePath.gettbhelpguide);


//获取首页小铃铛获取预警消息
app.get("/getWarningDatas", comMethod.getWarningDatas);
app.post("/updateWarningDatas", comMethod.updateWarningDatas);


//获取超标数据统计
app.get("/getOverDatas", tjfxapi.getOverDatas);
app.get("/getOverDataDetails", tjfxapi.getOverDataDetails);

//获取运维周期统计
app.get("/getOptCycleDatas", tjfxapi.getOptCycleDatas);
app.get("/getOptCycleDetails", tjfxapi.getOptCycleDetails);

//获取无效数据统计
app.get("/getEffectiveDatas", tjfxapi.getEffectiveDatas);
app.get("/getEffectiveDetails", tjfxapi.getEffectiveDetails);

//获取运行时长统计
app.get("/getRunTimeDetails", tjfxapi.getRunTimeDetails);

//运维
// 根据巡检记录单号获取废液储存列表
app.get("/getYW_FYCCList", optapi.getYW_FYCCList);
// 更新废液储存列表
app.post("/updateYW_FYCCList", optapi.updateYW_FYCCList);

// 根据巡检记录单号获取废液处置列表
app.get("/getYW_FYCZList", optapi.getYW_FYCZList);
// 更新废液处置列表
app.post("/updateYW_FYCZList", optapi.updateYW_FYCZList);
// 根据巡检记录单号获取标准溶液核查记录表
app.get("/getYW_BZRYList", optapi.getYW_BZRYList);
app.get("/getYW_BYHCList", optapi.getYW_BYHCList);
// 更新标准溶液核查记录表
app.post("/updateYW_BYHCList", optapi.updateYW_BYHCList);
// 根据巡检记录单号标准样品列表
app.get("/getYW_BZYPList", optapi.getYW_BZYPList);
// 更新标准样品列表
app.post("/updateYW_BZYPList", optapi.updateYW_BZYPList);
// 根据巡检记录单号标样校准列表
app.get("/getYW_BYJZList", optapi.getYW_BYJZList);
// 更新标样校准列表
app.post("/updateYW_BYJZList", optapi.updateYW_BYJZList);

// 根据巡检记录单号易耗品更换
app.get("/getYW_YHPGHList", optapi.getYW_YHPGHList);
// 更新易耗品列表
app.post("/updateYW_YHPGHList", optapi.updateYW_YHPGHList);

// 根据巡检记录单号 检修记录表1
app.get("/getYW_SBJX1List", optapi.getYW_SBJX1List);
// 更新检修记录表1
app.post("/updateYW_SBJX1List", optapi.updateYW_SBJX1List);

// 根据巡检记录单号 检修记录表2
app.get("/getYW_SBJX2List", optapi.getYW_SBJX2List);
// 更新检修记录表2
app.post("/updateYW_SBJX2List", optapi.updateYW_SBJX2List);



// // 获取pdf路径
// app.post("/getpdfURL", comapi.getpdfURL)


// 监听
var server = app.listen(6060, function () { // 5000,即：http://127.0.0.1:5000

    var host = server.address().address

    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})































// var express = require("express"); //首先引入express模块，不了解去看nodejs教程 安装：npm install express

// var fs = require("fs"); // 文件系统

// /*访问服务*/
// const login = require('./routes/login');
// const yhgl = require('./routes/yhglRoutes');
// const comMethod = require('./routes/comMethod');
// /*212通讯*/
// const cfg = require('./appConfig.json')
// var hj212 = require('./bin/hj212_aqms');
// hj212.createServers(cfg.mysql);
// /*访问服务*/
// var app = express();


// app.get("/login", login.login);


// app.get("/getData", comMethod.getData);


// var server = app.listen(5050, function () { // 5000,即：http://127.0.0.1:5000

//     var host = server.address().address

//     var port = server.address().port

//     console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })



