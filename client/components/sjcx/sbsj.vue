<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row :gutter="20">
              <el-col :sm="12" :md="12" :lg="10" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker
                  v-model="dateValue"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  unlink-panels
                  :clearable="false"
                  style="width: 85%"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss "
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  @change="selsuorce"
                >
                </el-date-picker>
              </el-col>

              <el-col :sm="8" :md="9" :lg="7" :xl="5">
                <label class="rwlx"> 上报平台</label>
                <el-select
                  v-model="Platformid"
                  size="small"
                  style="width: 75%"
                  placeholder="请选择"
                  @change="selsuorce"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <!-- <el-input v-model="PlatformNamequery" size="small" style="width: 60%" placeholder="请输入" type="text"
                  @change="selPlatfor">
                </el-input> -->
              </el-col>
              <el-col :sm="12" :md="5" :lg="3" :xl="3">
                <label class="rwlx"> 来源</label>
                <el-select
                  v-model="suorceType"
                  size="small"
                  style="width: 60%"
                  placeholder="请选择"
                  @change="selsuorce"
                >
                  <el-option
                    v-for="item in Source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="12" :md="5" :lg="3" :xl="3">
                <label class="rwlx"> 状态</label>
                <el-select
                  v-model="stateType"
                  size="small"
                  style="width: 60%"
                  placeholder="请选择"
                  @change="selsuorce"
                >
                  <el-option
                    v-for="item in stateoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="8" :md="8" :lg="5" :xl="3">
                <label class="rwlx"> 数据包</label>
                <el-input
                  v-model="content"
                  size="small"
                  style="width: 60%"
                  placeholder="请输入"
                  type="text"
                  @change="selsuorce"
                >
                </el-input>
              </el-col>

              <el-col :sm="5" :md="4" :lg="4" :xl="4" class="btns">
                <el-button
                  type="primary"
                  size="small"
                  @click="pushData('dialogForm')"
                  >数据补缺
                </el-button>
                <!-- <excel :excelTitleName='excelTitleName' :exportHeader='exportHeader' :exportFilterVal='exportFilterVal'
                  :exportList='exportList'></excel> -->
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <!-- <div class="panel-body"> -->
        <!-- <tables :dataSource="tableData" :columns="columns" :height="268" :border="true"></tables> -->
        <el-table
          :data="tableData"
          v-loading="pictLoading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          element-loading-text="数据正在加载中"
          :header-cell-style="{
            'background-color': '#384565',
          }"
          style="text-align: center"
          :height="tableHeight"
          stripe
          :empty-text="emptyText"
          class="table"
        >
          <el-table-column
            label="时间"
            align="center"
            prop="AddTime"
            width="180"
          >
          </el-table-column>
          <el-table-column label="来源" align="center" prop="Source" width="80">
          </el-table-column>
          <el-table-column label="状态" align="center" prop="Status" width="80">
          </el-table-column>
          <el-table-column
            label="上报平台"
            align="center"
            prop="PlatformName"
            width="210"
          >
          </el-table-column>
          <el-table-column label="数据包" align="left" prop="DataPacket">
          </el-table-column>
        </el-table>
        <div class="pageNations">
          <el-pagination
            @current-change="currentPage"
            class="pageNation"
            layout="total,sizes,prev, pager, next"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 30, 50]"
            @size-change="changeSize"
            :current-page="pageIndex"
            :total="pageTotal"
          >
          </el-pagination>
          <el-button
            size="small"
            @click="exportData"
            type="primary"
            :loading="isLoading"
            style="float: left; margin-top: 8px; margin-left: 15px"
          >
            导出
          </el-button>
          <el-button
            size="small"
            @click="getNewData"
            type="primary"
            style="float: left; margin-top: 8px; margin-left: 15px"
          >
            刷新
          </el-button>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <el-dialog
      class="sdl-dialog"
      title="数据补发"
      :visible.sync="centerDialogVisible"
      width="60%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :rules="rules"
        :model="dialogForm"
        ref="dialogForm"
        size="mini"
      >
        <el-form-item label="上报平台" prop="dataSource">
          <el-select
            v-model="dialogForm.dataSource"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数据类型" prop="dataType" required>
          <!-- <el-input v-model.number="dialogForm.dataType" placeholder="示列：2061"></el-input> -->
          <el-select
            v-model="dialogForm.dataType"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionlist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime" required>
          <el-date-picker
            class="time"
            width="100%"
            v-model="dialogForm.beginTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" required>
          <el-date-picker
            class="time"
            width="100%"
            v-model="dialogForm.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
          <p style="color: sandybrown; text-align: left">
            注：点击'开始'后，可在'日志数据'列表查看补发进度
          </p>
          <!-- <el-alert style="margin-top: 10px;height: 20px;"  title="当运行模式为 [维护模式] 下才能进行以下操作！ " type="info" show-icon>
          </el-alert> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('dialogForm')" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitForm('dialogForm')" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import excel from "../module/excel";
const { export_json_to_excel } = require("excel/Export2Excel");
export default {
  name: "sbsj",
  components: { excel },
  data() {
    return {
      emptyText: "暂无数据",
      dateValue: [
        moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              picker.$emit("pick", [
                moment().subtract(7, "day").format("YYYY-MM-DD 00:00:00"),
                moment().format("YYYY-MM-DD HH:mm:ss"),
              ]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              picker.$emit("pick", [
                moment().subtract(1, "months").format("YYYY-MM-DD 00:00:00"),
                moment().format("YYYY-MM-DD HH:mm:ss"),
              ]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              picker.$emit("pick", [
                moment().subtract(3, "months").format("YYYY-MM-DD 00:00:00"),
                moment().format("YYYY-MM-DD HH:mm:ss"),
              ]);
            },
          },
        ],
      },
      stateoptions: [
        { value: "", label: "全部" },
        // { value: "-1", label: "未知" },
        { value: "1", label: "成功" },
        { value: "0", label: "失败" },
        { value: "-1", label: "未知" },
        { value: "-2", label: "断网" },
      ],
      stateType: "",
      Source: [
        { value: "", label: "全部" },
        { value: "1", label: "发送" },
        { value: "2", label: "接收" },
      ],
      centerDialogVisible: false, //模态框
      rules: {
        dataType: [
          { required: true, message: "数据类型不能为空" },
          // { type: "number", message: "数据类型必须为数字值(例如：2061)" },
        ],
        beginTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change",
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change",
          },
        ],
      },
      dialogForm: {
        dataType: "",
        dataSource: "",
        beginTime: moment().subtract(1, "day").format("YYYY-MM-DD 00:00:00"),
        endTime: moment().subtract(1, "day").format("YYYY-MM-DD 23:59:59"),
      },
      options: [
        {
          value: "",
          label: "全部",
        },
      ],
      optionlist: [
        {
          value: "2011",
          label: "实时数据",
        },
        {
          value: "2061",
          label: "小时数据",
        },
        {
          value: "2062",
          label: "标样核查数据",
        },
        {
          value: "2063",
          label: "加标回收数据",
        },
        {
          value: "2064",
          label: "平行样测试数据",
        },
        {
          value: "2065",
          label: "零点核查数据",
        },
        {
          value: "2066",
          label: "跨度数据",
        },
        {
          value: "2082",
          label: "空白数据",
        },
        {
          value: "3020-1",
          label: "日志数据",
        },
        {
          value: "3020-2",
          label: "关键参数",
        },
      ],
      labelPosition: "right",
      suorceType: "",
      content: "",
      Platformid: "",
      tableData: [],
      excelTitleName: "上报数据", //excel标题名字
      exportHeader: [], //导出 字段表头
      exportFilterVal: [], //表头对应字段
      exportList: [], //excel数据
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 30,
      pictLoading: false,
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      tableHeight: null,
      emptyText: "暂无数据",
      isLoading: false,
    };
  },
  mounted() {
    // this.inquire();
    this.getData();
    this.inquires();
    this.getHeight();
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.tableHeight = window.innerHeight - 226 - 10;
    },

    inquires() {
      this.options = [
        {
          value: "",
          label: "全部",
        },
      ];
      let condition = "";
      this.emptyText = " ";

      this.http
        .comMethod("*", "tbupconfig", condition)
        .then((res) => {
          if (res.length != 0) {
            //表格数据
            res.forEach((r) => {
              let obj = {
                value: r.PlatformIP + ":" + r.PlatformPort,
                label: r.PlatformName,
              };

              this.options.push(obj);
            });
          } else {
            this.emptyText = "暂无数据";
          }
        })
        .catch((res) => {
          setTimeout(() => {
            this.emptyText = "暂无数据";
          }, 1000);
          // console.log(res);
        });
    },
    // 获取最新数据
    getNewData() {
      this.pageIndex = 1;
      // debugger;
      // this.dateValue[1]= moment().format("YYYY-MM-DD HH:mm:ss");
      (this.dateValue = [
        moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
      ]),
        this.getData();
    },
    //来源
    selsuorce(val) {
      this.pageIndex = 1;
      this.getData();
    },
    // selPlatfor(val) {
    //
    //   this.pageIndex = 1
    //   this.inquire();
    // },getData
    // 查询
    inquire() {
      console.log(" this.options=", this.options);
      this.pictLoading = true;
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
      // console.log('times',  this.dateValue[1]);

      if (this.dateValue == null) {
        this.pictLoading = false;
        this.tableData = [];

        this.emptyText = "暂无数据";
      }
      let condition = "";

      let nowpage = "";
      nowpage = (this.pageIndex - 1) * this.pageSize;
      let conditions = "";
      conditions =
        "AddTime BETWEEN '" +
        this.dateValue[0] +
        "' and '" +
        this.dateValue[1] +
        "'";
      if (this.stateType != "") {
        conditions = conditions + " and Status = '" + this.stateType + "'";
      }
      if (this.suorceType != "") {
        conditions = conditions + " and Source = '" + this.suorceType + "'";
      }
      if (this.content != "") {
        conditions =
          conditions + " and DataPacket like '%" + this.content + "%'";
      }
      // 分页后查询
      if (this.Platformid != "") {
        conditions =
          conditions + " and  IPEndPoint = '" + this.Platformid + "'";
      }
      console.log("查询条件", conditions);
      this.exportHeader = ["时间", "来源", "状态", "上报平台", "数据包"]; //导出 字段表头
      this.exportFilterVal = [
        "AddTime",
        "Source",
        "Status",
        "PlatformName",
        "DataPacket",
      ]; //表头对应字段
      // console.log('query', conditions)
      // console.log('query', conditions)
      // let query = "tbuplog a INNER JOIN (SELECT InstructNo,c.`PlatformName` FROM tbuplog d LEFT  JOIN `tbupconfig` c  ON d.IPEndPoint=CONCAT( c.PlatformIP,':',c.PlatformPort)    where " + conditions + " ORDER BY `addtime` DESC LIMIT " + nowpage + "," + this.size + " ) AS b USING(InstructNo) "
      let query =
        "(SELECT * FROM tbuplog AS a WHERE " +
        conditions +
        " ORDER BY addtime DESC LIMIT  " +
        nowpage +
        "," +
        this.pageSize +
        " ) AS t LEFT JOIN `tbupconfig` c ON t.IPEndPoint = CONCAT(c.PlatformIP,':',c.PlatformPort) ";

      let querylist = "t.*,c.`PlatformName` ";
      this.tableData = [];

      this.http
        .comMethod(querylist, query, condition)
        .then((res) => {
          this.pictLoading = false;
          if (res.length != 0) {
            res.forEach((r) => {
              r.AddTime = this.$options.filters.dateFormat(r.AddTime);

              r["Status"] = this.funStatus(r["Status"]);
              r["Source"] = this.funSource(r["Source"]);
            });
            // ;
            // this.pageTotal = res.length;
            // this.pageIndex = 1;
            //表格数据
            this.tableData = res;
          } else {
            this.emptyText = "暂无数据";

            this.pageTotal = 0;
          }
        })
        .catch((res) => {
          // console.log(res);
          this.pictLoading = false;
          this.emptyText = "暂无数据";
        });
      let totalab =
        "tbuplog a LEFT  JOIN `tbupconfig` c  ON a.IPEndPoint=CONCAT( c.PlatformIP,':',c.PlatformPort)";
      let conditiontotal = "";
      conditiontotal =
        "AddTime BETWEEN '" +
        this.dateValue[0] +
        "' and '" +
        this.dateValue[1] +
        "'";
      if (this.stateType != "") {
        conditiontotal =
          conditiontotal + " and a.Status = '" + this.stateType + "'";
      }
      if (this.suorceType != "") {
        conditiontotal =
          conditiontotal + " and a.Source = '" + this.suorceType + "'";
      }
      if (this.content != "") {
        conditiontotal =
          conditiontotal + " and a.DataPacket like '%" + this.content + "%'";
      }
      if (this.Platformid != "") {
        conditiontotal =
          conditiontotal + " and a.IPEndPoint = '" + this.Platformid + "'";
      }
      // console.log('查询条件222',conditiontotal)

      this.http
        .comMethod("count(1)", totalab, conditiontotal)
        .then((res) => {
          this.pageTotal = 0;

          this.pageTotal = res[0]["count(*)"];
        })
        .catch((res) => {
          // console.log(res);
          // this.pictLoading = false;
          // this.emptyText = "暂无数据";
        });

      //  let querys = "`tbuplog` a INNER JOIN (SELECT InstructNo,c.`PlatformName` FROM `tbuplog` d LEFT  JOIN `tbupconfig` c  ON d.IPEndPoint=CONCAT( c.PlatformIP,':',c.PlatformPort) where " + conditions + " ORDER BY `addtime` DESC LIMIT " + 0 + "," + 10000 + " ) AS b USING(InstructNo)"
      //
      // this.getexcel(querylist, querys, condition);
    },
    //  获取上报数据
    getData() {
      let that = this;
      this.pictLoading = true;
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
      // console.log('times',  this.dateValue[1]);

      if (this.dateValue == null) {
        this.pictLoading = false;
        this.tableData = [];

        this.emptyText = "暂无数据";
        return;
      }
      that.tableData = [];
      that.http
        .get("getSbsjTable", {
          startTime: that.dateValue[0],
          endTime: that.dateValue[1],
          Platformid: that.Platformid,
          stateType: that.stateType,
          suorceType: that.suorceType,
          content: that.content,
          pageIndex: (that.pageIndex - 1) * that.pageSize,
          pageSize: that.pageSize,
        })
        .then((res) => {
          debugger;
          that.pageTotal = 0;
          // that.pageIndex = 1;
          that.pictLoading = false;

          if (res) {
            if (res[1][0]["dataTotal"] > 0) {
              res[0].forEach((r) => {
                r.AddTime = that.$options.filters.dateFormat(r.AddTime);

                r["Status"] = that.funStatus(r["Status"]);
                r["Source"] = that.funSource(r["Source"]);
              });

              // 赋值到表格
              that.tableData = res[0];

              that.pageTotal = res[1][0]["dataTotal"];
            } else {
              that.emptyText = "暂无数据";
              that.pageTotal = 0;
            }
          }
        })
        .catch((res) => {
          that.$message.error("服务端错误");
          console.log("error", res);
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    exportData() {
      this.isLoading = true;

      let querylist = "t.*,c.`PlatformName` ";
      let conditions = "";
      conditions =
        "AddTime BETWEEN '" +
        this.dateValue[0] +
        "' and '" +
        this.dateValue[1] +
        "'";
      if (this.stateType != "") {
        conditions = conditions + " and Status = '" + this.stateType + "'";
      }
      if (this.suorceType != "") {
        conditions = conditions + " and Source = '" + this.suorceType + "'";
      }
      if (this.content != "") {
        conditions =
          conditions + " and DataPacket like '%" + this.content + "%'";
      }
      if (this.Platformid != "") {
        conditions = conditions + " and IPEndPoint = '" + this.Platformid + "'";
      }
      let querys =
        "(SELECT * FROM tbuplog AS a WHERE " +
        conditions +
        " ORDER BY addtime DESC  LIMIT " +
        0 +
        "," +
        10000 +
        "  ) AS t LEFT JOIN `tbupconfig` c ON t.IPEndPoint = CONCAT(c.PlatformIP,':',c.PlatformPort) ";
      let condition = "";

      this.http
        .comMethod(querylist, querys, condition)
        .then((res) => {
          this.exportList = [];
          if (res.length != 0) {
            res.forEach((r) => {
              r.AddTime = this.$options.filters.dateFormat(r.AddTime);
              r["Status"] = this.funStatus(r["Status"]);
              r["Source"] = this.funSource(r["Source"]);
            });
            //excel数据
            this.exportList = res; //excel数据
            require.ensure([], () => {
              const titleName = this.excelTitleName;
              const tHeader = this.exportHeader; //表头
              const filterVal = this.exportFilterVal; //表头对应的字段
              const list = this.exportList; //数据
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(
                tHeader,
                data,
                titleName + moment().format("YYYY-MM-DD HH:mm:ss")
              );

              this.$message({
                message: "导出成功",
                duration: 5000,
                type: "success",
              });
              // loading.close();
              this.isLoading = false;
            });
          }
        })
        .catch((res) => {
          // console.log(res);
        });
    },

    // 弹出数据补全对话框
    pushData(name) {
      this.centerDialogVisible = true;
      // this.$refs[name].resetFields();
    },
    closeDialog() {
      this.$refs["dialogForm"].resetFields();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;
    },
    //提交补全数据
    submitForm(formName) {
      //
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          $this.sendml(
            "数据补全_" + $this.dialogForm.dataType,
            $this.SDL_Global.CMD.SYS_ShuJuBuChuan.Format(
              $this.dialogForm.dataType,
              moment($this.dialogForm.beginTime).format("YYYY-MM-DD HH:mm:ss"),
              moment($this.dialogForm.endTime).format("YYYY-MM-DD HH:mm:ss"),
              $this.dialogForm.dataSource
            )
          );
          $this.centerDialogVisible = false;
        } else {
        }
      });
    },
    sendml(name, ml) {
      //SYS_ShuJuBuChuan
      var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;
      // this.$message.info(data);
      // console.log(data);
      this.socketApi.sendSock(data);
      let $this = this;
      //this.$message.info("数据补传中");
    },
    funSource: function (val) {
      if (val == "1") {
        return "发送";
      } else if (val == "2") {
        return "接收";
      }
    },
    funStatus: function (val) {
      if (val == "-1") {
        return "未知";
      } else if (val == "0") {
        return "失败";
      } else if (val == "1") {
        return "成功";
      } else if (val == "-2") {
        return "断网";
      }
    },
    currentPage(val) {
      this.pageIndex = val;
      this.getData();
    },
    changeSize(val) {
      this.pageSize = val;
      this.getData();
    },
  },
};
</script>
<style scoped>
.time {
  width: 100% !important;
}

@media only screen and (max-width: 1024px) {
  .el-col-md-8 {
    padding-top: 10px !important;
  }

  /* .el-col-md-9 {
      padding-top: 10px !important;
    } */
  .btns {
    padding-top: 10px !important;
  }

  .table {
    height: 500px !important;
  }
}

@media only screen and (max-width: 1900px) {
  .el-col-lg-5 {
    padding-top: 10px !important;
  }

  .el-col-lg-4 {
    padding-top: 10px !important;
  }

  /* .table {
      height: 500px !important;
    }  */
}

@media only screen and (max-width: 1365px) {
  .el-col-lg-5 {
    padding-top: 10px !important;
  }

  .el-col-lg-4 {
    padding-top: 10px !important;
  }

  .table {
    height: 500px !important;
  }
}

@media only screen and (max-width: 1200px) {
  .el-col-md-5 {
    padding-top: 10px !important;
  }

  .el-col-md-4 {
    padding-top: 10px !important;
  }

  .table {
    height: 500px !important;
  }
}

/* 时间框显示 */
.el-date-range-picker__time-header .el-input__inner {
  color: #000 !important;
}
</style>