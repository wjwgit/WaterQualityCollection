<template>
  <el-button size="small" @click="printData" style="margin-left:0px;">
    打印
    <i class="el-icon-edit el-icon--right"></i>
  </el-button>
</template>
<script>
export default {
  props: {
    print: String //导出的ref
  },
  methods: {
    printData() {
      let print = this.print;
      this.$print(this.$parent.$refs[print]); // 使用
    }
  }
};
</script>

