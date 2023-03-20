<template>
  <div>
    <el-dialog
      :visible.sync="dialoglctVisible"
      title="系统流程图"
      width="977px"
      top="8vh"
      :modal-append-to-body="false"
      class="div-dialog"
    >
      <div
        class="lct_body"
        v-bind:style="{
          width: FC.BaseMap_SWDX.w + 'px',
        }"
      >
        <div class="btmimg">
          <img
            v-bind:style="{
              left: FC.BaseMap_SWDX.x + 'px',
              top: FC.BaseMap_SWDX.y + 'px',
              'z-index': FC.BaseMap_SWDX.zindex,
            }"
            v-bind:src="require('@img/' + FC.BaseMap_SWDX.img)"
            v-show="FC.BaseMap_SWDX.visible"
          />

          <img
            v-bind:style="{
              left: FC.M1_TSCJZ.x + 'px',
              y: FC.M1_TSCJZ.y + 'px',
              'z-index': FC.M1_TSCJZ.zindex,
              width: FC.M1_TSCJZ.w + 'px',
              height: FC.M1_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.M1_TSCJZ.img)"
            v-show="FC.M1_TSCJZ.visible"
            class="imgclass"
          />
          <img
            alt="FC.M2_TSCJZ.img"
            v-bind:style="{
              left: FC.M2_TSCJZ.x + 'px',
              y: FC.M2_TSCJZ.y + 'px',
              'z-index': FC.M2_TSCJZ.zindex,
              width: FC.M2_TSCJZ.w + 'px',
              height: FC.M2_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.M2_TSCJZ.img)"
            v-show="FC.M2_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.M3_TSCJZ.x + 'px',
              y: FC.M3_TSCJZ.y + 'px',
              'z-index': FC.M3_TSCJZ.zindex,
              width: FC.M3_TSCJZ.w + 'px',
              height: FC.M3_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.M3_TSCJZ.img)"
            v-show="FC.M3_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.M6_TSCJZ.x + 'px',
              y: FC.M6_TSCJZ.y + 'px',
              'z-index': FC.M6_TSCJZ.zindex,
              width: FC.M6_TSCJZ.w + 'px',
              height: FC.M6_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.M6_TSCJZ.img)"
            v-show="FC.M6_TSCJZ.visible"
            class="imgclass"
          />
          <!-- sv1-5 -->
          <img
            v-bind:style="{
              left: FC.sv1_TSCJZ.x + 'px',
              y: FC.sv1_TSCJZ.y + 'px',
              'z-index': FC.sv1_TSCJZ.zindex,
              width: FC.sv1_TSCJZ.w + 'px',
              height: FC.sv1_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv1_TSCJZ.img)"
            v-show="FC.sv1_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv2_TSCJZ.x + 'px',
              y: FC.sv2_TSCJZ.y + 'px',
              'z-index': FC.sv2_TSCJZ.zindex,
              width: FC.sv2_TSCJZ.w + 'px',
              height: FC.sv2_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv2_TSCJZ.img)"
            v-show="FC.sv2_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv3_TSCJZ.x + 'px',
              y: FC.sv3_TSCJZ.y + 'px',
              'z-index': FC.sv3_TSCJZ.zindex,
              width: FC.sv3_TSCJZ.w + 'px',
              height: FC.sv3_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv3_TSCJZ.img)"
            v-show="FC.sv3_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv4_TSCJZ.x + 'px',
              y: FC.sv4_TSCJZ.y + 'px',
              'z-index': FC.sv4_TSCJZ.zindex,
              width: FC.sv4_TSCJZ.w + 'px',
              height: FC.sv4_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv4_TSCJZ.img)"
            v-show="FC.sv4_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv5_TSCJZ.x + 'px',
              y: FC.sv5_TSCJZ.y + 'px',
              'z-index': FC.sv5_TSCJZ.zindex,
              width: FC.sv5_TSCJZ.w + 'px',
              height: FC.sv5_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv5_TSCJZ.img)"
            v-show="FC.sv5_TSCJZ.visible"
            class="imgclass"
          />

          <img
            v-bind:style="{
              left: FC.sv19_TSCJZ.x + 'px',
              y: FC.sv19_TSCJZ.y + 'px',
              'z-index': FC.sv19_TSCJZ.zindex,
              width: FC.sv19_TSCJZ.w + 'px',
              height: FC.sv19_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv19_TSCJZ.img)"
            v-show="FC.sv19_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv20_TSCJZ.x + 'px',
              y: FC.sv20_TSCJZ.y + 'px',
              'z-index': FC.sv20_TSCJZ.zindex,
              width: FC.sv20_TSCJZ.w + 'px',
              height: FC.sv20_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv20_TSCJZ.img)"
            v-show="FC.sv20_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv21_TSCJZ.x + 'px',
              y: FC.sv21_TSCJZ.y + 'px',
              'z-index': FC.sv21_TSCJZ.zindex,
              width: FC.sv21_TSCJZ.w + 'px',
              height: FC.sv21_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv21_TSCJZ.img)"
            v-show="FC.sv21_TSCJZ.visible"
            class="imgclass"
          />
          <img
            v-bind:style="{
              left: FC.sv22_TSCJZ.x + 'px',
              y: FC.sv22_TSCJZ.y + 'px',
              'z-index': FC.sv22_TSCJZ.zindex,
              width: FC.sv22_TSCJZ.w + 'px',
              height: FC.sv22_TSCJZ.h + 'px',
            }"
            v-bind:src="require('@img/' + FC.sv22_TSCJZ.img)"
            v-show="FC.sv22_TSCJZ.visible"
            class="imgclass"
          />
           <img
          v-bind:style="{
            left: FC.CYB_water_6.x + 'px',
            y: FC.CYB_water_6.y + 'px',
            'z-index': FC.CYB_water_6.zindex,
            width: FC.CYB_water_6.w + 'px',
            height: FC.CYB_water_6.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CYB_water_6.img)"
          v-show="FC.CYB_water_6.visible"
          class="imgclass"
        />

        <img
          v-bind:style="{
            left: FC.CYB_water_7.x + 'px',
            y: FC.CYB_water_7.y + 'px',
            'z-index': FC.CYB_water_7.zindex,
            width: FC.CYB_water_7.w + 'px',
            height: FC.CYB_water_7.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CYB_water_7.img)"
          v-show="FC.CYB_water_7.visible"
          class="imgclass"
        />
          <!-- 泵阀开关 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="反吹空气阀"
            placement="right-end"
            popper-class="atooltip"
          >
            <div
              class="SV4"
              @click="
                sendbfml(
                  '反吹空气阀SV4',
                  SDL_Global.CMD.PLC_SV.Format(4, !SDL_Global.PLC.SV4Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="除藻液泵"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="M6"
              @click="
                sendbfml(
                  '除藻液泵M6',
                  SDL_Global.CMD.PLC_M.Format(6, !SDL_Global.PLC.M6Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="清水泵"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="M3"
              @click="
                sendbfml(
                  '清水泵M3',
                  SDL_Global.CMD.PLC_M.Format(3, !SDL_Global.PLC.M3Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="清水阀"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="SV3"
              @click="
                sendbfml(
                  '清水阀SV3',
                  SDL_Global.CMD.PLC_SV.Format(3, !SDL_Global.PLC.SV3Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="管路清洗阀"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="SV5"
              @click="
                sendbfml(
                  '管路清洗阀SV5',
                  SDL_Global.CMD.PLC_SV.Format(5, !SDL_Global.PLC.SV5Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="取水泵2"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="M2"
              @click="
                sendbfml(
                  '取水泵M2',
                  SDL_Global.CMD.PLC_M.Format(2, !SDL_Global.PLC.M2Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="取水阀2"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="SV2"
              @click="
                sendbfml(
                  '取水阀2 SV2',
                  SDL_Global.CMD.PLC_SV.Format(2, !SDL_Global.PLC.SV2Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="取水阀1"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="Sv1"
              @click="
                sendbfml(
                  '取水阀1 Sv1',
                  SDL_Global.CMD.PLC_SV.Format(1, !SDL_Global.PLC.SV1Status)
                )
              "
            ></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="取水泵1"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="M1"
              @click="
                sendbfml(
                  '取水泵M1',
                  SDL_Global.CMD.PLC_M.Format(1, !SDL_Global.PLC.M1Status)
                )
              "
            ></div>
          </el-tooltip>

   
   
          <el-tooltip
            class="item"
            effect="dark"
            content="生物毒性采样杯采水阀21"
            placement="top"
            popper-class="atooltip"
          >
            <div
              class="Sv21"
              @click="
                sendbfml(
                  '生物毒性采样杯采水阀21',
                  SDL_Global.CMD.PLC_SV.Format(21, !SDL_Global.PLC.SV21Status)
                )
              "
            ></div>
          </el-tooltip>
  
          <el-tooltip
            class="item"
            effect="dark"
            content="生物毒性采样杯清洗阀(手动)"
            placement="top"
            popper-class="atooltip"
          >
            <div class="swdx1"></div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="生物毒性采样杯排水阀(手动)"
            placement="top"
            popper-class="atooltip"
          >
            <div class="swdx2"></div>
          </el-tooltip>
          <!-- 站房 -->
          <div class="zfhj">
            <el-row
              style="
                line-height: 33px;
                height: 50%;
                text-align: center;
                font-size: 14px;
              "
            >
              <el-col :span="12">{{
                SDL_Global.ZF.DaQiWenDu.LastTestData
              }}</el-col>
              <el-col :span="12">{{ SDL_Global.ZF.DaQiWenDu.Unit }}</el-col>
            </el-row>
            <el-row
              style="
                line-height: 33px;
                height: 50%;
                text-align: center;
                font-size: 14px;
              "
            >
              <el-col :span="12">{{
                SDL_Global.ZF.DaQiShiDu.LastTestData
              }}</el-col>
              <el-col :span="12">{{ SDL_Global.ZF.DaQiShiDu.Unit }}</el-col>
            </el-row>
          </div>
          <!-- 生物毒性数据 -->
          <div class="swdxclass">
            <div class="ybData" @click="openswdxDialog()">
              {{ SDL_Global.SWDX.Name }}
            </div>
            <div class="ybVal" >
              {{ SDL_Global.SWDX.LastTestData }}
            </div>
            <div class="ybUnit">
              {{ SDL_Global.SWDX.Unit }}
            </div>

            <div class="ybState"  @click="openswdxDialog()">
              <span
                v-if="SDL_Global.SWDX.ComStatus != 1"
                style="
                  width: 10px;
                  height: 10px;
                  background-color: #cccccc;
                  display: inline-block;
                  border-radius: 2em;
                "
              ></span>

              <span
                v-else
                style="
                  width: 10px;
                  height: 10px;
                  background-color: #5decaa;
                  display: inline-block;
                  border-radius: 2em;
                "
              ></span>
              {{ SDL_Global.SWDX.MeterStatusText }}
            </div>
          </div>
     
        </div>
      </div>
      <div class="lct_footer">
        <div class="bjzt">报警状态:</div>
        <div class="otheryb">
          <span
            v-if="SDL_Global.PLC.CaiYang6ChuZaoFault == false"
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              border-radius: 2em;
              float: left;
              margin-top: 5px;
              margin-right: 5px;
            "
          ></span>
          <span
            v-else
            style="
              width: 8px;
              height: 8px;
              background-color: #e54e4e;
              border-radius: 2em;
              float: left;
              margin-top: 6px;
              margin-right: 5px;
            "
          ></span>
          <span>生物毒性采样杯除藻故障</span>
        </div>
        <!-- <div class="otheryb">
          <span
            v-if="SDL_Global.PLC.CaiYang7ChuZaoFault == false"
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              border-radius: 2em;
              float: left;
              margin-top: 6px;
              margin-right: 5px;
            "
          ></span>
          <span
            v-else
            style="
              width: 8px;
              height: 8px;
              background-color: #e54e4e;
              border-radius: 2em;
              float: left;
              margin-top: 5px;
              margin-right: 5px;
            "
          ></span>
          <span>VOCs采样杯除藻故障</span>
        </div> -->
      </div>
      

    </el-dialog>
     <Paramswdx :swdxParammodel.sync="SwdxParam"  ></Paramswdx>
  </div>
</template>

<script>
import Paramswdx from  "../Param_swdx";

export default {
  props: {
    SWDXlctmodel: {
      //是否带有纵向边框
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      FC: this.socketApi.globalDataConfig.FlowChart,
   
      SwdxParam:false,

    };
  },
    components: {
    Paramswdx,
  },
  computed: {
    dialoglctVisible: {
      // getter
      get: function () {
        return this.SWDXlctmodel;
      },
      // setter
      set: function (newVal) {
        if (!newVal) {
          this.$emit("update:SWDXlctmodel", false); //触发 input 事件，并传入新值
        }
      },
    },
  },
  methods: {
    // 泵阀开关
    sendbfml(name, ml) {
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
        // 生物毒性参数
    openswdxDialog(){
      this.SwdxParam = true;
    },
  },
};
</script>
<style>
.item {
  z-index: 99;
}
/* 流程图 */
.lct_body {
  /* width: 1282px; */
  margin: 0 auto;
  position: relative;
}
/* 底图 */
.btmimg {
  position: relative;
  text-align: center;
  /* position: relative !important; */
  /* top: 50%;
  transform: translateY(-50%); */
}
.imgclass {
  position: absolute;
}
.SV4 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 237px;
  top: 59px;
  cursor: pointer;
}
.M6 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 157px;
  top: 99px;
  cursor: pointer;
}
.M3 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 157px;
  top: 224px;
  cursor: pointer;
}
.SV3 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 217px;
  top: 212px;
  cursor: pointer;
}
.SV5 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 237px;
  top: 366px;
  cursor: pointer;
}
.M2 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 114px;
  top: 398px;
  cursor: pointer;
}
.SV2 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 187px;
  top: 385px;
  cursor: pointer;
}
.Sv1 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 187px;
  top: 455px;
  cursor: pointer;
}
.M1 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 115px;
  top: 467px;

  cursor: pointer;
}
.Sv19 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 592px;
  top: 497px;
  cursor: pointer;
}
.Sv20 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 580px;
  top: 385px;

  cursor: pointer;
}
.Sv21 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 421px;
  top: 385px;

  cursor: pointer;
}
.Sv22 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 510px;
  top: 323px;
  cursor: pointer;
}
.swdx1 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 414px;
  top: 296px;
  cursor: pointer;
}
.swdx2 {
  width: 40px;
  height: 35px;
  /* background-color:pink ; */
  opacity: 0.5;
  position: absolute;
  left: 440px;
  top: 494px;
  cursor: pointer;
}
/* 站房温湿度 */
.zfhj {
  width: 62px;
  height: 64px;
  color: #fff;
  background-color: #3c4c6a;
  position: absolute;
  left: 94px;
  top: 286px;
}
.swdxclass {
  /* background-color:pink ; */
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  /* opacity: 0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 405px;
  top: 18px;
  text-align: center;
}
.swdxclass .ybData {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  position: relative;
  /* left: 815px;
        top: 26px; */
  left: 0px;
  top: 5px;
}
.swdxclass .ybVal {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #5decaa;
  cursor: pointer;
  position: relative;
  /* left: 815px;
        top: 26px; */
  left: 0px;
  top: 18px;
}
 .swdxclass .ybUnit {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  position: relative;
  left: 0px;
  top: 25px;
}

.swdxclass .ybState {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  position: relative;
  left: 0px;
  top: 50px;
  cursor: pointer;
}
.vocsclass .ybData {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  position: relative;
  /* left: 815px;
        top: 26px; */
  left: 0px;
  top: 5px;
}

.vocsclass .ybVal {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #5decaa;
  position: relative;
  left: 0px;
  top: 15px;
}

 .vocsclass .ybUnit {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  position: relative;
  left: 0px;
  top: 5px;
}

.vocsclass .ybState {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  position: relative;
  left: 0px;
  top: 31px;
  cursor: pointer;
}
.vocsclass {
  /* background-color:pink ; */
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  /* opacity: 0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 563px;
  top: 21px;
  text-align: center;
}
.lct_footer {
  min-width: 860px !important;
  margin-top: 5px;
  text-align: left;
  color: #cccccc;
}

.lct_footer .bjzt {
  width: 76px !important;
  display: inline-block;
}

.otheryb {
  margin-right: 12px !important;
  display: inline-block;
}
</style>