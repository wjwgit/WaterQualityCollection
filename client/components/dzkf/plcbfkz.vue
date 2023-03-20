<template>
  <div class="div_ybkz">
    <el-tabs v-model="activeName">
      <el-tab-pane label="泵阀控制" name="bfkz">
        <el-alert
          v-if="SDL_Global.PLC.YunXingMoShi != 1"
          title="当运行模式为 [维护模式] 下才能进行以下操作！ "
          type="warning"
          show-icon
        >
        </el-alert>
        <el-row>
          </el-col>
          <el-col :sm="12" :xs="12" :md="8" :lg="6">
            <div class="bfkzbox">
              <div class="bfkzmlName">取水泵M1</div>
              <div class="bfkzmlSwith">
                <el-switch
                  v-model="SDL_Global.PLC.M1Status"
                  v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
                  @change="
                    sendml(
                      '取水泵M1',
                      SDL_Global.CMD.PLC_M.Format(1, SDL_Global.PLC.M1Status),
                      'BF'
                    )
                  "
                >
                </el-switch>
              </div>
              <span
                v-if="SDL_Global.PLC.M1Status == true"
                style="color: #4a92ff"
                >开</span
              >
              <span v-else style="color: #aaaaaa">关</span>
            </div>
          </el-col>
         
          <el-col :sm="12" :xs="12" :md="8" :lg="6">
            <div class="bfkzbox">
              <div class="bfkzmlName">取水阀1 SV1</div>
              <div class="bfkzmlSwith">
                <el-switch
                  v-model="SDL_Global.PLC.SV1Status"
                  v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
                  @change="
                    sendml(
                      '取水阀1 Sv1',
                      SDL_Global.CMD.PLC_SV.Format(9, SDL_Global.PLC.SV1Status),
                      'BF'
                    )
                  "
                >
                </el-switch>
              </div>
              <span
                v-if="SDL_Global.PLC.SV1Status == true"
                style="color: #4a92ff"
                >开</span
              >
              <span v-else style="color: #aaaaaa">关</span>
            </div>
          </el-col>
          <el-col :sm="12" :xs="12" :md="8" :lg="6">
            <div class="bfkzbox">
              <div class="bfkzmlName">取水阀2 SV2</div>
              <div class="bfkzmlSwith">
                <el-switch
                  v-model="SDL_Global.PLC.SV2Status"
                  v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
                  @change="
                    sendml(
                      '取水阀2 SV2',
                      SDL_Global.CMD.PLC_SV.Format(10, SDL_Global.PLC.SV2Status),
                      'BF'
                    )
                  "
                >
                </el-switch>
              </div>
              <span
                v-if="SDL_Global.PLC.SV2Status == true"
                style="color: #4a92ff"
                >开</span
              >
              <span v-else style="color: #aaaaaa">关</span>
            </div>
          </el-col>
          <el-col :sm="12" :xs="12" :md="8" :lg="6">
            <div class="bfkzbox">
              <div class="bfkzmlName">清水阀SV3</div>
              <div class="bfkzmlSwith">
                <el-switch
                  v-model="SDL_Global.PLC.SV3Status"
                  v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
                  @change="
                    sendml(
                      '清水阀SV3',
                      SDL_Global.CMD.PLC_SV.Format(11, SDL_Global.PLC.SV3Status),
                      'BF'
                    )
                  "
                >
                </el-switch>
              </div>
              <span
                v-if="SDL_Global.PLC.SV3Status == true"
                style="color: #4a92ff"
                >开</span
              >
              <span v-else style="color: #aaaaaa">关</span>
            </div>
          </el-col>
          <el-col :sm="12" :xs="12" :md="8" :lg="6">
            <div class="bfkzbox">
              <div class="bfkzmlName">反吹空气阀SV4</div>
              <div class="bfkzmlSwith">
                <el-switch
                  v-model="SDL_Global.PLC.SV4Status"
                  v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
                  @change="
                    sendml(
                      '反吹空气阀SV4',
                      SDL_Global.CMD.PLC_SV.Format(12, SDL_Global.PLC.SV4Status),
                      'BF'
                    )
                  "
                >
                </el-switch>
              </div>
              <span
                v-if="SDL_Global.PLC.SV4Status == true"
                style="color: #4a92ff"
                >开</span
              >
              <span v-else style="color: #aaaaaa">关</span>
            </div>
          </el-col>
        </el-row>
      
      </el-tab-pane>
        <el-tab-pane label="采水控制" name="cskz">
        
        <el-row>
            <el-col :span='3'>
            <div class="bfkzbox">
<el-button
                   type='primary'
          size="small"
          class="plcmlbtn"
          style="padding: 8px 7px"
          @click="sendPLCml('手动采水', SDL_Global.CMD.PLC_DanCiCeLiang)"
        >
          手动采水</el-button
        >
            </div>
      
                   
            <!-- </el-col>
              <el-col :span='3'> -->
                      <div class="bfkzbox">
                          <el-button
                   type='primary'

          size="small"
          class="plcmlbtn"
          style="padding: 8px 5px"
          @click="sendPLCml('停止采水', SDL_Global.CMD.PLC_DaiJi)"
          >停止采水
        </el-button>
            </div>
      
            </el-col>
         
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script scoped>
export default {
  name: "plcbfkz",
  components: {},
  data() {
    return {
      activeName: "bfkz",
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,

      SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,
    };
  },
  mounted() {},

  methods: {
    // 泵阀开关
    sendml(name, ml) {
      // 除访客之外用户可以操作
      if (JSON.parse(localStorage.getItem("RoleID")) == 0) {
        this.$message.warning("该用户暂无权限，请切换其他用户");
        return;
      }
      // 维护模式下才能操作
      if (this.SDL_Global.PLC.YunXingMoShi != 1) {
        this.$message.warning("请切换到维护模式进行操作！");
        return;
      }

      if (name == "取水泵M1" && ml == "plc_M1控制=true") {
        if (!this.SDL_Global.PLC.SV1Status) {
          this.$message.warning("开M1泵必须先确定SV1阀已打开");
          this.SDL_Global.PLC.M1Status = false;
          return;
        }
      }

      if (name == "取水泵M2" && ml == "plc_M2控制=true") {
        if (!this.SDL_Global.PLC.SV2Status) {
          this.$message.warning("开M2泵必须先确定SV2阀已打开");
          this.SDL_Global.PLC.M2Status = false;
          return;
        }
      }

      if (name == "取水阀1 Sv1" && ml == "plc_SV1控制=false") {
        if (this.SDL_Global.PLC.M1Status) {
          this.$message.warning("关SV1阀必须先确定M1泵已关闭");
          this.SDL_Global.PLC.SV1Status = true;
          return;
        }
      }

      if (name == "取水阀2 SV2" && ml == "plc_SV2控制=false") {
        if (this.SDL_Global.PLC.M2Status) {
          this.$message.warning("关SV2阀必须先确定M2泵已关闭");
          this.SDL_Global.PLC.SV2Status = true;
          return;
        }
      }
      var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;
      this.socketApi.sendSock(data, true);
    },
      // plc命令
    sendPLCml(mlName, ml) {
      if (mlName == "停止采水") {
        let dataf =
          "" + localStorage.getItem("Loginedname") + "," + mlName + "," + ml;
        // this.$message.info(dataf);
        if (JSON.parse(localStorage.getItem("RoleID")) == 0) {
          this.$message.info("该用户暂无权限，请切换其他用户");
        } else {
          this.socketApi.sendSock(dataf, true);
        }

        setTimeout(() => {
          let Fml = "";
          Fml = "plc_待机=False";
          let datas =
            "" + localStorage.getItem("Loginedname") + "," + mlName + "," + Fml;
          // console.log(datas);
          // this.$message.info(datas);
          if (JSON.parse(localStorage.getItem("RoleID")) == 0) {
            // this.$message.info("该用户暂无权限，请切换其他用户");
          } else {
            this.socketApi.sendSock(datas);
          }
        }, 5000);
      } else {
        if (JSON.parse(localStorage.getItem("RoleID")) == 0) {
          this.$message.info("该用户暂无权限，请切换其他用户");
        } else {
          if (this.SDL_Global.PLC.YunXingMoShi == 1) {
            let data =
              "" +
              localStorage.getItem("Loginedname") +
              "," +
              mlName +
              "," +
              ml;
            if (mlName == "手动采水") {
              // this.$message.info(data + ";" + "手动数据标识=M");
              this.socketApi.sendSock(data , true); //";" + "手动数据标识=M"
            } else {
              // this.$message.info(data);
              this.socketApi.sendSock(data, true);
            }
            setTimeout(() => {
              let Fml = "";
              if (mlName == "手动采水") {
                Fml = "plc_单次测量=False";
              } else if (mlName == "停止采水") {
                Fml = "plc_待机=False";
              }
              let data =
                "" +
                localStorage.getItem("Loginedname") +
                "," +
                mlName +
                "," +
                Fml;
              // console.log(data);
              // this.$message.info(data);

              this.socketApi.sendSock(data);
              // this.socketApi.sendSock(data + !ml);
            }, 5000);
          } else {
            this.$message.info("请切换到维护模式");
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.el-row {
  background-color: #303a4c;
  margin: 0 20px;
  text-align: right;
}
.bfkz-body {
  /* background-color: #303a4c;
        margin-left: 20px;
        margin-right: 20px; */
  text-align: right;
}

/* 泵阀框 */
.bfkzbox {
  margin: 0px 7%;
  padding: 17px 0px;
  display: inline-block;
  color: #cccccc;
  font-size: 14px;
}

/* 泵阀名称 */
.bfkzmlName {
  padding-right: 8px;
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
}

/* 泵阀状态 */
.bfkzmlSwith {
  text-align: right;
  display: inline-block;
}
</style>