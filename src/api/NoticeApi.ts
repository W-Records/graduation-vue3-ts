import axios from '../plugins/axios.ts'

// 获取公告信息
export const getNoticeListService = () => {
  return axios.get('/notice')
}

// 添加公告信息
export const addNoticeService = (data: any) => {
  return axios.post('/notice', data)
}
