import axios from '../plugins/axios.ts'

// 获取车辆信息
export const getCarListService = () => {
  return axios.get('/car')
}

// 添加车辆信息
export const addCarService = (data: any) => {
  return axios.post('/car', data)
}

// 获取车位信息，类型type不能为消防车位，车位不能被持有就是userid不能有值
export const getParkingListService = () => {
  return axios.get('/car/getCarInfo')
}

// 修改指定车位的信息，修改的字段包括type，atTime，userid
export const updateParkingService = (data: any) => {
  return axios.post('/car/updateCarInfo', data)
}
