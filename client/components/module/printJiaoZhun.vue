<template>
    <div>
        <el-dialog class="div-dialog" title="打印校准记录" :visible.sync="dialogJiaoZhunVisible" width="89%"
        :modal-append-to-body='false' :close-on-click-modal="false">
      <div id="printDataS">
        <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">水污染自动监测仪校准记录表</div>
        <table style="border: 1px solid #000;min-width:760px;height: 340px;text-align:left ">
          <tr>
              <td colspan="9" style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">企业名称：{{SDL_Global.SYS.CompanyName}}</td>
              <!-- <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;"></td> -->
          </tr>
          <tr>
              <td colspan="4" style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px;">站点名称：{{SDL_Global.SYS.PointName}}</td>
              <!-- <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;"></td> -->
              <td  style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px;border-left: 1px solid #000;">维护单位：</td>
              <td colspan="4" style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{SDL_Global.SYS.YunWeiCompanyName}}</td>
          </tr>
          <tr>
            <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">仪器类别</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">仪器型号</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">使用量程</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">校准类型</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">校准时间</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">信号值</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">斜率</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">截距</td>
            <!-- <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;"></td> -->
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">是否正常</td>
          </tr>
          <tr  v-for="item in printJZLog">
            <td style="padding-left:8px;border-bottom: 1px solid #000;">{{item.Pol}}</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.Series}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.i13001}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.CheckType}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.DataTime}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.i13010}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.i13008}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">{{item.i13007}}</td>
            <!-- <td  style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;"></td> -->
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;"></td>
          </tr>
        
          <tr>
            <td colspan="9"  style="padding-left:8px;border-bottom: 1px solid #000;">要求：校准参数填写空白和标液校准数据中的吸光度或滴定体积 </td>
          </tr>
          <tr>
            <td >维护人： </td>
            <td  style="border-left: 1px solid #000;padding-left:8px;"> </td>
            <td  style="border-left: 1px solid #000;padding-left:8px;"> </td>
            <td  style="border-left: 1px solid #000;padding-left:8px;"> </td>
            <td  style="border-left: 1px solid #000;padding-left:8px;">审核人：</td>
            <td  style="border-left: 1px solid #000;padding-left:8px;"> </td>
            <td  style="border-left: 1px solid #000;padding-left:8px;">日期 </td>
            <td colspan="4"  style="border-left: 1px solid #000;padding-left:8px;"> </td>
          </tr>
        </table>
      </div>
  
      <el-button size="small" v-print="printContent" style="margin-top:20px;" v-if="jiaozhunLeng!=0">
        打印
        <i class="el-icon-edit el-icon--right"></i>
      </el-button>
    </el-dialog>
  
    </div>
  
  </template>
  <script>
    export default {
      props: {
        printJZLog: Array, //导出的ref
        jiaozhunLeng:Number,
        jiaoZhunModel: {
          //是否带有纵向边框
          type: Boolean,
          default: () => false
        },
      },
      data() {
        return {
          SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
          printContent: {
            id: 'printDataS',
            preview: false,//预览工具是否启用
            previewTitle: '这是预览标题',//预览页面的标题
            popTitle: '巡检维护记录表',//打印页面的页眉
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
  
        console.log('print', this.printywjl);
        // this.printData()
      },
      computed: {
        dialogJiaoZhunVisible: {
          // getter
          get: function () {
            
            return this.jiaoZhunModel;
          },
          // setter
          set: function (newVal) {
            
  
            if (!newVal) {
              this.$emit("update:jiaoZhunModel", false); //触发 input 事件，并传入新值
            }
          }
        },
      },
      methods: {
      
      }
    };
  </script>
  <style scoped>
 /* .el-table  .el-table__expanded-cell{
  background-color: '#384565' !important
 } */
 .div-dialog #printDataS  {
        height: calc(100vh - 390px);
        overflow: auto;
    }
  </style>