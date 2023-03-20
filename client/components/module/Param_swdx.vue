<template>
  <div>
    <el-dialog
      :visible.sync="dialogswdxParamVisible"
      width="60%"
      title="生物毒性"
      :modal-append-to-body="false"
      class="div-dialog"
    >
      <table >
        <thead></thead>
        <tbody>
          <tr>
            <td>生物副毒性</td>
            <td>{{ SDL_Global['SWDX'].SWDX_FuDuXingDu }}</td>
            <td>注意值</td>
            <td>{{ SDL_Global['SWDX'].SWDX_ZhuYiZhi }}</td>
          </tr>
          <tr>
            <td>状态</td>
            <td>{{ SDL_Global['SWDX'].MeterStatusText }}</td>
            <td>主传感器</td>
            <td>{{ SDL_Global['SWDX'].SWDX_ZhuChuanGanQi }}</td>
          </tr>
          <tr>
            <td>报警</td>
            <td >
              {{ SDL_Global['SWDX'].AlarmText }}
            </td>
            <td>报警值</td>
            <td>{{ SDL_Global['SWDX'].SWDX_AlarmValue }}</td>
          </tr>
          <tr>
            <td>电压值</td>
            <td >
              {{ SDL_Global['SWDX'].SWDX_DianYaZhi }}
            </td>
            <td>副电压值</td>
            <td>{{ SDL_Global['SWDX'].SWDX_FuDianYaZhi }}</td>
          </tr>
    
        </tbody>
      </table>
    </el-dialog>
 
  </div>
</template>
<script >

export default {
  props: {
      swdxParammodel: {
      //是否带有纵向边框
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
    };
  },
  components: {
  },
  computed: {
    dialogswdxParamVisible: {
      // getter
      get: function () {
        return this.swdxParammodel;
      },
      // setter
      set: function (newVal) {
        if (!newVal) {
          this.$emit("update:swdxParammodel", false); //触发 input 事件，并传入新值
        }
      },
    },
  },
  methods: {
 
  },
};
</script>
<style scoped>
.div-dialog table {
  width: 100%;
  text-align: center;
  color: #cccccc;
  border-collapse: collapse;
}

.div-dialog table tr {
  background-color: #35415a;
  height: 32px;
  line-height: 32px;
}

.div-dialog table tr:nth-child(odd) {
  background-color: #293244;
}

.div-dialog table tr td {
  width: 200px;
  border-right: 1px solid #3c4860;
}

.div-dialog-more table tr td {
  width: 200px;
  border-right: 1px solid #3c4860;
  text-align: left;
  padding-left: 10px;
}

.c-red {
  color: #da666e;
}

/* 仪表控制 */
.c-status {
  color: #6ad2c2;
}
.ybkzCard .el-card {
  background-color: #35415a !important;
}
.ybkzCard .el-card__body {
  background-color: #35415a !important;
}
.clearfix {
  text-align: left;
}

.c-loginfo {
  float: right;
  padding: 0px 0;
  color: #cccccc;
  font-size: 14px;
}

.c-loginfo-info {
  color: #4a92ff;
}

.offline {
  color: #cccccc;
}

.body-btn {
  width: 100%;
  text-align: center;
}

/* 校时 */
.dividing {
  width: 100%;
  height: 1px;
  background-color: #48556e;
}

/* .el-card__body {
        padding-top: 20px !important;
        padding-top: 5px;
        #35415a
    } */

.body-btn .el-button {
  background-color: #506c98;
  color: #ffffff;
  width: 80px;
  font-size: 14px;
  margin-bottom: 20px;

  margin-right: 15px;
  margin-left: 10px;
  border-color: #506c98;
}

.body-btn .el-button.active {
  background-color: #4a92ff;
  border-color: #4a92ff;
}

.body-btn .el-button--small,
.el-button--small.is-round {
  padding: 9px 10px;
}

.body-footer {
  color: #cccccc;
  height: 46px;
  line-height: 46px;
  margin-left: 20px;
  font-size: 14px;
  text-align: left;
}

.body-footer-text-r {
  float: right;
  margin-right: 23px;
  color: #4a92ff;
  cursor: pointer;
}

.body-footer-text-r .el-button {
  background-color: #506c98;
  color: #ffffff;
  border-color: #506c98;
  font-size: 14px;
  /* cursor: pointer; */
}
</style>