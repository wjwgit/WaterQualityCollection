<template>
  <div>
    <el-card class="box-card">
      <div class="header">
        <span class="title">数据库配置</span>
        <el-button @click="dbSave" class="savebtn" type="primary" size="small"
          >保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button
        >
      </div>
      <div>
        <el-form :model="formINI" label-width="180px">
          <el-col :span="12">
            <el-form-item label="数据库连接地址">
              <el-input v-model="formINI.DBIP" type="text"></el-input>
            </el-form-item>
            <el-form-item label="数据库访问账户">
              <el-input v-model="formINI.DBUID"></el-input>
            </el-form-item>
            <el-form-item label="数据库名称">
              <el-select
                v-model="formINI.DBName"
                placeholder="请选择"
                @change="dbNameChange"
              >
                <el-option label="shuizhi" value="shuizhi"></el-option>
                <el-option label="wwms" value="wwms"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据库连接端口号">
              <el-input v-model="formINI.DBPort"></el-input>
            </el-form-item>
            <el-form-item label="数据库访问密码">
              <el-input v-model="formINI.DBPWD" type="text"></el-input>
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
            <!-- <el-form-item label="mysql安装目录">
              <el-input v-model="formINI.MySQLDir" disabled></el-input>
            </el-form-item> -->
          </el-col>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="header">
        <span class="title">其他配置</span>
        <!-- <el-button class="savebtn" type="primary" size="small"
          >保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button
        > -->
      </div>
      <div>
        <el-form :model="formINI" label-width="180px">
          <el-col :span="12">
            <el-form-item label="WebSocket推送地址">
              <el-input v-model="formINI.WebSocket_WS" type="text"></el-input>
            </el-form-item>
            <el-form-item label="逻辑控制">
              <el-select v-model="formINI.PLC" placeholder="请选择">
                <el-option
                  v-if="formINI.DBName == 'shuizhi'"
                  label="WQMS.Std9Canshu"
                  value="WQMS.Std9Canshu"
                ></el-option>
                <el-option
                  v-else
                  label="WWMS.STDPollutionSources"
                  value="WWMS.STDPollutionSources"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="驱动文件夹">
              <el-select v-model="formINI.Drivers_Dir" placeholder="请选择">
                <el-option
                  v-if="formINI.DBName == 'shuizhi'"
                  label="./wqms"
                  value="./wqms"
                ></el-option>
                <el-option v-else label="./wwms" value="./wwms"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="站点类型">
              <el-select
                v-model="formINI.SoftType"
                placeholder="请选择"
                @change="pointChange"
              >
                <el-option
                  v-if="formINI.DBName == 'shuizhi'"
                  label="地表水固定站"
                  value="21"
                ></el-option>
                <el-option
                  v-if="formINI.DBName == 'shuizhi'"
                  label="地表水小型站"
                  value="22"
                >
                </el-option>
                <el-option
                  v-if="formINI.DBName == 'shuizhi'"
                  label="地表水简易站"
                  value="23"
                >
                </el-option>
                <el-option
                  v-if="formINI.DBName == 'wwms'"
                  label="水污染源在线监测"
                  value="32"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="扫描方式">
              <el-select v-model="formINI.ScanType" placeholder="请选择">
                <el-option label="while循环" value="while"></el-option>
                <el-option label="timer扫描" value="timer"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采样周期">
              <el-input v-model="formINI.Cycle" type="number" min="1">
                <template slot="append">秒</template>
              </el-input>
            </el-form-item>
            <el-form-item label="联网自动补传最新几天数据">
              <el-select
                v-model="formINI.AutoUpRepairDays"
                placeholder="请选择"
              >
                <el-option label="1" value="1"></el-option>
                <el-option label="3" value="3"> </el-option>
                <el-option label="4" value="5"> </el-option>
                <el-option label="7" value="7"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传服务器响应日志存库">
              <el-select v-model="formINI.ResUpLogStorage" placeholder="请选择">
                <el-option label="不存储" value="0"></el-option>
                <el-option label="存储" value="1"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="软件版本号">
              <el-input v-model="formINI.Version" disabled></el-input>
            </el-form-item>
            <el-form-item label="机器码">
              <el-input v-model="formINI.MachineCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="软件授权码">
              <el-input v-model="formINI.SoftKey" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="仪表版本">
              <el-input v-model="formINI.MeterVersion"></el-input>
            </el-form-item> -->
            <el-form-item label="项目名称">
              <el-input v-model="formINI.ProName" disabled></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-input v-model="formINI.ProType" disabled></el-input>
            </el-form-item>
            <el-form-item label="项目编号">
              <el-input v-model="formINI.ProCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="日志保留天数">
              <el-select v-model="formINI.KeepLogDays" placeholder="请选择">
                <el-option label="3" value="3"></el-option>
                <el-option label="10" value="10"> </el-option>
                <el-option label="30" value="30"> </el-option>
                <el-option label="90" value="90"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
  <script>
// 系统配置组件
export default {
  props: {},
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      formINI: {
        // DBIP: "172.16.12.199",
        // DBPort: 3306,
        // DBUID: "root",
        // DBPWD: "123456",
        // DBName: "shuizhi",
        // DBBakDateTime: "23:55",
        // DBBakHour: 23,
        // DBBakMinute: 50,
        // Cycle: 1,
        // WebSocket_WS: "ws://127.0.0.1:7180",
        // ScanType: "while",
        // PLC: "WQMS.Std9Canshu",
        // Drivers_Dir: "./wqms",
        // KeepLogDays: 3,
        // MeterVersion: 2000,
        // AutoUpRepairDays: "7",
        // ResUpLogStorage: "1",
        // MachineCode: "BFEBFBFF000206A7|C4:00:AD:83:E4:36",
        // SoftKey: "ff496ef25dfbab869221fd29ce05ce5c",
        // Version: "1.0.0.01",
        // MySQLDir: "C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\",
        // SoftType: "21",
        // ProName: "test1",
        // ProType: "固定站",
        // ProCode: "25142",
      },
      defaultformINI: null,
    };
  },
  mounted() {
    let aa = this.GetIniConfigInfo();
    aa.DBBakDateTime = aa.DBBakHour + ":" + aa.DBBakMinute;
    if (aa.DBName == "shuizhi" && aa.SoftType != 32) {
      aa.SoftType = aa.SoftType + "";
      aa.PLC = "WQMS.Std9Canshu";
      aa.Drivers_Dir = "./wqms";
    } else {
      aa.SoftType = "32";
      aa.PLC = "WWMS.STDPollutionSources";
      aa.Drivers_Dir = "./wwms";
    }
    this.formINI = aa;
    this.defaultformINI = JSON.stringify(this.formINI);
  },
  computed: {},
  methods: {
    dbSave() {
      let that = this;

      if (JSON.stringify(this.formINI) == this.defaultformINI) {
        that.$message.success("页面没有任何修改，无需保存");
        return;
      }

      this.$confirm("修改配置后，需要重启node才能生效?", "提示", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
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
              that.$message.success("保存成功，按F5刷新页面生效");
              that.defaultformINI = JSON.stringify(that.formINI);
              // localStorage.setItem("clientConfigInfo", "");
              localStorage.setItem("appConfig", "");
              that.GetIniConfigInfo();
              loading.close();
            } else {
              loading.close();
              that.$message.error("保存失败");
            }
          })
          .catch((res) => {
            that.$message.error("保存失败");
            loading.close();
          });
      });
    },
    dbNameChange(val) {
      if (val == "shuizhi") {
        this.formINI.SoftType = "21";
        this.formINI.PLC = "WQMS.Std9Canshu";
        this.formINI.Drivers_Dir = "./wqms";
      } else {
        this.formINI.SoftType = "32";
        this.formINI.PLC = "WWMS.STDPollutionSources";
        this.formINI.Drivers_Dir = "./wwms";
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
  },
};
</script>
<style scoped>
.header {
  height: 48px;
  line-height: 48px;
  background-color: #384565;
}
.title {
  color: #cccccc;
  font-size: 16px;
  margin-left: 18px;
}
.savebtn {
  float: right;
  margin-top: 8px;
  margin-right: 20px;
}
</style>