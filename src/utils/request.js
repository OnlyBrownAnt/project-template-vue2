import axios from "axios";
import {startLoading, cancelLoading, requestErrorToast} from "@/utils/common";
import Vue from "vue";

// instanceAPI
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 300000, // 前端超时时间
  headers: {
    // default
    'Content-Type': 'application/json;charset=utf-8',

    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
})

instance.interceptors.request.use(
  config => {
    if (process.env.VUE_APP_DEPLOY_ENV === 'development') {
      console.log(`request: {\nurl: ${config.url}, \ndata: ${JSON.stringify(config.data)}, \nheaders: ${JSON.stringify(config.headers)}\n}`);
    }

    if (process.env.VUE_APP_OPEN_ENCRYPT === 'true' &&
      (config.headers['encrypt'] === true ||
        config.headers['encrypt'] === 'true')) {
      // TODO 加解密时间计算(生产需要关闭)
      console.time('encryptRequest');
      config.data.input = Vue.prototype.$jsEncryptForEncrypt.encryptLong(encodeURIComponent(JSON.stringify(config.data.input)));
      console.timeEnd('encryptRequest');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    if (process.env.VUE_APP_OPEN_ENCRYPT === 'true' &&
      (response.config.headers['encrypt'] === true ||
        response.config.headers['encrypt'] === 'true')) {
      // TODO 加解密时间计算(生产需要关闭)
      console.time('decryptRequest');
      response.data.output = JSON.parse(decodeURIComponent(Vue.prototype.$jsEncryptForDecrypt.decryptLong(response.data.output)));
      console.timeEnd('decryptRequest');
    }

    if (process.env.VUE_APP_DEPLOY_ENV === 'development') {
      console.log(`response: {\nurl: ${response.config.url} \ndata: ${JSON.stringify(response.data)}, \nheaders: ${JSON.stringify(response.headers)}\n}`);
    }
    return Promise.resolve(response);
  }, error => {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围

      // TODO 错误文本转换
      error.sourceMessage = error.message;
      return Promise.reject(error);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例

      // TODO 错误文本转换
      error.sourceMessage = error.message;
      return Promise.reject(error);
    } else {
      // TODO 错误文本转换
      error.sourceMessage = error.message;
      // 发送请求时出了点问题
      return Promise.reject(error);
    }
  })

/**
 * 报文组装
 * @param serviceCode
 * @param data
 */
function formatMessage(serviceCode, data) {
  let template = {
    "input": {}
  }
  Object.assign(template.input, data);
  return template;
}

/**
 * 公共请求入口一
 * 建议在这里拦截业务型错误码并执行后续的业务操作。
 *
 * TODO 会在请求前检查登录状态
 * 默认所有接口需要进行登录检查，如果header中携带参数notNeedLogin=true表示不需要进行登录检查。
 * 如果登录超时就会先提示弹窗并返回空Promise保持等待状态。
 *
 * TODO header可选参数
 * headers {
 *    encrypt // default=false, 是否需要加解密处理
 *    notNeedLogin // default=false, 是否不需要登录检查
 *    isStopCatchAllError // default=false, 是否停止捕获提示该当前API所有的错误，并抛出到调用入口
 *    stopLoading // default=false, 是否阻止加载弹窗
 * }
 *
 * then 返回成功数据
 * catch 返回错误信息 {code: code, message: message} 所有错误都抛回顶层函数。
 * @param headers
 * @param url
 * @param method
 * @param params
 * @param data
 * @param errorCatchSet 需要捕获的异常Code集合
 * @returns {Promise<unknown>}
 */
export function request({headers = {}, url, method, params = {}, data = {}, errorCatchSet = new Set([])}) {
  // 登录状态
  let isLogin = false;
  if (headers.notNeedLogin && isLogin) {
    // TODO 登录超时相关检查和具体处理逻辑

    cancelLoading();
    // 检查是否已经弹起过登录超时弹窗
    let loginPopStatus = false;
    if (!loginPopStatus) {
      // set pop status
      loginPopStatus = true;

      // 返回空Promise，保持等待状态
      return new Promise(() => {
      })
    } else {
      // waiting

      // 返回空Promise，保持等待状态
      return new Promise(() => {
      })
    }
  } else {
    // continue
    const requestUrl = url;
    // 报文组装
    data = formatMessage(requestUrl, data);
    return new Promise((resolve, reject) => {
      if (headers.stopLoading === true) {
        // continue
      } else {
        startLoading();
      }
      instance({
        headers,
        url,
        method,
        params,
        data
      }).then(res => {
        cancelLoading();
        const message = res.message;
        const code = res.code;

        // 公共请求错误码拦截
        if (code === "success") {
          resolve(res.data);
        } else {
          const errorObj = {api: requestUrl, code: code, message: message};
          console.error(errorObj);
          //  是否停止捕获该当前API所有的错误，并抛出到调用入口。
          if (headers.isStopCatchAllError === true) {
            reject(errorObj);
          } else if (errorCatchSet.has(code)) {
            reject(errorObj);
          } else {
            requestErrorToast(message);
            reject(errorObj);
          }
        }
      }).catch(error => {
        const errorObj = {api: requestUrl, code: error.code, message: error.message};
        console.error(errorObj);

        cancelLoading();
        requestErrorToast(error.message);

        reject(errorObj);
      })
    })
  }
}
