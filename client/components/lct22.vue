<template>
  <div class="lct">
    <div class="lct_Header">
      <!-- <el-button size="small" class="qhbtn" @click="tabs">
                泵阀操作切换</el-button> -->
      <!-- <el-row>
                <el-col :span="2"> -->
      <div class="yxlab">运行状态</div>
      <!-- </el-col>
                <el-col :span="10"> -->
      <el-steps
        :space="101"
        class="steps"
        :active="
          plcState(
            SDL_Global.PLC.DaiJi,
            SDL_Global.PLC.QingXi,
            SDL_Global.PLC.CaiShui,
            SDL_Global.PLC.PeiShui,
            SDL_Global.PLC.CeLiang
          )
        "
      >
        <el-step title="待机"></el-step>
        <el-step title="清洗"></el-step>
        <el-step title="采水"></el-step>
        <el-step title="配水"></el-step>
        <el-step title="测量"></el-step>
      </el-steps>
      <!-- </el-col>
                <el-col :span='5'> -->
      <div class="ztsj">
        <!-- <i v-if="SDL_Global.PLC.WuCanXiaoShiCeLiang==true" style="font-size:20px;color:#54c08e"
                            class="el-icon-success"></i> -->
        <span
          v-if="SDL_Global.PLC.WuCanYunXing == true"
          style="
            width: 24px;
            height: 24px;
            background-color: #54c08e;
            display: inline-block;
            border-radius: 2em;
            margin: 7px 0 3px 0;
          "
        >
          <i
            class="iconfont icon-ok"
            style="
              color: #fff;
              font-size: 14px;
              display: block;
              margin-top: 5px;
            "
          ></i>
        </span>

        <!-- <i v-else style="font-size:20px" class="el-icon-success"></i> -->
        <span
          v-else
          style="
            width: 24px;
            height: 24px;
            background-color: #7082a4;
            display: inline-block;
            border-radius: 2em;
            margin: 7px 0 3px 0;
          "
        >
          <i
            class="iconfont icon-ok"
            style="
              color: #fff;
              font-size: 14px;
              display: block;
              margin-top: 5px;
            "
          ></i>
        </span>
        <div
          v-if="SDL_Global.PLC.WuCanYunXing == true"
          style="font-size: 14px; color: #54c08e"
        >
          五参数测量
        </div>
        <div v-else style="font-size: 14px; color: #fff">五参数测量</div>
      </div>
      <div class="czsj">
        <!-- <i v-if="SDL_Global.PLC.ChuZao==true" style="font-size:20px;color:#54c08e"
                            class="el-icon-success"></i>
                        <i v-else style="font-size:20px;" class="el-icon-success"></i> -->
        <span
          v-if="SDL_Global.PLC.ChuZao == true"
          style="
            width: 24px;
            height: 24px;
            background-color: #54c08e;
            display: inline-block;
            border-radius: 2em;
            margin: 7px 0 3px 0;
          "
        >
          <i
            class="iconfont icon-ok"
            style="
              color: #fff;
              font-size: 14px;
              display: block;
              margin-top: 5px;
            "
          ></i>
        </span>

        <!-- <i v-else style="font-size:20px" class="el-icon-success"></i> -->
        <span
          v-else
          style="
            width: 24px;
            height: 24px;
            background-color: #7082a4;
            display: inline-block;
            border-radius: 2em;
            margin: 7px 0 3px 0;
          "
        >
          <i
            class="iconfont icon-ok"
            style="
              color: #fff;
              font-size: 14px;
              display: block;
              margin-top: 5px;
            "
          ></i>
        </span>

        <div
          v-if="SDL_Global.PLC.ChuZao == true"
          style="font-size: 14px; color: #54c08e"
        >
          除藻
        </div>
        <div v-else style="font-size: 14px; color: #fff">除藻</div>
      </div>

      <!-- </el-col>
                <el-col :span='7' class="plcbtn"> -->
      <div class="plcbtn">
        <el-button
          size="small"
          class="plcmlbtn"
          style="padding: 8px 7px"
          @click="sendml('单次测量', SDL_Global.CMD.PLC_DanCiCeLiang)"
        >
          单次测量</el-button
        >
        <el-button
          size="small"
          class="plcmlbtn"
          style="padding: 8px 5px"
          @click="sendml('清洗', SDL_Global.CMD.PLC_QingXi)"
          >清洗
        </el-button>
        <el-button
          size="small"
          class="plcmlbtn"
          style="padding: 8px 5px"
          @click="sendml('除藻', SDL_Global.CMD.PLC_ChuZao)"
          >除藻
        </el-button>
        <el-button
          size="small"
          class="plcmlbtn"
          style="padding: 8px 5px"
          @click="sendml('复位', SDL_Global.CMD.PLC_DaiJi)"
          >复位
        </el-button>
      </div>

      <!-- </el-col>
            </el-row> -->
    </div>
    <!-- <el-tooltip class="item" effect="dark" content="切换泵阀操作" placement="top" popper-class="atooltip">
      <i class="iconfont icon-shezhi4" @click="tabs" style="
          z-index: 999;
          position: fixed;
          right: 25px;
          bottom: 50px;
          color: #fff;
        "></i>
    </el-tooltip> -->
    <div
      class="lct_body"
      v-bind:style="{
        height: lctheight + 'px',
        transform: scales,
        left: lfval + 'px',
      }"
    >
      <div v-if="imgshow" class="btmimg">
        <!-- <img src="../images/lct/BaseMap.jpg" /> -->
        <!-- 管道样式 -->
        <img
          v-bind:style="{
            left: FC.BaseMap.x + 'px',
            top: FC.BaseMap.y + 'px',
            'z-index': FC.BaseMap.zindex,
            width: FC.BaseMap.w + 'px',
            height: FC.BaseMap.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.BaseMap.img)"
          v-show="FC.BaseMap.visible"
        />
        <img
          v-bind:style="{
            left: FC.M1.x + 'px',
            y: FC.M1.y + 'px',
            'z-index': FC.M1.zindex,
            width: FC.M1.w + 'px',
            height: FC.M1.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M1.img)"
          v-show="FC.M1.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.M2.x + 'px',
            y: FC.M2.y + 'px',
            'z-index': FC.M2.zindex,
            width: FC.M2.w + 'px',
            height: FC.M2.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M2.img)"
          v-show="FC.M2.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.M3.x + 'px',
            y: FC.M3.y + 'px',
            'z-index': FC.M3.zindex,
            width: FC.M3.w + 'px',
            height: FC.M3.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M3.img)"
          v-show="FC.M3.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.M4.x + 'px',
            y: FC.M4.y + 'px',
            'z-index': FC.M4.zindex,
            width: FC.M4.w + 'px',
            height: FC.M4.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M4.img)"
          v-show="FC.M4.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.M6.x + 'px',
            y: FC.M6.y + 'px',
            'z-index': FC.M6.zindex,
            width: FC.M6.w + 'px',
            height: FC.M6.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M6.img)"
          v-show="FC.M6.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV1.x + 'px',
            y: FC.SV1.y + 'px',
            'z-index': FC.SV1.zindex,
            width: FC.SV1.w + 'px',
            height: FC.SV1.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV1.img)"
          v-show="FC.SV1.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV2.x + 'px',
            y: FC.SV2.y + 'px',
            'z-index': FC.SV2.zindex,
            width: FC.SV2.w + 'px',
            height: FC.SV2.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV2.img)"
          v-show="FC.SV2.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV3.x + 'px',
            y: FC.SV3.y + 'px',
            'z-index': FC.SV3.zindex,
            width: FC.SV3.w + 'px',
            height: FC.SV3.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV3.img)"
          v-show="FC.SV3.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV4.x + 'px',
            y: FC.SV4.y + 'px',
            'z-index': FC.SV4.zindex,
            width: FC.SV4.w + 'px',
            height: FC.SV4.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV4.img)"
          v-show="FC.SV4.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV5.x + 'px',
            y: FC.SV5.y + 'px',
            'z-index': FC.SV5.zindex,
            width: FC.SV5.w + 'px',
            height: FC.SV5.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV5.img)"
          v-show="FC.SV5.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV6.x + 'px',
            y: FC.SV6.y + 'px',
            'z-index': FC.SV6.zindex,
            width: FC.SV6.w + 'px',
            height: FC.SV6.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV6.img)"
          v-show="FC.SV6.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV7.x + 'px',
            y: FC.SV7.y + 'px',
            'z-index': FC.SV7.zindex,
            width: FC.SV7.w + 'px',
            height: FC.SV7.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV7.img)"
          v-show="FC.SV7.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV8.x + 'px',
            y: FC.SV8.y + 'px',
            'z-index': FC.SV8.zindex,
            width: FC.SV8.w + 'px',
            height: FC.SV8.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV8.img)"
          v-show="FC.SV8.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV9.x + 'px',
            y: FC.SV9.y + 'px',
            'z-index': FC.SV9.zindex,
            width: FC.SV9.w + 'px',
            height: FC.SV9.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV9.img)"
          v-show="FC.SV9.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV10.x + 'px',
            y: FC.SV10.y + 'px',
            'z-index': FC.SV10.zindex,
            width: FC.SV10.w + 'px',
            height: FC.SV10.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV10.img)"
          v-show="FC.SV10.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV11.x + 'px',
            y: FC.SV11.y + 'px',
            'z-index': FC.SV11.zindex,
            width: FC.SV11.w + 'px',
            height: FC.SV11.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV11.img)"
          v-show="FC.SV11.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV12.x + 'px',
            y: FC.SV12.y + 'px',
            'z-index': FC.SV12.zindex,
            width: FC.SV12.w + 'px',
            height: FC.SV12.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV12.img)"
          v-show="FC.SV12.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV13.x + 'px',
            y: FC.SV13.y + 'px',
            'z-index': FC.SV13.zindex,
            width: FC.SV13.w + 'px',
            height: FC.SV13.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV13.img)"
          v-show="FC.SV13.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV14.x + 'px',
            y: FC.SV14.y + 'px',
            'z-index': FC.SV14.zindex,
            width: FC.SV14.w + 'px',
            height: FC.SV14.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV14.img)"
          v-show="FC.SV14.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV15.x + 'px',
            y: FC.SV15.y + 'px',
            'z-index': FC.SV15.zindex,
            width: FC.SV15.w + 'px',
            height: FC.SV15.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV15.img)"
          v-show="FC.SV15.visible"
          class="imgclass"
        />
        <!-- <img v-bind:style="{
            left: FC.TP.x + 'px',
            y: FC.TP.y + 'px',
            'z-index': FC.TP.zindex,
            width: FC.TP.w + 'px',
            height: FC.TP.h + 'px',
          }" v-bind:src="require('@img/' + FC.TP.img)" v-show="FC.TP.visible" class="imgclass" />
        <img v-bind:style="{
            left: FC.TPAlarm.x + 'px',
            y: FC.TPAlarm.y + 'px',
            'z-index': FC.TPAlarm.zindex,
            width: FC.TPAlarm.w + 'px',
            height: FC.TPAlarm.h + 'px',
          }" v-bind:src="require('@img/' + FC.TPAlarm.img)" v-show="FC.TPAlarm.visible" class="imgclass" />
        <img v-bind:style="{
            left: FC.TN.x + 'px',
            y: FC.TN.y + 'px',
            'z-index': FC.TN.zindex,
            width: FC.TN.w + 'px',
            height: FC.TN.h + 'px',
          }" v-bind:src="require('@img/' + FC.TN.img)" v-show="FC.TN.visible" class="imgclass" />
        <img v-bind:style="{
            left: FC.TNAlarm.x + 'px',
            y: FC.TNAlarm.y + 'px',
            'z-index': FC.TNAlarm.zindex,
            width: FC.TNAlarm.w + 'px',
            height: FC.TNAlarm.h + 'px',
          }" v-bind:src="require('@img/' + FC.TNAlarm.img)" v-show="FC.TNAlarm.visible" class="imgclass" />
        <img v-bind:style="{
            left: FC.NH3.x + 'px',
            y: FC.NH3.y + 'px',
            'z-index': FC.NH3.zindex,
            width: FC.NH3.w + 'px',
            height: FC.NH3.h + 'px',
          }" v-bind:src="require('@img/' + FC.NH3.img)" v-show="FC.NH3.visible" class="imgclass" />
        <img v-bind:style="{
            left: FC.NH3Alarm.x + 'px',
            y: FC.NH3Alarm.y + 'px',
            'z-index': FC.NH3Alarm.zindex,
            width: FC.NH3Alarm.w + 'px',
            height: FC.NH3Alarm.h + 'px',
          }" v-bind:src="require('@img/' + FC.NH3Alarm.img)" v-show="FC.NH3Alarm.visible"
          v-bind:title="FC.NH3Alarm.name" v-bind:alt="FC.NH3Alarm.name" class="imgclass" />
        <img v-bind:style="{
            left: FC.COD.x + 'px',
            y: FC.COD.y + 'px',
            'z-index': FC.COD.zindex,
            width: FC.COD.w + 'px',
            height: FC.COD.h + 'px',
          }" v-bind:src="require('@img/' + FC.COD.img)" v-show="FC.COD.visible" class="imgclass" />
        <img v-bind:style="{
            left: FC.CODAlarm.x + 'px',
            y: FC.CODAlarm.y + 'px',
            'z-index': FC.CODAlarm.zindex,
            width: FC.CODAlarm.w + 'px',
            height: FC.CODAlarm.h + 'px',
          }" v-bind:src="require('@img/' + FC.CODAlarm.img)" v-show="FC.CODAlarm.visible" class="imgclass" /> -->
        <img
          v-bind:style="{
            left: FC.CDC.x + 'px',
            y: FC.CDC.y + 'px',
            'z-index': FC.CDC.zindex,
            width: FC.CDC.w + 'px',
            height: FC.CDC.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CDC.img)"
          v-show="FC.CDC.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.CDCAlarm.x + 'px',
            y: FC.CDCAlarm.y + 'px',
            'z-index': FC.CDCAlarm.zindex,
            width: FC.CDCAlarm.w + 'px',
            height: FC.CDCAlarm.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CDCAlarm.img)"
          v-show="FC.CDCAlarm.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.WuCan.x + 'px',
            y: FC.WuCan.y + 'px',
            'z-index': FC.WuCan.zindex,
            width: FC.WuCan.w + 'px',
            height: FC.WuCan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.WuCan.img)"
          v-show="FC.WuCan.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.WuCanAlarm.x + 'px',
            y: FC.WuCanAlarm.y + 'px',
            'z-index': FC.WuCanAlarm.zindex,
            width: FC.WuCanAlarm.w + 'px',
            height: FC.WuCanAlarm.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.WuCanAlarm.img)"
          v-show="FC.WuCanAlarm.visible"
          class="imgclass"
        />

        <img
          v-bind:style="{
            left: FC.CaiYangQi_22.x + 'px',
            y: FC.CaiYangQi_22.y + 'px',
            'z-index': FC.CaiYangQi_22.zindex,
            width: FC.CaiYangQi_22.w + 'px',
            height: FC.CaiYangQi_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CaiYangQi_22.img)"
          v-show="FC.CaiYangQi_22.visible"
          class="imgclass"
        />
        <img
          :alt="FC.YB_1_22.name"
          v-bind:style="{
            left: FC.YB_1_22.x + 'px',
            y: FC.YB_1_22.y + 'px',
            'z-index': FC.YB_1_22.zindex,
            width: FC.YB_1_22.w + 'px',
            height: FC.YB_1_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YB_1_22.img)"
          v-show="FC.YB_1_22.visible"
          class="imgclass"
        />
        <img
          :alt="FC.YB_2_22.name"
          v-bind:style="{
            left: FC.YB_2_22.x + 'px',
            y: FC.YB_2_22.y + 'px',
            'z-index': FC.YB_2_22.zindex,
            width: FC.YB_2_22.w + 'px',
            height: FC.YB_2_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YB_2_22.img)"
          v-show="FC.YB_2_22.visible"
          class="imgclass"
        />
        <img
          :alt="FC.YB_3_22.name"
          v-bind:style="{
            left: FC.YB_3_22.x + 'px',
            y: FC.YB_3_22.y + 'px',
            'z-index': FC.YB_3_22.zindex,
            width: FC.YB_3_22.w + 'px',
            height: FC.YB_3_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YB_3_22.img)"
          v-show="FC.YB_3_22.visible"
          class="imgclass"
        />
        <img
          :alt="FC.YB_4_22.name"
          v-bind:style="{
            left: FC.YB_4_22.x + 'px',
            y: FC.YB_4_22.y + 'px',
            'z-index': FC.YB_4_22.zindex,
            width: FC.YB_4_22.w + 'px',
            height: FC.YB_4_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YB_4_22.img)"
          v-show="FC.YB_4_22.visible"
          class="imgclass"
        />
        <img
          :alt="FC.YB_5_22.name"
          v-bind:style="{
            left: FC.YB_5_22.x + 'px',
            y: FC.YB_5_22.y + 'px',
            'z-index': FC.YB_5_22.zindex,
            width: FC.YB_5_22.w + 'px',
            height: FC.YB_5_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YB_5_22.img)"
          v-show="FC.YB_5_22.visible"
          class="imgclass"
        />
        <!-- <img
          v-bind:style="{
            left: FC.YBJB_1_22.x + 'px',
            y: FC.YBJB_1_22.y + 'px',
            'z-index': FC.YBJB_1_22.zindex,
            width: FC.YBJB_1_22.w + 'px',
            height: FC.YBJB_1_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YBJB_1_22.img)"
          v-show="FC.YBJB_1_22.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.YBJB_2_22.x + 'px',
            y: FC.YBJB_2_22.y + 'px',
            'z-index': FC.YBJB_2_22.zindex,
            width: FC.YBJB_2_22.w + 'px',
            height: FC.YBJB_2_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YBJB_2_22.img)"
          v-show="FC.YBJB_2_22.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.YBJB_3_22.x + 'px',
            y: FC.YBJB_3_22.y + 'px',
            'z-index': FC.YBJB_3_22.zindex,
            width: FC.YBJB_3_22.w + 'px',
            height: FC.YBJB_3_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YBJB_3_22.img)"
          v-show="FC.YBJB_3_22.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.YBJB_4_22.x + 'px',
            y: FC.YBJB_4_22.y + 'px',
            'z-index': FC.YBJB_4_22.zindex,
            width: FC.YBJB_4_22.w + 'px',
            height: FC.YBJB_4_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YBJB_4_22.img)"
          v-show="FC.YBJB_4_22.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.YBJB_5_22.x + 'px',
            y: FC.YBJB_5_22.y + 'px',
            'z-index': FC.YBJB_5_22.zindex,
            width: FC.YBJB_5_22.w + 'px',
            height: FC.YBJB_5_22.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.YBJB_5_22.img)"
          v-show="FC.YBJB_5_22.visible"
          class="imgclass"
        /> -->

        <!-- 数据定位 -->
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
        <div class="wcsj" v-if="Is_YLSZMD">
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.PH.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.PH.LastTestData }}
            </el-col>
            <el-col :span="5" class="wcData" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.PH.Unit
            }}</el-col>
            <template v-if="Is_ZMD">
              <el-col :span="4" class="wcName"
                >{{ SDL_Global.YeLvSu.Name }} :</el-col
              >
              <el-col
                :span="5"
                class="wcData"
                v-if="SDL_Global.YeLvSu.ComStatus > 0"
                >{{ SDL_Global.YeLvSu.LastTestData }}
              </el-col>
              <el-col :span="5" v-else>-- </el-col>
              <el-col :span="3" class="wcUnit">{{
                SDL_Global.YeLvSu.Unit
              }}</el-col>
            </template>
          </el-row>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.ShuiWen.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.ShuiWen.LastTestData }}
            </el-col>
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.ShuiWen.Unit
            }}</el-col>
            <template v-if="Is_ZMD">
              <el-col :span="4" class="wcName"
                >{{ SDL_Global.ZaoMiDu.Name }} :</el-col
              >
              <el-col
                :span="5"
                class="wcData"
                v-if="SDL_Global.YeLvSu.ComStatus > 0"
                >{{ SDL_Global.ZaoMiDu.LastTestData }}
              </el-col>
              <el-col :span="5" v-else>-- </el-col>
              <el-col :span="3" class="wcUnit">{{
                SDL_Global.ZaoMiDu.Unit
              }}</el-col>
            </template>
          </el-row>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.HunZhuoDu.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.HunZhuoDu.LastTestData }}
            </el-col>
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.HunZhuoDu.Unit
            }}</el-col>
            <template v-if="Is_SZY">
              <el-col :span="4" class="wcName"
                >{{ SDL_Global.SZY.Name }} :</el-col
              >
              <el-col
                :span="5"
                class="wcData"
                v-if="SDL_Global.SZY.ComStatus > 0"
                >{{ SDL_Global.SZY.LastTestData }}
              </el-col>
              <el-col :span="5" v-else>-- </el-col>
              <el-col :span="3" class="wcUnit">{{
                SDL_Global.SZY.Unit
              }}</el-col>
            </template>
          </el-row>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.DianDaoLv.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.DianDaoLv.LastTestData }}
            </el-col>
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.DianDaoLv.Unit
            }}</el-col>
          </el-row>

          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.RongJieYang.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0">
              {{ SDL_Global.WC.RongJieYang.LastTestData }}</el-col
            >
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.RongJieYang.Unit
            }}</el-col>
          </el-row>
        </div>
        <div class="wcsjs" v-else>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.PH.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.PH.LastTestData }}
            </el-col>
            <el-col :span="5" class="wcData" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.PH.Unit
            }}</el-col>
          </el-row>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.ShuiWen.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.ShuiWen.LastTestData }}
            </el-col>
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.ShuiWen.Unit
            }}</el-col>
          </el-row>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.HunZhuoDu.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.HunZhuoDu.LastTestData }}
            </el-col>
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.HunZhuoDu.Unit
            }}</el-col>
          </el-row>
          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.DianDaoLv.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0"
              >{{ SDL_Global.WC.DianDaoLv.LastTestData }}
            </el-col>
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.DianDaoLv.Unit
            }}</el-col>
          </el-row>

          <el-row style="height: 20%; text-align: center">
            <el-col :span="4" class="wcName"
              >{{ SDL_Global.WC.RongJieYang.Name }} :</el-col
            >
            <el-col :span="5" class="wcData" v-if="SDL_Global.WC.ComStatus > 0">
              {{ SDL_Global.WC.RongJieYang.LastTestData }}</el-col
            >
            <el-col :span="5" v-else>-- </el-col>
            <el-col :span="3" class="wcUnit">{{
              SDL_Global.WC.RongJieYang.Unit
            }}</el-col>
          </el-row>
        </div>
        <div class="yali">
          <el-row style="text-align: center">
            <el-col>{{ SDL_Global.PLC.YaLi }}</el-col>
          </el-row>
          <el-row style="text-align: center">
            <el-col>Kpa</el-col>
          </el-row>
        </div>
        <div class="pinghao" v-show="CYQshow">
          {{ SDL_Global.LY.PingHao }}
        </div>
        <template v-for="(item, index) in YiBiaoShow">
          <div :class="dataclass[index]">
            <div class="TP" @click="openDialog(item.ID, item.Name)">
              {{ item.Name }}
            </div>
            <div class="TPval">
              {{ item.LastTestData }}
            </div>
            <div class="TPunit">
              {{ item.Unit }}
            </div>

            <div class="TPstate" @click="openDialog(item.ID, item.Name)">
              <span
                v-if="item.ComStatus != 1"
                style="
                  width: 10px;
                  height: 10px;
                  background-color: #cccccc;
                  display: inline-block;
                  border-radius: 2em;
                "
              ></span>
              <span
                v-else-if="
                  item.Fault > 0 || item.Alarm > 0 || item.JB_Fault > 0
                "
                style="
                  width: 10px;
                  height: 10px;
                  background-color: #e54e4e;
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
              {{ item.MeterStatusText }}
            </div>
          </div>
        </template>

        <!-- </el-tooltip> -->
        <!-- <div class="dada_pot1">
                    <div class="TN" @click="openDialog(SDL_Global.TN.ID, SDL_Global.TN.Name)">
                        {{SDL_Global.TN.Name}}
                    </div>
                    <div class="TNval">
                        {{SDL_Global.TN.LastTestData}}

                    </div>
                    <div class="TNunit">
                        {{SDL_Global.TN.Unit}}

                    </div>

                    <div class="TNstate" @click="openDialog(SDL_Global.TN.ID, SDL_Global.TN.Name)">
                        <span v-if="SDL_Global.TN.ComStatus!=1"
                            style="width: 10px;height: 10px;background-color: #cccccc;display: inline-block;border-radius:2em;"></span>
                        <span v-else-if="SDL_Global.TN.Fault>0||SDL_Global.TN.Alarm>0||SDL_Global.TN.JB_Fault> 0"
                            style="width: 10px;height: 10px;background-color: #e54e4e;display: inline-block;border-radius:2em;"></span>
                        <span v-else
                            style="width: 10px;height: 10px;background-color: #5decaa;display: inline-block;border-radius:2em;"></span>

                        {{SDL_Global.TN.MeterStatusText}}
                    </div>
                </div> -->
        <!-- <div class="dada_pot3">
                    <div class="COD" @click="openDialog(SDL_Global.COD.ID, SDL_Global.COD.Name)">
                        {{SDL_Global.COD.Name}}
                    </div>
                    <div class="CODval">
                        {{SDL_Global.COD.LastTestData}}

                    </div>
                    <div class="CODunit">
                        {{SDL_Global.COD.Unit}}

                    </div>

                    <div class="CODstate" @click="openDialog(SDL_Global.COD.ID, SDL_Global.COD.Name)">
                        <span v-if="SDL_Global.COD.ComStatus!=1"
                            style="width: 10px;height: 10px;background-color: #cccccc;display: inline-block;border-radius:2em;"></span>
                        <span v-else-if="SDL_Global.COD.Fault>0||SDL_Global.COD.Alarm>0||SDL_Global.COD.JB_Fault > 0"
                            style="width: 10px;height: 10px;background-color: #e54e4e;display: inline-block;border-radius:2em;"></span>
                        <span v-else
                            style="width: 10px;height: 10px;background-color: #5decaa;display: inline-block;border-radius:2em;"></span>

                        {{SDL_Global.COD.MeterStatusText}}
                    </div>
                </div> -->
        <!-- <div class="dada_pot4">
                    <div class="NH3" @click="openDialog(SDL_Global.NH3.ID, SDL_Global.NH3.Name)">
                        {{SDL_Global.NH3.Name}}
                    </div>
                    <div class="NH3val">
                        {{SDL_Global.NH3.LastTestData}}

                    </div>
                    <div class="NH3unit">
                        {{SDL_Global.NH3.Unit}}

                    </div>

                    <div class="NH3state" @click="openDialog(SDL_Global.NH3.ID, SDL_Global.NH3.Name)">
                        <span v-if="SDL_Global.NH3.ComStatus!=1"
                            style="width: 10px;height: 10px;background-color: #cccccc;display: inline-block;border-radius:2em;"></span>
                        <span v-else-if="SDL_Global.NH3.Fault>0||SDL_Global.NH3.Alarm>0 || SDL_Global.NH3.JB_Fault > 0"
                            style="width: 10px;height: 10px;background-color: #e54e4e;display: inline-block;border-radius:2em;"></span>
                        <span v-else
                            style="width: 10px;height: 10px;background-color: #5decaa;display: inline-block;border-radius:2em;"></span>

                        {{SDL_Global.NH3.MeterStatusText}}
                    </div>
                </div> -->
        <!-- <div class="dada_pot5">
                    <div class="NH3" @click="openDialog(SDL_Global.NH3.ID, SDL_Global.NH3.Name)">
                        {{SDL_Global.NH3.Name}}
                    </div>
                    <div class="NH3val">
                        {{SDL_Global.NH3.LastTestData}}

                    </div>
                    <div class="NH3unit">
                        {{SDL_Global.NH3.Unit}}

                    </div>

                    <div class="NH3state" @click="openDialog(SDL_Global.NH3.ID, SDL_Global.NH3.Name)">
                        <span v-if="SDL_Global.NH3.ComStatus!=1"
                            style="width: 10px;height: 10px;background-color: #cccccc;display: inline-block;border-radius:2em;"></span>
                        <span v-else-if="SDL_Global.NH3.Fault>0||SDL_Global.NH3.Alarm>0 || SDL_Global.NH3.JB_Fault > 0"
                            style="width: 10px;height: 10px;background-color: #e54e4e;display: inline-block;border-radius:2em;"></span>
                        <span v-else
                            style="width: 10px;height: 10px;background-color: #5decaa;display: inline-block;border-radius:2em;"></span>

                        {{SDL_Global.NH3.MeterStatusText}}
                    </div>
                </div> -->

        <!-- </el-tooltip> -->

        <!-- 泵阀开关 -->
        <div
          class="kyj"
          @click="
            sendbfml(
              '空压机Air_c',
              SDL_Global.CMD.PLC_KongYaJi.Format(!SDL_Global.PLC.KongYaJiStatus)
            )
          "
        ></div>

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
          content="五参数池排水阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV11"
            @click="
              sendbfml(
                '五参数池排水阀SV11',
                SDL_Global.CMD.PLC_SV.Format(11, !SDL_Global.PLC.SV11Status)
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
          content="五参数池清洗阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV7"
            @click="
              sendbfml(
                '五参数池清洗阀SV7',
                SDL_Global.CMD.PLC_SV.Format(7, !SDL_Global.PLC.SV7Status)
              )
            "
          ></div>
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="dark"
          content="沉淀池排水阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV12"
            @click="
              sendbfml(
                '沉淀池排水阀SV12',
                SDL_Global.CMD.PLC_SV.Format(12, !SDL_Global.PLC.SV12Status)
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
          content="沉淀池清洗阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV8"
            @click="
              sendbfml(
                '沉淀池清洗阀SV8',
                SDL_Global.CMD.PLC_SV.Format(8, !SDL_Global.PLC.SV8Status)
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
          content="反吹空气阀"
          placement="top"
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
          content="五参数池进水阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV9"
            @click="
              sendbfml(
                '五参数池进水阀SV9',
                SDL_Global.CMD.PLC_SV.Format(9, !SDL_Global.PLC.SV9Status)
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
          content="沉淀池进水阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV10"
            @click="
              sendbfml(
                '沉淀池进水阀SV10',
                SDL_Global.CMD.PLC_SV.Format(10, !SDL_Global.PLC.SV10Status)
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
        <div class="handle_div" v-if="SDL_Global.PLC.ZhuoDuYuChuLi">
          <div>
            <span>预处理 :</span>

            <el-tooltip
              class="item"
              effect="dark"
              placement="top"
              popper-class="atooltip"
            >
              <div slot="content">
                <div>
                  浊度区间：{{
                    SDL_Global.YuChuLiFangShi.MinVal +
                    "-" +
                    SDL_Global.YuChuLiFangShi.MaxVal
                  }}
                </div>
                <div>详细请查看[参数设置->预处理设置]</div>
              </div>
              <span>
                <span>{{ SDL_Global.YuChuLiFangShi.Name }}</span>
                <i class="el-icon-question"></i>
              </span>
            </el-tooltip>

            <span style="margin: 0 5px; color: #ccc">|</span>
            <span>总磷预处理 :</span>

            <el-tooltip
              class="item"
              effect="dark"
              :content="
                '浊度大于' +
                SDL_Global.PLC.TPShangXian +
                'NTU，自动打开过滤阀门'
              "
              placement="top"
              popper-class="atooltip"
            >
              <span>
                <span>{{ SDL_Global.PLC.TPGuoLvFa ? "开" : "关" }}</span>
                <i class="el-icon-question"></i>
              </span>
            </el-tooltip>
          </div>
        </div>
      </div>

      <div v-else class="btmimg">
        <bfkg></bfkg>
      </div>
    </div>
    <div class="lct_footer">
      <div class="bjzt">报警状态</div>
      <el-tooltip effect="dark" popper-class="atooltip" placement="top">
        <div class="beng" slot="content">
          <div :class="SDL_Global.PLC.Beng1Fault == true ? 'tipActive' : ''">
            泵1故障
          </div>
          <div class="tipcons">泵2故障</div>
        </div>
        <div class="dybj">
          <span
            v-if="SDL_Global.PLC.Beng1Fault == false"
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 16px;
              margin-right: 5px;
            "
          ></span>
          <span
            v-else
            style="
              width: 8px;
              height: 8px;
              background-color: #e54e4e;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 16px;
              margin-right: 5px;
            "
          ></span>
          <span>泵故障</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>

      <div class="caishuibj">
        <span
          v-if="SDL_Global.PLC.CaiShuiFault == false"
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 16px;
            margin-right: 5px;
          "
        ></span>
        <span
          v-else
          style="
            width: 8px;
            height: 8px;
            background-color: #e54e4e;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 16px;
            margin-right: 5px;
          "
        ></span>
        <span>采水单元故障</span>
      </div>
      <div class="dybj">
        <span
          v-if="SDL_Global.PLC.DianYuanFault == false"
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 16px;
            margin-right: 5px;
          "
        ></span>
        <span
          v-else
          style="
            width: 8px;
            height: 8px;
            background-color: #e54e4e;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 16px;
            margin-right: 5px;
          "
        ></span>
        <span>电源故障</span>
      </div>
      <div class="dybj">
        <span
          v-if="SDL_Global.PLC.PeiShuiFault == false"
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 16px;
            margin-right: 5px;
          "
        ></span>
        <span
          v-else
          style="
            width: 8px;
            height: 8px;
            background-color: #e54e4e;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 16px;
            margin-right: 5px;
          "
        ></span>
        <span>配水故障</span>
      </div>
      <el-tooltip effect="dark" placement="top" popper-class="atooltip">
        <div class="beng" slot="content">
          <div
            :class="
              SDL_Global.PLC.CaiShuiWuCanYeWeiAlarm == true ? 'tipActive' : ''
            "
          >
            五参数液位报警
          </div>
          <div
            :class="
              SDL_Global.PLC.ChenDianChiYeWeiAlarm == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            沉淀池液位报警
          </div>
          <div
            :class="
              SDL_Global.PLC.CaiShuiYeWeiAlarm == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            采水点液位报警
          </div>
          <div
            :class="
              SDL_Global.PLC.QingXiYeWeiAlarm == true ? 'tipActives' : 'tipcons'
            "
          >
            清洗液位报警
          </div>
        </div>
        <div class="ywbj">
          <span
            v-if="
              SDL_Global.PLC.CaiShuiWuCanYeWeiAlarm == false &&
              SDL_Global.PLC.ChenDianChiYeWeiAlarm == false &&
              SDL_Global.PLC.CaiShuiYeWeiAlarm == false &&
              SDL_Global.PLC.CaiShuiYeWeiAlarm == false &&
              SDL_Global.PLC.QingXiYeWeiAlarm == false
            "
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 16px;
              margin-right: 5px;
            "
          ></span>
          <span
            v-else
            style="
              width: 8px;
              height: 8px;
              background-color: #e54e4e;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 16px;
              margin-right: 5px;
            "
          ></span>
          <span>液位报警</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" placement="top" popper-class="atooltip">
        <div class="beng" slot="content">
          <div
            :class="
              SDL_Global.PLC.CaiYang1PeiShuiFault == true ? 'tipActives' : ''
            "
          >
            <!-- 氨氮采样杯配水故障 -->
            {{ caiYangbeiAlarm[0].val }}
          </div>
          <div
            :class="
              SDL_Global.PLC.CaiYang2PeiShuiFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 高锰酸盐指数采样杯配水故障 -->
            {{ caiYangbeiAlarm[1].val }}
          </div>

          <div
            :class="
              SDL_Global.PLC.CaiYang3PeiShuiFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 总磷采样杯配水故障 -->
            {{ caiYangbeiAlarm[2].val }}
          </div>
          <div
            :class="
              SDL_Global.PLC.CaiYang4PeiShuiFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 总氮采样杯配水故障 -->
            {{ caiYangbeiAlarm[3].val }}
          </div>
          <div
            v-if="YiBiaoShow.length > 4"
            :class="
              SDL_Global.PLC.CaiYang5PeiShuiFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 总氮采样杯配水故障 -->
            {{ caiYangbeiAlarm[4].val }}
          </div>

          <div
            :class="
              SDL_Global.PLC.CaiYang1ChuZaoFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 氨氮采样杯除藻故障 -->
            {{ caiYangbeiChuZaoAlarm[0].val }}
          </div>
          <div
            :class="
              SDL_Global.PLC.CaiYang2ChuZaoFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 高锰酸盐指数采样杯除藻故障 -->
            {{ caiYangbeiChuZaoAlarm[1].val }}
          </div>
          <div
            :class="
              SDL_Global.PLC.CaiYang3ChuZaoFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 总磷采样杯除藻故障 -->
            {{ caiYangbeiChuZaoAlarm[2].val }}
          </div>
          <div
            :class="
              SDL_Global.PLC.CaiYang4ChuZaoFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 总氮采样杯除藻故障 -->
            {{ caiYangbeiChuZaoAlarm[3].val }}
          </div>
          <div
            v-if="YiBiaoShow.length > 4"
            :class="
              SDL_Global.PLC.CaiYang5ChuZaoFault == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            <!-- 总氮采样杯除藻故障 -->
            {{ caiYangbeiChuZaoAlarm[4].val }}
          </div>
        </div>
        <div class="caiyangbeibj">
          <span
            v-if="
              SDL_Global.PLC.CaiYang1PeiShuiFault == false &&
              SDL_Global.PLC.CaiYang2PeiShuiFault == false &&
              SDL_Global.PLC.CaiYang3PeiShuiFault == false &&
              SDL_Global.PLC.CaiYang4PeiShuiFault == false &&
              SDL_Global.PLC.CaiYang5PeiShuiFault == false &&
              SDL_Global.PLC.CaiYang1ChuZaoFault == false &&
              SDL_Global.PLC.CaiYang2ChuZaoFault == false &&
              SDL_Global.PLC.CaiYang3ChuZaoFault == false &&
              SDL_Global.PLC.CaiYang4ChuZaoFault == false &&
              SDL_Global.PLC.CaiYang5ChuZaoFault == false
            "
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 16px;
              margin-right: 5px;
            "
          ></span>
          <span
            v-else
            style="
              width: 8px;
              height: 8px;
              background-color: #e54e4e;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 16px;
              margin-right: 5px;
            "
          ></span>
          <span>采样杯故障 </span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>
      <div>
        <!-- <el-button size="small" class="qhbtn" @click="tabs">
                    泵阀操作切换</el-button> -->
        <el-button
          size="small"
          class="qcbjbtn"
          @click="qcAlarm('报警复位', SDL_Global.CMD.PLC_BaoJingFuWei)"
        >
          清除报警</el-button
        >
      </div>
    </div>
    <Param :moreParammodel.sync="MoreParam" :ID="ID" :Name="Name"> </Param>
  </div>
</template>

<script>
// import jclc from "@config/jclc";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Param from "./module/Param";
import bfkg from "./module/bfkg";

export default {
  name: "lct",
  data() {
    let YiBiaoImg = [];
    YiBiaoImg = this.socketApi.globalDataConfig.SDL_Global.MetersData()
      .filter((m) => m.isMain && m.ID != "CYQ")
      .sort(function (a, b) {
        return a.sort - b.sort;
      });

    let SZY = false;
    SZY =
      this.socketApi.globalDataConfig.SDL_Global.MetersData().filter(
        (m) => m.Code == "w22001"
      ).length > 0
        ? true
        : false;
    let ylszmd = false;
    ylszmd =
      this.socketApi.globalDataConfig.SDL_Global.MetersData().filter(
        (m) => m.Code == "w01016" || m.Code == "w19011" || m.Code == "w22001"
      ).length > 0
        ? true
        : false;

    let zmd = false;
    zmd =
      this.socketApi.globalDataConfig.SDL_Global.MetersData().filter(
        (m) => m.Code == "w01016" || m.Code == "w19011"
      ).length > 0
        ? true
        : false;
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      FC: this.socketApi.globalDataConfig.FlowChart,
      Is_YLSZMD: ylszmd,
      Is_ZMD: zmd,
      Is_SZY: SZY,
      lctheight: null,
      scales: "scale(0.72)",
      lfval: -147,
      RoleID: JSON.parse(localStorage.getItem("RoleID")),
      ID: "TP",
      Name: "参数信息",
      MoreParam: false,
      YiBiaoShow: YiBiaoImg,
      imgshow: true,
      dataclass: [
        "data_pot1",
        "data_pot2",
        "data_pot3",
        "data_pot4",
        "data_pot5",
      ],
      CYQshow: this.socketApi.globalDataConfig.SDL_Global.CY.isMain,
      caiYangbeiAlarm: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
      ],
      caiYangbeiChuZaoAlarm: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
      ],
    };
  },
  mounted() {
    // console.log("sss11", this.socketApi.globalDataConfig.SDL_Global.NH3.ComStatus)
    // console.log("RoleID", this.RoleID);
    this.getHeight();
    window.onresize = () => {
      this.resizeLctBody();

      // return (() => {
      // 	window.fullHeight = document.documentElement.clientHeight;
      // 	window.fullWidth = document.documentElement.clientWidth;
      // 	that.windowHeight = window.fullHeight; // 高
      // 	that.windowWidth = window.fullWidth; // 宽console.log("实时屏幕高度：", that.windowHeight);

      // })()
    };
    this.getPretreatmentData();
    this.yibiaosort();
  },
  created() {
    // console.log("sss11", this.socketApi.globalDataConfig.SDL_Global.NH3.ComStatus)
    // console.log("RoleID", this.RoleID);

    window.addEventListener("resize", this.getHeight);
    this.resizeLctBody();
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  computed: {
    ...mapGetters({
      getIsCollapse: "getIsCollapse",
    }),
  },
  watch: {
    /* 监听getSidebarFold变化，解决echarts容器变化，重新渲染 setTimeout时间必须设置，且不能太短 */
    getIsCollapse() {
      setTimeout(() => {
        this.resizeLctBody();
      }, 100);
    },
  },
  components: {
    Param,
    bfkg,
  },
  methods: {
    // 获取预处理方式设置列表
    getPretreatmentData() {
      let $this = this;
      //1.判断预处理是否启用
      if (this.SDL_Global.PLC.ZhuoDuYuChuLi) {
        if (!localStorage.getItem("pretreatmentData")) {
          this.http
            .get("/getPretreatment")
            .then((res) => {
              if (res && res.length > 0) {
                console.log(res);
                res.forEach(function (item, index) {
                  item.isCurrent = false;
                });

                $this.$store.commit("setStorage", {
                  key: "pretreatmentData",
                  value: res,
                });
              }
            })
            .catch((res) => {
              console.log(res);
            });
        }
      }
    },
    yibiaosort() {
      for (var i = 0; i < this.YiBiaoShow.length; i++) {
        this.caiYangbeiAlarm[i].val =
          this.YiBiaoShow[i].Name + "采样杯配水故障";
        this.caiYangbeiChuZaoAlarm[i].val =
          this.YiBiaoShow[i].Name + "采样杯除藻故障";
      }
    },
    // 切换泵阀操作
    tabs() {
      if (this.imgshow == true) {
        this.imgshow = false;
      } else {
        this.imgshow = true;
      }
    },

    //查看参数
    openDialog(id, name) {
      this.MoreParam = true;
      this.ID = id;
      this.Name = name;
    },
    // 等比例缩小
    resizeLctBody() {
      this.$store.state.isCollapse;
      let lctwidth = window.innerWidth;
      if (lctwidth <= 1024) {
        if (this.$store.state.isCollapse == false) {
          this.scales = "scale(0.72)";
          this.lfval = -147; //-147
        } else {
          this.scales = "scale(0.8)";
          this.lfval = -97; //-107
        }
      } else if (lctwidth < 1466 && lctwidth > 1024) {
        if (this.$store.state.isCollapse == false) {
          this.scales = "scale(1)";
          this.lfval = 0;
        } else {
          this.scales = "scale(1)";
          this.lfval = 0;
        }
      } else {
        if (this.$store.state.isCollapse == false) {
          this.scales = "scale(1)";
          this.lfval = 25;
        } else {
          this.scales = "scale(1)";
          this.lfval = -20;
        }
      }
    },
    //    动态获取流程图高度
    getHeight() {
      this.lctheight = window.innerHeight - 60 - 56 - 40;
      if (this.lctheight < 617) {
        this.lctheight = 608;
      }
      let lctwidth = window.innerWidth;
      if (lctwidth > 1024) {
        this.scales = "scale(1)";
        // this.lfval = 120
      }
    },
    //状态
    stateData(d) {
      if (d == -1) return "未知";
      if (d == 0) return "空闲";
      if (d == 1) return "水样测试";
      if (d == 2) return "标样核查";
      if (d == 3) return "零点核查";
      if (d == 4) return "跨度核查";
      if (d == 5) return "空白测试";
      if (d == 6) return "平行样测试";
      if (d == 7) return "加标回收";
      if (d == 8) return "空白校准";
      if (d == 9) return "标样校准";
      if (d == 10) return "初始化(清洗)";
      if (d == 11) return "停止测试";
      if (d == 19) return "标定";
    },
    //报警
    bjData(b) {
      if (b == 0) {
        return "无告警";
      } else if (b == 1) {
        return "缺试剂告警";
      } else if (b == 2) {
        return "缺水样告警";
      } else if (b == 3) {
        return "缺蒸馏水告警";
      } else if (b == 4) {
        return "缺标液告警";
      } else if (b == 7) {
        return "超量程告警";
      } else if (b == 8) {
        return "加热异常";
      } else if (b == 10) {
        return "超上限告警";
      } else if (b == 11) {
        return "超下限告警";
      } else if (b == 12) {
        return "仪表内部其他异常";
      }
    },
    //模式--暂时无用
    pattern(p) {
      if (p == 1) {
        return "维护模式";
      } else if (p == 2) {
        // console.log('jclc', this.ms)
        // for (let i = 0; i < this.flowChartJson.length; i++) {
        //   if (this.flowChartJson[i].json.id == "日质控" && !this.flowChartJson[i].json.stateShow.state) {
        //     return "间隔模式";
        //   } else if (this.flowChartJson[i].json.id == "日质控" && this.flowChartJson[i].json.stateShow.state) {
        //     return "质控模式";
        //   }
        // }
        return "间隔模式";
      } else if (p == 4) {
        return "应急模式";
      } else if (p == 8) {
        return "质控模式";
      } else {
        return "";
      }
    },
    //泵和控制按钮
    // controlSend(type, state, ml, name) {
    //   if (type == "imgBtn") {
    //     var data =
    //       "" +
    //       localStorage.getItem("Loginedname") +
    //       "," +
    //       name +
    //       "," +
    //       ml +
    //       "=" +
    //       !state;
    //     // console.log(data);
    //     if (this.RoleID == 0) {
    //       this.$message.info("该用户暂无权限，请切换其他用户");
    //     } else {
    //       this.socketApi.sendSock(data);
    //     }
    //   }
    // },
    //    plc状态
    plcState(daiji, qingxi, caishui, peishui, celiang) {
      if (daiji == true) {
        return 0;
      } else if (qingxi == true) {
        return 1;
      } else if (caishui == true) {
        return 2;
      } else if (peishui == true) {
        return 3;
      } else if (celiang == true) {
        return 4;
      } else {
        return;
      }
    },
    // 清除报警
    qcAlarm(mlName, ml) {
      var data =
        "" + localStorage.getItem("Loginedname") + "," + mlName + "," + ml;
      // this.$message.info(data);

      if (this.RoleID == 0) {
        this.$message.info("该用户暂无权限，请切换其他用户");
      } else {
        this.socketApi.sendSock(data, true);
      }
    },
    // plc命令
    sendml(mlName, ml) {
      if (mlName == "复位") {
        let dataf =
          "" + localStorage.getItem("Loginedname") + "," + mlName + "," + ml;
        // this.$message.info(dataf);
        if (this.RoleID == 0) {
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
          if (this.RoleID == 0) {
            // this.$message.info("该用户暂无权限，请切换其他用户");
          } else {
            this.socketApi.sendSock(datas);
          }
        }, 5000);
      } else {
        if (this.RoleID == 0) {
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
            if (mlName == "单次测量") {
              // this.$message.info(data + ";" + "手动数据标识=M");
              this.socketApi.sendSock(data + ";" + "手动数据标识=M");
            } else {
              // this.$message.info(data);
              this.socketApi.sendSock(data, true);
            }
            setTimeout(() => {
              let Fml = "";
              if (mlName == "单次测量") {
                Fml = "plc_单次测量=False";
              } else if (mlName == "清洗") {
                Fml = "plc_清洗=False";
              } else if (mlName == "除藻") {
                Fml = "plc_除藻=False";
              } else if (mlName == "复位") {
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
    // 泵阀开关
    sendbfml(name, ml) {
      // 除访客之外用户可以操作
      if (this.RoleID == 0) {
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

<style scoped>
/* 预处理div样式  start */
.handle_div {
  position: fixed;
  z-index: 999;
  bottom: 7px;
  right: 60px;
  height: 25px;
  background-color: #437eda;
  color: #fff;
  line-height: 25px;
  width: 270px;
  border-radius: 5px;
  font-size: 14px;
}

.handle_div div {
  padding-left: 10px;
}

/* 预处理div样式 end */
/* 整体 */
.lct {
  height: 100%;
}

@media only screen and (max-width: 1024px) {
  .lct_Header {
    min-width: 860px !important;
  }

  /* .lct_body {
            left: -145px !important;

            transform: scale(0.72) !important;
        } */

  /* 底图 */
  /* .btmimg {
            position: relative !important;

        } */

  /* 运行状态样式 */
  .yxlab {
    width: 76px !important;
  }

  /* 流程 */
  .steps {
    width: 347px !important;
  }

  /* 五参数和除藻状态 */
  .ztsj {
    left: -15px;
    position: relative;
  }

  .czsj {
    margin-left: 13px !important;
  }

  .lct_footer {
    min-width: 860px !important;
  }

  .lct_footer .bjzt {
    width: 76px !important;
  }

  .dybj {
    width: 95px !important;
    margin-right: 1px !important;
  }

  .caishuibj {
    margin-right: 16px !important;
  }

  .ywbj {
    width: 110px !important;
    margin-right: 1px !important;
  }
}

/* 头部 */
.lct_Header {
  background-color: #3c4c6a;
  height: 56px;
  min-width: 1166px;
}

/* 运行状态样式 */
.yxlab {
  width: 115px;
  color: #bccdee;
  font-weight: bolder;
  line-height: 56px;
  padding-left: 20px;
  font-size: 14px;
  float: left;
}

/* 流程 */
.steps {
  width: 512px;
  float: left;
}

/* 五参数和除藻状态 */
.ztsj {
  float: left;
  text-align: center;
  /* line-height: 21px; */
  color: #bccdee;
  font-size: 13px;
}

.czsj {
  float: left;
  text-align: center;
  /* line-height: 21px; */
  color: #bccdee;
  font-size: 13px;
  margin-left: 78px;
}

.el-icon-success {
  font-size: 20px;
  margin-top: 10px;
}

/* plc btn */
.plcbtn {
  line-height: 56px;
  text-align: right;
  padding-right: 20px;
}

.el-button:focus,
.el-button:hover {
  color: #ecf5ff;
  border-color: #409eff;
  background-color: #409eff;
}

/* plc命令btn */
.plcmlbtn {
  background-color: #506c98;
  color: #fff;
  font-size: 14px;
  border-color: #506c98;
  cursor: pointer;
}

/* 流程图 */
.lct_body {
  width: 1166px;
  margin: 0 auto;
  position: relative;
}

/* 底图 */
.btmimg {
  /* position: relative;
    text-align: center; */
  position: relative !important;
  top: 50%;
  transform: translateY(-50%);
}

.item {
  z-index: 999;
}

/* 选中 */
.tipActive {
  color: #e54e4e;
}

.tipActives {
  color: #e54e4e;
  margin-top: 12px;
}

/* 泵2 */

.tipcons {
  /* margin-bottom: 4px; */
  margin-top: 12px;
}

.imgclass {
  position: absolute;
}

/* 空压机 */
.kyj {
  width: 80px;
  height: 40px;
  /* background-color: pink; */
  opacity: 0.1;
  position: absolute;
  left: 42px;
  top: 39px;
  cursor: pointer;
}

.Sv1 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 187px;
  top: 456px;
  cursor: pointer;
}

.SV6 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 546px;
  top: 59px;
  cursor: pointer;
}

.SV11 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 357px;
  top: 501px;
  cursor: pointer;
}

.M1 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 114px;
  top: 467px;
  cursor: pointer;
}

.SV2 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 187px;
  top: 385px;
  cursor: pointer;
}

.SV7 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 274px;
  top: 301px;
  cursor: pointer;
}

.SV12 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 492px;
  top: 501px;
  cursor: pointer;
}

.M2 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 114px;
  top: 396px;
  cursor: pointer;
}

.SV3 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 217px;
  top: 212px;
  cursor: pointer;
}

.SV8 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 410px;
  top: 301px;
  cursor: pointer;
}

.SV13 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 617px;
  top: 371px;
  cursor: pointer;
}

.M3 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 156px;
  top: 223px;
  cursor: pointer;
}

.SV4 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 238px;
  top: 59px;
  cursor: pointer;
}

.SV9 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 316px;
  top: 301px;
  cursor: pointer;
}

.SV14 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 617px;
  top: 327px;
  cursor: pointer;
}

.M4 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 671px;
  top: 339px;
  cursor: pointer;
}

.SV5 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 237px;
  top: 364px;
  cursor: pointer;
}

.SV10 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 452px;
  top: 301px;
  cursor: pointer;
}

.SV15 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 724px;
  top: 501px;
  cursor: pointer;
}

.SV16 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 841px;
  top: 501px;
  cursor: pointer;
}

.SV17 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 957px;
  top: 501px;
  cursor: pointer;
}

.SV18 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 1073px;
  top: 501px;
  cursor: pointer;
}

.M6 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 156px;
  top: 98px;
  cursor: pointer;
}

/* 五参数据 */
.wcsj {
  width: 262px;
  height: 135px;
  font-size: 14px;
  color: #fff;
  background-color: transparent;
  /* background-color: pink; */
  padding-top: 3px;
  position: absolute;
  left: 281px;
  top: 30px;
}
.wcsjs{
  width: 262px;
  height: 135px;
  font-size: 14px;
  color: #fff;
  background-color: transparent;
  /* background-color: pink; */
  padding-top: 3px;
  position: absolute;
  left: 344px;
  top: 30px;
}
/* 站房温湿度 */
.zfhj {
  width: 65px;
  height: 65px;
  color: #fff;
  background-color: #3c4c6a;
  position: absolute;
  left: 91px;
  top: 285px;
}

/* 压力 */
.yali {
  width: 56px;
  height: 36px;
  font-size: 12px;
  color: #fff;
  background-color: transparent;
  position: absolute;
  left: 283px;
  top: 391px;
}

/* 瓶号 */
.pinghao {
  width: 38px;
  height: 20px;
  background-color: transparent;
  text-align: center;
  font-size: 14px;
  color: #5decaa;
  position: absolute;
  left: 614px;
  top: 195px;
}

/* 五参名称 */
.wcName {
  text-align: right;
  font-size: 12px;
}

.wcData {
  color: #5decaa;
  text-align: center;
  font-size: 12px;
  /* width: 33%; */
}

.wcUnit {
  font-size: 12px;
  text-align: left;
}

/* tp仪表 */

.data_pot1 {
  width: 79px;
  height: 101px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink;
        opacity:0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 680px;
  top: 85px;
  text-align: center;
}

.TN {
  width: 96px;
  /* font-size: 14px; */
  color: #fff;
  cursor: pointer;
  position: relative;
  left: -9px;
  top: 2px;
  text-align: center;
}

.TNval {
  width: 96px;
  /* font-size: 14px; */
  color: #5decaa;
  position: relative;
  left: -9px;
  top: 10px;
  text-align: center;
}

.TNunit {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 16px;
  text-align: center;
}

.TNstate {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 25px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

/* tn仪表 */
.data_pot2 {
  width: 79px;
  height: 101px;
  font-size: 12px;
  color: #fff;
  /*  background-color: pink; 
        opacity:0.7;*/
  cursor: pointer;
  position: absolute;
  left: 776px;
  top: 85px;
  text-align: center;
  z-index: 999;
}

.TP {
  width: 96px;
  /* font-size: 14px; */
  color: #fff;
  cursor: pointer;
  position: relative;
  left: -9px;
  top: 2px;
  text-align: center;
}

.TPval {
  width: 96px;
  /* font-size: 14px; */
  color: #5decaa;
  position: relative;
  left: -9px;
  top: 10px;
  text-align: center;
}

.TPunit {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 16px;
  text-align: center;
}

.TPstate {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 25px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

/* COD仪表 */
.data_pot3 {
  width: 79px;
  height: 101px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink;
        opacity:0.7; */
  cursor: pointer;
  position: absolute;
  z-index: 999;
  left: 874px;
  top: 85px;
  text-align: center;
}

.COD {
  width: 96px;
  /* font-size: 14px; */
  color: #fff;
  cursor: pointer;
  position: relative;
  left: -9px;
  top: 2px;
  text-align: center;
}

.CODval {
  width: 96px;
  /* font-size: 14px; */
  color: #5decaa;
  position: relative;
  left: -9px;
  top: 10px;
  text-align: center;
}

.CODunit {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 16px;
  text-align: center;
}

.CODstate {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 25px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

/* COD仪表 */
.data_pot4 {
  width: 79px;
  height: 101px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink;
        opacity:0.7; */
  cursor: pointer;
  position: absolute;
  z-index: 999;
  left: 971px;
  top: 85px;
  text-align: center;
}

.NH3 {
  width: 96px;
  /* font-size: 14px; */
  color: #fff;
  cursor: pointer;
  position: relative;
  left: -9px;
  top: 2px;
  text-align: center;
}

.NH3val {
  width: 96px;
  /* font-size: 14px; */
  color: #5decaa;
  position: relative;
  left: -9px;
  top: 10px;
  text-align: center;
}

.NH3unit {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 16px;
  text-align: center;
}

.NH3state {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 25px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

/* 新增仪表 */
.data_pot5 {
  width: 79px;
  height: 101px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink;
        opacity:0.7; */
  cursor: pointer;
  position: absolute;
  z-index: 999;
  left: 1066px;
  top: 85px;
  text-align: center;
}

.TN {
  width: 96px;
  /* font-size: 14px; */
  color: #fff;
  cursor: pointer;
  position: relative;
  left: -9px;
  top: 2px;
  text-align: center;
}

.TNval {
  width: 96px;
  /* font-size: 14px; */
  color: #5decaa;
  position: relative;
  left: -9px;
  top: 10px;
  text-align: center;
}

.TNunit {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 16px;
  text-align: center;
}

.TNstate {
  width: 96px;
  /* font-size: 14px; */
  color: #cccccc;
  position: relative;
  left: -9px;
  top: 25px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

/* 报警 */
.lct_footer {
  height: 40px;
  line-height: 40px;
  background-color: #3c4c6a;
  /* text-align: center; */
  color: #bccdee;
  min-width: 1166px;
}

.lct_footer .bjzt {
  /* padding-left: 20px; */
  width: 98px;
  font-weight: bolder;
  padding-left: 20px;
  font-size: 14px;
  float: left;
}

.b1bj {
  width: 103px;
  /* padding-left: 10px; */
  font-size: 14px;
  float: left;
  margin-right: 45px;
  cursor: pointer;
}

.caishuibj {
  width: 105px;
  /* padding-left: 20px; */
  font-size: 14px;
  margin-right: 50px;
  float: left;
  cursor: pointer;
}

.ywbj {
  width: 110px;
  /* padding-left: 20px; */
  font-size: 14px;
  margin-right: 40px;
  float: left;
  cursor: pointer;
}

.dybj {
  width: 95px;
  /* padding-left: 20px; */
  font-size: 14px;
  margin-right: 40px;
  float: left;
  cursor: pointer;
}

.caiyangbeibj {
  width: 105px;
  /* padding-left: 20px; */
  font-size: 14px;
  /* margin-right: 64px; */
  float: left;
  cursor: pointer;
}

/* 清除报警btn */
.qcbjbtn {
  float: right;
  margin-right: 20px;
  margin-top: 4px;
  font-size: 14px;
  padding: 8px 7px;
  background-color: #506c98;
  color: #fff;
  border-color: #506c98;
  cursor: pointer;
}

.qhbtn {
  float: right;
  /* margin-right: 20px;
        margin-top: 4px; */
  position: fixed;
  top: 120px;
  right: 20px;
  font-size: 14px;
  padding: 8px 7px;
  background-color: #506c98;
  color: #fff;
  border-color: #506c98;
  cursor: pointer;
}
</style>