import axios from '../plugins/axios.ts'

export const getUserListService = () => {
  return axios.get('/user/admin')
}

export const loginService = (user: any) => {
  return axios.post('/auth/login', user)
}

// 查找全部用户
export const getAllUserService = () => {
  return axios.get('/user')
}

// 注册
export const registerService = (user: any) => {
  return axios.post('/user/save', user)
}

// 获取当前登录用户信息
export const getCurrentUserService = () => {
  return axios.get('/user/getCurrentUserMsg')
}

// 根据id修改用户信息
export const updateUserService = (user: any) => {
  return axios.patch('/user/updateUserMsg', user)
}
