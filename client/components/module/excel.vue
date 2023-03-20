<template>
  <el-button size="small" @click="exportData" type="primary" style="float: left;margin-top: 8px;margin-left: 15px;"
    :loading="isLoading">
    导出
    <!-- <i class="el-icon-share el-icon--right"></i> -->
  </el-button>
</template>
<script>
  import { DateTime } from "../../common/js/date"; //时间


  const { export_json_to_excel } = require("excel/Export2Excel");

  export default {
    props: {
      excelTitleName: String, //excel标题名字
      exportHeader: Array, //excel表头
      exportFilterVal: Array, //excel表头对应的字段
      exportList: Array //excel数据
    },
    data() {
      return {
        isLoading: false,
      }
    },
    methods: {
      exportData() {
        // const loading = this.$loading({
        //   lock: true,
        //   text: "正在导出，请稍等......",
        //   // spinner: "el-icon-loading",
        //   background: "rgba(0, 0, 0, 0.7)"
        // });
        this.isLoading = true;
        debugger

        require.ensure([], () => {
          const titleName = this.excelTitleName;
          const tHeader = this.exportHeader; //表头
          const filterVal = this.exportFilterVal; //表头对应的字段
          const list = this.exportList; //数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(
            tHeader,
            data,
            titleName + new DateTime().getFormat()
          );

          this.$message({
            message: "导出成功",
            duration: 5000,
            type: "success"
          });
          // loading.close();
          this.isLoading = false;
        });
      },
      formatJson(filterVal, jsonData) {
        // return jsonData.map(v => filterVal.map(j => v[j]));
        return jsonData.map(v => Object.keys(v).map(m => v[m]));
      }
    }
  };
</script>
<style scoped>
  @media only screen and (max-width: 1024px) {

    .el-button--small,
    .el-button--small.is-round {
      padding: 9px 10px;
    }
  }
</style>