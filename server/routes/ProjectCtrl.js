/**
 * @Author: MorningSun
 * @Date: 2022-01-24 09:24:38
 * @WeiXin:MorningSun0125
 * @Description: 项目管理
 */

const fs = require('fs');
const path = require('path');

const formidable = require('formidable');
const ini = require('ini');
var iconv = require('iconv-lite');//npm install iconv-lite
const _appConfig = require('../appConfig.json');
let _softType = 32;
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


//  const EncryHelper = require('../Common/EncryHelper.js');
//  const Tool = require('../Common/ToolHelper.js');
//  const IO = require('../Common/IOHelper.js');
//  const ProAPI = require('../API/Project.js');
const appconfig = require('../appConfig.json');

//根据开发或生产版本，获取修改因子配置文件
const pollutantConfigUrl = appconfig == 1 ? appconfig.pollutantConfigUrl_pro : appconfig.pollutantConfigUrl_dev;
/**
 * 列表获取
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.Page = async function (req, res) {
    //{ PageIndex: 1, PageSize: 10, KeyWord: '', ProType: "小型站/固定站" } 
    let data = req.body;
    let Role = req.Token.Data.Role;
    data.UserID = -1;
    if (Role != 0) data.UserID = req.Token.Data.ID;
    let Result = await ProAPI.Page(data);
    return res.json(Result);
}

//获取模板文件地址
function getTemplateUrl(softType) {
    return `${_appConfig.Templateconfigurl + ((+softType) == 32 ? 'WWMS' : 'WQMS')}/`;
}

//获取采集目录下配置文件地址
function getCJConfigUrl(softType) {
    return `${_appConfig.caijiUrl + ((+softType) == 32 ? 'WWMS' : 'WQMS')}/`;
}

/**
 * 保存信息
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.Save = async function (req, res) {
    //{ProName:"test",ProCode:"test",ProType:"固定站",SoftType:"地表水",TP:1,TPJB:1,TPFactory:"雪迪龙",TPSeries:"标准",TN:1,TNJB:1,TNFactory:"雪迪龙",TNSeries:"标准",NH3:1,NH3JB:1,NH3Factory:"雪迪龙",NH3Series:"标准",COD:1,CODJB:1,CODFactory:"雪迪龙",CODSeries:"标准",CODCR:1,CODCRJB:1,CODCRFactory:"雪迪龙",CODCRSeries:"标准",WC:1,WCFactory:"雪迪龙",WCSeries:"标准",YLS:1,YLSFactory:"雪迪龙",YLSSeries:"标准",ZMD:1,ZMDFactory:"雪迪龙",ZMDSeries:"标准",ZF:1,ZFFactory:"雪迪龙",ZFSeries:"标准",LY:1,LYFactory:"德润",LYSeries:"标准"}
    let data = req.body;
    data.UserID = req.Token.Data.ID
    try {
        if (data == undefined || data == null) {
            return res.json({ Code: 0, Msg: '参数错误', Data: '' });
        }
        if (!data.hasOwnProperty("ProName") || data.ProName == "") {
            return res.json({ Code: 0, Msg: '项目名称为空', Data: '' });
        }
        if (!data.hasOwnProperty("ProCode") || data.ProCode == "") {
            return res.json({ Code: 0, Msg: '项目编号为空', Data: '' });
        }
        if (!data.hasOwnProperty("ProType") || data.ProType == "") {
            return res.json({ Code: 0, Msg: '项目类型为空', Data: '' });
        }

        let Result = await ProAPI.Save(data);
        return res.json(Result);
    }
    catch
    {
        return res.json({ Code: 0, Msg: '操作错误', Data: '' });
    }
}

/**
 * 删除信息
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.Del = async function (req, res) {
    //{ID:[2,3,4,5,6]}
    let data = req.body;
    let Result = await ProAPI.Del(data.ID);
    return res.json(Result);
}

/**
 * 查询信息
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.Query = async function (req, res) {
    let ID = req.query.ID;
    let Result = await ProAPI.Query(ID);
    return res.json(Result);
}

/**
 * 复制
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.Copy = async function (req, res) {
    let ID = req.query.ID;
    let Result = await ProAPI.Copy(ID);
    return res.json(Result);
}

/**
 * 软件授权
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.GetSoftKey = async function (req, res) {
    //{ID:1,MachineCode:""}
    let data = req.body;
    if (data == undefined || data == null ||
        data.ID == undefined || data.MachineCode == undefined ||
        data.ID == null || data.MachineCode == null) {
        return res.json({ Code: 0, Msg: '参数错误', Data: '' });
    }
    let Result = await ProAPI.Query(data.ID);
    if (Result.Code != 1 && Result.Data.length <= 0) return res.json(Result);

    let MCArr = data.MachineCode.split('|');
    let CPUStr = MCArr[0].split('').reverse().join('');
    let MACStr = MCArr[1].split('').reverse().join('');

    data.ProCode = Result.Data[0].ProCode;
    data.SoftKey = EncryHelper.MD5(CPUStr + '_' + MACStr);
    data.UserID = req.Token.Data.ID;

    Result = await ProAPI.SetSoftKey(data);
    if (Result.Code == 1) {
        Result = { Code: Result.Code, Msg: Result.Msg, Data: data.SoftKey };
    }
    return res.json(Result);
}



/**
 * 保存ini文件及系统授权
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveIni = async function (req, res) {
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        try {
            // const iopath = path.join(__dirname, appconfig.sysIniUrl); // 引用Pos.ini的相对地址
            const iopath =path.resolve(appconfig.sysIniUrl);
            
            let data = fs.readFileSync(iopath);
            var str = iconv.decode(data, 'GB2312');
            console.log(str);
            const Info = ini.parse(str);
            console.log('修改ini文件路径', iopath);

            Info.config.ProCode = fields['softInfo[ProCode]'];
            Info.config.ProName = fields['softInfo[ProName]'];
            Info.config.ProType = fields['softInfo[ProType]'];
            Info.config.SoftKey = fields['softInfo[SoftKey]'];
            if (fields['softInfo[SoftType]'] < 32) {

                Info.config.Drivers_Dir = './wqms';
                Info.config.DBName='shuizhi';
                Info.config.PLC = 'WQMS.Std9Canshu';

                if (fields['softInfo[ProType]'] == '固定站') {
                    Info.config.SoftType = '21'
                } else if (fields['softInfo[ProType]'] == '小型站') {
                    Info.config.SoftType = '22'
                } else if (fields['softInfo[ProType]'] == '简易站') {
                    Info.config.SoftType = '23'
                }
            } else {
                Info.config.Drivers_Dir = './WWMS';
                Info.config.DBName='wwms';

                Info.config.PLC = 'WWMS.STDPollutionSources';

                Info.config.SoftType = fields['softInfo[SoftType]'];
            }
            Info.config.MachineCode = fields['softInfo[MachineCode]'];

             const iopath1 =path.resolve(appconfig.sysIniUrl);

           // const iopath1 = path.join(__dirname, appconfig.sysIniUrl);
            // Info.config.ProType="小型站";
            console.log('授权ini文件路径', iopath);

            let IniData = ini.stringify(Info);
            var iniList = iconv.encode(IniData, 'GB2312');

            fs.writeFileSync(path.resolve(iopath1), iniList, { flag: 'w+', encoding: 'ascii' })
            res.status(200).send("授权成功,重启软件后生效").end();
        }
        catch (error) {
            res.status(500).send("授权失败,请联系管理员").end();
            console.log('SaveIni=', error)
        }

        // fs.writeFileSync(path.resolve(FilePath), Str, { flag: 'w+' });
        // console.log('成功')
        // return '修改Meter.csv成功';
        // fs.writeFile(path.resolve(strRamUrl), Str, { encoding: 'utf-8' }, function (err) {
        //     if (err) {
        //         res.status(409).send("修改失败").end();
        //         return;
        //     }
        //     res.status(200).send("修改成功").end();
        //     console.log('成功')

        // })
    })




}

/**
 * 获取前端配置
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveFrontConfig = async function (req, res) {
    //  let ID = req.query.ID;
    //  let Result = await ProAPI.Query(ID);
    //  if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        try {
            //模板文件
            // let JSONStr = IO.ReadFile(path.join(__dirname, '../Template/WQMS/config.js'));
            // if (JSONStr == "") return res.json({ Code: 0, Msg: "模板文件出错", Data: '' });

            // console.log(fields)
            let Ramurl = getTemplateUrl(fields.SoftType) + "config.js"
            fs.readFile(path.resolve(Ramurl), 'utf-8', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                var Str = data.toString();//将二进制的数据转换为字符串
                // console.log(Str)

                // let Pro = Result.Data[0];
                if (fields["str[3][DevTag]"] == 'TP') {
                    // JSONStr = Tool.ReplaceAll("{{TP启用}}", (Pro.TP == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[3][Used]"] == 'true') {
                        // Str = Str.replace(/"{{TP启用}}"/g, true);
                        Str = Str.replace(RegExp("{{TP启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{TPSeries}}", "g"), `'${fields["str[3][Series]"]}'`);
                        Str = Str.replace(RegExp("{{TPFactory}}", "g"), `'${fields["str[3][Factory]"]}'`);
                    } else {
                        // Str = Str.replace(/"{{TP启用}}"/g, false)
                        Str = Str.replace(RegExp("{{TP启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{TPSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{TPFactory}}", "g"), `''`);

                    }
                }
                if (fields["str[1][DevTag]"] == 'TN') {
                    // JSONStr = Tool.ReplaceAll("{{TN启用}}", (Pro.TN == 1 ? "true" : "false"), JSONStr);

                    if (fields["str[1][Used]"] == 'true') {
                        // Str = Str.replace(/"{{TN启用}}"/g, true)
                        Str = Str.replace(RegExp("{{TN启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{TNSeries}}", "g"), `'${fields["str[1][Series]"]}'`);
                        Str = Str.replace(RegExp("{{TNFactory}}", "g"), `'${fields["str[1][Factory]"]}'`);
                    } else {
                        // Str = Str.replace(/"{{TN启用}}"/g, false)
                        Str = Str.replace(RegExp("{{TN启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{TNSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{TNFactory}}", "g"), `''`);
                    }

                }
                if (fields["str[7][DevTag]"] == 'NH3') {
                    // JSONStr = Tool.ReplaceAll("{{NH3启用}}", (Pro.NH3 == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[7][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{NH3启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{NH3Series}}", "g"), `'${fields["str[7][Series]"]}'`);
                        Str = Str.replace(RegExp("{{NH3Factory}}", "g"), `'${fields["str[7][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{NH3启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{NH3Series}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{NH3Factory}}", "g"), `''`);
                    }
                }
                if (fields["str[5][DevTag]"] == 'COD') {
                    //JSONStr = Tool.ReplaceAll("{{COD启用}}", (Pro.COD == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[5][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{COD启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{CODSeries}}", "g"), `'${fields["str[5][Series]"]}'`);
                        Str = Str.replace(RegExp("{{CODFactory}}", "g"), `'${fields["str[5][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{COD启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{CODSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{CODFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[9][DevTag]"] == 'CODCR') {
                    // JSONStr = Tool.ReplaceAll("{{CODCR启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[9][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{CODCR启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{CODCRSeries}}", "g"), `'${fields["str[9][Series]"]}'`);
                        Str = Str.replace(RegExp("{{CODCRFactory}}", "g"), `'${fields["str[9][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{CODCR启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{CODCRSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{CODCRFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[11][DevTag]"] == 'WC') {
                    // JSONStr = Tool.ReplaceAll("{{CODCR启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[11][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{五参启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{五参Series}}", "g"), `'${fields["str[11][Series]"]}'`);
                        Str = Str.replace(RegExp("{{五参Factory}}", "g"), `'${fields["str[11][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{五参启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{五参Series}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{五参Factory}}", "g"), `''`);
                    }
                }
                if (fields["str[13][DevTag]"] == 'YLS') {
                    // JSONStr = Tool.ReplaceAll("{{YLS启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[13][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{YLS启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{YLSSeries}}", "g"), `'${fields["str[13][Series]"]}'`);
                        Str = Str.replace(RegExp("{{YLSFactory}}", "g"), `'${fields["str[13][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{YLS启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{YLSSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{YLSFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[14][DevTag]"] == 'ZMD') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[14][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{ZMD启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{ZMDSeries}}", "g"), `'${fields["str[14][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZMDFactory}}", "g"), `'${fields["str[14][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{ZMD启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{ZMDSeries}}", "g"), `'${fields["str[14][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZMDFactory}}", "g"), `'${fields["str[14][Factory]"]}'`);
                    }
                }
                if (fields["str[15][DevTag]"] == 'LY') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[15][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{LY启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{LYSeries}}", "g"), `'${fields["str[15][Series]"]}'`);
                        Str = Str.replace(RegExp("{{LYFactory}}", "g"), `'${fields["str[15][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{LY启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{LYSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{LYFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[12][DevTag]"] == 'ZF') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[12][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{ZF启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{ZFSeries}}", "g"), `'${fields["str[12][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZFFactory}}", "g"), `'${fields["str[12][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{ZF启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{ZFSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{ZFFactory}}", "g"), `''`);
                    }
                }

                if (fields["str[16][DevTag]"] == 'HM') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[16][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{ZJS启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{ZJSSeries}}", "g"), `'${fields["str[16][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZJSFactory}}", "g"), `'${fields["str[16][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{ZJS启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{ZJSSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{ZJSFactory}}", "g"), `''`);
                    }
                }

                if (fields["str[16][Ge]"] == '1') {
                    Str = Str.replace(RegExp("{{w20115启用}}", "g"), true);
                } else {
                    Str = Str.replace(RegExp("{{w20115启用}}", "g"), false);
                }
                if (fields["str[16][Qian]"] == '1') {
                    Str = Str.replace(RegExp("{{w20120启用}}", "g"), true);
                } else {
                    Str = Str.replace(RegExp("{{w20120启用}}", "g"), false);
                }
                if (fields['str[16][Tong]'] == '1') {
                    Str = Str.replace(RegExp("{{w20122启用}}", "g"), true);
                } else {
                    Str = Str.replace(RegExp("{{w20122启用}}", "g"), false);
                }
                if (fields['str[16][Xin]'] == '1') {
                    Str = Str.replace(RegExp("{{w20123启用}}", "g"), true);
                } else {
                    Str = Str.replace(RegExp("{{w20123启用}}", "g"), false);
                }
                //   vocs
                if (fields["str[17][DevTag]"] == 'VOCS') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[17][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{VOCs启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{VOCsSeries}}", "g"), `'${fields["str[17][Series]"]}'`);
                        Str = Str.replace(RegExp("{{VOCsFactory}}", "g"), `'${fields["str[17][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{VOCs启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{VOCsSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{VOCsFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[17][w24017]"] == '1') {
                    Str = Str.replace(RegExp("{{w24017启用}}", "g"), true);
                } else {
                    Str = Str.replace(RegExp("{{w24017启用}}", "g"), false);
                }
                if (fields["str[17][w25003]"] == '1') {
                    Str = Str.replace(RegExp("{{w25003启用}}", "g"), true);
                } else {
                    Str = Str.replace(RegExp("{{w25003启用}}", "g"), false);
                }
                if (fields['str[17][w25010]'] == '1') {
                    Str = Str.replace(RegExp("{{w25010启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25010启用}}", "g"), false);
                }
                if (fields['str[17][w25011]'] == '1') {
                    Str = Str.replace(RegExp("{{w25011启用}}", "g"), true);
                }
                else {
                    Str = Str.replace(RegExp("{{w25011启用}}", "g"), false);
                }
                if (fields['str[17][w25013]'] == '1') {
                    Str = Str.replace(RegExp("{{w25013启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25013启用}}", "g"), false);
                }
                if (fields['str[17][w25034]'] == '1') {
                    Str = Str.replace(RegExp("{{w25034启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25034启用}}", "g"), false);
                }
                if (fields['str[17][w25038]'] == '1') {
                    Str = Str.replace(RegExp("{{w25038启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25038启用}}", "g"), false);
                }
                if (fields['str[17][w25073]'] == '1') {
                    Str = Str.replace(RegExp("{{w25073启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25073启用}}", "g"), false);
                }
                if (fields['str[17][w24009]'] == '1') {
                    Str = Str.replace(RegExp("{{w24009启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24009启用}}", "g"), false);
                }
                if (fields['str[17][w24004]'] == '1') {
                    Str = Str.replace(RegExp("{{w24004启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24004启用}}", "g"), false);
                }
                if (fields['str[17][w25006]'] == '1') {
                    Str = Str.replace(RegExp("{{w25006启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25006启用}}", "g"), false);
                }
                if (fields['str[17][w24047]'] == '1') {
                    Str = Str.replace(RegExp("{{w24047启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24047启用}}", "g"), false);
                }
                if (fields['str[17][w24048]'] == '1') {
                    Str = Str.replace(RegExp("{{w24048启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24048启用}}", "g"), false);
                }
                if (fields['str[17][w25004]'] == '1') {
                    Str = Str.replace(RegExp("{{w25004启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25004启用}}", "g"), false);
                }
                if (fields['str[17][w24003]'] == '1') {
                    Str = Str.replace(RegExp("{{w24003启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24003启用}}", "g"), false);
                }
                if (fields['str[17][w24049]'] == '1') {
                    Str = Str.replace(RegExp("{{w24049启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24049启用}}", "g"), false);
                }
                if (fields['str[17][w24050]'] == '1') {
                    Str = Str.replace(RegExp("{{w24050启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w24050启用}}", "g"), false);
                }
                if (fields['str[17][w25002]'] == '1') {
                    Str = Str.replace(RegExp("{{w25002启用}}", "g"), true);

                } else {
                    Str = Str.replace(RegExp("{{w25002启用}}", "g"), false);
                }

                //          let strRamUrl = "../dist/static/config.js"; //发布

                // let strRamUrl = "./static/config.js"; //本地



                console.log('config文件地址', path.resolve(pollutantConfigUrl));
                // console.log(Str)

                fs.writeFile(path.resolve(pollutantConfigUrl), Str, { encoding: 'utf-8' }, function (err) {
                    if (err) {
                        res.status(409).send("页面配置修改失败").end();
                        return;
                    }
                    res.status(200).send("修改成功").end();
                    console.log('成功')

                })
                // res.setHeader('Content-type', 'application/octet-stream');
                // res.setHeader('Content-Disposition', 'attachment;filename=config.js');
                // let data = Buffer.from(JSONStr);
                // res.write(data, 'binary');
                // res.end();

            })
        }
        catch
        {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }
    })
}
/**
 * 获取前端配置
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveWSFrontConfig = async function (req, res) {
    //  let ID = req.query.ID;
    //  let Result = await ProAPI.Query(ID);
    //  if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        try {
            //模板文件
            // let JSONStr = IO.ReadFile(path.join(__dirname, '../Template/WQMS/config.js'));
            // if (JSONStr == "") return res.json({ Code: 0, Msg: "模板文件出错", Data: '' });

            // console.log(fields)
            let Ramurl = getTemplateUrl(fields.SoftType) + "config.js"
            fs.readFile(path.resolve(Ramurl), 'utf-8', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                var Str = data.toString();//将二进制的数据转换为字符串
                // console.log(Str)

                // let Pro = Result.Data[0];
                if (fields["str[0][DevTag]"] == 'TN') {
                    // JSONStr = Tool.ReplaceAll("{{TN启用}}", (Pro.TN == 1 ? "true" : "false"), JSONStr);

                    if (fields["str[0][Used]"] == 'true') {
                        // Str = Str.replace(/"{{TN启用}}"/g, true)
                        Str = Str.replace(RegExp("{{TN启用}}", "g"), true);
                        // Str = Str.replace(RegExp("{{TNTag}}", "g"), `'${fields["str[0][Series]"]}'`);
                        Str = Str.replace(RegExp("{{TNSeries}}", "g"), `'${fields["str[0][Series]"]}'`);
                        Str = Str.replace(RegExp("{{TNFactory}}", "g"), `'${fields["str[0][Factory]"]}'`);
                    } else {
                        // Str = Str.replace(/"{{TN启用}}"/g, false)
                        Str = Str.replace(RegExp("{{TN启用}}", "g"), false);
                        // Str = Str.replace(RegExp("{{TNTag}}", "g"), `'MODEL 9850'`);
                        Str = Str.replace(RegExp("{{TNSeries}}", "g"), `'${fields["str[0][Series]"]}'`);
                        Str = Str.replace(RegExp("{{TNFactory}}", "g"), `'${fields["str[0][Factory]"]}'`);
                    }


                }
                if (fields["str[1][DevTag]"] == 'TP') {
                    // JSONStr = Tool.ReplaceAll("{{TP启用}}", (Pro.TP == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[1][Used]"] == 'true') {
                        // Str = Str.replace(/"{{TP启用}}"/g, true);
                        Str = Str.replace(RegExp("{{TP启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{TPSeries}}", "g"), `'${fields["str[1][Series]"]}'`);
                        Str = Str.replace(RegExp("{{TPFactory}}", "g"), `'${fields["str[1][Factory]"]}'`);


                    } else {
                        // Str = Str.replace(/"{{TP启用}}"/g, false)
                        Str = Str.replace(RegExp("{{TP启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{TPSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{TPFactory}}", "g"), `''`);

                    }
                }

                if (fields["str[2][DevTag]"] == 'NH3') {
                    // JSONStr = Tool.ReplaceAll("{{NH3启用}}", (Pro.NH3 == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[2][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{NH3启用}}", "g"), true);
                        // Str = Str.replace(RegExp("{{NH3Tag}}", "g"), `'${fields["str[2][Series]"]}'`);
                        Str = Str.replace(RegExp("{{NH3Series}}", "g"), `'${fields["str[2][Series]"]}'`);
                        Str = Str.replace(RegExp("{{NH3Factory}}", "g"), `'${fields["str[2][Factory]"]}'`);

                    } else {
                        Str = Str.replace(RegExp("{{NH3启用}}", "g"), false);
                        // Str = Str.replace(RegExp("{{NH3Tag}}", "g"), `'MODEL 9820'`);
                        Str = Str.replace(RegExp("{{NH3Series}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{NH3Factory}}", "g"), `''`);
                    }
                }

                if (fields["str[3][DevTag]"] == 'CODCR') {
                    // JSONStr = Tool.ReplaceAll("{{CODCR启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[3][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{CODCR启用}}", "g"), true);
                        // Str = Str.replace(RegExp("{{CODCRTag}}", "g"), `'${fields["str[3][Series]"]}'`);
                        Str = Str.replace(RegExp("{{CODCRSeries}}", "g"), `'${fields["str[3][Series]"]}'`);
                        Str = Str.replace(RegExp("{{CODCRFactory}}", "g"), `'${fields["str[3][Factory]"]}'`);

                    } else {
                        Str = Str.replace(RegExp("{{CODCR启用}}", "g"), false);
                        // Str = Str.replace(RegExp("{{CODCRTag}}", "g"), `'MODEL 9810'`);
                        Str = Str.replace(RegExp("{{CODCRSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{CODCRFactory}}", "g"), `''`);
                    }
                }

                if (fields["str[4][DevTag]"] == 'WC') {
                    // JSONStr = Tool.ReplaceAll("{{CODCR启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[4][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{五参启用}}", "g"), true);
                        // Str = Str.replace(RegExp("{{WCTag}}", "g"), `'${fields["str[4][Series]"]}'`);
                        Str = Str.replace(RegExp("{{五参Series}}", "g"), `'${fields["str[4][Series]"]}'`);
                        Str = Str.replace(RegExp("{{五参Factory}}", "g"), `'${fields["str[4][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{五参启用}}", "g"), false);
                        // Str = Str.replace(RegExp("{{WCTag}}", "g"), `'MODEL 2000'`);
                        Str = Str.replace(RegExp("{{五参Series}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{五参Factory}}", "g"), `''`);
                    }
                } if (fields["str[5][DevTag]"] == 'ZF') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[5][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{ZF启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{ZFSeries}}", "g"), `'${fields["str[5][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZFFactory}}", "g"), `'${fields["str[5][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{ZF启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{ZFSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{ZFFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[6][DevTag]"] == 'YLS') {
                    // JSONStr = Tool.ReplaceAll("{{YLS启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[6][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{YLS启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{YLSSeries}}", "g"), `'${fields["str[6][Series]"]}'`);
                        Str = Str.replace(RegExp("{{YLSFactory}}", "g"), `'${fields["str[6][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{YLS启用}}", "g"), false);
                        // Str = Str.replace(RegExp("{{YLSTag}}", "g"), `'MODEL 9001'`);
                        Str = Str.replace(RegExp("{{YLSSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{YLSFactory}}", "g"), `''`);

                    }
                }
                if (fields["str[7][DevTag]"] == 'ZMD') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[7][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{ZMD启用}}", "g"), true);
                        // Str = Str.replace(RegExp("{{ZMDTag}}", "g"), `'${fields["str[7][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZMDSeries}}", "g"), `'${fields["str[7][Series]"]}'`);
                        Str = Str.replace(RegExp("{{ZMDFactory}}", "g"), `'${fields["str[7][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{ZMD启用}}", "g"), false);
                        // Str = Str.replace(RegExp("{{ZMDTag}}", "g"), `'MODEL 9002'`);
                        Str = Str.replace(RegExp("{{ZMDSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{ZMDFactory}}", "g"), `''`);

                    }
                }
                if (fields["str[8][DevTag]"] == 'LLJ') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[8][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{LLJ启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{LLJSeries}}", "g"), `'${fields["str[8][Series]"]}'`);
                        Str = Str.replace(RegExp("{{LLJFactory}}", "g"), `'${fields["str[8][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{LLJ启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{LLJSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{LLJFactory}}", "g"), `''`);
                    }
                }
                if (fields["str[9][DevTag]"] == 'CYQ') {
                    // JSONStr = Tool.ReplaceAll("{{ZMD启用}}", (Pro.CODCR == 1 ? "true" : "false"), JSONStr);
                    if (fields["str[9][Used]"] == 'true') {
                        Str = Str.replace(RegExp("{{CYQ启用}}", "g"), true);
                        Str = Str.replace(RegExp("{{CYQSeries}}", "g"), `'${fields["str[9][Series]"]}'`);
                        Str = Str.replace(RegExp("{{CYQFactory}}", "g"), `'${fields["str[9][Factory]"]}'`);
                    } else {
                        Str = Str.replace(RegExp("{{CYQ启用}}", "g"), false);
                        Str = Str.replace(RegExp("{{CYQSeries}}", "g"), `''`);
                        Str = Str.replace(RegExp("{{CYQFactory}}", "g"), `''`);
                    }
                }


                //      let strRamUrl = "../dist/static/config.js" //发布
                // let strRamUrl = "./static/config.js"
                console.log('config文件地址', path.resolve(pollutantConfigUrl))
                console.log(Str)

                fs.writeFile(path.resolve(pollutantConfigUrl), Str, { encoding: 'utf-8' }, function (err) {
                    if (err) {
                        res.status(409).send("页面配置修改失败").end();
                        return;
                    }
                    res.status(200).send("修改成功").end();
                    console.log('成功')

                })
            })
        }
        catch
        {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }
    })
}
// 页面config.js配置
function SaveFrontConfig(_driverList, TemplateUrl) {
    // 读取模板文件
    let Ramurl = TemplateUrl + "config.js";
    fs.readFile(path.resolve(Ramurl), 'utf-8', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var jsonStr = data.toString();//将二进制的数据转换为字符串
        console.log('_driverList=',_driverList)

        _driverList.map((a) => {
            let r = a[0];
            if (a.length > 1) {
                // _DevTag = []; _Series = []; _DevTagName = [];
                a.map((c) => {
                    jsonStr = jsonStr.replace(RegExp(`{{${c.DevTag}启用}}`, "g"),  c.Used);
                    jsonStr = jsonStr.replace(RegExp(`{{${c.DevTag}Series}}`, "g"), `'${c.Series}'`);
                    jsonStr = jsonStr.replace(RegExp(`{{${c.DevTag}Factory}}`, "g"), `'${c.Factory}'`);
                })
            }
            else{
                if(r.DevTag=='HM'){
                    r.zjsCheckList.map((voc)=>{
                        jsonStr = jsonStr.replace(RegExp(`{{${voc.ID}启用}}`, "g"), voc.Status);
                       })
                }
                if(r.DevTag=='VOCS'){
                   r.vocsCheckList.map((voc)=>{
                    jsonStr = jsonStr.replace(RegExp(`{{${voc.ID}启用}}`, "g"), voc.Status);
                   })

                }
                jsonStr = jsonStr.replace(RegExp(`{{${r.DevTag}启用}}`, "g"),  r.Used);
                jsonStr = jsonStr.replace(RegExp(`{{${r.DevTag}Series}}`, "g"), `'${r.Series}'`);
                jsonStr = jsonStr.replace(RegExp(`{{${r.DevTag}Factory}}`, "g"), `'${r.Factory}'`);
            }

            // _str += `${r.id},${r.Driver},${r.Protocal},${r.ParseClass},${r.ConnStr},${r.TagFile},${r.Used.toString().toUpperCase()},${_DevTag.join(';')},${r.Factory},${_Series.join(';')},${_DevTagName.join(';')}\r\n`;
        });


       

        console.log('config文件地址', path.resolve(pollutantConfigUrl));
        // console.log(Str)

        fs.writeFile(path.resolve(pollutantConfigUrl), jsonStr, { encoding: 'utf-8' }, function (err) {
            if (err) {
                // res.status(409).send("页面配置修改失败").end();
               console.log('页面配置修改失败')
                // return;
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
            let _driverList = groupBy(eval(fields.str).filter(m => m.Used), function (item) {
                return [item.id];
            });
    
            updateDrivers(_driverList, getCJConfigUrl(fields.SoftType));
            updateRead_RAM(_driverList, getCJConfigUrl(fields.SoftType), getTemplateUrl(fields.SoftType));
            updateMeter(_driverList, getCJConfigUrl(fields.SoftType), getTemplateUrl(fields.SoftType));
            // 因子配置文件
            let _driverLists = groupBy(eval(fields.str), function (item) {
                return [item.id];
            });
            SaveFrontConfig(_driverLists, getTemplateUrl(fields.SoftType))
            return res.json({ Code: 200, Msg: '保存成功，请重启软件', Data: [] });
        }
        catch (err) {
            return res.json({ Code: 500, Msg: '出错了', Data: err.toString() });
        }
    })
    // return false;
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
        //  _driverList = groupBy(eval(fields.str).filter(m => m.Used), function (item) {
        //     return [item.id];
        // });
        _driverList.map((a) => {

            let r = a[0];
            _DevTag = []; _Series = []; _DevTagName = [];
            if (r.DevTag.toUpperCase() == 'VOCS' || r.DevTag.toUpperCase() == 'HM') {
                _DevTag.push(r.DevTag);
                _Series.push(r.Series);
                _DevTagName = r.CheckedNames;
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
            _str += `${r.id},${r.Driver},${r.Protocal},${r.ParseClass},${r.ConnStr},${r.TagFile},${r.Used.toString().toUpperCase()},${_DevTag.join(';')},${r.Factory},${_Series.join(';')},${_DevTagName.join(';')}\r\n`;
        });
        // this.updateDrivers(_driverList);
        // this.updateRead_RAM(_driverList);
        // this.updateMeter(_driverList);
        let driverUrl = ConfigsUrl + 'drivers.csv';
        fs.writeFile(path.resolve(driverUrl), _str, { encoding: 'utf-8' }, function (err) {
            if (err) {
                // res.status(409).send("river修改").end();
                // return;
                console.log('river修改失败')
            }
            console.log('river修改成功')

            // res.status(200).send("修改成功").end();
        });
        // return;

    }
    catch (err) {
        return res.json({ Code: 0, Msg: '出错了', Data: "" });
    }
    // })
}
// 修改Read_RAM
function updateRead_RAM(_driverList, ConfigsUrl, TemplateUrl) {
    try {
        let Ramurl = TemplateUrl + "Read_RAM.csv"

        fs.readFile(path.resolve(Ramurl), 'utf-8', function (err, data) {
            if (err) {
                return console.error(err);
            }
            var ramStr = data.toString();//将二进制的数据转换为字符串

            // let Str = IO.ReadFile(path.join(__dirname, '../Template/WQMS/Read_RAM.csv'))
            _driverList.map((a) => {
                let other = a[0];

                if (a.length > 1) {

                    a.filter(m => m.Used).map((item) => {
                        if (item.DevTag == 'TP') {
                            ramStr = ramStr + "\r\nTP_com,TP通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TP_因子编码,0,RAM,,";
                        }
                        if (item.DevTag == 'TN') ramStr = ramStr + "\r\nTN_com,TN通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TN_因子编码,0,RAM,,";
                        if (item.DevTag == 'NH3') ramStr = ramStr + "\r\nNH3_com,NH3通讯状态,INT,,,FALSE,,NONE,,ComStatus,,NH3_因子编码,0,RAM,,";
                        if (item.DevTag == 'COD') ramStr = ramStr + "\r\nCOD_com,COD通讯状态,INT,,,FALSE,,NONE,,ComStatus,,COD_因子编码,0,RAM,,";
                        if (item.DevTag == 'CODCR') ramStr = ramStr + "\r\nCODCR_com,CODCR通讯状态,INT,,,FALSE,,NONE,,ComStatus,,CODCR_因子编码,0,RAM,,";
                        if (item.DevTag == 'YLS') ramStr = ramStr + "\r\nYLS_com,叶绿素,INT,,,FALSE,,NONE,,ComStatus,,yls_叶绿素,0,RAM,,";


                    })
                } else {
                    if (other.DevTag == 'WC') ramStr = ramStr + "\r\nWC_com,五参数通讯状态,INT,,,FALSE,,NONE,,ComStatus,,wc_电导率,0,RAM,,";
                    if (other.DevTag == 'LY') ramStr = ramStr + "\r\nLY_com,留样通讯状态,INT,,,FALSE,,NONE,,ComStatus,,LY_留样瓶号,0,RAM,,";
                    if (other.DevTag == 'ZF') ramStr = ramStr + "\r\nZF_com,站房通讯状态,INT,,,FALSE,,NONE,,ComStatus,,zf_大气温度,0,RAM,,";

                    if (other.DevTag == 'HM') ramStr = ramStr + "\r\nHM_com,重金属通讯状态,INT,,,FALSE,,NONE,,ComStatus,,HM_报警,0,RAM,,";
                    if (other.DevTag == 'VOCS') ramStr = ramStr + "\r\nVOCS_com,VOCS通讯状态,INT,,,FALSE,,NONE,,ComStatus,,VOCS_W24003,0,RAM,,";

                }

            })
            let FilePath = ConfigsUrl + 'Read_RAM.csv'

            try {
                fs.writeFileSync(path.resolve(FilePath), ramStr, { flag: 'w+' });
                console.log('Read_RAM成功')
                // return '修改Read_RAM.csv成功';
            }
            catch (err) {
                console.log('修改Read_RAM.csv失败')

                // return '修改Read_RAM.csv失败';
            }

        })
    }
    catch (err) {
        return res.json({ Code: 0, Msg: '出错了', Data: "" });
    };
}
// 修改Mater文件
function updateMeter(_driverList, ConfigsUrl, TemplateUrl) {
    try {
        // fields.TemplateUrl + "/Template/WQMS/Read_RAM.csv"
        let TPurl = TemplateUrl + "TP.csv"
        let TNurl = TemplateUrl + "TN.csv"
        let NH3url = TemplateUrl + "NH3.csv"
        let CODurl = TemplateUrl + "COD.csv"
        let CODCRurl = TemplateUrl + "CODCR.csv"
        // let urlList = [TPurl, TNurl, NH3url, CODurl, CODCRurl]
        // console.log(urlList)

        var MaterStr = "Symbol,Name,数据类型,寄存器,地址,归档,量程,报警类型,报警,函数,函数参数,依赖,DriverID,IOType,GroupID,功能码,字节序";
        _driverList.map((a) => {
            // let item = a[0];
            if (a.length > 1) {

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

        console.log('TemplateUrl=', path.resolve(FilePath))
        try {
            fs.writeFileSync(path.resolve(FilePath), MaterStr, { flag: 'w+' });
            console.log('修改Meter.csv成功')
            // return '修改Meter.csv成功';
        }
        catch (err) {
            console.log('失败=', err)

            return '修改Meter.csv失败';
        }
    }
    catch (err) {
        return res.json({ Code: 0, Msg: '出错了', Data: "" });
    }
}


exports.saveWSDriverConfig = async function (req, res) {

    let form = new formidable();

    form.parse(req, function (err, fields, files) {
        try {
            console.log('fields=', fields)
            // var JSONData = queryString.parse(fields);
            let Str = "ID,Driver,Protocal,ParseClass,ConnStr,TagFile,Used,DevTag,Factory,Series,DevTagName\r\n";

            let Meter = "";
            if (fields["str[0][DevTag]"] == 'TN' && fields["str[0][Used]"] == 'true') Meter = Meter + "TN;";
            if (fields["str[1][DevTag]"] == 'TP' && fields["str[1][Used]"] == 'true') Meter = Meter + "TP;";
            if (fields["str[2][DevTag]"] == 'NH3' && fields["str[2][Used]"] == 'true') Meter = Meter + "NH3;";
            if (fields["str[3][DevTag]"] == 'CODCR' && fields["str[3][Used]"] == 'true') Meter = Meter + "CODCR;";
            let MeterName = "";
            if (fields["str[0][DevTag]"] == 'TN' && fields["str[0][Used]"] == 'true') MeterName = MeterName + "总氮;";
            if (fields["str[1][DevTag]"] == 'TP' && fields["str[1][Used]"] == 'true') MeterName = MeterName + "总磷;";
            if (fields["str[2][DevTag]"] == 'NH3' && fields["str[2][Used]"] == 'true') MeterName = MeterName + "氨氮;";
            if (fields["str[3][DevTag]"] == 'CODCR' && fields["str[3][Used]"] == 'true') MeterName = MeterName + "化学需氧量;";
            let MeterSerie = "";
            if (fields["str[0][DevTag]"] == 'TN' && fields["str[0][Used]"] == 'true') MeterSerie = MeterSerie + fields["str[0][Series]"] + ";";
            if (fields["str[1][DevTag]"] == 'TP' && fields["str[1][Used]"] == 'true') MeterSerie = MeterSerie + fields["str[1][Series]"] + ";";
            if (fields["str[2][DevTag]"] == 'NH3' && fields["str[2][Used]"] == 'true') MeterSerie = MeterSerie + fields["str[2][Series]"] + ";";
            if (fields["str[3][DevTag]"] == 'CODCR' && fields["str[3][Used]"] == 'true') MeterSerie = MeterSerie + fields["str[3][Series]"] + ";";
            if (Meter != "") Str = Str + "100,Modbus,MBRS232,," + fields["str[1][ConnStr]"] + ",/WWMS/Meter.csv,TRUE," + Meter.substring(0, Meter.length - 1) + ", 雪迪龙," + MeterSerie.substring(0, MeterSerie.length - 1) + "," + MeterName.substring(0, MeterName.length - 1) + "\r\n";




            // if (fields["str[0][DevTag]"] == 'TN' && fields["str[0][Used]"] == 'true') {
            //     Str = Str + "0,Modbus,MBRS232,," + fields["str[0][ConnStr]"] + ",/WQMS/Meter.csv,TRUE,TN," + fields["str[0][Factory]"] + "," + fields["str[0][Series]"] + ",总氮\r\n";
            //   }
            // if (fields["str[1][DevTag]"] == 'TP' && fields["str[1][Used]"] == 'true') Str = Str + "1,Modbus,MBRS232,," + fields["str[1][ConnStr]"] + ",/WWMS/Meter.csv,TRUE,TP," + fields["str[1][Factory]"] + "," + fields["str[1][Series]"] + ",总磷 \r\n";
            // if (fields["str[2][DevTag]"] == 'NH3' && fields["str[2][Used]"] == 'true') Str = Str + "2,Modbus,MBRS232,," + fields["str[2][ConnStr]"] + ",/WWMS/Meter.csv,TRUE,NH3," + fields["str[2][Factory]"] + "," + fields["str[2][Series]"] + ",氨氮\r\n";
            // if (fields["str[3][DevTag]"] == 'CODCR' && fields["str[3][Used]"] == 'true') Str = Str + "3,Modbus,MBRS232,," + fields["str[3][ConnStr]"] + ",/WWMS/Meter.csv,TRUE,CODCR," + fields["str[3][Factory]"] + "," + fields["str[3][Series]"] + ",化学需氧量\r\n";
            if (fields["str[4][DevTag]"] == 'WC' && fields["str[4][Used]"] == 'true') Str = Str + "4,Modbus,MBRS232,," + fields["str[4][ConnStr]"] + ",/WWMS/" + (fields["str[4][Factory]"] == "E+H" ? "wc.csv" : "wc_guohong.csv") + ",TRUE,WC," + fields["str[4][Factory]"] + "," + fields["str[4][Series]"] + ",五参数(pH，水温)\r\n";
            if (fields["str[5][DevTag]"] == 'ZF' && fields["str[5][Used]"] == 'true') Str = Str + "5,Modbus,MBRS232,," + fields["str[5][ConnStr]"] + ",/WWMS/zf.csv,TRUE,ZF," + fields["str[5][Factory]"] + "," + fields["str[5][Series]"] + ",站房(温，湿度)\r\n";
            // if (fields["str[6][DevTag]"] == 'YLS' && fields["str[6][Used]"] == 'true') Str = Str + "6,Modbus,MBRS232,," + fields["str[6][ConnStr]"] + ",/WWMS/yls.csv,TRUE,YLS," + fields["str[6][Factory]"] + "," + fields["str[6][Series]"] + ",叶绿素\r\n";
            // if (fields["str[7][DevTag]"] == 'ZMD' && fields["str[7][Used]"] == 'true') Str = Str + "7,Modbus,MBRS232,," + fields["str[7][ConnStr]"] + ",/WWMS/yls.csv,TRUE,ZMD," + fields["str[7][Factory]"] + "," + fields["str[7][Series]"] + ",藻密度\r\n";
            if (fields["str[8][DevTag]"] == 'LLJ' && fields["str[8][Used]"] == 'true') Str = Str + "8,Modbus,MBRS232,," + fields["str[8][ConnStr]"] + ",/WWMS/llj.csv,TRUE,LLJ," + fields["str[8][Factory]"] + "," + fields["str[8][Series]"] + ",流量计\r\n";
            if (fields["str[9][DevTag]"] == 'CYQ' && fields["str[9][Used]"] == 'true') Str = Str + "9,Modbus,MBRS232,," + fields["str[9][ConnStr]"] + ",/WWMS/cyq.csv,TRUE,CYQ," + fields["str[9][Factory]"] + "," + fields["str[9][Series]"] + ",采样器\r\n";


            let Meters = "";
            if (fields["str[6][DevTag]"] == 'YLS' && fields["str[6][Used]"] == 'true') Meters = Meters + "YLS;";
            if (fields["str[7][DevTag]"] == 'ZMD' && fields["str[7][Used]"] == 'true') Meters = Meters + "ZMD;";
            let MeterNames = "";
            if (fields["str[6][DevTag]"] == 'YLS' && fields["str[6][Used]"] == 'true') MeterNames = MeterNames + "叶绿素;";
            if (fields["str[7][DevTag]"] == 'ZMD' && fields["str[7][Used]"] == 'true') MeterNames = MeterNames + "藻密度;";
            let MeterSeries = "";
            if (fields["str[6][DevTag]"] == 'YLS' && fields["str[6][Used]"] == 'true') MeterSeries = MeterSeries + fields["str[6][Series]"] + ";";
            if (fields["str[7][DevTag]"] == 'ZMD' && fields["str[7][Used]"] == 'true') MeterSeries = MeterSeries + fields["str[7][Series]"] + ";";
            if (Meters != "") Str = Str + "100,Modbus,MBRS232,," + fields["str[6][ConnStr]"] + ",/WWMS/yls.csv,TRUE," + Meters.substring(0, Meters.length - 1) + "," + fields["str[6][Factory]"] + "," + MeterSeries.substring(0, MeterSeries.length - 1) + "," + MeterNames.substring(0, MeterNames.length - 1) + "\r\n";

            // console.log('str=', Str)
            console.log('ConfigsUrl=', fields.ConfigsUrl)
            console.log('ConfigsUrl2222=', path.resolve(fields.ConfigsUrl));

            fs.writeFile(path.resolve(fields.ConfigsUrl), Str, { encoding: 'utf-8' }, function (err) {
                if (err) {
                    res.status(409).send("driver修改失败").end();
                    return;
                }
                console.log('成功')

                // res.status(200).send("修改成功").end();
            })
        }
        catch (err) {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }
    })
}
/**
 * RAM配置
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveWSRAMConfig = async function (req, res) {
    //  let ID = req.query.ID;
    //  let Result = await ProAPI.Query(ID);
    //  if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();

    form.parse(req, function (err, fields, files) {

        try {

            // console.log('fields=', fields)
            let Ramurl = fields.TemplateUrl + "Read_RAM.csv"
            // console.log('Ramurl=', Ramurl)

            fs.readFile(path.resolve(Ramurl), 'utf-8', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                var Str = data.toString();//将二进制的数据转换为字符串

                // let Str = IO.ReadFile(path.join(__dirname, '../Template/WQMS/Read_RAM.csv'))

                if (fields["str[0][DevTag]"] == 'TN' && fields["str[0][Used]"] == 'true') {
                    Str = Str + "\r\nTN_com,TN通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TN_因子编码,0,RAM,,";
                }
                if (fields["str[1][DevTag]"] == 'TP' && fields["str[1][Used]"] == 'true') Str = Str + "\r\nTP_com,TP通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TP_因子编码,0,RAM,,";
                if (fields["str[2][DevTag]"] == 'NH3' && fields["str[2][Used]"] == 'true') Str = Str + "\r\nNH3_com,NH3通讯状态,INT,,,FALSE,,NONE,,ComStatus,,NH3_因子编码,0,RAM,,";
                if (fields["str[3][DevTag]"] == 'CODCR' && fields["str[3][Used]"] == 'true') Str = Str + "\r\nCODCR_com,CODCR通讯状态,INT,,,FALSE,,NONE,,ComStatus,,CODCR_因子编码,0,RAM,,";
                if (fields["str[4][DevTag]"] == 'WC' && fields["str[4][Used]"] == 'true') Str = Str + "\r\nWC_com,五参数通讯状态,INT,,,FALSE,,NONE,,ComStatus,,wc_pH值,0,RAM,,";
                if (fields["str[5][DevTag]"] == 'ZF' && fields["str[5][Used]"] == 'true') Str = Str + "\r\nZF_com,站房通讯状态,INT,,,FALSE,,NONE,,ComStatus,,zf_大气温度,0,RAM,,";
                if (fields["str[6][DevTag]"] == 'YLS' && fields["str[6][Used]"] == 'true') Str = Str + "\r\nYLS_com,叶绿素,INT,,,FALSE,,NONE,,ComStatus,,yls_叶绿素,0,RAM,,";
                // if (fields["str[7][DevTag]"] == 'ZMD' && fields["str[7][Used]"] == 'true') Str = Str + "\r\nZMD_com,藻密度,INT,,,FALSE,,NONE,,ComStatus,,zmd_藻密度,0,RAM,,";
                if (fields["str[8][DevTag]"] == 'LLJ' && fields["str[8][Used]"] == 'true') Str = Str + "\r\nLLJ_com,流量计通讯状态,INT,,,FALSE,,NONE,,ComStatus,,F_瞬时流量,0,RAM,,";
                if (fields["str[9][DevTag]"] == 'CYQ' && fields["str[9][Used]"] == 'true') Str = Str + "\r\nCYQ_com,采样器通讯状态,INT,,,FALSE,,NONE,,ComStatus,,CYQ_留样瓶号,0,RAM,,";



                // console.log('strRam=', Str)
                // console.log('configurl=', fields.configurl)
                let FilePath = fields.ConfigsUrl + 'Read_RAM.csv'

                try {
                    fs.writeFileSync(path.resolve(FilePath), Str, { flag: 'w+' });
                    console.log('成功')
                    res.status(200).send("Read_RAM修改成功").end();
                    return '修改Meter.csv成功';
                }
                catch (err) {
                    console.log('失败')
                    // res.status(200).send("修改成功").end();

                    return '修改Read_RAMv失败';
                }

            })
        }
        catch (err) {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }
    })
}
/**
 * RAM配置
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveRAMConfig = async function (req, res) {
    //  let ID = req.query.ID;
    //  let Result = await ProAPI.Query(ID);
    //  if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();

    form.parse(req, function (err, fields, files) {

        try {

            // console.log('fields=', fields)
            let Ramurl = fields.TemplateUrl + "Read_RAM.csv"
            // console.log('Ramurl=', Ramurl)

            fs.readFile(path.resolve(Ramurl), 'utf-8', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                var Str = data.toString();//将二进制的数据转换为字符串

                // let Str = IO.ReadFile(path.join(__dirname, '../Template/WQMS/Read_RAM.csv'))

                if (fields["str[3][DevTag]"] == 'TP' && fields["str[3][Used]"] == 'true') Str = Str + "\r\nTP_com,TP通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TP_因子编码,0,RAM,,";
                if (fields["str[1][DevTag]"] == 'TN' && fields["str[1][Used]"] == 'true') Str = Str + "\r\nTN_com,TN通讯状态,INT,,,FALSE,,NONE,,ComStatus,,TN_因子编码,0,RAM,,";
                if (fields["str[7][DevTag]"] == 'NH3' && fields["str[7][Used]"] == 'true') Str = Str + "\r\nNH3_com,NH3通讯状态,INT,,,FALSE,,NONE,,ComStatus,,NH3_因子编码,0,RAM,,";
                if (fields["str[5][DevTag]"] == 'COD' && fields["str[5][Used]"] == 'true') Str = Str + "\r\nCOD_com,COD通讯状态,INT,,,FALSE,,NONE,,ComStatus,,COD_因子编码,0,RAM,,";
                if (fields["str[9][DevTag]"] == 'CODCR' && fields["str[9][Used]"] == 'true') Str = Str + "\r\nCODCR_com,CODCR通讯状态,INT,,,FALSE,,NONE,,ComStatus,,CODCR_因子编码,0,RAM,,";
                if (fields["str[11][DevTag]"] == 'WC' && fields["str[11][Used]"] == 'true') Str = Str + "\r\nWC_com,五参数通讯状态,INT,,,FALSE,,NONE,,ComStatus,,wc_电导率,0,RAM,,";
                if (fields["str[15][DevTag]"] == 'LY' && fields["str[15][Used]"] == 'true') Str = Str + "\r\nLY_com,留样通讯状态,INT,,,FALSE,,NONE,,ComStatus,,LY_留样瓶号,0,RAM,,";
                if (fields["str[12][DevTag]"] == 'ZF' && fields["str[12][Used]"] == 'true') Str = Str + "\r\nZF_com,站房通讯状态,INT,,,FALSE,,NONE,,ComStatus,,zf_大气温度,0,RAM,,";
                if (fields["str[13][DevTag]"] == 'YLS' && fields["str[13][Used]"] == 'true') Str = Str + "\r\nYLS_com,叶绿素,INT,,,FALSE,,NONE,,ComStatus,,yls_叶绿素,0,RAM,,";

                if (fields["str[16][DevTag]"] == 'HM' && fields["str[16][Used]"] == 'true') Str = Str + "\r\nHM_com,重金属通讯状态,INT,,,FALSE,,NONE,,ComStatus,,HM_报警,0,RAM,,";
                if (fields["str[17][DevTag]"] == 'VOCS' && fields["str[17][Used]"] == 'true') Str = Str + "\r\nVOCS_com,VOCS通讯状态,INT,,,FALSE,,NONE,,ComStatus,,VOCS_W24003,0,RAM,,";

                // res.setHeader('Content-type', 'application/octet-stream');
                // res.setHeader('Content-Disposition', 'attachment;filename=Read_RAM.csv');
                // let data = Buffer.from(Str);
                // res.write(data, 'binary');
                // res.end();

                // console.log('strRam=', Str)
                // console.log('configurl=', fields.configurl)
                let FilePath = fields.ConfigsUrl + 'Read_RAM.csv'

                try {
                    fs.writeFileSync(path.resolve(FilePath), Str, { flag: 'w+' });
                    console.log('Read_RAM成功')
                    return '修改Read_RAM.csv成功';
                }
                catch (err) {
                    console.log('失败')

                    return '修改Read_RAM.csv失败';
                }

            })
        }
        catch (err) {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }
    })
}
/**
 * 仪表配置
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveMeterConfig = async function (req, res) {
    // let ID = req.query.ID;
    // let Result = await ProAPI.Query(ID);
    // if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        try {
            // fields.TemplateUrl + "/Template/WQMS/Read_RAM.csv"
            let TPurl = fields.TemplateUrl + "TP.csv"
            let TNurl = fields.TemplateUrl + "TN.csv"
            let NH3url = fields.TemplateUrl + "NH3.csv"
            let CODurl = fields.TemplateUrl + "COD.csv"
            let CODCRurl = fields.TemplateUrl + "CODCR.csv"
            // let urlList = [TPurl, TNurl, NH3url, CODurl, CODCRurl]
            // console.log(urlList)

            var Str = "Symbol,Name,数据类型,寄存器,地址,归档,量程,报警类型,报警,函数,函数参数,依赖,DriverID,IOType,GroupID,功能码,字节序";


            if (fields["str[3][DevTag]"] == 'TP' && fields["str[3][Used]"] == 'true') {
                // IO.ReadFile(path.join(__dirname, '../Template/WQMS/TP.csv'))
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(TPurl), 'utf-8').slice(1);
            }
            if (fields["str[1][DevTag]"] == 'TN' && fields["str[1][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/TN.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(TNurl), 'utf-8').slice(1);
            }
            if (fields["str[7][DevTag]"] == 'NH3' && fields["str[7][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/NH3.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(NH3url), 'utf-8').slice(1);
            }
            if (fields["str[5][DevTag]"] == 'COD' && fields["str[5][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/COD.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(CODurl), 'utf-8').slice(1);
            }
            if (fields["str[9][DevTag]"] == 'CODCR' && fields["str[9][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/CODCR.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(CODCRurl), 'utf-8').slice(1);

            }

            let FilePath = fields.ConfigsUrl + "Meter.csv"

            // console.log('Meter6=', Str)

            console.log('TemplateUrl=', path.resolve(FilePath))
            try {
                fs.writeFileSync(path.resolve(FilePath), Str, { flag: 'w+' });
                console.log('成功')
                return '修改Meter.csv成功';
            }
            catch (err) {
                console.log('失败=', err)

                return '修改Meter.csv失败';
            }
            // res.setHeader('Content-type', 'application/octet-stream');
            // res.setHeader('Content-Disposition', 'attachment;filename=Meter.csv');
            // let data = Buffer.from(Str);
            // res.write(data, 'binary');
            // res.end();


            // fs.writeFile(path.resolve(strRamUrl), Str, { encoding: 'utf-8' }, function (err) {
            //     if (err) {
            //         res.status(409).send("修改失败").end();
            //         return;
            //     }
            //     res.status(200).send("修改成功").end();
            // })
        }
        catch (err) {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }

    })

}
/**
 * 仪表配置
 * @param {*} req 
 * @param {*} res 
 */
exports.SaveWSMeterConfig = async function (req, res) {
    // let ID = req.query.ID;
    // let Result = await ProAPI.Query(ID);
    // if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        try {
            // fields.TemplateUrl + "/Template/WQMS/Read_RAM.csv"
            let TPurl = fields.TemplateUrl + "TP.csv"
            let TNurl = fields.TemplateUrl + "TN.csv"
            let NH3url = fields.TemplateUrl + "NH3.csv"
            let CODurl = fields.TemplateUrl + "COD.csv"
            let CODCRurl = fields.TemplateUrl + "CODCR.csv"
            // let urlList = [TPurl, TNurl, NH3url, CODurl, CODCRurl]
            // console.log(urlList)

            var Str = "Symbol,Name,数据类型,寄存器,地址,归档,量程,报警类型,报警,函数,函数参数,依赖,DriverID,IOType,GroupID,功能码,字节序";



            if (fields["str[0][DevTag]"] == 'TN' && fields["str[0][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/TN.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(TNurl), 'utf-8').slice(1);
            }
            if (fields["str[1][DevTag]"] == 'TP' && fields["str[1][Used]"] == 'true') {
                // IO.ReadFile(path.join(__dirname, '../Template/WQMS/TP.csv'))
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(TPurl), 'utf-8').slice(1);
            }
            if (fields["str[2][DevTag]"] == 'NH3' && fields["str[2][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/NH3.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(NH3url), 'utf-8').slice(1);
            }
            if (fields["str[3][DevTag]"] == 'CODCR' && fields["str[3][Used]"] == 'true') {
                // Str = Str + "\r\n" + IO.ReadFile(path.join(__dirname, '../Template/WQMS/CODCR.csv'));
                Str = Str + "\r\n" + fs.readFileSync(path.resolve(CODCRurl), 'utf-8').slice(1);

            }

            let FilePath = fields.ConfigsUrl + "Meter.csv"

            // console.log('Meter6=', Str)

            console.log('TemplateUrl=', path.resolve(FilePath))
            try {
                fs.writeFileSync(path.resolve(FilePath), Str, { flag: 'w+' });
                console.log('成功')
                res.status(200).send("Meter.csv修改成功").end();

                return '修改Meter.csv成功';
            }
            catch (err) {
                console.log('失败=', err)
                res.status(200).send("修改失败").end();

                return '修改Meter.csv失败';
            }
        }
        catch (err) {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }

    })

}

/**
 * 保存json文件
 * @param {*} req 
 * @param {*} res 
 */
exports.SavejsonData = async function (req, res) {
    // let ID = req.query.ID;
    // let Result = await ProAPI.Query(ID);
    // if (Result.Code == 0 || Result.Data.length == 0) return res.json(Result);
    let form = new formidable();
    form.parse(req, function (err, fields, files) {
        try {

            console.log('fields=', fields);
            let jsonPath = fields.caijiUrl + '\\json\\';
            //判断目录是否存在  不存在则创建
            mkdirs(jsonPath, function (e) {

                // console.log('Meter6=', Str)
                let strJonPath = '';
                if (fields.strType == 'zjs') {
                    strJonPath = jsonPath + 'HM.json';

                } else {
                    strJonPath = jsonPath + 'VOCS.json';

                }
                console.log('jsonPath=', path.resolve(strJonPath))
                try {
                    fs.writeFileSync(path.resolve(strJonPath), fields.str, { flag: 'w+' });
                    console.log('成功')
                    res.status(200).send("重金属json修改成功").end();

                    return '修改json文件成功';
                }
                catch (err) {
                    console.log('失败=', err)
                    res.status(200).send("修改失败").end();

                    return '修改json文件失败';
                }


            });


        }
        catch (err) {
            return res.json({ Code: 0, Msg: '出错了', Data: "" });
        }
    })
}
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