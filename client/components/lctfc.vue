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
            SDL_Global.PLC.CaiShui,
            SDL_Global.PLC.CeLiang,
            SDL_Global.PLC.QingXi
          )
        "
      >
        <!--SDL_Global.PLC.PeiShui,  -->
        <el-step title="待机"></el-step>
        <el-step title="采水"></el-step>
        <!-- <el-step title="配水"></el-step> -->
        <el-step title="测量"></el-step>
        <el-step title="清洗"></el-step>
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
          v-if="SDL_Global.PLC.GongDianState12v == true"
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
          v-if="SDL_Global.PLC.GongDianState12v == true"
          style="font-size: 14px; color: #54c08e"
        >
          12v供电
        </div>
        <div v-else style="font-size: 14px; color: #fff">12v供电</div>
      </div>
      <div class="czsj">
        <!-- <i v-if="SDL_Global.PLC.ChuZao==true" style="font-size:20px;color:#54c08e"
                            class="el-icon-success"></i>
                        <i v-else style="font-size:20px;" class="el-icon-success"></i> -->

        <span
          v-if="SDL_Global.PLC.GongDianState220v == true"
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
          v-if="SDL_Global.PLC.GongDianState220v == true"
          style="font-size: 14px; color: #54c08e"
        >
          220v供电
        </div>
        <div v-else style="font-size: 14px; color: #fff">220v供电</div>
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
          @click="sendml('复位', SDL_Global.CMD.PLC_DaiJi)"
          >复位
        </el-button>
      </div>
 <el-tooltip
      class="item"
      effect="dark"
      content="切换泵阀操作"
      placement="top"
      popper-class="atooltip"
    >
      <i
        class="iconfont icon-shezhi4"
        @click="tabs"
        style="
          z-index: 999;
          position: fixed;
          right: 25px;
          bottom: 50px;
          color: #fff;
        "
      ></i>
    </el-tooltip>
      <!-- </el-col>
            </el-row> -->
    </div>
    <!-- <el-tooltip
      class="item"
      effect="dark"
      content="切换泵阀操作"
      placement="top"
      popper-class="atooltip"
    >
      <i
        class="iconfont icon-shezhi4"
        @click="tabs"
        style="
          z-index: 999;
          position: fixed;
          right: 25px;
          bottom: 50px;
          color: #fff;
        "
      ></i>
    </el-tooltip> -->

    <div
      class="lct_body"
      v-bind:style="{
        height: lctheight + 'px',
        width: FC.BaseMap_fuchuan.w + 'px',
        transform: scales,
        left: lfval + 'px',
      }"
    >
      <div v-if="imgshow" class="btmimg">
        <!-- <img src="../images/lct/BaseMap.jpg" /> -->
        <!-- 管道样式 -->
        <img
          v-bind:style="{
            left: FC.BaseMap_fuchuan.x + 'px',
            top: FC.BaseMap_fuchuan.y + 'px',
            'z-index': FC.BaseMap_fuchuan.zindex,
            width: FC.BaseMap_fuchuan.w + 'px',
            height: FC.BaseMap_fuchuan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.BaseMap_fuchuan.img)"
          v-show="FC.BaseMap_fuchuan.visible"
        />
        <img
          v-bind:style="{
            left: FC.CDC_FC.x + 'px',
            y: FC.CDC_FC.y + 'px',
            'z-index': FC.CDC_FC.zindex,
            width: FC.CDC_FC.w + 'px',
            height: FC.CDC_FC.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CDC_FC.img)"
          v-show="FC.CDC_FC.visible"
          class="imgclass"
        />
           <img
          v-bind:style="{
            left: FC.CDCdi_FC.x + 'px',
            y: FC.CDCdi_FC.y + 'px',
            'z-index': FC.CDCdi_FC.zindex,
            width: FC.CDCdi_FC.w + 'px',
            height: FC.CDCdi_FC.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CDCdi_FC.img)"
          v-show="FC.CDCdi_FC.visible"
          class="imgclass"
        />
       <img
          v-bind:style="{
            left: FC.CDCgao_FC.x + 'px',
            y: FC.CDCgao_FC.y + 'px',
            'z-index': FC.CDCgao_FC.zindex,
            width: FC.CDCgao_FC.w + 'px',
            height: FC.CDCgao_FC.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.CDCgao_FC.img)"
          v-show="FC.CDCgao_FC.visible"
          class="imgclass"
        />
        <img
          alt="FC.M1_FC.img"
          v-bind:style="{
            left: FC.M1_FC.x + 'px',
            y: FC.M1_FC.y + 'px',
            'z-index': FC.M1_FC.zindex,
            width: FC.M1_FC.w + 'px',
            height: FC.M1_FC.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M1_FC.img)"
          v-show="FC.M1_FC.visible"
          class="imgclass"
        />
        <img
          alt="FC.M2_FC.img"
          v-bind:style="{
            left: FC.M2_FC.x + 'px',
            y: FC.M2_FC.y + 'px',
            'z-index': FC.M2_FC.zindex,
            width: FC.M2_FC.w + 'px',
            height: FC.M2_FC.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.M2_FC.img)"
          v-show="FC.M2_FC.visible"
          class="imgclass"
        />

        <img
          v-bind:style="{
            left: FC.sv1_fuchuan.x + 'px',
            y: FC.sv1_fuchuan.y + 'px',
            'z-index': FC.sv1_fuchuan.zindex,
            width: FC.sv1_fuchuan.w + 'px',
            height: FC.sv1_fuchuan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.sv1_fuchuan.img)"
          v-show="FC.sv1_fuchuan.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV2_fuchuan.x + 'px',
            y: FC.SV2_fuchuan.y + 'px',
            'z-index': FC.SV2_fuchuan.zindex,
            width: FC.SV2_fuchuan.w + 'px',
            height: FC.SV2_fuchuan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV2_fuchuan.img)"
          v-show="FC.SV2_fuchuan.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV3_fuchuan.x + 'px',
            y: FC.SV3_fuchuan.y + 'px',
            'z-index': FC.SV3_fuchuan.zindex,
            width: FC.SV3_fuchuan.w + 'px',
            height: FC.SV3_fuchuan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV3_fuchuan.img)"
          v-show="FC.SV3_fuchuan.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV4_fuchuan.x + 'px',
            y: FC.SV4_fuchuan.y + 'px',
            'z-index': FC.SV4_fuchuan.zindex,
            width: FC.SV4_fuchuan.w + 'px',
            height: FC.SV4_fuchuan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV4_fuchuan.img)"
          v-show="FC.SV4_fuchuan.visible"
          class="imgclass"
        />
        <img
          v-bind:style="{
            left: FC.SV5_fuchuan.x + 'px',
            y: FC.SV5_fuchuan.y + 'px',
            'z-index': FC.SV5_fuchuan.zindex,
            width: FC.SV5_fuchuan.w + 'px',
            height: FC.SV5_fuchuan.h + 'px',
          }"
          v-bind:src="require('@img/' + FC.SV5_fuchuan.img)"
          v-show="FC.SV5_fuchuan.visible"
          class="imgclass"
        />

        <!-- 数据定位 -->
        <!-- <div class="zfhj">
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
        </div> -->
        <div class="wcsj">
          <el-row style="height: 27px; text-align: center; margin-top: 5px"
            ><el-col> 常规五参数</el-col></el-row
          >
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName"
              >{{ SDL_Global.WC.PH.Name }} :</el-col
            >
            <el-col :span="8" class="wcData"  v-if='SDL_Global.WC.ComStatus>0'
              >{{ SDL_Global.WC.PH.LastTestData }}
            </el-col>
                <el-col :span="8" class="wcData" v-else
              >--
            </el-col>
            <el-col :span="4" class="wcUnit">{{
              SDL_Global.WC.PH.Unit
            }}</el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName"
              >{{ SDL_Global.WC.ShuiWen.Name }} :</el-col
            >
            <el-col :span="8" class="wcData" v-if='SDL_Global.WC.ComStatus>0'
              >{{ SDL_Global.WC.ShuiWen.LastTestData }}
            </el-col>
                 <el-col :span="8" class="wcData" v-else
              >--
            </el-col>
            <el-col :span="4" class="wcUnit">{{
              SDL_Global.WC.ShuiWen.Unit
            }}</el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName"
              >{{ SDL_Global.WC.HunZhuoDu.Name }} :</el-col
            >
            <el-col :span="8" class="wcData"  v-if='SDL_Global.WC.ComStatus>0'
              >{{ SDL_Global.WC.HunZhuoDu.LastTestData }}
            </el-col>
                  <el-col :span="8" class="wcData" v-else
              >--
            </el-col>
            <el-col :span="4" class="wcUnit">{{
              SDL_Global.WC.HunZhuoDu.Unit
            }}</el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName"
              >{{ SDL_Global.WC.DianDaoLv.Name }} :</el-col
            >
            <el-col :span="8" class="wcData"  v-if='SDL_Global.WC.ComStatus>0'
              >{{ SDL_Global.WC.DianDaoLv.LastTestData }}
            </el-col>
                    <el-col :span="8" class="wcData" v-else
              >--
            </el-col>
            <el-col :span="4" class="wcUnit">{{
              SDL_Global.WC.DianDaoLv.Unit
            }}</el-col>
          </el-row>

          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName"
              >{{ SDL_Global.WC.RongJieYang.Name }} :</el-col
            >
            <el-col :span="8" class="wcData" v-if='SDL_Global.WC.ComStatus>0'>
              {{ SDL_Global.WC.RongJieYang.LastTestData }}</el-col
            >
                     <el-col :span="8" class="wcData" v-else
              >--
            </el-col>
            <el-col :span="4" class="wcUnit">{{
              SDL_Global.WC.RongJieYang.Unit
            }}</el-col>
          </el-row>
        </div>
        <div class="hjcs">
          <!-- <el-row style="height: 27px; text-align: center; margin-top: 5px" > -->
            <!-- <el-col> 状态参数</el-col> -->
          <!-- </el-row> -->

          <el-row style="height: 27px; text-align: center; margin-top: 5px">
            <el-col :span="12" class="wcName">系统工作状态 :</el-col>
             <!-- :class="
              SDL_Global.PLC.FeiYeTongState3 == true
                ? 'norStateData'
                : 'alarmStateData'
            " -->
            <el-col :span="8" :class="
              SDL_Global.PLC.SystemWorkState == '正常'
                ? 'norStateData'
                : 'alarmStateData'
            "
              >{{ SDL_Global.PLC.SystemWorkState }}
            </el-col>
          </el-row>

          <el-row style="height: 16%; text-align: center">
            <el-col :span="12" class="wcName">烟感报警 :</el-col>
            <el-col :span="8" :class="
              SDL_Global.PLC.YanGanAlarm == '否'
                ? 'norStateData'
                : 'alarmStateData'
            "
              >{{ SDL_Global.PLC.YanGanAlarm }}
            </el-col>
          </el-row>

          <!-- <el-row style="height: 16%; text-align: center">
            <el-col :span="12" class="wcName">排风扇状态 :</el-col>
            <el-col :span="8" :class="
              SDL_Global.PLC.SystemWorkState == '是'
                ? 'norStateData'
                : 'alarmStateData'
            ">-- </el-col>
          </el-row> -->

          <el-row style="height: 16%; text-align: center">
            <el-col :span="12" class="wcName">喷淋装置状态 :</el-col>
            <el-col :span="8" :class="
              SDL_Global.PLC.PenLinBengState 
                ? 'norStateData'
                : ''
            "
              >{{ SDL_Global.PLC.PenLinBengState==true?'开启' :'关闭' }}
            </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="12" class="wcName">舱门状态 :</el-col>
            <el-col :span="8" :class="
              SDL_Global.PLC.CangMenState == '开启'
                ? 'norStateData'
                : ''
            "
              >{{ SDL_Global.PLC.CangMenState }}
            </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="12" class="wcName">照明状态 :</el-col>
            <el-col :span="8" :class="
              SDL_Global.PLC.ZhaoMingState == '开启'
                ? 'norStateData'
                : ''
            "
              >{{ SDL_Global.PLC.ZhaoMingState }}
            </el-col>
          </el-row>
            <el-row style="height: 16%; text-align: center">
            <el-col :span="12" class="wcName">采样杯液位状态 :</el-col>
            <el-col :span="8" :class="
              SDL_Global.PLC.ShuiYangYeWeiDi == false && SDL_Global.PLC.ShuiYangYeWeiGao == false
                ? 'norStateData'
                : '' "
              >
                <!-- <el-tooltip effect="dark" popper-class="atooltip" placement="top">
        <div class="beng" slot="content">
          <div :class="SDL_Global.PLC.ShuiYangYeWeiDi == true ? 'tipActive' : ''">
            水样杯液位低
          </div>
          <div   :class="
              SDL_Global.PLC.ShuiYangYeWeiGao == true
                ? 'tipActives'
                : 'tipcons'
            ">水样杯液位高</div>
        </div>
        <div class="cybyw">
          <span
            v-if="SDL_Global.PLC.ShuiYangYeWeiDi == false && SDL_Global.PLC.ShuiYangYeWeiGao == false"
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 14px;
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
              margin-top: 14px;
              margin-right: 5px;
            "
          ></span>
          <span>采样杯液位告警</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip> -->
            <span v-if="SDL_Global.PLC.ShuiYangYeWeiDi ">
             低液位
            </span>
              <span v-else-if="SDL_Global.PLC.ShuiYangYeWeiGao "  >
              高液位
            </span>
               <span v-else  >
               正常
            </span>
            </el-col>
          </el-row>
          <!-- </el-row> -->
        </div>

        <div class="swcs">
          <el-row style="height: 27px; text-align: center; margin-top: 5px"
            ><el-col> 环境参数</el-col></el-row
          >
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">水位 :</el-col>
            <el-col :span="8" class="wcData">
                {{ SDL_Global.YeWeiJi.LastTestData }}
               </el-col>
                     <el-col :span="5" class="wcUnit">
                {{ SDL_Global.YeWeiJi.Unit }}  </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">室内温度 :</el-col>
            <el-col :span="8" class="wcData"
              >{{ SDL_Global.ZF.DaQiWenDu.LastTestData }}
        
            </el-col>
               <el-col :span="5" class="wcUnit">
                      {{ SDL_Global.ZF.DaQiWenDu.Unit }} </el-col>
          </el-row>

          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">室内湿度 :</el-col>
            <el-col :span="8" class="wcData"
              >{{ SDL_Global.ZF.DaQiShiDu.LastTestData }}
         
            </el-col>
               <el-col :span="5" class="wcUnit">
                        {{ SDL_Global.ZF.DaQiShiDu.Unit }} </el-col>
          </el-row>
            <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">经度 :</el-col>
            <el-col :span="8" class="wcData"
              >{{ SDL_Global.GPSLongitude.LastTestData }}
             
            </el-col>
               <el-col :span="5" class="wcUnit">
                     {{ SDL_Global.GPSLongitude.Unit }} </el-col>
          </el-row>
            <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">纬度 :</el-col>
            <el-col :span="8" class="wcData"
              >{{ SDL_Global.GPSLatitude.LastTestData }}
            
            </el-col>
                 <el-col :span="5" class="wcUnit">
                     {{ SDL_Global.GPSLatitude.Unit }} </el-col>
          </el-row>
        </div>

        <!-- 电池电量 -->
        <div class="dcdl">
          <el-row style="height: 27px; text-align: center; margin-top: 5px"
            ><el-col> 电池电量</el-col></el-row
          >
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">电池1 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.BMS.BMS_surplus1.LastTestData}} 
       
            </el-col>
               <el-col :span="5" class="wcUnit">
                {{SDL_Global.BMS.BMS_surplus1.Unit}}
            </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">电池2 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.BMS.BMS_surplus2.LastTestData}}
            
            </el-col>
                  <el-col :span="5" class="wcUnit">
                    {{SDL_Global.BMS.BMS_surplus2.Unit}}
            </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">电池3 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.BMS.BMS_surplus3.LastTestData}}
          
            </el-col>
                <el-col :span="5" class="wcUnit">
                         {{SDL_Global.BMS.BMS_surplus3.Unit}}
            </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">电池4 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.BMS.BMS_surplus4.LastTestData}} 
               
            </el-col>
                <el-col :span="5" class="wcUnit">
                  {{SDL_Global.BMS.BMS_surplus4.Unit}}
            </el-col>
          </el-row>
          <el-row style="height: 16%; text-align: center">
            <el-col :span="8" class="wcName">电池5 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.BMS.BMS_surplus5.LastTestData}}
              </el-col>
                   <el-col :span="5" class="wcUnit">
                  {{SDL_Global.BMS.BMS_surplus5.Unit}} 
            </el-col>
          </el-row>
          <!-- </el-row> -->
        </div>
        <!-- 气象参数 -->
        <div class="qxsj">
          <el-row style="height: 27px; text-align: center; margin-top: 5px"
            ><el-col> 气象参数</el-col></el-row
          >
     <!-- 543 -->
          <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">大气温度 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXWenDu.LastTestData}} </el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXWenDu.Unit}} </el-col>
       
          </el-row>
               <el-row style="height: 9%; text-align: center">
                <el-col :span="11" class="wcName">大气湿度 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXShiDu.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXShiDu.Unit}}</el-col>
          </el-row>
          <!-- <el-row style="height: 12%; text-align: center">
            <el-col :span="4" class="wcName">湿度 :</el-col>
            <el-col :span="6" class="wcData">{{SDL_Global.QX.QXShiDu}}</el-col>
          </el-row> -->
          <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">风向 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXWindDirection.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXWindDirection.Unit}}</el-col>
       
          </el-row>
             <el-row style="height: 9%; text-align: center">
          <el-col :span="11" class="wcName">风速 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXWindSpeed.LastTestData}} </el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXWindSpeed.Unit}} </el-col>
          </el-row>
          <!-- <el-row style="height: 12%; text-align: center">
            <el-col :span="8" class="wcName">风速 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.QX.QXWindSpeed}} </el-col>
          </el-row> -->
          <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">大气压 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXYaLi.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXYaLi.Unit}}</el-col>
          </el-row>
          <el-row style="height: 9%; text-align: center">
              <el-col :span="11" class="wcName">蒸发仪液位 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.ZFL.LastTestData }} </el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.ZFL.Unit }} </el-col>
          </el-row>
          <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">分钟降雨量 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXMinRainfall.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXMinRainfall.Unit}}</el-col>
          </el-row>
             <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">小时降雨量 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXHourRainfall.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXHourRainfall.Unit}}</el-col>
          </el-row>
             <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">24小时降雨量 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QX24HourRainfall.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QX24HourRainfall.Unit}}</el-col>
          </el-row>
             <el-row style="height: 9%; text-align: center">
            <el-col :span="11" class="wcName">累计降雨量 :</el-col>
            <el-col :span="9" class="wcData">{{SDL_Global.QX.QXLeiJiRainfall.LastTestData}}</el-col>
            <el-col :span="4" class="wcUnit">{{SDL_Global.QX.QXLeiJiRainfall.Unit}}</el-col>
          </el-row>
          <!-- <el-row style="height: 12%; text-align: center">
            <el-col :span="8" class="wcName">蒸发量 :</el-col>
            <el-col :span="8" class="wcData">{{SDL_Global.ZFL.QXZhengFaLiang}} </el-col>
          </el-row> -->
          <!-- </el-row> -->
        </div>

        <template v-for="(item, index) in YiBiaoShow">
          <div :class="dataclass[index]" :key="index">
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
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="采样杯排水阀"
            placement="top"
            popper-class="atooltip"
          >
            <div
              :class="bengfaclass[index]"
              @click="
                sendbfml(
                  '采样杯排水阀SV15',
                  SDL_Global.CMD.PLC_SV.Format(15, !SDL_Global.PLC.SV15Status)
                )
              "
            ></div>
          </el-tooltip> -->
        </template>

        <!-- 泵阀开关 -->
        <!-- <div
          class="kyj"
          @click="
            sendbfml(
              '空压机Air_c',
              SDL_Global.CMD.PLC_KongYaJi.Format(!SDL_Global.PLC.KongYaJiStatus)
            )
          "
        ></div> -->
        <!--提示框 -->

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
          content="取水阀1"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="fcSv1"
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
          content="取水阀2"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="fcSV2"
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
          content="采样杯采水阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV3"
            @click="
              sendbfml(
                '采样杯采水阀SV3',
                SDL_Global.CMD.PLC_SV.Format(9, !SDL_Global.PLC.SV9Status)
              )
            "
          ></div>
        </el-tooltip>
          <el-tooltip
          class="item"
          effect="dark"
          content="气泵"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="QiBeng"
            @click="
              sendbfml(
                '气泵控制',
                SDL_Global.CMD.PLC_SV.Format(6, !SDL_Global.PLC.SV6Status)
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
                SDL_Global.CMD.PLC_SV.Format(6, !SDL_Global.PLC.SV6Status)
              )
            "
          ></div>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="采样杯排水阀"
          placement="top"
          popper-class="atooltip"
        >
          <div
            class="SV5"
            @click="
              sendbfml(
                '采样杯排水阀SV5',
                SDL_Global.CMD.PLC_SV.Format(11, !SDL_Global.PLC.SV11Status)
              )
            "
          ></div>
        </el-tooltip>
      </div>

      <div v-else class="btmimg">
        <bfkgfc></bfkgfc>
      </div>
    </div>
    <div class="lct_footer">
      <div class="bjzt">报警状态</div>
      <!-- <el-tooltip effect="dark" popper-class="atooltip" placement="top">
        <div class="beng" slot="content">
          <div :class="SDL_Global.PLC.ShuiYangYeWeiDi == true ? 'tipActive' : ''">
            水样杯液位低
          </div>
          <div   :class="
              SDL_Global.PLC.ShuiYangYeWeiGao == true
                ? 'tipActives'
                : 'tipcons'
            ">水样杯液位高</div>
        </div>
        <div class="cybyw">
          <span
            v-if="SDL_Global.PLC.ShuiYangYeWeiDi == false && SDL_Global.PLC.ShuiYangYeWeiGao == false"
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 14px;
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
              margin-top: 14px;
              margin-right: 5px;
            "
          ></span>
          <span>采样杯液位告警</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip> -->
      <el-tooltip effect="dark" placement="top" popper-class="atooltip">
        <div class="beng" slot="content">
          <div
            :class="
              SDL_Global.PLC.FeiYeTongState1 == true ? 'tipActive' : ''
            "
          >
            废液桶1高液位报警
          </div>
          <div
            :class="
              SDL_Global.PLC.FeiYeTongState2 == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            废液桶2高液位报警
          </div>
          <div
            :class="
              SDL_Global.PLC.FeiYeTongState3 == true
                ? 'tipActives'
                : 'tipcons'
            "
          >
            废液桶3高液位报警
          </div>
          <div
            :class="
              SDL_Global.PLC.FeiYeTongState4 == true ? 'tipActives' : 'tipcons'
            "
          >
            废液桶4高液位报警
          </div>
        </div>
        <div class="ywbj">
            <span
          v-if="SDL_Global.PLC.FeiYeTongState1 == false && SDL_Global.PLC.FeiYeTongState2 == false && SDL_Global.PLC.FeiYeTongState3 == false && SDL_Global.PLC.FeiYeTongState4 == false " 
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 14px;
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
            margin-top: 14px;
            margin-right: 5px;
          "
        ></span>
          <span>废液桶液位报警</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>

      <div class="allAlarm">
        <span
          v-if="SDL_Global.PLC.ZongGuZhang == false"
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 14px;
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
            margin-top: 14px;
            margin-right: 5px;
          "
        ></span>
        <span>总故障</span>
      </div>
      <el-tooltip effect="dark" popper-class="atooltip" placement="top">
        <div class="beng" slot="content">
          <div :class="SDL_Global.PLC.CaiYangBengAlarm1 == true ? 'tipActive' : ''">
            采样泵1故障
          </div>
          <div   :class="
              SDL_Global.PLC.CaiYangBengAlarm2 == true
                ? 'tipActives'
                : 'tipcons'
            ">采样泵2故障</div>
        </div>
        <div class="cybgz">
          <span
            v-if="SDL_Global.PLC.CaiYangBengAlarm1 == false && SDL_Global.PLC.CaiYangBengAlarm2 == false"
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 14px;
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
              margin-top: 14px;
              margin-right: 5px;
            "
          ></span>
          <span>采样泵故障</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" popper-class="atooltip" placement="top">
        <div class="beng" slot="content">
          <div :class=" SDL_Global.PLC.GongDianAlarm12v == true ? 'tipActive' : ''">
            12v供电故障 
          </div>
          <div    :class="
               SDL_Global.PLC.GongDianAlarm220v == true
                ? 'tipActives'
                : 'tipcons'
            ">220v供电故障 </div>
        </div>
        <div class="gdgz">
          <span
            v-if="SDL_Global.PLC.GongDianAlarm12v == false && SDL_Global.PLC.GongDianAlarm220v == false "
            style="
              width: 8px;
              height: 8px;
              background-color: #aaaaaa;
              display: block;
              border-radius: 2em;
              float: left;
              margin-top: 14px;
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
              margin-top: 14px;
              margin-right: 5px;
            "
          ></span>
          <span>供电故障</span>
          <i class="el-icon-question"></i>
        </div>
      </el-tooltip>

      <div class="hwgz">
        <span
          v-if="SDL_Global.PLC.HongWaiAlarm== false"
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 14px;
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
            margin-top: 14px;
            margin-right: 5px;
          "
        ></span>
        <span>红外报警</span>
      </div>
      <div class="lsgz">
        <span
          v-if="SDL_Global.PLC.LouShuiAlarm == false"
          style="
            width: 8px;
            height: 8px;
            background-color: #aaaaaa;
            display: block;
            border-radius: 2em;
            float: left;
            margin-top: 14px;
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
            margin-top: 14px;
            margin-right: 5px;
          "
        ></span>
        <span>漏水故障</span>
      </div>
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
import bfkgfc from "./module/bfkz_fc";


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
    // console.log("22", SZY);
    // console.log("Is_TSCJZ",  JSON.parse(localStorage.getItem("clientConfigInfo")).Is_TSCJZ);
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      SoftType: JSON.parse(localStorage.getItem("softType")),
      Is_TSCJZ: JSON.parse(localStorage.getItem("clientConfigInfo")).Is_TSCJZ,
      Is_SZY: SZY,
      FC: this.socketApi.globalDataConfig.FlowChart,
      TPAlarm:
        this.socketApi.globalDataConfig.SDL_Global.TP.ComStatus != 1
          ? "通信断开"
          : this.socketApi.globalDataConfig.SDL_Global.TP.Alarm == 0 &&
            this.socketApi.globalDataConfig.SDL_Global.TP.Fault == 0
          ? "告警:无 故障:无"
          : "告警:" +
            this.socketApi.globalDataConfig.SDL_Global.TP.AlarmText +
            " 故障:" +
            this.socketApi.globalDataConfig.SDL_Global.TP.FaultText +
            "",
      TNAlarm:
        this.socketApi.globalDataConfig.SDL_Global.TN.ComStatus != 1
          ? "通信断开"
          : this.socketApi.globalDataConfig.SDL_Global.TN.Alarm == 0 &&
            this.socketApi.globalDataConfig.SDL_Global.TN.Fault == 0
          ? "告警:无 故障:无"
          : "告警:" +
            this.socketApi.globalDataConfig.SDL_Global.TN.AlarmText +
            " 故障:" +
            this.socketApi.globalDataConfig.SDL_Global.TN.FaultText +
            "",
      CODAlarm:
        this.socketApi.globalDataConfig.SDL_Global.COD.ComStatus != 1
          ? "通信断开"
          : this.socketApi.globalDataConfig.SDL_Global.COD.Alarm == 0 &&
            this.socketApi.globalDataConfig.SDL_Global.COD.Fault == 0
          ? "告警:无 故障:无"
          : "告警:" +
            this.socketApi.globalDataConfig.SDL_Global.COD.AlarmText +
            " 故障:" +
            this.socketApi.globalDataConfig.SDL_Global.COD.FaultText +
            "",
      NH3Alarm:
        this.socketApi.globalDataConfig.SDL_Global.NH3.ComStatus != 1
          ? "通信断开"
          : this.socketApi.globalDataConfig.SDL_Global.NH3.Alarm == 0 &&
            this.socketApi.globalDataConfig.SDL_Global.NH3.Fault == 0
          ? "告警:无 故障:无"
          : "告警:" +
            this.socketApi.globalDataConfig.SDL_Global.NH3.AlarmText +
            " 故障:" +
            this.socketApi.globalDataConfig.SDL_Global.NH3.FaultText +
            "",
      lctheight: null,
      scales: "scale(0.72)",
      lfval: -147,
      RoleID: JSON.parse(localStorage.getItem("RoleID")),
      ID: "TP",
      Name: "参数信息",
      MoreParam: false,
      TSlctVisible: false,
      SWDXLctVisible: false,
      showModel: 0,
      YiBiaoShow: YiBiaoImg,
      imgshow: true,
      dataclass: [
        "data_pot1",
        "data_pot2",
        "data_pot3",
        "data_pot4",
        "data_pot5",
      ],
      bengfaclass: [
        "bang_SV15",
        "bang_SV16",
        "bang_SV17",
        "bang_SV18",
        "bang_SV19",
      ],
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
      CYQshow: this.socketApi.globalDataConfig.SDL_Global.CY.isMain,
    };
  },
  mounted() {
    // console.log("sss11", this.socketApi.globalDataConfig.SDL_Global.NH3.ComStatus)
    // console.log("RoleID", this.RoleID);
    this.getHeight();
    window.onresize = () => {
      this.resizeLctBody();

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
    bfkgfc,

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
    // 切换泵阀操作
    tabs() {
      if (this.imgshow == true) {
        this.imgshow = false;
      } else {
        this.imgshow = true;
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
      this.lctheight = window.innerHeight - 60 - 56 - 40-2;
      if (this.lctheight < 617) {
        this.lctheight = 608;
      }
      let lctwidth = window.innerWidth;
      if (lctwidth > 1024) {
        this.scales = "scale(1)";
        // this.lfval = 120
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
    //     // this.$message.info(data);
    //     if (JSON.parse(localStorage.getItem("RoleID")) == 0) {
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

      if (JSON.parse(localStorage.getItem("RoleID")) == 0) {
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
            if (mlName == "单次测量") {
              // this.$message.info(data + ";" + "手动数据标识=M");
              this.socketApi.sendSock(data + ";" + "手动数据标识=M", true);
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

  .cybyw {
    width: 120px !important;
    margin-right: 1px !important;
  }

  

  .ywbj {
    width: 120px !important;
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
  /* width: 1282px; */
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
.fcSv1 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 292px;
  top: 420px;
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
  width: 22px;
  height: 44px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 125px;
  top: 525px;
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
.fcSV2 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 292px;
  top: 469px;
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
  width: 22px;
  height: 44px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 160px;
  top: 525px;
  cursor: pointer;
}

.SV3 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 738px;
  top: 420px;
  cursor: pointer;
}

.SV4 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 549px;
  top: 358px;
  cursor: pointer;
}

.QiBeng{
width: 56px;
    height: 42px;
    /* background-color: pink; */
    opacity: 0.5;
    position: absolute;
    left: 423px;
    top: 324px;
    cursor: pointer;
}

.SV5 {
  width: 40px;
  height: 35px;
  /* background-color: pink; */
  opacity: 0.5;
  position: absolute;
  left: 806px;
  top: 492px;
  cursor: pointer;
}



/* 五参数据 */
.wcsj {
  width: 182px;
  height: 170px;
  font-size: 12px;
  color: #fff;
  background-color: transparent;
  /* background-color: pink; */
  /* padding-top: 3px; */
  position: absolute;
  left: 20px;
  top: 224px;
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

/* 环境参数 */
.hjcs {
  width: 182px;
  height: 170px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  position: absolute;
  left: 21px;
  top: 27px;
}
/* 水位参数 */
.swcs {
  width: 182px;
  height: 170px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  position: absolute;
  left: 225px;
  top: 224px;
}

/* 电池电量 */
.dcdl {
  width: 182px;
  height: 170px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  position: absolute;
  left: 225px;
  top: 27px;
}

.qxsj {
  width: 182px;
  height: 264px;
  font-size: 12px;
  color: #fff;
  background-color: rgb(63,76,108);         
  position: absolute;
  left: 429px;
  top: 27px;
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
  top: 198px;
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
.norStateData {
  color: #5decaa;
  text-align: center;
  font-size: 12px;
  /* width: 33%; */
}
.alarmStateData{
      color: #e54e4e;
  text-align: center;
  font-size: 12px;
}

.wcUnit {
  font-size: 12px;
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

.data_pot1 {
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  /* opacity: 0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 649px;
  top: 71px;
  text-align: center;
}

/* tn仪表 */
.data_pot2 {
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  /* opacity: 0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 780px;
  top: 71px;
  text-align: center;
}

.TP {
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

.TPval {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #5decaa;
  position: relative;
  left: 0px;
  top: 15px;
}

.TPunit {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  position: relative;
  left: 0px;
  top: 22px;
}

.TPstate {
  width: 96px;
  text-align: center;
  font-size: 14px;
  color: #cccccc;
  position: relative;
  left: 0px;
  top: 44px;
  cursor: pointer;
}

/* COD仪表 */
.data_pot3 {
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  /* opacity:0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 906px;
  top: 71px;
  text-align: center;
}

/* COD仪表 */
.data_pot4 {
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  /* background-color: pink; */
  /* opacity:0.7; */
  cursor: pointer;
  z-index: 999;
  position: absolute;
  left: 1038px;
  top: 71px;
  text-align: center;
}

/* 新增仪表 */
.data_pot5 {
  width: 96px;
  height: 124px;
  font-size: 12px;
  color: #fff;
  z-index: 999;
  /* background-color: pink;
        opacity:0.7; */
  cursor: pointer;
  position: absolute;
  left: 1163px;
  top: 22px;
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
  height: 36px;
  line-height: 36px;
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
  font-size: 12px;
  float: left;
}

.cybyw {
  width: 120px;
  /* padding-left: 10px; */
  font-size: 12px;
  float: left;
  /* margin-right: 45px; */
  cursor: pointer;
}


.ywbj {
  width: 120px;
  /* padding-left: 20px; */
  font-size: 12px;
  /* margin-right: 40px; */
  float: left;
  cursor: pointer;
}

.allAlarm {
  width: 60px;
  /* padding-left: 20px; */
  font-size: 12px;
  /* margin-right: 10px; */
  float: left;
  cursor: pointer;
}

.cybgz {
  width: 98px;
  /* padding-left: 20px; */
  font-size: 12px;
  /* margin-right: 24px; */
  float: left;
  cursor: pointer;
}
.gdgz{
     width: 89px;
  /* padding-left: 20px; */
  font-size: 12px;
  /* margin-right: 24px; */
  float: left;
  cursor: pointer; 
}
.hwgz{
     width: 75px;
  /* padding-left: 20px; */
  font-size: 12px;
  /* margin-right: 64px; */
  float: left;
  cursor: pointer; 
}
.lsgz{
     width:84px;
  /* padding-left: 20px; */
  font-size: 12px;
  /* margin-right: 64px; */
  float: left;
  cursor: pointer; 
}

/* 清除报警btn */
.qcbjbtn {
  float: right;
  margin-right: 10px;
  margin-top: 3px;
  font-size: 12px;
  padding: 8px 3px;
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