<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <el-col :sm="12" :md="12" :lg="8" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker
                  v-model="datemMrangeValue"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  :clearable="false"
                  style="width: 87%"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  @change="inquire"
                  unlink-panels
                >
                  <!-- value-format="yyyy-MM-dd HH" -->
                </el-date-picker>
              </el-col>
              <el-col :sm="6" :xs="6" :md="5" :xl="4">
                <label class="rwlx">数据类型</label>
                <el-select
                  v-model="defaultDateType"
                  placeholder="请选择"
                  @change="dataTypeCgehand"
                  style="width: 60%"
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
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 40px; background-color: #313a4d; margin: 0px 20px">
      <el-row class="lend" style="text-align: center; line-height: 40px">
        <el-col :span="2"> <label> N</label><label> 正常</label> </el-col>
        <el-col :span="2"> <label> T</label><label> 超上限</label> </el-col>
        <el-col :span="2"> <label> L</label><label> 超下限</label> </el-col>

        <el-col :span="2"> <label> lr</label><label> 缺试剂</label> </el-col>
        <el-col :span="2"> <label> lp</label><label> 缺纯水</label> </el-col>
        <el-col :span="2"> <label> lw</label><label> 缺水样</label> </el-col>
        <el-col :span="2"> <label> ls</label><label> 缺标样</label> </el-col>
        <el-col :span="3"> <label> D</label><label> 仪器故障</label> </el-col>
        <el-col :span="3">
          <label> F</label><label> 仪器通信故障</label>
        </el-col>
        <el-col :span="3">
          <label> M</label><label> 维护调试数据</label>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <!-- <div class="panel-body" style="padding-bottom: 0px;"> -->
        <div class="jcsjdata">
          <!-- .slice((pageIndex - 1) * pageSize, (pageIndex - 1) * pageSize + pageSize) -->
          <eleTable
            :columns="columnlist"
            :list="tableData"
            :height="tableHeight"
          >
          </eleTable>
        </div>

        <div class="pageNations">
          <el-pagination
            @current-change="currentPage"
            class="pageNation"
            layout="total,sizes,prev, pager, next"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 30, 50]"
            @size-change="changeSize"
            :current-page="pageIndex"
            :total="pageTotal"
          >
          </el-pagination>

          <!-- <excel :excelTitleName='excelTitleName' :exportHeader='exportHeader' :exportFilterVal='exportFilterVal'
            :exportList='exportList'></excel> -->
          <el-button
            size="small"
            @click="exportData"
            type="primary"
            style="float: left; margin-top: 8px; margin-left: 15px"
            :loading="isLoading"
          >
            导出
          </el-button>
        </div>

        <!-- </el-tab-pane> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import excel from "../module/excel";
import eleTable from "../module/renderTable";

export default {
  name: "jcsj",
  components: { excel, eleTable },
  data() {
    let columnlist = [
      {
        prop: "DataTime",
        title: "时间",
        align: "center",
        width: "180",
        fixed: "left",
      },
    ];

    let MetersData =
      this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter(
        (m) =>
          m.ID != "WC" &&
          // m.ID != "realFlow" &&
          // m.ID != "CumulativeFlow" &&
          m.ID != "DaQiWenDu" &&
          m.ID != "DaQiShiDu" &&
          m.ID != "LY" &&
          m.ID != "ZJS" &&
          m.ID != "VOCs" &&
          m.ID != "ZF"
      );
    MetersData.map(function (item, index) {
      let colPolId = item.Code + "-Avg";
      let colPolIdFlag = item.Code + "-Flag";
      let colName = item.Name + "<br/>" + item.Unit;
      let colSort = item.sort;

      let col = {
        prop: colPolId,
        title: colName,
        width: "130",
        align: "center",
        render: (h, params) => {
          let Flag = params.row[colPolIdFlag];
          let val = "";
          let style = {};
          val = params.row[colPolId];
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
      // 页面表格列
      columnlist.push(col);
      // 数据库查询字段Avg
    });

    columnlist.sort(function (a, b) {
      return a.sort - b.sort;
    });
    return {
      tableHeight: null,
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
        moment(new Date() - 1000 * 3600 * 24 * 3).format("YYYY-MM-DD HH:mm:ss"),
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      ],
      defaultDateType: 2,
      patternOptions: [
        {
          value: 1,
          label: "实时数据",
        },
        {
          value: 2,
          label: "周期测量数据",
        },
      ],
      MetersData: MetersData, //筛选数据
      columnlist: columnlist, //表格列
      tableData: [], //报表数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 30,
      isLoading: false,
      emptyText: " ",
    };
  },
  mounted() {
    this.inquire();
    this.getHeight();
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.tableHeight = window.innerHeight - 226 - 40 - 40;
    },
    //数据查询
    inquire: function () {
      this.emptyText = " ";
      if (
        parseInt(
          new Date(this.datemMrangeValue[1]) -
            new Date(this.datemMrangeValue[0])
        ) /
          (1000 * 60 * 60 * 24) >
        100
      ) {
        this.tableData = [];
        this.emptyText = "暂无数据";
        this.$message({
          message: "时间不能大于100天",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (this.datemMrangeValue == null) {
        this.emptyText = "暂无数据";
        return;
      }

      this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      // console.log('pageIndex=',pageIndex);
      let that = this;
      that.tableData = [];
      debugger;
      let ZFLs =
        this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter(
          (m) => m.ID == "ZFL"
        );
      let ZFLUnit = "";
      if (ZFLs.length > 0) {
        ZFLUnit = ZFLs[0].Unit;
      }
      // console.log('ZFLUnit',ZFLUnit.length);
      // [0].Unit
      if (that.defaultDateType == 1) {
        this.columnlist.map(function (item, index) {
          if (item.prop == "e01902-Avg") {
            item.title = "蒸发仪液位" + "<br/>" + ZFLUnit;
          }
        });
      } else {
        this.columnlist.map(function (item, index) {
          if (item.prop == "e01902-Avg") {
            item.title = "蒸发量" + "<br/>" + ZFLUnit;
          }
        });
      }

      that.http
        .get("getjcsjTable", {
          defaultDateType: that.defaultDateType,
          startTime: that.datemMrangeValue[0],
          endTime: that.datemMrangeValue[1],
          pageIndex: (that.pageIndex - 1) * that.pageSize,
          pageSize: that.pageSize,
        })
        .then((res) => {
          debugger;
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
                  r[item.Code + "-Avg"] =
                    r[item.Code + "-Avg"] == null
                      ? "--"
                      : r[item.Code + "-Avg"].toFixedFormat(item.Decimal);
                });
              });

              // 赋值到表格
              that.tableData = res[0];

              that.pageTotal = res[1][0]["dataTotal"];
            } else {
              that.emptyText = "暂无数据";
              that.pageTotal = 0;
            }
          }
        })
        .catch((res) => {
          that.$message.error("服务端错误");
          console.log("error", res);
        });
    },
    //数据导出
    exportData() {
      let that = this;
      // 报表请求数据库，获取所有数据进行导出
      that.http
        .get("getjcsjTable", {
          defaultDateType: that.defaultDateType,
          startTime: that.datemMrangeValue[0],
          endTime: that.datemMrangeValue[1],
          pageIndex: 0,
          pageSize: 0,
        })
        .then((res) => {
          if (res) {
            if (res && res.length > 0) {
              // 格式化
              res.forEach((r) => {
                r.DataTime =
                  r.DataTime == null
                    ? "--"
                    : that.$options.filters.dateFormat(r.DataTime);
                that.MetersData.map(function (item, index) {
                  r[item.Code + "-Avg"] =
                    r[item.Code + "-Avg"] == null
                      ? "--"
                      : r[item.Code + "-Avg"].toFixedFormat(item.Decimal);
                });
              });

              that.DataToExcel({
                FileName: that.patternOptions.filter(
                  (m) => m.value == that.defaultDateType
                )[0].label,
                ExcelHeader: that.columnlist.map((m) => m.title),
                SqlColumns: that.columnlist.map((m) => m.prop),
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

    //  数据类型切换
    dataTypeCgehand: function () {
      this.pageIndex = 1;

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

.el-table td,
.el-table th {
  padding: 1px 0px;
}

/* 时间框显示 */
.el-date-range-picker__time-header .el-input__inner {
  color: #000 !important;
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
</style>