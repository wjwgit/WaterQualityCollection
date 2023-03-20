//总磷：w21011、总氮：w21001、氨氮：w21003、高锰酸盐指数：w01019、化学需氧量：w01018
//水温：w01010、pH 值：w01001、溶解氧：w01009、浑浊度：w01003、电导率：w01014
// const pollutant= require('../../../server/pollutant.json');
// 新增因子：实时数据，历史数据，因子查询，参数设置-仪表参数设置，周质控，系统控制，设备管理
// 新增因子需要修改的页面：参数设置-仪表参数设置
//流程图对象
var FlowChart = {
    BaseMap: {
        x: 0,
        y: 0,
        w: 1166,//1282
        h: 598,
        name: "底图",
        visible: true,
        zindex: 0,
        img: `lct/BaseMap_22_1.jpg`,//lct/BaseMap_22_1.jpg
        isLoad: false
    },
    // 浮船
    BaseMap_fuchuan: {
        x: 0,
        y: 0,
        w: 1166,//1282
        h: 598,
        name: "浮船底图",
        visible: true,
        zindex: 0,
        img: `FuChuan_lct/BaseMap_fc.jpg`,//lct/BaseMap_22_1.jpg
        isLoad: false
    },
    sv1_fuchuan: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV1",
        visible: false,
        zindex: 1,
        img: "FuChuan_lct/sv1.png"
    },
    SV2_fuchuan: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV2",
        visible: false,
        zindex: 1,
        img: "FuChuan_lct/sv2.png"
    },
    SV3_fuchuan: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV3",
        visible: false,
        zindex: 1,
        img: "FuChuan_lct/sv3.png"
    },
    SV4_fuchuan: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV4",
        visible: false,
        zindex: 1,
        img: "FuChuan_lct/sv4.png"
    },
    SV5_fuchuan: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV5",
        visible: false,
        zindex: 1,
        img: "FuChuan_lct/sv5.png"
    },
    CDC_FC: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "沉淀池",
        visible: false,
        zindex: 98,
        img: "FuChuan_lct/CDCBLUE.png"
    },
    CDCdi_FC: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "沉淀池低",
        visible: false,
        zindex: 98,
        img: "FuChuan_lct/CDCDI.png"
    },
    CDCgao_FC: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "沉淀池高",
        visible: false,
        zindex: 98,
        img: "FuChuan_lct/CDCGAO.png"
    },
    M1_FC: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M1",
        visible: true,
        zindex: 999,
        // img: "lct/M1_1.png",
        img: "FuChuan_lct/M1.gif",
    },
    M2_FC: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M2",
        visible: false,
        zindex: 999,
        // img: "lct/M2_1.png",
        img: "FuChuan_lct/M2.gif",
        timer: null
    },
    M1: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M1",
        visible: false,
        zindex: 22,
        // img: "lct/M1_1.png",
        img: "lct/m1.gif",
        timer: null
    },
    M2: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M2",
        visible: false,
        zindex: 22,
        // img: "lct/M2_1.png",
        img: "lct/m2.gif",
        timer: null
    },
    M3: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M3",
        visible: false,
        zindex: 22,
        // img: "lct/M3_1.png",
        img: "lct/m3.gif",
        timer: null
    },
    M4: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M4",
        visible: false,
        zindex: 1,
        img: "lct/M4_1.gif",
        timer: null
    },
    M6: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "M6",
        visible: false,
        zindex: 1,
        // img: "lct/M6_1.png",
        img: "lct/m6.gif",
        timer: null
    },
    SV1: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV1",
        visible: false,
        zindex: 1,
        img: "lct/SV1.png"
    },
    SV2: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV2",
        visible: false,
        zindex: 1,
        img: "lct/SV2.png"
    },
    SV3: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV3",
        visible: false,
        zindex: 1,
        img: "lct/SV3.png"
    },
    SV4: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV4",
        visible: false,
        zindex: 1,
        img: "lct/SV4.png"
    },
    SV5: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV5",
        visible: false,
        zindex: 1,
        img: "lct/SV5.png"
    },
    SV6: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV6",
        visible: false,
        zindex: 1,
        img: "lct/SV6.png"
    },
    SV7: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV7",
        visible: false,
        zindex: 1,
        img: "lct/SV7.png"
    },
    SV8: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV8",
        visible: false,
        zindex: 1,
        img: "lct/SV8.png"
    },
    SV9: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV9",
        visible: false,
        zindex: 1,
        img: "lct/SV9.png"
    },
    SV10: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV10",
        visible: false,
        zindex: 1,
        img: "lct/SV10.png"
    },
    SV11: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV11",
        visible: false,
        zindex: 1,
        img: "lct/SV11.png"
    },
    SV12: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV12",
        visible: false,
        zindex: 1,
        img: "lct/SV12.png"
    },
    SV13: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV13",
        visible: false,
        zindex: 1,
        img: "lct/SV13_4_21.png"
    },
    SV14: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV14",
        visible: false,
        zindex: 1,
        img: "lct/SV14.png"
    },
    SV15: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "SV15",
        visible: false,
        zindex: 1,
        img: "lct/SV15_4_21.png"
    },
    CDC: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "沉淀池",
        visible: false,
        zindex: 98,
        img: "lct/CDC.png"
    },
    CDCAlarm: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "沉淀池",
        visible: false,
        zindex: 99,
        img: "lct/CDCAlarm.png"
    },
    WuCan: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "五参数池",
        visible: false,
        zindex: 0,
        img: "lct/WuCan.png"
    },
    WuCanAlarm: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "五参数池",
        visible: false,
        zindex: 0,
        img: "lct/WuCanAlarm.png"
    },
    CaiYangQi_22: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "采样器",
        visible: false,
        zindex: 0,
        img: "lct/CaiYangQi_22.png"
    },
    YB_1_22: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "仪表一",
        visible: false,
        zindex: 0,
        img: "lct/YB_1_22_Empt.png"
    },
    YB_2_22: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "仪表二",
        visible: false,
        zindex: 0,
        img: "lct/YB_2_22_Empt.png"
    },
    YB_3_22: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "仪表三",
        visible: false,
        zindex: 0,
        img: "lct/YB_3_22_Empt.png"
    },
    YB_4_22: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "仪表四",
        visible: false,
        zindex: 0,
        img: "lct/YB_4_22_Empt.png"
    },
    YB_5_22: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "仪表五",
        visible: false,
        zindex: 0,
        img: "lct/YB_5_22_Empt.png"
    },
    CYB_water_1: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "采样杯（水/报警）",
        visible: false,
        zindex: 1,
        img: "lct/CYB_water_1.png"
    },
    CYB_water_2: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "采样杯（水/报警）",
        visible: false,
        zindex: 1,
        img: "lct/CYB_water_2.png"
    },
    CYB_water_3: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "采样杯（水/报警）",
        visible: false,
        zindex: 1,
        img: "lct/CYB_water_3.png"
    },
    CYB_water_4: {
        x: 0,
        y: 0,
        w: 1166,
        h: 598,
        name: "采样杯（水/报警）",
        visible: false,
        zindex: 1,
        img: "lct/CYB_water_4.png"
    },
    CYB_water_5: {
        x: 0,
        y: 0,
        w: 1282,
        h: 598,
        name: "采样杯（水/报警）",
        visible: false,
        zindex: 1,
        img: "lct/CYB_water_5.png"
    },
    // 天水超级站
    BaseMap_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,//1282
        h: 608,
        name: "天水底图",
        visible: true,
        zindex: 0,
        img: `TSCJZ_lct/lct_TSCJZ.jpg`,//lct/BaseMap_22_1.jpg
        isLoad: false
    },
    M1_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "M1",//M1_TSCJZ
        visible: false,
        zindex: 1,
        img: "TSCJZ_lct/m1.gif",
    },
    M2_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "M2",//M1_TSCJZ
        visible: false,
        zindex: 1,
        img: "TSCJZ_lct/m2.gif",
    },
    M3_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "M3",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/m3.gif",
    },
    M6_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "M3",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/m6.gif",
    },
    sv1_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv1",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv1.png",
    },
    sv2_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv2",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv2.png",
    },
    sv3_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv3",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv3.png",
    },
    sv4_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv4",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv4.png",
    },
    sv5_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv5",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv5.png",
    },
    sv19_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv19",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv19.png",
    },
    sv20_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv20",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv20.png",
    },
    sv21_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv21",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv21.png",
    },
    sv22_TSCJZ: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv22",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/sv22.png",
    },
    CYB_water_6: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "swdx",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/swdx.png",
    },
    CYB_water_7: {
        x: 0,
        y: 0,
        w: 933,
        h: 608,
        name: "sv22",//M1_TSCJZ
        visible: false,
        zindex: 0,
        img: "TSCJZ_lct/voc.png",
    },
    // 生物毒性
    BaseMap_SWDX: {
        x: 0,
        y: 0,
        w: 933,//1282
        h: 608,
        name: "生物毒性底图",
        visible: true,
        zindex: 0,
        img: `TSCJZ_lct/lct_SWDX.jpg`,//lct/BaseMap_22_1.jpg
        isLoad: false
    },

}
//全局变量
var SDL_Global = {
    SoftType: '',
    MainMeterLength: 4,
    YuChuLiFangShi: {
        Name: '方式一',
        MinVal: 0,
        MaxVal: 200,
    },
    TP: {
        ID: "TP",
        Code: "w21011",//因子编码
        Name: "总磷",
        mlName: "TP",
        isAlone: true,//单因子
        IsNormal: true,//常规仪表
        Series: '',
        ComStatus: 0,
        ComStatusText: '通讯断开',
        LastTestTime: "--",//末次测量时间
        LastTestData: '--',//末次测量数据
        LastTestDataFlag: '--',//末次测量数据标识
        LastTestFlagText: '--',//末次测量标识文本 
        Unit: "mg/L",
        Decimal: 2,
        SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59
        MeterStatus: -1,//仪表状态 0：空闲、1：水样……
        MeterStatusText: '未知',
        Alarm: 0,//报警
        AlarmText: '--',
        Fault: 0,//故障
        FaultText: '--',
        SubFlow: "--",
        SubFlowExt: "--",//子流程
        SubFlowText: "--",
        JingDu: "--",//测量精度
        XiaoJieWenDu: "--",//消解温度
        XiaoJieShiJian: "--",//消解时长
        LiangCheng: "--",//量程上限
        XieLv: "--",//曲线斜率k
        JieJu: "--",//曲线截距b
        XianXingXiShu: "--",//线性系数
        XinHaoZhi: "--", //旧：测量滴定值 旧：信号值
        JiaoZhunShiJian: "--",//新：标定日期 旧：校准时间
        BiaoYangShiJian: "--",//新：标样校准时间  旧：标样时间
        JianChuXian: "--",//检出限
        MoreParam: {//更多参数
            BiaoYangCanKaoZhi: 0,//标样参考值
            LiangChengXiaXian: "--",//量程下限

            ShuiYangShuJuShiJian: '--',//水样测试数据时间
            ShuiYangShiCeZhi: 0,//水样实测值
            ShuiYangShuJuFlag: "--",//水样数据标识
            //标样核查
            BiaoYangShuJuShiJian: '--',
            BiaoYangShiCeZhi: 0,
            BiaoYangShuJuFlag: "--",
            //空白测试
            KongBaiShuJuShiJian: '--',
            KongBaiShiCeZhi: 0,
            KongBaiShuJuFlag: "--",
            //零点核查
            LingDianHeChaShuJuShiJian: '--',
            LingDianHeChaShiCeZhi: 0,
            LingDianHeChaShuJuFlag: "--",
            //跨度核查
            KuaDuHeChaShuJuShiJian: '--',
            KuaDuHeChaShiCeZhi: 0,
            KuaDuHeChaShuJuFlag: "--",
            //加标回收
            JiaBiaoHuiShouShuJuShiJian: '--',
            JiaBiaoHuiShouShiCeZhi: 0,
            JiaBiaoHuiShouShuJuFlag: "--",
            //平行样
            PingXingYangShuJuShiJian: '--',
            PingXingYangShiCeZhi: 0,
            PingXingYangShuJuFlag: "--",

            //标液浓度、标液测量过程值
            BiaoYeYiNongDu: 0,
            BiaoYeYiCeLiangGuoChengZhi: 0,

            BiaoYeErNongDu: 0,
            BiaoYeErCeLiangGuoChengZhi: 0,

            BiaoYeSanNongDu: 0,
            BiaoYeSanCeLiangGuoChengZhi: 0,

            BiaoYeSiNongDu: 0,
            BiaoYeSiCeLiangGuoChengZhi: 0,

            BiaoYeWuNongDu: 0,
            BiaoYeWuCeLiangGuoChengZhi: 0,

            CeLiangMoShi: -1,//测量模式；1 连续模式、2 周期模式、3 定点模式、4 受控模式、5 手动模式
            CeLiangMoShiText: '未知',
            SoftwareVersion: 1.0,//软件版本
            CeLiangJianGe: 0,//分钟，测量间隔
            LingDianHeChaJianGe: 0,//分钟，零点核查间隔
            KuaDuHeChaJianGe: 0,//分钟，跨度核查间隔
            BiaoYangHeChaJianGe: 0,//分钟，标样核查间隔
            ShiJiYuLiang: 0,//试剂余量
            // CeLiangDiDingZhi: 0,//测量滴定值,过程测量值，信号值
            KongBaiJiaoZhunShiJian: '--',//空白校准时间
            JiaoZhunXiShu: 0,//校准系数
            JiaoZhunYinZi: 0,//校准系数
            SheBeiXuLieHao: '0000-0000',//设备序列号
            ErCiDuoXiangXiShu: 0,//二次多项系数
            KongZhiMingLing: 0,//控制控制命令
            CanShu: 0,//参数

            XiaoJieChiShiShiWenDu: 0,//消解池实时温度
            HunYangChiShiShiWenDu: 0,//混样池实时温度
            KongBaiBiaoDingGuoChengZhi: 0,//空白标定过程值
            KongBaiJiaoZhunGuoChengZhi: 0,//空白校准过程值
            BiaoYangJiaoZhunCanKaoZhi: 0,//标样校准参考值
            BiaoYangJiaoZhunGuoChengZhi: 0,//标样校准过程值
            XianSeWenDu: 0,//显色温度
            XianSeShiJian: 0,//显色时间
            BanKaWenDu: 0,//板卡温度
        },

        isSendLoading: false,
        savebtn: true,
        lcbjDiv: true,
        sjylDiv: false,
        byndDiv: false,
        ZhiKongYuJingYuZhi: '',

        JB_Status: null,
        JB_StatusText: "通讯断开",
        JB_SubStatus: '--',//子状态  默认 0
        JB_Fault: 0,//报警 默认0
        JB_FaultText: '无告警',
        JB_Timer1: "",
        JB_Timer2: "",
        JB_TimerSpance: "--",//内部脉冲时间间隔
        JB_Pulse1: '--',
        JB_Pulse2: "",
        JB_Low: "",
        JB_High: "",

        JB_CB: '--',
        JB_V3: '--',// v3
        JB_V1: '--', //v1
        JB_VB: '--', //v
        JB_DingRongTiJi: "--", //定容体积
        JB_HuiShouLv: "--",

        KuaDuZhi: "",
        BiaoYangHeChaNongDu: "",
        LiangChengPiaoYiNongDu: "",
        LingDianPiaoYiNongDu: "",
        ShuiYangCeShiNongDu: "",
        KongBaiCeShiNongDu: "",
        GaoJingZiDongFuWei: false,
        ShiJiYuLiang: 0,
        ShiJiDaoQiShiJiian: '2021-10-20',//试剂到期时间
        ShiJiZongLiang: 0,
        ShiJiXiaXian: 0,
        RiZhiKongStatus: true,//true:质控中；false：结束
        RiZhiKongIsHeGe: false,//true:合格；false:不合格
        //试剂参数
        R1ShiJiZongLiang: 500,//R1试剂总量
        R2ShiJiZongLiang: 500,
        R3ShiJiZongLiang: 500,
        R4ShiJiZongLiang: 500,
        R5ShiJiZongLiang: 500,

        R1ShiJiYuLiang: 200,
        R2ShiJiYuLiang: 0,
        R3ShiJiYuLiang: 0,
        R4ShiJiYuLiang: 0,
        R5ShiJiYuLiang: 0,

        KongBaiShiJiZongLiang: 0,//空白试剂总量
        BiaoYeShiJiZongLiang: 0,
        LingHeShiJiZongLiang: 0,
        KuaHeShiJiZongLiang: 0,
        BiaoHeShiJiZongLiang: 0,
        KongBaiShiJiYuLiang: 0,
        BiaoYeShiJiYuLiang: 0,
        LingHeShiJiYuLiang: 0,
        KuaHeShiJiYuLiang: 0,
        BiaoHeShiJiYuLiang: 0,

        DiShiJiYuJingYuZhi: 30,//低试剂预警阈值
        QueShiJiGaoJingYuZhi: 15,//低试剂告警阈值

    },
    TN: {
        ID: "TN",
        Code: "w21001",//因子编码
        Nmae: "总氮",
        mlName: "TN",
        IsNormal: true,//常规仪表
        isAlone: true,//单因子
        ComStatus: 0,
        ComStatusText: '通讯断开',
        LastTestTime: "--",//末次测量时间
        LastTestData: '--',//末次测量数据
        LastTestDataFlag: '--',//末次测量数据标识
        Series: '',

        LastTestFlagText: '--',//末次测量标识文本 
        Unit: "mg/L",
        Decimal: 2,
        SysTime: "--",//仪表时间 2020-11-26 17:04:59
        MeterStatus: -1,
        MeterStatusText: '未知',
        Alarm: 0,
        AlarmText: '--',
        Fault: 0,
        FaultText: '--',
        SubFlow: "--",
        SubFlowExt: "--",
        SubFlowText: "--",
        JingDu: "--",
        XiaoJieWenDu: "--",
        XiaoJieShiJian: "--",
        LiangCheng: "--",
        XieLv: "--",
        JieJu: "--",
        XianXingXiShu: "--",
        XinHaoZhi: "--",
        JiaoZhunShiJian: "--",
        BiaoYangShiJian: "--",
        JianChuXian: "--",
        MoreParam: {//更多参数
            BiaoYangCanKaoZhi: 0,//标样参考值
            LiangChengXiaXian: "--",//量程下限

            ShuiYangShuJuShiJian: '--',//水样测试数据时间
            ShuiYangShiCeZhi: 0,//水样实测值
            ShuiYangShuJuFlag: "--",//水样数据标识
            //标样核查
            BiaoYangShuJuShiJian: '--',
            BiaoYangShiCeZhi: 0,
            BiaoYangShuJuFlag: "--",
            //空白测试
            KongBaiShuJuShiJian: '--',
            KongBaiShiCeZhi: 0,
            KongBaiShuJuFlag: "--",
            //零点核查
            LingDianHeChaShuJuShiJian: '--',
            LingDianHeChaShiCeZhi: 0,
            LingDianHeChaShuJuFlag: "--",
            //跨度核查
            KuaDuHeChaShuJuShiJian: '--',
            KuaDuHeChaShiCeZhi: 0,
            KuaDuHeChaShuJuFlag: "--",
            //加标回收
            JiaBiaoHuiShouShuJuShiJian: '--',
            JiaBiaoHuiShouShiCeZhi: 0,
            JiaBiaoHuiShouShuJuFlag: "--",
            //平行样
            PingXingYangShuJuShiJian: '--',
            PingXingYangShiCeZhi: 0,
            PingXingYangShuJuFlag: "--",

            //标液浓度、标液测量过程值
            BiaoYeYiNongDu: 0,
            BiaoYeYiCeLiangGuoChengZhi: 0,

            BiaoYeErNongDu: 0,
            BiaoYeErCeLiangGuoChengZhi: 0,

            BiaoYeSanNongDu: 0,
            BiaoYeSanCeLiangGuoChengZhi: 0,

            BiaoYeSiNongDu: 0,
            BiaoYeSiCeLiangGuoChengZhi: 0,

            BiaoYeWuNongDu: 0,
            BiaoYeWuCeLiangGuoChengZhi: 0,

            CeLiangMoShi: -1,//测量模式；1 连续模式、2 周期模式、3 定点模式、4 受控模式、5 手动模式
            CeLiangMoShiText: '未知',
            SoftwareVersion: 1.0,//软件版本
            CeLiangJianGe: 0,//分钟，测量间隔
            LingDianHeChaJianGe: 0,//分钟，零点核查间隔
            KuaDuHeChaJianGe: 0,//分钟，跨度核查间隔
            BiaoYangHeChaJianGe: 0,//分钟，标样核查间隔
            ShiJiYuLiang: 0,//试剂余量

            // CeLiangDiDingZhi: 0,//测量滴定值,过程测量值，信号值
            KongBaiJiaoZhunShiJian: '--',//空白校准时间
            JiaoZhunXiShu: 0,//校准系数
            JiaoZhunYinZi: 0,
            SheBeiXuLieHao: '0000-0000',//设备序列号
            ErCiDuoXiangXiShu: 0,//二次多项系数
            KongZhiMingLing: 0,//控制控制命令
            CanShu: 0,//参数

            XiaoJieChiShiShiWenDu: 0,//消解池实时温度
            HunYangChiShiShiWenDu: 0,//混样池实时温度
            KongBaiBiaoDingGuoChengZhi: 0,//空白标定过程值
            KongBaiJiaoZhunGuoChengZhi: 0,//空白校准过程值
            BiaoYangJiaoZhunCanKaoZhi: 0,//标样校准参考值
            BiaoYangJiaoZhunGuoChengZhi: 0,//标样校准过程值
            XianSeWenDu: 0,//显色温度
            XianSeShiJian: 0,//显色时间
            BanKaWenDu: 0,//板卡温度
        },
        isSendLoading: false,
        savebtn: true,
        lcbjDiv: true,
        sjylDiv: false,
        byndDiv: false,
        ZhiKongYuJingYuZhi: '',


        JB_Status: "",
        JB_StatusText: "通讯断开",
        JB_SubStatus: '--',//子状态  默认 0
        JB_Fault: 0,//报警 默认0
        JB_FaultText: '无告警',
        JB_Timer1: "",
        JB_Timer2: "",
        JB_TimerSpance: "--",//内部脉冲时间间隔
        JB_Pulse1: '--',
        JB_Pulse2: "",
        JB_Low: "",
        JB_High: "",

        JB_CB: '--',
        JB_V3: '--',
        JB_V1: '--',
        JB_VB: '--',
        JB_DingRongTiJi: "--", //定容体积
        JB_HuiShouLv: "--",

        KuaDuZhi: "",
        BiaoYangHeChaNongDu: "",
        LiangChengPiaoYiNongDu: "",
        LingDianPiaoYiNongDu: "",
        ShuiYangCeShiNongDu: "",
        KongBaiCeShiNongDu: "",
        GaoJingZiDongFuWei: false,
        ShiJiYuLiang: 0,
        ShiJiDaoQiShiJiian: '',//试剂到期时间
        ShiJiZongLiang: 0,
        ShiJiXiaXian: 0,
        RiZhiKongStatus: false,//true:质控中；false：结束
        RiZhiKongIsHeGe: false,//true:合格；false:不合格
        //试剂参数
        R1ShiJiZongLiang: -1,//R1试剂总量
        R2ShiJiZongLiang: 500,
        R3ShiJiZongLiang: 500,
        R4ShiJiZongLiang: 500,
        R5ShiJiZongLiang: 500,

        R1ShiJiYuLiang: 200,
        R2ShiJiYuLiang: 0,
        R3ShiJiYuLiang: 0,
        R4ShiJiYuLiang: 0,
        R5ShiJiYuLiang: 0,

        KongBaiShiJiZongLiang: 5000,//空白试剂总量
        BiaoYeShiJiZongLiang: 500,
        LingHeShiJiZongLiang: 500,
        KuaHeShiJiZongLiang: 500,
        BiaoHeShiJiZongLiang: 500,

        KongBaiShiJiYuLiang: 5000,
        BiaoYeShiJiYuLiang: 500,
        LingHeShiJiYuLiang: 500,
        KuaHeShiJiYuLiang: 500,
        BiaoHeShiJiYuLiang: 500,

        DiShiJiYuJingYuZhi: 30,//低试剂预警阈值
        QueShiJiGaoJingYuZhi: 15,//低试剂告警阈值
    },
    NH3: {
        ID: "NH3",
        Code: "w21003",//因子编码
        Name: "氨氮",
        mlName: "NH3",
        IsNormal: true,//常规仪表
        isAlone: true,//单因子
        ComStatus: 0,
        ComStatusText: '通讯断开',
        LastTestTime: "--",//末次测量时间
        LastTestData: '--',//末次测量数据
        LastTestDataFlag: '--',//末次测量数据标识
        Series: '',

        LastTestFlagText: '--',//末次测量标识文本 
        Unit: "mg/L",
        Decimal: 2,
        SysTime: "--",//仪表时间 2020-11-26 17:04:59
        MeterStatus: -1,
        MeterStatusText: '未知',
        Alarm: 0,
        AlarmText: '--',
        Fault: 0,
        FaultText: '--',
        SubFlow: "--",
        SubFlowExt: "--",
        SubFlowText: "--",
        JingDu: "--",
        XiaoJieWenDu: "--",
        XiaoJieShiJian: "--",
        LiangCheng: "--",
        XieLv: "--",
        JieJu: "--",
        XianXingXiShu: "--",
        XinHaoZhi: "--",
        JiaoZhunShiJian: "--",
        BiaoYangShiJian: "--",
        JianChuXian: "--",
        MoreParam: {//更多参数
            BiaoYangCanKaoZhi: 0,//标样参考值
            LiangChengXiaXian: "--",//量程下限

            ShuiYangShuJuShiJian: '--',//水样测试数据时间
            ShuiYangShiCeZhi: 0,//水样实测值
            ShuiYangShuJuFlag: "--",//水样数据标识
            //标样核查
            BiaoYangShuJuShiJian: '--',
            BiaoYangShiCeZhi: 0,
            BiaoYangShuJuFlag: "--",
            //空白测试
            KongBaiShuJuShiJian: '--',
            KongBaiShiCeZhi: 0,
            KongBaiShuJuFlag: "--",
            //零点核查
            LingDianHeChaShuJuShiJian: '--',
            LingDianHeChaShiCeZhi: 0,
            LingDianHeChaShuJuFlag: "--",
            //跨度核查
            KuaDuHeChaShuJuShiJian: '--',
            KuaDuHeChaShiCeZhi: 0,
            KuaDuHeChaShuJuFlag: "--",
            //加标回收
            JiaBiaoHuiShouShuJuShiJian: '--',
            JiaBiaoHuiShouShiCeZhi: 0,
            JiaBiaoHuiShouShuJuFlag: "--",
            //平行样
            PingXingYangShuJuShiJian: '--',
            PingXingYangShiCeZhi: 0,
            PingXingYangShuJuFlag: "--",

            //标液浓度、标液测量过程值
            BiaoYeYiNongDu: 0,
            BiaoYeYiCeLiangGuoChengZhi: 0,

            BiaoYeErNongDu: 0,
            BiaoYeErCeLiangGuoChengZhi: 0,

            BiaoYeSanNongDu: 0,
            BiaoYeSanCeLiangGuoChengZhi: 0,

            BiaoYeSiNongDu: 0,
            BiaoYeSiCeLiangGuoChengZhi: 0,

            BiaoYeWuNongDu: 0,
            BiaoYeWuCeLiangGuoChengZhi: 0,

            CeLiangMoShi: -1,//测量模式；1 连续模式、2 周期模式、3 定点模式、4 受控模式、5 手动模式
            CeLiangMoShiText: '未知',
            SoftwareVersion: 1.0,//软件版本
            CeLiangJianGe: 0,//分钟，测量间隔
            LingDianHeChaJianGe: 0,//分钟，零点核查间隔
            KuaDuHeChaJianGe: 0,//分钟，跨度核查间隔
            BiaoYangHeChaJianGe: 0,//分钟，标样核查间隔
            ShiJiYuLiang: 0,//试剂余量

            // CeLiangDiDingZhi: 0,//测量滴定值,过程测量值，信号值
            KongBaiJiaoZhunShiJian: '--',//空白校准时间
            JiaoZhunXiShu: 0,//校准系数
            JiaoZhunYinZi: 0,
            SheBeiXuLieHao: '0000-0000',//设备序列号
            ErCiDuoXiangXiShu: 0,//二次多项系数
            KongZhiMingLing: 0,//控制控制命令
            CanShu: 0,//参数

            XiaoJieChiShiShiWenDu: 0,//消解池实时温度
            HunYangChiShiShiWenDu: 0,//混样池实时温度
            KongBaiBiaoDingGuoChengZhi: 0,//空白标定过程值
            KongBaiJiaoZhunGuoChengZhi: 0,//空白校准过程值
            BiaoYangJiaoZhunCanKaoZhi: 0,//标样校准参考值
            BiaoYangJiaoZhunGuoChengZhi: 0,//标样校准过程值
            XianSeWenDu: 0,//显色温度
            XianSeShiJian: 0,//显色时间
            BanKaWenDu: 0,//板卡温度
        },

        isSendLoading: false,
        savebtn: true,
        lcbjDiv: true,
        sjylDiv: false,
        byndDiv: false,
        ZhiKongYuJingYuZhi: '',


        JB_Status: "",
        JB_StatusText: "通讯断开",
        JB_SubStatus: '--',//子状态  默认 0
        JB_Fault: 0,//报警 默认0
        JB_FaultText: '无告警',
        JB_Timer1: "",
        JB_Timer2: "",
        JB_TimerSpance: "--",//内部脉冲时间间隔
        JB_Pulse1: '--',
        JB_Pulse2: "",
        JB_Low: "",
        JB_High: "",

        JB_CB: '--',
        JB_V3: '--',
        JB_V1: '--',
        JB_VB: '--',
        JB_DingRongTiJi: "--", //定容体积
        JB_HuiShouLv: "--",

        KuaDuZhi: "",
        BiaoYangHeChaNongDu: "",
        LiangChengPiaoYiNongDu: "",
        LingDianPiaoYiNongDu: "",
        ShuiYangCeShiNongDu: "",
        KongBaiCeShiNongDu: "",
        GaoJingZiDongFuWei: false,
        ShiJiYuLiang: 0,
        ShiJiDaoQiShiJiian: '',//试剂到期时间
        ShiJiZongLiang: 0,
        ShiJiXiaXian: 0,
        RiZhiKongStatus: true,//true:指控中；false：结束
        RiZhiKongIsHeGe: true,//true:合格；false:不合格
        //试剂参数
        R1ShiJiZongLiang: 500,//R1试剂总量
        R2ShiJiZongLiang: 500,
        R3ShiJiZongLiang: 500,
        R4ShiJiZongLiang: 500,
        R5ShiJiZongLiang: 500,

        R1ShiJiYuLiang: 200,
        R2ShiJiYuLiang: 220,
        R3ShiJiYuLiang: 220,
        R4ShiJiYuLiang: 220,
        R5ShiJiYuLiang: 220,

        KongBaiShiJiZongLiang: 20000,//空白试剂总量
        BiaoYeShiJiZongLiang: 20000,
        LingHeShiJiZongLiang: 20000,
        KuaHeShiJiZongLiang: 20000,
        BiaoHeShiJiZongLiang: 20000,
        KongBaiShiJiYuLiang: 20000,
        BiaoYeShiJiYuLiang: 20000,
        LingHeShiJiYuLiang: 20000,
        KuaHeShiJiYuLiang: 20000,
        BiaoHeShiJiYuLiang: 20000,

        DiShiJiYuJingYuZhi: 50,//低试剂预警阈值
        QueShiJiGaoJingYuZhi: 30,//低试剂告警阈值
    },
    COD: {
        ID: "COD",
        Code: "w01019",//因子编码
        Name: "高锰酸盐指数",
        mlName: "COD",
        IsNormal: true,//常规仪表
        isAlone: true,//单因子
        ComStatus: 0,
        ComStatusText: '通讯断开',
        LastTestTime: "--",//末次测量时间
        LastTestData: '--',//末次测量数据
        LastTestDataFlag: '--',//末次测量数据标识
        Series: '',

        LastTestFlagText: '--',//末次测量标识文本 
        Unit: "mg/L",
        Decimal: 1,
        SysTime: "--",//仪表时间 2020-11-26 17:04:59
        MeterStatus: -1,
        MeterStatusText: '未知',
        Alarm: 0,
        AlarmText: '--',
        Fault: 0,
        FaultText: '--',
        SubFlow: "--",
        SubFlowExt: "--",
        SubFlowText: "--",
        JingDu: "--",
        XiaoJieWenDu: "--",
        XiaoJieShiJian: "--",
        LiangCheng: "--",
        XieLv: "--",
        JieJu: "--",
        XianXingXiShu: "--",
        XinHaoZhi: "--",
        JiaoZhunShiJian: "--",
        BiaoYangShiJian: "--",
        JianChuXian: "--",
        MoreParam: {//更多参数
            BiaoYangCanKaoZhi: 0,//标样参考值
            LiangChengXiaXian: "--",//量程下限

            ShuiYangShuJuShiJian: '--',//水样测试数据时间
            ShuiYangShiCeZhi: 0,//水样实测值
            ShuiYangShuJuFlag: "--",//水样数据标识
            //标样核查
            BiaoYangShuJuShiJian: '--',
            BiaoYangShiCeZhi: 0,
            BiaoYangShuJuFlag: "--",
            //空白测试
            KongBaiShuJuShiJian: '--',
            KongBaiShiCeZhi: 0,
            KongBaiShuJuFlag: "--",
            //零点核查
            LingDianHeChaShuJuShiJian: '--',
            LingDianHeChaShiCeZhi: 0,
            LingDianHeChaShuJuFlag: "--",
            //跨度核查
            KuaDuHeChaShuJuShiJian: '--',
            KuaDuHeChaShiCeZhi: 0,
            KuaDuHeChaShuJuFlag: "--",
            //加标回收
            JiaBiaoHuiShouShuJuShiJian: '--',
            JiaBiaoHuiShouShiCeZhi: 0,
            JiaBiaoHuiShouShuJuFlag: "--",
            //平行样
            PingXingYangShuJuShiJian: '--',
            PingXingYangShiCeZhi: 0,
            PingXingYangShuJuFlag: "--",

            //标液浓度、标液测量过程值
            BiaoYeYiNongDu: 0,
            BiaoYeYiCeLiangGuoChengZhi: 0,

            BiaoYeErNongDu: 0,
            BiaoYeErCeLiangGuoChengZhi: 0,

            BiaoYeSanNongDu: 0,
            BiaoYeSanCeLiangGuoChengZhi: 0,

            BiaoYeSiNongDu: 0,
            BiaoYeSiCeLiangGuoChengZhi: 0,

            BiaoYeWuNongDu: 0,
            BiaoYeWuCeLiangGuoChengZhi: 0,

            CeLiangMoShi: -1,//测量模式；1 连续模式、2 周期模式、3 定点模式、4 受控模式、5 手动模式
            CeLiangMoShiText: '未知',
            SoftwareVersion: 1.0,//软件版本
            CeLiangJianGe: 0,//分钟，测量间隔
            LingDianHeChaJianGe: 0,//分钟，零点核查间隔
            KuaDuHeChaJianGe: 0,//分钟，跨度核查间隔
            BiaoYangHeChaJianGe: 0,//分钟，标样核查间隔
            ShiJiYuLiang: 0,//试剂余量

            // CeLiangDiDingZhi: 0,//测量滴定值,过程测量值，信号值
            KongBaiJiaoZhunShiJian: '--',//空白校准时间
            JiaoZhunXiShu: 0,//校准系数
            JiaoZhunYinZi: 0,
            SheBeiXuLieHao: '0000-0000',//设备序列号
            ErCiDuoXiangXiShu: 0,//二次多项系数
            KongZhiMingLing: 0,//控制控制命令
            CanShu: 0,//参数

            XiaoJieChiShiShiWenDu: 0,//消解池实时温度
            HunYangChiShiShiWenDu: 0,//混样池实时温度
            KongBaiBiaoDingGuoChengZhi: 0,//空白标定过程值
            KongBaiJiaoZhunGuoChengZhi: 0,//空白校准过程值
            BiaoYangJiaoZhunCanKaoZhi: 0,//标样校准参考值
            BiaoYangJiaoZhunGuoChengZhi: 0,//标样校准过程值
            XianSeWenDu: 0,//显色温度
            XianSeShiJian: 0,//显色时间
            BanKaWenDu: 0,//板卡温度
        },

        isSendLoading: false,
        savebtn: true,
        lcbjDiv: true,
        sjylDiv: false,
        byndDiv: false,
        ZhiKongYuJingYuZhi: '',

        JB_Status: "",
        JB_StatusText: "通讯断开",
        JB_SubStatus: '--',//子状态  默认 0
        JB_Fault: 0,//报警 默认0
        JB_FaultText: '无告警',
        JB_Timer1: "",
        JB_Timer2: "",
        JB_TimerSpance: "--",//内部脉冲时间间隔
        JB_Pulse1: '--',
        JB_Pulse2: "",
        JB_Low: "",
        JB_High: "",

        JB_CB: '--',
        JB_V3: '--',
        JB_V1: '--',
        JB_VB: '--',
        JB_DingRongTiJi: "--", //定容体积
        JB_HuiShouLv: "--",

        KuaDuZhi: "",
        BiaoYangHeChaNongDu: "",
        LiangChengPiaoYiNongDu: "",
        LingDianPiaoYiNongDu: "",
        ShuiYangCeShiNongDu: "",
        KongBaiCeShiNongDu: "",
        GaoJingZiDongFuWei: false,
        ShiJiYuLiang: 0,
        ShiJiDaoQiShiJiian: '',//试剂到期时间
        ShiJiZongLiang: 0,
        ShiJiXiaXian: 0,
        RiZhiKongStatus: false,//true:指控中；false：结束
        RiZhiKongIsHeGe: true,//true:合格；false:不合格
        //试剂参数
        R1ShiJiZongLiang: 500,//R1试剂总量
        R2ShiJiZongLiang: 500,
        R3ShiJiZongLiang: 500,
        R4ShiJiZongLiang: 500,
        R5ShiJiZongLiang: 500,

        R1ShiJiYuLiang: 200,
        R2ShiJiYuLiang: 0,
        R3ShiJiYuLiang: 0,
        R4ShiJiYuLiang: 0,
        R5ShiJiYuLiang: 0,

        KongBaiShiJiZongLiang: 0,//空白试剂总量
        BiaoYeShiJiZongLiang: 0,
        LingHeShiJiZongLiang: 0,
        KuaHeShiJiZongLiang: 0,
        BiaoHeShiJiZongLiang: 0,
        KongBaiShiJiYuLiang: 0,
        BiaoYeShiJiYuLiang: 0,
        LingHeShiJiYuLiang: 0,
        KuaHeShiJiYuLiang: 0,
        BiaoHeShiJiYuLiang: 0,

        DiShiJiYuJingYuZhi: 0,//低试剂预警阈值
        QueShiJiGaoJingYuZhi: 0,//低试剂告警阈值
    },
    CODCR: {
        ID: "CODCR",
        Code: "w01018",//因子编码
        Name: "化学需氧量",
        mlName: "CODCR",
        IsNormal: true,//常规仪表
        isAlone: true,//单因子
        ComStatus: 0,
        ComStatusText: '通讯断开',
        LastTestTime: "--",//末次测量时间
        LastTestData: '--',//末次测量数据
        LastTestDataFlag: '--',//末次测量数据标识
        Series: '',

        LastTestFlagText: '--',//末次测量标识文本 
        Unit: "mg/L",
        Decimal: 0,
        SysTime: "--",//仪表时间 2020-11-26 17:04:59
        MeterStatus: -1,
        MeterStatusText: '未知',
        Alarm: 0,
        AlarmText: '--',
        Fault: 0,
        FaultText: '--',
        SubFlow: "--",
        SubFlowExt: "--",
        SubFlowText: "--",
        JingDu: "--",
        XiaoJieWenDu: "--",
        XiaoJieShiJian: "--",
        LiangCheng: "--",
        XieLv: "--",
        JieJu: "--",
        XianXingXiShu: "--",
        XinHaoZhi: "--",
        JiaoZhunShiJian: "--",
        BiaoYangShiJian: "--",
        JianChuXian: "--",
        MoreParam: {//更多参数
            BiaoYangCanKaoZhi: 0,//标样参考值
            LiangChengXiaXian: "--",//量程下限

            ShuiYangShuJuShiJian: '--',//水样测试数据时间
            ShuiYangShiCeZhi: 0,//水样实测值
            ShuiYangShuJuFlag: "--",//水样数据标识
            //标样核查
            BiaoYangShuJuShiJian: '--',
            BiaoYangShiCeZhi: 0,
            BiaoYangShuJuFlag: "--",
            //空白测试
            KongBaiShuJuShiJian: '--',
            KongBaiShiCeZhi: 0,
            KongBaiShuJuFlag: "--",
            //零点核查
            LingDianHeChaShuJuShiJian: '--',
            LingDianHeChaShiCeZhi: 0,
            LingDianHeChaShuJuFlag: "--",
            //跨度核查
            KuaDuHeChaShuJuShiJian: '--',
            KuaDuHeChaShiCeZhi: 0,
            KuaDuHeChaShuJuFlag: "--",
            //加标回收
            JiaBiaoHuiShouShuJuShiJian: '--',
            JiaBiaoHuiShouShiCeZhi: 0,
            JiaBiaoHuiShouShuJuFlag: "--",
            //平行样
            PingXingYangShuJuShiJian: '--',
            PingXingYangShiCeZhi: 0,
            PingXingYangShuJuFlag: "--",

            //标液浓度、标液测量过程值
            BiaoYeYiNongDu: 0,
            BiaoYeYiCeLiangGuoChengZhi: 0,

            BiaoYeErNongDu: 0,
            BiaoYeErCeLiangGuoChengZhi: 0,

            BiaoYeSanNongDu: 0,
            BiaoYeSanCeLiangGuoChengZhi: 0,

            BiaoYeSiNongDu: 0,
            BiaoYeSiCeLiangGuoChengZhi: 0,

            BiaoYeWuNongDu: 0,
            BiaoYeWuCeLiangGuoChengZhi: 0,

            CeLiangMoShi: -1,//测量模式；1 连续模式、2 周期模式、3 定点模式、4 受控模式、5 手动模式
            CeLiangMoShiText: '未知',
            SoftwareVersion: 1.0,//软件版本
            CeLiangJianGe: 0,//分钟，测量间隔
            LingDianHeChaJianGe: 0,//分钟，零点核查间隔
            KuaDuHeChaJianGe: 0,//分钟，跨度核查间隔
            BiaoYangHeChaJianGe: 0,//分钟，标样核查间隔
            ShiJiYuLiang: 0,//试剂余量

            // CeLiangDiDingZhi: 0,//测量滴定值,过程测量值，信号值
            KongBaiJiaoZhunShiJian: '--',//空白校准时间
            JiaoZhunXiShu: 0,//校准系数
            JiaoZhunYinZi: 0,
            SheBeiXuLieHao: '0000-0000',//设备序列号
            ErCiDuoXiangXiShu: 0,//二次多项系数
            KongZhiMingLing: 0,//控制控制命令
            CanShu: 0,//参数

            XiaoJieChiShiShiWenDu: 0,//消解池实时温度
            HunYangChiShiShiWenDu: 0,//混样池实时温度
            KongBaiBiaoDingGuoChengZhi: 0,//空白标定过程值
            KongBaiJiaoZhunGuoChengZhi: 0,//空白校准过程值
            BiaoYangJiaoZhunCanKaoZhi: 0,//标样校准参考值
            BiaoYangJiaoZhunGuoChengZhi: 0,//标样校准过程值
            XianSeWenDu: 0,//显色温度
            XianSeShiJian: 0,//显色时间
            BanKaWenDu: 0,//板卡温度
        },

        isSendLoading: false,
        savebtn: true,
        lcbjDiv: true,
        sjylDiv: false,
        byndDiv: false,
        ZhiKongYuJingYuZhi: '',

        JB_Status: "",
        JB_StatusText: "通讯断开",
        JB_SubStatus: '--',//子状态  默认 0
        JB_Fault: 0,//报警 默认0
        JB_FaultText: '无告警',
        JB_Timer1: "",
        JB_Timer2: "",
        JB_TimerSpance: "--",//内部脉冲时间间隔
        JB_Pulse1: '--',
        JB_Pulse2: "",
        JB_Low: "",
        JB_High: "",

        JB_CB: '--',
        JB_V3: '--',
        JB_V1: '--',
        JB_VB: '--',
        JB_DingRongTiJi: "--", //定容体积
        JB_HuiShouLv: "--",

        KuaDuZhi: "",
        BiaoYangHeChaNongDu: "",
        LiangChengPiaoYiNongDu: "",
        LingDianPiaoYiNongDu: "",
        ShuiYangCeShiNongDu: "",
        KongBaiCeShiNongDu: "",
        GaoJingZiDongFuWei: false,
        ShiJiYuLiang: 0,
        ShiJiDaoQiShiJiian: '',//试剂到期时间
        ShiJiZongLiang: 0,
        ShiJiXiaXian: 0,
        RiZhiKongStatus: false,//true:指控中；false：结束
        RiZhiKongIsHeGe: true,//true:合格；false:不合格
        //试剂参数
        R1ShiJiZongLiang: 500,//R1试剂总量
        R2ShiJiZongLiang: 500,
        R3ShiJiZongLiang: 500,
        R4ShiJiZongLiang: 500,
        R5ShiJiZongLiang: 500,

        R1ShiJiYuLiang: 200,
        R2ShiJiYuLiang: 0,
        R3ShiJiYuLiang: 0,
        R4ShiJiYuLiang: 0,
        R5ShiJiYuLiang: 0,

        KongBaiShiJiZongLiang: 15000,//空白试剂总量
        BiaoYeShiJiZongLiang: 0,
        LingHeShiJiZongLiang: 0,
        KuaHeShiJiZongLiang: 0,
        BiaoHeShiJiZongLiang: 0,
        KongBaiShiJiYuLiang: 15000,
        BiaoYeShiJiYuLiang: 0,
        LingHeShiJiYuLiang: 0,
        KuaHeShiJiYuLiang: 0,
        BiaoHeShiJiYuLiang: 0,

        DiShiJiYuJingYuZhi: 35,//低试剂预警阈值
        QueShiJiGaoJingYuZhi: 0,//低试剂告警阈值
    },
    PLC: {
        Name: "西门子PLC",
        PLCMoShi: "",
        YunXingMoShi: 0,
        YunXingMoShiText: '未知',
        YaLi: "1.000",
        SV1Status: false,
        SV2Status: false,
        SV3Status: false,
        SV4Status: false,
        SV5Status: false,
        SV6Status: false,
        SV7Status: false,
        SV8Status: false,
        SV9Status: false,
        SV10Status: false,
        SV11Status: false,
        SV12Status: false,
        SV13Status: false,
        SV14Status: false,
        SV15Status: false,

        SVC19Status: false,
        SVC20Status: false,


        SV19Status: false,
        SV20Status: false,
        SV21Status: false,
        SV22Status: false,

        //离心机 

        SVL19Status: false,
        SVL20Status: false,
        SVL21Status: false,
        SVL22Status: false,
        SVL23Status: false,
        TPLXJStatus: false,
        TNLXJStatus: false,
        NH3LXJStatus: false,
        CODLXJStatus: false,
        CODcrLXJStatus: false,
        LXJStatus: false,
        LXJComStatus: 0,
        LXJComStatusText: '通讯断开',


        M1Status: false,
        M2Status: false,
        M3Status: false,
        M4Status: false,
        M6Status: false,
        KongYaJiStatus: false,
        WuCanShuChiYeWei: false,
        ChenDianChiYeWei: false,
        CaiYangBei1YeWei: false,
        CaiYangBei2YeWei: false,
        CaiYangBei3YeWei: false,
        CaiYangBei4YeWei: false,
        CaiYangBei5YeWei: false,
        CaiYangBei6YeWei: false,
        CaiYangBei7YeWei: false,

        ZiDongStatus: false,
        ShouDongStatus: false,
        Beng1Fault: false,
        CaiShuiFault: false,
        CaiShuiWuCanYeWeiAlarm: false,
        ChenDianChiYeWeiAlarm: false,
        CaiYang1PeiShuiFault: false,
        CaiYang2PeiShuiFault: false,
        CaiYang3PeiShuiFault: false,
        CaiYang4PeiShuiFault: false,
        CaiYang5PeiShuiFault: false,
        CaiYang1ChuZaoFault: false,
        CaiYang2ChuZaoFault: false,
        CaiYang3ChuZaoFault: false,
        CaiYang4ChuZaoFault: false,
        CaiYang5ChuZaoFault: false,

        CaiYang6ChuZaoFault: false,
        CaiYang7ChuZaoFault: false,

        DianYuanFault: false,
        CaiShuiYeWeiAlarm: false,
        QingXiYeWeiAlarm: false,
        PeiShuiFault: false,
        CaiShui: false,
        PeiShui: false,
        CeLiang: false,
        ChuZao: false,
        QingXi: false,
        DaiJi: false,
        GuanLuQiXi: false,
        YiBiaoQuShu: false,
        Beng1BuShui: false,
        Beng2BuShui: false,
        MianBanZiDong: false,
        MianBanWeiHu: false,
        MianBanDanCi: false,
        MianBanChuZao: false,
        MianBanQingXi: false,
        WuCanLianXu: false,
        WuCanQuShu: false,
        WuCanPaiKong: false,
        WuCanQuShui: false,
        WuCanYunXing: false,
        ZhengDianChuFa: false,
        MianBanFuWei: false,
        MoRenQuShuiBeng: false,
        ShangDianQingXi: false,
        CaiYangBeiRunXi: false,
        BengBuShuiShiJian: 0,
        Beng1QuShuiShiJian: 0,
        Beng2QuShuiShiJian: 0,
        ChuZaoZhouQi: 0,
        ChenDianShiJian: 0,

        ShangQingXiShui: false,
        ShangQingXiShuiState: false,

        CaiYangBeiChenDianShiJian: 0,

        TPCaiYangBeiChenDianShiJian: 0,
        TNCaiYangBeiChenDianShiJian: 0,
        NH3CaiYangBeiChenDianShiJian: 0,
        CODCaiYangBeiChenDianShiJian: 0,
        CODCRCaiYangBeiChenDianShiJian: 0,


        ChuZaoCiShu: 0,
        YaLiXiaXian: 0,
        NeiGuanQingXiShiJian: 0,
        WaiGuanQingXiShiJian: 0,
        BengJiaoTiJianGe: 0,

        QingXiShunXu: -1,
        CaiShuiShunXu: -1,
        PeiShuiShunXu: -1,
        CeLiangShunXu: -1,

        PenLinBengQiDongWenDu: 0,
        PenLinBengGuanBiWenDu: 0,

        ZhengFaYiZengLiang: 0,
        ZhngFaYiJiSuanShiJian: 0,

        ZengYaBeng1QuShuiShiJian: 0,
        ZengYaBeng2QuShuiShiJian: 0,

        ZhuoDuYuChuLi: false,
        TPYuChuLi: false,
        TPShangXian: 500,
        TPGuoLvFa: false,

        TP_HeChaStatus: false,
        TP_JiaBiaoStatus: false,
        TN_HeChaStatus: false,
        TN_JiaBiaoStatus: false,
        NH3_HeChaStatus: false,
        NH3_JiaBiaoStatus: false,
        COD_HeChaStatus: false,
        COD_JiaBiaoStatus: false,

        // 浮船
        SystemWorkState: false,
        ShuiYangYeWeiDi: false,
        ShuiYangYeWeiGao: false,
        GongDianState12v: false,
        GongDianState220v: false,
        ZhaoMingState: false,
        FeiYeTongState1: false,
        FeiYeTongState2: true,
        FeiYeTongState3: false,
        FeiYeTongState4: false,
        ZongGuZhang: false,
        CaiYangBengAlarm1: false,
        CaiYangBengAlarm2: false,
        GongDianAlarm220v: false,
        GongDianAlarm12v: true,
        LouShuiAlarm: false,
        HongWaiAlarm: false,
        CangMenState: false,
        PenLinBengState: false,
        YanGanState: false,
        YanGanAlarm: false,

        // // 电池
        // BMS_surplus1: 50,
        // BMS_surplus2: 40,
        // BMS_surplus3: 30,
        // BMS_surplus4: 20,
        // BMS_surplus5: 10,

        // // 气象
        // QXWindSpeed: 0,  //QX_风速
        // QXWindDirection: 0, //QX_风向
        // QXWenDu: 0,
        // QXShiDu: 0,
        // QXYaLi: 0,
        // QXMinRainfall: 0,
        // QXHourRainfall: 0,
        // QX24HourRainfall: 0,
        // QXLeiJiRainfall: 0,
        // QXZhengFaLiang: 0,


    },
    SYS: {
        ProtocolType: '国标212',//后期改成枚举
        PlatformName: "水环境质量综合监测管控平台",
        PlatformIP: "172.16.12.136",
        PlatformPort: "5000",
        PlatformPW: "123456",
        PlatformHeartInterval: "平台心跳间隔",
        PlatformReconInterval: "平台断连间隔",
        // PlatformTimeOut: "平台超时时间",
        PlatformRecCount: "平台重试次数",
        MN: "sdl000000001",
        id: "shuizhan000",
        PointName: '#1厂房',
        OptUserName: "研发",
        OptUserPhone: "13800138000",
        SystemName: "",
        // SystemNames: "智能化污染源水质在线监测采集控制系统",
        CompanyName: "北京雪迪龙科技股份有限公司",
        YunWeiCompanyName: "北京雪迪龙科技股份有限公司",
        SoftVersion: "V1.0",
        CaiShuiShiJian: "",
        ShuiYangShiJian: "",
        WuCanXiaoShiCeLiang: false,
        YuanChengFanKong: false,//true:开启 false:关闭
        YuanChengJiaBiaoCaiShui: "0",//1:原水样 2：重新采水
        KaiQiRiZhiKong: false,
        // 监测水类型
        JianCeShuiLeiXing: 1,

        LingDianJianGe: 0,
        LingDianShiJian: 6,
        LingDianLeiJiTianShu: "",

        KuaDuJianGe: "0",
        KuaDuShiJian: "7",
        KuaDuLeiJiTianShu: "",

        PingXingYangJianGe: "-1",
        PingXingYangShiJian: "10",
        PingXingYangLeiJiTianShu: "",

        BiaoYangHeChaJianGe: "-1",
        BiaoYangHeChaShiJian: "11",
        BiaoYangLeiJiTianShu: "",

        JiaBiaoHuiShouJianGe: "-1",
        JiaBiaoHuiShouShiJian: "10",
        JiaBiaoHuiShouLeiJiTianShu: "",

        ZiDongJiaoZhunJianGe: "-1",
        ZiDongJiaoZhunShiJian: "10",
        ZiDongJiaoZhunLeiJiTianShu: "",

        ZiDongJianGeXiaoShi: 4,
        ShiShiShuJuJianGe: -1,

        //上传参数
        Upload_ShiShiShuJuJianGe: 10,//分钟,默认：10分钟
        Upload_FenZhongShuJuJianGe: 10,//分钟,默认：10分钟
        Upload_XiTongZhuangTaiJianGe: 5,//分钟，默认：5分钟
        Upload_TongXunChaoShiShiJian: 10,//秒，默认：10秒
        Upload_ChaoShiChongShiCiShu: 3,//次，默认：3次
        //是否上传
        Upload_ShiShiShuJu: false,//实时数据，默认：否
        Upload_XiaoShiShuJu: false,//小时数据，默认：否
        Upload_BiaoYangHeCha: false,//标样核查，默认：否
        Upload_JiaBiaoHuiShou: false,//加标回收，默认：否
        Upload_PingXingYang: false,//平行样，默认：否
        Upload_LingDianHeCha: false,//零点核查，默认：否
        Upload_KuaDuHeCha: false,//跨度核查，默认：否
        Upload_KongBaiCeShi: false,//空白测试，默认：否
        Upload_YiQiAndShuCaiYiRiZhi: false,//仪器/数采仪信息（日志），默认：否
        Upload_YiQiAndShuCaiYiZhuangTai: false,//仪器/数采仪信息（状态），默认：否
        Upload_YiQiCanShu: false,//仪器信息（参数），默认：否
        Upload_LiuYangXinXi: false,//留样信息 是否上传，默认：否
        Upload_ShuCaiYiKaiJiShiJian: false,//数采仪开机时间，默认：否
        Upload_ShiFouYingDa: true,//有应答报文，默认：是

        // 预警
        ShiJiYuJing: "启用试剂预警=true",
        YunWeiYuJing: "启用试剂预警=true",
        ShuJuYuJing: "启用试剂预警=true",
        BeiJianYuJing: "启用试剂预警=true",

        PHHengZhiCiShu: '0',
        ShuiYangHengZhiCiShu: '0',
        YunWeiYuJingTianShu: '0',

    },
    ZF: {
        ID: "ZF",
        Code: "ZF",
        Name: "站房",
        isAlone: false,//单因子
        ComStatus: 0,
        ComStatusText: "通讯断开",
        AirTemp: "",
        AirHum: "",
        Lng: "",
        Lat: "",
        Volt: "",
        DaQiWenDu: {
            ID: "DaQiWenDu",
            Name: "室内温度",
            Code: "w90001",//因子编码
            LastTestData: '--',
            Unit: '℃',
            Decimal: 1,
            IsZF: true
        },
        DaQiShiDu: {
            ID: "DaQiShiDu",
            Name: "室内湿度",
            Code: "w90002",//因子编码
            LastTestData: '--',
            Unit: '%',
            Decimal: 1,
            IsZF: true
        }
    },
    LY: {
        ID: "LY",
        Code: "LY",
        mlName: "留样",
        Name: "留样",
        isAlone: true,//单因子
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MoShi: "1",//1、超标留样，2、周期留样，3、手动留样
        XingHao: "1",
        PingHao: "--",
        Alarm: "正常"
    },
    CY: {
        ID: "CYQ",
        Code: "CYQ",
        Name: "采样器",
        mlName: "采样器",
        Series: '',
        isAlone: true,//单因子
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatus: 0,//仪表状态 0：停止、1：启动
        MeterStatusText: '未知',
        MoShi: "0",//0、手动，1、自动，
        PingHao: "--",
        CaiYangJianGeShiJian: "20",
        GongYangYanShiShiJian: "10",
    },
    WC: {
        ID: 'WC',
        Code: 'WC',
        mlName: "五参数",
        Name: "五参数",
        isAlone: false,//单因子
        ComStatus: -1,//通讯状态
        ComStatusText: "通讯断开",
        PH: {
            ID: "PH",
            mlName: 'PH',
            Name: "pH",
            Code: "w01001",
            LastTestData: '--',
            Series: '',
            ContentTip: '误差=实测值-标准液浓度 ，误差在-0.15至0.15之间算合格，否则不合格',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '-',
            Decimal: 2,
            BiaoYangNongDu: 0,
            IsWC: true,
            ZhouCheck: function ()//周考核判断
            {
                let Result = false;
                if (this.LastTestData != "--") {
                    let DValue = parseFloat(this.LastTestData) - parseFloat(this.BiaoYangNongDu)
                    //处理小数失真问题
                    DValue = parseFloat(DValue.toFixed(4));
                    Result = (DValue >= -0.15 && DValue <= 0.15)
                }
                return Result;
            }
        },
        DianDaoLv: {
            ID: "DianDaoLv",
            mlName: '电导率',
            Name: "电导率",
            Code: "w01014",
            Series: '',
            ContentTip: 'a、标样浓度值>100us/cm时，误差=实测值-标准液浓度,误差/标准液浓度的值在-0.05到0.05之间算合格,否则不合格',
            ContentTip1: 'b、标样浓度值<=100us /cm时，误差=实测值-标准液浓度，误差在-5到5之间算合格，否则不合格',
            ContentTip2: '',

            LastTestData: '--',
            Unit: 'μS/cm',
            Decimal: 2,
            BiaoYangNongDu: 0,
            IsWC: true,
            ZhouCheck: function ()//周考核判断
            {
                let Result = false;
                if (this.LastTestData != "--") {
                    let DValue = parseFloat(this.LastTestData) - parseFloat(this.BiaoYangNongDu)
                    if (parseFloat(this.BiaoYangNongDu) > 100) {
                        DValue = DValue / parseFloat(this.BiaoYangNongDu);
                        //处理小数失真问题
                        DValue = parseFloat(DValue.toFixed(4));
                        Result = (DValue >= -0.05 && DValue <= 0.05)
                    }
                    else if (parseFloat(this.BiaoYangNongDu) <= 100) {
                        Result = (DValue >= -5 && DValue <= 5)
                    }
                }
                return Result;
            }
        },
        HunZhuoDu: {
            ID: "HunZhuoDu",
            mlName: '浊度',
            Name: "浊度",
            Code: "w01003",
            Series: '',
            ContentTip: 'a、标样浓度值 <= 30NTU或标样浓度值>=1000NTU,不考核，均按合格计算',
            ContentTip1: 'b、30NTU< 标样浓度值且标样浓度值 <=50NTU,误差=实测值-标准液浓度 ，误差/标准液浓度的值在-0.15到0.15之间算合格，否则不合格',
            ContentTip2: 'c、50NTU< 标样浓度值且标样浓度值 < 1000NTU,误差=实测值-标准液浓度 ，误差/标准液浓度的值在-0.1到0.1之间算合格，否则不合格',


            LastTestData: '--',
            Unit: 'NTU',
            Decimal: 2,
            BiaoYangNongDu: 0,
            IsWC: true,
            ZhouCheck: function ()//周考核判断
            {
                let Result = false;
                if (this.LastTestData != "--") {
                    let DValue = parseFloat(this.LastTestData) - parseFloat(this.BiaoYangNongDu)
                    if (parseFloat(this.BiaoYangNongDu) >= 1000 || parseFloat(this.BiaoYangNongDu) <= 30) {
                        Result = true;
                    }
                    else if (parseFloat(this.BiaoYangNongDu) > 30 && parseFloat(this.BiaoYangNongDu) <= 50) {
                        DValue = DValue / parseFloat(this.BiaoYangNongDu);
                        //处理小数失真问题
                        DValue = parseFloat(DValue.toFixed(4));
                        Result = (DValue >= -0.15 && DValue <= 0.15)
                    }
                    else if (parseFloat(this.BiaoYangNongDu) > 50 && parseFloat(this.BiaoYangNongDu) < 1000) {
                        DValue = DValue / parseFloat(this.BiaoYangNongDu);
                        //处理小数失真问题
                        DValue = parseFloat(DValue.toFixed(4));
                        Result = (DValue >= -0.1 && DValue <= 0.1)
                    }
                }
                return Result;
            }
        },
        RongJieYang: {
            ID: "RongJieYang",
            mlName: '溶解氧',
            Name: "溶解氧",
            Code: "w01009",
            LastTestData: '--',
            Unit: 'mg/L',
            Series: '',
            ContentTip: '误差=实测值-标准液浓度 ，误差在-0.3至0.3之间算合格，否则不合格',
            ContentTip1: '',
            ContentTip2: '',
            Decimal: 2,
            BiaoYangNongDu: 0,
            IsWC: true,
            ZhouCheck: function ()//周考核判断
            {
                let Result = false;
                if (this.LastTestData != "--") {
                    let DValue = parseFloat(this.LastTestData) - parseFloat(this.BiaoYangNongDu)
                    //处理小数失真问题
                    DValue = parseFloat(DValue.toFixed(4));
                    Result = (DValue >= -0.3 && DValue <= 0.3)
                }
                return Result;
            }
        },
        ShuiWen: {
            ID: "ShuiWen",
            mlName: '水温',
            Name: "水温",
            Code: "w01010",
            Series: '',
            ContentTip: '无考核标准，均按合格算',
            ContentTip1: '',
            ContentTip2: '',
            LastTestData: '--',
            Unit: '℃',
            Decimal: 1,
            BiaoYangNongDu: 0,
            IsWC: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        XuanFuWu: {
            ID: "XuanFuWu",
            mlName: 'XuanFuWu',
            Name: "悬浮物",
            Code: "w01012",
            Series: '',
            ContentTip: '无考核标准，均按合格算',
            ContentTip1: '',
            ContentTip2: '',
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 0,
            BiaoYangNongDu: 0,
            IsWC: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        }
    },
    ZaoMiDu: {
        ID: "ZaoMiDu",
        mlName: "藻密度",
        Name: "藻密度",
        isAlone: true,//单因子
        Code: "w19011",
        Series: '',
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        LastTestData: '--',
        Unit: 'cells/mL',
        Decimal: 0,
        BiaoYangNongDu: 0,
        ContentTip: '藻密度：无',
        ContentTip1: '',
        ContentTip2: '',
        ZhouCheck: function ()//周考核判断
        {
            return true;//无考核标准
        }
    },
    YeLvSu: {
        ID: "YeLvSu",
        Name: "叶绿素",
        mlName: "叶绿素",
        isAlone: true,//单因子
        Code: "w01016",
        Series: '',
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        LastTestData: '--',
        Unit: 'μg/L',
        Decimal: 0,
        BiaoYangNongDu: 0,
        ContentTip: '叶绿素：无',
        ContentTip1: '',
        ContentTip2: '',
        ZhouCheck: function ()//周考核判断
        {
            return true;//无考核标准
        }
    },
    SZY: {
        ID: "SZY",
        mlName: "水中油",
        Name: "水中油",
        isAlone: true,//单因子
        Code: "w22001",
        Series: '',
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatus: -1,//仪表状态     { 1, "维护" },{ 3, "校准" },{ 7, "测量" },{ 9, "待机" },{ 50, "增殖培养" },{ 51, "修复" }

        MeterStatusText: '未知',
        LastTestData: '--',
        Unit: 'mg/L',
        Decimal: 0,
        BiaoYangNongDu: 0,
        ContentTip: '水中油：无',
        ContentTip1: '',
        ContentTip2: '',

    },
    SWDX: {
        ID: "SWDX",
        mlName: "生物毒性",
        Name: "生物毒性",
        isAlone: true,//单因子
        Code: "w01050",
        Series: '',
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatus: 0,//仪表状态 0：停止、1：启动
        MeterStatusText: '未知',
        LastTestData: '--',
        SWDX_FuDuXingDu: '--',//SWDX_副毒性度
        Alarm: 0, //SWDX_报警
        AlarmText: '--',



        SWDX_ZhuChuanGanQi: '--',//SWDX_主传感器
        SWDX_ZhuYiZhi: '--',//SWDX_注意值
        SWDX_AlarmValue: '--', //SWDX_报警值
        SWDX_DianYaZhi: '--', //SWDX_电压值
        SWDX_FuDianYaZhi: '--', //SWDX_副电压值


        Unit: '%',
        Decimal: 0,
        BiaoYangNongDu: 0,
        ContentTip: '生物毒性：无',
        ContentTip1: '',
        ContentTip2: '',

    },
    //   地表水--苯胺
    BenAn: {
        ID: "BenAn",
        mlName: "苯胺",
        Name: "苯胺",
        isAlone: true,//单因子
        Code: "w26001",
        Series: '',
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatus: -1,//仪表状态     { 1, "维护" },{ 3, "校准" },{ 7, "测量" },{ 9, "待机" },{ 50, "增殖培养" },{ 51, "修复" }
        ShuiYangShuJuShiJian: '',
        // ShuiYangShiCeZhi: '',
        MeterStatusText: '未知',
        LastTestData: '--',
        Unit: 'mg/L',
        Decimal: 3,
        BiaoYangNongDu: 0,
        ContentTip: '苯胺：无',
        ContentTip1: '',
        ContentTip2: '',

    },
    YeWeiJi: {
        ID: "YeWeiJi",
        mlName: "液位计",
        Name: "液位",
        isAlone: true,//单因子
        Code: "e01201",
        Series: '',
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatus: -1,//仪表状态     { 1, "维护" },{ 3, "校准" },{ 7, "测量" },{ 9, "待机" },{ 50, "增殖培养" },{ 51, "修复" }
        ShuiYangShuJuShiJian: '',
        // ShuiYangShiCeZhi: '',
        MeterStatusText: '未知',
        LastTestData: '--',
        Unit: 'm',
        Decimal: 2,
        BiaoYangNongDu: 0,
        ContentTip: '液位计：无',
        ContentTip1: '',
        ContentTip2: '',

    },
    //   gps
    GPSLongitude: {
        ID: "GPSLongitude",
        mlName: "GPS",
        Name: "经度",
        isAlone: true,//单因子
        Code: "e01101",
        Series: '',
        LastTestData: '--',
        Unit: '°',
        Decimal: 2,
    },
    GPSLatitude: {
        ID: "GPSLatitude",
        mlName: "GPS",
        Name: "纬度",
        isAlone: true,//单因子
        Code: "e01102",
        Series: '',
        LastTestData: '--',
        Unit: '°',
        Decimal: 2,
    },
    QX: {
        ID: 'QX',
        Code: 'QX',
        mlName: "气象",
        Name: "气象",
        isAlone: false,//单因子
        ComStatus: -1,//通讯状态
        ComStatusText: "通讯断开",
        QXWenDu: {
            ID: "QXWenDu",
            mlName: 'QXWenDu',
            Name: "大气温度",
            Code: "e01001",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '℃',
            Decimal: 2,
            IsQX: true,
        },
        QXShiDu: {
            ID: "QXShiDu",
            mlName: 'QXShiDu',
            Name: "大气湿度",
            Code: "e01002",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '%',
            Decimal: 2,
            IsQX: true,
        },
        QXWindSpeed: {
            ID: "QXWindSpeed",
            mlName: 'QXWindSpeed',
            Name: "风速",
            Code: "e01301",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: 'm/s',
            Decimal: 2,
            IsQX: true,
        },
        QXWindDirection: {
            ID: "QXWindDirection",
            mlName: 'QXWindDirection',
            Name: "风向",
            Code: "e01302",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '°',
            Decimal: 2,
            IsQX: true,
        },
        QXYaLi: {
            ID: "QXYaLi",
            mlName: 'QXYaLi',
            Name: "压力",
            Code: "e01901",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: 'hpa',
            Decimal: 2,
            IsQX: true,
        },
        QXMinRainfall: {
            ID: "QXMinRainfall",
            mlName: 'QXMinRainfall',
            Name: "分钟降雨量",
            Code: "e01303",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: 'mm',
            Decimal: 2,
            IsQX: true,
        },
        QXHourRainfall: {
            ID: "QXHourRainfall",
            mlName: 'QXHourRainfall',
            Name: "小时降雨量",
            Code: "e013031",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: 'mm',
            Decimal: 2,
            IsQX: true,
        },
        QX24HourRainfall: {
            ID: "QX24HourRainfall",
            mlName: 'QX24HourRainfall',
            Name: "24小时降雨量",
            Code: "e013032",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: 'mm',
            Decimal: 2,
            IsQX: true,
        },
        QXLeiJiRainfall: {
            ID: "QXLeiJiRainfall",
            mlName: 'QXLeiJiRainfall',
            Name: "累计降雨量",
            Code: "e013033",
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: 'mm',
            Decimal: 2,
            IsQX: true,
        },
    },
    ZFL: {
        ID: "ZFL",
        mlName: "ZFL",
        Name: "蒸发量",
        isAlone: true,//单因子
        ComStatus: -1,//通讯状态
        ComStatusText: "通讯断开",
        Code: "e01902",
        Series: '',
        LastTestData: '--',
        Unit: 'mm',
        Decimal: 2,
    },
    BMS: {
        ID: 'BMS',
        Code: 'BMS',
        mlName: "电池",
        Name: "电池",
        isAlone: false,//单因子
        ComStatus: -1,//通讯状态
        ComStatusText: "通讯断开",
        BMS_surplus1: {
            ID: "BMS_surplus1",
            mlName: 'BMS_surplus1',
            Name: "电池1",
            Code: "e010041",
            batteryTotal: '',
            batteryRemaining: '',
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '%',
            Decimal: 2,
            IsBMS: true,
        },
        BMS_surplus2: {
            ID: "BMS_surplus2",
            mlName: 'BMS_surplus2',
            Name: "电池2",
            Code: "e010042",
            batteryTotal: '',
            batteryRemaining: '',
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '%',
            Decimal: 2,
            IsBMS: true,
        },
        BMS_surplus3: {
            ID: "BMS_surplus3",
            mlName: 'BMS_surplus3',
            Name: "电池3",
            Code: "e010043",
            batteryTotal: '',
            batteryRemaining: '',
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '%',
            Decimal: 2,
            IsBMS: true,
        },
        BMS_surplus4: {
            ID: "BMS_surplus4",
            mlName: 'BMS_surplus4',
            Name: "电池4",
            Code: "e010044",
            batteryTotal: '',
            batteryRemaining: '',
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '%',
            Decimal: 2,
            IsBMS: true,
        },
        BMS_surplus5: {
            ID: "BMS_surplus5",
            mlName: 'BMS_surplus5',
            Name: "电池5",
            Code: "e010045",
            batteryTotal: '',
            batteryRemaining: '',
            LastTestData: '--',
            Series: '',
            ContentTip: '无',
            ContentTip1: '',
            ContentTip2: '',
            Unit: '%',
            Decimal: 2,
            IsBMS: true,
        },

    },
    // 

    // 水污染--流量
    Flow: {
        ID: "Flow",
        Code: "w00000",//因子编码
        Name: "流量",
        mlName: "流量",
        Series: '',
        isAlone: false,//单因子
        ComStatus: 0,
        ComStatusText: '通讯断开',
        LastTestTime: "--",//末次测量时间
        LastTestData: '--',//末次测量数据
        LastTestDataFlag: '--',//末次测量数据标识

        LastTestFlagText: '--',//末次测量标识文本 
        Unit: "m³/h",
        Decimal: 2,
        SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59
        MeterStatus: -1,//仪表状态 0：空闲、1：水样……
        realFlow: {
            ID: "realFlow",
            Code: "e01203",//因子编码
            Name: "瞬时流量",
            mlName: "瞬时流量",
            IsFlow: true,
            ComStatus: 0,
            ComStatusText: '通讯断开',
            LastTestTime: "--",//末次测量时间
            LastTestData: '--',//末次测量数据
            LastTestDataFlag: '--',//末次测量数据标识

            LastTestFlagText: '--',//末次测量标识文本 
            Unit: "m³/h",
            Decimal: 2,
            SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59
            MeterStatus: -1,//仪表状态 0：空闲、1：水样……
        },
        CumulativeFlow: {
            ID: "CumulativeFlow",
            Code: "e01204",//因子编码
            Name: "累计流量",
            mlName: "累计流量",
            IsFlow: true,
            ComStatus: 0,
            ComStatusText: '通讯断开',
            LastTestTime: "--",//末次测量时间
            LastTestData: '--',//末次测量数据
            LastTestDataFlag: '--',//末次测量数据标识
            LastTestFlagText: '--',//末次测量标识文本 
            Unit: "m³",
            Decimal: 2,
            SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59
            MeterStatus: -1,//仪表状态 0：空闲、1：水样……
        },
        // 液位
        WaterLevelFlow: {
            ID: "WaterLevelFlow",
            Code: "e01201",//因子编码
            Name: "水位",
            mlName: "水位",
            IsFlow: true,
            ComStatus: 0,
            ComStatusText: '通讯断开',
            LastTestTime: "--",//末次测量时间
            LastTestData: '--',//末次测量数据
            LastTestDataFlag: '--',//末次测量数据标识
            LastTestFlagText: '--',//末次测量标识文本 
            Unit: "m³",
            Decimal: 2,
            SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59
            MeterStatus: -1,//仪表状态 0：空闲、1：水样……
        },
    },


    ZJS: {
        ID: 'ZJS',
        Code: 'ZJS',
        Name: "重金属",
        mlName: 'HM',
        isAlone: false,//单因子
        ComStatus: 0,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatusText: '未知',

        SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59

        Qian: {
            ID: "Qian",
            mlName: '铅',
            Name: "铅",
            Code: "w20120",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 5,
            BiaoYangHeChaNongDu: 0,
            IsZJS: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        Ge: {
            ID: "Ge",
            mlName: '镉',
            Name: "镉",
            Code: "w20115",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 5,
            BiaoYangHeChaNongDu: 0,
            IsZJS: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        Tong: {
            ID: "Tong",
            mlName: '铜',
            Name: "铜",
            Code: "w20122",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 5,
            BiaoYangHeChaNongDu: 0,
            IsZJS: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        Xin: {
            ID: "Xin",
            mlName: '锌',
            Name: "锌",
            Code: "w20123",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangHeChaNongDu: 0,
            IsZJS: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },

    },

    VOCs: {
        ID: 'VOCs',
        Code: 'VOCs',
        Name: "VOCs",
        mlName: 'VOC',
        isAlone: false,//单因子
        ComStatus: -1,//通讯状态
        ComStatusText: "通讯断开",
        MeterStatusText: '未知',
        SysTime: "--",//系统时间/仪表时间 2020-11-26 17:04:59

        ErLvYiWan12: {
            ID: "ErLvYiWan12",
            mlName: '12二氯乙烷',
            Name: "1,2—二氯乙烷",
            Code: "w24017",
            LastTestData: '10',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        JiaBen: {
            ID: "JiaBen",
            mlName: '甲苯',
            Name: "甲苯",
            Code: "w25003",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        LvBen: {
            ID: "LvBen",
            mlName: '氯苯',
            Name: "氯苯",
            Code: "w25010",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 2,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        ErLvBen12: {
            ID: "ErLvBen12",
            mlName: '12二氯苯',
            Name: "1,2—二氯苯",
            Code: "w25011",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        ErLvBen14: {
            ID: "ErLvBen14",
            mlName: '14二氯苯',
            Name: "1,4—二氯苯",
            Code: "w25013",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        YiBingBen: {
            ID: "YiBingBen",
            mlName: '异丙苯',
            Name: "异丙苯",
            Code: "w25034",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        BenYiXi: {
            ID: "BenYiXi",
            mlName: '苯乙烯',
            Name: "苯乙烯",
            Code: "w25038",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 2,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        DuiWenErJiaBen: {
            ID: "DuiWenErJiaBen",
            mlName: '对间二甲苯',
            Name: "对、间二甲苯",
            Code: "w25073",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        SanXiuJiaWan: {
            ID: "SanXiuJiaWan",
            mlName: '三溴甲烷',
            Name: "三溴甲烷",
            Code: "w24009",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        SanLvJiaWan: {
            ID: "SanLvJiaWan",
            mlName: '三氯甲烷',
            Name: "三氯甲烷",
            Code: "w24004",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        LinErJiaBen: {
            ID: "LinErJiaBen",
            mlName: '邻二甲苯',
            Name: "邻二甲苯",
            Code: "w25006",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        YiErLvYiXi11: {
            ID: "YiErLvYiXi11",
            mlName: '11二氯乙烯',
            Name: "1,1—二氯乙烯",
            Code: "w24047",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 6,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        YiErLvYiXi12: {
            ID: "YiErLvYiXi12",
            mlName: '12二氯乙烯',
            Name: "1,2-二氯乙烯",
            Code: "w24048",
            LastTestData: '--',
            data1: '--',
            data2: '--',
            Unit: 'mg/L',
            Decimal: 6,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        YiBen: {
            ID: "YiBen",
            mlName: '乙苯',
            Name: "乙苯",
            Code: "w25004",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 3,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        ErLvJiaWan: {
            ID: "ErLvJiaWan",
            mlName: '二氯甲烷',
            Name: "二氯甲烷",
            Code: "w24003",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        SanLvYiXi: {
            ID: "SanLvYiXi",
            mlName: '三氯乙烯',
            Name: "三氯乙烯",
            Code: "w24049",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        SiLvYiXi: {
            ID: "SiLvYiXi",
            mlName: '四氯乙烯',
            Name: "四氯乙烯",
            Code: "w24050",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 4,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        },
        Ben: {
            ID: "Ben",
            mlName: '苯',
            Name: "苯",
            Code: "w25002",
            LastTestData: '--',
            Unit: 'mg/L',
            Decimal: 5,
            BiaoYangNongDu: 0,
            IsVOCs: true,
            ZhouCheck: function ()//周考核判断
            {
                return true;//无考核标准
            }
        }
    },

    CMD: {
        YiBiao: "{0}命令={1}",
        YiBiao_CB: "{0}_C标={1}",
        // YiBiao_VB: "{0}_V标={1}",
        YiBiao_V1: "{0}_V1={1}",
        YiBiao_V3: "{0}_V3={1}",
        YiBiao_JBTimerSpance: "{0}_jb_定时间隔={1}",
        YiBiao_JBStop: "{0}_jb_命令=0;{1}命令=11",
        YiBiao_JBReset: "{0}_jb_清除错误=0;{1}命令=20",
        YiBiao_JBWash: "{0}_jb_命令=9",
        YiBiao_KuaDuZhi: "{0}跨度值={1}",
        YiBiao_BiaoYangHeChaNongDu: "{0}标样核查标样浓度={1}",
        YiBiao_WC_BiaoYangHeChaNongDu: "{0}标样浓度={1}",
        YiBiao_LiangChengPiaoYiNongDu: "{0}量程漂移标样浓度={1}",
        YiBiao_LingDianPiaoYiNongDu: "{0}零点漂移标样浓度={1}",
        YiBiao_ShuiYangCeShiNongDu: "{0}水样测试标样浓度={1}",
        YiBiao_KongBaiCeShiNongDu: "{0}空白测试标样浓度={1}",
        YiBiao_GaoJingZiDongFuWei: "{0}告警自动复位={1}",
        YiBiao_ShiJiYuLiang: "{0}试剂余量={1}",
        YiBiao_ShiJiZongLiang: "{0}试剂总量={1}",
        YiBiao_ShiJiXiaXian: "{0}试剂下限={1}",
        YiBiao_ShiJiDaoQiShiJiian: "{0}试剂到期时间={1}",

        YiBiao_ZhiKongYuJingYuZhi: "{0}质控预警阀值={1}",
        Alarm_PHHengZhiCiShu: 'pH恒值判断次数={0}',
        Alarm_ShuiYangHengZhiCiShu: '水样恒值判断次数={0}',
        Alarm_YunWeiYuJingTianShu: '运维预警天数={0}',

        PLC_Mode: "plc_模式={0};开启日质控={1};开启调试模式={2}",
        PLC_BengBuShuiShiJian: "plc_泵补水时间={0}",

        PLC_QingXiShunXu: "plc_清洗顺序={0}",
        PLC_CaiShuiShunXu: "plc_采水顺序={0}",
        PLC_PeiShuiShunXu: "plc_配水顺序={0}",
        PLC_CeLiangShunXu: "plc_测量顺序={0}",

        PLC_PenLinBengQiDongWenDu: "喷淋泵启动温度={0}",
        PLC_PenLinBengGuanBiWenDu: "喷淋泵关闭温度={0}",

        PLC_ZhengFaYiZengLiang: "蒸发仪增量={0}",
        PLC_ZhngFaYiJiSuanShiJian: "蒸发量计算时间={0}",

        PLC_BengQuShuiShiJian: "plc_泵{0}取水时间={1}",
        PLC_ChuZaoZhouQi: "plc_除藻周期={0}",
        PLC_PenLinBeng: "plc_喷淋泵控制={0}",


        PLC_ChenDianShiJian: "plc_沉淀时间={0}",
        PLC_SV: "plc_SV{0}控制={1}",
        PLC_SVL: "plc_SVL{0}控制={1}",
        Plc_SVC: "plc_SVC{0}控制={1}",

        PLC_M: "plc_M{0}控制={1}",
        PLC_KongYaJi: "plc_空压机控制={0}",
        PLC_DanCiCeLiang: "plc_单次测量=True",
        PLC_LiuYang: "plc_留样=True",
        PLC_ChuZao: "plc_除藻=True",
        PLC_QingXi: "plc_清洗=True",
        PLC_BaoJingFuWei: "plc_报警复位=0",
        PLC_DaiJi: "plc_待机=True",
        PLC_WuCanLianXu: "plc_五参数连续={0}",
        PLC_TingJi: "plc_停机=True",
        PLC_HeChaStatus: "plc_{0}核查={1}",
        PLC_JiaBiaoStatus: "plc_{0}加标={1}",
        PLC_NH3_HeCha: "plc_NH3核查=True",
        PLC_TN_HeCha: "plc_TN核查=True",
        PLC_TP_HeCha: "plc_TP核查=True",
        PLC_COD_HeCha: "plc_COD核查=True",
        PLC_NH3_JB: "plc_NH3加标=True",
        PLC_TN_JB: "plc_TN加标=True",
        PLC_TP_JB: "plc_TP加标=True",
        PLC_COD_JB: "plc_COD加标=True",
        PLC_MoRenQuShuiBeng: "plc_默认取水泵={0}",
        PLC_WuCanLianXuChuFa: "plc_五参数触发={0}",
        PLC_ZhengDianChuFa: "plc_整点触发={0}",
        PLC_ShangDianQingXi: "plc_上电清洗={0}",

        PLC_ShangQingXiShui: "plc_上水功能控制={0}",
        PLC_CaiYangBeiRunXi: "plc_采样杯润洗={0}",
        PLC_TN_BiaoYeQieFa: "plc_TN标液切换阀={0}",
        PLC_COD_BiaoYeQieFa: "plc_COD标液切换阀={0}",
        PLC_TP_BiaoYeQieFa: "plc_TP标液切换阀={0}",
        PLC_NH3_BiaoYeQieFa: "plc_NH3标液切换阀={0}",
        PLC_TN_JBQieFa: "plc_TN加标回收切换阀={0}",
        PLC_COD_JBQieFa: "plc_COD加标回收切换阀={0}",
        PLC_TP_JBQieFa: "plc_TP加标回收切换阀={0}",
        PLC_NH3_JBQieFa: "plc_NH3加标回收切换阀={0}",
        PLC_BengJiaoTiJianGe: "plc_泵阀交替间隔={0}",
        PLC_NeiGuanQingXiShiJian: "plc_内管路清洗时间={0}",
        PLC_WaiGuanQingXiShiJian: "plc_外管路清洗时间={0}",
        PLC_YaLiXiaXian: "plc_压力报警下限={0}",
        PLC_ChuZaoCiShu: "plc_除藻间隔次数={0}",

        PLC_CaiYangBeiChenDianShiJian: "plc_采样杯沉淀时间={0}",
        PLC_TPCaiYangBeiChenDianShiJian: "plc_TP采样杯沉淀时间={0}",
        PLC_TNCaiYangBeiChenDianShiJian: "plc_TN采样杯沉淀时间={0}",
        PLC_CODCaiYangBeiChenDianShiJian: "plc_COD采样杯沉淀时间={0}",
        PLC_NH3CaiYangBeiChenDianShiJian: "plc_NH3采样杯沉淀时间={0}",
        PLC_CODCRCaiYangBeiChenDianShiJian: "plc_CODCR采样杯沉淀时间={0}",

        PLC_ZengYaBeng1QuShuiShiJian: "plc_增压泵1取水时间={0}",
        PLC_ZengYaBeng2QuShuiShiJian: "plc_增压泵2取水时间={0}",
        //浊度预处理   
        PLC_ZhuoDuYuChuLi: '开启浊度预处理={0}',
        PLC_TPYuChuLi: '开启TP浊度预处理={0}',
        PLC_TPShangXian: 'TP浊度预处理阀值={0}',

        // 离心机
        PLC_TPLXJ: 'plc_TP离心机控制={0}',
        PLC_TNLXJ: 'plc_TN离心机控制={0}',
        PLC_NH3LXJ: 'plc_NH3离心机控制={0}',
        PLC_CODLXJ: 'plc_COD离心机控制={0}',
        PLC_CODcrLXJ: 'plc_CODCR离心机控制={0}',
        PLC_LXJ: 'lxj_离心机控制={0}',

        // 监测水类型
        SYS_JianCeShuiLeiXing: '监测水类型={0}',
        SYS_WuCanXiaoShiCeLiang: "五参数小时测量={0}",
        SYS_YuanChengFanKong: "远程反控={0}",
        SYS_YuanChengJiaBiaoCaiShui: "远程加标采水={0}",

        SYS_LingDianShiJian: "零点核查时间={0}",
        SYS_LingDianJianGe: "零点核查间隔={0}",
        SYS_KuaDuShiJian: "跨度核查时间={0}",
        SYS_KuaDuJianGe: "跨度核查间隔={0}",
        SYS_PingXingYangShiJian: "平行样时间={0}",
        SYS_PingXingYangJianGe: "平行样间隔={0}",
        SYS_BiaoYangHeChaShiJian: "标样核查时间={0}",
        SYS_BiaoYangHeChaJianGe: "标样核查间隔={0}",
        SYS_JiaBiaoHuiShouShiJian: "加标回收时间={0}",
        SYS_JiaBiaoHuiShouJianGe: "加标回收间隔={0}",
        SYS_ZiDongJiaoZhunShiJian: "自动校准时间={0}",
        SYS_ZiDongJiaoZhunJianGe: "自动校准间隔={0}",

        SYS_ZiDongJianGeXiaoShi: "自动控制间隔小时数={0}",
        SYS_PlatformIP: "中心站IP={0}",
        SYS_PlatformPort: "中心站端口={0}",
        SYS_MN: "水站编号={0}",
        SYS_id: "水站行政编号={0}",
        SYS_PointName: "站点名称={0}",
        SYS_ProtocolType: "协议类型={0}",
        SYS_PlatformName: "平台名称={0}",
        SYS_PlatformPW: "中心站通讯密码={0}",
        SYS_PlatformHeartInterval: "通讯心跳间隔={0}",
        SYS_PlatformReconInterval: "通讯断开重连间隔={0}",
        // SYS_PlatformTimeOut: "通讯超时时间={0}",
        // SYS_PlatformRecCount: "超时重试次数={0}",
        SYS_ShouDongShuJuBiaoShi: "手动数据标识={0}",
        // SYS_ShiShiShuJuJianGe: "实时数据间隔={0}",
        SYS_UserRoleID: "当前用户={0}",
        SYS_SystemName: "系统名称={0}",
        SYS_CompanyName: "公司名称={0}",
        SYS_YunWeiCompanyName: "运维单位={0}",
        SYS_SoftVersion: "软件版本={0}",
        SYS_OptUserName: "运维姓名={0}",
        SYS_OptUserPhone: "运维电话={0}",
        SYS_ShuJuBuChuan: "数据补传=CN#{0}|ST#{1}|ET#{2}|ID#{3}",

        SYS_HuiFuXiMoRenTongCanSu: "恢复默认系统参数=true",

        SYS_Upload_ShiShiShuJuJianGe: "实时数据间隔={0}",
        SYS_Upload_FenZhongShuJuJianGe: "分钟数据间隔={0}",
        SYS_Upload_XiTongZhuangTaiJianGe: "系统状态间隔={0}",
        SYS_Upload_TongXunChaoShiShiJian: "通讯超时时间={0}",
        SYS_Upload_ChaoShiChongShiCiShu: "超时重试次数={0}",
        SYS_Upload_ShiShiShuJu: "实时数据自动上传={0}",
        SYS_Upload_XiaoShiShuJu: "小时数据自动上传={0}",
        SYS_Upload_BiaoYangHeCha: "标样核查自动上传={0}",
        SYS_Upload_JiaBiaoHuiShou: "加标回收自动上传={0}",
        SYS_Upload_PingXingYang: "平行样自动上传={0}",
        SYS_Upload_LingDianHeCha: "零点核查自动上传={0}",
        SYS_Upload_KuaDuHeCha: "跨度核查自动上传={0}",
        SYS_Upload_KongBaiCeShi: "空白测试自动上传={0}",
        SYS_Upload_YiQiAndShuCaiYiRiZhi: "系统日志自动上传={0}",
        SYS_Upload_YiQiAndShuCaiYiZhuangTai: "系统状态自动上传={0}",
        SYS_Upload_YiQiCanShu: "仪器参数自动上传={0}",
        SYS_Upload_LiuYangXinXi: "留样数据自动上传={0}",
        SYS_Upload_ShuCaiYiKaiJiShiJian: "开机时间自动上传={0}",
        SYS_Upload_ShiFouYingDa: "有应答报文={0}",

        WC_PH: "PH命令={0}",
        WC_ShuiWen: "水温命令={0}",
        WC_HunZhuoDu: "浊度命令={0}",
        WC_DianDaoLv: "电导率命令={0}",
        WC_RongJieYang: "溶解氧命令={0}",
        WC_PH_BiaoZhunZhi: "PH标样浓度={0}",
        WC_ShuiWen_BiaoZhunZhi: "水温标样浓度={0}",
        WC_RongJieYang_BiaoZhunZhi: "溶解氧标样浓度={0}",
        WC_DianDaoLv_BiaoZhunZhi: "电导率标样浓度={0}",
        WC_HunZhuoDu_BiaoZhunZhi: "浊度标样浓度={0}",
        WC_ZaoMiDu_BiaoZhunZhi: "藻密度标样浓度={0}",
        WC_YeLvSu_BiaoZhunZhi: "叶绿素标样浓度={0}",
        ShuiZhongYou_BiaoZhunZhi: "水中油标样浓度={0}",
        ShengWuDuXing_BiaoZhunZhi: "生物毒性标样浓度={0}",

        // 留样
        LY_MoShi: "留样模式={0}",
        LY_XingHao: "留样型号={0}",
        LY_ShouDongLiuYang: "手动留样=True",
        LY_ShouDongPaiKong: "手动排空=0",



        // 采样
        CY_CaiShuiMoShi: "采样器采水模式={0}",
        CY_CaiYangJianGeShiJian: "采样间隔时间={0}",
        CY_YanShiCeLiangJianGe: "延时测量间隔={0}",
        CY_CaiYangQiml: "采样器命令={0}", //采样器命令=(0:停止/1:启动/2:采样/3:供样/4:留样)

        // 预警
        YJ_ShiJiYuJing: "启用试剂预警={0}",
        YJ_YunWeiYuJing: "启用运维预警={0}",
        YJ_ShuJuYuJing: "启用数据预警={0}",
        YJ_BeiJianYuJing: "启用备件预警={0}",

        //污染源日质控命令:
        RZK_StopStatus: '{0}_结束日质控=true',//0=TP,1=true/false
        RZK_StartStatus: '{0}_日质控正常=true'//0=TP,1=true/false



    },

    //四参数
    Meters: function () {
        var m = [this.TN, this.TP, this.COD, this.CODCR, this.NH3];
        var list = pollutant

        list = list.filter(function (item, index, array) {
            //元素值，元素的索引，原数组。

            return item.isEnable == true;
        });
        let lists = []

        m.map(function (item, index) {
            // if (item.JB_Status==""||item.JB_Status==null) {
            //     item.JB_StatusText="通讯断开"
            // }else{
            //     item.JB_StatusText="通讯正常"

            // }
            list.map(function (items, index) {
                // if (item.Name == items.name) {
                // this[items.id].Name = items.name;
                // this[items.id].Series = items.Series;
                // this[items.id].IsSelect = true;
                // if (this[items.id] == '水温') {
                //     this[items.id].IsSelect = false;
                // }


                if (item.Code == items.code) {
                    item.Name = items.name;
                    item.Series = items.Series;

                    item.Unit = items.unit;
                    item.Decimal = items.decimal;
                    item.sort = items.sort;
                    item.isMain = items.isMain;
                    item.isJiaBiao = items.isJiaBiao;

                    lists.push(item)
                }
                if (items.name == '采样器') {
                    FlowChart['CaiYangQi_22'].visible = items.isMain;
                }
            })


        })
        // 流程图动态显示采样器
        list.map(function (items, index) {

            if (items.name == '采样器') {

                lists.push(items)

            }
        })
        lists.sort(function (a, b) {
            return a.sort - b.sort
        });

        return lists;
    },


    //四参数+五参数
    MetersWC: function () {
        var m = [
            this.TN,
            this.TP,
            this.CODCR,
            this.COD,
            this.NH3,
            this.Flow,

            this.WC.PH,
            this.WC.DianDaoLv,
            this.WC.RongJieYang,
            this.WC.HunZhuoDu,
            this.WC.ShuiWen,
            this.WC.XuanFuWu,

            this.ZaoMiDu,
            this.YeLvSu,
            // this.ZF.DaQiWenDu,
            // this.ZF.DaQiShiDu,

            this.ZJS.Qian,
            this.ZJS.Ge,
            this.ZJS.Tong,
            this.ZJS.Xin,

            this.VOCs.Ben,
            this.VOCs.BenYiXi,
            this.VOCs.DuiWenErJiaBen,
            this.VOCs.ErLvBen12,
            this.VOCs.ErLvBen14,
            this.VOCs.ErLvJiaWan,
            this.VOCs.ErLvYiWan12,
            this.VOCs.JiaBen,
            this.VOCs.LinErJiaBen,
            this.VOCs.LvBen,
            this.VOCs.SanLvJiaWan,
            this.VOCs.SanLvYiXi,
            this.VOCs.SanXiuJiaWan,
            this.VOCs.SiLvYiXi,
            this.VOCs.YiBen,
            this.VOCs.YiBingBen,
            this.VOCs.YiErLvYiXi11,
            this.VOCs.YiErLvYiXi12
        ];
        var $this = this;

        var list = pollutant

        list = list.filter(function (item, index, array) {
            //元素值，元素的索引，原数组。

            return item.isEnable == true;
        });

        let lists = []
        m.map(function (item, index) {
            if (item.IsWC) {
                item.ComStatus = $this.WC.ComStatus;
                if ($this.WC.ComStatus > 0) {
                    item.MeterStatus = 0;
                    item.MeterStatusText = '空闲';
                    item.ComStatusText = '通讯正常';
                } else {
                    item.MeterStatus = -1;
                    item.MeterStatusText = '未知';
                    item.ComStatusText = '通讯断开';
                }

            }
            if (item.IsZF) {
                item.ComStatus = $this.ZF.ComStatus;
                if ($this.ZF.ComStatus == 1) {
                    item.MeterStatus = 0;
                    item.MeterStatusText = '空闲';
                    item.ComStatusText = '通讯正常';
                } else {
                    item.MeterStatus = -1;
                    item.MeterStatusText = '未知';
                    item.ComStatusText = '通讯断开';
                }
            }


            list.map(function (items, index) {
                // if (item.Name == items.name) {
                if (item.Code == items.code) {
                    item.Name = items.name;
                    item.Series = items.Series;
                    item.Unit = items.unit;
                    item.Decimal = items.decimal;
                    item.sort = items.sort;
                    item.isMain = items.isMain;
                    lists.push(item)
                }
            })
        });
        // console.log(lists)
        lists.sort(function (a, b) {
            return a.sort - b.sort
        });

        // lists.push(this.ZF.DaQiWenDu)
        // lists.push(this.ZF.DaQiShiDu)

        return lists;
    },


    //1、config.js文件，增加父级对象
    //2、流量、五参、vocs、重金属，结构统一
    //3、写一个公共输出的方法
    //4、总结所有页面用到的情况
    //实时数据：只需要加载平铺
    //仪表控制：只需要加载平铺

    //仪表因子数据
    MetersData: function () {
        //全局变量--仪表及因子
        var m = [];

        m = [
            this.TN,
            this.TP,
            this.COD,
            this.CODCR,
            this.NH3,
            this.WC,
            // this.WC.PH,
            this.ZF,
            this.LY,
            this.CY,
            this.ZaoMiDu,
            this.YeLvSu,
            this.ZJS,
            this.VOCs,
            this.Flow, //不能和 this.YeWeiJi,一起显示
            this.SZY,
            this.SWDX,
            this.BenAn,
            this.YeWeiJi,  //   不能和 this.Flow,一起显示
            this.GPSLongitude,
            this.GPSLatitude,
            this.QX,
            this.ZFL,
            this.BMS

        ];

        // config赋值
        var list = pollutant;
        //过滤config未配置的仪表    
        list = list.filter(function (item, index, array) {
            //元素值，元素的索引，原数组。
            return item.isEnable == true;
        });
        //输出仪表及因子集合
        let lists = []
        var $this = this;

        // 过滤系统内所有仪表及因子集合
        m.map(function (item, index) {

            let _cur = list.filter(function (it) {
                // console.log('it.name=', it.name)
                return item.ID == it.id && it.isEnable;
            });
            // 单仪表赋值
            if (_cur.length > 0) {
                if (item.ID == 'WC') {
                    item.ComStatus = $this.WC.ComStatus;

                    if ($this.WC.ComStatus > 0) {
                        item.MeterStatus = 0;
                        item.MeterStatusText = '空闲';
                        item.ComStatusText = '通讯正常';
                    } else {
                        item.MeterStatus = -1;
                        item.MeterStatusText = '未知';
                        item.ComStatusText = '通讯断开';
                    }
                }
                if (item.ID == 'ZF') {
                    item.ComStatus = $this.ZF.ComStatus;
                    if ($this.ZF.ComStatus == 1) {
                        item.MeterStatus = 0;
                        item.MeterStatusText = '空闲';
                        item.ComStatusText = '通讯正常';
                    } else {
                        item.MeterStatus = -1;
                        item.MeterStatusText = '未知';
                        item.ComStatusText = '通讯断开';
                    }
                }
                if (item.ID == 'ZJS') {
                    item.ComStatus = $this.ZJS.ComStatus;
                    if ($this.ZJS.ComStatus == 1) {
                        item.MeterStatus = 0;
                        item.MeterStatusText = '空闲';
                        item.ComStatusText = '通讯正常';
                    } else {
                        item.MeterStatus = -1;
                        item.MeterStatusText = '未知';
                        item.ComStatusText = '通讯断开';
                    }
                }
                if (item.ID == 'VOCs') {
                    item.ComStatus = $this.VOCs.ComStatus;
                    if ($this.VOCs.ComStatus == 1) {
                        item.MeterStatus = 0;
                        item.MeterStatusText = '空闲';
                        item.ComStatusText = '通讯正常';
                    } else {
                        item.MeterStatus = -1;
                        item.MeterStatusText = '未知';
                        item.ComStatusText = '通讯断开';
                    }
                }
                if (item.ID == 'QX') {
                    item.ComStatus = $this.QX.ComStatus;
                    if ($this.QX.ComStatus == 1) {
                        item.MeterStatus = 0;
                        item.MeterStatusText = '空闲';
                        item.ComStatusText = '通讯正常';
                    } else {
                        item.MeterStatus = -1;
                        item.MeterStatusText = '未知';
                        item.ComStatusText = '通讯断开';
                    }
                }
                if (item.ID == 'Flow') {
                    item.ComStatus = $this.Flow.ComStatus;
                    if ($this.Flow.ComStatus == 1) {
                        item.MeterStatus = 0;
                        item.MeterStatusText = '空闲';
                        item.ComStatusText = '通讯正常';
                    } else {
                        item.MeterStatus = -1;
                        item.MeterStatusText = '未知';
                        item.ComStatusText = '通讯断开';
                    }
                }

                let items = _cur[0];
                item.Name = items.name;
                item.Series = items.Series;
                item.Factory = items.Factory;
                item.Unit = items.unit;
                item.Decimal = items.decimal;
                item.sort = items.sort;
                item.isMain = items.isMain;
                item.isJiaBiao = items.isJiaBiao;
                if (item.ComStatus > 0) {
                } else {
                    item.LastTestData = '--'
                }
                if (items.name == '采样器') {
                    if (SoftType() == 22)
                        FlowChart['CaiYangQi_22'].visible = item.isMain;
                }
            }
            // 仪表下因子赋值
            if (!item.isAlone) {
                list.map(function (bitem) {

                    if (item[bitem.id] && bitem.code == item[bitem.id].Code) {

                        item[bitem.id].Name = bitem.name;
                        // item[bitem.id].Series = bitem.Series;

                        item[bitem.id].Unit = bitem.unit;
                        item[bitem.id].Decimal = bitem.decimal;
                        item[bitem.id].sort = bitem.sort;
                        item[bitem.id].isMain = bitem.isMain;
                        item[bitem.id].isJiaBiao = bitem.isJiaBiao;
                        item[bitem.id].ComStatus = item.ComStatus;
                        item[bitem.id].ComStatusText = item.ComStatusText;
                        item[bitem.id].MeterStatus = item.MeterStatus;
                        item[bitem.id].MeterStatusText = item.MeterStatusText;
                        if (item.ComStatus > 0) {
                        } else {
                            item[bitem.id].LastTestData = '--'
                        }
                        item[bitem.id].Series = item.Series;
                        item[bitem.id].Factory = item.Factory;
                        lists.push(item[bitem.id]);
                    }
                });
            }

            if (_cur.length > 0) {
                lists.push(item);
            }

        })
        // 因子排序
        lists.sort(function (a, b) {
            return a.sort - b.sort
        });
        return lists;
    },
    MetersDataPP: function () {

        return this.MetersData().filter((m) => m.ID != 'WC' && m.ID != 'CYQ' && m.ID != 'LY' && m.ID != 'ZJS' && m.ID != 'VOCs' && m.ID != 'QX' && m.ID != 'ZF' && m.ID != 'Flow');
    },
    MetersDataLCTPP: function () {

        return this.MetersData().filter((m) => m.ID != 'WC' && m.ID != 'CYQ' && m.ID != 'LY' && m.ID != 'ZJS' && m.ID != 'VOCs' && m.ID != 'ZF');
    },
    // 污染源数据查询
    MetersDataWSPP: function () {

        return this.MetersData().filter((m) => m.ID != 'WC' && m.ID != 'CYQ' && m.ID != 'LY' && m.ID != 'ZJS' && m.ID != 'VOCs' && m.ID != 'QX' && m.ID != 'ZF');
    },
    MetersDataSYPP: function () {

        return this.MetersData().filter((m) => m.ID != 'WC' && m.ID != 'CYQ' && m.ID != 'LY' && m.ID != 'ZJS' && m.ID != 'ZF' && m.ID != 'Flow');
    }
};

// SDL_Global.SoftType = 21;
// getMainChart();

/**
 * @function 更新全局变量
 * @param {Array}   pushData   推送数据
 * @param  {String?} version  仪表版本 （new|old）
 * 
 */
function updateGlobalData(pushData, version) {

    // console.log('pushData=', pushData);
    // var Data = [];//接收到的数据
    if (!FlowChart.BaseMap.isLoad) {
        SDL_Global.SoftType = SoftType();
        getMainChart();
        FlowChart.BaseMap.isLoad = true;
    }

    for (let i = 0; i < pushData.length; i++) {
        let it = pushData[i];
        it.Val = it.Val == null ? '--' : it.Val;
        switch (it.Name) {
            // 浮船
            case "plc_系统工作正常":
                SDL_Global.PLC.SystemWorkState = (it.Val == false ? '异常' : '正常');
                break;
            case "plc_水样杯液位低":
                SDL_Global.PLC.ShuiYangYeWeiDi = it.Val;
                break;
            case "plc_水样杯液位高":
                SDL_Global.PLC.ShuiYangYeWeiGao = it.Val;
                break;
            case "plc_12V供电状态":
                SDL_Global.PLC.GongDianState12v = it.Val;
                break;
            case "plc_220V供电状态":
                SDL_Global.PLC.GongDianState220v = it.Val;
                break;
            case "plc_照明状态":
                SDL_Global.PLC.ZhaoMingState = (it.Val == false ? '关闭' : '开启');
                break;
            case "plc_废液桶1状态":
                SDL_Global.PLC.FeiYeTongState1 = it.Val;
                break;
            case "plc_废液桶2状态":
                SDL_Global.PLC.FeiYeTongState2 = it.Val;
                break;
            case "plc_废液桶3状态":
                SDL_Global.PLC.FeiYeTongState3 = it.Val;
                break;
            case "plc_废液桶4状态":
                SDL_Global.PLC.FeiYeTongState4 = it.Val;
                break;

            case "plc_总故障":
                SDL_Global.PLC.ZongGuZhang = it.Val;
                break;
            case "plc_采样泵1故障":
                SDL_Global.PLC.CaiYangBengAlarm1 = it.Val;
                break;
            case "plc_采样泵2故障":
                SDL_Global.PLC.CaiYangBengAlarm2 = it.Val;
                break;
            case "plc_12V供电故障":
                SDL_Global.PLC.GongDianAlarm12v = it.Val;
                break;
            case "plc_220V供电故障":
                SDL_Global.PLC.GongDianAlarm220v = it.Val;
                break;
            case "plc_漏水报警":
                SDL_Global.PLC.LouShuiAlarm = it.Val;
                break;
            case "plc_红外报警":
                SDL_Global.PLC.HongWaiAlarm = it.Val;
                break;
            case "plc_舱门状态":
                SDL_Global.PLC.CangMenState = (it.Val == false ? '关闭' : '开启');
                break;
            case "plc_喷淋泵状态":
                SDL_Global.PLC.PenLinBengState = it.Val;
                break;
            case "YGQ_com":
                SDL_Global.PLC.YanGanState = it.Val;
                break;
            case "YGQ_报警":
                SDL_Global.PLC.YanGanAlarm = (it.Val == false ? '否' : '是');
                break;
            // 电池
            case "BMS_1组总容量":
                SDL_Global.BMS.BMS_surplus1.batteryTotal = it.Val;
                break;
            case "BMS_2组总容量":
                SDL_Global.BMS.BMS_surplus2.batteryTotal = it.Val;
                break;
            case "BMS_3组总容量":
                SDL_Global.BMS.BMS_surplus3.batteryTotal = it.Val;
                break;
            case "BMS_4组总容量":
                SDL_Global.BMS.BMS_surplus4.batteryTotal = it.Val;
                break;
            case "BMS_5组总容量":
                SDL_Global.BMS.BMS_surplus5.batteryTotal = it.Val;
                break;
            case "BMS_1组剩余容量":
                SDL_Global.BMS.BMS_surplus1.batteryRemaining = it.Val;
                SDL_Global.BMS.BMS_surplus1.LastTestData = ((SDL_Global.BMS.BMS_surplus1.batteryRemaining / SDL_Global.BMS.BMS_surplus1.batteryTotal) * 100).toFixedFormat(SDL_Global.BMS.BMS_surplus1.Decimal);
                break;
            case "BMS_2组剩余容量":
                SDL_Global.BMS.BMS_surplus2.batteryRemaining = it.Val;
                SDL_Global.BMS.BMS_surplus2.LastTestData = ((SDL_Global.BMS.BMS_surplus2.batteryRemaining / SDL_Global.BMS.BMS_surplus2.batteryTotal) * 100).toFixedFormat(SDL_Global.BMS.BMS_surplus2.Decimal);
                break;
            case "BMS_3组剩余容量":
                SDL_Global.BMS.BMS_surplus3.batteryRemaining = it.Val;
                SDL_Global.BMS.BMS_surplus3.LastTestData = ((SDL_Global.BMS.BMS_surplus3.batteryRemaining / SDL_Global.BMS.BMS_surplus3.batteryTotal) * 100).toFixedFormat(SDL_Global.BMS.BMS_surplus3.Decimal);
                break;
            case "BMS_4组剩余容量":
                SDL_Global.BMS.BMS_surplus4.batteryRemaining = it.Val;
                SDL_Global.BMS.BMS_surplus4.LastTestData = ((SDL_Global.BMS.BMS_surplus4.batteryRemaining / SDL_Global.BMS.BMS_surplus4.batteryTotal) * 100).toFixedFormat(SDL_Global.BMS.BMS_surplus4.Decimal);

                break;
            case "BMS_5组剩余容量":
                SDL_Global.BMS.BMS_surplus5.batteryRemaining = it.Val;
                SDL_Global.BMS.BMS_surplus5.LastTestData = ((SDL_Global.BMS.BMS_surplus5.batteryRemaining / SDL_Global.BMS.BMS_surplus5.batteryTotal) * 100).toFixedFormat(SDL_Global.BMS.BMS_surplus5.Decimal);

                break;


            //  气象
            case "QX_风速":
                SDL_Global.QX.QXWindSpeed.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXWindSpeed.Decimal);
                break;
            case "QX_风向":
                SDL_Global.QX.QXWindDirection.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXWindDirection.Decimal);
                break;
            case "QX_温度":
                SDL_Global.QX.QXWenDu.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXWenDu.Decimal);
                break;
            case "QX_湿度":
                SDL_Global.QX.QXShiDu.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXShiDu.Decimal);
                break;
            case "QX_大气压力":
                SDL_Global.QX.QXYaLi.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXYaLi.Decimal);
                break;
            case "QX_分钟雨量":
                SDL_Global.QX.QXMinRainfall.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXMinRainfall.Decimal);
                break;
            case "QX_小时雨量":
                SDL_Global.QX.QXHourRainfall.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXHourRainfall.Decimal);
                break;
            case "QX_24小时雨量":
                SDL_Global.QX.QX24HourRainfall.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QX24HourRainfall.Decimal);
                break;
            case "QX_累计雨量":
                SDL_Global.QX.QXLeiJiRainfall.LastTestData = it.Val.toFixedFormat(SDL_Global.QX.QXLeiJiRainfall.Decimal);
                break;
            case "ZFY_com":
                SDL_Global.ZFL.ComStatus = it.Val;
                SDL_Global.ZFL.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "ZFY_蒸发量":
                SDL_Global.ZFL.LastTestData = it.Val.toFixedFormat(SDL_Global.ZFL.Decimal);
                break;
            case "GPS_经度":

                SDL_Global.GPSLongitude.LastTestData = it.Val.toFixedFormat(SDL_Global.GPSLongitude.Decimal);
                break;
            case "GPS_纬度":
                SDL_Global.GPSLatitude.LastTestData = it.Val.toFixedFormat(SDL_Global.GPSLatitude.Decimal);
                break;

            case "喷淋泵启动温度":
                SDL_Global.PLC.PenLinBengQiDongWenDu = it.Val;
                break;
            case "喷淋泵关闭温度":
                SDL_Global.PLC.PenLinBengGuanBiWenDu = it.Val;
                break;
            case "蒸发仪增量":
                SDL_Global.PLC.ZhengFaYiZengLiang = it.Val;
                break;
            case "蒸发量计算时间":
                SDL_Global.PLC.ZhngFaYiJiSuanShiJian = it.Val;
                break;



            case "plc_模式":
                SDL_Global.PLC.PLCMoShi = it.Val;
                break;
            case "plc_压力":
                SDL_Global.PLC.YaLi = it.Val.toFixedFormat(3);
                break;

            case "开启浊度预处理":
                SDL_Global.PLC.ZhuoDuYuChuLi = it.Val;
                break;
            case "开启TP浊度预处理":
                SDL_Global.PLC.TPYuChuLi = it.Val;
                break;
            case "TP浊度预处理阀值":
                SDL_Global.PLC.TPShangXian = it.Val;
                break;
            case "plc_TP过滤阀状态":
                SDL_Global.PLC.TPGuoLvFa = it.Val;
                break;

            case "plc_采水顺序":
                SDL_Global.PLC.CaiShuiShunXu = it.Val;
                break;
            case "plc_清洗顺序":
                SDL_Global.PLC.QingXiShunXu = it.Val;
                break;
            case "plc_配水顺序":
                SDL_Global.PLC.PeiShuiShunXu = it.Val;
                break;
            case "plc_测量顺序":
                SDL_Global.PLC.CeLiangShunXu = it.Val;
                break;
            case "plc_泵补水时间":
                SDL_Global.PLC.BengBuShuiShiJian = it.Val;
                break;
            case "plc_泵1取水时间":
                SDL_Global.PLC.Beng1QuShuiShiJian = it.Val;
                break;
            case "plc_泵2取水时间":
                SDL_Global.PLC.Beng2QuShuiShiJian = it.Val;
                break;
            case "plc_除藻周期":
                SDL_Global.PLC.ChuZaoZhouQi = it.Val;
                break;
            case "plc_除藻间隔次数":
                SDL_Global.PLC.ChuZaoCiShu = it.Val;
                break;
            case "plc_沉淀时间":
                SDL_Global.PLC.ChenDianShiJian = it.Val;
                break;
            case "plc_压力报警下限":
                SDL_Global.PLC.YaLiXiaXian = it.Val;
                break;
            case "plc_内管路清洗时间":
                SDL_Global.PLC.NeiGuanQingXiShiJian = it.Val;
                break;
            case "plc_外管路清洗时间":
                SDL_Global.PLC.WaiGuanQingXiShiJian = it.Val;
                break;
            case "plc_泵阀交替间隔":
                SDL_Global.PLC.BengJiaoTiJianGe = it.Val;
                break;

            case "plc_采样杯沉淀时间":
                SDL_Global.PLC.CaiYangBeiChenDianShiJian = it.Val;
                break;
            case "plc_TP采样杯沉淀时间":
                SDL_Global.PLC.TPCaiYangBeiChenDianShiJian = it.Val;
                break;
            case "plc_TN采样杯沉淀时间":
                SDL_Global.PLC.TNCaiYangBeiChenDianShiJian = it.Val;
                break;
            case "plc_NH3采样杯沉淀时间":
                SDL_Global.PLC.NH3CaiYangBeiChenDianShiJian = it.Val;
                break;
            case "plc_COD采样杯沉淀时间":
                SDL_Global.PLC.CODCaiYangBeiChenDianShiJian = it.Val;
                break;
            case "plc_CODCR采样杯沉淀时间":
                SDL_Global.PLC.CODCRCaiYangBeiChenDianShiJian = it.Val;
                break;

            case "plc_SV1状态":
                SDL_Global.PLC.SV1Status = it.Val;
                break;
            case "plc_SV2状态":
                SDL_Global.PLC.SV2Status = it.Val;
                break;
            case "plc_SV3状态":
                SDL_Global.PLC.SV3Status = it.Val;
                break;
            case "plc_SV4状态":
                SDL_Global.PLC.SV4Status = it.Val;
                break;
            case "plc_SV5状态":
                SDL_Global.PLC.SV5Status = it.Val;
                break;
            case "plc_SV6状态":
                SDL_Global.PLC.SV6Status = it.Val;
                break;
            case "plc_SV7状态":
                SDL_Global.PLC.SV7Status = it.Val;
                break;
            case "plc_SV8状态":
                SDL_Global.PLC.SV8Status = it.Val;
                break;
            case "plc_SV9状态":
                SDL_Global.PLC.SV9Status = it.Val;
                break;
            case "plc_SV10状态":
                SDL_Global.PLC.SV10Status = it.Val;
                break;
            case "plc_SV11状态":
                SDL_Global.PLC.SV11Status = it.Val;
                break;
            case "plc_SV12状态":
                SDL_Global.PLC.SV12Status = it.Val;
                break;
            case "plc_SV13状态":
                SDL_Global.PLC.SV13Status = it.Val;
                break;
            case "plc_SV14状态":
                SDL_Global.PLC.SV14Status = it.Val;
                break;
            case "plc_SV15状态":
                SDL_Global.PLC.SV15Status = it.Val;
                break;
            case "plc_SVC19状态":
                SDL_Global.PLC.SVC19Status = it.Val;
                break;
            case "plc_SVC20状态":
                SDL_Global.PLC.SVC20Status = it.Val;
                break;

            case "plc_SV19状态":
                SDL_Global.PLC.SV19Status = it.Val;
                break;
            case "plc_SV20状态":
                SDL_Global.PLC.SV20Status = it.Val;
                break;
            case "plc_SV21状态":
                SDL_Global.PLC.SV21Status = it.Val;
                break;
            case "plc_SV22状态":
                SDL_Global.PLC.SV22Status = it.Val;
                break;

            // 离心机
            case "plc_SV19状态":
                SDL_Global.PLC.SV19Status = it.Val;
                break;
            case "plc_SV20状态":
                SDL_Global.PLC.SV20Status = it.Val;
                break;
            case "plc_SV21状态":
                SDL_Global.PLC.SV21Status = it.Val;
                break;
            case "plc_SV22状态":
                SDL_Global.PLC.SV22Status = it.Val;
                break;
            case "plc_SVL19状态":
                SDL_Global.PLC.SVL19Status = it.Val;
                break;
            case "plc_SVL20状态":
                SDL_Global.PLC.SVL20Status = it.Val;
                break;
            case "plc_SVL21状态":
                SDL_Global.PLC.SVL21Status = it.Val;
                break;
            case "plc_SVL22状态":
                SDL_Global.PLC.SVL22Status = it.Val;
                break;
            case "plc_SVL23状态":
                SDL_Global.PLC.SVL23Status = it.Val;
                break;





            case "plc_TP离心机状态":
                SDL_Global.PLC.TPLXJStatus = it.Val;
                break;
            case "plc_TN离心机状态":
                SDL_Global.PLC.TNLXJStatus = it.Val;
                break;
            case "plc_NH3离心机状态":
                SDL_Global.PLC.NH3LXJStatus = it.Val;
                break;
            case "plc_COD离心机状态":
                SDL_Global.PLC.CODLXJStatus = it.Val;
                break;
            case "plc_CODCR离心机状态":
                SDL_Global.PLC.CODcrLXJStatus = it.Val;
                break;
            case "lxj_离心机状态":
                SDL_Global.PLC.LXJStatus = it.Val;
                break;
            case "LXJ_com":
                SDL_Global.PLC.LXJComStatus = it.Val;

                SDL_Global.PLC.LXJComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;


            case "plc_M1状态":
                SDL_Global.PLC.M1Status = it.Val;
                break;
            case "plc_M2状态":
                SDL_Global.PLC.M2Status = it.Val;
                break;
            case "plc_M3状态":
                SDL_Global.PLC.M3Status = it.Val;
                break;
            case "plc_M4状态":
                SDL_Global.PLC.M4Status = it.Val;
                break;
            case "plc_空压机状态":
                SDL_Global.PLC.KongYaJiStatus = it.Val;
                break;
            case "plc_M6状态":
                SDL_Global.PLC.M6Status = it.Val;
                break;
            case "plc_TP核查阀":
                SDL_Global.PLC.TP_HeChaStatus = it.Val;
                break;
            case "plc_TP加标阀":
                SDL_Global.PLC.TP_JiaBiaoStatus = it.Val;
                break;
            case "plc_TN核查阀":
                SDL_Global.PLC.TN_HeChaStatus = it.Val;
                break;
            case "plc_TN加标阀":
                SDL_Global.PLC.TN_JiaBiaoStatus = it.Val;
                break;
            case "plc_NH3核查阀":
                SDL_Global.PLC.NH3_HeChaStatus = it.Val;
                break;
            case "plc_NH3加标阀":
                SDL_Global.PLC.NH3_JiaBiaoStatus = it.Val;
                break;
            case "plc_COD核查阀":
                SDL_Global.PLC.COD_HeChaStatus = it.Val;
                break;
            case "plc_COD加标阀":
                SDL_Global.PLC.COD_JiaBiaoStatus = it.Val;
                break;
            case "plc_五参数池液位":
                SDL_Global.PLC.WuCanShuChiYeWei = it.Val;
                break;
            case "plc_沉淀池液位":
                SDL_Global.PLC.ChenDianChiYeWei = it.Val;
                break;
            case "plc_采样杯1液位":
                SDL_Global.PLC.CaiYangBei1YeWei = it.Val;
                break;
            case "plc_采样杯2液位":
                SDL_Global.PLC.CaiYangBei2YeWei = it.Val;
                break;
            case "plc_采样杯3液位":
                SDL_Global.PLC.CaiYangBei3YeWei = it.Val;
                break;
            case "plc_采样杯4液位":
                SDL_Global.PLC.CaiYangBei4YeWei = it.Val;
                break;
            case "plc_采样杯5液位":
                SDL_Global.PLC.CaiYangBei5YeWei = it.Val;
                break;
            //    生物毒性
            case "plc_采样杯6液位":
                SDL_Global.PLC.CaiYangBei6YeWei = it.Val;
                break;
            case "plc_采样杯7液位":
                SDL_Global.PLC.CaiYangBei7YeWei = it.Val;
                break;

            case "plc_自动状态":
                SDL_Global.PLC.ZiDongStatus = it.Val;
                break;
            case "plc_手动状态":
                SDL_Global.PLC.ShouDongStatus = it.Val;
                break;
            case "plc_采水":
                SDL_Global.PLC.CaiShui = it.Val;
                break;
            case "plc_配水":
                SDL_Global.PLC.PeiShui = it.Val;
                break;
            case "plc_测量":
                SDL_Global.PLC.CeLiang = it.Val;
                break;
            case "plc_除藻":
                SDL_Global.PLC.ChuZao = it.Val;
                break;
            case "plc_清洗":
                SDL_Global.PLC.QingXi = it.Val;
                break;
            case "plc_待机":
                SDL_Global.PLC.DaiJi = it.Val;
                break;
            case "plc_内外管路清洗":
                SDL_Global.PLC.GuanLuQiXi = it.Val;
                break;
            case "plc_仪表取数标识":
                SDL_Global.PLC.YiBiaoQuShu = it.Val;
                break;
            case "plc_泵1补水标识":
                SDL_Global.PLC.Beng1BuShui = it.Val;
                break;
            case "plc_泵2补水标识":
                SDL_Global.PLC.Beng2BuShui = it.Val;
                break;
            case "plc_面板自动":
                SDL_Global.PLC.MianBanZiDong = it.Val;
                break;
            case "plc_面板维护":
                SDL_Global.PLC.MianBanWeiHu = it.Val;
                break;
            case "plc_面板单次":
                SDL_Global.PLC.MianBanDanCi = it.Val;
                break;
            case "plc_面板除藻":
                SDL_Global.PLC.MianBanChuZao = it.Val;
                break;
            case "plc_面板清洗":
                SDL_Global.PLC.MianBanQingXi = it.Val;
                break;
            case "plc_面板复位":
                SDL_Global.PLC.MianBanFuWei = it.Val;
                break;
            case "plc_五参数取数":
                SDL_Global.PLC.WuCanQuShu = it.Val;
                break;
            case "plc_五参数排空":
                SDL_Global.PLC.WuCanPaiKong = it.Val;
                break;
            case "plc_五参数运行":
                SDL_Global.PLC.WuCanYunXing = it.Val;
                break;
            case "plc_泵1故障报警":
                SDL_Global.PLC.Beng1Fault = it.Val;
                break;
            case "plc_采水单元故障":
                SDL_Global.PLC.CaiShuiFault = it.Val;
                break;
            case "plc_采水五参数液位报警":
                SDL_Global.PLC.CaiShuiWuCanYeWeiAlarm = it.Val;
                break;
            case "plc_配水沉淀池液位报警":
                SDL_Global.PLC.PeiShuiFault = it.Val;
                break;
            case "plc_采样杯1配水故障":
                SDL_Global.PLC.CaiYang1PeiShuiFault = it.Val;
                break;
            case "plc_采样杯2配水故障":
                SDL_Global.PLC.CaiYang2PeiShuiFault = it.Val;
                break;
            case "plc_采样杯3配水故障":
                SDL_Global.PLC.CaiYang3PeiShuiFault = it.Val;
                break;
            case "plc_采样杯4配水故障":
                SDL_Global.PLC.CaiYang4PeiShuiFault = it.Val;
                break;
            case "plc_采样杯5配水故障":
                SDL_Global.PLC.CaiYang5PeiShuiFault = it.Val;
                break;
            case "plc_清洗液位报警":
                SDL_Global.PLC.QingXiYeWeiAlarm = it.Val;
                break;
            case "plc_采样杯1除藻故障":
                SDL_Global.PLC.CaiYang1ChuZaoFault = it.Val;
                break;
            case "plc_采样杯2除藻故障":
                SDL_Global.PLC.CaiYang2ChuZaoFault = it.Val;
                break;
            case "plc_采样杯3除藻故障":
                SDL_Global.PLC.CaiYang3ChuZaoFault = it.Val;
                break;
            case "plc_采样杯4除藻故障":
                SDL_Global.PLC.CaiYang4ChuZaoFault = it.Val;
                break;
            case "plc_采样杯5除藻故障":
                SDL_Global.PLC.CaiYang5ChuZaoFault = it.Val;
                break;
            case "plc_采样杯6除藻故障":
                SDL_Global.PLC.CaiYang6ChuZaoFault = it.Val;
                break;
            case "plc_采样杯7除藻故障":
                SDL_Global.PLC.CaiYang7ChuZaoFault = it.Val;
                break;

            case "plc_增压泵1取水时间":
                SDL_Global.PLC.ZengYaBeng1QuShuiShiJian = it.Val;
                break;
            case "plc_增压泵2取水时间":
                SDL_Global.PLC.ZengYaBeng2QuShuiShiJian = it.Val;
                break;


            case "plc_电源故障":
                SDL_Global.PLC.DianYuanFault = it.Val;
                break;
            case "plc_采水点液位报警":
                SDL_Global.PLC.CaiShuiYeWeiAlarm = it.Val;
                break;
            case "plc_配水故障":
                SDL_Global.PLC.PeiShuiFault = it.Val;
                break;
            case "plc_五参数连续":
                SDL_Global.PLC.WuCanLianXu = it.Val;
                break;
            case "plc_上电清洗":
                SDL_Global.PLC.ShangDianQingXi = it.Val;
                break;

            case "plc_上清洗水功能状态":
                SDL_Global.PLC.ShangQingXiShui = it.Val;
                break;
            case "plc_上清洗水状态":
                SDL_Global.PLC.ShangQingXiShuiState = it.Val;
                break;

            case "plc_整点触发":
                SDL_Global.PLC.ZhengDianChuFa = it.Val;
                break;
            case "plc_默认取水泵":
                SDL_Global.PLC.MoRenQuShuiBeng = it.Val;
                break;
            case "plc_采样杯润洗":
                SDL_Global.PLC.CaiYangBeiRunXi = it.Val;
                break;
            case "plc_五参数取水":
                SDL_Global.PLC.WuCanQuShui = it.Val;
                break;
            case "采水时间":
                SDL_Global.SYS.CaiShuiShiJian = it.Val;
                break;
            case "水样时间":
                SDL_Global.SYS.ShuiYangShiJian = it.Val;
                break;
            case "五参数小时测量":
                SDL_Global.SYS.WuCanXiaoShiCeLiang = it.Val;
                break;
            case "远程反控":
                SDL_Global.SYS.YuanChengFanKong = it.Val;
                break;
            case "远程加标采水":
                SDL_Global.SYS.YuanChengJiaBiaoCaiShui = it.Val;
                break;
            case "开启日质控":
                SDL_Global.SYS.KaiQiRiZhiKong = it.Val;
                break;
            case "监测水类型":
                SDL_Global.SYS.JianCeShuiLeiXing = it.Val;
                break;

            // 预警
            case "启用试剂预警":
                SDL_Global.SYS.ShiJiYuJing = it.Val;
                break;
            case "启用运维预警":
                SDL_Global.SYS.YunWeiYuJing = it.Val;
                break;
            case "启用数据预警":
                SDL_Global.SYS.ShuJuYuJing = it.Val;
                break;
            case "启用备件预警":
                SDL_Global.SYS.BeiJianYuJing = it.Val; 
                break;

            case "pH恒值判断次数":
                SDL_Global.SYS.PHHengZhiCiShu = it.Val;
                break;
            case "水样恒值判断次数":
                SDL_Global.SYS.ShuiYangHengZhiCiShu = it.Val;
                break;
            case "运维预警天数":
                SDL_Global.SYS.YunWeiYuJingTianShu = it.Val;
                break;


            case "TP质控预警阀值":
                SDL_Global.TP.ZhiKongYuJingYuZhi = it.Val;
                break;
            case "TN质控预警阀值":
                SDL_Global.TN.ZhiKongYuJingYuZhi = it.Val;
                break;
            case "NH3质控预警阀值":
                SDL_Global.NH3.ZhiKongYuJingYuZhi = it.Val;
                break;
            case "COD质控预警阀值":
                SDL_Global.COD.ZhiKongYuJingYuZhi = it.Val;
                break;
            case "CODCR质控预警阀值":
                SDL_Global.CODCR.ZhiKongYuJingYuZhi = it.Val;
                break;

            case "TP试剂余量":
                SDL_Global.TP.ShiJiYuLiang = it.Val;
                break;
            case "TP试剂到期时间":
                SDL_Global.TP.ShiJiDaoQiShiJiian = it.Val;
                break;
            case "TP加标回收率":
                SDL_Global.TP.JB_HuiShouLv = it.Val.toFixedFormat(2); //it.Val == '--' ? it.Val : it.Val.toFixed(2);
                break;
            case "TP_C标":
                SDL_Global.TP.JB_CB = it.Val;
                break;
            case "TP_V1":
                SDL_Global.TP.JB_V1 = it.Val;
                break;
            // case "TP_V后":
            //     SDL_Global.TP.JB_VH = it.Val;
            //     break;
            case "TP_V3":
                SDL_Global.TP.JB_V3 = it.Val;
                SDL_Global.TP.JB_VB = (SDL_Global.TP.JB_V3 * 2).toFixedFormat(3);
                SDL_Global.TP.JB_DingRongTiJi = (SDL_Global.TP.JB_V1 * 5).toFixedFormat(3);// + SDL_Global.TP.JB_V3 * 2
                break;
            case "TP跨度值":
                SDL_Global.TP.KuaDuZhi = it.Val;
                break;
            case "TP标样核查标样浓度":
                SDL_Global.TP.BiaoYangHeChaNongDu = it.Val;
                break;
            case "TP量程漂移标样浓度":
                SDL_Global.TP.LiangChengPiaoYiNongDu = it.Val;
                break;
            case "TP零点漂移标样浓度":
                SDL_Global.TP.LingDianPiaoYiNongDu = it.Val;
                break;
            case "TP水样测试标样浓度":
                SDL_Global.TP.ShuiYangCeShiNongDu = it.Val;
                break;
            case "TP空白测试标样浓度":
                SDL_Global.TP.KongBaiCeShiNongDu = it.Val;
                break;
            case "TP告警自动复位":
                SDL_Global.TP.GaoJingZiDongFuWei = it.Val;
                break;
            case "TN试剂余量":
                SDL_Global.TN.ShiJiYuLiang = it.Val;
                break;
            case "TN试剂到期时间":
                SDL_Global.TN.ShiJiDaoQiShiJiian = it.Val;
                break;
            case "TN加标回收率":
                SDL_Global.TN.JB_HuiShouLv = it.Val.toFixedFormat(2);
                break;
            case "TN_C标":
                SDL_Global.TN.JB_CB = it.Val;
                break;
            case "TN_V1":
                SDL_Global.TN.JB_V1 = it.Val;
                break;
            // case "TN_V后":
            //     SDL_Global.TN.JB_VH = it.Val;
            //     break;
            case "TN_V3":
                SDL_Global.TN.JB_V3 = it.Val;
                SDL_Global.TN.JB_VB = (SDL_Global.TN.JB_V3 * 2).toFixedFormat(3);
                SDL_Global.TN.JB_DingRongTiJi = (SDL_Global.TN.JB_V1 * 5).toFixedFormat(3);//+ SDL_Global.TN.JB_V3 * 2
                break;
            case "TN跨度值":
                SDL_Global.TN.KuaDuZhi = it.Val;
                break;
            case "TN标样核查标样浓度":
                SDL_Global.TN.BiaoYangHeChaNongDu = it.Val;
                break;
            case "TN量程漂移标样浓度":
                SDL_Global.TN.LiangChengPiaoYiNongDu = it.Val;
                break;
            case "TN零点漂移标样浓度":
                SDL_Global.TN.LingDianPiaoYiNongDu = it.Val;
                break;
            case "TN水样测试标样浓度":
                SDL_Global.TN.ShuiYangCeShiNongDu = it.Val;
                break;
            case "TN空白测试标样浓度":
                SDL_Global.TN.KongBaiCeShiNongDu = it.Val;
                break;
            case "TN告警自动复位":
                SDL_Global.TN.GaoJingZiDongFuWei = it.Val;
                break;
            case "COD试剂余量":
                SDL_Global.COD.ShiJiYuLiang = it.Val;
                break;
            case "COD试剂到期时间":
                SDL_Global.COD.ShiJiDaoQiShiJiian = it.Val;
                break;
            case "COD加标回收率":
                SDL_Global.COD.JB_HuiShouLv = it.Val.toFixedFormat(2);
                break;
            case "COD_C标":
                SDL_Global.COD.JB_CB = it.Val;
                break;
            case "COD_V1":
                SDL_Global.COD.JB_V1 = it.Val;
                break;
            // case "COD_V后":
            //     SDL_Global.COD.JB_VH = it.Val;
            //     break;
            case "COD_V3":
                SDL_Global.COD.JB_V3 = it.Val;
                SDL_Global.COD.JB_VB = (SDL_Global.COD.JB_V3 * 2).toFixedFormat(3);
                SDL_Global.COD.JB_DingRongTiJi = (SDL_Global.COD.JB_V1 * 5).toFixedFormat(3);//+ SDL_Global.COD.JB_V3 * 2
                break;
            case "COD跨度值":
                SDL_Global.COD.KuaDuZhi = it.Val;
                break;
            case "COD标样核查标样浓度":
                SDL_Global.COD.BiaoYangHeChaNongDu = it.Val;
                break;
            case "COD量程漂移标样浓度":
                SDL_Global.COD.LiangChengPiaoYiNongDu = it.Val;
                break;
            case "COD零点漂移标样浓度":
                SDL_Global.COD.LingDianPiaoYiNongDu = it.Val;
                break;
            case "COD水样测试标样浓度":
                SDL_Global.COD.ShuiYangCeShiNongDu = it.Val;
                break;
            case "COD空白测试标样浓度":
                SDL_Global.COD.KongBaiCeShiNongDu = it.Val;
                break;
            case "COD告警自动复位":
                SDL_Global.COD.GaoJingZiDongFuWei = it.Val;
                break;

            case "CODCR试剂余量":
                SDL_Global.CODCR.ShiJiYuLiang = it.Val;
                break;
            case "CODCR试剂到期时间":
                SDL_Global.CODCR.ShiJiDaoQiShiJiian = it.Val;
                break;
            case "CODCR加标回收率":
                SDL_Global.CODCR.JB_HuiShouLv = it.Val.toFixedFormat(2);
                break;
            case "CODCR_C标":
                SDL_Global.CODCR.JB_CB = it.Val;
                break;
            case "CODCR_V1":
                SDL_Global.CODCR.JB_V1 = it.Val;
                break;
            // case "COD_V后":
            //     SDL_Global.COD.JB_VH = it.Val;
            //     break;
            case "CODCR_V3":
                SDL_Global.CODCR.JB_V3 = it.Val;
                SDL_Global.CODCR.JB_VB = (SDL_Global.COD.JB_V3 * 2).toFixedFormat(3);
                SDL_Global.CODCR.JB_DingRongTiJi = (SDL_Global.COD.JB_V1 * 5).toFixedFormat(3);//+ SDL_Global.COD.JB_V3 * 2
                break;
            case "CODCR跨度值":
                SDL_Global.CODCR.KuaDuZhi = it.Val;
                break;
            case "CODCR标样核查标样浓度":
                SDL_Global.CODCR.BiaoYangHeChaNongDu = it.Val;
                break;
            case "CODCR量程漂移标样浓度":
                SDL_Global.CODCR.LiangChengPiaoYiNongDu = it.Val;
                break;
            case "CODCR零点漂移标样浓度":
                SDL_Global.CODCR.LingDianPiaoYiNongDu = it.Val;
                break;
            case "CODCR水样测试标样浓度":
                SDL_Global.CODCR.ShuiYangCeShiNongDu = it.Val;
                break;
            case "CODCR空白测试标样浓度":
                SDL_Global.CODCR.KongBaiCeShiNongDu = it.Val;
                break;
            case "CODCR告警自动复位":
                SDL_Global.CODCR.GaoJingZiDongFuWei = it.Val;
                break;


            case "NH3试剂余量":
                SDL_Global.NH3.ShiJiYuLiang = it.Val;
                break;
            case "NH3试剂到期时间":
                SDL_Global.NH3.ShiJiDaoQiShiJiian = it.Val;
                break;
            case "NH3加标回收率":
                SDL_Global.NH3.JB_HuiShouLv = it.Val.toFixedFormat(2);
                break;
            case "NH3_C标":
                SDL_Global.NH3.JB_CB = it.Val;
                break;
            case "NH3_V1":
                SDL_Global.NH3.JB_V1 = it.Val;
                break;
            // case "NH3_V后":
            //     SDL_Global.NH3.JB_VH = it.Val;
            //     break;
            case "NH3_V3":
                SDL_Global.NH3.JB_V3 = it.Val;
                SDL_Global.NH3.JB_VB = (SDL_Global.NH3.JB_V3 * 2).toFixedFormat(3);
                SDL_Global.NH3.JB_DingRongTiJi = (SDL_Global.NH3.JB_V1 * 5).toFixedFormat(3);//+ SDL_Global.NH3.JB_V3 * 2
                break;
            case "NH3跨度值":
                SDL_Global.NH3.KuaDuZhi = it.Val;
                break;
            case "NH3标样核查标样浓度":
                SDL_Global.NH3.BiaoYangHeChaNongDu = it.Val;
                break;
            case "NH3量程漂移标样浓度":
                SDL_Global.NH3.LiangChengPiaoYiNongDu = it.Val;
                break;
            case "NH3零点漂移标样浓度":
                SDL_Global.NH3.LingDianPiaoYiNongDu = it.Val;
                break;
            case "NH3水样测试标样浓度":
                SDL_Global.NH3.ShuiYangCeShiNongDu = it.Val;
                break;
            case "NH3空白测试标样浓度":
                SDL_Global.NH3.KongBaiCeShiNongDu = it.Val;
                break;
            case "NH3告警自动复位":
                SDL_Global.NH3.GaoJingZiDongFuWei = it.Val;
                break;
            case "自动控制间隔小时数":
                SDL_Global.SYS.ZiDongJianGeXiaoShi = it.Val;
                break;
            case "NH3子流程":
                SDL_Global.NH3.SubFlowText = it.Val;
                break;
            case "TN子流程":
                SDL_Global.TN.SubFlowText = it.Val;
                break;
            case "TP子流程":
                SDL_Global.TP.SubFlowText = it.Val;
                break;
            case "COD子流程":
                SDL_Global.COD.SubFlowText = it.Val;
                break;
            case "CODCR子流程":
                SDL_Global.CODCR.SubFlowText = it.Val;
                break;
            case "PH标样浓度":
                SDL_Global.WC.PH.BiaoYangNongDu = it.Val;
                break;
            case "浊度标样浓度":
                SDL_Global.WC.HunZhuoDu.BiaoYangNongDu = it.Val;
                break;
            case "电导率标样浓度":
                SDL_Global.WC.DianDaoLv.BiaoYangNongDu = it.Val;
                break;
            case "叶绿素标样浓度":
                SDL_Global.YeLvSu.BiaoYangNongDu = it.Val;
                break;
            case "藻密度标样浓度":
                SDL_Global.ZaoMiDu.BiaoYangNongDu = it.Val;
                break;
            case "溶解氧标样浓度":
                SDL_Global.WC.RongJieYang.BiaoYangNongDu = it.Val;
                break;
            case "水温标样浓度":
                SDL_Global.WC.ShuiWen.BiaoYangNongDu = it.Val;
                break;

            // zjs
            case "铜标样浓度":
                SDL_Global.ZJS.Qian.BiaoYangHeChaNongDu = it.Val;
                break;
            case "锌标样浓度":
                SDL_Global.ZJS.Ge.BiaoYangHeChaNongDu = it.Val;
                break;
            case "铅标样浓度":
                SDL_Global.ZJS.Tong.BiaoYangHeChaNongDu = it.Val;
                break;
            case "镉标样浓度":
                SDL_Global.ZJS.Xin.BiaoYangHeChaNongDu = it.Val;
                break;
            //vocs
            case "12二氯乙烷标样浓度":
                SDL_Global.VOCs.ErLvYiWan12.BiaoYangNongDu = it.Val;
                break;
            case "甲苯标样浓度":
                SDL_Global.VOCs.JiaBen.BiaoYangNongDu = it.Val;
                break;
            case "氯苯标样浓度":
                SDL_Global.VOCs.LvBen.BiaoYangNongDu = it.Val;
                break;
            case "12二氯苯标样浓度":
                SDL_Global.VOCs.ErLvBen12.BiaoYangNongDu = it.Val;
                break;
            case "14二氯苯标样浓度":
                SDL_Global.VOCs.ErLvBen14.BiaoYangNongDu = it.Val;
                break;
            case "异丙苯标样浓度":
                SDL_Global.VOCs.YiBingBen.BiaoYangNongDu = it.Val;
                break;
            case "苯乙烯标样浓度":
                SDL_Global.VOCs.BenYiXi.BiaoYangNongDu = it.Val;
                break;
            case "对间二甲苯标样浓度":
                SDL_Global.VOCs.DuiWenErJiaBen.BiaoYangNongDu = it.Val;
                break;
            case "三溴甲烷标样浓度":
                SDL_Global.VOCs.SanXiuJiaWan.BiaoYangNongDu = it.Val;
                break;
            case "三氯甲烷标样浓度":
                SDL_Global.VOCs.SanLvJiaWan.BiaoYangNongDu = it.Val;
                break;
            case "邻二甲苯标样浓度":
                SDL_Global.VOCs.LinErJiaBen.BiaoYangNongDu = it.Val;
                break;
            case "11二氯乙烯标样浓度":
                SDL_Global.VOCs.YiErLvYiXi11.BiaoYangNongDu = it.Val;
                break;
            case "12二氯乙烯标样浓度":
                SDL_Global.VOCs.YiErLvYiXi12.BiaoYangNongDu = it.Val;
                break;

            case "乙苯标样浓度":
                SDL_Global.VOCs.YiBen.BiaoYangNongDu = it.Val;
                break;
            case "二氯甲烷标样浓度":
                SDL_Global.VOCs.ErLvJiaWan.BiaoYangNongDu = it.Val;
                break;
            case "三氯乙烯标样浓度":
                SDL_Global.VOCs.SanLvYiXi.BiaoYangNongDu = it.Val;
                break;
            case "四氯乙烯标样浓度":
                SDL_Global.VOCs.SiLvYiXi.BiaoYangNongDu = it.Val;
                break;
            case "苯标样浓度":
                SDL_Global.VOCs.Ben.BiaoYangNongDu = it.Val;
                break;




            case "零点核查间隔":
                SDL_Global.SYS.LingDianJianGe = it.Val;
                break;
            case "零点核查时间":
                SDL_Global.SYS.LingDianShiJian = it.Val;
                break;
            case "零点累计天数":
                SDL_Global.SYS.LianDianLeiJiTianShu = it.Val;
                break;
            case "跨度核查间隔":
                SDL_Global.SYS.KuaDuJianGe = it.Val;
                break;
            case "跨度核查时间":
                SDL_Global.SYS.KuaDuShiJian = it.Val;
                break;
            case "跨度累计天数":
                SDL_Global.SYS.KuaDuLeiJiTianShu = it.Val;
                break;
            case "平行样间隔":
                SDL_Global.SYS.PingXingYangJianGe = it.Val;
                break;
            case "平行样时间":
                SDL_Global.SYS.PingXingYangShiJian = it.Val;
                break;
            case "平行样累计天数":
                SDL_Global.SYS.LianDianLeiJiTianShu = it.Val;
                break;
            case "标样核查间隔":
                SDL_Global.SYS.BiaoYangHeChaJianGe = it.Val;
                break;
            case "标样核查时间":
                SDL_Global.SYS.BiaoYangHeChaShiJian = it.Val;
                break;
            case "标样累计天数":
                SDL_Global.SYS.BiaoYangLeiJiTianShu = it.Val;
                break;
            case "加标回收间隔":
                SDL_Global.SYS.JiaBiaoHuiShouJianGe = it.Val;
                break;
            case "加标回收时间":
                SDL_Global.SYS.JiaBiaoHuiShouShiJian = it.Val;
                break;
            case "加标回收累计天数":
                SDL_Global.SYS.JiaBiaoHuiShouLeiJiTianShu = it.Val;
                break;
            case "自动校准间隔":
                SDL_Global.SYS.ZiDongJiaoZhunJianGe = it.Val;
                break;
            case "自动校准时间":
                SDL_Global.SYS.ZiDongJiaoZhunShiJian = it.Val;
                break;
            case "自动校准累计天数":
                SDL_Global.SYS.ZiDongJiaoZhunLeiJiTianShu = it.Val;
                break;
            case "协议类型":
                SDL_Global.SYS.ProtocolType = it.Val;
                break;
            case "中心站IP":
                SDL_Global.SYS.PlatformIP = it.Val;
                break;
            case "中心站端口":
                SDL_Global.SYS.PlatformPort = it.Val;
                break;
            case "水站编号":
                SDL_Global.SYS.MN = it.Val;
                break;
            case "水站行政编号":
                SDL_Global.SYS.id = it.Val;
                break;
            case "站点名称":
                SDL_Global.SYS.PointName = it.Val;
                break;
            case "运维姓名":
                SDL_Global.SYS.OptUserName = it.Val;
                break;
            case "运维电话":
                SDL_Global.SYS.OptUserPhone = it.Val;
                break;
            case "平台名称":
                SDL_Global.SYS.PlatformName = it.Val;
                break;
            case "中心站通讯密码":
                SDL_Global.SYS.PlatformPW = it.Val;
                break;
            case "通讯心跳间隔":
                SDL_Global.SYS.PlatformHeartInterval = it.Val;
                break;
            case "通讯断开重连间隔":
                SDL_Global.SYS.PlatformReconInterval = it.Val;
                break;
            // case "通讯超时时间":
            //     SDL_Global.SYS.PlatformTimeOut = it.Val;
            //     break;
            // case "超时重试次数":
            //     SDL_Global.SYS.PlatformRecCount = it.Val;
            //     break;
            case "运行模式":
                SDL_Global.PLC.YunXingMoShi = it.Val;
                SDL_Global.PLC.YunXingMoShiText = formatPLCMoShiStatusToText(it.Val)
                break;
            case "TP试剂总量":
                SDL_Global.TP.ShiJiZongLiang = it.Val;
                break;
            case "TN试剂总量":
                SDL_Global.TN.ShiJiZongLiang = it.Val;
                break;
            case "NH3试剂总量":
                SDL_Global.NH3.ShiJiZongLiang = it.Val;
                break;
            case "COD试剂总量":
                SDL_Global.COD.ShiJiZongLiang = it.Val;
                break;
            case "CODCR试剂总量":
                SDL_Global.CODCR.ShiJiZongLiang = it.Val;
                break;
            case "TP试剂下限":
                SDL_Global.TP.ShiJiXiaXian = it.Val;
                break;
            case "TN试剂下限":
                SDL_Global.TN.ShiJiXiaXian = it.Val;
                break;
            case "NH3试剂下限":
                SDL_Global.NH3.ShiJiXiaXian = it.Val;
                break;
            case "COD试剂下限":
                SDL_Global.COD.ShiJiXiaXian = it.Val;
                break;

            case "CODCR试剂下限":
                SDL_Global.CODCR.ShiJiXiaXian = it.Val;
                break;
            // case "实时数据间隔":
            //     SDL_Global.SYS.ShiShiShuJuJianGe = it.Val;
            //     break;
            case "留样模式":

                SDL_Global.LY.MoShi = it.Val;
                break;
            case "留样型号":
                SDL_Global.LY.XingHao = it.Val;
                break;
            case "留样瓶号":
                SDL_Global.LY.PingHao = it.Val;
                break;

            case "CYQ_com":
                SDL_Global.CY.ComStatus = it.Val;
                SDL_Global.CY.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "CYQ_仪表状态":
                SDL_Global.CY.MeterStatus = it.Val;
                SDL_Global.CY.MeterStatusText = (it.Val > 0 ? "启动" : "停止");//"停止" //
                break;
            case "采样器采水模式":

                SDL_Global.CY.MoShi = it.Val;
                break;
            case "采样间隔时间":
                SDL_Global.CY.CaiYangJianGeShiJian = it.Val;
                break;
            case "延时测量间隔":
                SDL_Global.CY.GongYangYanShiShiJian = it.Val;
                break;

            // SYZ
            case "SZY_com":
                SDL_Global.SZY.ComStatus = it.Val;
                SDL_Global.SZY.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "SZY_水中油":
                // if (SDL_Global.SZY.Factory == '柯泽') {
                //     SDL_Global.SZY.LastTestData = (it.Val / 100).toFixedFormat(SDL_Global.SZY.Decimal);
                // } else {
                SDL_Global.SZY.LastTestData = it.Val.toFixedFormat(SDL_Global.SZY.Decimal);
                // }
                // SDL_Global.SZY.LastTestData = it.Val.toFixedFormat(SDL_Global.SZY.Decimal);
                break;
            case "SZY_状态":
                SDL_Global.SZY.MeterStatus = it.Val;
                SDL_Global.SZY.MeterStatusText = formatYBStatusToText(it.Val);
                break;
            case "SZY_报警":
                SDL_Global.SZY.Alarm = it.Val;
                SDL_Global.SZY.AlarmText = formatYBAlarmStatusToText(it.Val);

                break;
            // SWDX

            case "SWDX_com":
                SDL_Global.SWDX.ComStatus = it.Val;
                SDL_Global.SWDX.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "SWDX_毒性度":
                SDL_Global.SWDX.LastTestData = it.Val.toFixedFormat(SDL_Global.SWDX.Decimal);
                break;

            case "SWDX_副毒性度":
                SDL_Global.SWDX.SWDX_FuDuXingDu = it.Val;
                break;

            case "SWDX_报警":
                SDL_Global.SWDX.SWDX_Alarm = it.Val;
                SDL_Global.SWDX.AlarmText = formatSWDXYBAlarmStatusToText(it.Val);
                break;

            case "SWDX_状态":
                SDL_Global.SWDX.MeterStatus = it.Val;
                SDL_Global.SWDX.MeterStatusText = formatSWDXYBStatusToText(it.Val);
                break;

            case "SWDX_主传感器":
                SDL_Global.SWDX.SWDX_ZhuChuanGanQi = it.Val;
                break;

            case "SWDX_注意值":
                SDL_Global.SWDX.SWDX_ZhuYiZhi = it.Val;
                break;

            case "SWDX_报警值":
                SDL_Global.SWDX.SWDX_AlarmValue = it.Val;
                break;

            case "SWDX_电压值":
                SDL_Global.SWDX.SWDX_DianYaZhi = it.Val;
                break;

            case "SWDX_副电压值":
                SDL_Global.SWDX.SWDX_FuDianYaZhi = it.Val;
                break;


            case "系统名称":
                SDL_Global.SYS.SystemName = it.Val;
                break;
            case "公司名称":
                SDL_Global.SYS.CompanyName = it.Val;
                break;
            case "运维单位":
                SDL_Global.SYS.YunWeiCompanyName = it.Val;
                break;
            case "软件版本":
                SDL_Global.SYS.SoftVersion = it.Val;
                break;

            case "F_瞬时流量":
                //LastTestData
                SDL_Global.Flow.realFlow.LastTestData = (it.Val*3.6).toFixedFormat(SDL_Global.Flow.realFlow.Decimal);
                break;
            case "F_累计流量":
                //LastTestData
                SDL_Global.Flow.CumulativeFlow.LastTestData = it.Val.toFixedFormat(SDL_Global.Flow.CumulativeFlow.Decimal);
                break;

            // 地表水-水位
            case "F_流量计液位":
                //LastTestData
                SDL_Global.Flow.WaterLevelFlow.LastTestData = it.Val.toFixedFormat(SDL_Global.Flow.WaterLevelFlow.Decimal);
                break;

            case "LLJ_com":

                //LastTestData
                SDL_Global.Flow.ComStatus = it.Val;
                SDL_Global.Flow.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                // SDL_Global.Flow.ComStatus = it.Val;
                // SDL_Global.Flow.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "TP_测量时间":
                SDL_Global.TP.LastTestTime = it.Val;
                break;
            case "TP_数据":
                //LastTestData

                SDL_Global.TP.LastTestData = it.Val;//.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_系统时间":
                SDL_Global.TP.SysTime = it.Val;
                break;
            case "TP_状态":
                SDL_Global.TP.MeterStatus = it.Val;
                SDL_Global.TP.MeterStatusText = formatYBStatusToText(it.Val);
                break;
            case "TP_报警":
                SDL_Global.TP.Alarm = it.Val;
                // console.log('SDL_Global.TP.Alarm=',it.Val);
                SDL_Global.TP.AlarmText = formatYBAlarmStatusToText(it.Val);
                // console.log('SDL_Global.TP.AlarmText=', SDL_Global.TP.AlarmText);
                break;
            case "TP_故障":
                SDL_Global.TP.Fault = it.Val;
                SDL_Global.TP.FaultText = formatFaultStatusToText(it.Val);
                break;
            case "TP_子流程":
                SDL_Global.TP.SubFlow = it.Val;
                break;
            case "TP_子流程Ext":
                SDL_Global.TP.SubFlowExt = it.Val;
                break;
            case "TP_测量精度":
                SDL_Global.TP.JingDu = it.Val.toFixedFormat(0);
                break;
            case "TP_消解温度":
                SDL_Global.TP.XiaoJieWenDu = it.Val.toFixedFormat(0);
                break;
            case "TP_消解时长":
                SDL_Global.TP.XiaoJieShiJian = it.Val.toFixedFormat(0);
                break;
            case "TP_量程上限":
                SDL_Global.TP.LiangCheng = it.Val.toFixedFormat(2);
                break;
            case "TP_曲线斜率k":
                SDL_Global.TP.XieLv = it.Val.toFixedFormat(6);
                break;
            case "TP_曲线截距b":
                SDL_Global.TP.JieJu = it.Val.toFixedFormat(6);
                break;
            case "TP_线性系数":
                SDL_Global.TP.XianXingXiShu = it.Val.toFixedFormat(6);
                break;
            case "TP_测量滴定值":
                SDL_Global.TP.XinHaoZhi = it.Val.toFixedFormat(7);
                break;
            case "TP_标定日期":
                SDL_Global.TP.JiaoZhunShiJian = it.Val;
                break;
            case "TP_标样校准时间":
                SDL_Global.TP.BiaoYangShiJian = it.Val;
                break;
            case "TP_检出限":
                SDL_Global.TP.JianChuXian = it.Val.toFixedFormat(3);
                break;
            case "tp_jb_状态":
                SDL_Global.TP.JB_Status = it.Val;
                SDL_Global.TP.JB_StatusText = (it.OpResult == 'True' ? "通讯正常" : "通讯断开");

                break;
            case "tp_jb_子状态":
                SDL_Global.TP.JB_SubStatus = formatJBSubStatusToText(it.Val);
                break;
            case "tp_jb_故障":
                //报警信息
                SDL_Global.TP.JB_Fault = it.Val;
                SDL_Global.TP.JB_FaultText = formatJBAlarmStatusToText(it.Val);
                break;
            case "tp_jb_定时1":
                SDL_Global.TP.JB_Timer1 = it.Val;
                break;
            case "tp_jb_定时2":
                SDL_Global.TP.JB_Timer2 = it.Val;
                break;
            case "tp_jb_定时间隔":
                SDL_Global.TP.JB_TimerSpance = it.Val;
                break;
            case "tp_jb_T1脉冲":
                SDL_Global.TP.JB_Pulse1 = it.Val;
                break;
            case "tp_jb_T2脉冲":
                SDL_Global.TP.JB_Pulse2 = it.Val;
                break;
            case "tp_jb_低次":
                SDL_Global.TP.JB_Low = it.Val;
                break;
            case "tp_jb_高次":
                SDL_Global.TP.JB_High = it.Val;
                break;
            case "TN_测量时间":
                SDL_Global.TN.LastTestTime = it.Val;
                break;
            case "TN_数据":

                SDL_Global.TN.LastTestData = it.Val;//.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_系统时间":
                SDL_Global.TN.SysTime = it.Val;
                break;
            case "TN_状态":
                SDL_Global.TN.MeterStatus = it.Val;
                SDL_Global.TN.MeterStatusText = formatYBStatusToText(it.Val);
                break;
            case "TN_报警":
                SDL_Global.TN.Alarm = it.Val
                SDL_Global.TN.AlarmText = formatYBAlarmStatusToText(it.Val);
                break;
            case "TN_故障":
                SDL_Global.TN.Fault = it.Val;
                SDL_Global.TN.FaultText = formatFaultStatusToText(it.Val);
                break;
            case "TN_子流程":
                SDL_Global.TN.SubFlow = it.Val;
                break;
            case "TN_子流程Ext":
                SDL_Global.TN.SubFlowExt = it.Val;
                break;
            case "TN_测量精度":
                SDL_Global.TN.JingDu = it.Val.toFixedFormat(0);
                break;
            case "TN_消解温度":
                SDL_Global.TN.XiaoJieWenDu = it.Val.toFixedFormat(0);
                break;
            case "TN_消解时长":
                SDL_Global.TN.XiaoJieShiJian = it.Val.toFixedFormat(0);
                break;
            case "TN_量程上限":
                SDL_Global.TN.LiangCheng = it.Val.toFixedFormat(2);
                break;
            case "TN_曲线斜率k":
                SDL_Global.TN.XieLv = it.Val.toFixedFormat(6);
                break;
            case "TN_曲线截距b":
                SDL_Global.TN.JieJu = it.Val.toFixedFormat(6);
                break;
            case "TN_线性系数":
                SDL_Global.TN.XianXingXiShu = it.Val.toFixedFormat(6);
                break;
            case "TN_测量滴定值":
                SDL_Global.TN.XinHaoZhi = it.Val.toFixedFormat(7);
                break;
            case "TN_标定日期":
                SDL_Global.TN.JiaoZhunShiJian = it.Val;
                break;
            case "TN_标样校准时间":
                SDL_Global.TN.BiaoYangShiJian = it.Val;
                break;
            case "TN_检出限":
                SDL_Global.TN.JianChuXian = it.Val.toFixedFormat(3);
                break;
            case "tn_jb_状态":
                SDL_Global.TN.JB_Status = it.Val;
                SDL_Global.TN.JB_StatusText = (it.OpResult == 'True' ? "通讯正常" : "通讯断开");

                break;
            case "tn_jb_子状态":
                SDL_Global.TN.JB_SubStatus = formatJBSubStatusToText(it.Val);
                break;
            case "tn_jb_故障":
                SDL_Global.TN.JB_Fault = it.Val;
                SDL_Global.TN.JB_FaultText = formatJBAlarmStatusToText(it.Val);
                break;
            case "tn_jb_定时1":
                SDL_Global.TN.JB_Timer1 = it.Val;
                break;
            case "tn_jb_定时2":
                SDL_Global.TN.JB_Timer2 = it.Val;
                break;
            case "tn_jb_定时间隔":
                SDL_Global.TN.JB_TimerSpance = it.Val;
                break;
            case "tn_jb_T1脉冲":
                SDL_Global.TN.JB_Pulse1 = it.Val;
                break;
            case "tn_jb_T2脉冲":
                SDL_Global.TN.JB_Pulse2 = it.Val;
                break;
            case "tn_jb_低次":
                SDL_Global.TN.JB_Low = it.Val;
                break;
            case "tn_jb_高次":
                SDL_Global.TN.JB_High = it.Val;
                break;
            case "NH3_测量时间":
                SDL_Global.NH3.LastTestTime = it.Val;
                break;
            case "NH3_数据":
                SDL_Global.NH3.LastTestData = it.Val; //.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_系统时间":
                SDL_Global.NH3.SysTime = it.Val;
                break;
            case "NH3_状态":
                SDL_Global.NH3.MeterStatus = it.Val;
                SDL_Global.NH3.MeterStatusText = formatYBStatusToText(it.Val);
                break;
            case "NH3_报警":
                SDL_Global.NH3.Alarm = it.Val;
                SDL_Global.NH3.AlarmText = formatYBAlarmStatusToText(it.Val);
                break;
            case "NH3_故障":
                SDL_Global.NH3.Fault = it.Val;
                SDL_Global.NH3.FaultText = formatFaultStatusToText(it.Val);
                break;
            case "NH3_子流程":
                SDL_Global.NH3.SubFlow = it.Val;
                break;
            case "NH3_子流程Ext":
                SDL_Global.NH3.SubFlowExt = it.Val;
                break;
            case "NH3_测量精度":
                SDL_Global.NH3.JingDu = it.Val.toFixedFormat(0);
                break;
            case "NH3_消解温度":
                SDL_Global.NH3.XiaoJieWenDu = it.Val.toFixedFormat(0);
                break;
            case "NH3_消解时长":
                SDL_Global.NH3.XiaoJieShiJian = it.Val.toFixedFormat(0);
                break;
            case "NH3_量程上限":
                SDL_Global.NH3.LiangCheng = it.Val.toFixedFormat(2);
                break;
            case "NH3_曲线斜率k":
                SDL_Global.NH3.XieLv = it.Val.toFixedFormat(6);
                break;
            case "NH3_曲线截距b":
                SDL_Global.NH3.JieJu = it.Val.toFixedFormat(6);
                break;
            case "NH3_线性系数":
                SDL_Global.NH3.XianXingXiShu = it.Val.toFixedFormat(6);
                break;
            case "NH3_测量滴定值":
                SDL_Global.NH3.XinHaoZhi = it.Val.toFixedFormat(7);
                break;
            case "NH3_标定日期":
                SDL_Global.NH3.JiaoZhunShiJian = it.Val;
                break;
            case "NH3_标样校准时间":
                SDL_Global.NH3.BiaoYangShiJian = it.Val;
                break;
            case "NH3_检出限":
                SDL_Global.NH3.JianChuXian = it.Val.toFixedFormat(3);
                break;
            case "nh3_jb_状态":
                SDL_Global.NH3.JB_Status = it.Val;
                SDL_Global.NH3.JB_StatusText = (it.OpResult == 'True' ? "通讯正常" : "通讯断开");

                break;
            case "nh3_jb_子状态":
                SDL_Global.NH3.JB_SubStatus = formatJBSubStatusToText(it.Val);
                break;
            case "nh3_jb_故障":
                SDL_Global.NH3.JB_Fault = it.Val;
                SDL_Global.NH3.JB_FaultText = formatJBAlarmStatusToText(it.Val);
                break;
            case "nh3_jb_定时1":
                SDL_Global.NH3.JB_Timer1 = it.Val;
                break;
            case "nh3_jb_定时2":
                SDL_Global.NH3.JB_Timer2 = it.Val;
                break;
            case "nh3_jb_定时间隔":
                SDL_Global.NH3.JB_TimerSpance = it.Val;
                break;
            case "nh3_jb_T1脉冲":
                SDL_Global.NH3.JB_Pulse1 = it.Val;
                break;
            case "nh3_jb_T2脉冲":
                SDL_Global.NH3.JB_Pulse2 = it.Val;
                break;
            case "nh3_jb_低次":
                SDL_Global.NH3.JB_Low = it.Val;
                break;
            case "nh3_jb_高次":
                SDL_Global.NH3.JB_High = it.Val;
                break;

            case "COD_测量时间":
                SDL_Global.COD.LastTestTime = it.Val;
                break;
            case "COD_数据":


                SDL_Global.COD.LastTestData = it.Val; //.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_系统时间":
                SDL_Global.COD.SysTime = it.Val;
                break;
            case "COD_状态":
                SDL_Global.COD.MeterStatus = it.Val;
                SDL_Global.COD.MeterStatusText = formatYBStatusToText(it.Val);
                break;
            case "COD_报警":
                SDL_Global.COD.Alarm = it.Val;
                SDL_Global.COD.AlarmText = formatYBAlarmStatusToText(it.Val);
                break;
            case "COD_故障":
                SDL_Global.COD.Fault = it.Val;
                SDL_Global.COD.FaultText = formatFaultStatusToText(it.Val);
                break;
            case "COD_子流程":
                SDL_Global.COD.SubFlow = it.Val;
                break;
            case "COD_子流程Ext":
                SDL_Global.COD.SubFlowExt = it.Val;
                break;
            case "COD_测量精度":
                SDL_Global.COD.JingDu = it.Val.toFixedFormat(0);
                break;
            case "COD_消解温度":
                SDL_Global.COD.XiaoJieWenDu = it.Val.toFixedFormat(0);
                break;
            case "COD_消解时长":
                SDL_Global.COD.XiaoJieShiJian = it.Val.toFixedFormat(0);
                break;
            case "COD_量程上限":
                SDL_Global.COD.LiangCheng = it.Val.toFixedFormat(1);
                break;
            case "COD_曲线斜率k":
                SDL_Global.COD.XieLv = it.Val.toFixedFormat(6);
                break;
            case "COD_曲线截距b":
                SDL_Global.COD.JieJu = it.Val.toFixedFormat(6);
                break;
            case "COD_线性系数":
                SDL_Global.COD.XianXingXiShu = it.Val.toFixedFormat(6);
                break;
            case "COD_测量滴定值":
                SDL_Global.COD.XinHaoZhi = it.Val.toFixedFormat(7);
                break;
            case "COD_标定日期":
                SDL_Global.COD.JiaoZhunShiJian = it.Val;
                break;
            case "COD_标样校准时间":
                SDL_Global.COD.BiaoYangShiJian = it.Val;
                break;
            case "COD_检出限":
                SDL_Global.COD.JianChuXian = it.Val.toFixedFormat(3);
                break;
            case "cod_jb_状态":
                SDL_Global.COD.JB_Status = it.Val;
                SDL_Global.COD.JB_StatusText = (it.OpResult == 'True' ? "通讯正常" : "通讯断开");
                break;
            case "cod_jb_子状态":
                SDL_Global.COD.JB_SubStatus = formatJBSubStatusToText(it.Val);
                break;
            case "cod_jb_故障":
                SDL_Global.COD.JB_Fault = it.Val;
                SDL_Global.COD.JB_FaultText = formatJBAlarmStatusToText(it.Val);
                break;
            case "cod_jb_定时1":
                SDL_Global.COD.JB_Timer1 = it.Val;
                break;
            case "cod_jb_定时2":
                SDL_Global.COD.JB_Timer2 = it.Val;
                break;
            case "cod_jb_定时间隔":
                SDL_Global.COD.JB_TimerSpance = it.Val;
                break;
            case "cod_jb_T1脉冲":
                SDL_Global.COD.JB_Pulse1 = it.Val;
                break;
            case "cod_jb_T2脉冲":
                SDL_Global.COD.JB_Pulse2 = it.Val;
                break;
            case "cod_jb_低次":
                SDL_Global.COD.JB_Low = it.Val;
                break;
            case "cod_jb_高次":
                SDL_Global.COD.JB_High = it.Val;
                break;

            case "CODCR_测量时间":
                SDL_Global.CODCR.LastTestTime = it.Val;
                break;
            case "CODCR_数据":
                SDL_Global.CODCR.LastTestData = it.Val; //.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_系统时间":
                SDL_Global.CODCR.SysTime = it.Val;
                break;
            case "CODCR_状态":
                SDL_Global.CODCR.MeterStatus = it.Val;
                SDL_Global.CODCR.MeterStatusText = formatYBStatusToText(it.Val);
                break;
            case "CODCR_报警":
                SDL_Global.CODCR.Alarm = it.Val;
                SDL_Global.CODCR.AlarmText = formatYBAlarmStatusToText(it.Val);
                break;
            case "CODCR_故障":
                SDL_Global.CODCR.Fault = it.Val;
                SDL_Global.CODCR.FaultText = formatFaultStatusToText(it.Val);
                break;
            case "CODCR_子流程":
                SDL_Global.CODCR.SubFlow = it.Val;
                break;
            case "CODCR_子流程Ext":
                SDL_Global.CODCR.SubFlowExt = it.Val;
                break;
            case "CODCR_测量精度":
                SDL_Global.CODCR.JingDu = it.Val.toFixedFormat(0);
                break;
            case "CODCR_消解温度":
                SDL_Global.CODCR.XiaoJieWenDu = it.Val.toFixedFormat(0);
                break;
            case "CODCR_消解时长":
                SDL_Global.CODCR.XiaoJieShiJian = it.Val.toFixedFormat(0);
                break;
            case "CODCR_量程上限":
                SDL_Global.CODCR.LiangCheng = it.Val.toFixedFormat(1);
                break;
            case "CODCR_曲线斜率k":
                SDL_Global.CODCR.XieLv = it.Val.toFixedFormat(6);
                break;
            case "CODCR_曲线截距b":
                SDL_Global.CODCR.JieJu = it.Val.toFixedFormat(6);
                break;
            case "CODCR_线性系数":
                SDL_Global.CODCR.XianXingXiShu = it.Val.toFixedFormat(6);
                break;
            case "CODCR_测量滴定值":
                SDL_Global.CODCR.XinHaoZhi = it.Val.toFixedFormat(7);
                break;
            case "CODCR_标定日期":
                SDL_Global.CODCR.JiaoZhunShiJian = it.Val;
                break;
            case "CODCR_标样校准时间":
                SDL_Global.CODCR.BiaoYangShiJian = it.Val;
                break;
            case "CODCR_检出限":
                SDL_Global.CODCR.JianChuXian = it.Val.toFixedFormat(3);
                break;
            case "codcr_jb_状态":
                SDL_Global.CODCR.JB_Status = it.Val;
                SDL_Global.CODCR.JB_StatusText = (it.OpResult == 'True' ? "通讯正常" : "通讯断开");
                break;
            case "codcr_jb_子状态":
                SDL_Global.CODCR.JB_SubStatus = formatJBSubStatusToText(it.Val);
                break;
            case "codcr_jb_故障":
                SDL_Global.CODCR.JB_Fault = it.Val;
                SDL_Global.CODCR.JB_FaultText = formatJBAlarmStatusToText(it.Val);
                break;
            case "codcr_jb_定时1":
                SDL_Global.CODCR.JB_Timer1 = it.Val;
                break;
            case "codcr_jb_定时2":
                SDL_Global.CODCR.JB_Timer2 = it.Val;
                break;
            case "codcr_jb_定时间隔":
                SDL_Global.CODCR.JB_TimerSpance = it.Val;
                break;
            case "codcr_jb_T1脉冲":
                SDL_Global.CODCR.JB_Pulse1 = it.Val;
                break;
            case "codcr_jb_T2脉冲":
                SDL_Global.CODCR.JB_Pulse2 = it.Val;
                break;
            case "codcr_jb_低次":
                SDL_Global.CODCR.JB_Low = it.Val;
                break;
            case "codcr_jb_高次":
                SDL_Global.CODCR.JB_High = it.Val;
                break;



            case "wc_溶解氧":
                SDL_Global.WC.RongJieYang.LastTestData = it.Val.toFixedFormat(SDL_Global.WC.RongJieYang.Decimal);
                break;
            case "wc_电导率":

                SDL_Global.WC.DianDaoLv.LastTestData = it.Val.toFixedFormat(SDL_Global.WC.DianDaoLv.Decimal);
                break;
            case "wc_浑浊度":
                SDL_Global.WC.HunZhuoDu.LastTestData = it.Val.toFixedFormat(SDL_Global.WC.HunZhuoDu.Decimal);
                break;
            case "wc_pH值":

                SDL_Global.WC.PH.LastTestData = it.Val.toFixedFormat(SDL_Global.WC.PH.Decimal);
                break;
            case "wc_水温":
                SDL_Global.WC.ShuiWen.LastTestData = it.Val.toFixedFormat(SDL_Global.WC.ShuiWen.Decimal);
                break;
            case "wc_悬浮物":
                SDL_Global.WC.XuanFuWu.LastTestData = it.Val.toFixedFormat(SDL_Global.WC.XuanFuWu.Decimal);
                break;

            case "yls_叶绿素":
                SDL_Global.YeLvSu.LastTestData = it.Val.toFixedFormat(SDL_Global.YeLvSu.Decimal);
                break;
            case "yls_藻密度":
                SDL_Global.ZaoMiDu.LastTestData = it.Val.toFixedFormat(SDL_Global.ZaoMiDu.Decimal);
                break;

            // 苯胺

            case "AN_com":
                SDL_Global.BenAn.ComStatus = it.Val;
                SDL_Global.BenAn.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "AN_水样数据时间":
                SDL_Global.BenAn.ShuiYangShuJuShiJian = it.Val;
                break;
            case "AN_水样实测值":
                SDL_Global.BenAn.LastTestData = it.Val.toFixedFormat(SDL_Global.BenAn.Decimal); //.toFixedFormat(SDL_Global.NH3.Decimal)
                break;

            // 液位计
            case "YWJ_com":
                SDL_Global.YeWeiJi.ComStatus = it.Val;
                SDL_Global.YeWeiJi.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            // case "AN_水样数据时间":
            //     SDL_Global.YeWeiJi.ShuiYangShuJuShiJian = it.Val;
            //     break;
            case "YWJ_水位":
                SDL_Global.YeWeiJi.LastTestData = it.Val.toFixedFormat(SDL_Global.YeWeiJi.Decimal); //.toFixedFormat(SDL_Global.NH3.Decimal)
                break;
            // ZJS
            case "HM_w20123":
                if (SDL_Global.ZJS.Factory == '哈希') {
                    SDL_Global.ZJS.Xin.LastTestData = (it.Val / 100 / 1000).toFixedFormat(SDL_Global.ZJS.Xin.Decimal);
                } else {
                    SDL_Global.ZJS.Xin.LastTestData = it.Val.toFixedFormat(SDL_Global.ZJS.Xin.Decimal);
                }
                break;
            case "HM_w20115":
                if (SDL_Global.ZJS.Factory == '哈希') {
                    SDL_Global.ZJS.Ge.LastTestData = (it.Val / 1000 / 1000).toFixedFormat(SDL_Global.ZJS.Ge.Decimal);
                } else {
                    SDL_Global.ZJS.Ge.LastTestData = it.Val.toFixedFormat(SDL_Global.ZJS.Ge.Decimal);
                }

                break;
            case "HM_w20120":
                if (SDL_Global.ZJS.Factory == '哈希') {
                    SDL_Global.ZJS.Qian.LastTestData = (it.Val / 1000 / 1000).toFixedFormat(SDL_Global.ZJS.Qian.Decimal);
                } else {
                    SDL_Global.ZJS.Qian.LastTestData = it.Val.toFixedFormat(SDL_Global.ZJS.Qian.Decimal);
                }


                break;
            case "HM_w20122"://TN_数据
                if (SDL_Global.ZJS.Factory == '哈希') {
                    SDL_Global.ZJS.Tong.LastTestData = (it.Val / 1000 / 1000).toFixedFormat(SDL_Global.ZJS.Tong.Decimal);
                } else {
                    SDL_Global.ZJS.Tong.LastTestData = it.Val.toFixedFormat(SDL_Global.ZJS.Tong.Decimal);
                }

                break;
            // VOCS
            case "VOCS_w24003":
                SDL_Global.VOCs.ErLvJiaWan.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.ErLvJiaWan.Decimal);
                break;
            case "VOCS_w24004":
                SDL_Global.VOCs.SanLvJiaWan.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.SanLvJiaWan.Decimal);
                break;
            case "VOCS_w25002":
                SDL_Global.VOCs.Ben.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.Ben.Decimal);
                break;
            case "VOCS_w24049":
                SDL_Global.VOCs.SanLvYiXi.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.SanLvYiXi.Decimal);
                break;
            case "VOCS_w25003":
                SDL_Global.VOCs.JiaBen.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.JiaBen.Decimal);
                break;
            case "VOCS_w24050":
                SDL_Global.VOCs.SiLvYiXi.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.SiLvYiXi.Decimal);
                break;
            case "VOCS_w25010":
                SDL_Global.VOCs.LvBen.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.LvBen.Decimal);
                break;
            case "VOCS_w25004":
                SDL_Global.VOCs.YiBen.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.YiBen.Decimal);
                break;
            case "VOCS_w25034":
                SDL_Global.VOCs.YiBingBen.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.YiBingBen.Decimal);
                break;
            case "VOCS_w25013":
                SDL_Global.VOCs.ErLvBen14.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.ErLvBen14.Decimal);
                break;
            case "VOCS_w25011":
                SDL_Global.VOCs.ErLvBen12.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.ErLvBen12.Decimal);
                break;
            case "VOCS_w24017":
                SDL_Global.VOCs.ErLvYiWan12.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.ErLvYiWan12.Decimal);
                break;
            case "VOCS_w25038":
                SDL_Global.VOCs.BenYiXi.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.BenYiXi.Decimal);
                break;
            case "VOCS_w25073":
                SDL_Global.VOCs.DuiWenErJiaBen.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.DuiWenErJiaBen.Decimal);
                break;
            case "VOCS_w25006":
                SDL_Global.VOCs.LinErJiaBen.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.LinErJiaBen.Decimal);
                break;
            case "VOCS_w24047":
                SDL_Global.VOCs.YiErLvYiXi11.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.YiErLvYiXi11.Decimal);
                break;
            case "VOCS_w24009":
                SDL_Global.VOCs.SanXiuJiaWan.LastTestData = it.Val.toFixedFormat(SDL_Global.VOCs.SanXiuJiaWan.Decimal);
                break;
            case "VOCS_反式12二氯乙烯":
                SDL_Global.VOCs.YiErLvYiXi12.data1 = it.Val.toFixedFormat(SDL_Global.VOCs.YiErLvYiXi12.Decimal);
                break;
            case "VOCS_顺式12二氯乙烯":
                SDL_Global.VOCs.YiErLvYiXi12.data2 = it.Val.toFixedFormat(SDL_Global.VOCs.YiErLvYiXi12.Decimal);
                if (isNaN(+SDL_Global.VOCs.YiErLvYiXi12.data1)) {
                    SDL_Global.VOCs.YiErLvYiXi12.data1 = 0;
                }
                if (isNaN(+SDL_Global.VOCs.YiErLvYiXi12.data2)) {
                    SDL_Global.VOCs.YiErLvYiXi12.data2 = 0;
                }
                SDL_Global.VOCs.YiErLvYiXi12.LastTestData = (+SDL_Global.VOCs.YiErLvYiXi12.data1) + (+SDL_Global.VOCs.YiErLvYiXi12.data2);
                break;
            case "CYQ_留样瓶号":
                SDL_Global.CY.PingHao = it.Val;
            case "LY_留样瓶号":
                SDL_Global.LY.PingHao = it.Val;
                break;
            case "LY_留样报警":
                //TODO：留样模块报警有歧义。 暂定全部置为正常
                SDL_Global.LY.Alarm = '正常'; //(it.Val == 1 ? "异常" : "正常");
                break;
            case "zf_大气温度":
                SDL_Global.ZF.DaQiWenDu.LastTestData = (it.Val == "--" ? "--" : (it.Val / 10.0).toFixedFormat(SDL_Global.ZF.DaQiWenDu.Decimal));
                break;
            case "zf_大气湿度":
                SDL_Global.ZF.DaQiShiDu.LastTestData = (it.Val == "--" ? "--" : (it.Val / 10.0).toFixedFormat(SDL_Global.ZF.DaQiShiDu.Decimal));
                break;

            case "TP_com":
                SDL_Global.TP.ComStatus = it.Val;
                SDL_Global.TP.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "TN_com":
                SDL_Global.TN.ComStatus = it.Val;
                SDL_Global.TN.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "NH3_com":
                SDL_Global.NH3.ComStatus = it.Val;
                SDL_Global.NH3.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "COD_com":
                SDL_Global.COD.ComStatus = it.Val;
                SDL_Global.COD.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "CODCR_com":

                SDL_Global.CODCR.ComStatus = it.Val;
                SDL_Global.CODCR.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "WC_com":

                SDL_Global.WC.ComStatus = it.Val;
                SDL_Global.WC.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                SDL_Global.SZY.ComStatus = it.Val;
                SDL_Global.SZY.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "YLS_com":
                SDL_Global.YeLvSu.ComStatus = it.Val;
                SDL_Global.YeLvSu.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                SDL_Global.ZaoMiDu.ComStatus = it.Val;
                SDL_Global.ZaoMiDu.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "LY_com":
                SDL_Global.LY.ComStatus = it.Val;
                SDL_Global.LY.ComStatusText = (it.Val == 1 ? "通讯正常" : "通讯断开");
                break;
            case "ZF_com":
                SDL_Global.ZF.ComStatus = it.Val;
                if (SDL_Global.ZF.ComStatus == 3) SDL_Global.ZF.ComStatus = 1;
                SDL_Global.ZF.ComStatusText = (it.Val == 1 ? "通讯正常" : "通讯断开");
                break;

            case "HM_com":
                SDL_Global.ZJS.ComStatus = it.Val;
                SDL_Global.ZJS.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;
            case "VOCS_com":
                SDL_Global.VOCs.ComStatus = it.Val;
                SDL_Global.VOCs.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "QX_com":
                SDL_Global.QX.ComStatus = it.Val;
                SDL_Global.QX.ComStatusText = (it.Val > 0 ? "通讯正常" : "通讯断开");
                break;

            case "实时数据自动上传":
                SDL_Global.SYS.Upload_ShiShiShuJu = it.Val;
                break;
            case "小时数据自动上传":
                SDL_Global.SYS.Upload_XiaoShiShuJu = it.Val;
                break;
            case "标样核查自动上传":
                SDL_Global.SYS.Upload_BiaoYangHeCha = it.Val;
                break;
            case "加标回收自动上传":
                SDL_Global.SYS.Upload_JiaBiaoHuiShou = it.Val;
                break;
            case "平行样自动上传":
                SDL_Global.SYS.Upload_PingXingYang = it.Val;
                break;
            case "零点核查自动上传":
                SDL_Global.SYS.Upload_LingDianHeCha = it.Val;
                break;
            case "跨度核查自动上传":
                SDL_Global.SYS.Upload_KuaDuHeCha = it.Val;
                break;
            case "空白测试自动上传":
                SDL_Global.SYS.Upload_KongBaiCeShi = it.Val;
                break;
            case "系统日志自动上传":
                SDL_Global.SYS.Upload_YiQiAndShuCaiYiRiZhi = it.Val;
                break;
            case "系统状态自动上传":
                SDL_Global.SYS.Upload_YiQiAndShuCaiYiZhuangTai = it.Val;
                break;
            case "仪器参数自动上传":
                SDL_Global.SYS.Upload_YiQiCanShu = it.Val;
                break;
            case "留样数据自动上传":
                SDL_Global.SYS.Upload_LiuYangXinXi = it.Val;
                break;
            case "开机时间自动上传":
                SDL_Global.SYS.Upload_ShuCaiYiKaiJiShiJian = it.Val;
                break;
            case "有应答报文":
                SDL_Global.SYS.Upload_ShiFouYingDa = it.Val;
                break;
            case "系统状态间隔":
                SDL_Global.SYS.Upload_XiTongZhuangTaiJianGe = it.Val;
                break;
            case "实时数据间隔":
                SDL_Global.SYS.Upload_ShiShiShuJuJianGe = it.Val;
                break;
            case "分钟数据间隔":
                SDL_Global.SYS.Upload_FenZhongShuJuJianGe = it.Val;
                break;
            case "超时重试次数":
                SDL_Global.SYS.Upload_ChaoShiChongShiCiShu = it.Val;
                break;
            case "通讯超时时间":
                SDL_Global.SYS.Upload_TongXunChaoShiShiJian = it.Val;
                break;

            // 新仪表
            case "TP_标样参考值":
                SDL_Global.TP.MoreParam.BiaoYangCanKaoZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_量程下限":
                SDL_Global.TP.MoreParam.LiangChengXiaXian = it.Val;
                break;
            case "TP_水样数据时间":
                SDL_Global.TP.MoreParam.ShuiYangShuJuShiJian = it.Val;
                break;
            case "TP_水样实测值":
                SDL_Global.TP.MoreParam.ShuiYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal); //.toFixedFormat(SDL_Global.NH3.Decimal)
                break;
            case "TP_水样数据标识":
                SDL_Global.TP.MoreParam.ShuiYangShuJuFlag = it.Val;
                break;
            case "TP_标样数据时间":
                SDL_Global.TP.MoreParam.BiaoYangShuJuShiJian = it.Val;
                break;
            case "TP_标样实测值":
                SDL_Global.TP.MoreParam.BiaoYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_标样数据标识":
                SDL_Global.TP.MoreParam.BiaoYangShuJuFlag = it.Val;
                break;
            case "TP_空白数据时间":
                SDL_Global.TP.MoreParam.KongBaiShuJuShiJian = it.Val;
                break;
            case "TP_空白实测值":
                SDL_Global.TP.MoreParam.KongBaiShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_空白数据标识":
                SDL_Global.TP.MoreParam.KongBaiShuJuFlag = it.Val;
                break;
            case "TP_零点核查数据时间":
                SDL_Global.TP.MoreParam.LingDianHeChaShuJuShiJian = it.Val;
                break;
            case "TP_零点核查实测值":
                SDL_Global.TP.MoreParam.LingDianHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_零点核查数据标识":
                SDL_Global.TP.MoreParam.LingDianHeChaShuJuFlag = it.Val;
                break;
            case "TP_跨度核查数据时间":
                SDL_Global.TP.MoreParam.KuaDuHeChaShuJuShiJian = it.Val;
                break;
            case "TP_跨度核查实测值":
                SDL_Global.TP.MoreParam.KuaDuHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_跨度核查数据标识":
                SDL_Global.TP.MoreParam.KuaDuHeChaShuJuFlag = it.Val;
                break;
            case "TP_加标回收数据时间":
                SDL_Global.TP.MoreParam.JiaBiaoHuiShouShuJuShiJian = it.Val;
                break;
            case "TP_加标回收实测值":
                SDL_Global.TP.MoreParam.JiaBiaoHuiShouShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_加标回收数据标识":
                SDL_Global.TP.MoreParam.JiaBiaoHuiShouShuJuFlag = it.Val;
                break;
            case "TP_平行样数据时间":
                SDL_Global.TP.MoreParam.PingXingYangShuJuShiJian = it.Val;
                break;
            case "TP_平行样实测值":
                SDL_Global.TP.MoreParam.PingXingYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.TP.Decimal);
                break;
            case "TP_平行样数据标识":
                SDL_Global.TP.MoreParam.PingXingYangShuJuFlag = it.Val;
                break;
            case "TP_标液一浓度":
                SDL_Global.TP.MoreParam.BiaoYeYiNongDu = it.Val.toFixedFormat(2);
                break;
            case "TP_标液一测量过程值":
                SDL_Global.TP.MoreParam.BiaoYeYiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TP_标液二浓度":
                SDL_Global.TP.MoreParam.BiaoYeErNongDu = it.Val.toFixedFormat(2);
                break;
            case "TP_标液二测量过程值":
                SDL_Global.TP.MoreParam.BiaoYeErCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TP_标液三浓度":
                SDL_Global.TP.MoreParam.BiaoYeSanNongDu = it.Val.toFixedFormat(2);
                break;
            case "TP_标液三测量过程值":
                SDL_Global.TP.MoreParam.BiaoYeSanCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TP_标液四浓度":
                SDL_Global.TP.MoreParam.BiaoYeSiNongDu = it.Val.toFixedFormat(2);
                break;
            case "TP_标液四测量过程值":
                SDL_Global.TP.MoreParam.BiaoYeSiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TP_标液五浓度":
                SDL_Global.TP.MoreParam.BiaoYeWuNongDu = it.Val.toFixedFormat(2);
                break;
            case "TP_标液五测量过程值":
                SDL_Global.TP.MoreParam.BiaoYeWuCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TP_测量模式":
                SDL_Global.TP.MoreParam.CeLiangMoShi = it.Val;
                SDL_Global.TP.MoreParam.CeLiangMoShiText = formatCeLiangMoShiStatusToText(it.Val);;
                break;
            case "TP_软件版本":
                SDL_Global.TP.MoreParam.SoftwareVersion = it.Val;
                break;
            case "TP_测量间隔":
                SDL_Global.TP.MoreParam.CeLiangJianGe = it.Val.toFixedFormat(0);
                break;
            case "TP_零点核查间隔":
                SDL_Global.TP.MoreParam.LingDianHeChaJianGe = it.Val;
                break;
            case "TP_跨度核查间隔":
                SDL_Global.TP.MoreParam.KuaDuHeChaJianGe = it.Val;
                break;
            case "TP_标样核查间隔":
                SDL_Global.TP.MoreParam.BiaoYangHeChaJianGe = it.Val.toFixedFormat(0);
                break;
            case "TP_试剂余量":
                SDL_Global.TP.MoreParam.ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_空白校准时间":
                SDL_Global.TP.MoreParam.KongBaiJiaoZhunShiJian = it.Val;
                break;
            case "TP_校准系数":
                SDL_Global.TP.MoreParam.JiaoZhunXiShu = it.Val.toFixedFormat(3);
                break;
            case "TP_校准因子":
                SDL_Global.TP.MoreParam.JiaoZhunYinZi = it.Val.toFixedFormat(3);
                break;
            case "TP_设备序列号":
                SDL_Global.TP.MoreParam.SheBeiXuLieHao = it.Val;
                break;
            case "TP_二次多项式系数":
                SDL_Global.TP.MoreParam.ErCiDuoXiangXiShu = it.Val.toFixedFormat(3);
                break;
            case "TP_控制命令":
                SDL_Global.TP.MoreParam.KongZhiMingLing = it.Val;//页面暂无
                break;
            case "TP_参数":
                SDL_Global.TP.MoreParam.CanShu = it.Val; //界面暂无
                break;
            case "TP_消解池实时温度":
                SDL_Global.TP.MoreParam.XiaoJieChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "TP_混样池实时温度"://暂无
                SDL_Global.TP.MoreParam.HunYangChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "TP_空白标定过程值"://暂无
                SDL_Global.TP.MoreParam.KongBaiBiaoDingGuoChengZhi = it.Val;
                break;
            case "TP_空白校准过程值"://暂无
                SDL_Global.TP.MoreParam.KongBaiJiaoZhunGuoChengZhi = it.Val;
                break;
            case "TP_标样校准参考值"://TP_标样校准参考值
                SDL_Global.TP.MoreParam.BiaoYangJiaoZhunCanKaoZhi = it.Val;
                break;
            case "TP_标样校准过程值"://暂无
                SDL_Global.TP.MoreParam.BiaoYangJiaoZhunGuoChengZhi = it.Val;
                break;
            case "TP_显色温度"://暂无
                SDL_Global.TP.MoreParam.XianSeWenDu = it.Val.toFixedFormat(0);
                break;
            case "TP_显色时间"://暂无
                SDL_Global.TP.MoreParam.XianSeShiJian = it.Val.toFixedFormat(0);
                break;
            case "TP_板卡温度"://暂无
                SDL_Global.TP.MoreParam.BanKaWenDu = it.Val.toFixedFormat(2); //
                break;

            // 新仪表
            case "TN_标样参考值":
                SDL_Global.TN.MoreParam.BiaoYangCanKaoZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_量程下限":
                SDL_Global.TN.MoreParam.LiangChengXiaXian = it.Val;
                break;
            case "TN_水样数据时间":
                SDL_Global.TN.MoreParam.ShuiYangShuJuShiJian = it.Val;
                break;
            case "TN_水样实测值":
                SDL_Global.TN.MoreParam.ShuiYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_水样数据标识":
                SDL_Global.TN.MoreParam.ShuiYangShuJuFlag = it.Val;
                break;
            case "TN_标样数据时间":
                SDL_Global.TN.MoreParam.BiaoYangShuJuShiJian = it.Val;
                break;
            case "TN_标样实测值":
                SDL_Global.TN.MoreParam.BiaoYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_标样数据标识":
                SDL_Global.TN.MoreParam.BiaoYangShuJuFlag = it.Val;
                break;
            case "TN_空白数据时间":
                SDL_Global.TN.MoreParam.KongBaiShuJuShiJian = it.Val;
                break;
            case "TN_空白实测值":
                SDL_Global.TN.MoreParam.KongBaiShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_空白数据标识":
                SDL_Global.TN.MoreParam.KongBaiShuJuFlag = it.Val;
                break;
            case "TN_零点核查数据时间":
                SDL_Global.TN.MoreParam.LingDianHeChaShuJuShiJian = it.Val;
                break;
            case "TN_零点核查实测值":
                SDL_Global.TN.MoreParam.LingDianHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_零点核查数据标识":
                SDL_Global.TN.MoreParam.LingDianHeChaShuJuFlag = it.Val;
                break;
            case "TN_跨度核查数据时间":
                SDL_Global.TN.MoreParam.KuaDuHeChaShuJuShiJian = it.Val;
                break;
            case "TN_跨度核查实测值":
                SDL_Global.TN.MoreParam.KuaDuHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_跨度核查数据标识":
                SDL_Global.TN.MoreParam.KuaDuHeChaShuJuFlag = it.Val;
                break;
            case "TN_加标回收数据时间":
                SDL_Global.TN.MoreParam.JiaBiaoHuiShouShuJuShiJian = it.Val;
                break;
            case "TN_加标回收实测值":
                SDL_Global.TN.MoreParam.JiaBiaoHuiShouShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_加标回收数据标识":
                SDL_Global.TN.MoreParam.JiaBiaoHuiShouShuJuFlag = it.Val;
                break;
            case "TN_平行样数据时间":
                SDL_Global.TN.MoreParam.PingXingYangShuJuShiJian = it.Val;
                break;
            case "TN_平行样实测值":
                SDL_Global.TN.MoreParam.PingXingYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.TN.Decimal);
                break;
            case "TN_平行样数据标识":
                SDL_Global.TN.MoreParam.PingXingYangShuJuFlag = it.Val;
                break;
            case "TN_标液一浓度":
                SDL_Global.TN.MoreParam.BiaoYeYiNongDu = it.Val.toFixedFormat(2);
                break;
            case "TN_标液一测量过程值":
                SDL_Global.TN.MoreParam.BiaoYeYiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TN_标液二浓度":
                SDL_Global.TN.MoreParam.BiaoYeErNongDu = it.Val.toFixedFormat(2);
                break;
            case "TN_标液二测量过程值":
                SDL_Global.TN.MoreParam.BiaoYeErCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TN_标液三浓度":
                SDL_Global.TN.MoreParam.BiaoYeSanNongDu = it.Val.toFixedFormat(2);
                break;
            case "TN_标液三测量过程值":
                SDL_Global.TN.MoreParam.BiaoYeSanCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TN_标液四浓度":
                SDL_Global.TN.MoreParam.BiaoYeSiNongDu = it.Val.toFixedFormat(2);
                break;
            case "TN_标液四测量过程值":
                SDL_Global.TN.MoreParam.BiaoYeSiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TN_标液五浓度":
                SDL_Global.TN.MoreParam.BiaoYeWuNongDu = it.Val.toFixedFormat(2);
                break;
            case "TN_标液五测量过程值":
                SDL_Global.TN.MoreParam.BiaoYeWuCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "TN_测量模式":
                SDL_Global.TN.MoreParam.CeLiangMoShi = it.Val;
                SDL_Global.TN.MoreParam.CeLiangMoShiText = formatCeLiangMoShiStatusToText(it.Val);;
                break;
            case "TN_软件版本":
                SDL_Global.TN.MoreParam.SoftwareVersion = it.Val;
                break;
            case "TN_测量间隔":
                SDL_Global.TN.MoreParam.CeLiangJianGe = it.Val.toFixedFormat(0);
                break;
            case "TN_零点核查间隔":
                SDL_Global.TN.MoreParam.LingDianHeChaJianGe = it.Val;
                break;
            case "TN_跨度核查间隔":
                SDL_Global.TN.MoreParam.KuaDuHeChaJianGe = it.Val;
                break;
            case "TN_标样核查间隔":
                SDL_Global.TN.MoreParam.BiaoYangHeChaJianGe = it.Val.toFixedFormat(0);
                break;
            case "TN_试剂余量":
                SDL_Global.TN.MoreParam.ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_空白校准时间":
                SDL_Global.TN.MoreParam.KongBaiJiaoZhunShiJian = it.Val;
                break;
            case "TN_校准系数":
                SDL_Global.TN.MoreParam.JiaoZhunXiShu = it.Val.toFixedFormat(3);
                break;
            case "TN_校准因子":
                SDL_Global.TN.MoreParam.JiaoZhunYinZi = it.Val.toFixedFormat(3);
                break;
            case "TN_设备序列号":
                SDL_Global.TN.MoreParam.SheBeiXuLieHao = it.Val;
                break;
            case "TN_二次多项式系数":
                SDL_Global.TN.MoreParam.ErCiDuoXiangXiShu = it.Val.toFixedFormat(3);
                break;
            case "TN_控制命令":
                SDL_Global.TN.MoreParam.KongZhiMingLing = it.Val;//页面暂无
                break;
            case "TN_参数":
                SDL_Global.TN.MoreParam.CanShu = it.Val; //界面暂无
                break;
            case "TN_消解池实时温度":
                SDL_Global.TN.MoreParam.XiaoJieChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "TN_混样池实时温度"://暂无
                SDL_Global.TN.MoreParam.HunYangChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "TN_空白标定过程值"://暂无
                SDL_Global.TN.MoreParam.KongBaiBiaoDingGuoChengZhi = it.Val;
                break;
            case "TN_空白校准过程值"://暂无
                SDL_Global.TN.MoreParam.KongBaiJiaoZhunGuoChengZhi = it.Val;
                break;
            case "TN_标样校准参考值"://TN_标样校准参考值
                SDL_Global.TN.MoreParam.BiaoYangJiaoZhunCanKaoZhi = it.Val;
                break;
            case "TN_标样校准过程值"://暂无
                SDL_Global.TN.MoreParam.BiaoYangJiaoZhunGuoChengZhi = it.Val;
                break;
            case "TN_显色温度"://暂无
                SDL_Global.TN.MoreParam.XianSeWenDu = it.Val.toFixedFormat(0);
                break;
            case "TN_显色时间"://暂无
                SDL_Global.TN.MoreParam.XianSeShiJian = it.Val.toFixedFormat(0);
                break;
            case "TN_板卡温度"://暂无
                SDL_Global.TN.MoreParam.BanKaWenDu = it.Val.toFixedFormat(2); //
                break;
            // 新仪表
            case "NH3_标样参考值":
                SDL_Global.NH3.MoreParam.BiaoYangCanKaoZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_量程下限":
                SDL_Global.NH3.MoreParam.LiangChengXiaXian = it.Val;
                break;
            case "NH3_水样数据时间":
                SDL_Global.NH3.MoreParam.ShuiYangShuJuShiJian = it.Val;
                break;
            case "NH3_水样实测值":
                SDL_Global.NH3.MoreParam.ShuiYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_水样数据标识":
                SDL_Global.NH3.MoreParam.ShuiYangShuJuFlag = it.Val;
                break;
            case "NH3_标样数据时间":
                SDL_Global.NH3.MoreParam.BiaoYangShuJuShiJian = it.Val;
                break;
            case "NH3_标样实测值":
                SDL_Global.NH3.MoreParam.BiaoYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_标样数据标识":
                SDL_Global.NH3.MoreParam.BiaoYangShuJuFlag = it.Val;
                break;
            case "NH3_空白数据时间":
                SDL_Global.NH3.MoreParam.KongBaiShuJuShiJian = it.Val;
                break;
            case "NH3_空白实测值":
                SDL_Global.NH3.MoreParam.KongBaiShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_空白数据标识":
                SDL_Global.NH3.MoreParam.KongBaiShuJuFlag = it.Val;
                break;
            case "NH3_零点核查数据时间":
                SDL_Global.NH3.MoreParam.LingDianHeChaShuJuShiJian = it.Val;
                break;
            case "NH3_零点核查实测值":
                SDL_Global.NH3.MoreParam.LingDianHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_零点核查数据标识":
                SDL_Global.NH3.MoreParam.LingDianHeChaShuJuFlag = it.Val;
                break;
            case "NH3_跨度核查数据时间":
                SDL_Global.NH3.MoreParam.KuaDuHeChaShuJuShiJian = it.Val;
                break;
            case "NH3_跨度核查实测值":
                SDL_Global.NH3.MoreParam.KuaDuHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_跨度核查数据标识":
                SDL_Global.NH3.MoreParam.KuaDuHeChaShuJuFlag = it.Val;
                break;
            case "NH3_加标回收数据时间":
                SDL_Global.NH3.MoreParam.JiaBiaoHuiShouShuJuShiJian = it.Val;
                break;
            case "NH3_加标回收实测值":
                SDL_Global.NH3.MoreParam.JiaBiaoHuiShouShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_加标回收数据标识":
                SDL_Global.NH3.MoreParam.JiaBiaoHuiShouShuJuFlag = it.Val;
                break;
            case "NH3_平行样数据时间":
                SDL_Global.NH3.MoreParam.PingXingYangShuJuShiJian = it.Val;
                break;
            case "NH3_平行样实测值":
                SDL_Global.NH3.MoreParam.PingXingYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.NH3.Decimal);
                break;
            case "NH3_平行样数据标识":
                SDL_Global.NH3.MoreParam.PingXingYangShuJuFlag = it.Val;
                break;
            case "NH3_标液一浓度":
                SDL_Global.NH3.MoreParam.BiaoYeYiNongDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_标液一测量过程值":
                SDL_Global.NH3.MoreParam.BiaoYeYiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "NH3_标液二浓度":
                SDL_Global.NH3.MoreParam.BiaoYeErNongDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_标液二测量过程值":
                SDL_Global.NH3.MoreParam.BiaoYeErCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "NH3_标液三浓度":
                SDL_Global.NH3.MoreParam.BiaoYeSanNongDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_标液三测量过程值":
                SDL_Global.NH3.MoreParam.BiaoYeSanCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "NH3_标液四浓度":
                SDL_Global.NH3.MoreParam.BiaoYeSiNongDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_标液四测量过程值":
                SDL_Global.NH3.MoreParam.BiaoYeSiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "NH3_标液五浓度":
                SDL_Global.NH3.MoreParam.BiaoYeWuNongDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_标液五测量过程值":
                SDL_Global.NH3.MoreParam.BiaoYeWuCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "NH3_测量模式":
                SDL_Global.NH3.MoreParam.CeLiangMoShi = it.Val;
                SDL_Global.NH3.MoreParam.CeLiangMoShiText = formatCeLiangMoShiStatusToText(it.Val);;
                break;
            case "NH3_软件版本":
                SDL_Global.NH3.MoreParam.SoftwareVersion = it.Val;
                break;
            case "NH3_测量间隔":
                SDL_Global.NH3.MoreParam.CeLiangJianGe = it.Val.toFixedFormat(0);
                break;
            case "NH3_零点核查间隔":
                SDL_Global.NH3.MoreParam.LingDianHeChaJianGe = it.Val;
                break;
            case "NH3_跨度核查间隔":
                SDL_Global.NH3.MoreParam.KuaDuHeChaJianGe = it.Val;
                break;
            case "NH3_标样核查间隔":
                SDL_Global.NH3.MoreParam.BiaoYangHeChaJianGe = it.Val.toFixedFormat(0);
                break;
            case "NH3_试剂余量":
                SDL_Global.NH3.MoreParam.ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_空白校准时间":
                SDL_Global.NH3.MoreParam.KongBaiJiaoZhunShiJian = it.Val;
                break;
            case "NH3_校准系数":
                SDL_Global.NH3.MoreParam.JiaoZhunXiShu = it.Val.toFixedFormat(3);
                break;
            case "NH3_校准因子":
                SDL_Global.NH3.MoreParam.JiaoZhunYinZi = it.Val.toFixedFormat(3);
                break;
            case "NH3_设备序列号":
                SDL_Global.NH3.MoreParam.SheBeiXuLieHao = it.Val;
                break;
            case "NH3_二次多项式系数":
                SDL_Global.NH3.MoreParam.ErCiDuoXiangXiShu = it.Val.toFixedFormat(3);
                break;
            case "NH3_控制命令":
                SDL_Global.NH3.MoreParam.KongZhiMingLing = it.Val;//页面暂无
                break;
            case "NH3_参数":
                SDL_Global.NH3.MoreParam.CanShu = it.Val; //界面暂无
                break;
            case "NH3_消解池实时温度":
                SDL_Global.NH3.MoreParam.XiaoJieChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_混样池实时温度"://暂无
                SDL_Global.NH3.MoreParam.HunYangChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "NH3_空白标定过程值"://暂无
                SDL_Global.NH3.MoreParam.KongBaiBiaoDingGuoChengZhi = it.Val;
                break;
            case "NH3_空白校准过程值"://暂无
                SDL_Global.NH3.MoreParam.KongBaiJiaoZhunGuoChengZhi = it.Val;
                break;
            case "NH3_标样校准参考值"://NH3_标样校准参考值
                SDL_Global.NH3.MoreParam.BiaoYangJiaoZhunCanKaoZhi = it.Val;
                break;
            case "NH3_标样校准过程值"://暂无
                SDL_Global.NH3.MoreParam.BiaoYangJiaoZhunGuoChengZhi = it.Val;
                break;
            case "NH3_显色温度"://暂无
                SDL_Global.NH3.MoreParam.XianSeWenDu = it.Val.toFixedFormat(0);
                break;
            case "NH3_显色时间"://暂无
                SDL_Global.NH3.MoreParam.XianSeShiJian = it.Val.toFixedFormat(0);
                break;
            case "NH3_板卡温度"://暂无
                SDL_Global.NH3.MoreParam.BanKaWenDu = it.Val.toFixedFormat(2); //
                break;

            // 新仪表
            // 新仪表
            case "COD_标样参考值":
                SDL_Global.COD.MoreParam.BiaoYangCanKaoZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_量程下限":
                SDL_Global.COD.MoreParam.LiangChengXiaXian = it.Val;
                break;
            case "COD_水样数据时间":
                SDL_Global.COD.MoreParam.ShuiYangShuJuShiJian = it.Val;
                break;
            case "COD_水样实测值":
                SDL_Global.COD.MoreParam.ShuiYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_水样数据标识":
                SDL_Global.COD.MoreParam.ShuiYangShuJuFlag = it.Val;
                break;
            case "COD_标样数据时间":
                SDL_Global.COD.MoreParam.BiaoYangShuJuShiJian = it.Val;
                break;
            case "COD_标样实测值":
                SDL_Global.COD.MoreParam.BiaoYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_标样数据标识":
                SDL_Global.COD.MoreParam.BiaoYangShuJuFlag = it.Val;
                break;
            case "COD_空白数据时间":
                SDL_Global.COD.MoreParam.KongBaiShuJuShiJian = it.Val;
                break;
            case "COD_空白实测值":
                SDL_Global.COD.MoreParam.KongBaiShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_空白数据标识":
                SDL_Global.COD.MoreParam.KongBaiShuJuFlag = it.Val;
                break;
            case "COD_零点核查数据时间":
                SDL_Global.COD.MoreParam.LingDianHeChaShuJuShiJian = it.Val;
                break;
            case "COD_零点核查实测值":
                SDL_Global.COD.MoreParam.LingDianHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_零点核查数据标识":
                SDL_Global.COD.MoreParam.LingDianHeChaShuJuFlag = it.Val;
                break;
            case "COD_跨度核查数据时间":
                SDL_Global.COD.MoreParam.KuaDuHeChaShuJuShiJian = it.Val;
                break;
            case "COD_跨度核查实测值":
                SDL_Global.COD.MoreParam.KuaDuHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_跨度核查数据标识":
                SDL_Global.COD.MoreParam.KuaDuHeChaShuJuFlag = it.Val;
                break;
            case "COD_加标回收数据时间":
                SDL_Global.COD.MoreParam.JiaBiaoHuiShouShuJuShiJian = it.Val;
                break;
            case "COD_加标回收实测值":
                SDL_Global.COD.MoreParam.JiaBiaoHuiShouShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_加标回收数据标识":
                SDL_Global.COD.MoreParam.JiaBiaoHuiShouShuJuFlag = it.Val;
                break;
            case "COD_平行样数据时间":
                SDL_Global.COD.MoreParam.PingXingYangShuJuShiJian = it.Val;
                break;
            case "COD_平行样实测值":
                SDL_Global.COD.MoreParam.PingXingYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.COD.Decimal);
                break;
            case "COD_平行样数据标识":
                SDL_Global.COD.MoreParam.PingXingYangShuJuFlag = it.Val;
                break;
            case "COD_标液一浓度":
                SDL_Global.COD.MoreParam.BiaoYeYiNongDu = it.Val.toFixedFormat(1);
                break;
            case "COD_标液一测量过程值":
                SDL_Global.COD.MoreParam.BiaoYeYiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "COD_标液二浓度":
                SDL_Global.COD.MoreParam.BiaoYeErNongDu = it.Val.toFixedFormat(1);
                break;
            case "COD_标液二测量过程值":
                SDL_Global.COD.MoreParam.BiaoYeErCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "COD_标液三浓度":
                SDL_Global.COD.MoreParam.BiaoYeSanNongDu = it.Val.toFixedFormat(1);
                break;
            case "COD_标液三测量过程值":
                SDL_Global.COD.MoreParam.BiaoYeSanCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "COD_标液四浓度":
                SDL_Global.COD.MoreParam.BiaoYeSiNongDu = it.Val.toFixedFormat(1);
                break;
            case "COD_标液四测量过程值":
                SDL_Global.COD.MoreParam.BiaoYeSiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "COD_标液五浓度":
                SDL_Global.COD.MoreParam.BiaoYeWuNongDu = it.Val.toFixedFormat(1);
                break;
            case "COD_标液五测量过程值":
                SDL_Global.COD.MoreParam.BiaoYeWuCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "COD_测量模式":
                SDL_Global.COD.MoreParam.CeLiangMoShi = it.Val;
                SDL_Global.COD.MoreParam.CeLiangMoShiText = formatCeLiangMoShiStatusToText(it.Val);
            case "COD_软件版本":
                SDL_Global.COD.MoreParam.SoftwareVersion = it.Val;
                break;
            case "COD_测量间隔":
                SDL_Global.COD.MoreParam.CeLiangJianGe = it.Val.toFixedFormat(0);
                break;
            case "COD_零点核查间隔":
                SDL_Global.COD.MoreParam.LingDianHeChaJianGe = it.Val;
                break;
            case "COD_跨度核查间隔":
                SDL_Global.COD.MoreParam.KuaDuHeChaJianGe = it.Val;
                break;
            case "COD_标样核查间隔":
                SDL_Global.COD.MoreParam.BiaoYangHeChaJianGe = it.Val.toFixedFormat(0);
                break;
            case "COD_试剂余量":
                SDL_Global.COD.MoreParam.ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;

            case "COD_空白校准时间":
                SDL_Global.COD.MoreParam.KongBaiJiaoZhunShiJian = it.Val;
                break;
            case "COD_校准系数":
                SDL_Global.COD.MoreParam.JiaoZhunXiShu = it.Val.toFixedFormat(3);
                break;
            case "COD_校准因子":
                SDL_Global.COD.MoreParam.JiaoZhunYinZi = it.Val.toFixedFormat(3);
                break;
            case "COD_设备序列号":
                SDL_Global.COD.MoreParam.SheBeiXuLieHao = it.Val;
                break;
            case "COD_二次多项式系数":
                SDL_Global.COD.MoreParam.ErCiDuoXiangXiShu = it.Val.toFixedFormat(3);
                break;
            case "COD_控制命令":
                SDL_Global.COD.MoreParam.KongZhiMingLing = it.Val;//页面暂无
                break;
            case "COD_参数":
                SDL_Global.COD.MoreParam.CanShu = it.Val; //界面暂无
                break;
            case "COD_消解池实时温度":
                SDL_Global.COD.MoreParam.XiaoJieChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "COD_混样池实时温度"://暂无
                SDL_Global.COD.MoreParam.HunYangChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "COD_空白标定过程值"://暂无
                SDL_Global.COD.MoreParam.KongBaiBiaoDingGuoChengZhi = it.Val;
                break;
            case "COD_空白校准过程值"://暂无
                SDL_Global.COD.MoreParam.KongBaiJiaoZhunGuoChengZhi = it.Val;
                break;
            case "COD_标样校准参考值"://COD_标样校准参考值
                SDL_Global.COD.MoreParam.BiaoYangJiaoZhunCanKaoZhi = it.Val;
                break;
            case "COD_标样校准过程值"://暂无
                SDL_Global.COD.MoreParam.BiaoYangJiaoZhunGuoChengZhi = it.Val;
                break;
            case "COD_显色温度"://暂无
                SDL_Global.COD.MoreParam.XianSeWenDu = it.Val.toFixedFormat(0);
                break;
            case "COD_显色时间"://暂无
                SDL_Global.COD.MoreParam.XianSeShiJian = it.Val.toFixedFormat(0);
                break;
            case "COD_板卡温度"://暂无
                SDL_Global.COD.MoreParam.BanKaWenDu = it.Val.toFixedFormat(2); //
                break;

            // 新仪表
            case "CODCR_标样参考值":
                SDL_Global.CODCR.MoreParam.BiaoYangCanKaoZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_量程下限":
                SDL_Global.CODCR.MoreParam.LiangChengXiaXian = it.Val;
                break;
            case "CODCR_水样数据时间":
                SDL_Global.CODCR.MoreParam.ShuiYangShuJuShiJian = it.Val;
                break;
            case "CODCR_水样实测值":
                SDL_Global.CODCR.MoreParam.ShuiYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_水样数据标识":
                SDL_Global.CODCR.MoreParam.ShuiYangShuJuFlag = it.Val;
                break;
            case "CODCR_标样数据时间":
                SDL_Global.CODCR.MoreParam.BiaoYangShuJuShiJian = it.Val;
                break;
            case "CODCR_标样实测值":
                SDL_Global.CODCR.MoreParam.BiaoYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_标样数据标识":
                SDL_Global.CODCR.MoreParam.BiaoYangShuJuFlag = it.Val;
                break;
            case "CODCR_空白数据时间":
                SDL_Global.CODCR.MoreParam.KongBaiShuJuShiJian = it.Val;
                break;
            case "CODCR_空白实测值":
                SDL_Global.CODCR.MoreParam.KongBaiShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_空白数据标识":
                SDL_Global.CODCR.MoreParam.KongBaiShuJuFlag = it.Val;
                break;
            case "CODCR_零点核查数据时间":
                SDL_Global.CODCR.MoreParam.LingDianHeChaShuJuShiJian = it.Val;
                break;
            case "CODCR_零点核查实测值":
                SDL_Global.CODCR.MoreParam.LingDianHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_零点核查数据标识":
                SDL_Global.CODCR.MoreParam.LingDianHeChaShuJuFlag = it.Val;
                break;
            case "CODCR_跨度核查数据时间":
                SDL_Global.CODCR.MoreParam.KuaDuHeChaShuJuShiJian = it.Val;
                break;
            case "CODCR_跨度核查实测值":
                SDL_Global.CODCR.MoreParam.KuaDuHeChaShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_跨度核查数据标识":
                SDL_Global.CODCR.MoreParam.KuaDuHeChaShuJuFlag = it.Val;
                break;
            case "CODCR_加标回收数据时间":
                SDL_Global.CODCR.MoreParam.JiaBiaoHuiShouShuJuShiJian = it.Val;
                break;
            case "CODCR_加标回收实测值":
                SDL_Global.CODCR.MoreParam.JiaBiaoHuiShouShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_加标回收数据标识":
                SDL_Global.CODCR.MoreParam.JiaBiaoHuiShouShuJuFlag = it.Val;
                break;
            case "CODCR_平行样数据时间":
                SDL_Global.CODCR.MoreParam.PingXingYangShuJuShiJian = it.Val;
                break;
            case "CODCR_平行样实测值":
                SDL_Global.CODCR.MoreParam.PingXingYangShiCeZhi = it.Val.toFixedFormat(SDL_Global.CODCR.Decimal);
                break;
            case "CODCR_平行样数据标识":
                SDL_Global.CODCR.MoreParam.PingXingYangShuJuFlag = it.Val;
                break;
            case "CODCR_标液一浓度":
                SDL_Global.CODCR.MoreParam.BiaoYeYiNongDu = it.Val.toFixedFormat(1);
                break;
            case "CODCR_标液一测量过程值":
                SDL_Global.CODCR.MoreParam.BiaoYeYiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "CODCR_标液二浓度":
                SDL_Global.CODCR.MoreParam.BiaoYeErNongDu = it.Val.toFixedFormat(1);
                break;
            case "CODCR_标液二测量过程值":
                SDL_Global.CODCR.MoreParam.BiaoYeErCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "CODCR_标液三浓度":
                SDL_Global.CODCR.MoreParam.BiaoYeSanNongDu = it.Val.toFixedFormat(1);
                break;
            case "CODCR_标液三测量过程值":
                SDL_Global.CODCR.MoreParam.BiaoYeSanCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "CODCR_标液四浓度":
                SDL_Global.CODCR.MoreParam.BiaoYeSiNongDu = it.Val.toFixedFormat(1);
                break;
            case "CODCR_标液四测量过程值":
                SDL_Global.CODCR.MoreParam.BiaoYeSiCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "CODCR_标液五浓度":
                SDL_Global.CODCR.MoreParam.BiaoYeWuNongDu = it.Val.toFixedFormat(1);
                break;
            case "CODCR_标液五测量过程值":
                SDL_Global.CODCR.MoreParam.BiaoYeWuCeLiangGuoChengZhi = it.Val.toFixedFormat(7);
                break;
            case "CODCR_测量模式":
                SDL_Global.CODCR.MoreParam.CeLiangMoShi = it.Val;
                SDL_Global.CODCR.MoreParam.CeLiangMoShiText = formatCeLiangMoShiStatusToText(it.Val);;
                break;
            case "CODCR_软件版本":
                SDL_Global.CODCR.MoreParam.SoftwareVersion = it.Val;
                break;
            case "CODCR_测量间隔":
                SDL_Global.CODCR.MoreParam.CeLiangJianGe = it.Val.toFixedFormat(0);
                break;
            case "CODCR_零点核查间隔":
                SDL_Global.CODCR.MoreParam.LingDianHeChaJianGe = it.Val;
                break;
            case "CODCR_跨度核查间隔":
                SDL_Global.CODCR.MoreParam.KuaDuHeChaJianGe = it.Val;
                break;
            case "CODCR_标样核查间隔":
                SDL_Global.CODCR.MoreParam.BiaoYangHeChaJianGe = it.Val.toFixedFormat(0);
                break;
            case "CODCR_试剂余量":
                SDL_Global.CODCR.MoreParam.ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_空白校准时间":
                SDL_Global.CODCR.MoreParam.KongBaiJiaoZhunShiJian = it.Val;
                break;
            case "CODCR_校准系数":
                SDL_Global.CODCR.MoreParam.JiaoZhunXiShu = it.Val.toFixedFormat(3);
                break;
            case "CODCR_校准因子":
                SDL_Global.CODCR.MoreParam.JiaoZhunYinZi = it.Val.toFixedFormat(3);
                break;
            case "CODCR_设备序列号":
                SDL_Global.CODCR.MoreParam.SheBeiXuLieHao = it.Val;
                break;
            case "CODCR_二次多项式系数":
                SDL_Global.CODCR.MoreParam.ErCiDuoXiangXiShu = it.Val.toFixedFormat(3);
                break;
            case "CODCR_控制命令":
                SDL_Global.CODCR.MoreParam.KongZhiMingLing = it.Val;//页面暂无
                break;
            case "CODCR_参数":
                SDL_Global.CODCR.MoreParam.CanShu = it.Val; //界面暂无
                break;
            case "CODCR_消解池实时温度":
                SDL_Global.CODCR.MoreParam.XiaoJieChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "CODCR_混样池实时温度"://暂无
                SDL_Global.CODCR.MoreParam.HunYangChiShiShiWenDu = it.Val.toFixedFormat(2);
                break;
            case "CODCR_空白标定过程值"://暂无
                SDL_Global.CODCR.MoreParam.KongBaiBiaoDingGuoChengZhi = it.Val;
                break;
            case "CODCR_空白校准过程值"://暂无
                SDL_Global.CODCR.MoreParam.KongBaiJiaoZhunGuoChengZhi = it.Val;
                break;
            case "CODCR_标样校准参考值"://COD_标样校准参考值
                SDL_Global.CODCR.MoreParam.BiaoYangJiaoZhunCanKaoZhi = it.Val;
                break;
            case "CODCR_标样校准过程值"://暂无
                SDL_Global.CODCR.MoreParam.BiaoYangJiaoZhunGuoChengZhi = it.Val;
                break;
            case "CODCR_显色温度"://暂无
                SDL_Global.CODCR.MoreParam.XianSeWenDu = it.Val.toFixedFormat(0);
                break;
            case "CODCR_显色时间"://暂无
                SDL_Global.CODCR.MoreParam.XianSeShiJian = it.Val.toFixedFormat(0);
                break;
            case "CODCR_板卡温度"://暂无
                SDL_Global.CODCR.MoreParam.BanKaWenDu = it.Val.toFixedFormat(2); //
                break;
            //日质控状态
            case "TP_日质控状态":
                SDL_Global.TP.RiZhiKongStatus = it.Val; //运行中、结束
                break;
            case "TP_日质控正常":
                SDL_Global.TP.RiZhiKongIsHeGe = it.Val; //合格、不合格
                break;
            case "TN_日质控状态":
                SDL_Global.TN.RiZhiKongStatus = it.Val; //
                break;
            case "TN_日质控正常":
                SDL_Global.TN.RiZhiKongIsHeGe = it.Val; //
                break;
            case "NH3_日质控状态":
                SDL_Global.NH3.RiZhiKongStatus = it.Val; //
                break;
            case "NH3_日质控正常":
                SDL_Global.NH3.RiZhiKongIsHeGe = it.Val; //
                break;
            case "COD_日质控状态":
                SDL_Global.COD.RiZhiKongStatus = it.Val; //
                break;
            case "CODCR_日质控状态":
                SDL_Global.CODCR.RiZhiKongStatus = it.Val; //
                break;
            case "COD_日质控正常":
                SDL_Global.COD.RiZhiKongIsHeGe = it.Val; //
                break;
            case "CODCR_日质控正常":
                SDL_Global.CODCR.RiZhiKongIsHeGe = it.Val; //
                break;
            //仪表试剂参数
            case "TP_R1试剂总量":
                SDL_Global.TP.R1ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R2试剂总量":
                SDL_Global.TP.R2ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R3试剂总量":
                SDL_Global.TP.R3ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R4试剂总量":
                SDL_Global.TP.R4ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R5试剂总量":
                SDL_Global.TP.R5ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R1试剂余量":
                SDL_Global.TP.R1ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R2试剂余量":
                SDL_Global.TP.R2ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R3试剂余量":
                SDL_Global.TP.R3ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R4试剂余量":
                SDL_Global.TP.R4ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_R5试剂余量":
                SDL_Global.TP.R5ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_空白试剂总量":
                SDL_Global.TP.KongBaiShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_标液试剂总量":
                SDL_Global.TP.BiaoYeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_零核试剂总量":
                SDL_Global.TP.LingHeShiJiZongLiang = it.Val;
                break;
            case "TP_跨核试剂总量":
                SDL_Global.TP.KuaHeShiJiZongLiang = it.Val;
                break;
            case "TP_标核试剂总量":
                SDL_Global.TP.BiaoHeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_空白试剂余量":
                SDL_Global.TP.KongBaiShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_标液试剂余量":
                SDL_Global.TP.BiaoYeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_零核试剂余量":
                SDL_Global.TP.LingHeShiJiYuLiang = it.Val;
                break;
            case "TP_跨核试剂余量":
                SDL_Global.TP.KuaHeShiJiYuLiang = it.Val;
                break;
            case "TP_标核试剂余量":
                SDL_Global.TP.BiaoHeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TP_低试剂预警阈值":
                SDL_Global.TP.DiShiJiYuJingYuZhi = it.Val.toFixedFormat(0);
                break;
            case "TP_低试剂告警阈值":
                SDL_Global.TP.QueShiJiGaoJingYuZhi = it.Val.toFixedFormat(0);
                break;
            case "TN_R1试剂总量":
                SDL_Global.TN.R1ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R2试剂总量":
                SDL_Global.TN.R2ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R3试剂总量":
                SDL_Global.TN.R3ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R4试剂总量":
                SDL_Global.TN.R4ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R5试剂总量":
                SDL_Global.TN.R5ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R1试剂余量":
                SDL_Global.TN.R1ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R2试剂余量":
                SDL_Global.TN.R2ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R3试剂余量":
                SDL_Global.TN.R3ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R4试剂余量":
                SDL_Global.TN.R4ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_R5试剂余量":
                SDL_Global.TN.R5ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_空白试剂总量":
                SDL_Global.TN.KongBaiShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_标液试剂总量":
                SDL_Global.TN.BiaoYeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_零核试剂总量":
                SDL_Global.TN.LingHeShiJiZongLiang = it.Val;
                break;
            case "TN_跨核试剂总量":
                SDL_Global.TN.KuaHeShiJiZongLiang = it.Val;
                break;
            case "TN_标核试剂总量":
                SDL_Global.TN.BiaoHeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_空白试剂余量":
                SDL_Global.TN.KongBaiShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_标液试剂余量":
                SDL_Global.TN.BiaoYeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_零核试剂余量":
                SDL_Global.TN.LingHeShiJiYuLiang = it.Val;
                break;
            case "TN_跨核试剂余量":
                SDL_Global.TN.KuaHeShiJiYuLiang = it.Val;
                break;
            case "TN_标核试剂余量":
                SDL_Global.TN.BiaoHeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "TN_低试剂预警阈值":
                SDL_Global.TN.DiShiJiYuJingYuZhi = it.Val.toFixedFormat(0);
                break;
            case "TN_低试剂告警阈值":
                SDL_Global.TN.QueShiJiGaoJingYuZhi = it.Val.toFixedFormat(0);
                break;

            case "NH3_R1试剂总量":
                SDL_Global.NH3.R1ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R2试剂总量":
                SDL_Global.NH3.R2ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R3试剂总量":
                SDL_Global.NH3.R3ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R4试剂总量":
                SDL_Global.NH3.R4ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R5试剂总量":
                SDL_Global.NH3.R5ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R1试剂余量":
                SDL_Global.NH3.R1ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R2试剂余量":
                SDL_Global.NH3.R2ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R3试剂余量":
                SDL_Global.NH3.R3ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R4试剂余量":
                SDL_Global.NH3.R4ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_R5试剂余量":
                SDL_Global.NH3.R5ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_空白试剂总量":
                SDL_Global.NH3.KongBaiShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_标液试剂总量":
                SDL_Global.NH3.BiaoYeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_零核试剂总量":
                SDL_Global.NH3.LingHeShiJiZongLiang = it.Val;
                break;
            case "NH3_跨核试剂总量":
                SDL_Global.NH3.KuaHeShiJiZongLiang = it.Val;
                break;
            case "NH3_标核试剂总量":
                SDL_Global.NH3.BiaoHeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_空白试剂余量":
                SDL_Global.NH3.KongBaiShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_标液试剂余量":
                SDL_Global.NH3.BiaoYeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_零核试剂余量":
                SDL_Global.NH3.LingHeShiJiYuLiang = it.Val;
                break;
            case "NH3_跨核试剂余量":
                SDL_Global.NH3.KuaHeShiJiYuLiang = it.Val;
                break;
            case "NH3_标核试剂余量":
                SDL_Global.NH3.BiaoHeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "NH3_低试剂预警阈值":
                SDL_Global.NH3.DiShiJiYuJingYuZhi = it.Val.toFixedFormat(0);
                break;
            case "NH3_低试剂告警阈值":
                SDL_Global.NH3.QueShiJiGaoJingYuZhi = it.Val.toFixedFormat(0);
                break;

            case "COD_R1试剂总量":
                SDL_Global.COD.R1ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R2试剂总量":
                SDL_Global.COD.R2ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R3试剂总量":
                SDL_Global.COD.R3ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R4试剂总量":
                SDL_Global.COD.R4ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R5试剂总量":
                SDL_Global.COD.R5ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R1试剂余量":
                SDL_Global.COD.R1ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R2试剂余量":
                SDL_Global.COD.R2ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R3试剂余量":
                SDL_Global.COD.R3ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R4试剂余量":
                SDL_Global.COD.R4ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_R5试剂余量":
                SDL_Global.COD.R5ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_空白试剂总量":
                SDL_Global.COD.KongBaiShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_标液试剂总量":
                SDL_Global.COD.BiaoYeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_零核试剂总量":
                SDL_Global.COD.LingHeShiJiZongLiang = it.Val;
                break;
            case "COD_跨核试剂总量":
                SDL_Global.COD.KuaHeShiJiZongLiang = it.Val;
                break;
            case "COD_标核试剂总量":
                SDL_Global.COD.BiaoHeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_空白试剂余量":
                SDL_Global.COD.KongBaiShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_标液试剂余量":
                SDL_Global.COD.BiaoYeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_零核试剂余量":
                SDL_Global.COD.LingHeShiJiYuLiang = it.Val;
                break;
            case "COD_跨核试剂余量":
                SDL_Global.COD.KuaHeShiJiYuLiang = it.Val;
                break;
            case "COD_标核试剂余量":
                SDL_Global.COD.BiaoHeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "COD_低试剂预警阈值":
                SDL_Global.COD.DiShiJiYuJingYuZhi = it.Val.toFixedFormat(0);
                break;
            case "COD_低试剂告警阈值":
                SDL_Global.COD.QueShiJiGaoJingYuZhi = it.Val.toFixedFormat(0);
                break;

            case "CODCR_R1试剂总量":
                SDL_Global.CODCR.R1ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R2试剂总量":
                SDL_Global.CODCR.R2ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R3试剂总量":
                SDL_Global.CODCR.R3ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R4试剂总量":
                SDL_Global.CODCR.R4ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R5试剂总量":
                SDL_Global.CODCR.R5ShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R1试剂余量":
                SDL_Global.CODCR.R1ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R2试剂余量":
                SDL_Global.CODCR.R2ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R3试剂余量":
                SDL_Global.CODCR.R3ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R4试剂余量":
                SDL_Global.CODCR.R4ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_R5试剂余量":
                SDL_Global.CODCR.R5ShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_空白试剂总量":
                SDL_Global.CODCR.KongBaiShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_标液试剂总量":
                SDL_Global.CODCR.BiaoYeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_零核试剂总量":
                SDL_Global.CODCR.LingHeShiJiZongLiang = it.Val;
                break;
            case "CODCR_跨核试剂总量":
                SDL_Global.CODCR.KuaHeShiJiZongLiang = it.Val;
                break;
            case "CODCR_标核试剂总量":
                SDL_Global.CODCR.BiaoHeShiJiZongLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_空白试剂余量":
                SDL_Global.CODCR.KongBaiShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_标液试剂余量":
                SDL_Global.CODCR.BiaoYeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_零核试剂余量":
                SDL_Global.CODCR.LingHeShiJiYuLiang = it.Val;
                break;
            case "CODCR_跨核试剂余量":
                SDL_Global.CODCR.KuaHeShiJiYuLiang = it.Val;
                break;
            case "CODCR_标核试剂余量":
                SDL_Global.CODCR.BiaoHeShiJiYuLiang = it.Val.toFixedFormat(0);
                break;
            case "CODCR_低试剂预警阈值":
                SDL_Global.CODCR.DiShiJiYuJingYuZhi = it.Val.toFixedFormat(0);
                break;
            case "CODCR_低试剂告警阈值":
                SDL_Global.CODCR.QueShiJiGaoJingYuZhi = it.Val.toFixedFormat(0);
                break;
        }
    }
    RenderFlowChart();
    RenderFlowChart_TSCJZ();

    //针对于新仪表
    if (version == '2000') {
        var datas = getNewRealData(SDL_Global["TP"].MoreParam);

        updateLastData(getNewRealData(SDL_Global["TP"].MoreParam), "TP");
        updateLastData(getNewRealData(SDL_Global["TN"].MoreParam), "TN");
        updateLastData(getNewRealData(SDL_Global["COD"].MoreParam), "COD");
        updateLastData(getNewRealData(SDL_Global["CODCR"].MoreParam), "CODCR");
        updateLastData(getNewRealData(SDL_Global["NH3"].MoreParam), "NH3");
    }
    // 更新浊度预处理当前采用哪种方式

    if (SDL_Global.PLC.ZhuoDuYuChuLi && localStorage.getItem("pretreatmentData")) {
        var pretreatmentData = JSON.parse(localStorage.getItem("pretreatmentData"));

        updatePretreatmentData(SDL_Global.WC.HunZhuoDu.LastTestData, pretreatmentData);
    }

}

function updatePretreatmentData(value, data) {
    data.forEach(function (item, index) {
        if (value >= item.MinVal && value < item.MaxVal) {
            item.isCurrent = true;
            switch (item.SortIndex) {
                case 1:
                    SDL_Global.YuChuLiFangShi.Name = '方式一';
                    break;
                case 2:
                    SDL_Global.YuChuLiFangShi.Name = '方式二';
                    break;
                case 3:
                    SDL_Global.YuChuLiFangShi.Name = '方式三';
                    break;
                case 4:
                    SDL_Global.YuChuLiFangShi.Name = '方式四';
                    break;
                default:
                    SDL_Global.YuChuLiFangShi.Name = '未知';
            }
            //SDL_Global.YuChuLiFangShi.Name = item.Title;
            SDL_Global.YuChuLiFangShi.MinVal = item.MinVal;
            SDL_Global.YuChuLiFangShi.MaxVal = item.MaxVal;
        }

    });
    localStorage.setItem("pretreatmentData", JSON.stringify(data));
}
function SoftType() {
    if (JSON.parse(localStorage.getItem("appConfig")) != null) {
        return JSON.parse(localStorage.getItem("appConfig")).SoftType
    }
}
//取最新一条数据
function updateLastData(obj, flag) {

    SDL_Global[flag].LastTestData = obj.value.toFixedFormat(SDL_Global[flag].Decimal);
    SDL_Global[flag].LastTestFlagText = obj.lable;//obj.lable
    SDL_Global[flag].LastTestDataFlag = obj.flags;//obj.flag

    SDL_Global[flag].LastTestTime = obj.time;
}

//给泵开启动态效果(弃用) 2022-11-15，更改为gif图片
// function bengGif(name, visible, timer) {
//     if (FlowChart[name]['visible']) {
//         if (!FlowChart[name]['timer']) {
//             let i = 1;
//             FlowChart[name]['timer'] = setInterval(function () {
//                 if (i > 3) i = 1;
//                 if (name == 'M4')
//                     FlowChart[name]['img'] = `lct/${name}_${SDL_Global.SoftType}_${SDL_Global.MainMeterLength}_${i}.png`; //"lct/" + name + "_" + i + ".png";
//                 else
//                     FlowChart[name]['img'] = "lct/" + name + "_" + i + ".png";
//                 // FlowChart[name]['zindex'] = 2;
//                 i++;
//             }, 300);
//         }
//     } else {
//         clearInterval(FlowChart[name]['timer']);
//         // FlowChart[name]['zindex'] = 1;
//         FlowChart[name]['timer'] = null;
//     }
// }

//根据站点类型，获取不同流程图主图
function getMainChart() {

    let meterDatas = SDL_Global.MetersData().filter(m => m.isMain && m.ID != 'CYQ');
    SDL_Global.MainMeterLength = meterDatas.length;
    //目前只支持5台仪表
    // if (SDL_Global.MainMeterLength > 5)
    //     SDL_Global.MainMeterLength = 5;
    //固定站、简易站
    if (SDL_Global.SoftType == 21 || SDL_Global.SoftType == 23) {
        FlowChart.SV13.img = `lct/SV13_${SDL_Global.MainMeterLength}_21.png`;
        FlowChart.SV15.img = `lct/SV15_${SDL_Global.MainMeterLength}_21.png`;
        FlowChart.M4.img = `lct/M4_${SDL_Global.MainMeterLength}.gif`;

        //大于4台仪表特殊处理宽度，否则会出现错位
        if (SDL_Global.MainMeterLength == 5) {
            FlowChart.BaseMap.w = 1282;
            FlowChart.SV13.w = 1282;
            FlowChart.SV15.w = 1282;
            FlowChart.M4.w = 1282;
        } else {
            FlowChart.BaseMap.w = 1166;
            FlowChart.SV13.w = 1166;
            FlowChart.SV15.w = 1166;
            FlowChart.M4.w = 1166;
        }

        FlowChart.BaseMap.img = `lct/BaseMap_${SDL_Global.SoftType}_${SDL_Global.MainMeterLength}.jpg`;
        //return `BaseMap_${SDL_Global.SoftType}_${SDL_Global.MainMeterLength}`;
    }
    else if (SDL_Global.SoftType == 22) {//小型站
        //根据配置文件，显示不同仪表
        meterDatas.map(function (item, index) {
            let _i = ++index;
            FlowChart[`YB_${_i}_22`].visible = true;
            //console.log(FlowChart[`YB_${_i}_22`].img);
            if (item.isJiaBiao) {
                FlowChart[`YB_${_i}_22`]['img'] = `lct/YBJB_${_i}_22_Empt.png`;
            } else {
                FlowChart[`YB_${_i}_22`]['img'] = `lct/YB_${_i}_22_Empt.png`;
            }
            // FlowChart[`YB_${_i}_22`].zindex = 1;
        })
        FlowChart.SV8.img = `lct/SV8_22.png`;
        FlowChart.SV10.img = `lct/SV10_22.png`;
        FlowChart.BaseMap.img = `lct/BaseMap_22_1.jpg`;//
        // return 'BaseMap_22_1';//目前没有设计多个主图，后期再设计
    } else {
        FlowChart.BaseMap.img = `lct/BaseMap_22_1.jpg`;//
    }
}

// 天水超级站重绘流程图
function RenderFlowChart_TSCJZ() {
    let Empt = "--";

    FlowChart.M1_TSCJZ.visible = (SDL_Global.PLC.M1Status === Empt ? false : SDL_Global.PLC.M1Status);
    // FlowChart[`M1_TSCJZ`].img = `TSCJZ_lct/m1.gif`;

    FlowChart.M2_TSCJZ.visible = (SDL_Global.PLC.M2Status === Empt ? false : SDL_Global.PLC.M2Status);
    // FlowChart[`M2_TSCJZ`].img = `TSCJZ_lct/m2.gif`;
    FlowChart.M3_TSCJZ.visible = (SDL_Global.PLC.M3Status === Empt ? false : SDL_Global.PLC.M3Status);
    // FlowChart[`M3_TSCJZ`].img = `TSCJZ_lct/m3.gif`;
    FlowChart.M6_TSCJZ.visible = (SDL_Global.PLC.M6Status === Empt ? false : SDL_Global.PLC.M6Status);
    // FlowChart[`M6_TSCJZ`].img = `TSCJZ_lct/m6.gif`;

    FlowChart.sv1_TSCJZ.visible = (SDL_Global.PLC.SV1Status === Empt ? false : SDL_Global.PLC.SV1Status);
    FlowChart.sv2_TSCJZ.visible = (SDL_Global.PLC.SV2Status === Empt ? false : SDL_Global.PLC.SV2Status);

    FlowChart.sv3_TSCJZ.visible = (SDL_Global.PLC.SV3Status === Empt ? false : SDL_Global.PLC.SV3Status);
    FlowChart.sv4_TSCJZ.visible = (SDL_Global.PLC.SV4Status === Empt ? false : SDL_Global.PLC.SV4Status);
    FlowChart.sv5_TSCJZ.visible = (SDL_Global.PLC.SV5Status === Empt ? false : SDL_Global.PLC.SV5Status);
    FlowChart.sv19_TSCJZ.visible = (SDL_Global.PLC.SV19Status === Empt ? false : SDL_Global.PLC.SV19Status);
    FlowChart.sv20_TSCJZ.visible = (SDL_Global.PLC.SV20Status === Empt ? false : SDL_Global.PLC.SV20Status);
    FlowChart.sv21_TSCJZ.visible = (SDL_Global.PLC.SV21Status === Empt ? false : SDL_Global.PLC.SV21Status);
    FlowChart.sv22_TSCJZ.visible = (SDL_Global.PLC.SV22Status === Empt ? false : SDL_Global.PLC.SV22Status);

    if (FlowChart.sv1_TSCJZ.visible) {
        if (FlowChart.sv5_TSCJZ.visible) {
            FlowChart[`sv1_TSCJZ`].img = 'TSCJZ_lct/sv1.png'
        } else {
            FlowChart[`sv1_TSCJZ`].img = 'TSCJZ_lct/sv1caishui.png'
        }
    }
    if (FlowChart.sv2_TSCJZ.visible) {
        if (FlowChart.sv5_TSCJZ.visible) {
            FlowChart[`sv2_TSCJZ`].img = 'TSCJZ_lct/sv2.png'
        } else {
            FlowChart[`sv2_TSCJZ`].img = 'TSCJZ_lct/sv2caishui.png'
        }
    }
    //采样杯6
    FlowChart.CYB_water_6.visible = (SDL_Global.PLC.CaiYang6ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang6ChuZaoFault);
    //优先故障颜色显示
    if (FlowChart.CYB_water_6.visible) {

        FlowChart.CYB_water_6.img = `TSCJZ_lct/swdxAlarm.png`;
    } else {
        //装满水的颜色
        FlowChart.CYB_water_6.visible = SDL_Global.PLC.CaiYangBei6YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei6YeWei;
        FlowChart.CYB_water_6.visible && (FlowChart.CYB_water_6.img = `TSCJZ_lct/swdx.png`);
    }
    //采样杯7
    FlowChart.CYB_water_7.visible = (SDL_Global.PLC.CaiYang7ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang7ChuZaoFault);
    //优先故障颜色显示
    if (FlowChart.CYB_water_7.visible) {
        FlowChart.CYB_water_7.img = `TSCJZ_lct/vocAlarm.png`;
    } else {
        //装满水的颜色
        FlowChart.CYB_water_7.visible = SDL_Global.PLC.CaiYangBei7YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei7YeWei;
        FlowChart.CYB_water_7.visible && (FlowChart.CYB_water_7.img = `TSCJZ_lct/voc.png`);
    }
}
//重绘流程图(地表水固定站21、地表水小型站22、地表水简易站23)
function RenderFlowChart() {
    // console.log('RenderFlowChart=', true);
    try {
        let Empt = "--";

        FlowChart.M1.visible = (SDL_Global.PLC.M1Status === Empt ? false : SDL_Global.PLC.M1Status);
        FlowChart.M1_FC.visible = (SDL_Global.PLC.M1Status === Empt ? false : SDL_Global.PLC.M1Status);
        FlowChart.M2_FC.visible = (SDL_Global.PLC.M2Status === Empt ? false : SDL_Global.PLC.M2Status);
        // bengGif('M1', FlowChart.M1.visible, FlowChart.M1.timer);

        FlowChart.M2.visible = (SDL_Global.PLC.M2Status === Empt ? false : SDL_Global.PLC.M2Status);
        // bengGif('M2', FlowChart.M2.visible, FlowChart.M2.timer);

        FlowChart.M3.visible = (SDL_Global.PLC.M3Status === Empt ? false : SDL_Global.PLC.M3Status);
        // bengGif('M3', FlowChart.M3.visible, FlowChart.M3.timer);

        FlowChart.M6.visible = (SDL_Global.PLC.M6Status === Empt ? false : SDL_Global.PLC.M6Status);
        // bengGif('M6', FlowChart.M6.visible, FlowChart.M6.timer);
        FlowChart.sv1_fuchuan.visible = (SDL_Global.PLC.SV1Status === Empt ? false : SDL_Global.PLC.SV1Status);
        FlowChart.SV2_fuchuan.visible = (SDL_Global.PLC.SV2Status === Empt ? false : SDL_Global.PLC.SV2Status);
        FlowChart.SV3_fuchuan.visible = (SDL_Global.PLC.SV9Status === Empt ? false : SDL_Global.PLC.SV9Status);
        FlowChart.SV4_fuchuan.visible = (SDL_Global.PLC.SV6Status === Empt ? false : SDL_Global.PLC.SV6Status);
        FlowChart.SV5_fuchuan.visible = (SDL_Global.PLC.SV11Status === Empt ? false : SDL_Global.PLC.SV11Status);

        FlowChart.CDCdi_FC.visible = (SDL_Global.PLC.ShuiYangYeWeiDi === Empt ? false : SDL_Global.PLC.ShuiYangYeWeiDi);
        FlowChart.CDCgao_FC.visible = (SDL_Global.PLC.ShuiYangYeWeiGao === Empt ? false : SDL_Global.PLC.ShuiYangYeWeiGao);

        if (SDL_Global.PLC.ShuiYangYeWeiDi == false && SDL_Global.PLC.ShuiYangYeWeiGao == false) {
            FlowChart.CDC_FC.visible = true;
        } else {
            FlowChart.CDC_FC.visible = false;

        }
        // FlowChart.CDC_FC.visible = (SDL_Global.PLC.ChenDianChiYeWei === Empt ? false : SDL_Global.PLC.ChenDianChiYeWei);

        FlowChart.SV1.visible = (SDL_Global.PLC.SV1Status === Empt ? false : SDL_Global.PLC.SV1Status);
        FlowChart.SV2.visible = (SDL_Global.PLC.SV2Status === Empt ? false : SDL_Global.PLC.SV2Status);
        FlowChart.SV3.visible = (SDL_Global.PLC.SV3Status === Empt ? false : SDL_Global.PLC.SV3Status);
        FlowChart.SV4.visible = (SDL_Global.PLC.SV4Status === Empt ? false : SDL_Global.PLC.SV4Status);
        FlowChart.SV7.visible = (SDL_Global.PLC.SV7Status === Empt ? false : SDL_Global.PLC.SV7Status);
        FlowChart.SV8.visible = (SDL_Global.PLC.SV8Status === Empt ? false : SDL_Global.PLC.SV8Status);
        FlowChart.SV9.visible = (SDL_Global.PLC.SV9Status === Empt ? false : SDL_Global.PLC.SV9Status);
        FlowChart.SV10.visible = (SDL_Global.PLC.SV10Status === Empt ? false : SDL_Global.PLC.SV10Status);
        FlowChart.SV11.visible = (SDL_Global.PLC.SV11Status === Empt ? false : SDL_Global.PLC.SV11Status);
        FlowChart.SV12.visible = (SDL_Global.PLC.SV12Status === Empt ? false : SDL_Global.PLC.SV12Status);

        //五参数池
        FlowChart.WuCanAlarm.visible = SDL_Global.PLC.CaiShuiWuCanYeWeiAlarm === Empt ? false : SDL_Global.PLC.CaiShuiWuCanYeWeiAlarm;
        FlowChart.WuCan.visible = SDL_Global.PLC.WuCanShuChiYeWei === Empt ? false : SDL_Global.PLC.WuCanShuChiYeWei;

        //沉淀池
        FlowChart.CDCAlarm.visible = SDL_Global.PLC.ChenDianChiYeWeiAlarm === Empt ? false : SDL_Global.PLC.ChenDianChiYeWeiAlarm;
        FlowChart.CDC.visible = SDL_Global.PLC.ChenDianChiYeWei === Empt ? false : SDL_Global.PLC.ChenDianChiYeWei;

        //根据仪表状态，让仪表管路变色
        if (SDL_Global.SoftType == 22) {
            SDL_Global.MetersData().filter(m => m.IsNormal).map(function (item, index) {
                // debugger
                //console.log(item);
                let _j = ++index;
                //非空闲并且通讯正常
                // FlowChart[`YB_${_j}_22`].visible = true;
                if (item.MeterStatus > 0) {

                    if (item.isJiaBiao) {
                        FlowChart[`YB_${_j}_22`].img = `lct/YBJB_${_j}_22.png`;
                    } else {
                        FlowChart[`YB_${_j}_22`].img = `lct/YB_${_j}_22.png`;
                    }
                    FlowChart[`YB_${_j}_22`].zindex = 1;
                } else {
                    // FlowChart[`YB_${_j}_22`].visible = false;
                    if (item.isJiaBiao) {
                        FlowChart[`YB_${_j}_22`]['img'] = `lct/YBJB_${_j}_22_Empt.png`;
                    } else {
                        FlowChart[`YB_${_j}_22`]['img'] = `lct/YB_${_j}_22_Empt.png`;
                    }
                    FlowChart[`YB_${_j}_22`].zindex = 0;
                }
            })
        }

        //固定站、简易站才有这些阀门管路(包含4参数排水管路)
        if (SDL_Global.SoftType == 21 || SDL_Global.SoftType == 23) {

            FlowChart.M4.visible = (SDL_Global.PLC.M4Status === Empt ? false : SDL_Global.PLC.M4Status);
            // bengGif('M4', FlowChart.M4.visible, FlowChart.M4.timer);
            FlowChart.SV5.visible = (SDL_Global.PLC.SV5Status === Empt ? false : SDL_Global.PLC.SV5Status);
            FlowChart.SV6.visible = (SDL_Global.PLC.SV6Status === Empt ? false : SDL_Global.PLC.SV6Status);
            FlowChart.SV13.visible = (SDL_Global.PLC.SV13Status === Empt ? false : SDL_Global.PLC.SV13Status);
            FlowChart.SV14.visible = (SDL_Global.PLC.SV14Status === Empt ? false : SDL_Global.PLC.SV14Status);
            FlowChart.SV15.visible = (SDL_Global.PLC.SV15Status === Empt ? false : SDL_Global.PLC.SV15Status);

            //采样杯1
            FlowChart.CYB_water_1.visible = (SDL_Global.PLC.CaiYang1PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang1PeiShuiFault) || (SDL_Global.PLC.CaiYang1ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang1ChuZaoFault);
            //优先故障颜色显示
            if (FlowChart.CYB_water_1.visible) {
                FlowChart.CYB_water_1.img = `lct/CYB_alarm_1.png`;
            } else {
                //装满水的颜色
                FlowChart.CYB_water_1.visible = SDL_Global.PLC.CaiYangBei1YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei1YeWei;
                FlowChart.CYB_water_1.visible && (FlowChart.CYB_water_1.img = `lct/CYB_water_1.png`);
            }
            if (SDL_Global.MainMeterLength > 1) {
                //采样杯2
                FlowChart.CYB_water_2.visible = (SDL_Global.PLC.CaiYang2PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang2PeiShuiFault) || (SDL_Global.PLC.CaiYang2ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang2ChuZaoFault);
                //优先故障颜色显示
                if (FlowChart.CYB_water_2.visible) {
                    FlowChart.CYB_water_2.img = `lct/CYB_alarm_2.png`;
                } else {
                    //装满水的颜色
                    FlowChart.CYB_water_2.visible = SDL_Global.PLC.CaiYangBei2YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei2YeWei;
                    FlowChart.CYB_water_2.visible && (FlowChart.CYB_water_2.img = `lct/CYB_water_2.png`);
                }
            }
            if (SDL_Global.MainMeterLength > 2) {
                //采样杯3
                FlowChart.CYB_water_3.visible = (SDL_Global.PLC.CaiYang3PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang3PeiShuiFault) || (SDL_Global.PLC.CaiYang3ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang3ChuZaoFault);
                //优先故障颜色显示
                if (FlowChart.CYB_water_3.visible) {
                    FlowChart.CYB_water_3.img = `lct/CYB_alarm_3.png`;
                } else {
                    //装满水的颜色
                    FlowChart.CYB_water_3.visible = SDL_Global.PLC.CaiYangBei3YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei3YeWei;
                    FlowChart.CYB_water_3.visible && (FlowChart.CYB_water_3.img = `lct/CYB_water_3.png`);
                }
            }
            if (SDL_Global.MainMeterLength > 3) {
                //采样杯4
                FlowChart.CYB_water_4.visible = (SDL_Global.PLC.CaiYang4PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang4PeiShuiFault) || (SDL_Global.PLC.CaiYang4ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang4ChuZaoFault);
                //优先故障颜色显示
                if (FlowChart.CYB_water_4.visible) {
                    FlowChart.CYB_water_4.img = `lct/CYB_alarm_4.png`;
                } else {
                    //装满水的颜色
                    FlowChart.CYB_water_4.visible = SDL_Global.PLC.CaiYangBei4YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei4YeWei;
                    FlowChart.CYB_water_4.visible && (FlowChart.CYB_water_4.img = `lct/CYB_water_4.png`);
                }
            }

            if (SDL_Global.MainMeterLength > 4) {
                //采样杯4
                FlowChart.CYB_water_5.visible = (SDL_Global.PLC.CaiYang5PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang5PeiShuiFault) || (SDL_Global.PLC.CaiYang5ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang5ChuZaoFault);
                //优先故障颜色显示
                if (FlowChart.CYB_water_5.visible) {
                    FlowChart.CYB_water_5.img = `lct/CYB_alarm_5.png`;
                } else {
                    //装满水的颜色
                    FlowChart.CYB_water_5.visible = SDL_Global.PLC.CaiYangBei5YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei5YeWei;
                    FlowChart.CYB_water_5.visible && (FlowChart.CYB_water_5.img = `lct/CYB_water_5.png`);
                }
            }





            // //总磷故障
            // FlowChart.TPAlarm.visible = (SDL_Global.PLC.CaiYang1PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang1PeiShuiFault) || (SDL_Global.PLC.CaiYang1ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang1ChuZaoFault);
            // FlowChart.TP.visible = SDL_Global.PLC.CaiYangBei1YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei1YeWei;

            // //总氮故障
            // FlowChart.TNAlarm.visible = (SDL_Global.PLC.CaiYang2PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang2PeiShuiFault) || (SDL_Global.PLC.CaiYang2ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang2ChuZaoFault);
            // FlowChart.TN.visible = SDL_Global.PLC.CaiYangBei2YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei2YeWei;

            // //高锰酸盐故障
            // FlowChart.CODAlarm.visible = (SDL_Global.PLC.CaiYang3PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang3PeiShuiFault) || (SDL_Global.PLC.CaiYang3ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang3ChuZaoFault);
            // FlowChart.COD.visible = SDL_Global.PLC.CaiYangBei3YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei3YeWei;

            // //氨氮故障
            // FlowChart.NH3Alarm.visible = (SDL_Global.PLC.CaiYang4PeiShuiFault === Empt ? false : SDL_Global.PLC.CaiYang4PeiShuiFault) || (SDL_Global.PLC.CaiYang4ChuZaoFault === Empt ? false : SDL_Global.PLC.CaiYang4ChuZaoFault);
            // FlowChart.NH3.visible = SDL_Global.PLC.CaiYangBei4YeWei === Empt ? false : SDL_Global.PLC.CaiYangBei4YeWei;

            //化学需氧量
        }
        // FlowChart.SV3.visible = true;
        // FlowChart.SV2.visible = true;
        //FlowChart.SV10.img = "lct/SV10Clean_22.png";
        //1、SV3阀打开后清洗管路时，SV1、SV2也开着的时候，SV1与SV2管路需要变为清洗颜色
        //2、SV3阀打开后清洗管路时，SV9、SV10也开着的时候,SV9、SV10需要变为清洗颜色
        if (FlowChart.SV3.visible) {
            //当SV3打开,如果管路图片为水样颜色，则需要换成清洗颜色

            if (FlowChart.SV1.visible && FlowChart.SV1.img.indexOf("Clean") == -1) {
                //主图为小型站或简易站
                if (SDL_Global.SoftType == 22 || SDL_Global.SoftType == 23) {
                    //需要显示另外一种图片（因为去掉了SV5）
                    FlowChart.SV1.img = "lct/SV1Clean_22.png";
                } else {
                    FlowChart.SV1.img = "lct/SV1Clean.png";
                }
            }

            if (FlowChart.SV2.visible && FlowChart.SV2.img.indexOf("Clean") == -1) {
                //主图为小型站或简易站
                if (SDL_Global.SoftType == 22 || SDL_Global.SoftType == 23) {
                    //需要显示另外一种图片（因为去掉了SV5）
                    FlowChart.SV2.img = "lct/SV2Clean_22.png";
                } else {
                    FlowChart.SV2.img = "lct/SV2Clean.png";
                }
            }

            if (FlowChart.SV10.visible && FlowChart.SV10.img.indexOf("Clean") == -1) {
                //主图为小型站
                if (SDL_Global.SoftType == 22) {
                    //需要显示另外一种图片（因为去掉了SV13）
                    FlowChart.SV10.img = "lct/SV10Clean_22.png";
                } else {
                    FlowChart.SV10.img = "lct/SV10Clean.png";
                }
            }

            if (FlowChart.SV9.visible && FlowChart.SV9.img.indexOf("Clean") == -1) FlowChart.SV9.img = "lct/SV9Clean.png";
        }
        else {

            //当SV3关闭,如果管路图片为清洗颜色，则需要换成水样颜色

            if (FlowChart.SV1.visible && FlowChart.SV1.img.endsWith("1.png") == false) FlowChart.SV1.img = "lct/SV1.png";
            if (FlowChart.SV2.visible && FlowChart.SV2.img.endsWith("2.png") == false) FlowChart.SV2.img = "lct/SV2.png";
            if (FlowChart.SV9.visible && FlowChart.SV9.img.endsWith("9.png") == false) FlowChart.SV9.img = "lct/SV9.png";

            if (FlowChart.SV10.visible && FlowChart.SV10.img.indexOf("Clean") != -1) {
                //主图为小型站
                if (SDL_Global.SoftType == 22) {
                    //需要显示另外一种图片（因为去掉了SV13）
                    FlowChart.SV10.img = "lct/SV10_22.png";
                } else {
                    FlowChart.SV10.img = "lct/SV10.png";
                }
            }
        }

        //固定站
        if (SDL_Global.SoftType == 21) {
            //SV1、SV2、SV5、SV7、SV8同时开时,采水完成后，排空清洗管路中清洗水
            if (FlowChart.SV1.visible && FlowChart.SV2.visible && FlowChart.SV5.visible
                && FlowChart.SV7.visible && FlowChart.SV8.visible) {
                if (FlowChart.SV1.img.endsWith("Empt.png") == false) FlowChart.SV1.img = "lct/SV1Empt.png";
                if (FlowChart.SV2.img.endsWith("Empt.png") == false) FlowChart.SV2.img = "lct/SV2Empt.png";
                if (FlowChart.SV5.img.endsWith("Empt.png") == false) FlowChart.SV5.img = "lct/SV5Empt.png";
                if (FlowChart.SV7.img.endsWith("Empt.png") == false) FlowChart.SV7.img = "lct/SV7Empt.png";
                if (FlowChart.SV8.img.endsWith("Empt.png") == false) FlowChart.SV8.img = "lct/SV8Empt.png";
            }
            else {
                if (FlowChart.SV5.img.endsWith("5.png") == false) FlowChart.SV5.img = "lct/SV5.png";
                if (FlowChart.SV7.img.endsWith("7.png") == false) FlowChart.SV7.img = "lct/SV7.png";
                if (FlowChart.SV8.img.endsWith("8.png") == false) FlowChart.SV8.img = "lct/SV8.png";
                if (FlowChart.SV3.visible) {
                    if (FlowChart.SV1.visible && FlowChart.SV1.img.endsWith("Clean.png") == false) FlowChart.SV1.img = "lct/SV1Clean.png";
                    if (FlowChart.SV2.visible && FlowChart.SV2.img.endsWith("Clean.png") == false) FlowChart.SV2.img = "lct/SV2Clean.png";
                }
                else {
                    if (FlowChart.SV1.visible && FlowChart.SV1.img.endsWith("1.png") == false) FlowChart.SV1.img = "lct/SV1.png";
                    if (FlowChart.SV2.visible && FlowChart.SV2.img.endsWith("2.png") == false) FlowChart.SV2.img = "lct/SV2.png";
                }
            }
        } else if (SDL_Global.SoftType == 22 || SDL_Global.SoftType == 23) {

            if (SDL_Global.SoftType == 22) {
                FlowChart.SV12.visible && (FlowChart.SV12.img = "lct/SV12_22.png");
                FlowChart.SV4.visible && (FlowChart.SV4.img = "lct/SV4_22.png");
            }

            //SV1、SV2、SV5、SV7、SV8同时开时,采水完成后，排空清洗管路中清洗水
            if (FlowChart.SV1.visible && FlowChart.SV2.visible
                && FlowChart.SV7.visible && FlowChart.SV8.visible) {
                if (FlowChart.SV1.img.endsWith("Empt.png") == false) FlowChart.SV1.img = "lct/SV1Empt.png";
                if (FlowChart.SV2.img.endsWith("Empt.png") == false) FlowChart.SV2.img = "lct/SV2Empt.png";
                //if (FlowChart.SV5.img.endsWith("Empt.png") == false) FlowChart.SV5.img = "lct/SV5Empt.png";
                if (FlowChart.SV7.img.endsWith("Empt.png") == false) FlowChart.SV7.img = "lct/SV7Empt.png";
                if (FlowChart.SV8.img.endsWith("Empt.png") == false) FlowChart.SV8.img = "lct/SV8Empt.png";
            }
            else {
                //if (FlowChart.SV5.img.endsWith("5.png") == false) FlowChart.SV5.img = "lct/SV5.png";
                if (FlowChart.SV7.img.endsWith("7.png") == false) FlowChart.SV7.img = "lct/SV7.png";
                if (SDL_Global.SoftType == 22) {
                    if (FlowChart.SV8.img.endsWith("8_22.png") == false) FlowChart.SV8.img = "lct/SV8_22.png";
                } else {
                    if (FlowChart.SV8.img.endsWith("8.png") == false) FlowChart.SV8.img = "lct/SV8.png";
                }


                if (FlowChart.SV3.visible) {
                    if (FlowChart.SV1.visible && FlowChart.SV1.img.endsWith("Clean_22.png") == false) FlowChart.SV1.img = "lct/SV1Clean_22.png";
                    if (FlowChart.SV2.visible && FlowChart.SV2.img.endsWith("Clean_22.png") == false) FlowChart.SV2.img = "lct/SV2Clean_22.png";
                }
                else {
                    if (FlowChart.SV1.visible && FlowChart.SV1.img.endsWith("1.png") == false) FlowChart.SV1.img = "lct/SV1.png";
                    if (FlowChart.SV2.visible && FlowChart.SV2.img.endsWith("2.png") == false) FlowChart.SV2.img = "lct/SV2.png";
                }
            }
        }

        // FlowChart.SV10.img = "lct/SV10Clean_22.png";
        // FlowChart.SV10.visible = true;


    }
    catch (e) {
        console.log(e);
    }
}
//根据测量模式状态返回文本
function formatPLCMoShiStatusToText(status) {
    status = status == '--' ? -1 : status;
    //  SDL_Global.SYS.KaiQiRiZhiKong 
    switch ((+status)) {
        case 1:
            return "维护模式";
        case 2:
            return "间歇模式";
        case 4:
            return "应急模式";
        case 8:
            return "质控模式";
        case 5:
            return "定点模式";
        default:
            return "未知";

    };
}
//根据状态码返回仪表状态文本
function formatYBStatusToText(status) {
    status = status == '--' ? -1 : status;

    switch ((+status)) {
        case 0:
            return "空闲";
        case 1:
            return "水样测试中";
        case 2:
            return "标样核查中";
        case 3:
            return "零点核查中";
        case 4:
            return "跨度核查中";
        case 5:
            return "空白测试中";
        case 6:
            return "平行样测试中";
        case 7:
            return "加标回收中";
        case 8:
            return "空白校准中";
        case 9:
            return "标样校准中";
        case 10:
            return "初始化(清洗)中";
        case 11:
            return "停止测试中";
        case 19:
            return "标定中";
        case 21:
            return "更换试剂中";
        case 22:
            return "自动检测中";
        case 23:
            return "低浓度漂移";
        case 24:
            return "高浓度漂移";
        case 25:
            return "重复性";
        case 26:
            return "示值误差";
        case 27:
            return "准确度_精密度";
        case 28:
            return "检出限";
        case 29:
            return "一键自检中";
        default:
            return "未知";
    };
}
function formatSWDXYBStatusToText(status) {
    status = status == '--' ? -1 : status;
    // { 1, "维护" },{ 3, "校准" },{ 7, "测量" },{ 9, "待机" },{ 50, "增殖培养" },{ 51, "修复" }
    switch ((+status)) {

        case 1:
            return "维护";
        case 3:
            return "校准";

        case 7:
            return "测量";

        case 9:
            return "待机";
        case 50:
            return "增殖培养";
        case 51:
            return "修复";

        default:
            return "未知";
    };
}
//根据测量模式状态返回文本
function formatCeLiangMoShiStatusToText(status) {
    status = status == '--' ? -1 : status;

    switch ((+status)) {
        case 1:
            return "连续模式";
        case 2:
            return "周期模式";
        case 3:
            return "定点模式";
        case 4:
            return "受控模式";
        case 5:
            return "手动模式";
        default:
            return "未知";
    };
}


//根据状态码返回加标子流程状态文本
function formatJBSubStatusToText(status) {
    status = status == '--' ? -1 : status;

    switch ((+status)) {
        case 0:
            return "空闲";
        case 1:
            return "低中液位定量";
        case 2:
            return "高液位定量";
        case 3:
            return "计量器排空";
        case 4:
            return "注入混均杯";
        case 5:
            return "检查液位传感器";
        case 6:
            return "计量器润洗";
        case 7:
            return "混均杯排空";
        case 8:
            return "抽取空白";
        default:
            return "无";
    };
}

//根据状态码返回加标报警状态文本
function formatJBAlarmStatusToText(status) {
    status = status == '--' ? -1 : status;

    switch ((+status)) {
        case 0:
            return "无故障";
        case 1:
            return "液位传感器故障";
        case 2:
            return "进样故障";
        case 3:
            return "排液故障";
        case 4:
            return "排空故障";
        case 5:
            return "未采到空白";
        case 6:
            return "未采到水样";
        case 7:
            return "未采到标液1";
        case 8:
            return "未采到标液2";
        default:
            return "无";
    };
}

//根据状态码返回仪表报警状态文本
function formatYBAlarmStatusToText(status) {
    status = status == '--' ? -1 : status;

    switch ((+status)) {
        case 0:
            return "无告警";
        case 1:
            return "缺试剂告警";
        case 2:
            return "缺水样告警";
        case 3:
            return "缺纯水告警";//缺纯水
        case 4:
            return "缺标液告警";
        case 5:
            return "仪表漏液告警";
        case 6:
            return "标定异常告警";
        case 7:
            return "超量程告警";
        case 8:
            return "加热异常";
        case 9:
            return "低试剂预警";
        case 10:
            return "超上限告警";
        case 11:
            return "超下限告警";
        case 12:
            return "仪表内部其他异常";
        case 13:
            return "滴定异常告警";
        case 14:
            return "电极异常告警";
        case 15:
            return "量程切换告警";
        case 16:
            return "参数设置告警";
        case 17:
            return "pH 电极电位异常";
        case 18:
            return "电导率电极异常";
        case 19:
            return "浊度光度异常";
        case 20:
            return "溶解氧电极异常";
        case 21:
            return "溶解氧光强异常";
        case 22:
            return "液位异常告警";
        //新仪表 
        // case 100:
        //     return "缺试剂告警";
        case 100:
            return "缺试剂1告警";
        case 101:
            return "缺试剂2告警";
        case 102:
            return "缺试剂3告警";
        case 103:
            return "缺试剂4告警";
        //新仪表
        case 200:
            return "缺水样告警";
        case 201:
            return "缺加标样告警";
        case 202:
            return "缺零点核查样告警";
        case 203:
            return "缺跨度核查样告警";
        case 204:
            return "空白测试样告警";
        case 205:
            return "标样核查样告警";
        case 206:
            return "缺平行测试样告警";

        default:
            return "无";
    };
}
//根据状态码返回仪表报警状态文本
function formatSWDXYBAlarmStatusToText(status) {
    status = status == '--' ? -1 : status;
    // public Dictionary<ushort, string> DicAlarm = new Dictionary<ushort, string> {
    //     { 12, "传感器错误" },{ 21, "水样不足" },{ 22, "水样不足解除" },{ 23, "培养液不足" },
    //     { 24, "培养液不足解除" },{ 32, "下降注意" },{ 33,"上升注意"},{ 34,"下降注意1"},
    //     { 35,"上升注意1"},{ 36,"下降注意2"},{37 ,"上升注意2"},{ 38,"下降注意3"},
    //     { 39,"上升注意3"},{ 40,"下降警报"},{ 41,"上升警报"},
    //     { 42,"传感器注意"},{ 43,"传感器警报"},{ 50,"DAQ disconnect"},{ 51,"DAQ reconnect"}
    // };
    switch ((+status)) {
        case 0:
            return "无告警";
        case 12:
            return "传感器错误";
        case 21:
            return "水样不足";
        case 22:
            return "水样不足解除";//缺纯水
        case 23:
            return "培养液不足";
        case 24:
            return "培养液不足解除";
        case 32:
            return "下降注意";
        case 33:
            return "上升注意";
        case 34:
            return "下降注意1";
        case 35:
            return "上升注意1";
        case 36:
            return "下降注意2";
        case 37:
            return "上升注意2";
        case 38:
            return "下降注意3";
        case 39:
            return "上升注意3";
        case 40:
            return "下降警报";
        case 41:
            return "上升警报";
        case 42:
            return "传感器注意";
        case 43:
            return "传感器警报";
        case 50:
            return "DAQ disconnect";
        case 51:
            return "DAQ reconnect";




        default:
            return "无";
    };
}


//根据状态码返回仪表故障状态文本
function formatFaultStatusToText(status) {
    status = status == '--' ? -1 : status;

    switch ((+status)) {
        case 0:
            return "无故障";
        case 1:
            return "电机故障";
        case 2:
            return "温度故障";
        case 3:
            return "通讯故障";
        case 4:
            return "滴定故障";
        case 5:
            return "光源故障";
        case 6:
            return "鼓风机故障";
        case 7:
            return "废液阀故障";
        case 8:
            return "消解阀故障";
        case 9:
            return "高液位传感器故障";
        case 10:
            return "中液位传感器故障";
        case 11:
            return "低液位传感器故障";
        case 12:
            return "光谱仪连接故障";
        default:
            return "无";
    };
}
//获取最新的实时数据及状态
function getNewRealData(obj) {
    try {

        var data = [{
            lable: '水样数据',
            time: obj.ShuiYangShuJuShiJian,
            value: obj.ShuiYangShiCeZhi,
            flags: obj.ShuiYangShuJuFlag
        }, {
            lable: '标样数据',
            time: obj.BiaoYangShuJuShiJian,
            value: obj.BiaoYangShiCeZhi,
            flags: obj.BiaoYangShuJuFlag

        }, {
            lable: '空白数据',
            time: obj.KongBaiShuJuShiJian,
            value: obj.KongBaiShiCeZhi,
            flags: obj.KongBaiShuJuFlag

        }, {
            lable: '零点数据',
            time: obj.LingDianHeChaShuJuShiJian,
            value: obj.LingDianHeChaShiCeZhi,
            flags: obj.LingDianHeChaShuJuFlag
        }, {
            lable: '跨度数据',
            time: obj.KuaDuHeChaShuJuShiJian,
            value: obj.KuaDuHeChaShiCeZhi,
            flags: obj.KuaDuHeChaShuJuFlag
        }, {
            lable: '加标数据',
            time: obj.JiaBiaoHuiShouShuJuShiJian,
            value: obj.JiaBiaoHuiShouShiCeZhi,
            flags: obj.JiaBiaoHuiShouShuJuFlag
        }, {
            lable: '平行样数据',
            time: obj.PingXingYangShuJuShiJian,
            value: obj.PingXingYangShiCeZhi,
            flags: obj.PingXingYangShuJuFlag
        }];
        function compare(property) {

            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return Date.parse(value1) <= Date.parse(value2) ? 1 : -1;
            }
        }

        return data.sort(compare('time'))[0];
    } catch (e) {
        console.log('error-getNewRealData=', obj);
    }

}
//根据Code匹配对应Name
function getCodeNameData(code) {
    var data = this.SDL_Global.MetersData();
    var names = data.filter(m => m.Code == code);
    if (names && names.length > 0) {
        return names[0].Name;
    }
    return code;
    if (PolID == "w21011") {
        return "总磷";
    } else if (PolID == "w21001") {
        return "总氮";
    } else if (PolID == "w21003") {
        return "氨氮";
    } else if (PolID == "w01019") {
        return "高锰酸盐指数";
    } else if (PolID == "w01018") {
        return "化学需氧量";
    } else if (PolID == "w01009") {
        return "溶解氧";
    } else if (PolID == "w01014") {
        return "电导率";
    } else if (PolID == "w01003") {
        return "浊度";
    } else if (PolID == "w01001") {
        return "pH值";
    } else if (PolID == "w01010") {
        return "水温";
    } else if (PolID == "w01016") {
        return "叶绿素";
    } else if (PolID == "w19011") {
        return "藻密度";
    } else if (PolID == "w20120") {
        return "铅";
    } else if (PolID == "w20115") {
        return "镉";
    } else if (PolID == "w20122") {
        return "铜";
    } else if (PolID == "w20123") {
        return "锌";
    } else if (PolID == "w24017") {
        return "1,2—二氯乙烷";
    } else if (PolID == "w25003") {
        return "甲苯";
    } else if (PolID == "w25010") {
        return "氯苯";
    } else if (PolID == "w25011") {
        return "1,2—二氯苯";
    } else if (PolID == "w25013") {
        return "1,4—二氯苯";
    } else if (PolID == "w25034") {
        return "异丙苯";
    } else if (PolID == "w25038") {
        return "苯乙烯";
    } else if (PolID == "w25073") {
        return "对、间二甲苯";
    } else if (PolID == "w24009") {
        return "三溴甲烷";
    } else if (PolID == "w24004") {
        return "三氯甲烷";
    } else if (PolID == "w25006") {
        return "邻二甲苯";
    } else if (PolID == "w24047") {
        return "1,1—二氯乙烯";
    } else if (PolID == "w24048") {
        return "1,2-二氯乙烯";
    } else if (PolID == "w25004") {
        return "乙苯";
    } else if (PolID == "w24003") {
        return "二氯甲烷";
    } else if (PolID == "w24049") {
        return "三氯乙烯";
    } else if (PolID == "w24050") {
        return "四氯乙烯";
    } else if (PolID == "w25002") {
        return "苯";
    } else {
        return PolID;
    }
}//根据Name匹配对应Code
function getCodeData(name) {
    var data = this.SDL_Global.MetersData();
    if (name == '流量' || name == '系统') {
        return 'w00000';
    }
    //todo:确认页面，统一名字
    if (name == "pH" || name == "pH值" || name == "PH") {
        return "w01001"
    }
    var names = data.filter(m => m.Name == name);
    if (names && names.length > 0) {
        return names[0].Code;
    }
    return name;
    if (val == "总磷") {
        return "w21011";
    } else if (val == "总氮") {
        return "w21001";
    } else if (val == "氨氮") {
        return "w21003";
    } else if (val == "高锰酸盐指数") {
        return "w01019";
    } else if (val == "化学需氧量") {
        return "w01018";
    } else if (val == "流量") {
        return "w00000";
    } else if (val == "浑浊度") {
        return "w01003";
    } else if (val == "pH" || val == "pH值" || val == "PH") {
        return "w01001"
    } else if (val == "水温") {
        return "w01010"
    } else if (val == "浊度") {
        return "w01003"
    } else if (val == "电导率") {
        return "w01014"
    } else if (val == "溶解氧") {
        return "w01009"
    } else if (val == "藻密度") {
        return "w19011"
    } else if (val == "叶绿素") {
        return "w01016"
    } else if (val == "铅") {
        return "w20120"
    } else if (val == "镉") {
        return "w20115"
    } else if (val == "铜") {
        return "w20122"
    } else if (val == "锌") {
        return "w20123"
    } else if (val == "1,2—二氯乙烷") {
        return "w24017"
    } else if (val == "甲苯") {
        return "w25003"
    } else if (val == "氯苯") {
        return "w25010"
    } else if (val == "1,2—二氯苯") {
        return "w25011"
    } else if (val == "1,4—二氯苯") {
        return "w25013"
    } else if (val == "异丙苯") {
        return "w25034"
    } else if (val == "苯乙烯") {
        return "w25038"
    } else if (val == "对、间二甲苯") {
        return "w25073"
    } else if (val == "三溴甲烷") {
        return "w24009"
    } else if (val == "三氯甲烷") {
        return "w24004"
    } else if (val == "邻二甲苯") {
        return "w25006"
    } else if (val == "1,1—二氯乙烯") {
        return "w24047"
    } else if (val == "1,2-二氯乙烯") {
        return "w24048"
    } else if (val == "乙苯") {
        return "w25004"
    } else if (val == "二氯甲烷") {
        return "w24003"
    } else if (val == "三氯乙烯") {
        return "w24049"
    } else if (val == "四氯乙烯") {
        return "w24050"
    } else if (val == "苯") {
        return "w25002"
    }
}
//获取仪表测量类型
function getYBCLTypes() {
    return [
        {
            value: "1",
            label: "水样测量",
        },
        {
            value: "2",
            label: "标样核查",
        },
        {
            value: "3",
            label: "零点核查",
        },
        {
            value: "4",
            label: "跨度核查",
        },
        {
            value: "5",
            label: "空白测试",
        },
        {
            value: "6",
            label: "平行样",
        },
        {
            value: "7",
            label: "加标回收",
        },
    ]
}
//根据仪表测量类型获取名字
function getYBCLName(type) {
    var opts = "未知"
    switch (type) {
        case '1':
            opts = "水样测量";
            break;
        case '2':
            opts = "标样核查";
            break;
        case '3':
            opts = "零点核查";
            break;
        case '4':
            opts = "跨度核查";
            break;
        case '5':
            opts = "空白测试";
            break;
        case '6':
            opts = "平行样";
            break;
        case '7':
            opts = "加标回收";
            break;
    }
    return opts;
}

//格式化
String.prototype.Format = function () {
    let str = this;
    for (let i = 0; i < arguments.length; i++) {
        str = str.replace('{' + i + '}', arguments[i]);
    }
    return str;
}

//数字保留小数位
Number.prototype.toFixedFormat = function () {
    let value = this;
    return value == '--' ? '--' : value.toFixed(arguments[0])
}

//字符串转换为数字并且保留小数位
String.prototype.toFixedFormat = function () {
    let value = this == undefined ? '--' : this;
    return value == '--' ? '--' : parseFloat(value).toFixed(arguments[0])
}

export {
    SDL_Global,
    FlowChart,
    updateGlobalData,
    SoftType,
    getCodeNameData,
    getCodeData,
    getYBCLTypes,
    getYBCLName,
    formatPLCMoShiStatusToText
}


