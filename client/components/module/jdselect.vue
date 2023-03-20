<template>

    <div>
        <!--背景-点击可关闭卡片-->
        <mark class="bgcard" v-if="showSeason" @click.stop="showSeason=false">
        </mark>
        <label class="rwlx">时间</label>

        <el-input placeholder="请选择季度" v-model="showvValue" size="small" style="width:127px; " @focus="showSeason=true">
            <i slot="prefix" class="el-input_icon el-icon-date"></i>
        </el-input>
        <el-card class="box-card " style="width:322px;padding: 0 3px 20px;margin-top:10px;position:fixed;z-index:9999 "
            v-if="showSeason ">
            <!-- clearfix -->
            <div slot="header" class="clearfix" style="text-align:center;padding:0">
                <el-button type="button" aria-label="前一年" size="small" style='border:none'
                    class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="prev">
                </el-button>
                <span role="button" class="el-date-picker_header-label">{{year}}年</span>
                <el-button type="button" aria-label="后一年" @click="next" size="small" style='border:none'
                    class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right">
                </el-button>
            </div>
            <div class="text item" style="text-align : center ; ">
                <el-button type="text" size="medium" style="width : 40%; color: #606266;float:left ; "
                    @click="selectseason (1)">第一季度</el-button>

                <el-button type="text" size="medium" style="float: right;width: 40%;color: #606266; "
                    @click="selectseason (2)">第二季度</el-button>
            </div>
            <div class="text item" style="text-align : center; ">
                <el-button type="text" size="medium" style="width : 40%;color: #606266; float:left ; "
                    @click="selectseason(3)">第三季度</el-button>
                <el-button type="text" size="medium" style="float: right; width : 40%;color: #606266; "
                    @click="selectseason (4)">第四季度</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    import moment from "moment";

    /**
    * @file:View组件季节选释控件* @date: 2021-03-22
    * @description: UI组件可选择季节*/
    export default {
        props: {
            /**
            *@默认厨值
            *date类型，默认值传的是时间2021-03-22*quarter类型，是季度2021-01
            **/
            defaultvalue: { type: String, default: '' },
            /**
            *@默认厨值癸型
            *date类型，默认值传的是时间2021-03-22*quarter英型，是季度2021-01
            **/
            defaultType: { type: String, default: 'date' },
            
        },
        data() {
            return {
                showSeason: false,
                year: moment(new Date()).format("YYYY"), //默认当前年
                month: new Date().getMonth() + 1,// 默认当前月
                showvValue: ''//页面上input的内容
            }
        },
        created() {
            //l如巢有默认值，直接用，没有歉认值，把当前日期作为默认值
            
            if (this.defaultvalue) {
                this.changeDefaultval()
            } else {
                this.defaultvalue = this.year + '-' + this.month 
                this.changeDefaultval()
            }
        },
        watch: {
            defaultvalue(value) {
                this.changeDefaultval()
            }
        },
        methods: {
            /** 冰处理鬣认值
                *@params value ==默认值
                *@return页面input内容回垓歉认值**/
            changeDefaultval() {
                
                let arr = this.defaultvalue.split('-')
                this.year = arr[0]
                let quarter = '' //季度
                if (this.defaultType === 'quarter') {
                    quarter = arr[1]
                    this.showvValue = `${this.year}年${quarter}季度`
                } else if (this.defaultType === 'date') {
                    let month = +arr[1]
                    if (month >= 1 && month <= 3) {
                        this.showvValue = `${this.year}年1季度`
                        this.selectseason(1)
                    } else if (month >= 4 && month <= 6) {
                         this.showvValue = `${this.year}年2季度` 
                        this.selectseason(2)

                        }
                    else if (month >= 7 && month <= 9) {
                         this.showvValue = `${this.year}年3季度`
                         this.selectseason(3)
                        }
                    else if (month >= 10 && month <= 12) {
                        this.showvValue = `${this.year}年4季度`
                        this.selectseason(4)

                    }
                }
            },
            prev() {
                this.year = +this.year - 1
            },
            next() {
                this.year = +this.year + 1
            },
            selectseason(quarter) {

                let result = {
                    date: `${this.year}年${quarter}季度`, year: this.year,
                    quarter: quarter
                }
                //发送事件给父元紊
                this.$emit('getTimeVals', result)
                this.showSeason = false
                this.showvValue = `${this.year}年${quarter}季度`
            }
        }
    }
</script>
<style scoped>
    .bgcard {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0);
        z-index: 999;
    }
</style>