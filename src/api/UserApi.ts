import axios from '../plugins/axios.ts'

export const getUserListService = () => {
  return axios.get('/user/admin')
}

export const loginService = (user: any) => {
  return axios.post('/auth/login', user)
}
