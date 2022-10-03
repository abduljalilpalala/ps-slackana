import React from 'react'
import { NextPage } from 'next'

import { SignInUpFormValues } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import { signUp } from '~/redux/auth/authSlice'
import { useAppDispatch } from '~/hooks/reduxSelector'

const SignUp: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    await dispatch(signUp(data))
  }

  return (
    <AuthLayout metaTitle="Sign Up">
      <AuthForm actions={{ handleAuthSubmit }} isLogin={false} />
    </AuthLayout>
  )
}

export { signInUpAuthCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default SignUp
