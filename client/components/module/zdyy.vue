<template>


    <el-dialog title="诊断方案11" :visible.sync="zdfaModel" width="75%" :modal-append-to-body="false" class="div-dialog">
        <!-- cellspacing="0" cellpadding="0" 
    class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition"
    style="width: 100%;table-layout: fixed;background-color: #303a4c
    ;" -->
        <table>
            <thead class="tabThead">
                <!-- style="font-weight: bold;background-color: #384565;" -->
                <td style="width: 40px">报警类型</td>
                <td style="width: 100px">可能原因</td>
                <td>解决方案</td>
                <td style="width: 80px">图片</td>
                <!-- class="el-table_18_column_105  is-center   is-leaf" -->
            </thead>
            <tbody class="guideclass">
                <tr class="el-table__row" v-for="(help, index) in helpData">
                    <td style="width: 40px" v-if="index == 0" :rowspan="rowspan" class="el-table_1_column_1 is-center">
                        {{ help.GuideType }}
                    </td>
                    <td style="width: 100px">{{ help.ProblemDes }}</td>
                    <!-- class="el-table_1_column_1 is-left " -->
                    <td>{{ help.Solution }}</td>
                    <td style="width: 80px">
                        <span v-if=" help.ImgUrl!=null&&help.ImgUrl!=' ' " style="cursor: pointer;color:#4a92ff"
                            @click="selPic(help.ImgUrl)">
                            查看大图

                        </span>
                        <span v-else>
                            暂无图片
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-dialog>
</template>
<script>
    export default {
        props: {
            AlarmID: String,
            guideHelpModel: {
                //是否带有纵向边框
                type: Boolean,
                default: () => false
            },
        },
        data() {
            return {
                helpData: [],
                rowspan: 0,

            }
        },
        computed: {
            zdfaModel: {
                // getter
                get: function () {
                    return this.guideHelpModel;
                },
                // setter
                set: function (newVal) {
                    if (!newVal) {
                        this.$emit("update:guideHelpModel", false); //触发 input 事件，并传入新值
                    }
                }
            },
        },
        mounted() {
            this.helpAlarm(AlarmID)
         
        },
        methods: {
            // 查询解决方案
            helpAlarm() {
                let comdition = "`AlarmIDs` LIKE '%[" + this.AlarmID + "]%'";
                this.http
                    // .comMethod("*", "tbhelpguide", selwhere)
                    .get("/gettbhelpguide", {
                        comdition
                    })
                    .then((res) => {
                        // this.pictLoading = false;
                        if (res.length != 0) {
                            //表格数据
                            this.helpData = res;
                            this.rowspan = res.length;
                            console.log("诊断数据", this.helpData);
                        }
                    })
                    .catch((res) => {
                        // console.log(res);
                        setTimeout(() => {
                            // this.pictLoading = false;
                            // this.emptyText = "暂无数据";
                        }, 1000);
                    });
            },

        }
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

    .tabThead td {
        font-weight: bold;
        background-color: rgb(56, 69, 101);
        height: 48px;
        text-align: left;
        padding-left: 10px;
    }

    .guideclass td {
        background-color: #364055;
        color: seashell;
        border: 1px solid #303a4c;
        text-align: left;
        padding-left: 10px;
    }
</style>