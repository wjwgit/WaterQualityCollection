<template>
    <div>
        <div style="margin: 0 20px">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="block">
                        <el-row>
                            <el-col :sm="12" :md="12" :lg="9" :xl="6">
                                <el-date-picker v-model="defaultDate" type="month" :clearable="false"
                                    value-format="yyyy-MM-dd" @change="changeTimes" placeholder="点击选择查询日期">
                                </el-date-picker>

                                <!-- value-format="yyyy-MM-dd HH" -->


                            </el-col>
                        </el-row>
                        <!-- <el-button type="primary" size="small" style="float: right;">导出</el-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="converBox" >
            
            <FullCalendar ref="fullCalendar" :options="calendarOptions" />
        </div>
        <el-dialog title="运维项目" :visible.sync="yunWeiModel" width="75%" :modal-append-to-body='false'
            class="div-dialog">
            <!-- cellspacing="0" cellpadding="0" 
            class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition"
            style="width: 100%;table-layout: fixed;background-color: #303a4c
            ;" -->
            <table>
                <thead class="tabThead">
                    <!-- style="font-weight: bold;background-color: #384565;" -->
                    <th style="width: 100px;">项目</th>
                    <th>内容</th>
                    <th style="width: 40px;">是否完成</th>
                    <th style="width: 100px;">备注</th>

                    <!-- class="el-table_18_column_105  is-center   is-leaf" -->
                </thead>
                <tbody class="guideclass">

                    <tr class="el-table__row" v-for="( devops, index) in devopsData">
                        <td style="width: 100px;"   :style=" index%2 == 0 ?'background-color:#35415a':'background-color:#293244'" >
                            {{devops.Classify}}</td>
                        <td :style=" index%2 == 0 ?'background-color:#35415a':'background-color:#293244'">{{devops.Title}}</td>

                        <td style="width: 40px;" :style=" index%2 == 0 ?'background-color:#35415a':'background-color:#293244'">{{devops.Status}}</td>
                        <td :style=" index%2 == 0 ?'background-color:#35415a':'background-color:#293244'">{{devops.remake}}</td>

                    </tr>
                </tbody>
            </table>

        </el-dialog>
    </div>

</template>
<script>
    import '@fullcalendar/core/vdom' // solves problem with Vite
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import listPlugin from '@fullcalendar/list'
    import moment from "moment";
    import resourceTimelinePlugin from '@fullcalendar/resource-timeline'

    // import "@fullcalendar/core/main.css";
    // import "@fullcalendar/daygrid/main.css";
    // import "@fullcalendar/timegrid/main.css";

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data() {
            return {
                yunWeiModel: false, //模态
                devopsData: [],//运维项目
                defaultDate: moment().format('YYYY-MM'),
                calendarOptions: {
                    // plugins: [dayGridPlugin, interactionPlugin],
                    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, resourceTimelinePlugin],
                    initialView: 'dayGridMonth',
                    dateClick: this.handleDateClick, //显示日程详情
                    // eventClick: "handleEventClick",
                    events: [
                        {						// 展示数据
                            "title": "开会",
                            "start": "2021-11-01"
                        },
                        {
                            "groupId": "999",
                            "title": "上班",
                            "start": "2021-11-04T06:00:00+00:00"
                        },
                        {
                            "groupId": "999",
                            "title": "吃饭",
                            "start": "2021-11-04T12:00:00+00:00"
                        },
                        {

                            "title": "跳转百度",
                            "start": "2021-11-25",

                        }

                    ],
                    height: null,
                    locale: "zh-cn",
                    customButtons: {
                        GridYear: {
                            text: '年',
                            click: function () {
                                alert('点击了自定义按钮!');
                            }
                        }
                    },

                    viewDidMount: (info) => {
                        
                        console.log('viewDidMount')
                    },
                    headerToolbar: { // 日历头部按钮位置
                        left: '',
                        center: 'title',
                        right: ""
                        // right: 'dayGridMonth,GridYear,timeGridFourDay'
                    },
                    // 上一月和下一月
                    customButtons: {
                        prev: {
                            text: "PREV",
                            click: this.handlePreBtnclick,
                        },
                        next: { //this overrides the next button
                            text: "PREV",
                            click: this.handleNextBtnclick,
                        },
                        // prevYear: {
                        //     text: "prevYear",
                        //     click: this.handlePreYearBtnclick,
                        // },
                        // nextYear: {
                        //     text: "nextYear",
                        //     click: this.handleNextYearBtnclick,
                        // }
                    },

                    buttonText: {
                        today: '今天',
                        month: '月',
                        year: '年',
                        FourDay: '4 day',
                    },
                    select: this.handleDateselect,

                    handlewindowResize: true,  //是否随浏览器窗口大小变化而自动变化。

                    datesSet: function (val) {
                        //prev上一月, next下一月等事件时调用

                        var sTime = moment(val.start).format('YYYY-MM-DD HH:mm:ss')
                        var eTime = moment(val.end).format('YYYY-MM-DD HH:mm:ss')
                        
                        let NowMonth = val.view["title"].substring(0, 7)
                        this.defaultDate = moment(NowMonth).format('YYYY-MM');

                    },

                    handleDateselect(selectInfo) {
                        
                        let title = prompt('Please enter a new title for your event ')
                        let calendarApi = selectInfo.view.calendar
                        calendarApi.unselect()
                        if (title) {
                            calendarApi.addEvent({
                                id: createEventId(), title,
                                start: selectInfo.startstr, end: selectInfo.endStr, allDay: selectInfo.allDay,
                            })
                        }

                    },
                    dayClick: function (date, jsEvent, view) {
                        //点击空白日期调用
                        
                    },
                    eventClick: this.handleDateInfo,
                    //显示日程详情  function (calEvent, jsEvent, view) {
                    //点击已有数据的日期调用
                    //     
                    //     this.yunWeiModel = true;
                    //     calEvent["event"].start

                    //     calEvent["event"].title

                    // },
                    views: {
                        dayGridMonth: { // name of view
                            titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
                            // other view-specific options here
                        },
                        GridYear: {
                            titleFormat: { year: 'numeric', month: '2-digit' }
                        },
                        timeGridFourDay: {
                            type: 'custom',
                            duration: { month: 12 },
                            buttonText: '年'
                        }
                    }

                },

            }
        },
        mounted() {
            this.inquire();
            this.getHeight();
        },
        created() {
            window.addEventListener('resize', this.getHeight)
        },
        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        },
        methods: {
            getHeight() {
                this.calendarOptions.height = window.innerHeight - 196
            },
            // 切换时间
            changeTimes(val) {
                
                let time = new Date(val);
                let calendarApi = this.$refs.fullCalendar.getApi().gotoDate(time);

                
                this.defaultDate = moment(time).format('YYYY-MM');;

                this.inquire();
                // this.$forceUpdate();
            },
            //   点击
            handleDateClick: function (calEvent, jsEvent, view) {
                // alert('date click! ' + arg.dateStr)
                
                // this.$message.info(arg.dateStr);

            },
            // 查询单个运维项详情
            handleDateInfo: function (calEvent, jsEvent, view) {
                //点击已有数据的日期调用
                
                this.yunWeiModel = true;
                // calEvent["event"].start

                // calEvent["event"].title
                let DevOpsNum = calEvent["event"].extendedProps.devops
                let condition = " DevOpsNum= " + DevOpsNum + " ORDER BY  a.`ID` ";
                let selquery = 'a.*,b.Classify,b.Title'
                let tabName = "TbDevOpsLogDetail as a left join TbDevOpsItem as b on a.ItemID=b.ID"
                this.http
                    .comMethod(selquery, tabName, condition)
                    .then((res) => {

                        if (res.length != 0) {
                            res.forEach((r) => {
                                
                                r.Status = r.Status == 0 ? '×' : '√';

                            });
                            
                            this.devopsData = res
                        } else {
                            // this.emptyText = "暂无数据"

                        }
                    })
                    .catch((res) => {
                        console.log(res);

                    });

            },
            //   下月
            handleNextBtnclick(val) {
                
                let calendarApi = this.$refs.fullCalendar.getApi()
                calendarApi.next(); //一旦你有//调用next方法
                // let test = calendarApi.getcurrentData().viewTitle; 
                // console.log(test);
                this.inquire();

            },
            //上月
            handlePreBtnclick(val) {
                
                let calendarApi = this.$refs.fullCalendar.getApi()
                calendarApi.prev();
                // let test = calendarApi.getcurrentData().viewTitle;
                //  console.log(test);
                this.inquire();
            },

            handleEventClick: function (arg) {
                // alert('date click! ' + arg.dateStr)
                
                // this.$message.info(arg.dateStr);

            },
            // 查询月度运维记录
            inquire() {
                
                let condition = "DataTime like '%" + this.defaultDate + "%' "
                this.calendarOptions.events = []
                this.http
                    .comMethod("*", "tbdevopslog", condition)
                    .then((res) => {

                        if (res.length != 0) {
                            res.forEach((r) => {
                                
                                // r.DataTime = this.$options.filters.dateFormat(r.DataTime);
                                r["TaskID"] = this.fundevopInfo(r["TaskID"]);
                                let obj = {						// 展示数据
                                    "title": r["TaskID"],
                                    "start": r.DataTime,
                                    "devops": r.DevOpsNum
                                };
                                this.calendarOptions.events.push(obj);
                            });

                        } else {
                            // this.emptyText = "暂无数据"

                        }
                    })
                    .catch((res) => {
                        console.log(res);

                    });
            },
            // 运维
            fundevopInfo(val) {
                if (val == "1") {
                    return "周运维";
                } else if (val == "2") {
                    return "月运维";
                } else if (val == "3") {
                    return "季度运维";
                } else if (val == "4") {
                    return "其他运维";
                }
            }
        }
    }
</script>
<style scoped>
    .converBox {
        margin: 0 20px;
        background-color: #303a4c;
        /* position:  absolute; */
    }

    .div-dialog table {
        width: 100%;
        text-align: left;
        color: #cccccc;
        border-collapse: collapse;
    }

    .tabThead th {
        font-weight: bold;
        background-color: rgb(56, 69, 101);
        color: #fff;
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
        padding-top: 2px;
        padding-bottom: 2px;
    }

    .el-input__inner {
        color: #fff;

    }

    .fc .fc-col-header-cell-cushion {
        color: #fff;
    }

    .fc .fc-toolbar-title {
        color: #ccc;

    }

    /* a {
        color: #fff;
    } */

    .fc .fc-daygrid-event-harness {
        cursor: pointer;
    }
</style>