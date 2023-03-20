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
        id="myChart3"
        v-loading="pictLoading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
        element-loading-text="数据正在加载中"
      ></div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

/**
 * 有效数据统计
 */
export default {
  name: "yxsjtj",
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
      myChart3: null,
      myChart3Option: null,
    };
  },
  mounted() {
    this.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
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

      that.myChart3Option = {
        color: ["#67C23A", "#E6A23C"],
        title: [
          {
            text: "有效数据统计分析",
            subtext: `${that.dateValue[0]}~${that.dateValue[1]}`,
            left: "center",
            textStyle: {
              color: "#fff",
            },
          },
          //   {
          //     subtext: "总磷",
          //     left: "20%",
          //     top: "40%",
          //     textAlign: "center",
          //     subtextStyle: {
          //       fontWeight: "bold",
          //       fontSize: 16,
          //     },
          //   },
          //   {
          //     subtext: "总氮",
          //     left: "50%",
          //     top: "40%",
          //     textAlign: "center",
          //     subtextStyle: {
          //       fontWeight: "bold",
          //       fontSize: 16,
          //     },
          //   },
          //   {
          //     subtext: "化学需氧量",
          //     left: "80%",
          //     top: "40%",
          //     textAlign: "center",
          //     subtextStyle: {
          //       fontWeight: "bold",
          //       fontSize: 16,
          //     },
          //   },
          //   {
          //     subtext: "氨氮",
          //     left: "20%",
          //     top: "80%",
          //     textAlign: "center",
          //     subtextStyle: {
          //       fontWeight: "bold",
          //       fontSize: 16,
          //     },
          //   },
          //   {
          //     subtext: "pH",
          //     left: "50%",
          //     top: "80%",
          //     textAlign: "center",
          //     subtextStyle: {
          //       fontWeight: "bold",
          //       fontSize: 16,
          //     },
          //   },
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "有效数据（注：指仪表周期测量日质控标样核查合格的数据）",
            "无效数据（注：指仪表周期测量日质控标样核查未合格的数据）",
          ],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          //   {
          //     name: "总磷",
          //     type: "pie",
          //     radius: "20%",
          //     center: ["20%", "30%"],
          //     data: [
          //       { value: 34, name: "有效数据" },
          //       { value: 2, name: "无效数据" },
          //     ],
          //     label: {
          //       normal: {
          //         show: true,
          //         textStyle: {
          //           fontSize: 14,
          //         },
          //         formatter: "{d}%",
          //       },
          //     },
          //   },
          //   {
          //     name: "总氮",
          //     type: "pie",
          //     radius: "20%",
          //     center: ["50%", "30%"],
          //     data: [
          //       { value: 22, name: "有效数据" },
          //       { value: 12, name: "无效数据" },
          //     ],
          //     label: {
          //       normal: {
          //         show: true,
          //         textStyle: {
          //           fontSize: 14,
          //         },
          //         formatter: "{d}%",
          //       },
          //     },
          //   },
          //   {
          //     name: "化学需氧量",
          //     type: "pie",
          //     radius: "20%",
          //     center: ["80%", "30%"],
          //     data: [
          //       { value: 34, name: "有效数据" },
          //       { value: 2, name: "无效数据" },
          //     ],
          //     label: {
          //       normal: {
          //         show: true,
          //         textStyle: {
          //           fontSize: 14,
          //         },
          //         formatter: "{d}%",
          //       },
          //     },
          //   },
          //   {
          //     name: "氨氮",
          //     type: "pie",
          //     radius: "20%",
          //     center: ["20%", "70%"],
          //     data: [
          //       { value: 34, name: "有效数据" },
          //       { value: 2, name: "无效数据" },
          //     ],
          //     label: {
          //       normal: {
          //         show: true,
          //         textStyle: {
          //           fontSize: 14,
          //         },
          //         formatter: "{d}%",
          //       },
          //     },
          //   },
          //   {
          //     name: "pH",
          //     type: "pie",
          //     radius: "20%",
          //     center: ["50%", "70%"],
          //     data: [
          //       { value: 34, name: "有效数据" },
          //       { value: 2, name: "无效数据" },
          //     ],
          //     label: {
          //       normal: {
          //         show: true,
          //         textStyle: {
          //           fontSize: 14,
          //         },
          //         formatter: "{d}%",
          //       },
          //     },
          //   },
        ],
      };

      that.myChart3.clear();
      that.myChart3.setOption(that.myChart3Option);
      this.getChartData(function (res) {
        that.xAxisData = [];
        that.seriesData = [];
        if (res && res.length > 0) {
          //debugger;
          let data = res;
          let firstCode = "";
          data.forEach(function (item, index) {
            var _name = that.SDL_Global.filter(
              (m) => m.Code == item.PollutantCode
            );
            if (_name.length > 0) {
              data.PollutantName = _name[0].Name;
              if (firstCode == "") {
                firstCode = item.DataTime;
              }
              that.xAxisData.push(item.DataTime);
              that.seriesData.push(item.OptNum);
            }

            //EffectiveNum、InvalidNum

            let _left = 20;
            let _top = 40;
            if (
              index == 1 ||
              index == 4 ||
              index == 7 ||
              index == 10 ||
              index == 13
            ) {
              _left = 50;
            } else if (
              index == 2 ||
              index == 5 ||
              index == 8 ||
              index == 11 ||
              index == 14
            ) {
              _left = 80;
            }

            if (index == 3) {
              _top = 80;
            } else if (index == 6) {
              _top = 120;
            } else if (index == 9) {
              _top = 160;
            }
            that.myChart3Option.title.push({
              subtext: data.PollutantName,
              left: _left + "%",
              top: _top + "%",
              textAlign: "center",
              subtextStyle: {
                fontWeight: "bold",
                fontSize: 16,
              },
            });

            that.myChart3Option.series.push({
              name: data.PollutantName,
              type: "pie",
              radius: "20%",
              center: [_left + "%", _top - 10 + "%"],
              data: [
                {
                  value: item.EffectiveNum,
                  name: "有效数据（注：指仪表周期测量日质控标样核查合格的数据）",
                },
                {
                  value: item.InvalidNum,
                  name: "无效数据（注：指仪表周期测量日质控标样核查未合格的数据）",
                },
              ],
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 14,
                  },
                  formatter: "{d}%",
                },
              },
            });
          });

          that.myChart3.setOption(that.myChart3Option);
          // if (firstCode != "") {
          //   that.getTableData(firstCode);
          // }
        }
        that.pictLoading = false;
      });
      that.pictLoading = false;
      that.myChart3.getZr().off("click");

      //点击柱状图，查看详情
      that.myChart3.getZr().on("click", function (event) {
        // 解决数值太小，点击困难的问题
        let point = [event.offsetX, event.offsetY];
        if (that.myChart3.containPixel("grid", point)) {
          let xIndex = that.myChart3.convertFromPixel(
            { seriesIndex: 0 },
            point
          )[0];
          let op = that.myChart3.getOption();
          let name = op.xAxis[0].data[xIndex];
          //let polId = that.SDL_Global.filter((m) => m.Name == name)[0].Code;
          that.getTableData(name);
        }
      });
      window.addEventListener("resize", () => {
        this.myChart3.resize();
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
      let url = "/getEffectiveDatas";
      if (params) {
        condition.StartDate = moment(params).format("YYYY-MM-01");
        condition.EndDate = moment(params).endOf("months").format("YYYY-MM-DD");
        url = "/getEffectiveDetails";
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
        }
      }, params);
    },
    resizeHandle() {
      this.myChart3.resize();
      this.getTableHeight();
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
#myChart3 {
  width: auto;
  min-height: 100%;
  /* position:relative; */
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