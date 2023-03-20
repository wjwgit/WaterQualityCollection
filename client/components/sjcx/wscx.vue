<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <template v-show="defaultDateType == 1 || defaultDateType == 2">
                <el-col
                  :sm="12"
                  :md="12"
                  :lg="8"
                  :xl="6"
                  v-show="defaultDateType == 1 || defaultDateType == 2"
                >
                  <label class="rwlx">时间</label>
                  <!-- 实时数据和分钟数据 -->
                  <el-date-picker
                    v-model="datemMrangeValue"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    :clearable="false"
                    style="width: 87%; margin: 5px 0"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:00"
                    format="yyyy-MM-dd HH:mm:00"
                    size="small"
                    @change="inquire"
                    unlink-panels
                  >
                  </el-date-picker>
                </el-col>
              </template>
              <template v-show="defaultDateType == 3 || defaultDateType == 4">
                <el-col
                  :sm="12"
                  :md="12"
                  :lg="8"
                  :xl="6"
                  v-show="defaultDateType == 3 || defaultDateType == 4"
                >
                  <label class="rwlx">时间</label>
                  <!-- 小时数据 -->
                  <el-date-picker
                    v-model="datemMrangeValue"
                    type="datetimerange"
                    :picker-options="HourpickerOptions"
                    :clearable="false"
                    style="width: 87%; margin: 5px 0"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:00:00"
                    format="yyyy-MM-dd HH:00:00"
                    size="small"
                    @change="inquire"
                    unlink-panels
                  >
                  </el-date-picker>
                </el-col>
              </template>
              <template v-show="defaultDateType == 5">
                <el-col
                  :sm="5"
                  :md="5"
                  :lg="3"
                  :xl="3"
                  v-show="defaultDateType == 5"
                >
                  <label class="rwlx">时间</label>
                  <!-- 日均数据 -->
                  <el-date-picker
                    v-model="dateValue"
                    type="date"
                    :clearable="false"
                    style="width: 128px; margin: 5px 0"
                    value-format="yyyy-MM-dd"
                    size="small"
                    @change="inquire"
                    unlink-panels
                  >
                  </el-date-picker>
                </el-col>
              </template>
              <template v-show="defaultDateType == 6">
                <el-col
                  :sm="5"
                  :md="5"
                  :lg="3"
                  :xl="3"
                  v-show="defaultDateType == 6"
                >
                  <label class="rwlx">时间</label>
                  <!-- 月均数据 -->
                  <el-date-picker
                    v-model="dateValue"
                    type="month"
                    :clearable="false"
                    value-format="yyyy-MM"
                    style="width: 128px; margin: 5px 0"
                    size="small"
                    @change="inquire"
                    unlink-panels
                  >
                  </el-date-picker>
                </el-col>
              </template>
              <!-- 季均数据 -->
              <!-- <el-col :sm="5" :md="5" :lg="3" :xl="3" v-show="defaultDateType=='季度数据'">
                                <jdselect :defaultvalue="defaultval" style="margin: 5px 0;" v-show="defaultDateType == '季度数据'"
                                    @getTimeVals="getTimeVal"></jdselect>
                            </el-col> -->
              <template v-show="defaultDateType == 7">
                <el-col
                  :sm="5"
                  :md="5"
                  :lg="3"
                  :xl="3"
                  v-show="defaultDateType == 7"
                >
                  <label class="rwlx">时间</label>
                  <!-- 年均数据 -->
                  <el-date-picker
                    v-model="dateValue"
                    type="year"
                    :clearable="false"
                    value-format="yyyy"
                    style="width: 128px; margin: 5px 0"
                    size="small"
                    @change="inquire"
                    unlink-panels
                  >
                  </el-date-picker>
                </el-col>
              </template>

              <el-col :sm="6" :md="8" :lg="5" :xl="4">
                <label class="rwlx">数据类型</label>
                <!-- 数据类型切换 -->
                <el-select
                  v-model="defaultDateType"
                  placeholder="请选择"
                  @change="selDataType"
                  style="width: 60%; margin: 5px 0"
                  size="small"
                >
                  <el-option
                    v-for="item in patternOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <!-- <el-col :sm="8" :md="9" :lg="5" :xl="4" v-show="radioDiv=='图表'">
                                <label class="rwlx">因子</label>
                                <el-select v-model="jcyz" placeholder="请选择" @change="radioChange"
                                    style="width: 70%;margin: 5px 0;" size="small">
                                    <el-option v-for="item in jcyzOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col> -->

              <el-col
                :sm="4"
                :md="4"
                :lg="5"
                :xl="4"
                v-show="defaultDateType < 5"
              >
                <el-radio-group
                  v-model="radioDiv"
                  size="small"
                  @change="radioChange"
                  style="margin: 5px 0"
                >
                  <el-radio-button label="表格"></el-radio-button>
                  <el-radio-button label="图表"></el-radio-button>
                </el-radio-group>
              </el-col>
              <!-- <el-col :sm="4" :md="4" :lg="5" :xl="4" >
                                <el-radio-group v-model="radioDiv" size="small" @change="radioChange"
                                    style="margin: 5px 0;">
                                    <el-radio-button label="表格"></el-radio-button>
                                    <el-radio-button label="图表"></el-radio-button>
                                </el-radio-group>
                            </el-col> -->
              <!-- 导出 -->

              <!-- <el-button v-if="defaultDateType=='tbhourdata'||defaultDateType=='tbmindata'||defaultDateType=='tbrealtimedata'" size="small" @click="exportData" type="primary" style="float: right"
                                :loading="isLoading">
                                导出
                            </el-button> -->
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="radioDiv == '表格'"
      style="height: 40px; background-color: #313a4d; margin: 0px 20px"
    >
      <el-row class="lend" style="text-align: center; line-height: 40px">
        <el-col :span="2"> <label> N</label><label> 正常</label> </el-col>
        <el-col :span="2"> <label> T</label><label> 超上限</label> </el-col>
        <!-- <el-col :span='2'>
                    <label> L</label><label> 超下限</label>
                </el-col> -->

        <el-col :span="3"> <label> C</label><label> 校准状态</label> </el-col>

        <el-col :span="3"> <label> D</label><label> 仪器故障</label> </el-col>
        <el-col :span="3"> <label> B</label><label> 通讯异常</label> </el-col>
        <el-col :span="4">
          <label> F</label><label> 仪器通信故障</label>
        </el-col>
        <el-col :span="4">
          <label> M</label><label> 维护调试数据</label>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default" v-show="radioDiv == '表格'">
        <div class="jcsjdata">
          <!-- 实时数据，分钟数据 -->
          <eleTable
            v-show="defaultDateType == 1 || defaultDateType == 2"
            :columns="realColumnlist"
            :height="tableHeight"
            :list="TesttableData"
          >
          </eleTable>
          <eleTable
            v-show="defaultDateType == 5"
            :columns="dayColumnList"
            :height="tableHeight"
            :list="TesttableData"
          >
          </eleTable>
          <!-- 小时，日月年 -->
          <eleTable
            v-show="
              defaultDateType == 3 ||
              defaultDateType == 6 ||
              defaultDateType == 7
            "
            :columns="TongJitabcolumnList"
            :height="tableHeight"
            :list="TesttableData"
          >
          </eleTable>
          <!-- 周期测量数据 -->
          <eleTable
            v-show="defaultDateType == 4"
            :columns="lscolumnlist"
            :height="tableHeight"
            :list="TesttableData"
          >
          </eleTable>
        </div>
        <!-- 分页 -->
        <div class="pageNations">
          <el-pagination
            @current-change="currentPage"
            class="pageNation"
            v-show="
              defaultDateType == 1 ||
              defaultDateType == 2 ||
              defaultDateType == 3 ||
              defaultDateType == 4
            "
            layout="total,sizes,prev, pager, next"
            :page-size="pageSize"
            :page-sizes="[30, 150, 300]"
            @size-change="changeSize"
            :current-page="pageIndex"
            :total="pageTotal"
          >
          </el-pagination>
          <el-button
            size="small"
            @click="exportData"
            type="primary"
            style="float: left; margin-top: 8px; margin-left: 15px"
            :loading="isLoading"
          >
            导出
          </el-button>
          <!-- <excel v-else :excelTitleName='excelTitleName' :exportHeader='exportHeader'
                        :exportFilterVal='exportFilterVal' :exportList='exportList'></excel> -->
          <el-button
            size="small"
            @click="getNewData"
            type="primary"
            style="float: left; margin-top: 8px; margin-left: 15px"
          >
            刷新
          </el-button>
        </div>
      </div>
      <div
        id="myChart"
        v-show="radioDiv == '图表'"
        v-loading="pictLoading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
        element-loading-text="数据正在加载中"
      ></div>
    </div>
  </div>
</template>

<script>
// 引入组件
import excel from "../module/excel";
const { export_json_to_excel } = require("excel/Export2Excel");

import eleTable from "../module/renderTable";
import jdselect from "../module/jdselect";
import moment from "moment";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "wscx",
  components: { excel, eleTable, jdselect },
  props: {
    getTimeVals: {
      default: () => {},
      type: Function,
      // Function
    },
    changeDefaultval: {
      default: () => {},
      type: Function,
    },
    defaultValue: {
      default: "",
      type: String,
    },
  },
  data() {
    // 时间
    let firstColumn = {
      prop: "DataTime",
      title: "时间",
      align: "center",
      width: "180",
      fixed: true,
    };
    //  实时、分钟
    let realColumnlist = [firstColumn];
    // 日
    let dayColumnList = [firstColumn];
    //  小时、月、年
    let TongJitabcolumnList = [firstColumn];
    //   周期测量数据
    let lscolumnlist = [firstColumn];

    let jcyzQuery = [{ value: "", label: "所有" }];
    let MetersDatalist = this.socketApi.globalDataConfig.SDL_Global.MetersDataWSPP().filter(
        (m) =>
          m.ID != "WC" &&
          m.ID != "realFlow" &&
          m.ID != "CumulativeFlow" &&
          m.ID != "DaQiWenDu" &&
          m.ID != "DaQiShiDu" &&
          m.ID != "LY" &&
          m.ID != "ZJS" &&
          m.ID != "VOCs" &&
          m.ID != "ZF"
      );
    debugger;
    MetersDatalist.map(function (item, index) {
      // if (item.Code == "e01203") {
      //   item.Code = "w00000";
      // }

      // 因子选择
      let obj = {
        value: item.Code,
        label: item.Name,
      };
      jcyzQuery.push(obj);
      // 周期测量数据
      let colPolId = item.Code + "_Avg"; //周期测量
      let couPolId = item.Code + "_Cou"; //排放量
      let cvdPolId = item.Code + "_Cvd"; //监测值
      let colPolIdFlag = item.Code + "_Flag";

      let colName = item.Name + "<br/>" + item.Unit;
      let couName = item.Name + "排放量" + "<br/>" + "kg";
      let colSort = item.sort;
      let Decimal = item.Decimal;

      // if(cvdPolId=='w00000_Cvd'){
      //     colName='瞬时流量'+ '<br/>' + item.Unit;
      // }
      // 小时，月，年累计流量  CumulativeFlow
      // if(cvdPolId=='w00000_Cvd'){
      //     colPolId='CumulativeFlow';
      //     colName='累计流量'+ '<br/>' + item.Unit;
      // }
      // 周期 瞬时流量 InstantFlow
      //     if(colPolId=='w00000-Avg'){
      //         colPolId='InstantFlow';
      //         colName='瞬时流量'+ '<br/>' + item.Unit;
      //    }
      // 日 小时流量，累计流量 w00000_Cou CumulativeFlow
      let colPolIdValid = "";

      // 平均值（周期测量）
      let avgValue = {
        prop: colPolId,
        title: colName,
        sort: colSort,
        width: "130",
        align: "center",
        render: (h, params) => {
          let Flag = params.row[colPolIdFlag];
          let val = "";
          let style = {};
          // if ((params.row[DataTime] == '最大值'||params.row[DataTime] == '最小值'||params.row[DataTime] == '平均值'||params.row[DataTime] == '总量')&&params.row[colPolId]==null  ) {
          //     val = "/";
          // }else{
          val = params.row[colPolId]; //== null ? '--' : params.row[colPolId].toFixedFormat(Decimal);
          if (
            item.Code == "w21011" ||
            item.Code == "w21001" ||
            item.Code == "w21003" ||
            item.Code == "w01018"
          ) {
            colPolIdValid = item.Code + "_Valid";
            if (params.row[colPolIdValid] == 0) {
              style.backgroundColor = "#feaf0d";
            }
          }
          // }
          if (Flag == "N") {
            style.color = "#fff";
          } else {
            style.color = "#da666e";
          }
          return h(
            "div",
            {
              style: style,
            },
            [
              h(
                "span",
                {
                  style: {
                    color: "white",
                    "padding-right": "3px",
                  },
                },
                val
              ),
              Flag,
            ]
          );
        },
      };
      //  监测值(带标识)
      let cvdValueFlag = {
        prop: cvdPolId,
        title: colName,
        width: "130",
        align: "center",
        sort: colSort,
        render: (h, params) => {
          let Flag = params.row[colPolIdFlag];
          let val = "";
          let style = {};
          // if ((params.row[DataTime] == '最大值'||params.row[DataTime] == '最小值'||params.row[DataTime] == '平均值'||params.row[DataTime] == '总量')&&params.row[cvdPolId]==null ) {
          //     val = "/";
          // }else{
          val = params.row[cvdPolId]; //== null ? '--' : params.row[cvdPolId].toFixedFormat(Decimal);
          //}
          if (Flag == "N") {
            style.color = "#fff";
          } else {
            style.color = "#da666e";
          }
          return h(
            "div",
            {
              style: style,
            },
            [
              h(
                "span",
                {
                  style: {
                    color: "white",
                    "padding-right": "3px",
                  },
                },
                val
              ),
              Flag,
            ]
          );
        },
      };
      //  监测值(不带标识)
      let cvdValue = {
        prop: cvdPolId,
        title: colName,
        width: "130",
        align: "center",
        sort: colSort,
        render: (h, params) => {
          let val = "";
          let style = {};
          // if ((params.row[DataTime] == '最大值'||params.row[DataTime] == '最小值'||params.row[DataTime] == '平均值'||params.row[DataTime] == '总量')&&params.row[cvdPolId]==null ) {
          //     val = "/";
          // }else{
          val = params.row[cvdPolId]; //== null ? '--' : params.row[cvdPolId].toFixedFormat(Decimal);
          // }
          return h(
            "div",
            {
              style: style,
            },
            [
              h(
                "span",
                {
                  style: {
                    color: "white",
                    "padding-right": "3px",
                  },
                },
                val
              ),
            ]
          );
        },
      };
      //  排放量
      let couValue = {
        prop: couPolId,
        title: couName,
        width: "130",
        align: "center",
        sort: colSort,
        render: (h, params) => {
          let val = "";
          let style = {};
          // val = params.row[couPolId]
          // if ((params.row[DataTime] == '最大值'||params.row[DataTime] == '最小值'||params.row[DataTime] == '平均值'||params.row[DataTime] == '总量')&&params.row[couPolId]==null) {
          //     val = "/";
          // }else{
          val = params.row[couPolId]; //== null ? '--' : params.row[couPolId].toFixedFormat(Decimal);
          // }
          return h(
            "div",
            {
              style: style,
            },
            [
              h(
                "span",
                {
                  style: {
                    color: "white",
                    "padding-right": "3px",
                  },
                },
                val
              ),
            ]
          );
        },
      };

      //实时、分钟，只显示检测值 实时，分钟-瞬时流量 w00000_Cvd
      if (cvdValueFlag.prop == "w00000_Cvd") {
        cvdValueFlag.title = "瞬时流量" + "<br/>" + item.Unit;
      }
      realColumnlist.push(cvdValueFlag);
      //日、显示监测值、排放量、小时流量、累计流量  小时流量，累计流量 w00000_Cou CumulativeFlow
      if (
        item.Code == "w21011" ||
        item.Code == "w21001" ||
        item.Code == "w21003" ||
        item.Code == "w01018" ||
        item.Code == "w00000"
      ) {
        if (couValue.prop == "w00000_Cou") {
          couValue.title = "小时流量" + "<br/>" + "m³/h";
        }
        dayColumnList.push(couValue);
      }
      //小时、月、年，显示检测值、排放量和累计流量  CumulativeFlow
      if (cvdValue.prop == "w00000_Cvd") {
        let CumulativeFlow = {
          prop: "CumulativeFlow",
          title: "累计流量" + "<br/>" + "m³",
          width: "130",
          align: "center",
          sort: colSort,
          render: (h, params) => {
            let val = "";
            let style = {};
            // if ((params.row[DataTime] == '最大值'||params.row[DataTime] == '最小值'||params.row[DataTime] == '平均值'||params.row[DataTime] == '总量')&&params.row[cvdPolId]==null ) {
            //     val = "/";
            // }else{
            val = params.row["CumulativeFlow"]; // == null ? '--' : params.row['CumulativeFlow'].toFixedFormat(Decimal);
            // }
            return h(
              "div",
              {
                style: style,
              },
              [
                h(
                  "span",
                  {
                    style: {
                      color: "white",
                      "padding-right": "3px",
                    },
                  },
                  val
                ),
              ]
            );
          },
        };
        TongJitabcolumnList.push(CumulativeFlow);
        dayColumnList.push(CumulativeFlow);
      } else {
        TongJitabcolumnList.push(cvdValue);
        dayColumnList.push(cvdValue);
      }
      if (
        item.Code == "w21011" ||
        item.Code == "w21001" ||
        item.Code == "w21003" ||
        item.Code == "w01018"
      ) {
        TongJitabcolumnList.push(couValue);
      }

      //周期、显示检测值、瞬时流量 InstantFlow
      if (avgValue.prop == "w00000_Avg") {
        // avgValue.prop = 'InstantFlow';
        // avgValue.title = '瞬时流量' + '<br/>' + item.Unit;
        let InstantFlow = {
          prop: "InstantFlow",
          title: "瞬时流量" + "<br/>" + item.Unit,
          width: "130",
          align: "center",
          sort: colSort,
          render: (h, params) => {
            let val = "";
            let style = {};
            // if ((params.row[DataTime] == '最大值'||params.row[DataTime] == '最小值'||params.row[DataTime] == '平均值'||params.row[DataTime] == '总量')&&params.row[cvdPolId]==null ) {
            //     val = "/";
            // }else{
            val = params.row["InstantFlow"]; //== null ? '--' : params.row['InstantFlow'].toFixedFormat(Decimal);
            // }
            return h(
              "div",
              {
                style: style,
              },
              [
                h(
                  "span",
                  {
                    style: {
                      color: "white",
                      "padding-right": "3px",
                    },
                  },
                  val
                ),
              ]
            );
          },
        };
        lscolumnlist.push(InstantFlow);
      } else {
        lscolumnlist.push(avgValue);
      }
    });

    //   排序
    realColumnlist.sort(function (a, b) {
      return a.sort - b.sort;
    });
    lscolumnlist.sort(function (a, b) {
      return a.sort - b.sort;
    });
    dayColumnList.sort(function (a, b) {
      return a.sort - b.sort;
    });
    TongJitabcolumnList.sort(function (a, b) {
      return a.sort - b.sort;
    });
    console.log("实时分钟", realColumnlist);
    console.log("小时，月年", TongJitabcolumnList);
    console.log("周期", lscolumnlist);
    console.log("日", dayColumnList);
    // TongJitabcolumn.sort(function (a, b) {
    //     return a.sort - b.sort
    // });
    return {
      realColumnlist: realColumnlist, //实时数据表格列
      lscolumnlist: lscolumnlist, //周期测量数据表格列
      TongJitabcolumnList: TongJitabcolumnList, //小时，年月表格列
      dayColumnList: dayColumnList, //日表格列
      TesttableData: [], //表格数据
      MetersData: MetersDatalist, //筛选数据

      // year: moment(new Date()).format("YYYY"),季度数据
      // defaultval: moment(new Date()).format("YYYY-MM").toString(),季度数据

      emptyText: " ",
      dateValue: moment(new Date()).format("YYYY-MM-DD"), //日月年时间控件
      nowdateValue: moment(new Date()).format("YYYY-MM-DD"), //当前时间
      datemMrangeValue: [
        moment(new Date() - 1000 * 3600 * 24 * 1).format("YYYY-MM-DD HH:mm:ss"),
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      ], //实时，分钟，小时，周期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近三十分钟",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 0.5);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      HourpickerOptions: {
        shortcuts: [
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近七天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      columnName: "", //导出列名
      excelTitleName: "监测数据", //excel标题名字
      exportHeader: [], //导出 字段表头
      exportFilterVal: [], //表头对应字段
      exportList: [], //excel数据
      exportTabName: "",
      exportCondition: "",

      pageTotal: 0,
      pageIndex: 1,
      pageSize: 30,
      dateType: "实时数据",
      dateTypeName: "实时数据",
      defaultDateType: 4,
      defaultDateTypeName: "周期测量数据",
      patternOptions: [
        {
          value: 1,
          label: "实时数据",
          dateFormat: "YYYY-MM-DD HH:mm:ss",
        },
        {
          value: 2,
          label: "分钟数据",
          dateFormat: "YYYY-MM-DD HH:mm:00",
        },
        {
          value: 3,
          label: "小时数据",
          dateFormat: "YYYY-MM-DD HH:00:00",
        },
        {
          value: 4,
          label: "周期测量数据",
          dateFormat: "YYYY-MM-DD HH:00:00",
        },
        {
          value: 5,
          label: "日均数据",
          dateFormat: "YYYY-MM-DD",
        },
        {
          value: 6,
          label: "月均数据",
        },
        {
          value: 7,
          label: "年度数据",
        },
      ],
      pictLoading: false,
      tableHeight: null,
      jdData: {},
      jcyz: "",
      jcyzOptions: jcyzQuery,
      radioDiv: "表格",
      myChart: [],
      option: [],
      xAxisData: [],
      yAxisData: [],
      jcyzlegend: [],
      chartSeriesData: [],
      isLoading: false,
      exportData_TJ: [],
    };
  },
  mounted() {
    this.selDataType();
    this.getHeight();
    // this.drawLine();
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    // if (this.dateType == '季度数据') {
    //     this.getTimeVal()
    // }
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
        this.resizeHandle();
      }, 1000);
    },
  },
  methods: {
    // 获取当前季度
    // getTimeVal(res) {
    //     this.jdData = res
    //     if (this.jdData != null) {
    //         this.inquire();
    //     }
    // },

    getHeight() {
      this.tableHeight = window.innerHeight - 226 - 40 - 40;
    },
    // 获取最新数据
    getNewData() {
      this.page = 1;
      if (
        this.defaultDateType == 1 ||
        this.defaultDateType == 2 ||
        this.defaultDateType == 3 ||
        this.defaultDateType == 4
      ) {
        this.datemMrangeValue = [
          moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
          moment().format("YYYY-MM-DD HH:mm:ss"),
        ];
      }
      // else{
      //    this.selDataType();
      // }

      this.inquire();
    },
    //数据查询
    inquire: function () {
      this.pictLoading = true;
      this.emptyText = " ";
      if (
        parseInt(
          new Date(this.datemMrangeValue[1]) -
            new Date(this.datemMrangeValue[0])
        ) /
          (1000 * 60 * 60 * 24) >
        30
      ) {
        this.pictLoading = false;
        this.tableData = [];
        this.emptyText = "暂无数据";
        this.$message({
          message: "时间不能大于30天",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (this.datemMrangeValue == null) {
        this.pictLoading = false;
        this.emptyText = "暂无数据";
        return;
      }
      if (this.dateValue == null) {
        this.pictLoading = false;
        this.emptyText = "暂无数据";
        return;
      }

      //实时、分钟、小时、周期、日、月、年
      this.TesttableData = []; //表格数据源
      this.xAxisData = [];
      // 实时，分钟，小时数据
      if (
        this.defaultDateType == 1 ||
        this.defaultDateType == 2 ||
        this.defaultDateType == 3 ||
        this.defaultDateType == 4
      ) {
        this.getrealData(
          this.defaultDateType,
          this.datemMrangeValue,
          this.pageIndex,
          this.pageSize
        );
      } else if (
        this.defaultDateType == 5 ||
        this.defaultDateType == 6 ||
        this.defaultDateType == 7
      ) {
        this.gettjData(this.defaultDateType, this.dateValue);
      }
    },
    // 获取实时数据
    getrealData(defaultDateType, datemMrangeValue, pageIndex, pageSize) {
      let that = this;
      that.TesttableData = [];

      that.http
        .get("getTablePageData", {
          defaultDateType: defaultDateType,
          startTime: datemMrangeValue[0],
          endTime: datemMrangeValue[1],
          pageIndex: (pageIndex - 1) * pageSize,
          pageSize: pageSize,
        })
        .then((res) => {
          that.pictLoading = false;
          that.pageTotal = 0;
          if (res) {
            if (res[1][0]["dataTotal"] > 0) {
              // 格式化
              res[0].forEach((r) => {
                r.DataTime =
                  r.DataTime == null
                    ? "--"
                    : that.$options.filters.dateFormat(r.DataTime);
                that.MetersData.map(function (item, index) {
                  if (that.defaultDateType == 1 || that.defaultDateType == 2) {
                    r[item.Code + "_Cvd"] =
                      r[item.Code + "_Cvd"] == null
                        ? "--"
                        : r[item.Code + "_Cvd"].toFixedFormat(item.Decimal);
                  } else if (that.defaultDateType == 3) {
                    r[item.Code + "_Cvd"] =
                      r[item.Code + "_Cvd"] == null
                        ? "--"
                        : r[item.Code + "_Cvd"].toFixedFormat(item.Decimal);
                    r[item.Code + "_Cou"] =
                      r[item.Code + "_Cou"] == null
                        ? "--"
                        : r[item.Code + "_Cou"].toFixedFormat(item.Decimal);
                  } else if (that.defaultDateType == 4) {
                    r[item.Code + "_Avg"] =
                      r[item.Code + "_Avg"] == null
                        ? "--"
                        : r[item.Code + "_Avg"].toFixedFormat(item.Decimal);
                  }
                });

                //x轴
                that.xAxisData.push(r.DataTime);
              });
              that.xAxisData.reverse();
              // 赋值到表格
              that.TesttableData = res[0];

              that.pageTotal = res[1][0]["dataTotal"];
            } else {
              that.emptyText = "暂无数据";
            }
            that.radioChange();
          }
        })
        .catch((res) => {
          that.$message.error("服务端错误");

          console.log("error", res);
        });
    },
    // 获取统计数据
    gettjData(defaultDateType, condition) {
      let that = this;
      that.TesttableData = [];
      that.http
        .get("getTJData", {
          defaultDateType: defaultDateType,
          condition: condition,
        })
        .then((res) => {
          if (res.length > 4) {
            res.forEach((r) => {
              if (that.defaultDateType == 5 && r.DataTime.indexOf(":") > -1) {
                r.DataTime = null
                  ? "--"
                  : that.$options.filters.dateFormat(r.DataTime);
              } else if (
                that.defaultDateType == 6 &&
                r.DataTime.indexOf(":") > -1
              ) {
                r.DataTime = null
                  ? "--"
                  : that.$options.filters.monthdateFormat(r.DataTime);
              } else if (
                that.defaultDateType == 7 &&
                r.DataTime.indexOf(":") > -1
              ) {
                //|| that.defaultDateType == "季度数据"
                r.DataTime = null
                  ? "--"
                  : that.$options.filters.yeardateFormat(r.DataTime);
              }
              that.MetersData.map(function (item, index) {
                r[item.Code + "_Cvd"] =
                  r[item.Code + "_Cvd"] == null
                    ? "--"
                    : r[item.Code + "_Cvd"].toFixedFormat(item.Decimal);
                r[item.Code + "_Cou"] =
                  r[item.Code + "_Cou"] == null
                    ? "--"
                    : r[item.Code + "_Cou"].toFixedFormat(item.Decimal);

                if (item.Code == "w00000" && that.defaultDateType == 5) {
                  r["CumulativeFlow"] =
                    r["CumulativeFlow"] == null
                      ? "--"
                      : r["CumulativeFlow"].toFixedFormat(item.Decimal);
                }
              });
              //x轴
              that.xAxisData.push(r.DataTime);
            });
            that.TesttableData = res;
            that.exportData_TJ = res;
          } else {
            that.TesttableData = [];
            that.exportData_TJ = [];
          }
          that.radioChange();
        })
        .catch((res) => {
          console.log("errorMsg=", res);
          that.$message.error("服务端错误");
        });
    },

    // 图表数据处理
    radioChange: function () {
      let that = this;
      this.yAxisData = [];
      this.jcyzlegend = [];
      var offsetList = [0, -40, -80, -120, 0, -40, -80, -120, -160];
      var colorList = [
        "#2fe99c",
        "#468ef0",
        "#ad40e6",
        "#00bff4",
        "#ffc84f",
        "#879a5f",
        "#f274c5",
        "#7ba9b6",
        "#fe8a7d",
        "#c5a86f",
        "#008aa7",
        "#ea8ef8",
        "#45a99a",
        "#ffe47a",
        "#7666be",
      ];
      if (that.radioDiv == "图表") {
        if (that.TesttableData.length > 0) {
          that.jcyzOptions = [];
          if (that.defaultDateType == 1 || that.defaultDateType == 2) {
            that.realColumnlist.map(function (item) {
              // if(item.prop=='w00000_Cvd'){
              //     let objs={
              //     value: 'w00000_Cvd',
              //     label: '瞬时流量'
              //   }
              // }
              let objs = {
                value: item.prop,
                label: item.title.substring(0, item.title.indexOf("<")),
              };
              that.jcyzOptions.push(objs);
            });
          } else if (that.defaultDateType == 3) {
            that.TongJitabcolumnList.map(function (item) {
              if (item.prop == "CumulativeFlow") {
                let objs = {
                  value: "CumulativeFlow",
                  label: "累计流量",
                };
                that.jcyzOptions.push(objs);
              } else {
                let objs = {
                  value: item.prop,
                  label: item.title.substring(0, item.title.indexOf("<")),
                };
                that.jcyzOptions.push(objs);
              }
            });
          } else if (that.defaultDateType == 4) {
            that.lscolumnlist.map(function (item) {
              if (item.prop == "InstantFlow") {
                let objs = {
                  value: "InstantFlow",
                  label: "瞬时流量",
                };
                that.jcyzOptions.push(objs);
              } else {
                let objs = {
                  value: item.prop,
                  label: item.title.substring(0, item.title.indexOf("<")),
                };
                that.jcyzOptions.push(objs);
              }
            });
          }

          // 清空数据
          that.chartSeriesData = [];
          // if (that.jcyz == "") {
          for (let i = 1; i < that.jcyzOptions.length; i++) {
            // 填充因子图列
            that.jcyzlegend.push(that.jcyzOptions[i].label);
            var avgCount = (that.jcyzOptions.length - 1) / 2;
            let yAxis = {};
            if (i < avgCount) {
              yAxis = {
                // name: that.jcyzOptions[i].label,
                type: "value",
                // axisLabel: {
                //     color: "#cccccc",
                // },
                splitLine: {
                  show: false,
                },
                axisLine: {
                  //y轴线的颜色以及宽度
                  lineStyle: {
                    color: colorList[i - 1],
                    width: 1,
                    type: "dashed",
                  },
                },
                axisTick: {
                  inside: true,
                },
                position: "left",
                offset: offsetList[i - 1],
              };
            } else {
              yAxis = {
                // name: that.jcyzOptions[i].label,
                type: "value",
                // axisLabel: {
                //     color: "#cccccc",
                // },
                splitLine: {
                  show: false,
                },
                axisLine: {
                  //y轴线的颜色以及宽度
                  lineStyle: {
                    color: colorList[i - 1],
                    width: 1,
                    type: "dashed",
                  },
                },
                axisTick: {
                  inside: true,
                },
                position: "right",
                offset: offsetList[i - 1],
              };
            }
            // 对应因子的y轴

            that.yAxisData.push(yAxis);

            // 赋值chart数据
            var datas = [];
            let TesttableData = that.TesttableData;
            for (let k = 0; k < TesttableData.length; k++) {
              //   if (that.defaultDateType == 4) {
              datas.push(TesttableData[k][that.jcyzOptions[i].value] || "-"); //+ "_Avg"

              // } else {
              //     datas.push(that.TesttableData[k][that.jcyzOptions[i].value ] || '-');//+ "_Cvd"
              // }
            }

            let obj = {
              name: that.jcyzOptions[i].label,
              type: "line",
              data: datas.reverse(),
              symbol: "circle",
              yAxisIndex: i - 1,
            };
            that.chartSeriesData.push(obj); //series
          }
          // }
          // else {
          //     let yAxisFactor = that.socketApi.globalDataConfig.getCodeNameData(that.jcyz);
          //     if (yAxisFactor == 'w00000') {
          //         yAxisFactor = '流量';
          //     }
          //     let yAxis = {
          //         name: yAxisFactor,
          //         type: "value",
          //         axisLabel: {
          //             color: "#cccccc",
          //         },
          //         splitLine: {
          //             show: true,
          //         },
          //         axisLine: {
          //             //y轴线的颜色以及宽度
          //             lineStyle: {
          //                 color: "#fff",
          //                 width: 1,
          //                 type: "solid",
          //             },
          //         },
          //     };
          //     that.yAxisData.push(yAxis);
          //     let datas = [];
          //     that.jcyzlegend.push(yAxisFactor)
          //     for (let k = 0; k < that.TesttableData.length; k++) {
          //         if (that.defaultDateType == "小时数据") {
          //             datas.push(that.TesttableData[k][that.jcyz + "_Avg"]);

          //         } else {
          //             datas.push(that.TesttableData[k][that.jcyz + "_Cvd"]);

          //         }
          //     }
          //     let obj = {
          //         name: yAxisFactor,
          //         type: "line",
          //         data: datas,
          //         symbol: "circle",
          //         smooth: true
          //     };
          //     that.chartSeriesData.push(obj); //series
          // }
          console.log("图表数据", that.chartSeriesData);
          console.log("图表y轴数据", that.yAxisData);
          that.chartSeriesData.reverse(); //series

          // console.log("shijian ", that.xAxisData);
          let $that = that;
          setTimeout(() => {
            $that.chartShow();
          }, 100);
        } else {
          var html =
            "<div><span style='color:#cccccc;position:absolute;top:53%;left:48%;background-color:#303a4c'>暂无数据</span></div>";
          document.getElementById("myChart").innerHTML = html;
          document
            .getElementById("myChart")
            .removeAttribute("_echarts_instance_");
        }
      }
      //chart数据源
    },
    resizeHandle() {
      if (this.myChart.length > 0) this.myChart.resize();
    },
    chartShow: function () {
      // this.jcyzlegend = [];
      // this.jcyzOptions.forEach((r) => {
      //     this.jcyzlegend.push(this.funfactor(r));
      // });

      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));

      this.option = {
        title: {
          text: "多因子曲线分析",
          textStyle: {
            color: "#fff",
          },
          padding: [20, 20, 10, 50], // 位置
        },
        backgroundColor: "#303a4c",
        tooltip: {
          trigger: "axis",
          backgroundColor: "#3c4c6a",
          textStyle: {
            color: "#fff",
          },
          // formatter: function (params) {
          //     // var aa= params.reverse();
          //     // return params;
          // },
          axisPointer: {
            type: "cross",

            lineStyle: {
              color: "#376df4",
              width: 2,
              opacity: 1,
            },
            label: {
              backgroundColor: "#3c4c6a",
              color: "#cccccc",
            },
          },
        },
        toolbox: {
          //可视化的工具箱
          show: true,
          feature: {
            dataView: {
              //数据视图
              show: true,
            },
            restore: {
              //重置
              show: true,
            },
            dataZoom: {
              //数据缩放视图
              show: true,
            },
            saveAsImage: {
              //保存图片
              show: true,
            },
            magicType: {
              //动态类型切换
              type: ["bar", "line"],
            },
          },
        },
        //
        color: [
          "#2fe99c",
          "#468ef0",
          "#ad40e6",
          "#00bff4",
          "#ffc84f",
          "#879a5f",
          "#f274c5",
          "#7ba9b6",
          "#fe8a7d",
          "#c5a86f",
          "#008aa7",
          "#ea8ef8",
          "#45a99a",
          "#ffe47a",
          "#7666be",
        ],
        legend: {
          data: this.jcyzlegend,
          textStyle: {
            color: "#fff",
          },
          top: 40,
        },
        grid: {
          // top: "15%",
          // left: "3%",
          // right: "2%",
          // bottom: "5%",
          x: "4%",
          x2: "4%",
          y: "15%",
          // right: '1%',
          y2: "7%",
          // width:'100%',
          // containLabel: true,
        },
        // 滚动条缩放
        // dataZoom: [
        //     {
        //         type: "slider",
        //         xAxisIndex: 0,
        //         filterMode: "empty",
        //         textStyle: { color: "#fff" },
        //         borderColor: "#455474",
        //         backgroundColor: "#455474",
        //         fillerColor: "#2e3f62",
        //         // filterMode: 'filter',
        //     },
        //     {
        //         type: "slider",
        //         yAxisIndex: 0,
        //         filterMode: "empty",
        //         textStyle: { color: "#fff" },
        //         borderColor: "#455474",
        //         backgroundColor: "#455474",
        //         fillerColor: "#2e3f62",
        //     },
        //     {
        //         type: "inside",
        //         xAxisIndex: 0,
        //         filterMode: "empty",
        //         throttle: 20
        //     },
        // ],
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: this.xAxisData,
          boundaryGap: false,
          axisLine: {
            //y轴线的颜色以及宽度
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#cccccc",
            formatter: function (value) {
              var temp =
                value.substring(0, 10) + "\n" + value.substring(11, 120);
              return temp;
            },
          },
        },
        yAxis: this.yAxisData,
        //  [
        //     {
        //         name: "总氮",
        //         type: "value",
        //         axisLabel: {
        //             color: "#cccccc",
        //         },
        //         splitLine: {
        //             show: true,
        //         },
        //         axisLine: {
        //             //y轴线的颜色以及宽度
        //             lineStyle: {
        //                 color: "#fff",
        //                 width: 1,
        //                 type: "solid",
        //             },
        //         },
        //     },
        // ],
        series: this.chartSeriesData,
      };

      if (this.chartSeriesData.length != 0) {
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
        this.myChart.clear();

        this.myChart.setOption(this.option);
      }
      // else {
      //     var html =
      //         "<div><span style='color:#cccccc;position:absolute;top:30%;left:45%'>暂无数据</span></div>";
      //     document.getElementById("myChart").innerHTML = html;
      //     document
      //         .getElementById("myChart")
      //         .removeAttribute("_echarts_instance_");
      // }
    },
    //数据导出
    exportData() {
      //   alert(this.defaultDateType);
      //   alert(this.realColumnlist.map((m) => m.title));
      let that = this;
      that.pictLoading = true;
      var excelHeader = [];
      if (that.defaultDateType <= 2) {
        excelHeader = that.realColumnlist;
      } else if (
        that.defaultDateType == 3 ||
        that.defaultDateType == 6 ||
        that.defaultDateType == 7
      ) {
        excelHeader = that.TongJitabcolumnList;
      } else if (that.defaultDateType == 4) {
        excelHeader = that.lscolumnlist;
      } else if (that.defaultDateType == 5) {
        excelHeader = that.dayColumnList;
      }
      //如果报表是 日、月、年，则直接获取当前数据源进行导出
      if (that.defaultDateType >= 5) {
        that.DataToExcel({
          FileName: that.patternOptions.filter(
            (m) => m.value == that.defaultDateType
          )[0].label,
          ExcelHeader: excelHeader.map((m) => m.title),
          SqlColumns: excelHeader.map((m) => m.prop),
          ExportDatas: this.exportData_TJ,
        });
        that.pictLoading = false;
        return false;
      }

      //   console.log("ExcelHeader=", excelHeader);
      //   console.log("SqlColumns=", sqlColumns);
      //   return;
      // 如果报表是 实时、分钟、小时、周期测量，则需要请求数据库，获取所有数据进行导出
      that.http
        .get("getTablePageData", {
          defaultDateType: that.defaultDateType,
          startTime: that.datemMrangeValue[0],
          endTime: that.datemMrangeValue[1],
          pageIndex: 0,
          pageSize: 0,
        })
        .then((res) => {
          that.pictLoading = false;
          if (res) {
            if (res && res.length > 0) {
              // 格式化
              res.forEach((r) => {
                r.DataTime =
                  r.DataTime == null
                    ? "--"
                    : that.$options.filters.dateFormat(r.DataTime);
                that.MetersData.map(function (item, index) {
                  if (that.defaultDateType == 1 || that.defaultDateType == 2) {
                    r[item.Code + "_Cvd"] =
                      r[item.Code + "_Cvd"] == null
                        ? "--"
                        : r[item.Code + "_Cvd"].toFixedFormat(item.Decimal);
                  } else if (that.defaultDateType == 3) {
                    r[item.Code + "_Cvd"] =
                      r[item.Code + "_Cvd"] == null
                        ? "--"
                        : r[item.Code + "_Cvd"].toFixedFormat(item.Decimal);
                    r[item.Code + "_Cou"] =
                      r[item.Code + "_Cou"] == null
                        ? "--"
                        : r[item.Code + "_Cou"].toFixedFormat(item.Decimal);
                  } else if (that.defaultDateType == 4) {
                    r[item.Code + "_Avg"] =
                      r[item.Code + "_Avg"] == null
                        ? "--"
                        : r[item.Code + "_Avg"].toFixedFormat(item.Decimal);
                  }
                });
              });
              that.DataToExcel({
                FileName: that.patternOptions.filter(
                  (m) => m.value == that.defaultDateType
                )[0].label,
                ExcelHeader: excelHeader.map((m) => m.title),
                SqlColumns: excelHeader.map((m) => m.prop),
                ExportDatas: res,
              });
            } else {
              that.$message.error("导出失败，数据不能为空");
            }
          }
        })
        .catch((res) => {
          that.$message.error("服务端错误");

          console.log("exportDataError:", res);
        });
    },
    //分页
    currentPage(val) {
      this.pageIndex = val;
      this.inquire();
    },
    changeSize(val) {
      this.pageSize = val;
      this.inquire();
    },

    // 切换数据类型查询
    selDataType: function () {
      this.pageIndex = 1;
      // alert(this.defaultDateType);
      this.dateValue = this.nowdateValue;

      if (this.defaultDateType == 6) {
        this.radioDiv = "表格";
        this.radioChange();

        this.dateValue = this.dateValue.substring(0, 7);
      }
      if (this.defaultDateType == 7) {
        this.radioDiv = "表格";
        this.radioChange();

        this.dateValue = this.dateValue.substring(0, 4);
      }
      if (this.defaultDateType == 5) {
        this.radioDiv = "表格";
        this.radioChange();
      }

      this.inquire();
    },
  },
};
</script>
<style scoped>
/* 表格header */
.el-table .cell {
  line-height: 15px !important;
}

/* 时间控件 */
.el-date-editor .el-range__close-icon {
  width: 0;
  height: 0;
}

#myChart {
  /* width: 98%; */
  height: calc(100vh - 180px);
  min-height: 450px;
  /* background-color: pink; */
  /* position:relative; */
}

/* .converBox { */
/* margin: 0 20px; */
/* background-color: #303a4c; */
/* background-color: #ffffff; */

/* position:  absolute; */
/* } */

@media only screen and (max-width: 1024px) {
  .el-col-sm-2 {
    width: 20%;
    padding-top: 10px;
  }

  .el-col-sm-2 {
    width: 15%;
    /* padding-top: 10px; */
  }

  .el-col-lg-3 {
    width: 14% !important;
  }

  .el-col-sm-5 {
    width: 22% !important;
  }

  .el-col-md-6 {
    width: 33%;
  }

  .el-col-sm-7 {
    width: 27.16667%;
  }

  #myChart {
    /* width: 98%; */
    height: calc(100vh - 220px);
    /* background-color: pink; */
    /* position:relative; */
  }
}

@media only screen and (max-width: 1366px) {
  .el-col-sm-2 {
    width: 20%;
    /* padding-top: 10px; */
  }

  .el-col-lg-3 {
    width: 15.5%;
  }

  .el-col-md-6 {
    width: 25%;
  }

  .el-col-sm-7 {
    width: 18.16667%;
  }

  #myChart {
    /* width: 98%; */
    height: calc(100vh - 220px);
    /* background-color: pink; */
    /* position:relative; */
  }
}

.el-table td,
.el-table th {
  padding: 1px 0px;
}

/* .has-gutter .cell span {
      margin-top: 3px;
      display: block;
      font-size: 8px;
    } */

/* 表格值 */
.value {
  color: #ffffff;
  font-size: 14px;
}

/* 表格标识 */
.flag {
  /* float: right; */
  color: #da666e;
  font-size: 14px;
  /* position: absolute; */
  /* right: 25px; */
  /* top: 3px; */
}

.flags {
  /* float: right; */
  color: #ffffff;
  font-size: 14px;
  /* position: absolute; */
  /* right: 25px; */
  /* top: 3px; */
}

.lend label {
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}

.jdsj .el-input__inner {
  color: #999999 !important;
  font-size: 14px;
  font-weight: normal;
}

/* 时间框显示 */
.el-date-range-picker__time-header .el-input__inner {
  color: #000 !important;
}
</style>