<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <el-col :sm="12" :md="12" :lg="8" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker v-model="dateValue" type="datetimerange" :picker-options="pickerOptions" unlink-panels
                  :clearable="false" style="width:87%" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss " value-format="yyyy-MM-dd HH:mm:ss" size="small"
                  @change="logChange"></el-date-picker>
              </el-col>
              <el-col :sm="6" :xs="6" :md="5" :xl="4">
                <label class="rwlx">日志类别</label>
                <el-select v-model="logType" size="small" style="width: 60%" placeholder="请选择" @change="logChange">
                  <el-option v-for="item in logTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="7" :xs="7" :md="5" :xl="4" v-show="jcyzShow">
                <label class="rwlx">因子</label>
                <el-select size="small" style="width: 76%" v-model="jcyz" placeholder="请选择" @change="logChange">
                  <el-option v-for="item in jcyzOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="7" :xs="7" :md="5" :xl="4" v-show="jcyzShow==false">
                <label class="rwlx">描述</label>
                <el-input v-model="operator" size="small" style="width: 60%" placeholder="请输入" type="text"
                  @change="seloperator">
                </el-input>
              </el-col>
              <!-- <excel :excelTitleName='excelTitleName' :exportHeader='exportHeader' :exportFilterVal='exportFilterVal'
                :exportList='exportList'></excel> -->

            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <!-- <div class="panel-body"> -->
        <!-- <tables :dataSource="tableData" :columns="columns" :height="'300'" :border="false"></tables> -->

        <el-table v-if="logType == '操作日志'" v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)"
          element-loading-text="数据正在加载中" :data="
            tableData
          " :header-cell-style="{
            'background-color': '#384565',
          }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">
          <el-table-column label="时间" align="center" prop="OPTIME" width="180">
          </el-table-column>
          <el-table-column label="操作用户" align="center" prop="username" width="80">
          </el-table-column>
          <el-table-column label="描述" align="left" prop="operator" width="260">
          </el-table-column>
          <el-table-column label="操作参数" align="left" prop="cmdargs">
          </el-table-column>
        </el-table>
        <el-table v-else v-loading="pictLoading" element-loading-background="rgba(0, 0, 0, 0.3)"
          element-loading-text="数据正在加载中" :data="
            tableData
          " :header-cell-style="{
            'background-color': '#384565',
          }" style="text-align: center" :height="tableHeight" stripe :empty-text="emptyText">
          <el-table-column label="时间" prop="DataTime" align="center" width="180"> </el-table-column>
          <el-table-column label="因子" prop="PolId" align="center" width="250"> </el-table-column>
          <el-table-column label="描述" prop="Info" align="left"> </el-table-column>
        </el-table>
        <div class="pageNations">
          <el-pagination @current-change="currentPage" class="pageNation" layout="total,sizes,prev, pager, next"
            :page-size="pageSize" :page-sizes="[5, 10, 20, 30, 50]" @size-change="changeSize" :current-page="pageIndex"
            :total="total">
          </el-pagination>
          <el-button size="small" @click="exportData" type="primary"
            style="float: left;margin-top: 8px;margin-left: 15px;" :loading="isLoading">
            导出
          </el-button>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import tables from "../module/tables";
  // import excel from "../module/excel";
  const { export_json_to_excel } = require("excel/Export2Excel");
  export default {
    name: "dbrw",
    components: { tables },
    data() {
      let jcyzQuery = [
        { value: "", label: "全部" },
        { value: "w00000", label: "系统" },]
      this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().filter((m) =>  m.ID != 'realFlow' && m.ID != 'CumulativeFlow' && m.ID != 'DaQiWenDu' && m.ID != 'DaQiShiDu' ).map(function (item, index) {

        // if (item.Code == "w21001" || item.Code == "w21011" || item.Code == "w01019" || item.Code == "w01018" || item.Code == "w21003") {
        //   let obj = {
        //     value: item.Code,
        //     label: item.Name
        //   }
        //   jcyzQuery.push(obj);
        // }
        if (item.IsNormal) {
          jcyzQuery.push({
            value: item.Code,
            label: item.Name
          });
        }
      })

      return {
        emptyText: "",
        operator: "",
        dateValue: [
          moment(new Date() - 1000 * 3600 * 24).format("YYYY-MM-DD HH:mm:ss"),
          moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        ],
        logTypeOptions: [
          {
            value: "操作日志",
            label: "操作日志",
          },
          {
            value: "仪表日志",
            label: "仪表日志",
          },
          {
            value: "系统日志",
            label: "系统日志",
          },
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
        jcyzOptions: jcyzQuery,
        // [
        //   { value: "", label: "所有" },
        //   { value: "w00000", label: "系统" },
        //   { value: "w21001", label: "总氮" },
        //   { value: "w21011", label: "总磷" },
        //   { value: "w01019", label: "高锰酸盐指数" },
        //   { value: "w21003", label: "氨氮" },
        // ],
        logType: "操作日志",
        jcyz: "",
        tableData: [],
        excelTitleName: '日志数据', //excel标题名字
        exportHeader: [], //导出 字段表头
        exportFilterVal: [], //表头对应字段
        exportList: [],//excel数据
        logColumns: {
          操作日志: [
            {
              hasSort: true,
              prop: "OPTIME",
              label: "时间",
              align: "center",
              headerAlign: "center",
              fixed: true,
              width: "160",
            },
            {
              hasSort: false,
              prop: "username",
              label: "操作用户",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },
            {
              hasSort: false,
              prop: "operator",
              label: "描述",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },
            {
              hasSort: false,
              prop: "cmdargs",
              label: "操作参数",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },
          ],
          仪表日志: [
            {
              hasSort: true,
              prop: "DataTime",
              label: "时间",
              align: "center",
              headerAlign: "center",
              fixed: true,
              width: "160",
            },
            {
              hasSort: false,
              prop: "PolId",
              label: "因子",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },

            {
              hasSort: false,
              prop: "Info",
              label: "描述",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },
          ],
          系统日志: [
            {
              hasSort: true,
              prop: "DataTime",
              label: "时间",
              align: "center",
              headerAlign: "center",
              fixed: true,
              width: "160",
            },
            {
              hasSort: false,
              prop: "PolId",
              label: "因子",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },

            {
              hasSort: false,
              prop: "Info",
              label: "描述",
              align: "center",
              headerAlign: "center",
              fixed: false,
            },
          ],
        },
        columns: [],
        jcyzShow: false,
        total: 0,
        pageIndex: 1,
        pageSize: 30,
        pictLoading: false,
        tableHeight: null,
        isLoading: false

      };
    },
    mounted() {
      this.logChange();
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
      seloperator(val) {
        this.pageIndex = 1
        this.logChange();
      },
      inquire(term) {

        this.pictLoading = true;
        this.emptyText = " ";

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
          this.emptyText = "暂无数据";

        }
        // setTimeout(() => {
        //   loading.close();
        // }, 1000);
        this.tableData = [];
        let header = [];//导出 字段表头
        let filterVal = []; //表头对应字段

        this.columns = this.logColumns[this.logType];
        this.columns.forEach(c => {
          name += "`" + c.prop + "`,";
          header.push(c.label);
          filterVal.push(c.prop);
        });
        this.exportHeader = header; //导出 字段表头
        this.exportFilterVal = filterVal; //表头对应字段


        let timeField = this.columns[0].prop;
        let condition = "";
        if (this.logType == "操作日志") {
          this.excelTitleName = "操作日志"
          condition =
            timeField +
            " BETWEEN '" +
            this.dateValue[0] +
            "' and '" +
            this.dateValue[1] +
            "'" +
            " and operator like '%" +
            this.operator +
            "%'" +
            " ORDER BY " + timeField + " desc";
          term;
        } else if (this.logType == "系统日志") {
          this.excelTitleName = "系统日志"
          condition =
            timeField +
            " BETWEEN '" +
            this.dateValue[0] +
            "' and '" +
            this.dateValue[1] +
            "'" +
            " and  type in (4,5) " +
            term + " ORDER BY " + timeField + "  desc ";
        } else {
          this.excelTitleName = "仪表日志"
          condition =
            timeField +
            " BETWEEN '" +
            this.dateValue[0] +
            "' and '" +
            this.dateValue[1] +
            "'" +
            " and  type in (4,5) " +
            term + " ORDER BY " + timeField + "  desc ";
        }
        let query = ""
        let nowpage = "";
        nowpage = (this.pageIndex - 1) * this.pageSize;
        if (this.logType == "操作日志") {
          query = "`操作日志` INNER JOIN  (SELECT id from `操作日志` where " + condition + "    LIMIT " + nowpage + "," + this.pageSize + ")AS b USING(id) "
        } else {
          query = "`仪表日志` INNER JOIN  (SELECT id from `仪表日志` where " + condition + "    LIMIT " + nowpage + "," + this.pageSize + ")AS b USING(id) "

        }

        this.http
          .comMethod("*", query, "")
          .then((res) => {
            // setTimeout(() => {
            this.pictLoading = false;
            // }, 1000);
            if (res.length != 0) {
              if (this.logType == "操作日志") {
                res.forEach((r) => {
                  r[timeField] = this.$options.filters.dateFormat(r[timeField]);
                });
              } else {
                res.forEach((r) => {
                  r[timeField] = this.$options.filters.dateFormat(r[timeField]);

                  if (r["PolId"] == 'w00000') {
                    r["PolId"] = '系统';
                  } else {
                    r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]); //this.funfactor(r["PolId"])
                  }
                });
              }
              //表格数据
              this.tableData = res;//.reverse()
              this.exportList = this.tableData;//excel数据

            } else {
              this.emptyText = "暂无数据";
              this.total = 0;
            }
          })
          .catch((res) => {
            setTimeout(() => {
              this.pictLoading = false;
              this.emptyText = "暂无数据";
            }, 1000);
            // console.log(res);
          });
        let excelTableName = this.logType;
        if (excelTableName == '系统日志') {
          excelTableName = '仪表日志';
        }
        this.http
          .comMethod("count(*)", excelTableName, condition)
          .then((res) => {
            this.total = 0;

            this.total = res[0]["count(*)"];
          })
          .catch((res) => {
            // console.log(res);
            this.pictLoading = false;
            this.emptyText = "暂无数据";
          });
        // let tabName = this.logType

      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      exportData() {
        this.isLoading = true;
        let term = "";
        if (this.logType == "操作日志") {
          this.excelTitleName = "操作日志"

          term = "";
        } else if (this.logType == "系统日志") {
          this.excelTitleName = "系统日志"

          term = " AND PolId = 'w00000'";

        } else {
          this.excelTitleName = "仪表日志"
          term = " AND PolId LIKE '%" + this.jcyz + "%'";
        }
        let querylist = "*";
        let tabName = "";
        if (this.logType == "操作日志") {
          tabName = "操作日志"

        } else {
          tabName = "仪表日志"
        }
        let condition = "";
        let timeField = this.columns[0].prop;
        if (this.logType == "操作日志") {
          condition =
            timeField +
            " BETWEEN '" +
            this.dateValue[0] +
            "' and '" +
            this.dateValue[1] +
            "'" +
            " and operator like '%" +
            this.operator +
            "%'" +
            " ORDER BY " + timeField + " desc";
          term;
        } else {
          condition =
            timeField +
            " BETWEEN '" +
            this.dateValue[0] +
            "' and '" +
            this.dateValue[1] +
            "'" +
            " and  type in (4,5) " +
            term + " ORDER BY " + timeField + "  desc ";
        }
        this.http
          .comMethod(querylist, tabName, condition)
          .then((res) => {
            this.exportList = [];
            if (res.length != 0) {

              if (this.logType == "操作日志") {
                res.forEach((r) => {
                  r[timeField] = this.$options.filters.dateFormat(r[timeField]);
                });
              } else {
                res.forEach((r) => {
                  r[timeField] = this.$options.filters.dateFormat(r[timeField]);
                  if (r["PolId"] == 'w00000') {
                    r["PolId"] = '系统';
                  } else {
                    r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]); //this.funfactor(r["PolId"])
                  }
                  // r["PolId"] = this.socketApi.globalDataConfig.getCodeNameData(r["PolId"]); //this.funfactor(r["PolId"]);
                });
              }
              //excel数据
              this.exportList = res;//excel数据
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
                  type: "success"
                });
                // loading.close();
                this.isLoading = false;
              });
            }
          })
          .catch((res) => {
            console.log(res);
          });

      },

      logChange: function () {

        if (this.logType == "操作日志") {
          let term = "";
          this.inquire(term);
          this.jcyzShow = false;
        } else if (this.logType == "系统日志") {
          debugger
          let term = " AND PolId = 'w00000'";
          // let term = " AND PolId LIKE '%" + this.jcyz + "%'";
          this.inquire(term);
          this.jcyzShow = false;
        } else {
          let term = " AND PolId LIKE '%" + this.jcyz + "%'";
          // let term = " AND PolId LIKE '%" + this.jcyz + "%'";
          this.inquire(term);
          this.jcyzShow = true;
        }
      },
      funfactor: function (val) {
        if (val == "w21011") {
          return "总磷";
        } else if (val == "w21001") {
          return "总氮";
        } else if (val == "w21003") {
          return "氨氮";
        } else if (val == "w01019") {
          return "高锰酸盐指数";
        } else if (val == "w01018") {
          return "化学需氧量";
        } else if (val == "w19011") {
          return "藻密度";
        } else if (val == "w01016") {
          return "叶绿素";
        } else {
          return "系统";
        }
      },
      currentPage(val) {
        this.pageIndex = val;
        this.logChange()

      },
      changeSize(val) {
        this.pageSize = val;
        this.logChange()

      },
    },
  };
</script>
<style scoped>
  .el-table .cell {
    line-height: 15px;
  }

  @media only screen and (max-width: 1024px) {
    .el-col-sm-7 {
      width: 26% !important;
    }
  }

  /* 时间框显示 */
  .el-date-range-picker__time-header .el-input__inner {
    color: #000 !important;
  }
</style>