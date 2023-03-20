
<template>
  <div class="init-page-container div_cj">
    <el-container>
      <el-header class="init-page-header">
        <div class="init-page-header-logo">
          <img src="../images/sdl.png" />
        </div>
        <div class="init-page-header-title">水质子站软件系统运行配置向导</div>
      </el-header>
      <div class="init-page-body">
        <el-steps :active="active" finish-status="success" simple>
          <!-- <el-step @click.native="stepClick(0)" title="数据库配置"></el-step>
          <el-step @click.native="stepClick(1)" title="设备配置"></el-step>
          <el-step @click.native="stepClick(2)" title="授权配置"></el-step>
          <el-step @click.native="stepClick(3)" title="配置完成"></el-step> -->

          <el-step title="数据库配置"></el-step>
          <el-step title="设备配置"></el-step>
          <el-step title="授权配置"></el-step>
          <el-step title="配置完成"></el-step>
        </el-steps>

        <el-card class="box-card" v-if="active == 0">
          <!-- <div slot="header">
            <span style="color: #fff">数据库配置</span>
            <el-button
              @click="stepClick(1)"
              style="float: right; margin-top: -9px; margin-left: 5px"
              size="small"
              type="default"
              >下一步<i
                class="el-icon-arrow-right el-icon--right"
                style="font-size: 14px"
              ></i
            ></el-button>
          </div> -->
          <el-form :model="formINI" label-width="180px">
            <el-col :span="12" :offset="5">
              <el-form-item label="数据库连接地址">
                <el-input v-model="formINI.DBIP" type="text"></el-input>
              </el-form-item>
              <el-form-item label="数据库连接端口号">
                <el-input v-model="formINI.DBPort"></el-input>
              </el-form-item>
              <el-form-item label="数据库访问账户">
                <el-input v-model="formINI.DBUID"></el-input>
              </el-form-item>
              <el-form-item label="数据库访问密码">
                <el-input v-model="formINI.DBPWD" type="text"></el-input>
              </el-form-item>
              <el-form-item label="软件类型">
                <el-select
                  style="width: 100%"
                  v-model="formINI.DBName"
                  placeholder="请选择"
                  @change="softTypeChange"
                  :disabled="!!formINI.SoftKey"
                >
                  <el-option label="地表水" value="shuizhi"></el-option>
                  <el-option label="污染源" value="wwms"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数据库自动备份时间">
                <el-time-select
                  v-model="formINI.DBBakDateTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:05',
                    end: '23:59',
                  }"
                  placeholder="选择时间"
                >
                </el-time-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveDBBtn" size="small"
                  >下一步</el-button
                >
              </el-form-item>
            </el-col>
          </el-form>
        </el-card>
        <!-- 设备管理 -->
        <sbgl
          ref="childs"
          v-if="active == 1"
          :isShowHeader="false"
          :btnCustom="true"
          :propSoftKey="!!formINI.SoftKey"
          @stepClick="stepClick"
        ></sbgl>
        <!-- 授权配置 -->
        <el-card class="box-card" v-if="active == 2">
          <!-- <div slot="header">
            <span style="color: #fff">授权配置</span>
            <el-button
              @click="stepClick(3)"
              style="float: right; margin-top: -9px; margin-left: 5px"
              size="small"
              type="default"
              >下一步<i
                class="el-icon-arrow-right el-icon--right"
                style="font-size: 14px"
              ></i
            ></el-button>
            <el-button
              @click="stepClick(1)"
              style="float: right; margin-top: -9px; margin-left: 5px"
              size="small"
              type="default"
              ><i class="el-icon-arrow-left" style="font-size: 14px"></i
              >上一步</el-button
            >
          </div> -->
          <el-form :model="formINI" label-width="180px">
            <el-col :span="14" :offset="3">
              <el-form-item label="项目名称">
                <el-input
                  v-model="formINI.ProName"
                  type="text"
                  :disabled="!!formINI.SoftKey"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-input
                  v-model="formINI.ProCode"
                  :disabled="!!formINI.SoftKey"
                ></el-input>
              </el-form-item>
              <el-form-item label="站点类型">
                <el-select
                  style="width: 100%"
                  v-model="formINI.SoftType"
                  placeholder="请选择"
                  @change="pointChange"
                  :disabled="!!formINI.SoftKey"
                >
                  <el-option
                    v-if="formINI.SoftType != 32"
                    label="地表水固定站"
                    value="21"
                  ></el-option>
                  <el-option
                    v-if="formINI.SoftType != 32"
                    label="地表水小型站"
                    value="22"
                  >
                  </el-option>
                  <el-option
                    v-if="formINI.SoftType != 32"
                    label="地表水简易站"
                    value="23"
                  >
                  </el-option>
                  <el-option
                    v-if="formINI.SoftType == 32"
                    label="水污染源在线监测"
                    value="32"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机器码">
                <el-input
                  v-model="formINI.MachineCode"
                  type="text"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="授权码">
                <el-input
                  style="width: 70%"
                  v-model="formINI.SoftKey"
                  type="text"
                  disabled
                  placeholder="请点击获取授权码→"
                ></el-input>
                <template v-if="!formINI.SoftKey">
                  <el-button type="primary" size="small" @click="getAuthorCode"
                    >获取授权码</el-button
                  >
                </template>
                <template v-else>
                  <span style="color: gold"> 已授权 </span>
                </template>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="default"
                  @click.native="stepClick(1)"
                  size="small"
                  >上一步</el-button
                >
                <el-button
                  v-show="formINI.SoftKey"
                  type="primary"
                  @click.native="stepClick(3)"
                  size="small"
                  >下一步</el-button
                >
              </el-form-item>

              <el-form-item> </el-form-item>
            </el-col>
          </el-form>
        </el-card>
        <!-- 配置成功 -->
        <el-card class="box-card" v-if="active == 3">
          <!-- <div slot="header">
            <span style="color: #fff">配置完成</span>
            <el-button
              style="float: right; margin-top: -9px"
              size="small"
              type="primary"
              @click="redirct"
              >进入系统</el-button
            >
          </div> -->
          <el-col :span="12" :offset="10">
            <div>
              <i
                class="el-icon-circle-check"
                style="font-size: 150px; color: #3cb371"
              ></i>
            </div>
            <div style="margin: 20px 0px 20px -95px; color: gold">
              配置完成，请关闭浏览器，并且重启软件后生效。
            </div>
            <el-button
              style="margin: 20px 0px 20px 35px"
              size="small"
              type="default"
              @click="stepClick(2)"
              >返回上一步</el-button
            >
            <!-- <el-button
              style="margin: 20px 0px 20px 35px"
              size="small"
              type="primary"
              @click="redirct"
              >进入系统</el-button
            > -->
          </el-col>
        </el-card>
      </div>
    </el-container>
  </div>
</template>


<script>
import axios from "axios";
import sbgl from "./xtkz/sbgl.vue";
export default {
  props: {},
  components: {
    sbgl,
  },
  data() {
    let _config = this.GetIniConfigInfo();
    if (_config.SoftKey) {
      this.$router.push("/");
    }
    return {
      appConfigJson: this.GetAppConfigJson(),
      active: 0,
      formINI: {},
      defaultDB: null,
    };
  },
  mounted() {
    // this.$router.push("/sssj");
    this.initConfig();
  },
  methods: {
    initConfig() {
      let aa = this.GetIniConfigInfo();

      aa.DBBakDateTime = aa.DBBakHour + ":" + aa.DBBakMinute;
      if (aa.DBName == "shuizhi") {
        aa.SoftType = "21";
      } else {
        aa.SoftType = "32";
      }
      this.formINI = aa;

      this.defaultDB = JSON.stringify(this.formINI);
      if (!this.validateMachineCode()) {
        return;
      }
    },
    validateMachineCode() {
      if (!this.formINI.MachineCode) {
        this.$message.error("机器码获取失败，请按[F5]刷新页面后重试");
        console.log("MachineCode=", this.formINI.MachineCode);
        localStorage.setItem("appConfig", "");
        return false;
      }
      return true;
    },
    // nextOK(){

    //     if(!this.formINI.SoftKey)
    //     {
    //         this.$message.error("请先");
    //     }
    // },
    //保存数据库配置
    saveDBBtn() {
      let that = this;

      if (!this.validateMachineCode()) {
        return;
      }

      if (JSON.stringify(this.formINI) == this.defaultDB) {
        that.active = ++that.active;
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.http
        .post("/postSaveINI", this.formINI)
        .then((res) => {
          if (res && res.Code == 200) {
            that.$message.success("保存成功");
            that.defaultDB = JSON.stringify(that.formINI);
            // localStorage.setItem("clientConfigInfo", "");
            localStorage.setItem("appConfig", "");
            localStorage.setItem("checkedComInfo", "");
            that.GetIniConfigInfo();
            setTimeout(function () {
              loading.close();
              that.active = ++that.active;
            }, 500);
          } else {
            loading.close();
            that.$message.error("保存失败");
          }
        })
        .catch((res) => {
          that.$message.error("保存失败");
          loading.close();
        });
    },
    //获取授权码
    getAuthorCode() {
      if (!this.validateMachineCode()) {
        return;
      }
      let comInfo = localStorage.getItem("checkedComInfo");
      if (!comInfo) {
        this.$message.error("授权失败，请先保存设备配置信息");
        // this.active = --this.active;
        return;
      }

      let that = this;

      this.$confirm("获取授权码后，无法修改所有配置信息?", "提示", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let postData = {
          ID: 0,
          ProName: this.formINI.ProName,
          ProCode: this.formINI.ProCode,
          ProType: this.formINI.ProType,
          SoftType: +this.formINI.SoftType != 32 ? "地表水" : "污染源",
          MachineCode: this.formINI.MachineCode,
          TP: 0,
          TPJB: 0,
          TPFactory: "",
          TPSeries: "",
          TN: 0,
          TNJB: 0,
          TNFactory: "",
          TNSeries: "",
          NH3: 0,
          NH3JB: 0,
          NH3Factory: "",
          NH3Series: "",
          COD: 0,
          CODJB: 0,
          CODFactory: "",
          CODSeries: "",
          CODCR: 0,
          CODCRJB: 0,
          CODCRFactory: "",
          CODCRSeries: "",
          WC: 0,
          WCFactory: "",
          WCSeries: "",
          YLS: 0,
          YLSFactory: "",
          YLSSeries: "",
          ZMD: 0,
          ZMDFactory: "",
          ZMDSeries: "",
          ZF: 0,
          ZFFactory: "",
          ZFSeries: "",
          LY: 0,
          LYFactory: "",
          LYSeries: "",
          CYQ: 0,
          CYQFactory: "",
          CYQSeries: "",
          LLJ: 0,
          LLJFactory: "",
          LLJeries: "",
        };

        JSON.parse(comInfo).map(function (item) {
          postData[item.DevTag] = item.Used ? 1 : 0;
          postData[item.DevTag + "Factory"] = item.Factory;
          postData[item.DevTag + "Series"] = item.Series;
        });

        axios
          .post(that.appConfigJson.softAuthorUrl, postData, {
            headers: {
              Authorization: "Bearer 90e885f6469d3d780fb78727b4881804",
            },
          })
          .then((res) => {
            if (res && res.data && res.data.Data) {
              that.formINI.SoftKey = res.data.Data;
              that.saveDBBtn();
            } else {
              that.$message.error(res.data.Msg);
            }
          })
          .catch((res) => {
            console.log(res);
            this.$message.error(res);
          });
      });
    },
    //软件类型
    softTypeChange(val) {
      if (val == "shuizhi") {
        this.formINI.SoftType = "21";
      } else {
        this.formINI.SoftType = "32";
      }
    },
    //站点类型切换
    pointChange(val) {
      switch (+val) {
        case 21:
          this.formINI.ProType = "地表水固定站";
          break;
        case 22:
          this.formINI.ProType = "地表水小型站";
          break;
        case 23:
          this.formINI.ProType = "地表水简易站";
          break;
        case 32:
          this.formINI.ProType = "水污染源在线监测";
          break;
      }
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    redirct() {
      this.$router.push("/sssj");
    },
    //下一步
    stepClick(a) {
      this.active = a;
    },
  },
};
</script>
<style scoped>
.init-page-container {
  width: 100%;
  height: 100%;
  background-color: #263044;
}
.init-page-header {
  height: 50px;
  line-height: 50px;
  background-color: #303a4e;
  color: #fff;
  font-size: 20px;
}
.init-page-header-logo {
  float: left;
  padding-top: 10px;
}
.init-page-header-title {
  float: left;
  padding-top: 5px;
  margin-left: 20px;
}
.init-page-container .init-page-body {
  margin: 20px;
  height: calc(100vh - 90px);
  overflow: auto;
}

.init-page-container .init-page-body .box-card {
  border-radius: 0px;
  background-color: #303a4e;
  margin: 20px 20px 0px 20px;
  border: 1px solid #303a4e;
}
.init-page-container .init-page-body .el-steps--simple {
  /* padding: 10px 8%; */
  width: auto;
  border-radius: 0px;
  background-color: #303a4e;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
}
.init-page-container .el-step {
  margin-top: 0px;
}

.init-page-container .el-step__icon-inner {
  color: #67c23a !important;
}

/* 滚动条 start */
/*y*/
.scrollbar::-webkit-scrollbar,
.init-page-container .init-page-body::-webkit-scrollbar,
.init-page-container .init-page-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 15px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.scrollbar::-webkit-scrollbar-thumb,
.init-page-container .init-page-body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  /* background: #dedfe1;  #545c6b*/
  background: #687ba2;
}

.scrollbar::-webkit-scrollbar-track,
.init-page-container .init-page-body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  /* border-radius: 10px; */
  /* background: #f5f7fa; */
  background: #384565;
}

/* x */
.scrollbar::-webkit-scrollbar,
.init-page-container .init-page-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 15px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 16px;
}
/*去掉右下角白色小方块样式*/
::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}

.scrollbar::-webkit-scrollbar-thumb,
.el-main::-webkit-scrollbar-thumb,
.el-aside::-webkit-scrollbar-thumb,
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  /* background   : #dedfe1; */
  /* background   : #2e3f62; */
  background: #687ba2;
}

.scrollbar::-webkit-scrollbar-track,
.el-main::-webkit-scrollbar-track,
.el-aside::-webkit-scrollbar-track,
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  /* border-radius: 10px; */
  /* background: #f5f7fa; */
  background: #455474;
}
/* 滚动条 end */
</style>>