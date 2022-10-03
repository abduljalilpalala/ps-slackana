import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { UseFormSetError } from 'react-hook-form'
import toast from 'react-hot-toast'

import { SignInUpFormFields, SignInUpFormValues } from '~/shared/types'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { reset } from '~/redux/auth/authSlice'

export const useAuthStatus = (setError: UseFormSetError<SignInUpFormValues>) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, isError, error, isSuccess } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      if (error.status === 422) {
        let entries = Object.entries<any>(error.content)
        entries.forEach((item) => {
          setError(item[0] as SignInUpFormFields, { type: 'custom', message: item[1][0] })
        })
      } else {
        toast.error(error.content, { position: 'top-right' })
      }
      dispatch(reset())
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      toast.success('You have successfully signed-in', { position: 'top-right' })
      router.push('/')
    }
  }, [isSuccess])

  return {
    isLoading
  }
}
