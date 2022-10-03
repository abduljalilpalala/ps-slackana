import { setCookie } from 'cookies-next'

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

const authService = {
  signUp
}

export default authService
