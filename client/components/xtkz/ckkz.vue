<template>
  <div>
    <div style="margin:0 20px;">
      <div class="panel panel-default">
        <!-- <div class="panel-body"> -->
        <el-table style="width: 100%" ref="topictable" :height="tableHeight" :data="tableData" v-loading="pictLoading"
          element-loading-background="rgba(0, 0, 0, 0.3)" element-loading-text="数据正在加载中" :header-cell-style="{
                            'background-color': '#384565' }" stripe :empty-text="emptyText">
          <el-table-column label="编号" align="center" prop="ID" width="80px"> </el-table-column>
          <el-table-column label="设备厂家" align="center" prop="DevCompany" width="120px"> </el-table-column>
          <el-table-column label="名称" align="center" prop="DevTag" width="120px"> </el-table-column>
          <el-table-column label="设备型号" align="center" prop="DevNum" width="120px"> </el-table-column>
       
          <el-table-column label="字符串" align="center" prop="ConnStr">
          </el-table-column>
          <el-table-column label="路径" align="center" prop="TagFile">
          </el-table-column>
          <el-table-column label="启用状态" align="center" prop="Used" width="120px">
            <template slot-scope="scope">
              <el-tag size="mini" :type="scope.row.Used == '启用' ? 'success' : 'info'" disable-transitions>
                {{scope.row.Used}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Driver" v-if="hiden" align="center" prop="Driver"> </el-table-column>
          <el-table-column label="Protocal" v-if="hiden" align="center" prop="Protocal"></el-table-column>
          </el-table-column>
          <el-table-column label="ParseClass" v-if="hiden" align="center" prop="ParseClass">
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template slot-scope="scope">
              <span class="btn" size="mini" @click="editData(scope.row)">编辑
              </span>
            </template>
          </el-table-column>
        </el-table>
        <!-- </div> -->
      </div>
    </div>
    <el-dialog title="配置编辑" :visible.sync="centerDialogVisible" width="40%" :modal-append-to-body='false'>
      <el-form :label-position="labelPosition" label-width="120px" :model="form" size="mini">
        <el-form-item label="编号">
          <el-input v-model="form.ID" readonly></el-input>
        </el-form-item>
        <el-form-item label="设备厂家">
          <el-input v-model="form.DevCompany" readonly></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <!-- <el-input v-model="form.DevTag" ></el-input>
           -->
          <el-select  size="small" v-model="form.DevTag" placeholder="请选择" multiple collapse-tags>
            <el-option v-for="item in DevTaglist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
       
        </el-form-item>

        <el-form-item label="设备型号" >
          <el-input v-model="form.DevNum" readonly></el-input>
        </el-form-item>
        <el-form-item label="字符串">
          <el-input v-model="form.ConnStr"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.TagFile"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" style="text-align: left;">
          <!-- <el-input v-model="form.Used"></el-input> -->
          <el-switch name="kai" v-model="form.Used" :active-text="activetext" @change="tagswitch"></el-switch>
        </el-form-item>
        <el-form-item label="Driver" v-if="hiden">
          <el-input v-model="form.Driver"></el-input>
        </el-form-item>
        <el-form-item label="Protocal" v-if="hiden">
          <el-input v-model="form.Protocal"></el-input>
        </el-form-item>
        <el-form-item label="ParseClass" v-if="hiden">
          <el-input v-model="form.ParseClass"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sendData" size="small">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // import xtkzConfig from "@config/xtkzConfig";
  import appConfig from "@appConfig";
  import { DateTime } from "../../common/js/date.js";

  export default {
    name: "ckkz",
    data() {
      return {
        emptyText: "暂无数据",
        SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
        hiden: false,
        tableData: [],
        tablecolumn: [],
        labelPosition: "right",
        centerDialogVisible: false,
        // appConfig: JSON.parse(localStorage.getItem("appConfig")).catalogUrl,
        form: {
          ID: "",
          Driver: "",
          Protocal: "",
          ParseClass: "",
          ConnStr: "",
          TagFile: "",
          Used: true,
          DevTag: [],
          DevCompany:"",
          DevNum:""
        },
        DevTaglist: [
          { value: "PLC", label: "PLC" },
          { value: "TN", label: "TN" },
          { value: "TNJB", label: "TNJB" },
          { value: "TP", label: "TP" },
          { value: "TPJB", label: "TPJB" },
          { value: "COD", label: "COD" },
          { value: "CODJB", label: "CODJB" },
          { value: "NH3", label: "NH3" },
          { value: "NH3JB", label: "NH3JB" },
          { value: "WC", label: "WC" },
          { value: "ZF", label: "ZF" },
          { value: "YLS", label: "YLS" },
          { value: "LY", label: "LY" },
        ],
        activetext: "",
        pictLoading: false,
        tableHeight: null
      };
    },
    mounted() {
      console.log(110)
      this.getdrivers();
      console.log(55)

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
       
        this.tableHeight = window.innerHeight - 100
      },
      // 切换开关
      tagswitch() {
        if (this.form.Used == true) {
          this.activetext = "开";
        } else {
          this.activetext = "关";
        }
      },
      //获取excel内容
    async  getdrivers() {
      console.log(22)

        this.pictLoading = true;
        this.emptyText = " ";
        // appConfig
        var configurl = appConfig.configurl
        // var configurl =  "../caiji/WQMS/drivers.csv"
        console.log("串口url", configurl)
       
    await    this.http
          .get("/getdriversData", {
            // configurl: "../../../caiji/caiji/Debug/WQMS/drivers.csv",
            configurl: configurl

          })
          .then((res) => {
            // setTimeout(() => {
              console.log(33)

            this.pictLoading = false;
            // }, 1000);


            this.tableData = [];
            if (res.length != 0) {
              

              console.log('串口', res.length)
              this.tablecolumn = res.splice(0, 1);
              res.splice(14);
              
              res.forEach((r) => {
                let obj = {};
                obj.ID = r[0];
                obj.Driver = r[1];
                obj.Protocal = r[2];
                obj.ParseClass = r[3];
                obj.ConnStr = r[4];
                obj.TagFile = r[5];
                obj.Used = r[6] == "TRUE" ? "启用" : "禁用";
                obj.DevTag = r[7];
                obj.DevCompany=r[8]
                obj.DevNum=r[9]
                this.tableData.push(obj);
              });
              // console.log("数据", this.tableData);
            } else {
              this.emptyText = "暂无数据";

            }
          })
          .catch((res) => {
            this.$message.error(res);

            setTimeout(() => {
              this.pictLoading = false;
              this.emptyText = "暂无数据";

            }, 1000);
            // console.log(res);
          });
          console.log(44)

      },
      editData(val) {
        this.centerDialogVisible = true;
        this.form.ID = val.ID;
        this.form.DevCompany = val.DevCompany;
        this.form.DevNum = val.DevNum;
        this.form.Driver = val.Driver;
        this.form.Protocal = val.Protocal;
        this.form.ParseClass = val.ParseClass;
        this.form.ConnStr = val.ConnStr;
        this.form.TagFile = val.TagFile;
        if (val.Used == "启用") {
          this.form.Used = true;
        } else {
          this.form.Used = false;
        }
        this.tagswitch();

        // this.form.Used = val.Used;
        this.form.DevTag = []
        if (val.DevTag.indexOf(";") > -1) {
          this.form.DevTag = val.DevTag.split(";");

        } else {
          this.form.DevTag.push(val.DevTag);
        }
      },
      // 添加日志
      addlog(operator) {
        let date = new DateTime(); //调用datetime获取时间格式
        let time = date.getDate("-") + date.getHour() + ':' + date.getMinute() + ':' + date.getSecond();
        this.http
          .post("/addlog", {
            OPTIME: time,
            username: localStorage.getItem("Loginedname"),
            operator: operator,
            cmdargs: operator,
          })
          .then((res) => {

            let ml = "日志上传=" + operator
            this.Sendml("日志上传", ml)

          })
          .catch((res) => {
            // console.log(res);
            this.$message.error(res);
          });
      },
      //发送命令
      Sendml(name, ml) {

        var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;

        // this.$message.info(data);

        this.socketApi.sendSock(data, true);
      },
      sendData() {
        this.centerDialogVisible = false;
        // let used="";
        // if (this.form.Used == true) {
        //   used= "TRUE";
        // } else {
        //   used= "FALSE";
        // }this.appConfig +
        var configurl = "../caiji/WQMS/drivers.csv"

        var str =
          this.form.ID +
          "," +
          this.form.Driver +
          "," +
          this.form.Protocal +
          "," +
          this.form.ParseClass +
          "," +
          this.form.ConnStr +
          "," +
          this.form.TagFile +
          "," +
          this.form.Used.toString().toUpperCase() +
          "," +
          this.form.DevTag.join(";")+
          ","+
          this.form.DevCompany+
          ","+
          this.form.DevNum ;

        this.http
          .post("/UpdatedriversData", {
            str: str,
            configurl: configurl
            // ID: this.ID ,
            // Driver: this.Driver,
            // Protocal: this.Protocal ,
            // ParseClass: this.ParseClass ,
            // ConnStr: this.ConnStr ,
            // TagFile:this.TagFile,
            // Used:this.Used,
            // DevTag:this.DevTag ,
          })
          .then((res) => {
            if (res.length != 0) {
              // this.tablecolumn = res.splice(0, 1)
              this.$message.success(res);
              this.getdrivers();
              let operator = "编辑串口:" + this.form.DevTag;
              this.addlog(operator)
              // console.log('数据', this.tableData)
            }
          })
          .catch((res) => {
            // console.log(res);
            this.$message.error(res);
          });
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

  .el-select {
    width: 100%;
  }
</style>