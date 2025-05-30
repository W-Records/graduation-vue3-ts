import axios from '../plugins/axios.ts'

// 获取房屋信息
export const getHouseListService = () => {
  return axios.get('/house')
}

// 添加房屋信息
export const addHouseService = (data: any) => {
  return axios.post('/house', data)
}
