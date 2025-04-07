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
