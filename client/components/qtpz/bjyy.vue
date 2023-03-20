<template>
    <div class="bjyy">
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="block">
                        <el-row :gutter="20">
                            <el-col :span="3">
                                <label class="rwlx"> 报警类型</label>
                                <el-input v-model="guideTypeInfo" size="small" style="width: 68%;" placeholder="请输入"
                                    type="text" @change="inquire">
                                </el-input>
                            </el-col>
                            <!-- <el-col :span="2">
                                <el-button type="primary" size="small" @click="addData">添加</el-button>
                            </el-col> -->
                        </el-row>



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
              .slice(
                (this.pageIndex - 1) * this.pageSize,
                (this.pageIndex - 1) * this.pageSize + this.pageSize
              )
            " :header-cell-style="{
              'background-color': '#384565',
            }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">
                    <el-table-column label="编号" align="center" type="index" width="80px">
                    </el-table-column>
                    <el-table-column label="报警类型" align="left" prop="GuideType" width="150px">
                    </el-table-column>
                    <el-table-column label="可能原因" align="left">
                        <template slot-scope="scope">
                            <span v-html="scope.row.ProblemDes" size="small"></span>
                        </template>
                    </el-table-column>
                    <!-- prop="Solution" -->
                    <!-- <el-table-column label="解决方案" align="left" >
                        <template slot-scope="scope">
                            <span v-html="scope.row.Solution"  size="small"></span>
                          </template>
                    </el-table-column> -->
                    <el-table-column label="解决方案" align="left" prop="ImgUrl" width="80px">

                        <template slot-scope="scope">
                            <!-- <img :src="scope.row.ImgUrl" width="40" height="40" class="head_pic" @click="selPic(scope.row)"
                                /> -->
                            <!-- v-if="scope.row.ImgUrl.toString().trim()!=''&&scope.row.ImgUrl!=null" -->
                            <span @click="selPic(scope.row)" style="cursor: pointer;color:#4a92ff">
                                查看

                            </span>
                            <!-- <span v-else>
                                暂无图片
                            </span> -->

                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="80px">
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
                    <el-pagination @current-change="currentPage" class="pageNation"
                        layout="total,sizes,prev, pager, next" :page-size="pageSize" :page-sizes="[5, 10, 20, 30, 50]"
                        @size-change="changeSize" :current-page="pageIndex" :total="total">
                    </el-pagination>
                </div>
                <!-- </div> -->
            </div>
        </div>
        <template class="dialogBoxs">
            <SolutionModel 
               :solutionVisible.sync="picdialog"
                :Name="diaTitle"
                    :SolutionInfo='SolutionInfo'
               :imgPaths='imgPaths'
      
            > </SolutionModel>
            <!-- <el-dialog :title="diaTitle" :visible.sync="picdialog" width="80%" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div style="height:485px ;">
                    <el-carousel indicator-position="outside" v-if="imgPaths" :autoplay="false">
                        <el-carousel-item v-for="item in imgPaths" :key="item">
                            <div>
                                <img :src="item" />
                            </div>
                            <div class="bjinfos">
                                <span v-html="SolutionInfo" size="small"></span>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="bjinfos" v-else style="color: rgba(255, 255, 255, 0.65) !important;">
                        <span size="small"> 解决方案：</span>
                        <span v-html="SolutionInfo" size="small"></span>
                    </div>
                </div>
            </el-dialog> -->
        </template>
        <!-- 模态窗 -->
        <template class="dialogBoxs">
            <el-dialog title="诊断方案" :visible.sync="centerDialogVisible" width="80%" :modal-append-to-body='false'
                :close-on-click-modal="false" @close='closeDialog'>
                <el-form :label-position="labelPosition" label-width="100px" :model="form" status-icon ref="form"
                    :rules="rules" class="demo-ruleForm" size="mini">
                    <el-form-item label="报警类型" prop="GuideType">
                        <el-input v-model="form.GuideType"></el-input>
                    </el-form-item>
                    <el-form-item label="可能原因" prop="ProblemDes">
                        <el-input type="textarea" v-model="form.ProblemDes"></el-input>
                    </el-form-item>
                    <el-form-item label="解决方案" prop="Solution">
                        <el-input type="textarea" v-model="form.Solution"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="ImgUrl" v-if="this.form.ID!=''">

                        <!-- <el-form-item label="上传图片"> -->
                        <el-upload ref="upload" action="#" :http-request="uploadProductPic"
                            :before-upload="uploadProductPicBefore" accept="image/*" list-type="picture-card"
                            :on-preview="handleContImgPreview" :on-remove="handleContImgRemove" multiple :limit="9"
                            :on-exceed="exceedTips" :file-list="fileLists">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true"
                            :close-on-click-modal="false">
                            <img width="100%" :src="dialogContImgUrl" alt />
                        </el-dialog>
                        <!-- </el-form-item> -->
                        <!-- <template v-for="item in dialogImageUrl">
                            <img width="240" height="240" :src="item" alt="">

                        </template> -->
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('form')" size="small">取 消</el-button>
                    <el-button type="primary" @click="SubmitForm('form')" size="small">保 存</el-button>
                </span>
            </el-dialog>
        </template>

    </div>
</template>
<script>
    import moment from "moment";
    // import tables from "../module/tables";
    import axios from "axios"; // 引入axios
    import excel from "../module/excel";
    import { DateTime } from "../../common/js/date.js";

    import SolutionModel from "../module/SolutionModel.vue"

    export default {
        name: "bjyy",
        components: {  SolutionModel },
        data() {
            return {
                emptyText: "暂无数据",
                centerDialogVisible: false,
                labelPosition: "right",
                form: {
                    GuideType: "",
                    ProblemDes: "",
                    Solution: "",
                    ImgUrl: "",
                    AlarmIDs: ''
                },
                guideTypeInfo: '',
                dialogContImgUrl: "",
                dialogContImgVisible: false,
                picList: [],
                fileLists: [],
                imgPaths: [],
                picdialog: false,
                SolutionInfo: '',
                diaTitle:'解决方案',
                dialogImageUrl: [],
                rules: {
                    GuideType: [
                        { required: true, message: "报警类型不能为空", trigger: "blur" },
                    ],
                    ProblemDes: [
                        { required: true, message: "可能原因不能为空", trigger: "blur" },
                    ],
                    Solution: [
                        { required: true, message: "解决方案不能为空", trigger: "blur" },
                    ],
                },
                tableData: [],
                total: 0,
                pageIndex: 1,
                pageSize: 20,
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
            //查询
            inquire() {
                this.tableData = [];

                let comdition = "GuideType like '%" +
                    this.guideTypeInfo +
                    "%'";
                this.pictLoading = true;
                this.emptyText = " "
                this.http
                    .get("/gettbhelpguide", {

                        comdition: comdition,
                    })
                    .then((res) => {
                        // this.http
                        //     .comMethod("*", "tbhelpguide", condition)
                        //     .then((res) => {
                        // setTimeout(() => {
                        this.pictLoading = false;
                        // }, 1000);
                        if (res.length != 0) {
                            this.total = res.length;

                            // r.ImgUrl = r.ImgUrl.substring(0, r.ImgUrl.length - 1);


                            console.log('res', res);
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
                this.$refs['form'].resetFields();
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.emptyUpload();
                this.centerDialogVisible = false;
            },


            //【内容图删除事件】
            handleContImgRemove: function (file, fileList) {
                let files = [];
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].raw != undefined) {
                        files.push(fileList[i].raw);
                    }
                };
                this.picList = files;

                let urlIndex = -1;

                urlIndex = this.fileLists.findIndex(item => {
                    if (item.url == file.url) {
                        return true
                    }
                });
                if (urlIndex > -1) {
                    this.fileLists.splice(urlIndex, 1)
                }
            },

            //内容图数量限制3张
            exceedTips: function () {
                this.$message.error("最多只能上传九张图片");
            },

            //【内容图片预览事件】
            handleContImgPreview: function (file) {
                this.dialogContImgUrl = file.url;
                this.dialogContImgVisible = true;
            },

            //上传内容图
            uploadProductPic: function (file) {

                this.picList.push(file.file);
                console.log('pic', this.picList)
            },

            //内容图上传前的大小 格式的校验
            uploadProductPicBefore: function (file) {
                var fileType = file.type;
                var isJpg = false;
                if (
                    fileType == "image/jpeg" ||
                    fileType == "image/png" ||
                    fileType == "image/bmp"
                ) {
                    isJpg = true;
                }

                if (!isJpg) {
                    this.$message({
                        message: "上传的图片只能是jpg、png、bmp格式!",
                        type: "warning",
                    });
                }
                return isJpg;
            },
            /**
             * 清空上传组件
             */
            emptyUpload() {
                const mainImg = this.$refs.upload;
                if (mainImg) {
                    this.picList = [];
                    this.$refs.upload.clearFiles();
                }
            },
            // 查看大图
            selPic(val) {
                debugger
                // let locatIndex = window.location.href.indexOf('#');
                // let httpUrls = window.location.href.substring(0, locatIndex);
                this.picdialog = true;
                this.imgPaths = val.ImgUrl==''?[]:val.ImgUrl;
                this.SolutionInfo = val.Solution;
                this.diaTitle=val.GuideType;
                // for (var i = 0; i < this.imgPaths.length; i++) {

                //     this.imgPaths[i] = httpUrls + this.imgPaths[i];
                // }

                // console.log(' this.imgPaths', this.imgPaths)

            },


            // 添加日志
            // addlog(operator, cmdargs) {
            //     let time = moment().format("YYYY-MM-DD HH:mm:ss");
            //     this.http
            //         .post("/addlog", {
            //             OPTIME: time,
            //             username: localStorage.getItem("Loginedname"),
            //             operator: operator,
            //             cmdargs: cmdargs,
            //         })
            //         .then((res) => {

            //             let ml = "日志上传=" + operator
            //             this.Sendml("日志上传", ml)
            //         })
            //         .catch((res) => {
            //             // console.log(res);
            //             this.$message.error(res);
            //         });
            // },
            //发送命令
            Sendml(name, ml) {

                var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;

                this.socketApi.sendSock(data, true);
            },
            addData() {
                this.centerDialogVisible = true;

                this.form.ID = "";
                this.form.GuideType = "";
                this.form.ProblemDes = "";
                this.form.Solution = "";
                this.form.ImgUrl = "";
                this.emptyUpload();

                // this.$refs['form'].clearValidate()
            },
            //   编辑
            editData(val) {
                this.centerDialogVisible = true;
                // this.$refs['form'].clearValidate()
                this.form.ID = val.ID;
                this.form.GuideType = val.GuideType;
                this.form.ProblemDes = val.ProblemDes;
                this.form.Solution = val.Solution;
                this.form.ImgUrl = val.ImgUrl;
                this.form.AlarmIDs = val.AlarmIDs;
                this.fileLists = [];
                this.picList = [];
                if (this.form.ImgUrl.toString().trim() != '') {
                    this.dialogImageUrl = this.form.ImgUrl
                    // let locatIndex = window.location.href.indexOf('#');
                    // let httpUrls = window.location.href.substring(0, locatIndex);
                    for (var i = 0; i < this.dialogImageUrl.length; i++) {
                        let flie1 = {
                            name: '11',
                            url: this.dialogImageUrl[i]
                        }
                        this.fileLists.push(flie1);

                    }
                }


                // this.picList.push(flie1);
                // this.$refs.form.clearValidate();

            },
            //添加/编辑
            SubmitForm(form) {
                this.$refs[form].validate((valid) => {
                    // console.log("id", this.form.ID);
                    if (valid) {
                        debugger
                        // ✨需要特别注意的地方：上传文件需要设置Content-Type为multipart/form-data
                        const config = {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        };
                        if (this.form.ID == "") {

                            let files = this.picList;

                            let formData = new FormData();
                            for (let i = 0; i < files.length; i++) {
                                formData.append("file1", files[i]);
                            }

                            formData.append("GuideType", this.form.GuideType);
                            formData.append("ProblemDes", this.form.ProblemDes);
                            formData.append("Solution", this.form.Solution);

                            formData.append("AlarmIDs", '');
                            axios
                                .post("/updatetbhelpguide", formData, config)
                                .then((res) => {
                                    //重置表单
                                    // this.$refs[formName].resetFields();
                                    //关闭
                                    this.centerDialogVisible = false;
                                    //清空上传图片
                                    this.emptyUpload();
                                    //获取企业信息
                                    this.inquire();
                                    this.$message({
                                        message: res.data,
                                        type: "success",
                                        duration: 2000,
                                    });
                                })
                                .catch((res) => {
                                    this.$message({
                                        message: res.response.data,
                                        type: "warning",
                                        duration: 2000,
                                    });
                                });
                            // this.http
                            //     .post("/updatetbhelpguide", {
                            //         GuideType: this.form.GuideType,
                            //         ProblemDes: this.form.ProblemDes,
                            //         Solution: this.form.Solution,
                            //         ImgUrl: this.form.ImgUrl,
                            //     })
                            //     .then((res) => {
                            //         // setTimeout(() => {
                            //         this.pictLoading = false;
                            //         // }, 1000);
                            //         if (res.affectedRows > 0) {
                            //             this.$message.success("添加成功");
                            //             this.inquire();

                            //             let operator = '新增报警原因数据';
                            //             let cmdargs = JSON.stringify(this.form);
                            //             this.addlog(operator, cmdargs)
                            //             this.centerDialogVisible = false;
                            //         } else {
                            //             this.$message.error("添加失败");
                            //         }
                            //     })
                            //     .catch((res) => {
                            //         // console.log(res);
                            //         this.$message.error(res);
                            //     });
                        } else {
                            let formData1 = new FormData();
                            //  翻填时图片
                            let files = this.picList;
                            console.log('files', this.picList);

                            for (let k = 0; k < this.picList.length; k++) {
                                formData1.append("file1", this.picList[k]);
                            }
                            //编辑时图片
                            let files1 = this.fileLists;
                            console.log('files1', files1);

                            for (let i = 0; i < files1.length; i++) {
                                formData1.append("file2", files1[i].url.substring(files1[i].url.lastIndexOf('/') + 1, files1[i].url.length));
                            }


                            formData1.append("GuideType", this.form.GuideType);
                            formData1.append("ProblemDes", this.form.ProblemDes);
                            formData1.append("Solution", this.form.Solution);
                            formData1.append("ID", this.form.ID);
                            formData1.append("AlarmIDs", this.form.AlarmIDs);
                            axios
                                .post("/updatetbhelpguide", formData1, config)
                                .then((res) => {

                                    // setTimeout(() => {
                                    this.pictLoading = false;
                                    // }, 1000);
                                    if (res.data == '操作成功') {
                                        this.$message.success("修改成功");
                                        this.inquire();
                                        let operator = '诊断管理修改';
                                        // let cmdargs = JSON.stringify(this.form);
                                        let cmdargs = '修改'+ this.form.GuideType;
                                        console.log('cmdargs=',cmdargs)
                                        
                                        // this.addlog(operator, cmdargs)
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
                this.pageIndex = val;
            },
            changeSize(val) {
                this.pageSize = val;
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

    .el-col-3 {
        width: auto;
    }

    .yhgl .el-form {
        margin: 20px;
        text-align: left;
    }

    .el-carousel__container {
        height: 420px !important;
    }

    /* 模态框 */
    .el-dialog__footer {
        text-align: center !important;
    }



    .bjinfos {
        width: 540px;
        text-align: left;
        margin: 0 auto;
        margin-top: 30px;

    }
</style>