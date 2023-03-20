<template>
    <div class="yhgl">
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="block">
                        <el-button type="primary" size="small" @click="addData">添加</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <!-- <div class="panel-body"> -->
                <!-- <tables :dataSource="tableData" :columns="columns" :height="268" :border="true"></tables> -->
                <el-table v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)"
                    element-loading-text="数据正在加载中" :data="
              tableData
            " :header-cell-style="{
              'background-color': '#384565',
            }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">
                    <el-table-column label="编号" align="center" prop="ID" width="60px">
                    </el-table-column>
                    <el-table-column label="通道名称" align="center" prop="CameraName">
                    </el-table-column>
                    <el-table-column label="设备序列号" align="center" prop="SerialNumber">
                    </el-table-column>
                    <el-table-column label="验证码" align="center" prop="VerificationCode">
                    </el-table-column>
                    <el-table-column label="摄像头版本号" align="center" prop="Version">
                    </el-table-column>
                    <!-- <el-table-column label="报警类型" prop="Type"> </el-table-column> -->
                    <el-table-column label="AppKey" align="center" prop="AppKey">
                    </el-table-column>
                    <el-table-column label="Secret" align="center" prop="Secret">
                    </el-table-column>
                    <el-table-column label="预览地址" align="center" prop="PreUrl">
                    </el-table-column>
                    <el-table-column label="回放地址" align="center" prop="ReviewUrl">
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="Remark">
                    </el-table-column>


                    <el-table-column label="操作" align="center" width="60px">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" circle
                                @click="editData(scope.row)">
                            </el-button>

                            <!-- <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delData(scope.row)">
                </el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pageNations">
                    <!-- <el-pagination @current-change="currentPage" class="pageNation" layout="total,sizes,prev, pager, next"
              :page-size="size" :page-sizes="[5, 10, 20, 30, 50]" @size-change="changeSize" :current-page="page"
              :total="total">
            </el-pagination> -->
                </div>
                <!-- </div> -->
            </div>
        </div>
        <!-- 模态窗 -->
        <template class="dialogBoxs">
            <el-dialog title="视频信息" :visible.sync="centerDialogVisible" width="60%" :modal-append-to-body='false'
                :close-on-click-modal="false" @close='closeDialog'>
                <el-form :label-position="labelPosition" label-width="110px" :model="myform" status-icon ref="myform"
                    :rules="rules" class="demo-ruleForm" size="mini">
                    <el-form-item label="通道名称" prop="CameraName">
                        <el-input v-model="myform.CameraName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备序列号" prop="SerialNumber">
                        <el-input v-model="myform.SerialNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="VerificationCode">
                        <el-input v-model="myform.VerificationCode"></el-input>
                    </el-form-item>
                    <el-form-item label="摄像头版本号" prop="Version">
                        <el-input v-model="myform.Version"></el-input>
                    </el-form-item>
                    <el-form-item label="AppKey" prop="AppKey">
                        <el-input v-model="myform.AppKey"></el-input>
                    </el-form-item>
                    <el-form-item label="Secret" prop="Secret">
                        <el-input v-model="myform.Secret"></el-input>
                    </el-form-item>
                    <el-form-item label="预览地址" prop="PreUrl">
                        <el-input v-model="myform.PreUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="回放地址" prop="ReviewUrl">
                        <el-input v-model="myform.ReviewUrl"></el-input>
                    </el-form-item>


                    <el-form-item label="备注">
                        <el-input v-model="myform.Remark"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('myform')" size="small">取 消</el-button>
                    <el-button type="primary" @click="userSubmitForm('myform')" size="small">保 存</el-button>
                </span>
            </el-dialog>
        </template>

    </div>
</template>
<script>
    import moment from "moment";
    // import tables from "../module/tables";

    import excel from "../module/excel";
    import { DateTime } from "../../common/js/date.js";

    export default {
        name: "yhgl",
        // components: { excel, tables },
        data() {
            return {
                emptyText: "暂无数据",
                centerDialogVisible: false,
                labelPosition: "right",
                myform: {
                    CameraName: "",
                    AppKey: "",
                    Secret: 0,
                    PreUrl: "",
                    ReviewUrl: "",
                    Remark: "",
                    SerialNumber: "",
                    VerificationCode: "",
                    Version: ""
                },
                rules: {
                    CameraName: [
                        { required: true, message: "通道名称不能为空", trigger: "blur" },
                    ],
                    AppKey: [
                        { required: true, message: "AppKey不能为空", trigger: "blur" },
                    ],
                    Secret: [
                        { required: true, message: "Secret不能为空", trigger: "blur" },
                    ],
                    PreUrl: [
                        { required: true, message: "预览地址不能为空", trigger: "blur" },
                    ],
                    SerialNumber: [
                        { required: true, message: "设备序列号不能为空", trigger: "blur" },
                    ],
                    VerificationCode: [
                        { required: true, message: "验证码不能为空", trigger: "blur" },
                    ],
                    Version: [
                        { required: true, message: "摄像头版本号不能为空", trigger: "blur" },
                    ],
                },
                tableData: [],
                total: 0,
                page: 1,
                size: 10,
                pictLoading: false,
                tableHeight: null
            };
        },
        mounted() {
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
            //
            inquire() {
                this.tableData = [];

                let condition = "";
                this.pictLoading = true;
                this.emptyText = " "
                this.http
                    .comMethod("*", "tbvideo", condition)
                    .then((res) => {
                        // setTimeout(() => {
                        this.pictLoading = false;
                        // }, 1000);
                        if (res.length != 0) {
                            this.total = res.length;
                            //表格数据
                            this.tableData = res;
                        } else {
                            this.total = 0;
                            this.emptyText = "暂无数据"
                        }
                    })
                    .catch((res) => {
                        setTimeout(() => {
                            this.pictLoading = false;
                            this.emptyText = "暂无数据"

                        }, 1000);
                        // console.log(res);
                    });
            },

            closeDialog() {

                // this.centerDialogVisible = false;
                this.$refs['myform'].resetFields();

            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.centerDialogVisible = false;
            },

            // 添加日志
            // addlog(operator) {
            //     let date = new DateTime(); //调用datetime获取时间格式
            //     let time = date.getDate("-") + date.getHour() + ':' + date.getMinute() + ':' + date.getSecond();
            //     this.http
            //         .post("/addlog", {
            //             OPTIME: time,
            //             username: localStorage.getItem("Loginedname"),
            //             operator: operator,
            //             cmdargs: operator,
            //         })
            //         .then((res) => {

            //             let ml = "日志上传=" + operator
            //             // this.Sendml("日志上传", ml)
            //         })
            //         .catch((res) => {
            //             // console.log(res);
            //             this.$message.error(res);
            //         });
            // },
            //发送命令
            Sendml(name, ml) {

                var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;

                // this.$message.info(data);

                this.socketApi.sendSock(data, true);
            },
            addData() {
                this.centerDialogVisible = true;

                this.myform = {
                    ID: "",
                    CameraName: "",
                    AppKey: "",
                    Secret: "",
                    PreUrl: "",
                    ReviewUrl: "",
                    SerialNumber: "",
                    VerificationCode: "",
                    Version: "",
                    Remark: ""
                }
                // this.$refs['form'].clearValidate()
            },

            editData(val) {
                this.centerDialogVisible = true;
                // this.$refs['form'].clearValidate()
                // this.resetForm()

                this.myform.ID = val.ID;
                this.myform.CameraName = val.CameraName;
                this.myform.AppKey = val.AppKey;
                this.myform.Secret = val.Secret;
                this.myform.PreUrl = val.PreUrl;
                this.myform.ReviewUrl = val.ReviewUrl;
                this.myform.SerialNumber = val.SerialNumber;
                this.myform.VerificationCode = val.VerificationCode;
                this.myform.Version = val.Version;
                // this.myform.RoleName = val.RoleName;
                this.myform.Remark = val.Remark;

                // this.$refs.form.clearValidate();

            },
            //添加/编辑用户
            userSubmitForm(form) {
                this.$refs[form].validate((valid) => {
                    // console.log("id", this.myform.ID);
                    if (valid) {
                        if (this.myform.ID == "") {
                            this.http
                                .post("/addVideo", {
                                    CameraName: this.myform.CameraName,
                                    AppKey: this.myform.AppKey,
                                    Secret: this.myform.Secret,
                                    PreUrl: this.myform.PreUrl,
                                    ReviewUrl: this.myform.ReviewUrl,
                                    ReviewUrl: this.myform.ReviewUrl,
                                    SerialNumber: this.myform.SerialNumber,
                                    VerificationCode: this.myform.VerificationCode,
                                    Version: this.myform.Version,
                                    Remark: this.myform.Remark,
                                })
                                .then((res) => {
                                    // setTimeout(() => {
                                    this.pictLoading = false;
                                    // }, 1000);
                                    if (res.affectedRows > 0) {
                                        this.$message.success("添加成功");
                                        this.inquire();
                                        let operator = "添加视频" + this.myform.Account;
                                        // this.addlog(operator)
                                        let cmdargs = JSON.stringify(this.myform);
                                        
                                        this.http.addLog(operator, cmdargs, true);

                                        this.centerDialogVisible = false;
                                    } else {
                                        this.$message.error("添加失败");
                                    }
                                })
                                .catch((res) => {
                                    // console.log(res);
                                    this.$message.error(res);
                                });
                        } else {
                            this.http
                                .post("/updateVideo", {
                                    CameraName: this.myform.CameraName,
                                    AppKey: this.myform.AppKey,
                                    Secret: this.myform.Secret,
                                    PreUrl: this.myform.PreUrl,
                                    ReviewUrl: this.myform.ReviewUrl,
                                    ReviewUrl: this.myform.ReviewUrl,
                                    SerialNumber: this.myform.SerialNumber,
                                    VerificationCode: this.myform.VerificationCode,
                                    Version: this.myform.Version,
                                    Remark: this.myform.Remark,
                                    ID: this.myform.ID,
                                })
                                .then((res) => {

                                    // setTimeout(() => {
                                    this.pictLoading = false;
                                    // }, 1000);
                                    if (res.affectedRows > 0) {
                                        this.$message.success("修改成功");
                                        this.inquire();
                                        // let cmdargs = JSON.stringify(this.myform);

                                        let operator = "修改视频" + this.myform.Account;
                                        // this.addlog(operator)
                                        let cmdargs = JSON.stringify(this.myform);

                                        this.http.addLog(operator, cmdargs, true);

                                        this.centerDialogVisible = false;
                                    } else {
                                        this.$message.error("修改失败");
                                    }
                                })
                                .catch((res) => {
                                    setTimeout(() => {
                                        this.pictLoading = false;
                                    }, 1000);
                                    // console.log(res);
                                    this.$message.error(res);
                                });

                        }
                    } else {
                        return false;

                    }
                });
            },
            currentPage(val) {
                this.page = val;
            },
            changeSize(val) {
                this.size = val;
            },
        },
    };
    //验证6位密码
    function isValidPW(pw) {
        let reg = /^[0-9]{6}$/;
        return reg.test(pw);
    }
</script>
<style scoped>
    /* 角色颜色 */
    .el-radio {
        color: #cccccc
    }

    .yhgl .el-form {
        margin: 20px;
        text-align: left;
    }

    /* 模态框 */
    .el-dialog__footer {
        text-align: center !important;
    }
</style>