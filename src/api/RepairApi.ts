import axios from '../plugins/axios.ts'

// 获取报修信息
export const getRepairListService = () => {
  return axios.get('/repair')
}

// 添加报修信息
export const addRepairService = (data: any) => {
  return axios.post('/repair', data)
}

// 查询用户报修信息
export const getUserRepairListService = (id: string) => {
  return axios.get(`/repair/findUserRepairs/${id}`)
}
