<template>
  <div class="ybkz-body">
    <el-card v-if="SDL_Global[ID]" style="min-height: none !important">
      <div slot="header" class="clearfix" v-if="headerShow">
        <span class="c-title"
          >{{ SDL_Global[ID].Name }} [<span
            v-bind:class="{
              'c-status': SDL_Global[ID].ComStatus == 1,
              offline: SDL_Global[ID].ComStatus != 1,
            }"
            >{{ SDL_Global[ID].ComStatusText }}</span
          >]</span
        >
        <span class="c-loginfo" type="text"
          >仪表状态：<span class="c-loginfo-info">{{
            SDL_Global[ID].MeterStatusText
          }}</span></span
        >
      </div>
      <div class="body-btn">
        <el-row style="margin-bottom: 10px">
          <el-col :span="4">
            <el-button
              size="small"
              :class="
                SDL_Global[ID].MeterStatus == 1
                  ? 'active'
                  : SDL_Global[ID].MeterStatus > 0
                  ? 'stopBtn'
                  : ''
              "
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '水样测量',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 1),
                  true
                )
              "
              >水样测量</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="
                SDL_Global[ID].MeterStatus == 2
                  ? 'active'
                  : SDL_Global[ID].MeterStatus > 0
                  ? 'stopBtn'
                  : ''
              "
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '标样核查',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 2),
                  true
                )
              "
              >标样核查</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="
                SDL_Global[ID].MeterStatus == 19
                  ? 'active'
                  : SDL_Global[ID].MeterStatus > 0
                  ? 'stopBtn'
                  : ''
              "
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '开始校准',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 19),
                  true
                )
              "
              >开始校准</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="
                SDL_Global[ID].MeterStatus == 8
                  ? 'active'
                  : SDL_Global[ID].MeterStatus > 0
                  ? 'stopBtn'
                  : ''
              "
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '空白校准',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 8),
                  true
                )
              "
              >空白校准</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="
                SDL_Global[ID].MeterStatus == 9
                  ? 'active'
                  : SDL_Global[ID].MeterStatus > 0
                  ? 'stopBtn'
                  : ''
              "
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '标样校准',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 9),
                  true
                )
              "
              >标样校准</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="
                SDL_Global[ID].MeterStatus == 10
                  ? 'active'
                  : SDL_Global[ID].MeterStatus > 0
                  ? 'stopBtn'
                  : ''
              "
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '仪表清洗',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 10),
                  true
                )
              "
              >仪表清洗</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="SDL_Global[ID].MeterStatus == 20 ? 'active' : ''"
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '清除报警',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 20),
                  false
                )
              "
              >清除报警</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="SDL_Global[ID].MeterStatus == 11 ? 'active' : ''"
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '停止测量',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 11),
                  false
                )
              "
              >停止测量</el-button
            >
          </el-col>
          <el-col :span="4">
            <el-button
              size="small"
              :class="SDL_Global[ID].MeterStatus == 22 ? 'active' : ''"
              v-bind:disabled="
                SDL_Global[ID].ComStatus != 1 ||
                (SDL_Global.PLC.YunXingMoShi != 1 &&
                  SDL_Global.PLC.YunXingMoShi != 8)
              "
              @click="
                clickYiBiaoBtn(
                  SDL_Global[ID].MeterStatus,
                  '一键自检',
                  SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 22),
                  false
                )
              "
              >一键自检</el-button
            >
          </el-col>
        </el-row>
      </div>

      <div class="dividing"></div>

      <div class="body-footer">
        <span
          >仪表时间：<span>{{ SDL_Global[ID].SysTime }}</span>
          <span
            style="color: #4a92ff; cursor: pointer; margin-left: 5px"
            v-bind:disabled="
              SDL_Global[ID].ComStatus != 1 ||
              (SDL_Global.PLC.YunXingMoShi != 1 &&
                SDL_Global.PLC.YunXingMoShi != 8)
            "
            @click="
              clickYiBiaoBtn(
                SDL_Global[ID].MeterStatus,
                '_仪表校时',
                SDL_Global.CMD.YiBiao.Format(SDL_Global[ID].mlName, 13),
                false
              )
            "
            >校时</span
          ></span
        >
        <span
          class="body-footer-text-r"
          v-bind:disabled="
            SDL_Global[ID].ComStatus != 1 ||
            (SDL_Global.PLC.YunXingMoShi != 1 &&
              SDL_Global.PLC.YunXingMoShi != 8)
          "
          ><span style="color: #cccccc">日质控：</span>
          <template v-if="SDL_Global[ID].RiZhiKongStatus == true">
            <!-- {{SDL_Global[ID].RiZhiKongStatus}}
                          {{SDL_Global[ID].RiZhiKongIsHeGe}} -->
            <span style="color: #cccccc">运行中</span> |
            <span
              @click="
                clickRiZhiKongBtn(
                  SDL_Global[ID].ID + '_停止日质控',
                  SDL_Global.CMD.RZK_StopStatus.Format(SDL_Global[ID].ID),
                  false
                )
              "
              >停止质控</span
            >
          </template>
          <template v-else>
            <template v-if="SDL_Global[ID].RiZhiKongIsHeGe == false">
              <!-- {{SDL_Global[ID].RiZhiKongStatus}}
                          {{SDL_Global[ID].RiZhiKongIsHeGe}} -->

              <span style="color: #f56c6c">已结束(不合格)</span> |
              <span
                @click="
                  clickRiZhiKongBtn(
                    SDL_Global[ID].ID + '_恢复日质控',
                    SDL_Global.CMD.RZK_StartStatus.Format(SDL_Global[ID].ID),
                    false
                  )
                "
                >恢复质控</span
              >
            </template>
            <template v-else>
              <!-- {{SDL_Global[ID].RiZhiKongStatus}}
                            {{SDL_Global[ID].RiZhiKongIsHeGe}} -->

              <span style="color: #cccccc">已结束</span>
            </template>
          </template>
        </span>
      </div>
    </el-card>
    <div v-else style="text-align: center; color: #ccc; padding-bottom: 25px">
      暂无数据
    </div>
  </div>
</template>
    
    <script>
// 污染源仪表控制组件
export default {
  props: {
    // dialogParam: {
    ID: String,
    headerShow: {
      //是否显示header
      type: Boolean,
      default: () => true,
    },
    // },
  },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
    };
  },
  computed: {
    dialogParamVisible: {
      // getter
      get: function () {
        return this.moreParammodel;
      },
      // setter
      set: function (newVal) {
        if (!newVal) {
          this.$emit("update:moreParammodel", false); //触发 input 事件，并传入新值
        }
      },
    },
  },
  methods: {
    //停止日质控、恢复日质控操作
    clickRiZhiKongBtn(name, ml) {
      let $this = this;
      var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;

      $this.socketApi.sendSock(data, true);
    },
    //仪表控制
    clickYiBiaoBtn(stauts, name, ml, isRequire) {
      //间歇、连续不可以操作
      //维护、质控可以操作  需要加处理判断
      let $this = this;
      if (
        $this.SDL_Global.PLC.YunXingMoShi != 1 &&
        $this.SDL_Global.PLC.YunXingMoShi != 8
      ) {
        $this.$message.error(
          "操作失败！(请将运行模式切换为【维护模式/质控模式】状态)"
        );
        return;
      }

      //清除报警、停止测量、仪表校时 不需要等待仪表空闲状态
      if (stauts > 0 && isRequire) {
        $this.$message.warning("仪表处于非空闲状态，禁止操作！");
        return;
      }
      let dataflag = "";
      //判断标识
      if (
        name == "水样测量" ||
        name == "标样核查" ||
        name == "零点核查" ||
        name == "跨度核查" ||
        name == "空白测试" ||
        name == "平行样" ||
        name == "开始校准"
      ) {
        if ($this.SDL_Global.PLC.YunXingMoShi == 1) {
          dataflag = ";手动数据标识=M";
        } else {
          dataflag = ";手动数据标识=hd";
        }
      }
      name = ml.substring(0, ml.indexOf("命")) + name; //TP命令  水样测量  TP_结束日质控

      var data =
        localStorage.getItem("Loginedname") + "," + name + "," + ml + dataflag;

      $this.socketApi.sendSock(data, true);
    },
  },
};
</script>
    <style scoped>
.c-status {
  color: #6ad2c2;
}

.clearfix {
  text-align: left;
}

.c-loginfo {
  float: right;
  padding: 0px 0;
  color: #cccccc;
  font-size: 14px;
}

.c-loginfo-info {
  color: #4a92ff;
}

.offline {
  color: #cccccc;
}

.body-btn {
  width: 100%;
  text-align: center;
}

/* 校时 */
.dividing {
  width: 100%;
  height: 1px;
  background-color: #48556e;
}

/* .el-card__body {
            padding-top: 20px !important;
            padding-top: 5px;
        } */

.body-btn .el-button {
  background-color: #506c98;
  color: #ffffff;
  width: 80px;
  font-size: 14px;
  margin-top: 10px;
  /* margin-bottom: 10px; */
  margin-right: 15px;
  margin-left: 10px;
  border-color: #506c98;
}

.body-btn .el-button.stopBtn {
  color: darkgray;
}

.body-btn .el-button.active {
  background-color: #4a92ff;
  border-color: #4a92ff;
}

.body-btn .el-button--small,
.el-button--small.is-round {
  padding: 9px 10px;
}

.body-footer {
  color: #cccccc;
  height: 46px;
  line-height: 46px;
  margin-left: 20px;
  font-size: 14px;
  text-align: left;
}

.body-footer-text-r {
  float: right;
  margin-right: 23px;
  color: #4a92ff;
  cursor: pointer;
}

.body-footer-text-r .el-button {
  background-color: #506c98;
  color: #ffffff;
  border-color: #506c98;
  font-size: 14px;
  /* cursor: pointer; */
}
</style>