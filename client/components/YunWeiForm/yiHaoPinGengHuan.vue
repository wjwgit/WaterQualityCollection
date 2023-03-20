<template>
    <div>
        <el-dialog class="div-dialog" title="打印易耗品更换记录表" :visible.sync="dialogYiHaoPinuVisible" width="726px"
            :modal-append-to-body="false" :close-on-click-modal="false">
            <div id="printYHPGHData">
                <div style="
            text-align: center;
            font-size: 16px;
            color: #000;
            margin-bottom: 10px;
            font-weight: 800;
          ">
                    易耗品更换记录表
                </div>

                <table style="border: 1px solid #000; text-align: left;width:100%" cellspacing="0">
                    <tr style="height: 60px">
                        <td colspan="6" v-if="isPrint" style="border-bottom: 1px solid #000">
                            <div style="margin: 8px; margin-bottom: 15px">
                                <span style="display: inline-block; width: 48%">
                                    企业名称:
                                    <span>
                                        {{ SDL_Global.SYS.CompanyName }}
                                    </span>
                                </span>
                                <span style="display: inline-block; width: 50%">
                                    维护管理单位:
                                    <span>
                                        {{ SDL_Global.SYS.YunWeiCompanyName }}
                                    </span>
                                </span>
                            </div>
                            <div style="margin: 8px">
                                <span style="display: inline-block; width: 48%">
                                    安装地点:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}

                                    </span>
                                </span>
                                <span style="display: inline-block; width: 50%">
                                    维护保养人:
                                    <!-- <el-input v-if="!isPrint" style="width: 70%" size="mini"
                                        v-model="printHeader.OptUserName">
                                    </el-input>
                                    <span v-else>
                                        {{ printHeader.OptUserName }}
                                    </span> -->
                                </span>
                            </div>
                        </td>
                        <td colspan="7" v-else style="border-bottom: 1px solid #000">
                            <div style="margin: 8px; margin-bottom: 15px">
                                <span style="display: inline-block; width: 48%">
                                    企业名称:
                                    <span>
                                        {{ SDL_Global.SYS.CompanyName }}
                                    </span>
                                </span>
                                <span style="display: inline-block; width: 50%">
                                    维护管理单位:
                                    <span>
                                        {{ SDL_Global.SYS.YunWeiCompanyName }}
                                    </span>
                                </span>
                            </div>
                            <div style="margin: 8px">
                                <span style="display: inline-block; width: 48%">
                                    安装地点:
                                    <span>
                                        {{ SDL_Global.SYS.PointName }}

                                    </span>
                                </span>
                                <span style="display: inline-block; width: 50%">
                                    维护保养人:
                                    <!-- <el-input v-if="!isPrint" style="width: 70%" size="mini"
                                        v-model="printHeader.OptUserName">
                                    </el-input>
                                    <span v-else>
                                        {{ printHeader.OptUserName }}
                                    </span> -->
                                </span>
                            </div>
                        </td>
                    </tr>

                    <tr style="height: 35px">
                        <td style="
                padding-left: 8px;
                border-bottom: 1px solid #000;
                width: 40px;
              ">
                            序号
                        </td>
                        <td style="
                border-left: 1px solid #000;
                padding-left: 8px;
                border-bottom: 1px solid #000;
               min-width: 120px;
              ">
                            易耗品名称
                        </td>
                        <td style="
                border-left: 1px solid #000;
                padding-left: 8px;
                border-bottom: 1px solid #000;
                width: 120px;
              ">
                            规格型号
                        </td>
                        <td style="
                border-left: 1px solid #000;
                padding-left: 8px;
                border-bottom: 1px solid #000;
                width: 60px;
              ">
                            单位
                        </td>
                        <td style="
                border-left: 1px solid #000;
                padding-left: 8px;
                border-bottom: 1px solid #000;
                width: 60px;
              ">
                            数量
                        </td>
                        <td style="
                border-left: 1px solid #000;
                padding-left: 8px;
                border-bottom: 1px solid #000;
                min-width: 170px;
              ">
                            更换原因说明(备注)
                        </td>
                        <td v-if="!isPrint"
                            style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">操作
                        </td>
                    </tr>
                    <template v-for="(item, index) in yhpDataList">
                        <tr style="height: 35px" :key="index">
                            <td style="
                  padding-left: 8px;
                  border-bottom: 1px solid #000;
                 
                ">
                                <span>{{index+1}}</span>
                                <!-- @blur="changeTime(index,item.FYStorageDate)" -->
                            </td>
                            <td style="
                  border-left: 1px solid #000;
                  padding-left: 8px;
                  border-bottom: 1px solid #000;
                ">
                                <el-select v-if="!isPrint" size="mini" style="width: 97%" v-model="item.Name" filterable
                                    allow-create default-first-option placeholder="请选择"
                                    @change="changeYHPGH(item.Name, index)">
                                    <el-option v-for="item in yhpNameOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <span v-else>{{ item.Name }}</span>
                            </td>
                            <td style="
                  border-left: 1px solid #000;
                  padding-left: 8px;
                  border-bottom: 1px solid #000;
                ">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Model">
                                </el-input>
                                <span v-else>{{ item.Model }}</span>
                            </td>
                            <td style="
                  border-left: 1px solid #000;
                  padding-left: 8px;
                  border-bottom: 1px solid #000;
                ">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Unit">
                                </el-input>
                                <span v-else>{{ item.Unit }}</span>
                            </td>
                            <td style="
                  border-left: 1px solid #000;
                  padding-left: 8px;
                  border-bottom: 1px solid #000;
                ">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Quantity">
                                </el-input>
                                <span v-else>{{ item.Quantity }}</span>
                            </td>
                            <td style="
                  border-left: 1px solid #000;
                  padding-left: 8px;
                  border-bottom: 1px solid #000;
                ">
                                <el-input v-if="!isPrint" size="mini" v-model="item.Remark">
                                </el-input>
                                <span v-else>{{ item.Remark }}</span>
                            </td>

                            <td v-if="!isPrint"
                                style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">

                                <el-button size="mini" type="danger" icon="el-icon-delete" circle
                                    @click="delData(index)">
                                </el-button>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <td colspan="8" style="border-bottom: 1px solid #000">
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
            <el-button v-if="isPrint" size="small" @click="editBtn" style="margin-top: 20px">
                编辑
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-if="!isPrint" size="small" @click="saveBtn" :loading="loadingflag" style="margin-top: 20px">
                保存
                <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <el-button v-show="!isPrint" size="small" @click="backBtn" type="primary" style="margin-top:20px;">
                返回
            </el-button>
            <el-button v-if="isPrint" size="small" v-print="printContent" style="margin-top: 20px">
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
            yiHaoPinModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false,
            },
        },
        data() {

            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                loadingflag: false,
                printHeader: {
                    CompanyName: "",
                    OptCompanyName: "",
                    SiteAddress: "",
                    // OptUserName: "",
                },
                DevOpsNum: "",
                yhpNameOptions: [],
                yhpDataList: [],
                isPrint: false,
                printContent: {
                    id: "printYHPGHData",
                    preview: false, //预览工具是否启用
                    previewTitle: "这是预览标题", //预览页面的标题
                    popTitle: "易耗品更换记录表", //打印页面的页眉
                    // extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.cSs/4.1.1/animate.compat.css，https://cdn.boc
                    extraHead: '<meta http-equiv="content-Language"content="zh-cn"/>',
                    previewBeforeopencallback() {
                        console.log("正在加载预览窗口");
                    },
                    previewOpencallback() {
                        console.log("已经加载完预览窗口");
                    },
                    beforeopencallback(vue) {
                        vue.printLoading = trueconsole.log("打开之前");
                    },
                },
            };
        },
        mounted() {
            // this.clearyhpDataList();
        },
        computed: {
            dialogYiHaoPinuVisible: {
                // getter
                get: function () {
                    return this.yiHaoPinModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:yiHaoPinModel", false); //触发 input 事件，并传入新值
                    }
                },
            },
        },
        methods: {
            // 获取列表数据
            getyhpData() {
                let that = this;
                that.yhpNameOptions = [];
                let _PolId = that.socketApi.globalDataConfig.SDL_Global.MetersDataPP()
                    .filter((m) => m.IsNormal).map(m => m.Code);;

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
                            let dataList = that.delRepeat(res);
                            dataList.map(function (item) {
                                let obj = {
                                    label: item.Name,
                                    value: item.Name,
                                    Model: item.ModelNum,
                                    Unit: item.Unit,
                                    Quantity: item.Quantity,
                                }
                                that.yhpNameOptions.push(obj)
                            })

                        } else {
                            that.yhpNameOptions = [];
                        }
                    })
                    .catch((res) => {

                        console.log(res);
                    });
            },
            // 去重
            delRepeat(tempArr) {
                let result = [];
                let obj = {};
                for (let i = 0; i < tempArr.length; i++) {
                    if (!obj[tempArr[i].Name]) {
                        result.push(tempArr[i]);
                        obj[tempArr[i].Name] = true;
                    };
                };
                return result;
            },

            changeYHPGH(val, index) {
                debugger
                let that = this;
                that.yhpNameOptions.map(function (item) {
                    if (item.label == val) {
                        that.yhpDataList[index]["Model"] = item.Model;
                        that.yhpDataList[index]["Unit"] = item.Unit;
                        that.yhpDataList[index]["Quantity"] = item.Quantity;
                    }

                })
            },
            // 获取数据
            getData(DevOpsNum) {
                var that = this;
                this.DevOpsNum = DevOpsNum;
                that.clearyhpDataList();
                this.getyhpData();

                that.isPrint = true;
                this.http
                    .get("/getYW_YHPGHList", {
                        DevOpsNum: DevOpsNum,
                    })
                    .then((res) => {
                        // console.log('res=', res);

                        res.forEach((r) => {
                            if (r.FYStorageDate != null) {
                                r.FYStorageDate = that.$options.filters.dayFormat(
                                    r.FYStorageDate
                                );
                            }
                        });

                        for (var i = 0; i < res.length; i++) {

                            that.yhpDataList[i]["id"] = res[i].id;
                            that.yhpDataList[i]["Name"] = res[i].Name;
                            that.yhpDataList[i]["Model"] = res[i].Model;
                            that.yhpDataList[i]["Unit"] = res[i].Unit;
                            that.yhpDataList[i]["Quantity"] = res[i].Quantity;
                            that.yhpDataList[i]["Remark"] = res[i].Remark;

                            that.yhpDataList[i]["CreateDate"] = moment(res[i].CreateDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );;
                            that.yhpDataList[i]["CreateName"] = res[i].CreateName;
                            that.yhpDataList[i]["UpdateName"] = localStorage.getItem("Loginedname");
                            // that.yhpDataList[i]["OptUserName"] = res[i].OptUserName;
                            // that.yhpDataList[i]["SiteAddress"] = res[i].SiteAddress;
                            // that.yhpDataList[i]["OptCompanyName"] = res[i].OptCompanyName;
                        }

                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 清空数据
            clearyhpDataList() {
                let tiemList = [];
                for (var i = 0; i < 15; i++) {

                    tiemList.push({
                        id: 0,
                        Name: "",
                        Model: "",
                        Unit: "",
                        Quantity: "",
                        Remark: "",
                    });
                }
                this.yhpDataList = tiemList;
            },
            // 保存
            saveBtn: function () {
                debugger;
                let FormDatas = [];
                let that = this;
                that.loadingflag = true;
                this.yhpDataList.map(function (item, index) {
                    if (item.Name != "") {
                        if (item.id == 0) {

                            item.UpdateName = '';
                            item.CreateName = localStorage.getItem("Loginedname");
                            item.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");
                        }

                        item.OptCompanyName = that.SDL_Global.SYS.YunWeiCompanyName;
                        item.SiteAddress = that.SDL_Global.SYS.PointName;
                        item.EntName = that.SDL_Global.SYS.CompanyName;
                        item.OptUserName = "";
                        // console.log(item);
                        // delete item['FYStorageDate'+index]

                        FormDatas.push(item);
                    }

                });
                debugger;
                console.log("FormDatas=", FormDatas);
                let flags = false;

                FormDatas.map(function (item, index) {

                    if (item.Name == '' || item.Unit == '' || item.Quantity == '') {
                        that.$message.warning("信息填写不完整");
                        that.loadingflag = false;

                        flags = true;
                        // return false;
                    }
                })
                if (flags) {
                    return false;
                }
                that.http
                    .post("/updateYW_YHPGHList", {
                        DevOpsNum: that.DevOpsNum,
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
            editBtn: function () {
                this.isPrint = false;
                //   this.getData(this.DevOpsNum) ;
            },
            //  删除数据
            delData(_index) {

                this.yhpDataList.splice(_index, 1);
            },
            // 返回
            backBtn() {
                this.isPrint = true;
                this.getData(this.DevOpsNum);
            },
        },
    };
</script>
<style scoped>
    /* .el-table  .el-table__expanded-cell{
  background-color: '#384565' !important
 } */
    /*  .div-dialog #printDataS {
        height: calc(100vh - 280px);

        overflow: auto;
    } */

    .div-dialog .el-dialog__body {
        overflow: auto;
    }
</style>