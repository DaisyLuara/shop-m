import axios from 'axios'
import baseENV from './server'
import { getToken, handle401 } from '../storeData'
import { Toast } from 'antd-mobile'

// 全局设定请求类型
axios.defaults.baseURL = baseENV.SERVER_URL

axios.interceptors.request.use(
  function(config) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// 根据 axios api，对请求返回做拦截处理
axios.interceptors.response.use(
  function(response: any) {
    return response
    // if (response.status >= 400 && response.status < 500) {
    //     // 对返回状态码为 4xx 的请求统一处理
    //     // 此处统一跳转 404 页面
    //     window.location.href = decodeURI(`${window.location.protocol}//${window.location.host}/404.html`)
    // } else {
    //   return response
    // }
  },
  function(error) {
    if (error.response.status === 401) {
      handle401()
      Toast.fail(error.response.data.message, 3)
    } else {
      return Promise.reject(error)
    }
  }
)
