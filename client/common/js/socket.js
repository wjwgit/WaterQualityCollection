import moment from 'moment';
import http from '../js/method' //调取服务(相当于ajax)

import * as globalDataConfig from './globalDataConfig.js';//全局数据的配置文件
import { Message, Loading } from 'element-ui';
import store from './store.js'; //判断是否登录

// console.log(555,global)
var pushData = [];

pushData.push({ "DriverID": "1", "Name": "TP_状态", "OpResult": "False", "Val": 1, "ALARM": "N" },
    { "DriverID": "1", "Name": "TN_状态", "OpResult": "False", "Val": 1, "ALARM": "N" },
    { "DriverID": "1", "Name": "NH3_状态", "OpResult": "False", "Val": 2, "ALARM": "N" },
    { "DriverID": "1", "Name": "COD_状态", "OpResult": "False", "Val": null, "ALARM": "N" });

pushData.push({ "DriverID": "1", "Name": "TP_数据", "OpResult": "False", "Val": 0.0035, "ALARM": "N" },
    { "DriverID": "1", "Name": "TN_数据", "OpResult": "False", "Val": 3.54, "ALARM": "N" },
    { "DriverID": "1", "Name": "NH3_数据", "OpResult": "False", "Val": 1.45, "ALARM": "N" },
    { "DriverID": "1", "Name": "COD_数据", "OpResult": "False", "Val": null, "ALARM": "N" });

pushData.push({ "DriverID": "1", "Name": "TP_报警", "OpResult": "False", "Val": 2, "ALARM": "N" },
    { "DriverID": "1", "Name": "TN_报警", "OpResult": "False", "Val": 0, "ALARM": "N" },
    { "DriverID": "1", "Name": "NH3_报警", "OpResult": "False", "Val": 3, "ALARM": "N" },
    { "DriverID": "1", "Name": "COD_报警", "OpResult": "False", "Val": null, "ALARM": "N" });

pushData.push({ "DriverID": "1", "Name": "TP_故障", "OpResult": "False", "Val": 2, "ALARM": "N" },
    { "DriverID": "1", "Name": "TN_故障", "OpResult": "False", "Val": 0, "ALARM": "N" },
    { "DriverID": "1", "Name": "NH3_故障", "OpResult": "False", "Val": 3, "ALARM": "N" },
    { "DriverID": "1", "Name": "COD_故障", "OpResult": "False", "Val": null, "ALARM": "N" });

// setInterval(function () {
//     globalDataConfig.updateGlobalData(pushData);
// }, 3000);

// setInterval(function () {
//     globalDataConfig.updateGlobalData([{ "DriverID": "1", "Name": "plc_M6状态", "OpResult": "False", "Val": true, "ALARM": "N" }]);
//     globalDataConfig.updateGlobalData([{ "DriverID": "1", "Name": "plc_M4状态", "OpResult": "False", "Val": true, "ALARM": "N" }]);
// }, 3000);
// setInterval(function () {
//     //globalDataConfig.SDL_Global.PLC.M6Status = false;
//     globalDataConfig.updateGlobalData([{ "DriverID": "1", "Name": "plc_M6状态", "OpResult": "False", "Val": false, "ALARM": "N" }]);
//     globalDataConfig.updateGlobalData([{ "DriverID": "1", "Name": "plc_M4状态", "OpResult": "False", "Val": false, "ALARM": "N" }]);
// }, 5000);

// setInterval(function () {
//     globalDataConfig.SDL_Global.TP.Alarm = 0;
//     globalDataConfig.SDL_Global.TP.AlarmText = 0;
//     globalDataConfig.SDL_Global.PLC.QingXiYeWeiAlarm = true;
//     globalDataConfig.SDL_Global.PLC.Beng1Fault = true;
//     globalDataConfig.SDL_Global.PLC.CaiYang2ChuZaoFault = true;
// }, 5000);
// 
//读取文件
const fs = require("fs");
const path = require('path');

// const appcfg = require('@appConfig');
let appcfg = null;


// let ssztConfig = null;
// let jclcConfig = null;
// let lcbjConfig = null;

// var ws = appcfg.socketUrl;// 地址

var communication = null;//页面显示当前连接状态
var websock = null;
//var globalCallback = null
var plcPattern = null;//plc模式
var socketConnect = false;//socket是否开启连接(登录时开启)

var pathUrl = null;//路由路径
var socketParam = {
    url: "",
    ws: null,
    isOpen: false,
    heartbeat: 1000 * 5,
    info: '',
    closeFlag: false
};

// 初始化weosocket
function initWebSocket() {
    
    appcfg = JSON.parse(localStorage.getItem("appConfig"));
    socketParam = {
        url: appcfg.WebSocket_WS,
        ws: null,
        isOpen: false,
        heartbeat: 1000 * 5,
        info: '',
        closeFlag: false
    };
    //登录后给数据赋值

    // ws地址 -->这里是你的请求路径
    try {
        socketParam.ws = new WebSocket(socketParam.url)
    } catch (ex) {
        console.log('WebSocket连接发生错误:', ex);
    }
    socketParam.ws.onopen = function () {
        socketParam.info = '连接已打开...';
        // console.log("Socket已连接：", socketParam.url);

        socketParam.isOpen = true;
        socketParam.closeFlag = false;

        Message.success({
            message: '通讯连接成功'
        });
    }
    //接收数据
    socketParam.ws.onmessage = function (e) {
        socketParam.info = '数据接收中...';
        websocketonmessage(e);
    }
    //连接断开或连接失败
    socketParam.ws.onclose = function (e) {
        socketParam.info = '连接已断开...';
        console.log("Socket已关闭：", socketParam.url);
        //通讯关闭 值全变为NA
        // ssztConfig.config.forEach(e => {
        //     e.realTimeData.forEach(r => {
        //         r.data = "暂无数据";
        //         if (r.flagData != undefined) {
        //             r.flagData = "";
        //         }
        //     })
        // });
        websocketClose(e);
    }

    // 连接发生错误的回调方法
    socketParam.ws.onerror = function (e) {
        communication = "通讯异常...";
        console.log('WebSocket连接发生错误:', e);
        socketParam.isOpen = false;
    }
}

//当路由发生变化时  改变
function pathChange(path) {
    pathUrl = path;//路由路径

}

function loadingInstance(isLoading) {
    if (isLoading) {
        let loadingInstance = Loading.service(loadingOpt);
        setTimeout(function () {
            loadingInstance.close();
        }, 1500);
    }
}
// 实际调用的方法
function sendSock(agentData, isLoading = false) {
    //globalCallback = callback
    if (socketParam.ws.readyState === socketParam.ws.OPEN) {
        // 若是ws开启状态
        websocketsend(agentData, isLoading);
        return true;
    }
    else if (socketParam.ws.readyState === socketParam.ws.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData)
        }, 1000)
    }
    else {
        // 若未开启 ，则等待1s后重新调用
        // setTimeout(function () {
        //     sendSock(agentData)
        // }, 1000)
        Message.error({
            message: '连接已断开...'
        });
        return false;
    }
}

// 数据接收
function websocketonmessage(e) {
    // console.time("ce");
    // console.log("数据接收中...");
    //reset();//重置心跳
    var res = JSON.parse(e.data);

    //循环获取实时传过来的数据
    if (res.length != 0) {
        globalDataConfig.updateGlobalData(res, appcfg.MeterVersion);
    }

    // console.timeEnd("ce");
}

const loadingOpt = {
    lock: true,
    fullscreen: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.3)'
};
// 数据发送
function websocketsend(agentData, isLoading) {
    // Message.info({
    //     message: agentData
    // });
    console.log("agentData=", agentData);
 

    loadingInstance(isLoading);
    let agentDataArr = agentData.split(',')
    if (agentDataArr[1] != "日志上传") {
        socketParam.ws.send(agentData);
        // this.$message.info(agentData);
    }

    if (agentDataArr[1] != "当前用户" && agentDataArr[2] != "plc_待机=False" && agentDataArr[2] != 'plc_单次测量=False' && agentDataArr[2] != 'plc_清洗=False' && agentDataArr[2] != 'plc_除藻=False') {
        
        if (agentDataArr[1] == "日志上传") {
            socketParam.ws.send(agentDataArr);
        // this.$message.info(agentDataArr);

        } else {
            agentDataArr[2] = "日志上传=" + agentDataArr[1]
            agentDataArr[1] = "日志上传"
            let agentDataLog = agentDataArr.join(',')
            socketParam.ws.send(agentDataLog);
        // this.$message.info(agentDataLog);


        }

        //友好提示 延迟1.5秒
        setTimeout(function () {
            Message.success({
                message: '命令发送成功'
            });

        }, 1500);
    }



}

// websocket 关闭
function websocketClose(e) {
    //登录页面处理
    if (e == 'Login') {
        console.log("Socket已断开：", e);
        socketParam.ws != null && socketParam.ws.close();//关闭连接
        return false;
    }

    if (!socketParam.closeFlag) {
        // Message.error({
        //     message: '通讯已关闭'
        // });
        //消息只弹一次
        socketParam.closeFlag = true;
    }

    console.log('e=', e);

    socketParam.isOpen = false;
    globalDataConfig.SDL_Global.PLC.YunXingMoShi = 0;

    if (e != undefined && store.getters.isLogin) {
        //重连
        setTimeout(function () {
            initWebSocket();
        }, socketParam.heartbeat);
    }
}

// websocket 打开
function websocketOpen() {

    console.log("Socket已连接：", socketParam.url);
    Message.success({
        message: '通讯连接成功'
    });

    socketParam.isOpen = true;
}

// 将方法暴露出去
export {
    //页面显示当前连接状态
    communication,
    //plc模式
    plcPattern,
    // 初始化weosocket
    initWebSocket,
    //当路由发生变化时  改变路由路径
    pathChange,
    //关闭 socket连接
    websocketClose,
    //socket发送数据
    sendSock,
    //全局变量
    globalDataConfig,
    //socket参数对象
    socketParam
}
