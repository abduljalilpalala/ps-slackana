import React from 'react'
import { NextPage } from 'next'

import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import { useAuthMethods } from '~/hooks/authMethods'

const SignIn: NextPage = (): JSX.Element => {
  const { handleSignInSubmit: handleAuthSubmit } = useAuthMethods()

  return (
    <AuthLayout metaTitle="Sign In">
      <AuthForm actions={{ handleAuthSubmit }} isLogin />
    </AuthLayout>
  )
}
export { signInUpAuthCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default SignIn
