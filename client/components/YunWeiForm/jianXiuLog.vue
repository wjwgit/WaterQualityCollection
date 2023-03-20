<template>
    <div>
        <el-dialog class="div-dialog" title="打印检修记录表2" :visible.sync="dialogJianXiuLogVisible" width="746px"
            :modal-append-to-body='false' :close-on-click-modal="false">
            <div id="prinJXLogData">
                <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">
                    检修记录表2
                </div>

                <table style="border: 1px solid #000;text-align:left;;width:100%" cellspacing="0">
                    <tr style="height: 60px;">
                        <td colspan="3" style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 50%;"> 站点名称:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 48%;text-align: right;"> 停机时间:
                                    <el-date-picker v-if="!isPrint" style="width: 55%" size="mini"
                                        v-model="jianXiuLog.DownTime" type="datetime" placeholder="选择日期时间"
                                        format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                                    </el-date-picker>
                                    <span style="width: 45%;display: inline-block;text-align: left;" v-else>{{
                                        jianXiuLog.DownTime
                                        }}</span>
                                </span>
                            </div>

                        </td>
                    </tr>

                    <template v-for="(item,index) in YBNameList">

                        <template v-for="(citem,indexs) in item.childs">
                            <tr>
                                <td v-if="indexs==0" :rowspan="item.rowspan"
                                    style="padding-left:8px;border-bottom: 1px solid #000;width: 180px;">{{item.YQName}}
                                </td>
                                <td
                                    style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;width: 120px;">
                                    {{citem.ProjectName}}</td>

                                <td v-if="!citem.isfor"
                                    style="border-left: 1px solid #000;padding-left:8px;padding-right:8px;border-bottom: 1px solid #000;">
                                    <el-input v-if="!isPrint" size="mini" v-model="citem.ProjectValue">
                                    </el-input>
                                    <span v-else>
                                        {{citem.ProjectValue}}
                                    </span>
                                </td>
                                <td v-else
                                    style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                    <el-select v-if="!isPrint" size="mini" style="width: 66%"
                                        v-model="citem.ProjectValue" filterable allow-create default-first-option
                                        placeholder="请选择" @change="changeBJNum(item.YQCode, citem.ProjectValue)">
                                        <el-option v-for="bitem in item.beiJianList" :key="bitem.BJName"
                                            :label="bitem.BJName" :value="bitem.BJName">
                                        </el-option>
                                    </el-select>
                                    <span v-else>
                                        {{citem.ProjectValue}}
                                    </span>
                                    <template v-if="!isPrint">
                                        <span>
                                            数量
                                        </span>
                                        <el-input size="mini" style="width: 81px;padding-left: 4px;"
                                            v-model="citem.ProjectValueNum">
                                        </el-input>
                                    </template>

                                    <span v-else>
                                        <span v-show="citem.ProjectValueNum!=''">x </span> {{citem.ProjectValueNum}}
                                    </span>
                                </td>
                            </tr>

                        </template>
                    </template>


                    <!-- 站房清理 -->
                    <tr>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">站房清理
                        </td>
                        <td colspan="2"
                            style="border-left: 1px solid #000;padding-left:8px;padding-right:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="jianXiuLog.StationClean">
                            </el-input>
                            <span v-else>
                                {{jianXiuLog.StationClean}}
                            </span>
                        </td>
                        <!-- <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;"></td> -->
                    </tr>
                    <tr>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">停机检修情况总结
                        </td>
                        <td colspan="2"
                            style="border-left: 1px solid #000;padding:5px 8px;border-bottom: 1px solid #000;">
                            <el-input type="textarea" v-if="!isPrint" v-model="jianXiuLog.DownTimeRemark"></el-input>
                            <span v-else>
                                {{jianXiuLog.DownTimeRemark}}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">备注</td>
                        <td colspan="2"
                            style="border-left: 1px solid #000;padding:4px 8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" v-model="jianXiuLog.Remark"></el-input>
                            <span v-else>
                                {{jianXiuLog.Remark}}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 50%;"> 检修人:

                                </span>
                                <span style="display: inline-block;width: 48%;"> 离站时间:

                                </span>
                            </div>

                        </td>
                    </tr>
                </table>
            </div>

            <el-button v-if="isPrint" size="small" @click="editBtn" style="margin-top:20px;">
                编辑
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-if="!isPrint" size="small" @click="saveBtn" :loading="loadingflag" style="margin-top:20px;">
                保存
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-show="!isPrint" size="small" @click="backBtn" type="primary" style="margin-top:20px;">
                返回
            </el-button>
            <el-button v-if="isPrint" size="small" v-print="printContent" style="margin-top:20px;">
                打印
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
        </el-dialog>

    </div>

</template>
<script>

    import moment from "moment";

    export default {
        props: {
            jianXiuLogModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false
            },
        },
        data() {
            let YBNameLists = [];
            //     {
            //     YQName: "水质自动采样系统",
            //     YQCode: '',
            //     rowspan: 4,
            //     YQSeries: this.socketApi.globalDataConfig.SDL_Global.CY.Series,
            //     YQNumber: "",
            //     beiJianList: [],
            //     childs: [{
            //         YQName: '水质自动采样系统',
            //         ProjectName: "设备型号及编号",
            //         ProjectValue: "",
            //         ProjectValueCode: "",
            //         isfor: false
            //     },
            //     {
            //         YQName: '水质自动采样系统',
            //         ProjectName: "检修情况描述",
            //         ProjectValue: "",
            //         ProjectValueCode: "",
            //         isfor: false
            //     },
            //     {
            //         YQName: '水质自动采样系统',
            //         ProjectName: "更换部件 1",
            //         ProjectValue: "",
            //         ProjectValueCode: "",
            //         ProjectNum: '',

            //         isfor: true
            //     },
            //     {
            //         YQName: '水质自动采样系统',
            //         ProjectName: "更换部件 2",
            //         ProjectValue: "",
            //         ProjectValueCode: "",
            //         ProjectNum: '',
            //         isfor: true
            //     },]

            // }]
            this.socketApi.globalDataConfig.SDL_Global.MetersData().filter((m) => m.IsNormal || m.ID == 'WC' || m.ID == 'Flow' || m.ID == 'CYQ').map(function (item) {

                let Series = "";
                let SheBeiXuLieHao = "";
                let optionFlag = false;
                let childList = [];
                let rowspans = 4;
                if (item.ID == 'WC') {
                    rowspans = 3;
                    item.Name = "pH计";
                    Series = item.PH.Series;
                    childList = [
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "设备型号及编号",
                            ProjectValue: Series + ';' + SheBeiXuLieHao,
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "检修情况描述",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "更换部件",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            ProjectValueNum: '',
                            isfor: optionFlag
                        }
                    ]
                }
                else if (item.ID == 'Flow') {
                    rowspans = 3;
                    item.Name = "流量计";
                    Series = item.Series;
                    childList = [
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "设备型号及编号",
                            ProjectValue: Series + ';' + SheBeiXuLieHao,
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "检修情况描述",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "更换部件",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            ProjectValueNum: '',
                            isfor: optionFlag
                        }
                    ]
                } else if (item.ID == 'CYQ') {
                    item.Name = "采样系统";
                    Series = item.Series;
                    optionFlag = true;
                    childList = [
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "设备型号及编号",
                            ProjectValue: Series + ';' + SheBeiXuLieHao,
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "检修情况描述",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "更换部件 1",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            ProjectValueNum: '',
                            isfor: optionFlag
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "更换部件 2",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            ProjectValueNum: '',
                            isfor: optionFlag
                        }
                    ]
                } else {
                    item.Name = item.Name;
                    Series = item.Series;
                    SheBeiXuLieHao = item.MoreParam.SheBeiXuLieHao;
                    optionFlag = true;
                    childList = [
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "设备型号及编号",
                            ProjectValue: Series + ';' + SheBeiXuLieHao,
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "检修情况描述",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            isfor: false
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "更换部件 1",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            ProjectValueNum: '',
                            isfor: optionFlag
                        },
                        {
                            YQName: item.Name + '自动分析仪',
                            ProjectName: "更换部件 2",
                            ProjectValue: "",
                            ProjectValueCode: "",
                            ProjectValueNum: '',
                            isfor: optionFlag
                        }
                    ]
                }
                let obj = {
                    YQName: item.Name + '自动分析仪',
                    YQCode: item.Code,
                    YQSeries: Series,
                    YQNumber: SheBeiXuLieHao,
                    rowspan: rowspans,
                    beiJianList: [],
                    childs: childList
                }
                YBNameLists.push(obj);
            })

            let CYQ = {
                YQName: '数据采集传输仪',
                YQCode: '',
                YQSeries: '',
                YQNumber: '',
                rowspan: 3,
                childs: [{
                    YQName: '数据采集传输仪',
                    ProjectName: "设备型号及编号",
                    ProjectValue: "",
                    ProjectValueCode: "",
                    isfor: false
                },
                {
                    YQName: '数据采集传输仪',
                    ProjectName: "检修情况描述",
                    ProjectValue: "",
                    ProjectValueCode: "",
                    isfor: false
                },
                {
                    YQName: '数据采集传输仪',
                    ProjectName: "更换部件",
                    ProjectValue: "",
                    ProjectValueCode: "",
                    isfor: false
                }]
            }
            YBNameLists.push(CYQ);
            console.log('YBNameLists=', YBNameLists);
            debugger
            return {
                YBNameList: YBNameLists,
                loadingflag: false,
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                jianXiuLog: {
                    DownTime: '',
                    StationClean: '',
                    DownTimeRemark: '',
                    Remark: '',
                    UpdateName: '',
                    CreateName: localStorage.getItem("Loginedname"),
                    CreateDate: moment().format("YYYY-MM-DD HH:mm:ss")
                },
                // YQModel: '',
                // YQRemark: '',


                isPrint: false,
                DevOpsNum: '',
                printContent: {
                    id: 'prinJXLogData',
                    preview: false,//预览工具是否启用
                    previewTitle: '这是预览标题',//预览页面的标题
                    popTitle: '检修记录表',//打印页面的页眉
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
            // 清空数据
            // this.clearjianXiuReportDataList();
        },
        computed: {
            dialogJianXiuLogVisible: {
                // getter
                get: function () {
                    return this.jianXiuLogModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:jianXiuLogModel", false); //触发 input 事件，并传入新值
                    }
                }
            },

        },
        methods: {

            // 获取列表数据
            getBeiJianData() {
                let that = this;
                that.yhpNameOptions = [];
                let _PolId = that.socketApi.globalDataConfig.SDL_Global.MetersDataPP()
                    .filter((m) => m.IsNormal || m.ID == 'CYQ').map(m => m.Code);

                let condition = {
                    PolId: _PolId,
                    NameOrStockCode: "",
                    Category: "",
                };

                that.http
                    .get("/getSparePartsDatas", condition)
                    .then((res) => {
                        debugger
                        if (res.length != 0) {
                            this.YBNameList.map(function (item, index) {
                                // res.forEach((r) => {
                                //     if(r.PolId==item.YQCode ){
                                //     }
                                // })
                                res.filter((m) => m.PolId == item.YQCode).map(function (r, index) {
                                    let obj = {
                                        BJCode: r.StockCode,
                                        BJName: r.Name,
                                        BJQuantity: r.Quantity,
                                    }
                                    // console.log('耗材备件obj', res.filter((m) => m.PolId == item.YQCode))

                                    item.beiJianList.push(obj);
                                })


                            })
                            console.log('耗材备件', this.YBNameList)
                        }
                    })
                    .catch((res) => {

                        console.log(res);
                    });
            },
            // 更改备件数量   
            changeBJNum(YQCode, BJName) {
                debugger
                let that = this;
                that.YBNameList.filter((m) => m.YQCode == YQCode)[0].childs.map(function (cItem, index) {
                    if (cItem.ProjectValue == BJName) {
                        debugger
                        //    console.log('aa=',that.YBNameList.filter((m) => m.YQCode == YQCode)[0].beiJianList.filter(q=>q.BJCode==bjCode));
                        cItem.ProjectValueNum = that.YBNameList.filter((m) => m.YQCode == YQCode)[0].beiJianList.filter(q => q.BJName == BJName)[0].BJQuantity;
                        // cItem.ProjectNum == bjNum;
                    }
                })
                debugger
            },
            // 获取数据
            getData(DevOpsNum) {
                var that = this;
                that.clearjianXiuReportDataList();
                this.getBeiJianData();

                this.isPrint = true;
                this.DevOpsNum = DevOpsNum;
                this.http
                    .get("/getYW_SBJX2List", {
                        DevOpsNum: DevOpsNum,
                    })
                    .then((res) => {
                        // console.log('res=', res);
                        debugger

                        if (res.length > 0) {
                            res.forEach((r) => {
                                if (r.DownTime != null) {
                                    r.DownTime = that.$options.filters.dateFormat(
                                        r.DownTime
                                    );
                                }
                                that.jianXiuLog.DownTime = r.DownTime;
                                that.jianXiuLog.StationClean = r.StationClean;
                                that.jianXiuLog.DownTimeRemark = r.DownTimeRemark;
                                that.jianXiuLog.Remark = r.Remark;
                                that.jianXiuLog.UpdateName = r.UpdateName;
                                that.jianXiuLog.CreateName = r.CreateName;
                                that.jianXiuLog.CreateDate = r.CreateDate;

                                that.YBNameList.map(function (item) {
                                    if (item.YQName == r.YQName) {

                                        item.childs.map(function (citem) {
                                            if (citem.ProjectName == r.ProjectName) {
                                                citem.ProjectValue = r.ProjectValue;
                                                citem.ProjectValueNum = r.ProjectValueNum
                                                citem.ProjectValueCode = r.ProjectValueCode
                                            }
                                        })
                                    }
                                })
                            });
                        } else {

                        }


                    })
                    .catch((res) => {
                        console.log(res);
                    });

            },

            // 清空数据
            clearjianXiuReportDataList() {
                this.jianXiuLog.SiteAddress = '';
                this.jianXiuLog.DownTime = '';
                this.jianXiuLog.StationClean = '';
                this.jianXiuLog.DownTimeRemark = '';
                this.jianXiuLog.Remark = '',
                    this.jianXiuLog.UpdateName = '';
                this.jianXiuLog.CreateName = localStorage.getItem("Loginedname");
                this.jianXiuLog.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");
                debugger
                this.YBNameList.map(function (item) {
                    item.childs.map(function (citem) {
                        // citem.ProjectName = '';
                        if (citem.ProjectName.indexOf('编号') == -1) {
                            citem.ProjectValue = '';
                            citem.ProjectValueNum = '';
                            citem.ProjectValueCode = '';
                        }
                    })
                })
            },
            // 保存
            saveBtn: function () {
                // this.isPrint = true;

                debugger;
                let FormDatas = [];
                let that = this;
                that.loadingflag = true;
                this.YBNameList.map(function (item, index) {

                    item.UpdateName = '';
                    item.CreateName = localStorage.getItem("Loginedname");
                    item.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");

                    item.childs.map(function (citem, index) {

                        if (!citem.ProjectValueNum) {
                            debugger
                            citem.ProjectValueNum = '';
                        }
                        citem.UpdateName = '';
                        citem.CreateName = localStorage.getItem("Loginedname");
                        citem.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");

                    })

                    FormDatas.push(item);

                });
                console.log("FormDatas=", FormDatas);


                // FormDatas.map(function (item, index) {

                // if (item.Name == '' || item.Unit == '' || item.Quantity == '') {
                //     that.$message.warning("信息填写不完整");
                //     flags = true;
                //     // return false;
                // }
                // })
                let flags = false;

                if (that.jianXiuLog.DownTime == '') {
                    flags = true;
                    that.$message.warning("请填写停机时间");
                    that.loadingflag = false;


                }
                if (flags) {
                    return false;
                }
                that.jianXiuLog.SiteAddress = that.SDL_Global.SYS.PointName;
                // return
                this.jianXiuLog.UpdateName = localStorage.getItem("Loginedname");
                this.jianXiuLog.CreateName = localStorage.getItem("Loginedname");
                this.jianXiuLog.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");
                that.http
                    .post("/updateYW_SBJX2List", {
                        DevOpsNum: that.DevOpsNum,
                        jianXiuLog: JSON.stringify(that.jianXiuLog),
                        FormDatas: JSON.stringify(FormDatas),
                    })
                    .then((res) => {
                        debugger;
                        that.isPrint = true;
                        that.loadingflag = false;

                        console.log("res=", res);
                        if (res.Code == 200) {
                            that.$message.success("保存成功");
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                        that.loadingflag = false;

                        that.$message.error("服务器错误");

                    });
            },
            // 编辑
            editBtn: function () {
                this.isPrint = false;
            },
            // 返回
            backBtn() {
                this.isPrint = true;
                this.getData(this.DevOpsNum);
            },
            // 获取设备型号编号
            changeYQName() {
            },

        }
    };
</script>
<style scoped>
    /* .el-table  .el-table__expanded-cell{
  background-color: '#384565' !important
 } */

    .div-dialog #prinJXLogData .el-input--suffix .el-input__inner {
        padding-right: 0;
    }
</style>