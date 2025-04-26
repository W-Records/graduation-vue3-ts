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

// 根据房屋id 移除房屋的用户信息，后端接口地址为@Post('removeUser/:houseId')
export const removeUserService = (houseId: string) => {
  return axios.post(`/house/removeUser/${houseId}`)
}

// 修改房屋信息
export const updateHouseService = (data: any) => {
  return axios.post('/house/updateHouse', data)
}

// 根据id获取指定房屋信息,@Get('findHouseById/:id')
export const findHouseByIdService = (id: string) => {
  return axios.get(`/house/findHouseById/${id}`)
}

// 根据id删除房屋，@Post('removeHouse/:id')
export const removeHouseService = (id: string) => {
  return axios.post(`/house/removeHouse/${id}`)
}
