import axios from '../plugins/axios.ts'

// 获取房屋信息
export const getHouseListService = () => {
  return axios.get('/house')
}

// 添加房屋信息
export const addHouseService = (data: any) => {
  return axios.post('/house', data)
}

// 为用户分配房屋
export const assignHouseService = (data: any) => {
  return axios.post('/house/assignHouse', data)
}
