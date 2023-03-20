<template>
    <div>
        <div class="titlebox">
            <span class="title">定点模式参数设置</span>
        </div>
        <div class="text_item">
            <el-row>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">0点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi0" @change="updateMoShi('Hour0',nowMoShi0)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">1点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi1" @change="updateMoShi('Hour1',nowMoShi1)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">2点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi2" @change="updateMoShi('Hour2',nowMoShi2)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">3点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi3" @change="updateMoShi('Hour3',nowMoShi3)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">4点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi4" @change="updateMoShi('Hour4',nowMoShi4)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">5点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi5" @change="updateMoShi('Hour5',nowMoShi5)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">6点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi6" @change="updateMoShi('Hour6',nowMoShi6)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">7点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi7" @change="updateMoShi('Hour7',nowMoShi7)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">8点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi8" @change="updateMoShi('Hour8',nowMoShi8)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">9点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi9" @change="updateMoShi('Hour9',nowMoShi9)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">10点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi10" @change="updateMoShi('Hour10',nowMoShi10)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">11点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi11" @change="updateMoShi('Hour11',nowMoShi11)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">12点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi12" @change="updateMoShi('Hour12',nowMoShi12)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">13点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi13" @change="updateMoShi('Hour13',nowMoShi13)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">14点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi14" @change="updateMoShi('Hour14',nowMoShi14)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">15点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi15" @change="updateMoShi('Hour15',nowMoShi15)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">16点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi16" @change="updateMoShi('Hour16',nowMoShi16)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">17点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi17" @change="updateMoShi('Hour17',nowMoShi17)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">18点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi18" @change="updateMoShi('Hour18',nowMoShi18)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">19点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi19" @change="updateMoShi('Hour19',nowMoShi19)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding-bottom: 20px;">
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">20点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi20" @change="updateMoShi('Hour20',nowMoShi20)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">21点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi21" @change="updateMoShi('Hour21',nowMoShi21)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">22点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi22" @change="updateMoShi('Hour22',nowMoShi22)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="msCom">
                        <div class="msName">23点：</div>
                        <div class="msStues">
                            <el-select v-model="nowMoShi23" @change="updateMoShi('Hour23',nowMoShi23)" placeholder="请选择"
                                size="mini">
                                <el-option v-for="item in optionMoShi" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>
    import moment from "moment";

    export default {
        props: {
            // dialogParam: {
            // },
        },
        data() {
            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                nowMoShi0: '',
                nowMoShi1: '',
                nowMoShi2: '',
                nowMoShi3: '',
                nowMoShi4: '',
                nowMoShi5: '',
                nowMoShi6: '',
                nowMoShi7: '',
                nowMoShi8: '',
                nowMoShi9: '',
                nowMoShi10: '',
                nowMoShi11: '',
                nowMoShi12: '',
                nowMoShi13: '',
                nowMoShi14: '',
                nowMoShi15: '',
                nowMoShi16: '',
                nowMoShi17: '',
                nowMoShi18: '',
                nowMoShi19: '',
                nowMoShi20: '',
                nowMoShi21: '',
                nowMoShi22: '',
                nowMoShi23: '',
                optionMoShi: [
                    {
                        value: -1,
                        label: "请选择",
                    },
                    {
                        value: 1,
                        label: "水样测量",
                    },
                    {
                        value: 2,
                        label: "标样核查",
                    },
                    {
                        value: 3,
                        label: "零点核查",
                    },
                    {
                        value: 4,
                        label: "跨度核查",
                    },
                    {
                        value: 5,
                        label: "空白测试",
                    },
                    {
                        value: 6,
                        label: "平行样",
                    },
                    {
                        value: 7,
                        label: "加标回收",
                    },
                ],
                tableData: []
            }
        },
        mounted() {
            this.inquire()
        },
        methods: {
            // 获取定点模式参数
            inquire() {
                // this.tableData = [];
                let tabName = 'tbfixedtask LIMIT 1  '
                this.http
                    .comMethod("*", tabName, '')
                    .then((res) => {
                        if (res.length != 0) {
                            // this.tableData = res;//.reverse()
                            this.nowMoShi0 = this.formatYBStatusToText(res[0].Hour0);
                            this.nowMoShi1 = this.formatYBStatusToText(res[0].Hour1);
                            this.nowMoShi2 = this.formatYBStatusToText(res[0].Hour2);
                            this.nowMoShi3 = this.formatYBStatusToText(res[0].Hour3);
                            this.nowMoShi4 = this.formatYBStatusToText(res[0].Hour4);
                            this.nowMoShi5 = this.formatYBStatusToText(res[0].Hour5);
                            this.nowMoShi6 = this.formatYBStatusToText(res[0].Hour6);
                            this.nowMoShi7 = this.formatYBStatusToText(res[0].Hour7);
                            this.nowMoShi8 = this.formatYBStatusToText(res[0].Hour8);
                            this.nowMoShi9 = this.formatYBStatusToText(res[0].Hour9);
                            this.nowMoShi10 = this.formatYBStatusToText(res[0].Hour10);
                            this.nowMoShi11 = this.formatYBStatusToText(res[0].Hour11);
                            this.nowMoShi12 = this.formatYBStatusToText(res[0].Hour12);
                            this.nowMoShi13 = this.formatYBStatusToText(res[0].Hour13);
                            this.nowMoShi14 = this.formatYBStatusToText(res[0].Hour14);
                            this.nowMoShi15 = this.formatYBStatusToText(res[0].Hour15);
                            this.nowMoShi16 = this.formatYBStatusToText(res[0].Hour16);
                            this.nowMoShi17 = this.formatYBStatusToText(res[0].Hour17);
                            this.nowMoShi18 = this.formatYBStatusToText(res[0].Hour18);
                            this.nowMoShi19 = this.formatYBStatusToText(res[0].Hour19);
                            this.nowMoShi20 = this.formatYBStatusToText(res[0].Hour20);
                            this.nowMoShi21 = this.formatYBStatusToText(res[0].Hour21);
                            this.nowMoShi22 = this.formatYBStatusToText(res[0].Hour22);
                            this.nowMoShi23 = this.formatYBStatusToText(res[0].Hour23);

                        } else {

                        }
                        console.log('MoShi', res[0].Hour3);
                    })
                    .catch((res) => {

                        console.log(res);
                    });
            },
            //修改定点参数
            updateMoShi(hour, val) {

                let condition = {};
                condition.colName = "`" + hour + "`";
                condition.colData = val;
                let $this = this;
                $this.http
                    .post("/updatetbfixedtask", condition)
                    .then(res => {
                        console.log(res);
                        if (res.warningCount == 0) {
                            $this.$message.success('修改成功');
                            // $this.addlog('定点模式参数设置', JSON.stringify(condition))
                            $this.http.addLog("定点模式参数设置", JSON.stringify(condition), true);

                        } else {
                            $this.$message.error('修改失败');
                        }
                    })
                    .catch(res => {
                        // console.log(res);
                        $this.$message({
                            message: '修改失败',
                            type: 'error'
                        });
                    });

            },
            // 添加日志
            // addlog(operator, cmdargs) {
            //     let time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //     this.http
            //         .post("/addlog", {
            //             OPTIME: time,
            //             username: localStorage.getItem("Loginedname"),
            //             operator: operator,
            //             cmdargs: cmdargs,
            //         })
            //         .then((res) => {

            //             // let ml = "日志上传=" + operator
            //             // this.Sendml("日志上传", ml)
            //         })
            //         .catch((res) => {
            //             // console.log(res);
            //             this.$message.error(res);
            //         });
            // },
            formatYBStatusToText(status) {
                status = status == '--' ? -1 : status;
                switch ((+status)) {
                    case -1:
                        return "";
                    case 1:
                        return "水样测试";
                    case 2:
                        return "标样核查";
                    case 3:
                        return "零点核查";
                    case 4:
                        return "跨度核查";
                    case 5:
                        return "空白测试";
                    case 6:
                        return "平行样测试";
                    case 7:
                        return "加标回收";
                    default:
                        return "";
                };
            }
        }
    };
</script>
<style scoped>
    .titlebox {
        height: 48px;
        line-height: 48px;

        background-color: #384565;
    }

    .title {
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
        line-height: 48px;
    }

    .text_item {
        background-color: #303a4c;
        text-align: right;
    }

    .text_item .el-row {
        padding-top: 20px;
    }

    .msCom {
        display: inline-block;
    }

    .msName {
        display: inline-block;
        color: #cccccc;
        text-align: right;
        width: 44.42px;

        font-size: 14px;
    }

    .msStues {
        display: inline-block;
        text-align: left;
        width: 73%;
    }
</style>