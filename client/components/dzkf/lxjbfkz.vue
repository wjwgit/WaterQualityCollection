<template>
  <div class="div_ybkz">
    <el-row>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">离心机启动开关</div>
          <div class="bfkzmlSwith">
            <el-button
              class="savebtn"
              @click="
                sendml('启动离心机', SDL_Global.CMD.PLC_LXJ.Format('true'))
              "
              type="primary"
              size="small"
              >启动
            </el-button>
          </div>
          <!-- <span v-if="SDL_Global.PLC.LXJStatus == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span> -->
        </div>
      </el-col>
      <!-- <el-col :sm="12" :xs="12" :md="16" :lg="18">
        <div class="valbox">
          <div class="bfkzmlName">启动离心机浊度区间</div>
          <div class="bfkzmlSwith">
            <el-input
              v-model="LXJMinlValue"
              style="width: 110px"
              size="mini"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
            -
            <el-input
              v-model="LXJMaxlValue"
              size="mini"
              style="width: 110px"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
            <el-button
              class="savebtn"
              @click="updatelxjValue()"
              type="primary"
              size="small"
              >保存
            </el-button>
          </div>
        </div>
      </el-col> -->
    </el-row>

    <el-row>
      <!-- <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">TN是否启用离心机</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.TNLXJStatus"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'TN离心机控制',
                  SDL_Global.CMD.PLC_TNLXJ.Format(SDL_Global.PLC.TNLXJStatus),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.TNLXJStatus == true" style="color: #4a92ff"
            >是</span
          >
          <span v-else style="color: #aaaaaa">否</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">TP是否启用离心机</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.TPLXJStatus"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'TP离心机控制',
                  SDL_Global.CMD.PLC_TPLXJ.Format(SDL_Global.PLC.TPLXJStatus),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.TPLXJStatus == true" style="color: #4a92ff"
            >是</span
          >
          <span v-else style="color: #aaaaaa">否</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">COD是否启用离心机</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.CODLXJStatus"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'COD离心机控制',
                  SDL_Global.CMD.PLC_CODLXJ.Format(SDL_Global.PLC.CODLXJStatus),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span
            v-if="SDL_Global.PLC.CODLXJStatus == true"
            style="color: #4a92ff"
            >是</span
          >
          <span v-else style="color: #aaaaaa">否</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">NH3是否启用离心机</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.NH3LXJStatus"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'NH3离心机控制',
                  SDL_Global.CMD.PLC_NH3LXJ.Format(SDL_Global.PLC.NH3LXJStatus),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span
            v-if="SDL_Global.PLC.NH3LXJStatus == true"
            style="color: #4a92ff"
            >是</span
          >
          <span v-else style="color: #aaaaaa">否</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">CODcr是否启用离心机</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.CODcrLXJStatus"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'CODcr离心机控制',
                  SDL_Global.CMD.PLC_CODcrLXJ.Format(
                    SDL_Global.PLC.CODcrLXJStatus
                  ),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span
            v-if="SDL_Global.PLC.CODcrLXJStatus == true"
            style="color: #4a92ff"
            >是</span
          >
          <span v-else style="color: #aaaaaa">否</span>
        </div>
      </el-col> -->
      <!-- </el-row>
    <el-row> -->
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">SV19</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVL19Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'SV19',
                  SDL_Global.CMD.PLC_SVL.Format(19, SDL_Global.PLC.SVL19Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVL19Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>

      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">SV20</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVL20Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'SV20',
                  SDL_Global.CMD.PLC_SVL.Format(20, SDL_Global.PLC.SVL20Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVL20Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>

      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">SV21</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVL21Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'SV21',
                  SDL_Global.CMD.PLC_SVL.Format(21, SDL_Global.PLC.SVL21Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVL21Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>

      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">SV22</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVL22Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'SV22',
                  SDL_Global.CMD.PLC_SVL.Format(22, SDL_Global.PLC.SVL22Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVL22Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">SV23</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVL23Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  'SV23',
                  SDL_Global.CMD.PLC_SVL.Format(23, SDL_Global.PLC.SVL23Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVL23Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
    </el-row>

    
    <!-- <el-row>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="valbox">
          <div class="bfkzmlName">启动离心机浊度区间</div>
          <div class="bfkzmlSwith">
            <el-input
              v-model="LXJMinlValue"
              style="width: 110px"
              size="mini"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
            -
                <el-input
              v-model="LXJMaxlValue"
              size="mini"
              style="width: 110px"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
                <el-button
            class="savebtn"
            @click="updatelxjValue()"
            type="primary"
            size="small"
            >保存
          </el-button>
          </div>
        </div>
      </el-col>
     
    </el-row> -->
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
      LXJMinlValue: "",
      LXJMaxlValue: "",
    };
  },
  mounted() {
    this.getlxjValue();
  },

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
      if (name == "启动离心机") {
        var that = this;
        setTimeout(() => {
          let Fml = "lxj_离心机控制=false";
          let data =
            "" + localStorage.getItem("Loginedname") + "," + name + "," + Fml;

          that.socketApi.sendSock(data);
          // this.socketApi.sendSock(data + !ml);
        }, 5000);
      }
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
              this.socketApi.sendSock(data, true); //";" + "手动数据标识=M"
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

    //读取仪表量程
    getlxjValue() {
      let condition = " Code='w00001' ";

      let that = this;
      this.http
        .comMethod("*", "tbalarmarea", condition)
        .then((res) => {
          if (res.length != 0) {
            this.LXJMinlValue = res[0].DDLimit;
            this.LXJMaxlValue = res[0].UULimit;
          } else {
            this.$message.info("暂无数据");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 修改离心机参数
    updatelxjValue() {
      let condition = {
        DDLimit: this.LXJMinlValue,
        DLimit: this.LXJMinlValue,
        ULimit: this.LXJMaxlValue,
        UULimit: this.LXJMaxlValue, //"'" +
        Code: "w00001", //"'" +
        AlarmType: 0,
      };
      this.http
        .post("/updatelcbj", condition)
        .then((res) => {
          debugger;
          if (res.warningCount == 0) {
            this.$message.success("修改成功");

            let cmdargs = JSON.stringify(condition);
            let operators = "离心机参数："; //+ opts;
            this.http.addLog(operators, cmdargs, true);

            // this.addlog(operators, cmdargs);
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
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
.valbox {
  margin-left: 13%;
  /* text-align: left; */
  float: left;
  padding: 17px 0px;
  /* display: inline-block; */
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