<template>
  <div>
    <el-dialog class="div-printYWdialogs" :title="printYunWeiTitle" :visible.sync="dialogYunWeiVisible" width="89%"
      :modal-append-to-body='false' :close-on-click-modal="false">
      <div id="printTable">
        <div style="text-align: center;font-size: 16px;color:#000;margin-bottom: 10px;font-weight: 800;">巡检维护记录表</div>
     
        <table style="border: 1px solid #000;width: 100%;text-align:left ">
          <tr>
            <td colspan="2" style="padding-left:8px;border-bottom: 1px solid #000;">
              设备名称：{{printywjlLog.DeviceName}}</td>
            <td colspan="2"
              style="border-left: 1px solid #000;padding-left: 8px;border-bottom: 1px solid #000;">规格型号：
              {{printywjlLog.ModelNum}}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding-left:8px;border-bottom: 1px solid #000;">
              设备编号： {{printywjlLog.DeviceNo}}
              <!-- {{formHidden?'':sID}}
              <input type="text" v-if="formHidden" v-model="sID"> -->
            </td>
            <td colspan="2"
              style="border-left: 1px solid #000;padding-left: 8px;border-bottom: 1px solid #000;">安装地点：
              {{printywjlLog.Address}}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding-left:8px;border-bottom: 1px solid #000;">企业名称：  {{printywjlLog.Enterprise}}</td>
            <td colspan="2"
              style="border-left: 1px solid #000;padding-left: 8px;border-bottom: 1px solid #000;">运行单位：
              {{printywjlLog.Company}} </td>
          </tr>
          <tr>
            <td colspan="4" style="padding-left:8px;border-bottom: 1px solid #000;">运行维护内容及处理说明：</td>
          </tr>
          <tr>
            <td style="padding-left:8px;border-bottom: 1px solid #000;max-width:80px">项目</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">工作内容</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">巡检情况</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">备注</td>
          </tr>
          <tr>
            <td rowspan="2" style="padding-left:8px;border-bottom: 1px solid #000;">维护设备</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">查询系统日志a</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[0].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[0].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">查询仪器日志b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[1].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[1].printRemake}}</td>
          </tr>
          <tr>
            <td rowspan="7" style="padding-left:8px;border-bottom: 1px solid #000;">辅助设备检查</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查耗材有效期b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[2].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[2].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">站房卫生打扫b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[3].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[3].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">站房门窗的密封性检查b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[4].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[4].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">供电系统(稳压电源、UPS 等)b
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[5].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[5].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">室内温湿度a</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[6].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[6].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">空调工作情况b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[7].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[7].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">自来水供应情况b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[8].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[8].printRemake}}</td>
          </tr>
          <tr>
            <td rowspan="6" style="padding-left:8px;border-bottom: 1px solid #000;">采样系统检查</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">采样泵采水情况a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[9].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[9].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">采样管路通畅b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[10].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[10].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">自动清洗装置运行情况b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[11].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[11].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">排水管路通畅a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[12].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[12].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">清洗采样泵、过滤装置b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[13].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[13].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">清洗采样管路、排水管路b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[14].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[14].printRemake}}</td>
          </tr>
          <tr>
            <td rowspan="9" style="padding-left:8px;border-bottom: 1px solid #000;">水污染源在线监测仪器</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">仪器报警状态a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[15].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[15].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">仪器状态参数检查a</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[16].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[16].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">仪器外观检查a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[17].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[17].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">仪器内部管路检查b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[18].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[18].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查电极标准液、内充液b</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[19].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[19].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">清洗电极头b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[20].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[20].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">标准溶液、试剂是否在保质期b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[21].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[21].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              更换标准溶液、试剂（填写更换试剂需要完成校准） </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[22].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[22].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查仪器废液存量 </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[23].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[23].printRemake}}</td>
          </tr>
          <tr>
            <td rowspan="6" style="padding-left:8px;border-bottom: 1px solid #000;">数据采集传输系统</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">数据采集系统报警信息a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[24].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[24].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">数据上传情况a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[25].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[25].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">数据采集情况a </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[26].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[26].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查数采仪和仪器的连接b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[27].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[27].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查上传数据和现场数据的一致性b
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[28].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[28].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">数据采集、传输设备电源b </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[29].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[29].printRemake}}</td>
          </tr>
          <tr>
            <td style="padding-left:8px;border-bottom: 1px solid #000;">异常数据记录</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">异常数据记录</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[30].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[30].printRemake}}</td>
          </tr>
          <tr>
            <td rowspan="7" style="padding-left:8px;border-bottom: 1px solid #000;">水污染源在线监测仪器</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查仪器泵工作情况 </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[31].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[31].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查蠕动泵管 </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[32].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[32].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查电极是否钝化，必要时进行更换
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[33].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[33].printRemake}}</td>
          </tr>

          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查超声波流量计高度是否发生变化
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[34].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[34].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">仪器管路进行保养、清洁 </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[35].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[35].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">检查采样部分、计量单元、反应单元、加
              热单元、检测单元的工作情况</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[36].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[36].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              实际水样比对工作(COD、氨氮、总磷、总氮、pH、水温)</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[37].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[37].printRemake}}</td>
          </tr>
          <tr>
            <td rowspan="3" style="padding-left:8px;border-bottom: 1px solid #000;">水污染源在线监测仪器</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              根据水污染源在线监测仪器操作维护说明，检查及更换易损耗件 </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[38].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[38].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              检查关键零部件可靠性，如计量单元准确性、反应室密封性等，必要时进行更换 </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[39].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[39].printRemake}}</td>
          </tr>
          <tr>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">实际水样比对工作（明渠超声波流量计）
            </td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[40].printValue}}</td>
            <td style="border-left: 1px solid #000;padding-left:8px;border-bottom: 1px solid #000;">
              {{printywjl[40].printRemake}}</td>
          </tr>
          <!--省略... -->
          <tr>
            <td colspan="4" style="padding-left:8px;border-bottom: 1px solid #000;height: 50px;">巡检人员签字：</td>
          </tr>
          <tr>
            <td style="padding-left:8px;border-bottom: 1px solid #000;height: 160px;">异常情况处理记录：</td>
            <td colspan="3" style="padding-left:8px;border-bottom: 1px solid #000;border-left: 1px solid #000;">{{printywjlLog.remark}}</td>
          </tr>
          <tr>
            <td style="padding-left:8px;border-bottom: 1px solid #000;height: 80px;">本周巡检情况小结</td>
            <td colspan="2" style="padding-left:8px;border-bottom: 1px solid #000;border-left: 1px solid #000;">{{printywjlLog.Summary}}</td>
            <td style="padding-left:8px;border-bottom: 1px solid #000;border-left: 1px solid #000;">
              负责人签字:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期:
            </td>
          </tr>
          <tr>
            <td colspan="4" style="padding-left:8px;">
              <!-- 正常请打'√',错误请打'x'并及时处理并做相应记录,未检查则不用标识。<br/>  -->
              a为每天需要检查的:<br />
              b为每七天至少进行一次的维护:<br />
              c每30天至少进行一次的维护:<br />
              d为每季度至少进行一次的维护。
            </td>
          </tr>
        </table>
      </div>
      <div v-if="!printvisible" style="color: #ff9200;margin-top: 10px;font-weight: 800;" >
        请等待仪表校准完成，再打印表单
     </div>
      <!-- @click="printData" -->
      <el-button v-if="printvisible" size="small" v-print="printContent" style="margin-top:20px;">
        打印
        <i class="el-icon-edit el-icon--right"></i>
      </el-button>
    
    </el-dialog>

  </div>

</template>
<script>
  export default {
    props: {
      printYunWeiTitle:String,
      printywjl: Array, //导出的ref
      printywjlLog: Object, //导出的ref
      printvisible:{
        type: Boolean,
        default: () => true
      },
      yunWeimmodel: {
        //是否显示预览
        type: Boolean,
        default: () => false
      },
    },
    data() {
      return {
        // formHidden: true,
        // sID: '123123',
        printContent: {
          id: 'printTable',
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
          clickMounted(vue) {
            // alert(1)
            // vue. formHidden = false;
          }
        },
      }
    },
    mounted() {

      console.log('print', this.printywjl);
      // this.printData()
    },
    computed: {
      dialogYunWeiVisible: {
        // getter
        get: function () {

          return this.yunWeimmodel;
        },
        // setter
        set: function (newVal) {


          if (!newVal) {
            this.$emit("update:yunWeimmodel", false); //触发 input 事件，并传入新值
          }
        }
      },
    },
    methods: {

    }
  };
</script>
<style >

.div-printYWdialogs .el-dialog__body {
        height: calc(100vh - 390px);
        overflow: auto;
    }

    #printTable table {
        width: 100%;
        text-align: center;
        color: #cccccc;
        border-collapse: collapse;
    }

    #printTable table tr {
        color: #cccccc !important;
    }

    #printTable table tr {
        background-color: #35415a;
        height: 32px;
        line-height: 32px;
    }

    #printTable table tr:nth-child(odd) {
        background-color: #293244;
    }

    #printTable table tr td {
        width: 200px;
        /* border-right: 1px solid #3c4860; */
    }

    #printTable table tr td .el-input__inner {
        color: #cccccc;

    }
</style>