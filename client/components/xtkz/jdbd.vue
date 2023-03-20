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
                                    :clearable="false" unlink-panels style="width:78%" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd HH:mm:ss" size="small" @change="inquire"></el-date-picker>
                            </el-col>
                            <el-col :sm="6" :xs="6" :md="5" :xl="4">
                                <label class="rwlx">因子</label>
                                <el-select v-model="taskType" size="small" style="width:73%" placeholder="请选择"
                                    @change="Alarmfactor">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :sm="6" :xs="6" :md="5" :xl="4">
                                <label class="rwlx">数据类型</label>
                                <el-select v-model="bddataType" size="small" style="width: 60%" placeholder="请选择"
                                    @change="Alarmfactor">
                                    <el-option v-for="item in bddataTypeList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :sm="6" :xs="6" :md="5" :xl="4">
                                <label class="rwlx">对比结果</label>
                                <el-select v-model="result" size="small" style="width: 60%" placeholder="请选择"
                                    @change="Alarmfactor">
                                    <el-option v-for="item in resultOptions" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>

                            <!-- <el-col :sm="3" :xs="3" :md="4" :xl="4"> -->
                            <el-button type="primary" size="small" @click="addBiDuiinfo">添加</el-button>

                            <!-- </el-col> -->
                            <!-- <el-button type="primary" size="small" style="float: right" @click="getExcel">导出</el-button> -->

                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">

                <el-table :data="tableData" v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)"
                    element-loading-text="数据正在加载中" :header-cell-style="{
              'background-color': '#384565',
            }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">
                    <el-table-column label="时间" align="center" prop="DataTime" width="180">
                    </el-table-column>
                    <el-table-column label="因子" align="center" prop="PolId" width="100">
                    </el-table-column>

                    <el-table-column label="数据类型" align="center" prop="DataType" width="80">
                    </el-table-column>
                    <el-table-column label="测量周期" align="center" prop="TestOrder" width="110">
                    </el-table-column>
                    <el-table-column label="仪器测量数据" align="center" prop="AutoValue" width="110">
                    </el-table-column>
                    <!-- <el-table-column label="报警类型" prop="Type"> </el-table-column> -->
                    <el-table-column label="实验室数据" align="center" prop="ManualValue" width="100">
                    </el-table-column>
                    <el-table-column label="偏差" align="left" prop="CompareValue" width="150">
                    </el-table-column>
                    <el-table-column label="对比结果" align="left" prop="CompareResult">
                        <template slot-scope="scope">
                            <span style="color: #6ad2c2;"
                                v-if="scope.row.CompareResult=='合格'">{{scope.row.CompareResult}}
                            </span>
                            <span style="color: #da666e;" v-else>{{scope.row.CompareResult}}
                            </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="图片" align="left" prop="ImgUrl">
                        <template slot-scope="scope">
                            <span @click="selPic(scope.row)" v-if="scope.row.ImgUrl!=''&&scope.row.ImgUrl!=null"
                                style="cursor: pointer;color:#4a92ff">
                                查看大图
                            </span>
                            <span v-else>
                                暂无图片
                            </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作" align="left" width="80" fixed="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.DataType=='标样数据'" class="btn" size="mini"
                                @click="comparison(scope.row)">编辑
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pageNations">
                    <el-pagination @current-change="currentPage" class="pageNation"
                        layout="total,sizes,prev, pager, next" :page-size="size" :page-sizes="[5, 10, 20, 30, 50]"
                        @size-change="changeSize" :current-page="page" :total="total">
                    </el-pagination>

                    <!-- <excel @click="getexcel" :excelTitleName='excelTitleName' :exportHeader='exportHeader'
                        :exportFilterVal='exportFilterVal' :exportList='exportList'></excel> -->

                    <el-button type="primary" size="small" @click="printBiDuiList"
                        style="float: left;margin-top: 8px;margin-left: 15px;">打印</el-button>

                </div>

                <!-- </div> -->
            </div>
        </div>
        <printShuiYangBiDui ref="child" :ShuiYangModel.sync='ShuiYangPrintModel' :PrintBiDuiList="PrintBiDuiData"
            :printbiDuiTimes="printbiDuiTime"></printShuiYangBiDui>
        <!-- 打印 -->
        <template class="dialogBox">
            <el-dialog title="选择打印数据" :visible.sync="conditionModel" width="500px" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div class="dialogBody">
                    <el-row class="rowdiv">
                        <el-col :span="5">
                            比对时间
                        </el-col>
                        <el-col :span="12">

                            <el-date-picker v-model="printbiDuiTime" type="date" value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd" size="small" unlink-panels >
                                <!-- value-format="yyyy-MM-dd HH" -->
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="rowdiv">
                        <el-col :span="5">
                            因子
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="printPolId" size="small" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>

                        </el-col>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="24" style="margin-top:20px ;">
                            <el-button size="small" @click="conditionModel = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="getPrintBiDuiData">查 看</el-button>
                        </el-col>

                    </el-row>
                </div>
            </el-dialog>
        </template>
        <!-- 图片 -->
        <template class="dialogBoxs">
            <el-dialog title="图片显示" :visible.sync="picdialog" width="60%" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <el-carousel indicator-position="outside" autoplay="false" loop="false" interval="900000">
                    <el-carousel-item v-for="item in imgPaths" :key="item">
                        <!-- <el-image style="height: 100%; width: 100%" :src="item" fit="scale-down"></el-image>
                 -->
                        <img :src="item" style="height: 400px; width: 400px" />
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
        </template>
        <!-- 修改 -->
        <template class="dialogBox">
            <el-dialog title="修改比对记录" :visible.sync="editCompare" width="80%" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div class="dialogBody">

                    <el-row class="rowdiv">
                        <el-col :span="4">
                            监测因子
                        </el-col>
                        <el-col :span="9">
                            <el-input readonly size="small" placeholder="请输入" v-model="biDuiModel.PolId"
                                style=" color: #fff;">

                            </el-input>
                        </el-col>

                    </el-row>
                    <el-row class="rowdiv">
                        <el-col :span="4">
                            数据类型
                        </el-col>
                        <el-col :span="9">
                            <el-input readonly size="small" placeholder="请输入" v-model="biDuiModel.DataType"
                                style=" color: #fff;">

                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="rowdiv">
                        <el-col :span="4">
                            测量周期
                        </el-col>
                        <el-col :span="9">
                            <el-input readonly size="small" placeholder="请输入" v-model="biDuiModel.TestOrder"
                                style=" color: #fff;">

                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="rowdiv">
                        <el-col :span="4">
                            仪器监测数据
                        </el-col>
                        <el-col :span="9">
                            <el-input type="number" size="small" placeholder="请输入" v-model="biDuiModel.AutoValue"
                                style=" color: #fff;" readonly>

                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="rowdiv">
                        <el-col :span="4">
                            实验室数据
                        </el-col>
                        <el-col :span="9">
                            <el-input type="number" size="small" placeholder="请输入" v-model="biDuiModel.ManualValue"
                                style=" color: #fff;">

                            </el-input>
                        </el-col>

                    </el-row>
                    <!-- <el-row class="rowdiv"> -->
                    <!-- <el-form-item label="上传图片"> -->
                    <!-- <el-row class="rowdiv">
                        <el-col :span="4">
                            附件
                        </el-col>
                        <el-col :span="15">
                            <template>

                                <el-upload ref="upload" action="#" :http-request="uploadProductPics"
                                    :before-upload="uploadProductPicBefore" accept="image/*" list-type="picture-card"
                                    :on-preview="handleContImgPreview" :on-remove="updateImgRemove" multiple :limit="9"
                                    :on-exceed="exceedTips" :file-list="fileListes">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true"
                                    :close-on-click-modal="false">
                                    <img width="100%" :src="dialogContImgUrl" alt />
                                </el-dialog>
                            </template>

                        </el-col>

                    </el-row> -->

                    <!-- </el-row> -->


                </div>
                <div slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="24" style="margin-top:20px ;">
                            <el-button size="small" @click="editCompare = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="EditQuart">确 定</el-button>
                        </el-col>

                    </el-row>
                </div>
            </el-dialog>
        </template>
        <!-- 添加 -->
        <template class="dialogBox">
            <el-dialog title="添加比对记录" :visible.sync="addCompare" width="85%" :modal-append-to-body='false'
                :close-on-click-modal="false">
                <div class="dialogBody">
                    <el-row class="rowdiv">
                        <el-col :span="7">
                            比对时间
                        </el-col>
                        <el-col :span="5">

                            <el-date-picker v-model="biDuiTime" type="date" value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd" size="small" unlink-panels @change="Timechange">
                                <!-- value-format="yyyy-MM-dd HH" -->
                            </el-date-picker>
                        </el-col>
                        <el-col :span="7">
                            监测因子
                        </el-col>
                        <el-col :span="5">
                            <el-select v-model="PolId" size="small" placeholder="请选择" @change="PolIdchange">
                                <el-option v-for="item in PolIdList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>

                    </el-row>
                    <template v-if="PolId=='w21011'||PolId=='w21001'||PolId=='w21003'||PolId=='w01018' ">
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                数据类型
                            </el-col>
                            <el-col :span="5">
                                <el-select v-model="bdmodeldataType" size="small" placeholder="请选择">
                                    <el-option v-for="item in bddmodeldataTypeList" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <!-- <el-row class="rowdiv">
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                水样测量数据一:
                            </el-col>
                            <el-col :span="7" v-else>
                                标样核查数据一:
                            </el-col>
                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-select v-model="biDuiList.shuiYang1" size="small" placeholder="请选择">
                                    <el-option v-for="item in shuiYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" v-else>
                                <el-select v-model="biDuiList.biaoYang1" size="small" placeholder="请选择">
                                    <el-option v-for="item in biaoYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                水样测量数据二:
                            </el-col>
                            <el-col :span="7" v-else>
                                标样核查数据二:
                            </el-col>
                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-select v-model="biDuiList.shuiYang2" size="small" placeholder="请选择">
                                    <el-option v-for="item in shuiYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>

                            <el-col :span="5" v-else>
                                <el-select v-model="biDuiList.biaoYang2" size="small" placeholder="请选择">
                                    <el-option v-for="item in biaoYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                水样测量数据三:
                            </el-col>
                            <el-col :span="7" v-else>
                                标样核查(手工):
                            </el-col>
                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-select v-model="biDuiList.shuiYang3" size="small" placeholder="请选择">
                                    <el-option v-for="item in shuiYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" v-else>
                                <el-input type="number" v-model="biDuiList.biaoYang" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv" v-if="bdmodeldataType=='水样数据'">
                            <el-col :span="7">
                                水样测量(手工):
                            </el-col>
                            <el-col :span="5">
                                <el-input type="number" v-model="biDuiList.shuiYang" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row> -->
                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                水样测量数据一:
                            </el-col>
                            <el-col :span="7" v-else>
                                标样核查数据一:
                            </el-col>

                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-select v-model="normalForm.shuiYangData.shuiYang1" size="small" placeholder="请选择">
                                    <el-option v-for="item in shuiYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" v-else>
                                <el-select v-model="normalForm.biaoYangData.biaoYang1" size="small" placeholder="请选择">
                                    <el-option v-for="item in biaoYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                手工水样数据一:
                            </el-col>
                            <el-col :span="7" v-else>
                                手工核查数据一:
                            </el-col>
                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-input type="number" v-model="normalForm.shuiYangData.shouGong1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" v-else>
                                <el-input type="number" v-model="normalForm.biaoYangData.shouGong1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                水样测量数据二:
                            </el-col>
                            <el-col :span="7" v-else>
                                标样核查数据二:
                            </el-col>

                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-select v-model="normalForm.shuiYangData.shuiYang2" size="small" placeholder="请选择">
                                    <el-option v-for="item in shuiYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5" v-else>
                                <el-select v-model="normalForm.biaoYangData.biaoYang2" size="small" placeholder="请选择">
                                    <el-option v-for="item in biaoYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                手工水样数据二:
                            </el-col>
                            <el-col :span="7" v-else>
                                手工核查数据二:
                            </el-col>
                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-input type="number" v-model="normalForm.shuiYangData.shouGong2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" v-else>
                                <el-input type="number" v-model="normalForm.biaoYangData.shouGong2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                水样测量数据三:
                            </el-col>
                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-select v-model="normalForm.shuiYangData.shuiYang3" size="small" placeholder="请选择">
                                    <el-option v-for="item in shuiYangList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="7" v-if="bdmodeldataType=='水样数据'">
                                手工水样数据三:
                            </el-col>

                            <el-col :span="5" v-if="bdmodeldataType=='水样数据'">
                                <el-input type="number" v-model="normalForm.shuiYangData.shouGong3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-if="PolId=='w01001'||PolId=='w01010'">
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                水样测量数据一:
                            </el-col>
                            <el-col :span="5" style="text-align: left;">
                                <el-input type="number" v-model="wcForm.shuiYang" size="small" class="inputdiv"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                                <i style="width: 10%;" @click="updateWCValue" class="el-icon-refresh"></i>
                                <!-- <el-button size="small" class="updatebtn" @click="updateWCValue">
                                    更新
                                </el-button> -->
                            </el-col>
                            <el-col :span="7">
                                水样测量数据(手工):
                            </el-col>
                            <el-col :span="5">
                                <el-input type="number" v-model="wcForm.shouGong" size="small" controls-position="right"
                                    placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-if="PolId=='w00000'">
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计液位值一:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuval1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量计液位值一:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoShengval1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计液位值二:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuval2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量计液位值二:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoShengval2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计液位值三:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuval3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量计液位值三:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoShengval3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计液位值四:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuval4" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量计液位值四:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoShengval4" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计液位值五:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuval5" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量计液位值五:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoShengval5" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计液位值六:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuval6" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量计液位值六:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoShengval6" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7">
                                明渠流量计累计流量值:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.mingQuLeiJi" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7">
                                超声波明渠流量累计流量值:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;">
                                <el-input type="number" v-model="biDuiLiuLiang.chaoChengLeiJi" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>
                        <!-- <el-row class="rowdiv">
                            <el-col :span="7">
                                数据类型
                            </el-col>
                            <el-col :span="5">
                                <el-select v-model="liuliangType" size="small" placeholder="请选择">
                                    <el-option v-for="item in liuliangTypeList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值一:
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值一:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.mingQuval1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.chaoShengval1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值一(手工):
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值一(手工):
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.shouGong1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.shouGong1" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值二:
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值二:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.mingQuval2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.chaoShengval2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值二(手工):
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值二(手工):
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.shouGong2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.shouGong2" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值三:
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值三:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.mingQuval3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.chaoShengval3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值三(手工):
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值三(手工):
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.shouGong3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.shouGong3" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值四:
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值四:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.mingQuval4" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.chaoShengval4" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值四(手工):
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值四(手工):
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.shouGong4" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.shouGong4" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值五:
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值五:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.mingQuval5" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.chaoShengval5" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值五(手工):
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值五(手工):
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.shouGong5" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.shouGong5" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row>

                        <el-row class="rowdiv">
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值六:
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值六:
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.mingQuval6" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.chaoShengval6" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="7" v-if="liuliangType=='明渠流量计'">
                                明渠流量计液位值六(手工):
                            </el-col>
                            <el-col :span="7" v-else>
                                超声波明渠流量计液位值六(手工):
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-if="'明渠流量计'">
                                <el-input type="number" v-model="liuliangForm.mingQu.shouGong6" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                            <el-col :span="5" style="text-align:left ;" v-else>
                                <el-input type="number" v-model="liuliangForm.chaoSheng.shouGong6" size="small"
                                    controls-position="right" placeholder="请输入">
                                </el-input>
                            </el-col>
                        </el-row> -->
                    </template>
                    <!-- <el-row class="rowdiv"> -->
                    <!-- <el-form-item label="上传图片"> -->
                    <!-- <el-row class="rowdiv">
                        <el-col :span="7">
                            附件:
                        </el-col>
                        <el-col :span="15" style="text-align:left ;">
                            <template>
                                <el-upload ref="upload" action="#" :http-request="uploadProductPic"
                                    :before-upload="uploadProductPicBefore" accept="image/*" list-type="picture-card"
                                    :on-preview="handleContImgPreview" :on-remove="addImgRemoves" multiple :limit="9"
                                    :on-exceed="exceedTips" :file-list="fileLists">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true"
                                    :close-on-click-modal="false">
                                    <img width="100%" :src="dialogContImgUrl" alt />
                                </el-dialog>
                            </template>
                        </el-col>
                    </el-row> -->

                </div>
                <div slot="footer" class="dialog-footer">
                    <el-row>
                        <el-col :span="24" style="margin-top:20px ;">
                            <el-button size="small" @click="addCompare = false">取 消</el-button>
                            <el-button size="small" type="primary" @click="AddQuart">确 定</el-button>
                        </el-col>

                    </el-row>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
    import moment from "moment";
    // import eleTable from "../module/renderTable";
    import axios from "axios"; // 引入axios
    import excel from "../module/excel";
    import printShuiYangBiDui from "../module/printShuiYangBiDui";

    export default {
        name: "jdbd",
        components: { excel, printShuiYangBiDui },
        data() {
            let jcyzQuery = [
                { value: "", label: "全部" },
                { value: "w00000", label: "流量" },
            ]
            let PolIdQuery = [{ value: "w00000", label: "流量" },]
            let MetersData = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) => m.ID != 'realFlow' && m.ID != 'CumulativeFlow' && m.ID != 'DaQiWenDu' && m.ID != 'DaQiShiDu');
            MetersData.map(function (item, index) {
                let obj = {
                    value: item.Code,
                    label: item.Name
                }
                // 季度比对筛选
                if (item.Name != "藻密度" && item.Name != "叶绿素") {
                    jcyzQuery.push(obj);
                    PolIdQuery.push(obj);
                }
            })


            return {
                ShuiYangPrintModel: false,
                conditionModel: false,
                printbiDuiTime: moment(new Date()).format("YYYY-MM-DD"), //打印日期
                printPolId: '',//打印因子
                PrintBiDuiData: [],

                emptyText: "暂无数据",
                SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
                dateValue: [
                    moment(new Date() - 1000 * 3600 * 24 * 3).format("YYYY-MM-DD  00:00:00"),
                    moment(new Date()).format("YYYY-MM-DD  23:59:59"),
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
                options: jcyzQuery,
                PolIdList: PolIdQuery,
                taskType: "",

                PolId: "w21001",
                result: "",
                resultOptions: [
                    {
                        value: "",
                        label: "全部",
                    },
                    {
                        value: "0",
                        label: "不合格",
                    },
                    {
                        value: "1",
                        label: "合格",
                    }

                ],
                bddataType: '',
                bddataTypeList: [
                    {
                        value: "",
                        label: "全部",
                    },

                    {
                        value: "1",
                        label: "水样数据",
                    }
                    ,
                    {
                        value: "2",
                        label: "标样数据",
                    },
                    {
                        value: "3",
                        label: "水温数据",
                    },
                    {
                        value: "4",
                        label: "流量数据",
                    },
                    {
                        value: "5",
                        label: "液位数据",
                    }
                ],
                tableData: [],
                excelTitleName: '手工比对_', //excel标题名字
                exportHeader: [], //导出 字段表头
                exportFilterVal: [], //表头对应字段
                exportList: [],//excel数据
                total: 0,
                page: 1,
                size: 30,
                pictLoading: false,
                tableHeight: null,
                editCompare: false,
                biDuiTime: moment(new Date()).format("YYYY-MM-DD"),//比对时间

                picList: [],
                fileLists: [],
                fileListes: [],
                fileList: [],
                imgPaths: [],
                picdialog: false,
                dialogImageUrl: [],
                dialogContImgVisible: false,
                dialogContImgUrl: false,
                imageList: [],
                images: '',

                biDuiModel: {
                    ID: "",
                    PolId: "",
                    DataType: '',
                    TestOrder: '',
                    AutoValue: '',
                    ManualValue: ""
                },

                shuiYangList: [],//当前水样数据集合
                biaoYangList: [],//当前标样核查数据集合

                addCompare: false,
                // 常规参数设置
                bdmodeldataType: '水样数据',
                bddmodeldataTypeList: [
                    {
                        value: "水样数据",
                        label: "水样数据",
                    }
                    ,
                    {
                        value: "标样数据",
                        label: "标样数据",
                    }
                ],
                // 流量比对类型
                liuliangType: '明渠流量计',
                liuliangTypeList: [
                    {
                        value: "明渠流量计",
                        label: "明渠流量计",
                    }
                    ,
                    {
                        value: "超声波流量计",
                        label: "超声波流量计",
                    }
                ],
                normalForm: {
                    shuiYangData: {
                        shuiYang1: 0,
                        shuiYang2: 0,
                        shuiYang3: 0,
                        shouGong1: 0,
                        shouGong2: 0,
                        shouGong3: 0,
                    },
                    biaoYangData: {
                        biaoYang1: 0,
                        biaoYang2: 0,
                        shouGong1: 0,
                        shouGong2: 0,
                    }
                },
                wcForm: {
                    shuiYang: 0,
                    shouGong: 0
                },//ph和水温
                liuliangForm: {
                    mingQu: {
                        mingQuval1: 0,
                        mingQuval2: 0,
                        mingQuval3: 0,
                        mingQuval4: 0,
                        mingQuval5: 0,
                        mingQuval6: 0,
                        shouGong1: 0,
                        shouGong2: 0,
                        shouGong3: 0,
                        shouGong4: 0,
                        shouGong5: 0,
                        shouGong6: 0,
                    },
                    chaoSheng: {
                        chaoShengval1: 0,
                        chaoShengval2: 0,
                        chaoShengval3: 0,
                        chaoShengval4: 0,
                        chaoShengval5: 0,
                        chaoShengval6: 0,
                        shouGong1: 0,
                        shouGong2: 0,
                        shouGong3: 0,
                        shouGong4: 0,
                        shouGong5: 0,
                        shouGong6: 0
                    }
                },
                wcDataTime: moment(new Date()).format("YYYY-MM-DD  HH:mm:ss"),
                compareArray: [],

                biDuiList: {
                    shuiYang1: 0,
                    shuiYang2: 0,
                    shuiYang3: 0,
                    biaoYang1: 0,
                    biaoYang2: 0,
                    shuiYang: 0,
                    biaoYang: 0
                },//四参数
                biDuiph: {
                    yibiao: 0,
                    shouGong: 0
                },//ph和水温
                biDuiLiuLiang: {
                    mingQuval1: 0,
                    mingQuval2: 0,
                    mingQuval3: 0,
                    mingQuval4: 0,
                    mingQuval5: 0,
                    mingQuval6: 0,
                    chaoShengval1: 0,
                    chaoShengval2: 0,
                    chaoShengval3: 0,
                    chaoShengval4: 0,
                    chaoShengval5: 0,
                    chaoShengval6: 0,
                    mingQuLeiJi: 0,
                    chaoChengLeiJi: 0
                },//流量

            };
        },
        mounted() {
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
            getHeight() {
                this.tableHeight = window.innerHeight - 226
            },
            //  打印比对记录
            printBiDuiList() {
                this.conditionModel = true;
                // this.getPrintBiDuiData(this.printbiDuiTime, this.printPolId);
            },
            // 查看打印数据
            getPrintBiDuiData() {
                this.ShuiYangPrintModel=true;
                this.$refs.child.getData(this.printbiDuiTime, this.printPolId);
            },

            // 查询比对数据
            inquire() {
                this.pictLoading = true;
                this.emptyText = " "
                debugger

                if (
                    parseInt(new Date(this.dateValue[1]) - new Date(this.dateValue[0])) /
                    (1000 * 60 * 60 * 24) >
                    100
                ) {
                    this.pictLoading = false;
                    this.tableData = []
                    this.emptyText = "暂无数据"
                    this.$message({
                        message: "时间不能大于100天",
                        type: "warning",
                        duration: 2000,
                    });
                    return;
                }
                if (this.dateValue == null) {
                    this.pictLoading = false;
                    this.tableData = []
                    this.emptyText = "暂无数据"
                }

                this.tableData = [];
                let condition = "";
                condition = "DataTime BETWEEN '" + this.dateValue[0] + "' and '" + this.dateValue[1] + "' "

                if (this.taskType != "") {
                    condition = condition +
                        "and PolId='" + this.taskType + "'"
                }
                if (this.bddataType != '') {
                    condition = condition +
                        "and DataType='" + this.bddataType + "'"
                }
                if (this.result != "") {
                    condition = condition +
                        "and CompareResult='" + this.result + "'"

                }
                let nowpage = "";
                nowpage = (this.page - 1) * this.size;
                let query = "`tbquartercompare` INNER JOIN  (SELECT id from `tbquartercompare` where " + condition + "  ORDER BY `DataTime` DESC LIMIT " + nowpage + "," + this.size + ")AS b USING(id) "

                this.exportHeader = ['时间', '因子', '数据类型', '测量周期', '仪器测量数据 ', '实验室数据', '偏差', '比对结果']; //导出 字段表头
                this.exportFilterVal = ['DataTime', 'PolId', 'DataType', 'TestOrder', 'AutoValue', 'ManualValue', 'CompareValue', "CompareResult"]; //表头对应字段
                // console.log("condition", condition);
                let querylist = "`ID`,`DataTime`,`PolId`,`AutoValue`,`DataType`,`TestOrder`, `ManualValue` ,`CompareValue`,`CompareResult`,`ImgUrl`"


                this.http
                    // .comMethod(querylist, query, "")
                    .get("/gettbquartercompare", {
                        comdition: query,
                    })

                    .then((res) => {
                        this.pictLoading = false;
                        if (res.length != 0) {
                            res.forEach((r) => {
                                r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                                // r["PolId"] = this.funfactor(r["PolId"]);
                                r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]); //this.funfactor(r["PolId"]);
                                r["DataType"] = this.funDataType(r["DataType"]);

                                if (r["PolId"] == 'pH值') {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2)
                                }
                                else if (r["PolId"] == '水温') {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + "℃";
                                }
                                else if (r["PolId"] == '流量' && r["DataType"] == '液位数据') {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + "mm";
                                }
                                else if (r["PolId"] == '总磷' && r["DataType"] == '水样数据' && r["AutoValue"] < 0.4) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + " mg/L";

                                }
                                else if (r["PolId"] == '总氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + " mg/L";

                                }
                                else if (r["PolId"] == '氨氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + " mg/L";

                                }
                                else if (r["PolId"] == '化学需氧量' && r["DataType"] == '水样数据' && r["AutoValue"] < 30) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + " mg/L";
                                }
                                else {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + "%";

                                }

                                r["TestOrder"] = this.funTestOrder(r["DataType"], r["TestOrder"]);
                                r["CompareResult"] = r["CompareResult"] == 0 ? '不合格' : '合格';// this.funResult(r["CompareResult"]);

                            });
                            // this.total = res.length;
                            //表格数据
                            this.tableData = res;//.reverse()
                            // this.exportList = this.tableData;

                        } else {
                            this.emptyText = "暂无数据"
                            this.tableData = []
                            this.total = 0;
                        }
                    })
                    .catch((res) => {
                        // console.log(res);
                        setTimeout(() => {
                            this.pictLoading = false;
                            this.emptyText = "暂无数据"

                        }, 1000);
                    });

                this.http
                    .comMethod("count(*)", "tbquartercompare", condition)
                    .then((res) => {
                        this.total = 0;

                        this.total = res[0]["count(*)"];
                    })
                    .catch((res) => {
                        // console.log(res);
                        this.pictLoading = false;
                        this.emptyText = "暂无数据";
                    });
                let tabName = "tbquartercompare";
                let excelCondition = condition + "ORDER BY `DataTime` DESC"
                this.getexcel(querylist, tabName, excelCondition);

            },

            // 打开季度比对模态框
            addBiDuiinfo() {
                this.addCompare = true;
                this.resetForm();
                // 加载数据
                this.Timechange()
            },
            //重置表单
            resetForm() {
                // 清空图片
                this.emptyUpload();
                this.fileListes = [];

                // this.PolId="w21001";
                //四参数
                this.normalForm = {
                    shuiYangData: {
                        shuiYang1: 0,
                        shuiYang2: 0,
                        shuiYang3: 0,
                        shouGong1: 0,
                        shouGong2: 0,
                        shouGong3: 0,
                    },
                    biaoYangData: {
                        biaoYang1: 0,
                        biaoYang2: 0,
                        shouGong1: 0,
                        shouGong2: 0,
                    }
                },
                    //ph和水温
                    this.wcForm = {
                        shuiYang: 0,
                        shouGong: 0
                    },//ph和水温
                    // 液位和流量
                    this.biDuiLiuLiang = {
                        mingQuval1: 0,
                        mingQuval2: 0,
                        mingQuval3: 0,
                        mingQuval4: 0,
                        mingQuval5: 0,
                        mingQuval6: 0,
                        chaoShengval1: 0,
                        chaoShengval2: 0,
                        chaoShengval3: 0,
                        chaoShengval4: 0,
                        chaoShengval5: 0,
                        chaoShengval6: 0,
                        mingQuLeiJi: 0,
                        chaoChengLeiJi: 0
                    };//流量
            },

            // 切换日期
            Timechange() {
                this.biDuiList.shuiYang1 = 0;
                this.biDuiList.shuiYang2 = 0;
                this.biDuiList.shuiYang3 = 0;
                this.biDuiList.biaoYang1 = 0;
                this.biDuiList.biaoYang2 = 0;


                this.getzkData('水样测量', this.biDuiTime);
                this.getzkData('标样核查', this.biDuiTime);

            },
            // 获取常规四参数小时数据
            async getzkData(dataName, dayTime) {
                this.shuiYangList = [];
                this.biaoYangList = [];
                // let tableName =dataName
                let condition = " Pol='" + this.PolId + "' and DataTime LIKE '" + moment(dayTime).format('YYYY-MM-DD') + "%'  order by DataTime ";

                await this.http
                    .comMethod('*', dataName, condition)
                    .then((res) => {
                        if (res.length != 0) {
                            //表格数据
                            res.forEach((r) => {
                                // r.Check = r.Check == null ? "--" : r.Check;
                                r.DataTime = this.$options.filters.dateFormat(r.DataTime);

                                r.Pol = r.Pol == null ? "--" : this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]); //this.funfactor(r.Pol);

                                let obj = {};
                                if (dataName == '水样测量') {
                                    obj.value = r.DataTime.substring(11, r.DataTime.length - 3) + ',' + r.Avg.toFixedFormat(3);
                                    obj.label = parseInt(r.DataTime.substring(11, r.DataTime.length - 3)) + '时   , ' + r.Avg.toFixedFormat(3);;
                                    this.shuiYangList.push(obj);
                                }
                                if (dataName == '标样核查') {
                                    obj.value = r.DataTime.substring(11, r.DataTime.length - 3) + ',' + r.Check.toFixedFormat(3);
                                    obj.label = parseInt(r.DataTime.substring(11, r.DataTime.length - 3)) + '时   , ' + r.Check.toFixedFormat(3);;
                                    this.biaoYangList.push(obj);
                                }

                            });

                        } else {
                            this.shuiYangList = [];
                            this.biaoYangList = [];
                        }
                        // this.jiaoZhunPrintModel = true;

                    })
                    .catch((res) => {
                        debugger
                        this.$message.error("服务端错误");
                        // console.log(res);
                    });

            },
            //  获取ph和水温最新值
            updateWCValue() {
                //  ph
                if (this.PolId == 'w01001') {
                    // this.biDuiph.yibiao = this.SDL_Global.WC.PH.LastTestData;
                    this.wcForm.shuiYang = this.SDL_Global.WC.PH.LastTestData;
                }
                //  水温
                if (this.PolId == 'w01010') {
                    // this.biDuiph.yibiao = this.SDL_Global.WC.ShuiWen.LastTestData;
                    this.wcForm.shuiYang = this.SDL_Global.WC.ShuiWen.LastTestData;
                }
                // 五参时间
                this.wcDataTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

            },
            // 批量添加比对记录
            AddQuart() {
                debugger
                this.compareArray = [];
                if (this.PolId == 'w01018' || this.PolId == 'w21003' || this.PolId == 'w21011' || this.PolId == 'w21001') {
                    // 水样
                    if (this.bdmodeldataType == '水样数据') {
                        if (this.normalForm.shuiYangData.shouGong1 == 0 || this.normalForm.shuiYangData.shouGong2 == 0 || this.normalForm.shuiYangData.shouGong3 == 0) {
                            this.$message.error("手工数据不能为0");
                            return;
                        } else {

                            this.compareArray.push(this.tpalgorithm(this.PolId, this.bdmodeldataType, this.normalForm.shuiYangData.shuiYang1.split(",")[1], this.normalForm.shuiYangData.shouGong1, 1, true, this.biDuiTime + ' ' + this.normalForm.shuiYangData.shuiYang1.split(",")[0]));
                            this.compareArray.push(this.tpalgorithm(this.PolId, this.bdmodeldataType, this.normalForm.shuiYangData.shuiYang2.split(",")[1], this.normalForm.shuiYangData.shouGong2, 2, true, this.biDuiTime + ' ' + this.normalForm.shuiYangData.shuiYang2.split(",")[0]));
                            this.compareArray.push(this.tpalgorithm(this.PolId, this.bdmodeldataType, this.normalForm.shuiYangData.shuiYang3.split(",")[1], this.normalForm.shuiYangData.shouGong3, 3, true, this.biDuiTime + ' ' + this.normalForm.shuiYangData.shuiYang3.split(",")[0]));
                            // this.tpalgorithm(this.PolId, '水样数据', this.biDuiList.shuiYang1, this.biDuiList.shuiYang, 1, true);
                            // this.tpalgorithm(this.PolId, '水样数据', this.biDuiList.shuiYang2, this.biDuiList.shuiYang, 2, true);
                            // this.tpalgorithm(this.PolId, '水样数据', this.biDuiList.shuiYang3, this.biDuiList.shuiYang, 3, true);

                        }
                    }
                    else {
                        if (this.normalForm.biaoYangData.shouGong1 == 0 || this.normalForm.biaoYangData.shouGong2 == 0) {
                            this.$message.error("手工测量不能为0");
                            return;
                        } else {
                            // 标样
                            this.compareArray.push(this.tpalgorithm(this.PolId, this.bdmodeldataType, this.normalForm.biaoYangData.biaoYang1.split(",")[1], this.normalForm.biaoYangData.shouGong1, 1, true, this.biDuiTime + ' ' + this.normalForm.biaoYangData.biaoYang1.split(",")[0]));
                            this.compareArray.push(this.tpalgorithm(this.PolId, this.bdmodeldataType, this.normalForm.biaoYangData.biaoYang2.split(",")[1], this.normalForm.biaoYangData.shouGong2, 2, true, this.biDuiTime + ' ' + this.normalForm.biaoYangData.biaoYang2.split(",")[0]));

                            // this.tpalgorithm(this.PolId, '标样数据', this.biDuiList.biaoYang1, this.biDuiList.biaoYang, 1, true);
                            // this.tpalgorithm(this.PolId, '标样数据', this.biDuiList.biaoYang2, this.biDuiList.biaoYang, 2, true);
                        }
                    }

                } else if (this.PolId == 'w01001' || this.PolId == 'w01010') {
                    // 只有水样
                    if (this.wcForm.shouGong == 0) {
                        this.$message.error("手工测量数据不能为0");
                        return;
                    } else {
                        this.compareArray.push(this.tpalgorithm(this.PolId, '水样数据', this.wcForm.shuiYang, this.wcForm.shouGong, 1, true, this.wcDataTime));
                        // this.tpalgorithm(this.PolId, '水样数据', this.biDuiph.yibiao, this.biDuiph.shouGong, 1, true);
                    }

                } else {
                    if (this.PolID == 'w00000') {
                        if (this.biDuiLiuLiang.mingQuLeiJi == 0) {
                            this.$message.error("明渠流量计累计流量值不能为0");
                            return;
                        } else {
                            // this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.wcForm.shuiYang, this.wcForm.shouGong, 1, true));

                            this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval1, this.biDuiLiuLiang.chaoShengval1, 1, true, this.biDuiTime));
                            this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval2, this.biDuiLiuLiang.chaoShengval2, 2, true, this.biDuiTime));
                            this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval3, this.biDuiLiuLiang.chaoShengval3, 3, true, this.biDuiTime));
                            this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval4, this.biDuiLiuLiang.chaoShengval4, 4, true, this.biDuiTime));
                            this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval5, this.biDuiLiuLiang.chaoShengval5, 5, true, this.biDuiTime));
                            this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval6, this.biDuiLiuLiang.chaoShengval6, 6, true, this.biDuiTime));
                            //    流量
                            this.compareArray.push(this.tpalgorithm(this.PolId, '流量数据', this.biDuiLiuLiang.mingQuLeiJi, this.biDuiLiuLiang.chaoChengLeiJi, 1, true, this.biDuiTime));
                        }
                    } else {
                        // 液位
                        this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval1, this.biDuiLiuLiang.chaoShengval1, 1, true, this.biDuiTime));
                        this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval2, this.biDuiLiuLiang.chaoShengval2, 2, true, this.biDuiTime));
                        this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval3, this.biDuiLiuLiang.chaoShengval3, 3, true, this.biDuiTime));
                        this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval4, this.biDuiLiuLiang.chaoShengval4, 4, true, this.biDuiTime));
                        this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval5, this.biDuiLiuLiang.chaoShengval5, 5, true, this.biDuiTime));
                        this.compareArray.push(this.tpalgorithm(this.PolId, '液位数据', this.biDuiLiuLiang.mingQuval6, this.biDuiLiuLiang.chaoShengval6, 6, true, this.biDuiTime));
                        // 流量
                        this.compareArray.push(this.tpalgorithm(this.PolId, '流量数据', this.biDuiLiuLiang.mingQuLeiJi, this.biDuiLiuLiang.chaoChengLeiJi, 1, true, this.biDuiTime));
                    }
                }
                this.AddCompareData(this.compareArray);


            },
            //比对误差算法
            tpalgorithm(PolID, datatype, jcVal, sgVal, TestOrder, flaginfo, bdTime) {
                var CompareValue = 0;//偏差
                var CompareResult = 0; //结果
                // DataTime: moment(jctime).format("YYYY-MM-DD HH:mm:00"),
                // PolId: this.PolId,
                // AutoValue: AutoValue.split(",")[1],
                // ManualValue: ManualValue,
                // CompareValue: CompareValue,
                // CompareResult: CompareResult,
                // DataType: DataType,
                // TestOrder: TestOrder,
                // ImgUrl: this.imageList
                let CompareModel = {
                    DataTime: bdTime,
                    PolId: PolID,
                    AutoValue: jcVal,
                    ManualValue: sgVal,
                    CompareValue: 0,
                    CompareResult: 0,
                    DataType: 0,
                    TestOrder: TestOrder,
                };
                let jcVals = 0;

                if (flaginfo) {
                    if (jcVal.indexOf(',') > -1) {
                        jcVals = jcVal.split(",")[1];
                    } else {
                        jcVals = jcVal;
                    }
                    CompareModel.AutoValue = jcVals;

                } else {
                    jcVals = jcVal;
                    CompareModel.AutoValue = jcVals;
                }

                // cod    dataType 水样数据/2:标样数据/3:水温数据/4:流量数据/5:：液位数据)
                if (CompareModel.PolID == 'w01018') {
                    CompareModel.CompareValue = (((jcVals - sgVal) / sgVal) * 100).toFixedFormat(2);// (jcVals - sgVal) / sgVal * 100;
                    if (datatype == '标样数据') {
                        if (CompareModel.CompareValue <= 10 && CompareModel.CompareValue >= -10) {
                            CompareModel.CompareResult = 1
                        } else {
                            CompareModel.CompareResult = 0
                        }
                        if (flaginfo) {
                            CompareModel.DataType = 2;
                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 2, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult)
                        }
                    } else {
                        if (sgVal < 30) {
                            CompareModel.CompareValue = jcVals - sgVal;
                            if (CompareModel.CompareValue <= 5 && CompareModel.CompareValue >= -5) {
                                CompareModel.CompareResult = 1
                            } else {
                                CompareModel.CompareResult = 0
                            }
                        } else if (sgVal < 60 && sgVal >= 30) {
                            if (CompareModel.CompareValue <= 30 && CompareModel.CompareValue >= -30) {
                                CompareModel.CompareResult = 1
                            } else {
                                CompareModel.CompareResult = 0
                            }
                        } else if (sgVal < 100 && sgVal >= 60) {
                            if (CompareModel.CompareValue <= 20 && CompareModel.CompareValue >= -20) {
                                CompareModel.CompareResult = 1
                            } else {
                                CompareModel.CompareResult = 0
                            }
                        } else {
                            if (CompareModel.CompareValue <= 15 && CompareModel.CompareValue >= -15) {
                                CompareModel.CompareResult = 1
                            } else {
                                CompareModel.CompareResult = 0
                            }
                        }
                        // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 1, TestOrder)
                        if (flaginfo) {
                            CompareModel.DataType = 1;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 1, TestOrder)
                            return CompareModel;

                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult)
                        }
                    }
                }
                // nh3 和tn
                if (PolID == 'w21003' || PolID == 'w21001') {
                    CompareModel.CompareValue = (((jcVals - sgVal) / sgVal) * 100).toFixedFormat(2);// (jcVals - sgVal) / sgVal * 100;
                    if (datatype == '标样数据') {
                        if (CompareModel.CompareValue <= 10 && CompareModel.CompareValue >= -10) {
                            CompareModel.CompareResult = 1
                        } else {
                            CompareModel.CompareResult = 0
                        }
                        if (flaginfo) {
                            CompareModel.DataType = 2;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 2, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult)
                        }
                        // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 2, TestOrder)
                    } else {
                        if (sgVal < 2) {
                            CompareModel.CompareValue = jcVals - sgVal;

                            if (CompareModel.CompareValue <= 0.3 && CompareModel.CompareValue >= -0.3) {
                                CompareModel.CompareResult = 1
                            } else {
                                CompareModel.CompareResult = 0
                            }
                        } else {
                            if (CompareModel.CompareValue <= 15 && CompareModel.CompareValue >= -15) {
                                CompareModel.CompareResult = 1
                            } else {
                                CompareModel.CompareResult = 0
                            }
                        }
                        if (flaginfo == true) {
                            CompareModel.DataType = 1;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 1, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult)
                        }
                    }
                }
                // tp
                if (PolID == 'w21011') {
                    CompareModel.CompareValue = (((jcVals - sgVal) / sgVal) * 100).toFixedFormat(2);//(jcVals - sgVal) / sgVal * 100 
                    if (datatype == '标样数据') {
                        if (CompareModel.CompareValue <= 10 && CompareModel.CompareValue >= -10) {
                            CompareModel.CompareResult = 1
                        } else {
                            CompareModel.CompareResult = 0
                        }
                        if (flaginfo == true) {
                            CompareModel.DataType = 2;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 2, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult);
                        }

                    } else {
                        if (sgVal < 0.4) {
                            CompareModel.CompareValue = jcVals - sgVal;

                            if (CompareModel.CompareValue <= 0.04 && CompareModel.CompareValue >= -0.04) {
                                CompareModel.CompareResult = 1;
                            } else {
                                CompareModel.CompareResult = 0;
                            }
                        } else {
                            if (CompareModel.CompareValue <= 15 && CompareModel.CompareValue >= -15) {
                                CompareModel.CompareResult = 1;
                            } else {
                                CompareModel.CompareResult = 0;
                            }
                        }
                        if (flaginfo == true) {
                            CompareModel.DataType = 1;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 1, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult);
                        }

                    }
                }
                // ph和水温
                if (PolID == 'w01001' || PolID == 'w01010') {
                    CompareModel.CompareValue = jcVal - sgVal;
                    if (CompareModel.CompareValue <= 0.5 && CompareModel.CompareValue >= -0.5) {
                        CompareModel.CompareResult = 1
                    } else {
                        CompareModel.CompareResult = 0
                    }
                    if (PolID == 'w01001') {

                        if (flaginfo == true) {
                            CompareModel.DataType = 1;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 1, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult);
                        }
                    } else {
                        if (flaginfo == true) {
                            CompareModel.DataType = 3;
                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 3, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult);
                        }
                    }

                }
                // 流量
                if (PolID == 'w00000') {
                    if (datatype == '液位数据') {
                        CompareModel.CompareValue = jcVal - sgVal;
                        if (CompareModel.CompareValue <= 12 && CompareModel.CompareValue >= -12) {
                            CompareModel.CompareResult = 1
                        } else {
                            CompareModel.CompareResult = 0
                        }

                        if (flaginfo == true) {
                            CompareModel.DataType = 5;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 5, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult);
                        }

                    } else {
                        CompareModel.CompareValue = (((jcVal - sgVal) / jcVal) * 100).toFixedFormat(2);
                        if (CompareModel.CompareValue <= 10 && CompareModel.CompareValue >= -10) {
                            CompareModel.CompareResult = 1;
                        } else {
                            CompareModel.CompareResult = 0;
                        }
                        if (flaginfo == true) {
                            CompareModel.DataType = 4;

                            // this.AddCompareData(jcVal, sgVal, CompareValue, CompareResult, 4, TestOrder)
                            return CompareModel;
                        } else {
                            this.editCompareData(jcVal, sgVal, CompareModel.CompareValue, CompareModel.CompareResult);
                        }

                    }
                }
            },

            // 添加季度比对
            AddCompareData(compareArray) {
                if (this.imageList.length == 0) {
                    this.imageList = '';
                }
                let $this = this;
                // if (this.PolId == 'w21011' || this.PolId == 'w21001' || this.PolId == 'w21003' || this.PolId == 'w01018') {
                //     let jctime = this.biDuiTime + ' ' + AutoValue.split(",")[0];

                // } else {
                //     let jctime = this.biDuiTime
                // }
                // let DataTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                $this.http
                    .post("/addCompareList", {
                        compareArray: JSON.stringify(compareArray)
                        // DataTime: moment(jctime).format("YYYY-MM-DD HH:mm:00"),
                        // PolId: this.PolId,
                        // AutoValue: AutoValue.split(",")[1],
                        // ManualValue: ManualValue,
                        // CompareValue: CompareValue,
                        // CompareResult: CompareResult,
                        // DataType: DataType,
                        // TestOrder: TestOrder,
                        // ImgUrl: this.imageList
                    })
                    .then((res) => {

                        // setTimeout(() => {
                        $this.pictLoading = false;
                        $this.addCompare = false
                        // }, 1000);
                        if (res.Code == 200) {
                            $this.$message.success("添加成功");

                            $this.http.addLog(`${localStorage.getItem("Loginedname")}添加季度比对数据`, JSON.stringify(compareArray));
                            $this.inquire();

                        } else {
                            inquire.$message.error("添加失败");
                        }
                    })
                    .catch((res) => {
                        setTimeout(() => {
                            this.pictLoading = false;
                        }, 1000);
                        // console.log(res);
                        this.$message.error(res);
                    });
            },


            // 单条比对数据赋值
            comparison(val) {
                this.editCompare = true;

                this.biDuiModel.PolId = val.PolId;
                this.biDuiModel.DataType = val.DataType;
                this.biDuiModel.TestOrder = val.TestOrder;
                this.biDuiModel.AutoValue = val.AutoValue;
                this.biDuiModel.ManualValue = val.ManualValue;
                this.biDuiModel.ID = val.ID;
                this.fileListes = [];
                this.imageList = "";
                this.picList = [];
                //debugger
                if (val.ImgUrl.toString().trim() != '' && val.ImgUrl != null) {
                    this.dialogImageUrl = val.ImgUrl
                    // let locatIndex = window.location.href.indexOf('#');
                    // let httpUrls = window.location.href.substring(0, locatIndex);


                    for (var i = 0; i < this.dialogImageUrl.length; i++) {
                        let flie1 = {
                            name: '11',
                            url: this.dialogImageUrl[i]
                        }
                        this.fileListes.push(flie1);
                    }
                }
                console.log('翻填图片', this.fileListes);
            },

            // 编辑模块
            EditQuart() {

                // this.socketApi.globalDataConfig.getCodeData this.funfactorName(this.biDuiModel.PolId)
                this.tpalgorithm(this.socketApi.globalDataConfig.getCodeData(this.biDuiModel.PolId), this.biDuiModel.DataType, this.biDuiModel.AutoValue, this.biDuiModel.ManualValue, this.biDuiModel.TestOrder, false);
            },
            // 修改比对数据
            editCompareData(jcVal, sgVal, CompareValue, CompareResult) {

                // let formData1 = new FormData();

                // let files = this.picList;
                // console.log('files', this.picList);
                this.images = "";
                console.log('imageList', this.imageList);
                if (this.imageList.length > 0) {
                    this.imageList = this.imageList.split(';');
                }
                console.log('imageList', this.imageList);

                for (let k = 0; k < this.imageList.length; k++) {
                    if (this.imageList[k] != '') {
                        this.images += this.imageList[k] + ';';
                    }

                }
                // //编辑时图片
                let files1 = this.fileListes;
                console.log('files1', files1);

                // this.imageList="";
                //debugger
                for (let i = 0; i < files1.length; i++) {
                    debugger
                    //this.socketApi.globalDataConfig.getCodeData  this.funfactorName(this.biDuiModel.PolId)
                    this.images += this.socketApi.globalDataConfig.getCodeData(this.biDuiModel.PolId) + '/' + files1[i].url.substring(files1[i].url.lastIndexOf('/') + 1, files1[i].url.length) + ";"
                    // formData1.append("file2", files1[i].url.substring(files1[i].url.lastIndexOf('/') + 1, files1[i].url.length));
                }
                //debugger
                // let UpdateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                this.http
                    .post("/updateCompare", {
                        AutoValue: jcVal,
                        ManualValue: sgVal,
                        CompareValue: CompareValue,
                        CompareResult: CompareResult,
                        ImgUrl: this.images,
                        ID: this.biDuiModel.ID,
                    })
                    .then((res) => {

                        this.imageList = "";

                        // setTimeout(() => {
                        this.pictLoading = false;
                        // }, 1000);
                        this.editCompare = false;

                        if (res.affectedRows > 0) {
                            this.$message.success("修改成功");
                            this.inquire();
                            let operator = '更新手工比对数据';
                            let cmdargs = JSON.stringify(this.biDuiModel);
                            // this.addlog(operator, cmdargs)
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

            },

            //  切换因子选择
            PolIdchange() {
                // this.PolId
                // this.wcForm.shuiYang  = 0;
                // this.wcForm.shouGong = 0;
                this.resetForm();
                this.Timechange();
            },
            //  表格查询条件
            Alarmfactor() {
                this.page = 1;
                this.inquire();
            },

            getexcel(querylist, tabName, condition) {
                this.http
                    .comMethod(querylist, tabName, condition)
                    .then((res) => {
                        this.exportList = [];
                        if (res.length != 0) {
                            res.forEach((r) => {
                                r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                                r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]); // this.funfactor(r["PolId"]);
                                r["DataType"] = r["DataType"] == 1 ? '水样数据' : '标样数据';
                                if (r["PolId"] == 'pH值') {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(1)
                                }
                                else if (r["PolId"] == '水温') {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(1) + "℃";
                                }
                                else if (r["PolId"] == '流量' && r["DataType"] == '液位数据') {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(0) + "mm";
                                }
                                else if (r["PolId"] == '总磷' && r["DataType"] == '水样数据' && r["AutoValue"] < 0.4) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + " mg/L";

                                }
                                else if (r["PolId"] == '总氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(1) + " mg/L";

                                }
                                else if (r["PolId"] == '氨氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(1) + " mg/L";

                                }
                                else if (r["PolId"] == '化学需氧量' && r["DataType"] == '水样数据' && r["AutoValue"] < 30) {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(0) + " mg/L";
                                }
                                else {
                                    r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + "%";

                                }
                                r["TestOrder"] = this.funTestOrder(r["DataType"], r["TestOrder"]);
                                r["CompareResult"] = r["CompareResult"] == 0 ? '不合格' : '合格'; //(r["CompareResult"]);

                            });
                            //excel数据
                            this.exportList = res;//excel数据
                        }
                    })
                    .catch((res) => {


                        // console.log(res);
                    });
            },
            // funfactor: function (val) {
            //     if (val == "w21011") {
            //         return "总磷";
            //     } else if (val == "w21001") {
            //         return "总氮";
            //     } else if (val == "w21003") {
            //         return "氨氮";
            //     } else if (val == "w01019") {
            //         return "高锰酸盐指数";
            //     } else if (val == "w01018") {
            //         return "化学需氧量";
            //     } else if (val == "w00000") {
            //         return "流量";
            //     } else if (val == "w01009") {
            //         return "溶解氧";
            //     } else if (val == "w01014") {
            //         return "电导率";
            //     } else if (val == "w01003") {
            //         return "浑浊度";
            //     } else if (val == "w01001") {
            //         return "pH值";
            //     } else if (val == "w01010") {
            //         return "水温";
            //     } else if (val == "w19011") {
            //         return "藻密度";
            //     } else if (val == "w01016") {
            //         return "叶绿素";
            //     }
            // },
            // funfactorName: function (val) {
            //     if (val == "总磷") {
            //         return "w21011";
            //     } else if (val == "总氮") {
            //         return "w21001";
            //     } else if (val == "氨氮") {
            //         return "w21003";
            //     } else if (val == "高锰酸盐指数") {
            //         return "w01019";
            //     } else if (val == "化学需氧量") {
            //         return "w01018";
            //     } else if (val == "流量") {
            //         return "w00000";
            //     } else if (val == "溶解氧") {
            //         return "w01009";
            //     } else if (val == "电导率") {
            //         return "w01014";
            //     } else if (val == "浑浊度") {
            //         return "w01003";
            //     } else if (val == "pH值") {
            //         return "w01001";
            //     } else if (val == "水温") {
            //         return "w01010";
            //     } else if (val == "藻密度") {
            //         return "w19011";
            //     } else if (val == "叶绿素") {
            //         return "w01016";
            //     }
            // },

            // funResult: function (val) {
            //     if (val == "0") {
            //         return "不合格";
            //     } else if (val == "1") {
            //         return "合格";
            //     }
            // },
            //  数据类型
            funDataType(val) {
                if (val == "1") {
                    return "水样数据";
                } else if (val == "2") {
                    return "标样数据";
                } else if (val == "3") {
                    return "水温数据";
                } else if (val == "4") {
                    return "流量数据";
                } else if (val == "5") {
                    return "液位数据";
                }
            },
            //测量周期
            funTestOrder: function (dataType, order) {
                if (dataType == '水样数据') {
                    let dataOrder = '';

                    switch (order) {
                        case 1:
                            dataOrder = '水样一';
                            break;
                        case 2:
                            dataOrder = '水样二';
                            break;
                        case 3:
                            dataOrder = '水样三';
                            break;
                        default:
                            dataOrder = '水样一';
                    }

                    return dataOrder;
                } else if (dataType == '标样数据') {
                    let dataOrder = '';

                    switch (order) {
                        case 1:
                            dataOrder = '标样一';
                            break;
                        case 2:
                            dataOrder = '标样二';
                            break;
                        case 3:
                            dataOrder = '标样三';
                            break;
                        default:
                            dataOrder = '标样一';
                    }

                    return dataOrder;
                } else if (dataType == '水温数据') {
                    let dataOrder = '';

                    switch (order) {
                        case 1:
                            dataOrder = '水温数据';
                            break;
                        case 2:
                            dataOrder = '水温数据';
                            break;
                        default:
                            dataOrder = '水温数据';
                    }
                    return dataOrder;
                } else if (dataType == '流量数据') {
                    let dataOrder = '';

                    switch (order) {
                        case 1:
                            dataOrder = '流量数据一';
                            break;
                        case 2:
                            dataOrder = '流量数据二';
                            break;
                        default:
                            dataOrder = '流量数据一';
                    }

                    return dataOrder;
                } else if (dataType == '液位数据') {
                    let dataOrder = '';

                    switch (order) {
                        case 1:
                            dataOrder = '液位数据一';
                            break;
                        case 2:
                            dataOrder = '液位数据二';
                            break;
                        case 3:
                            dataOrder = '液位数据三';
                            break;
                        case 4:
                            dataOrder = '液位数据四';
                            break;
                        case 5:
                            dataOrder = '液位数据五';
                            break;
                        case 6:
                            dataOrder = '液位数据六';
                            break;
                        default:
                            dataOrder = '液位数据一';
                    }

                    return dataOrder;
                }
            },
            currentPage(val) {
                this.page = val;
                this.inquire()
            },
            changeSize(val) {
                this.size = val;
                this.inquire()

            },
            //【编辑功能内容图删除事件】
            updateImgRemove: function (file, fileList) {

                //debugger

                let files = [];
                for (let i = 0; i < fileList.length; i++) {
                    files.push(fileList[i].raw);
                };
                this.picList = files;

                let urlIndexs = -1;

                urlIndexs = this.fileListes.findIndex(item => {
                    if (item.url == file.url) {
                        return true
                    }
                });
                if (urlIndexs > -1) {
                    this.fileListes.splice(urlIndexs, 1);
                }


            },
            //【内容图删除事件】
            addImgRemoves: function (file, fileLists) {
                let files = [];
                for (let i = 0; i < fileLists.length; i++) {
                    files.push(fileLists[i].raw);
                };
                this.picList = files;

                let urlIndex = -1;
                //debugger
                urlIndex = this.fileLists.findIndex(item => {
                    if (item.url == file.url) {
                        return true;
                    }
                });
                this.fileLists.splice(urlIndex, 1);

                console.log('翻填时图片', this.fileList);

            },
            //内容图数量限制3张
            exceedTips: function () {
                this.$message.error("最多只能上传九张图片");
            },

            //【内容图片预览事件】
            handleContImgPreview: function (file) {
                this.dialogContImgUrl = file.url;
                this.dialogContImgVisible = true;
            },

            //上传内容图
            uploadProductPic: function (file) {

                this.picList.push(file.file);
                //debugger
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
                }
                // this.imageList = [];
                console.log('imageList', this.imageList);
                formData.append("dircName", this.PolId);

                axios
                    .post("/uplodeImges", formData, config)
                    .then((res) => {
                        //debugger
                        this.imageList = res.data
                        console.log('pic', this.imageList);

                    })
                    .catch((res) => {
                        this.$message({
                            message: res.response.data,
                            type: "warning",
                            duration: 2000,
                        });
                    });
            },
            //上传内容图
            uploadProductPics: function (file) {
                //debugger
                // this.picList=[];
                this.picList.push(file.file);

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
                }
                // this.socketApi.globalDataConfig.getCodeData this.funfactorName
                formData.append("dircName", this.socketApi.globalDataConfig.getCodeData(this.biDuiModel.PolId));

                // this.imageList = [];
                axios
                    .post("/uplodeImges", formData, config)
                    .then((res) => {
                        //debugger
                        this.imageList = res.data
                        console.log('pic1', res.data);

                    })
                    .catch((res) => {
                        this.$message({
                            message: res.response.data,
                            type: "warning",
                            duration: 2000,
                        });
                    });
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
            // 查看大图
            selPic(val) {

                // let locatIndex = window.location.href.indexOf('#');
                // let httpUrls = window.location.href.substring(0, locatIndex);

                this.picdialog = true;
                this.imgPaths = val.ImgUrl;

                console.log('this.imgPaths', this.imgPaths)

            },


        },
    };
</script>
<style scoped>
    .btn {
        font-size: 14px;
        color: #4a92ff;
        cursor: pointer;
    }

    .inputdiv {
        width: 85%;
    }

    .updatebtn {
        width: 25%;
    }

    /* 时间框显示 */
    .el-date-range-picker__time-header .el-input__inner {
        color: #000 !important;
    }

    @media only screen and (max-width: 1024px) {
        .el-col-md-6 {
            width: 38%;
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

    .rowdiv .el-col-7 {
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

    .el-dialog__body {
        height: 450px;
    }

    /* .el-carousel__container {
        height: 420px !important;
    } */
</style>