import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import AuthForm from '~/components/AuthForm'
import AuthLayout from '~/layouts/AuthLayout'
import { SignInUpFormValues } from '~/shared/types'

const SignIn: NextPage = (): JSX.Element => {
  const router = useRouter()

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        router.push('/')
      }, 3000)
    })
  }

  return (
    <AuthLayout metaTitle="Sign In">
      <AuthForm actions={{ handleAuthSubmit }} isLogin />
    </AuthLayout>
  )
}

export default SignIn
