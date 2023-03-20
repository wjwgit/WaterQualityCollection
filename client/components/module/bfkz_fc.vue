<template>
  <div class="bfkz-body">
    <!-- <template v-for="(bfkz, index) in config"> -->
    <el-alert
      v-if="SDL_Global.PLC.YunXingMoShi != 1"
      title="当运行模式为 [维护模式] 下才能进行以下操作！ "
      type="warning"
      show-icon
    >
    </el-alert>
    <el-row>
     
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
          <span v-if="SDL_Global.PLC.M1Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">取水泵M2</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.M2Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '取水泵M2',
                  SDL_Global.CMD.PLC_M.Format(2, SDL_Global.PLC.M2Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.M2Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
  
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">取水阀1 Sv1</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV1Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '取水阀1 Sv1',
                  SDL_Global.CMD.PLC_SV.Format(1, SDL_Global.PLC.SV1Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV1Status == true" style="color: #4a92ff"
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
                  SDL_Global.CMD.PLC_SV.Format(2, SDL_Global.PLC.SV2Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV2Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯采水阀SV3</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV3Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯采水阀SV3',
                  SDL_Global.CMD.PLC_SV.Format(9, SDL_Global.PLC.SV3Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV3Status == true" style="color: #4a92ff"
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
                  SDL_Global.CMD.PLC_SV.Format(6, SDL_Global.PLC.SV4Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV4Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯排水阀SV5</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV5Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯排水阀SV5',
                  SDL_Global.CMD.PLC_SV.Format(11, SDL_Global.PLC.SV5Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV5Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
    <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">喷淋泵控制</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.PenLinBengState"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '喷淋泵',
                  SDL_Global.CMD.PLC_PenLinBeng.Format(SDL_Global.PLC.PenLinBengState),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.PenLinBengState == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
     
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    // dialogParam: {
    // },
  },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
    };
  },
  computed: {},
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
  },
};
</script>
<style>
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