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

// 更具id删除车位的用户信息，后端接口：@Post('removeUserId/:carid')
export const removeUserIdService = (carid: string) => {
  return axios.post(`/car/removeUserId/${carid}`)
}

// 删除车位，@Post('removeCarport/:id')
export const removeCarportService = (id: string) => {
  return axios.post(`/car/removeCarport/${id}`)
}

// 根据前端传递的id，修改指定车位的name字段的值，后端地址@Post('updateCarport')
export const updateCarportService = (data: any) => {
  return axios.post('/car/updateCarport', data)
}
