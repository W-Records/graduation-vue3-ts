import axios from '../plugins/axios.ts'

// 获取公告信息
export const getNoticeListService = () => {
  return axios.get('/notice')
}

// 添加公告信息
export const addNoticeService = (data: any) => {
  return axios.post('/notice', data)
}

// @Get(':id')
export const getNoticeByIdService = (id: string) => {
  return axios.get(`/notice/${id}`)
}

// @Post('updateNotice')
export const updateNoticeService = (data: any) => {
  return axios.post('/notice/updateNotice', data)
}

// @Delete(':id')
export const deleteNoticeService = (id: string) => {
  return axios.delete(`/notice/${id}`)
}
