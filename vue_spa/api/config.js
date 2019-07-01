import axios from 'axios'
import qs from 'qs'
import Cache from './cache'

axios.defaults.withCredentials = true
axios.defaults.baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
axios.defaults.transformRequest = [function(data, config) {
  if(!config['Content-Type']) return qs.stringfy(data);
  switch (config['Content-Type'].toLowerCase()){
    case 'application/json;charset=utf-8': {
      return JSON.stringify(data);
    }
    case 'multipart/form-data;charset=utf-8': {
      return data;
    }
    default: {
      return qs.stringfy(data);
    }
  }
}]

new Cache(axios, {
  requestInterceptorFn: config => {
      // 自定义请求拦截器
      return Promise.resolve(config)
  },
  responseInterceptorFn: response => {
      // 自定义响应拦截器，可统一返回的数据格式也可拦截错误

      return Promise.resolve(response)
  }
})

// // 不需要缓存
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

export default axios

