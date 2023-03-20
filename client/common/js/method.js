import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据
import moment from "moment";
import * as socketApi from './socket.js'// WebSocket封装方法


// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
}


// 请求超时时间
//axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


export default {
    /** 
     * get方法，对应get请求 
     * @param {String} url [请求的url地址] 
     * @param {Object} params [请求时携带的参数] 
     */
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.response.data)
                })
        });
    },
    /** 
    * post方法，对应post请求 
    * @param {String} url [请求的url地址] 
    * @param {Object} params [请求时携带的参数] 
    */
    post(url, params) {
        return new Promise((resolve, reject) => {
            //QS.stringify(params) 序列化
            axios.post(url, QS.stringify(params))
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.response.data)
                })
        });
    },
    /** 
    * 通用获取数据方法 comMethod
    * @param {string} columnName [请求的列名]
    * @param {string} tableName [请求的表名]
    * @param {string} comdition [请求时携带的条件]
    */
    comMethod(columnName, tableName, comdition) {
        return new Promise((resolve, reject) => {
            if (columnName == "" || columnName == null) {
                columnName = "*";
            }
            var obj = {
                columnName: columnName,
                tabelName: tableName,
                comdition: comdition
            }
            axios.get('/getData',
                { params: obj }
            )
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data);
                })
        });
    },
    /** 
    * 添加日志
    * @param {string} remark 描述信息
    * @param {string} dataparams 操作参数或命令
    * @param {boolean} isSendML 是否同步发送日志命令
    */
    addLog(remark, dataparams = "--", isSendML = false) {
        this.post("/addlog", {
            OPTIME: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            username: localStorage.getItem("Loginedname") || '未知',
            operator: remark || '--',
            cmdargs: dataparams,
        })
            .then((res) => {
                if (isSendML) {
                    let data = "日志上传=" + remark;
                    socketApi.sendSock(data);
                }
            })
            .catch((res) => {
                // console.log(res);
                this.$message.error(res);
            });
    },
    //页面加载之前，获取系统配置信息
    GetSysConfigInfo(callback) {
        if (!localStorage.getItem("clientConfigInfo") || !localStorage.getItem("appConfig")) {
            this
                .get("/getSysConfig", {})
                .then((res) => {
                    localStorage.setItem("clientConfigInfo", JSON.stringify(res.Data.clientConfigInfo));
                    localStorage.setItem("softType", res.Data.serverConfingInfo.SoftType);
                    localStorage.setItem("appConfig", JSON.stringify(res.Data.serverConfingInfo));
                    callback(res.Data)
                })
                .catch((res) => {
                    console.log('getSysConfig-err=', res);
                });
        } else {
            callback({ clientConfigInfo: JSON.parse(localStorage.getItem("clientConfigInfo")), appConfig: JSON.parse(localStorage.getItem("appConfig")) });
        }
    }
}


