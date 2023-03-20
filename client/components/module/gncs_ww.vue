<template>
    <div>
        <div style="margin-bottom:20px">
            <div class="header">
                <span class="title">功能参数</span>
            </div>
            <div class="content" style="height: 205px;">

                <div style="width: 100%;height: 315px;">
                    <table cellspacing="0" cellpadding="0" border="0" class="tabclass"
                        style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">

                        <tr>
                            <td class="tdName">留样模式</td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.LY.MoShi"
                                    @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                    :label="1">超标留样
                                </el-radio>
                            </td>
                            <td>
                                <el-radio class="tdRadio" v-model="SDL_Global.LY.MoShi" style="padding-left:20px"
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
                            <td class="tdName">启用试剂预警</td>
                            <td>
                                <el-switch v-model="SDL_Global.SYS.ShiJiYuJing"
                                    @change="Sendml('启用试剂预警',SDL_Global.CMD.YJ_ShiJiYuJing.Format(SDL_Global.SYS.ShiJiYuJing))">
                                </el-switch>
                                <span v-if="SDL_Global.SYS.ShiJiYuJing == true" style="color: #4a92ff">开</span>
                                <span v-else style="color: #aaaaaa">关</span>
                                <el-tooltip effect="light" content="开启后,试剂不足或试剂即将到期,会产生试剂预警数据" placement="bottom-start"
                                    popper-class="atooltip">
                                    <span class="el-icon-warning"></span>
                                </el-tooltip>
                            </td>
                            <td colspan="2" class="tdName" style="text-align: left;">
                                <span style="padding:0 20px;">启用运维预警</span>
                                <el-switch v-model="SDL_Global.SYS.YunWeiYuJing"
                                    @change="Sendml('启用运维预警',SDL_Global.CMD.YJ_YunWeiYuJing.Format(SDL_Global.SYS.YunWeiYuJing))">
                                </el-switch>
                                <span v-if="SDL_Global.SYS.YunWeiYuJing == true" style="color: #4a92ff">开</span>
                                <span v-else style="color: #aaaaaa">关</span>
                                <el-tooltip effect="light" content="开启后,如果指定周期内没有进行运维,会产生运维预警数据"
                                    placement="bottom-start" popper-class="atooltip">
                                    <span class="el-icon-warning"></span>
                                </el-tooltip>
                            </td>

                        </tr>

                        <tr>
                            <td class="tdName">启用数据预警</td>
                            <td>
                                <el-switch v-model="SDL_Global.SYS.ShuJuYuJing"
                                    @change="Sendml('启用数据预警',SDL_Global.CMD.YJ_ShuJuYuJing.Format(SDL_Global.SYS.ShuJuYuJing))">
                                </el-switch>
                                <span v-if="SDL_Global.SYS.ShuJuYuJing == true" style="color: #4a92ff">开</span>
                                <span v-else style="color: #aaaaaa">关</span>
                                <el-tooltip effect="light" content="开启后,数据产生恒值或即将达到阈值情况下,会产生数据预警数据"
                                    placement="bottom-start" popper-class="atooltip">
                                    <span class="el-icon-warning"></span>
                                </el-tooltip>
                            </td>
                            <td colspan="2" class="tdName" style="text-align: left;">
                                <span style="padding:0 20px;">启用备件预警</span>

                                <el-switch v-model="SDL_Global.SYS.BeiJianYuJing"
                                    @change="Sendml('启用备件预警',SDL_Global.CMD.YJ_BeiJianYuJing.Format(SDL_Global.SYS.BeiJianYuJing))">
                                </el-switch>
                                <span v-if="SDL_Global.SYS.BeiJianYuJing == true" style="color: #4a92ff">开</span>
                                <span v-else style="color: #aaaaaa">关</span>
                                <el-tooltip effect="light" content="开启后,系统将自动检测即将到期的备件或耗材信息,会产生备件预警数据"
                                    placement="bottom-start" popper-class="atooltip">
                                    <span class="el-icon-warning"></span>
                                </el-tooltip>
                            </td>

                        </tr>
<tr>
                            <td class="tdName">泵1取水时间</td>
                            <td  colspan="2" class="tdName" style="text-align: left;">
                                <div >
                                    <el-input disabled size="small" placeholder="请输入" style="width:120px"
                                        v-model="SDL_Global.PLC.Beng1QuShuiShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                      <div class="btn"
                                    @click="updateForm('泵1取水时间修改','泵1取水时间修改',SDL_Global.CMD.PLC_BengQuShuiShiJian,SDL_Global.PLC.Beng1QuShuiShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                                </div>
                              
                            </td>

                        </tr>
                    </table>
                </div>
            </div>
            <!-- plc参数 -->
        <template class="dialogBox">
            <el-dialog :title="modelTitle" :visible.sync="dialogFormVisible" width="60%" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div class="dialogBody">
                    <div class="dialogLabel">
                        <label style="color: #cccccc">{{byName}}</label>
                    </div>
                 
                    <div class="dialogInput" >
                        <el-input size="small" placeholder="请输入" v-model="bengQuShuidata" style=" color: #fff;">

                            <template slot="append">{{unitName}}</template>

                        </el-input>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="SendData">确 定</el-button>
                </div>
            </el-dialog>
        </template>
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
                dialogFormVisible: false,  //模态框
bengQuShuidata:'',
            };
        },
        mounted() { },
        computed: {},
        methods: {
              updateForm(Name, mlName, ml, data, unitName) {

                this.dialogFormVisible = true;
                this.modelTitle = 'PLC参数--修改值';
                this.mlName = mlName;
                this.byName = Name;
                this.unitName = unitName;
                this.ml = ml;
                this.bengQuShuidata = data;
            },
            // 修改PLC参数
            SendData() {
                var mldata = ""
                if (this.mlName == "泵1取水时间修改") {
                    mldata = this.ml.Format(1, this.bengQuShuidata);
                } else if (this.mlName == "泵2取水时间修改") {
                    mldata = this.ml.Format(2, this.bengQuShuidata);
                } else {
                    mldata = this.ml.Format(this.bengQuShuidata);
                }
                var data =
                    "" + localStorage.getItem("Loginedname") + "," + this.mlName + "," + mldata;
                // this.$message.info(data);
                console.log(data);

                this.socketApi.sendSock(data);
                this.dialogFormVisible = false

            },
            Sendml(name, ml) {

                var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;
                // 启用试剂预警启用运维预警启用数据预警启用备件预警
                if (name == "启用试剂预警" || name == "启用运维预警" || name == "启用数据预警" || name == "启用备件预警") {
                    let $this = this;
                    $this
                        .$confirm("确认执行此操作吗, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        })
                        .then(() => {

                            $this.socketApi.sendSock(data, true);

                        });
                } else {
                    console.log('', data);

                    this.socketApi.sendSock(data, true);
                }

            },
        },
    };
</script>
<style scoped>
    /*  */
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
    .content{
        background-color: #303a4c;
        text-align: right;
    }
    /* 功能参数表格样式 */
    .tabclass tr td {
        padding-top: 25px;
        font-size: 14px;
        color: #cccccc;
 
    }
       /* 功能参数 */
   .tdRadio {
        display: inline-block;
        color: #cccccc;
    }
    /* 单选按钮样式 */
    /* .el-radio__label{
        color: #cccccc;
    } */
     /*  命令名称样式 */
    .tdName {
        text-align: right;
        padding-right: 20px;
    }
  .bfkzinput {
        display: inline-block;
        width: 35%;
    }

    .btn {
        display: inline-block;
        width: 25px;
        height: 30px;
        /* font-size: large; */
        cursor: pointer;
        text-align: left;
    }
  
</style>