<template>
    <div>
        <el-dialog class="div-dialog" title="打印检修记录表" :visible.sync="dialogJianXiuVisible" width="756px"
            :modal-append-to-body='false' :close-on-click-modal="false">
            <div id="prinJXRtData">
                <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">
                    检修记录表
                </div>

                <table style="border: 1px solid #000;text-align:left;;width:100%" cellspacing="0">
                    <tr style="height: 60px;">
                        <td colspan="12" style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;"> 安装地点:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 
                                    <span style="width:80px;text-align: right ;display: inline-block;">仪器名称:</span>
                                    <el-select v-if="!isPrint" size="mini" style="width: 50%;"
                                        v-model="JianXiuData.YQName" filterable allow-create default-first-option
                                        placeholder="请选择" @change="changeYQName">
                                        <el-option v-for="item in YBNameOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span v-else>{{JianXiuData.YQName}}</span>
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;"> 安装时间:
                                    <span>

                                        {{
                                        !JianXiuData.YQInstallDate
                                        ? "--"
                                        : JianXiuData.YQInstallDate.substr(0, 10)
                                        }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;">
                                    <span style="width:80px;text-align: right ;display: inline-block;" >型号及编号:</span>
                                     
                                    <el-input v-if="!isPrint" size="mini" style="width:115px"
                                        v-model="JianXiuData.YQModel">
                                    </el-input>
                                    <span v-else>{{JianXiuData.YQModel}}</span>

                                    <el-input v-if="!isPrint" size="mini" style="width:115px"
                                        v-model="JianXiuData.YQNumber">
                                    </el-input>
                                    <span v-else>
                                        <span v-show="JianXiuData.YQModel!=''">;</span>

                                        {{JianXiuData.YQNumber}}</span>
                                </span>
                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td style="width: 120px;border-bottom: 1px solid #000;">
                            维护管理单位
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            {{ SDL_Global.SYS.YunWeiCompanyName }}
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;border-bottom: 1px solid #000;">
                            故障情况及发生时间
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <div class="jxprint" style="border-bottom: 1px solid #000;">
                                <el-input style="margin-top:8px ;" type="textarea" v-if="!isPrint"
                                    v-model="JianXiuData.FaultRemark"></el-input>
                                <span style="height: 30px;display: block;" v-else>{{JianXiuData.FaultRemark}}</span>

                            </div>
                            <div style="margin-top: 8px;">
                                <div>仪器设备管理员：</div>
                                <div>日期：</div>
                                <div>维修人：</div>
                                <div>日期：</div>
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td style="width: 120px;border-bottom: 1px solid #000;">
                            修复后使用前校验时间、 校验结果说明
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <div class="jxprint" style="border-bottom: 1px solid #000;">
                                <el-input style="margin-top:8px ;" type="textarea" v-if="!isPrint"
                                    v-model="JianXiuData.RepairRemark"></el-input>
                                <span style="height: 30px;display: block;" v-else>{{JianXiuData.RepairRemark}}</span>

                            </div>
                            <div>
                                <div>校验人：</div>
                                <div>日期：</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;border-bottom: 1px solid #000;">
                            正常投入使用时间
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            <div class="jxprint" style="border-bottom: 1px solid #000;">
                                <el-input style="margin-top:8px ;" type="textarea" v-if="!isPrint"
                                    v-model="JianXiuData.NormalRemark"></el-input>
                                <span style="height: 30px;display: block;" v-else>{{JianXiuData.RepairRemark}}</span>

                            </div>
                            <div>
                                <div>仪器设备管理员：</div>
                                <div>日期：</div>
                                <div>负责人：</div>
                                <div>日期：</div>
                            </div>
                        </td>
                    </tr>



                </table>
            </div>
            <div>
          
                <div style="width: 52%;display: inline-block;text-align: right;">

                    <template>
                        <el-button v-if="isPrint" size="small" @click="editBtn" style="margin-top:20px;">
                            编辑
                            <i class="el-icon-edit el-icon--right"></i>
                        </el-button>

                        <el-button v-if="isPrint" size="small" v-print="printContent" style="margin-top:20px;">
                            打印
                        </el-button>

                        <el-button v-if="!isPrint" size="small" @click="saveBtn" :loading="loadingflag" style="margin-top:20px;">
                            保存
                            <i class="el-icon-edit el-icon--right"></i>
                        </el-button>

                        <el-button v-show="!isPrint" size="small" @click="backBtn" type="primary"
                            style="margin-top:20px;">
                            返回
                        </el-button>
               
                    </template>
                </div>
                <div style="width: 42%;display: inline-block;text-align: right;" >
                    <template v-for="item in PolNameList" v-if="isPrint">
                        <el-radio-group v-model="PolName">
                            <el-radio style="padding-right:10px ;" :label="item" @change="ChangePolName">{{item}}</el-radio>

                        </el-radio-group>
                        <!-- <template v-for="(item, index) in yunWeiList">
                            <el-radio v-if="index!=0" v-model="actTask" :key="index" :label="item.value"
                                @change="taskChange">
                                {{item.label }}
                            </el-radio>
                        </template> -->
                    </template>
                </div>

            </div>

        </el-dialog>

    </div>

</template>
<script>

    import moment from "moment";


    export default {
        props: {
            jianXiuModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false
            },
        },
        data() {

            let YBNameList = []
            this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.IsNormal).map(function (item) {
                let obj = {
                    label: item.Name,
                    value: item.Name,
                }
                YBNameList.push(obj);
            })

            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                YBNameOptions: YBNameList,
                jianXiuReportDataList: [],
                PolId: '',
                JianXiuData: {
                    YQName: '',
                    YQModel: '',
                    YQNumber: '',
                    YQInstallDate: JSON.parse(localStorage.getItem("appConfig")).InstallDate,
                    FaultRemark: '',
                    RepairRemark: '',
                    NormalRemark: '',
                    OptUserName: ""
                },
                isPrint: false,
                DevOpsNum: '',
                loadingflag:false,
                PolName: '',
                PolNameList: [],
                printContent: {
                    id: 'prinJXRtData',
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

            // this.clearjianXiuReportDataList()
        },
        computed: {
            dialogJianXiuVisible: {
                // getter
                get: function () {
                    return this.jianXiuModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:jianXiuModel", false); //触发 input 事件，并传入新值
                    }
                }
            },

        },
        methods: {
            // 获取数据
            getData(DevOpsNum, YQName = '') {
                var that = this;
                that.clearjianXiuReportDataList();

                this.DevOpsNum = DevOpsNum;
                this.http
                    .get("/getYW_SBJX1List", {
                        DevOpsNum: DevOpsNum,
                        YQName: YQName

                    })
                    .then((res) => {
                        // console.log('res=', res);
                        debugger

                        if (res.length > 0) {

                            if (YQName == '') {
                                this.PolNameList = [];
                                res.forEach((r) => {
                                    this.PolNameList.push(r.YQName)
                                });
                            }

                            console.log('this.PolNameList=', this.PolNameList);
                            let dataList = {};
                            if (YQName != '') {
                                if (res.filter(m => m.YQName == YQName).length > 0) {
                                    debugger
                                    dataList = res.filter(m => m.YQName == YQName)[0];
                                } else {
                                    // that.clearbyjzDataList();
                                    return
                                }
                            } else {
                                dataList = res[0];


                                this.PolName = dataList.YQName;

                                that.isPrint = true;
                            }

                            that.JianXiuData.id = dataList.id;

                            that.JianXiuData.YQInstallDate = dataList.YQInstallDate;
                            that.JianXiuData.FaultRemark = dataList.FaultRemark;
                            that.JianXiuData.RepairRemark = dataList.RepairRemark;
                            that.JianXiuData.NormalRemark = dataList.NormalRemark;

                            that.JianXiuData.YQName = dataList.YQName;
                            that.JianXiuData.YQModel = dataList.YQModel;
                            that.JianXiuData.YQNumber = dataList.YQNumber;


                            that.JianXiuData.CreateDate = moment(dataList.CreateDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );;
                            that.JianXiuData.CreateName = dataList.CreateName;
                            that.JianXiuData.UpdateName = localStorage.getItem("Loginedname");
                            that.JianXiuData.SiteAddress = dataList.SiteAddress;
                            that.JianXiuData.OptCompanyName = dataList.OptCompanyName;
                        } else {
                            if (YQName != '') {
                                this.JianXiuData.YQName = YQName;
                                this.JianXiuData.YQModel = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.JianXiuData.YQName)[0].Series;
                                this.JianXiuData.YQNumber = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.JianXiuData.YQName)[0].MoreParam.SheBeiXuLieHao;;

                            }
                        }


                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 切换仪表
            changeYQName(val) {
                debugger
                this.getData(this.DevOpsNum, val);

                // this.JianXiuData.YQModel = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.JianXiuData.YQName)[0].Series;
                // this.JianXiuData.YQNumber = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.Name == this.JianXiuData.YQName)[0].MoreParam.SheBeiXuLieHao;;
            },
            // 清空数据
            clearjianXiuReportDataList() {

                this.JianXiuData = {
                    id: 0,
                    YQName: '',
                    YQModel: '',
                    YQNumber: '',
                    YQInstallDate: JSON.parse(localStorage.getItem("appConfig")).InstallDate,
                    FaultRemark: '',
                    RepairRemark: '',
                    NormalRemark: '',
                    OptUserName: ""

                };
            },
            // 保存
            saveBtn: function () {
                debugger
                this.loadingflag=true;

                let that = this;
                // that.JianXiuData

                if (that.JianXiuData.YQName == '') {
                    that.$message.warning("请选择仪表");
                    that.loadingflag=false;

                    return;

                }
                if (that.JianXiuData.FaultRemark == "" || that.JianXiuData.RepairRemark == "" || that.JianXiuData.NormalRemark == "") {
                    that.$message.warning("信息填写不完整");
                    that.loadingflag=false;

                    return;
                }

                that.JianXiuData.YQInstallDate = that.JianXiuData.YQInstallDate == '' ? "" : that.JianXiuData.YQInstallDate.substr(0, 10)

                that.JianXiuData.OptCompanyName = that.SDL_Global.SYS.YunWeiCompanyName;
                that.JianXiuData.SiteAddress = that.SDL_Global.SYS.PointName;

                // that.JianXiuData.YQName,
                // that.JianXiuData.YQModel,
                // that.JianXiuData.YQNumber,
                that.JianXiuData.UpdateName = '';
                that.JianXiuData.CreateName = localStorage.getItem("Loginedname");
                that.JianXiuData.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");

                console.log('that.JianXiuData=', that.JianXiuData);

                that.http
                    .post("/updateYW_SBJX1List", {
                        DevOpsNum: that.DevOpsNum,
                        YQName: that.JianXiuData.YQName,
                        FormDatas: JSON.stringify(that.JianXiuData)
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
            // 单因子查询
            ChangePolName() {
                this.getData(this.DevOpsNum, this.PolName);

            }
        }
    };
</script>
<style scoped>
    /* .el-table  .el-table__expanded-cell{
  background-color: '#384565' !important
 } */

    .div-dialog #prinJXRtData .el-input--suffix .el-input__inner {
        padding-right: 0;
    }
</style>