import axios from '../plugins/axios.ts'

// 添加楼栋信息
export const addBuildingsService = (data: any) => {
  return axios.post('/buildings', data)
}

// 获取楼栋信息
export const getBuildingsService = () => {
  return axios.get('/buildings')
}

// 删除@Delete(':id')
export const deleteBuildingsService = (id: string) => {
  return axios.delete(`/buildings/${id}`)
}
