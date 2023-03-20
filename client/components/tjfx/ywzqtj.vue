<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <el-col :sm="12" :md="12" :lg="9" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker
                  v-model="dateValue"
                  type="monthrange"
                  unlink-panels
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  class="times"
                  value-format="yyyy-MM-dd"
                  size="small"
                  @change="dateChange"
                >
                </el-date-picker>
              </el-col>
            </el-row>
            <!-- <el-button type="primary" size="small" style="float: right;">导出</el-button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="converBox">
      <!-- <div class="panel panel-default"> -->
      <!-- <div class="panel-body"> -->
      <div
        id="myChart2"
        v-loading="pictLoading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
        element-loading-text="数据正在加载中"
      ></div>
      <div v-if="xAxisData.length == 0">
        <span style="color: #cccccc; position: absolute; top: 35%; left: 50%"
          >暂无数据</span
        >
      </div>

      <div class="div_bottom" v-if="xAxisData.length > 0">
        <el-table
          stripe
          :data="tableData"
          :height="tableHeight"
          style="width: 100%"
          v-loading="tbLoading"
        >
          <!-- <el-table-column prop="TaskID" label="编号" width="180" hidden>
          </el-table-column> -->
          <el-table-column prop="DataTime" label="运维时间" width="180">
          </el-table-column>
          <el-table-column prop="TaskName" label="运维类型" width="200">
          </el-table-column>
          <el-table-column prop="DevOpsPerson" label="运维人" width="200">
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column label="操作" align="left" width="120">
            <template slot-scope="scope">
              <span class="btn" size="mini" @click="openDetails(scope.row)"
                >查看详情
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <template class="dialogBox">
        <el-dialog
          class="div-dialog"
          title="详情"
          :visible.sync="yunWeieditModel"
          width="80%"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
        >
          <el-row>
            <el-col>
              <table style="margin-top: 10px">
                <!-- <thead> -->
                <tr>
                  <td style="text-align: left; padding-left: 10px">项目</td>
                  <td style="text-align: left; padding-left: 10px">内容</td>
                  <td style="width: 110px">是否完成</td>
                  <td>备注</td>
                </tr>
                <!-- </thead>
                            <tbody> -->
                <tr v-for="(item, index) in YunWeiFormData">
                  <td style="text-align: left; padding-left: 10px">
                    {{ item.Classify }}
                  </td>
                  <td style="text-align: left; padding-left: 10px">
                    {{ item.Title }}
                  </td>
                  <td style="width: 110px">
                    <el-checkbox
                      :checked="
                        YunWeiFormData[index].Status == 0 ? false : true
                      "
                      :true-label="item.ID + '_1'"
                      :false-label="item.ID + '_0'"
                      :key="index"
                      @change="activeBox"
                    >
                    </el-checkbox>
                  </td>
                  <td>
                    <el-input
                      v-model="YunWeiFormData[index].Remark"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; padding-left: 10px">备注</td>
                  <td colspan="3">
                    <el-input
                      v-model="YunWeiFormDataRemark"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; padding-left: 10px">运维人</td>
                  <td colspan="3" style="text-align: left; padding-left: 10px">
                    {{ userName }}
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; padding-left: 10px">运维时间</td>
                  <td colspan="3" style="text-align: left; padding-left: 10px">
                    {{ optTime }}
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; padding-left: 10px">运维类型</td>
                  <td colspan="3" style="text-align: left; padding-left: 10px">
                    {{ optType }}
                  </td>
                </tr>
                <!-- </tbody> -->
              </table>
            </el-col>
          </el-row>
        </el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

/**
 * 运维周期统计
 */
export default {
  name: "ywzqtj",
  // components: { excel, tables },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global.MetersWC(),
      tableHeight: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              let start = moment().startOf("month").format("YYYY-MM-01");
              let end = moment().format("YYYY-MM-DD");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上个月",
            onClick(picker) {
              let start = moment()
                .subtract(1, "months")
                .startOf("month")
                .format("YYYY-MM-DD");
              let end = moment()
                .subtract(1, "months")
                //.endOf("month")
                .format("YYYY-MM-DD");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近3个月",
            onClick(picker) {
              let start = moment()
                .subtract(3, "months")
                .startOf("month")
                .format("YYYY-MM-DD");
              let end = moment()
                //.subtract(1, "months")
                //.endOf("month")
                .format("YYYY-MM-DD");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近6个月",
            onClick(picker) {
              let start = moment()
                .subtract(6, "months")
                .startOf("month")
                .format("YYYY-MM-DD");
              let end = moment()
                //.subtract(1, "months")
                //.endOf("month")
                .format("YYYY-MM-DD");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "近1年",
            onClick(picker) {
              let start = moment()
                .subtract(12, "months")
                .startOf("month")
                .format("YYYY-MM-DD");
              let end = moment()
                //.subtract(1, "months")
                //.endOf("month")
                .format("YYYY-MM-DD");
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dateValue: [
        moment().subtract(3, "months").startOf("month").format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
      ],
      factorOption: [],
      xAxisData: [],
      seriesData: [],
      pictLoading: true,
      tbLoading: true,
      tableData: [],
      myChart2: null,
      myChart2Option: null,
      yunWeieditModel: false,
      YunWeiForm: [],
      YunWeiFormData: [],
      YunWeiFormDataRemark: "",
      userName: localStorage.getItem("Loginedname"),
      optTime: "",
      optType: "",
      pictYunWeiLoading: false,
    };
  },
  mounted() {
    this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
    this.init();
    this.getTableHeight();
    this.$store.state.isCollapse;
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
      }, 100);
    },
  },
  methods: {
    dateChange(e) {
      this.dateValue = [
        e[0],
        moment(e[1] + " 00:00:00")
          .endOf("months")
          .format("YYYY-MM-DD"),
      ];
      this.init();
    },
    getTableHeight() {
      try {
        this.tableHeight =
          document.getElementsByClassName("div_bottom")[0].offsetHeight - 20;
      } catch (e) {}
    },
    init() {
      let that = this;
      that.pictLoading = true;

      that.myChart2Option = {
        color: ["#4a92ff"],
        title: {
          text: "运维周期统计",
          subtext: `${that.dateValue[0]}~${that.dateValue[1]}`,
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          // axisPointer: {
          //   type: "cross",
          //   crossStyle: {
          //     color: "#999",
          //   },
          // },
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["运维次数（注：指周期内运维的次数）"],
          left: "left",
          orient: "center",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "20%",
        },
        xAxis: {
          type: "category",
          data: [], //["总磷", "总氮", "化学需氧量", "pH", "氨氮"],
          axisLabel: {
            color: "#cccccc",
          },
          axisLine: {
            //y轴线的颜色以及宽度
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "单位（次）",
            axisLabel: {
              formatter: "{value}",
            },
            axisLabel: {
              color: "#cccccc",
            },
            axisLine: {
              //y轴线的颜色以及宽度
              lineStyle: {
                color: "#fff",
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        series: {
          name: "运维次数（注：指周期内运维的次数）",
          type: "bar",
          barWidth: 50,
          data: [], //[21, 18, 24, 10, 22],
          label: {
            show: true,
            position: "inside",
          },
        },
      };
      that.myChart2.clear();

      this.getChartData(function (res) {
        that.xAxisData = [];
        that.seriesData = [];
        if (res && res.length > 0) {
          let data = res;
          let firstCode = "";
          data.forEach(function (item, index) {
            if (index == data.length - 1) {
              if (firstCode == "") {
                firstCode = item.DataTime;
              }
            }

            that.xAxisData.push(item.DataTime);
            that.seriesData.push(item.OptNum);
          });

          that.myChart2Option.xAxis.data = that.xAxisData;
          that.myChart2Option.series.data = that.seriesData;
          that.myChart2.setOption(that.myChart2Option);
          if (firstCode != "") {
            that.getTableData(firstCode);
          }
        }
        that.pictLoading = false;
      });
      that.myChart2.getZr().off("click");

      //点击柱状图，查看详情
      that.myChart2.getZr().on("click", function (event) {
        // 解决数值太小，点击困难的问题
        let point = [event.offsetX, event.offsetY];
        if (that.myChart2.containPixel("grid", point)) {
          let xIndex = that.myChart2.convertFromPixel(
            { seriesIndex: 0 },
            point
          )[0];
          let op = that.myChart2.getOption();
          let name = op.xAxis[0].data[xIndex];
          //let polId = that.SDL_Global.filter((m) => m.Name == name)[0].Code;
          that.getTableData(name);
        }
      });
      window.addEventListener("resize", () => {
        this.myChart2.resize();
        this.getTableHeight();
      });
      this.getTableHeight();
    },
    //请求数据
    getChartData(callback, params) {
      let condition = {
        PolId: params,
        StartDate: this.dateValue[0],
        EndDate: this.dateValue[1],
      };
      let url = "/getOptCycleDatas";
      if (params) {
        condition.StartDate = moment(params).format("YYYY-MM-01");
        condition.EndDate = moment(params).endOf("months").format("YYYY-MM-DD");
        url = "/getOptCycleDetails";
      }
      console.log(condition);

      this.http
        .get(url, condition)
        .then((res) => {
          callback(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //刷新表格详情数据
    getTableData(params) {
      let that = this;
      that.tbLoading = true;
      that.getChartData(function (res) {
        if (res && res.length > 0) {
          res.map(function (item, index) {
            item.DataTime = moment(item.DataTime).format("YYYY-MM-DD HH:mm:ss");
            //item.DevOpsPerson = item.DevOpsPerson;
          });
          that.tableData = res;
          that.tbLoading = false;
          that.getTableHeight();
        }else
        {
          that.tableData = [];
          that.tbLoading = false;
        }
      }, params);
    },
    openDetails(opt) {
      // alert(JSON.stringify(opt));
      this.yunWeieditModel = true;

      let TaskID = this.fundevopId(opt.TaskName);
      this.optTime = opt.DataTime;
      this.optType = opt.TaskName;
      this.getYunWeiItem(TaskID, opt.DevOpsNum);
      this.editDevOpsNum = opt.DevOpsNum;
      let condition = "";
      condition = " DevOpsNum = '" + opt.DevOpsNum + "'";
      this.http
        .comMethod("*", "tbdevopslog", condition)
        .then((res) => {
          this.pictLoading = false;
          if (res.length != 0) {
            // res.forEach((r) => {
            //     r.DataTime = this.$options.filters.dateFormat(r.DataTime);
            //     r.LastTime = this.$options.filters.dateFormat(r.LastTime);
            //     r["TaskID"] = this.fundevopInfo(r["TaskID"]);
            // });
            ////debugger
            this.YunWeiFormDataRemark = res[0].remark;
            if (this.editshow == true) {
              this.userName = res[0].DevOpsPerson;
            }
          } else {
            // this.emptyText = "暂无数据"
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getYunWeiItem(TaskID, DevOpsNum) {
      // select * from  tbdevopstaskdetail as a LEFT JOIN tbdevopsitem as b on a.ItemID=b.ID where  TaskID=1 ORDER BY SortIndex
      this.pictYunWeiLoading = true;
      this.YunWeiForm = [];
      this.YunWeiFormData = [];
      let condition = "";
      if (DevOpsNum == "") {
        condition = "TaskID = " + TaskID + "   GROUP BY ItemID";
      } else {
        condition =
          "TaskID = " + TaskID + " and DevOpsNum='" + DevOpsNum + "' ";
      }

      let tabName = `tbdevopstaskdetail AS a
                    LEFT JOIN tbdevopsitem AS c ON a.ItemID = c.ID
                    LEFT JOIN tbdevopslogdetail b ON a.ItemID = b.ItemID`; //" tbdevopstaskdetail as a LEFT JOIN tbdevopsitem as b on a.ItemID=b.ID"
      this.http
        .comMethod(
          "c.*,a.*, IFNULL(b.Status, 0) Status,b.Remark,b.ID as tailID",
          tabName,
          condition
        )
        .then((res) => {
          //debugger;
          let $this = this;
          setTimeout(() => {
            $this.pictYunWeiLoading = false;
          }, 1000);

          if (res.length != 0) {
            if (DevOpsNum == "") {
              res.forEach((r) => {
                r.Status = 0;
                r.Remark = null;
              });
              this.YunWeiForm = res;
              this.YunWeiFormData = res;
            } else {
              this.YunWeiFormData = res;
              console.log("11111111111", this.YunWeiFormData);
            }
            ////debugger
          } else {
            // this.emptyText = "暂无数据"
          }
        })
        .catch((res) => {
          //debugger;
          console.log(res);
        });
    },
    resizeHandle() {
      this.myChart2.resize();
      this.getTableHeight();
    },
    fundevopId(val) {
      if (val == "周运维") {
        return "1";
      } else if (val == "月运维") {
        return "2";
      } else if (val == "季度运维") {
        return "3";
      } else if (val == "其他运维") {
        return "4";
      }
    },
  },
};
</script>
<style scoped>
.el-table {
  border: 1px solid rgb(56, 69, 101);
}

.converBox {
  margin: 0 20px;
  background-color: #303a4c;
  height: calc(100vh - 180px);
  /* position:  absolute; */
}
#myChart2 {
  width: auto;
  min-height: 50%;
  /* position:relative; */
}
.div_bottom {
  height: 50%;
  padding-left: 5%;
  padding-right: 5%;
}

@media only screen and (max-width: 1920px) {
  .selquery {
    width: 178px !important;
  }

  .seltype {
    width: 100px !important;
  }

  .times {
    width: 260px !important;
  }
}

.btn {
  font-size: 14px;
  color: #4a92ff;
  cursor: pointer;
}

.el-radio__label {
  color: #cccccc !important;
}

.el-input__inner {
  color: #cccccc !important;
}

/* 时间框显示 */
.el-date-range-picker__time-header .el-input__inner {
  color: #000 !important;
}

@media only screen and (max-width: 1024px) {
  .el-col-md-6 {
    width: 34% !important;
  }

  .el-col-sm-7 {
    width: 29%;
  }
}

.rowdiv {
  height: 28px;
  margin: 0px 0px 20px 0px;
}

.rowdiv .el-col-4 {
  color: #cccccc;
  text-align: right;
  line-height: 28px;
  font-size: 14px;
  padding-right: 15px;
}

.rowdiv .el-col-5 {
  color: #cccccc;
  text-align: right;
  line-height: 28px;
  font-size: 14px;
  padding-right: 15px;
}

.rowdiv .el-select {
  width: 100%;
}

.rowdiv .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.div-dialog table {
  width: 100%;
  text-align: center;
  color: #cccccc;
  border-collapse: collapse;
}

.div-dialog table tr {
  color: #cccccc !important;
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

.c-red {
  color: #da666e;
}
</style>