import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index'
// 导入存储模块
import store from './store'
// 导入插件
import './plugin'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import ElementUI from 'element-ui'
// import './util/cancelDeveloper'

import $ from 'jquery'
import {
  message
} from './util/resetElementUIMessage.js'

Vue.use(ElementUI)
Vue.prototype.$message = message;

NProgress.configure({
  ease: 'ease',
  speed: 500
});
NProgress.configure({
  minimum: 0.3
});

let BASE_API_URL = "http://www.localhost:8081/";

Vue.prototype.$http = axios
Vue.prototype.BASE_API_URL = BASE_API_URL
axios.defaults.baseURL = BASE_API_URL


// 请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = localStorage.getItem('LOCAL_KEY_ACCESS_TOKEN');
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(userInfoString)
  if (userInfo == null) {
    config.headers.Username = null;
  } else {
    config.headers.Username = userInfo.username;
  }
  return config;
}, error => {
  return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use(
  function (response) {
    // token过期刷新token
    let refresh_token = response.headers.refresh_token
    console.log(refresh_token)
    if (refresh_token != undefined) {
      console.log("刷新token")
      localStorage.setItem("LOCAL_KEY_ACCESS_TOKEN", refresh_token);
    }
    NProgress.done();
    const res = response.data;
    console.log(res);
    if (res.success) {
      return response;
    }
    if (res != null && res.code === 4005) {
      // ElementUI.Message.error({
      //   message: res.msg,
      //   duration: 3000,
      // })
      $this.$message.error({
        message: res.msg,
        duration: 3000,
      })
      localStorage.clear();
      router.push("/login");
      return response;
      // return router.push("/login");
    } else if (res != null && res.code === 4003) {
      $this.$message.error({
        message: res.msg,
        duration: 3000,
      });
      localStorage.clear();
      router.push("/login");
      return response;
    } else if (res != null && res.code === 4004) {
      $this.$message.error({
        message: res.msg,
        duration: 3000,
      });
      localStorage.clear();
      router.push("/login")
      return response;
    }
    return response;
  },
  function (error) {
    NProgress.done();
    $this.$message.error({
      message: '系统忙，请稍后在试',
      duration: 2000,
    })
    // ElementUI.Message.error({
    //   message: "系统忙，请稍后在试",
    //   duration: 2000,
    // });
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
let $this = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')