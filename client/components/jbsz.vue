<style scoped>
/* .div_jbsz {
    margin: 20px;
  } */

.el-card__header {
  height: 50px !important;
}
</style>
<template>
  <!-- div_jbsz -->
  <div class="div_jbsz">
    <div class="div_ybkz">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 系统参数 -->
        <el-tab-pane label="基本信息" name="jbxx">
          <div class="jbxx-body">
            <el-card class="box-card" style="height: 460px">
              <div slot="header">
                <span class="c-title">站点基本信息</span>
              </div>
              <div class="card-body">
                <el-form
                  :label-position="labelPosition"
                  label-width="100px"
                  size="mini"
                >
                  <!-- 编辑 -->
                  <template v-if="isEditBaseInfo">
                    <el-form-item label="系统名称">
                      <el-input v-model="SYS.SystemName"></el-input>
                    </el-form-item>
                    <el-form-item label="站点名称">
                      <el-input v-model="SYS.PointName"></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称">
                      <el-input v-model="SYS.CompanyName"></el-input>
                    </el-form-item>
                    <el-form-item label="运维单位">
                      <el-input v-model="SYS.YunWeiCompanyName"></el-input>
                    </el-form-item>
                    <el-form-item label="运维人">
                      <el-input v-model="SYS.OptUserName"></el-input>
                    </el-form-item>
                    <el-form-item label="运维人电话">
                      <el-input v-model="SYS.OptUserPhone"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="客服电话">
                      <el-input
                        disabled
                        v-model="appConfigJson.KeFuPhone"
                      ></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="站点编号">
                      <el-input v-model="SYS.id"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="系统版本">
                      <el-input
                        v-model="SYS.SoftVersion"
                        disabled
                        style="width: 80%"
                      >
                      </el-input>
                   

                      <span type="primary" size="small" style="color: gold"
                        >{{ appConfigJson.softInfo }}
                      </span>
                    </el-form-item> -->
                    <el-form-item>
                      <el-button
                        type="default"
                        @click="changeStatus(1, false)"
                        size="small"
                        >取消</el-button
                      >
                      <el-button
                        :loading="isEditBaseInfoLoading"
                        type="primary"
                        @click="updateBaseInfo()"
                        size="small"
                      >
                        保存
                      </el-button>
                    </el-form-item>
                  </template>
                  <!-- 默认 -->
                  <template v-if="!isEditBaseInfo">
                    <el-form-item label="系统名称">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.SystemName"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="站点名称">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.PointName"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.CompanyName"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="运维单位">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.YunWeiCompanyName"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="运维人">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.OptUserName"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="运维人电话">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.OptUserPhone"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="客服电话">
                      <el-input
                        disabled
                        v-model="appConfigJson.KeFuPhone"
                      ></el-input>
                    </el-form-item>
 
                    <el-form-item label="系统版本">
                      <el-input
                        disabled
                        v-model="SDL_Global.SYS.SoftVersion"
                        style="width: 80%"
                      >
                      </el-input>
                      <span type="primary" size="small" style="color: gold"
                        >{{ appConfigJson.softInfo }}
                      </span>
                    </el-form-item> -->
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="changeStatus(1, true)"
                        size="small"
                        >编辑信息</el-button
                      >
                    </el-form-item>
                  </template>
                </el-form>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <!-- 仪表参数 -->
        <el-tab-pane label="通讯配置" name="txpz">
          <div class="scpz-body">
            <el-card class="box-card">
              <div slot="header">
                <span class="c-title">参数设置</span>
              </div>
              <div class="card-body">
                <el-row>
                  <el-col :span="8"  v-if="SoftType == 21 || SoftType == 22 || SoftType == 23">
                    <div
                      class="upload"
                    >
                      <div class="csName">实时数据上传间隔</div>
                      <div class="csInput">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.Upload_ShiShiShuJuJianGe"
                        >
                          <template slot="append">分钟</template>
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            '实时数据上传间隔',
                            SDL_Global.CMD.SYS_Upload_ShiShiShuJuJianGe,
                            SDL_Global.SYS.Upload_ShiShiShuJuJianGe
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                  </el-col>
                       <el-col :span="8"  v-else>
                    <div
                      class="upload"
                     
                    >
                      <div class="csName">实时数据上传间隔</div>
                      <div class="csInput">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.Upload_ShiShiShuJuJianGe"
                        >
                          <template slot="append">秒</template>
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            '实时数据上传间隔',
                            SDL_Global.CMD.SYS_Upload_ShiShiShuJuJianGe,
                            SDL_Global.SYS.Upload_ShiShiShuJuJianGe
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                    <div class="upload" >
                      <div class="csName">分钟数据上传间隔</div>
                      <div class="csInput">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.Upload_FenZhongShuJuJianGe"
                        >
                          <template slot="append">分钟</template>
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            '分钟数据上传间隔',
                            SDL_Global.CMD.SYS_Upload_FenZhongShuJuJianGe,
                            SDL_Global.SYS.Upload_FenZhongShuJuJianGe
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="upload">
                      <div class="csName">超时重试次数</div>
                      <div class="csInput">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.Upload_ChaoShiChongShiCiShu"
                        >
                          <template slot="append">次</template>
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            '超时重试次数',
                            SDL_Global.CMD.SYS_Upload_ChaoShiChongShiCiShu,
                            SDL_Global.SYS.Upload_ChaoShiChongShiCiShu
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="upload">
                      <div class="csName">MN号</div>
                      <div class="csInputs">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.MN"
                        >
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            'MN号',
                            SDL_Global.CMD.SYS_MN,
                            SDL_Global.SYS.MN
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="upload">
                      <div class="csName">系统状态上传间隔</div>
                      <div class="csInput">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.Upload_XiTongZhuangTaiJianGe"
                        >
                          <template slot="append">分钟</template>
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            '系统状态上传间隔',
                            SDL_Global.CMD.SYS_Upload_XiTongZhuangTaiJianGe,
                            SDL_Global.SYS.Upload_XiTongZhuangTaiJianGe
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="upload">
                      <div class="csName">通讯超时时间</div>
                      <div class="csInput">
                        <el-input
                          size="small"
                          readonly
                          v-model="SDL_Global.SYS.Upload_TongXunChaoShiShiJian"
                        >
                          <template slot="append">秒</template>
                        </el-input>
                      </div>
                      <div
                        class="sendbtn"
                        @click="
                          updateForm(
                            '通讯超时时间',
                            SDL_Global.CMD.SYS_Upload_TongXunChaoShiShiJian,
                            SDL_Global.SYS.Upload_TongXunChaoShiShiJian
                          )
                        "
                      >
                        <i class="el-icon-edit"></i>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <el-card class="box-card" style="margin-top: 20px">
              <div class="header-card">
                <div class="card-title">通讯列表</div>
                <el-button
                  type="primary"
                  class="addbtn"
                  @click="addNet"
                  size="small"
                  >添加</el-button
                >
              </div>
              <div class="card-body">
                <el-table
                  v-loading="pictLoading"
                  element-loading-background="rgba(0, 0, 0, 0.3)"
                  element-loading-text="数据正在加载中"
                  :data="tableData"
                  :header-cell-style="{
                    'background-color': '#384565',
                  }"
                  :height="tableHeight"
                  stripe
                  :empty-text="emptyText"
                >
                  <el-table-column fixed label="编号" align="center" prop="id">
                  </el-table-column>
                  <el-table-column fixed label="操作" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="editData(scope.row)"
                        >编辑
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    label="平台名称"
                    align="center"
                    prop="PlatformName"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    label="平台IP"
                    align="center"
                    prop="PlatformIP"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    label="平台接口"
                    align="center"
                    prop="PlatformPort"
                  >
                  </el-table-column>
                  <el-table-column
                    label="平台密码"
                    align="center"
                    prop="PlatformPW"
                  >
                  </el-table-column>
                  <el-table-column
                    label="通讯协议"
                    align="center"
                    prop="Protocol"
                  >
                  </el-table-column>

                  <el-table-column
                    label="应答报文"
                    align="center"
                    prop="HasResponse"
                  >
                  </el-table-column>
                  <!-- <el-table-column label="状态" align="center" prop="Status"> </el-table-column> -->
                  <el-table-column
                    prop="Status"
                    label="状态"
                    filter-placement="bottom-end"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.Status == '启用' ? 'success' : 'info'"
                        size="mini"
                      >
                        {{ scope.row.Status }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="通讯方式"
                    align="center"
                    prop="NetType"
                  >
                  </el-table-column>
                  <el-table-column
                    label="启用反控"
                    align="center"
                    prop="EnableCtrl"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.EnableCtrl == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.EnableCtrl }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="本地IP"
                    align="center"
                    prop="LocalIP"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    label="本地端口"
                    align="center"
                    prop="LocalPort"
                  >
                  </el-table-column>
                  <el-table-column
                    label="串口连接字符串"
                    align="center"
                    prop="COMStr"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    label="上传实时数据"
                    align="center"
                    prop="UpShiShiData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpShiShiData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpShiShiData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="SoftType == 32 ? '上传周期数据' : '上传小时数据'"
                    align="center"
                    prop="UpXiaoShiData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpXiaoShiData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpXiaoShiData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传标样数据"
                    align="center"
                    prop="UpBiaoYangData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <!-- <el-tag size="mini" :type="scope.row.UpBiaoYangData == '启用' ? 'success' : 'info'"
                        disable-transitions> -->
                      <!-- <span :style="{ color: scope.row.UpBiaoYangData == '启用'?'#67C23A':'#909399' }"    
                        >
                        {{scope.row.UpBiaoYangData}}</span> -->
                      <el-tag
                        :type="
                          scope.row.UpBiaoYangData == '启用'
                            ? 'success'
                            : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpBiaoYangData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传零点数据"
                    v-if="SoftType != 32"
                    align="center"
                    prop="UpLingDianData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpLingDianData == '启用'
                            ? 'success'
                            : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpLingDianData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传跨度数据"
                    v-if="SoftType != 32"
                    align="center"
                    prop="UpKuaDuData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpKuaDuData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpKuaDuData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传平行样数据"
                    v-if="SoftType != 32"
                    align="center"
                    prop="UpPingXingYangData"
                    width="135"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpPingXingYangData == '启用'
                            ? 'success'
                            : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpPingXingYangData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传加标数据"
                    v-if="SoftType != 32"
                    align="center"
                    prop="UpJiaBiaoData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpJiaBiaoData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpJiaBiaoData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传空白数据"
                    v-if="SoftType != 32"
                    align="center"
                    prop="UpKongBaiData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpKongBaiData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpKongBaiData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传开机数据"
                    align="center"
                    prop="UpPowerOnData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpPowerOnData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpPowerOnData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传留样数据"
                    align="center"
                    prop="UpLiuYangData"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpLiuYangData == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpLiuYangData }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传仪表参数数据"
                    align="center"
                    prop="UpMeterArgs"
                    width="135"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpMeterArgs == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpMeterArgs }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传仪表状态数据"
                    align="center"
                    prop="UpMeterStatus"
                    width="135"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpMeterStatus == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpMeterStatus }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传日志数据"
                    align="center"
                    prop="UpRunLog"
                    width="110"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="
                          scope.row.UpRunLog == '启用' ? 'success' : 'info'
                        "
                        size="mini"
                      >
                        {{ scope.row.UpRunLog }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="是否应答" align="center" prop="Unit"> </el-table-column> -->
                </el-table>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="备份设置" name="sjbf">
          <div class="sjbf-body">
            <el-row>
              <el-col :sm="4" :md="4" :lg="4" :xl="3">
                <el-button
                  style="margin-left: 20px; width: 130px"
                  type="primary"
                  @click="
                    backData(
                      '恢复系统默认设置',
                      SDL_Global.CMD.SYS_HuiFuXiMoRenTongCanSu
                    )
                  "
                  size="small"
                >
                  恢复系统默认设置
                </el-button>
              </el-col>
              <el-col :sm="4" :md="4" :lg="4" :xl="3">
                <el-button
                  style="margin-left: 20px; width: 85px"
                  :loading="isSendLoading"
                  type="primary"
                  @click="copeData"
                  size="small"
                  >数据备份</el-button
                >
              </el-col>
              <el-col :sm="8" :md="8" :lg="8" :xl="6" v-if="showbox">
                <label class="rwlx">备份文件路径</label>
                <el-input
                  style="width: 60%"
                  size="small"
                  readonly
                  v-model="batUrl"
                >
                </el-input>
              </el-col>
              <el-col :sm="8" :md="8" :lg="8" :xl="6" v-if="showbox">
                <label class="rwlx">备份时间</label>
                <el-input
                  style="width: 71%"
                  size="small"
                  readonly
                  v-model="beifenTime"
                >
                  <!-- <template slot="append">分钟</template> -->
                </el-input>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="RoleID == 3" label="系统配置" name="xtpz">
          <cpsxtpz></cpsxtpz>
        </el-tab-pane>
      </el-tabs>
    </div>

    <template class="dialogBoxs">
      <el-dialog
        title="通讯配置"
        :visible.sync="dialogFormVisible"
        width="60%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        class="div-dialog div-dialog-mores"
        top="50px"
        @close="closeDialog"
      >
        <el-form
          :label-position="labelPosition"
          label-width="95px"
          :model="form"
          :rules="rules"
          status-icon
          ref="form"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="平台名称" prop="PlatformName">
            <el-input
              v-model="form.PlatformName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="平台IP" prop="PlatformIP">
            <el-input
              v-model="form.PlatformIP"
              placeholder="示列：127.0.0.1"
            ></el-input>
          </el-form-item>

          <el-form-item label="平台端口" prop="PlatformPort">
            <el-input
              v-model.number="form.PlatformPort"
              placeholder="示列：8080"
            ></el-input>
          </el-form-item>
          <el-form-item label="平台密码" prop="PlatformPW">
            <el-input v-model="form.PlatformPW" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="通讯协议" prop="Protocol">
            <el-select v-model="form.Protocol" size="small">
              <el-option
                v-for="item in ProtocolList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="通讯方式" prop="NetType">
            <el-radio-group v-model="form.NetType">
              <el-radio :label="1">TCP/IP</el-radio>
              <el-radio :label="3">COM</el-radio>
              <el-radio :label="2">UDP</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="连接字符串"
            v-if="form.NetType == 3"
            prop="COMStr"
          >
            <el-input
              v-model="form.COMStr"
              placeholder="示列：COM15:9600:None:8:One"
            ></el-input>
          </el-form-item>
          <el-form-item label="本地IP" v-if="form.NetType == 2" prop="LocalIP">
            <el-input
              v-model="form.LocalIP"
              placeholder="示列：127.0.0.1"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="本地端口"
            v-if="form.NetType == 2"
            prop="LocalPort"
          >
            <el-input
              v-model.number="form.LocalPort"
              placeholder="示列：8080"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传参数">
            <!-- <el-checkbox-group v-model="form.uploadParameter"> -->
            <el-checkbox
              label="实时数据"
              v-model="form.UpShiShiData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="周期数据"
              v-if="SoftType == 32"
              v-model="form.UpXiaoShiData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="小时数据"
              v-else
              v-model="form.UpXiaoShiData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>

            <el-checkbox
              label="标样数据"
              v-model="form.UpBiaoYangData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="零点数据"
              v-if="SoftType != 32"
              v-model="form.UpLingDianData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="跨度数据"
              v-if="SoftType != 32"
              v-model="form.UpKuaDuData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="平行样数据"
              v-if="SoftType != 32"
              v-model="form.UpPingXingYangData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="加标数据"
              v-if="SoftType != 32"
              v-model="form.UpJiaBiaoData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="空白数据"
              v-if="SoftType != 32"
              v-model="form.UpKongBaiData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="开机数据"
              v-model="form.UpPowerOnData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="留样数据"
              v-model="form.UpLiuYangData"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="日志数据"
              v-model="form.UpRunLog"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="仪表状态数据"
              v-model="form.UpMeterStatus"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="仪表参数数据"
              v-model="form.UpMeterArgs"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <!-- </el-checkbox-group> -->
          </el-form-item>
          <el-form-item label="应答报文" prop="HasResponse">
            <el-radio-group v-model="form.HasResponse">
              <el-radio :label="1">有应答</el-radio>
              <el-radio :label="0">无应答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="Status">
            <el-radio-group v-model="form.Status">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用反控" prop="EnableCtrl">
            <el-radio-group v-model="form.EnableCtrl">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm" size="small">取 消</el-button>
          <el-button type="primary" @click="SubmitForm('form')" size="small"
            >保 存</el-button
          >
          <el-button
            type="primary"
            @click="testip"
            size="small"
            :loading="isLoading"
            >测试IP</el-button
          >
        </span>
      </el-dialog>
    </template>

    <template class="dialogBox">
      <el-dialog
        title="参数设置--修改值"
        :visible.sync="dialogVisible"
        width="60%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <div class="dialogBody">
          <div class="dialogLabel">
            <label style="color: #cccccc">{{ mlName }}</label>
          </div>
          <div class="dialogInput">
            <el-input
              size="small"
              placeholder="请输入"
              v-model="data"
              style="color: #fff"
            >
              <template
                slot="append"
                v-if="
                  mlName == '实时数据上传间隔' || mlName == '系统状态上传间隔'
                "
                >分钟</template
              >
              <template slot="append" v-if="mlName == '超时重试次数'"
                >次</template
              >
              <template slot="append" v-if="mlName == '通讯超时时间'"
                >秒</template
              >
            </el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="SendData"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </template>

    <template class="dialogBox">
      <el-dialog
        title="版本更新"
        :visible.sync="dialogSoftVersion"
        width="60%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <div class="dialogBody">
          <div class="dialogLabel">
            <label style="color: #cccccc">系统版本更新</label>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogSoftVersion = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="SendData"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
// var ControlVirtualKeyBoard = require('../../server/routes/conWindows');

// import { DateTime } from "../common/js/date.js";
import axios from "axios";
import cpsxtpz from "./module/cps_xtpz.vue";
import moment from "moment";

export default {
  components: { cpsxtpz },
  name: "jbsz",
  data() {
    // let date = new DateTime(); //调用datetime获取时间格式
    var isSoftKeyDisabled = false;
    if (JSON.parse(localStorage.getItem("appConfig")).SoftKey != "") {
      isSoftKeyDisabled = true;
    }
    // console.log("isSoftKeyDisabled=", isSoftKeyDisabled);
    return {
      SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,
      iniForm: JSON.parse(localStorage.getItem("appConfig")),
      isDisabled: isSoftKeyDisabled,
      batUrl: "../dbbak",
      driverUrl: "",
      appConfigJson: this.GetAppConfigJson(),

      isSendLoading: false,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogSoftVersion: false,
      mlName: "",
      data: "",
      ml: "",
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,

      RoleID: JSON.parse(localStorage.getItem("RoleID")), //menus
      labelPosition: "right",
      isEditBaseInfo: false,
      isEditPlatform: false,
      isEditBaseInfoLoading: false,
      isEditPlatformLoading: false,
      SYS: {
        SystemName: "",
        PointName: "",
        CompanyName: "",
        YunWeiCompanyName: "",
        OptUserName: "",
        OptUserPhone: "",
        PlatformName: "",
        PlatformIP: "",
        PlatformPort: 0,
        PlatformPW: "",
        MN: "",
        id: "",
        SoftVersion: "",
      },

      activeName: "jbxx",
      pictLoading: false,
      emptyText: "暂无数据",
      tableData: [],
      rules: {
        PlatformName: [
          { required: true, message: "平台名称不能为空" },
          // { type: "number", message: "数据类型必须为数字值(例如：2061)" },
        ],
        PlatformIP: [
          { required: true, message: "平台IP不能为空" },
          // { type: "number", message: "数据类型必须为数字值(例如：2061)" },
        ],
        PlatformPort: [
          { required: true, message: "平台端口不能为空" },
          { type: "number", message: "平台端口必须为数字值(例如：2061)" },
        ],
        COMStr: [
          { required: true, message: "连接字符串不能为空" },
          // { type: "number", message: "数据类型必须为数字值(例如：2061)" },
        ],
        LocalIP: [
          { required: true, message: "本地IP不能为空" },
          // { type: "number", message: "数据类型必须为数字值(例如：2061)" },
        ],
        LocalPort: [
          { required: true, message: "本地端口不能为空" },
          { type: "number", message: "本地端口必须为数字值(例如：2061)" },
        ],
      },
      form: {
        id: "",
        PlatformName: "",
        PlatformIP: "",
        PlatformPort: 0,
        PlatformPW: "",
        Protocol: "1",
        NetType: 1,
        EnableCtrl: 0,
        LocalIP: "",
        LocalPort: 0,

        UpShiShiData: 0,
        UpXiaoShiData: 0,
        UpBiaoYangData: 0,
        UpLingDianData: 0,
        UpKuaDuData: 0,
        UpPingXingYangData: 0,
        UpJiaBiaoData: 0,
        UpKongBaiData: 0,
        UpPowerOnData: 0,
        UpLiuYangData: 0,
        UpRunLog: 0,
        UpMeterArgs: 0,

        UpMeterStatus: 0,
        COMStr: "",
        HasResponse: 1,
        Status: 0,
      },
      ProtocolList: [
        {
          value: "1",
          label: "国标212",
        },
      ],
      tableHeight: null,
      showbox: false,
      beifenTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      // date.getDate("-") +
      // date.getHour() +
      // ":" +
      // date.getMinute() +
      // ":" +
      // date.getSecond(),
      isLoading: false,
      YiBiaoList: [],
      softTypeChanged: false,
      paramForm: {
        ID: 0,
        ProName: "test",
        ProCode: "test",
        ProType: "固定站",
        SoftType: "地表水",
        TP: 0,
        TPJB: 0,
        TPFactory: "雪迪龙",
        TPSeries: "AFK-001",
        TN: 0,
        TNJB: 0,
        TNFactory: "雪迪龙",
        TNSeries: "AFK-001",
        NH3: 0,
        NH3JB: 0,
        NH3Factory: "雪迪龙",
        NH3Series: "AFK-001",
        COD: 0,
        CODJB: 0,
        CODFactory: "雪迪龙",
        CODSeries: "AFK-001",
        CODCR: 0,
        CODCRJB: 0,
        CODCRFactory: "雪迪龙",
        CODCRSeries: "AFK-001",
        WC: 0,
        WCFactory: "雪迪龙",
        WCSeries: "AFK-001",
        YLS: 0,
        YLSFactory: "雪迪龙",
        YLSSeries: "AFK-001",
        ZMD: 0,
        ZMDFactory: "雪迪龙",
        ZMDSeries: "AFK-001",
        ZF: 0,
        ZFFactory: "雪迪龙",
        ZFSeries: "AFK-001",
        LY: 0,
        LYFactory: "德润",
        LYSeries: "AFK-001",
        MachineCode: "adf|21212",
      },
      ProType: "",
      proTypeList: [
        { value: "固定站", label: "固定站" },
        { value: "简易站", label: "简易站" },
        { value: "小型站", label: "小型站" },
      ],
      proTypeLists: [{ value: "水污染源在线监测", label: "水污染源在线监测" }],
      // ProRule: {
      //   ProName: [{ required: true, message: "请输入项目名", trigger: "blur" }],
      //   ProCode: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
      //   ProType: [{ required: true, message: "请输入站点类型", trigger: "blur" }],
      //   MachineCode: [{ required: true, message: "请输入机器码", trigger: "blur" }],
      // },
    };
  },
  mounted() {
    if (this.iniForm.SoftKey) {
      this.iniForm.SoftType = this.SoftType == 32 ? 1 : 0;
    }
    this.inquire();
    this.getHeight();
    // console.log("ini", this.iniForm);
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.tableHeight = window.innerHeight - 440;
    },
    // 切换软件类型
    softTypeChange(aaa) {
      this.softTypeChanged = true;
      if (aaa == 1) {
        this.iniForm.ProType = "水污染源在线监测";
        this.SoftType = 32;
      } else {
        this.iniForm.ProType = "固定站";
        this.SoftType = 21;
      }
    },

    // 切换开关
    handleClick() {},
    //
    SoftVersion() {
      this.dialogSoftVersion = true;
    },
   
    //恢复数据备份设置
    backData(name, ml) {
      this.$confirm(
        "系统配置、仪表参数将恢复到出厂时的默认值，确定是否要恢复到出厂默认配置？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          var data =
            localStorage.getItem("Loginedname") + "," + name + "," + ml;
          // this.$message.info(data);
          this.socketApi.sendSock(data);
        })
        .catch(() => {});
    },
    // 备份数据库
    copeData() {
      this.isSendLoading = true;
      debugger;
      this.http
        .post("/execFile", {
          baturl: this.appConfigJson.caijiUrl, //this.appConfig,
          conurl: this.batUrl,
        })
        .then((res) => {
          debugger;
          this.batUrl = res;
        })
        .catch((res) => {
          // console.log(res);
          this.$message.error(res);
        });
      let $this = this;

      setTimeout(function () {
        $this.isSendLoading = false;
        $this.showbox = true;
        let operator = "执行数据备份操作";
        $this.addlog(operator);
      }, 1000);
      var mldata = "备份数据库=true";
      var data =
        "" +
        localStorage.getItem("Loginedname") +
        "," +
        "数据库备份" +
        "," +
        mldata;
      // this.$message.info(data);

      this.socketApi.sendSock(data);
    },

    inquire() {
      this.tableData = [];
      let condition = "";
      this.pictLoading = true;
      this.emptyText = " ";

      this.http
        .comMethod("*", "tbupconfig", condition)
        .then((res) => {
          this.pictLoading = false;

          if (res.length != 0) {
            //表格数据

            res.forEach((r) => {
              r.Protocol = 1 ? "国标212" : "--";

              if (r.NetType == 1) {
                r.NetType = "TCP";
              } else if (r.NetType == 2) {
                r.NetType = "UDP";
              } else {
                r.NetType = "COM";
              }

              r.EnableCtrl = r.EnableCtrl == 0 ? "禁用" : "启用";

              r.UpShiShiData = r.UpShiShiData == 0 ? "禁用" : "启用";
              r.UpXiaoShiData = r.UpXiaoShiData == 0 ? "禁用" : "启用";
              r.UpBiaoYangData = r.UpBiaoYangData == 0 ? "禁用" : "启用";
              r.UpLingDianData = r.UpLingDianData == 0 ? "禁用" : "启用";
              r.UpKuaDuData = r.UpKuaDuData == 0 ? "禁用" : "启用";
              r.UpPingXingYangData =
                r.UpPingXingYangData == 0 ? "禁用" : "启用";
              r.UpJiaBiaoData = r.UpJiaBiaoData == 0 ? "禁用" : "启用";
              r.UpKongBaiData = r.UpKongBaiData == 0 ? "禁用" : "启用";
              r.UpPowerOnData = r.UpPowerOnData == 0 ? "禁用" : "启用";
              r.UpLiuYangData = r.UpLiuYangData == 0 ? "禁用" : "启用";
              r.UpMeterArgs = r.UpMeterArgs == 0 ? "禁用" : "启用";
              r.UpMeterStatus = r.UpMeterStatus == 0 ? "禁用" : "启用";
              r.UpRunLog = r.UpRunLog == 0 ? "禁用" : "启用";

              r.HasResponse = r.HasResponse == 1 ? "有应答" : "无应答";
              r.Status = r.Status == 1 ? "启用" : "禁用";
            });
            this.tableData = res;
          } else {
            this.emptyText = "暂无数据";
          }
        })
        .catch((res) => {
          setTimeout(() => {
            this.pictLoading = false;
            this.emptyText = "暂无数据";
          }, 1000);
          // console.log(res);
        });
    },
    // 添加
    addNet() {
      this.dialogFormVisible = true;

      this.form.id = "";
      this.form.PlatformName = "";
      this.form.PlatformIP = "";
      this.form.PlatformPort = "";
      this.form.PlatformPW = "";
      this.form.Protocol = "1";
      (this.form.NetType = 1), (this.form.LocalIP = "");
      this.form.LocalPort = "";

      this.form.UpShiShiData = 1;
      this.form.UpXiaoShiData = 1;
      this.form.UpBiaoYangData = 1;
      this.form.UpLingDianData = 1;
      this.form.UpKuaDuData = 1;
      this.form.UpPingXingYangData = 1;
      this.form.UpJiaBiaoData = 1;
      this.form.UpKongBaiData = 1;
      this.form.UpPowerOnData = 1;
      this.form.UpLiuYangData = 1;
      this.form.UpRunLog = 1;
      this.form.UpMeterArgs = 1;
      this.form.UpMeterStatus = 1;

      this.form.COMStr = "";
      this.form.HasResponse = 1;
      this.form.Status = 0;
      this.form.EnableCtrl = 0;

      // this.$refs['form'].resetFields();
    },
    closeDialog() {
      this.$refs["form"].resetFields();
    },
    resetForm() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 翻填数据
    editData(val) {
      this.dialogFormVisible = true;
      this.form.id = val.id;
      this.form.PlatformName = val.PlatformName;
      this.form.PlatformIP = val.PlatformIP;
      this.form.PlatformPort = val.PlatformPort;
      this.form.PlatformPW = val.PlatformPW;

      if (val.Protocol == "国际212") {
        this.form.Protocol = 1;
      }
      if (val.NetType == "TCP") {
        this.form.NetType = 1;
      } else if (val.NetType == "UDP") {
        this.form.NetType = 2;
      } else if (val.NetType == "COM") {
        this.form.NetType = 3;
      }
      this.form.LocalIP = val.LocalIP;
      this.form.LocalPort = val.LocalPort == 0 ? "" : val.LocalPort;
      this.form.UpShiShiData = val.UpShiShiData == "启用" ? 1 : 0;
      this.form.UpXiaoShiData = val.UpXiaoShiData == "启用" ? 1 : 0;
      this.form.UpBiaoYangData = val.UpBiaoYangData == "启用" ? 1 : 0;
      this.form.UpLingDianData = val.UpLingDianData == "启用" ? 1 : 0;
      this.form.UpKuaDuData = val.UpKuaDuData == "启用" ? 1 : 0;
      this.form.UpPingXingYangData = val.UpPingXingYangData == "启用" ? 1 : 0;
      this.form.UpJiaBiaoData = val.UpJiaBiaoData == "启用" ? 1 : 0;
      this.form.UpKongBaiData = val.UpKongBaiData == "启用" ? 1 : 0;
      this.form.UpPowerOnData = val.UpPowerOnData == "启用" ? 1 : 0;
      this.form.UpLiuYangData = val.UpLiuYangData == "启用" ? 1 : 0;
      this.form.UpRunLog = val.UpRunLog == "启用" ? 1 : 0;
      this.form.UpMeterArgs = val.UpMeterArgs == "启用" ? 1 : 0;
      this.form.UpMeterStatus = val.UpMeterStatus == "启用" ? 1 : 0;
      this.form.COMStr = val.COMStr;
      this.form.HasResponse = val.HasResponse == "有应答" ? 1 : 0;
      this.form.Status = val.Status == "启用" ? 1 : 0;
      this.form.EnableCtrl = val.EnableCtrl == "启用" ? 1 : 0;
    },
    // 添加日志
    addlog(operator) {
      // let date = new DateTime(); //调用datetime获取时间格式

      this.http
        .post("/addlog", {
          OPTIME: this.beifenTime,
          username: localStorage.getItem("Loginedname"),
          operator: operator,
          cmdargs: operator,
        })
        .then((res) => {
          let ml = "日志上传=" + operator;
          this.Sendml("日志上传", ml);
        })
        .catch((res) => {
          // console.log(res);
          this.$message.error(res);
        });
    },
    SubmitForm(formName) {
      let condition =
        " PlatformIP='" +
        this.form.PlatformIP +
        "' and PlatformPort='" +
        this.form.PlatformPort +
        "'";
      if (this.form.id === "") {
        // let $this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http
              .comMethod("*", "tbupconfig", condition)
              .then((res) => {
                if (res.length != 0) {
                  this.$message.error("当前平台IP与端口已存在，请重新输入");
                  return;
                } else {
                  // console.log("this.form.EnableCtrl", this.form.EnableCtrl);
                  this.http
                    .post("/addupload", {
                      PlatformName: this.form.PlatformName,
                      PlatformIP: this.form.PlatformIP,
                      PlatformPort: this.form.PlatformPort,
                      PlatformPW: this.form.PlatformPW,
                      Protocol: this.form.Protocol,
                      NetType: this.form.NetType,
                      LocalIP: this.form.LocalIP,
                      LocalPort: (this.form.LocalPort =
                        this.form.LocalPort == "" ? 0 : this.form.LocalPort),
                      UpShiShiData: this.form.UpShiShiData,
                      UpXiaoShiData: this.form.UpXiaoShiData,
                      UpBiaoYangData: this.form.UpBiaoYangData,
                      UpLingDianData: this.form.UpLingDianData,
                      UpKuaDuData: this.form.UpKuaDuData,
                      UpPingXingYangData: this.form.UpPingXingYangData,
                      UpJiaBiaoData: this.form.UpJiaBiaoData,
                      UpKongBaiData: this.form.UpKongBaiData,
                      UpPowerOnData: this.form.UpPowerOnData,
                      UpLiuYangData: this.form.UpLiuYangData,
                      UpRunLog: this.form.UpRunLog,
                      UpMeterArgs: this.form.UpMeterArgs,
                      UpMeterStatus: this.form.UpMeterStatus,
                      COMStr: this.form.COMStr,
                      HasResponse: this.form.HasResponse,
                      Status: this.form.Status,
                      EnableCtrl: this.form.EnableCtrl,
                    })
                    .then((res) => {
                      // setTimeout(() => {
                      this.pictLoading = false;
                      // }, 1000);
                      if (res.affectedRows > 0) {
                        this.$message.success("添加成功,请重启后台程序生效");
                        this.inquire();
                        let operator = "新增平台配置";
                        this.addlog(operator);
                        this.dialogFormVisible = false;
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
              })
              .catch((res) => {
                this.$message.error("服务端错误");
                // console.log(res);
              });
          } else {
            // this.$message.error("验证失败");
          }
        });
      } else {
        let flag = false;
        let $this = this;
        this.tableData.forEach((r) => {
          if (
            r["PlatformIP"] == $this.form.PlatformIP &&
            r["PlatformPort"] == $this.form.PlatformPort &&
            r["id"] != $this.form.id
          ) {
            flag = true;
          }
        });
        if (flag == false) {
          this.http
            .post("/updateUpload", {
              PlatformName: this.form.PlatformName,
              PlatformIP: this.form.PlatformIP,
              PlatformPort: this.form.PlatformPort,
              PlatformPW: this.form.PlatformPW,
              Protocol: this.form.Protocol,
              NetType: this.form.NetType,
              LocalIP: this.form.LocalIP,
              LocalPort: (this.form.LocalPort =
                this.form.LocalPort == "" ? 0 : this.form.LocalPort),
              UpShiShiData: this.form.UpShiShiData,
              UpXiaoShiData: this.form.UpXiaoShiData,
              UpBiaoYangData: this.form.UpBiaoYangData,
              UpLingDianData: this.form.UpLingDianData,
              UpKuaDuData: this.form.UpKuaDuData,
              UpPingXingYangData: this.form.UpPingXingYangData,
              UpJiaBiaoData: this.form.UpJiaBiaoData,
              UpKongBaiData: this.form.UpKongBaiData,
              UpPowerOnData: this.form.UpPowerOnData,
              UpLiuYangData: this.form.UpLiuYangData,
              UpRunLog: this.form.UpRunLog,
              UpMeterArgs: this.form.UpMeterArgs,
              UpMeterStatus: this.form.UpMeterStatus,
              COMStr: this.form.COMStr,
              HasResponse: this.form.HasResponse,
              Status: this.form.Status,
              id: this.form.id,
              EnableCtrl: this.form.EnableCtrl,
            })
            .then((res) => {
              // setTimeout(() => {
              this.pictLoading = false;
              // }, 1000);
              if (res.affectedRows > 0) {
                this.$message.success("修改成功,请重启后台程序生效");
                this.inquire();
                let operator = "修改平台配置";
                this.addlog(operator);
                this.dialogFormVisible = false;
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
        } else {
          this.$message.error("当前平台IP与端口已存在，请重新输入");
        }
      }
    },
    // 测试链接
    testip() {
      if (this.form.PlatformIP != "") {
        this.isLoading = true;
        this.http
          .post("/testIP", { PlatformIP: this.form.PlatformIP })
          .then((res) => {
            this.isLoading = false;
            if (res == "200") {
              this.$message.success("测试连接成功");
            } else {
              this.$message.error("测试连接失败");
            }
          })
          .catch((res) => {
            this.isLoading = false;

            // console.log(res);
            this.$message.error("测试连接失败");
          });
      } else {
        this.$message.info("平台IP不能为空");
      }
    },
    ping(url, timeout = 6000) {
      return new Promise((reslove, reject) => {
        const urlRule = new RegExp(
          "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
        );
        if (!urlRule.test(url)) reject("invalid url");
        try {
          fetch(url)
            .then(() => reslove(true))
            .catch(() => reslove(false));
          setTimeout(() => {
            reslove(false);
          }, timeout);
        } catch (e) {
          reject(e);
        }
      });
    },

    //发送命令
    Sendml(name, ml) {
      var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;

      // this.$message.info(data);

      this.socketApi.sendSock(data, true);
    },
    // 修改上传参数
    updateForm(name, ml, data) {
      this.dialogVisible = true;
      this.mlName = name;
      this.data = data;
      this.ml = ml;
    },
    // 发送命令
    SendData() {
      var mldata = "";
      mldata = this.ml.Format(this.data);
      var data =
        "" +
        localStorage.getItem("Loginedname") +
        "," +
        this.mlName +
        "," +
        mldata;
      // this.$message.info(data);

      this.socketApi.sendSock(data);
      this.dialogVisible = false;
    },
    //切换状态
    changeStatus(type, flag) {
      switch (type) {
        case 1:
          this.isEditBaseInfo = flag;
          break;
        case 2:
          this.isEditPlatform = flag;
          break;
      }

      this.updateCurrentFormInfo();
    },
    //回填信息
    updateCurrentFormInfo() {
      this.SYS = {
        SystemName: this.SDL_Global.SYS.SystemName,
        PointName: this.SDL_Global.SYS.PointName,
        CompanyName: this.SDL_Global.SYS.CompanyName,
        YunWeiCompanyName: this.SDL_Global.SYS.YunWeiCompanyName,
        OptUserName: this.SDL_Global.SYS.OptUserName,
        OptUserPhone: this.SDL_Global.SYS.OptUserPhone,

        id: this.SDL_Global.SYS.id,
        SoftVersion: this.SDL_Global.SYS.SoftVersion,

        PlatformName: this.SDL_Global.SYS.PlatformName,
        PlatformIP: this.SDL_Global.SYS.PlatformIP,
        PlatformPort: this.SDL_Global.SYS.PlatformPort,
        PlatformPW: this.SDL_Global.SYS.PlatformPW,
        MN: this.SDL_Global.SYS.MN,
      };
    },
    //基本信息
    updateBaseInfo() {
      let name = "修改基本信息";
      let SystemName = this.SDL_Global.CMD.SYS_SystemName.Format(
        this.SYS.SystemName
      );
      let PointName = this.SDL_Global.CMD.SYS_PointName.Format(
        this.SYS.PointName
      );
      let CompanyName = this.SDL_Global.CMD.SYS_CompanyName.Format(
        this.SYS.CompanyName
      );
      let YunWeiCompanyName = this.SDL_Global.CMD.SYS_YunWeiCompanyName.Format(
        this.SYS.YunWeiCompanyName
      );

      let OptUserName = this.SDL_Global.CMD.SYS_OptUserName.Format(
        this.SYS.OptUserName
      );
      let OptUserPhone = this.SDL_Global.CMD.SYS_OptUserPhone.Format(
        this.SYS.OptUserPhone
      );
      let id = this.SDL_Global.CMD.SYS_id.Format(this.SYS.id);
      let SoftVersion = this.SDL_Global.CMD.SYS_SoftVersion.Format(
        this.SYS.SoftVersion
      );

      let ml =
        SystemName +
        ";" +
        PointName +
        ";" +
        CompanyName +
        ";" +
        YunWeiCompanyName +
        ";" +
        OptUserName +
        ";" +
        OptUserPhone +
        ";" +
        id +
        ";" +
        SoftVersion;
      this.Sendml(name, ml);
      let $this = this;
      $this.isEditBaseInfoLoading = true;
      setTimeout(function () {
        $this.isEditBaseInfo = false;
        $this.isEditBaseInfoLoading = false;
      }, 1500);
    },
    //通讯配置
    updatePlatformInfo() {
      let name = "修改通讯配置";
      let ProtocolType = this.SDL_Global.CMD.SYS_ProtocolType.Format(
        this.SDL_Global.SYS.ProtocolType
      );
      let PlatformName = this.SDL_Global.CMD.SYS_PlatformName.Format(
        this.SYS.PlatformName
      );
      let PlatformIP = this.SDL_Global.CMD.SYS_PlatformIP.Format(
        this.SYS.PlatformIP
      );
      let PlatformPort = this.SDL_Global.CMD.SYS_PlatformPort.Format(
        this.SYS.PlatformPort
      );
      let PlatformPW = this.SDL_Global.CMD.SYS_PlatformPW.Format(
        this.SYS.PlatformPW
      );
      let MN = this.SDL_Global.CMD.SYS_MN.Format(this.SYS.MN);
      let ml =
        ProtocolType +
        ";" +
        PlatformName +
        ";" +
        PlatformIP +
        ";" +
        PlatformPort +
        ";" +
        PlatformPW +
        ";" +
        MN;

      this.Sendml(name, ml);
      let $this = this;
      $this.isEditPlatformLoading = true;
      setTimeout(function () {
        $this.isEditPlatform = false;
        $this.isEditPlatformLoading = false;
      }, 1000);
    },
  },
};
</script>
<style scoped>
/* 内容 */
.el-tab-pane {
  margin: 0px 20px;
}

.jbxx-body .card-body {
  /* text-align: center; */
  width: 500px;
  margin: auto;
}

.sjbf-body {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #303a4c;
}

.addbtn {
  float: right;
  margin-right: 20px;
  margin-top: 8px;
}

.header-card {
  height: 49px;
}

.card-title {
  display: inline-block;
  margin-top: 10px;
  margin-left: 20px;
}

.btn {
  font-size: 14px;
  color: #4a92ff;
  cursor: pointer;
}

.el-radio {
  color: #cccccc;
}

.el-dialog__body {
  text-align: left !important;
}

/* 上传参数 */
.upload {
  margin-top: 20px;
}

/* 上传name */
.csName {
  display: inline-block;
  color: #cccccc;
  margin-left: 22px;
  text-align: center;
  font-size: 14px;
}

/* 上传input */
.csInput {
  display: inline-block;
  color: #cccccc;
  text-align: center;
  font-size: 14px;
  width: 40%;
}

.csInputs {
  display: inline-block;
  color: #cccccc;
  text-align: center;
  font-size: 14px;
  width: 53%;
}

/* 上传btn */
.sendbtn {
  display: inline-block;
  width: 20px;
  height: 30px;
  font-size: large;
  text-align: right;
  cursor: pointer;
}

/* 多选框 */
.el-checkbox {
  color: #cccccc;
  /* margin: 10px 25px; */
}

.el-icon-edit {
  color: rgb(74, 146, 255);
}
</style>