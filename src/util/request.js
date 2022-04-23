// // **********请求相关的方法***********
// import axios from 'axios'

// // 导入nprogress加载进度条
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// // 导入BASE_URL
// import {
//     BASE_URL
// } from '../config/index'

// var instance = axios.create({
//     // 接口地址根路径
//     baseURL: BASE_URL,
//     // 超时时间
//     timeout: 30000,
// });

// NProgress.configure({
//     ease: 'ease',
//     speed: 500
// });
// NProgress.configure({
//     minimum: 0.3
// });

// // 添加请求拦截器
// instance.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     NProgress.start();
//     config.headers.Authorization = localStorage.getItem('LOCAL_KEY_ACCESS_TOKEN');
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     NProgress.done();
//     return Promise.reject(error);
// });

// // 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     NProgress.done();
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     NProgress.done();
//     return Promise.reject(error);
// });
