<template>
  <div>
    <el-dialog class="div-dialog" title="打印实际水样比对实验结果记录" :visible.sync="dialogShuiYangVisible" width="726px"
      :modal-append-to-body='false' :close-on-click-modal="false">
      <div id="printDataS">
        <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">实际水样比对实验结果记录表
        </div>
        <table style="border: 1px solid #000;text-align:left;;width:100%" cellspacing="0">
          <tr style="height: 60px">
            <!-- <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px;border-left: 1px solid #000;">
              运行方代表：</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{SDL_Global.SYS.YunWeiCompanyName}}</td>
            <td style="padding-left:8px;border-left: 1px solid #000;border-bottom: 1px solid #000;max-width:80px">业主方代表：
            </td>
            <td style="padding-left:8px;border-left: 1px solid #000;border-bottom: 1px solid #000;max-width:80px">
              {{SDL_Global.SYS.CompanyName}}
            </td>

            <td style="padding-left:8px;border-left: 1px solid #000;border-bottom: 1px solid #000;max-width:80px;">日期：
            </td>
            <td style="padding-left:8px;border-left: 1px solid #000;border-bottom: 1px solid #000;max-width:80px;">
              {{printbiDuiTimes}}</td> -->

            <td colspan="5" style="border-bottom: 1px solid #000">
              <div style="margin: 8px; margin-bottom: 15px">
                <span style="display: inline-block; width: 71%">
                  运行方代表:
                  <span>
                    {{ SDL_Global.SYS.YunWeiCompanyName}}
                  </span>
                </span>
                <span style="display: inline-block; width: 25%;text-align: right;">
                  水样时间:
                  <span>
                    {{printbiDuiTimes}}
                  </span>
                </span>
              </div>
              <div style="margin: 8px">
                <span style="display: inline-block; width: 80%">
                  业主方代表:
                  <span>
                    {{ SDL_Global.SYS.CompanyName }}
                  </span>
                </span>
              </div>
            </td>

          </tr>
          <tr height="35px">
            <!-- <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">时间</td> -->
            <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">监测参数</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">在线仪器仪器测定结果</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              对比方法测定结果平均值</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">测定误差</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">是否合格</td>
          </tr>
          <tr height="35px" v-for="item in bdDataList">
            <td style="padding-left:8px;border-bottom: 1px solid #000;">{{item.PolId}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.AutoValue}}
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.ManualValue}}
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{item.CompareValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{item.CompareResult}}</td>
          </tr>
        </table>
      </div>

      <el-button size="small" v-print="printContent" style="margin-top:20px;">
        打印
        <i class="el-icon-edit el-icon--right"></i>
      </el-button>
    </el-dialog>

  </div>

</template>
<script>
  export default {
    props: {
      // PrintBiDuiList: Array, //导出的ref
      printbiDuiTimes: String,
      ShuiYangModel: {

        type: Boolean,
        default: () => false
      },
    },
    data() {
      return {
        SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
        bdDataList: [],
        printContent: {
          id: 'printDataS',
          preview: false,//预览工具是否启用
          previewTitle: '这是预览标题',//预览页面的标题
          popTitle: '水样比对记录表',//打印页面的页眉
          // extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.cSs/4.1.1/animate.compat.css，https://cdn.boc
          extraHead: '<meta http-equiv="content-Language"content="zh-cn"/>',
          previewBeforeopencallback() {
            console.log('正在加载预览窗口')
          },
          previewOpencallback() {
            console.log('已经加载完预览窗口')
          },
          beforeopencallback(vue) {
            vue.printLoading = trueconsole.log('打开之前')
          },
        },
      }
    },
    mounted() {

      // console.log('print', this.printywjl);
      this.cleardbDataList();
    },
    computed: {
      dialogShuiYangVisible: {
        // getter
        get: function () {

          return this.ShuiYangModel;
        },
        // setter
        set: function (newVal) {


          if (!newVal) {
            this.$emit("update:ShuiYangModel", false); //触发 input 事件，并传入新值
          }
        }
      },
    },
    methods: {
      // 清空数据
      cleardbDataList() {
        let tiemList = [];
        for (var i = 0; i < 15; i++) {

          tiemList.push({
            PolId: '',
            AutoValue: "",
            ManualValue: "",
            CompareValue: "",
            CompareResult: "",
          });
        }
        this.bdDataList = tiemList;
      },
      // 获取打印比对数据
      getData(printbiDuiTime, printPolId) {
        let condition = "";
        condition = "DataTime like '" + printbiDuiTime + "%' and DataType !=2 ";
        if (printPolId != '') {
          condition = condition + "  and PolId='" + printPolId + "'";
        }
        var that = this;

        that.cleardbDataList();
        that.http
          .comMethod('*', 'tbquartercompare', condition)
          .then((res) => {
            if (res.length != 0) {
              //打印数据

              for (var i = 0; i < res.length; i++) {
                that.bdDataList[i].PolId = that.socketApi.globalDataConfig.getCodeNameData(res[i].PolId);
                that.bdDataList[i].AutoValue = res[i].AutoValue;
                that.bdDataList[i].ManualValue = res[i].ManualValue;


                that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(2);
                that.bdDataList[i].CompareResult = res[i].CompareResult == 0 ? '不合格' : '合格';

                // if (that.bdDataList[i].PolId == 'pH值') {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(1)
                // }
                // else if (that.bdDataList[i].PolId == '水温') {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(1) + "℃";
                // }
                // else if (that.bdDataList[i].PolId == '流量' && r["DataType"] == '液位数据') {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(0) + "mm";
                // }
                // else if (that.bdDataList[i].PolId == '总磷' && r["DataType"] == '水样数据' && r["AutoValue"] < 0.4) {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(2) + " mg/L";
                // }
                // else if (that.bdDataList[i].PolId == '总氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(1) + " mg/L";
                // }
                // else if (that.bdDataList[i].PolId == '氨氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(1) + " mg/L";
                // }
                // else if (that.bdDataList[i].PolId == '化学需氧量' && r["DataType"] == '水样数据' && r["AutoValue"] < 30) {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(0) + " mg/L";
                // }
                // else {
                //   that.bdDataList[i].CompareValue = res[i].CompareValue.toFixedFormat(2) + "%";
                // }

 
              }

              //               res.forEach((r) => {
              //                 r.DataTime = that.$options.filters.dateFormat(r.DataTime);

              //                 if (r["PolId"] == 'pH值') {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(1)
              //                 }
              //                 else if (r["PolId"] == '水温') {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(1) + "℃";
              //                 }
              //                 else if (r["PolId"] == '流量' && r["DataType"] == '液位数据') {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(0) + "mm";
              //                 }
              //                 else if (r["PolId"] == '总磷' && r["DataType"] == '水样数据' && r["AutoValue"] < 0.4) {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + " mg/L";

              //                 }
              //                 else if (r["PolId"] == '总氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(1) + " mg/L";

              //                 }
              //                 else if (r["PolId"] == '氨氮' && r["DataType"] == '水样数据' && r["AutoValue"] < 2) {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(1) + " mg/L";

              //                 }
              //                 else if (r["PolId"] == '化学需氧量' && r["DataType"] == '水样数据' && r["AutoValue"] < 30) {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(0) + " mg/L";
              //                 }
              //                 else {
              //                   r["CompareValue"] = r["CompareValue"].toFixedFormat(2) + "%";

              //                 }

              //                 r["CompareResult"] = r["CompareResult"] == 0 ? '不合格' : '合格';// this.funResult(r["CompareResult"]);

              // debugger


              //               });


            } else {

            }
          })
          .catch((res) => {
            console.log(res);

          });
      },
    }
  };
</script>
<style scoped>
  /* .div-dialog #printDataS {
    height: calc(100vh - 520px);
    overflow: auto;
  } */
</style>