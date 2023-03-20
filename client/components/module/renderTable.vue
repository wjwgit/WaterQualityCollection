<template>
    <div class="table">
        <el-table id="iTable" :show-summary="showsummary" :summary-method="getSummaries" :class="tableClass"
            :header-cell-style="{
        'background-color': '#384565',
      }" stripe v-loading.iTable="options.loading" :data="list" :stripe="options.stripe" :border="options.border"
            :highlight-current-row="options.highlightCurrentRow" :lazy="options.lazy" :height="tableHeight"
            :load='loadGetData' ref="mutipleTable" style='width:100%;' @row-click='clickRow' @row-dblclick='dblclickRow'
            @row-contextmenu='contextmenu' @header-click='headClick' @header-contextmenu='headcontextmenu'
            @select='select' @select-all='selectAll' @current-change='rowChange'
            @selection-change="handleSelectionChange">
            <!--region 数据列-->
            <template v-for="(column, index) in columns">

                <!--复选框（START）-->
                <el-table-column v-if="column.type=='selection'" type="selection" :label="column.title"
                    :width="column.width?column.width:60" :align="column.align?column.align:'center'">

                    <template slot="header" slot-scope="scope">
                        <span v-html="column.title"></span>

                    </template>
                </el-table-column>
                <!--复选框（END）-->

                <!--序号（START）-->
                <el-table-column v-else-if="column.type=='index'" type="index" :label="column.title?column.title:'序号'"
                    :width="column.width?column.width:80" :align="column.align?column.align:'center'">
                </el-table-column>
                <!--序号（END）-->

                <!-- slot 添加自定义配置项 -->
                <slot v-else-if="column.slot" :name="column.slot" :tit='index'></slot>

                <!-- 默认渲染列-渲染每一列的汉字 -->
                <template v-else>
                    <el-table-column :prop="column.prop" :label="column.title" v-if="column.show!=false"
                        :align="column.align" :width="column.width" :show-overflow-tooltip="true" :fixed="column.fixed">

                        <template slot="header" slot-scope="scope">
                            <!-- <span v-html="column.title"></span> -->
                            <span v-html="column.title"></span>

                        </template>

                        <template slot-scope="scope">
                            <!--正常渲染-->
                            <template v-if="!column.render">
                                <template v-if="column.formatter">
                                    <span v-html="column.formatter(scope.row, column)"></span>
                                </template>
                                <template v-else>
                                    <span>{{scope.row[column.prop]}}</span>
                                </template>
                            </template>
                            <!--render函数-->
                            <template v-else>
                                <expandDom :column="column" :row="scope.row" :render="column.render" :index="index">
                                </expandDom>
                            </template>
                        </template>


                    </el-table-column>
                </template>

            </template>
            <!--endregion-->

        </el-table>

    </div>
</template>
<script>
    export default {
        props: {
            showsummary: {
                type: Boolean,
                default: () => false
            },
            getSummaries: {
                default: () => { },
                type: Function
            },

            list: {
                type: Array,
                default: () => []
            }, // 数据列表
            columns: {
                type: Array,
                default: () => []
            }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
            options: {
                type: Object,
                default: function () {
                    return {
                        height: 400,//默认高度-为了表头固定
                        stripe: true, // 是否为斑马纹 table
                        highlightCurrentRow: false, // 是否要高亮当前行
                        border: false,//是否有纵向边框
                        lazy: false,//是否需要懒加载
                        loading: false,//是否需要等待效果
                    }
                }
            }, // table 表格的控制参数
            tableClass: {
                type: String,
                default: 'hxTable'
            },
        },
        components: {
            /**
             * render函数渲染组件
             * */
            expandDom: {
                functional: true,
                props: {
                    row: Object,
                    render: Function,
                    index: Number,
                    column: {
                        type: Object,
                        default: null
                    }
                },
                render: (h, ctx) => {
                    const params = {
                        row: ctx.props.row,
                        index: ctx.props.index
                    }
                    if (ctx.props.column) params.column = ctx.props.column
                    return ctx.props.render(h, params)
                }
            }
        },
        data() {
            return {
                multipleSelection: [], // 多行选中
                tableHeight: null
            }
        },
        mounted() {
            this.getHeight();

        },

        computed: {},
        created() {
            window.addEventListener('resize', this.getHeight)
        },
        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        },
        methods: {

            getHeight() {

                if (this.columns[0]["prop"] == "ID") {

                    this.tableHeight = window.innerHeight - 100 - 48 - 20
                } else {
                    this.tableHeight = window.innerHeight - 226 - 40 - 40
                }
            },
            /**
             * 列表懒加载，必须先开启懒加载
             * */
            loadGetData(row, treeNode, resolve) {//懒加载事件数据
                let data = {
                    'row': row,
                    'treeNode': treeNode,
                    'resolve': resolve,
                }
                this.$emit('loadGetData', data);
            },
            /**
             * 多行选中
             * */
            handleSelectionChange(val) {// 多行选中

                this.multipleSelection = val
                this.$emit('handleSelectionChange', val)
            },
            /**
             * 单击行事件
             * */
            clickRow(row, column, event) {
                let data = {
                    'row': row,
                    'column': column,
                    'event': event,
                }
                this.$emit('clickRow', data);
            },
            /**
             * 双击行事件
             * */
            dblclickRow(row, column, event) {
                let data = {
                    'row': row,
                    'column': column,
                    'event': event,
                }
                this.$emit('dblclickRow', data);
            },
            /**
             * 右键行事件-没去掉页面默认的
             * */
            contextmenu(row, column, event) {
                let data = {
                    'row': row,
                    'column': column,
                    'event': event,
                }
                this.$emit('contextmenu', data);
            },
            /**
             * 头部列点击事件
             * */
            headClick(column, event) {
                let data = {
                    'column': column,
                    'event': event,
                }
                this.$emit('headClick', data);
            },
            /**
             * 头部列右键点击事件
             * */
            headcontextmenu(column, event) {
                let data = {
                    'column': column,
                    'event': event,
                }
                this.$emit('headcontextmenu', data);
            },
            /**
             * 当前行发生改变时的事件
             * */
            rowChange(currentRow, oldCurrentRow) {
                let data = {
                    'currentRow': currentRow,
                    'oldCurrentRow': oldCurrentRow,
                }
                this.$emit('rowChange', data);
            },
            /**
             * 用户手动勾选复选框触发
             * */
            select(sel, row) {
                let data = {
                    'sel': sel,
                    'row': row,
                }
                this.$emit('select', data)
            },
            /**
             * 用户点击全选触发
             * */
            selectAll(sel) {
                let data = {
                    'sel': sel,
                }
                this.$emit('selectAll', data)
            }

        }
    }
</script>

<style>
    /* 表格行 */
    .el-table th,
    .el-table tr {
        color: #fff;
        font-size: 14px;
        background-color: #303a4c;
    }
</style>