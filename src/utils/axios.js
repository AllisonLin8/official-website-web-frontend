import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL
const axiosInstance = axios.create({ baseURL })

export const apiHelper = axiosInstance
