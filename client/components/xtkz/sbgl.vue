<template>
  <div class="yhgl">
    <div v-if="isShowHeader" style="margin: 0 20px" class="sbgl-panel-title">
      <div class="panel panel-default" style="min-width: 1700px">
        <div class="panel-body">
          <div class="block">设备管理</div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default" style="min-width: 1740px">
        <template
          v-for="(item, index) in YiBiaoList.filter(
            (m) => m.SoftType == SoftType || m.SoftType == 999
          )"
        >
          <el-row class="ybclass" :key="index" style="overflow-x: auto">
            <el-col>
              <div
                style="width: 70px; padding-left: 10px; display: inline-block"
              >
                <label style="font-size: 14px" class="rwlx">
                  {{ index + 1 }}.
                </label>
              </div>

              <!-- </el-col>
            <el-col :span="5" style="height: 32px; line-height: 32px"> -->
              <!--  -->
              <div style="width: 150px; display: inline-block">
                <label> </label>
                <input
                  type="checkbox"
                  v-model="item.Used"
                  :value="item.Used"
                  @change="activeBox(item)"
                />
                <span
                  v-if="item.DevTagName == '五参数'"
                  style="font-size: 14px"
                >
                  {{ item.DevTagName }}
                  <el-tooltip
                    effect="light"
                    :content="
                      SoftType == 32
                        ? 'pH,温度,水中油'
                        : 'pH,浊度,温度,溶解氧,电导率'
                    "
                    placement="bottom-start"
                    popper-class="atooltip"
                  >
                    <span class="el-icon-warning"></span>
                  </el-tooltip>
                </span>
                <span
                  v-else-if="item.DevTagName == '重金属'"
                  style="font-size: 14px"
                >
                  重金属
                  <i class="el-icon-edit" @click="editPoildList('ZJS')"></i>
                </span>
                <span
                  v-else-if="item.DevTagName == 'VOCs'"
                  style="font-size: 14px"
                >
                  VOCs
                  <i class="el-icon-edit" @click="editPoildList('VOCs')"></i>
                </span>
                <span v-else style="font-size: 14px">
                  {{ item.DevTagName }}
                </span>
              </div>

              <!-- </el-col>
            <el-col :span="5" style="height: 32px; line-height: 32px; font-size: 14px"> -->
              <!--   -->
              <div style="width: 240px; display: inline-block">
                <label class="rwlx">厂家</label>
                <!-- {{item. TagFile}}{{item.Series}} -->
                <el-select
                  style="width: 73%"
                  size="small"
                  v-model="item.Factory"
                  placeholder="请选择"
                  collapse-tags
                  @change="factoryChange(item, 'change')"
                >
                  <el-option
                    v-for="item in item.FactoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>

              <!-- </el-col>
            <el-col :span="5" style="height: 32px; line-height: 32px" class="ybNum"> -->
              <!--  -->
              <div style="width: 240px; display: inline-block">
                <label class="rwlx">型号</label>
                <el-select
                  style="width: 62%"
                  size="small"
                  v-model="item.Series"
                  placeholder="请选择"
                  collapse-tags
                  @change="seriesChange(item)"
                >
                  <el-option
                    v-for="item in item.SeriesList"
                    :disabled="item.disabled"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>

              <!-- </el-col>
            <el-col :span="8" style="height: 32px; line-height: 32px"> -->
              <!--  -->
              <div style="width: 320px; display: inline-block">
                <label class="rwlx">串口: </label>
                <el-input
                  v-if="
                    item.DevTag == 'PLC' ||
                    item.DevTag == 'LXJ' ||
                    item.DevTag == 'HM' ||
                    item.DevTag == 'VOCS'
                  "
                  v-model="item.ConnStr"
                  size="small"
                  style="width: 66%"
                  placeholder="请输入"
                  type="text"
                >
                  <!-- suffix-icon="el-icon-edit" -->
                </el-input>
                <el-input
                  v-else
                  readonly=""
                  @click.native="openDialogSerInfo(item, 'wqms')"
                  v-model="item.ConnStr"
                  size="small"
                  style="width: 66%"
                  placeholder="请输入"
                  type="text"
                  suffix-icon="el-icon-edit"
                >
                </el-input>
              </div>
              <div style="width: 320px; display: inline-block">
                <label class="rwlx">驱动类型</label>
                <el-select
                  style="width: 62%"
                  size="small"
                  v-model="item.Driver"
                  placeholder="请选择"
                  collapse-tags
                >
                  <el-option
                    v-for="item in DriverList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="width: 320px; display: inline-block">
                <label class="rwlx">协议类型</label>
                <el-select
                  style="width: 62%"
                  size="small"
                  v-model="item.Protocal"
                  placeholder="请选择"
                  collapse-tags
                >
                  <el-option
                    v-for="item in ProtocalList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <!-- </el-input> -->
              </div>
              <!-- </el-col>-->
            </el-col>
          </el-row>
        </template>

        <div style="text-align: center; margin-top: 30px">
          <template v-if="!btnCustom">
            <el-button  
              style="margin-bottom: 20px"
              @click="saveComInfo"
              type="primary"
              size="small"
            >
              <span>保&nbsp;&nbsp;&nbsp;&nbsp;存</span>
            </el-button>
          </template>
          <template v-else>
            <el-button
              style="margin-bottom: 20px"
              @click="parentPrev"
              type="default"
              size="small"
            >
              <span>上一步</span>
            </el-button>
            <el-button
              style="margin-bottom: 20px"
              @click="saveComInfo"
              type="primary"
              size="small"
            >
              <span>下一步</span>
            </el-button>
          </template>

          <!-- <el-button style="margin-bottom: 20px" @click="resetForm" size="small"
            >取 消</el-button
          > -->
        </div>
      </div>
    </div>
    <!-- 串口字符串修改弹窗 -->
    <template>
      <el-dialog
        title="编辑串口字符串信息"
        :visible.sync="dialogFormVisibleCKInfo"
        width="500px"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        top="50px"
      >
        <el-form
          :label-position="labelPosition"
          label-width="95px"
          status-icon
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="端口号:" style="text-align: left">
            <el-select v-model="comStr.portValue">
              <el-option
                v-for="item in optionsPorts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="波特率:" style="text-align: left">
            <el-select v-model="comStr.bpsValue">
              <el-option
                v-for="item in optionsBps"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="校验位:" style="text-align: left">
            <el-select v-model="comStr.checkBitValue">
              <el-option
                v-for="item in optionsCheckBit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据位:" style="text-align: left">
            <el-select v-model="comStr.dataBitValue">
              <el-option
                v-for="item in optionsDataBit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="停止位:" style="text-align: left">
            <el-select v-model="comStr.stopBitValue">
              <el-option
                v-for="item in optionsStopBit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用DTR:" style="text-align: left">
            <el-select v-model="comStr.startDTRValue">
              <el-option
                v-for="item in optionsstartDTR"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轮训频率:" style="text-align: left">
            <el-select v-model="comStr.lunXunValue">
              <el-option
                v-for="item in optionslunXun"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible=false" size="small">取 消</el-button> -->
          <el-button
            type="primary"
            @click.native="updateLineComStr"
            size="small"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </template>
    <!-- 重金属&VOCs修改弹窗 -->
    <template>
      <el-dialog
        title="编辑串口信息"
        :visible.sync="dialogFormVisible"
        width="60%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        top="50px"
      >
        <el-form
          :label-position="labelPosition"
          label-width="95px"
          status-icon
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item
            label="重金属:"
            style="text-align: left"
            v-if="dialogmodel == 'ZJS'"
          >
            <el-checkbox-group
              v-model="checkedNameZJS"
              @change="handleCheckedzjsTagName"
            >
              <el-checkbox
                v-for="zjs in zjsCheckList"
                :label="zjs.Name"
                :key="zjs.ID"
                >{{ zjs.Name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="VOCs:"
            style="text-align: left"
            v-if="dialogmodel == 'VOCs'"
          >
            <el-checkbox-group
              v-model="checkedNameVOCs"
              @change="handleCheckedvocsTagName"
            >
              <el-checkbox
                v-for="vocs in vocsCheckList"
                :label="vocs.Name"
                :key="vocs.ID"
                >{{ vocs.Name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible=false" size="small">取 消</el-button> -->
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
            size="small"
            >保 存</el-button
          >
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    //配置向导页面调用次组件，需要隐藏标题头。默认显示标题头
    isShowHeader: {
      type: Boolean,
      default: () => true,
    },
    btnCustom: {
      type: Boolean,
      default: () => false,
    },
    propSoftKey: {
      type: Boolean,
      default: () => false,
    },
  },
  Name: "sbgl",
  data() {
    let _softType = JSON.parse(localStorage.getItem("appConfig")).SoftType;
    let _customPointName = JSON.parse(
      localStorage.getItem("clientConfigInfo")
    ).customPointName;
    if (_softType != "32") {
      _softType = "21";
    }
    return {
      // isShowHeader: true,
      SoftType: _softType,
      customPointName: _customPointName,
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      checkedNameZJS: [],
      checkedNameVOCs: [],
      zjsCheckList: [
        {
          ID: "w20120",
          Name: "铅",
          mlName: "铅",
          Status: false,
        },
        {
          ID: "w20115",
          Name: "镉",
          mlName: "镉",
          Status: false,
        },
        {
          ID: "w20122",
          Name: "铜",
          mlName: "铜",
          Status: false,
        },
        {
          ID: "w20123",
          Name: "锌",
          mlName: "锌",
          Status: false,
        },
      ],
      vocsCheckList: [
        {
          ID: "w24017",
          Name: "1，2—二氯乙烷",
          mlName: "12二氯乙烷",
          Status: false,
        },
        {
          ID: "w25003",
          Name: "甲苯",
          mlName: "甲苯",
          Status: false,
        },
        {
          ID: "w25010",
          Name: "氯苯",
          mlName: "氯苯",
          Status: false,
        },
        {
          ID: "w25011",
          Name: "1，2—二氯苯",
          mlName: "12二氯苯",
          Status: false,
        },
        {
          ID: "w25013",
          Name: "1，4—二氯苯",
          mlName: "14二氯苯",
          Status: false,
        },
        {
          ID: "w25034",
          Name: "异丙苯",
          mlName: "异丙苯",
          Status: false,
        },
        {
          ID: "w25038",
          Name: "苯乙烯",
          mlName: "苯乙烯",
          Status: false,
        },
        {
          ID: "w25073",
          Name: "对，间二甲苯",
          mlName: "对间二甲苯",
          Status: false,
        },
        {
          ID: "w24009",
          Name: "三溴甲烷",
          mlName: "三溴甲烷",
          Status: false,
        },
        {
          ID: "w24004",
          Name: "三氯甲烷",
          mlName: "三氯甲烷",
          Status: false,
        },
        {
          ID: "w25006",
          Name: "邻二甲苯",
          mlName: "邻二甲苯",
          Status: false,
        },
        {
          ID: "w24047",
          Name: "1，1—二氯乙烯",
          mlName: "11二氯乙烯",

          Status: false,
        },
        {
          ID: "w24048",
          Name: "1，2-二氯乙烯",
          mlName: "12二氯乙烯",
          Status: false,
        },
        {
          ID: "w25004",
          Name: "乙苯",
          mlName: "乙苯",

          Status: false,
        },
        {
          ID: "w24003",
          Name: "二氯甲烷",
          mlName: "二氯甲烷",

          Status: false,
        },
        {
          ID: "w24049",
          Name: "三氯乙烯",
          mlName: "三氯乙烯",

          Status: false,
        },
        {
          ID: "w24050",
          Name: "四氯乙烯",
          mlName: "四氯乙烯",

          Status: false,
        },
        {
          ID: "w25002",
          Name: "苯",
          mlName: "苯",

          Status: false,
        },
      ],
      defaultYiBiaoList: null,
      YiBiaoList: [
        {
          id: "1",
          Driver: "S7Smart",
          Protocal: "S7Client",
          ParseClass: "",
          Factory: "西门子",
          DevTag: "PLC",
          DevTagName: "PLC",
          Series: "XMZ-001",
          ConnStr: "192.168.0.4",
          TagFile: "plc.csv", //"/WQMS/plc.csv",
          Used: false,
          FactoryList: [{ value: "西门子", label: "西门子" }],
          SeriesList: [
            {
              value: "XMZ",
              label: "XMZ",
              factory: "西门子",
              csv: "plc.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "100",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "TN",
          DevTagName: "总氮",
          Series: "MODEL 9850",
          ConnStr: "COM9:9600:None:8:One",
          TagFile: "Meter.csv", //"/WQMS/Meter.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "MODEL 9850",
              label: "MODEL 9850",
              factory: "雪迪龙",
              csv: "Meter.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "3",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "TNJB",
          DevTagName: "总氮加标",
          Series: "SDL 1002",
          ConnStr: "COM7:2400:None:8:One",
          TagFile: "tnjb.csv", //"/WQMS/tnjb.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "SDL 1002",
              label: "SDL 1002",
              factory: "雪迪龙",
              csv: "tnjb.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "100",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "TP",
          DevTagName: "总磷",
          Series: "MODEL 9840",
          ConnStr: "COM9:9600:None:8:One",
          TagFile: "Meter.csv", //"/WQMS/Meter.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "MODEL 9840",
              label: "MODEL 9840",
              factory: "雪迪龙",
              csv: "Meter.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "5",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "TPJB",
          DevTagName: "总磷加标",
          Series: "SDL 1002",
          ConnStr: "COM5:2400:None:8:One",
          TagFile: "tpjb.csv", //"/WQMS/tpjb.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "SDL 1002",
              label: "SDL 1002",
              factory: "雪迪龙",
              csv: "tpjb.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "100",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "COD",
          DevTagName: "高指",
          Series: "MODEL 9811",
          ConnStr: "COM9:9600:None:8:One",
          TagFile: "Meter.csv", //"/WQMS/Meter.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "MODEL 9811",
              label: "MODEL 9811",
              factory: "雪迪龙",
              csv: "Meter.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "7",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "CODJB",
          DevTagName: "高指加标",
          Series: "SDL 1002",
          ConnStr: "COM3:2400:None:8:One",
          TagFile: "codjb.csv", //"/WQMS/codjb.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "SDL 1002",
              label: "SDL 1002",
              factory: "雪迪龙",
              csv: "codjb.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "100",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "NH3",
          DevTagName: "氨氮",
          Series: "MODEL 9820",
          ConnStr: "COM9:9600:None:8:One",
          TagFile: "Meter.csv", //"/WQMS/Meter.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "MODEL 9820",
              label: "MODEL 9820",
              factory: "雪迪龙",
              csv: "Meter.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "9",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "NH3JB",
          DevTagName: "氨氮加标",
          Series: "SDL 1002",
          ConnStr: "COM1:2400:None:8:One",
          TagFile: "nh3jb.csv", //"/WQMS/nh3jb.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "SDL 1002",
              label: "SDL 1002",
              factory: "雪迪龙",
              csv: "nh3jb.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "100",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "CODCR",
          DevTagName: "化学需氧量",
          Series: "MODEL 9810",
          ConnStr: "COM9:9600:None:8:One",
          TagFile: "Meter.csv", //"/WQMS/Meter.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "MODEL 9810",
              label: "MODEL 9810",
              factory: "雪迪龙",
              csv: "Meter.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "11",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "CODCRJB",
          DevTagName: "化学需氧量加标",
          Series: "SDL 1002",
          ConnStr: "COM10:2400:None:8:One",
          TagFile: "codcrjb.csv", //"/WQMS/codjb.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "SDL 1002",
              label: "SDL 1002",
              factory: "雪迪龙",
              csv: "codcrjb.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "12",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "E+H",
          DevTag: "WC",
          DevTagName: "五参数",
          Series: "MODEL 2000",
          ConnStr: "COM2:9600:None:8:One",
          TagFile: "wc.csv",
          Used: false,
          FactoryList: [
            { value: "E+H", label: "E+H" },
            { value: "国弘环保仪器", label: "国弘环保仪器" },
            { value: "纳清", label: "纳清" },
            { value: "ABB", label: "ABB" },
          ],
          SeriesList: [
            {
              value: "MODEL 2000",
              label: "MODEL 2000",
              factory: "E+H",
              csv: "wc.csv",
              disabled: false,
            },
            {
              value: "GH",
              label: "GH",
              factory: "国弘环保仪器",
              csv: "wc_guohong.csv",
              disabled: false,
            },
            {
              value: "NQ",
              label: "NQ",
              factory: "纳清",
              csv: "wc_naqing.csv",
              disabled: false,
            },
  {
              value: "ABB",
              label: "ABB",
              factory: "ABB",
              csv: "wc-ABB.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "13",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "ZF",
          DevTagName: "站房(温，湿度)",
          Series: "AW1485B",
          ConnStr: "COM4:9600:None:8:One",
          TagFile: "zf.csv", // "other.csv",  //"zf.csv",浮船定制
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "AW1485B",
              label: "AW1485B",
              factory: "雪迪龙",
              csv: "zf.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "103",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "纳宏水质",
          DevTag: "YLS",
          DevTagName: "叶绿素",
          Series: "MODEL 9001",
          ConnStr: "COM8:19200:None:8:One",
          TagFile: "yls.csv",
          Used: false,
          FactoryList: [{ value: "纳宏水质", label: "纳宏水质" }],
          SeriesList: [
            {
              value: "MODEL 9001",
              label: "MODEL 9001",
              factory: "纳宏水质",
              csv: "yls.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "103",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "纳宏水质",
          DevTag: "ZMD",
          DevTagName: "藻密度",
          Series: "MODEL 9002",
          ConnStr: "COM8:19200:None:8:One",
          TagFile: "yls.csv",
          Used: false,
          FactoryList: [{ value: "纳宏水质", label: "纳宏水质" }],
          SeriesList: [
            {
              value: "MODEL 9002",
              label: "MODEL 9002",
              factory: "纳宏水质",
              csv: "yls.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "16",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "浙江恒达",
          DevTag: "LY",
          DevTagName: "留样单元",
          Series: "ZSC",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "ly_hengda.csv",
          Used: false,
          FactoryList: [
            { value: "浙江恒达", label: "浙江恒达" },
            { value: "德润", label: "德润" },
          ],
          SeriesList: [
            {
              value: "ZSC",
              label: "ZSC",
              factory: "浙江恒达",
              csv: "ly_hengda.csv",
              disabled: false,
            },
            {
              value: "803L",
              label: "803L(12瓶)",
              factory: "德润",
              csv: "ly_derun.csv",
              disabled: true,
            },
            {
              value: "803M4",
              label: "803M4(6瓶)",
              factory: "德润",
              csv: "ly_derun_803M4.csv",
              disabled: true,
            },
          ],
          SoftType: 21,
        },
        {
          id: "101",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "力合",
          DevTag: "HM",
          DevTagName: "重金属",
          Series: "LFEC-2006",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "LHHM.csv",
          Used: false,
          FactoryList: [
            { value: "力合", label: "力合" },
            { value: "哈希", label: "哈希" },
          ],
          SeriesList: [
            {
              value: "LFEC-2006",
              label: "LFEC-2006",
              factory: "力合",
              csv: "LHHM.csv",
              disabled: false,
            },
            {
              value: "EZ6000",
              label: "EZ6000",
              factory: "哈希",
              csv: "HXHM.csv",
              disabled: true,
            },
          ],
          SoftType: 21,
        },
        {
          id: "102",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "力合",
          DevTag: "VOCS",
          DevTagName: "VOCs",
          Series: "LFGC-2012",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "LHVOCS.csv",
          Used: false,
          FactoryList: [
            { value: "力合", label: "力合" },
            { value: "天水自定义", label: "天水自定义" },
          ],
          SeriesList: [
            {
              value: "LFGC-2012",
              label: "LFGC-2012",
              factory: "力合",
              csv: "LHVOCS.csv",
              disabled: false,
            },
            {
              value: "JH212",
              label: "JH212",
              factory: "天水自定义",
              csv: "HJ212VOCS.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
          // CheckedNames: [],
          // vocsCheckList:[],
        },

        {
          id: "19",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "九波声迪科技",
          DevTag: "LLJ",
          DevTagName: "流量计",
          Series: "WL-1A2",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "llj.csv",
          Used: false,
          FactoryList: [
            { value: "九波声迪科技", label: "九波声迪科技" },
            { value: "水治清", label: "水治清" },
            { value: "开闳", label: "开闳" },
            { value: "ABB", label: "ABB" },
          ],
          SeriesList: [
            {
              value: "WL-1A2",
              label: "WL-1A2",
              factory: "九波声迪科技",
              csv: "llj.csv",
              disabled: false,
            },
            {
              value: "WL-1A3",
              label: "WL-1A3",
              factory: "水治清",
              csv: "llj-shuizhiqing.csv",
              disabled: false,
            },
            {
              value: "WL-1A4",
              label: "WL-1A4",
              factory: "开闳",
              csv: "llj-kaihong.csv",
              disabled: false,
            },
             {
              value: "WL-ABB",
              label: "WL-ABB",
              factory: "ABB",
              csv: "llj-ABB.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
        },
        {
          id: "20",
          Driver: "Modbus",
          Protocal: "MBRS232",
          ParseClass: "",
          Factory: "德润",
          DevTag: "CYQ",
          DevTagName: "采样器",
          Series: "MODEL 9870",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "cyq.csv",
          Used: false,
          FactoryList: [{ value: "德润", label: "德润" }],
          SeriesList: [
            {
              value: "MODEL 9870",
              label: "MODEL 9870",
              factory: "德润",
              csv: "cyq.csv",
              disabled: false,
            },
          ],
          SoftType: 32,
        },
        {
          id: "21",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "纳清",
          DevTag: "SZY",
          DevTagName: "水中油",
          Series: "HTC-S-Oil",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "szy.csv",
          Used: false,
          FactoryList: [
            { value: "纳清", label: "纳清" },
            { value: "柯泽", label: "柯泽" },
            { value: "E+H", label: "E+H" },
          ],
          SeriesList: [
            {
              value: "HTC-S-Oil",
              label: "HTC-S-Oil",
              factory: "纳清",
              csv: "szy.csv",
              disabled: false,
            },
            {
              value: "HTC-S-Oil2",
              label: "HTC-S-Oil2",
              factory: "柯泽",
              csv: "szy_keze.csv",
              disabled: false,
            },
          ],
          SoftType: 999,
          // CheckedNames: [],
          // vocsCheckList:[],
        },
        {
          id: "22",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "SWDX",
          DevTagName: "生物毒性",
          Series: "MODEL 9880",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "swdx.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "MODEL 9880",
              label: "MODEL 9880",
              factory: "雪迪龙",
              csv: "swdx.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
          // CheckedNames: [],
          // vocsCheckList:[],
        },
        {
          id: "23",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "幕迪科技",
          DevTag: "AN",
          DevTagName: "苯胺",
          Series: "AN-8000",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "AN.csv",
          Used: false,
          FactoryList: [{ value: "幕迪科技", label: "幕迪科技" }],
          SeriesList: [
            {
              value: "AN-8000",
              label: "AN-8000",
              factory: "幕迪科技",
              csv: "AN.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "24", //浮船定制
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "LCLDSW",
          DevTag: "YWJ",
          DevTagName: "液位计",
          Series: "YWJ-1000",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "ywj.csv", //  "other.csv",  //"ywj.csv",浮船定制
          Used: false,
          FactoryList: [{ value: "LCLDSW", label: "LCLDSW" }],
          SeriesList: [
            {
              value: "YWJ-1000",
              label: "YWJ-1000",
              factory: "LCLDSW",
              csv: "ywj.csv", // "other.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "25", //浮船定制
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "LCLDSW",
          DevTag: "YGQ",
          DevTagName: "烟感器",
          Series: "RS-YG-N01",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "other.csv", //浮船定制
          Used: false,
          FactoryList: [{ value: "LCLDSW", label: "LCLDSW" }],
          SeriesList: [
            {
              value: "RS-YG-N01",
              label: "RS-YG-N01",
              factory: "LCLDSW",
              csv: "other.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "26",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "博强科技",
          DevTag: "BMS",
          DevTagName: "电池",
          Series: "LP48200-16S1P",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "BMS.csv",
          Used: false,
          FactoryList: [{ value: "博强科技", label: "博强科技" }],
          SeriesList: [
            {
              value: "LP48200-16S1P",
              label: "LP48200-16S1P",
              factory: "博强科技",
              csv: "BMS.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "27",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "互信智能",
          DevTag: "GPS",
          DevTagName: "GPS",
          Series: "HS6601",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "gps.csv",
          Used: false,
          FactoryList: [{ value: "互信智能", label: "互信智能" }],
          SeriesList: [
            {
              value: "HS6601",
              label: "HS6601",
              factory: "互信智能",
              csv: "gps.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "28",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "智翔宇",
          DevTag: "QX",
          DevTagName: "气象",
          Series: "YL-100",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "QX.csv",
          Used: false,
          FactoryList: [{ value: "智翔宇", label: "智翔宇" }],
          SeriesList: [
            {
              value: "YL-100",
              label: "YL-100",
              factory: "智翔宇",
              csv: "qx.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "29",
          Driver: "Modbus",
          Protocal: "LHVOCTCP",
          ParseClass: "",
          Factory: "乐施环保",
          DevTag: "ZFY",
          DevTagName: "蒸发仪",
          Series: "LCZFSV12OC",
          ConnStr: "COM6:9600:None:8:One",
          TagFile: "zfy.csv",
          Used: false,
          FactoryList: [{ value: "乐施环保", label: "乐施环保" }],
          SeriesList: [
            {
              value: "LCZFSV12OC",
              label: "LCZFSV12OC",
              factory: "乐施环保",
              csv: "zfy.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "30",
          Driver: "S7Smart",
          Protocal: "S7Client",
          ParseClass: "",
          Factory: "雪迪龙",
          DevTag: "LXJ",
          DevTagName: "离心机",
          Series: "SDL 0105",
          ConnStr: "192.168.0.45",
          TagFile: "plc_lixinji.csv", //"/WQMS/plc.csv",
          Used: false,
          FactoryList: [{ value: "雪迪龙", label: "雪迪龙" }],
          SeriesList: [
            {
              value: "SDL 0105",
              label: "SDL 0105",
              factory: "雪迪龙",
              csv: "plc_lixinji.csv",
              disabled: false,
            },
          ],
          SoftType: 21,
        },
        {
          id: "31",
          Driver: "S7Smart",
          Protocal: "S7Client",
          ParseClass: "",
          Factory: "E+H",
          DevTag: "XFW",
          DevTagName: "悬浮物",
          Series: "SDL 0105",
          ConnStr: "COM2:9600:None:8:One",
          TagFile: "XFW.csv",
          Used: false,
          FactoryList: [{ value: "E+H", label: "E+H" }],
          SeriesList: [
            {
              value: "SDL 0105",
              label: "SDL 0105",
              factory: "E+H",
              csv: "XFW.csv",
              disabled: false,
            },
          ],
          SoftType: 32,
        },
      ],
      // 驱动类型
      DriverList: [
        { value: "S7Smart", label: "S7Smart" },
        { value: "Modbus", label: "Modbus" },
        { value: "Com", label: "Com" },
      ],
      // 协议类型
      ProtocalList: [
        { value: "S7Client", label: "S7Client" },
        { value: "MBRS232", label: "MBRS232" },
        { value: "MBRS232HJVOC", label: "MBRS232HJVOC" },
        { value: "MBTCP", label: "MBTCP" },
        { value: "MBTCPV1", label: "MBTCPV1" },
        { value: "MBMDAN", label: "MBMDAN" },
        { value: "BQBMS", label: "BQBMS" },
      ],
      tableHeight: null,
      driverUrl: "",
      dialogFormVisible: false,
      labelPosition: "right",
      dialogmodel: "wc",
      dialogFormVisibleCKInfo: false,
      optionsPorts: [],
      optionsBps: [
        {
          label: "2400",
          value: "2400",
        },
        {
          label: "4800",
          value: "4800",
        },
        {
          label: "9600",
          value: "9600",
        },
        {
          label: "19200",
          value: "19200",
        },
      ],
      optionsCheckBit: [
        {
          label: "None",
          value: "None",
          remark: "没有奇偶校验检查时发生",
        },
        {
          label: "Odd",
          value: "Odd",
          remark: "设置奇偶校验位，以便设置了位数为奇数",
        },
        {
          label: "Even",
          value: "Even",
          remark: "设置奇偶校验位，以便设置了位的计数为偶数",
        },
        // {
        //   label: "Mark 1",
        //   value: "3",
        //   remark: "将奇偶校验位设置为 1",
        // },
        // {
        //   label: "Space 0",
        //   value: "4",
        //   remark: "将奇偶校验位设置为 0",
        // },
      ],
      optionsDataBit: [
        {
          label: 7,
          value: "7",
        },
        {
          label: 8,
          value: "8",
        },
      ],
      optionsStopBit: [
        {
          label: "None",
          value: "None",
          remark: "使用没有停止位",
        },
        {
          label: "One",
          value: "One",
          remark: "使用一个停止位",
        },
        {
          label: "Two",
          value: "Two",
          remark: "使用两个停止位",
        },
        {
          label: "OnePointFive",
          value: "OnePointFive",
          remark: "使用 1.5 停止位",
        },
      ],
      optionsstartDTR: [
        {
          label: "不启用",
          value: "false",
        },
        {
          label: "启用",
          value: "true",
        },
      ],
      optionslunXun: [],
      comStr: {
        type: "",
        devtag: "",
        portValue: "",
        bpsValue: "",
        checkBitValue: "",
        dataBitValue: "",
        stopBitValue: "",
        startDTRValue: "",
        lunXunValue: "",
      },
    };
  },
  mounted() {
    for (var i = 1; i <= 20; i++) {
      this.optionsPorts.push({
        label: `COM${i}`,
        value: `COM${i}`,
      });
    }
    for (var i = 2; i <= 10; i++) {
      this.optionslunXun.push({
        label: `${i * 100}毫秒`,
        value: `${i * 100}`,
      });
    }

    this.getdrivers();

    this.getHeight();
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    //返回上一步（调用父组件方法）
    parentPrev() {
      this.$emit("stepClick", 0);
    },
    //厂家切换
    factoryChange(obj, type) {
      console.log("objFactory=", obj.Factory);

      this.YiBiaoList.filter((m) => m.DevTag == obj.DevTag).map(function (
        item,
        index
      ) {
        let sIndex = false;
        item.SeriesList.map(function (sitem, index) {
          if (sitem.factory == obj.Factory) {
            sitem.disabled = false;

            //切换厂家，默认第一个型号选中
            if (!sIndex) {
              if (type != "change") {
                item.Series = obj.Series;
              } else {
                item.Series = sitem.value;
              }
              if (sitem.value == obj.Series) {
                item.TagFile = sitem.csv;
              }
              sIndex = true;
            }
          } else {
            sitem.disabled = true;
          }
        });
      });
    },
    //型号切换
    seriesChange(obj) {
      this.YiBiaoList.filter((m) => m.DevTag == obj.DevTag).map(function (
        item,
        index
      ) {
        item.Series = obj.Series;
        item.SeriesList.map(function (sitem, index) {
          if (sitem.value == obj.Series) {
            item.TagFile = sitem.csv;
          }
        });
      });
    },
    getHeight() {
      this.tableHeight = window.innerHeight - 226;
    },
    //打开串口字符串弹出框
    openDialogSerInfo(item, type) {
      this.dialogFormVisibleCKInfo = true;
      let that = this;

      if (item.ConnStr) {
        var strList = item.ConnStr.split(":");
        debugger;
        if (strList.length == 5) {
          that.comStr = {
            type: type,
            devtag: item.DevTag,
            portValue: strList[0],
            bpsValue: strList[1],
            checkBitValue: strList[2],
            dataBitValue: strList[3],
            stopBitValue: strList[4],
          };
        } else if (strList.length == 6) {
          that.comStr = {
            type: type,
            devtag: item.DevTag,
            portValue: strList[0],
            bpsValue: strList[1],
            checkBitValue: strList[2],
            dataBitValue: strList[3],
            stopBitValue: strList[4],
            startDTRValue: strList[5],
          };
        } else {
          that.comStr = {
            type: type,
            devtag: item.DevTag,
            portValue: strList[0],
            bpsValue: strList[1],
            checkBitValue: strList[2],
            dataBitValue: strList[3],
            stopBitValue: strList[4],
            startDTRValue: strList[5],
            lunXunValue: strList[6],
          };
        }
      }
    },
    //回填串口字符串
    updateLineComStr() {
      let that = this;

      this.YiBiaoList.map(function (item) {
        if (item.DevTag == that.comStr.devtag) {
          if (that.comStr.startDTRValue == undefined) {
            that.comStr.startDTRValue = false;
          }
          if (that.comStr.lunXunValue == undefined) {
            that.comStr.lunXunValue = 200;
          }
          item.ConnStr =
            that.comStr.portValue +
            ":" +
            that.comStr.bpsValue +
            ":" +
            that.comStr.checkBitValue +
            ":" +
            that.comStr.dataBitValue +
            ":" +
            that.comStr.stopBitValue +
            ":" +
            that.comStr.startDTRValue +
            ":" +
            that.comStr.lunXunValue;
        }
      });
      this.dialogFormVisibleCKInfo = false;
    },
    //单个选中zjs
    handleCheckedzjsTagName(value) {
      let that = this;
      let checkedCount = value.length;
      that.checkedNameZJS = [];
      that.YiBiaoList[16].Used = checkedCount.length > 0;
      this.zjsCheckList.map(function (item, index) {
        item.Status = false;
        let _value = value.filter(function (it, index, array) {
          //元素值，元素的索引，原数组。
          if (it == item.Name) {
            item.Status = true;
            that.YiBiaoList[16].Used = true;
            that.checkedNameZJS.push(item.Name);
            return it;
          }
        });
      });
      that.YiBiaoList[16].pollutantList = that.zjsCheckList;
    },
    //单个选中VOCS
    handleCheckedvocsTagName(value) {
      let that = this;
      let checkedCount = value.length;
      that.checkedNameVOCs = [];
      that.YiBiaoList[17].Used = checkedCount.length > 0;

      this.vocsCheckList.map(function (item, index) {
        item.Status = false;
        let _value = value.filter(function (it, index, array) {
          //元素值，元素的索引，原数组。
          if (it == item.Name) {
            item.Status = true;
            that.YiBiaoList[17].Used = true;
            that.checkedNameVOCs.push(item.Name);
            return it;
          }
        });
      });
      that.YiBiaoList[17].pollutantList = that.vocsCheckList;
    },
    // 弹出框，查看重金属和vocs
    editPoildList(val) {
      this.dialogFormVisible = true;
      this.dialogmodel = val;
    },
    // VOS/HM 全选
    activeBox(val) {
      let that = this;
      if (val.DevTag == "HM") {
        that.checkedNameZJS = [];
        this.zjsCheckList.map(function (item, index) {
          item.Status = val.Used;
          if (val.Used) {
            that.checkedNameZJS.push(item.Name);
          }
        });
      }
      if (val.DevTag == "VOCS") {
        that.checkedNameVOCs = [];
        this.vocsCheckList.map(function (item, index) {
          item.Status = val.Used;
          if (val.Used) {
            that.checkedNameVOCs.push(item.Name);
          }
        });
      }
      that.YiBiaoList[16].pollutantList = that.zjsCheckList;
      that.YiBiaoList[17].pollutantList = that.vocsCheckList;
    },
    // 获取drivers文件
    getdrivers() {
      // 根据软件类型读取不同文件地址
      if (this.SoftType == "32") {
        //driver文件
        this.driverUrl = this.GetAppConfigJson().caijiUrl + "WWMS/"; // appConfig.driverUrl + "WWMS/";
      } else {
        //driver文件
        this.driverUrl = this.GetAppConfigJson().caijiUrl + "WQMS/"; // appConfig.driverUrl + "WQMS/";
      }

      this.http
        .get("/getdriversData", {
          driverUrl: this.driverUrl + "drivers.csv",
        })
        .then((res) => {
          if (res.length != 0) {
            let cList = this.YiBiaoList;
            let that = this;
            //前端变量
            cList.forEach((k) => {
              if (that.customPointName == "龙感湖浮船站") {
                if (k.id == "24" || k.id == "25") {
                  k.id = "13";
                }
              }
              if(that.customPointName == "四川高速污染源"){
                 if (k.id == "21" || k.id == "31") {
                  k.id = "12";
                }
              }
              //derivers数据
              res.forEach((r) => {
                let obj = {};
                //将derivers数据回填前端变量
                if (
                  r[0] == k.id &&
                  r[7].split(";").filter((m) => m == k.DevTag).length > 0
                ) {
                  k.ID = r[0];
                  k.Driver = r[1];
                  k.Protocal = r[2];
                  k.ParseClass = r[3];
                  k.ConnStr = r[4];
                  // k.TagFile = r[5];//前端写死
                  k.Used = eval(r[6].toLowerCase()); //== "TRUE" ? "启用" : "禁用"
                  // k.DevTag = r[7];//特殊处理
                  k.Factory = r[8];

                  // if (r[7] == "LY") {
                  //   that.lyfactoryChange(r[8]);
                  // }
                  k.Series = r[9]; //特殊处理

                  // k.DevTagName = r[10];//特殊处理
                  if (r[0] == "101") {
                    //HM
                    that.checkedNameZJS = [];
                    that.zjsCheckList.map(function (item, index) {
                      item.Status = false;
                      // that.YiBiaoList[16][item.ID] = 0;
                      let _value = r[10].split(";").filter(function (it) {
                        //元素值，元素的索引，原数组。
                        if (it == item.Name) {
                          item.Status = true;
                          that.YiBiaoList[16].Used = true;
                          // that.YiBiaoList[16][item.ID] = 1;
                          that.checkedNameZJS.push(item.Name);
                          return it;
                        }
                      });
                    });
                  } else if (r[0] == "102") {
                    //VOCs
                    that.checkedNameVOCs = [];
                    that.vocsCheckList.map(function (item) {
                      item.Status = false;
                      // that.YiBiaoList[17][item.ID] = 0;
                      let _value = r[10].split(";").filter(function (it) {
                        if (it == item.Name) {
                          item.Status = true;
                          that.YiBiaoList[17].Used = true;
                          // that.YiBiaoList[17][item.ID] = 1;
                          that.checkedNameVOCs.push(item.Name);
                          return it;
                        }
                      });
                    });
                  } else if (r[0] == "100" || r[0] == "103") {
                    // id=13 浮船定制 || r[0] == "13"
                    //485常规参数特殊处理（叶绿素、藻密度、4大表）
                    // DevTag
                    var arrDevTagData = r[7].split(";");
                    //  型号
                    var arrSeriesData = r[9].split(";");
                    // TagName
                    var arrData = r[10].split(";");

                    for (var i = 0; i < arrData.length; i++) {
                      if (k.DevTag == arrDevTagData[i]) {
                        k.DevTag = arrDevTagData[i];
                        k.Series = arrSeriesData[i];
                        k.DevTagName = arrData[i];
                      }
                    }
                  } else if (
                    (r[0] == "13" && that.customPointName == "龙感湖浮船站") ||(r[0] == "12" && that.customPointName == "四川高速污染源")
                  ) {
                    // id=13 浮船定制 || r[0] == "13"
                    //485常规参数特殊处理（叶绿素、藻密度、4大表）
                    // DevTag
                    var arrDevTagDatas = r[7].split(";");
                    //  型号
                    var arrSeriesDatas = r[9].split(";");
                    // TagName
                    var arrDatas = r[10].split(";");

                    for (var i = 0; i < arrDatas.length; i++) {
                      if (k.DevTag == arrDevTagDatas[i]) {
                        k.DevTag = arrDevTagDatas[i];
                        k.Series = arrSeriesDatas[i];
                        k.DevTagName = arrDatas[i];
                      }
                    }
                  } else {
                    k.DevTag = r[7];
                    k.DevTagName = r[10];
                    that.factoryChange(k);
                    that.seriesChange(k);
                  }
                }
              });
            });
            this.YiBiaoList = cList;
            this.defaultYiBiaoList = JSON.stringify(that.YiBiaoList);
          }
        })
        .catch((res) => {
          this.$message.error(res);
        });
    },
    //保存设备信息
    saveComInfo() {
      let that = this;
      // 阻止重复提交
      if (
        JSON.stringify(that.YiBiaoList) == this.defaultYiBiaoList &&
        localStorage.getItem("checkedComInfo")
      ) {
        if (that.btnCustom || that.propSoftKey) {
          that.$emit("stepClick", 2);
        } else {
          that.$message.success("没有做任何修改，无需保存");
        }
        return;
      }

      this.$confirm("确认执行此操作吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.postComInfo(function () {
          that.btnCustom && that.$emit("stepClick", 2);
        });
      });
    },
    postComInfo(callback) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let that = this;

      that.YiBiaoList[16].pollutantList = that.zjsCheckList;
      that.YiBiaoList[17].pollutantList = that.vocsCheckList;

      // driver文件修改
      that.http
        .post("/saveCJConfig", {
          str: JSON.stringify(that.YiBiaoList),
          SoftType: that.SoftType,
        })
        .then((res) => {
          localStorage.setItem(
            "checkedComInfo",
            JSON.stringify(that.YiBiaoList.filter((m) => m.Used))
          );
          //防止没有修改数据无效提交
          that.defaultYiBiaoList = JSON.stringify(that.YiBiaoList);
          that.$message.success(res.Msg);
          that.http.addLog(`修改设备信息`, `修改设备信息`, true);
          callback();
        })
        .catch((err) => {
          console.log("saveCJConfig=", err);
          that.$message.error(err);
          callback();
        });
      setTimeout(function () {
        loading.close();
      }, 500);
    },
  },
};
</script>
<style scoped>
.block {
  color: aliceblue;
}

.el-checkbox {
  margin-right: 1px;
  color: #ccc;
}

.el-col .el-col-5 {
  font-size: 14px !important;
}

.el-col .el-col-5 span {
  font-size: 14px !important;
}

.ybclass {
  color: aliceblue;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(56, 69, 101);
}

.rwlx {
  font-size: 14px !important;
}
</style>