<template>
  <div>
    <div class="ybcs-body">
      <el-row :gutter="24">
        <template v-for="(item, index) in YiBiaoShow">
          <el-col :key="index" :sm="24" :xs="24" :md="24" :lg="12" style="margin: 0px 0px 20px 0px">
            <el-row class="header">
              <el-col>
                <span class="tag">{{ item.Name }}</span>
              </el-col>
            </el-row>
            <div class="lcbj">
              <el-row class="rowdiv">
                <el-col >

                  <!-- <div class="plcCom"> -->
                    <div  style="padding-right:20px;display: inline-block;"> 质控数据预警阀值：</div>
                    <div style="display: inline-block;">
                      <el-input disabled size="small" placeholder="请输入" v-model="item.ZhiKongYuJingYuZhi*100">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                    <div class="btn"
                      @click="updateForm('质控数据预警阀值',SDL_Global.CMD.YiBiao_ZhiKongYuJingYuZhi,item.ZhiKongYuJingYuZhi,item.ID)">
                      <i class="el-icon-edit"></i>
                    </div>
                  <!-- </div> -->
                </el-col>
              </el-row>
            </div>
          </el-col>
        </template>
        <el-col :sm="24" :xs="24" :md="24" :lg="24">
          <div class="wucanshu">
            <el-row class="header">
              <el-col>
                <span class="tag">其他参数预警设置</span>
              </el-col>
            </el-row>
            <div class="lcbj">
              <el-row class="rowdiv">
                <el-col :span="8">
                  <div class="plcCom">
                    <div class="bfkzName" style="padding-right:20px">pH恒值判断次数</div>
                    <div style="width: 30%;display: inline-block;">
                      <el-input disabled size="small" placeholder="请输入" v-model="SDL_Global.SYS.PHHengZhiCiShu">
                        <template slot="append">次</template>
                      </el-input>
                    </div>
                    <div class="btn"
                      @click="updateForm('pH恒值判断次数',SDL_Global.CMD.Alarm_PHHengZhiCiShu,SDL_Global.SYS.PHHengZhiCiShu)">
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="plcCom">
                    <div class="bfkzName" style="padding-right:20px">水样数据恒值判断次数</div>
                    <div style="width: 30%;display: inline-block;">
                      <el-input disabled size="small" placeholder="请输入" v-model="SDL_Global.SYS.ShuiYangHengZhiCiShu">
                        <template slot="append">次</template>
                      </el-input>
                    </div>
                    <div class="btn"
                      @click="updateForm('水样恒值判断次数',SDL_Global.CMD.Alarm_ShuiYangHengZhiCiShu,SDL_Global.SYS.ShuiYangHengZhiCiShu)">
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="plcCom">
                    <div class="bfkzName" style="padding-right:20px">运维预警天数</div>
                    <div style="width: 30%;display: inline-block;">
                      <el-input disabled size="small" placeholder="请输入" v-model="SDL_Global.SYS.YunWeiYuJingTianShu">
                        <template slot="append">天</template>
                      </el-input>
                    </div>
                    <div class="btn"
                      @click="updateForm('运维预警天数',SDL_Global.CMD.Alarm_YunWeiYuJingTianShu,SDL_Global.SYS.YunWeiYuJingTianShu)">
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <template class="dialogBox">
      <el-dialog :title="modelTitle" :visible.sync="mlVisible" width="60%" :modal-append-to-body='false'
        :close-on-click-modal="false">
        <div class="dialogBody">
          <div class="dialogLabel">
            <label style="color: #cccccc">{{mlName}}</label>
          </div>
          <div class="dialogInput" style="text-align: left;">
            <el-input size="small" placeholder="请输入" v-model="mlData" style=" color: #fff;">
              
              <template slot="append" v-if="mlName=='pH恒值判断次数'||mlName=='水样恒值判断次数' ">次</template>

              <template slot="append" v-else-if="mlName=='运维预警天数'" >天</template>
              <template slot="append" v-else >%</template>
              
              <!-- v-if="mlName=='泵1取水时间修改'||mlName=='泵2取水时间修改'||mlName=='泵补水时间修改'||mlName=='沉淀池沉淀时间修改'||mlName=='采样杯沉淀时间修改'" -->
              
          </el-input>
       
          </div>

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="mlVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="SendData">确 定</el-button>
        </div>
      </el-dialog>
    </template>
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
        mlVisible: false,
        modelTitle: '',
        mlfactor: '',
        mlName: '',
        ml: '',
        mlData: ''
      };
    },
    mounted() { },
    computed: {},
    methods: {

      updateForm( mlName, ml, mlData,id) {

        this.mlVisible = true;
        
        if (mlName == '质控数据预警阀值') {
          
          this.modelTitle=id+'预警设置';
        this.mlData = mlData*100;

        }else{

          this.modelTitle='其他参数预警设置';
        this.mlData = mlData;

        }
        this.mlName = mlName;
        this.mlfactor = id;
        this.ml = ml;
      },
      // 修改PLC参数
      SendData() {
        // let mlstate=!state

        var mldata = ""
        if (this.mlName == '质控数据预警阀值') {
        let newData=this.mlData/100
          mldata = this.ml.Format( this.mlfactor,newData);

        } else {
          mldata = this.ml.Format(this.mlData);

        }
        var data =
          "" + localStorage.getItem("Loginedname") + "," + this.mlName + "," + mldata;
        // this.$message.info(data);
        console.log(data);

        this.socketApi.sendSock(data);
        this.mlVisible = false

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