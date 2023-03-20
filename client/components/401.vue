<template>
  <div class="error401">
    <div class="warp">
      <div class="box">
        <!-- <router-link to="/" class="login" replace>返回登录</router-link> -->
        <div class="img">
          <img src="../images/401.png" />
        </div>
        <div class="remark">很抱歉 ，您暂无访问该页面权限</div>
        <!-- <div @click="esc" class="login">去登录</div> -->
        <!-- <div @click="topath" class="index">返回首页</div> -->
      </div>
    </div>

  </div>
</template>
<script>
  import { DateTime } from "../common/js/date.js";

  export default {
    name: "error401",
    data() {
      let date = new DateTime(); //调用datetime获取时间格式
      return {
        systemDate: date.getDate("."),
        getDateName: date.getDateWeek(),
        hours: date.getHour(),
        min: date.getMinute(),
        sec: date.getSecond(),
      };
    },
    methods: {
      topath() {
        this.$router.push("/lct");
      },
      esc() {
        // this.addlog(localStorage.getItem("Loginedname"));
        this.http.addLog('退出系统', '退出系统', true);

        this.$store.commit("LOGOUT");
        this.$router.push("/");
        this.socketApi.websocketClose("Login");
      },
      // 添加日志
      // addlog(name) {
      //   let time = this.systemDate + this.hours + ':' + this.min + ':' + this.sec;
      //   this.http
      //     .post("/addlog", {
      //       OPTIME: time,
      //       username: name,
      //       operator: '退出系统',
      //       cmdargs: '退出',
      //     })
      //     .then((res) => {

      //     })
      //     .catch((res) => {
      //       // console.log(res);
      //       this.$message.error(res);
      //     });
      // },
    }
  }
</script>
<style scoped>
  .error401 {
    background-color: #263044;
  }

  .warp {
    margin: 0 auto;
    margin-top: 10%;
    width: 300px;
    height: 400px;
    position: relative;

  }

  .box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    z-index: 999;
    text-align: center;
  }

  .remark {
    margin-top: 30px;
    font-size: 18px;
    color: #cccccc;
  }

  .login {
    width: 96px;
    height: 36px;
    line-height: 36px;
    border-radius: 25px;
    font-size: 14px;
    float: left;
    margin: 20px 12px 0px 40px;
    color: #ffffff;
    cursor: pointer;
    background-color: #4a92ff;
  }

  .index {
    width: 96px;
    height: 36px;

    line-height: 36px;
    border-radius: 25px;
    font-size: 14px;
    float: left;
    margin: 20px 12px;
    color: #ffffff;
    cursor: pointer;
    background-color: #263044;
    border: 1px solid #4a92ff
  }
</style>