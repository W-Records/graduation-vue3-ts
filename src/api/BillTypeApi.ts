import axios from '../plugins/axios.ts'

// 添加账单类型信息
export const addbilltypeService = (data: any) => {
  return axios.post('/billtype', data)
}

// 获取账单类型信息
export const getbilltypeService = () => {
  return axios.get('/billtype')
}

// 删除@Delete(':id')
export const deletebilltypeService = (id: string) => {
  return axios.delete(`/billtype/${id}`)
}
