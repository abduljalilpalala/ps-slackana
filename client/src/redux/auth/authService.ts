import { deleteCookie, setCookie } from 'cookies-next'

import { axios, setBearerToken } from '~/shared/lib/axios'
import { SignInUpFormValues } from '~/shared/types'

const signUp = async (user: SignInUpFormValues): Promise<any> => {
  const response = await axios.post('/api/sign-up', user)
  const { token, user: data } = response.data

  if (response.status === 200) {
    setCookie('token', token)
    setBearerToken(token)
  }

  return data
}

const signIn = async (user: SignInUpFormValues): Promise<any> => {
  const response = await axios.post('/api/sign-in', user)
  const { token, user: data } = response.data

  if (response.status === 200) {
    setCookie('token', token)
    setBearerToken(token)
  }

  return data
}

const signOut = async (): Promise<any> => {
  const response = await axios.post('/api/sign-out')
  if (response.status === 204) {
    deleteCookie('token')
  }
  return response.data
}

const hydrateUserState = async (): Promise<any> => {
  const response = await axios.get('/api/auth')
  if (response.status === 200) {
    return response.data
  }
  return "Something went wrong"
}

const authService = {
  signUp,
  signIn,
  signOut,
  hydrateUserState
}

export default authService
