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
            <td>状态</td>
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
            <td>线性系数(R²)</td>
            <td>{{ SDL_Global[ID].XianXingXiShu }}</td>
          </tr>
          <tr>
            <td>子流程</td>
            <td>{{ SDL_Global[ID].SubFlowText }}</td>
            <td>信号值</td>
            <td>{{ SDL_Global[ID].XinHaoZhi }}</td>
          </tr>
          <tr>
            <td>精度(位)</td>
            <td>{{ SDL_Global[ID].JingDu }}</td>
            <td>校准时间</td>
            <td>{{ SDL_Global[ID].JiaoZhunShiJian }}</td>
          </tr>
          <tr>
            <td>消解温度(℃)</td>
            <td v-if="SDL_Global[ID].Code=='w21003'">{{ SDL_Global[ID].MoreParam.XianSeWenDu }}</td>
            <td v-else>{{ SDL_Global[ID].XiaoJieWenDu }}</td>
            <td>标样时间</td>
            <td>{{ SDL_Global[ID].BiaoYangShiJian }}</td>
          </tr>
          <tr>
            <td>消解时长(分钟)</td>
            <td v-if="SDL_Global[ID].Code=='w21003'">{{ SDL_Global[ID].MoreParam.XianSeShiJian }}</td>
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
        style="background-color: #35415a;border-color: #35415a;"
      >
        
        <ybkzbtn :ID="ID" :headerShow="false"> </ybkzbtn>
       
      </el-card>
      <div v-else style="text-align: center; color: #ccc; padding-bottom: 25px">
        暂无数据
      </div>
    </el-dialog>
    <el-dialog
      :title="Name"
      :id="ID"
      :visible.sync="moreParamVisible"
      width="930px"
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
            <td>消解温度</td>
            <td v-if="SDL_Global[ID].Code=='w21003'">{{ SDL_Global[ID].MoreParam.XianSeWenDu }}</td>
            <td v-else>{{ SDL_Global[ID].XiaoJieWenDu }}</td>
            <td>工作状态</td>
            <td>{{ SDL_Global[ID].MeterStatusText }}</td>
          </tr>
          <tr>
            <td>标样参考值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangCanKaoZhi }}</td>
            <td>消解时长</td>
            <td v-if="SDL_Global[ID].Code=='w21003'">{{ SDL_Global[ID].MoreParam.XianSeShiJian }}</td>
            <td v-else>{{ SDL_Global[ID].XiaoJieShiJian }}</td>
            <td>测量模式</td>
            <td>{{ SDL_Global[ID].MoreParam.CeLiangMoShiText }}</td>
          </tr>
          <tr>
            <td>水样数据测量时间</td>
            <td>{{ SDL_Global[ID].MoreParam.ShuiYangShuJuShiJian }}</td>
            <td>量程下限</td>
            <td>{{ SDL_Global[ID].MoreParam.LiangChengXiaXian }}</td>
            <td>告警代码</td>
            <td>{{ SDL_Global[ID].AlarmText }}</td>
          </tr>
          <tr>
            <td>水样实测值</td>
            <td>{{ SDL_Global[ID].MoreParam.ShuiYangShiCeZhi }}</td>
            <td>量程上限</td>
            <td>{{ SDL_Global[ID].LiangCheng }}</td>
            <td>故障代码</td>
            <td>{{ SDL_Global[ID].FaultText }}</td>
          </tr>
          <tr>
            <td>水样数据标识</td>
            <td>{{ flagInfo(SDL_Global[ID].MoreParam.ShuiYangShuJuFlag) }}</td>
            <td>曲线斜率k</td>
            <td>{{ SDL_Global[ID].XieLv }}</td>
            <td>日志代码</td>
            <td>空闲</td>
          </tr>
          <tr>
            <td>标样数据测量时间</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangShuJuShiJian }}</td>
            <td>曲线截距b</td>
            <td>{{ SDL_Global[ID].JieJu }}</td>
            <td>软件版本</td>
            <td>{{ SDL_Global[ID].MoreParam.SoftwareVersion }}</td>
          </tr>
          <tr>
            <td>标样实测值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangShiCeZhi }}</td>
            <td>标定日期</td>
            <td>{{ SDL_Global[ID].JiaoZhunShiJian }}</td>
            <td>测量间隔</td>
            <td>{{ SDL_Global[ID].MoreParam.CeLiangJianGe }}</td>
          </tr>
          <tr>
            <td>标样数据标识</td>
            <td>{{ flagInfo(SDL_Global[ID].MoreParam.BiaoYangShuJuFlag) }}</td>
            <td>标液一浓度</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeYiNongDu }}</td>
            <td>零点核查间隔</td>
            <td>{{ SDL_Global[ID].MoreParam.LingDianHeChaJianGe }}</td>
          </tr>
          <tr>
            <td>加标回收数据时间</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaBiaoHuiShouShuJuShiJian }}</td>
            <td>线性相关系数</td>
            <td>{{ SDL_Global[ID].XianXingXiShu }}</td>
            <td>跨度核查间隔</td>
            <td>{{ SDL_Global[ID].MoreParam.KuaDuHeChaJianGe }}</td>
          </tr>
          <tr>
            <td>加标回收实测值</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaBiaoHuiShouShiCeZhi }}</td>
            <td>试剂余量</td>
            <td>{{ SDL_Global[ID].MoreParam.ShiJiYuLiang }}</td>
            <td>标样核查间隔</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangHeChaJianGe }}</td>
          </tr>

          <tr>
            <td>加标回收数据标识</td>
            <td>
              {{ flagInfo(SDL_Global[ID].MoreParam.JiaBiaoHuiShouShuJuFlag) }}
            </td>
            <td>试剂到期时间</td>
            <td>{{ SDL_Global[ID].MoreParam.ShiJiDaoQiShiJiian }}</td>
            <td>消解池实时温度</td>
            <td>{{ SDL_Global[ID].MoreParam.XiaoJieChiShiShiWenDu }}</td>
          </tr>
          <tr>
            <td >
              空白数据时间
            </td>
         
            <td >
              {{ SDL_Global[ID].MoreParam.KongBaiShuJuShiJian }}
            </td>
            <td>标液一测量过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeYiCeLiangGuoChengZhi }}</td>
            <td>混样池实时温度</td>
            <td>{{ SDL_Global[ID].MoreParam.HunYangChiShiShiWenDu }}</td>
          </tr>
          <tr>
            <td >
              空白实测值
            </td>
            <td >
              {{ SDL_Global[ID].MoreParam.KongBaiShiCeZhi }}
            </td>
            <td>标液二浓度</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeErNongDu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >
              空白数据标识
            </td>
            <td >
              {{ flagInfo(SDL_Global[ID].MoreParam.KongBaiShuJuFlag) }}
            </td>
            <td>标液二测量过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeErCeLiangGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td >
              零点核查数据时间
            </td>
            <td >
              {{ flagInfo(SDL_Global[ID].MoreParam.LingDianHeChaShuJuShiJian) }}
            </td>
            <td>标液三浓度</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSanNongDu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >
              零点核查实测值
            </td>
            <td >
              {{ SDL_Global[ID].MoreParam.LingDianHeChaShiCeZhi }}
            </td>
            <td>标液三测量过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSanCeLiangGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td >
              零点核查数据标识
            </td>
            <td >
              {{ flagInfo(SDL_Global[ID].MoreParam.LingDianHeChaShuJuFlag) }}
            </td>
            <td>标液四浓度</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSiNongDu }}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td >
              跨度核查数据时间
            </td>
            <td >
              {{ SDL_Global[ID].MoreParam.KuaDuHeChaShuJuShiJian }}
            </td>
            <td>标液四测量过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeSiCeLiangGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td >
              跨度核查实测值
            </td>
            <td >
              {{ SDL_Global[ID].MoreParam.KuaDuHeChaShiCeZhi }}
            </td>
            <td>标液五浓度</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeWuNongDu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >
              跨度核查数据标识
            </td>
            <td >
              {{ flagInfo(SDL_Global[ID].MoreParam.KuaDuHeChaShuJuFlag) }}
            </td>
            <td>标液五测量过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYeWuCeLiangGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td >
              平行样数据时间
            </td>
            <td >
              {{ SDL_Global[ID].MoreParam.PingXingYangShuJuShiJian }}
            </td>
            <td>测量过程值</td>
            <td>{{ SDL_Global[ID].XinHaoZhi }}</td>

            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >
              平行样实测值
            </td>
            <td >
              {{ SDL_Global[ID].MoreParam.PingXingYangShiCeZhi }}
            </td>
            <td>空白校准时间</td>
            <td>{{ SDL_Global[ID].MoreParam.KongBaiJiaoZhunShiJian }}</td>

            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >
              平行样数据标识
            </td>
            <td >
              {{ flagInfo(SDL_Global[ID].MoreParam.PingXingYangShuJuFlag) }}
            </td>
            <td>标样校准时间</td>
            <td>{{ SDL_Global[ID].BiaoYangShiJian }}</td>

            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>检出限值</td>
            <td>{{ SDL_Global[ID].JianChuXian }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>校准系数</td>
            <td>{{ SDL_Global[ID].MoreParam.JiaoZhunXiShu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>设备序列号</td>
            <td>{{ SDL_Global[ID].MoreParam.SheBeiXuLieHao }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>二次多项系数</td>
            <td>{{ SDL_Global[ID].MoreParam.ErCiDuoXiangXiShu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>空白标定过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.KongBaiBiaoDingGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>空白校准过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.KongBaiJiaoZhunGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>标样校准参考值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangJiaoZhunCanKaoZhi }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>标样校准过程值</td>
            <td>{{ SDL_Global[ID].MoreParam.BiaoYangJiaoZhunGuoChengZhi }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>显色温度</td>
            <td>{{ SDL_Global[ID].MoreParam.XianSeWenDu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>显色时间</td>
            <td>{{ SDL_Global[ID].MoreParam.XianSeShiJian }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>仪表流程</td>
            <td>{{ SDL_Global[ID].SubFlowText }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>板卡温度</td>
            <td>{{ SDL_Global[ID].MoreParam.BanKaWenDu }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>低试剂预警范围</td>
            <td>{{ SDL_Global[ID].DiShiJiYuJingYuZhi }} %</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>缺试剂告警范围</td>
            <td>{{ SDL_Global[ID].QueShiJiGaoJingYuZhi }} %</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>R1试剂</td>
            <td>
              <template v-if="SDL_Global[ID].R1ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R1ShiJiYuLiang }} /
                {{ SDL_Global[ID].R1ShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>R2试剂</td>
            <td>
              <template v-if="SDL_Global[ID].R2ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R2ShiJiYuLiang }} /
                {{ SDL_Global[ID].R2ShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>R3试剂</td>
            <td>
              <template v-if="SDL_Global[ID].R3ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R3ShiJiYuLiang }} /
                {{ SDL_Global[ID].R3ShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>R4试剂</td>
            <td>
              <template v-if="SDL_Global[ID].R4ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R4ShiJiYuLiang }} /
                {{ SDL_Global[ID].R4ShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>R5试剂</td>
            <td>
              <template v-if="SDL_Global[ID].R5ShiJiZongLiang > 0">
                {{ SDL_Global[ID].R5ShiJiYuLiang }} /
                {{ SDL_Global[ID].R5ShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>空白试剂</td>
            <td>
              <template v-if="SDL_Global[ID].KongBaiShiJiZongLiang > 0">
                {{ SDL_Global[ID].KongBaiShiJiYuLiang }} /
                {{ SDL_Global[ID].KongBaiShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>标液试剂</td>
            <td>
              <template v-if="SDL_Global[ID].BiaoYeShiJiZongLiang > 0">
                {{ SDL_Global[ID].BiaoYeShiJiYuLiang }} /
                {{ SDL_Global[ID].BiaoYeShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>零核试剂</td>
            <td>
              <template v-if="SDL_Global[ID].LingHeShiJiZongLiang > 0">
                {{ SDL_Global[ID].LingHeShiJiYuLiang }} /
                {{ SDL_Global[ID].LingHeShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>跨核试剂</td>
            <td>
              <template v-if="SDL_Global[ID].KuaHeShiJiZongLiang > 0">
                {{ SDL_Global[ID].KuaHeShiJiYuLiang }} /
                {{ SDL_Global[ID].KuaHeShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>标核试剂</td>
            <td>
              <template v-if="SDL_Global[ID].BiaoHeShiJiZongLiang > 0">
                {{ SDL_Global[ID].BiaoHeShiJiYuLiang }} /
                {{ SDL_Global[ID].BiaoHeShiJiZongLiang }} mL
              </template>
              <template v-else>--</template>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div v-else style="text-align: center; color: #ccc">暂无参数</div>
    </el-dialog>
  </div>
</template>
<script >
import ybkzbtn from "./ybkzbtn";

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
    ybkzbtn,
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
  width: 200px;
  border-right: 1px solid #3c4860;
}

.div-dialog-more table tr td {
  width: 200px;
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