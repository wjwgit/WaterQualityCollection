<template>
    <div>
        <el-dialog class="div-dialog" title="打印标样核查及校准结果记录表" :visible.sync="dialogBiaoYangJiaoZhunVisible"
            width="1346px" :modal-append-to-body='false' :close-on-click-modal="false">
            <div id="prinBYJZtData">
                <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">
                    标样核查及校准结果记录表
                </div>

                <table style="border: 1px solid #000;text-align:left;;width:100%" cellspacing="0">
                    <tr style="height: 60px;">
                        <td colspan="12" style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 50%;"> 站点名称:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 48%;"> 
                                    仪器名称:
                                    <el-select v-if="!isPrint" size="mini" style="width: 50%;" v-model="byjzData.YQName"
                                        filterable allow-create default-first-option placeholder="请选择"
                                        @change="changeYQName">
                                        <el-option v-for="item in byjzNameOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span v-else>{{byjzData.YQName}}</span>
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 50%;"> 维护管理单位:
                                    <span>
                                        {{ SDL_Global.SYS.YunWeiCompanyName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 48%;"> 型号及编号:
                                    <el-input v-if="!isPrint" size="mini" style="width:130px"
                                        v-model="byjzData.YQModel">
                                    </el-input>
                                    <span v-else>{{byjzData.YQModel}}</span>

                                    <el-input v-if="!isPrint" size="mini" style="width:130px"
                                        v-model="byjzData.YQNumber">
                                    </el-input>
                                    <span v-else>
                                        <span v-show="byjzData.YQModel!=''">;</span>
                                        {{byjzData.YQNumber}}</span>
                                </span>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" style="padding-left:8px;border-bottom: 1px solid #000;min-width:25px;">本次标样核查情况
                        </td>
                        <td colspan="3"
                            style="padding-left:8px;border-bottom: 1px solid #000;min-width:25px;border-left: 1px solid #000;">
                            校准情况</td>
                        <td colspan="3"
                            style="padding-left:8px;border-bottom: 1px solid #000;min-width:25px;border-left: 1px solid #000;">
                            校准情况</td>
                        <td colspan="3"
                            style="padding-left:8px;border-bottom: 1px solid #000;min-width:25px;border-left: 1px solid #000;">
                            下次标样核查情况
                        </td>
                    </tr>
                    <tr style="height: 35px;">
                        <td style="padding-left:8px;border-bottom: 1px solid #000;min-width:25px;min-width:170px;">
                            时间</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            数据</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            结果</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:170px;">
                            时间</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            类型</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            结果</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:170px;">
                            时间</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            类型</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            结果</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:25px;min-width:170px;">
                            时间</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            数据</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:60px;">
                            结果</td>
                    </tr>

                    <tr style="height: 35px;">

                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                            <el-date-picker v-if="!isPrint" style="width: 95%;" size="mini"
                                v-model="byjzData.ThisCheckDate" type="datetime" placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                @change="getBYJZDataByTime(byjzData.ThisCheckDate,2,1)">
                            </el-date-picker>
                            <span v-else>{{byjzData.ThisCheckDate}}</span>

                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.ThisCheckValue">
                            </el-input>
                            <span v-else>{{byjzData.ThisCheckValue}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.ThisCheckStatus">
                            </el-input>
                            <span v-else>{{byjzData.ThisCheckStatus}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000; ">
                            <el-date-picker v-if="!isPrint" style="width: 95%;" size="mini"
                                v-model="byjzData.FirstCalibrationDate" type="datetime" placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                @change="getBYJZDataByTime(byjzData.FirstCalibrationDate,8,1)">
                            </el-date-picker>
                            <span v-else>{{byjzData.FirstCalibrationDate}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.FirstCalibrationType">
                            </el-input>
                            <span v-else>{{byjzData.FirstCalibrationType}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.FirstCalibrationStatus">
                            </el-input>
                            <span v-else>{{byjzData.FirstCalibrationStatus}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000; ">
                            <el-date-picker v-if="!isPrint" style="width: 95%;" size="mini"
                                v-model="byjzData.SecondCalibrationDate" type="datetime" placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                @change="getBYJZDataByTime(byjzData.SecondCalibrationDate,8,2)">
                            </el-date-picker>
                            <span v-else>{{byjzData.SecondCalibrationDate}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.SecondCalibrationType">
                            </el-input>
                            <span v-else>{{byjzData.SecondCalibrationType}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.SecondCalibrationStatus">
                            </el-input>
                            <span v-else>{{byjzData.SecondCalibrationStatus}}</span>
                        </td>

                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                            <el-date-picker v-if="!isPrint" style="width: 95%;" size="mini"
                                v-model="byjzData.NextCheckDate" type="datetime" placeholder="选择日期"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                @change="getBYJZDataByTime(byjzData.NextCheckDate,2,2)">
                            </el-date-picker>
                            <span v-else>{{byjzData.NextCheckDate}}</span>

                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.NextCheckValue">
                            </el-input>
                            <span v-else>{{byjzData.NextCheckValue}}</span>
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <el-input v-if="!isPrint" size="mini" v-model="byjzData.NextCheckStatus">
                            </el-input>
                            <span v-else>{{byjzData.NextCheckStatus}}</span>
                        </td>
                    </tr>


                    <tr>
                        <td colspan="12"
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            备注:如经过校准后标样核查仍未通过，请重新重复上述流程
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12"
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            实施人:
                        </td>
                    </tr>
                    <tr>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            核查审批:
                        </td>
                        <td colspan="11"
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;height: 70px;">
                            <div style="text-align:right">
                                <span style="display: inline-block;width: 120px;text-align: left;">签字:</span>
                                <span style="display: inline-block;width: 120px;text-align: left;">日期:</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <el-button v-if="isPrint" size="small" @click="editBtn" style="margin-top:20px;">
                编辑
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-if="!isPrint" size="small" @click="saveBtn" :loading="loadingflag"  style="margin-top:20px;">
                保存
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-if="isPrint" size="small" v-print="printContent" style="margin-top:20px;">
                打印
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>

            <el-button v-show="!isPrint" size="small" @click="backBtn" type="primary" style="margin-top:20px;">
                返回
            </el-button>
        </el-dialog>

    </div>

</template>
<script>

    import moment from "moment";


    export default {
        props: {
            biaoYangJiaoZhunModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false
            },
        },
        data() {

            let byjzNameList = []
            this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.IsNormal).map(function (item) {
                let obj = {
                    label: item.Name,
                    value: item.Name,
                }
                byjzNameList.push(obj);
            })

            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                loadingflag:false,
                byjzNameOptions: byjzNameList,
                byjzDataList: [],
                PolId: '',
                byjzData: {
                    YQName: '',
                    YQModel: '',
                    YQNumber: '',
                    ThisCheckDate: '',
                    ThisCheckValue: '',
                    ThisCheckStatus: '',
                    FirstCalibrationDate: '',
                    FirstCalibrationType: '',
                    FirstCalibrationStatus: '',
                    SecondCalibrationDate: '',
                    SecondCalibrationType: '',
                    SecondCalibrationStatus: '',
                    NextCheckDate: '',
                    NextCheckValue: '',
                    NextCheckStatus: '',
                },
                isPrint: true,
                DevOpsNum: '',
                printContent: {
                    id: 'prinBYJZtData',
                    preview: false,//预览工具是否启用
                    previewTitle: '这是预览标题',//预览页面的标题
                    popTitle: '标样核查及校准结果记录表',//打印页面的页眉
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

            // this.clearbyjzDataList()
        },
        computed: {
            dialogBiaoYangJiaoZhunVisible: {
                // getter
                get: function () {
                    return this.biaoYangJiaoZhunModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:biaoYangJiaoZhunModel", false); //触发 input 事件，并传入新值
                    }
                }
            },

        },
        methods: {
            // 获取数据
            getData(DevOpsNum, YQName = '') {
                var that = this;
                that.clearbyjzDataList();

                this.DevOpsNum = DevOpsNum;
                this.http
                    .get("/getYW_BYJZList", {
                        DevOpsNum: DevOpsNum,
                        YQName: YQName
                    })
                    .then((res) => {
                        // console.log('res=', res);
                        res.forEach((r) => {
                            if (r.ThisCheckDate != null) {
                                r.ThisCheckDate = that.$options.filters.dateFormat(r.ThisCheckDate);
                            }
                            if (r.FirstCalibrationDate != null) {
                                r.FirstCalibrationDate = that.$options.filters.dateFormat(r.FirstCalibrationDate);
                            }
                            if (r.SecondCalibrationDate != null) {
                                r.SecondCalibrationDate = that.$options.filters.dateFormat(r.SecondCalibrationDate);
                            }
                            if (r.NextCheckDate != null) {
                                r.NextCheckDate = that.$options.filters.dateFormat(r.NextCheckDate);
                            }
                        });

                        if (res.length > 0) {
                            let dataList = {};
                            if (YQName != '') {
                                if (res.filter(m => m.YQName == YQName).length > 0) {
                                    dataList = res.filter(m => m.YQName == YQName)[0];
                                } else {
                                    // that.clearbyjzDataList();

                                    return
                                }
                            } else {
                                dataList = res[0];
                                that.isPrint = true;
                            }

                            that.byjzData.id = dataList.id;
                            that.byjzData.ThisCheckDate = dataList.ThisCheckDate == null ? '' : dataList.ThisCheckDate;
                            that.byjzData.ThisCheckValue = dataList.ThisCheckValue;
                            that.byjzData.ThisCheckStatus = dataList.ThisCheckStatus == null ? '' : dataList.ThisCheckStatus == 1 ? '合格' : '不合格';

                            that.byjzData.FirstCalibrationDate = dataList.FirstCalibrationDate == null ? '' : dataList.FirstCalibrationDate;
                            that.byjzData.FirstCalibrationType = dataList.FirstCalibrationType == 'null' ? '' : dataList.FirstCalibrationType;
                            that.byjzData.FirstCalibrationStatus = dataList.FirstCalibrationStatus == null ? '' : dataList.FirstCalibrationStatus == 1 ? '通过' : '未通过';

                            that.byjzData.SecondCalibrationDate = dataList.SecondCalibrationDate == null ? '' : dataList.SecondCalibrationDate;
                            that.byjzData.SecondCalibrationType = dataList.SecondCalibrationType == 'null' ? '' : dataList.SecondCalibrationType;
                            that.byjzData.SecondCalibrationStatus = dataList.SecondCalibrationStatus == null ? '' : dataList.SecondCalibrationStatus == 1 ? '通过' : '未通过';

                            that.byjzData.NextCheckDate = dataList.NextCheckDate == null ? '' : dataList.NextCheckDate;
                            that.byjzData.NextCheckValue = dataList.NextCheckValue;
                            that.byjzData.NextCheckStatus = dataList.NextCheckStatus == null ? '' : dataList.NextCheckStatus == 1 ? '合格' : '不合格';

                            that.byjzData.YQName = dataList.YQName;
                            that.byjzData.YQModel = dataList.YQModel;
                            that.byjzData.YQNumber = dataList.YQNumber;


                            that.byjzData.CreateDate = moment(dataList.CreateDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );;
                            that.byjzData.CreateName = dataList.CreateName;
                            that.byjzData.UpdateName = localStorage.getItem("Loginedname");
                            that.byjzData.SiteAddress = dataList.SiteAddress;
                            that.byjzData.OptCompanyName = dataList.OptCompanyName;
                        } else {
                            if (YQName != '') {
                                this.byjzData.YQName = YQName;
                                this.byjzData.YQModel = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.byjzData.YQName)[0].Series;
                                this.byjzData.YQNumber = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.byjzData.YQName)[0].MoreParam.SheBeiXuLieHao;;

                            }

                        }


                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 修改仪器
            changeYQName(val) {
                // this.clearbyjzDataList();
                // this.byjzData.ThisCheckDate = "";
                // this.byjzData.ThisCheckValue = "";
                // this.byjzData.ThisCheckStatus = "";
                // this.byjzData.FirstCalibrationDate = "";
                // this.byjzData.FirstCalibrationType = "";
                // this.byjzData.FirstCalibrationStatus = "";
                // this.byjzData.SecondCalibrationDate = "";
                // this.byjzData.SecondCalibrationType = "";
                // this.byjzData.SecondCalibrationStatus = "";
                // this.byjzData.NextCheckDate = "";
                // this.byjzData.NextCheckValue = "";
                // this.byjzData.NextCheckStatus = "";
                this.getData(this.DevOpsNum, val);
            },
            //获取核查校准数据
            getBYJZDataByTime(byjzTime, dataType, testOrder) {
                if (byjzTime == null) {
                    return;
                }
                let that = this;
                let PolId = "";
                let PolDecimal = 0;
                if (this.byjzData.YQName == '') {
                    that.$message.warning("请选择仪表名称");
                    return;
                } else {
                    PolId = this.socketApi.globalDataConfig.getCodeData(this.byjzData.YQName);
                    PolDecimal = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.byjzData.YQName)[0].Decimal
                }
                that.http
                    .get("getZkcxTable", {
                        defaultDataType: dataType,
                        startTime: byjzTime,
                        endTime: byjzTime,
                        jcyz: PolId,
                        pageIndex: 0,
                        pageSize: 1,
                    })
                    .then((res) => {

                        if (res) {
                            if (res[1][0]["dataTotal"] > 0) {
                                // 格式化
                                res[0].forEach((r) => {
                                    r.DataTime =
                                        r.DataTime == null
                                            ? "--"
                                            : that.$options.filters.dateFormat(r.DataTime);
                                    if (dataType == '2' && testOrder == '1') {
                                        that.byjzData.ThisCheckValue = r.Check == null ? '-' : r.Check.toFixedFormat(PolDecimal);
                                        that.byjzData.ThisCheckStatus = r.Result == 0 ? '不合格' : '合格';

                                    } else if (dataType == '8' && testOrder == '1') {

                                        that.byjzData.FirstCalibrationType = r.CheckType == 8 ? '空白' : '标样';
                                        that.byjzData.FirstCalibrationStatus = r.CheckResult == 1 ? '成功' : '失败';
                                    } else if (dataType == '8' && testOrder == '2') {

                                        that.byjzData.SecondCalibrationType = r.CheckType == 8 ? '空白' : '标样';
                                        that.byjzData.SecondCalibrationStatus = r.CheckResult == 1 ? '成功' : '失败';
                                    } else if (dataType == '2' && testOrder == '2') {
                                        that.byjzData.NextCheckValue = r.Check == null ? '-' : r.Check.toFixedFormat(PolDecimal);
                                        that.byjzData.NextCheckStatus = r.Result == 0 ? '不合格' : '合格';
                                    }

                                });

                                // 赋值到表格

                            } else {

                                that.$message.warning("暂无核查/校准数据");
                                if (dataType == '2' && testOrder == '1') {
                                    that.byjzData.ThisCheckValue = '';
                                    that.byjzData.ThisCheckStatus = '';

                                } else if (dataType == '8' && testOrder == '1') {

                                    that.byjzData.FirstCalibrationType = '';
                                    that.byjzData.FirstCalibrationStatus = '';
                                } else if (dataType == '8' && testOrder == '2') {

                                    that.byjzData.SecondCalibrationType = '';
                                    that.byjzData.SecondCalibrationStatus = '';
                                } else if (dataType == '2' && testOrder == '2') {
                                    that.byjzData.NextCheckValue = '';
                                    that.byjzData.NextCheckStatus = '';
                                }
                            }
                        }

                    })
                    .catch((res) => {
                        that.$message.error("服务端错误");

                        console.log("error", res);
                    });
            },

            // 清空数据
            clearbyjzDataList() {

                this.byjzData = {
                    id: 0,
                    YQName: '',
                    YQModel: '',
                    YQNumber: '',
                    ThisCheckDate: '',
                    ThisCheckValue: '',
                    ThisCheckStatus: '',
                    FirstCalibrationDate: '',
                    FirstCalibrationType: '',
                    FirstCalibrationStatus: '',
                    SecondCalibrationDate: '',
                    SecondCalibrationType: '',
                    SecondCalibrationStatus: '',
                    NextCheckDate: '',
                    NextCheckValue: '',
                    NextCheckStatus: '',
                };
            },
            // 保存
            saveBtn: function () {

                let that = this;
                that.loadingflag=true;
                // that.byjzData
                let FormDatas = {}

                if (that.byjzData.YQName == '') {
                    that.$message.warning("请选择仪表");
                    that.loadingflag=false;
                    return;

                }
                FormDatas = that.byjzData;

                FormDatas.OptCompanyName = that.SDL_Global.SYS.YunWeiCompanyName;
                FormDatas.SiteAddress = that.SDL_Global.SYS.PointName;

                // that.byjzData.YQName,
                // that.byjzData.YQModel,
                // that.byjzData.YQNumber,
                FormDatas.UpdateName = '';
                FormDatas.CreateName = localStorage.getItem("Loginedname");
                FormDatas.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");

                console.log('FormDatas=', FormDatas);

                that.http
                    .post("/updateYW_BYJZList", {
                        DevOpsNum: that.DevOpsNum,
                        YQName: that.byjzData.YQName,
                        FormDatas: JSON.stringify(FormDatas)
                    })
                    .then((res) => {
                        that.loadingflag=false;

                        that.isPrint = true;
                        console.log('res=', res)
                        if (res.Code == 200) {
                            that.$message.success("保存成功");
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                        that.loadingflag=false;
                        that.$message.error("服务器错误");

                    });
            },
            editBtn: function () {
                this.isPrint = false;
            },

            // 返回
            backBtn() {
                this.isPrint = true;
                this.getData(this.DevOpsNum);
            },
        }
    };
</script>
<style scoped>
    /* .el-table  .el-table__expanded-cell{
  background-color: '#384565' !important
 } */
    /* #prinBYJZtData  .el-input--suffix .el-input__inner{
    padding-right: 0 !important;
 } */

    .div-dialog #prinBYJZtData .el-input--suffix .el-input__inner {
        padding-right: 0 !important;
    }
</style>