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
                  v-model="dateValue"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  :clearable="false"
                  unlink-panels
                  style="width: 87%"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss "
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  @change="getData"
                ></el-date-picker>
              </el-col>
              <el-col :sm="6" :xs="6" :md="5" :xl="4">
                <label class="rwlx">类型</label>
                <el-select
                  v-model="alarmType"
                  size="small"
                  style="width: 60%"
                  placeholder="请选择"
                  @change="Alarmfactor"
                >
                  <el-option
                    v-for="item in alarmTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="7" :xs="7" :md="5" :xl="4">
                <label class="rwlx">因子</label>
                <el-select
                  v-model="PolId"
                  size="small"
                  style="width: 65%"
                  placeholder="请选择"
                  @change="Alarmfactor"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <!-- <el-button type="primary" size="small" style="float: right" @click="getExcel">导出</el-button> -->
              <!-- <excel @click="getexcel" :excelTitleName='excelTitleName' :exportHeader='exportHeader'
                :exportFilterVal='exportFilterVal' :exportList='exportList'></excel> -->
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <!-- <div class="panel-body"> -->
        <!-- <tables :dataSource="tableData" :columns="columns" :height="268" :border="true"></tables> -->

        <!-- .slice(
                (this.PageIndex - 1) * this.PageSize,
                (this.PageIndex - 1) * this.PageSize + this.PageSize
              ) -->
        <el-table
          :data="tableData"
          v-loading="pictLoading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          element-loading-text="数据正在加载中"
          :header-cell-style="{
            'background-color': '#384565',
          }"
          style="text-align: center"
          :height="tableHeight"
          stripe
          :empty-text="emptyText"
        >
          <el-table-column
            label="时间"
            align="center"
            prop="DataTime"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="预警因子"
            align="center"
            prop="PolId"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="预警类型"
            align="center"
            prop="WarnType"
            width="120"
          >
          </el-table-column>
          <el-table-column label="状态" align="left" prop="Status" width="80">
            <template slot-scope="scope">
              <span style="color: #6ad2c2" v-if="scope.row.Status == '已处理'"
                >{{ scope.row.Status }}
              </span>
              <span style="color: #da666e" v-else>{{ scope.row.Status }} </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="报警类型" prop="Type"> </el-table-column> -->
          <el-table-column label="预警信息" align="left" prop="Info">
            <template slot-scope="scope">
              <span
                @click="pageJump"
                style="
                  color: #409eff;
                  cursor: pointer;
                  text-decoration: underline;
                "
                v-if="scope.row.WarnType == '备件预警'"
                >{{ scope.row.Info }}>>点击跳转查看
              </span>
              <span v-else>{{ scope.row.Info }} </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageNations">
          <el-pagination
            @current-change="currentPage"
            class="pageNation"
            layout="total,sizes,prev, pager, next"
            :page-size="PageSize"
            :page-sizes="[5, 10, 20, 30, 50]"
            @size-change="changeSize"
            :current-page="PageIndex"
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
        </div>

        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
// import tables from "../module/tables";
// import excel from "../module/excel";
const { export_json_to_excel } = require("excel/Export2Excel");
export default {
  name: "yjsj",
  data() {
    let jcyzQuery = [
      { value: "", label: "全部" },
      { value: "w00000", label: "系统" },
    ];
    // this.socketApi.globalDataConfig.SDL_Global.MetersWC().map(function (
    //   item,
    //   index
    // ) {
    //   let obj = {
    //     value: item.Code,
    //     label: item.Name,
    //   };
    //   if (item.Name != "藻密度" && item.Name != "叶绿素") {
    //     if (item.Name == "流量") {
    //       obj.label = "系统";
    //     }
    //     jcyzQuery.push(obj);
    //   }
    // });
    this.socketApi.globalDataConfig.SDL_Global.MetersDataPP()
      .filter(
        (m) =>
          m.ID != "realFlow" &&
          m.ID != "CumulativeFlow" &&
          m.ID != "DaQiWenDu" &&
          m.ID != "DaQiShiDu"
      )
      .map(function (item, index) {
        let obj = {
          value: item.Code,
          label: item.Name,
        };
        if (
          item.Name != "藻密度" &&
          item.Name != "叶绿素" &&
          item.Name != "流量"
        ) {
          jcyzQuery.push(obj);
        }
      });

    return {
      emptyText: "暂无数据",
      dateValue: [
        moment(new Date() - 1000 * 3600 * 24).format("YYYY-MM-DD HH:mm:ss"),
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      ],
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
      options: jcyzQuery,
      //  [
      //   { value: "", label: "全部" },
      //   { value: "w00000", label: "系统" },
      //   { value: "w21001", label: "总氮" },
      //   { value: "w21011", label: "总磷" },
      //   { value: "w01019", label: "高锰酸盐指数" },
      //   { value: "w21003", label: "氨氮" },

      //   { value: "w01009", label: "溶解氧" },
      //   { value: "w01014", label: "电导率" },
      //   { value: "w01003", label: "浑浊度" },
      //   { value: "w01001", label: "pH值" },
      //   { value: "w01010", label: "水温" },
      // ],
      PolId: "",
      // alarmOption: [
      //   { value: "0", label: "系统报警" },
      //   { value: "1", label: "仪表报警" },
      //   { value: "2", label: "量程报警" },
      //   { value: "3", label: "加标模块报警" },
      // ],
      alarmType: "",
      alarmTypeOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "试剂预警",
        },
        {
          value: "1",
          label: "运维预警",
        },
        {
          value: "2",
          label: "数据预警",
        },
        {
          value: "3",
          label: "备件预警",
        },
      ],
      tableData: [],
      excelTitleName: "预警数据", //excel标题名字
      exportHeader: [], //导出 字段表头
      exportFilterVal: [], //表头对应字段
      exportList: [], //excel数据
      pageTotal: 0,
      PageIndex: 1,
      PageSize: 30,
      pictLoading: false,
      tableHeight: null,
      isLoading: false,
    };
  },
  mounted() {
    this.getHeight();

    // this.inquire();
    this.getData();
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.tableHeight = window.innerHeight - 226;
    },
    pageJump() {
      this.$router.push("/bjhcgl?ExpireType=-1");
    },
    inquire() {
      this.pictLoading = true;
      this.emptyText = " ";

      if (
        parseInt(new Date(this.dateValue[1]) - new Date(this.dateValue[0])) /
          (1000 * 60 * 60 * 24) >
        100
      ) {
        this.pictLoading = false;
        this.tableData = [];
        this.emptyText = "暂无数据";
        this.$message({
          message: "时间不能大于100天",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (this.dateValue == null) {
        this.pictLoading = false;
        this.tableData = [];
        this.emptyText = "暂无数据";
      }
      // setTimeout(() => {
      //   loading.close();
      // }, 1000);

      this.tableData = [];
      let condition = "";
      condition =
        "DataTime BETWEEN '" +
        this.dateValue[0] +
        "' and '" +
        this.dateValue[1] +
        "' and Type in (6)";

      if (this.PolId != "") {
        condition = condition + "and PolId='" + this.PolId + "'";
      }
      if (this.alarmType != "") {
        condition = condition + "and WarnType='" + this.alarmType + "'";
      }

      let nowpage = "";
      nowpage = (this.PageIndex - 1) * this.PageSize;
      let query =
        "`仪表日志` INNER JOIN  (SELECT id from `仪表日志` where " +
        condition +
        "  ORDER BY `Status`, `DataTime` DESC LIMIT " +
        nowpage +
        "," +
        this.PageSize +
        ")AS b USING(id) ";

      this.exportHeader = ["时间", "预警因子", "预警类型", "状态", "预警内容"]; //导出 字段表头
      this.exportFilterVal = [
        "DataTime",
        "PolId",
        "WarnType",
        "Status",
        "Info",
      ]; //表头对应字段
      // console.log("condition", condition);
      let querylist = "`DataTime`,`PolId`,`WarnType`,`Status`,`Info` ";
      this.http
        .comMethod(querylist, query, "")
        .then((res) => {
          // setTimeout(() => {
          this.pictLoading = false;
          // }, 1000);
          if (res.length != 0) {
            res.forEach((r) => {
              r.DataTime = this.$options.filters.dateFormat(r.DataTime);
              if (r["PolId"] == "w00000") {
                r["PolId"] = "系统";
              } else {
                r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(
                  r["PolId"]
                ); // this.funfactor(r["PolId"]);
              }
              r["WarnType"] = this.funAlarm(r["WarnType"]);
              r["Status"] = this.funStatus(r["Status"]); //r["Status"]=='0'?'未处理':'已处理'
            });
            // this.pageTotal = res.length;
            //表格数据
            this.tableData = res; //.reverse()
            // this.exportList = this.tableData;
          } else {
            this.emptyText = "暂无数据";
            this.tableData = [];
            this.pageTotal = 0;
          }
        })
        .catch((res) => {
          // console.log(res);
          setTimeout(() => {
            this.pictLoading = false;
            this.emptyText = "暂无数据";
          }, 1000);
        });

      this.http
        .comMethod("count(*)", "仪表日志", condition)
        .then((res) => {
          this.pageTotal = 0;

          this.pageTotal = res[0]["count(*)"];
        })
        .catch((res) => {
          // console.log(res);
          this.pictLoading = false;
          this.emptyText = "暂无数据";
        });

      // this.getexcel(querylist, tabName, condition);
    },
    // 获取表格数据
    getData() {
      let that = this;
      that.pictLoading = true;
      that.emptyText = " ";

      if (
        parseInt(new Date(that.dateValue[1]) - new Date(that.dateValue[0])) /
          (1000 * 60 * 60 * 24) >
        100
      ) {
        that.pictLoading = false;
        that.tableData = [];
        that.emptyText = "暂无数据";
        that.$message({
          message: "时间不能大于100天",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (that.dateValue == null) {
        that.pictLoading = false;
        that.tableData = [];
        that.emptyText = "暂无数据";
      }

      that.tableData = [];
      that.http
        .get("getYjsjData", {
          startTime: that.dateValue[0],
          endTime: that.dateValue[1],
          PolId: that.PolId,
          WarnType: that.alarmType,

          PageIndex: (that.PageIndex - 1) * that.PageSize,
          PageSize: that.PageSize,
        })
        .then((res) => {
          debugger;
          that.pageTotal = 0;
          // that.PageIndex = 1;
          that.pictLoading = false;

          // if (res.length>0) {
            if (res[1][0]["dataTotal"] > 0) {
              res[0].forEach((r) => {
                r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                if (r["PolId"] == "w00000") {
                  r["PolId"] = "系统";
                } else {
                  r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(
                    r["PolId"]
                  ); // this.funfactor(r["PolId"]);
                }
                r["WarnType"] = this.funAlarm(r["WarnType"]);
                r["Status"] = this.funStatus(r["Status"]); //r["Status"]=='0'?'未处理':'已处理'
              });

              // 赋值到表格
              that.tableData = res[0];

              that.pageTotal = res[1][0]["dataTotal"];
            } else {
              that.emptyText = "暂无数据";
              that.pageTotal = 0;
            }
          // }else {
          //     that.emptyText = "暂无数据";
          //     that.pageTotal = 0;
          //   }
        })
        .catch((res) => {
          that.$message.error("服务端错误");
          console.log("error", res);
        });
    },

    Alarmfactor() {
      this.PageIndex = 1;
      // this.inquire();
      this.getData();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    exportData() {
      this.isLoading = true;

      let querylist = "`DataTime`,`PolId`,`WarnType`,`Status`,`Info` ";
      let tabName = "仪表日志";
      let condition = "";
      condition =
        "DataTime BETWEEN '" +
        this.dateValue[0] +
        "' and '" +
        this.dateValue[1] +
        "' and Type in (6)";

      if (this.PolId != "") {
        condition = condition + "and PolId='" + this.PolId + "'";
      }
      if (this.alarmType != "") {
        condition = condition + "and WarnType='" + this.alarmType + "'";
      }
      condition += " ORDER BY `Status`, `DataTime`";
      this.http
        .comMethod(querylist, tabName, condition)
        .then((res) => {
          this.exportList = [];
          if (res.length != 0) {
            res.forEach((r) => {
              r.DataTime = this.$options.filters.dateFormat(r.DataTime);

              r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(
                r["PolId"]
              ); //this.funfactor(r["PolId"])
              r["WarnType"] = this.funAlarm(r["WarnType"]);
              r["Status"] = this.funStatus(r["Status"]); //r["Status"]=='0'?'未处理':'已处理'
            });
            //excel数据
            this.exportList = res; //excel数据
            require.ensure([], () => {
              const titleName = this.excelTitleName;
              const tHeader = this.exportHeader; //表头
              const filterVal = this.exportFilterVal; //表头对应的字段
              const list = this.exportList; //数据
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(
                tHeader,
                data,
                titleName + moment().format("YYYY-MM-DD HH:mm:ss")
              );

              this.$message({
                message: "导出成功",
                duration: 5000,
                type: "success",
              });
              // loading.close();
              this.isLoading = false;
            });
          }
        })
        .catch((res) => {
          // console.log(res);
        });
    },

    funfactor: function (val) {
      if (val == "w21011") {
        return "总磷";
      } else if (val == "w21001") {
        return "总氮";
      } else if (val == "w21003") {
        return "氨氮";
      } else if (val == "w01019") {
        return "高锰酸盐指数";
      } else if (val == "w01018") {
        return "化学需氧量";
      } else if (val == "w00000") {
        return "系统";
      } else if (val == "w01009") {
        return "溶解氧";
      } else if (val == "w01014") {
        return "电导率";
      } else if (val == "w01003") {
        return "浑浊度";
      } else if (val == "w01001") {
        return "pH值";
      } else if (val == "w01010") {
        return "水温";
      } else if (val == "w19011") {
        return "藻密度";
      } else if (val == "w01016") {
        return "叶绿素";
      }
    },
    funAlarm: function (val) {
      if (val == "0") {
        return "试剂预警";
      } else if (val == "1") {
        return "运维预警";
      } else if (val == "2") {
        return "数据预警";
      } else {
        return "备件预警";
      }
    },
    funStatus(val) {
      if (val == "0" || val == null) {
        return "未处理";
      } else if (val == "1") {
        return "已处理";
      }
    },
    currentPage(val) {
      this.PageIndex = val;
      // this.inquire();
      this.getData();
    },
    changeSize(val) {
      this.PageSize = val;
      this.getData();
      // this.inquire();
    },
  },
};
</script>
<style scoped>
/* 时间框显示 */
.el-date-range-picker__time-header .el-input__inner {
  color: #000 !important;
}
@media only screen and (max-width: 1024px) {
  .el-col-sm-7 {
    width: 26% !important;
  }
}
</style>