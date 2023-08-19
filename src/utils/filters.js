import {dateFormat as format} from './common'

export function dateFormat(val, fmt) {
  return val ? format(val, fmt) : ''
}

export function idCardNumSix(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str);
}

export function isPhone(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/[^\d{0,11}]/g, '');
}

export function isNumber(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/[^\d]/g, '');
}

export function isPassword(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/[^A-Za-z\d]/g, '');
}

export function isToFixed(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return Number(str).toFixed(2);
}

export function isNum(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return /^((\d+\.\d+)|\d*)$/.test(str);
}

export function isOperator(str) {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/[^,+\d]*$/, '');
}
