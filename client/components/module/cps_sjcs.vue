<template>
  <div>
    <div class="ybcs-body">
      <el-row :gutter="24">
        <template v-for="(item, index) in YiBiaoShow">
          <el-col
            :key="index"
            :sm="24"
            :xs="24"
            :md="24"
            :lg="12"
            style="margin: 0px 0px 20px 0px"
          >
            <el-row class="header">
              <el-col>
                <span class="tag">{{ item.Name }}</span>
              </el-col>
            </el-row>
            <div class="lcbj">
              <el-row class="rowdiv">
                <el-col :span="10">
                  R1试剂：
                  <template v-if="item.R1ShiJiZongLiang > 0">
                    <span>{{ item.R1ShiJiYuLiang }}</span> /
                    <span>{{ item.R1ShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>

                <el-col :span="12">
                  空白试剂：
                  <template v-if="item.KongBaiShiJiZongLiang > 0">
                    <span>{{ item.KongBaiShiJiYuLiang }}</span> /
                    <span>{{ item.KongBaiShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>
              </el-row>
              <el-row class="rowdiv">
                <el-col :span="10">
                  R2试剂：
                  <template v-if="item.R2ShiJiZongLiang > 0">
                    <span>{{ item.R2ShiJiYuLiang }}</span> /
                    <span>{{ item.R2ShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>

                <el-col :span="12">
                  零核试剂：
                  <template v-if="item.LingHeShiJiZongLiang > 0">
                    <span>{{ item.LingHeShiJiYuLiang }}</span> /
                    <span>{{ item.LingHeShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>
              </el-row>
              <el-row class="rowdiv">
                <el-col :span="10">
                  R3试剂：
                  <template v-if="item.R3ShiJiZongLiang > 0">
                    <span>{{ item.R3ShiJiYuLiang }}</span> /
                    <span>{{ item.R3ShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>

                <el-col :span="12">
                  跨核试剂：
                  <template v-if="item.KuaHeShiJiZongLiang > 0">
                    <span>{{ item.KuaHeShiJiYuLiang }}</span> /
                    <span>{{ item.KuaHeShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>
              </el-row>
              <el-row class="rowdiv">
                <el-col :span="10">
                  R4试剂：
                  <template v-if="item.R4ShiJiZongLiang > 0">
                    <span>{{ item.R4ShiJiYuLiang }}</span> /
                    <span>{{ item.R4ShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>

                <el-col :span="12">
                  标液试剂：
                  <template v-if="item.BiaoYeShiJiZongLiang > 0">
                    <span>{{ item.BiaoYeShiJiYuLiang }}</span> /
                    <span>{{ item.BiaoYeShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>
              </el-row>
              <el-row class="rowdiv">
                <el-col :span="10">
                  R5试剂：
                  <template v-if="item.R5ShiJiZongLiang > 0">
                    <span>{{ item.R5ShiJiYuLiang }}</span> /
                    <span>{{ item.R5ShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>

                <el-col :span="12">
                  标核试剂：
                  <template v-if="item.BiaoHeShiJiZongLiang > 0">
                    <span>{{ item.BiaoHeShiJiYuLiang }}</span> /
                    <span>{{ item.BiaoHeShiJiZongLiang }}</span> mL
                  </template>
                  <template v-else> -- </template>
                </el-col>
              </el-row>
              <el-row class="rowdiv">
                <el-col :span="10">
                  缺试剂阈值：<span>{{ item.QueShiJiGaoJingYuZhi }}</span
                  >%
                </el-col>
                <el-col :span="10">
                  低试剂阈值：<span>{{ item.DiShiJiYuJingYuZhi }}</span
                  >%
                </el-col>
              </el-row>
            </div>

            <el-row>
              <el-col class="btnDiv" :span="24">
                <el-button
                  class="savebtn"
                  @click="changeSJ(item.ID, '更换试剂', 211)"
                  type="primary"
                  size="small"
                >
                  更换试剂</el-button
                >
                <el-button
                  class="savebtn"
                  @click="changeSJ(item.ID, '更换标液', 212)"
                  type="primary"
                  size="small"
                >
                  更换标液</el-button
                >
                <el-button
                  class="savebtn"
                  @click="changeSJ(item.ID, '更换空白', 213)"
                  type="primary"
                  size="small"
                >
                  更换空白</el-button
                >
                <el-button
                  class="savebtn"
                  @click="changeSJ(item.ID, '更换全部试剂', 214)"
                  type="primary"
                  size="small"
                >
                  全部更换</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </template>
        <el-col :sm="24" :xs="24" :md="24" :lg="24">
          <div class="wucanshu">
            <el-row class="header">
              <el-col>
                <span class="tag">批量更新试剂</span>
              </el-col>
            </el-row>
            <div class="lcbj">
              <el-row class="rowdiv">
                <el-col :span="22" :offset="2">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <div style="margin: 15px 0"></div>
                  <el-checkbox-group
                    v-model="checkedCities"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="city in cities"
                      :label="city.Name"
                      :key="city.ID"
                      >{{ city.Name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row class="rowdiv" style="margin-top: 40px;margin-bottom: 20px">
                <el-col :span="22">
                  <el-button
                    class="savebtn"
                    @click="changeSJAll('更换试剂(批量操作)', 211)"
                    type="primary"
                    size="small"
                  >
                    更换试剂</el-button
                  >
                  <el-button
                    class="savebtn"
                    @click="changeSJAll('更换标液(批量操作)', 212)"
                    type="primary"
                    size="small"
                  >
                    更换标液</el-button
                  >
                  <el-button
                    class="savebtn"
                    @click="changeSJAll('更换空白(批量操作)', 213)"
                    type="primary"
                    size="small"
                  >
                    更换空白</el-button
                  >
                  <el-button
                    class="savebtn"
                    @click="changeSJAll('更换全部试剂(批量操作)', 214)"
                    type="primary"
                    size="small"
                  >
                    全部更换</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  <script>
let YiBiaoDataNames = [];
// 试剂参数组件
export default {
  props: {},
  data() {
    let YiBiaoData = [];

    YiBiaoData = this.socketApi.globalDataConfig.SDL_Global.Meters().filter(
      function (item, index, array) {
        //元素值，元素的索引，原数组。
        if (item.id != "CYQ") {
          return item.isMain == true;
        }
      }
    );
    YiBiaoData.sort(function (a, b) {
      return a.sort - b.sort;
    });
    YiBiaoDataNames = [];
    YiBiaoData.map(function (item) {
      YiBiaoDataNames.push({ ID: item.ID, Name: item.Name, Status: false });
    });
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      YiBiaoShow: YiBiaoData,
      checkAll: false,
      checkedCities: [],
      cities: YiBiaoDataNames,
      isIndeterminate: true,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    //全选
    handleCheckAllChange(val) {
      let that = this;
      if (val) {
        YiBiaoDataNames.map(function (item) {
          item.Status = val;
          that.checkedCities.push(item.Name);
        });
      } else {
        this.checkedCities = [];
      }
      this.isIndeterminate = false;
    },
    //单个选中
    handleCheckedCitiesChange(value) {
      debugger
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      YiBiaoDataNames.map(function (item, index) {
        item.Status = false;
        let _value = value.filter(function (it, index, array) {
          //元素值，元素的索引，原数组。
          if (it == item.Name) {
            item.Status = true;
            return it;
          }
        });
      });
    },
    //单台仪表更新
    changeSJ(id, name, val) {
      name = id + name;
      let mlData = this.SDL_Global.CMD.YiBiao.Format(id, val);
      var data =
        localStorage.getItem("Loginedname") + "," + name + "," + mlData;
        // this.$message.info(data);

      this.socketApi.sendSock(data, true);
    },
    //批量更新
    changeSJAll(name, val) {
      let that = this;
      let data = localStorage.getItem("Loginedname") + "," + name + ",";
      let flag = false;
      YiBiaoDataNames.map(function (item, index) {
        let mlData = that.SDL_Global.CMD.YiBiao.Format(item.ID, val);
        if (item.Status) {
          data += mlData + ";";
          flag = true;
        }
      });
      // alert(data);
      if (!flag) {
        this.$message.info("请先勾选需要批量操作的仪表");
        return false;
      }
      // this.$message.info(data);

      this.socketApi.sendSock(data, true);
    },
  },
};
</script>
<style scoped>
/* 五参数 */
.wucanshu {
  background-color: #303a4c;
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
  /* height: 230px; */
  border-bottom: 1px solid #384565;
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
  float: left;
  margin-left: 9%;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 80px;
}

.rowdiv {
  height: 28px;
  margin: 0px 0px 10px 0px;
  color: #cccccc;
  font-size: 14px;
  margin-left: 30px;
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
  /* border-top: 1px solid red; */
  background-color: #303a4c;
  color: #cccccc;
  cursor: pointer;
  border: none;
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
  margin: 0px 40px 20px 40px;
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
  font-size: 14px;
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