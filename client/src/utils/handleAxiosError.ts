import { AxiosError } from 'axios'

import { AxiosResponseError } from '~/shared/types'

const isAxiosError = (error: any): error is AxiosError<any, any> => {
  return error.isAxiosError
}

export const catchError = (error: any): AxiosResponseError => {
  let errorToReturn: AxiosResponseError = {
    status: 0 || undefined,
    content: null
  }
  if (isAxiosError(error)) {
    errorToReturn.status = error.response?.status
    if (error.response?.status === 422) {
      errorToReturn.content = error.response.data.errors
    } else {
      errorToReturn.content = error.message
    }
  }
  return errorToReturn
}
