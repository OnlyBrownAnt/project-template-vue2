import Vue from "vue";

// 弹窗加载
export function startLoading() {
  Vue.prototype.$toast.loading({duration: 0, overlay: false, forbidClick: true});
}

// 弹窗停止
export function cancelLoading() {
  Vue.prototype.$toast.clear();
}

// 网络请求错误弹窗
export function requestErrorToast(message) {
  Vue.prototype.$toast.fail({
    duration: 3000, // 持续展示 toast
    forbidClick: true,
    message: message,
  });
}

// 默认公用弹窗
export function defaultErrorToast(message) {
  Vue.prototype.$toast.fail({
    duration: 3000, // 持续展示 toast
    forbidClick: true,
    message: message,
  });
}

// 判断是否是移动端设备
export function isMobile() {
  const ua = navigator.userAgent.toLowerCase();
  const keywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'mqqbrowser'];
  for (let i = 0; i < keywords.length; i++) {
    if (ua.indexOf(keywords[i]) > -1) {
      return true;
    }
  }
  return false;
}


// 判断是不是微信和支付宝
export function isAlipayOrWeChat() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf("MicroMessenger") > 0 || ua.indexOf("AlipayClient") > 0) {
    return true;
  } else {
    return false;
  }
}

// 判空方法
export function isNull(str) {
  if (/\d+/.test(str)) {
    str += '';
  }
  if (
    str == 'null' ||
    str == null ||
    typeof str === 'undefined' ||
    str == 'undefined' ||
    str == '' ||
    str == '{}' ||
    (typeof str === 'object' &&
      (JSON.stringify(str) == '{}' || JSON.stringify(str) == '[]'))
  ) {
    return true;
  }
  return false;
}

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

export function isEmail(str, trim) {
  str = trim ? str.toString().trim() : str.toString();
  if (!/^[0-9a-zA-Z_-]{1,30}@([0-9a-zA-Z_-]{1,28}\.[0-9a-zA-Z_-]+)+$/.test(str)) {
    return false;
  }
  let _postfix = str.split('@')[1];
  if (_postfix && _postfix.length > 30) {
    return false;
  }
  return true;
}

export function isPhone(str) {
  return /^1[0-9]{10}$/.test(str);
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

export const dateFormat = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (date) {
    date = new Date(date)
  } else {
    return ''
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  })

  return fmt
}

export const obj2Query = (obj) => {
  let array = []
  for (let key in obj) {
    array.push(`${key}=${obj[key] || ''}`)
  }

  return array.join('&')
}

/**
 * 格式化手机号为 "3 4 4" 格式
 * @param value
 * @returns {string}
 */
export function formatPhoneNumber(value) {
  value = (value + '').replace(/ /g, '');
  let newVal = '';
  if (value.length > 3) {
    newVal = newVal + value.substring(0, 3);
    if (value.length > 7) {
      newVal = newVal + ' ' + value.substring(3, 7) + ' ' + value.substring(7, value.length);
    } else {
      newVal = newVal + ' ' + value.substring(3, value.length);
    }
  } else {
    newVal = value;
  }
  return newVal;
}

/**
 * 格式化身份证为 "6 4 4 4" 格式
 * @param value
 * @returns {string}
 */
export function formatIdCard(value) {
  value = (value + '').replace(/ /g, '');
  let newVal = '';
  if (value.length > 6) {
    newVal = newVal + value.substring(0, 6);
    if (value.length > 10) {
      newVal = newVal + ' ' + value.substring(6, 10);
      if (value.length > 14) {
        newVal = newVal + ' ' + value.substring(10, 14) + ' ' + value.substring(14, value.length);
      } else {
        newVal = newVal + ' ' + value.substring(10, value.length);
      }
    } else {
      newVal = newVal + ' ' + value.substring(6, value.length);
    }
  } else {
    newVal = value;
  }
  return newVal;
}

/**
 * 金额转换成中文金额大写
 * @param money 金额数字、字符串
 * @returns {string}
 */
export function changeNumMoneyToChinese(money) {
  if (isNull(money)) {
    return '';
  } else {
    money = ((money + '').replace(/ /g, '')).replace(/,/g, '');
  }

  let cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
  let cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
  let cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
  let cnDecUnits = ["角", "分", "毫", "厘"]; //对应小数部分单位
  let cnInteger = "整"; //整数金额时后面跟的字符
  let cnIntLast = "元"; //整型完以后的单位
  let maxNum = 999999999999999.9999; //最大处理的数字
  let IntegerNum; //金额整数部分
  let DecimalNum; //金额小数部分
  let ChineseStr = ""; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  let Symbol = ""; //正负值标记
  if (money == "") {
    return "";
  }

  money = parseFloat(money);
  if (money >= maxNum) {
    return "";
  }
  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
    return ChineseStr;
  }
  if (money < 0) {
    money = -money;
    Symbol = "负 ";
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf(".") == -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split(".");
    IntegerNum = parts[0];
    DecimalNum = parts[1].substring(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
    let zeroCount = 0;
    let IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = IntegerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum != '') { //小数部分
    let decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = DecimalNum.substr(i, 1);
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr == '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum == '') {
    ChineseStr += cnInteger;
  }
  ChineseStr = Symbol + ChineseStr;

  return ChineseStr;
}

/**
 * 金额格式化返回带尾部两位小数，去掉了币种符号
 * 注意: 如果金额本身携带了2位以上的尾数，会被进行四舍五入
 * @param money
 * @returns {string}
 */
export function formatMoney(money) {
  if (isNull(money)) {
    return '';
  } else {
    money = ((money + '').replace(/ /g, '')).replace(/,/g, '');
  }

  let formatMoney = new Intl.NumberFormat("zh-CN", {
    style: "currency", // 货币形式
    currency: "CNY", // "CNY"是人民币
    currencyDisplay: "symbol", // 默认“symbol”，中文中代表“¥”符号
    // useGrouping: true, // 是否使用分组分隔符，如千位分隔符或千/万/亿分隔符，默认为true
    // minimumIntegerDigits: 1, // 使用的整数数字的最小数目.可能的值是从1到21,默认值是1
    // minimumFractionDigits: 2, // 使用的小数位数的最小数目.可能的值是从 0 到 20
    maximumFractionDigits: 2, // 使用的小数位数的最大数目。可能的值是从 0 到 20
  }).format(money);
  formatMoney = formatMoney.substring(1, formatMoney.length); // 去掉币种符号
  return formatMoney;
}

/**
 * 清除金额额外的格式 ¥1,111.00
 * 包括"¥"和","，保留"数字"和"."
 * @param value
 * @returns {string}
 */
export function clearFormatMoney(value) {
  value = value + '';
  value = value.substring(1, value.length); // 去掉 ¥
  value = value.replace(/[^\d.]/g, "");  // 清除“数字”和“.”以外的字符
  return value;
}

/**
 * 获取金额的最大中文单位
 * @param value 数字值
 */
export function getBigUnitOfAmount(value) {
  if (isNull(value)) {
    return '';
  }
  value = Math.abs(value);
  if (value >= 1000000000) {
    return '十亿';
  } else if (value >= 100000000) {
    return '亿';
  } else if (value >= 10000000) {
    return '千万';
  } else if (value >= 1000000) {
    return '百万';
  } else if (value >= 100000) {
    return '十万';
  } else if (value >= 10000) {
    return '万';
  } else if (value >= 1000) {
    return '千';
  } else if (value >= 100) {
    return '百';
  } else {
    return '';
  }
}

/**
 * 格式化数字
 * 只保留数字和尾部两位小数
 * @param val
 * @returns {*}
 */
export function formatNumber(val) {
  let str = val;
  let len1 = str.substr(0, 1);
  let len2 = str.substr(1, 1);
  // 如果第一位是0，第二位不是点，就用数字把点替换掉
  if (str.length > 1 && len1 == 0 && len2 != '.') {
    str = str.substr(1, 1);
  }
  // 第一位不能是.
  if (len1 == '.') {
    str = '';
  }
  // 限制只能输入一个小数点
  if (str.indexOf('.') != -1) {
    let str_ = str.substr(str.indexOf('.') + 1);
    if (str_.indexOf('.') != -1) {
      str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1);
    }
  }
  // 正则替换，保留数字和小数点
  str = str.match(/^\d*(\.?\d{0,2})/g)[0] || null;
  return str;
}

/**
 * 格式化时间
 * formatted yyyy-mm-dd or yyyymmdd or yyyy/mm/dd or yyyy年mm月dd日
 * according to yyyymmdd or yyyy/mm/dd or yyyy年mm月dd日
 * otherwise, param is returned
 * @param type 0=return yyyy-mm-dd、1=return yyyymmdd、2=return yyyy/mm/dd、3=return yyyy年mm月dd日、4=return mm/dd
 * @param param
 */
export function formatDate(type, param) {
  const resultList = ['$1-$2-$3', '$1$2$3', '$1/$2/$3', '$1年$2月$3日', '$2/$3']
  const patternList = [/^(\d{4})(\d{2})(\d{2})$/, /^(\d{4})\/(\d{2})\/(\d{2})$/, /^(\d{4})年(\d{2})月(\d{2})日$/];
  let item = patternList.find(item => {
    return item.test(param)
  })
  return param.replace(item, resultList[type]);
}

/**
 * 获取当前时间
 * 支持多种格式
 * @param type 默认=yyyymmdd、1=yyyy年mm月dd日、2=yyyy-mm-dd、3=yyyy/mm/dd
 * @returns {string}
 */
export function getFormatDate(type) {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 补零
  const day = ('0' + date.getDate()).slice(-2); // 补零
  if (type === 1) {
    return `${year}年${month}月${day}日`;
  } else if (type === 2) {
    return `${year}-${month}-${day}`;
  } else if (type === 3) {
    return `${year}/${month}/${day}`;
  } else {
    return `${year}${month}${day}`;
  }
}

/**
 * base64字符串转blob
 * @param dataURL 无base64前缀的base64字符串
 * @param fileName 图片名称(包含类型尾缀) 例如: test.png
 * @returns Blob
 */
export function dataURLToBlob(dataURL, fileName) {
  let mimeString = `image/${fileName.split('.')[1]}`;
  let byteString = atob(dataURL);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
}

/**
 * base64字符串转File
 * @param dataURL 无base64前缀的base64字符串
 * @param fileName 图片名称(包含类型尾缀) 例如: test.png
 * @returns File
 */
export function dataURLToFile(dataURL, fileName) {
  let blob = dataURLToBlob(dataURL, fileName)
  return new File([blob], fileName, {type: blob.type});
}

/**
 * File转base64字符串
 * @param file File类型对象
 * @returns {Promise<unknown>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    console.log(`file size: ${file.size / (1024 * 1024)}`);
    console.log(`format start date: ${new Date().getTime()}`)
    // 创建FileReader对象
    const reader = new FileReader();
    let base64String = '';
    // 加载完文件后将其转换为Base64编码字符串
    reader.onload = () => {
      base64String = reader.result.split(',')[1];
      console.log(`format end date: ${new Date().getTime()}`)
      resolve(base64String)
    };
    // 读取文件内容并以DataURL的形式保存到result中
    reader.readAsDataURL(file);
  })
}

/**
 * 将 Blob 对象转换成 File 对象
 * @param {Blob} blob - 待转换的 Blob 对象
 * @param {string} fileName - 转换后的文件名
 * @returns {File} 返回转换后的 File 对象
 */
export function blobToFile(blob, fileName) {
  console.log(`func blobToFile file type ${typeof blob}`);
  console.log(`blob instanceof File ${blob instanceof File}`)
  if (blob instanceof File) {
    return blob;
  }

  let fileLikeObject = {};
  if ('File' in window) {
    // 如果浏览器支持 File 对象，则使用标准的 File 对象构造函数
    fileLikeObject = new File([blob], fileName, {type: blob.type});
  } else {
    // 如果浏览器不支持 File 对象，则使用一个类似 File 的对象模拟 File 对象
    fileLikeObject = {
      lastModified: Date.now(),
      name: fileName,
      size: blob.size,
      type: blob.type,
    };
    fileLikeObject.__proto__ = Object.create(File.prototype);
    fileLikeObject.slice = blob.slice || blob.webkitSlice || blob.mozSlice;
  }
  return fileLikeObject;
}

/**
 * 校验身份证是否符合格式
 * @param val
 * @returns {boolean}
 */
export function checkIdCard(code) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var pass = true;

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/i.test(code)) {
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        pass = false;
      }
    }
  }
  return pass
}

/**
 * 校验手机号格式
 * @param phoneNumber
 * @returns {boolean}
 */
export function validatePhoneNumber(phoneNumber) {
  const regExp = /^1[3456789]\d{9}$/; // 匹配以1开头，第二位为3-9之间的数字，后面跟着9个数字
  return regExp.test(phoneNumber);
}

/**
 * 比较传入时间是否与当前时间超过n分钟
 * @param n 几分钟
 * @param timeStamp
 * @returns {boolean} true=超过、false=没有超过
 */
export function compareTime(n, timeStamp) {
  console.log('compareTime timeStamp Date', new Date(timeStamp).toLocaleString())
  // 获取当前时间的时间戳（单位：毫秒）
  const currentTimeStamp = Date.now();
  console.log('compareTime currentTimeStamp Date', new Date(currentTimeStamp).toLocaleString())
  // 计算n分钟之前的时间戳
  const currentMinutesAgo = currentTimeStamp - (n * 60 * 1000);
  console.log('compareTime currentMinutesAgo Date', new Date(currentMinutesAgo).toLocaleString())
  console.log('timeStamp < currentMinutesAgo', timeStamp < currentMinutesAgo);
  return timeStamp < currentMinutesAgo;
}
