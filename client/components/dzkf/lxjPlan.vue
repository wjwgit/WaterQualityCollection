<template>
  <div class="div_ybkz">
    <el-row>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="valbox">
          <div class="labName">{{ lxjPlan[0].Title }} :</div>

          <div class="labName">浊度区间</div>
          <div class="section">
            <el-input
              v-model="lxjPlan[0].MinVal"
              style="width: 110px"
              size="mini"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
            -
            <el-input
              v-model="lxjPlan[0].MaxVal"
              size="mini"
              style="width: 110px"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="labName">
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[0].TN"
            >TN启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[0].TP"
            >TP启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[0].NH3"
            >NH3启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[0].COD"
            >COD启用</el-checkbox
          >
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="lxjPlan[0].CODCR"
            >CODCR启用</el-checkbox
          >
        </div>

        <el-button
          class="savebtn"
          @click="savelxjplan('0')"
          type="primary"
          size="small"
          >保存
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="valbox">
          <div class="labName">{{ lxjPlan[1].Title }} :</div>

          <div class="labName">浊度区间</div>
          <div class="section">
            <el-input
              v-model="lxjPlan[1].MinVal"
              style="width: 110px"
              size="mini"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
            -
            <el-input
              v-model="lxjPlan[1].MaxVal"
              size="mini"
              style="width: 110px"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="labName">
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[1].TN"
            >TN启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[1].TP"
            >TP启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[1].NH3"
            >NH3启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[1].COD"
            >COD启用</el-checkbox
          >
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="lxjPlan[1].CODCR"
            >CODCR启用</el-checkbox
          >
        </div>

        <el-button
          class="savebtn"
          @click="savelxjplan('1')"
          type="primary"
          size="small"
          >保存
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="valbox">
          <div class="labName">{{ lxjPlan[2].Title }} :</div>

          <div class="labName">浊度区间</div>
          <div class="section">
            <el-input
              v-model="lxjPlan[2].MinVal"
              style="width: 110px"
              size="mini"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
            -
            <el-input
              v-model="lxjPlan[2].MaxVal"
              size="mini"
              style="width: 110px"
              class="inputdivs"
              placeholder="请输入"
            >
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :xs="24" :md="24" :lg="24">
        <div class="labName">
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[2].TN"
            >TN启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[2].TP"
            >TP启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[2].NH3"
            >NH3启用</el-checkbox
          >
          <el-checkbox :true-label="1" :false-label="0" v-model="lxjPlan[2].COD"
            >COD启用</el-checkbox
          >
          <el-checkbox
            :true-label="1"
            :false-label="0"
            v-model="lxjPlan[2].CODCR"
            >CODCR启用</el-checkbox
          >
        </div>

        <el-button
          class="savebtn"
          @click="savelxjplan('2')"
          type="primary"
          size="small"
          >保存
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script scoped>
export default {
  name: "lxjPlan",
  components: {},
  data() {
    let plandata = [];
    let lxjobj = {
      ID: "",
      Title: "",
      MinVal: 0,
      MaxVal: 0,
      TP: 0,
      TN: 0,
      NH3: 0,
      COD: 0,
      CODCR: 0,
    };
    for (var i = 0; i < 3; i++) {
      plandata.push(lxjobj);
    }
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,

      SoftType: JSON.parse(localStorage.getItem("appConfig")).SoftType,
      LXJMinlValue: "",
      LXJMaxlValue: "",
      lxjPlan: plandata,
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    // 获取表格数据
    getData() {
      // console.log('pageIndex=',pageIndex);
      let $this = this;

      this.http
        .get("/gettbcentrifugeplan")
        .then((res) => {
          if (res && res.length > 0) {
            console.log(res);
            $this.lxjPlan = res;
            console.log("this.lxjPlan=", $this.lxjPlan);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },

    savelxjplan(lxjIndex) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.http
        .post("/updatetbcentrifugeplan", this.lxjPlan[lxjIndex])
        .then((res) => {
          // console.log(res);
          if (res.warningCount == 0) {
            this.getData();
            //  console.log('index=', this.lxjPlan[lxjIndex])
            this.http.addLog(
              "修改离心机启动方案",
              JSON.stringify(this.lxjPlan[lxjIndex]),
              true
            );

            // this.addlog("修改预处理方式", JSON.stringify(this.lxjPlan[lxjIndex]))
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch((res) => {
          this.$message({
            message: "修改失败",
            type: "error",
          });
        });
      let $this = this;
      setTimeout(function () {
        loading.close();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.el-row {
  background-color: #303a4c;
  margin: 0 20px;
  /* text-align: right; */
}

.valbox {
  /* text-align: left; */
  float: left;
  padding: 17px 0px;
  /* display: inline-block; */
  color: #cccccc;
  font-size: 14px;
}

/* lable名称 */
.labName {
  padding-right: 8px;
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
}

/* 泵阀状态 */
.section {
  text-align: right;
  display: inline-block;
}
.el-checkbox {
  color: #cccccc !important;
}
</style>