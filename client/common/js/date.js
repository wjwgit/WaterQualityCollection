class DateTime {

    // 构造方法

    constructor() {

        // 列举Week

        this.weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        // 获取当前时间

        this.Date = new Date();

        // 获取当前年

        this.year = this.Date.getFullYear();

        // 获取当前月

        this.month = this.Date.getMonth() + 1;

        // 获取当前日

        this.date = this.Date.getDate();

        // 获取当前星期几

        this.day = this.Date.getDay();

        // 获取小时

        this.hour = this.Date.getHours();

        // 获取分钟

        this.minute = this.Date.getMinutes();

        // 获取秒

        this.second = this.Date.getSeconds();

        // 自动补零

        this.month = (this.month < 10) ? '0' + this.month : this.month = this.month;

        this.date = (this.date < 10) ? '0' + this.date : this.date = this.date;

        this.hour = (this.hour < 10) ? '0' + this.hour : this.hour = this.hour;

        this.minute = (this.minute < 10) ? '0' + this.minute : this.minute = this.minute;

        this.second = (this.second < 10) ? '0' + this.second : this.second = this.second;
    };
    getHour() {
        return this.hour;
    }
    getMinute() {
        return this.minute;
    }
    getSecond() {
        return this.second;
    }
    /*
  
    * 获取当前日期
  
    * @returns {string}
  
  */
    getDate(chartstr) {

        chartstr = chartstr || '-';
        return this.year + chartstr + this.month + chartstr + this.date + ' ' + ' ';

    };
    /*
      
        * 获取当前日期 年月日格式
      
        * @returns {string}
      
      */

    getDateName() {

        return this.year + '年' + this.month + '月' + this.date + '日' + ' ';

    };
    /*
         
           * 获取当前日期 年月日星期格式
         
           * @returns {string}
         
         */

    getDateWeek() {

        return this.year + '年' + this.month + '月' + this.date + '日' + this.weekday[this.day] + ' ';

    };
    /*
  
    * 获取当前时间
  
    * @returns {string}
  
  */

    getTime() {

        return this.hour + ' : ' + this.minute + ' : ' + this.second;

    };

    /*
  
    * 获取当前星期几
  
    * @returns {string}

    */
    getWeek() {

        return this.weekday[this.day]
    };

    /*
 
   * 获取BCD格式(YYMMDDHHmmss)
 
   * @returns {string}

   */
    getBCD() {
        return this.year.toString().slice(-2) + ' ' + this.month + ' ' + this.date + ' ' + this.hour + ' ' + this.minute + ' ' + this.second;
    };
    /*
 
   * 获取YYYYMMDDHHmmss
 
   * @returns {string}

   */
    getFormat() {
        return this.year + '' + this.month + '' + this.date + '' + this.hour + '' + this.minute + '' + this.second;
    };

}
export { DateTime }
