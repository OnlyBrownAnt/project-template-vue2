import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "@/router";
import './styles/index.less';

// 加解密工具
import JSEncryptPlugin from '../src/utils/RSAPlugin.js';

Vue.use(JSEncryptPlugin);

// 微信标题同步 
Vue.use(require('vue-wechat-title'))

// 按需引入vant组件
import {Toast, Lazyload} from "vant"
import 'vant/lib/toast/style'

Vue.use(Toast);
Vue.use(Lazyload);

// VConsole
import VConsole from 'vconsole';

if (process.env.VUE_APP_OPEN_VCONSOLE === 'true') {
  const vConsole = new VConsole();
  Vue.use(vConsole);
}

Vue.config.productionTip = false // 阻止启动生产消息，常用作指令  消息提示的环境配置，设置为开发环境或者生产环境
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
