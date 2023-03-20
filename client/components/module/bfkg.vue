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
          <div class="bfkzmlName">空压机Air_c</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.KongYaJiStatus"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '空压机Air_c',
                  SDL_Global.CMD.PLC_KongYaJi.Format(
                    SDL_Global.PLC.KongYaJiStatus
                  ),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span
            v-if="SDL_Global.PLC.KongYaJiStatus == true"
            style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
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
          <div class="bfkzmlName">清水泵M3</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.M3Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '清水泵M3',
                  SDL_Global.CMD.PLC_M.Format(3, SDL_Global.PLC.M3Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.M3Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">增压泵M4</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.M4Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '增压泵M4',
                  SDL_Global.CMD.PLC_M.Format(4, SDL_Global.PLC.M4Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.M4Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">除藻液泵M6</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.M6Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '除藻液泵M6',
                  SDL_Global.CMD.PLC_M.Format(6, SDL_Global.PLC.M6Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.M6Status == true" style="color: #4a92ff"
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
          <div class="bfkzmlName">清水阀SV3</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV3Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '清水阀SV3',
                  SDL_Global.CMD.PLC_SV.Format(3, SDL_Global.PLC.SV3Status),
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
                  SDL_Global.CMD.PLC_SV.Format(4, SDL_Global.PLC.SV4Status),
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
          <div class="bfkzmlName">管路清洗阀SV5</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV5Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '管路清洗阀SV5',
                  SDL_Global.CMD.PLC_SV.Format(5, SDL_Global.PLC.SV5Status),
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
          <div class="bfkzmlName">过滤芯吹扫阀SV6</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV6Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '过滤芯吹扫阀SV6',
                  SDL_Global.CMD.PLC_SV.Format(6, SDL_Global.PLC.SV6Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV6Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">五参数池清洗阀SV7</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV7Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '五参数池清洗阀SV7',
                  SDL_Global.CMD.PLC_SV.Format(7, SDL_Global.PLC.SV7Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV7Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">沉淀池清洗阀SV8</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV8Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '沉淀池清洗阀SV8',
                  SDL_Global.CMD.PLC_SV.Format(8, SDL_Global.PLC.SV8Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV8Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">五参数池进水阀SV9</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV9Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '五参数池进水阀SV9',
                  SDL_Global.CMD.PLC_SV.Format(9, SDL_Global.PLC.SV9Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV9Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">沉淀池进水阀SV10</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV10Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '沉淀池进水阀SV10',
                  SDL_Global.CMD.PLC_SV.Format(10, SDL_Global.PLC.SV10Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV10Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">五参数池排水阀SV11</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV11Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '五参数池排水阀SV11',
                  SDL_Global.CMD.PLC_SV.Format(11, SDL_Global.PLC.SV11Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV11Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">沉淀池排水阀SV12</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV12Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '沉淀池排水阀SV12',
                  SDL_Global.CMD.PLC_SV.Format(12, SDL_Global.PLC.SV12Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV12Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯清洗阀SV13</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV13Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯清洗阀SV13',
                  SDL_Global.CMD.PLC_SV.Format(13, SDL_Global.PLC.SV13Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV13Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯采水阀SV14</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV14Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯采水阀SV14',
                  SDL_Global.CMD.PLC_SV.Format(14, SDL_Global.PLC.SV14Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV14Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯排水阀SV15-18</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SV15Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯排水阀SV15',
                  SDL_Global.CMD.PLC_SV.Format(15, SDL_Global.PLC.SV15Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
       <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯采水阀SV19</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVC19Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯采水阀SV19',
                  SDL_Global.CMD.Plc_SVC.Format(19, SDL_Global.PLC.SVC19Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVC19Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
         <el-col :sm="12" :xs="12" :md="8" :lg="6">
        <div class="bfkzbox">
          <div class="bfkzmlName">采样杯采水阀SV20</div>
          <div class="bfkzmlSwith">
            <el-switch
              v-model="SDL_Global.PLC.SVC20Status"
              v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1"
              @change="
                sendml(
                  '采样杯采水阀SV20',
                  SDL_Global.CMD.Plc_SVC.Format(20, SDL_Global.PLC.SVC20Status),
                  'BF'
                )
              "
            >
            </el-switch>
          </div>
          <span v-if="SDL_Global.PLC.SVC20Status == true" style="color: #4a92ff"
            >开</span
          >
          <span v-else style="color: #aaaaaa">关</span>
        </div>
      </el-col>
      <!-- <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">总氮核查阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.TN_HeChaStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '总氮核查阀',
                      SDL_Global.CMD.PLC_HeChaStatus.Format(
                        SDL_Global.TN.ID,
                        SDL_Global.PLC.TN_HeChaStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>
            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">总磷核查阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.TP_HeChaStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '总磷核查阀',
                      SDL_Global.CMD.PLC_HeChaStatus.Format(
                        SDL_Global.TP.ID,
                        SDL_Global.PLC.TP_HeChaStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>
            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">高锰酸盐指数核查阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.COD_HeChaStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '高锰酸盐指数核查阀',
                      SDL_Global.CMD.PLC_HeChaStatus.Format(
                        SDL_Global.COD.ID,
                        SDL_Global.PLC.COD_HeChaStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>
            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">氨氮核查阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.NH3_HeChaStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '氨氮核查阀',
                      SDL_Global.CMD.PLC_HeChaStatus.Format(
                        SDL_Global.NH3.ID,
                        SDL_Global.PLC.NH3_HeChaStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>

            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">总氮加标阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.TN_JiaBiaoStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '总氮加标阀',
                      SDL_Global.CMD.PLC_JiaBiaoStatus.Format(
                        SDL_Global.TN.ID,
                        SDL_Global.PLC.TN_JiaBiaoStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>
            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">总磷加标阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.TP_JiaBiaoStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '总磷加标阀',
                      SDL_Global.CMD.PLC_JiaBiaoStatus.Format(
                        SDL_Global.TP.ID,
                        SDL_Global.PLC.TP_JiaBiaoStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>

            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">高锰酸盐指数加标阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.COD_JiaBiaoStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '高锰酸盐指数加标阀',
                      SDL_Global.CMD.PLC_JiaBiaoStatus.Format(
                        SDL_Global.COD.ID,
                        SDL_Global.PLC.COD_JiaBiaoStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col>

            <el-col :sm="12" :xs="12" :md="8" :lg="6">
                <div class="bfkzbox">
                    <div class="bfkzmlName">氨氮加标阀</div>
                    <div class="bfkzmlSwith">
                        <el-switch v-model="SDL_Global.PLC.NH3_JiaBiaoStatus"
                            v-bind:disabled="SDL_Global.PLC.YunXingMoShi != 1" @change="
                    sendml(
                      '氨氮加标阀',
                      SDL_Global.CMD.PLC_JiaBiaoStatus.Format(
                        SDL_Global.NH3.ID,
                        SDL_Global.PLC.NH3_JiaBiaoStatus
                      ),
                      'BF'
                    )
                  ">
                        </el-switch>
                    </div>
                    <span v-if="SDL_Global.PLC.SV15Status == true" style="color: #4a92ff">开</span>
                    <span v-else style="color: #aaaaaa">关</span>
                </div>
            </el-col> -->
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