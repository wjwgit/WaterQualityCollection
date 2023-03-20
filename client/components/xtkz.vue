<template>
  <div class="div_ybkz">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="仪表控制" name="ybkz">
        <div class="ybkz-body">
          <el-row :gutter="20">
            <template v-for="(item, index) in YiBiaoShow">
              <el-col
                :key="index"
                :sm="24"
                :xs="24"
                :md="24"
                :lg="12"
                v-if="SoftType == 21 || SoftType == 22 || SoftType == 23"
              >
                <!-- <el-card>
                  <div slot="header" class="clearfix">
                    <span class="c-title">{{ item.Name }} [<span v-bind:class="{
                          'c-status': item.ComStatus == 1,
                          offline: item.ComStatus != 1,
                        }">{{ item.ComStatusText }}</span>]</span>
                    <span class="c-loginfo" type="text">仪表状态：<span class="c-loginfo-info">{{
                        item.MeterStatusText
                        }}</span></span>
                  </div>
                  <div class="body-btn">
                    <el-row>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 1 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '水样测量',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 1),
                              true
                            )
                          ">水样测量</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 2 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '标样核查',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 2),
                              true
                            )
                          ">标样核查</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 3 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '零点核查',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 3),
                              true
                            )
                          ">零点核查</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 4 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '跨度核查',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 4),
                              true
                            )
                          ">跨度核查</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 5 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '空白测试',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 5),
                              true
                            )
                          ">空白测试</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 6 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '平行样',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 6),
                              true
                            )
                          ">平行样</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 19 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '开始校准',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 19),
                              true
                            )
                          ">开始校准</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 8 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '空白校准',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 8),
                              true
                            )
                          ">空白校准</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 9 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '标样校准',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 9),
                              true
                            )
                          ">标样校准</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 10 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '仪表清洗',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 10),
                              true
                            )
                          ">仪表清洗</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 20 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '清除报警',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 20),
                              false
                            )
                          ">清除报警</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button size="small" :class="item.MeterStatus == 11 ? 'active' : ''" v-bind:disabled="
                            item.ComStatus != 1 ||
                            (SDL_Global.PLC.YunXingMoShi != 1 &&
                              SDL_Global.PLC.YunXingMoShi != 8)
                          " @click="
                            clickYiBiaoBtn(
                              item.MeterStatus,
                              '停止测量',
                              SDL_Global.CMD.YiBiao.Format(item.ID, 11),
                              false
                            )
                          ">停止测量</el-button>
                      </el-col>
                    </el-row>
                  </div>

                  <div class="dividing"></div>

                  <div class="body-footer" v-if="SoftType == 21||SoftType == 22">
                    <span>仪表时间：<span>{{ item.SysTime }}</span></span>
                    <span class="body-footer-text-r" v-bind:disabled="
                        item.ComStatus != 1 ||
                        (SDL_Global.PLC.YunXingMoShi != 1 &&
                          SDL_Global.PLC.YunXingMoShi != 8)
                      " @click="
                        clickYiBiaoBtn(
                          item.MeterStatus,
                           '_仪表校时',
                          SDL_Global.CMD.YiBiao.Format(item.ID, 13),
                          false
                        )
                      ">确定校时</span>
                  </div>
                  <div class="body-footer" v-else>
                    <span>仪表时间：<span>{{ item.SysTime }}</span>
                      <span style="
                          color: #4a92ff;
                          cursor: pointer;
                          margin-left: 5px;
                        " v-bind:disabled="
                          item.ComStatus != 1 ||
                          (SDL_Global.PLC.YunXingMoShi != 1 &&
                            SDL_Global.PLC.YunXingMoShi != 8)
                        " @click="
                          clickYiBiaoBtn(
                            item.MeterStatus,
                             '_仪表校时',
                            SDL_Global.CMD.YiBiao.Format(item.ID, 13),
                            false
                          )
                        ">校时</span></span>
                    <span class="body-footer-text-r" v-bind:disabled="
                        item.ComStatus != 1 ||
                        (SDL_Global.PLC.YunXingMoShi != 1 &&
                          SDL_Global.PLC.YunXingMoShi != 8)
                      "><span style="color: #cccccc">日质控：</span>
                      <template v-if="item.RiZhiKongStatus">
                        <span style="color: #cccccc">运行中</span> |
                        <span @click="
                            clickRiZhiKongBtn(
                              item.ID + '_停止日质控',
                              SDL_Global.CMD.RZK_StopStatus.Format(item.ID),
                              false
                            )
                          ">停止质控</span>
                      </template>
                      <template v-else>
                        <template v-if="!item.RiZhiKongIsHeGe">
                          <span style="color: #f56c6c">已结束(不合格)</span> |
                          <span @click="
                              clickRiZhiKongBtn(
                                item.ID + '_恢复日质控',
                                SDL_Global.CMD.RZK_StartStatus.Format(item.ID),
                                false
                              )
                            ">恢复质控</span>
                        </template>
                        <template v-else>
                          <span style="color: #cccccc">已结束</span>
                        </template>
                      </template>
                    </span>
                  </div>
                </el-card> -->
                <ybkzbtn :ID="item.ID" :headerShow="true"> </ybkzbtn>
              </el-col>
              <el-col :key="index" :sm="24" :xs="24" :md="24" :lg="12" v-else>
                <wsybkzbtn :ID="item.ID" :headerShow="true"> </wsybkzbtn>
              </el-col>
            </template>

            <el-col
              :sm="24"
              :xs="24"
              :md="24"
              :lg="12"
              v-if="SoftType == 21 || SoftType == 22 || SoftType == 23"
            >
              <el-card class="div_liuyang">
                <div slot="header" class="clearfix">
                  <span class="c-title"
                    >留样单元 [<span
                      v-bind:class="{
                        'c-status': SDL_Global.LY.ComStatus == 1,
                        offline: SDL_Global.LY.ComStatus != 1,
                      }"
                      >{{ SDL_Global.LY.ComStatusText }}</span
                    >]</span
                  >
                </div>
                <div class="body-footer">
                  <span
                    >留样瓶号：<span>{{ SDL_Global.LY.PingHao }}</span></span
                  >
                  <span style="margin-left: 20%"
                    >留样状态：<span>{{ SDL_Global.LY.Alarm }}</span></span
                  >
                  <span class="body-footer-text-r">
                    <el-button
                      v-bind:disabled="SDL_Global.LY.ComStatus != 1"
                      size="small"
                      @click="
                        clickLYBtn(
                          '手动取样',
                          SDL_Global.CMD.LY_ShouDongLiuYang
                        )
                      "
                      >手动取样</el-button
                    >
                  </span>
                  <span class="body-footer-text-r">
                    <el-button
                      v-bind:disabled="SDL_Global.LY.ComStatus != 1"
                      size="small"
                      @click="
                        clickLYBtn(
                          '手动排空',
                          SDL_Global.CMD.LY_ShouDongPaiKong
                        )
                      "
                      >手动排空</el-button
                    >
                  </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="采样器控制" name="cyqkz" v-if="SoftType == 32">
        <div class="cyqkz-body">
          <el-card>
            <div slot="header">
              <span>采样器</span>
              [<span
                v-bind:class="{
                  'c-status': SDL_Global.CY.ComStatus == 1,
                  offline: SDL_Global.CY.ComStatus != 1,
                }"
                >{{ SDL_Global.CY.ComStatusText }}</span
              >]
            </div>
            <div class="card-body">
              <el-row>
                <el-col :span="6">
                  <div class="bottle">
                    <span
                      >当前采样器瓶号:
                      <span>{{ SDL_Global.LY.PingHao }}</span></span
                    >
                  </div>
                </el-col>
                <!-- <el-col :span="8">
                  <div class="bottle">
                    <span>通讯状态:
                      <span>{{ SDL_Global.CY.ComStatusText }}</span></span>
                  </div>
                </el-col> -->
                <el-col :span="6">
                  <div class="bottle">
                    <span
                      >工作状态:
                      <span>{{ SDL_Global.CY.MeterStatusText }}</span></span
                    >
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="bottle">
                    <span
                      >采样器采水模式:
                      <span>
                        <el-radio
                          v-model="SDL_Global.CY.MoShi"
                          @change="
                            switchml(
                              '采样器采水模式',
                              SDL_Global.CMD.CY_CaiShuiMoShi.Format(
                                SDL_Global.CY.MoShi
                              )
                            )
                          "
                          :label="0"
                          >手动模式</el-radio
                        >
                        <el-radio
                          v-model="SDL_Global.CY.MoShi"
                          @change="
                            switchml(
                              '采样器采水模式',
                              SDL_Global.CMD.CY_CaiShuiMoShi.Format(
                                SDL_Global.CY.MoShi
                              )
                            )
                          "
                          :label="1"
                          >间隔模式</el-radio
                        >
                      </span></span
                    >
                  </div>
                </el-col>
                <el-col :sm="12" :xs="8" :md="8" :lg="8">
                  <div class="bottle">
                    <div class="botName">采样间隔时间:</div>
                    <div class="botInput">
                      <el-input
                        size="small"
                        readonly
                        v-model="SDL_Global.CY.CaiYangJianGeShiJian"
                      >
                        <template slot="append">分钟</template>
                      </el-input>
                    </div>
                    <div
                      class="botbtn"
                      @click="
                        updateForm(
                          '采样间隔时间',
                          SDL_Global.CMD.CY_CaiYangJianGeShiJian,
                          SDL_Global.CY.CaiYangJianGeShiJian
                        )
                      "
                    >
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                </el-col>
                <el-col :sm="12" :xs="8" :md="8" :lg="8">
                  <div class="bottle">
                    <div class="botName">供样延时测量间隔:</div>
                    <div class="botInput">
                      <el-input
                        size="small"
                        readonly
                        v-model="SDL_Global.CY.GongYangYanShiShiJian"
                      >
                        <template slot="append">分钟</template>
                      </el-input>
                    </div>
                    <div
                      class="botbtn"
                      @click="
                        updateForm(
                          '供样延时测量间隔',
                          SDL_Global.CMD.CY_YanShiCeLiangJianGe,
                          SDL_Global.CY.GongYangYanShiShiJian
                        )
                      "
                    >
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="body-btn" style="text-align: left">
                <el-row>
                  <el-col
                    :span="4"
                    v-if="SDL_Global.CY.MeterStatusText == '启动'"
                  >
                    <el-button
                      size="small"
                      disabled
                      @click="
                        clickCaiYangQiBtn(
                          '采样器启动',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(1)
                        )
                      "
                      >采样器启动</el-button
                    >
                  </el-col>
                  <el-col :span="4" v-else>
                    <el-button
                      size="small"
                      @click="
                        clickCaiYangQiBtn(
                          '采样器启动',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(1)
                        )
                      "
                      >采样器启动</el-button
                    >
                  </el-col>
                  <el-col
                    :span="4"
                    v-if="SDL_Global.CY.MeterStatusText == '停止'"
                  >
                    <el-button
                      size="small"
                      disabled
                      @click="
                        clickCaiYangQiBtn(
                          '采样器停止',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(0)
                        )
                      "
                      >采样器停止</el-button
                    >
                  </el-col>
                  <el-col :span="4" v-else>
                    <el-button
                      size="small"
                      @click="
                        clickCaiYangQiBtn(
                          '采样器停止',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(0)
                        )
                      "
                      >采样器停止</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      size="small"
                      @click="
                        clickCaiYangQiBtn(
                          '手动采水',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(2)
                        )
                      "
                      >手动采水</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      size="small"
                      @click="
                        clickCaiYangQiBtn(
                          '手动供样',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(3)
                        )
                      "
                      >手动供样</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      size="small"
                      @click="
                        clickCaiYangQiBtn(
                          '手动留样',
                          SDL_Global.CMD.CY_CaiYangQiml.Format(4)
                        )
                      "
                      >手动留样</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="泵阀控制"
        name="bfkz"
        v-if="SoftType == 21 || SoftType == 22 || SoftType == 23"
      >
        <template v-if="customPointName == '龙感湖浮船站'">
          <bfkgfc></bfkgfc>
        </template>
        <template v-else>
          <bfkg></bfkg>
        </template>
      </el-tab-pane>
    </el-tabs>
    <template class="dialogBox">
      <el-dialog
        title="采样器设置"
        :visible.sync="CaiYangQiMode"
        width="60%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <div class="dialogBody">
          <div class="dialogLabel">
            <label style="color: #cccccc">{{ CaiYangmlName }}</label>
          </div>
          <div class="dialogInput">
            <el-input
              size="small"
              placeholder="请输入"
              v-model="CaiYangdata"
              style="color: #fff"
            >
              <template slot="append">分钟</template>
            </el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="CaiYangQiMode = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="SendCaiYnagData"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script scoped>
import bfkg from "./module/bfkg";
import bfkgfc from "./module/bfkz_fc";

import ybkzbtn from "./module/ybkzbtn";
import wsybkzbtn from "./module/ws_ybkzbtn";

export default {
  name: "xtkz",
  components: {
    bfkg,
    ybkzbtn,
    wsybkzbtn,
    bfkgfc,
  },
  data() {
    // let YiBiaoData = [];
    // YiBiaoData = this.socketApi.globalDataConfig.SDL_Global.Meters().filter(function (item, index, array) {
    //   //元素值，元素的索引，原数组。
    //   if (item.id != 'CYQ') {
    //     return item.isMain == true;
    //   }
    // });
    // YiBiaoData.sort(function (a, b) {
    //   return a.sort - b.sort
    // });
    let _customPointName = JSON.parse(
      localStorage.getItem("clientConfigInfo")
    ).customPointName;
    let YiBiaoList = [];
    YiBiaoList = this.socketApi.globalDataConfig.SDL_Global.MetersData().filter(
      function (item, index, array) {
        //元素值，元素的索引，原数组。
        return (
          item.Code == "w21011" ||
          item.Code == "w21001" ||
          item.Code == "w21003" ||
          item.Code == "w01019" ||
          item.Code == "w01018" ||
          item.Code == "ZJS" ||
          item.Code == "VOCs" ||
          item.Code == "w26001"
        );
      }
    );
    YiBiaoList.sort(function (a, b) {
      return a.sort - b.sort;
    });

    return {
      activeName: "ybkz",
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      customPointName: _customPointName,

      SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,
      CaiYangQiMode: false,
      CaiYangmlName: "",
      CaiYangdata: "",
      CaiYangml: "",
      YiBiaoShow: YiBiaoList, //YiBiaoData
      // ZJSYiBiaoShow:ZJSYiBiaoShow
    };
  },
  mounted() {},

  methods: {
    // 切换开关
    handleClick() {},
    //  采样器控制
    clickCaiYangQiBtn(name, ml) {
      // 采样器命令=(0:停止/1:启动/2:采样/3:供样/4:留样)
      //采样模式处于 手动留样 才能操作
      if (this.SDL_Global.CY.ComStatus < 1) {
        this.$message.error("操作失败！(当前通讯状态断开)");
        return;
        // this.$message.error("操作失败！(请将采样模式位处于 手动留样 模式)");
      }
      if (name == "手动留样") {
        if (this.SDL_Global.LY.MoShi != "3") {
          this.$message.error("操作失败！(请将留样模式位处于 手动留样 模式)");
          return;
        }
      }
      if (name == "采样器启动" || name == "采样器停止") {
        if (this.SDL_Global.PLC.YunXingMoShi != 1) {
          this.$message.error("请将系统切换为维护模式，再操作采样器");
          return;
        }
      }

      if (name == "采样器停止") {
        this.$message.warning("采样器停止后，将无法自动运行");
      }
      this.sendML(name, ml);
    },

    //留样器-手动取样
    clickLYBtn(remark, ml) {
      //留样模式处于 手动留样 才能操作
      let $this = this;
      if ($this.SDL_Global.LY.MoShi != 3) {
        $this.$message.error("操作失败！(请将留样模式位处于 手动留样 模式)");
        return;
      }
      this.sendML(remark, ml);
    },
    // 修改上传参数
    updateForm(name, ml, data) {
      this.CaiYangQiMode = true;
      this.CaiYangmlName = name;
      this.CaiYangdata = data;
      this.CaiYangml = ml;
    },
    SendCaiYnagData() {
      this.sendML(
        this.CaiYangmlName,
        this.CaiYangml.Format(this.CaiYangdata),
        false
      );
      this.CaiYangQiMode = false;
    },
    switchml(mlName, cmds) {
      // 逻辑
      this.sendML(mlName, cmds);
    },
    sendML(remark, cmds, loading = true) {
      var data =
        localStorage.getItem("Loginedname") + "," + remark + "," + cmds;
      this.socketApi.sendSock(data, loading);
    },
  },
};
</script>

<style scoped>
.ybkz-body {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
}

.el-card__body {
  padding-top: 5px !important;
}

/* 仪表控制 */
.ybkz-body .c-title {
  color: #fff;
}

.c-status {
  color: #6ad2c2;
}

.c-loginfo {
  float: right;
  padding: 0px 0;
  color: #cccccc;
  font-size: 14px;
}

.ybkz-body .c-loginfo-info {
  color: #4a92ff;
}

.ybkz-body .offline {
  color: #cccccc;
}

.ybkz-body .el-card {
  margin-bottom: 0px;
  border-radius: 0px;
  min-height: 100px;
  min-width: 550px;
  border: none;
  background-color: #303a4c !important;
}

.body-btn {
  width: 100%;
  text-align: center;
}

.dialog-footer .el-button:hover {
  border-color: #4a92ff !important;
}

.ybkz-body .el-button:hover {
  background-color: #4a92ff !important;
  border-color: #4a92ff !important;
}

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
  padding: 9px 0px;
  font-size: 14px;
}

.dividing {
  width: 100%;
  height: 1px;
  background-color: #48556e;
}

.div_liuyang {
  height: 110px;
  padding-top: 0px;
}

.body-footer {
  color: #cccccc;
  height: 46px;
  line-height: 46px;
  margin-left: 20px;
  font-size: 14px;
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

/* 采样器控制 */
.cyqkz-body {
  margin: 0 20px;
  color: #cccccc;
  font-size: 14px;
  border: none;
}

/* 采样器 */
.bottle {
  color: #cccccc;
  margin-bottom: 20px;
  text-align: left;
}

.bottle .el-radio {
  color: #cccccc;
}

/* 上传name */
.botName {
  display: inline-block;
  color: #cccccc;
  /* margin-left: 22px; */
  text-align: center;
  font-size: 14px;
}

/* 上传input */
.botInput {
  display: inline-block;
  color: #cccccc;
  text-align: center;
  font-size: 14px;
  width: 18%;
}

.botbtn {
  display: inline-block;
  width: 20px;
  height: 30px;
  font-size: large;
  text-align: right;
  cursor: pointer;
}

.cyqkz-body .el-button:hover {
  background-color: #4a92ff !important;
  border-color: #4a92ff !important;
}

@media only screen and (min-width: 768px) {
  .el-col-sm-12 {
    width: 50%;
  }

  .botInput {
    width: 40%;
  }
}

@media only screen and (min-width: 1366px) {
  .el-col-sm-12 {
    width: 50%;
  }

  .botInput {
    width: 18%;
  }
}

.cyqkz-body .el-button.active {
  background-color: #4a92ff;
  border-color: #4a92ff;
}
</style>