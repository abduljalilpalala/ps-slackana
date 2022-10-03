import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { reset, signIn, signOut, signUp } from '~/redux/auth/authSlice'
import { SignInUpFormValues } from '~/shared/types'
import toast from 'react-hot-toast'

export const useAuthMethods = () => {
  const { isError, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleAuthSignOut = async () => {
    await dispatch(signOut())
    dispatch(reset())
    if (!isError) {
      toast.success('You have successfully signed out', { position: 'top-right' })
      router.push('/')
    } else {
      toast.error(error.content, { position: 'top-right' })
    }
  }

  const handleSignInSubmit = async (data: SignInUpFormValues): Promise<void> => {
    await dispatch(signIn(data))
  }

  const handleSignUpSubmit = async (data: SignInUpFormValues): Promise<void> => {
    await dispatch(signUp(data))
  }

  return {
    handleAuthSignOut,
    handleSignInSubmit,
    handleSignUpSubmit
  }
}
