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
        id="myChart1"
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
          <el-table-column prop="PollutantCode" label="因子" width="180">
          </el-table-column>
          <el-table-column prop="DataTime" label="超标时间" width="200">
          </el-table-column>
          <el-table-column prop="DataValue" label="监测数值" width="200">
          </el-table-column>
          <el-table-column prop="DataFlag" label="超标类型"> </el-table-column>
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
          title="最近三天数据"
          :visible.sync="alarmDataModel"
          width="80%"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
        >
          <div
            id="myCharts"
            element-loading-background="rgba(0, 0, 0, 0.3)"
            element-loading-text="数据正在加载中"
          ></div>

          <!-- <div v-if="xAxisData.length == 0">
            <span style="color: #cccccc; position: absolute; top: 35%; left: 50%">暂无数据</span>
          </div> -->
        </el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

/**
 * 数据超标统计
 */
export default {
  name: "sjcbtj",
  // components: { excel, tables },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global.MetersWC(),
      tableHeight: null,
      alarmDataModel: false,
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
      pictLoadings: true,
      tbLoading: true,
      tableData: [],
      myChart1: null,
      myChart1Option: null,
      chartTitle: "",
      myCharts: [],
      xAxisDatas: [],
      chartDatas: [],
      myChartsOption: null,
      alarmList: [],
    };
  },
  mounted() {
    this.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
    // this.myCharts = this.$echarts.init(document.getElementById("myCharts"));
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

      that.myChart1Option = {
        color: ["#4a92ff"],
        title: {
          text: "超标数据统计分析",
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
          data: ["超标数据（注：指超过设置阈值的测量数据）"],
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
          name: "超标数据（注：指超过设置阈值的测量数据）",
          type: "bar",
          barWidth: 50,
          data: [], //[21, 18, 24, 10, 22],
          label: {
            show: true,
            position: "inside",
          },
        },
      };
      that.myChart1.clear();

      this.getChartData(function (res) {
        //debugger;
        that.xAxisData = [];
        that.seriesData = [];
        if (res && res.length > 0) {
          let data = res;
          let firstCode = "";
          console.log(res);
          data.forEach(function (item, index) {
            if (item.OverNum > 0) {
              //debugger
              var _name = that.SDL_Global.filter(
                (m) => m.Code == item.PollutantCode
              );
              if (_name.length > 0) {
                if (firstCode == "") {
                  firstCode = item.PollutantCode;
                }
                that.xAxisData.push(_name[0].Name);
                that.seriesData.push(item.OverNum);
              }
            }
          });

          that.myChart1Option.xAxis.data = that.xAxisData;
          that.myChart1Option.series.data = that.seriesData;
          that.myChart1.setOption(that.myChart1Option);
          if (firstCode != "") {
            that.getTableData(firstCode);
          }
        }
        that.pictLoading = false;
      });
      that.myChart1.getZr().off("click");

      //点击柱状图，查看详情
      that.myChart1.getZr().on("click", function (event) {
        // 解决数值太小，点击困难的问题
        let point = [event.offsetX, event.offsetY];
        if (that.myChart1.containPixel("grid", point)) {
          let xIndex = that.myChart1.convertFromPixel(
            { seriesIndex: 0 },
            point
          )[0];
          let op = that.myChart1.getOption();
          let name = op.xAxis[0].data[xIndex];
          let polId = that.SDL_Global.filter((m) => m.Name == name)[0].Code;
          that.getTableData(polId);
        }
      });
      window.addEventListener("resize", () => {
        this.myChart1.resize();
        this.getTableHeight();
      });
      this.getTableHeight();
    },
    //请求数据
    getChartData(callback, polId) {
      let condition = {
        PolId: polId,
        StartDate: this.dateValue[0],
        EndDate: this.dateValue[1],
      };
      console.log(condition);

      this.http
        .get(
          !!condition.PolId ? "/getOverDataDetails" : "/getOverDatas",
          condition
        )
        .then((res) => {
          callback(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 查看详情，获取最近三天小时数据
    openDetails(opt) {
      // alert(JSON.stringify(opt));
      this.alarmDataModel = true;
      this.xAxisDatas = [];
      this.chartTitle = opt.PollutantCode;
      let polId = this.funfactorName(opt.PollutantCode) + "_Avg";
      let sTime = moment(new Date(opt.DataTime))
        .subtract(1, "days")
        .format("YYYY-MM-DD HH:mm:ss");
      let eTime = moment(new Date(opt.DataTime))
        .add(1, "days")
        .format("YYYY-MM-DD HH:mm:ss");
      let condition = "DataTime BETWEEN '" + sTime + "' and '" + eTime + "' ";
      let query = "DataTime," + polId;
      this.http
        .comMethod(query, "小时数据", condition)
        .then((res) => {
          if (res.length != 0) {
            //debugger
            console.log("qqq", polId);
            res.forEach((r) => {
              if (r.DataTime != null) {
                r.DataTime = this.$options.filters.dateFormat(r.DataTime);
              }
              // x轴
              this.xAxisDatas.push(r.DataTime);

              // let obj = {
              //   name: opt.PollutantCode,
              //   type: "line",
              //   data: datatest[k],
              //   symbol: "circle",
              // };
              this.chartDatas.push(r[polId]);
            });
            this.alarmList = res;
          } else {
            // this.emptyText = "暂无数据"
          }
          this.getChart();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 绘画折线图像
    getChart() {
      this.myCharts = this.$echarts.init(document.getElementById("myCharts"));

      // 调用showLoading方法
      // myChart.showLoading({
      //     text: 'loading',
      //     color: '#c23531',
      //     textColor: '#000',
      //     maskColor: 'rgba(255, 255, 255, 0.2)',
      //     zlevel: 0,
      // });;
      // setTimeout(() => {
      //     // setOption前隐藏loading事件
      //     myChart.hideLoading();
      //     myChart.setOption(option);
      // }, 1000);

      this.myChartsOption = {
        title: {
          text: this.chartTitle + "_折线分析",
          textStyle: {
            color: "#fff",
          },
          padding: [20, 20, 10, 50], // 位置
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#3c4c6a",
          textStyle: {
            color: "#fff",
          },
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
        grid: {
          top: "15%",
          left: "3%",
          right: "5%",
          bottom: "8%",
          containLabel: true,
        },
        dataZoom: [
          // {
          //   type: "slider",
          //   xAxisIndex: 0,
          //   filterMode: "empty",
          //   textStyle: { color: "#fff" },
          //   borderColor: "#455474",
          //   backgroundColor: "#455474",
          //   fillerColor: "#2e3f62",
          //   // filterMode: 'filter',
          // },
          // {
          //   type: "slider",
          //   yAxisIndex: 0,
          //   filterMode: "empty",
          //   textStyle: { color: "#fff" },
          //   borderColor: "#455474",
          //   backgroundColor: "#455474",
          //   fillerColor: "#2e3f62",
          // },
          {
            type: "inside",
            xAxisIndex: 0,
            filterMode: "empty",
            throttle: 20,
          },
        ],
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: this.xAxisDatas,
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
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#cccccc",
          },
          splitLine: {
            show: true,
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

        series: {
          // name: opt.PollutantCode,
          type: "line",
          symbol: "circle",
          data: this.chartDatas,
        },
      };
      //debugger
      this.myCharts.clear();
      this.myCharts.setOption(this.myChartsOption);
      // if (this.chartDatas.length != 0) {
      //   window.addEventListener("resize", () => {
      //     this.myCharts.resize();
      //   });
      //   this.myCharts.clear();
      //   this.myCharts.setOption(this.myChartsOption);
      // } else {
      //   var html =
      //     "<div><span style='color:#cccccc;position:absolute;top:30%;left:45%'>暂无数据</span></div>";
      //   document.getElementById("myCharts").innerHTML = html;
      //   document
      //     .getElementById("myChart")
      //     .removeAttribute("_echarts_instance_");
      // }
    },
    //刷新表格详情数据
    getTableData(polId) {
      let that = this;
      that.tbLoading = true;
      that.getChartData(function (res) {
        if (res && res.length > 0) {
          res.map(function (item, index) {
            item.DataTime = moment(item.DataTime).format("YYYY-MM-DD HH:mm:ss");
            item.DataFlag = item.DataFlag == "T" ? "超上限" : "超下限";
            item.PollutantCode = that.SDL_Global.filter(
              (m) => m.Code == item.PollutantCode
            )[0].Name;
          });
          that.tableData = res;
          that.tbLoading = false;
          that.getTableHeight();
        }
      }, polId);
    },
    resizeHandle() {
      this.myChart1.resize();
      this.getTableHeight();
    },
    funfactorName: function (val) {
      if (val == "总磷") {
        return "w21011";
      } else if (val == "总氮") {
        return "w21001";
      } else if (val == "氨氮") {
        return "w21003";
      } else if (val == "高锰酸盐指数") {
        return "w01019";
      } else if (val == "化学需氧量") {
        return "w01018";
      } else if (val == "流量") {
        return "w00000";
      } else if (val == "溶解氧") {
        return "w01009";
      } else if (val == "电导率") {
        return "w01014";
      } else if (val == "浊度") {
        return "w01003";
      } else if (val == "叶绿素") {
        return "w01016";
      } else if (val == "藻密度") {
        return "w19011";
      } else if (val == "pH值" || val == "pH") {
        return "w01001";
      } else if (val == "水温") {
        return "w01010";
      } else if (val == "室内温度") {
        return "w90001";
      } else if (val == "室内湿度") {
        return "w90002";
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

#myChart1 {
  width: auto;
  min-height: 50%;
  /* position:relative; */
}

#myCharts {
  width: auto;
  height: 400px;
  /* position:relative; */
}

.btn {
  font-size: 14px;
  color: #4a92ff;
  cursor: pointer;
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
</style>