<template>
  <div>
    <el-dialog
      :title="Name"
      :visible.sync="dialogParamVisible"
      width="60%"
      :modal-append-to-body="false"
      class="div-dialog"
    >
      <table v-if="SDL_Global[ID]">
        <thead></thead>
        <tbody>
          <tr>
            <td>系统时间</td>
            <td>{{ SDL_Global[ID].SysTime }}</td>
            <td>量程({{ SDL_Global[ID].Unit }})</td>
            <td>{{ SDL_Global[ID].LiangCheng }}</td>
          </tr>
          <tr>
            <td>工作状态</td>
            <td>{{ SDL_Global[ID].MeterStatusText }}</td>
            <td>斜率(k)</td>
            <td>{{ SDL_Global[ID].XieLv }}</td>
          </tr>
          <tr>
            <td>报警</td>
            <td :class="SDL_Global[ID].Alarm > 0 ? 'c-red' : ''">
              {{ SDL_Global[ID].AlarmText }}
            </td>
            <td>截距(b)</td>
            <td>{{ SDL_Global[ID].JieJu }}</td>
          </tr>
          <tr>
            <td>故障</td>
            <td :class="SDL_Global[ID].Fault > 0 ? 'c-red' : ''">
              {{ SDL_Global[ID].FaultText }}
            </td>
            <td>校准系数(K)</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaoZhunXiShu }}</td>
          </tr>
          <tr>
            <td>仪表流程</td>
            <td>{{ SDL_Global[ID].SubFlowText }}</td>
            <td>校准因子(B)</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaoZhunYinZi }}</td>
          </tr>
          <tr>
            <td>测量信号值</td>
            <td>{{ SDL_Global[ID].XinHaoZhi }}</td>
            <td>校准时间</td>
            <td>{{ SDL_Global[ID].JiaoZhunShiJian }}</td>
          </tr>
          <tr>
            <td>消解温度(℃)</td>
            <td v-if="SDL_Global[ID].Code == 'w21003'">
              {{ SDL_Global[ID].MoreParam.XianSeWenDu }}
            </td>
            <td v-else>{{ SDL_Global[ID].XiaoJieWenDu }}</td>
            <td>标样核查时间</td>
            <td>{{ SDL_Global[ID].BiaoYangShiJian }}</td>
          </tr>
          <tr>
            <td>消解时间(分钟)</td>
            <td v-if="SDL_Global[ID].Code == 'w21003'">
              {{ SDL_Global[ID].MoreParam.XianSeShiJian }}
            </td>
            <td v-else>{{ SDL_Global[ID].XiaoJieShiJian }}</td>
            <td>检出限(mg/L)</td>
            <td>{{ SDL_Global[ID].JianChuXian }}</td>
          </tr>
          <!-- 旧仪表没有更多参数 -->
          <tr>
            <td
              colspan="4"
              style="color: #4a92ff; cursor: pointer"
              @click="moreParamVisible = true"
            >
              更多参数>>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div v-else style="text-align: center; color: #ccc">暂无参数</div> -->

      <el-card
        v-if="SDL_Global[ID]"
        class="ybkzCard"
        style="background-color: #35415a"
      >
        <!-- <div slot="header" class="clearfix">
            <span class="c-title">{{ SDL_Global[ID].Name }} [<span v-bind:class="{
            'c-status':  SDL_Global[ID].ComStatus == 1,
            offline:  SDL_Global[ID].ComStatus != 1,
          }">{{ SDL_Global[ID].ComStatusText }}</span>]</span>
            <span class="c-loginfo" type="text">仪表状态：<span class="c-loginfo-info">{{
                SDL_Global[ID].MeterStatusText
                }}</span></span>
          </div> -->
        <wsybkzbtn :ID="ID" :headerShow="false"> </wsybkzbtn>
       
      </el-card>
      <div v-else style="text-align: center; color: #ccc; padding-bottom: 25px">
        暂无数据
      </div>
    </el-dialog>
    <el-dialog
      :title="Name"
      :id="ID"
      :visible.sync="moreParamVisible"
      width="960px"
      :modal-append-to-body="false"
      class="div-dialog div-dialog-more"
      top="80px"
      :close-on-click-modal="false"
    >
      <table v-if="SDL_Global[ID]">
        <thead></thead>
        <tbody>
          <tr>
            <td colspan="2" style="text-align: center">测量数据区</td>
            <td colspan="2" style="text-align: center">关键参数区</td>
            <td colspan="2" style="text-align: center">状态告警区</td>
          </tr>
          <tr>
            <td>因子编码</td>
            <td>{{ SDL_Global[ID].Code }}</td>
            <td>测量精度</td>
            <td>{{ SDL_Global[ID].JingDu }}</td>
            <td>系统时间</td>
            <td>{{ SDL_Global[ID].SysTime }}</td>
          </tr>
          <tr>
            <td>单位</td>
            <td>{{ SDL_Global[ID].Unit }}</td>
            <td>消解温度（℃）</td>
            <td v-if="SDL_Global[ID].Code == 'w21003'">
              {{ SDL_Global[ID].MoreParam.XianSeWenDu }}
            </td>
            <td v-else>{{ SDL_Global[ID].XiaoJieWenDu }}</td>
            <td>工作状态</td>
            <td>{{ SDL_Global[ID].MeterStatusText }}</td>
          </tr>
          <tr>
            <td>水样数据测量时间</td>
            <td>{{ SDL_Global[ID].MoreParam.ShuiYangShuJuShiJian }}</td>

            <td>消解时间（分钟）</td>
            <td v-if="SDL_Global[ID].Code == 'w21003'">
              {{ SDL_Global[ID].MoreParam.XianSeShiJian }}
            </td>
            <td v-else>{{ SDL_Global[ID].XiaoJieShiJian }}</td>
            <td>测量模式</td>
            <td>{{ SDL_Global[ID].MoreParam.CeLiangMoShiText }}</td>
          </tr>
          <tr>
            <td>水样实测值(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.ShuiYangShiCeZhi }}</td>
            <td>显色温度（℃）</td>
            <td>{{ SDL_Global[ID].MoreParam.XianSeWenDu }}</td>
            <td>仪表流程</td>
            <td>{{ SDL_Global[ID].SubFlowText }}</td>
          </tr>
          <tr>
            <td>测量信号值</td>
            <td>{{ SDL_Global[ID].XinHaoZhi }}</td>
            <td>显色时间 (分钟)</td>
            <td>{{ SDL_Global[ID].MoreParam.XianSeShiJian }}</td>
            <td>告警</td>
            <td>{{ SDL_Global[ID].AlarmText }}</td>
          </tr>
          <tr>
            <td>水样数据标识</td>
            <td>{{ flagInfo(SDL_Global[ID].MoreParam.ShuiYangShuJuFlag) }}</td>
            <td>检出限(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.LiangChengXiaXian }}</td>
            <td>故障</td>
            <td>{{ SDL_Global[ID].FaultText }}</td>
          </tr>
          <tr>
            <td>标样数据测量时间</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangShuJuShiJian }}</td>
            <td>量程(mg/L)</td>
            <td>{{ SDL_Global[ID].LiangCheng }}</td>
            <td>日志</td>
            <td>空闲</td>
          </tr>
          <tr>
            <td>标样实测值(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangShiCeZhi }}</td>
            <td>二次多项系数 (a)</td>
            <td>{{ SDL_Global[ID].MoreParam.ErCiDuoXiangXiShu }}</td>

            <td>水样测量间隔（分钟）</td>
            <td>{{ SDL_Global[ID].MoreParam.CeLiangJianGe }}</td>
          </tr>
          <tr>
            <td>标样参考值(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangCanKaoZhi }}</td>
            <td>曲线斜率 (k)</td>
            <td>{{ SDL_Global[ID].XieLv }}</td>
            <td>标样核查间隔（分钟）</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangHeChaJianGe }}</td>
          </tr>
          <tr>
            <td>标样数据标识</td>
            <td>{{ flagInfo(SDL_Global[ID].MoreParam.BiaoYangShuJuFlag) }}</td>
            <td>曲线截距 (b)</td>
            <td>{{ SDL_Global[ID].JieJu }}</td>

            <td>设备序列号</td>
            <td>{{ SDL_Global[ID].MoreParam.SheBeiXuLieHao }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>校准系数(K)</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaoZhunXiShu }}</td>

            <td>软件版本</td>
            <td>{{ SDL_Global[ID].MoreParam.SoftwareVersion }}</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>校准因子(B)</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaoZhunYinZi }}</td>

            <td>消解池实时温度（℃）</td>
            <td>{{ SDL_Global[ID].MoreParam.XiaoJieChiShiShiWenDu }}</td>
          </tr>
          <tr>
            <td></td>

            <td></td>
            <td>线性相关系数</td>
            <td>{{ SDL_Global[ID].XianXingXiShu }}</td>

            <td>混样池实时温度（℃）</td>
            <td>{{ SDL_Global[ID].MoreParam.HunYangChiShiShiWenDu }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>标液一校准浓度(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeYiNongDu }}</td>

            <td>板卡温度（℃）</td>
            <td>{{ SDL_Global[ID].MoreParam.BanKaWenDu }}</td>
          </tr>
          <tr>
            <td></td>

            <td></td>
            <td>标液一测量信号值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeYiCeLiangGuoChengZhi }}</td>

            <td>试剂余量 (%)</td>
            <td>{{ SDL_Global[ID].MoreParam.ShiJiYuLiang }}</td>
          </tr>

          <tr>
            <td></td>

            <td></td>
            <td>标液一校准时间</td>
            <td>{{ SDL_Global[ID].MoreParam.KongBaiJiaoZhunShiJian }}</td>

            <td>试剂到期时间</td>
            <td>{{ SDL_Global[ID].MoreParam.ShiJiDaoQiShiJiian }}</td>
          </tr>
          <tr>
            <td></td>

            <td></td>
            <td>标液二校准浓度(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeErNongDu }}</td>

            <td>低试剂预警范围 (%)</td>
            <td>{{ SDL_Global[ID].DiShiJiYuJingYuZhi }}</td>
          </tr>

          <tr>
            <td></td>

            <td></td>
            <td>标液二测量信号值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeErCeLiangGuoChengZhi }}</td>

            <td>缺试剂告警范围 (%)</td>
            <td>{{ SDL_Global[ID].QueShiJiGaoJingYuZhi }}</td>
          </tr>

          <tr>
            <td></td>

            <td></td>
            <td>标液二校准时间</td>
            <td>{{ SDL_Global[ID].BiaoYangShiJian }}</td>

            <td>R1试剂 (mL)</td>
            <td>
              <template v-if="SDL_Global[ID].R1ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R1ShiJiYuLiang }} /
                {{ SDL_Global[ID].R1ShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>

          <tr>
            <td></td>

            <td></td>
            <td>标液三校准浓度(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSanNongDu }}</td>

            <td>R2试剂 (mL)</td>
            <td>
              <template v-if="SDL_Global[ID].R2ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R2ShiJiYuLiang }} /
                {{ SDL_Global[ID].R2ShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>
          <tr>
            <td></td>

            <td></td>
            <td>标液三测量信号值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSanCeLiangGuoChengZhi }}</td>

            <td>R3试剂 (mL)</td>
            <td>
              <template v-if="SDL_Global[ID].R3ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R3ShiJiYuLiang }} /
                {{ SDL_Global[ID].R3ShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>

          <tr>
            <td></td>

            <td></td>
            <td>标液四校准浓度(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSiNongDu }}</td>

            <td>R4试剂 (mL)</td>
            <td>
              <template v-if="SDL_Global[ID].R4ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R4ShiJiYuLiang }} /
                {{ SDL_Global[ID].R4ShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>
          <tr>
            <td></td>

            <td></td>
            <td>标液四测量信号值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSiCeLiangGuoChengZhi }}</td>

            <td>R5试剂(mL)</td>
            <td>
              <template v-if="SDL_Global[ID].R5ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R5ShiJiYuLiang }} /
                {{ SDL_Global[ID].R5ShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>标液五校准浓度(mg/L)</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeWuNongDu }}</td>

            <td>空白(mL)</td>
            <td>
              <template v-if="SDL_Global[ID].KongBaiShiJiZongLiang > 0">
                {{ SDL_Global[ID].KongBaiShiJiYuLiang }} /
                {{ SDL_Global[ID].KongBaiShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>

            <td>标液五校信号值度</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeWuCeLiangGuoChengZhi }}</td>
            <td>标液 (mL)</td>
            <td>
              <template v-if="SDL_Global[ID].BiaoYeShiJiZongLiang > 0">
                {{ SDL_Global[ID].BiaoYeShiJiYuLiang }} /
                {{ SDL_Global[ID].BiaoYeShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td>标核 (mL)</td>
            <td>
              <template v-if="SDL_Global[ID].BiaoHeShiJiZongLiang > 0">
                {{ SDL_Global[ID].BiaoHeShiJiYuLiang }} /
                {{ SDL_Global[ID].BiaoHeShiJiZongLiang }}
              </template>
              <template v-else>--</template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else style="text-align: center; color: #ccc">暂无参数</div>
    </el-dialog>
  </div>
</template>
  <script >
import wsybkzbtn from "./ws_ybkzbtn";

export default {
  props: {
    // dialogParam: {
    ID: String,
    Name: String,
    moreParammodel: {
      //是否带有纵向边框
      type: Boolean,
      default: () => false,
    },
    // },
  },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      moreParamVisible: false,
    };
  },
  components: {
    wsybkzbtn,
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
  
    flagInfo(flags) {
      if (flags == "L") {
        return "L [超下限]";
      } else if (flags == "T") {
        return "T [超上限]";
      } else if (flags == "N") {
        return "N [正常]";
      } else if (flags == "C") {
        return "C [校准状态]";
      } else if (flags == "D") {
        return "D [仪器故障]";
      } else if (flags == "B") {
        return "B [通讯异常]";
      } else if (flags == "F") {
        return "F [仪器通信故障]";
      } else if (flags == "M") {
        return "M [维护调试数据]";
      } else {
        return "";
      }
    },
   
  },
};
</script>
  <style scoped>
.div-dialog table {
  width: 100%;
  text-align: center;
  color: #cccccc;
  border-collapse: collapse;
}

.div-dialog table tr {
  background-color: #35415a;
  height: 32px;
  line-height: 32px;
}

.div-dialog table tr:nth-child(odd) {
  background-color: #293244;
}

.div-dialog table tr td {
  /* width: 200px; */
  border-right: 1px solid #3c4860;
}

.div-dialog-more table tr td {
  /* width: 200px; */
  border-right: 1px solid #3c4860;
  text-align: left;
  padding-left: 10px;
}

.c-red {
  color: #da666e;
}

/* 仪表控制 */
.c-status {
  color: #6ad2c2;
}
.ybkzCard .el-card {
  background-color: #35415a !important;
}
.ybkzCard .el-card__body {
  background-color: #35415a !important;
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
          #35415a
      } */

.body-btn .el-button {
  background-color: #506c98;
  color: #ffffff;
  width: 80px;
  font-size: 14px;
  margin-bottom: 20px;

  margin-right: 15px;
  margin-left: 10px;
  border-color: #506c98;
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