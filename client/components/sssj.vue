<style scoped>
.el-card__header {
  height: 40px !important;
}

.card-header {
  /* height             : 40px; */
  padding: 9px 8px;
  border-bottom: 1px solid #6c98d8;
  /* border-bottom:1px solid #6c98d8; */
  color: #ffffff;
}

.card-headers {
  /* height             : 40px; */
  padding: 9px 8px;
  /* border-bottom-color: #182030; */
  border-bottom: 1px solid #182030;
  color: #ffffff;
}

.c-normal {
  color: #ffffff;
  text-align: center;
  padding-right: 35px;
  font-size: 26px;
  cursor: pointer;
}

.c-alarm {
  color: pink;
  text-align: center;
  font-size: 26px;
  cursor: pointer;
}

.div_sssj .c-com {
  float: right;
  padding: 2px 0;
  font-size: 14px;
  color: #cccccc;
}

.div_sssj .c-MeterStatus {
  text-align: left;
  /* margin-right: 10%; */
  padding-left: 66%;
  /* margin-top: 10px;
    margin-bottom: -10px; */
  margin-top: 23px;
  margin-bottom: -15px;
  color: #cccccc;
  font-size: 12px;
}
.c-MeterName {
  font-size: 8px;
  color: #fff;
  padding-left: 5px;
  padding-top: 5px;
}
.div_sssj .c-MeterStatus1 {
  height: 19px;
}

.div_sssj .c-value {
  text-align: center;
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  /* margin-top: 15px; */
}

.div_sssj .c-unit {
  text-align: left;
  /* margin-right: 15%; */
  padding-left: 66%;
  /* margin-top: -10px;
    margin-bottom: 15px; */
  margin-top: -16px;
  margin-bottom: 25px;
  color: #cccccc;
  font-size: 14px;
}

.div_sssj .c-footer {
  color: #ccc;
  font-size: 14px;
  height: 20px;
  padding: 0px 10px;
}

.div_sssj .c-footer span {
  display: block;
  float: left;
}

.div_sssj .c-footer .c-status {
  /* width: 80px; */
  text-align: left;
}

.div_sssj .c-footer .c-ybbtn {
  /* width: 80px; */
  text-align: center;
  cursor: pointer;
  float: none;
}

.div_sssj .c-footer .c-param {
  cursor: pointer;
  float: right;
}

.icon-status-normal {
  color: lawngreen;
}

.icon-status-offline {
  color: grey;
}

.icon-status-alarm {
  color: red;
}

.icon-status-fault {
  color: orange;
}

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

.ybkz-body .el-card {
  margin-bottom: 0px !important;
  border-radius: 0px;
  min-height: 100px;
  min-width: 550px;
  border: none;
  background-color: #303a4c;
}

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
</style>
<template>
  <div>
    <div class="div_sssj">
      <el-row :gutter="12">
        <!-- 样例 -->
        <!-- SDL_Global.MetersCS() -->
        <template
          v-for="(item, index) in SDL_Global.MetersDataSYPP().filter(
            (i) =>
              i.IsVOCs != true &&
              i.ID != 'GPSLongitude' &&
              i.ID != 'GPSLatitude' &&
              i.IsQX != true &&
              i.IsBMS != true &&
              i.ID != 'ZFL'
          )"
        >
          <el-col :key="index" :sm="12" :xs="12" :md="8" :lg="6">
            <el-card
              v-bind:class="{
                'box-card': true,
                'bg-offline': item.ComStatus != 1,
              }"
              style="min-height: 150px"
            >
              <!-- 'bg-purple': item.MeterStatus == 0 && item.ComStatus == 1,  //第三种颜色-->

              <div
                v-bind:class="{
                  'card-header': item.ComStatus == 1,
                  'card-headers': item.ComStatus != 1,
                }"
              >
                <span class="c-title">{{ item.Name }}</span>
                <i
                  v-bind:class="{
                    iconfont: true,
                    'icon-wifi-green': item.ComStatus == 1,
                  }"
                  style="color: #7cfa02"
                ></i>
                <!--color: aquamarine -->
                <i
                  v-bind:class="{
                    iconfont: true,
                    'icon-wifi-green': item.ComStatus != 1,
                  }"
                ></i>
                <!-- <div class="c-com">
                  <span>
                    <i v-bind:class="{
                      iconfont: true,
                      'icon-status-normal':  item.ComStatus == 1,
                      'icon-status-offline': item.ComStatus != 1,
                    }"></i>
                  </span>
                  <span>{{ item.ComStatusText }}</span>
                </div> -->

                <!-- <span class="c-ext">{{ item.SysTime }}</span> -->
              </div>

              <div class="card-body">
                <!-- && item.ComStatus == 1 && version==2000 -->
                <div
                  class="c-MeterStatus"
                  v-if="
                    item.Code == 'w21001' ||
                    item.Code == 'w21011' ||
                    item.Code == 'w01019' ||
                    item.Code == 'w21003' ||
                    item.Code == 'w01018'
                  "
                >
                  <span>
                    {{ item.LastTestFlagText }}
                  </span>
                  <template v-if="SoftType == 32">
                    <template v-if="item.LastTestDataFlag == 'T'">
                      <el-tooltip
                        effect="light"
                        content="仪表报警(超上限)"
                        placement="top-start"
                        popper-class="atooltip"
                      >
                        <span v-show="SoftType == 32">
                          <!-- <i class="el-icon-sunrise-1"></i> -->
                          <i
                            v-bind:class="{
                              iconfont: true,
                              'icon-alarm-full-yujing':
                                item.LastTestDataFlag == 'T' ||
                                item.LastTestDataFlag == 'L',
                            }"
                            style="color: #fa5a5a; font-size: 15px"
                          ></i>
                        </span>
                      </el-tooltip>
                    </template>
                    <template v-else-if="item.LastTestDataFlag == 'L'">
                      <el-tooltip
                        effect="light"
                        content="仪表报警(超下限)"
                        placement="top-start"
                        popper-class="atooltip"
                      >
                        <span v-show="SoftType == 32">
                          <!-- <i class="el-icon-sunrise-1"></i> -->
                          <i
                            v-bind:class="{
                              iconfont: true,
                              'icon-alarm-full-yujing':
                                item.LastTestDataFlag == 'T' ||
                                item.LastTestDataFlag == 'L',
                            }"
                            style="color: #fa5a5a; font-size: 15px"
                          ></i>
                        </span>
                      </el-tooltip>
                    </template>
                    <template v-else>
                      <span
                        v-if="
                          funAlarm(
                            item.LastTestFlagText,
                            item.Code,
                            item.LastTestData
                          )
                        "
                      >
                        <el-tooltip
                          effect="light"
                          content="系统预警（阈值）"
                          placement="top-start"
                          popper-class="atooltip"
                        >
                          <!-- <i class="el-icon-sunrise-1"></i> -->
                          <i
                            v-bind:class="{
                              iconfont: true,
                              'icon-alarm-full-yujing': true,
                            }"
                            style="color: #feaf0d; font-size: 15px"
                          ></i>
                        </el-tooltip>

                        <!-- <i class="iconfont icon-emergency-n"></i> -->
                      </span>
                      <span v-else>
                        <el-tooltip
                          effect="light"
                          content="仪表测量正常"
                          placement="top-start"
                          popper-class="atooltip"
                        >
                          <i
                            v-bind:class="{
                              iconfont: true,
                              'icon-alarm-full-yujing': true,
                            }"
                            style="font-size: 15px"
                          ></i>
                        </el-tooltip>
                      </span>
                    </template>
                  </template>
                </div>

                <!--  
                v-bind:class="{   
                  'c-normal': item.LastTestDataFlag != 'T'&&item.LastTestDataFlag != 'L',
                  'c-alarm': ,
                }"-->

                <template v-if="item.Code == 'VOCs'">
                  <div class="c-MeterName">
                    {{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsVOCs == true
                      )[0].Name
                    }}
                  </div>

                  <div class="c-normal" @click="moreVocs()">
                    {{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsVOCs == true
                      )[0].LastTestData
                    }}
                  </div>

                  <div class="c-unit">
                    {{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsVOCs == true
                      )[0].Unit
                    }}
                  </div>
                  <div class="c-footer">
                    <span class="c-status">{{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsVOCs == true
                      )[0].MeterStatusText
                    }}</span>

                    <span class="c-param" @click="moreVocs()"
                      >更多监测因子 ></span
                    >
                    <!-- <div class="c-ybbtn" @click="openybbtnDialog(item.ID, item.Name)">仪表控制</div> -->
                  </div>
                </template>

                <template v-else-if="item.Code == 'QX'">
                  <div class="c-MeterName">
                    {{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsQX == true
                      )[0].Name
                    }}
                  </div>

                  <div class="c-normal" @click="moreQX()">
                    {{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsQX == true
                      )[0].LastTestData
                    }}
                  </div>

                  <div class="c-unit">
                    {{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsQX == true
                      )[0].Unit
                    }}
                  </div>
                  <div class="c-footer">
                    <!-- <span class="c-status">{{
                      SDL_Global.MetersDataSYPP().filter(
                        (i) => i.IsQX == true
                      )[0].MeterStatusText
                    }}</span> -->

                    <span class="c-param" @click="moreQX()"
                      >更多监测因子 ></span
                    >
                    <!-- <div class="c-ybbtn" @click="openybbtnDialog(item.ID, item.Name)">仪表控制</div> -->
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="
                      item.Code != 'w21001' &&
                      item.Code != 'w21011' &&
                      item.Code != 'w01019' &&
                      item.Code != 'w21003' &&
                      item.Code != 'w01018'
                    "
                    class="c-MeterStatus1"
                  ></div>

                  <div
                    v-if="item.Code == 'w01050'"
                    class="c-normal"
                    @click="openswdxDialog()"
                  >
                    {{ item.LastTestData }}
                  </div>
                  <div
                    v-else
                    class="c-normal"
                    @click="openDialog(item.ID, item.Name)"
                  >
                    {{ item.LastTestData }}
                  </div>
                  <div class="c-unit">{{ item.Unit }}</div>
                  <div class="c-footer">
                    <!-- item.Code == 'w21001' ||
                    item.Code == 'w21011' ||
                    item.Code == 'w01019' ||
                    item.Code == 'w21003' ||
                    item.Code == 'w01018' ||
                    item.Code == 'w01018' || -->
                    <span
                      class="c-status"
                      v-if="
                        item.Code == 'w21011' ||
                        item.Code == 'w21001' ||
                        item.Code == 'w21003' ||
                        item.Code == 'w01019' ||
                        item.Code == 'w01018' ||
                        item.Code == 'ZJS' ||
                        item.Code == 'VOCs'
                      "
                      >{{ item.MeterStatusText }}</span
                    >
                    <span class="c-status" v-else></span>

                    <span
                      v-if="
                        item.Code == 'w21001' ||
                        item.Code == 'w21011' ||
                        item.Code == 'w01019' ||
                        item.Code == 'w21003' ||
                        item.Code == 'w01018'
                      "
                      class="c-param"
                      @click="openDialog(item.ID, item.Name)"
                      >参数 ></span
                    >
                    <span
                      v-else-if="item.Code == 'w01050'"
                      class="c-param"
                      @click="openswdxDialog()"
                      >参数 ></span
                    >

                    <!-- <div class="c-ybbtn" @click="openybbtnDialog(item.ID, item.Name)">仪表控制</div> -->
                  </div>
                </template>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-row>
      <!-- 关键参数 -->
      <wsParam
        :moreParammodel.sync="MoreParam"
        :ID="ID"
        :Name="Name"
        v-if="SoftType == 32"
      >
      </wsParam>
      <Param :moreParammodel.sync="MoreParam" :ID="ID" :Name="Name" v-else>
      </Param>
      <Paramswdx :swdxParammodel.sync="SwdxParam"></Paramswdx>
      <template>
        <el-dialog
          title="VOCs"
          :visible.sync="DialogVocs"
          width="636px"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          class="div-dialog"
        >
          <div>
            <table>
              <thead></thead>
              <tbody>
                <tr
                  v-for="(item, index) in SDL_Global.MetersDataSYPP().filter(
                    (i) => i.IsVOCs == true
                  )"
                  :key="index"
                >
                  <!-- &nbsp; ({{ item.Unit }}) -->
                  <td style="text-align: left; padding-left: 10px">
                    {{ item.Name }}
                  </td>
                  <td style="text-align: left; padding-left: 10px">
                    {{ item.LastTestData }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-dialog>
      </template>
      <template>
        <el-dialog
          title="气象"
          :visible.sync="DialogQX"
          width="636px"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          class="div-dialog"
        >
          <div>
            <table>
              <thead></thead>
              <tbody>
                <tr
                  v-for="(item, index) in SDL_Global.MetersDataSYPP().filter(
                    (i) => i.IsQX == true
                  )"
                  :key="index"
                >
                  <!-- &nbsp; ({{ item.Unit }}) -->
                  <td style="text-align: left; padding-left: 10px">
                    {{ item.Name }} ({{ item.Unit }})
                  </td>
                  <td style="text-align: left; padding-left: 10px">
                    {{ item.LastTestData }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
import Param from "./module/Param";
import wsParam from "./module/wsParam";
import Paramswdx from "./module/Param_swdx";

export default {
  name: "sssj",
  components: {
    Param,
    wsParam,
    Paramswdx,
  },
  data() {
    // console.log("1111", this.socketApi.globalDataConfig.SDL_Global);

    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      SoftType: JSON.parse(localStorage.getItem("softType")),
      ID: "TP",
      Name: "参数信息",
      ybName: "",
      MoreParam: false,
      SwdxParam: false,
      YiBiaoBtn: false,
      DialogVocs: false,
      DialogQX: false,
      lcbjData: [],
      lcbjtypeList: [
        {
          value: "1",
          label: "水样数据",
        },
        {
          value: "2",
          label: "标样数据",
        },
        {
          value: "3",
          label: "零点数据",
        },
        {
          value: "4",
          label: "跨度数据",
        },
        {
          value: "5",
          label: "空白数据",
        },
        {
          value: "6",
          label: "平行样数据",
        },
        {
          value: "7",
          label: "加标数据",
        },
      ],
    };
  },
  mounted() {
    if (this.SoftType == 32) this.selectlcbj();
    // console.log("SDL_Global.MetersDataPP()", this.SDL_Global.MetersDataPP());
  },

  methods: {
    moreVocs() {
      this.DialogVocs = true;
    },
    moreQX() {
      this.DialogQX = true;
    },

    //查看参数
    openDialog(id, name) {
      this.MoreParam = true;
      debugger;
      this.ID = id;
      this.Name = name;
    },
    // 生物毒性参数
    openswdxDialog() {
      this.SwdxParam = true;
    },
    // 仪表控制
    openybbtnDialog(id, name) {
      this.YiBiaoBtn = true;
      this.ID = id;
      this.ybName = name;
    },
    //读取仪表报警
    selectlcbj() {
      //   var ade='12.551';
      // let asv=parseFloat(ade) .toFixed(2);
      // debugger

      let condition = "";
      let $this = this;
      $this.http
        .comMethod("*", "tbalarmarea", condition)
        .then((res) => {
          if (res.length != 0) {
            res.forEach(function (item) {
              let lables = $this.lcbjtypeList.filter(
                (m) => m.value == item.AlarmType
              );
              if (lables.length > 0) {
                item.AlarmType = lables[0].label;
              }
            });
            $this.lcbjData = res;
            // console.log('this.lcbjData=', $this.lcbjData)
          } else {
            $this.$message.info("暂无数据");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //判断实时数据预警
    funAlarm(dataType, Code, dataVal) {
      // 循环预警数据
      for (var i = 0; i < this.lcbjData.length; i++) {
        // 判断因子及数据类型
        if (
          this.lcbjData[i].Code == Code &&
          this.lcbjData[i].AlarmType == dataType
        ) {
          // 判断数据区间
          if (
            (dataVal >= this.lcbjData[i].ULimit &&
              dataVal < this.lcbjData[i].UULimit) ||
            (dataVal <= this.lcbjData[i].DLimit &&
              dataVal > this.lcbjData[i].DDLimit)
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
  },
};
</script>