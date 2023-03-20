<template>
  <div class="yhgl">
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row :gutter="20">
              <el-col :sm="8" :md="12" :lg="8" :xl="5">
                <label class="rwlx"> 备件分类</label>
                <el-select v-model="queryParams.polId" size="small" style="width: 75%" placeholder="请选择"
                  @change="changeQuertyPolId">
                  <el-option key="all" label="全部" value=""> </el-option>
                  <el-option v-for="item in optionDatas" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="8" :md="12" :lg="8" :xl="5">
                <label class="rwlx"> 类别</label>
                <el-select v-model="myCategory" size="small" style="width: 75%" placeholder="请选择"
                  @change="changeQuertmyCategory">
                  <el-option key="all" label="全部" value=""> </el-option>
                  <el-option v-for="item in CategoryList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="8" :md="12" :lg="8" :xl="5">
                <div class="topClass">
                  <label class="rwlx"> 关键字&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <el-input v-model="keyWord" size="small" style="width: 75%" placeholder="请输入" type="text"
                    @change="changekeyWord">
                  </el-input>
                </div>
              </el-col>

              <el-col :sm="16" :md="14" :lg="12" :xl="7">
                <div style="padding-top: 5px">
                  <label class="rwlx" style="margin-right: 15px">
                    过期状态</label>
                  <el-radio @change="changeQueryCurrentStatus" v-model="queryParams.currentStatus" label="">全部
                  </el-radio>
                  <el-radio @change="changeQueryCurrentStatus" v-model="queryParams.currentStatus" label="0">正常
                  </el-radio>
                  <el-radio @change="changeQueryCurrentStatus" v-model="queryParams.currentStatus" label="1">即将过期
                  </el-radio>
                  <el-radio @change="changeQueryCurrentStatus" v-model="queryParams.currentStatus" label="2">已过期
                  </el-radio>
                </div>
              </el-col>
              <el-button style="float: right; margin-right: 20px" type="primary" size="small"
                @click="openDialog(false)">添加</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <el-table v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="数据正在加载中"
          :data="
            tableData.datas.slice(
              (this.tableData.pageIndex - 1) * this.tableData.pageSize,
              (this.tableData.pageIndex - 1) * this.tableData.pageSize +
                this.tableData.pageSize
            )
          " :header-cell-style="{
            'background-color': '#384565',
          }" style="text-align: center" :height="tableHeight" stripe>
          <el-table-column label="序号" align="center" type="index" width="50px">
          </el-table-column>
          <el-table-column label="编码" align="center" prop="StockCode" width="120px">
          </el-table-column>
          <el-table-column label="备件分类" align="center" width="150px" prop="PolIdName">
          </el-table-column>
          <el-table-column label="备件名称" align="left" prop="Name" width="150px">
          </el-table-column>
          <el-table-column label="类别" align="center" width="120px" prop="CategoryName">
          </el-table-column>
          <el-table-column label="到期时间" align="center" width="120px" prop="ExpireTime">
          </el-table-column>
          <!-- <el-table-column
            label="存货编号"
            align="left"
            prop="StockCode"
            width="150px"
          > -->
          </el-table-column>
          <!-- <el-table-column label="规格型号" align="left" prop="ModelNum" width="350px">
          </el-table-column> -->
          <el-table-column label="单位" align="center" width="80px" prop="Unit" v-if="true">
          </el-table-column>
          <el-table-column label="数量" align="center" width="80px" prop="Quantity" v-if="true">
          </el-table-column>
          <el-table-column label="更换周期(月)" align="center" width="120px" prop="CycleMonth">
          </el-table-column>

          <el-table-column label="过期状态" align="center" width="120px" prop="CurrentStatus" fixed="right">
            <template slot-scope="scope">
              <el-tag :type="
                  scope.row.CurrentStatus == 0
                    ? 'success'
                    : scope.row.CurrentStatus == 1
                    ? 'warning'
                    : 'danger'
                " size="mini">{{
                scope.row.CurrentStatus == 0
                ? "正常"
                : scope.row.CurrentStatus == 1
                ? "即将过期"
                : "已过期"
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="图片" align="left" prop="ImgUrl">
            <template slot-scope="scope">
              <span @click="selPic(scope.row)" v-if="scope.row.ImgUrl != '' && scope.row.ImgUrl != null"
                style="cursor: pointer; color: #4a92ff">
                查看大图
              </span>
              <span v-else> 暂无图片 </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="190px" fixed="right">
            <template slot-scope="scope">
              <div>
                <span style="cursor: pointer; color: #409eff" @click="openDialog(scope.row)">编辑信息</span>
                |
                <span style="cursor: pointer; color: #409eff" @click="openUpdateDialog(scope.row)">更新状态</span>
              </div>
              <!-- <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="openDialog(scope.row)"
              >
              </el-button> -->

              <!-- <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delData(scope.row)">
                </el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="pageNations">
          <el-pagination class="pageNation" layout="total,sizes,prev, pager, next" :page-size="tableData.pageSize"
            :page-sizes="[5, 10, 20, 30, 50]" :current-page="tableData.pageIndex" :total="tableData.total"
            @current-change="currentPage" @size-change="changeSize">
          </el-pagination>
          <div style="
              float: left;
              margin-top: 16px;
              margin-left: 15px;
              color: #ff9200;
              font-size: 14px;
            ">
            客服电话 : 010-80735600
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- 模态窗 -->
    <template class="dialogBoxs">
      <el-dialog :title="myForm.PolId != '' ? '编辑备件耗材信息' : '添加备件耗材信息'" :visible.sync="centerDialogVisible" width="60%"
        :modal-append-to-body="false" :close-on-click-modal="false" @close="closeDialog">
        <el-form :label-position="labelPosition" label-width="150px" :model="myForm" status-icon ref="myForm"
          size="mini" :rules="rules">
          <el-form-item label="备件分类" prop="PolId">
            <el-select v-model="myForm.PolId" size="small" placeholder="请选择">
              <el-option v-for="item in optionDatas" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备件名称" prop="Name">
            <el-input v-model="myForm.Name"></el-input>
          </el-form-item>

          <el-form-item label="规格型号" prop="ModelNum">
            <el-input v-model="myForm.ModelNum" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
          </el-form-item>
          <el-form-item label="存货编号" prop="StockCode">
            <el-input v-model="myForm.StockCode"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="Quantity">
            <el-select v-model="myForm.Quantity" size="small" placeholder="请选择">
              <el-option v-for="item in quantityList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位" prop="Unit">
            <el-select v-model="myForm.Unit" size="small" placeholder="请选择">
              <el-option v-for="item in unitList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别" prop="Category">
            <el-radio-group v-model="myForm.Category" @change="changeCategory">
              <el-radio :label="1">普通耗材</el-radio>
              <el-radio :label="2">备件</el-radio>
              <el-radio :label="3">试剂耗材</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="更换周期" prop="CycleMonth">
            <el-radio-group v-model="myForm.CycleMonth" @change="changeCycleMonth">
              <el-radio :label="3">3个月</el-radio>
              <el-radio :label="6">6个月</el-radio>
              <el-radio :label="12">12个月</el-radio>
              <el-radio :label="18">18个月</el-radio>
              <el-radio :label="24">24个月</el-radio>
              <el-radio :label="0">按需更换</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="myForm.Category == 3" label="试剂更换周期(次)" prop="CycleNum">
            <el-input placeholder="请输入内容" v-model="myForm.CycleNum" type="number">
            </el-input>
          </el-form-item>
          <el-form-item label="到期时间" prop="ExpireTime">
            <el-input v-model="myForm.ExpireTime" disabled></el-input>
          </el-form-item>
        </el-form>
        <!-- v-if="myForm.PolId != ''" -->
        <template>
          <!-- <el-row class="rowdiv"> -->
          <!-- 
          <el-upload ref="upload" action="#" :http-request="uploadProductPics" :before-upload="uploadProductPicBefore"
            accept="image/*" list-type="picture-card" :on-preview="handleContImgPreview" :on-remove="updateImgRemove"
            multiple :limit="9" :on-exceed="exceedTips" :file-list="fileListes">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true" :close-on-click-modal="false">
            <img width="100%" :src="dialogContImgUrl" alt />
          </el-dialog> -->
          <!-- <el-form-item label="上传图片"> -->

          <upLoadImg @func="getImgList" :mkdirName="myForm.StockCode" :fileList.sync="fileList">

          </upLoadImg>
          <!-- </el-form-item> -->

          <!-- </el-row> -->
        </template>
        <!-- <template v-else> -->
        <!-- <el-row class="rowdiv"> -->
        <!-- <el-form-item label="上传图片"> -->

        <!-- <el-upload ref="upload" action="#" :http-request="uploadProductPic" :before-upload="uploadProductPicBefore"
            accept="image/*" list-type="picture-card" :on-preview="handleContImgPreview" :on-remove="addImgRemoves"
            multiple :limit="9" :on-exceed="exceedTips" :file-list="fileLists">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true" :close-on-click-modal="false">
            <img width="100%" :src="dialogContImgUrl" alt />
          </el-dialog> -->
        <!-- <el-form-item label="上传图片"> -->

        <!-- <upLoadImg @func="getImgList"> -->

        <!-- </upLoadImg> -->
        <!-- </el-form-item> -->

        <!-- </el-row> -->
        <!-- </template> -->

        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="submitForm('myForm')" size="small">保 存</el-button>
        </span>
      </el-dialog>
    </template>

    <template class="dialogBoxs">
      <el-dialog title="图片显示" :visible.sync="picdialog" width="60%" :modal-append-to-body="false"
        :close-on-click-modal="false">
        <el-carousel indicator-position="outside" :autoplay="false">
          <el-carousel-item v-for="item in imgPaths" :key="item">
            <!-- <el-image style="height: 100%; width: 100%" :src="item" fit="scale-down"></el-image>
           -->
            <img :src="item" style="height: 460px; width: 420px" @click='ImgPreview(item)' />
          </el-carousel-item>
        </el-carousel>
        <el-dialog :visible.sync="dialogContImgVisible" :append-to-body="true" :close-on-click-modal="false">
          <img width="100%" :src="dialogContImgUrl" alt />
        </el-dialog>
      </el-dialog>
    </template>
    <template class="dialogBoxs">
      <el-dialog title="更新备件耗材状态" :visible.sync="updateDialogVisible" width="60%" :modal-append-to-body="false"
        :close-on-click-modal="false" @close="closeDialog">
        <el-form :label-position="labelPosition" label-width="150px" :model="myForm" status-icon ref="myForm"
          size="mini" :rules="rules">
          <el-form-item label="备件分类" prop="PolId">
            <el-select disabled v-model="myForm.PolId" size="small" placeholder="请选择">
              <el-option v-for="item in optionDatas" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备件名称" prop="Name">
            <el-input disabled v-model="myForm.Name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="规格型号" prop="ModelNum">
            <el-input readonly=""
              v-model="myForm.ModelNum"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="数量" prop="Quantity">
            <el-select disabled v-model="myForm.Quantity" size="small" placeholder="请选择">
              <el-option v-for="item in quantityList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="单位" prop="Unit">
            <el-select disabled v-model="myForm.Unit" size="small" placeholder="请选择">
              <el-option
                v-for="item in unitList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="类别" prop="Category">
            <el-radio-group disabled="" v-model="myForm.Category" @change="changeCategory">
              <el-radio :label="1">普通耗材</el-radio>
              <el-radio :label="2">备件</el-radio>
              <el-radio :label="3">试剂耗材</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="更换周期" prop="CycleMonth">
            <el-radio-group v-model="myForm.CycleMonth" @change="changeCycleMonth">
              <el-radio :label="3">3个月</el-radio>
              <el-radio :label="6">6个月</el-radio>
              <el-radio :label="12">12个月</el-radio>
              <el-radio :label="18">18个月</el-radio>
              <el-radio :label="24">24个月</el-radio>
              <el-radio :label="0">按需更换</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="myForm.Category == 3" label="试剂更换周期(次)" prop="CycleNum">
            <el-input placeholder="请输入内容" v-model="myForm.CycleNum" type="number">
            </el-input>
          </el-form-item>
          <el-form-item label="到期时间" prop="ExpireTime">
            <el-input v-model="myForm.ExpireTime" disabled></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="updateForm('myForm')" size="small">更 新</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import moment from "moment";
  import axios from "axios"; // 引入axios
  import upLoadImg from "../module/upLoadImg";
  // import appConfig from "@appConfig";


  export default {
    name: "bjhcgl",
    components: { upLoadImg },
    data() {
      return {
        centerDialogVisible: false,
        updateDialogVisible: false,
        labelPosition: "right",
        SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
        dirName: '',
        myForm: {
          ID: 0,
          PolId: "",
          Name: "",
          StockCode: "",
          ModelNum: "",
          Unit: "个",
          Quantity: 1,
          Category: 1,
          CycleMonth: 6,
          CycleNum: 500,
          ExpireTime: moment().add(6, "months").format("YYYY-MM-DD 00:00:00"),
          CurrentStatus: 0,
          imageList: [],
        },

        picList: [],
        fileLists: [],
        fileListes: [],
        // fileList: [],
        imgPaths: [],
        picdialog: false,

        ImgUrl: "",

        fileList: [],
        dialogImageUrl: [],
        dialogContImgVisible: false,
        dialogContImgUrl: false,

        oneFlag: false,
        tempTableData: {
          datas: [],
          total: 0,
          pageIndex: 1,
          pageSize: 20,
        },
        tableData: {
          datas: [],
          total: 0,
          pageIndex: 1,
          pageSize: 20,
        },
        queryParams: {
          polId: "",
          NameOrStockCode: "",
          Category: "",
          currentStatus: "",
        },
        pictLoading: false,
        tableHeight: null,
        optionDatas: [], //备件分类
        keyWord: "",
        myCategory: "",
        CategoryList: [
          { value: "1", label: "普通耗材" },
          { value: "2", label: "备件" },
          { value: "3", label: "试剂耗材" },
        ],
        unitList: [
          { value: "个", label: "个" },
          { value: "根", label: "根" },
          { value: "米", label: "米" },
          { value: "套", label: "套" },
          { value: "瓶", label: "瓶" },
        ],
        quantityList: [], //数量
        rules: {
          PolId: [
            { required: true, message: "请选择备件分类", trigger: "change" },
          ],
          Name: [
            { required: true, message: "备件名称不能为空", trigger: "blur" },
          ],
          ModelNum: [
            { required: true, message: "规格型号不能为空", trigger: "blur" },
          ],
        },
      };
    },
    mounted() {
      this.quantityList = [];
      for (var i = 1; i <= 30; i++) {
        this.quantityList.push({ value: i, label: i });
      }

      var expireType = this.$route.query.ExpireType;
      if (expireType) {
        // this.queryParams.currentStatus = 1;
        this.queryParams.currentStatus = "1";
      }
      this.getOptionDatas();
      this.getData(1);
      this.getHeight();
      var that = this;
      if (expireType) {
        setTimeout(function () {
          that.changeQueryCurrentStatus("1");
        }, 100);
      }

    },
    created() {
      window.addEventListener("resize", this.getHeight);
    },
    destroyed() {
      window.removeEventListener("resize", this.getHeight);
    },
    methods: {
      //备件分类下拉切换
      changeQuertyPolId(item) {
        this.queryParams.polId = item;
        this.getData(1);
      },
      changekeyWord(item) {
        this.queryParams.NameOrStockCode = item;

        this.getData(1);
      },
      changeQuertmyCategory(item) {
        this.queryParams.Category = item;
        this.getData(1);
      },
      //过期状态过滤切换
      changeQueryCurrentStatus(item) {
        if (!this.oneFlag) {
          this.tempTableData = Object.assign({}, this.tableData);
          this.oneFlag = true;
        }

        if (item != "") {
          this.tableData.datas = this.tempTableData.datas.filter(
            (m) => m.CurrentStatus == item
          );
          this.tableData.total = this.tableData.datas.length;
        } else {
          this.tableData = Object.assign({}, this.tempTableData);
        }
      },
      //获取备件分类下拉菜单
      getOptionDatas() {
        let $this = this;
        this.optionDatas.push({ value: "w00000", label: "系统" });

        this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().map(function (
          item,
          index
        ) {
          if (item.IsNormal)
            $this.optionDatas.push({
              value: item.Code,
              label: item.Name,
              id: item.ID,
            });
        });
      },
      ImgPreview(file) {
        debugger
        this.dialogContImgUrl = file;
        this.dialogContImgVisible = true;
      },
      // 子组件传递图片集合
      getImgList(val) {
        debugger
        this.myForm.imageList = val;
        console.log("imageList", this.myForm.imageList);

      },
      //打开弹窗
      openDialog(obj) {
        this.centerDialogVisible = true;
        this.resetForm();
        this.emptyUpload();
        if (obj == false) {
          this.fileListes = [];
          // this.imageList = "";
          // this.myForm.imageList = "";
          this.fileList = [];
        }

        obj && Object.assign(this.myForm, obj);

        this.changeCycleMonth(this.myForm.CycleMonth);
        debugger
        if (obj.ImgUrl) {
          // this.myForm.imageList = "";
          // this.picList = [];

          this.dialogImageUrl = obj.ImgUrl.split(';').filter(m => m != '');;


          for (var i = 0; i < this.dialogImageUrl.length; i++) {
            let flie1 = {
              name: "11",
              url: this.GetAppConfigJson().ImgHostName + this.dialogImageUrl[i],  //appConfig.ImgHostName + this.dialogImageUrl[i],
              imgUrl: this.dialogImageUrl[i]
            };
            this.fileList.push(flie1);
          }
        } else {
          this.fileList = [];
        }
        // console.log("翻填图片", this.fileListes);
        // this.dirName = this.myForm.StockCode
      },
      //打开更新备件耗材记录弹窗
      openUpdateDialog(obj) {
        this.updateDialogVisible = true;
        this.resetForm();
        obj && Object.assign(this.myForm, obj);

        this.changeCycleMonth(this.myForm.CycleMonth);
      },
      //关闭弹窗
      closeDialog() {
        this.resetForm();
        this.centerDialogVisible = false;
        this.updateDialogVisible = false;
      },
      //重置表单
      resetForm() {
        //console.log('this.$refs["myForm"]=', this.$refs["myForm"]);
        //TODO:添加表单的时候，会出现表单清空失败的问题，组件bug
        this.myForm = {
          ID: 0,
          PolId: "",
          Name: "",
          ModelNum: "",
          StockCode: "",
          Unit: "个",
          Quantity: 1,
          Category: 1,
          CycleMonth: 6,
          CycleNum: 500,
          ExpireTime: moment().add(6, "months").format("YYYY-MM-DD 00:00:00"),
        };
        this.fileList = [];

        //清空表单验证
        this.$refs["myForm"] && this.$refs["myForm"].resetFields();
      },
      // 获取列表数据
      getData(pageIndex) {
        this.tableData.datas = [];
        let _PolId = [this.queryParams.polId];
        if (_PolId == "") {
          _PolId = this.socketApi.globalDataConfig.SDL_Global.MetersDataPP()
            .filter((m) => m.IsNormal).map(m => m.Code);
        }
        let condition = {
          PolId: _PolId,
          NameOrStockCode: this.queryParams.NameOrStockCode,
          Category: this.queryParams.Category,
        };
        this.pictLoading = true;
        let $this = this;
        this.http
          .get("/getSparePartsDatas", condition)
          .then((res) => {
            this.pictLoading = false;
            this.tableData.pageIndex = pageIndex;

            if (res.length != 0) {
              res.forEach(function (item) {
                if (item.Category == 1) {
                  item.CategoryName = "普通耗材";
                } else if (item.Category == 2) {
                  item.CategoryName = "备件";
                } else {
                  item.CategoryName = "试剂耗材";
                }
                let lables = $this.optionDatas.filter(
                  (m) => m.value == item.PolId
                );
                if (lables.length > 0) {
                  item.PolIdName = lables[0].label;
                }

                //判断过期状态
                let exDays = moment(moment(item.ExpireTime).format("YYYY-MM-DD")).diff(moment(), "days");
                if (item.ExpireTime != null) {
                  if (exDays >= 0 && exDays <= 7) {
                    item.CurrentStatus = 1; //即将过期
                  } else if (exDays < 0) {
                    item.CurrentStatus = 2; //已过期
                  } else {
                    item.CurrentStatus = 0; //正常
                  }
                } else {
                  item.CurrentStatus = 0; //正常
                }

                item.ExpireTime =
                  item.ExpireTime == null
                    ? "2099-01-01"
                    : moment(item.ExpireTime).format("YYYY-MM-DD");

                return true;
              });
              this.tableData.total = res.length;
              this.tableData.datas = res;
            } else {
              this.tableData.total = 0;
            }
          })
          .catch((res) => {
            this.pictLoading = false;
            console.log(res);
          });
      },
      getHeight() {
        this.tableHeight = window.innerHeight - 226;
      },

      // 添加日志
      // addlog(obj) {
      //   this.http
      //     .post("/addlog", {
      //       OPTIME: moment().format("YYYY-MM-DD HH:mm:ss"),
      //       username: localStorage.getItem("Loginedname"),
      //       operator: obj.content,
      //       cmdargs: obj.params,
      //     })
      //     .then((res) => {
      //       //let ml = "日志上传=" + operator;
      //       // this.Sendml("日志上传", ml)
      //     })
      //     .catch((res) => {
      //       // console.log(res);
      //       this.$message.error(res);
      //     });
      // },
      //切换类别
      changeCategory(item) {
        if (item == 2) {
          this.myForm.CycleMonth = 0;
        } else {
          this.myForm.CycleMonth = 6;
        }
        this.changeCycleMonth(this.myForm.CycleMonth);
      },

      //更换周期改变时间
      changeCycleMonth(item) {
        if (item > 0) {
          this.myForm.ExpireTime = moment()
            .add(item, "months")
            .format("YYYY-MM-DD 00:00:00");
        } else {
          this.myForm.ExpireTime = moment().format("2099-01-01 00:00:00");
        }
      },
      //更新备件耗材过期时间
      updateForm(form) {
        let $this = this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            $this
              .$confirm("确认更新备件耗材过期时间信息吗, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                //更换试剂的时候， 更新global表
                $this.myForm.PolName = $this.optionDatas.filter(
                  (m) => m.value == $this.myForm.PolId
                )[0].id;

                if ($this.myForm.Category == 3) {
                  let Pid = "";
                  // if ($this.myForm.PolId == '') {

                  if ($this.myForm.PolId == "w21011") {
                    Pid = "TP";
                  } else if ($this.myForm.PolId == "w21001") {
                    Pid = "TN";
                  } else if ($this.myForm.PolId == "w21003") {
                    Pid = "NH3";
                  } else if ($this.myForm.PolId == "w01019") {
                    Pid = "COD";
                  } else if ($this.myForm.PolId == "w01018") {
                    Pid = "CODCR";
                  } else if ($this.myForm.PolId == "'w01009'") {
                    Pid = "溶解氧";
                  } else if ($this.myForm.PolId == "'w01014'") {
                    Pid = "电导率";
                  } else if ($this.myForm.PolId == "'w01003'") {
                    Pid = "浊度";
                  } else if ($this.myForm.PolId == "'w01001'") {
                    Pid = "pH值";
                  } else if ($this.myForm.PolId == "'w01010'") {
                    Pid = "水温";
                  } else if ($this.myForm.PolId == "'w01016'") {
                    Pid = "叶绿素";
                  } else if ($this.myForm.PolId == "'w19011'") {
                    Pid = "藻密度";
                  }

                  // }
                  let syzl = $this.SDL_Global.CMD.YiBiao_ShiJiZongLiang.Format(
                    Pid,
                    $this.myForm.CycleNum
                  );
                  // let bjxx = this.SDL_Global.CMD.YiBiao_ShiJiXiaXian.Format(id, this.sicanForm[id]["sjyl"].bjxx);
                  let sjsy = $this.SDL_Global.CMD.YiBiao_ShiJiYuLiang.Format(
                    Pid,
                    $this.myForm.CycleNum
                  );
                  let sjdqsj =
                    $this.SDL_Global.CMD.YiBiao_ShiJiDaoQiShiJiian.Format(
                      Pid,
                      $this.myForm.ExpireTime
                    );

                  let sjname = $this.myForm.PolName + "试剂余量修改";

                  let data =
                    "" +
                    localStorage.getItem("Loginedname") +
                    "," +
                    sjname +
                    "," +
                    syzl +
                    ";" +
                    sjsy +
                    ";" +
                    sjdqsj;
                  // this.$message.info(data);
                  // console.log('data=',data);
                  this.socketApi.sendSock(data);
                }

                $this.http
                  .post("/updateSparePartsExpireData", $this.myForm)
                  .then((res) => {
                    console.log(res);
                    if (res.affectedRows > 0 || res[0].affectedRows > 0) {
                      // $this.addlog({
                      //   content: "更新备件耗材过期时间数据",
                      //   params: JSON.stringify($this.myForm),
                      // });
                      $this.http.addLog("更新备件耗材过期时间数据", JSON.stringify($this.myForm), true);

                      $this.$message.success("操作成功");
                      $this.closeDialog();
                      $this.getData(1);
                    } else {
                      $this.$message.error("操作失败");
                    }
                  })
                  .catch((res) => {
                    console.log("res=", res);
                    $this.$message.error(res);
                  });
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        return;
      },

      // //【编辑功能内容图删除事件】
      // updateImgRemove: function (file, fileList) {
      //   debugger

      //   let files = [];
      //   for (let i = 0; i < fileList.length; i++) {
      //     files.push(fileList[i].raw);
      //   }
      //   this.picList = files;

      //   let urlIndexs = -1;

      //   urlIndexs = this.fileListes.findIndex((item) => {
      //     if (item.url == file.url) {
      //       return true;
      //     }
      //   });
      //   if (urlIndexs > -1) {
      //     this.fileListes.splice(urlIndexs, 1);
      //   }
      // },
      // //【内容图删除事件】
      // addImgRemoves: function (file, fileLists) {
      //   let files = [];
      //   for (let i = 0; i < fileLists.length; i++) {
      //     files.push(fileLists[i].raw);
      //   }
      //   this.picList = files;

      //   let urlIndex = -1;
      //   debugger
      //   urlIndex = this.fileLists.findIndex((item) => {
      //     if (item.url == file.url) {
      //       return true;
      //     }
      //   });
      //   this.fileLists.splice(urlIndex, 1);

      //   console.log("翻填时图片", this.fileList);
      // },
      // //内容图数量限制3张
      // exceedTips: function () {
      //   this.$message.error("最多只能上传九张图片");
      // },

      // //【内容图片预览事件】
      // handleContImgPreview: function (file) {
      //   this.dialogContImgUrl = file.url;
      //   this.dialogContImgVisible = true;
      // },

      // //上传内容图
      // uploadProductPic: function (file) {
      //   debugger
      //   this.picList.push(file.file);
      //   debugger
      //   const config = {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   };
      //   //debugger
      //   let files = this.picList;

      //   let formData = new FormData();
      //   for (let i = 0; i < files.length; i++) {
      //     formData.append("file1", files[i]);
      //   }
      //   // this.imageList = [];
      //   console.log("imageList", this.myForm.imageList);
      //   // $this.myForm
      //   formData.append("dircName", this.myForm.Name);
      //   axios
      //     .post("/uplodeImges", formData, config)
      //     .then((res) => {
      //       this.myForm.imageList = res.data;
      //       console.log("pic", this.myForm.imageList);
      //     })
      //     .catch((res) => {
      //       this.$message({
      //         message: res.response.data,
      //         type: "warning",
      //         duration: 2000,
      //       });
      //     });
      // },
      // //上传内容图
      // uploadProductPics: function (file) {
      //   //debugger
      //   // this.picList=[];
      //   this.picList.push(file.file);
      //   debugger
      //   const config = {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   };
      //   //debugger
      //   let files = this.picList;

      //   let formData = new FormData();
      //   for (let i = 0; i < files.length; i++) {
      //     formData.append("file1", files[i]);
      //   }
      //   formData.append("dircName", this.myForm.Name);

      //   axios
      //     .post("/uplodeImges", formData, config)
      //     .then((res) => {
      //       //debugger
      //       this.myForm.imageList = res.data;
      //       console.log("pic1", res.data);
      //     })
      //     .catch((res) => {
      //       this.$message({
      //         message: res.response.data,
      //         type: "warning",
      //         duration: 2000,
      //       });
      //     });
      // },

      // //内容图上传前的大小 格式的校验
      // uploadProductPicBefore: function (file) {
      //   var fileType = file.type;
      //   var isJpg = false;
      //   if (
      //     fileType == "image/jpeg" ||
      //     fileType == "image/png" ||
      //     fileType == "image/bmp"
      //   ) {
      //     isJpg = true;
      //   }

      //   if (!isJpg) {
      //     //debugger
      //     this.$message({
      //       message: "上传的图片只能是jpg、png、bmp格式!",
      //       type: "warning",
      //     });
      //   }
      //   return isJpg;
      // },

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
        debugger

        this.picdialog = true;
        this.imgPaths = val.ImgUrl.split(';').filter(m => m != '');
        for (var i = 0; i < this.imgPaths.length; i++) {

          this.imgPaths[i] = this.GetAppConfigJson().ImgHostName + this.imgPaths[i];  //appConfig.ImgHostName + this.imgPaths[i];

        }
        console.log("this.imgPaths", this.imgPaths);

      },



      //添加/编辑
      submitForm(form) {
        let $this = this;
        this.$refs[form].validate((valid) => {


          // if ($this.myForm.imageList != null && $this.myForm.imageList != "") {
          //   $this.images = "";
          //   console.log("$this.myForm.imageList", $this.myForm.imageList);
          //   if ($this.myForm.imageList.indexOf(";") > -1) {
          //     $this.myForm.imageList = $this.myForm.imageList.split(";");
          //   }
          //   console.log("$this.myForm.imageList", $this.myForm.imageList);

          //   for (let k = 0; k < $this.myForm.imageList.length; k++) {
          //     if ($this.myForm.imageList[k] != "") {
          //       $this.images += $this.myForm.imageList[k] + ";";
          //     }
          //   }
          // }
          // // //编辑时图片
          // let files1 = $this.fileListes;
          // console.log("files1", files1);

          // for (let i = 0; i < files1.length; i++) {
          //   $this.images +=
          //     this.myForm.Name +
          //     "/" +
          //     files1[i].url.substring(
          //       files1[i].url.lastIndexOf("/") + 1,
          //       files1[i].url.length
          //     ) +
          //     ";";
          //   // formData1.append("file2", files1[i].url.substring(files1[i].url.lastIndexOf('/') + 1, files1[i].url.length));
          // }
          debugger

          $this.myForm.imageList = $this.myForm.imageList.join(';');
          debugger
          console.log("$this.myForm=", $this.myForm);
          if (valid) {
            $this
              .$confirm("确认提交备件耗材信息吗, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
              .then(() => {
                $this.http
                  .post("/updateSparePartsData", $this.myForm)
                  .then((res) => {
                    console.log(res);
                    if (res.affectedRows > 0 || res[0].affectedRows > 0) {
                      $this.http.addLog("更新备件耗材数据",  JSON.stringify($this.myForm), true);

                      // $this.addlog({
                      //   content:
                      //     $this.myForm.ID > 0
                      //       ? "更新备件耗材数据"
                      //       : "添加备件耗材数据",
                      //   params: JSON.stringify($this.myForm),
                      // });
                      $this.$message.success("操作成功");
                      $this.closeDialog();
                      $this.getData(1);
                    } else {
                      $this.$message.error("操作失败");
                    }
                  })
                  .catch((res) => {
                    console.log("res=", res);
                    $this.$message.error(res);
                  });
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        return;
      },
      currentPage(val) {
        this.tableData.pageIndex = val;
      },
      changeSize(val) {
        this.tableData.pageSize = val;
      },
    },
  };
</script>
<style scoped>
  /* 角色颜色 */
  .el-radio {
    color: #cccccc;
  }

  .yhgl .el-form {
    margin: 20px;
    text-align: left;
  }

  @media only screen and (max-width: 1024px) {
    .topClass {
      padding-top: 5px;
    }
  }

  /* 模态框 */
  .el-dialog__footer {
    text-align: center !important;
  }

  .el-carousel__container {
    height: 720px !important;
  }

  .el-select {
    width: 100%;
  }
</style>