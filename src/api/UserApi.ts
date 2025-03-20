import axios from '../plugins/axios.ts'

export const getUserListService = () => {
  return axios.get('/user')
}
