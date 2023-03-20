<template>
    <div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="block">
                        <el-row>
                            <el-col :sm="7" :lg="7" :md="7" :xl="4">
                                <label class="rwlx">时间</label>
                                <el-date-picker v-model="dateValue" type="datetimerange" :picker-options="pickerOptions"
                                    :clearable="false" unlink-panels style="width:77%" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd HH:mm:ss" size="small" @change="inquire"></el-date-picker>
                            </el-col>
                            <el-col :sm="7" :lg="7" :md="5" :xl="4">
                                <label class="rwlx">运维类型</label>
                                <el-select v-model="yunWeiType" size="small" style="width: 60%" placeholder="请选择"
                                    @change="inquire">
                                    <el-option v-for="item in yunWeiList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :sm="3" :xs="3" :md="4" :xl="4">
                                <el-button type="primary" size="small" @click="addYunWeinfo">添加</el-button>

                            </el-col>
                            <!-- <el-button type="primary" size="small" style="float: right" @click="getExcel">导出</el-button> -->
                            <!-- <excel :excelTitleName='excelTitleName' :exportHeader='exportHeader'
                                :exportFilterVal='exportFilterVal' :exportList='exportList'></excel> -->
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">

                <el-table :data="tableData.slice((page - 1) * size, (page - 1) * size + size)" v-loading="pictLoading"
                    element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="数据正在加载中" :header-cell-style="{
              'background-color': '#384565',
            }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">

                    <el-table-column label="运维时间" align="center" prop="DataTime" width="180">
                    </el-table-column>
                    <el-table-column label="设备名称" align="center" prop="DeviceName">
                    </el-table-column>
                    <el-table-column label="运维类型" align="center" prop="TaskID">
                    </el-table-column>
                    <el-table-column label="上次运维时间" align="center" prop="LastTime" width="180">
                    </el-table-column>

                    <el-table-column label="运维人" align="center" prop="DevOpsPerson">
                    </el-table-column>

                    <!-- <el-table-column label="规格型号" align="center" prop="ModelNum" >
                    </el-table-column>
                    <el-table-column label="设备编号" align="center" prop="DeviceNo" >
                    </el-table-column>
                    <el-table-column label="安装地点" align="center" prop="Address" >
                    </el-table-column>
                    <el-table-column label="企业名称" align="center" prop="Enterprise" >
                    </el-table-column>
                    <el-table-column label="运行单位" align="center" prop="Company" >
                    </el-table-column> -->

                    <el-table-column label="操作" align="left">
                        <template slot-scope="scope">
                            <span class="btn" size="mini" @click="editYunWeiInfo(true,scope.row)">编辑
                            </span>
                            <span class="btn" size="mini" @click="printYunWeiInfo(false,scope.row)">详情
                            </span>
                            <span class="btn" v-if="false" size="mini" @click="printjiaozhunInfo(true,scope.row)">校准记录
                            </span>
                            <!-- <span class="btn" size="mini" @click="editYunWeiInfo(false,scope.row)">查看
                            </span> -->
                            <!-- @command="checkedYunWeiForm(scope.row)"  -->
                            <el-dropdown class="btn" :hide-on-click="false">
                                <span class="el-dropdown-link">
                                    更多表单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="1" @click.native="checkedYunWeiForm(scope.row, 1)">
                                        设备检修记录表1</el-dropdown-item>
                                    <el-dropdown-item command="8" @click.native="checkedYunWeiForm(scope.row, 8)">
                                        设备检修记录表2</el-dropdown-item>
                                    <el-dropdown-item command="2" @click.native="checkedYunWeiForm(scope.row, 2)">
                                        废液存储记录表</el-dropdown-item>
                                    <el-dropdown-item command="3" @click.native="checkedYunWeiForm(scope.row, 3)">
                                        废液处置记录表</el-dropdown-item>
                                    <el-dropdown-item command="4" @click.native="checkedYunWeiForm(scope.row, 4)">
                                        标准溶液核查记录表</el-dropdown-item>
                                    <el-dropdown-item command="5" @click.native="checkedYunWeiForm(scope.row, 5)">
                                        标准样品更换记录表</el-dropdown-item>
                                    <el-dropdown-item command="6" @click.native="checkedYunWeiForm(scope.row, 6)">
                                        标样核查及校准结果记录表</el-dropdown-item>
                                    <el-dropdown-item command="7" @click.native="checkedYunWeiForm(scope.row, 7)">
                                        易耗品更换记录表</el-dropdown-item>

                                </el-dropdown-menu>
                            </el-dropdown>

                        </template>
                    </el-table-column>
                </el-table>
                <div class="pageNations">
                    <el-pagination @current-change="currentPage" class="pageNation"
                        layout="total,sizes,prev, pager, next" :page-size="size" :page-sizes="[5, 10, 20, 30, 50]"
                        @size-change="changeSize" :current-page="page" :total="total">
                    </el-pagination>
                </div>
                <!-- </div> -->
            </div>
        </div>
        <template class="dialogYWBox">
            <el-dialog class="div-ywdialog" title="添加运维记录" :visible.sync="yunweiModel" width="90%"
                :modal-append-to-body='false' :close-on-click-modal="false">
                <el-row>
                    <el-col :span='17' style="text-align: left;">
                        <template v-for="(item, index) in yunWeiList">
                            <el-radio v-if="index!=0" v-model="actTask" :key="index" :label="item.value"
                                @change="taskChange">
                                {{item.label }}
                            </el-radio>
                        </template>
                    </el-col>
                    <el-col :span='7' style="color: #cccccc;text-align: left;">
                        上次运维时间:{{lastYunWeiTime}}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <table style="margin-top:10px ;" v-loading="pictYunWeiLoading" element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading" element-loading-background="#000">
                            <!-- <thead> -->
                            <tr>
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">设备名称：</td>
                                <td style="width: 110px;">
                                    <el-input placeholder="请输入" v-model="DeviceName">
                                    </el-input>
                                </td>
                                <td style="text-align: left;padding-left: 10px;max-width: 100px;">规格型号：</td>
                                <td>
                                    <el-input placeholder="请输入" v-model="ModelNum">
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">设备编号：</td>
                                <td style="width: 110px;">
                                    <el-input placeholder="请输入" v-model="DeviceNo">
                                    </el-input>
                                </td>
                                <td style="text-align: left;padding-left: 10px;width: 100px;">安装地点：</td>
                                <td>
                                    <!-- <el-input id="PointName" placeholder="请输入" value="">
                                    </el-input> -->
                                    <input class="el-input__inner" id="PointName" type="text" placeholder="请输入" />
                                    <!-- {{SDL_Global.SYS.PointName}} -->

                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">企业名称：</td>
                                <td style="width: 110px;">
                                    <!-- <el-input placeholder="请输入" v-model="SDL_Global.SYS.CompanyName"> -->
                                    <!-- {{SDL_Global.SYS.CompanyName}} -->
                                    <!-- </el-input> -->


                                    <input class="el-input__inner" id="CompanyName" type="text" placeholder="请输入" />

                                </td>
                                <td style="text-align: left;padding-left: 10px;width: 100px;">运行单位：</td>
                                <td>

                                    <input class="el-input__inner" id="YunWeiCompanyName" type="text"
                                        placeholder="请输入" />
                                    <!-- </el-input> -->
                                </td>
                            </tr>
                            <tr v-if="this.actTask!=4">
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">项目</td>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">内容</td>
                                <td style="width: 100px;text-align: left;padding-left: 10px;">巡检情况</td>
                                <td>备注</td>
                            </tr>
                            <!-- </thead>
                            <tbody> -->
                            <tr v-for="(item, index) in YunWeiForm">
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">{{item.Classify}}</td>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">{{item.Title}}</td>
                                <td style="width: 100px;text-align: left;padding-left: 10px;">
                                    <!-- <el-checkbox :checked='YunWeiFormData[index].Status==0?false:true'
                                        :true-label='item.ID+"_1"' :false-label='item.ID+"_0"' :key='index'
                                        @change="activeBox">
                                    </el-checkbox> -->
                                    <el-radio-group @change="activeBox(item.ID,YunWeiFormData[index].Status)"
                                        v-if="item.OptItems==1" v-model="YunWeiFormData[index].Status">
                                        <el-radio :label="1">正常</el-radio>
                                        <el-radio :label="0">异常</el-radio>
                                    </el-radio-group>
                                    <el-radio-group @change="activeBox(item.ID,YunWeiFormData[index].Status)" v-else
                                        v-model="YunWeiFormData[index].Status">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </td>
                                <td>
                                    <el-input v-model='YunWeiFormData[index].Remark' placeholder="请输入"></el-input>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td style="text-align: left;padding-left: 10px;">备注</td>
                                <td colspan="3">
                                    <el-input v-model='YunWeiFormDataRemark' placeholder="请输入"></el-input>
                                </td>
                            </tr> -->
                            <tr>
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">运维人</td>
                                <td colspan="3" style="text-align: left;padding-left: 10px">{{userName}}</td>
                            </tr>
                            <!-- </tbody> -->
                            <tr>
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">异常情况处理记录：</td>
                                <td colspan="3">
                                    <el-input placeholder="请输入" v-model='YunWeiFormDataRemark'>
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;max-width: 110px;">本周巡检情况小结：</td>
                                <td colspan="3">
                                    <el-input placeholder="请输入" v-model='Summary'>
                                    </el-input>
                                </td>
                            </tr>
                        </table>
                    </el-col>
                </el-row>

                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="yunweiModel = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="addYunWeilog">确 定</el-button>
                </div>
            </el-dialog>
        </template>
        <template class="dialogYWBox">
            <el-dialog class="div-ywdialog" :title="yuNWeiName" :visible.sync="yunWeieditModel" width="80%"
                :modal-append-to-body='false' :close-on-click-modal="false">
                <el-row>
                    <el-col>
                        <table style="margin-top: 10px;">
                            <!-- <thead> -->
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">设备名称：</td>
                                <td style="width: 110px;">
                                    <el-input placeholder="请输入" v-model="DeviceName">
                                    </el-input>
                                </td>
                                <td style="text-align: left;padding-left: 10px;width: 100px;">规格型号：</td>
                                <td>
                                    <el-input placeholder="请输入" v-model="ModelNum">
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">设备编号：</td>
                                <td style="width: 110px;">
                                    <el-input placeholder="请输入" v-model="DeviceNo">
                                    </el-input>
                                </td>
                                <td style="text-align: left;padding-left: 10px;width: 100px;">安装地点：</td>
                                <td>
                                    <el-input placeholder="请输入" v-model="Address">
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">企业名称：</td>
                                <td style="width:110px ;">
                                    <el-input placeholder="请输入" v-model="Enterprise">
                                    </el-input>
                                </td>
                                <td style="text-align: left;padding-left: 10px;width: 100px;">运行单位：</td>
                                <td>
                                    <el-input placeholder="请输入" v-model="Company">
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">项目</td>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">内容</td>
                                <td style="width: 110px;width: 100px;">巡检情况</td>
                                <td>备注</td>
                            </tr>
                            <!-- </thead>
                            <tbody> -->
                            <tr v-for="(item, index) in YunWeiFormData">
                                <td style="text-align: left;padding-left: 10px;width: 110px;">{{item.Classify}}</td>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">{{item.Title}}</td>
                                <td style="width: 100px;">
                                    <!-- <el-checkbox v-if="editshow" :checked='YunWeiFormData[index].Status==0?false:true'
                                        :true-label='item.ID+"_1"' :false-label='item.ID+"_0"' :key='index'
                                        @change="activeBox">
                                    </el-checkbox>
                                    <el-checkbox v-else :checked='YunWeiFormData[index].Status==0?false:true'
                                    :true-label='item.ID+"_1"' :false-label='item.ID+"_0"' :key='index'
                                    @change="activeBox" disabled>
                                    </el-checkbox> -->
                                    <template v-if="editshow">
                                        <el-radio-group @change="activeBox(item.ID,YunWeiFormData[index].Status)"
                                            v-if="item.OptItems==1" v-model="YunWeiFormData[index].Status">
                                            <el-radio :label="1">正常</el-radio>
                                            <el-radio :label="0">异常</el-radio>
                                        </el-radio-group>
                                        <el-radio-group @change="activeBox(item.ID,YunWeiFormData[index].Status)" v-else
                                            v-model="YunWeiFormData[index].Status">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="0">否</el-radio>
                                        </el-radio-group>
                                    </template>
                                    <template v-else>
                                        <el-radio-group disabled
                                            @change="activeBox(item.ID,YunWeiFormData[index].Status)"
                                            v-if="item.OptItems==1" v-model="YunWeiFormData[index].Status">
                                            <el-radio :label="1">正常</el-radio>
                                            <el-radio :label="0">异常</el-radio>
                                        </el-radio-group>
                                        <el-radio-group disabled
                                            @change="activeBox(item.ID,YunWeiFormData[index].Status)" v-else
                                            v-model="YunWeiFormData[index].Status">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="0">否</el-radio>
                                        </el-radio-group>
                                    </template>

                                </td>
                                <td>
                                    <el-input v-if="editshow" v-model='YunWeiFormData[index].Remark' placeholder="请输入">
                                    </el-input>
                                    <el-input v-else v-model='YunWeiFormData[index].Remark' disabled>
                                    </el-input>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td style="text-align: left;padding-left: 10px;">备注</td>
                                <td colspan="3">
                                    <el-input v-if="editshow" v-model='YunWeiFormDataRemark' placeholder="请输入">
                                    </el-input>
                                    <el-input v-else v-model='YunWeiFormDataRemark' disabled>
                                    </el-input>
                                </td>
                            </tr> -->
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">运维人</td>
                                <td colspan="3" style="text-align: left;padding-left: 10px;">{{userName}}</td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">异常情况处理记录：</td>
                                <td colspan="3">
                                    <el-input placeholder="请输入" v-model='YunWeiFormDataRemark'>
                                    </el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;padding-left: 10px;width: 110px;">本周巡检情况小结：</td>
                                <td colspan="3">
                                    <el-input placeholder="请输入" v-model='Summary'>
                                    </el-input>
                                </td>
                            </tr>
                            <!-- </tbody> -->

                        </table>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer" v-if="editshow">
                    <el-button size="small" @click="yunWeieditModel = false">取 消</el-button>
                    <el-button size="small" type="primary" @click="editYunWeilog">确 定</el-button>
                </div>
                <!--   <div slot="footer" class="dialog-footer"   v-else>
                   <el-button size="small" type="primary">
                    打印
                  </el-button> 
                 

                </div>-->

            </el-dialog>

        </template>
        <template class="dialogBox">
            <!-- <el-dialog class="div-dialog" title="打印运维巡检记录" :visible.sync="yunWeiPrintModel" width="89%"
                :modal-append-to-body='false' :close-on-click-modal="false"> -->
            <!-- <div slot="footer" class="dialog-footer"  > -->

            <printYunWei :printywjl="printList" :printywjlLog="printYunWeiLog" :printvisible="printBtn"
                :printYunWeiTitle="printTitle" :yunWeimmodel.sync='yunWeiPrintModel'>
            </printYunWei>
            <printJiaoZhun :jiaoZhunModel.sync='jiaoZhunPrintModel' :printJZLog="printJiaoZhunLog"
                :jiaozhunLeng='hechaNum'></printJiaoZhun>
            <!-- </div> -->

            <feiYeCunChu ref="child" :feiYeCunChuModel.sync='feiYeCunChuPrintModel'></feiYeCunChu>

            <feiYeChuZhi ref="childs" :feiYeChuZhiModel.sync='feiYeChuZhiPrintModel'></feiYeChuZhi>

            <biaoZhunRongYe ref="bzryChild" :biaoZhunRongYeModel.sync='biaoZhunRongYePrintModel'></biaoZhunRongYe>

            <biaoZhunYangPin ref="bzypChild" :biaoZhunYangPinModel.sync='biaoZhunYangPinPrintModel'></biaoZhunYangPin>

            <biaoYangJiaoZhun ref="byjzChild" :biaoYangJiaoZhunModel.sync='biaoYangJiaoZhunPrintModel'>
            </biaoYangJiaoZhun>

            <yiHaoPinGengHuan ref="yhpChild" :yiHaoPinModel.sync='yiHaoPinPrintModel'></yiHaoPinGengHuan>

            <jianXiuReport ref="jxReportChild" :jianXiuModel.sync='jianXiuReportPrintModel'></jianXiuReport>

            <jianXiuLog ref="jxlogChild" :jianXiuLogModel.sync='jianXiuLogPrintModel'></jianXiuLog>


            <!-- <printShuiYangBiDui :ShuiYangModel.sync='ShuiYangPrintModel' :PrintBiDuiList="PrintBiDuiData"
            :printbiDuiTimes="printbiDuiTime"></printShuiYangBiDui> -->

        </template>
    </div>
</template>
<script>
    import moment from "moment";
    import eleTable from "../module/renderTable";

    import excel from "../module/excel";
    import printYunWei from "../module/printYunWei";
    import printJiaoZhun from "../module/printJiaoZhun";

    import feiYeCunChu from "../YunWeiForm/feiYeCunChu";
    import feiYeChuZhi from "../YunWeiForm/feiYeChuZhi";
    import biaoZhunRongYe from "../YunWeiForm/biaoZhunRongYe";
    import biaoZhunYangPin from "../YunWeiForm/biaoZhunYangPin";
    import biaoYangJiaoZhun from "../YunWeiForm/biaoYangJiaoZhun";
    import yiHaoPinGengHuan from "../YunWeiForm/yiHaoPinGengHuan";
    import jianXiuReport from "../YunWeiForm/jianXiuReport";
    import jianXiuLog from "../YunWeiForm/jianXiuLog";


    // import printShuiYangBiDui from "../module/printShuiYangBiDui";

    export default {
        name: "ywjl",
        components: { excel, eleTable, printYunWei, printJiaoZhun, feiYeCunChu, feiYeChuZhi, biaoZhunRongYe, biaoZhunYangPin, biaoYangJiaoZhun, yiHaoPinGengHuan, jianXiuReport, jianXiuLog },//,printShuiYangBiDui
        data() {
            let factorData = [];
            this.socketApi.globalDataConfig.SDL_Global.MetersWC().map(function (item, index) {

                let obj = {
                    value: item.Code,
                    label: item.Name,
                    Series: item.Series,
                }
                // if (item.Name != "藻密度" && item.Name != "叶绿素") {
                factorData.push(obj);
                // }

            })
            return {
                // checkForm: '',
                // yunWeiFormList: [
                //     {
                //         value: '1',
                //         label: '设备检修记录表'
                //     },
                //     {
                //         value: '2',
                //         label: '废液存储记录表'
                //     }
                // ],
                feiYeCunChuPrintModel: false,
                feiYeChuZhiPrintModel: false,
                biaoZhunRongYePrintModel: false,
                biaoZhunYangPinPrintModel: false,
                biaoYangJiaoZhunPrintModel: false,
                yiHaoPinPrintModel: false,
                jianXiuReportPrintModel: false,
                jianXiuLogPrintModel: false,
                // printDevOpsNum: '',

                // ShuiYangPrintModel:false,
                // printbiDuiTime:'',
                // PrintBiDuiData:'',

                factorList: factorData,
                jiaoZhunPrintModel: false,
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                emptyText: "暂无数据",
                dateValue: [
                    moment(new Date() - 1000 * 3600 * 24 * 30).format("YYYY-MM-DD HH:mm:ss"),
                    moment(new Date()).format("YYYY-MM-DD 23:59:59"),
                ],
                pickerOptions: {
                    shortcuts: [
                        {
                            text: "最近一周",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "最近一个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                    ],
                },
                yunWeiType: "",
                yunWeiList: [],
                yunweiUpdateTime: [],
                tableData: [],
                excelTitleName: '运维记录数据', //excel标题名字
                exportHeader: [], //导出 字段表头
                exportFilterVal: [], //表头对应字段
                exportList: [],//excel数据
                total: 0,
                page: 1,
                size: 30,
                pictLoading: false,
                pictYunWeiLoading: false,
                tableHeight: null,
                yunweiModel: false,
                yunWeieditModel: false,
                yunWeiPrintModel: false,
                tableInfo: [],
                YunWeiForm: [],
                checked: 0,
                YunWeiFormData: [],

                YunWeiFormDataRemark: "",
                userName: localStorage.getItem("Loginedname"),
                DevOpsNum: "",
                lastYunWeiTime: "",
                actTask: 1,
                DeviceName: '',
                ModelNum: '',
                DeviceNo: '',
                Address: '',
                Enterprise: '',
                Company: '',
                Summary: '',

                editDevOpsNum: "",
                yuNWeiName: "修改运维记录",
                printTitle: '',
                editshow: true,
                // tableList: '表格数据lie',
                otherNum: 0,
                ybjzColumn: [
                    {
                        prop: "Pol",
                        label: "因子",
                    },
                    {
                        prop: "CheckType",
                        label: "校准类型",
                    },
                    {
                        prop: "i13001",
                        label: "量程",
                    },
                    {
                        prop: "i13002",
                        label: "精度",
                    },
                    {
                        prop: "i13004",
                        label: "消解温度",
                    },
                    {
                        prop: "i13005",
                        label: "消解时长",
                    },
                    {
                        prop: "i13007",
                        label: "截距",
                    },
                    {
                        prop: "i13008",
                        label: "斜率",
                    },
                    {
                        prop: "i13009",
                        label: "检出限",
                    },
                    {
                        prop: "i13010",
                        label: "信号值",
                    },
                    {
                        prop: "i13011",
                        label: "线性系数",
                    },
                ],
                printYunWeiLog: {
                    DeviceName: '',
                    ModelNum: '',
                    DeviceNo: '',
                    Address: '',
                    Enterprise: '',
                    Company: '',
                    Summary: '',
                    remark: ''
                },
                hechaNum: 0,
                printBtn: true,
                toDayLog: [],
                todayYunWeiItem: [],
                printJiaoZhunLog: [],
                printList: [
                    {
                        printId: 1,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 2,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 3,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 4,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 5,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 6,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 7,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 8,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 9,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 10,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 11,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 12,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 13,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 14,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 15,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 16,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 17,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 18,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 19,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 20,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 21,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 22,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 23,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 24,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 25,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 26,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 27,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 28,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 29,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 30,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 31,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 32,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 33,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 34,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 35,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 36,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 37,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 38,
                        printValue: '',
                        printRemake: '',
                    },

                    {
                        printId: 39,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 40,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 41,
                        printValue: '',
                        printRemake: '',
                    }
                ]

            };
        },
        mounted() {
            this.getYunWeiList()
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
            // 打印运维相关记录表
            checkedYunWeiForm(val, command) {
                debugger

                // this.printDevOpsNum = val.DevOpsNum;
                if (command == 1) {
                    this.jianXiuReportPrintModel = true;
                    this.getJianXiuReportData(val.DevOpsNum);
                }
                else if (command == 2) {
                    this.feiYeCunChuPrintModel = true;
                    this.getFeiYeCunChuData(val.DevOpsNum);
                }
                else if (command == 3) {
                    this.feiYeChuZhiPrintModel = true;
                    this.getFeiYeChuZhiData(val.DevOpsNum);
                }
                else if (command == 4) {
                    this.biaoZhunRongYePrintModel = true;
                    this.getBiaoZhunRongYeData(val.DevOpsNum);
                } else if (command == 5) {
                    this.biaoZhunYangPinPrintModel = true;
                    this.getBiaoZhunYangPinData(val.DevOpsNum);
                } else if (command == 6) {
                    this.biaoYangJiaoZhunPrintModel = true;
                    this.getBiaoYangJiaoZhunData(val.DevOpsNum);
                } else if (command == 7) {
                    this.yiHaoPinPrintModel = true;
                    this.getYiHaoPinGengHuanData(val.DevOpsNum);
                } else if (command == 8) {
                    this.jianXiuLogPrintModel = true;
                    this.getJianXiuLogData(val.DevOpsNum);
                }
            },
            //  获取当前运维单号检修记录表
            getJianXiuReportData(DevOpsNum) {
                this.$refs.jxReportChild.getData(DevOpsNum);
            },
            //  获取当前运维单号检修记录表2
            getJianXiuLogData(DevOpsNum) {
                this.$refs.jxlogChild.getData(DevOpsNum);
            },
            //  获取当前运维单号废液存储数据
            getFeiYeCunChuData(DevOpsNum) {
                this.$refs.child.getData(DevOpsNum);
            },
            //  获取当前运维单号废液处置数据
            getFeiYeChuZhiData(DevOpsNum) {
                this.$refs.childs.getData(DevOpsNum);
            },
            // 获取当前运维单号标准溶液核查记录表
            getBiaoZhunRongYeData(DevOpsNum) {
                this.$refs.bzryChild.getData(DevOpsNum);
            },
            // 获取当前运维单号标准样品更换记录表
            getBiaoZhunYangPinData(DevOpsNum) {
                this.$refs.bzypChild.getData(DevOpsNum);
            },
            // 获取当前运维单号标样校准表
            getBiaoYangJiaoZhunData(DevOpsNum) {
                // let PolId='总氮'
                this.$refs.byjzChild.getData(DevOpsNum);
            },
            getYiHaoPinGengHuanData(DevOpsNum) {
                this.$refs.yhpChild.getData(DevOpsNum);
            },

            // 校准记录
            async printjiaozhunInfo(jzvisible, val) {
                this.printJiaoZhunLog = [];
                let tableName =
                    " 仪表校准 as a left  JOIN `上传参数` as b on a.DataTime=b.DataTime and a.Pol=CONVERT(b.PolID USING utf8) COLLATE utf8_unicode_ci ";
                let condition = "a.DataTime LIKE '" + moment(val.DataTime).format('YYYY-MM-DD') + "%' ";

                await this.http
                    .comMethod('*', tableName, condition)
                    .then((res) => {
                        this.hechaNum = res.length;
                        if (res.length != 0) {

                            //表格数据
                            res.forEach((r) => {
                                for (var i = 0; i < this.factorList.length; i++) {
                                    if (r.Pol == this.factorList[i].value) {
                                        r.Series = this.factorList[i].Series;
                                    }
                                }

                                // r.Check = r.Check == null ? "--" : r.Check;
                                r.DataTime = r.DataTime == null ? "--" : this.$options.filters.dateFormat(r.DataTime);
                                // r.Flag = r.Flag == null ? "--" : r.Flag;
                                // r.Water = r.Water == null || undefined ? "--" : r.Water;
                                // r.WaterTime = r.WaterTime == null || undefined ? "--" : this.$options.filters.dateFormat(r.WaterTime);
                                r.i13001 = r.i13001 == null ? "--" : r.i13001;
                                r.i13002 = r.i13002 == null ? "--" : r.i13002;
                                r.i13004 = r.i13004 == null ? "--" : r.i13004;
                                r.i13005 = r.i13005 == null ? "--" : r.i13005;
                                r.i13007 = r.i13007 == null ? "--" : r.i13007;
                                r.i13008 = r.i13008 == null ? "--" : r.i13008;
                                r.i13009 = r.i13009 == null ? "--" : r.i13009;
                                r.i13010 = r.i13010 == null ? "--" : r.i13010;
                                r.i13011 = r.i13011 == null ? "--" : r.i13011;

                                if (r.CheckType == 8) {
                                    r.CheckType = '空白校准'
                                } else if (r.CheckType == 9) {
                                    r.CheckType = '标样校准'
                                } else {
                                    r.CheckType = ''
                                }

                                r.Pol = r.Pol == null ? "--" : this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]);// this.funfactor(r.Pol);
                            });
                            this.printJiaoZhunLog = res;
                            console.log("质控数据", this.printJiaoZhunLog);
                        } else {

                        }
                        // this.jiaoZhunPrintModel = true;

                    })
                    .catch((res) => {
                        this.$message.error("服务端错误");
                        // console.log(res);
                    });
                if (jzvisible) {
                    this.jiaoZhunPrintModel = true;
                } else {
                    if (this.printJiaoZhunLog.length < 1) {
                        this.printBtn = false;
                    } else {
                        this.printBtn = true;

                    }

                }

            },
            // 巡检情况
            activeBox(checkedId, checkedValue) {
                // let checkedValue = val.split('_');
                //YunWeiForm
                this.YunWeiFormData.map(function (item, index) {
                    if (item.ID == checkedId) {

                        item.Status = checkedValue;
                    }
                })
                console.log(this.YunWeiFormData);
            },

            getHeight() {
                this.tableHeight = window.innerHeight - 226
            },
            // 获取运维类型
            getYunWeiList() {
                this.yunWeiList = [{
                    value: 0,
                    label: '全部',
                }]
                this.http
                    .comMethod("*", "tbdevopstask", "")
                    .then((res) => {

                        if (res.length != 0) {
                            res.forEach((r) => {
                                let obj = {
                                    value: r["ID"],
                                    label: r["Title"],
                                };
                                this.yunWeiList.push(obj)
                            });
                            this.yunweiUpdateTime = res;
                        } else {
                            this.yunweiUpdateTime = [];
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 查询运维数据
            inquire() {

                this.pictLoading = true;
                this.yunweilogs = false;
                this.emptyText = "";
                if (
                    parseInt(new Date(this.dateValue[1]) - new Date(this.dateValue[0])) /
                    (1000 * 60 * 60 * 24) >
                    100
                ) {
                    this.emptyText = "暂无数据";
                    this.tableData = [];

                    this.pictLoading = false;

                    this.$message({
                        message: "时间不能大于100天",
                        type: "warning",
                        duration: 2000,
                    });
                    return;
                }
                if (this.dateValue == null) {
                    this.pictLoading = false;
                    this.tableData = [];

                    this.emptyText = "暂无数据";
                }

                // this.dateValue = [
                //     moment(new Date() - 1000 * 3600 * 24 * 30).format("YYYY-MM-DD HH:mm:ss"),
                //     moment().format("YYYY-MM-DD HH:mm:ss"),
                // ];
                let condition = "";
                condition = "DataTime BETWEEN '" + this.dateValue[0] + "' and '" + this.dateValue[1] + "'"
                if (this.yunWeiType != "") {
                    condition = condition +
                        " and TaskID = '" +
                        this.yunWeiType +
                        "'"
                }
                // "AlarmType in (0," + lcbjtype + ") "
                condition += "order by DataTime DESC"
                this.http
                    .comMethod("*", "tbdevopslog", condition)
                    .then((res) => {
                        this.pictLoading = false;
                        if (res.length != 0) {
                            this.yunweilogs = true;
                            res.forEach((r) => {
                                if (r.DataTime != null) {
                                    r.DataTime = this.$options.filters.dateFormat(r.DataTime);

                                }
                                if (r.LastTime != null) {
                                    r.LastTime = this.$options.filters.dateFormat(r.LastTime);

                                }

                                r["TaskID"] = this.fundevopInfo(r["TaskID"]);
                            });
                            // ////debugger
                            this.tableData = res;
                            this.total = res.length
                        } else {
                            // this.emptyText = "暂无数据"
                            this.total = 0

                        }
                    })
                    .catch((res) => {
                        console.log(res);

                    });
            },
            // 打印预览
            printYunWeiInfo(flags, yunWeiInfo) {
                // this.yunWeiPrintModel = true;
                // this.editYunWeiInfo(flags, yunWeiInfo);
                this.printTitle = yunWeiInfo.TaskID + '-运维记录';
                this.printYunWeiLog.DeviceName = yunWeiInfo.DeviceName;
                this.printYunWeiLog.ModelNum = yunWeiInfo.ModelNum;
                this.printYunWeiLog.DeviceNo = yunWeiInfo.DeviceNo;
                this.printYunWeiLog.Address = yunWeiInfo.Address;
                this.printYunWeiLog.Enterprise = yunWeiInfo.Enterprise;
                this.printYunWeiLog.Company = yunWeiInfo.Company;
                this.printYunWeiLog.remark = yunWeiInfo.remark;
                this.printYunWeiLog.Summary = yunWeiInfo.Summary;
                // if(yunWeiInfo.TaskID!='其他运维'){
                this.printYunWeiDataList(yunWeiInfo);

                // }

            },
            printYunWeiDataList(yunWeiInfo) {
                let jzvisible = false;
                // 判断是否打印
                this.printjiaozhunInfo(jzvisible, yunWeiInfo);
                this.todayYunWeiItem = [];
                // 查询当天 
                let condition = "";
                condition = "DataTime  LIKE '" + moment(yunWeiInfo.DataTime).format('YYYY-MM-DD') + "%' ";
                if (yunWeiInfo.TaskID != '其他运维') {
                    this.http
                        .comMethod("*", "tbdevopslog", condition)
                        .then((res) => {
                            debugger
                            this.toDayLog = res;
                            this.otherNum = 0;

                            res.forEach((r) => {
                                if (r["TaskID"] == 4) {
                                    this.otherNum += 1;

                                }
                            })
                            // let resCount=this.toDayLog.length-1;
                            debugger
                            for (var i = 0; i < this.toDayLog.length; i++) {
                                // if (this.toDayLog[i].TaskID != 4) {
                                let $this = this;

                                $this.getYunWeiItem($this.toDayLog[i].TaskID, $this.toDayLog[i].DevOpsNum, i);


                                // }
                            }
                            // this.printData();
                        })
                        .catch((res) => {
                            console.log(res);
                        });

                } else {
                    this.printData();
                }



            },

            //翻填运维记录
            editYunWeiInfo(flags, yunWeiInfo) {
                this.editshow = flags;

                this.yuNWeiName = '运维记录'
                if (this.editshow == true) {
                    this.yunWeieditModel = true;

                    this.yuNWeiName = "编辑" + this.yuNWeiName + "-" + yunWeiInfo.TaskID;
                } else {
                    // this.yuNWeiName += "-" + yunWeiInfo.TaskID
                };

                let TaskID = this.fundevopId(yunWeiInfo.TaskID);


                this.getYunWeiItem(TaskID, yunWeiInfo.DevOpsNum);
                this.editDevOpsNum = yunWeiInfo.DevOpsNum;
                this.DeviceName = yunWeiInfo.DeviceName;
                this.ModelNum = yunWeiInfo.ModelNum;
                this.DeviceNo = yunWeiInfo.DeviceNo;
                this.Address = yunWeiInfo.Address;
                this.Enterprise = yunWeiInfo.Enterprise;
                this.Company = yunWeiInfo.Company;
                this.Summary = yunWeiInfo.Summary;
                let condition = "";
                condition = " DevOpsNum = '" + yunWeiInfo.DevOpsNum + "'"
                this.http
                    .comMethod("*", "tbdevopslog", condition)
                    .then((res) => {
                        this.pictLoading = false;
                        if (res.length != 0) {
                            // res.forEach((r) => {
                            //     r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                            //     r.LastTime = this.$options.filters.dateFormat(r.LastTime);
                            //     r["TaskID"] = this.fundevopInfo(r["TaskID"]);
                            // });
                            ////debugger
                            this.YunWeiFormDataRemark = res[0].remark;
                            if (this.editshow == true) {
                                this.userName = res[0].DevOpsPerson;
                            }
                        } else {
                            // this.emptyText = "暂无数据"

                        }
                    })
                    .catch((res) => {
                        console.log(res);

                    });

            },

            // 修改运维记录及子项
            editYunWeilog() {
                this.http
                    .post("/updatedevopsLogData", {
                        DevOpsNum: this.editDevOpsNum,
                        remark: this.YunWeiFormDataRemark,
                        DevOpsPerson: this.userName,
                        DeviceName: this.DeviceName,
                        ModelNum: this.ModelNum,
                        DeviceNo: this.DeviceNo,
                        Address: this.Address,
                        Enterprise: this.Enterprise,
                        Company: this.Company,
                        Summary: this.Summary,
                    })
                    .then((res) => {
                        if (res.affectedRows > 0) {
                            this.$message.success("修改成功");
                            this.yunWeieditModel = false;
                            this.inquire();
                            let operator = '修改运维记录';
                            let ywModes = {
                                DevOpsNum: this.editDevOpsNum,
                                remark: this.YunWeiFormDataRemark,
                                DevOpsPerson: this.userName,
                            }
                            // this.addlog(operator, cmdargs)

                            let cmdargs = JSON.stringify(ywModes);

                            this.http.addLog(operator, cmdargs, true);

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
                // 修改运维子项
                for (var i = 0; i < this.YunWeiFormData.length; i++) {
                    var ywItemModes = {
                        ID: this.YunWeiFormData[i].tailID,
                        Status: this.YunWeiFormData[i].Status,
                        Remark: this.YunWeiFormData[i].Remark
                    }
                    ////debugger
                    this.http
                        .post("/updatedevopsLogdetailData", {
                            ID: this.YunWeiFormData[i].tailID,
                            Status: this.YunWeiFormData[i].Status,
                            Remark: this.YunWeiFormData[i].Remark
                        })
                        .then((res) => {
                            if (res.affectedRows > 0) {

                                // this.inquire();
                                let operator = '修改运维子项';

                                let cmdargs = JSON.stringify(ywItemModes);

                                // this.addlog(operator, cmdargs)

                                // this.http.addLog(operator, cmdargs, true);
                            } else {
                                // this.$message.error("修改失败");
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
            },
            // 重置添加表单
            addYunWeinfo() {
                let $this = this;

                $this.yunweiModel = true;
                this.actTask = 1;
                this.YunWeiFormDataRemark = "";
                // this.actTask = 1;
                this.DeviceName = '';
                this.ModelNum = '';
                this.DeviceNo = '';
                this.Address = '';
                this.Enterprise = '';
                this.Company = '';
                this.Summary = '';
                // document.getElementById("YunWeiCompanyName").innerHTML = "ceshi";
                // document.getElementById("PointName").value= this.SDL_Global.SYS.PointName;

                // document.getElementById("YunWeiCompanyName").attr('value','武汉路');

                this.getYunWeiItem(this.actTask, "");
                this.getLastYunWei(this.actTask);
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // setTimeout(() => {
                // }, 2000);
                setTimeout(function () {
                    loading.close();

                    document.getElementById("PointName").value = $this.SDL_Global.SYS.PointName;
                    document.getElementById("CompanyName").value = $this.SDL_Global.SYS.CompanyName;
                    document.getElementById("YunWeiCompanyName").value = $this.SDL_Global.SYS.YunWeiCompanyName;
                }, 1000);

            },
            // 生成随机数
            MathRand() {
                var Num = "";
                for (var i = 0; i < 6; i++) {
                    Num += Math.floor(Math.random() * 10);
                }
                return Num
            },
            //  添加表单前判定是否合法
            async yunweiloginfo(flages, yunweiactTasklogs) {
                debugger
                let condition = "";
                condition = "DataTime BETWEEN '" + this.dateValue[0] + "' and '" + this.dateValue[1] + "'"
                if (yunweiactTasklogs != "") {
                    condition = condition +
                        " and TaskID = '" +
                        yunweiactTasklogs +
                        "'"
                }
                condition += "order by DataTime DESC"
                await this.http
                    .comMethod("*", "tbdevopslog", condition)
                    .then((res) => {
                        debugger

                        //  当天唯一，不可重复
                        if (flages == 'isonly') {
                            if (res.length > 0) {
                                this.$message.error("表单已存在，请不要重复添加");
                                return;
                            } else {
                                // 月运维
                                if (this.actTask == 2) {

                                    this.yunweiloginfo('ischeck', 1);
                                }
                                // 季度运维
                                else if (this.actTask == 3) {

                                    this.yunweiloginfo('ischeck', 2);
                                } else if (this.actTask == 1) {
                                    this.myAddyunwei();

                                }
                                // 其他运维
                                else if (this.actTask == 4) {
                                    this.myAddyunwei();

                                }
                            }
                        }
                        // 月判断周，季度判断月
                        else {
                            if (res.length == 0 && yunweiactTasklogs == 1) {
                                this.$message.error("请先添写周运维表单");
                                return;
                            }
                            if (res.length == 0 && yunweiactTasklogs == 2) {
                                this.$message.error("请先添写月运维表单");
                                return;
                            }
                            else {
                                debugger
                                this.myAddyunwei();
                            }
                        }


                    })
                    .catch((res) => {
                        console.log(res);
                    });

            },
            funIsOnly() {
                debugger
                // 周运维
                if (this.actTask == 1) {
                    this.yunweiloginfo('isonly', 1);
                }
                // 月运维
                else if (this.actTask == 2) {
                    this.yunweiloginfo('isonly', 2);
                }
                // 季度运维
                else if (this.actTask == 3) {
                    this.yunweiloginfo('isonly', 3);
                } // 季度运维
                else if (this.actTask == 4) {
                    this.yunweiloginfo('isonly', 4);
                }
            },
            // 添加运维日志
            addYunWeilog() {
                debugger
                // let arrData = [];
                // arrData.push(this.YunWeiFormData);
                this.dateValue = [
                    moment().format("YYYY-MM-DD 00:00:00"),
                    moment().format("YYYY-MM-DD HH:mm:ss"),
                ];

                this.Address = document.getElementById("PointName").value;
                this.Enterprise = document.getElementById("CompanyName").value;
                this.Company = document.getElementById("YunWeiCompanyName").value;
                this.funIsOnly();
            },
            // 运维记录入库方法
            myAddyunwei() {
                this.DevOpsNum = ""; //运维单号
                let datestr = moment().format("YYYYMMDD")
                this.DevOpsNum = datestr + this.MathRand();

                for (var i = 0; i < this.YunWeiFormData.length; i++) {
                    var ywItemMode = {
                        DevOpsNum: this.DevOpsNum,
                        ItemID: this.YunWeiFormData[i].ItemID,
                        Status: this.YunWeiFormData[i].Status,
                        Remark: this.YunWeiFormData[i].Remark
                    };
                    if (this.YunWeiFormData[i].Status < 0) {
                        this.$message.error("请检查运维项目是否填写完整");
                        return;
                    }
                }
                if (this.YunWeiFormDataRemark == '' || this.YunWeiFormDataRemark == null) {
                    this.$message.error("请检查巡检异常备注是否填写");
                    return;
                };

                this.http
                    .post("/adddevopsLogData", {
                        DevOpsNum: this.DevOpsNum,
                        TaskID: this.actTask,
                        remark: this.YunWeiFormDataRemark,
                        DevOpsPerson: this.userName,
                        LastTime: this.lastYunWeiTime,
                        DeviceName: this.DeviceName,
                        ModelNum: this.ModelNum,
                        DeviceNo: this.DeviceNo,
                        Address: this.Address,
                        Enterprise: this.Enterprise,
                        Company: this.Company,
                        Summary: this.Summary,
                    })
                    .then((res) => {
                        // setTimeout(() => {
                        this.pictLoading = false;
                        // }, 1000);
                        if (res.affectedRows > 0) {
                            this.$message.success("添加成功");
                            this.yunweiModel = false;
                            this.dateValue = [
                                moment(new Date() - 1000 * 3600 * 24 * 30).format("YYYY-MM-DD HH:mm:ss"),
                                moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                            ];
                            debugger
                            if (this.actTask < 4) {
                                let yunWeiUpdateTime = this.yunweiUpdateTime.filter(m => m.ID == this.actTask)[0];
                                debugger
                                this.updateYunWeiTime(yunWeiUpdateTime)
                            }

                            this.inquire();
                            let operator = '添加运维记录';
                            let ywMode = {
                                DevOpsNum: this.DevOpsNum,
                                TaskID: this.actTask,
                                remark: this.YunWeiFormDataRemark,
                                DevOpsPerson: this.userName,
                                LastTime: this.lastYunWeiTime,
                            }
                            let cmdargs = JSON.stringify(ywMode);
                            // this.addlog(operator, cmdargs)
                            this.http.addLog(operator, cmdargs, true);

                        } else {
                            this.$message.error("添加失败");
                        }
                    })
                    .catch((res) => {
                        let that = this;
                        setTimeout(() => {
                            that.pictLoading = false;
                        }, 1000);
                        // console.log(res);
                        that.$message.error(res);
                    });
                // 添加运维子项
                for (var i = 0; i < this.YunWeiFormData.length; i++) {
                    var ywItemMode = {
                        DevOpsNum: this.DevOpsNum,
                        ItemID: this.YunWeiFormData[i].ItemID,
                        Status: this.YunWeiFormData[i].Status,
                        Remark: this.YunWeiFormData[i].Remark
                    };

                    this.http
                        .post("/adddevopsLogdetailData", {
                            DevOpsNum: this.DevOpsNum,
                            ItemID: this.YunWeiFormData[i].ItemID,
                            Status: this.YunWeiFormData[i].Status,
                            Remark: this.YunWeiFormData[i].Remark
                        })
                        .then((res) => {

                            if (res.affectedRows > 0) {
                                // this.$message.success("添加成功");
                                console.log("添加运维子项成功");
                                // this.inquire();
                                // let operator = '添加运维子项';

                                // let cmdargs = JSON.stringify(ywItemMode);
                                // this.addlog(operator, cmdargs)
                            } else {
                                this.$message.error("添加失败");
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

            },

            // 修改运维到期时间
            updateYunWeiTime(yunWeiUpdateTime) {
                debugger
                let ExpireTime = moment(new Date()).add(yunWeiUpdateTime.Cycle, "days").format("YYYY-MM-DD 00:00:00");
                let ID = yunWeiUpdateTime.ID;
                this.http
                    .post("/updatedevopstaskData", {
                        ExpireTime: ExpireTime,
                        ID: ID,
                    })
                    .then((res) => {
                        debugger
                        if (res.affectedRows > 0) {
                            // this.$message.success("更新到期时间成功");
                            console.log("更新到期时间成功");
                            debugger

                            let operator = '更新运维到期时间';
                            let updateYunWeiTimee = {
                                ExpireTime: ExpireTime,
                                ID: ID,
                            }
                            // let cmdargs = JSON.stringify(updateYunWeiTimee);
                            // this.addlog(operator, cmdargs)

                        } else {
                            // this.$message.error("更新到期时间失败");
                            console.log("更新到期时间失败");
                        }
                    })
                    .catch((res) => {
                        // console.log(res);
                        this.$message.error(res);
                    });
            },
            // 获取上次运维时间
            getLastYunWei(TaskID) {
                // select DataTime from  tbdevopslog where TaskID=1 ORDER BY DataTime DESC limit 1
                let condition = "";
                condition = "TaskID = " + TaskID + " ORDER BY DataTime DESC limit 1"
                let tabName = "tbdevopslog"
                this.http
                    .comMethod("DataTime", tabName, condition)
                    .then((res) => {

                        if (res.length != 0) {
                            // ////debugger
                            let lastTime = this.$options.filters.dateFormat(res[0].DataTime);
                            this.lastYunWeiTime = lastTime;
                        } else {
                            // this.emptyText = "暂无数据"
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 运维类型切换
            taskChange() {

                this.tableInfo = [];
                this.getYunWeiItem(this.actTask, "")
            },
            // 运维表单
            async getYunWeiItem(TaskID, DevOpsNum, flagNum) {
                debugger
                // select * from  tbdevopstaskdetail as a LEFT JOIN tbdevopsitem as b on a.ItemID=b.ID where  TaskID=1 ORDER BY SortIndex 
                this.pictYunWeiLoading = true;
                this.YunWeiForm = [];
                this.YunWeiFormData = [];
                let condition = "";
                ////debugger
                if (DevOpsNum == "") {
                    condition = "TaskID = " + TaskID + "   GROUP BY SortIndex"
                } else {
                    condition = "TaskID = " + TaskID + " and DevOpsNum='" + DevOpsNum + "' order by SortIndex"
                }

                let tabName = `tbdevopstaskdetail AS a
                    LEFT JOIN tbdevopsitem AS c ON a.ItemID = c.ID
                    LEFT JOIN tbdevopslogdetail b ON a.ItemID = b.ItemID` //" tbdevopstaskdetail as a LEFT JOIN tbdevopsitem as b on a.ItemID=b.ID"
                await this.http
                    .comMethod("c.*,a.*, IFNULL(b.Status, 0) Status,b.Remark,b.ID as tailID", tabName, condition)
                    .then((res) => {
                        let $this = this
                        setTimeout(() => {
                            $this.pictYunWeiLoading = false;
                        }, 1000);

                        if (res.length != 0) {

                            if (DevOpsNum == "") {
                                res.forEach((r) => {
                                    r.Status = -1;
                                    r.Remark = null;
                                });
                                this.YunWeiForm = res;
                                this.YunWeiFormData = res;
                            } else {
                                this.YunWeiFormData = res;
                                console.log('11111111111', this.YunWeiFormData);
                                // if (this.editshow == false) {
                                //     // this.yunWeiPrintModel = true;
                                //     this.printData();
                                // }
                                for (var i = 0; i < this.YunWeiFormData.length; i++) {
                                    this.todayYunWeiItem.push(this.YunWeiFormData[i]);
                                }
                                // debugger
                                // console.log('todayYunWeiItem', this.todayYunWeiItem);
                                // console.log('toDayLog', this.toDayLog);
                                debugger
                                console.log('this.toDayLog.length - this.otherNum=', this.toDayLog.length - this.otherNum)
                                console.log('flagNum=', flagNum)
                                if (flagNum == (this.toDayLog.length - this.otherNum - 1)) {
                                    let $this = this;
                                    const loading = this.$loading({
                                        lock: true,
                                        text: 'Loading',
                                        spinner: 'el-icon-loading',
                                        background: 'rgba(0, 0, 0, 0.7)'
                                    });
                                    // setTimeout(() => {
                                    // }, 2000);
                                    setTimeout(function () {
                                        loading.close();
                                        $this.printData();

                                    }, 1000);
                                }

                            }
                            ////debugger
                        } else {
                            // this.emptyText = "暂无数据"
                            // if (this.editshow == false) {
                            //     // this.yunWeiPrintModel = true;
                            //     this.printData();

                            // }
                        }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            },
            // 打印数据
            printData() {
                // let print = this.print;
                // this.$print(this.$parent.$refs[print]); // 使用

                this.yunWeiPrintModel = true;
                this.printList = [
                    {
                        printId: 1,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 2,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 3,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 4,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 5,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 6,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 7,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 8,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 9,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 10,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 11,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 12,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 13,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 14,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 15,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 16,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 17,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 18,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 19,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 20,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 21,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 22,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 23,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 24,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 25,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 26,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 27,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 28,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 29,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 30,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 31,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 32,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 33,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 34,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 35,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 36,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 37,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 38,
                        printValue: '',
                        printRemake: '',
                    },

                    {
                        printId: 39,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 40,
                        printValue: '',
                        printRemake: '',
                    },
                    {
                        printId: 41,
                        printValue: '',
                        printRemake: '',
                    }
                ]


                if (this.todayYunWeiItem.length > 0) {

                    this.printList.forEach((item) => {

                        // Item.Status = -1;
                        // Item.Remark = null;
                        for (var i = 0; i < this.todayYunWeiItem.length; i++) {
                            let printStatus = '';
                            if (this.todayYunWeiItem[i].Status > -1) {
                                if (this.todayYunWeiItem[i].OptItems == 1) {
                                    printStatus = this.todayYunWeiItem[i].Status == 0 ? '异常' : '正常';
                                } else if (this.todayYunWeiItem[i].OptItems == 2) {
                                    printStatus = this.todayYunWeiItem[i].Status == 0 ? '否' : '是';
                                }
                            }


                            if (item.printId == this.todayYunWeiItem[i].ID) {

                                item.printValue = printStatus;
                                item.printRemake = this.todayYunWeiItem[i].Remark;
                            }
                        }

                    })
                    console.log('printList', this.printList);

                }
            },
            // 运维
            fundevopInfo(val) {
                if (val == "1") {
                    return "周运维";
                } else if (val == "2") {
                    return "月运维";
                } else if (val == "3") {
                    return "季度运维";
                } else if (val == "4") {
                    return "其他运维";
                }
            },
            // 运维id
            fundevopId(val) {
                if (val == "周运维") {
                    return "1";
                } else if (val == "月运维") {
                    return "2";
                } else if (val == "季度运维") {
                    return "3";
                } else if (val == "其他运维") {
                    return "4";
                }
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

            // 分页
            currentPage(val) {
                this.page = val;
                this.inquire()
            },
            changeSize(val) {
                this.size = val;
                this.inquire()
            },
        },
    };
</script>
<style>
    .btn {
        font-size: 14px;
        color: #4a92ff;
        cursor: pointer;
    }

    .el-radio {
        min-width: 52px !important;
    }

    .el-radio__label {
        color: #cccccc !important;
    }

    .el-input__inner {
        color: #cccccc !important;
    }

    /* 时间框显示 */
    .el-date-range-picker__time-header .el-input__inner {
        color: #000 !important;
    }


    @media only screen and (max-width: 1024px) {
        .el-col-md-6 {
            width: 40% !important;
        }

        .el-col-sm-7 {
            width: 35% !important;

        }
    }

    .rowdiv {
        height: 28px;
        margin: 0px 0px 20px 0px;
    }

    .rowdiv .el-col-4 {
        color: #cccccc;
        text-align: right;
        line-height: 28px;
        font-size: 14px;
        padding-right: 15px
    }

    .rowdiv .el-col-5 {
        color: #cccccc;
        text-align: right;
        line-height: 28px;
        font-size: 14px;
        padding-right: 15px
    }

    .rowdiv .el-select {
        width: 100%;
    }

    .rowdiv .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;

    }

    .el-radio {
        color: #cccccc;
    }

    .el-input__inner {
        color: #cccccc;

    }

    .div-ywdialog .el-dialog__body {
        height: calc(100vh - 390px);
        overflow: auto;
    }

    .div-ywdialog table {
        width: 100%;
        text-align: center;
        color: #cccccc;
        border-collapse: collapse;
    }

    .div-ywdialog table tr {
        color: #cccccc !important;
    }

    .div-ywdialog table tr {
        background-color: #35415a;
        height: 32px;
        line-height: 32px;
    }

    .div-ywdialog table tr:nth-child(odd) {
        background-color: #293244;
    }

    .div-ywdialog table tr td {
        width: 200px;
        border-right: 1px solid #3c4860;
    }

    .div-ywdialog table tr td .el-input__inner {
        color: #cccccc;

    }

    /* .div-ywdialog-more table tr td {
        width: 200px;
        border-right: 1px solid #3c4860;
        text-align: left;
        padding-left: 10px;
    } */

    .c-red {
        color: #da666e;
    }
</style>