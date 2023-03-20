<template>
    <div>
        <!-- <el-form-item label="上传图片"> -->
        <el-upload ref="upload" action="#" :http-request="uploadProductPic" :before-upload="uploadProductPicBefore"
            accept="image/*" list-type="picture-card" :on-preview="handleContImgPreview" :on-remove="addImgRemoves"
            :limit="9" :on-exceed="exceedTips" :file-list="fileList">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true" :close-on-click-modal="false">
            <img width="100%" :src="dialogContImgUrl" alt />
        </el-dialog>
        <!-- </el-form-item> -->
    </div>

</template>

<script>
    import axios from "axios"; // 引入axios
    // import appConfig from "@appConfig";

    export default {
        props: {
            mkdirName: String,
            fileList: Array
        },
        data() {
            return {
                picList: [],//图片存档
                // fileList: [], //upload图片集合
                // imageList: '',//后台返回字符串
                dialogContImgVisible: false, //图片预览模态 
                dialogContImgUrl: false,//图片预览地址 
            }
        },
        methods: {
            //内容图数量限制3张
            exceedTips: function () {
                this.$message.error("最多只能上传九张图片");
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
                    //debugger
                    this.$message({
                        message: "上传的图片只能是jpg、png、bmp格式!",
                        type: "warning",
                    });
                }
                return isJpg;
            },

            //上传内容图
            uploadProductPic: function (file) {
                debugger
                this.picList=[];
                this.picList.push(file.file); //图片存档Images
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };
                //debugger
                let files = this.picList;

                let formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append("file1", files[i]);
                };
                formData.append("dircName", this.mkdirName);

                console.log("翻填时图片", this.fileList);

                //返回字符串    
                axios
                    .post("/uplodeImges", formData, config)
                    .then((res) => {
                        // this.imageList = res.data;

                        this.addFileList(res.data);
                        // console.log("imageList", this.fileList);
                        this.$emit('func', this.fileList.map(m => m.imgUrl));
                    })
                    .catch((res) => {
                        this.$message({
                            message: res.response.data,
                            type: "warning",
                            duration: 2000,
                        });
                    });
            },
            addFileList: function (url) {
                if (this.fileList.filter(m => m.url == url).length == 0) {
                    this.fileList.push({
                        name: '11',
                        url: this.GetAppConfigJson().ImgHostName + url, //appConfig.ImgHostName + url,
                        imgUrl: url
                    });
                }
            },
            //【内容图片预览事件】
            handleContImgPreview: function (file) {
                this.dialogContImgUrl = file.url;
                this.dialogContImgVisible = true;
            },
            //【内容图删除事件】
            addImgRemoves: function (file, fileLists) {
                debugger
                this.fileList = this.fileList.filter(m => m.imgUrl != file.imgUrl);
                // let files = [];
                // for (let i = 0; i < fileLists.length; i++) {
                //     files.push(fileLists[i].raw);
                // }
                // this.picList = files;

                // let urlIndex = -1;
                // debugger
                // urlIndex = this.fileLists.findIndex((item) => {
                //     if (item.url == file.url) {
                //         return true;
                //     }
                // });
                // this.fileLists.splice(urlIndex, 1);
                this.$emit('func', this.fileList.map(m => m.imgUrl));

                console.log("翻填时图片", this.fileList);
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
        }
    };
</script>
<style scoped>

</style>