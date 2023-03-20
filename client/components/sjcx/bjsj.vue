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
              <el-col :sm="9" :xs="9" :md="6" :xl="3">
                <label class="rwlx">报警因子</label>
                <el-select
                  v-model="taskType"
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
              (this.PageIndex - 1) * this.size,
              (this.PageIndex - 1) * this.size + this.size
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
          <el-table-column label="因子" align="center" prop="PolId" width="180">
          </el-table-column>
          <!-- <el-table-column label="报警类型" prop="Type"> </el-table-column>  width="180"-->
          <el-table-column label="描述信息" align="left" prop="Info">
          </el-table-column>
          <el-table-column label="诊断方案" align="left" v-if="SoftType == 32">
            <template slot-scope="scope">
              <span class="btn" size="mini" @click="doit(scope.row)"
                >查看可能原因
              </span>
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
    <el-dialog
      title="诊断方案"
      :visible.sync="zdfaModel"
      width="75%"
      :modal-append-to-body="false"
      class="div-dialog"
    >
      <!-- cellspacing="0" cellpadding="0" 
      class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;table-layout: fixed;background-color: #303a4c
      ;" -->
      <table>
        <thead class="tabThead">
          <!-- style="font-weight: bold;background-color: #384565;" -->
          <td style="width: 40px">报警类型</td>
          <td style="width: 100px">可能原因</td>
          <td>解决方案</td>
          <td style="width: 80px">图片</td>
          <!-- class="el-table_18_column_105  is-center   is-leaf" -->
        </thead>
        <tbody class="guideclass">
          <tr class="el-table__row" v-for="(help, index) in helpData">
            <td
              style="width: 40px"
              v-if="index == 0"
              :rowspan="rowspan"
              class="el-table_1_column_1 is-center"
            >
              {{ help.GuideType }}
            </td>
            <td style="width: 100px">{{ help.ProblemDes }}</td>
            <!-- class="el-table_1_column_1 is-left " -->
            <td>{{ help.Solution }}</td>
            <td style="width: 80px">
              <span
                v-if="help.ImgUrl != null && help.ImgUrl != ' '"
                style="cursor: pointer; color: #4a92ff"
                @click="selPic(help)"
              >
                查看大图
              </span>
              <span v-else> 暂无图片 </span>
            </td>
          </tr>
        </tbody>
      </table>
    </el-dialog>

    <template class="dialogBoxs">
      <!-- <el-dialog title="图片显示" :visible.sync="picdialog" width="60%" :modal-append-to-body='false'
        :close-on-click-modal="false">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in imgPaths" :key="item">
        
            <img :src="item" style="height: 400px; width: 400px" />
          </el-carousel-item>
        </el-carousel>
      </el-dialog> -->
      <SolutionModel
        :solutionVisible.sync="picdialog"
        :Name="diaTitle"
        :SolutionInfo="SolutionInfo"
        :imgPaths="imgPaths"
      >
      </SolutionModel>
    </template>
  </div>
</template>
<script>
import moment from "moment";
// import tables from "../module/tables";
import excel from "../module/excel";
const { export_json_to_excel } = require("excel/Export2Excel");
import SolutionModel from "../module/SolutionModel.vue";

export default {
  name: "bjsj",
  components: { excel, SolutionModel },
  data() {
    let jcyzQuery = [
      { value: "", label: "全部" },
      { value: "w00000", label: "系统" },
    ];
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
      SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,
      dateValue: [
        moment(new Date() - 1000 * 3600 * 24 * 50).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
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
      taskType: "",
      tableData: [],
      excelTitleName: "报警数据", //excel标题名字
      exportHeader: [], //导出 字段表头
      exportFilterVal: [], //表头对应字段
      exportList: [], //excel数据
      pageTotal: 0,
      PageIndex: 1,
      PageSize: 30,
      pictLoading: false,
      tableHeight: null,
      zdfaModel: false,
      helpData: [],
      rowspan: 0,
      isLoading: false,
      picdialog: false,
      imgPaths: "",
    };
  },
  mounted() {
    // this.inquire();0
    this.getHeight();
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
      let condition;
      if (this.taskType == "") {
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "' and Type in (1,2,3,0) ";
      } else if (this.taskType == "w00000") {
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "' and PolId like '%" +
          this.taskType +
          "%" +
          "' and Type in (0) ";
      } else {
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "' and PolId like '%" +
          this.taskType +
          "%" +
          "' and Type in (1,2,3,0) ";
      }
      let nowpage = "";
      nowpage = (this.PageIndex - 1) * this.PageSize;
      let query =
        "`仪表日志` INNER JOIN  (SELECT id from `仪表日志` where " +
        condition +
        "  ORDER BY `DataTime` DESC LIMIT " +
        nowpage +
        "," +
        this.PageSize +
        ")AS b USING(id) ";

      this.exportHeader = ["时间", "因子", "描述"]; //导出 字段表头
      this.exportFilterVal = ["DataTime", "PolId", "Info"]; //表头对应字段
      // console.log("condition", condition);
      let querylist = "`DataTime`,`PolId`,`Info`,`AlarmID`  ";
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
                ); //this.funfactor(r["PolId"])
              }
              // r["Type"] = this.funAlarm(r["Type"])
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
      debugger
      that.http
        .get("getBjsjData", {
          startTime: that.dateValue[0],
          endTime: that.dateValue[1],
          PolId: that.taskType,
          PageIndex: (that.PageIndex - 1) * that.PageSize,
          PageSize: that.PageSize,
        })
        .then((res) => {
          debugger;
          that.pageTotal = 0;
          // that.PageIndex = 1;
          that.pictLoading = false;

          if (res[1][0]["dataTotal"] > 0) {
            res[0].forEach((r) => {
              r.DataTime = this.$options.filters.dateFormat(r.DataTime);
              if (r["PolId"] == "w00000") {
                r["PolId"] = "系统";
              } else {
                r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(
                  r["PolId"]
                ); //this.funfactor(r["PolId"])
              }
            });

            // 赋值到表格
            that.tableData = res[0];

            that.pageTotal = res[1][0]["dataTotal"];
          } else {
            that.emptyText = "暂无数据";
            that.pageTotal = 0;
          }
        })
        .catch((res) => {
          that.$message.error("服务端错误");
          console.log("error", res);
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    exportData() {
      this.isLoading = true;

      let querylist = "`DataTime`,`PolId`,`WarnType`,`Status`,`Info` ";
      let tabName = "仪表日志";
      let condition = "";
      if (this.taskType == "") {
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "' and Type in (1,2,3,0) ";
      } else if (this.taskType == "w00000") {
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "' and PolId like '%" +
          this.taskType +
          "%" +
          "' and Type in (0) ";
      } else {
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "' and PolId like '%" +
          this.taskType +
          "%" +
          "' and Type in (1,2,3,0) ";
      }
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
    Alarmfactor() {
      this.PageIndex = 1;
      // this.inquire();
      this.getData();
    },
    //  诊断方案
    doit(val) {
      if (val.Info == "//通讯异常//") {
        val.AlarmID = "MA_999";
      }
      if (val.AlarmID == "") {
        this.$message.info("暂无诊断方案");
        return;
      }
      this.zdfaModel = true;

      this.helpAlarm(val.AlarmID);
    },

    // 查询解决方案
    helpAlarm(AlarmID) {
      let comdition = "`AlarmIDs` LIKE '%[" + AlarmID + "]%'";
      this.http
        // .comMethod("*", "tbhelpguide", selwhere)
        .get("/gettbhelpguide", {
          comdition,
        })
        .then((res) => {
          this.pictLoading = false;
          if (res.length != 0) {
            //表格数据
            this.helpData = res;
            this.rowspan = res.length;
            console.log("诊断数据", this.helpData);
          }
        })
        .catch((res) => {
          // console.log(res);
          setTimeout(() => {
            this.pictLoading = false;
            this.emptyText = "暂无数据";
          }, 1000);
        });
    },
    //查看大图
    selPic(val) {
      // let locatIndex = window.location.href.indexOf('#');
      // let httpUrls = window.location.href.substring(0, locatIndex);
      debugger;
      // this.picdialog = true;
      // this.imgPaths = val;
      this.picdialog = true;
      this.imgPaths = val.ImgUrl;
      this.SolutionInfo = val.Solution;
      this.diaTitle = val.GuideType;
      // for (var i = 0; i < this.imgPaths.length; i++) {

      //     this.imgPaths[i] = httpUrls + this.imgPaths[i];
      // }

      console.log(" this.imgPaths", this.imgPaths);
    },
    funAlarm: function (val) {
      if (val == "0") {
        return "系统报警";
      } else if (val == "1") {
        return "仪表报警";
      } else if (val == "2") {
        return "量程报警";
      } else {
        return "加标模块报警";
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
.btn {
  font-size: 14px;
  color: #4a92ff;
  cursor: pointer;
}

.tabThead td {
  font-weight: bold;
  background-color: rgb(56, 69, 101);
  height: 48px;
  text-align: left;
  padding-left: 10px;
}

.guideclass td {
  background-color: #364055;
  color: seashell;
  border: 1px solid #303a4c;
  text-align: left;
  padding-left: 10px;
}
@media only screen and (max-width: 1024px) {
  .el-col-sm-7 {
    width: 27% !important;
  }
}
.el-date-range-picker__time-header .el-input__inner {
  color: #000 !important;
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
</style>