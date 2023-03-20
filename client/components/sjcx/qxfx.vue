<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <el-col :sm="12" :md="12" :lg="9" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker v-show="selecpatterns=='小时数据'||selecpatterns=='小时数据a'" v-model="dateValue" type="datetimerange" unlink-panels :picker-options="pickerOptions"
                  style="width: 87%" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss " class="times" value-format="yyyy-MM-dd HH:mm:ss" size="small"
                  @change="inquire"></el-date-picker>

                  <el-date-picker v-show="selecpatterns=='tbdaydata'" v-model="dateValue" type="datetimerange" unlink-panels :picker-options="pickerOptions"
                  style="width: 87%" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                  format="yyyy-MM-dd" class="times" value-format="yyyy-MM-dd" size="small"
                  @change="inquire"></el-date-picker>

              </el-col>
              <el-col :sm="6" :md="5" :xl="4">
                <label class="rwlx">数据类型</label>
                <el-select v-if="SoftType==32" v-model="selecpatterns" placeholder="请选择" @change="pattern"
                  style="width: 75%" class="seltype" size="small">
                  <el-option v-for="item in patternOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-else v-model="selecpattern" placeholder="请选择" @change="pattern" style="width: 75%"
                  class="seltype" size="small">
                  <el-option v-for="item in patternOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="7" :md="7" :xl="4">
                <label class="rwlx">因子</label>
                <el-select class="selquery" size="small" v-model="jcyz" style="width: 75%" placeholder="请选择" multiple
                  collapse-tags @change="factorChange">
                  <el-option v-for="item in jcyzOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
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
      <div id="myChart" v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)"
        element-loading-text="数据正在加载中"></div>
      <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  // import tables from "../module/tables";
  import excel from "../module/excel";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "qxfx",
    // components: { excel, tables },
    data() {
      let jcyzQuery = []
      this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().map(function (item, index) {

        let obj = {
          value: item.Code,
          label: item.Name
        }

        // if (item.Name != "藻密度" && item.Name != "叶绿素") {
          jcyzQuery.push(obj);

        // }


      })

      return {
        SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,

        jcyz: [
          "w21001",
          "w21011",
          "w21003",
          "w01001",
          "w01010",
          // "w01003",
          // "w01014",
          // "w01009",
        ],
        jcyzvalue: [],
        jcyzOptions: jcyzQuery,

        // [
        //   // { value: "", label: "所有" },
        //   { value: "w21001", label: "总氮" },
        //   { value: "w21011", label: "总磷" },
        //   { value: "w21003", label: "氨氮" },
        //   { value: "w01019", label: "高锰酸盐指数" },
        //   { value: "w01001", label: "pH" },
        //   { value: "w01010", label: "水温" },
        //   { value: "w01003", label: "浊度" },
        //   { value: "w01014", label: "电导率" },
        //   { value: "w01009", label: "溶解氧" },
        // ],
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
        dateValue: [
          moment(new Date() - 1000 * 3600 * 24 * 33).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        ],
        patternOption: [
          {
            value: "小时数据a",
            label: "小时数据",
          }
        ],
        patternOptions: [
          {
            value: "小时数据",
            label: "小时数据",
          },
          {
            value: "tbdaydata",
            label: "日均数据",
          },
        ],
        selecpatterns: "小时数据",
        selecpattern: "小时数据a",
        myChart: [],
        option: [],
        xAxisData: [],
        chartData: [],
        pictLoading: false,
      };
    },
    mounted() {
      this.inquire();
      // this.echart()
      this.$store.state.isCollapse;
      // console.log("ssss", localStorage.getItem("isCollapse"));
    },
    computed: {
      ...mapGetters({
        getIsCollapse: 'getIsCollapse'
      })
    },

    watch: {
      /* 监听getSidebarFold变化，解决echarts容器变化，重新渲染 setTimeout时间必须设置，且不能太短 */
      getIsCollapse() {

        setTimeout(() => {
          this.resizeHandle()
        }, 100)
      }
    },
    methods: {
      inquire() {
        this.pictLoading = true;
        if (this.dateValue == null) {
          this.pictLoading = false;
        }
        // const loading = this.$loading({
        //     lock: true,//lock的修改符--默认是false
        //     text: 'Loading',//显示在加载图标下方的加载文案
        //     spinner: 'el-icon-loading',//自定义加载图标类名
        //     background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
        //     target: document.querySelector('#table')//loadin覆盖的dom元素节点
        // })
        // setTimeout(() => {
        //     loading.close();
        // }, 1000);
        if (
          parseInt(new Date(this.dateValue[1]) - new Date(this.dateValue[0])) /
          (1000 * 60 * 60 * 24) >
          100
        ) {
          this.pictLoading = false;
          this.tableData = []
          this.emptyText = "暂无数据"

          this.$message({
            message: "时间不能大于100天",
            type: "warning",
            duration: 2000,
          });
          return;
        }
        this.xAxisData = [];
        this.chartData = []; //图表数据源
        let name = ""; //列名
        let condition = "";
        let tabsource = ""
        condition =
          "DataTime BETWEEN '" +
          this.dateValue[0] +
          "' and '" +
          this.dateValue[1] +
          "'";
        if (this.SoftType == 32) {
          this.jcyz.forEach((c) => {
            name += "`" + c + "_Avg" + "`,";
            // name += "`" + c + "_Flag" + "`,";
          });
          tabsource = this.selecpatterns
        } else {
          this.jcyz.forEach((c) => {
            name += "`" + c + "-Avg" + "`,";
            name += "`" + c + "-Flag" + "`,";
          });
          tabsource = this.selecpattern

        }

        name += "`" + "DataTime" + "`,";
        //获取列名
        this.columnName = name.substring(0, name.length - 1);
        this.http
          .comMethod(this.columnName, tabsource, condition)
          .then((res) => {
            // setTimeout(() => {
            this.pictLoading = false;
            // }, 1000);
            if (res.length != 0) {
              // res = res.reverse()
              //图表数据
              res.forEach((r) => {

                // let obj;
                if (tabsource == "小时数据" || tabsource == "小时数据a") {
                  r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                  r.DataTime = r.DataTime.substring(0, 13) + ":00:00";
                } else {
                  r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                  r.DataTime = r.DataTime.substring(0, 11);

                }
                if (this.SoftType == 32) {
                  r["w01001_Avg"] =
                    r["w01001_Avg"] == null
                      ? "--"
                      : r["w01001_Avg"].toFixedFormat(2);
                  r["w01003_Avg"] =
                    r["w01003_Avg"] == null
                      ? "--"
                      : r["w01003_Avg"].toFixedFormat(2);
                  r["w01009_Avg"] =
                    r["w01009_Avg"] == null
                      ? "--"
                      : r["w01009_Avg"].toFixedFormat(2);
                  r["w01010_Avg"] =
                    r["w01010_Avg"] == null
                      ? "--"
                      : r["w01010_Avg"].toFixedFormat(1);
                  r["w01014_Avg"] =
                    r["w01014_Avg"] == null
                      ? "--"
                      : r["w01014_Avg"].toFixedFormat(2);
                  r["w01018_Avg"] =
                    r["w01018_Avg"] == null
                      ? "--"
                      : r["w01018_Avg"].toFixedFormat(3);
                  r["w21001_Avg"] =
                    r["w21001_Avg"] == null
                      ? "--"
                      : r["w21001_Avg"].toFixedFormat(3);
                  r["w21003_Avg"] =
                    r["w21003_Avg"] == null
                      ? "--"
                      : r["w21003_Avg"].toFixedFormat(3);
                  r["w21011_Avg"] =
                    r["w21011_Avg"] == null
                      ? "--"
                      : r["w21011_Avg"].toFixedFormat(4);
                      
                } else {
                  r["w01001-Avg"] =
                    r["w01001-Avg"] == null
                      ? "--"
                      : r["w01001-Avg"].toFixedFormat(2);
                  r["w01003-Avg"] =
                    r["w01003-Avg"] == null
                      ? "--"
                      : r["w01003-Avg"].toFixedFormat(2);
                  r["w01009-Avg"] =
                    r["w01009-Avg"] == null
                      ? "--"
                      : r["w01009-Avg"].toFixedFormat(2);
                  r["w01010-Avg"] =
                    r["w01010-Avg"] == null
                      ? "--"
                      : r["w01010-Avg"].toFixedFormat(1);
                  r["w01014-Avg"] =
                    r["w01014-Avg"] == null
                      ? "--"
                      : r["w01014-Avg"].toFixedFormat(2);
                  r["w01019-Avg"] =
                    r["w01019-Avg"] == null
                      ? "--"
                      : r["w01019-Avg"].toFixedFormat(3);
                  r["w21001-Avg"] =
                    r["w21001-Avg"] == null
                      ? "--"
                      : r["w21001-Avg"].toFixedFormat(3);
                  r["w21003-Avg"] =
                    r["w21003-Avg"] == null
                      ? "--"
                      : r["w21003-Avg"].toFixedFormat(3);
                  r["w21011-Avg"] =
                    r["w21011-Avg"] == null
                      ? "--"
                      : r["w21011-Avg"].toFixedFormat(4);
                }

                //x轴
                this.xAxisData.push(r.DataTime);
              });
              var datatest = [];
              //chart数据源
              for (let i = 0; i < this.jcyz.length; i++) {
                let datas = [];
                for (let k = 0; k < res.length; k++) {

                  if (this.SoftType == 32) {
                    datas.push(res[k][this.jcyz[i] + "_Avg"]);

                  } else {
                    datas.push(res[k][this.jcyz[i] + "-Avg"]);

                  }
                }
                datatest.push(datas);
              }
              // console.log("test", datatest);
              //series
              for (let k = 0; k < this.jcyz.length; k++) {
                // this.funfactor(this.jcyz[k])
                let obj = {
                  name:this.socketApi.globalDataConfig.getCodeNameData(this.jcyz[k]) ,
                  type: "line",
                  data: datatest[k],
                  symbol: "circle",
                };
                this.chartData.push(obj);
              }
              // this.chartData = res;

              // console.log("图表数据", this.chartData);
              // console.log("shijian ", this.xAxisData);
              let $this = this;
              setTimeout(() => {
                $this.echart();
              }, 100);
            } else {
              // alert("暂无数据")
              // this.$message.error("暂无数据");
              let $this = this;
              setTimeout(() => {
                $this.echart();
              }, 100);
            }
          })
          .catch((res) => {
            setTimeout(() => {
              this.pictLoading = false;
            }, 1000);
            this.$message.error("服务端错误");
            // console.log(res);
          });
      },
      resizeHandle() {
        this.myChart.resize();
      },
      echart: function () {
        this.jcyzvalue = [];
        this.jcyz.forEach((r) => {
          
          this.jcyzvalue.push(this.socketApi.globalDataConfig.getCodeNameData(this.funfactor(r)));//this.funfactor(r)
        });
        // console.log("图例", this.jcyzvalue);
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById("myChart"));

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

        this.option = {
          title: {
            text: "多因子曲线分析",
            textStyle: {
              color: "#fff",
            },
            padding: [20, 20, 10, 50]  // 位置
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
          color: ['#2fe99c', '#468ef0', '#ad40e6', '#00bff4', '#ffc84f', '#879a5f', '#f274c5', '#7ba9b6', '#fe8a7d', '#c5a86f', '#008aa7', '#ea8ef8', '#45a99a', '#ffe47a', '#7666be'],
          legend: {
            data: this.jcyzvalue,
            textStyle: {
              color: "#fff",
            },
            top: 40,
          },
          grid: {
            top: "15%",
            left: "3%",
            right: "5%",
            bottom: "8%",
            containLabel: true,
          },
          dataZoom: [
            {
              type: "slider",
              xAxisIndex: 0,
              filterMode: "empty",
              textStyle: { color: "#fff" },
              borderColor: "#455474",
              backgroundColor: "#455474",
              fillerColor: "#2e3f62",
              // filterMode: 'filter',
            },
            {
              type: "slider",
              yAxisIndex: 0,
              filterMode: "empty",
              textStyle: { color: "#fff" },
              borderColor: "#455474",
              backgroundColor: "#455474",
              fillerColor: "#2e3f62",
            },
            {
              type: "inside",
              xAxisIndex: 0,
              filterMode: "empty",
              throttle: 20
            },
          ],
          xAxis: {
            type: "category",
            // boundaryGap: false,
            data: this.xAxisData,
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
            // axisLine: {//x轴线的颜色以及宽度
            //     show: true,
            //     lineStyle: {
            //         color: "rgba(219,225,255,1)",
            //         width: 0,
            //         type: "solid"
            //     }
            // },
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
          series: this.chartData,
        };

        if (this.chartData.length != 0) {
          window.addEventListener("resize", () => {
            this.myChart.resize();
          });
          this.myChart.clear();
          this.myChart.setOption(this.option);
        } else {
          var html =
            "<div><span style='color:#cccccc;position:absolute;top:30%;left:45%'>暂无数据</span></div>";
          document.getElementById("myChart").innerHTML = html;
          document
            .getElementById("myChart")
            .removeAttribute("_echarts_instance_");
        }
      },
      // handleChange() {
      //     this.$emit('on-change', !this.collapsed)
      //     setTimeout(function () {
      //         var evt = window.document.createEvent("UIEvents");
      //         evt.initUIEvent("resize", true, false, window, 0);
      //         window.dispatchEvent(evt);
      //     }, 200);
      // },

      //切换因子
      factorChange: function () {
        // alert(this.jcyz)
        this.inquire();
      },
      pattern: function () {
        // alert(this.selecpattern);
        this.inquire();
      },
      //因子
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
        } else if (val == "w01001") {
          return "pH";
        } else if (val == "w01010") {
          return "水温";
        } else if (val == "w01003") {
          return "浊度";
        } else if (val == "w01014") {
          return "电导率";
        } else if (val == "w01009") {
          return "溶解氧";
        } else if (val == "w19011") {
          return "藻密度";
        } else if (val == "w01016") {
          return "叶绿素";
        } else {
          return "";
        }
      },
      //分页
      currentPage(val) {
        this.page = val;
      },
      changeSize(val) {
        this.size = val;
      },
    },
  };
</script>
<style scoped>
  #myChart {
    width: 98%;
    height: calc(100vh - 180px);
    min-height: 500px;
    /* position:relative; */
  }

  .converBox {
    margin: 0 20px;
    background-color: #303a4c;
    /* position:  absolute; */
  }

  @media only screen and (max-width: 1920px) {
    .selquery {
      width: 178px !important;
    }

    .seltype {
      width: 110px !important;
    }

    .times {
      width: 342px !important;

    }
  }
</style>