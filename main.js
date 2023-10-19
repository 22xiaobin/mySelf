import App from './App';

import uView from 'uview-ui';

// 获取到vConsole 查看信息
// #ifdef H5
if (process.env.H_NODE_ENV !== 'production') {
  const vconsole = require('vconsole');
  Vue.prototype.$vconsole = new vconsole();
}
// #endif

Vue.use(uView);

// #ifndef VUE3
import Vue from 'vue';
import './uni.promisify.adaptor';
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
