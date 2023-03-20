<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <!-- :sm="8" :md="8" :lg="6" :xl="4"  -->
              <el-col :sm="12" :md="12" :lg="8" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker v-model="datemMrangeValue" type="datetimerange" :picker-options="pickerOptions"
                  :clearable="false" style="width:83%" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" size="small"
                  @change="getTableData" unlink-panels>
                  <!-- value-format="yyyy-MM-dd HH" -->
                </el-date-picker>
              </el-col>
              <el-col :sm="6" :xs="6" :md="5" :xl="4">
                <label class="rwlx">数据类型</label>
                <el-select v-if="SoftType==32" v-model="defaultDataType" placeholder="请选择" @change="changeDataType"
                  style="width: 60%" size="small">
                  <el-option v-for="item in dataTypes" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-else v-model="defaultDataType" placeholder="请选择" @change="changeDataType"
                  style="width: 60%" size="small">
                  <el-option v-for="item in dataTypes" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="6" :xs="6" :md="5" :xl="4">
                <label class="rwlx">因子</label>
                <el-select size="small" style="width: 75%" v-model="jcyz" placeholder="请选择" @change="factorChange">
                  <el-option v-for="item in jcyzOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div v-if="SoftType==32" style="height: 40px;background-color:#313a4d ;margin: 0px 20px;">
      <el-row class="lend" style="text-align: center;line-height: 40px; ">
        <el-col :span='2'>
          <label> N</label><label> 正常</label>
        </el-col>
        <el-col :span='2'>
          <label> T</label><label> 超上限</label>
        </el-col>
        <!-- <el-col :span='2'>
              <label> L</label><label> 超下限</label>
          </el-col> -->

        <el-col :span='3'>
          <label> C</label><label> 校准状态</label>
        </el-col>

        <el-col :span='3'>
          <label> D</label><label> 仪器故障</label>
        </el-col>
        <el-col :span='3'>
          <label> B</label><label> 通讯异常</label>
        </el-col>
        <el-col :span='4'>
          <label> F</label><label> 仪器通信故障</label>
        </el-col>
        <el-col :span='4'>
          <label> M</label><label> 维护调试数据</label>
        </el-col>

      </el-row>
    </div>
    <div v-else style="height: 40px;background-color:#313a4d ;margin: 0px 20px;">
      <el-row class="lend" style="text-align: center;line-height: 40px; ">
        <el-col :span='2'>
          <label> N</label><label> 正常</label>
        </el-col>
        <el-col :span='2'>
          <label> T</label><label> 超上限</label>
        </el-col>
        <el-col :span='2'>
          <label> L</label><label> 超下限</label>
        </el-col>

        <el-col :span='2'>
          <label> lr</label><label> 缺试剂</label>
        </el-col>
        <el-col :span='2'>
          <label> lp</label><label> 缺纯水</label>
        </el-col>
        <el-col :span='2'>
          <label> lw</label><label> 缺水样</label>
        </el-col>
        <el-col :span='2'>
          <label> ls</label><label> 缺标样</label>
        </el-col>
        <el-col :span='3'>
          <label> D</label><label> 仪器故障</label>
        </el-col>
        <el-col :span='3'>
          <label> F</label><label> 仪器通信故障</label>
        </el-col>
        <el-col :span='3'>
          <label> M</label><label> 维护调试数据</label>
        </el-col>
      </el-row>
    </div>

    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="jcsjdata">
          <eleTable :columns="tableColumn" :list="tableData" :height="tableHeight">
          </eleTable>

          <div class="pageNations">
            <el-pagination @current-change="currentPage" class="pageNation" layout="total,sizes,prev, pager, next"
              :page-size="pageSize" :page-sizes="[5, 10, 20, 30, 50]" @size-change="changeSize"
              :current-page="pageIndex" :total="pageTotal">
            </el-pagination>
            <!-- <excel :excelTitleName='excelTitleName' :exportHeader='exportHeader' :exportFilterVal='exportFilterVal'
              :exportList='exportList'></excel> -->
            <el-button size="small" @click="exportData" type="primary"
              style="float: left; margin-top: 8px; margin-left: 15px" :loading="isLoading">
              导出
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import tables from "../module/tables";
  import excel from "../module/excel";
  import eleTable from "../module/renderTable";
  // import echartType from "@config/lssjConfig";
  import moment from "moment";

  export default {
    name: "zkcx",
    components: { excel, eleTable },
    data() {
      let jcyzQuery = [
        { value: "", label: "全部" },
        //   { value: "w00000", label: "系统" },
      ]
      // MetersWC()
      let MetersData = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter(
        (m) =>
          m.ID != "realFlow" &&
          m.ID != "CumulativeFlow" &&
          m.ID != "DaQiWenDu" &&
          m.ID != "DaQiShiDu"

      );
      // this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.ID != 'realFlow' && m.ID != 'CumulativeFlow' && m.ID != 'DaQiWenDu' && m.ID != 'DaQiShiDu')
      MetersData.map(function (item, index) {

        let obj = {
          value: item.Code,
          label: item.Name
        }
        // if (item.Name != "藻密度" && item.Name != "叶绿素") {
        jcyzQuery.push(obj);
        // }

      })
      return {
        SoftType: JSON.parse(localStorage.getItem("softType")),
        MetersData: MetersData,
        emptyText: " ",
        jcyz: "",
        jcyzOptions: jcyzQuery,

        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        datemMrangeValue: [
          moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss"),
          moment().format("YYYY-MM-DD HH:mm:ss"),
        ],

        columnName: "", //列名

        pictLoading: false,
        tableHeight: 300,

        defaultDataType: 1,
        dataTypes: [],
        tableColumn: [],
        tableData: [], //报表数据
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 30,
        isLoading: false,
      };
    },
    mounted() {
      
      this.getTableData();
      this.getHeight();
    },
    created() {
      this.getTableColumn();
      window.addEventListener('resize', this.getHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    },
    methods: {

      getHeight() {
        this.tableHeight = window.innerHeight - 226 - 40 - 40
      },

      factorChange() {
        this.pageIndex = 1;
        this.getTableData();
      },
      changeDataType() {
        // debugger
        this.pageIndex = 1;
        this.tableColumn = this.dataTypes.filter(m => m.value == this.defaultDataType)[0].tableColumn;
        this.getTableData();
      },
      getTableData() {
        let that = this;
        this.pictLoading = true;
        that.tableData = [];
        that.http
          .get("getZkcxTable", {
            defaultDataType: that.defaultDataType,
            startTime: that.datemMrangeValue[0],
            endTime: that.datemMrangeValue[1],
            jcyz: that.jcyz,
            pageIndex: (that.pageIndex - 1) * that.pageSize,
            pageSize: that.pageSize,
          })
          .then((res) => {
            // debugger
            that.pageTotal = 0;

            if (res) {
              if (res[1][0]["dataTotal"] > 0) {
                // 格式化
                res[0].forEach((r) => {
                  debugger
                  r.DataTime =
                    r.DataTime == null
                      ? "--"
                      : that.$options.filters.dateFormat(r.DataTime);
                  r.WaterTime =
                    r.WaterTime == null
                      ? "--"
                      : that.$options.filters.dateFormat(r.WaterTime);
                  if (r.Pol == 'w00000') {
                    r.Pol = '流量';
                  } else {
                    r.Pol = this.socketApi.globalDataConfig.getCodeNameData(r.Pol);
                  }

                });

                // 赋值到表格
                that.tableData = res[0];

                that.pageTotal = res[1][0]["dataTotal"];
              } else {
                that.emptyText = "暂无数据";
                that.pageTotal = 0;

              }
            }
            that.pictLoading = false;
          })
          .catch((res) => {
            that.$message.error("服务端错误");
            that.pictLoading = false;
            console.log("error", res);
          });
      },

      //数据导出
      exportData() {
        let that = this;
        // 报表请求数据库，获取所有数据进行导出
        that.isLoading = true;

        that.http
          .get("getZkcxTable", {
            defaultDataType: that.defaultDataType,
            startTime: that.datemMrangeValue[0],
            endTime: that.datemMrangeValue[1],
            jcyz: that.jcyz,
            pageIndex: 0,
            pageSize: 0,
          })
          .then((res) => {
            if (res) {
              that.isLoading = false;

              if (res && res.length > 0) {
                // 格式化
                res.forEach((r) => {
                  r.DataTime =
                    r.DataTime == null
                      ? "--"
                      : that.$options.filters.dateFormat(r.DataTime);
                  r.WaterTime =
                    r.WaterTime == null
                      ? "--"
                      : that.$options.filters.dateFormat(r.WaterTime);
                  r.Pol = this.socketApi.globalDataConfig.getCodeNameData(r.Pol);
                  if (that.defaultDataType == 8) {
                    if (r.CheckType == 8) {
                      r.CheckType = '空白校准'
                    } else if (r.CheckType == 9) {
                      r.CheckType = '标样校准'
                    } else {
                      r.CheckType = ''
                    }
                    if (r.CheckResult == 0) {
                      r.CheckResult = '无校准';
                    } else if (r.CheckResult == 1) {
                      r.CheckResult = '校准成功';
                    } else if (r.CheckResult == 2) {
                      r.CheckResult = '校准失败';
                    }
                  }
                  if (that.defaultDataType == 2) {
                    if (r.Result == 1) {
                      r.Result = '合格';
                    } else if (r.Result == 0) {
                      r.Result = '不合格';
                    } else {
                      r.Result = '未知';
                    }
                  }
                });

                that.DataToExcel({
                  FileName: that.dataTypes.filter(
                    (m) => m.value == that.defaultDataType
                  )[0].label,
                  ExcelHeader: that.tableColumn.map((m) => m.title),
                  SqlColumns: that.tableColumn.map((m) => m.prop),
                  ExportDatas: res,
                });
              } else {
                that.$message.error("导出失败，数据不能为空");
              }
            }
          })
          .catch((res) => {
            that.$message.error("服务端错误");
            that.isLoading = false;
            console.log("exportDataError:", res);
          });
      },

      //分页
      currentPage(val) {
        this.pageIndex = val;
        this.getTableData();
      },
      changeSize(val) {
        this.pageSize = val;
        this.getTableData();
      },
      formatRender(h, params, prop, gjcs) {
        //关键参数，特殊处理
        let val = "";
        if (params.row[prop] != 0) {
          val = !params.row[prop] ? '--' : params.row[prop];
        } else {
          val = params.row[prop]
        }
        if (val != '--') {
          let pol = this.MetersData.filter(m => m.Name == params.row['Pol']);
          if (pol.length > 0) {
            val = val.toFixedFormat(pol[0].Decimal);
          }
        }


        let Flag = params.row['Flag'];
        let style = {};
        if (Flag == "N") {
          style.color = "#fff";
        } else {
          style.color = "#da666e";
        }

        if (gjcs == 1) {
          return h(
            "div", {},
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
              '',
            ]
          );
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
      getTableColumn() {
        let that = this;
        that.dataTypes = [];
        let _params = [{
          prop: "i13010",
          title: "信号值",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13010', 1)
          }
        },
        {
          prop: "Flag",
          title: "标识",
          show: false
        },
        {
          prop: "i13008",
          title: "斜率",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13008', 1)
          }
        },
        {
          prop: "i13007",
          title: "截距",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13007', 1)
          }
        },
        {
          prop: "i13009",
          title: "检出限",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13009', 1)
          }
        },
        {
          prop: "i13001",
          title: "量程",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13001', 1)
          }
        },
        {
          prop: "i13002",
          title: "精度",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13002', 1)
          }
        },
        {
          prop: "i13005",
          title: "消解/显色时间",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13005', 1)
          }
        },
        {
          prop: "i13004",
          title: "消解/显色温度",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13004', 1)
          }
        },
        {
          prop: "i13011",
          title: "线性系数",
          render: (h, params) => {
            return this.formatRender(h, params, 'i13011', 1)
          }
        }];



        let biaoyang = [
          {
            prop: "DataTime",
            title: "时间",
            width: '180'
          },
          {
            prop: "Pol",
            title: "因子",
            width: '130'
          },
          {
            prop: "Check",
            title: "数据",
            width: '130',
            render: (h, params) => {
              return this.formatRender(h, params, 'Check')
            }
          },
          {
            prop: "StandardValue",
            title: "标样浓度",
            width: '130',
            render: (h, params) => {
              return this.formatRender(h, params, 'StandardValue')
            }
          },];
        let biaoyang32 = [{
          prop: "DataTime",
          title: "时间",
          width: '180'
        },
        {
          prop: "Pol",
          title: "因子",
          width: '130'
        },
        {
          prop: "Check",
          title: "数据",
          width: '130',
          render: (h, params) => {
            return this.formatRender(h, params, 'Check')
          }
        },
        // {
        //   prop: "StandardValue",
        //   title: "标样浓度",
        //   width: '130',
        //   render: (h, params) => {
        //     return this.formatRender(h, params, 'StandardValue', 1)
        //   }
        // },
        {
          prop: "Result",
          title: "核查结果",
          width: '130',
          render: (h, params) => {
            let val = "";
            if (params.row["Result"] == 1) {
              val = '合格';
            } else if (params.row["Result"] == 0) {
              val = '不合格';
            } else {
              val = '未知';
            }

            //  val = params.row["Result"] == 0 ? '不合格' : '合格';
            return h(
              "div", {},
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
                '',
              ]
            );
          }
        }];


        that.dataTypes = [
          {
            value: 1,
            label: "水样测量",
            tableColumn: [{
              prop: "DataTime",
              title: "时间",
              width: '180',

            },
            {
              prop: "Pol",
              title: "因子",
              width: '130',

            },
            {
              prop: "Flag",
              title: "标识",
              show: false
            },

            {
              prop: "Avg",
              title: "数据",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'Avg')
              }
            },
            {
              prop: "StandardValue",
              title: "标样浓度",
              render: (h, params) => {
                return this.formatRender(h, params, 'StandardValue', 1)
              }
            }
            ]
          },
          {
            value: 2,
            label: "标样核查",
            tableColumn: that.SoftType == 32 ? biaoyang32 : biaoyang
          },
          {
            value: 3,
            label: "零点核查",
            tableColumn: [{
              prop: "DataTime",
              title: "时间",
              width: '180'

            },
            {
              prop: "Pol",
              title: "因子",
              width: '130'

            },
            {
              prop: "Check",
              title: "数据",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'Check')
              }
            },
            {
              prop: "StandardValue",
              title: "标样浓度",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'StandardValue', 1)
              }

            },
            {
              prop: "SpanValue",
              title: "跨度值",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'SpanValue', 1)
              }
            },
            {
              prop: "Result",
              title: "零点核查结果",
              width: '130',
              render: (h, params) => {
                let val = "";
                if (params.row["Result"] == 1) {
                  val = '合格';
                } else if (params.row["Result"] == 0) {
                  val = '不合格';
                } else {
                  val = '未知';
                }
                return h(
                  "div", {},
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
                    '',
                  ]
                );
              }
            }, {
              prop: "ErrVal",
              title: "零点误差值",
              width: '130',
              render: (h, params) => {
                let val = "";
                debugger
                if (params.row['ErrVal'] != 0) {
                  val = !params.row['ErrVal'] ? '--' : params.row['ErrVal'].toFixedFormat(2);
                } else {
                  val = params.row['ErrVal'];
                }

                let ErrUnit = params.row['ErrUnit'];

                return h(
                  "div",
                  {},
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
                    ErrUnit,
                  ]
                );
              }
            }, {
              prop: "DriftResult",
              title: "24小时零点漂移核查结果",
              width: '110',
              render: (h, params) => {
                let val = "";
                if (params.row["DriftResult"] == 1) {
                  val = '合格';
                } else if (params.row["DriftResult"] == 0) {
                  val = '不合格';
                } else {
                  val = '未知';
                }
                return h(
                  "div", {},
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
                    '',
                  ]
                );
              }
            }, {
              prop: "DriftErrVal",
              title: "24小时零点漂移核查误差(%)",
              width: '110',
              render: (h, params) => {
                return this.formatRender(h, params, 'DriftErrVal', 1)
              }
            },
            ]
          },
          {
            value: 4,
            label: "跨度核查",
            tableColumn: [{
              prop: "DataTime",
              title: "时间",
              width: '180'

            },
            {
              prop: "Pol",
              title: "因子",
              width: '130'

            },
            {
              prop: "Check",
              title: "数据",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'Check')
              }


            },
            {
              prop: "StandardValue",
              title: "标样浓度",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'StandardValue', 1)
              }

            },
            {
              prop: "SpanValue",
              title: "跨度值",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'SpanValue', 1)
              }

            },
            {
              prop: "Result",
              title: "跨度核查结果",
              width: '130',
              render: (h, params) => {
                let val = "";
                if (params.row["Result"] == 1) {
                  val = '合格';
                } else if (params.row["Result"] == 0) {
                  val = '不合格';
                } else {
                  val = '未知';
                }
                return h(
                  "div", {},
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
                    '',
                  ]
                );
              }
            }, {
              prop: "ErrVal",
              title: "跨度误差值",
              width: '130',
              render: (h, params) => {
                let val = "";

                if (params.row['ErrVal'] != 0) {
                  val = !params.row['ErrVal'] ? '--' : params.row['ErrVal'].toFixedFormat(2);
                } else {
                  val = params.row['ErrVal'];
                }
                // let val = !params.row['ErrVal'] ? '--' : params.row['ErrVal'].toFixedFormat(2);
                let ErrUnit = params.row['ErrUnit'];

                return h(
                  "div",
                  {},
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
                    ErrUnit,
                  ]
                );
              }
            }, {
              prop: "DriftResult",
              title: "24小时跨度漂移核查结果",
              width: '110',
              render: (h, params) => {
                let val = "";
                if (params.row["DriftResult"] == 1) {
                  val = '合格';
                } else if (params.row["DriftResult"] == 0) {
                  val = '不合格';
                } else {
                  val = '未知';
                }
                return h(
                  "div", {},
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
                    '',
                  ]
                );
              }
            }, {
              prop: "DriftErrVal",
              title: "24小时跨度漂移核查误差(%)",
              width: '110',
              render: (h, params) => {
                return this.formatRender(h, params, 'DriftErrVal', 1)
              }
            },
            ]
          },
          {
            value: 5,
            label: "空白测试",
            tableColumn: [{
              prop: "DataTime",
              title: "时间",
              width: '180'

            },
            {
              prop: "Pol",
              title: "因子",
              width: '130'

            },
            {
              prop: "Check",
              title: "数据",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'Check')
              }

            },
            {
              prop: "StandardValue",
              title: "标样浓度",
              width: '130',
              render: (h, params) => {
                return this.formatRender(h, params, 'StandardValue')
              }

            }]
          },
          {
            value: 6,
            label: "平行样",
            tableColumn: [
              {
                prop: "DataTime",
                title: "时间",
                width: '180'

              },
              {
                prop: "Pol",
                title: "因子",
                width: '130'

              },
              {
                prop: "Water",
                title: "第一次测量",
                width: "120",
                render: (h, params) => {
                  return this.formatRender(h, params, 'Water', 1)
                }
              },
              {
                prop: "WaterTime",
                title: "水样时间",
                width: '180'

              },
              {
                prop: "Check",
                title: "第二次测量",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'Check')
                }
              },

            ]


          },
          {
            value: 7,
            label: "加标回收",
            tableColumn: [
              {
                prop: "DataTime",
                title: "时间",
                width: '180'

              },
              {
                prop: "Pol",
                title: "因子",
                width: '130'

              },
              {
                prop: "Water",
                title: "第一次测量",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'Water', 1)
                }

              },
              {
                prop: "WaterTime",
                title: "水样时间",
                width: '180'
              },

              {
                prop: "Check",
                title: "第二次测量",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'Check')
                }
              },
              {
                prop: "Chroma",
                title: "C标",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'Chroma', 1)
                }

              },
              {
                prop: "Volume",
                title: "V标",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'Volume', 1)
                }

              },
              {
                prop: "DVolume",
                title: "加标后体积",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'DVolume', 1)
                }

              },
              {
                prop: "P",
                title: "加标回收率",
                width: '130',
                render: (h, params) => {
                  return this.formatRender(h, params, 'P', 1)
                }

              }
            ]

          },
          {
            value: 8,
            label: "仪表校准",
            tableColumn: [
              {
                prop: "DataTime",
                title: "时间",
                width: '180'

              },
              {
                prop: "Pol",
                title: "因子",
                width: '130'

              },
              {
                prop: "CheckType",
                title: "校准类型",
                width: '130',
                render: (h, params) => {

                  let val = '未知';
                  if (params.row["CheckType"] == 8) {
                    val = '空白校准';
                  } else if (params.row["CheckType"] == 9) {
                    val = '标样校准';
                  }

                  return h(
                    "div", {},
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
                      '',
                    ]
                  );
                }


              },
              {
                prop: "CheckResult",
                title: "校准结果",
                width: '130',
                render: (h, params) => {

                  let val = '无校准';
                  if (params.row["CheckResult"] == 1) {
                    val = '校准成功';
                  } else if (params.row["CheckResult"] == 2) {
                    val = '校准失败';
                  }

                  return h(
                    "div", {},
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
                      '',
                    ]
                  );
                }

              },

            ]
          }
        ]

        // 数据类型不同
        if (that.SoftType == 32) {
          //水样测试、标样核查、仪表校准
          that.dataTypes = that.dataTypes.filter(m => m.value == 1 || m.value == 2 || m.value == 8);
        } else {
          that.dataTypes = that.dataTypes.filter(m => m.value != 8);
        }

        that.dataTypes.map(function (item, index) {
          if (item.value != 7) {
            item.tableColumn.push(..._params);
          }
        });
        that.tableColumn = that.dataTypes[0].tableColumn;
      }
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

  @media only screen and (max-width: 1024px) {
    .el-col-sm-7 {
      width: 26% !important;
    }
  }

  .lend label {
    color: #999999;
    font-size: 14px;
    font-weight: normal
  }

  /* 时间框显示 */
  .el-date-range-picker__time-header .el-input__inner {
    color: #000 !important;
  }
</style>