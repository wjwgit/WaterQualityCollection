/**
 * //完整报文
 *	var testmsg = '##0101QN=20160801085857223;ST=32;CN=1062;PW=100000;MN=010000A8900016F000169DC0;Flag=5;CP=&&RtdInterval=30&&1C80\r\n'
 * //需校验的数据段
 * var testdata = 'QN=20160801085857223;ST=32;CN=1062;PW=100000;MN=010000A8900016F000169DC0;Flag=5;CP=&&RtdInterval=30&&'
 */
/** 
 * 返回值校验码,string类型 
 * @param {string} msg 212报文的数据段
 */
function crc16(data) {
	var buf = Buffer.from(data);
	var crc = 0xFFFF;
	for (var i = 0; i < buf.length; i++) {
		crc = (crc >> 8) ^ buf[i];
		for (var j = 0; j < 8; j++) {
			var temp = crc & 0x01;
			crc >>= 0x0001;
			if (temp == 0x01) {
				crc ^= 0xA001;
			}
		}
	}
	return pad0Left(crc.toString(16).toUpperCase(), 0);
}

/**
 * 返回完整性检查结果,bool型
 * @param {*} msg 完整的报文
 */
function checkCrc16(msg) {
	var len = msg.slice(2, 6);
	var len = parseInt(msg.slice(2, 6));
	var data = msg.slice(6, msg.length - 6);
	if (len != data.length) {
		return false;
	}
	var crc = msg.slice(msg.length - 6, msg.length - 2);
	if (crc == crc16(data)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 字符串前面补0，总长度为 n
 * @param {*} str 
 * @param {*} n  总长度
 */
function pad0Left(str, n) {
	if (str.length >= n) {
		return str;
	} else {
		return pad0Left("0" + str, n);
	}
}

/**
 * 深度拷贝
 * @param {object} srcObj 必须 
 */
function deepCopy(srcObj) {
	var obj = {};
	for (var i in srcObj) {
		var prop = srcObj[i];

		// 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
		if (prop === obj) {
			continue;
		}

		if (typeof prop === 'object') {
			obj[i] = (prop.constructor === Array) ? prop : Object.create(prop);
		} else {
			obj[i] = prop;
		}
	}
	return obj;
}


exports.crc16 = crc16;
exports.checkCrc16 = checkCrc16;
exports.pad0Left = pad0Left;
exports.deepCopy = deepCopy;