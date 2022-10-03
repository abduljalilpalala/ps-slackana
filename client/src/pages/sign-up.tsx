import React from 'react'
import { NextPage } from 'next'

import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import { useAuthMethods } from '~/hooks/authMethods'

const SignUp: NextPage = (): JSX.Element => {
  const { handleSignUpSubmit: handleAuthSubmit } = useAuthMethods()

  return (
    <AuthLayout metaTitle="Sign Up">
      <AuthForm actions={{ handleAuthSubmit }} isLogin={false} />
    </AuthLayout>
  )
}

export { signInUpAuthCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default SignUp
