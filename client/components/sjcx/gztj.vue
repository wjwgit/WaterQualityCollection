<template>
    <div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="block">
                        <el-row>
                            <el-col :sm="12" :md="12" :lg="9" :xl="6">
                                <label class="rwlx">时间</label>
                                <el-date-picker v-model="dateValue" type="datetimerange" unlink-panels
                                    :picker-options="pickerOptions" style="width: 87%" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" class="times"
                                    value-format="yyyy-MM-dd" size="small" @change="inquire">
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
        name: "gztj",
        // components: { excel, tables },
        data() {
            return {
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
                        "YYYY-MM-DD"
                    ),
                    moment(new Date()).format("YYYY-MM-DD"),
                ],
                myChart: [],
                factorOption: [],
                xAxisData: [],
                seriesData: [],
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
                this.xAxisData = [];
                this.seriesData = []; //图表数据源
                this.seriesResizeData = []; //图表数据源
                let condition = "";
                condition =
                    "  Type in (0,1) and  AlarmID!='' and DataTime BETWEEN '" +
                    this.dateValue[0] +
                    "' and '" +
                    this.dateValue[1] +
                    "'group by PolId";

                let queryCol = "`PolId`,count(`PolId`),Info";
                //获取列名
                this.http
                    .comMethod(queryCol, '仪表日志', condition)
                    .then((res) => {
                        // setTimeout(() => {
                        this.pictLoading = false;
                        // }, 1000);
                        if (res.length != 0) {

                            var datatest = [];

                            //图表数据
                            for (let i = 0; i < res.length; i++) {
                                // let factor = ""
                                // factor = this.funfactor(res[i].PolId);
                                if (factor == 'w00000') {
                                    factor = '系统';
                                }else{
                                    let factor= this.socketApi.globalDataConfig.getCodeNameData(res[i].PolId); //this.funfactor(r["PolId"])
                                }
                                this.xAxisData.push(factor)

                                let obj = {
                                    value: res[i]["count(`PolId`)"],
                                    groupId: factor,
                                };
                                this.seriesData.push(obj);
                            }
                            let conditions = "  Type in (0,1) and  AlarmID!='' and DataTime BETWEEN '" +
                                this.dateValue[0] +
                                "' and '" +
                                this.dateValue[1] +
                                "'group by PolId ,Info";


                            //获取列名
                            this.http
                                .comMethod(queryCol, '仪表日志', conditions)
                                .then((res) => {

                                    if (res.length != 0) {
                                        // var datatests = [];
                                        console.log('单因子', res)
                                        let $this = this;
                                        let factors = ""
                                        var arrdata = []
                                        for (let k = 0; k < this.xAxisData.length; k++) {
                                            let obj = {
                                                dataGroupId: this.xAxisData[k],
                                                data: []
                                            };
                                            this.seriesResizeData.push(obj)
                                        }
                                        //图表数据
                                        for (let i = 0; i < res.length; i++) {

                                            for (let j = 0; j < this.seriesResizeData.length; j++) {
                                               
                                                // this.funfactor(res[i].PolId) 
                                                if ( this.socketApi.globalDataConfig.getCodeNameData(res[i].PolId)== this.seriesResizeData[j].dataGroupId) {
                                                    let arr = [this.strClear(res[i]["Info"]), res[i]["count(`PolId`)"]]
                                                    this.seriesResizeData[j].data.push(arr)
                                                }
                                            }
                                        }

                                        console.log('单因子故障', this.seriesResizeData)


                                    } else {

                                        // this.echart();
                                    }
                                })
                                .catch((res) => {

                                    let $this = this;
                                    setTimeout(() => {
                                        $this.pictLoading = false;
                                    }, 1000);
                                    this.$message.error("服务端错误");
                                    // console.log(res);
                                });
                            let $this = this;
                            setTimeout(() => {
                                $this.echart();
                            }, 100);
                        } else {

                            this.echart();
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

                // 基于准备好的dom，初始化echarts实例
                this.myChart = this.$echarts.init(document.getElementById("myChart"));
                this.factorOption = {
                    title: {
                        text: '故障统计',
                        // textStyle: {
                        //     color: '#777'
                        // },
                        textStyle: {
                            color: "#fff",
                        },
                        // padding: 15,
                        padding: [20, 20, 10, 50]  // 位置
                    },
                    legend: {
                        show: true,
                        padding: 50,    // [5, 10, 15, 20]
                        textStyle: { color: '#fff' },
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
                    tooltip: {
                        trigger: 'axis',
                        formatter(params) {


                            return params[0].name + '<br/>' + '故障个数: ' + params[0].value;


                        }
                    },
                    color: "#468ef0",
                    xAxis: {
                        data: this.xAxisData,
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
                    yAxis: {
                        name: "数量:（个）",
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
                    grid: {
                        top: "15%",
                        left: "3%",
                        right: "5%",
                        bottom: "8%",
                        containLabel: true,
                    },
                    dataGroupId: '',
                    animationDurationUpdate: 500,
                    series: {
                        type: 'bar',
                        id: 'sales',
                        name: '故障个数',
                        barWidth: 100,
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        data: this.seriesData,
                        universalTransition: {
                            enabled: true,
                            divideShape: 'clone'
                        }
                    }
                };

                // this.myChart.clear();
                this.myChart.setOption(this.factorOption);
                let $this = this;
                $this.myChart.on('click', function (event) {

                    if (event.data) {
                        var subData = $this.seriesResizeData.find(function (data) {
                            return data.dataGroupId === event.data.groupId;
                        });
                        if (!subData) {
                            return;
                        }

                        let alarmOptions = {
                            title: {
                                text: subData.dataGroupId + '-故障统计',
                                textStyle: {
                                    color: '#fff'
                                },

                                padding: [20, 20, 10, 50]  // 位置
                            },
                            xAxis: {
                                data: subData.data.map(function (item) {
                                    return item[0];
                                })
                            },
                            series: {
                                type: 'bar',
                                id: 'sales',
                                barWidth: 100,
                                name: '故障个数',
                                dataGroupId: subData.dataGroupId,
                                data: subData.data.map(function (item) {
                                    return item[1];
                                }),
                                universalTransition: {
                                    enabled: true,
                                    divideShape: 'clone'
                                }
                            },
                            graphic: [
                                {
                                    type: 'text',
                                    left: 50,
                                    top: 50,
                                    style: {
                                        text: '返回',
                                        fontSize: 14,
                                        fill: '#fff',

                                    },
                                    onclick: function () {
                                        $this.myChart.clear();
                                        $this.myChart.setOption($this.factorOption);
                                    }
                                }
                            ]
                        }
                        $this.myChart.setOption(alarmOptions);
                    }
                });

                if (this.seriesData.length != 0) {
                    window.addEventListener("resize", () => {
                        this.myChart.resize();
                    });
                    this.myChart.clear();
                    this.myChart.setOption(this.factorOption);
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
                } else if (val == "w00000") {
                    return "系统";
                } else {
                    return "";
                }
            },
            strClear: function clear(str) {
                str = str.replace('//', "");//取消字符串中出现的所有逗号 
                str = str.replace('//', "");//取消字符串中出现的所有逗号 
                return str;
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
            width: 100px !important;
        }

        .times {
            width: 342px !important;

        }
    }
</style>