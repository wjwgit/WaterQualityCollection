<template>
    <div>
        <div style="margin-bottom:20px">
            <div class="header">
                <span class="title">PLC参数</span>
            </div>
            <div class="content">
                <table cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">泵交替间隔</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.BengJiaoTiJianGe">
                                        <template slot="append">次</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('泵交替间隔修改','泵交替间隔修改',SDL_Global.CMD.PLC_BengJiaoTiJianGe,SDL_Global.PLC.BengJiaoTiJianGe,'次')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">除藻间隔次数</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.ChuZaoCiShu">
                                        <template slot="append">次</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('除藻间隔次数修改','除藻间隔次数修改',SDL_Global.CMD.PLC_ChuZaoCiShu, SDL_Global.PLC.ChuZaoCiShu,'次')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">沉淀池沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.ChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('沉淀池沉淀时间修改','沉淀池沉淀时间修改',SDL_Global.CMD.PLC_ChenDianShiJian, SDL_Global.PLC.ChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>

                     
                    </tr>
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">泵1取水时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.Beng1QuShuiShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('泵1取水时间修改','泵1取水时间修改',SDL_Global.CMD.PLC_BengQuShuiShiJian,SDL_Global.PLC.Beng1QuShuiShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                    
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">压力报警下限</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.YaLiXiaXian">
                                        <template slot="append">Kpa</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('压力报警下限修改','压力报警下限修改',SDL_Global.CMD.PLC_YaLiXiaXian, SDL_Global.PLC.YaLiXiaXian,'Kpa')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass"  v-if="zhuoDuYuChuLiShow">
                            <div class="plcCom">
                                <div class="bfkzName">TP采样杯沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.TPCaiYangBeiChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('TP采样杯沉淀时间修改','TP采样杯沉淀时间修改',SDL_Global.CMD.PLC_TPCaiYangBeiChenDianShiJian, SDL_Global.PLC.TPCaiYangBeiChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td v-else class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">采样杯沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.CaiYangBeiChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('采样杯沉淀时间修改','采样杯沉淀时间修改',SDL_Global.CMD.PLC_CaiYangBeiChenDianShiJian, SDL_Global.PLC.CaiYangBeiChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">泵2取水时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.Beng2QuShuiShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('泵2取水时间修改','泵2取水时间修改',SDL_Global.CMD.PLC_BengQuShuiShiJian,SDL_Global.PLC.Beng2QuShuiShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                      
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">内管路清洗时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.NeiGuanQingXiShiJian">
                                        <template slot="append">秒</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('内管路清洗时间修改','内管路清洗时间修改',SDL_Global.CMD.PLC_NeiGuanQingXiShiJian,SDL_Global.PLC.NeiGuanQingXiShiJian,'秒')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>

                        </td>
                        <td class="plcClass" v-if="zhuoDuYuChuLiShow">
                            <div class="plcCom">
                                <div class="bfkzName">TN采样杯沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.TNCaiYangBeiChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('TN采样杯沉淀时间修改','TN采样杯沉淀时间修改',SDL_Global.CMD.PLC_TNCaiYangBeiChenDianShiJian, SDL_Global.PLC.TNCaiYangBeiChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td v-else class="plcClass">
                        </td>
                    </tr>
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">泵补水时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.BengBuShuiShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('泵补水时间修改','泵补水时间修改',SDL_Global.CMD.PLC_BengBuShuiShiJian,SDL_Global.PLC.BengBuShuiShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">外管路清洗时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.WaiGuanQingXiShiJian">
                                        <template slot="append">秒</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('外管路清洗时间修改','外管路清洗时间修改',SDL_Global.CMD.PLC_WaiGuanQingXiShiJian, SDL_Global.PLC.WaiGuanQingXiShiJian,'秒')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass" v-if="zhuoDuYuChuLiShow">
                            <div class="plcCom">
                                <div class="bfkzName">NH3采样杯沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.NH3CaiYangBeiChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('NH3采样杯沉淀时间修改','NH3采样杯沉淀时间修改',SDL_Global.CMD.PLC_NH3CaiYangBeiChenDianShiJian, SDL_Global.PLC.NH3CaiYangBeiChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td v-else class="plcClass">
                        </td>
                    </tr>
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">周期运行清洗顺序</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.QingXiShunXu">
                                        <!-- <template slot="append">分钟</template> -->
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('周期运行清洗顺序','周期运行清洗顺序',SDL_Global.CMD.PLC_QingXiShunXu,SDL_Global.PLC.QingXiShunXu,'')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                   
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">plc增压泵1取水时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.ZengYaBeng1QuShuiShiJian">
                                        <template slot="append">秒</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('plc增压泵1取水时间修改','plc增压泵1取水时间修改',SDL_Global.CMD.PLC_ZengYaBeng1QuShuiShiJian,SDL_Global.PLC.ZengYaBeng1QuShuiShiJian,'秒')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass" v-if="zhuoDuYuChuLiShow">
                            <div class="plcCom">
                                <div class="bfkzName">COD采样杯沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.CODCaiYangBeiChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('COD采样杯沉淀时间修改','COD采样杯沉淀时间修改',SDL_Global.CMD.PLC_CODCaiYangBeiChenDianShiJian, SDL_Global.PLC.CODCaiYangBeiChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td v-else class="plcClass">
                        </td>
                    </tr>
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">周期运行采水顺序</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.CaiShuiShunXu">
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('周期运行采水顺序','周期运行采水顺序',SDL_Global.CMD.PLC_CaiShuiShunXu, SDL_Global.PLC.CaiShuiShunXu,'')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                 
                        <td class="plcClass">
                            <div class="plcCom">
                                <div class="bfkzName">plc增压泵2取水时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.ZengYaBeng2QuShuiShiJian">
                                        <template slot="append">秒</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('plc增压泵2取水时间修改','plc增压泵2取水时间修改',SDL_Global.CMD.PLC_ZengYaBeng2QuShuiShiJian,SDL_Global.PLC.ZengYaBeng2QuShuiShiJian,'秒')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass"  v-if="zhuoDuYuChuLiShow">
                            <div class="plcCom">
                                <div class="bfkzName">CODCR采样杯沉淀时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.CODCRCaiYangBeiChenDianShiJian">
                                        <template slot="append">分钟</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('CODCR采样杯沉淀时间','CODCR采样杯沉淀时间',SDL_Global.CMD.PLC_CODCRCaiYangBeiChenDianShiJian, SDL_Global.PLC.CODCRCaiYangBeiChenDianShiJian,'分钟')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td v-else class="plcClass">
                        </td>
                    </tr>
                    <tr>
                        <td class="plcClass">

                            <div class="plcCom">
                                <div class="bfkzName">周期运行配水顺序</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.PeiShuiShunXu">
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('周期运行配水顺序','周期运行配水顺序',SDL_Global.CMD.PLC_PeiShuiShunXu,SDL_Global.PLC.PeiShuiShunXu,'')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">
                                  <div class="plcCom">
                                <div class="bfkzName">喷淋泵启动温度</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.PenLinBengQiDongWenDu">
                                        <template slot="append">℃</template>
                                        
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('喷淋泵启动温度','喷淋泵启动温度',SDL_Global.CMD.PLC_PenLinBengQiDongWenDu,SDL_Global.PLC.PenLinBengQiDongWenDu,'℃')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">

                        </td>
                    </tr>
                    <tr>
                        <td class="plcClass">
                            <div class="plcCom" style="padding-bottom: 10px;">
                                <div class="bfkzName">周期运行测量顺序</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.CeLiangShunXu">
                                        <!-- <template slot="append">分钟</template> -->
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('周期运行测量顺序','周期运行测量顺序',SDL_Global.CMD.PLC_CeLiangShunXu,SDL_Global.PLC.CeLiangShunXu,'')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">
       <div class="plcCom">
                                <div class="bfkzName">喷淋泵关闭温度</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.PenLinBengGuanBiWenDu">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('喷淋泵启动温度','喷淋泵启动温度',SDL_Global.CMD.PLC_PenLinBengGuanBiWenDu,SDL_Global.PLC.PenLinBengGuanBiWenDu,'℃')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">

                        </td>
                    </tr>

                      <tr>
                        <td class="plcClass">
                            <div class="plcCom" style="padding-bottom: 10px;">
                                <div class="bfkzName">蒸发仪增量</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.ZhengFaYiZengLiang">
                                        <template slot="append">mm</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('蒸发仪增量','蒸发仪增量',SDL_Global.CMD.PLC_ZhengFaYiZengLiang,SDL_Global.PLC.ZhengFaYiZengLiang,'mm')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">
       <div class="plcCom">
                                <div class="bfkzName">蒸发量计算时间</div>
                                <div class="bfkzinput">
                                    <el-input disabled size="small" placeholder="请输入"
                                        v-model="SDL_Global.PLC.ZhngFaYiJiSuanShiJian">
                                        <template slot="append">点</template>
                                    </el-input>
                                </div>
                                <div class="btn"
                                    @click="updateForm('蒸发量计算时间','蒸发量计算时间',SDL_Global.CMD.PLC_ZhngFaYiJiSuanShiJian,SDL_Global.PLC.ZhngFaYiJiSuanShiJian,'℃')">
                                    <i class="el-icon-edit"></i>
                                </div>
                            </div>
                        </td>
                        <td class="plcClass">

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
                    <div class="dialogInput" style="text-align: left;"
                        v-if="mlName=='周期运行清洗顺序'||mlName=='周期运行采水顺序'||mlName=='周期运行配水顺序'||mlName=='周期运行测量顺序'">
                        <el-select v-model="data" placeholder="请选择" size="mini">
                            <el-option v-for="item in zqyxList" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="dialogInput" v-else>
                        <el-input size="small" placeholder="请输入" v-model="data" style=" color: #fff;">

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
</template>
<script>
    // 系统配置组件
    export default {
        props: {},
        data() {
            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                zhuoDuYuChuLiShow: this.GetAppConfigJson().zhuoDuYuChuLi,

                dialogFormVisible: false,  //模态框
                modelTitle: 'PLC参数--修改值',
                zqyxList: [
                    {
                        value: "8",
                        label: "8(禁用)",
                    },
                    {
                        value: "1",
                        label: "1",
                    },
                    {
                        value: "2",
                        label: "2",
                    },
                    {
                        value: "3",
                        label: "3",
                    },
                    {
                        value: "4",
                        label: "4",
                    }
                ],
                byName: '',
                unitName: '',
                mlName: "",
                ML: "",
                data: "",
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
                this.data = data;
            },
            // 修改PLC参数
            SendData() {
                var mldata = ""
                if (this.mlName == "泵1取水时间修改") {
                    mldata = this.ml.Format(1, this.data);
                } else if (this.mlName == "泵2取水时间修改") {
                    mldata = this.ml.Format(2, this.data);
                } else {
                    mldata = this.ml.Format(this.data);
                }
                var data =
                    "" + localStorage.getItem("Loginedname") + "," + this.mlName + "," + mldata;
                // this.$message.info(data);
                console.log(data);

                this.socketApi.sendSock(data);
                this.dialogFormVisible = false

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

    /* plc表格 td */
    .plcClass {
        text-align: right;
        padding-top: 15px;
        /* padding-right: 20px; */
        /* width: 150px; */
    }

    /* pcl  td 内容样式 */
    /* .plcCom {
        display: inline-block;

    } */

    /* 上电清洗 */
    .bfkzName {
        display: inline-block;
        text-align: right;
        margin-right: 3px;
        color: #cccccc;
        font-size: 13px;
        height: 100%;
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

    .btn .el-icon-edit {
        /* padding-top: 3px; */
        color: rgb(74, 146, 255);
    }
</style>