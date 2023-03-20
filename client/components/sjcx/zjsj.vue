<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="block">
            <el-row>
              <el-col :sm="12" :md="12" :lg="8" :xl="6">
                <label class="rwlx">时间</label>
                <el-date-picker
                  v-model="dateValue"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  unlink-panels
                  :clearable="false"
                  style="width: 87%"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss "
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="small"
                  @change="changeData"
                ></el-date-picker>
              </el-col>
              <el-col :sm="7" :xs="7" :md="5" :xl="4">
                <label class="rwlx">因子</label>
                <el-select
                  size="small"
                  style="width: 76%"
                  v-model="defaultPolId"
                  placeholder="请选择"
                  @change="changeData"
                >
                  <el-option
                    v-for="item in jcyzOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <el-table
          v-loading="pictLoading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          element-loading-text="数据正在加载中"
          :data="tableData"
          :header-cell-style="{
            'background-color': '#384565',
          }"
          style="text-align: center"
          :height="tableHeight"
          stripe
          :empty-text="emptyText"
        >
          <el-table-column
            label="因子名称"
            align="center"
            prop="Pol"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="开始时间"
            align="center"
            prop="DataTime"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="结束时间"
            align="center"
            prop="EndTime"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="光路自检结果"
            align="center"
            prop="Item1"
            width="180"
          >
            <template slot-scope="scope">
              <el-tag size="small" :type="scope.row.Item1=='异常'?'danger':'success'">{{
                scope.row.Item1
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="液路自检结果"
            align="center"
            prop="Item2"
            width="180"
          >
          <template slot-scope="scope">
              <el-tag size="small" :type="scope.row.Item2=='异常'?'danger':'success'">{{
                scope.row.Item2
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="通讯自检结果"
            align="center"
            prop="Item3"
            width="180"
          >
          <template slot-scope="scope">
              <el-tag size="small" :type="scope.row.Item3=='异常'?'danger':'success'">{{
                scope.row.Item3
              }}</el-tag>
            </template>
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
            :total="total"
          >
          </el-pagination>
          <el-button
            size="small"
            @click="referenData"
            type="primary"
            style="float: left; margin-top: 8px; margin-left: 15px"
          >
            刷新
          </el-button>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "zjsj",
  components: {},
  data() {
    let jcyzQuery = [
      { value: "", label: "全部" },
      // { value: "w00000", label: "系统" },
    ];
    this.socketApi.globalDataConfig.SDL_Global.MetersDataPP().map(function (
      item,
      index
    ) {
      if (
        item.Code == "w21001" ||
        item.Code == "w21011" ||
        item.Code == "w01019" ||
        item.Code == "w01018" ||
        item.Code == "w21003"
      ) {
        let obj = {
          value: item.Code,
          label: item.Name,
        };
        // if (item.Name != "藻密度" && item.Name != "叶绿素") {
        jcyzQuery.push(obj);
      }
    });

    return {
      emptyText: "",
      dateValue: [
        moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
        moment().format("YYYY-MM-DD HH:mm:ss"),
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

      logType: "操作日志",
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      pictLoading: false,
      tableHeight: null,
      isLoading: false,
      defaultPolId: "", //w21011
    };
  },
  mounted() {
    this.getData();
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
      this.tableHeight = window.innerHeight - 226;
    },
    changeData() {
      this.getData();
    },
    //刷新数据
    referenData() {
      this.dateValue = [
        this.dateValue[0],
        moment().format("YYYY-MM-DD HH:mm:ss"),
      ];
      this.pageIndex = 1;
      this.getData();
    },
    //获取数据
    getData() {
      let that = this;
      let condition = {
        PolId: this.defaultPolId,
        StartDate: this.dateValue[0],
        EndDate: this.dateValue[1],
        PageIndex: (this.pageIndex - 1) * this.pageSize,
        PageSize: this.pageSize,
      };
      that.pictLoading = true;
      this.http
        .get("/getZJSJData", condition)
        .then((res) => {
          console.log(res);
          if (res) {
            res[0].map(function (item) {
              item.DataTime = moment(item.DataTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.EndTime = moment(item.EndTime).format("YYYY-MM-DD HH:mm:ss");
              item.Pol = that.jcyzOptions.filter(
                (m) => m.value == item.Pol
              )[0].label;
              debugger;
              for (var i = 1; i <= 16; i++) {
                item[`Item${i}`] = item[`Item${i}`] == 1 ? "正常" : "异常";
              }
            });
            that.tableData = res[0];
            that.total = res[1][0].total;
          }
          that.pictLoading = false;
        })
        .catch((res) => {
          console.log(res);
          that.pictLoading = false;
        });
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