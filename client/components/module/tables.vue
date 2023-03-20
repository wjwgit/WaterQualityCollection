<template>
  <el-table
    :border="border"
    :max-height="height"
    :data="tabData"
    highlight-current-row
    style="width: 100%"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    v-loadmore="loadMore"
  >
    <!--数据源-->
    <el-table-column
      v-for="(column, index) in columns"
      :header-align="column.headerAlign"
      :sortable="column.hasSort"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :align="column.align"
      :width="column.width"
      :fixed="column.fixed"
    ></el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "tables",
  props: {
    dataSource: {
      // 表格数据源(获取到的)
      type: Array,
      default: () => []
    },
    columns: {
      // 表格的字段展示
      type: Array,
      default: () => []
    },
    border: {
      //是否带有纵向边框
      type: Boolean,
      default: () => true
    },
    height: {
      //高度
      type: String,
      default: () => "100%"
    },
    loading: {
      //loading加载
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      tabData: [],
      begin: 0,
      end: 40
    };
  },
  methods: {
    loadMore() {
      this.end += 60;
      this.tabData = this.dataSource.slice(this.begin, this.end);
    }
  },
  watch: {
    dataSource: {
      //监听获取到的数据 取前N条显示
      handler(newVal, oldVal) {
        // console.log(newVal);
        this.tabData = newVal.slice(0, 1000);
      },
      deep: true //对象内部属性的监听，关键。
    }
  }
};
</script>

<style>
</style>
