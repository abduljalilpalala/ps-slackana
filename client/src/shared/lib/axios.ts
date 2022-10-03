import Axios from 'axios'
import { hasCookie, getCookie } from 'cookies-next'

const token = getCookie('token')

export const axios: any = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
})

export const setBearerToken = (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
}
