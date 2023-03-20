<template>
    <div class="div_ybkz">
        <!-- <div style="margin:20px 20px;"> -->
        <!-- <div class="panel panel-default" style="border: none;"> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 系统参数 -->
            <el-tab-pane label="系统参数" name="xtcs">
                <div class="xtcs-body">
                    <el-row :gutter="20">
                        <el-col :sm="24" :xs="24" :md="24" :lg="12" v-if="SoftType==21||SoftType==22||SoftType==23">
                            <!-- <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">功能参数</span>
                                </div>
                                <div class="text-item" style="height: 306px;">
                                    <el-row type="flex">
                                        <el-col :span="8" style='height:100%;'>
                                            <div class="bfkzCom">
                                                <div class="bfkzName">上电清洗</div>
                                                <div class="bfkzSwith">
                                                    <el-switch v-model="SDL_Global.PLC.ShangDianQingXi"
                                                        @change="Sendml('上电清洗',SDL_Global.CMD.PLC_ShangDianQingXi.Format(SDL_Global.PLC.ShangDianQingXi))">
                                                    </el-switch>
                                                </div>
                                                <span v-if="SDL_Global.PLC.ShangDianQingXi == true"
                                                    style="color: #4a92ff">开</span>
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
                                                <span v-if="SDL_Global.PLC.CaiYangBeiRunXi == true"
                                                    style="color: #4a92ff">开</span>
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
                                                <span v-if="SDL_Global.PLC.WuCanLianXu == true"
                                                    style="color: #4a92ff">开</span>
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
                                                <span v-if="SDL_Global.SYS.WuCanXiaoShiCeLiang == true"
                                                    style="color: #4a92ff">开</span>
                                                <span v-else style="color: #aaaaaa">关</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div style="width: 100%;height: 315px;">
                                        <table cellspacing="0" cellpadding="0" border="0" class="tabclass"
                                            style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">
                                            <tr>
                                                <td class="gncsNames">远程加标采水</td>
                                                <td>
                                                    <el-radio class="gncsradio" :label="1"
                                                        v-model="SDL_Global.SYS.YuanChengJiaBiaoCaiShui"
                                                        @change="Sendml('远程加标采水切换',SDL_Global.CMD.SYS_YuanChengJiaBiaoCaiShui.Format(SDL_Global.SYS.YuanChengJiaBiaoCaiShui))">
                                                        原水样
                                                    </el-radio>
                                                </td>
                                                <td>
                                                    <el-radio class="gncsradio" :label="2"
                                                        v-model="SDL_Global.SYS.YuanChengJiaBiaoCaiShui"
                                                        @change="Sendml('远程加标采水切换',SDL_Global.CMD.SYS_YuanChengJiaBiaoCaiShui.Format(SDL_Global.SYS.YuanChengJiaBiaoCaiShui))">
                                                        重新采水
                                                    </el-radio>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td class="gncsNames">默认启动泵</td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.PLC.MoRenQuShuiBeng"
                                                        :label='false'
                                                        @change="Sendml('默认启动泵切换',SDL_Global.CMD.PLC_MoRenQuShuiBeng.Format(SDL_Global.PLC.MoRenQuShuiBeng))">
                                                        泵1
                                                    </el-radio>
                                                </td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.PLC.MoRenQuShuiBeng"
                                                        :label='true'
                                                        @change="Sendml('默认启动泵切换',SDL_Global.CMD.PLC_MoRenQuShuiBeng.Format(SDL_Global.PLC.MoRenQuShuiBeng))">
                                                        泵2
                                                    </el-radio>
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="gncsNames">留样模式</td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.LY.MoShi"
                                                        @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                                        :label="1">超标留样
                                                    </el-radio>
                                                </td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.LY.MoShi"
                                                        @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                                        :label="2">周期留样
                                                    </el-radio>
                                                </td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.LY.MoShi"
                                                        @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                                        :label="3">手动留样
                                                    </el-radio>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div> -->
                            <gncs_wq></gncs_wq>
                        </el-col>
                        <el-col :sm="24" :xs="24" :md="24" :lg="12" v-else>
                            <!-- <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">功能参数</span>
                                </div>
                                <div class="text-item" style="height: 205px;">
                                    <div style="width: 100%;height: 315px;">
                                        <table cellspacing="0" cellpadding="0" border="0" class="tabclass"
                                            style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">

                                            <tr>
                                                <td class="tdclass">留样模式</td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.LY.MoShi"
                                                        @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                                        :label="1">超标留样
                                                    </el-radio>
                                                </td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.LY.MoShi"
                                                        style="padding-left:20px"
                                                        @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                                        :label="2">周期留样
                                                    </el-radio>
                                                </td>
                                                <td>
                                                    <el-radio class="gncsradio" v-model="SDL_Global.LY.MoShi"
                                                        @change="Sendml('留样模式切换',SDL_Global.CMD.LY_MoShi.Format(SDL_Global.LY.MoShi))"
                                                        :label="3">手动留样
                                                    </el-radio>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="tdclass">启用试剂预警</td>
                                                <td>
                                                    <el-switch v-model="SDL_Global.SYS.ShiJiYuJing"
                                                        @change="Sendml('启用试剂预警',SDL_Global.CMD.YJ_ShiJiYuJing.Format(SDL_Global.SYS.ShiJiYuJing))">
                                                    </el-switch>
                                                    <span v-if="SDL_Global.SYS.ShiJiYuJing == true"
                                                        style="color: #4a92ff">开</span>
                                                    <span v-else style="color: #aaaaaa">关</span>
                                                    <el-tooltip effect="light" content="开启后,试剂不足或试剂即将到期,会产生试剂预警数据"
                                                        placement="bottom-start" popper-class="atooltip">
                                                        <span class="el-icon-warning"></span>
                                                    </el-tooltip>
                                                </td>
                                                <td colspan="2" class="tdclass" style="text-align: left;">
                                                    <span style="padding:0 20px;">启用运维预警</span>
                                                    <el-switch v-model="SDL_Global.SYS.YunWeiYuJing"
                                                        @change="Sendml('启用运维预警',SDL_Global.CMD.YJ_YunWeiYuJing.Format(SDL_Global.SYS.YunWeiYuJing))">
                                                    </el-switch>
                                                    <span v-if="SDL_Global.SYS.YunWeiYuJing == true"
                                                        style="color: #4a92ff">开</span>
                                                    <span v-else style="color: #aaaaaa">关</span>
                                                    <el-tooltip effect="light" content="开启后,如果指定周期内没有进行运维,会产生运维预警数据"
                                                        placement="bottom-start" popper-class="atooltip">
                                                        <span class="el-icon-warning"></span>
                                                    </el-tooltip>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td class="tdclass">启用数据预警</td>
                                                <td>
                                                    <el-switch v-model="SDL_Global.SYS.ShuJuYuJing"
                                                        @change="Sendml('启用数据预警',SDL_Global.CMD.YJ_ShuJuYuJing.Format(SDL_Global.SYS.ShuJuYuJing))">
                                                    </el-switch>
                                                    <span v-if="SDL_Global.SYS.ShuJuYuJing == true"
                                                        style="color: #4a92ff">开</span>
                                                    <span v-else style="color: #aaaaaa">关</span>
                                                    <el-tooltip effect="light" content="开启后,数据产生恒值或即将达到阈值情况下,会产生数据预警数据"
                                                        placement="bottom-start" popper-class="atooltip">
                                                        <span class="el-icon-warning"></span>
                                                    </el-tooltip>
                                                </td>
                                                <td colspan="2" class="tdclass" style="text-align: left;">
                                                    <span style="padding:0 20px;">启用备件预警</span>

                                                    <el-switch v-model="SDL_Global.SYS.BeiJianYuJing"
                                                        @change="Sendml('启用备件预警',SDL_Global.CMD.YJ_BeiJianYuJing.Format(SDL_Global.SYS.BeiJianYuJing))">
                                                    </el-switch>
                                                    <span v-if="SDL_Global.SYS.BeiJianYuJing == true"
                                                        style="color: #4a92ff">开</span>
                                                    <span v-else style="color: #aaaaaa">关</span>
                                                    <el-tooltip effect="light"
                                                        content="开启后,系统将自动检测即将到期的备件或耗材信息,会产生备件预警数据"
                                                        placement="bottom-start" popper-class="atooltip">
                                                        <span class="el-icon-warning"></span>
                                                    </el-tooltip>
                                                </td>

                                            </tr>

                                        </table>
                                    </div>
                                </div>
                            </div> -->
                            <gncs_ww></gncs_ww>
                        </el-col>
                        <el-col :sm="24" :xs="24" :md="24" :lg="12" v-if="SoftType==21||SoftType==22||SoftType==23">
                            <!-- <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">质控模式自动运行参数</span>
                                </div>
                                <div class="text-item" style="height: 588;">
                                    <table cellspacing="0" cellpadding="0" border="0" class="tabsclass"
                                        style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">
                                        <tr class="el-table__row">
                                            <td class="zxyxName">自动控制间隔小时数</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.ZiDongJianGeXiaoShi"
                                                    @change="Sendml('自动控制间隔小时数修改',SDL_Global.CMD.SYS_ZiDongJianGeXiaoShi.Format(SDL_Global.SYS.ZiDongJianGeXiaoShi))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionhourTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
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
                                            <td class="zxyxName">零点核查测量间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.LingDianJianGe" placeholder="请选择"
                                                    @change="Sendml('零点核查测量间隔修改',SDL_Global.CMD.SYS_LingDianJianGe.Format(SDL_Global.SYS.LingDianJianGe))"
                                                    size="mini" style="width: 75%;">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                零点核查测量时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.LingDianShiJian" placeholder="请选择"
                                                    @change="Sendml('零点核查测量时间修改',SDL_Global.CMD.SYS_LingDianShiJian.Format(SDL_Global.SYS.LingDianShiJian))"
                                                    size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="zxyxName">自动校准间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.ZiDongJiaoZhunJianGe"
                                                    @change="Sendml('自动校准间隔修改',SDL_Global.CMD.SYS_ZiDongJiaoZhunJianGe.Format(SDL_Global.SYS.ZiDongJiaoZhunJianGe))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                自动校准时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.ZiDongJiaoZhunShiJian"
                                                    @change="Sendml('自动校准时间修改',SDL_Global.CMD.SYS_ZiDongJiaoZhunShiJian.Format(SDL_Global.SYS.ZiDongJiaoZhunShiJian))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="zxyxName">跨度核查测量间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.KuaDuJianGe" placeholder="请选择"
                                                    @change="Sendml('跨度核查测量间隔修改',SDL_Global.CMD.SYS_KuaDuJianGe.Format(SDL_Global.SYS.KuaDuJianGe))"
                                                    size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                跨度核查测量时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.KuaDuShiJian" placeholder="请选择"
                                                    @change="Sendml('跨度核查测量时间修改',SDL_Global.CMD.SYS_KuaDuShiJian.Format(SDL_Global.SYS.KuaDuShiJian))"
                                                    size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="zxyxName">平行样测量间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.PingXingYangJianGe" placeholder="请选择"
                                                    @change="Sendml('平行样测量间隔修改',SDL_Global.CMD.SYS_PingXingYangJianGe.Format(SDL_Global.SYS.PingXingYangJianGe))"
                                                    size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                平行样测量时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.PingXingYangShiJian"
                                                    @change="Sendml('平行样测量时间修改',SDL_Global.CMD.SYS_PingXingYangShiJian.Format(SDL_Global.SYS.PingXingYangShiJian))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="zxyxName">标样核查测量间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.BiaoYangHeChaJianGe"
                                                    @change="Sendml('标样核查测量间隔修改',SDL_Global.CMD.SYS_BiaoYangHeChaJianGe.Format(SDL_Global.SYS.BiaoYangHeChaJianGe))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                标样核查测量时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.BiaoYangHeChaShiJian"
                                                    @change="Sendml('标样核查测量时间修改',SDL_Global.CMD.SYS_BiaoYangHeChaShiJian.Format(SDL_Global.SYS.BiaoYangHeChaShiJian))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="zxyxName">加标回收测量间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.JiaBiaoHuiShouJianGe"
                                                    @change="Sendml('加标回收测量间隔修改',SDL_Global.CMD.SYS_JiaBiaoHuiShouJianGe.Format(SDL_Global.SYS.JiaBiaoHuiShouJianGe))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                加标回收测量时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.JiaBiaoHuiShouShiJian"
                                                    @change="Sendml('加标回收测量时间修改',SDL_Global.CMD.SYS_JiaBiaoHuiShouShiJian.Format(SDL_Global.SYS.JiaBiaoHuiShouShiJian))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div> -->
                            <zkmszdyx_wq></zkmszdyx_wq>

                        </el-col>
                        <el-col :sm="24" :xs="24" :md="24" :lg="12" v-else>
                            <!-- <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">质控模式自动运行参数</span>
                                </div>
                                <div class="text-item" style="height: 205px;">
                                    <table cellspacing="0" cellpadding="0" border="0" class="GNclass"
                                        style="width: 100%;table-layout: fixed;text-align: left;color: #fff;">
                                        <tr class="el-table__row">
                                            <td class="zxyxName">自动控制间隔小时数</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.ZiDongJianGeXiaoShi"
                                                    @change="Sendml('自动控制间隔小时数修改',SDL_Global.CMD.SYS_ZiDongJianGeXiaoShi.Format(SDL_Global.SYS.ZiDongJianGeXiaoShi))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionhourTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
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
                                            <td class="zxyxName">标样核查测量间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.BiaoYangHeChaJianGe"
                                                    @change="Sendml('标样核查测量间隔修改',SDL_Global.CMD.SYS_BiaoYangHeChaJianGe.Format(SDL_Global.SYS.BiaoYangHeChaJianGe))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                标样核查测量时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.BiaoYangHeChaShiJian"
                                                    @change="Sendml('标样核查测量时间修改',SDL_Global.CMD.SYS_BiaoYangHeChaShiJian.Format(SDL_Global.SYS.BiaoYangHeChaShiJian))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="zxyxName">自动校准间隔</td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.ZiDongJiaoZhunJianGe"
                                                    @change="Sendml('自动校准间隔修改',SDL_Global.CMD.SYS_ZiDongJiaoZhunJianGe.Format(SDL_Global.SYS.ZiDongJiaoZhunJianGe))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionjiange" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                            <td class="zxyxName">
                                                自动校准时间
                                            </td>
                                            <td>
                                                <el-select v-model="SDL_Global.SYS.ZiDongJiaoZhunShiJian"
                                                    @change="Sendml('自动校准时间修改',SDL_Global.CMD.SYS_ZiDongJiaoZhunShiJian.Format(SDL_Global.SYS.ZiDongJiaoZhunShiJian))"
                                                    placeholder="请选择" size="mini">
                                                    <el-option v-for="item in optionTime" :key="item.value"
                                                        :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div> -->

                            <zkmszdyx_ww></zkmszdyx_ww>
                        </el-col>
                        <el-col style="margin-bottom: 20px;">
                            <ddms></ddms>

                        </el-col>
                    </el-row>

                    <el-row v-if="SoftType==21||SoftType==22||SoftType==23">
                        <el-col>
                            <!-- <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">PLC参数</span>
                                </div>
                                <div class="text-item">
                                    <table cellspacing="0" cellpadding="0" border="0"
                                        class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition"
                                        style="width: 100%;table-layout: fixed;text-align: center;color: #fff;">
                                        <tr class="el-table__row">
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
                                        </tr>
                                        <tr class="el-table__row">
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
                                                    <div class="bfkzName">TP采样杯沉淀时间</div>
                                                    <div class="bfkzinput">
                                                        <el-input disabled size="small" placeholder="请输入"
                                                            v-model="SDL_Global.PLC.TPCaiYangBeiChenDianShiJian">
                                                            <template slot="append">分钟</template>
                                                        </el-input>
                                                    </div>
                                                    <div class="btn"
                                                        @click="updateForm('TP采样杯沉淀时间修改','TP采样杯沉淀时间修改',SDL_Global.CMD.PLC_TPCaiYangBeiChenDianShiJian, SDL_Global.PLC.TPCaiYangBeiChenDianShiJian,分钟)">
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
                                        </tr>
                                        <tr class="el-table__row">
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

                                        </tr>
                                        <tr class="el-table__row">
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
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="plcClass">
                                                <div class="plcCom">
                                                    <div class="bfkzName">周期运行清洗顺序</div>
                                                    <div class="bfkzinput">
                                                        <el-input disabled size="small" placeholder="请输入"
                                                            v-model="SDL_Global.PLC.QingXiShunXu">
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
                                        </tr>
                                        <tr class="el-table__row">
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
                                        </tr>
                                        <tr class="el-table__row">
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
                                            </td>
                                            <td class="plcClass">

                                            </td>
                                        </tr>
                                        <tr class="el-table__row">
                                            <td class="plcClass">
                                                <div class="plcCom">
                                                    <div class="bfkzName">周期运行测量顺序</div>
                                                    <div class="bfkzinput">
                                                        <el-input disabled size="small" placeholder="请输入"
                                                            v-model="SDL_Global.PLC.CeLiangShunXu">
                                                        </el-input>
                                                    </div>
                                                    <div class="btn"
                                                        @click="updateForm('周期运行测量顺序','周期运行测量顺序',SDL_Global.CMD.PLC_CeLiangShunXu,SDL_Global.PLC.CeLiangShunXu,'')">
                                                        <i class="el-icon-edit"></i>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="plcClass">

                                            </td>
                                            <td class="plcClass">

                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div> -->
                            <cssz_plc_wq></cssz_plc_wq>
                        </el-col>
                    </el-row>
                </div>

            </el-tab-pane>
            <!-- 仪表参数 -->
            <el-tab-pane label="仪表参数" name="ybcs" v-if="SoftType==21||SoftType==22||SoftType==23">
                <div class="ybcs-body">
                    <el-row :gutter="24">
                        <template v-for="(item, index) in SDL_Global.MetersDataPP().filter((m) => m.IsNormal)">
                            <el-col :key="index" :sm="24" :xs="24" :md="24" :lg="12" style="margin:0px 0px 20px 0px;">
                                <el-row class="header">
                                    <el-col>
                                        <span class="tag">{{ item.Name }}</span>
                                        <el-button v-if="item.savebtn" class="savebtn"
                                            @click="changeScState(item.ID,item.Code,'savebtn',false)" type="primary"
                                            size="small">
                                            编辑</el-button>
                                        <el-button v-if="!item.savebtn" :loading="item.isSendLoading" class="savebtn"
                                            @click="SendscData(item.ID,item.Code)" type="primary" size="small">保存
                                        </el-button>
                                        <el-button v-if="!item.savebtn" class="savebtn" @click="item.savebtn=true"
                                            size="small">取消</el-button>
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
                                                <el-option v-for="item in lcbjtypeOptions" :key="item.value"
                                                    :label="item.label" :value="item.value">
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
                                            <el-input v-model="item.MoreParam.LiangChengXiaXian" size="mini"
                                                style="width: 30%;" placeholder="请输入" disabled>

                                            </el-input>
                                            <span style="color: #cccccc;">--</span>
                                            <el-input v-model="item.LiangCheng" size="mini" style="width: 42%;"
                                                placeholder="请输入" disabled>

                                            </el-input>
                                        </el-col>


                                    </el-row>
                                    <el-row class="rowdiv" v-if="item.savebtn">
                                        <el-col :span="3" class="inputbox">
                                            下限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].DLimit" size="mini"
                                                class="inputdiv" placeholder="请输入" disabled>
                                                <template slot="append">mg/L</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="3" class="inputbox">
                                            上限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].ULimit" size="mini"
                                                class="inputdiv" placeholder="请输入" disabled>
                                                <template slot="append">mg/L</template>
                                            </el-input>
                                        </el-col>

                                    </el-row>
                                    <el-row class="rowdiv" v-if="item.savebtn">
                                        <el-col :span="3" class="inputbox">
                                            超下限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].DDLimit" size="mini"
                                                class="inputdiv" placeholder="请输入" disabled>
                                                <template slot="append">mg/L</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="3" class="inputbox">
                                            超上限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].UULimit" size="mini"
                                                class="inputdiv" placeholder="请输入" disabled>
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
                                                <el-option v-for="item in lcbjtypeOptions" :key="item.value"
                                                    :label="item.label" :value="item.value">
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
                                            <el-input v-model="item.MoreParam.LiangChengXiaXian" size="mini"
                                                style="width: 30%;" placeholder="请输入" disabled>

                                            </el-input>
                                            <span style="color: #cccccc;">--</span>
                                            <el-input v-model="item.LiangCheng" size="mini" style="width: 42%;"
                                                placeholder="请输入" disabled>

                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv" v-if="!item.savebtn">
                                        <el-col :span="3" class="inputbox">
                                            下限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].DLimit" size="mini"
                                                class="inputdiv" placeholder="请输入">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="3" class="inputbox">
                                            上限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].ULimit" size="mini"
                                                class="inputdiv" placeholder="请输入">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>

                                    </el-row>
                                    <el-row class="rowdiv" v-if="!item.savebtn">
                                        <el-col :span="3" class="inputbox">
                                            超下限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].DDLimit" size="mini"
                                                class="inputdiv" placeholder="请输入">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="3" class="inputbox">
                                            超上限
                                        </el-col>
                                        <el-col :span="9" class="inputbox">
                                            <el-input v-model="sicanForm[item.Code]['lcbj'].UULimit" size="mini"
                                                class="inputdiv" placeholder="请输入">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>

                                </div>
                                <div class="sjyl" v-if="item.sjylDiv">
                                    <div class="sjzl" v-if="item.savebtn">
                                        <span style="margin-left: 55px;">
                                            总量
                                        </span>
                                        <el-input v-model="item.ShiJiZongLiang" size="mini" class="inputdivs" disabled>
                                        </el-input>
                                        <span style="margin-left: 40px;">预警下限</span>
                                        <el-input v-model="item.ShiJiXiaXian" size="mini" class="inputdivs" disabled>
                                        </el-input>
                                    </div>
                                    <div class="sjsyl" v-if="item.savebtn">
                                        <span style="margin-left: 55px;">余量</span>
                                        <el-input v-model="item.ShiJiYuLiang" size="mini" class="inputdivs" disabled>
                                        </el-input>
                                        <span style="margin-left: 40px;">余量剩余</span>
                                        <el-input
                                            v-model="(item.ShiJiYuLiang/item.ShiJiZongLiang).toFixedFormat(2) *100+'%'"
                                            size="mini" disabled class="inputdivs"></el-input>
                                    </div>
                                    <div class="sjsyl" v-if="item.savebtn">
                                        <span>试剂到期时间</span>
                                        <el-input v-model="item.ShiJiDaoQiShiJiian" size="mini" class="inputdivs"
                                            disabled>
                                        </el-input>
                                    </div>
                                    <div class="sjzl" v-if="!item.savebtn">
                                        <span style="margin-left: 55px;">
                                            总量
                                        </span>
                                        <el-input v-model="sicanForm[item.Code]['sjyl'].sjzl" size="mini"
                                            class="inputdivs">
                                        </el-input>
                                        <span style="margin-left: 40px;">预警下限</span>
                                        <el-input v-model="sicanForm[item.Code]['sjyl'].bjxx" size="mini"
                                            class="inputdivs"></el-input>
                                    </div>
                                    <div class="sjsyl" v-if="!item.savebtn">
                                        <span style="margin-left: 55px;">余量</span>
                                        <el-input v-model="sicanForm[item.Code]['sjyl'].sjsy" size="mini"
                                            class="inputdivs"></el-input>
                                        <span style="margin-left: 40px;">余量剩余</span>
                                        <el-input
                                            v-model="(item.ShiJiYuLiang/item.ShiJiZongLiang).toFixedFormat(2)*100+'%'"
                                            size="mini" disabled class="inputdivs"></el-input>
                                    </div>
                                    <div class="sjsyl" v-if="!item.savebtn">
                                        <span>试剂到期时间</span>
                                        <el-input v-model="sicanForm[item.Code]['sjyl'].sjdqsj" size="mini" disabled
                                            class="inputdivs">
                                        </el-input>
                                    </div>
                                </div>

                                <div class="bynd" v-if="item.byndDiv">
                                    <el-row class="rowdiv" v-if="item.savebtn">
                                        <el-col :span="6">
                                            <span>跨度核查标液浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入" disabled
                                                v-model="item.LiangChengPiaoYiNongDu">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>零点核查标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入" disabled
                                                v-model="item.LingDianPiaoYiNongDu">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv" v-if="item.savebtn">

                                        <el-col :span="6">
                                            <span>标样核查标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入" disabled
                                                v-model="item.BiaoYangHeChaNongDu">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>跨度值</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入" disabled v-model="item.KuaDuZhi">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv" v-if="!item.savebtn">
                                        <el-col :span="6">
                                            <span>跨度核查标液浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入"
                                                v-model="sicanForm[item.Code]['bynd'].lcpybynd">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>零点核查标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入"
                                                v-model="sicanForm[item.Code]['bynd'].ldhcbynd">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv" v-if="!item.savebtn">

                                        <el-col :span="6">
                                            <span>标样核查标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入"
                                                v-model="sicanForm[item.Code]['bynd'].byhcnd">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>跨度值</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input size="mini" placeholder="请输入"
                                                v-model="sicanForm[item.Code]['bynd'].kdz">
                                                <template slot="append">{{item.Unit}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </div>
                                <el-row>
                                    <el-col class="btnDiv" :span="8">
                                        <div @click="lcbjbtn(item.ID,'lcbjDiv',true,'sjylDiv','byndDiv')"
                                            :class="item.lcbjDiv == true ? 'tabsActive' : ''">
                                            报警设定
                                        </div>
                                    </el-col>
                                    <el-col class="btnDiv" :span="8">
                                        <div @click="lcbjbtn(item.ID,'sjylDiv',true,'lcbjDiv','byndDiv')"
                                            style="border-left: 1px solid #48556e;border-right: 1px solid #48556e;"
                                            :class="item.sjylDiv == true ? 'tabsActive' : ''">
                                            试剂余量
                                        </div>

                                    </el-col>
                                    <el-col class="btnDiv" :span="8">
                                        <div @click="lcbjbtn(item.ID,'byndDiv',true,'lcbjDiv','sjylDiv')"
                                            :class="item.byndDiv == true ? 'tabsActive' : ''">
                                            标样浓度
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </template>
                        <el-col :sm="24" :xs="24" :md="24" :lg="24"
                            v-if="SDL_Global.MetersDataPP().filter((m) => m.IsWC||m.ID=='YeLvSu'||m.ID=='ZaoMiDu').length>0">
                            <div class="wucanshu">
                                <el-row class="header">
                                    <el-col>
                                        <span class="tag">更多参数</span>
                                        <el-button v-if="wccsEdit" class="savebtn" @click="changeState" type="primary"
                                            size="small">编辑</el-button>
                                        <el-button v-if="!wccsEdit" class="savebtn" :loading="isSendLoading"
                                            @click="SendcsData" type="primary" size="small">保存</el-button>
                                        <el-button v-if="!wccsEdit" class="savebtn" @click="wccsEdit=true" size="small">
                                            取消</el-button>
                                    </el-col>
                                </el-row>
                                <div class="body-footer" v-if="wccsEdit">

                                    <el-row style="height: 284px;">

                                        <template
                                            v-for="(item, index) in SDL_Global.MetersDataPP().filter((m) => m.IsWC||m.ID=='YeLvSu'||m.ID=='ZaoMiDu'||m.ID=='SZY'||m.ID=='SWDX')">
                                            <el-col :span="4"
                                                style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                                <span>{{item.Name}}标样浓度</span>
                                            </el-col>
                                            <el-col :span="4" style="height: 60px;padding: 0 8px;">
                                                <div class="wcunit">
                                                    <el-input size="mini" placeholder="请输入" disabled
                                                        v-model="item.BiaoYangNongDu">
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

                                    <el-row style="height: 284px;">

                                        <template v-for="(item, index) in  wcbyeditlist">
                                            <!-- <el-col :span="6" style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                                <span>{{item.Name}}标样浓度</span>
                                            </el-col>
                                            <el-col :span="5" style="height: 60px;padding: 0 8px;">
                                                <div class="wcunit">
                                                    <el-input size="mini" placeholder="请输入" disabled
                                                        v-model="item.BiaoYangNongDu">
                                                        <template slot="append">{{item.Unit}}</template>
                                                    </el-input>
                                                </div>
                                            </el-col>
                                            <el-col :span="3" style="height: 60px; font-size: 14px;">
                                                <div class="btn1" @click="updatewucanForm('pH')">
                                                    <a>报警设定</a>
                                                </div>
                                            </el-col> -->

                                            <el-col :span="6"
                                                style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                                <span>{{item.Name}}标样浓度</span>
                                            </el-col>
                                            <el-col :span="5" style="height: 60px;padding: 0 8px;">
                                                <div class="wcunit">
                                                    <el-input size="mini" placeholder="请输入"
                                                        v-model="item.BiaoYangNongDu">
                                                        <template slot="append">{{item.Unit}}</template>
                                                    </el-input>
                                                </div>
                                            </el-col>
                                        </template>
                                    </el-row>

                                    <!-- <el-row class="rowdiv">
                                        <el-col :span="6">
                                            <span>pH标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.ph">
                                                    <template slot="append">{{SDL_Global.WC.PH.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>水温标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.water">
                                                    <template slot="append">{{SDL_Global.WC.ShuiWen.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv">
                                        <el-col :span="6">
                                            <span>浊度标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.zhuodu">
                                                    <template slot="append">{{SDL_Global.WC.HunZhuoDu.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>溶解氧标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.rongjieyang">
                                                    <template
                                                        slot="append">{{SDL_Global.WC.RongJieYang.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv">
                                        <el-col :span="6">
                                            <span>电导率标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.diandaolv">
                                                    <template slot="append">{{SDL_Global.WC.DianDaoLv.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                        <el-col :span="6">
                                            <span>藻密度标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.zaomidu">
                                                    <template slot="append">{{SDL_Global.WC.ZaoMiDu.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="rowdiv">
                                        <el-col :span="6">
                                            <span>叶绿素标样浓度</span>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="wcunit">
                                                <el-input size="mini" placeholder="请输入" v-model="wucanform.yelvsu">
                                                    <template slot="append">{{SDL_Global.WC.YeLvSu.Unit}}</template>
                                                </el-input>
                                            </div>
                                        </el-col>
                                    </el-row> -->
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
                                        <template
                                            v-for="(item, index) in SDL_Global.MetersData().filter((m) => m.IsZJS)">
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
                                        <template
                                            v-for="(item, index) in SDL_Global.MetersData().filter((m) => m.IsVOCs)">
                                            <el-col :span="4"
                                                style=" color: #cccccc;text-align: right;height: 60px; font-size: 14px;">
                                                <span>{{item.Name}}标样浓度</span>
                                            </el-col>
                                            <el-col :span="4" style="height: 60px;padding: 0 8px;">
                                                <div class="wcunit">
                                                    <el-input size="mini" placeholder="请输入" disabled
                                                        v-model="item.BiaoYangNongDu">
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
                </div>
            </el-tab-pane>
            <el-tab-pane label="仪表参数" name="ybcs" v-else>
                <wscssz_ybcs></wscssz_ybcs>
            </el-tab-pane>

            <!-- 仪表试剂参数 -->
            <el-tab-pane label="试剂参数" name="sjcs" v-if="SoftType==32">

                <cpssjcs></cpssjcs>
            </el-tab-pane>
            <el-tab-pane label="预警设置" name="zkyjsz" v-if="SoftType==32">

                <setAlarm></setAlarm>
            </el-tab-pane>
            <!-- 浊度预处理 -->
            <el-tab-pane label="浊度预处理设置" name="zdycl" v-if="zhuoDuYuChuLiShow">
                <div class="zdycl-body">
                    <el-row :gutter="24">
                        <el-col :sm="24" :xs="24" :md="24" :lg="24">
                            <!-- <div class="zdCanShu"> -->
                            <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">预处理参数设置</span>
                                </div>
                                <div class="zdcssz">
                                    <el-row type="flex">
                                        <el-col :span="8">
                                            <div class="zdYcl">
                                                <div class="yclLable" style="min-width: 98px;"> 预处理总开关</div>
                                                <div class="yclclass">
                                                    <el-radio class="gncsradio" :label="true"
                                                        v-model="SDL_Global.PLC.ZhuoDuYuChuLi"
                                                        @change="Sendml('预处理总开关',SDL_Global.CMD.PLC_ZhuoDuYuChuLi.Format(SDL_Global.PLC.ZhuoDuYuChuLi))">
                                                        启用
                                                    </el-radio>
                                                    <el-radio class="gncsradio" :label="false"
                                                        v-model="SDL_Global.PLC.ZhuoDuYuChuLi"
                                                        @change="Sendml('预处理总开关',SDL_Global.CMD.PLC_ZhuoDuYuChuLi.Format(SDL_Global.PLC.ZhuoDuYuChuLi))">
                                                        禁用
                                                    </el-radio>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">

                                            <div class="zdYcl">
                                                <div class="yclLable" style="min-width: 84px;">当前浊度值</div>
                                                <!-- <div > -->
                                                <span>{{SDL_Global.WC.HunZhuoDu.LastTestData}}</span>
                                                <span>{{SDL_Global.WC.HunZhuoDu.Unit}}</span>


                                                <!-- </div> -->
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex">
                                        <el-col :span="8">
                                            <div class="zdYcl">
                                                <div class="yclLable">总磷预处理功能</div>
                                                <div class="yclclass">
                                                    <el-radio class="gncsradio" :label="true"
                                                        v-model="SDL_Global.PLC.TPYuChuLi"
                                                        @change="Sendml('总磷预处理功能',SDL_Global.CMD.PLC_TPYuChuLi.Format(SDL_Global.PLC.TPYuChuLi))">
                                                        启用
                                                    </el-radio>
                                                    <el-radio class="gncsradio" :label="false"
                                                        v-model="SDL_Global.PLC.TPYuChuLi"
                                                        @change="Sendml('总磷预处理功能',SDL_Global.CMD.PLC_TPYuChuLi.Format(SDL_Global.PLC.TPYuChuLi))">
                                                        禁用
                                                    </el-radio>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="zdYcl">
                                                <div class="yclLable">总磷浊度上限</div>
                                                <div class="yclclass" style="width: 40%;">
                                                    <el-input size="mini" v-model="SDL_Global.PLC.TPShangXian"
                                                        placeholder="请输入" disabled>
                                                        <template
                                                            slot="append">{{SDL_Global.WC.HunZhuoDu.Unit}}</template>
                                                    </el-input>

                                                </div>
                                                <div style="display: inline-block;"
                                                    @click="updateForm('总磷浊度上限','总磷浊度上限',SDL_Global.CMD.PLC_TPShangXian,SDL_Global.PLC.TPShangXian,SDL_Global.WC.HunZhuoDu.Unit)">
                                                    <i class="el-icon-edit"></i>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="zdYcl">
                                                <div class="yclLable">总磷滤芯过滤阀状态</div>
                                                <div class="yclclass">
                                                    <el-switch v-model="SDL_Global.PLC.TPGuoLvFa" disabled>
                                                    </el-switch>
                                                </div>
                                                <span v-if="SDL_Global.PLC.TPGuoLvFa == true"
                                                    style="color: #4a92ff">开</span>
                                                <span v-else style="color: #aaaaaa">关</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <!-- <el-row class="box">
                                        <el-col :span="24" style="text-align: right;">
                                            <el-button class="savebtn" type="primary" size="small">保 存</el-button>

                                        </el-col>

                                    </el-row> -->
                                </div>
                            </div>
                            <!-- </div> -->
                        </el-col>

                    </el-row>
                          <el-row :gutter="24">
                        <el-col :sm="24" :xs="24" :md="24" :lg="24">
                            <!-- <div class="zdCanShu"> -->
                            <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">离心机设备 [<span  v-bind:class="{ 'c-status': SDL_Global.PLC.LXJComStatus == 1,
                        offline: SDL_Global.PLC.LXJComStatus != 1, }"
                      >{{ SDL_Global.PLC.LXJComStatusText }}</span
                    >]</span> 
                                </div>
                                <div class="zdcssz">
                                  <!-- 离心机泵阀 -->
                                  <lxjbfkz></lxjbfkz>

                                </div>
                            </div>
                        </el-col>

                    </el-row>

                        <el-row :gutter="24">
                        <el-col :sm="24" :xs="24" :md="24" :lg="24">
                            <!-- <div class="zdCanShu"> -->
                            <div style="margin-bottom:20px">
                                <div class="box">
                                    <span class="title">离心机启动方案 </span> 
                                </div>
                                <div class="zdcssz">
                                  <!-- 离心机泵阀 -->
                                  <lxjPlan></lxjPlan>

                                </div>
                            </div>
                        </el-col>

                    </el-row>
                    <el-row :gutter="20">
                        <el-col :sm="24" :xs="24" :md="12" :lg="12">
                            <div class="yclplan">
                                <div class="box">
                                    <span class="title">预处理方式一</span>
                                    <span v-if="SDL_Global.YuChuLiFangShi.Name=='方式一'" style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #5decaa;
                                    display: inline-block;
                                    border-radius: 2em;
                                  "></span>
                                </div>
                                <div class="text-item" style="height: 316px;">
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            浊度范围
                                        </el-col>
                                        <el-col :span="12" class="yclVal">

                                            <el-input size="mini" v-model="planList[0].MinVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                            <span style="color: #cccccc;">--</span>
                                            <el-input size="mini" v-model="planList[0].MaxVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            沉淀池沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[0].TankTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TN采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[0].TNTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">

                                        <el-col :span="10" class='ycllab'>
                                            NH3-N采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[0].NH3Time" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TP采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[0].TPTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow" style="margin-bottom: 10px;">
                                        <el-col :span="10" class='ycllab'>
                                            CODmn采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[0].CODTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="box">
                                        <el-col :span="24" style="text-align: right;">
                                            <el-button class="savebtn" @click="yclBtn('0')" type="primary" size="small">
                                                保 存</el-button>

                                        </el-col>

                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                        <el-col :sm="24" :xs="24" :md="12" :lg="12">
                            <div class="yclplan">
                                <div class="box">
                                    <span class="title">预处理方式二</span>
                                    <span v-if="SDL_Global.YuChuLiFangShi.Name=='方式二'" style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #5decaa;
                                    display: inline-block;
                                    border-radius: 2em;
                                  "></span>
                                </div>
                                <div class="text-item" style="height: 316px;">
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            浊度范围
                                        </el-col>
                                        <el-col :span="12" class="yclVal">

                                            <el-input size="mini" v-model="planList[1].MinVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                            <span style="color: #cccccc;">--</span>
                                            <el-input size="mini" v-model="planList[1].MaxVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            沉淀池沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[1].TankTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TN采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[1].TNTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">

                                        <el-col :span="10" class='ycllab'>
                                            NH3-N采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[1].NH3Time" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TP采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[1].TPTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow" style="margin-bottom: 10px;">
                                        <el-col :span="10" class='ycllab'>
                                            CODmn采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[1].CODTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="box">
                                        <el-col :span="24" style="text-align: right;">
                                            <el-button class="savebtn" @click="yclBtn('1')" type="primary" size="small">
                                                保 存</el-button>

                                        </el-col>

                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                        <el-col :sm="24" :xs="24" :md="12" :lg="12">
                            <div class="yclplan">
                                <div class="box">
                                    <span class="title">预处理方式三</span>
                                    <span v-if="SDL_Global.YuChuLiFangShi.Name=='方式三'" style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #5decaa;
                                    display: inline-block;
                                    border-radius: 2em;
                                  "></span>
                                </div>
                                <div class="text-item" style="height: 316px;">
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            浊度范围
                                        </el-col>
                                        <el-col :span="12" class="yclVal">

                                            <el-input size="mini" v-model="planList[2].MinVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                            <span style="color: #cccccc;">--</span>
                                            <el-input size="mini" v-model="planList[2].MaxVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            沉淀池沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[2].TankTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TN采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[2].TNTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">

                                        <el-col :span="10" class='ycllab'>
                                            NH3-N采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[2].NH3Time" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TP采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[2].TPTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow" style="margin-bottom: 10px;">
                                        <el-col :span="10" class='ycllab'>
                                            CODmn采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[2].CODTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="box">
                                        <el-col :span="24" style="text-align: right;">
                                            <el-button class="savebtn" @click="yclBtn('2')" type="primary" size="small">
                                                保 存</el-button>

                                        </el-col>

                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                        <el-col :sm="24" :xs="24" :md="12" :lg="12">
                            <div class="yclplan">
                                <div class="box">
                                    <span class="title">预处理方式四</span>
                                    <span v-if="SDL_Global.YuChuLiFangShi.Name=='方式四'" style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #5decaa;
                                    display: inline-block;
                                    border-radius: 2em;
                                  "></span>
                                </div>
                                <div class="text-item" style="height: 316px;">
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            浊度范围
                                        </el-col>
                                        <el-col :span="12" class="yclVal">

                                            <el-input size="mini" v-model="planList[3].MinVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                            <span style="color: #cccccc;">--</span>
                                            <el-input size="mini" v-model="planList[3].MaxVal" style="width: 30%;"
                                                placeholder="请输入">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            沉淀池沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[3].TankTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TN采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[3].TNTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">

                                        <el-col :span="10" class='ycllab'>
                                            NH3-N采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[3].NH3Time" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow">
                                        <el-col :span="10" class='ycllab'>
                                            TP采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[3].TPTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row type="flex" class="yulRow" style="margin-bottom: 10px;">
                                        <el-col :span="10" class='ycllab'>
                                            CODmn采样杯沉淀时间
                                        </el-col>
                                        <el-col :span="12" class="yclVal">
                                            <el-input size="mini" v-model="planList[3].CODTime" style="width: 80%;"
                                                placeholder="请输入">
                                                <template slot="append">分钟</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row class="box">
                                        <el-col :span="24" style="text-align: right;">
                                            <el-button class="savebtn" @click="yclBtn('3')" type="primary" size="small">
                                                保 存</el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
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
                                <el-input v-model="wucanForm.minlc" size="mini" class="inputdiv" style="width: 27%;" disabled
                                    placeholder="请输入">
                                </el-input>
                                <span style="color: #cccccc;">--</span>

                                <el-input v-model="wucanForm.maxlc" size="mini" class="inputdiv" style="width: 27%;" disabled
                                    placeholder="请输入">
                                </el-input>
                            </el-col>
                            <!-- <el-col :span="1" class="inputboxs"> -->
                            <!-- </el-col> -->
                            <!-- <el-col :span="10" class="inputbox" style="text-align: left;padding-left: 30px;"> -->

                            <!-- </el-col> -->
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="3" class="inputbox">
                                下限
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
                                上限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="wucanForm.ULimit" size="mini" class="inputdiv" placeholder="请输入">
                                    <template slot="append">{{alarmUnit}}</template>


                                </el-input>
                            </el-col>

                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="3" class="inputbox">
                                超下限
                            </el-col>
                            <el-col :span="9" class="inputbox">
                                <el-input v-model="wucanForm.DDLimit" size="mini" class="inputdiv" placeholder="请输入">
                                    <template slot="append">{{alarmUnit}}</template>


                                </el-input>
                            </el-col>
                            <el-col :span="3" class="inputbox">
                                超上限
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
        <!-- 浊度预处理-->
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
    // import zkh from "@config/zkh";
    import { DateTime } from "../common/js/date.js";
    import moment from "moment";
    // import appConfig from "@appConfig";


    // import eleTable from "./module/renderTable";
    import gncs_wq from "./module/gncs_wq";
    import gncs_ww from "./module/gncs_ww";
    import zkmszdyx_ww from "./module/zkmszdyx_ww";
    import zkmszdyx_wq from "./module/zkmszdyx_wq";
    import cssz_plc_wq from "./module/cssz_plc_wq";

    import lxjbfkz from "./dzkf/lxjbfkz";
    import lxjPlan from "./dzkf/lxjPlan";

    import ddms from "./module/ddms";
    import cpssjcs from "./module/cps_sjcs.vue";
    import setAlarm from "./module/setAlarm.vue";
    import wscssz_ybcs from "./module/wscssz_ybcs.vue";


    export default {
        name: "cssz",
        components: { gncs_wq, gncs_ww, zkmszdyx_ww, zkmszdyx_wq, cssz_plc_wq, ddms, cpssjcs, setAlarm, wscssz_ybcs,lxjbfkz,lxjPlan },
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

            let planList = [];
            let planobj = {
                ID: '',
                Title: '',
                MinVal: '',
                MaxVal: '',
                TankTime: '',
                TPTime: '',
                TNTime: '',
                NH3Time: '',
                CODTime: '',
                isCurrent: false
            };
            for (var i = 0; i < 4; i++) {
                planList.push(planobj);
            };


            return {
                SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,

                modelTitle: 'PLC参数--修改值',
                zhuoDuYuChuLiShow: this.GetAppConfigJson().zhuoDuYuChuLi,
                lcbjtypeOptions: this.socketApi.globalDataConfig.getYBCLTypes(),
                isSendLoading: false,
                lcbjDiv: true,
                sjylDiv: false,
                byndDiv: false,
                wccsEdit: true,

                alarmUnit: '',
                sicanForm: _sicanForm,//四参
                // config: this.socketApi.ssztConfig.config, //配置数据
                dialogFormVisible: false,  //模态框
                dialogForm: false,//模态框
                code: "",
                dialogName: "",
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
                activeName: "xtcs",
                mlName: "",
                byName: '',
                ML: "",
                data: "",

                unitName: '',
                RoleID: JSON.parse(localStorage.getItem("RoleID")),
                wcbyeditlist: [],
                // YiBiaoShow: YiBiaoData,
                planList: planList
            };
        },
        mounted() {

            this.selectlcbj('', 1)

            //SDL_Global.MetersDataPP().filter((m) => m.IsNormal)

        },
        methods: {

            // 切换开关
            handleClick() {
                if (this.activeName == 'zdycl') {
                    this.getPretreatmentData()
                }
            },
            // 核查量程报警
            pattern(Code) {
                this.selectlcbj(Code, this.sicanForm[Code]['lcbj'].lcbjtype);
            },
            //读取仪表量程
            selectlcbj(Code, lcbjtype, IsNormal = true) {

                let condition = "AlarmType in (0," + lcbjtype + ") "
                if (Code != "") {
                    condition = condition + "and Code='" + Code + "'"
                }
                let that = this;
                this.http
                    .comMethod("*", "tbalarmarea", condition)
                    .then((res) => {
                        if (res.length != 0) {
                            if (IsNormal) {
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
                            } else {
                                //五参数赋值
                                res.forEach((r) => {
                                    debugger
                                    if (Code == r['Code']) {
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
                            }
                        } else {

                            this.$message.info("暂无数据");
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 四参编辑
            changeScState(id, code, name, flag) {
                // 切换编辑模式
                this.SDL_Global[id][name] = flag;
                if (this.SDL_Global[id]["sjylDiv"] == true) {
                    this.sicanForm[code]["sjyl"] = {
                        sjzl: this.SDL_Global[id].ShiJiZongLiang,
                        bjxx: this.SDL_Global[id].ShiJiXiaXian,
                        sjsy: this.SDL_Global[id].ShiJiYuLiang,
                        sjdqsj: this.SDL_Global[id].ShiJiDaoQiShiJiian,
                    }
                } else if (this.SDL_Global[id]["byndDiv"] == true) {
                    this.sicanForm[code]["bynd"] = {
                        lcpybynd: this.SDL_Global[id].LiangChengPiaoYiNongDu,
                        ldhcbynd: this.SDL_Global[id].LingDianPiaoYiNongDu,
                        kdz: this.SDL_Global[id].KuaDuZhi,
                        byhcnd: this.SDL_Global[id].BiaoYangHeChaNongDu,
                    }
                }
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

                } else if (this.SDL_Global[id].sjylDiv == true) {
                    let syzl = this.SDL_Global.CMD.YiBiao_ShiJiZongLiang.Format(id, this.sicanForm[Code]["sjyl"].sjzl);
                    let bjxx = this.SDL_Global.CMD.YiBiao_ShiJiXiaXian.Format(id, this.sicanForm[Code]["sjyl"].bjxx);
                    let sjsy = this.SDL_Global.CMD.YiBiao_ShiJiYuLiang.Format(id, this.sicanForm[Code]["sjyl"].sjsy);
                    let sjdqsj = this.SDL_Global.CMD.YiBiao_ShiJiDaoQiShiJiian.Format(id, this.sicanForm[Code]["sjyl"].sjdqsj);

                    let sjname = id + "试剂余量修改"

                    let data =
                        "" + localStorage.getItem("Loginedname") + "," + sjname + "," + syzl + ";" + bjxx + ";" + sjsy + ";" + sjdqsj;
                    // this.$message.info(data);
                    console.log('试剂余量修改', data)
                    this.socketApi.sendSock(data);
                } else if (this.SDL_Global[id].byndDiv == true) {
                    let lcpybynd = this.SDL_Global.CMD.YiBiao_LiangChengPiaoYiNongDu.Format(id, this.sicanForm[Code]["bynd"].lcpybynd);
                    let ldhcbynd = this.SDL_Global.CMD.YiBiao_LingDianPiaoYiNongDu.Format(id, this.sicanForm[Code]["bynd"].ldhcbynd);
                    let kdz = this.SDL_Global.CMD.YiBiao_KuaDuZhi.Format(id, this.sicanForm[Code]["bynd"].kdz);
                    let byhcnd = this.SDL_Global.CMD.YiBiao_BiaoYangHeChaNongDu.Format(id, this.sicanForm[Code]["bynd"].byhcnd);

                    let bnname = id + "标样浓度修改"
                    let data =
                        "" + localStorage.getItem("Loginedname") + "," + bnname + "," + lcpybynd + ";" + ldhcbynd + ";" + kdz + ";" + byhcnd;
                    // this.$message.info(data);
                    console.log('标样浓度修改', data)

                    let $this = this;

                    this.socketApi.sendSock(data);
                }
                let $this = this;
                setTimeout(function () {
                    $this.SDL_Global[id].isSendLoading = false;
                    $this.SDL_Global[id].savebtn = true;
                }, 1000)
            },

            //修改量程报警接口
            updatelcbj(condition) {

                this.http
                    .post("/updatelcbj", condition)
                    .then(res => {
                        debugger
                        if (res.warningCount == 0) {
                            // this.selectlcbj('', condition.AlarmType);
                            this.$message.success('修改成功');
                            // let opts = this.socketApi.globalDataConfig.getYBCLName(condition.AlarmType);
                            let cmdargs = JSON.stringify(condition);
                            let operators = "量程报警范围设定："; //+ opts;
                            this.http.addLog(operators, cmdargs, true);

                            // this.addlog(operators, cmdargs);
                        } else {
                            this.$message.error('修改失败');
                        }
                    })
                    .catch(res => {
                        console.log(res);
                        this.$message({
                            message: '修改失败',
                            type: 'error'
                        });
                    });
            },
            // 五参数编辑
            changeState() {
                this.wccsEdit = false;
                debugger
                this.wcbyeditlist = []
                let $this = this;

                this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.IsWC|| m.ID == 'SZY' || m.ID == 'SWDX' || m.ID == 'YeLvSu' || m.ID == 'ZaoMiDu').map(function (item, index) {

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
                     else if (item.Name == "水中油") {
                        wcBiaoYangMLData += $this.SDL_Global.CMD.ShuiZhongYou_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';
                    }
                     else if (item.Name == "生物毒性") {
                        wcBiaoYangMLData += $this.SDL_Global.CMD.ShengWuDuXing_BiaoZhunZhi.Format(item.BiaoYangNongDu) + ';';
                    }

                })

                // + zhuodu + ";" + rongjieyang + ";" + diandaolv + ";" 

                var data = localStorage.getItem("Loginedname") + "," + "五参数修改" + "," + wcBiaoYangMLData;
                // this.$message.info(data);
                // let $this = this;
                setTimeout(function () {
                    $this.isSendLoading = false
                    $this.wccsEdit = true;
                }, 1000);
                this.socketApi.sendSock(data);

            },

            // 仪表参数切换
            lcbjbtn(id, name, flag, name2, name3) {
                // this.divshow1 = true
                // this.divshow2 = false;
                // this.divshow3 = false;
                this.SDL_Global[id][name] = flag;
                this.SDL_Global[id][name2] = false;
                this.SDL_Global[id][name3] = false;
                this.SDL_Global[id].savebtn = true
            },
            //  浊度预处理弹窗
            updateForm(Name, mlName, ml, data, unitName) {

                this.dialogFormVisible = true;

                if (Name.indexOf('标样浓度') > -1) { //=='铜'||mlName=='锌'||mlName=='镉'||mlName=='铅'
                    this.modelTitle = '标样浓度--修改值';

                }
                else if (Name == '总磷浊度上限') {
                    this.modelTitle = '总磷浊度上限--修改值';

                } else if (Name == '运维预警触发条件' || Name == '恒值预警触发条件') {
                    this.modelTitle = '预警条件--修改值';
                }
                else {
                    this.modelTitle = 'PLC参数--修改值';
                }
                this.mlName = mlName;
                this.byName = Name;
                this.unitName = unitName;
                this.ml = ml;
                this.data = data;
            },
            //  报警设定
            updatewucanForm(code, Unit) {
                this.dialogForm = true;
                debugger
                this.alarmUnit = Unit;
                this.code = code;
                this.dialogName = "报警设定--" + this.socketApi.globalDataConfig.getCodeNameData(code);
                // this.wucanForm.minlc = '';
                // this.wucanForm.maxlc = '';
                // this.wucanForm.DDLimit = '';
                // this.wucanForm.DLimit = '';
                // this.wucanForm.ULimit = '';
                // this.wucanForm.UULimit = '';
                this.selectlcbj(code, 1, false);
                // debugger
                // this.tabdata.forEach((r) => {
                //     debugger
                //     if (this.code == r['Code']) {
                //         if (r["AlarmType"] == 0) {
                //             this.wucanForm.minlc = r["DDLimit"];
                //             this.wucanForm.maxlc = r["UULimit"];
                //         } else {
                //             this.wucanForm.DDLimit = r["DDLimit"];
                //             this.wucanForm.DLimit = r["DLimit"];
                //             this.wucanForm.ULimit = r["ULimit"];
                //             this.wucanForm.UULimit = r["UULimit"];
                //         }
                //     }

                // })
                // console.log('this.wucanForm=', this.wucanForm)
            },
            // 修改其他报警设定（模态框）
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

                //  量程去掉
                // if (that.wucanForm.minlc != undefined && that.wucanForm.maxlc != undefined) {

                //     var str = "(0)"
                //     let conditions = {
                //         DDLimit: that.wucanForm.minlc,//"'" + + "'"
                //         DLimit: 0,
                //         ULimit: 0,
                //         UULimit: that.wucanForm.maxlc,
                //         Code: value,
                //         AlarmType: str,
                //     }
                //     that.updatelcbj(conditions);
                // }

                that.dialogForm = false;

            },
            // 修改标样浓度
            SendData() {
                // let mlstate=!state

                var mldata = ""
                if (this.byName.indexOf('标样浓度') > -1) {

                    mldata = this.ml.Format(this.mlName, this.data);

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
            // 预处理开关
            Sendml(name, ml) {
                var data =
                    "" + localStorage.getItem("Loginedname") + "," + name + "," + ml;
                console.log('name', data);
                // this.$message.info(data);
                this.socketApi.sendSock(data, true);
            },
            // 获取预处理方式设置列表
            getPretreatmentData() {
                let $this = this;
                //1.判断预处理是否启用
                // if (this.SDL_Global.PLC.ZhuoDuYuChuLi) {
                // if (!localStorage.getItem("pretreatmentData")) {
                this.http
                    .get("/getPretreatment")
                    .then((res) => {
                        if (res && res.length > 0) {
                            console.log(res);
                            res.forEach(function (item, index) {
                                item.isCurrent = false;
                            });
                            this.planList = res;
                            console.log('this.planList=', this.planList);

                            $this.$store.commit("setStorage", {
                                key: "pretreatmentData",
                                value: res,
                            });
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
                // }
                // }
            },
            // 预处理方案查询
            inquire() {
                this.http
                    .comMethod("*", "tbfilterplan", '')
                    .then((res) => {
                        if (res.length != 0) {
                            for (var i = 0; i < res.length; i++) {
                                this.planList[i].ID = res[i].ID;
                                this.planList[i].Title = res[i].Title;
                                this.planList[i].MinVal = res[i].MinVal;
                                this.planList[i].MaxVal = res[i].MaxVal;
                                this.planList[i].TankTime = res[i].TankTime;
                                this.planList[i].TPTime = res[i].TPTime;
                                this.planList[i].TNTime = res[i].TNTime;
                                this.planList[i].NH3Time = res[i].NH3Time;
                                this.planList[i].CODTime = res[i].CODTime;
                            }
                            console.log('预处理=', this.planList);
                        }
                    })
                    .catch((res) => {
                        console.log('tbfilterplan=', res);
                    });
            },
            // 保存预处理方式
            yclBtn(yclindex) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                this.http
                    .post("/updatetbfilterplan", this.planList[yclindex])
                    .then(res => {
                        // console.log(res);
                        if (res.warningCount == 0) {
                            this.getPretreatmentData()
                            //  console.log('index=', this.planList[yclindex])
                            this.http.addLog("修改预处理方式", JSON.stringify(this.planList[yclindex]), true);

                            // this.addlog("修改预处理方式", JSON.stringify(this.planList[yclindex]))
                            this.$message.success('修改成功');

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
                let $this = this;
                setTimeout(function () {
                    loading.close();
                }, 1000);
            },
        }
    };
</script>
<style scoped>
    /* 五参数 */
    .wucanshu {
        background-color: #303a4c;
        margin-bottom: 20px;
    }

    .xtcs-body {
        margin: 0 20px;
    }

    .ybcs-body {
        margin: 0 20px;
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

    .sjyl {
        background-color: #303a4c;
        height: 145px;
        padding-top: 20px;
        /* padding-bottom:20px; */
    }

    .bynd {
        background-color: #303a4c;
        height: 145px;
        padding-top: 20px;
        /* padding-bottom:20px; */
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

    /* 按钮组颜色 */
    .btnDiv {
        line-height: 48px;
        font-size: 14px;
        text-align: center;
        border: 1px solid #48556e;
        background-color: #384565;
        color: #cccccc;
        cursor: pointer;
        border: none
    }

    .btnDiv .tabsActive {
        color: #4a92ff;

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

    /* 试剂总量 */
    .sjzl {
        /* margin: 20px 40px; */
        margin: 0px 40px 20px 40px
    }

    /* 试剂总量 */
    .sjzl span {
        padding-right: 8px;
        color: #cccccc;
        font-size: 14px;
    }

    /* 试剂余量 */
    .sjsyl {
        margin: 20px 40px;
    }

    .sjsyl span {
        padding-right: 8px;
        color: #cccccc;
        font-size: 14px;

    }

    .ldby {
        margin: 20px 40px;
    }

    .kdby {
        margin: 20px 40px;
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

    .bfkzinput {
        display: inline-block;
        width: 35%;
    }

    .tabclass {
        font-size: 14px;
        color: #cccccc;
    }

    .tabsclass {
        height: 306px;
    }

    .GNclass {
        height: 160px;
        font-size: 14px;

    }

    .tabsclass tr td {
        font-size: 14px;
        /* padding-top: 7px;
        padding-bottom: 10px; */
    }

    .tabclass tr td {
        padding-top: 25px;

    }

    /* 参数按钮 */
    .gncsValue {
        display: inline-block;
    }

    /* 功能参数 */
    .gncsradio {
        display: inline-block;
        color: #cccccc;
    }

    /* 自行运行td */
    .zxyxName {
        text-align: right;
        padding-right: 8px;
        width: 135px;
    }

    /* 功能参数 */
    .gncsNames {
        text-align: right;
        padding-right: 20px;
        width: 150px;
    }

    .tdclass {
        text-align: right;
        padding-right: 20px;
    }

    /* plc表格 td */
    .plcClass {
        text-align: right;
        /* padding-right: 20px; */
        /* width: 150px; */
    }

    /*  td 内容样式 */
    .bfkzCom {
        margin: 10px 15px 10px 0px;
        display: inline-block;
        height: 100%;
    }

    /* pcl  td 内容样式 */
    .plcCom {
        display: inline-block;

    }

    /* td样式 */
    td {
        background-color: #303a4c;
        color: #cccccc;
    }

    /* plc编辑按钮 */
    .btn .el-icon-edit {
        /* padding-top: 3px; */
        color: rgb(74, 146, 255);
    }

    .btn .icon-shezhi2 {
        color: rgb(74, 146, 255);
    }

    /* 模态框 */
    .dialog-footer {
        text-align: center;
    }

    /* 自动运行 */
    .zdyx {
        text-align: left;
        color: #cccccc;
        padding-top: 25px;
        padding-right: 8px;
        padding-left: 18px;
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
        width: 80px;
        display: inline-block;

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

    /* 浊度预处理 */
    .zdYcl {
        margin: 10px 10px 10px 10px;
        display: inline-block;
        height: 100%;
    }

    /* 方案row */
    .yulRow {
        text-align: left;
        background-color: #303a4c;
        padding: 10px 0 0px 0;
    }

    /* 预处理lab */
    .ycllab {
        text-align: right;
        color: #ccc;
        margin-top: 10px;
        margin-right: 8px;
        font-size: 14px;
    }

    .yclLable {
        display: inline-block;
        text-align: right;
        margin-right: 3px;
        color: #cccccc;
        font-size: 14px;
        height: 100%;
    }

    .yclclass {
        display: inline-block;
        text-align: left;
        /* height: 100%; */
        /* width: 57%; */

    }

    .yclclass .el-radio {
        margin-right: 7px !important;
    }

    /* 预处理val */
    .yclVal {
        color: #ccc;
        margin-top: 10px;
        font-size: 14px;
    }

    .yclplan {
        margin-bottom: 50px;
    }
</style>