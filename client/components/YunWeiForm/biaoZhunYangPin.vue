<template>
    <div>
        <el-dialog class="div-dialog" title="打印标准样品更换记录表" :visible.sync="dialogBiaoZhunYangPinVisible" width="766px"
            :modal-append-to-body='false' :close-on-click-modal="false">
            <div id="prinBZYPtData">
                <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">
                    标准样品更换记录表
                </div>

                <table style="border: 1px solid #000;text-align:left;;width:100%" cellspacing="0">
                    <tr style="height: 60px;">
                        <td colspan="8"  v-if="isPrint" style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;"> 企业名称:
                                    <span>
                                        {{ SDL_Global.SYS.CompanyName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 维护管理单位:
                                    <span>
                                        {{ SDL_Global.SYS.YunWeiCompanyName }}
                                    </span>
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;"> 安装地点:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 运行人员:

                                </span>
                            </div>

                        </td>
                        <td colspan="9"  v-else style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;"> 企业名称:
                                    <span>
                                        {{ SDL_Global.SYS.CompanyName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 维护管理单位:
                                    <span>
                                        {{ SDL_Global.SYS.YunWeiCompanyName }}
                                    </span>
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;"> 安装地点:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}
                                    </span>
                                </span>
                                <span style="display: inline-block;width: 50%;"> 运行人员:

                                </span>
                            </div>

                        </td>
                    </tr>

                    <tr style="height: 35px;">
                        <td style="padding:1px 4px;border-bottom: 1px solid #000;min-width:30px;">序号</td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:130px;">
                            标准样品名称</td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:50px;">
                            标准样品浓度
                        </td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:120px;">
                            配置时间
                        </td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:120px;">
                            更换时间
                        </td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:50px;">
                            数量</td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:60px;">
                            配置人员</td>
                        <td
                            style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:60px;">
                            更换人员</td>
                            <td v-if="!isPrint" style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">操作
                            </td>
                    </tr>
                    <template v-for="(item, index) in byDataList">
                        <tr style="height: 35px;" :key="index">
                            <td style="padding:1px 4px;border-bottom: 1px solid #000;text-align: center;">
                                <span>{{index+1}}</span>

                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:100px;">
                                <el-select v-if="!isPrint" size="mini" style="width: 97%;" v-model="item.Name"
                                    filterable allow-create default-first-option placeholder="请选择">
                                    <el-option v-for="item in byNameOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <span v-else>{{item.Name}}</span>
                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:50px;">

                                <el-input v-if="!isPrint" size="mini" v-model="item.ConcentrationValue">
                                </el-input>
                                <span v-else>{{item.ConcentrationValue}}</span>

                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:120px;">

                                <el-date-picker :key="index" v-if="!isPrint" style="width: 95%;" size="mini"
                                    v-model="item['ConfigDate'+index]" type="date" placeholder="选择日期"
                                    format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                                </el-date-picker>
                                <span v-else>{{item['ConfigDate'+index]}}</span>

                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000; min-width:120px;">
                                <el-date-picker :key="index" v-if="!isPrint" style="width: 95%;" size="mini"
                                    v-model="item['ChangeDate'+index]" type="date" placeholder="选择日期"
                                    format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                                </el-date-picker>
                                <span v-else>{{item['ChangeDate'+index]}}</span>
                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:50px;">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Quantity">
                                </el-input>
                                <span v-else>{{item.Quantity}}</span>
                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:60px;">
                                <el-input v-if="!isPrint" size="mini" v-model="item.ConfigUserName">
                                </el-input>
                                <span v-else>{{item.ConfigUserName}}</span>
                            </td>
                            <td
                                style="border-left: 1px solid #000;padding:1px 4px;border-bottom: 1px solid #000;min-width:60px;">

                            </td>
                            <td v-if="!isPrint" style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                                <el-button size="mini" type="danger"
                                    icon="el-icon-delete" circle @click="delData(index)">
                                </el-button>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <td colspan="8"   v-if="isPrint"  style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;">
                                    运行人员:
                                </span>
                                <span style="display: inline-block;width: 50%;">
                                    核查人:
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;">
                                    时间:

                                </span>
                                <span style="display: inline-block;width: 50%;">
                                    时间:
                                </span>
                            </div>

                        </td>
                        <td colspan="9" v-else style="border-bottom: 1px solid #000">
                            <div style="margin: 8px;margin-bottom: 15px;">
                                <span style="display: inline-block;width: 48%;">
                                    运行人员:
                                </span>
                                <span style="display: inline-block;width: 50%;">
                                    核查人:
                                </span>
                            </div>
                            <div style="margin: 8px;">
                                <span style="display: inline-block;width: 48%;">
                                    时间:

                                </span>
                                <span style="display: inline-block;width: 50%;">
                                    时间:
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
            <el-button v-if="!isPrint" size="small" @click="saveBtn" :loading="loadingflag"  style="margin-top:20px;">
                保存
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-if="isPrint" size="small" v-print="printContent"  style="margin-top:20px;">
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
            biaoZhunYangPinModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false
            },
        },
        data() {

            let byNameList = []
            this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().map(function (item) {
                let obj = {
                    label: item.Name + '标液',
                    value: item.Name + '标液',
                }
                if (item.IsNormal || item.Name == 'pH') {

                    byNameList.push(obj);
                }
            })

            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                loadingflag:false,
                byNameOptions: byNameList,
                byDataList: [],
                isPrint: false,
                DevOpsNum: '',
                printContent: {
                    id: 'prinBZYPtData',
                    preview: false,//预览工具是否启用
                    previewTitle: '这是预览标题',//预览页面的标题
                    popTitle: '标准样品更换记录表',//打印页面的页眉
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

            // this.clearbyDataList()
        },
        computed: {
            dialogBiaoZhunYangPinVisible: {
                // getter
                get: function () {
                    return this.biaoZhunYangPinModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:biaoZhunYangPinModel", false); //触发 input 事件，并传入新值
                    }
                }
            },

        },
        methods: {
            // 获取数据
            getData(DevOpsNum) {
                var that = this;
                that.clearbyDataList();
                this.isPrint = true;
                this.DevOpsNum = DevOpsNum;
                this.http
                    .get("/getYW_BZYPList", {
                        DevOpsNum: DevOpsNum,
                    })
                    .then((res) => {
                        // console.log('res=', res);
                        debugger
                        res.forEach((r) => {
                            if (r.ConfigDate != null) {
                                r.ConfigDate = that.$options.filters.dayFormat(r.ConfigDate);
                            }
                            if (r.ChangeDate != null) {
                                r.ChangeDate = that.$options.filters.dayFormat(r.ChangeDate);
                            }
                        });

                        for (var i = 0; i < res.length; i++) {
                            var _ConfigDate = "ConfigDate" + i;
                            var _ChangeDate = "ChangeDate" + i;
                            that.byDataList[i]["id"] = res[i].id;
                            that.byDataList[i][_ConfigDate] = res[i].ConfigDate;
                            that.byDataList[i][_ChangeDate] = res[i].ChangeDate;
                            that.byDataList[i]["Name"] = res[i].Name;
                            that.byDataList[i]["ConcentrationValue"] = res[i].ConcentrationValue;
                            that.byDataList[i]["ConfigUserName"] = res[i].ConfigUserName;
                            that.byDataList[i]["Quantity"] = res[i].Quantity;
                            that.byDataList[i]["ChangeUserName"] = res[i].ChangeUserName;

                            that.byDataList[i]["CreateDate"] = moment(res[i].CreateDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );;
                            that.byDataList[i]["CreateName"] = res[i].CreateName;
                            that.byDataList[i]["UpdateName"] = localStorage.getItem("Loginedname");
                            // that.byDataList[i]["OptUserName"] = res[i].OptUserName;
                            that.byDataList[i]["SiteAddress"] = res[i].SiteAddress;
                            that.byDataList[i]["OptCompanyName"] = res[i].OptCompanyName;

                        }

                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 清空数据
            clearbyDataList() {
                let tiemList = [];
                for (var i = 0; i < 15; i++) {
                    var _ConfigDate = "ConfigDate" + i;
                    var _ChangeDate = "ChangeDate" + i;
                    tiemList.push({
                        id: 0,
                        [_ConfigDate]: '',
                        [_ChangeDate]: '',
                        Name: '',
                        ConcentrationValue: '',
                        ConfigUserName: '',
                        Quantity: '',
                        ChangeUserName: ''
                    });
                }
                this.byDataList = tiemList;
            },
            // 保存
            saveBtn: function () {

                debugger
                let FormDatas = [];
                let that = this;
                  that.loadingflag=true;
                that.byDataList.map(function (item, index) {

                    if (item.Name != '') {

                        item.ConfigDate = item["ConfigDate" + index];
                        item.ChangeDate = item["ChangeDate" + index];
                        item.EntName = that.SDL_Global.SYS.CompanyName;
                        item.OptCompanyName = that.SDL_Global.SYS.YunWeiCompanyName;
                        item.SiteAddress = that.SDL_Global.SYS.PointName;
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

                    if (item.Name == '' || item.ConfigDate == '' || item.ChangeDate == '' || item.Quantity == '' || item.ConfigUserName == '') {
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
                    .post("/updateYW_BZYPList", {
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
                this.byDataList.splice(_index, 1);
                if (this.byDataList.length > 0) {
                    for (let i = _index; i < this.byDataList.length - _index; i++) {
                        let dx = i + 1;
                         
                        this.byDataList[i]['ConfigDate' + i] = this.byDataList[i]['ConfigDate' + dx];
                        this.byDataList[i]['ChangeDate' + i] = this.byDataList[i]['ChangeDate' + dx];
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

    .div-dialog #prinBZYPtData .el-input--suffix .el-input__inner {
        padding-right: 0;
    }
</style>