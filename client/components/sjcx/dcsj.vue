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
                <label class="rwlx">电池组号</label>
                <el-select
                  size="small"
                  style="width: 57%"
                  v-model="defaultGroupID"
                  placeholder="请选择"
                  @change="changeData"
                >
                  <el-option
                    v-for="item in GroupIDOptions"
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
            label="时间"
            align="center"
            prop="DataTime"
            width="180"
          >
          </el-table-column>
          <el-table-column label="电池组号" align="center" prop="GroupID">
          </el-table-column>
          <el-table-column label="环境温度(℃)" align="center" prop="ENVTemp">
          </el-table-column>
          <el-table-column label="功率温度(℃)" align="center" prop="PowerTemp">
          </el-table-column>
          <el-table-column label="电流(A)" align="center" prop="ElectricCurrent">
          </el-table-column>
          <el-table-column label="总电压(V)" align="center" prop="Voltage">
          </el-table-column>
          <el-table-column label="剩余容量(AH)" align="center" prop="MBFree">
          </el-table-column>
          <el-table-column label="总容量(AH)" align="center" prop="TotalCapacity">
          </el-table-column>
          <el-table-column label="循环次数(次)" align="center" prop="LoopNum">
          </el-table-column>
          <el-table-column
            label="环境温度告警"
            align="center"
            prop="ENVTempAlarm"
          >
          </el-table-column>
          <el-table-column
            label="功率温度告警"
            align="center"
            prop="PowerTempAlarm" 
          >
          </el-table-column>
          <el-table-column
            label="充放电流告警"
            align="center"
            prop="ElectricCurAlarm"
          >
          </el-table-column>
          <el-table-column
            label="电池总压告警"
            align="center"
            prop="VoltageAlarm"
          >
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
  name: "dcsj",
  components: {},
  data() {
    let GroupIDOption = [
      { value: "", label: "全部" },
      // { value: "w00000", label: "系统" },
    ];
    for (var i = 1; i < 6; i++) {
      let obj = {
        value: i,
        label: "电池" + i,
      };
      GroupIDOption.push(obj);
    }

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
      GroupIDOptions: GroupIDOption,

      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 30,
      pictLoading: false,
      tableHeight: null,
      isLoading: false,
      defaultGroupID: "", //w21011
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
        GroupID: this.defaultGroupID,
        StartDate: this.dateValue[0],
        EndDate: this.dateValue[1],
        PageIndex: (this.pageIndex - 1) * this.pageSize,
        PageSize: this.pageSize,
      };
      that.pictLoading = true;
      this.http
        .get("/getDCSJData", condition)
        .then((res) => {
          console.log(res);
          if (res) {
            res[0].map(function (item) {
              item.DataTime = moment(item.DataTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.GroupID = that.GroupIDOptions.filter(
                (m) => m.value == item.GroupID
              )[0].label;
                 
               item.ENVTempAlarm=item.ENVTempAlarm==0?'否':'是';
               item.PowerTempAlarm=item.PowerTempAlarm==0?'否':'是';
               item.ElectricCurAlarm=item.ElectricCurAlarm==0?'否':'是';
               item.VoltageAlarm=item.VoltageAlarm==0?'否':'是';

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