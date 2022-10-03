import Axios from 'axios'
import { hasCookie, getCookie } from 'cookies-next'

const token = hasCookie('token') ? getCookie('token') : ''

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
})

export const setBearerToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
