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

// 根据前端转递的id，修改status字段为已处理，后端地址@Post('updateStatus/:Id')
export const updateStatusService = (id: string) => {
  return axios.post(`/repair/updateStatus/${id}`)
}

// 删除账单，@Delete(':id')
export const deleteRepairService = (id: string) => {
  return axios.delete(`/repair/${id}`)
}
