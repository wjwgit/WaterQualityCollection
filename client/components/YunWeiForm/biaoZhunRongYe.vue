<template>
    <div>
        <el-dialog class="div-dialog" title="打印标准溶液核查记录" :visible.sync="dialogBiaoYeVisible" width="746px"
            :modal-append-to-body='false' :close-on-click-modal="false">
            <div id="printBiaoZhunRongYeHeChaData">
                <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">
                    标准溶液核查记录表
                </div>
                <div>
                    <table style="border: 1px solid #000;text-align:left;width:100%" cellspacing="0">
                        <tr style="height: 60px">

                            <td colspan="8" v-if="isPrint" style="border-bottom: 1px solid #000">
                                <div style="margin: 8px; margin-bottom: 15px">
                                    <span style="display: inline-block; width: 49%">
                                        企业名称:
                                        <span>
                                            {{ SDL_Global.SYS.CompanyName }}
                                        </span>
                                    </span>
                                    <span style="display: inline-block; width: 49%">
                                        维护管理单位:
                                        <span>
                                            {{ SDL_Global.SYS.YunWeiCompanyName }}
                                        </span>
                                    </span>
                                </div>
                                <div style="margin: 8px">
                                    <span style="display: inline-block; width: 49%">
                                        安装地点:
                                        <span>
                                            {{ SDL_Global.SYS.PointName }}
                                        </span>
                                    </span>
                                    <span style="display: inline-block; width: 49%">
                                        维护保养人:
                                        <!-- <span>
                                            {{ SDL_Global.SYS.OptUserName }}
                                        </span> -->
                                    </span>
                                </div>
                            </td>
                            <td colspan="9" v-else style="border-bottom: 1px solid #000">
                                <div style="margin: 8px; margin-bottom: 15px">
                                    <span style="display: inline-block; width: 49%">
                                        企业名称:
                                        <span>
                                            {{ SDL_Global.SYS.CompanyName }}
                                        </span>
                                    </span>
                                    <span style="display: inline-block; width: 49%">
                                        维护管理单位:
                                        <span>
                                            {{ SDL_Global.SYS.YunWeiCompanyName }}
                                        </span>
                                    </span>
                                </div>
                                <div style="margin: 8px">
                                    <span style="display: inline-block; width: 49%">
                                        安装地点:
                                        <span>
                                            {{ SDL_Global.SYS.PointName }}
                                        </span>
                                    </span>
                                    <span style="display: inline-block; width: 49%">
                                        维护保养人:
                                        <!-- <span>
                                            {{ SDL_Global.SYS.OptUserName }}
                                        </span> -->
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr height="35px">
                            <!-- <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">时间</td> -->
                            <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">完成时间</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                监测项目</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                单位</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                标准浓度值
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                仪器测试值
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">误差
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">技术要求
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">是否合格
                            </td>
                            <td v-if="!isPrint"
                                style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">操作
                            </td>
                        </tr>
                        <tr height="35px" v-for="(item,index) in bzryDataList">
                            <td style="padding-left:8px;border-bottom: 1px solid #000;">{{item.CompleteDate}}</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.Name}}
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.Unit}}
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.StandardValue}}</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.YQTestValue}}</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.TestRrror}}</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.RequireInfo}}</td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                {{item.Status}}</td>
                            <td v-if="!isPrint"
                                style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                                <el-button size="mini" type="danger" icon="el-icon-delete" circle
                                    @click="delData(index)">
                                </el-button>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
            <div>
                <div style="width: 12%;display: inline-block;text-align: left;">
                    <el-button v-if="!isPrint" size="small" @click="printBiaoYeData" style="margin-top: 20px">
                        标液数据
                        <!-- <i class="el-icon-edit el-icon--right"></i> -->
                    </el-button>
                </div>
                <div style="width: 82%;display: inline-block;">
                    <el-button v-if="isPrint" size="small" @click="editBtn" style="margin-top: 20px">
                        编辑
                        <i class="el-icon-edit el-icon--right"></i>
                    </el-button>
                    <el-button v-if="!isPrint" size="small" @click="saveBtn" :loading="loadingflag"
                        style="margin-top: 20px">
                        保存
                        <i class="el-icon-edit el-icon--right"></i>
                    </el-button>
                    <el-button v-show="!isPrint" size="small" @click="backBtn" type="primary" style="margin-top:20px;">
                        返回
                    </el-button>
                    <el-button size="small" v-if="isPrint" v-print="printContent" style="margin-top:20px;">
                        打印
                        <i class="el-icon-edit el-icon--right"></i>
                    </el-button>
                </div>
            </div>




        </el-dialog>
        <!-- 打印 -->
        <template class="dialogBox">
            <el-dialog title="选择标样核查数据" :visible.sync="biaoYnagModel" width="500px" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div class="dialogBody">
                    <el-row class="rowdiv">
                        <el-col :span="5">
                            核查时间
                        </el-col>
                        <el-col :span="12">

                            <el-date-picker v-model="hechaTime" type="date" value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd" size="small" unlink-panels>
                                <!-- value-format="yyyy-MM-dd HH" -->
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="rowdiv">
                        <el-col :span="5">
                            因子
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="printPolId" size="small" placeholder="请选择">
                                <el-option v-for="item in PolIdList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>

                        </el-col>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="24" style="margin-top:20px ;">
                            <el-button size="small" @click="biaoYnagModel = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="getBiaoYeData">录 入</el-button>
                        </el-col>

                    </el-row>
                </div>
            </el-dialog>
        </template>
    </div>

</template>
<script>
    import moment from "moment";

    export default {
        props: {
            biaoZhunRongYeModel: {
                type: Boolean,
                default: () => false
            },
        },
        data() {
            let PolIdList = [
                { value: "", label: "全部" },
                // { value: "w00000", label: "流量" },
            ]
            let MetersData = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.ID != 'realFlow' && m.ID != 'CumulativeFlow' && m.ID != 'DaQiWenDu' && m.ID != 'DaQiShiDu');
            MetersData.map(function (item, index) {
                let obj = {
                    value: item.Code,
                    label: item.Name
                }
                // 季度比对筛选
                // if (item.Name != "藻密度" && item.Name != "叶绿素") {
                PolIdList.push(obj);
                // }
            })

            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                bzryDataList: [],
                isPrint: false,
                biaoYnagModel: false,
                hechaTime: moment(new Date()).format("YYYY-MM-DD"),
                printPolId: '',
                PolIdList: PolIdList,
                loadingflag:false,
                tableCount: 0,
                printContent: {
                    id: 'printBiaoZhunRongYeHeChaData',
                    preview: false,//预览工具是否启用
                    previewTitle: '这是预览标题',//预览页面的标题
                    popTitle: '水样比对记录表',//打印页面的页眉
                    // extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.cSs/4.1.1/animate.compat.css，https://cdn.boc
                    extraHead: '<meta http-equiv="content-Language"content="zh-cn"/>',
                    previewBeforeopencallback() {
                        console.log('正在加载预览窗口')
                    },
                    previewOpencallback() {
                        console.log('已经加载完预览窗口')
                    },
                    beforeopencallback(vue) {
                        vue.printLoading = trueconsole.log('打开之前')
                    },
                },
            }
        },
        mounted() {

            // console.log('print', this.printywjl);
            // this.cleardbDataList();
        },
        computed: {
            dialogBiaoYeVisible: {
                // getter
                get: function () {

                    return this.biaoZhunRongYeModel;
                },
                // setter
                set: function (newVal) {


                    if (!newVal) {
                        this.$emit("update:biaoZhunRongYeModel", false); //触发 input 事件，并传入新值
                    }
                }
            },
        },
        methods: {
            printBiaoYeData() {
                this.biaoYnagModel = true;
            },
            // 录入标样核查数据
            getBiaoYeData() {
                debugger
                let that = this;
                that.http
                    .get("/getYW_BYHCList", {
                        hechaTime: that.hechaTime,
                        Pol: that.printPolId
                    })
                    .then((res) => {
                        res.forEach((r) => {
                            if (r.DataTime != null) {
                                r.DataTime = that.$options.filters.dayFormat(
                                    r.DataTime
                                );
                            }
                        });
                        if (res.length > 0) {
                            if (that.printPolId != "") {
                                that.bzryDataList = that.bzryDataList.filter(m => m.CompleteDate != that.hechaTime && m.Pol != that.socketApi.globalDataConfig.getCodeNameData(that.printPolId))
                            }
                            else {
                                that.bzryDataList = that.bzryDataList.filter(m => m.CompleteDate != that.hechaTime)
                            }
                            debugger
                            this.tableCount = that.bzryDataList.filter(m => m.CompleteDate != '').length;

                            for (var i = 0; i < res.length; i++) {
                                that.bzryDataList[that.tableCount]["CompleteDate"] = res[i].DataTime;
                                that.bzryDataList[that.tableCount]["Name"] = that.socketApi.globalDataConfig.getCodeNameData(res[i].Pol);

                                that.bzryDataList[that.tableCount]["Unit"] = that.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter(m => m.Code == res[i].Pol)[0].Unit;

                                that.bzryDataList[that.tableCount]["StandardValue"] = res[i].StandardValue.toFixedFormat(that.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter(m => m.Code == res[i].Pol)[0].Decimal);
                                that.bzryDataList[that.tableCount]["YQTestValue"] = res[i].Check.toFixedFormat(that.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter(m => m.Code == res[i].Pol)[0].Decimal);
                                that.bzryDataList[that.tableCount]["TestRrror"] = res[i].OffsetVal;
                                that.bzryDataList[that.tableCount]["RequireInfo"] = '';
                                that.bzryDataList[that.tableCount]["Status"] = res[i].Result == 0 ? '不合格' : '合格';

                                that.bzryDataList[that.tableCount]["CreateDate"] = moment(res[i].CreateDate).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                );;
                                // that.bzryDataList[that.tableCount]["CreateName"] = res[i].CreateName;
                                // that.bzryDataList[that.tableCount]["UpdateName"] = localStorage.getItem("Loginedname");
                                // // that.bzryDataList[i]["OptUserName"] = res[i].OptUserName;
                                // that.bzryDataList[that.tableCount]["SiteAddress"] = res[i].SiteAddress;
                                // that.bzryDataList[that.tableCount]["OptCompanyName"] = res[i].OptCompanyName;
                                that.tableCount++;
                            }
                            let numArry=15- that.bzryDataList.length;
                            for (var i = 0; i < numArry; i++) {
                                that.bzryDataList.push({
                                    id: 0,
                                    CompleteDate: '',
                                    Name: "",
                                    Unit: "",
                                    StandardValue: "",
                                    YQTestValue: "",
                                    TestRrror: '',
                                    RequireInfo: "",
                                    Status: ''
                                });
                            }
                            // this.saveBtn(that.bzryDataList);
                        } else {
                            that.$message.warning("暂无数据");
                            return;
                        }

                        that.biaoYnagModel = false;
                    })
                    .catch((res) => {
                        console.log(res);

                    });
            },
            // 保存
            saveBtn: function () {
                debugger;
                let FormDatas = [];
                let that = this;
                that.loadingflag=true;
                that.bzryDataList.map(function (item, index) {
                    if (item.Name != "" || item.CompleteDate != "") {
                        item.EntName = that.SDL_Global.SYS.CompanyName;
                        item.OptCompanyName = that.SDL_Global.SYS.YunWeiCompanyName;
                        item.SiteAddress = that.SDL_Global.SYS.PointName;
                        item.OptUserName = '';
                        item.Status = item.Status == '不合格' ? 0 : 1;
                        if (item.id == 0) {
                            item.UpdateName = '';
                            item.CreateName = localStorage.getItem("Loginedname");
                            item.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");
                        }

                        FormDatas.push(item);
                    }
                });
                console.log("FormDatas=", FormDatas);

                that.http
                    .post("/updateYW_BYHCList", {
                        DevOpsNum: that.DevOpsNum,
                        FormDatas: JSON.stringify(FormDatas),
                    })
                    .then((res) => {
                        that.isPrint = true;
                        that.loadingflag=false;

                        console.log("res=", res);
                        if (res.Code == 200) {
                            that.$message.success("保存成功");
                            that.getData(that.DevOpsNum);

                        }
                    })
                    .catch((res) => {
                        console.log(res);
                        that.loadingflag=false;

                        that.$message.error("服务器错误");

                    });
            },
            //  删除数据
            delData(_index) {
                debugger
                let that = this;

                that.bzryDataList.splice(_index, 1)
            },
            editBtn: function () {
                this.isPrint = false;
                //   this.getData(this.DevOpsNum) ;
            },

            // 返回
            backBtn() {
                this.isPrint = true;
                this.getData(this.DevOpsNum);
            },

            // 清空数据
            cleardbDataList() {
                let tableList = [];
                for (var i = 0; i < 15; i++) {
                    tableList.push({
                        id: 0,
                        CompleteDate: '',
                        Name: "",
                        Unit: "",
                        StandardValue: "",
                        YQTestValue: "",
                        TestRrror: '',
                        RequireInfo: "",
                        Status: ''
                    });
                }
                this.bzryDataList = tableList;
            },
            // 获取打印比对数据
            getData(DevOpsNum) {
                this.tableCount = 0;
                var that = this;
                that.DevOpsNum = DevOpsNum;
                that.isPrint = true;

                that.cleardbDataList();
                that.http
                    .get("/getYW_BZRYList", {
                        DevOpsNum: DevOpsNum,
                    })
                    .then((res) => {
                        debugger
                        res.forEach((r) => {
                            if (r.CompleteDate != null) {
                                r.CompleteDate = that.$options.filters.dayFormat(
                                    r.CompleteDate
                                );
                            }
                        });
                        // this.tableCount = res.length;

                        for (var i = 0; i < res.length; i++) {
                            that.bzryDataList[i]["id"] = res[i].id;

                            that.bzryDataList[i]["CompleteDate"] = res[i].CompleteDate;
                            that.bzryDataList[i]["Name"] = res[i].Name;
                            that.bzryDataList[i]["Unit"] = res[i].Unit;

                            that.bzryDataList[i]["StandardValue"] = res[i].StandardValue;
                            that.bzryDataList[i]["YQTestValue"] = res[i].YQTestValue;
                            that.bzryDataList[i]["TestRrror"] = res[i].TestRrror;
                            that.bzryDataList[i]["RequireInfo"] = res[i].RequireInfo;
                            that.bzryDataList[i]["Status"] = res[i].Status == 0 ? '不合格' : '合格';

                            that.bzryDataList[i]["CreateDate"] = moment(res[i].CreateDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );;
                            that.bzryDataList[i]["CreateName"] = res[i].CreateName;
                            that.bzryDataList[i]["UpdateName"] = localStorage.getItem("Loginedname");
                            // that.bzryDataList[i]["OptUserName"] = res[i].OptUserName;
                            that.bzryDataList[i]["SiteAddress"] = res[i].SiteAddress;
                            that.bzryDataList[i]["OptCompanyName"] = res[i].OptCompanyName;
                        }

                    })
                    .catch((res) => {
                        console.log(res);

                    });
            },
        }
    };
</script>
<style scoped>
    /* .div-dialog #printDataS {
      height: calc(100vh - 520px);
      overflow: auto;
    } */
    /* @media print {

        #printDataS {
            display: block;
            height: auto;
            overflow: hidden;
            margin: 0;
        }
    } */
    .div-dialog #printBiaoZhunRongYeHeChaData .el-input--suffix .el-input__inner {
        padding-right: 0;
    }
</style>