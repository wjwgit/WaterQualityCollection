<template>
    <div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="block">
                        <el-row>
                            <el-col :sm="7" :lg="7"  :md="7" :xl="4">
                                <label class="rwlx">时间</label>
                                <el-date-picker v-model="dateValue" type="datetimerange" :picker-options="pickerOptions"
                                    :clearable="false" unlink-panels style="width:77%" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd " size="small" @change="inquire"></el-date-picker>
                            </el-col>
                            <el-col :sm="7" :xs="7" :md="5" :xl="4">
                                <label class="rwlx">报备原因</label>
                                <el-select v-model="reportType" size="small" style="width: 60%" placeholder="请选择"
                                    @change="inquire">
                                    <el-option v-for="item in reportList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :sm="3" :xs="3" :md="4" :xl="4">
                                <el-button type="primary" size="small" @click="addReportInfo">添加</el-button>

                            </el-col>
                            <!-- <el-button type="primary" size="small" style="float: right" @click="getExcel">导出</el-button> -->
                            <!-- <excel :excelTitleName='excelTitleName' :exportHeader='exportHeader'
                                :exportFilterVal='exportFilterVal' :exportList='exportList'></excel> -->
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">

                <el-table :data="tableData.slice(
                    (this.pageIndex - 1) * this.pageSize,
                    (this.pageIndex - 1) * this.pageSize + this.pageSize
                  
                  )" v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)"
                    element-loading-text="数据正在加载中" :header-cell-style="{
              'background-color': '#384565',
            }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">
                    <el-table-column label="序号" align="center" prop="ID" width="80">
                    </el-table-column>
                    <el-table-column label="设备名称" align="center" prop="PolId" width="120">
                    </el-table-column>

                    <el-table-column label="开始时间" align="center" prop="StartTime" width="180">
                    </el-table-column>
                    <el-table-column label="结束时间" align="center" prop="EndTime" width="180">
                    </el-table-column>
                    <el-table-column label="报备原因" align="center" prop="ReasonType" width="110">
                    </el-table-column>
                    <el-table-column label="报备人" align="left" prop="ReportName" width="80">
                    </el-table-column>
                    <el-table-column label="处理状态" align="left" prop="Status" width="80">
                        <template slot-scope="scope">
                            <span style="color: #6ad2c2;"
                                v-if="scope.row.Status=='已完成'">{{scope.row.Status}}
                            </span>
                            <span style="color: #da666e;" v-else>{{scope.row.Status}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="耗时(h)" align="left" prop="TimeLen" width="80">
                    </el-table-column>
                    <el-table-column label="填报时间" align="left" prop="CreateDate" width="180">
                    </el-table-column>
                    <el-table-column label="备注" align="left" prop="Remark">
                    </el-table-column>

                    <el-table-column label="操作" align="left" width="120" fixed="right">
                        <template slot-scope="scope">
                            <span class="btn" size="mini" @click="editReportInfo(true,scope.row)">编辑
                            </span>
                            <span class="btn" size="mini" @click="editReportInfo (false,scope.row)">查看
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pageNations">
                    <el-pagination @current-change="currentPage" class="pageNation"
                        layout="total,sizes,prev, pager, next" :page-size="pageSize" :page-sizes="[5, 10, 20, 30, 50]"
                        @size-change="changeSize" :current-page="pageIndex" :total="total">
                    </el-pagination>
                </div>
                <!-- </div> -->
            </div>
        </div>
        <template class="dialogBox">
            <el-dialog class="div-dialog" :title="reportTitle" :visible.sync="reportModel" width="80%"
                :modal-append-to-body='false' :close-on-click-modal="false">

                <el-form :label-position="labelPosition" label-width="150px" :model="reportFrom" status-icon
                    ref="reportFrom" size="mini">

                    <el-form-item label="设备名称" prop="PolId">
                        <el-select v-model="reportFrom.PolId" size="small" placeholder="请选择">
                            <el-option v-for="item in optionDatas" :key="item.id" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报备原因" prop="ReasonType">
                        <el-select v-model="reportFrom.ReasonType" size="small" placeholder="请选择">
                            <el-option v-for="item in reportLists" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="StartTime">
                        <el-date-picker v-model="reportFrom.StartTime" type="datetime" :clearable="false"
                            value-format="yyyy-MM-dd HH:00:00" format="yyyy-MM-dd HH:00:00" size="small" unlink-panels>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="EndTime">
                        <el-date-picker v-model="reportFrom.EndTime" type="datetime" :clearable="false"
                            value-format="yyyy-MM-dd HH:00:00" format="yyyy-MM-dd HH:00:00" size="small" unlink-panels>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" prop="Remark">
                        <el-input type="textarea" v-model="reportFrom.Remark"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer" v-if="editshow">
                    <el-button size="small" @click="reportModel = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="addRepoetInfo('reportFrom')">确 定</el-button>
                </div>
            </el-dialog>
        </template>
        <!-- <template class="dialogBox">
            <el-dialog class="div-dialog" :title="yuNWeiName" :visible.sync="yunWeieditModel" width="80%"
                :modal-append-to-body='false' :close-on-click-modal="false">

                <div slot="footer" class="dialog-footer" v-if="editshow">
                    <el-button size="small" @click="yunWeieditModel = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="editYunWeilog">确 定</el-button>
                </div>
            </el-dialog>
        </template> -->
    </div>
</template>
<script>
    import moment from "moment";

    import excel from "../module/excel";
    export default {
        name: "bbjl",
        components: { excel },
        data() {
        
            let PolIdQuery = [{ value: "w00000", label: "流量" },]
            let MetersData = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) =>  m.ID != 'realFlow' && m.ID != 'CumulativeFlow' && m.ID != 'DaQiWenDu' && m.ID != 'DaQiShiDu' );
            MetersData.map(function (item, index) {
                let obj = {
                    value: item.Code,
                    label: item.Name
                }
                // 季度比对筛选
                if (item.Name != "藻密度" && item.Name != "叶绿素") {
                    PolIdQuery.push(obj);
                }
            })
            return {
                emptyText: "暂无数据",

                dateValue: [
                    moment(new Date() - 1000 * 3600 * 24 * 3).format("YYYY-MM-DD HH:mm:ss"),
                    moment(new Date()).format("YYYY-MM-DD 23:59:59"),
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
                reportType: "",
                reportList: [
                    {
                        value: "",
                        label: "全部",
                    },
                    {
                        value: "水位过低",
                        label: "水位过低",
                    },
                    {
                        value: "临时停电",
                        label: "临时停电",
                    },
                    {
                        value: "自然灾害",
                        label: "自然灾害",
                    },
                    {
                        value: "供电故障",
                        label: "供电故障",
                    },
                    {
                        value: "子站改造",
                        label: "子站改造",
                    },
                     {
                        value: "设备故障",
                        label: "设备故障",
                    },
                     {
                        value: "数据异常",
                        label: "数据异常",
                    },
                    {
                        value: "其他",
                        label: "其他",
                    }
                ],
                reportLists: [

                    {
                        value: "水位过低",
                        label: "水位过低",
                    },
                    {
                        value: "临时停电",
                        label: "临时停电",
                    },
                    {
                        value: "自然灾害",
                        label: "自然灾害",
                    },
                    {
                        value: "供电故障",
                        label: "供电故障",
                    },
                    {
                        value: "子站改造",
                        label: "子站改造",
                    },
                      {
                        value: "设备故障",
                        label: "设备故障",
                    },
                     {
                        value: "数据异常",
                        label: "数据异常",
                    },
                    {
                        value: "其他",
                        label: "其他",
                    }
                ],
                tableData: [],
                excelTitleName: '报备记录数据', //excel标题名字
                exportHeader: [], //导出 字段表头
                exportFilterVal: [], //表头对应字段
                exportList: [],//excel数据
                total: 0,
                pageIndex: 1,
                pageSize: 30,
                pictLoading: false,
                tableHeight: null,
                reportModel: false,
                labelPosition: "right",
                reportFrom: {
                    PolId: "w21001",
                    ReasonType: '水位过低',
                    StartTime: moment().format('YYYY-MM-DD HH:00:00'),
                    EndTime: null,
                    TimeLen: 0,
                    ReportName: localStorage.getItem("Loginedname"),
                    Remark: '',
                    ID:0
                },
                optionDatas:PolIdQuery,
                userName: localStorage.getItem("Loginedname"),

                reportTitle: "添加报备记录",
                editshow: true
            };
        },
        mounted() {
            // this.getOptionDatas();
            this.inquire();
            this.getHeight();
        },
        created() {
            window.addEventListener('resize', this.getHeight)
        },
        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        },
        methods: {

            getHeight() {
                this.tableHeight = window.innerHeight - 226
            },
            //获取设备下拉菜单
            // getOptionDatas() {
            //     let $this = this;
            //     this.socketApi.globalDataConfig.SDL_Global.MetersWC().map(function (
            //         item,
            //         index
            //     ) {
            //         if (item.Code != "w00000")
            //             $this.optionDatas.push({
            //                 value: item.Code,
            //                 label: item.Name,
            //                 id: item.ID,
            //             });
            //     });
            // },
            // 查询运维数据
            inquire() {

                this.pictLoading = true;
                this.tableData = [];
                this.emptyText = "";
                if (
                    parseInt(new Date(this.dateValue[1]) - new Date(this.dateValue[0])) /
                    (1000 * 60 * 60 * 24) >
                    100
                ) {
                    this.emptyText = "暂无数据";
                    this.tableData = [];

                    this.pictLoading = false;

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


                let condition = "";
                condition = "StartTime BETWEEN '" + this.dateValue[0] + "' and '" + this.dateValue[1] + "'";
                if (this.reportType != "") {
                    condition = condition +
                        " and ReasonType = '" +
                        this.reportType +
                        "'";
                }
                condition += "ORDER BY `STATUS`, `CreateDate`";
                this.http
                    .comMethod("*", "tbreport", condition)
                    .then((res) => {
                        this.pictLoading = false;
                        if (res.length != 0) {
                            res.forEach((r) => {
                                if (r.StartTime != null) {
                                    r.StartTime = this.$options.filters.dateFormat(r.StartTime);

                                }
                                if (r.EndTime != null) {
                                    r.EndTime = this.$options.filters.dateFormat(r.EndTime);
                                }
                                r.Status = r.Status == 0 ? '处理中' : '已完成'
                                r.CreateDate = this.$options.filters.dateFormat(r.CreateDate);
                                r["PolId"] =this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]);// this.funfactor(r["PolId"]);


                            });
                            this.tableData = res;
                            this.total = res.length
                        } else {
                            // this.emptyText = "暂无数据"
                            this.total = 0

                        }
                    })
                    .catch((res) => {
                        console.log(res);

                    });
            },
            //翻填报备记录
            editReportInfo(flag, info) {
                if (flag) {
                    this.reportTitle = '编辑报备记录';
                    this.editshow = true;

                } else {
                    this.reportTitle = '查看报备记录';
                    this.editshow = false;
                };
                this.reportModel = true;

                // this.reportFrom.PolId =this.funfactorName(info.PolId)  ;
                this.reportFrom.PolId =  this.socketApi.globalDataConfig.getCodeNameData(info.PolId); //this.funfactor(r["PolId"])
                  if(this.reportFrom.PolId=='w00000'){
                    r["PolId"] = '流量'
                  }
                console.log('PolId',  this.reportFrom.PolId);
                this.reportFrom.ReasonType = info.ReasonType;
                this.reportFrom.StartTime = info.StartTime;
                this.reportFrom.EndTime = info.EndTime;
                this.reportFrom.ReportName = info.ReportName;
                this.reportFrom.Remark = info.Remark;
                this.reportFrom.ID = info.ID;

            },
            // 重置添加表单
            addReportInfo() {
                this.reportModel = true;
                this.reportTitle='添加报备记录';
                this.editshow = true;

                this.reportFrom.PolId = '';
                this.reportFrom.ReasonType = '水位过低';
                this.reportFrom.StartTime = moment().format('YYYY-MM-DD HH:00:00');
                this.reportFrom.EndTime = null;
                this.reportFrom.TimeLen = 0;
                this.reportFrom.Status = 0;
                this.reportFrom.ID=0;
                this.reportFrom.ReportName = localStorage.getItem("Loginedname");
                this.reportFrom.Remark = '';
            },

            // 添加/编辑报备信息
            addRepoetInfo() {


                if (this.reportFrom.StartTime != null && this.reportFrom.EndTime != null) {
                    if (moment(this.reportFrom.StartTime).isBefore(this.reportFrom.EndTime)) {
                        this.reportFrom.TimeLen = moment(this.reportFrom.EndTime).diff(moment(this.reportFrom.StartTime), 'hours');
                        this.reportFrom.Status = 1;
                    } else {
                        this.$message.error('结束时间不能小于开始时间');
                        return
                    }
                }
                debugger
                if(this.reportFrom.PolId==''){
                    this.$message.error('请选择设备名称');
                        return
                }
                // this.reportFrom.PolId =this.funfactorName(this.reportFrom.PolId)  ;
                console.log('PolId',  this.reportFrom.PolId);

                let $this = this;
                console.log('$this.reportFrom', $this.reportFrom)
                console.log('EndTime', $this.reportFrom.EndTime)
                this.http
                    .post("/updateReport",
                        $this.reportFrom
                    )
                    .then((res) => {
                        // setTimeout(() => {
                        this.pictLoading = false;
                        // }, 1000);

                        if (res.affectedRows > 0) {
                            this.$message.success("操作成功");
                            this.inquire()
                            let operator = '';
                            if (this.reportFrom.ID > 0) {

                                operator = '编辑报备记录'
                            } else {
                                operator = '添加报备记录';

                            }
                            let cmdargs = JSON.stringify($this.reportFrom);
                            // this.addlog(operator, cmdargs)
                            this.http.addLog(operator, cmdargs, true);

                        } else {
                            this.$message.error("添加失败");
                        }
                    })
                    .catch((res) => {
                        setTimeout(() => {
                            this.pictLoading = false;
                        }, 1000);
                        // console.log(res);
                        this.$message.error(res);
                    });
                this.reportModel = false;

            },
            // 获取上次运维时间
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
                    return "流量";
                } else if (val == "w01009") {
                    return "溶解氧";
                } else if (val == "w01014") {
                    return "电导率";
                } else if (val == "w01003") {
                    return "浊度";
                } else if (val == "w01001") {
                    return "pH值";
                } else if (val == "w01010") {
                    return "水温";
                } else if (val == "w01016") {
                    return "叶绿素";
                } else if (val == "w19011") {
                    return "藻密度";
                } else if (val == "w90001") {
                    return "室内温度";
                } else if (val == "w90002") {
                    return "室内湿度";
                }

          
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
                } else if (val == "pH值") {
                    return "w01001";
                } else if (val == "水温") {
                    return "w01010";
                }else if (val == "室内温度") {
                    return "w90001";
                } else if (val == "室内湿度") {
                    return "w90002";
                }
            },
            // 添加日志
            // addlog(operator, cmdargs) {

            //     let time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //     this.http
            //         .post("/addlog", {
            //             OPTIME: time,
            //             username: localStorage.getItem("Loginedname"),
            //             operator: operator,
            //             cmdargs: cmdargs,
            //         })
            //         .then((res) => {

            //             // let ml = "日志上传=" + operator
            //             // this.Sendml("日志上传", ml)
            //         })
            //         .catch((res) => {
            //             // console.log(res);
            //             this.$message.error(res);
            //         });
            // },
            // 分页
            currentPage(val) {
                this.pageIndex = val;
                this.inquire()
            },
            changeSize(val) {
                this.pageSize = val;
                this.inquire()
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

    .el-input__inner {
        color: #cccccc !important;
    }

    /* 时间框显示 */
    .el-date-range-picker__time-header .el-input__inner {
        color: #000 !important;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
    @media only screen and (max-width: 1024px) {
        .el-col-md-6 {
            width: 40% !important;
        }
        .el-col-sm-7 {
            width: 35% !important;
      
        }
    }
    @media only screen and (max-width: 1366px) {
        .el-col-md-6 {
            width: 30% !important;
        }
    }
    .el-select {
        width: 100%;
    }
</style>