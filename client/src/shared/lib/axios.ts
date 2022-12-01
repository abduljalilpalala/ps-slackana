import Axios from 'axios'
import { hasCookie, getCookie } from 'cookies-next'
import getConfig from 'next/config'

const token = getCookie('token')
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
export const axios: any = Axios.create({
  baseURL: serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
})

export const setBearerToken = (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
}
