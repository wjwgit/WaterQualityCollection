<template>
  <div>
    <div style="margin: 0 20px">
      <div class="panel panel-default" style="border: none">
        <el-row :gutter="20">
          <el-col :sm="24" :xs="24" :md="24" :lg="12">
            <div>
              <div class="box">
                <span class="title">五参数核查</span>
                <!-- <span style="float: right;margin-left: 10px;margin-top: 5px;">2020-09-18 15:30:00</span> -->
              </div>
              <div style="height: 288px">
                <el-table :data="SDL_Global.MetersDataPP().filter((m) => m.IsWC||m.ID=='YeLvSu'||m.ID=='ZaoMiDu')"
                  height="290px" :header-cell-style="{
                      'background-color': '#384565',
                    }" stripe>
                  <el-table-column label="因子" align="center" prop="Name">
                  </el-table-column>
                  <el-table-column label="浓度值" align="right" prop="LastTestData">
                    <template slot-scope="scope">
                      <span :style="{
                            color:
                              scope.row.ZhouCheck() == false ? '#da666e' : '#fff',
                          }">
                        {{ scope.row["LastTestData"] }}
                        <!-- {{ scope.row["ZhouCheck"]}}  -->
                        <el-tooltip effect="light" placement="right-start" popper-class="atooltip">
                          <div slot="content">
                            <div>
                              {{scope.row['ContentTip']}}
                            </div>
                            <div>
                              {{scope.row['ContentTip1']}}
                            </div>
                            <div>
                              {{scope.row['ContentTip2']}}
                            </div>
                          </div>
                          <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <!-- <el-tooltip v-show="scope.row['Code'] == 'w01001'" effect="light" placement="right-start"
                          popper-class="atooltip">
                          <div slot="content">
                            <div>
                              {{scope.row['ContentTip']}}
                            </div>
                            <div>
                              {{scope.row['ContentTip1']}}
                            </div>
                            <div>
                              {{scope.row['ContentTip2']}}
                            </div>
                          </div>
                          <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <el-tooltip v-show="scope.row['Code'] == 'w01003'" effect="light" placement="right-start"
                          popper-class="atooltip">
                          <div slot="content">
                            <div>
                              a、标样浓度值 <= 30NTU或标样浓度值>=
                                1000NTU,不考核，均按合格计算
                            </div>
                            <div>
                              b、30NTU
                              < 标样浓度值且标样浓度值 <=50NTU,误差=实测值-标准液浓度 ，<br />
                              误差/标准液浓度的值在-0.15到0.15之间算合格，否则不合格
                            </div>
                            <div>
                              c、50NTU
                              < 标样浓度值且标样浓度值 < 1000NTU,误差=实测值-标准液浓度 ，<br />
                              误差/标准液浓度的值在-0.1到0.1之间算合格，否则不合格
                            </div>
                          </div>

                          <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <el-tooltip v-show="scope.row['Code'] == 'w01009'" effect="light"
                          content="误差=实测值-标准液浓度 ，误差在-0.3至0.3之间算合格，否则不合格" placement="right-start"
                          popper-class="atooltip">
                          <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <el-tooltip v-show="scope.row['Code'] == 'w01010'" effect="light" content="无考核标准，均按合格算"
                          placement="right-start" popper-class="atooltip">
                          <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <el-tooltip v-show="scope.row['Code'] == 'w01014'" effect="light" placement="right-start"
                          popper-class="atooltip">
                          <div slot="content">
                            <div>
                              a、标样浓度值>100us/cm时，误差=实测值-标准液浓度,误差/标准液浓度的值在-0.05到0.05之间<br />算合格,否则不合格
                            </div>
                            <div>
                              b、标样浓度值<=100us /cm时，误差=实测值-标准液浓度，误差在-5到5之间算合格，否则不合格 </div>
                            </div>

                            <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <el-tooltip v-show="scope.row['Code'] == 'w19011'" effect="light" content="藻密度：无"
                          placement="right-start" popper-class="atooltip">
                          <span class="el-icon-warning"></span>
                        </el-tooltip>
                        <el-tooltip v-show="scope.row['Code'] == 'w01016'" effect="light" content="叶绿素：无"
                          placement="right-start" popper-class="atooltip">
                          <span class="el-icon-warning"></span>
                        </el-tooltip> -->

                        <!-- <el-tooltip
                            effect="light"
                            content="误差=实测值-标准液浓度 ，误差在-0.15至0.15之间算合格，否则不合格"
                            placement="right-start"
                            popper-class="atooltip"
                          >
                            <span class="el-icon-warning"></span>
                          </el-tooltip> -->
                      </span>
                    </template>
                  </el-table-column>

                  <el-table-column label="单位" align="center" prop="Unit">
                  </el-table-column>
                  <el-table-column label="标样浓度" align="right" prop="BiaoYangNongDu">
                    <template slot-scope="scope">
                      <span @click="
                            updateForm(
                              scope.row,
                              SDL_Global.CMD.YiBiao_WC_BiaoYangHeChaNongDu,
                              1
                            )
                          " style="
                            color: #4a92ff;
                            display: inline-block;
                            text-align: right;
                            padding-right: 20px;
                            cursor: pointer;
                          ">
                        {{ scope.row["BiaoYangNongDu"] }}
                        <i class="el-icon-edit"></i></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="
                            sendData(
                              scope.row['Name'],
                              SDL_Global.CMD.YiBiao.Format(
                                scope.row.Name.toUpperCase(),
                                2
                              )
                            )
                          ">点击核查
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :md="24" :lg="12">
            <div>
              <div class="box">
                <span class="title">其他参数核查</span>
                <!-- <span style="float: right;margin-left: 10px;margin-top: 5px;">2020-09-18 15:30:00</span> -->
              </div>
              <div style="height: 288px">
                <!-- <template v-for="data in config"> -->
                <el-table :data="SDL_Global.MetersDataPP().filter((m) => m.IsNormal)" :header-cell-style="{
                      'background-color': '#384565',
                    }" height="290px" stripe>
                  <el-table-column label="因子" align="center" prop="Name">
                  </el-table-column>
                  <el-table-column v-if="version == 2000" label="标样核查时间" align="center"
                    prop="MoreParam.BiaoYangShuJuShiJian" width="180">
                  </el-table-column>

                  <el-table-column v-else label="标样核查时间" align="center" prop="LastTestTime">
                  </el-table-column>
                  <el-table-column v-if="version == 2000" width="100" label="标样核查值" align="center"
                    prop="MoreParam.BiaoYangShiCeZhi">
                  </el-table-column>

                  <el-table-column v-else label="标样核查值" width="100" align="center" prop="LastTestData">
                  </el-table-column>

                  <el-table-column label="单位" align="center" prop="Unit">
                  </el-table-column>
                  <!-- <el-table-column label="标样浓度" align="center" prop="BiaoYangHeChaNongDu"
                                      
                                      
                                      >  -->
                  <el-table-column label="标样浓度" align="right" width="100" prop="BiaoYangHeChaNongDu">
                    <template slot-scope="scope">
                      <span @click="
                            updateForm(
                              scope.row,
                              SDL_Global.CMD.YiBiao_BiaoYangHeChaNongDu,
                              2
                            )
                          " style="
                            color: #4a92ff;
                            display: inline-block;
                            text-align: right;
                            padding-right: 20px;
                            cursor: pointer;
                          ">
                        {{ scope.row["BiaoYangHeChaNongDu"] }}
                        <i class="el-icon-edit"></i></span>
                    </template>
                  </el-table-column>

                  <!-- </el-table-column> -->
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="
                            sendData(
                              scope.row['ID'],
                              SDL_Global.CMD.YiBiao.Format(scope.row.ID, 2)
                            )
                          ">点击核查
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- </template> -->
                <!-- <table
                                      class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition"
                                      style="width: 100%;table-layout: fixed;background-color: #303a4c; ">
                                      <thead style="font-weight: bold;background-color: #384565;" >
                                          <td class="el-table_18_column_105  is-center   is-leaf">因子</td>
                                          <td class="el-table_18_column_105  is-center   is-leaf">浓度值</td>
                                          <td class="el-table_18_column_105  is-center   is-leaf">单位</td>
                                          <td class="el-table_18_column_105  is-center   is-leaf">操作</td>
                                      </thead>
                                      <tbody>
                                          <tr v-for="data in config">
                                              <td class="tdclass" v-if="data.factor=='factor'">{{data.realTimeData[0].name}}</td>
                                              <td class="tdclass" v-if="data.factor=='factor'">{{data.realTimeData[0].data}}</td>
                                              <td class="tdclass" v-if="data.factor=='factor'">{{data.realTimeData[0].unit}}</td>
                                              <td class="tdclass" v-if="data.factor=='factor'">
                                                  <el-button size="mini" @click="sendData(data.realTimeData[0].name)">点击核查
                                                  </el-button>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table> -->
              </div>
            </div>
          </el-col>
          <!-- </el-row> -->
          <!-- <el-row :gutter="24"> -->
          <el-col :sm="24" :xs="24" :md="24" :lg="12"
            v-if="SDL_Global.MetersData().filter((m) => m.ID=='VOCs').length>0 ">
            <div style="margin-top: 20px">
              <div class="box">
                <span class="title">VOCs核查</span>
                <span class="titlebtn" @click="
                sendData(
                  'VOCS',
                  SDL_Global.CMD.YiBiao.Format('VOC', 2)
                )
              ">标样核查</span>
              </div>
              <div class="text item" style="height: 288px">
                <el-table :data="SDL_Global.MetersDataPP().filter((m) => m.IsVOCs)" :header-cell-style="{
                      'background-color': '#384565',
                    }" height="290px" stripe>
                  <el-table-column label="因子" align="center" prop="Name">
                  </el-table-column>
                  <el-table-column label="浓度值" align="center" prop="LastTestData">
                    <template slot-scope="scope">
                      <span :style="{
                            color:
                              scope.row.ZhouCheck() == false ? '#da666e' : '#fff',
                          }">
                        {{ scope.row["LastTestData"] }}

                      </span>
                    </template>
                  </el-table-column>

                  <el-table-column label="单位" align="center" prop="Unit">
                  </el-table-column>
                  <el-table-column label="标样浓度" align="center" prop="BiaoYangNongDu">
                    <template slot-scope="scope">
                      <span @click="
                            updateForm(
                              scope.row,
                              SDL_Global.CMD.YiBiao_WC_BiaoYangHeChaNongDu,
                              1
                            )
                          " style="
                            color: #4a92ff;
                            display: inline-block;
                            text-align: right;
                            padding-right: 20px;
                            cursor: pointer;
                          ">
                        {{ scope.row["BiaoYangNongDu"] }}
                        <i class="el-icon-edit"></i></span>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="
                            sendData(
                              scope.row['Name'],
                              SDL_Global.CMD.YiBiao.Format(scope.row.Name, 2)
                            )
                          ">点击核查
                      </span>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :md="24" :lg="12"
            v-if="SDL_Global.MetersData().filter((m) => m.ID=='ZJS').length>0 ">
            <div style="margin-top: 20px">
              <div class="box">
                <span class="title">重金属核查</span>
                <span class="titlebtn" @click="
                sendData(
                  '重金属',
                  SDL_Global.CMD.YiBiao.Format('HM', 2)
                )
              " style="float: right;">标样核查</span>
              </div>
              <div style="height: 288px">

                <el-table :data="SDL_Global.MetersDataPP().filter((m) => m.IsZJS)" :header-cell-style="{
                      'background-color': '#384565',
                    }" height="290px" stripe>
                  <el-table-column label="因子" align="center" prop="Name">
                  </el-table-column>
                  <el-table-column label="浓度值" align="center" prop="LastTestData">
                    <template slot-scope="scope">
                      <span :style="{
                            color:
                              scope.row.ZhouCheck() == false ? '#da666e' : '#fff',
                          }">
                        {{ scope.row["LastTestData"] }}

                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" align="center" prop="Unit">
                  </el-table-column>
                  <el-table-column label="标样浓度" align="center" prop="BiaoYangHeChaNongDu">
                    <template slot-scope="scope">
                      <!-- updateForm(
                        scope.row['Name'],
                        scope.row['mlName'],
                        SDL_Global.CMD.YiBiao_BiaoYangHeChaNongDu,
                        scope.row['BiaoYangNongDu'],
                        scope.row['Unit']
                      ) -->
                      <span @click="
                            updateForm(
                              scope.row,
                              SDL_Global.CMD.YiBiao_BiaoYangHeChaNongDu,
                              2
                            )
                          " style="
                            color: #4a92ff;
                            display: inline-block;
                            text-align: right;
                            padding-right: 20px;
                            cursor: pointer;
                          ">
                        {{ scope.row["BiaoYangHeChaNongDu"] }}
                        <i class="el-icon-edit"></i></span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span class="btn" @click="
                            sendData(
                              scope.row['Name'],
                              SDL_Global.CMD.YiBiao.Format(
                                scope.row.Name.toUpperCase(),
                                2
                              )
                            )
                          ">点击核查
                      </span>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
            </div>
          </el-col>

        </el-row>
      </div>
      <template class="dialogBox">
        <el-dialog title="标样浓度--修改值" :visible.sync="dialogFormVisible" width="60%" :modal-append-to-body="false"
          :close-on-click-modal="false">
          <div class="dialogBody">
            <div class="dialogLabel">
              <label style="color: #cccccc">{{ byName }}</label>
            </div>
            <div class="dialogInput">
              <el-input size="small" placeholder="请输入" v-model="data" style="color: #fff">
                <template slot="append">{{unitName}}</template>
                <!-- <template slot="append" v-else-if="mlName == '浊度'">NTU</template>
                <template slot="append" v-else-if="mlName == '水温'">℃</template>
                <template slot="append" v-else-if="mlName == '电导率'">μS/cm</template>
                <template slot="append" v-else>mg/L</template> -->


              </el-input>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="SendwcbyData">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
  // import zkh from "@config/zkh";

  export default {
    name: "khrw",
    data() {
     
      return {

        // config: this.socketApi.ssztConfig.config, //配置数据
        SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
        version: JSON.parse(localStorage.getItem("appConfig")).MeterVersion,
        tableData1: [],
        dialogFormVisible: false,
        data: "",
        mlName: "",
        byName: '',
        ml: "",
        unitName: '',

        // yibiaoShow: yibiaoShow,
      };
    },
    mounted() {
      console.log("con", this.SDL_Global.Meters());
    },
    methods: {
      sendData(mlName, ml) {
        // //debugger
        let newml = ml + ";手动数据标识=N";
       
        var data =
          "" +
          localStorage.getItem("Loginedname") +
          "," +
          mlName +
          "标样核查" +
          "," +
          newml;
        // this.$message.info(data);
        console.log('点击核查', data)
        if (!this.socketApi.sendSock(data)) {
          // console.log("连接失败!");
          this.$message.info("连接失败!");
        }
      },
      // 标样浓度
      updateForm(scopeRow, ml, flag) { //Name, mlName, ml, data, unitName
        this.dialogFormVisible = true;
        this.byName = scopeRow.Name;
        this.unitName = scopeRow.Unit;
        this.mlName = "";

        if (flag == 2) {
          this.mlName = scopeRow.mlName;
          this.data = scopeRow.BiaoYangHeChaNongDu;
        } else {
          this.mlName = scopeRow.mlName;
          this.data = scopeRow.BiaoYangNongDu;

        }
       
        this.ml = ml;
      },
      //五参标样浓度修改
      SendwcbyData() {

        var sendmldata = "";
        
        sendmldata = this.ml.Format(this.mlName, this.data);
        var data =
          "" +
          localStorage.getItem("Loginedname") +
          "," +
          this.mlName +
          "标样浓度修改" +
          "," +
          sendmldata;
        // this.$message.info(data);
        console.log('标样浓度-修改值', data);

        this.socketApi.sendSock(data);
        this.dialogFormVisible = false;
      },
      getRealData() {
        this.config.forEach((element) => {
          var obj = {};
          if (element.factor == "factor") {
            obj.name = element.realTimeData[0].name;
            obj.data = element.realTimeData[0].data;
            obj.unit = element.realTimeData[0].unit;
          }
          tableData1.push(obj);
        });
      },
    },
  };
</script>
<style scoped>
  .el-row {
    background-color: #263044;
    border: none;
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
    background-color: #303a4c;
  }

  .title {
    color: #fff;
    font-size: 14px;
    margin-left: 20px;
    line-height: 48px;
  }

  .titlebtn {
    float: right;
    font-size: 14px;
    line-height: 48px;
    color: #4a92ff;
    margin-right: 20px;
    cursor: pointer;
  }

  /* 表头 */
  .tdhead {
    padding: 10px 0px;
    background-color: #384565;
    text-align: center;
  }

  .tdclass2 {
    text-align: center;
    color: #fff;
    font-size: 14px;
    background-color: #364055;
  }

  .tdclass1 {
    text-align: center;
    color: #fff;
    font-size: 14px;
    background-color: #303a4c;
  }

  .tdclass3 {
    width: 120px;
    padding-right: 28px;
    text-align: right;
    color: #fff;
    font-size: 14px;
    background-color: #303a4c;
  }

  .btn {
    font-size: 14px;
    color: #4a92ff;
    cursor: pointer;
  }
</style>