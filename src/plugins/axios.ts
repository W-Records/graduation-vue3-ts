// src/plugins/axios.ts
import axios from 'axios'

// 使用环境变量配置API基础URL
const service = axios.create({
  baseURL: 'http://localhost:3000/', // 替换为你的后端地址
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器：添加Token、处理请求前逻辑
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // 或从Pinia中获取
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器：统一处理错误
service.interceptors.response.use(
  (response) => {
    return response.data // 直接返回数据，方便调用
  },
  (error) => {
    const { response } = error
    if (response?.status === 401) {
      // 未授权：跳转登录页（需配合Vue Router）
      // 示例：使用Pinia或直接跳转
      // router.push('/login');
    }
    return Promise.reject(error)
  },
)

export default service
