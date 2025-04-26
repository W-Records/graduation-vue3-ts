import axios from '../plugins/axios.ts'

// 获取账单信息
export const getBillListService = () => {
  return axios.get('/bill')
}

// 添加账单信息
export const addBillService = (data: any) => {
  return axios.post('/bill', data)
}

// 查询用户的账单，状态为未缴费的账单
export const getBillByUserIdService = (userid: string) => {
  return axios.get(`/bill/${userid}`)
}

// 根据账单id，修改账单的status字段为已缴费
export const updateBillStatusService = (id: string) => {
  return axios.patch(`/bill/updateBillStatus/${id}`)
}

// 删除账单，后端接口@Delete(':id')
export const deleteBillService = (id: string) => {
  return axios.delete(`/bill/${id}`)
}
