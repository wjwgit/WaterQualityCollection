<template>
  <div class="div_ykh">
    <el-row :gutter="20">
      <!-- 样例 -->
      <!-- <el-col :key="index" :span="12"
          ><div class="grid-content">
            <el-card class="box-card">
              <div slot="header" class="clearfix bg-header">
                <span class="c-title"
                  >总磷[<span class="c-status">在线</span>]</span
                >
                <el-button class="c-loginfo" type="text"
                  >流程信息：<span class="c-loginfo-info">无</span></el-button
                >
              </div>
              <div class="box-card-body">
                <div class="box-card-body-form">
                  <div class="form-div">
                    <div class="form-item box-card-body-form-label">
                      <label>V前</label>
                    </div>
                    <div class="form-item box-card-body-form-input">
                      <el-input
                        readonly
                        size="small"
                        placeholder="请输入"
                        v-model="input2"
                      >
                        <template slot="append">mL</template>
                      </el-input>
                    </div>
                    <div
                      class="form-item box-card-body-form-i"
                      @click="updateForm('总磷', 'V前', '3.25', 'TP_V前')"
                    >
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                  <div class="form-div">
                    <div class="form-item box-card-body-form-label">
                      <label>V后</label>
                    </div>
                    <div class="form-item box-card-body-form-input">
                      <el-input
                        readonly
                        size="small"
                        placeholder="请输入"
                        v-model="input2"
                      >
                        <template slot="append">mL</template>
                      </el-input>
                    </div>
                    <div class="form-item box-card-body-form-i">
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                  <div class="form-div">
                    <div class="form-item box-card-body-form-label">
                      <label>V标</label>
                    </div>
                    <div class="form-item box-card-body-form-input">
                      <el-input
                        readonly
                        size="small"
                        placeholder="请输入"
                        v-model="input2"
                      >
                        <template slot="append">mL</template>
                      </el-input>
                    </div>
                    <div class="form-item box-card-body-form-i">
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                  <div class="form-div">
                    <div class="form-item box-card-body-form-label">
                      <label>C标</label>
                    </div>
                    <div class="form-item box-card-body-form-input">
                      <el-input
                        readonly
                        size="small"
                        placeholder="请输入"
                        v-model="input2"
                      >
                        <template slot="append">mL</template>
                      </el-input>
                    </div>
                    <div class="form-item box-card-body-form-i">
                      <i class="el-icon-edit"></i>
                    </div>
                  </div>
                </div>
                <div class="box-card-body-text">
                  <div class="box-card-body-text-div">
                    <span class="c-one">内部脉冲：50分钟</span>
                    <span class="c-two">加标回收率：135%</span>
                    <span class="c-three">报警信息：<span>无</span></span>
                  </div>
                </div>
                <div class="box-card-body-btn">
                  <el-button-group>
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-edit"
                      class="c-g-i"
                    ></el-button>
                    <el-button size="small" type="primary" class="c-g-btn"
                      >启动</el-button
                    >
                  </el-button-group>
                  <el-button-group>
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-edit"
                      class="c-g-i"
                    ></el-button>
                    <el-button size="small" type="primary" class="c-g-btn"
                      >停止</el-button
                    >
                  </el-button-group>
                  <el-button-group>
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-edit"
                      class="c-g-i"
                    ></el-button>
                    <el-button size="small" type="primary" class="c-g-btn"
                      >复位</el-button
                    >
                  </el-button-group>
                  <el-button-group>
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-edit"
                      class="c-g-i"
                    ></el-button>
                    <el-button size="small" type="primary" class="c-g-btn"
                      >清洗</el-button
                    >
                  </el-button-group>
                </div>
              </div>
            </el-card>
          </div></el-col
        > -->
      <template v-for="(item, index) in SDL_Global.MetersDataPP().filter((m) => m.IsNormal)">
        <el-col :key="index" :sm="24" :xs="24" :md="24" :lg="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix bg-header">
              <span class="c-title">{{ item.Name }} [<span v-bind:class="{
                    'c-status': item.JB_StatusText =='通讯正常',
                    offline: item.JB_StatusText == '通讯断开',
                  }">{{ item.JB_StatusText }}</span>]</span>
              <el-button class="c-loginfo" type="text">流程信息：<span class="c-loginfo-info">{{
                  item.JB_SubStatus
                  }}</span></el-button>
            </div>
            <div class="box-card-body">
              <div class="box-card-body-form">
                <div class="form-div">
                  <div class="form-item box-card-body-form-label">
                    <label>V1</label>
                  </div>
                  <div class="form-item box-card-body-form-input">
                    <el-input disabled size="small" placeholder="请输入" v-model="item.JB_V1">
                      <template slot="append">mL</template>
                    </el-input>
                  </div>
                  <div class="form-item box-card-body-form-i" @click="
                      openDialog(
                        item.Name,
                        'V1',
                        item.JB_V1,
                        'mL',
                        SDL_Global.CMD.YiBiao_V1,
                        item.ID
                      )
                    ">
                    <i class="el-icon-edit"></i>
                  </div>
                </div>
                <div class="form-div">
                  <div class="form-item box-card-body-form-label">
                    <label>C标</label>
                  </div>
                  <div class="form-item box-card-body-form-input">
                    <el-input disabled size="small" placeholder="请输入" v-model="item.JB_CB">
                      <template slot="append">mg/L</template>
                    </el-input>
                  </div>
                  <div class="form-item box-card-body-form-i" @click="
                      openDialog(
                        item.Name,
                        'C标',
                        item.JB_CB,
                        'mg/L',
                        SDL_Global.CMD.YiBiao_CB,
                        item.ID
                      )
                    ">
                    <i class="el-icon-edit"></i>
                  </div>
                </div>

                <div class="form-div">
                  <div class="form-item box-card-body-form-label">
                    <label>V3</label>
                  </div>
                  <div class="form-item box-card-body-form-input">
                    <el-input disabled size="small" placeholder="请输入" v-model="item.JB_V3">
                      <template slot="append">mL</template>
                    </el-input>
                  </div>
                  <div class="form-item box-card-body-form-i" @click="
                      openDialog(
                        item.Name,
                        'V3',
                        item.JB_V3,
                        'mL',
                        SDL_Global.CMD.YiBiao_V3,
                        item.ID
                      )
                    ">
                    <i class="el-icon-edit"></i>
                  </div>
                </div>
                <div class="form-div">
                  <div class="form-item box-card-body-form-label">
                    <label>V标</label>
                  </div>
                  <div class="form-item box-card-body-form-input">
                    <el-input disabled size="small" placeholder="请输入" v-model="item.JB_VB">
                      <template slot="append">mL</template>
                    </el-input>
                  </div>
                  <!-- <div
                    class="form-item box-card-body-form-i"
                    @click="
                      openDialog(
                        item.Name,
                        'V后',
                        item.JB_VH,
                        'mL',
                        SDL_Global.CMD.YiBiao_V3,
                        item.ID
                      )
                    "
                  >
                    <i class="el-icon-edit"></i>
                  </div> -->
                </div>


                <div class="form-div">
                  <div class="form-item box-card-body-form-label">
                    <label>脉冲</label>
                  </div>
                  <div class="form-item box-card-body-form-input">
                    <el-input disabled size="small" placeholder="请输入" v-model="item.JB_TimerSpance">
                      <template slot="append">分钟</template>
                    </el-input>
                  </div>
                  <div class="form-item box-card-body-form-i" @click="
                      openDialog(
                        item.Name,
                        '脉冲',
                        item.JB_TimerSpance,
                        '分钟',
                        SDL_Global.CMD.YiBiao_JBTimerSpance,
                        item.ID.toLowerCase()
                      )
                    ">
                    <i class="el-icon-edit"></i>
                  </div>
                </div>
                <div class="form-div">
                  <div class="form-item box-card-body-form-label">
                    <label>定容体积</label>
                  </div>
                  <div class="form-item box-card-body-form-input">
                    <el-input disabled size="small" placeholder="请输入" v-model="item.JB_DingRongTiJi">
                      <template slot="append">mL</template>
                    </el-input>
                  </div>
                  <!-- <div
                    class="form-item box-card-body-form-i"
                    @click="
                      openDialog(
                        item.Name,
                        '脉冲',
                        item.JB_TimerSpance,
                        '分钟',
                        SDL_Global.CMD.YiBiao_JBTimerSpance,
                        item.ID.toLowerCase()
                      )
                    "
                  >
                    <i class="el-icon-edit"></i>
                  </div> -->
                </div>
              </div>
              <div class="box-card-body-text">
                <div class="box-card-body-text-div">
                  <!-- <span class="c-one">内部脉冲：{{ item.JB_Pulse1 }}分钟</span> -->
                  <!-- <span>脉冲2：50分钟</span> -->
                  <span class="c-two">加标回收率：{{ item.JB_HuiShouLv }}%</span>
                  <span class="c-three">报警信息：<span :class="item.JB_Fault <= 0 ? '' : 'c-alarm'">{{ item.JB_FaultText
                      }}</span></span>
                </div>
              </div>
              <div class="box-card-body-btn">
                <el-button-group>
                  <el-button size="small" type="primary" icon="iconfont icon-qidong" class="c-g-i myicon"
                    v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标启动',
                        SDL_Global.CMD.YiBiao.Format(item.ID, 7)
                      )
                    "></el-button>
                  <el-button size="small" type="primary" class="c-g-btn" v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标启动',
                        SDL_Global.CMD.YiBiao.Format(item.ID, 7)
                      )
                    ">启动</el-button>
                </el-button-group>
                <el-button-group>
                  <el-button size="small" type="primary" icon="iconfont icon-tingzhi" class="c-g-i myicon"
                    v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标停止',
                        SDL_Global.CMD.YiBiao_JBStop.Format(
                          item.ID.toLowerCase(),
                          item.ID
                        )
                      )
                    "></el-button>
                  <el-button size="small" type="primary" class="c-g-btn" v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标停止',
                        SDL_Global.CMD.YiBiao_JBStop.Format(
                          item.ID.toLowerCase(),
                          item.ID
                        )
                      )
                    ">停止</el-button>
                </el-button-group>
                <el-button-group>
                  <el-button size="small" type="primary" icon="iconfont icon-qingxi" class="c-g-i myicon"
                    v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标清洗',
                        SDL_Global.CMD.YiBiao_JBWash.Format(
                          item.ID.toLowerCase()
                        )
                      )
                    "></el-button>
                  <el-button size="small" type="primary" class="c-g-btn" v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标清洗',
                        SDL_Global.CMD.YiBiao_JBWash.Format(
                          item.ID.toLowerCase()
                        )
                      )
                    ">清洗</el-button>
                </el-button-group>
                <el-button-group style="width:20%">
                  <el-button size="small" type="primary" icon="iconfont icon-fuwei" class="c-g-i myicon"
                    v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标复位',
                        SDL_Global.CMD.YiBiao_JBReset.Format(
                          item.ID.toLowerCase(),
                          item.ID
                        )
                      )
                    "></el-button>
                  <el-button size="small" type="primary" class="c-g-btn" style="width: 70px;padding-left: 10px;"
                    v-bind:disabled="
                      item.ComStatus != 1 ||
                      (SDL_Global.PLC.YunXingMoShi != 1 &&
                        SDL_Global.PLC.YunXingMoShi != 8)
                    " @click="
                      sendml(
                        item.ID + '_加标复位',
                        SDL_Global.CMD.YiBiao_JBReset.Format(
                          item.ID.toLowerCase(),
                          item.ID
                        )
                      )
                    ">清除报警</el-button>
                </el-button-group>
              </div>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <template class="dialogBox">
      <el-dialog :title="dialogForm.title + '-修改值'" :visible.sync="dialogFormVisible" width="40%"
        :modal-append-to-body="false" :close-on-click-modal="false">
        <div class="dialogBody">
          <div class="dialogLabel">
            <label style="color: #cccccc">{{ dialogForm.label }}</label>
          </div>
          <div class="dialogInput">
            <el-input size="small" placeholder="请输入" v-model="dialogForm.value">
              <template slot="append">{{ dialogForm.unit }}</template>
            </el-input>
          </div>
        </div>
        <!-- <div class="form-div dialog-form-div">
          <div class="form-item box-card-body-form-label">
            <label>{{ dialogForm.label }}</label>
          </div>
          <div class="form-item box-card-body-form-input">
            <el-input size="small" placeholder="请输入" v-model="dialogForm.value">
              <template slot="append">mL</template>
            </el-input>
          </div>
        </div> -->
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>

</template>
<script>
  // import jclc from "@config/jclc";
  export default {
    name: "jbkz",
    data() {
      // let YiBiaoData = [];
      // YiBiaoData = this.socketApi.globalDataConfig.SDL_Global.Meters().filter(function (item, index, array) {
      //           //元素值，元素的索引，原数组。
      //           if (item.id != 'CYQ') {
      //               return item.isMain == true;
      //           }
      //       });
      //       YiBiaoData.sort(function (a, b) {
      //           return a.sort - b.sort
      //       });
      return {
        dialogForm: {
          id: "",
          title: "信息",
          label: "Key",
          value: "0.0",
          unit: "mL",
          ml: "--",
        },
        dialogFormVisible: false,
        SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
        centerDialogVisible: false,
        data: "", //参数设置数值
        name: "", //参数设置name
        ml: "", //参数设置ml
        // YiBiaoShow:YiBiaoData
      };
    },
    mounted() {
    },
    methods: {
      //弹出对话框
      openDialog(name, label, value, unit, ml, id) {
        this.dialogForm = {
          title: name,
          label,
          value,
          unit,
          ml,
          id,
        };

        this.dialogFormVisible = true;
        //this.$message.warning(JSON.stringify(this.dialogForm));
      },
      //发送命令
      sendml(name, ml) {
        //SDL_Global.CMD.YiBiao_C.Format("TP", xxx);

        //判断当前模式
        let dataflag = ""
        if (name == "TN_加标启动" || name == "TP_加标启动" || name == "COD_加标启动" || name == "NH3_加标启动") {
          if (this.SDL_Global.PLC.YunXingMoShi == 1) {
            dataflag = ";手动数据标识=M"
          } else {
            dataflag = ";手动数据标识=hd"
          }
        }else{
          name=name+"修改"
        }

        //TODO：需要判断仪表是否处于空闲
        var data = localStorage.getItem("Loginedname") + "," + name + "," + ml + dataflag;
        // this.$message.info(data);
        this.socketApi.sendSock(data);
      },
      //修改弹出框内容
      updateData() {
        let name = this.dialogForm.label;
        let ml = this.dialogForm.ml.Format(
          this.dialogForm.id,
          this.dialogForm.value
        );
        this.sendml(name, ml);
        this.dialogFormVisible = false;
      },
      sendData() {
        this.centerDialogVisible = false;
        var data =
          "" +
          localStorage.getItem("Loginedname") +
          "," +
          this.name +
          "," +
          this.ml +
          "=" +
          this.data;
        // this.$message.info(data);

        this.socketApi.sendSock(data);
      },
      //加标回收
      jbSend: function (conName, btnName, mlcs, czml) {
        let newState = "空闲";
        if (btnName == "停止" || btnName == "复位") {
          newState = "空闲";
        } else {
          this.config.forEach((i) => {
            if (i.name == conName) {
              i.Args.forEach((k) => {
                if (k.display == "状态") {
                  newState = k.value;
                }
              });
            }
          });
        }
        if (newState == "空闲") {
          var data =
            "" + localStorage.getItem("Loginedname") + "," + mlcs + "," + czml;
          // alert(data);
        // this.$message.info(data);

          this.socketApi.sendSock(data);
        } else {
          // alert("请等待仪表空闲");
          this.$message.warning("请等待仪表空闲");
        }
      },
      //加标回收状态
      jbState(val) {
        if (val == 0) return "空闲";
        if (val == 1) return "加标1执行中";
        if (val == 2) return "加标2执行中";
        if (val == 3) return "标液稀释中";
        if (val == 4) return "平行样执行中";
        if (val == 5) return "正在排空";
        if (val == 6) return "正在清洗";
        if (val == 7) return "定量测试中";
      },
      //加标子状态
      jbSubState(val) {
        if (val == 0) return "空闲";
        if (val == 1) return "低中液位定量";
        if (val == 2) return "高液位定量";
        if (val == 3) return "计量器排空";
        if (val == 4) return "注入混均杯";
        if (val == 5) return "检查液位传感器";
        if (val == 6) return "计量器润洗";
        if (val == 7) return "混均杯排空";
        if (val == 8) return "抽取空白";
      },
      //加标报警信息
      jbError(val) {
        if (val == 0) return "无故障";
        if (val == 1) return "液位传感器故障";
        if (val == 2) return "进样故障";
        if (val == 3) return "排液故障";
        if (val == 4) return "排空故障";
        if (val == 5) return "未采到空白";
        if (val == 6) return "未采到水样";
        if (val == 7) return "未采到标液1";
        if (val == 8) return "未采到标液2";
      },
    },
  };
</script>


<style scoped>
  /* 表单开始*/
  .div_ykh .box-card-body-form {
    width: 100%;
    height: 143px;
    margin: 20px 20px 10px 20px;
  }

  .div_ykh .form-div {
    float: left;
    width: 48%;
    padding-bottom: 10px;
  }

  .div_ykh .form-item {
    float: left;
  }

  .div_ykh .box-card-body-form-label {
    padding-right: 6px;
    padding-top: 4px;
    color: #fff;

    width: 65px;
    text-align: right;
  }

  .div_ykh .box-card-body-form-label label {
    color: #cccccc;
  }

  .div_ykh .box-card-body-form-input {
    padding-right: 10px;
    width: 70%;
    padding-bottom: 10px;
    color: #fff;
  }

  .div_ykh .box-card-body-form-i {
    padding-top: 3px;
    color: rgb(74, 146, 255);
    cursor: pointer;
    font-size: 20px;
  }

  /* 表单结束*/

  @media only screen and (max-width: 1366px) {
    .div_ykh .box-card-body-form-input {
      padding-right: 10px;
      width: 60%;
    }
  }

  .div_ykh .box-card-body-text {
    width: 100%;
    background-color: #384565;
    height: 30px;
    color: #cccccc;
  }

  .div_ykh .box-card-body-text-div {
    padding-top: 4px;
    padding-left: 20px;
    margin-right: 15px;
  }

  /* .div_ykh .box-card-body-text .c-one {
  display: block;
  float: left;
  width: 27%;
} */

  .div_ykh .box-card-body-text .c-two {
    display: block;
    float: left;
    width: 50%;
  }

  .div_ykh .box-card-body-text .c-three {
    display: block;
    float: right;
    /* width: 50%; */
  }

  .div_ykh .box-card-body-text .c-three span {
    font-size: 15px;
    color: #cccccc;
  }

  .div_ykh .box-card-body-text .c-three span.c-alarm {
    font-size: 15px;
    color: #da666e;
  }

  .div_ykh .box-card-body-text-div span {
    margin-right: 10px;
  }

  .div_ykh .c-title {
    color: #fff;
  }

  .div_ykh .c-status {
    color: #6ad2c2;
  }

  .div_ykh .offline {
    color: #cccccc;
  }

  .div_ykh .c-loginfo {
    float: right;
    padding: 0px 0;
    color: #cccccc;
  }

  .div_ykh .c-loginfo-info {
    color: #4a92ff;
  }

  .div_ykh .box-card-body-btn {
    margin: 20px 0px;
    width: 100%;
    text-align: center;
  }

  /* 重写样式-按钮 */

  /* 重写样式-弹出框底部按钮 */
  .div_ykh .dialog-footer {
    text-align: center;
  }

  /* 弹出框样式 */
  .div_ykh .dialog-form-div {
    width: 100%;
    padding-left: 10%;
  }

  .div_ykh .dialog-form-div .box-card-body-form-input input {
    color: #384565;
  }

  /* .div_ykh .dialog-form-div .box-card-body-form-label label {
  color: #384565;
} */

  .div_ykh .c-g-i {
    height: 32px;
    padding: initial;
  }
</style>