import axios from 'axios'
import store from '@/store'
import router from '@/router'
import jsonbig from 'json-bigint'
// import { ssrCompile } from 'vue-template-compiler'

// 给 每一个 axios请求 添加一个 基础路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  try {
    return jsonbig.parse(data)
  } catch (e) {
    return data
  }
}]

// 请求头
// axios.interceptors.request.use((config) => {
//   config.headers = {
//     Autorization: `Bearer ${store.getUser().token}`
//   }
//   return config
// }, (error) => {
//   return Promise.reject(error)
// }
// )
// Authorization
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
