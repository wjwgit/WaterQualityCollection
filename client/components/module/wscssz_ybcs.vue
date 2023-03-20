<template>
    <div class="ybcs-body">
        <el-row :gutter="24">
            <template v-for="(item, index) in SDL_Global.MetersDataPP().filter((m) => m.IsNormal)">
                <el-col :key="index" :sm="24" :xs="24" :md="24" :lg="12" style="margin:0px 0px 20px 0px;">
                    <el-row class="header">
                        <el-col>
                            <span class="tag">{{ item.Name }}</span>
                            <el-button v-if="item.savebtn" class="savebtn"
                                @click="changeScState(item.ID,item.Code,'savebtn',false)" type="primary" size="small">
                                编辑</el-button>
                            <el-button v-if="!item.savebtn" :loading="item.isSendLoading" class="savebtn"
                                @click="SendscData(item.ID,item.Code)" type="primary" size="small">保存
                            </el-button>
                            <el-button v-if="!item.savebtn" class="savebtn" @click="item.savebtn=true" size="small">取消
                            </el-button>
                        </el-col>
                    </el-row>
                    <div class="lcbj" v-if="item.lcbjDiv">

                        <el-row class="rowdiv" v-if="item.savebtn">

                            <!-- <el-col :span="9">
                                <el-select v-model="sicanForm[item.Code]['lcbj'].lcbjtype" placeholder="请选择"
                                    @change="pattern(item.ID)" size="small">
                                    <el-option v-for="item in lcbjtypeOptions" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col> -->
                            <el-col :span="3" class="inputbox">
                                测量模式
                            </el-col>
                            <el-col :span="9">
                                <el-select v-model="sicanForm[item.Code]['lcbj'].lcbjtype" placeholder="请选择"
                                    @change="pattern(item.Code)" size="small">
                                    <el-option v-for="item in lcbjtypeOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                量程
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <!-- <el-input v-model="sicanForm[item.Code]['lcbj'].minlc" size="mini"
                                    class="inputdivs" placeholder="请输入" disabled>
                                </el-input> -->
                                <!-- <el-input v-model="sicanForm[item.Code]['lcbj'].maxlc" size="mini"
                                    class="inputdivs" placeholder="请输入" disabled> -->
                                <el-input v-model="LiangChengXiaXian" size="mini" style="width: 30%;"
                                    placeholder="请输入" disabled>

                                </el-input>
                                <span style="color: #cccccc;">--</span>
                                <el-input v-model="item.LiangCheng" size="mini" style="width: 42%;" placeholder="请输入"
                                    disabled>

                                </el-input>
                            </el-col>


                        </el-row>
                        <el-row class="rowdiv" v-if="item.savebtn">
                            <el-col :span="3" class="inputbox">
                                预警下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].DLimit" size="mini" class="inputdiv"
                                    placeholder="请输入" disabled>
                                    <template slot="append">mg/L</template>
                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                预警上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].ULimit" size="mini" class="inputdiv"
                                    placeholder="请输入" disabled>
                                    <template slot="append">mg/L</template>
                                </el-input>
                            </el-col>

                        </el-row>
                        <el-row class="rowdiv" v-if="item.savebtn">
                            <el-col :span="3" class="inputbox">
                                报警下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].DDLimit" size="mini" class="inputdiv"
                                    placeholder="请输入" disabled>
                                    <template slot="append">mg/L</template>
                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                报警上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].UULimit" size="mini" class="inputdiv"
                                    placeholder="请输入" disabled>
                                    <template slot="append">mg/L</template>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv" v-if="!item.savebtn">
                            <!-- <el-col :span="3" class="inputbox">
                                量程
                            </el-col>
                            <el-col :span="12" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].minlc" size="mini"
                                    class="inputdivs" placeholder="请输入">
                                </el-input> <span style="color: #cccccc;">--</span>
                                <el-input v-model="sicanForm[item.Code]['lcbj'].maxlc" size="mini"
                                    class="inputdivs" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="9">
                                <el-select v-model="sicanForm[item.Code]['lcbj'].lcbjtype" placeholder="请选择"
                                    @change="pattern(item.Code)" size="small">
                                    <el-option v-for="item in lcbjtypeOptions" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col> -->

                            <el-col :span="3" class="inputbox">
                                测量模式
                            </el-col>
                            <el-col :span="9">
                                <el-select v-model="sicanForm[item.Code]['lcbj'].lcbjtype" placeholder="请选择"
                                    @change="pattern(item.Code)" size="small">
                                    <el-option v-for="item in lcbjtypeOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                量程
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <!-- <el-input v-model="sicanForm[item.Code]['lcbj'].minlc" size="mini"
                                    class="inputdivs" placeholder="请输入" disabled>
                                </el-input> -->
                                <!-- <el-input v-model="sicanForm[item.Code]['lcbj'].maxlc" size="mini"
                                    class="inputdivs" placeholder="请输入" disabled> -->
                                <el-input v-model="LiangChengXiaXian" size="mini" style="width: 30%;"
                                    placeholder="请输入" disabled>

                                </el-input>
                                <span style="color: #cccccc;">--</span>
                                <el-input v-model="item.LiangCheng" size="mini" style="width: 42%;" placeholder="请输入"
                                    disabled>

                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv" v-if="!item.savebtn">
                            <el-col :span="3" class="inputbox">
                                预警下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].DLimit" size="mini" class="inputdiv"
                                    placeholder="请输入">
                                    <template slot="append">{{item.Unit}}</template>
                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                预警上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].ULimit" size="mini" class="inputdiv"
                                    placeholder="请输入">
                                    <template slot="append">{{item.Unit}}</template>
                                </el-input>
                            </el-col>

                        </el-row>
                        <el-row class="rowdiv" v-if="!item.savebtn">
                            <el-col :span="3" class="inputbox">
                                报警下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].DDLimit" size="mini" class="inputdiv"
                                    placeholder="请输入">
                                    <template slot="append">{{item.Unit}}</template>
                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                报警上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="sicanForm[item.Code]['lcbj'].UULimit" size="mini" class="inputdiv"
                                    placeholder="请输入">
                                    <template slot="append">{{item.Unit}}</template>
                                </el-input>
                            </el-col>
                        </el-row>

                    </div>



                </el-col>
            </template>
            <el-col :sm="24" :xs="24" :md="24" :lg="24"
                v-if="SDL_Global.MetersDataPP().filter((m) => m.IsWC||m.ID=='YeLvSu'||m.ID=='ZaoMiDu').length>0">
                <div class="wucanshu">
                    <el-row class="header">
                        <el-col>
                            <span class="tag">五参数</span>
                            <el-button v-if="wccsEdit" class="savebtn" @click="changeState" type="primary" size="small">
                                编辑</el-button>
                            <el-button v-if="!wccsEdit" class="savebtn" :loading="isSendLoading" @click="SendcsData"
                                type="primary" size="small">保存</el-button>
                            <el-button v-if="!wccsEdit" class="savebtn" @click="wccsEdit=true" size="small">
                                取消</el-button>
                        </el-col>
                    </el-row>
                    <div class="body-footer" v-if="wccsEdit">

                        <el-row style="height: 225px;">

                            <template
                                v-for="(item, index) in SDL_Global.MetersDataPP().filter((m) => m.IsWC||m.ID=='YeLvSu'||m.ID=='ZaoMiDu')">
                                <el-col :span="4"
                                    style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                    <span>{{item.Name}}标样浓度</span>
                                </el-col>
                                <el-col :span="4" style="height: 60px;padding: 0 8px;">
                                    <div class="wcunit">
                                        <el-input size="mini" placeholder="请输入" disabled v-model="item.BiaoYangNongDu">
                                            <template slot="append">{{item.Unit}}</template>
                                        </el-input>
                                    </div>
                                </el-col>
                                <el-col :span="3" style="height: 60px; font-size: 14px;">
                                    <div class="btn1" @click="updatewucanForm(item.Code,item.Unit)">
                                        <a>报警设定</a>
                                    </div>
                                </el-col>

                            </template>
                        </el-row>

                    </div>
                    <div class="body-footer" v-if="!wccsEdit">

                        <el-row style="height: 225px;">

                            <template v-for="(item, index) in  wcbyeditlist">
                                <el-col :span="6"
                                    style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                    <span>{{item.Name}}标样浓度</span>
                                </el-col>
                                <el-col :span="5" style="height: 60px;padding: 0 8px;">
                                    <div class="wcunit">
                                        <el-input size="mini" placeholder="请输入" v-model="item.BiaoYangNongDu">
                                            <template slot="append">{{item.Unit}}</template>
                                        </el-input>
                                    </div>
                                </el-col>
                            </template>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :sm="24" :xs="24" :md="24" :lg="24"
                v-if="SDL_Global.MetersData().filter((m) => m.ID=='ZJS').length>0">
                <div class="wucanshu">
                    <el-row class="header">
                        <el-col>
                            <span class="tag">重金属</span>
                        </el-col>
                    </el-row>
                    <div class="body-footer">
                        <el-row style="height: 125px;">
                            <template v-for="(item, index) in SDL_Global.MetersData().filter((m) => m.IsZJS)">
                                <el-col :span="4"
                                    style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                    <span>{{item.Name}}标样浓度</span>
                                </el-col>
                                <el-col :span="4" style="height: 60px;padding: 0 8px;">
                                    <div class="wcunit">
                                        <el-input size="mini" placeholder="请输入" disabled
                                            v-model="item.BiaoYangHeChaNongDu">
                                            <template slot="append">{{item.Unit}}</template>
                                        </el-input>
                                    </div>

                                </el-col>
                                <el-col :span="3" style="height: 60px; font-size: 14px;">
                                    <div class="btn"
                                        @click="updateForm(item.Name+'标样浓度',item.mlName,SDL_Global.CMD.YiBiao_BiaoYangHeChaNongDu,item.BiaoYangHeChaNongDu,item.Unit)">
                                        <i class="el-icon-edit"></i>
                                    </div>
                                    <div class="btn1" @click="updatewucanForm(item.Code,item.Unit)">
                                        <a>报警设定</a>
                                    </div>
                                </el-col>

                            </template>
                        </el-row>

                    </div>

                </div>
            </el-col>
            <el-col :sm="24" :xs="24" :md="24" :lg="24"
                v-if="SDL_Global.MetersData().filter((m) => m.ID=='VOCs').length>0">
                <div class="wucanshu">
                    <el-row class="header">
                        <el-col>
                            <span class="tag">VOCs</span>
                        </el-col>
                    </el-row>
                    <div class="body-footer">
                        <el-row style="height: 525px;">
                            <template v-for="(item, index) in SDL_Global.MetersData().filter((m) => m.IsVOCs)">
                                <el-col :span="4"
                                    style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                    <span>{{item.Name}}标样浓度</span>
                                </el-col>
                                <el-col :span="4" style="height: 60px;padding: 0 8px;">
                                    <div class="wcunit">
                                        <el-input size="mini" placeholder="请输入" disabled v-model="item.BiaoYangNongDu">
                                            <template slot="append">{{item.Unit}}</template>
                                        </el-input>
                                    </div>
                                </el-col>
                                <el-col :span="4" style="height: 60px; font-size: 14px;">
                                    <div class="btn"
                                        @click="updateForm(item.Name+'标样浓度',item.mlName,SDL_Global.CMD.YiBiao_WC_BiaoYangHeChaNongDu,item.BiaoYangNongDu,item.Unit)">
                                        <i class="el-icon-edit"></i>
                                    </div>
                                    <div class="btn1" @click="updatewucanForm(item.Code,item.Unit)">
                                        <a>报警设定</a>
                                    </div>
                                </el-col>

                            </template>
                        </el-row>

                    </div>

                </div>
            </el-col>
        </el-row>
        <!-- 五参数量程报警弹窗-->
        <template class="dialogBox">
            <el-dialog :title="dialogName" :visible.sync="dialogForm" width="76%" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div class="dialogBody">

                    <div class="wclcbj">
                        <!-- 量程去掉 -->
                        <el-row class="rowdiv">
                            <el-col :span="3" class="inputbox">
                                量程
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="wucanForm.minlc" size="mini" class="inputdiv" style="width: 27%;"
                                    placeholder="请输入" :disabled="true">
                                </el-input>
                                <span style="color: #cccccc;">--</span>

                                <el-input v-model="wucanForm.maxlc" size="mini" class="inputdiv" style="width: 27%;"
                                    placeholder="请输入" :disabled="true">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="3" class="inputbox">
                                预警下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <!-- DLimit -->
                                <el-input v-model="wucanForm.DLimit" size="mini" class="inputdiv" placeholder="请输入">
                                    <!-- <template slot="append" v-if="code=='w01001'">--</template>
                                        <template slot="append" v-else-if="code=='w01014'">μS/cm</template>
                                        <template slot="append" v-else-if="code=='w01003'">NTU</template>
                                        <template slot="append" v-else-if="code=='w01010'">℃</template>
                                        <template slot="append" v-else>mg/L</template> -->
                                    <template slot="append">{{alarmUnit}}</template>

                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                预警上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="wucanForm.ULimit" size="mini" class="inputdiv" placeholder="请输入">
                                    <template slot="append">{{alarmUnit}}</template>


                                </el-input>
                            </el-col>

                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="3" class="inputbox">
                                报警下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="wucanForm.DDLimit" size="mini" class="inputdiv" placeholder="请输入">
                                    <template slot="append">{{alarmUnit}}</template>


                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                报警上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="wucanForm.UULimit" size="mini" class="inputdiv" placeholder="请输入">
                                    <template slot="append">{{alarmUnit}}</template>

                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogForm = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="editwclcbj">确 定</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
    import moment from "moment";

    export default {
        name: "wscssz",
        data() {
            var that = this;
            let _sicanForm = {};
            this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.IsNormal).map(function (item) {
                _sicanForm[item.Code] = {
                    lcbj: {
                        lcbjtype: "1",
                        minlc: "",
                        maxlc: "",
                        DDLimit: "",
                        DLimit: "",
                        ULimit: "",
                        UULimit: ""
                    },
                    sjyl: {
                        sjzl: "",
                        bjxx: "",
                        sjsy: "",
                        sjdqsj: ""
                    },
                    bynd: {
                        lcpybynd: "",
                        ldhcbynd: "",
                        kdz: "",
                        byhcnd: "",
                    }
                };
            })
            return {
                LiangChengXiaXian: 0, //固定写死量程下限

                lcbjtypeOptions: [
                    {
                        value: "1",
                        label: "水样测量",
                    },
                    {
                        value: "2",
                        label: "标样核查",
                    },
                ],
                isSendLoading: false,
                lcbjDiv: true,
                wccsEdit: true,
                sicanForm: _sicanForm,//四参数

                // config: this.socketApi.ssztConfig.config, //配置数据
                dialogForm: false,//模态框
                code: "",
                dialogName: "",
                alarmUnit: '',
                wucanForm: {
                    minlc: "",
                    maxlc: "",
                    DDLimit: "",
                    DLimit: "",
                    ULimit: "",
                    UULimit: ""
                },
                tabdata: [],
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,


                dialogcsMode: false,
                TSform: {
                    ID: 0,
                    TestCount: 0,
                    SortIndex: 0,
                    Status: 0
                },
                labelPosition: "right",
                tableHeight: null,
                wcbyeditlist: [],
                // YiBiaoShow: YiBiaoData,

            };
        },
        mounted() {
            this.selectlcbj('', 1)
        },
        methods: {

            // 四参编辑
            changeScState(id, code, name, flag) {
                // 切换编辑模式
                this.SDL_Global[id][name] = flag;


            },
            // 测量模式切换
            pattern(Code) {
                this.selectlcbj(Code, this.sicanForm[Code]['lcbj'].lcbjtype);
            },
            //读取仪表量程
            selectlcbj(Code, lcbjtype) {

                let condition = "AlarmType in (0," + lcbjtype + ") "
                if (Code != "") {
                    condition = condition + "and Code='" + Code + "'"
                }
                let that = this;
                this.http
                    .comMethod("*", "tbalarmarea", condition)
                    .then((res) => {
                        if (res.length != 0) {
                            res.forEach((r) => {
                                if (that.sicanForm[r.Code]) {
                                    if (r["AlarmType"] == 0) {
                                        this.sicanForm[r["Code"]]['lcbj'].minlc = r["DDLimit"];
                                        this.sicanForm[r["Code"]]['lcbj'].maxlc = r["UULimit"];
                                    } else {
                                        that.sicanForm[r["Code"]]['lcbj'].DDLimit = r["DDLimit"];
                                        that.sicanForm[r["Code"]]['lcbj'].DLimit = r["DLimit"];
                                        that.sicanForm[r["Code"]]['lcbj'].ULimit = r["ULimit"];
                                        that.sicanForm[r["Code"]]['lcbj'].UULimit = r["UULimit"];
                                    }
                                }
                            });
                            if(Code==""){
                                this.tabdata = res;
                            }
                        } else {

                            this.$message.info("暂无数据");
                        }
                    })
                    .catch((res) => {

                        console.log(res);
                    });
            },

            // 四参数修改命令
            SendscData(id, Code) {
                this.SDL_Global[id].isSendLoading = true;
                if (this.SDL_Global[id].lcbjDiv == true) {
                    let condition = {
                        DDLimit: this.sicanForm[Code]['lcbj'].DDLimit,
                        DLimit: this.sicanForm[Code]['lcbj'].DLimit,
                        ULimit: this.sicanForm[Code]['lcbj'].ULimit,
                        UULimit: this.sicanForm[Code]['lcbj'].UULimit,//"'" +
                        Code: Code,//"'" + 
                        AlarmType: this.sicanForm[Code]['lcbj'].lcbjtype,
                    }

                    this.updatelcbj(condition);

                }
                let $this = this;
                setTimeout(function () {
                    $this.SDL_Global[id].isSendLoading = false;
                    $this.SDL_Global[id].savebtn = true;
                }, 1000)
            },

            //发送命令
            Sendml(name, ml) {
                var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;
                this.socketApi.sendSock(data, true);
            },
            // 五参数修改
            editwclcbj() {
                let value = this.code
                let that = this;

                let condition = {
                    DDLimit: that.wucanForm.DDLimit,//"'" ++ "'"
                    DLimit: that.wucanForm.DLimit,
                    ULimit: that.wucanForm.ULimit,
                    UULimit: that.wucanForm.UULimit,
                    Code: value,//"'" ++ "'"
                    AlarmType: '1,2,3,4,5,6,7',
                }
                that.updatelcbj(condition);

             
                // var str = "0"
                // let conditions = {
                //     DDLimit: "'" + this.wucanForm.minlc + "'",
                //     DLimit: "'" + 0 + "'",
                //     ULimit: "'" + 0 + "'",
                //     UULimit: "'" + this.wucanForm.maxlc + "'",
                //     Code: "'" + value + "'",
                //     AlarmType: str,
                // }
                // this.updatelcbj(conditions);
                this.dialogForm = false;

            },

            //  五参数报警设定翻填
            updatewucanForm(code, Unit) {
                this.dialogForm = true;
                this.alarmUnit = Unit;
                this.dialogName = "报警设定--" + this.socketApi.globalDataConfig.getCodeNameData(code);
                this.code = code;
                // this.wucanForm ={};
                this.wucanForm.minlc = '';
                this.wucanForm.maxlc = '';
                this.wucanForm.DDLimit = '';
                this.wucanForm.DLimit = '';
                this.wucanForm.ULimit = '';
                this.wucanForm.UULimit = '';
                this.tabdata.forEach((r) => {
                    debugger
                    if (this.code == r['Code']) {
                        if (r["AlarmType"] == 0) {
                            this.wucanForm.minlc = r["DDLimit"];
                            this.wucanForm.maxlc = r["UULimit"];
                        } else {
                            this.wucanForm.DDLimit = r["DDLimit"];
                            this.wucanForm.DLimit = r["DLimit"];
                            this.wucanForm.ULimit = r["ULimit"];
                            this.wucanForm.UULimit = r["UULimit"];
                        }
                    }

                })
                console.log('this.wucanForm=', this.wucanForm)
            },

            // 修改仪表预警，报警
            updatelcbj(condition) {
                this.http
                    .post("/updatelcbj", condition)
                    .then(res => {
                        console.log(condition);
                        debugger
                        if (res.warningCount == 0) {
                            this.selectlcbj(condition.Code, condition.AlarmType);
                            this.$message.success('修改成功');
                            // let opts = this.socketApi.globalDataConfig.getYBCLName(condition.AlarmType);
                            debugger
                            let cmdargs = JSON.stringify(condition);
                            let operators = "量程报警范围设定："; //+ opts;
                            // this.addlog(operators, cmdargs);
                            this.http.addLog(operators, cmdargs, true);

                        } else {
                            this.$message.error('修改失败');
                        }
                    })
                    .catch(res => {
                        // console.log(res);
                        this.$message({
                            message: '修改失败',
                            type: 'error'
                        });
                    });
            },
            // 五参数标样浓度
            changeState() {
                this.wccsEdit = false;

                this.wcbyeditlist = []
                let $this = this;
                this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.IsWC).map(function (item, index) {
                    let obj = {}
                    obj.Name = item.Name
                    obj.BiaoYangNongDu = item.BiaoYangNongDu
                    obj.Unit = item.Unit

                    $this.wcbyeditlist.push(obj)
                })
            },

            // 五参数修改命令
            SendcsData() {

                this.isSendLoading = true;
                // let ph = "";
                // let diandaolv = "";
                // let zhuodu = "";
                // let rongjieyang = "";
                // let water = "";
                // let zaomidu = "";
                // let yelvsu = "";
                let $this = this;
                let wcBiaoYangMLData = '';
                this.wcbyeditlist.map(function (item, index) {

                    if (item.Name == "pH") {
                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_PH_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';
                    }
                    else if (item.Name == "电导率") {

                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_DianDaoLv_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';

                    } else if (item.Name == "浊度") {

                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_HunZhuoDu_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';
                    } else if (item.Name == "溶解氧") {

                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_RongJieYang_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';
                    }
                    else if (item.Name == "水温") {

                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_ShuiWen_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';

                    } else if (item.Name == "藻密度") {

                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_ZaoMiDu_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';

                    } else if (item.Name == "叶绿素") {
                        wcBiaoYangMLData += $this.SDL_Global.CMD.WC_YeLvSu_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';
                    }

                })


                var data = localStorage.getItem("Loginedname") + "," + "五参数修改" + "," + wcBiaoYangMLData;
                // this.$message.info(data);
                // let $this = this;
                setTimeout(function () {
                    $this.isSendLoading = false
                    $this.wccsEdit = true;
                }, 1000);
                this.socketApi.sendSock(data);

            },
            // 添加日志
            // addlog(operators, cmdargs) {
            //     this.http
            //         .post("/addlog", {
            //             OPTIME: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            //             username: localStorage.getItem("Loginedname"),
            //             operator: operators,
            //             cmdargs: cmdargs,
            //         })
            //         .then((res) => {
            //             if (type != '修改预处理方式') {
            //                 let ml = "日志上传=" + operators
            //                 this.Sendml("日志上传", ml)
            //             }
            //         })
            //         .catch((res) => {
            //             // console.log(res);
            //             this.$message.error(res);
            //         });
            // },

        }
    };
</script>
<style scoped>
    /* 五参数 */
    .wucanshu {
        background-color: #303a4c;

    }

    /* 量程报警div */
    .lcbj {
        padding-bottom: 1px;
        padding-top: 20px;
        background-color: #303a4c;
        /* background-color: red; */
    }

    /* 五参量程报警 */
    .wclcbj {
        padding-bottom: 20px;
        padding-top: 20px;
        background-color: #303a4c;
    }


    .header {
        height: 48px;
        line-height: 48px;
        background-color: #384565;
    }

    .body-footer {
        padding-bottom: 1px;
        padding-top: 20px;
    }

    /* 保存按钮 */
    .savebtn {
        float: right;
        margin-right: 20px;
        margin-top: 8px;
        width: 80px;
    }

    .rowdiv {
        height: 28px;
        margin: 0px 0px 20px 0px;
    }

    .rowdiv .el-col-3 {
        color: #cccccc;
        text-align: right;
        line-height: 28px;
        font-size: 14px;
    }


    .rowdiv .el-col-2 {
        /* color: #cccccc; */
        /* text-align: right; */
        padding-left: 15px;
        font-size: 14px;
    }

    .rowdiv .el-col-4 {
        color: #cccccc;
        text-align: right;
        margin-right: 8px;
        font-size: 14px;
        padding-bottom: 15px;
    }

    .rowdiv .el-col-4 span {
        font-size: 14px;
        line-height: 28px;
    }

    .rowdiv .el-col-6 {
        color: #cccccc;
        text-align: right;
        margin-right: 8px;
        font-size: 14px;
    }

    .rowdiv .el-col-5 {
        color: #cccccc;
    }

    .lcbj .el-select {
        width: 58% !important;
        margin-left: 8px;
    }

    /* input单位 */
    .el-input-group__append,
    .el-input-group__prepend {
        padding: 0 8px;
    }

    .dialogInput.el-input__inner {
        background-color: #455474 !important;
    }

    .dialogInput .el-select {
        width: 95% !important;
    }

    .footer {
        width: 100%;
        height: 48px;
    }



    .tag {
        color: #cccccc;
        padding-left: 25px;
    }

    /* inputdivs */
    .inputdiv {
        width: 60%;
    }

    /* 量程input */
    .inputdivs {
        width: 25%;
    }

    /* 量程 */
    .inputbox {
        /* margin: 10px 0px; */
        padding-left: 8px;
    }

    .inputboxs {
        /* margin: 10px 0px; */
        text-align: left;
    }

    .content {
        width: 100%;
    }

    .el-table__body-wrapper {
        background-color: #303a4c !important;
    }

    .el-row::after,
    .el-row::before {
        display: none;
    }

    .box {
        height: 48px;
        background-color: #384565;
    }

    .text-item {
        background-color: #303a4c;
        text-align: right;
    }

    .bfkzinput {
        display: inline-block;
        width: 35%;
    }

    .tabclass {
        font-size: 14px;
        color: #cccccc;
    }


    /* 模态框 */
    .dialog-footer {
        text-align: center;
    }



    /* 各个模块标题 */
    .title {
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
        line-height: 48px;
    }

    /* 修改命令btn */
    .btn {
        display: inline-block;
        width: 25px;
        height: 30px;
        /* font-size: large; */
        cursor: pointer;
        text-align: left;
    }

    .btn1 {
        text-align: left;
        cursor: pointer;
    }

    .btn1 a {
        color: #4a92ff;
        text-decoration: underline;
        font-size: 14px;
        line-height: 28px;
    }

    .zdycl-body {
        background-color: pink;
        margin: 0 20px;
        font-size: 14PX;
    }

    .zdCanShu {
        width: 100%;
    }

    .zdcssz {
        height: 588;
        color: #ccc;
        text-align: left;
        background-color: #303a4c;
    }
</style>