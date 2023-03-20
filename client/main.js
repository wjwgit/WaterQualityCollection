// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/Icon/iconfont.css'
import './common/css/common.css'

import router from './router'
import moment from "moment";//时间格式化
// import Print from '@/common/js/printjs/print' // 引入附件的js文件
import VueContextMenu from '@xunlei/vue-context-menu'//右键菜单
import VueCookies from 'vue-cookies' //cookie
import echarts from 'echarts'// 引入echarts
import Print from 'vue-print-nb'

import http from './common/js/method.js' //调取服务(相当于ajax)
import store from './common/js/store.js' //判断是否登录
import * as socketApi from './common/js/socket.js'// WebSocket封装方法
import { json } from 'body-parser'
const { export_json_to_excel } = require("excel/Export2Excel");


Vue.use(VueCookies)
Vue.use(VueContextMenu)
Vue.use(Print) // 注册
Vue.prototype.$echarts = echarts
Vue.prototype.http = http

Vue.prototype.socketApi = socketApi

Vue.config.productionTip = false
Vue.use(ElementUI)

//路由跳转
router.beforeEach((to, from, next) => {
  // console.log(store.getters.isLogin)
  //判断是否登录
  //页面加载之前，获取系统配置信息
  http.GetSysConfigInfo(function () {
    if (!localStorage.getItem('logined')) {
      http
        .get("/logins", {
          dirUrl: "../caiji",
        })
        .then((res) => {
          console.log('res=', res)
          let user = {
            Loginedname: res.Loginedname,
            RoleID: res.RoleID,
            // appConfig: res.appConfig.config
          };
          store.commit("LOGIN", user);
          redirectRouter(to, next);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      redirectRouter(to, next);
    }
  });
});

function redirectRouter(to, next) {
  if (!socketApi.socketParam.isOpen) {
    socketApi.initWebSocket();
  }
  if (to.path === '/') {
    let softType = JSON.parse(localStorage.getItem("appConfig")).SoftType;
    let customPointName = JSON.parse(localStorage.getItem("clientConfigInfo")).customPointName;
    debugger
    if (softType == '32') {
      next({ path: '/sssj' })
      // next({ path: '/initpage' })
    }
    else if (softType == '21' || softType == '23') {
      if(customPointName=='龙感湖浮船站'){
        next({ path: '/lctfc' })

      }else{
        next({ path: '/lct' })

      }

    } else if (softType == '22') {
      next({ path: '/lct22' })
    }
  }

  next();

  // http
  //   .post("/postSaveINI", {
  //     DBIP: "172.16.12.199",
  //     DBPort: 3306,
  //     DBUID: "root",
  //     DBPWD: "123456",
  //     DBName: "shuizhi",
  //     DBBakDateTime: "23:55",
  //     DBBakHour: 23,
  //     DBBakMinute: 50,
  //     Cycle: 1,
  //     WebSocket_WS: "ws://127.0.0.1:7180",
  //     ScanType: "while",
  //     PLC: "WQMS.Std9Canshu",
  //     Drivers_Dir: "./wqms",
  //     KeepLogDays: 3,
  //     MeterVersion: 2000,
  //     AutoUpRepairDays: "7",
  //     ResUpLogStorage: "1",
  //     MachineCode: "BFEBFBFF000206A7|C4:00:AD:83:E4:36",
  //     SoftKey: "ff496ef25dfbab869221fd29ce05ce5c",
  //     Version: "1.0.0.01",
  //     MySQLDir: "C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\",
  //     SoftType: "21",
  //     ProName: "test1",
  //     ProType: "固定站",
  //     ProCode: "25142",
  //   })
  //   .then((res) => {
  //     debugger
  //     console.log('res=', res)

  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });
  // http
  //   .get("/getYW_FYCCList", {
  //     DevOpsNum: "20220708109372",
  //   })
  //   .then((res) => {
  //     debugger
  //     console.log('res=', res)

  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });

  //新增：ReceiveUserName:''、HandlDate
  // http
  //   .post("/updateYW_FYCCList", {
  //     DevOpsNum: "20220708109372",
  //     FormDatas: JSON.stringify([
  //       {
  //         EntName: '南邵测试1',
  //         OptCompanyName: '南邵测试1',
  //         SiteAddress: '1号厂房1',
  //         OptUserName: '手签1',
  //         FYStorageDate: '2022-07-18 10:50:02',//HandlDate
  //         Name: '总氮1',
  //         DisposalMethod: '转移1',
  //         Unit: 'L1',
  //         Quantity: '12',//ReceiveUserName:''
  //         Remark: '正常转移1',
  //         CreateName: '张三',
  //         CreateDate: '2022-07-19 10:50:22',
  //         UpdateName: '李四',
  //       },
  //       {
  //         EntName: '南邵测试1',
  //         OptCompanyName: '南邵测试1',
  //         SiteAddress: '1号厂房1',
  //         OptUserName: '手签1',
  //         FYStorageDate: '2022-07-18 10:50:02',
  //         Name: '化学需氧量1',
  //         DisposalMethod: '转移1',
  //         Unit: 'L1',
  //         Quantity: '12',
  //         Remark: '正常转移1',
  //         CreateName: '张三',
  //         CreateDate: '2022-07-19 10:50:22',
  //         UpdateName: '李四',
  //       },
  //     ])
  //   })
  //   .then((res) => {
  //     debugger
  //     console.log('res=', res)

  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });
}


// 全局调用，获取前端AppConfig
Vue.prototype.GetAppConfigJson = function () {
  var obj = null;
  http.GetSysConfigInfo(function (data) {
    obj = data.clientConfigInfo;
  });
  return obj;
}
// 全局调用， 获取后端ini配置信息
Vue.prototype.GetIniConfigInfo = function () {
  var obj = null;
  http.GetSysConfigInfo(function (data) {
    obj = data.appConfig;
  });
  return obj;
}

//导出excel数据通用方法
Vue.prototype.DataToExcel = function (obj) {
  try {
    if (obj && obj.ExportDatas.length > 0) {
      const FileName = obj.FileName + '_' + moment().format('YYYYMMDDHHmmss');//导出文件名称
      const ExcelHeader = obj.ExcelHeader.toString().replaceAll('<br/>', '').split(',');//导出excel列标题 []
      const SqlColumns = obj.SqlColumns; //数据库对应字段[]
      const ExportDatas = obj.ExportDatas; //数据源
      const data = ExportDatas.map(v => SqlColumns.map(j => v[j]));//按需导出需要的字段
      require.ensure([], () => {
        export_json_to_excel(
          ExcelHeader,
          data,
          FileName
        );
      });
      this.$message({
        message: `导出成功(${FileName}),共${data.length}条`,
        duration: 5000,
        type: "success"
      });
    } else {
      this.$message({
        message: `导出失败，数据不能为空`,
        duration: 5000,
        type: "error"
      });
    }

  } catch (e) {
    this.$message({
      message: `导出发生异常`,
      duration: 5000,
      type: "error"
    });
    console.log('导出失败：', e);
  }
};

//格式化参数
String.prototype.Format = function () {
  let str = this;
  for (let i = 0; i < arguments.length; i++) {
    str = str.replace('{' + i + '}', arguments[i]);
  }
  return str;
}

//定义全局过滤器
Vue.filter('dateFormat', function (date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
})
Vue.filter('dayFormat', function (date) {
  return moment(date).format("YYYY-MM-DD");
})
Vue.filter('monthdateFormat', function (date) {
  return moment(date).format("D") + "日";
})
Vue.filter('yeardateFormat', function (date) {
  return moment(date).format("M") + "月";
})
//添加table滚动条监听事件
Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      let sign = 1

      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      // console.log(scrollDistance);
      if (scrollDistance <= sign) {

        binding.value()
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})