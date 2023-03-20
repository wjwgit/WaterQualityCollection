<template>
    <div>
        <div style="margin-bottom:20px">
            <div class="header">
                <span class="title">质控模式自动运行参数</span>
            </div>
            <div class="content" style="height: 205px;">
                <table cellspacing="0" cellpadding="0" border="0" class="tabclass"
                    style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">
                    <tr class="el-table__row">
                        <td class="tdName">自动控制间隔小时数</td>
                        <td>
                            <el-select v-model="SDL_Global.SYS.ZiDongJianGeXiaoShi"
                                @change="Sendml('自动控制间隔小时数修改',SDL_Global.CMD.SYS_ZiDongJianGeXiaoShi.Format(SDL_Global.SYS.ZiDongJianGeXiaoShi))"
                                placeholder="请选择" size="mini">
                                <el-option v-for="item in optionhourTime" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td class="tdName">
                            <template v-if="SDL_Global.PLC.YunXingMoShi =='8'">
                                下次运行时间
                            </template>
                        </td>
                        <td>
                            <template v-if="SDL_Global.PLC.YunXingMoShi =='8'">
                                {{nextTime}}
                            </template>
                        </td>

                    </tr>

                    <tr class="el-table__row">
                        <td class="tdName">标样核查测量间隔</td>
                        <td>
                            <el-select v-model="SDL_Global.SYS.BiaoYangHeChaJianGe"
                                @change="Sendml('标样核查测量间隔修改',SDL_Global.CMD.SYS_BiaoYangHeChaJianGe.Format(SDL_Global.SYS.BiaoYangHeChaJianGe))"
                                placeholder="请选择" size="mini">
                                <el-option v-for="item in optionjiange" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td class="tdName">
                            标样核查测量时间
                        </td>
                        <td>
                            <el-select v-model="SDL_Global.SYS.BiaoYangHeChaShiJian"
                                @change="Sendml('标样核查测量时间修改',SDL_Global.CMD.SYS_BiaoYangHeChaShiJian.Format(SDL_Global.SYS.BiaoYangHeChaShiJian))"
                                placeholder="请选择" size="mini">
                                <el-option v-for="item in optionTime" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr class="el-table__row">
                        <td class="tdName">自动校准间隔</td>
                        <td>
                            <el-select v-model="SDL_Global.SYS.ZiDongJiaoZhunJianGe"
                                @change="Sendml('自动校准间隔修改',SDL_Global.CMD.SYS_ZiDongJiaoZhunJianGe.Format(SDL_Global.SYS.ZiDongJiaoZhunJianGe))"
                                placeholder="请选择" size="mini">
                                <el-option v-for="item in optionjiange" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                        <td class="tdName">
                            自动校准时间
                        </td>
                        <td>
                            <el-select v-model="SDL_Global.SYS.ZiDongJiaoZhunShiJian"
                                @change="Sendml('自动校准时间修改',SDL_Global.CMD.SYS_ZiDongJiaoZhunShiJian.Format(SDL_Global.SYS.ZiDongJiaoZhunShiJian))"
                                placeholder="请选择" size="mini">
                                <el-option v-for="item in optionTime" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from "moment";

    // 系统配置组件
    export default {
        props: {},
        data() {
            let optionjiange = [{
                value: -1,
                label: '禁用'
            }, {
                value: 0,
                label: '每天'
            }];
            let optionTime = [{
                value: 0,
                label: '0点'
            }];
            let optionhourTime = [];
            for (var i = 1; i < 24; i++) {
                let objs = {
                    value: i,
                    label: i + '天'
                }
                optionjiange.push(objs);
                let objTime = {
                    value: i,
                    label: i + '点'
                }
                optionTime.push(objTime);
                let hourTime = {
                    value: i,
                    label: i + '小时'
                }
                optionhourTime.push(hourTime);
            };
            return {
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                nextTime: '',
                optionjiange: optionjiange,
                optionTime: optionTime,
                optionhourTime: optionhourTime,
            };
        },
        mounted() {
            // 刷新下次运行时间
            this.funnextTime();
            let $this = this;
            setInterval(() => {
                $this.funnextTime();
            }, 1000 * 60 * 1);
        },
        computed: {},
        methods: {
            // 下次运行时间计算
            funnextTime() {
                // debugger
                let nowHourtime = parseInt(moment().format('HH'));
                this.nextTime = (Math.floor(nowHourtime / this.SDL_Global.SYS.ZiDongJianGeXiaoShi) + 1) * this.SDL_Global.SYS.ZiDongJianGeXiaoShi + ':00:00'
                // debugger
                // console.log('nextTime=', this.nextTime);
            },
            Sendml(name, ml) {

                if (name == '自动控制间隔小时数修改') {
                    this.funnextTime();
                }
                var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;
                this.socketApi.sendSock(data, true);
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
    .content {
        background-color: #303a4c;
        text-align: right;
    }

    .tabclass {
        height: 160px;
        font-size: 14px;
    }

    /* 自行运行td */
    .tdName {
        text-align: right;
        padding-right: 8px;
        width: 135px;
    }
</style>