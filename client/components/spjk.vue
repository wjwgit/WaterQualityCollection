<template>
    <div class="div_spjk">
        <!-- <div class="ybkz-body"> -->
        <!--  <div style="width: 100%; height: 40px; line-height: 40px">
                        <input type="button" value="预览视频" @click="PreViewVoid" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="关闭视频" @click="CloseViewVoid" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="截图" @click="CutPic" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="开始录像" @click="StartRecord" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="停止录像" @click="StopRecord" />
                    </div> -->
        <!-- </div>  -->
        <div style="margin:20px 20px;">
            <div id="video-containers" :style="{ width:Awidth + 'px',height:Aheight + 'px' }" v-if="spState==true"
                class="videoclass">
                <p style="text-align: center;margin-top: 200px ;">请选择视频通道</p>
            </div>
            <div id="video-container" v-else style="float: left;"></div>
            <div style="width: 200px; height: 600px;background-color: #303a4c;margin-left: 20px;float: left;">
                <el-row>
                    <el-col class="awaycalss">
                        视频通道

                    </el-col>
                </el-row>
                <el-row>
                    <template v-for="(item, index) in spaway">
                        <el-col :key="index" :span="24" class="awaycalss">
                            <el-radio v-model="ViewUrl" :label="item.PreUrl" @change="radioclick">{{item.CameraName}}
                            </el-radio>
                        </el-col>
                    </template>
                </el-row>
                <el-row>
                    <el-col :span="24" class="awaycalss">
                        <el-button type="primary" size="small" @click="PreViewVoid()">
                            预览视频
                        </el-button>
                    </el-col>
                    <el-col :span="24" class="awaycalss">
                        <el-button type="primary" size="small">
                            抓怕记录
                        </el-button>
                    </el-col>
                </el-row>
            </div>

        </div>

    </div>
</template>
<script>
    //需要执行npm install --save ezuikit-js
    import { mapGetters } from "vuex"; //, mapActions,mapState, mapMutations
    import EZUIKit from "ezuikit-js";
    import axios from "axios";

    export default {
        name: "spjk",
        data() {
            return {
                spState: true,
                player: null, //视频对象
                ViewUrl: "", //视频地址
                AccessToken: "", //token
                ExpireTime: 0, //token失效时间
                spaway: [],
                // Away: "",
                Awidth: 1460,//1560
                Aheight: 980,
            };
        },
        mounted() {
            this.selsp()

            this.resizeLctBody()

            // eslint-disable-next-line no-console
            // console.group("mounted 组件挂载完毕状态===============》");
            // var player = new EZUIKit.EZUIKitPlayer({
            //   autoplay: true,
            //   id: "video-container",
            //   accessToken:
            //     "at.2y6zmd164jf9gkir1y24w0s82za6ez7f-86sclw1egz-0t63s0v-bj7htq5zl",
            //   url: "ezopen://open.ys7.com/E85730267/2.live", //,ezopen://open.ys7.com/E85730267/1.rec?begin=20210727000000&end=20210727235959
            //   template: "simple", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
            // //   视频上方头部控件
            //   header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
            //   plugin: ['talk'],                       // 加载插件，talk-对讲
            // //   视频下方底部控件
            //   footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
            //   audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
            //   openSoundCallBack: data => console.log("开启声音回调", data),
            //   closeSoundCallBack: data => console.log("关闭声音回调", data),
            //   startSaveCallBack: data => console.log("开始录像回调", data),
            //   stopSaveCallBack: data => console.log("录像回调", data),
            //   capturePictureCallBack: data => console.log("截图成功回调", data),
            //   fullScreenCallBack: data => console.log("全屏回调", data),
            //   getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
            //   width: 600,
            //   height: 400,
            // });
            // // eslint-disable-next-line no-console
            // console.log("player", player);
            // // setTimeout(()=>{
            // //   player.stop(); // 方法调用示例，10秒后关闭视频
            // // },10000)
        },
        created: function () {
            // this.GetAccessToken();
            window.addEventListener('resize', this.resizeLctBody)
        },
        computed: {
            ...mapGetters({
                getIsCollapse: 'getIsCollapse'
            })
        },
        watch: {
            /* 监听getSidebarFold变化，解决echarts容器变化，重新渲染 setTimeout时间必须设置，且不能太短 */
            getIsCollapse() {
                setTimeout(() => {
                    // this.GetAccessToken();

                    this.resizeLctBody()
                }, 100)
            }
        },
        methods: {
            // 折叠菜单栏
            resizeLctBody() {
                
                this.$store.state.isCollapse;
                let lctwidth = window.innerWidth;
                if (lctwidth <= 1024) {
                    if (this.$store.state.isCollapse == false) {
                        this.Awidth = 580
                        this.Aheight = 660
                        if (this.player == null) {
                            this.PreViewVoid()

                        } else {
                            this.CloseViewVoid()
                            this.PreViewVoid()


                        }
                    } else {
                        this.Awidth = 680
                        this.Aheight = 660
                        if (this.player == null) {
                            this.PreViewVoid()

                        } else {
                            this.CloseViewVoid()
                            this.PreViewVoid()


                        }
                    }
                } else if (lctwidth < 1466 && lctwidth > 1024) {
                    if (this.$store.state.isCollapse == false) {
                        this.Awidth = 895
                        this.Aheight = 660
                        if (this.player == null) {
                            this.PreViewVoid()

                        } else {
                            this.CloseViewVoid()
                            this.PreViewVoid()


                        }
                    } else {
                        this.Awidth = 1015
                        this.Aheight = 660
                        if (this.player == null) {
                            this.PreViewVoid()

                        } else {
                            this.CloseViewVoid()
                            this.PreViewVoid()


                        }
                    }
                } else {
                    if (this.$store.state.isCollapse == false) {
                        this.Awidth = 1450
                        this.Aheight = 980
                        if (this.player == null) {
                            this.PreViewVoid()

                        } else {
                            this.CloseViewVoid()
                            this.PreViewVoid()


                        }

                        // this.player.params.url = 'ezopen://open.ys7.com/E85730267/2.live'
                        // this.player.params.height = 800
                        // this.PreViewVoid()

                    } else {
                        this.Awidth = 1560
                        this.Aheight = 980
                        if (this.player == null) {
                            this.PreViewVoid()


                        } else {
                            this.CloseViewVoid()
                            this.PreViewVoid()



                        }
                        // this.player.params.url = 'ezopen://open.ys7.com/E85730267/1.live'
                        // this.player.params.height = 800
                        // this.PreViewVoid()

                    }
                }

            },
            //获取Token
            GetAccessToken: function () {
                let Parms = new FormData();
                Parms.append("appKey", "d6ba78d5a80b47f7a61e7e1a44ad2e05"); //appKey
                Parms.append("appSecret", "6045501ad7d3709b23c79e0ee743fc84"); //饮用秘钥

                axios({
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    url: "https://open.ys7.com/api/lapp/token/get",
                    method: "POST",
                    data: Parms,
                })
                    .then((res) => {
                        //  console.log("获取AccessToken", res.data);
                        // console.log(res.data.code == 200);
                        // console.log(res.data.code);
                        // console.log(res.data.data.accessToken);
                        // console.log(res.data.data.expireTime);
                        debugger
                        if (res.data.code == 200) {
                            this.AccessToken = res.data.data.accessToken;
                            this.ExpireTime = res.data.data.expireTime;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            radioclick: function () {
                this.GetAccessToken()
            },
            //预览视频
            PreViewVoid: function () {
                if (this.AccessToken == "") {
                    this.spState = true
                } else {
                    this.spState = false
                    let NowTime = Date.now();
                    if (NowTime > this.ExpireTime) {
                        //获取授权
                        this.GetAccessToken();
                        // return;
                    }
                    // console.log(this.ExpireTime,);
                    // console.log(this.ViewUrl)
                    let $this = this;

                    setTimeout(() => {

                        try {
                            if ($this.player == null) {
                                $this.player = new EZUIKit.EZUIKitPlayer({
                                    autoplay: true,
                                    id: "video-container",
                                    accessToken: $this.AccessToken,
                                    url: $this.ViewUrl, //,ezopen://open.ys7.com/E85730267/1.rec?begin=20210727000000&end=20210727235959
                                    template: "security", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                                    // 视频上方头部控件
                                    //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
                                    //plugin: ['talk'],                       // 加载插件，talk-对讲
                                    // 视频下方底部控件
                                    // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
                                    // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                                    // openSoundCallBack: data => console.log("开启声音回调", data),
                                    // closeSoundCallBack: data => console.log("关闭声音回调", data),
                                    // startSaveCallBack: data => console.log("开始录像回调", data),
                                    // stopSaveCallBack: data => console.log("录像回调", data),
                                    // capturePictureCallBack: data => console.log("截图成功回调", data),
                                    // fullScreenCallBack: data => console.log("全屏回调", data),
                                    // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
                                    decoderPath: "",
                                    width: $this.Awidth,
                                    height: $this.Aheight,
                                });
                            } else {
                                $this.CloseViewVoid()
                                $this.player = new EZUIKit.EZUIKitPlayer({
                                    autoplay: true,
                                    id: "video-container",
                                    accessToken: $this.AccessToken,
                                    url: $this.ViewUrl, //,ezopen://open.ys7.com/E85730267/1.rec?begin=20210727000000&end=20210727235959
                                    template: "security", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                                    // 视频上方头部控件
                                    //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
                                    //plugin: ['talk'],                       // 加载插件，talk-对讲
                                    // 视频下方底部控件
                                    // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
                                    // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                                    // openSoundCallBack: data => console.log("开启声音回调", data),
                                    // closeSoundCallBack: data => console.log("关闭声音回调", data),
                                    // startSaveCallBack: data => console.log("开始录像回调", data),
                                    // stopSaveCallBack: data => console.log("录像回调", data),
                                    // capturePictureCallBack: data => console.log("截图成功回调", data),
                                    // fullScreenCallBack: data => console.log("全屏回调", data),
                                    // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
                                    decoderPath: "",
                                    width: $this.Awidth,
                                    height: $this.Aheight,
                                });
                            }
                        }
                        catch (e) {
                            console.log(e);
                            $this.spState = true

                        }
                    }, 1);
                }


                // this.resizeLctBody()
            },
            // 关闭视频-*
            CloseViewVoid: function () {

                this.player.stop();
                this.player = null;
                let div = document.getElementById("video-container");
                div.innerHTML = "";
            },
            //下载文件
            DownFile: function (blob, fileName) {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    var link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
            },
            //截图
            CutPic: function () {
                if (this.player == null) return;
                // this.player.capturePicture(0, "default");
                let capturePicturePromise = this.player.capturePicture(0, "default");
                // let PageThis = this;
                capturePicturePromise.then(function (res) {
                    // PageThis.DownFile(
                    //   new Blob(res.data.fileUint8Array, {
                    //     type: "application/octet-stream",
                    //   }),
                    //   res.data.fileName
                    // );
                    console.log("截图成功，用户执行关闭成功后的操作", res);
                });
            },
            //开始录音
            StartRecord: function () {
                if (this.player == null) return;
                var startSavePromise = this.player.startSave(
                    0,
                    new Date().getTime() + "video"
                );

                startSavePromise
                    // eslint-disable-next-line no-unused-vars
                    .then(function (data) {
                        console.log("start save success", startSavePromise);
                    })
                    .catch(function (error) {
                        console.log("start Save error", error);
                    });
            },
            //停止录音
            StopRecord: function () {
                if (this.player == null) return;

                var stopSavePromise = this.player.stopSave(0);

                stopSavePromise
                    // eslint-disable-next-line no-unused-vars
                    .then(function (data) {
                        console.log("stop save success", stopSavePromise);
                    })
                    .catch(function (error) {
                        console.log("stop Save error", error);
                    });
            },
            //获取视频名称
            selsp: function () {
                this.spaway = [];

                let query = " PreUrl , CameraName "
                let condition = "";
                this.http
                    .comMethod(query, "tbvideo", condition)
                    .then((res) => {
                        // setTimeout(() => {
                        // }, 1000);
                        if (res.length != 0) {
                            //表格数据
                            this.spaway = res;
                        } else {
                        }
                    })
                    .catch((res) => {

                        // console.log(res);
                    });


            }


        },
    };
</script>

<style scoped>
    .div_spjk {
        display: flex;
        flex-direction: column;
    }

    .div_spjk .el-button:hover {
        background-color: #4a92ff !important;
        border-color: #4a92ff !important;
    }

    .body-btn .el-button {
        background-color: #506c98;
        color: #ffffff;
        width: 80px;
        font-size: 14px;
        margin-bottom: 20px;
        margin-right: 15px;
        margin-left: 10px;
        border-color: #506c98;
    }

    .body-btn .el-button.active {
        background-color: #4a92ff;
        border-color: #4a92ff;
    }

    .body-btn .el-button--small,
    .el-button--small.is-round {
        padding: 9px 10px;
    }

    .awaycalss {
        margin-left: 20px;
        margin-top: 25px;
        color: #ffffff;
    }

    .el-radio {
        color: #ffffff;
    }

    .videoclass {
        background-color: #303a4c;
        float: left;
        color: #ffffff;
    }
</style>