<template>
    <div>
        <el-dialog class="div-dialog" title="打印废液处置记录表" :visible.sync="dialogFeiYeChuZhiVisible" width="756px"
            :modal-append-to-body='false' :close-on-click-modal="false">
            <div id="prinFYCZtData">
                <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">废液处置记录表
                </div>

                <table style="border: 1px solid #000;text-align:left;;width:100%" cellspacing="0">
                    <tr style="height: 60px;">
                        <td colspan="6" v-if="isPrint"  style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;"> 企业名称:
                                    <!-- <el-input v-if="!isPrint" style="width: 70%;" size="mini"
                                        v-model="printHeader.CompanyName">
                                    </el-input> -->
                                    <span>
                                        {{printHeader.CompanyName}}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 维护管理单位:
                                    <!-- <el-input v-if="!isPrint" style="width:70%;" size="mini"
                                        v-model="printHeader.OptCompanyName">
                                    </el-input> -->
                                    <span>
                                        {{printHeader.OptCompanyName}}
                                    </span>
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;"> 安装地点:
                                    <!-- <el-input v-if="!isPrint" style="width:70%;" size="mini"
                                        v-model="printHeader.SiteAddress">
                                    </el-input> -->
                                    <span>
                                        {{printHeader.SiteAddress}}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 维护保养人:
                                    <!-- <el-input v-if="!isPrint" style="width:70%;" size="mini"
                                        v-model="printHeader.OptUserName">
                                    </el-input>
                                    <span v-else>
                                        {{printHeader.OptUserName}}
                                    </span> -->
                                </span>
                            </div>

                        </td>
                        <td colspan="7" v-else  style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;"> 企业名称:
                                    <!-- <el-input v-if="!isPrint" style="width: 70%;" size="mini"
                                        v-model="printHeader.CompanyName">
                                    </el-input> -->
                                    <span>
                                        {{printHeader.CompanyName}}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 维护管理单位:
                                    <!-- <el-input v-if="!isPrint" style="width:70%;" size="mini"
                                        v-model="printHeader.OptCompanyName">
                                    </el-input> -->
                                    <span>
                                        {{printHeader.OptCompanyName}}
                                    </span>
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;"> 安装地点:
                                    <!-- <el-input v-if="!isPrint" style="width:70%;" size="mini"
                                        v-model="printHeader.SiteAddress">
                                    </el-input> -->
                                    <span>
                                        {{printHeader.SiteAddress}}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 维护保养人:
                                    <!-- <el-input v-if="!isPrint" style="width:70%;" size="mini"
                                        v-model="printHeader.OptUserName">
                                    </el-input>
                                    <span v-else>
                                        {{printHeader.OptUserName}}
                                    </span> -->
                                </span>
                            </div>

                        </td>
                    </tr>

                    <tr style="height: 35px;">
                        <td style="padding-left:8px;border-bottom: 1px solid #000;min-width:120px;">处理时间</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:140px;">
                            废液名称</td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                            处置方法
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">单位
                        </td>
                        <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">数量</td>
                        <td
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:130px;">
                            接收人签字</td>
                            <td v-if="!isPrint"
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">操作
                        </td>
                    </tr>
                    <template v-for="(item, index) in fyDataList">
                        <tr style="height: 35px;" :key="index">
                            <td style="padding-left:8px;border-bottom: 1px solid #000;min-width:120px;">
                                <el-date-picker :key="index" v-if="!isPrint" style="width: 95%;" size="mini"
                                    v-model="item['HandlDate'+index]" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                                <span v-else>{{item['HandlDate'+index]}}</span>
                                <!-- @blur="changeTime(index,item.HandlDate)" -->
                            </td>
                            <td
                                style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;min-width:140px;">
                                <el-select v-if="!isPrint" size="mini" style="width: 97%;" v-model="item.Name"
                                    filterable allow-create default-first-option placeholder="请选择">
                                    <el-option v-for="item in fyNameOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <span v-else>{{item.Name}}</span>
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                                <el-input v-if="!isPrint" size="mini" v-model="item.DisposalMethod">
                                </el-input>
                                <span v-else>{{item.DisposalMethod}}</span>

                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Unit">
                                </el-input>
                                <span v-else>{{item.Unit}}</span>

                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Quantity">
                                </el-input>
                                <span v-else>{{item.Quantity}}</span>
                            </td>
                            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
                                <el-input v-if="!isPrint" size="mini" v-model="item.ReceiveUserName">
                                </el-input>
                                <span v-else>{{item.ReceiveUserName}}</span>
                            </td>
                            <td v-if="!isPrint"
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                            <el-button size="mini" type="danger" icon="el-icon-delete" circle
                                @click="delData(index)">
                            </el-button>
                        </td>
                        </tr>
                    </template>



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
            <el-button v-if="isPrint" size="small" v-print="printContent"   style="margin-top:20px;">
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
            feiYeChuZhiModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false
            },
        },
        data() {

            let fyNameList = []
            this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.IsNormal).map(function (item) {
                let obj = {
                    label: item.Name + '废液',
                    value: item.Name + '废液',
                }
                fyNameList.push(obj);
            })

            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                loadingflag:false,
                printHeader: {
                    CompanyName: '',
                    OptCompanyName: '',
                    SiteAddress: '',
                    // OptUserName: '',
                },
                fyNameOptions: fyNameList,
                fyDataList: [],
                isPrint: false,
                DevOpsNum: '',
                printContent: {
                    id: 'prinFYCZtData',
                    preview: false,//预览工具是否启用
                    previewTitle: '这是预览标题',//预览页面的标题
                    popTitle: '废液处置记录表',//打印页面的页眉
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

            // this.clearfyDataList()
        },
        computed: {
            dialogFeiYeChuZhiVisible: {
                // getter
                get: function () {
                    return this.feiYeChuZhiModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:feiYeChuZhiModel", false); //触发 input 事件，并传入新值
                    }
                }
            },

        },
        methods: {
            // 获取数据
            getData(DevOpsNum) {
                var that = this;
                that.clearfyDataList();
                this.isPrint = true;
                this.DevOpsNum = DevOpsNum;
                this.http
                    .get("/getYW_FYCZList", {
                        DevOpsNum: DevOpsNum,
                    })
                    .then((res) => {
                        // console.log('res=', res);

                        res.forEach((r) => {
                            if (r.HandlDate != null) {
                                r.HandlDate = that.$options.filters.dayFormat(r.HandlDate);
                            }
                        });

                        for (var i = 0; i < res.length; i++) {
                            var _HandlDate = "HandlDate" + i;
                            that.fyDataList[i]["id"] = res[i].id;
                            that.fyDataList[i][_HandlDate] = res[i].HandlDate;
                            that.fyDataList[i]["Name"] = res[i].Name;
                            that.fyDataList[i]["DisposalMethod"] = res[i].DisposalMethod;
                            that.fyDataList[i]["Unit"] = res[i].Unit;
                            that.fyDataList[i]["Quantity"] = res[i].Quantity;
                            that.fyDataList[i]["ReceiveUserName"] = res[i].ReceiveUserName;

                            that.fyDataList[i]["CreateDate"] = moment(res[i].CreateDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );;
                            that.fyDataList[i]["CreateName"] = res[i].CreateName;
                            that.fyDataList[i]["UpdateName"] = localStorage.getItem("Loginedname");
                            // that.fyDataList[i]["OptUserName"] = res[i].OptUserName;
                            that.fyDataList[i]["SiteAddress"] = res[i].SiteAddress;
                            that.fyDataList[i]["OptCompanyName"] = res[i].OptCompanyName;

                        }

                        if (res.length > 0) {
                            this.printHeader.CompanyName = res[0].EntName;
                            this.printHeader.OptCompanyName = res[0].OptCompanyName;
                            this.printHeader.SiteAddress = res[0].SiteAddress;
                            // this.printHeader.OptUserName = res[0].OptUserName;

                            // this.printHeader.CreateDate = res[0].CreateDate;
                            // this.printHeader.CreateName = res[0].CreateName;
                            // this.printHeader.UpdateName = localStorage.getItem("Loginedname");
                            // this.printHeader.SiteAddress = res[0].SiteAddress;
                            // this.printHeader.OptCompanyName = res[0].OptCompanyName;

                        } else {
                            this.printHeader.CompanyName = this.socketApi.globalDataConfig.SDL_Global.SYS.CompanyName;
                            this.printHeader.OptCompanyName = this.socketApi.globalDataConfig.SDL_Global.SYS.YunWeiCompanyName;
                            this.printHeader.SiteAddress = this.socketApi.globalDataConfig.SDL_Global.SYS.PointName;
                            // this.printHeader.OptUserName = this.socketApi.globalDataConfig.SDL_Global.SYS.OptUserName;

                            this.printHeader.CreateName = localStorage.getItem("Loginedname");
                            this.printHeader.UpdateName = '';
                            this.printHeader.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");

                        }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 清空数据
            clearfyDataList() {
                let tiemList = [];
                for (var i = 0; i < 15; i++) {
                    var _HandlDate = "HandlDate" + i;
                    tiemList.push({
                        id: 0,
                        [_HandlDate]: '',
                        Name: '',
                        DisposalMethod: '',
                        Unit: '',
                        Quantity: '',
                        ReceiveUserName: ''
                    });
                }
                this.fyDataList = tiemList;
            },
            // 保存
            saveBtn: function () {

                debugger
                let FormDatas = [];
                let that = this;
                that.loadingflag=true;

                that.fyDataList.map(function (item, index) {

                    if (item.Name != '' || item["HandlDate" + index] != "") {

                        item.HandlDate = item["HandlDate" + index];
                        item.EntName = that.printHeader.CompanyName;
                        item.OptCompanyName = that.printHeader.OptCompanyName;
                        item.SiteAddress = that.printHeader.SiteAddress;
                        item.OptUserName = '';

                        if (item.id == 0) {
                            item.UpdateName = '';
                            item.CreateName = localStorage.getItem("Loginedname");
                            item.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");
                        }
                        // delete item['HandlDate'+index] 
                        FormDatas.push(item);
                    }

                })
                let flags = false;
                FormDatas.map(function (item, index) {
                    debugger
                    if (item.Name == '' || item.HandlDate == '' || item.DisposalMethod == '' || item.Unit == '' || item.Quantity == '') {
                        that.$message.warning("信息填写不完整");
                        that.loadingflag=false;

                        flags = true;
                        // return false;
                    }
                })
                if (flags) {
                    return false;
                }

                console.log('FormDatas=', FormDatas);

                that.http
                    .post("/updateYW_FYCZList", {
                        DevOpsNum: that.DevOpsNum,
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
              //  删除数据
              delData(_index) {
                this.fyDataList.splice(_index, 1);
                if (this.fyDataList.length > 0) {
                    for (let i = _index; i < this.fyDataList.length - _index; i++) {
                        let dx = i + 1;
                        this.fyDataList[i]['HandlDate' + i] = this.fyDataList[i]['HandlDate' + dx]
                    }
                }

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

    .div-dialog .el-dialog__body {
        overflow: auto;
    }

    .div-dialog .el-dialog__body #prinFYCZtData .el-input--suffix .el-input__inner {
        padding-right: 0;
    }
</style>