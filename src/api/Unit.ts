import axios from '../plugins/axios.ts'

// 添加单元信息
export const addUnitsService = (data: any) => {
  return axios.post('/units', data)
}

// 获取单元信息
export const getUnitsService = () => {
  return axios.get('/units')
}

// 删除@Delete(':id')
export const deleteUnitsService = (id: string) => {
  return axios.delete(`/units/${id}`)
}
