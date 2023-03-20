<template>
    <div>
        <div style="margin-bottom:20px">
            <div class="header">
                <span class="title">功能参数</span>
            </div>
            <div class="content" style="height: 306px;">
                <el-row type="flex">
                    <el-col :span="8" style='height:100%;'>
                        <div class="bfkzCom">
                            <div class="bfkzName">上电清洗</div>
                            <div class="bfkzSwith">
                                <el-switch v-model="SDL_Global.PLC.ShangDianQingXi"
                                    @change="Sendml('上电清洗',SDL_Global.CMD.PLC_ShangDianQingXi.Format(SDL_Global.PLC.ShangDianQingXi))">
                                </el-switch>
                            </div>
                            <span v-if="SDL_Global.PLC.ShangDianQingXi == true" style="color: #4a92ff">开</span>
                            <span v-else style="color: #aaaaaa">关</span>
                        </div>
                    </el-col>
                    <el-col :span="8" style='height:100%;'>
                        <div class="bfkzCom">
                            <div class="bfkzName">采样杯润洗</div>
                            <div class="bfkzSwith">
                                <el-switch v-model="SDL_Global.PLC.CaiYangBeiRunXi"
                                    @change="Sendml('采样杯润洗',SDL_Global.CMD.PLC_CaiYangBeiRunXi.Format(SDL_Global.PLC.CaiYangBeiRunXi))">
                                </el-switch>
                            </div>
                            <span v-if="SDL_Global.PLC.CaiYangBeiRunXi == true" style="color: #4a92ff">开</span>
                            <span v-else style="color: #aaaaaa">关</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <div class="bfkzCom">
                            <div class="bfkzName">五参数连续运行</div>
                            <div class="bfkzSwith">
                                <el-switch v-model="SDL_Global.PLC.WuCanLianXu"
                                    @change="Sendml('五参数连续运行',SDL_Global.CMD.PLC_WuCanLianXu.Format(SDL_Global.PLC.WuCanLianXu))">
                                </el-switch>
                            </div>
                            <span v-if="SDL_Global.PLC.WuCanLianXu == true" style="color: #4a92ff">开</span>
                            <span v-else style="color: #aaaaaa">关</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="bfkzCom">
                            <div class="bfkzName">五参数小时测量</div>
                            <div class="bfkzSwith">
                                <el-switch v-model="SDL_Global.SYS.WuCanXiaoShiCeLiang"
                                    @change="Sendml('五参数小时测量',SDL_Global.CMD.SYS_WuCanXiaoShiCeLiang.Format(SDL_Global.SYS.WuCanXiaoShiCeLiang))">
                                </el-switch>
                            </div>
                            <span v-if="SDL_Global.SYS.WuCanXiaoShiCeLiang == true" style="color: #4a92ff">开</span>
                            <span v-else style="color: #aaaaaa">关</span>
                        </div>
                    </el-col>
                </el-row>
                 <el-row type="flex">
                    <el-col :span="8">
                        <div class="bfkzCom">
                            <div class="bfkzName">净水单元</div>
                            <div class="bfkzSwith">
                                <el-switch v-model="SDL_Global.PLC.ShangQingXiShui"
                                    @change="Sendml('净水单元',SDL_Global.CMD.PLC_ShangQingXiShui.Format(SDL_Global.PLC.ShangQingXiShui))">
                                </el-switch>
                            </div>
                            <span v-if="SDL_Global.PLC.ShangQingXiShui == true" style="color: #4a92ff">开</span>
                            <span v-else style="color: #aaaaaa">关</span>
                        </div>
                    </el-col>
                </el-row>
                <div style="width: 100%;height: 315px;">
                    <table cellspacing="0" cellpadding="0" border="0" class="tabclass"
                        style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">
                        <tr>
                            <td class="tdName">远程加标采水</td>
                            <td>
                                <el-radio class="tdRadio" :label="1" v-model="SDL_Global.SYS.YuanChengJiaBiaoCaiShui"
                                    @change="Sendml('远程加标采水切换',SDL_Global.CMD.SYS_YuanChengJiaBiaoCaiShui.Format(SDL_Global.SYS.YuanChengJiaBiaoCaiShui))">
                                    原水样
                                </el-radio>
                            </td>
                            <td>
                                <el-radio class="tdRadio" :label="2" v-model="SDL_Global.SYS.YuanChengJiaBiaoCaiShui"
                                    @change="Sendml('远程加标采水切换',SDL_Global.CMD.SYS_YuanChengJiaBiaoCaiShui.Format(SDL_Global.SYS.YuanChengJiaBiaoCaiShui))">
                                    重新采水
                                </el-radio>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="tdName">默认启动泵</td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.PLC.MoRenQuShuiBeng" :label='false'
                                    @change="Sendml('默认启动泵切换',SDL_Global.CMD.PLC_MoRenQuShuiBeng.Format(SDL_Global.PLC.MoRenQuShuiBeng))">
                                    泵1
                                </el-radio>
                            </td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.PLC.MoRenQuShuiBeng" :label='true'
                                    @change="Sendml('默认启动泵切换',SDL_Global.CMD.PLC_MoRenQuShuiBeng.Format(SDL_Global.PLC.MoRenQuShuiBeng))">
                                    泵2
                                </el-radio>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td class="tdName">留样模式</td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.LY.MoShi"
                                    @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                    :label="1">超标留样
                                </el-radio>
                            </td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.LY.MoShi"
                                    @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                    :label="2">周期留样
                                </el-radio>
                            </td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.LY.MoShi"
                                    @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                    :label="3">手动留样
                                </el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdName">监测水类型</td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.SYS.JianCeShuiLeiXing"
                                    @change="Sendml('监测水类型',SDL_Global.CMD.SYS_JianCeShuiLeiXing.Format(SDL_Global.SYS.JianCeShuiLeiXing))"
                                    :label="1">河道水
                                </el-radio>
                            </td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.SYS.JianCeShuiLeiXing"
                                    @change="Sendml('监测水类型',SDL_Global.CMD.SYS_JianCeShuiLeiXing.Format(SDL_Global.SYS.JianCeShuiLeiXing))"
                                    :label="2">湖库水
                                </el-radio>
                            </td>
                            <td>
                            
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 系统配置组件
    export default {
        props: {},
        data() {
            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
            };
        },
        mounted() { },
        computed: {},
        methods: {
            Sendml(name, ml) {
                let mlData = "";
                if (ml == "五参数小时测量=true") {
                    mlData = ml + ";" + "plc_五参数连续=False"
                } else {
                    mlData = ml
                }
                var data = localStorage.getItem("Loginedname") + "," + name + "," + mlData;
                // 启用试剂预警启用运维预警启用数据预警启用备件预警

                this.socketApi.sendSock(data, true);
            },
        },
    };
</script>
<style scoped>
    .header {
        height: 48px;
        background-color: #384565;
    }

    /* 各个模块标题 */
    .title {
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
        line-height: 48px;
    }

    /* body */
    .content {
        background-color: #303a4c;
        text-align: right;
    }

    /*  td 内容样式 */
    .bfkzCom {
        margin: 10px 15px 10px 0px;
        display: inline-block;
        height: 100%;
    }

    /* 上电清洗 */
    .bfkzName {
        display: inline-block;
        text-align: right;
        margin-right: 3px;
        color: #cccccc;
        font-size: 13px;
        height: 100%;
    }

    /* 上电清洗radio */
    .bfkzSwith {
        display: inline-block;
        text-align: center;
        height: 100%;
    }

    /* 功能参数表格样式 */
    .tabclass tr td {
        padding-top: 22px;
        font-size: 14px;
        color: #cccccc;
    }

   /* 功能参数 */
   .tdRadio {
        display: inline-block;
        color: #cccccc;
    }
    /*  命令名称样式 */
    .tdName {
        text-align: right;
        padding-right: 20px;
    }
</style>