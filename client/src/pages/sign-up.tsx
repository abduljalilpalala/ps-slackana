import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Logo2Icon from '~/shared/icons/Logo2Icon'
import GoogleIcon from '~/shared/icons/GoogleIcon'
import { styles } from '~/shared/twin/auth.styles'
import { SignInUpFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { globals } from '~/shared/twin/globals.styles'
import { SignUpFormSchema } from '~/shared/validation'

const SignUp: NextPage = (): JSX.Element => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<Partial<SignInUpFormValues>>({
    mode: 'onTouched',
    resolver: yupResolver(SignUpFormSchema)
  })

  const handleSignUp = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        router.push('/')
      }, 3000)
    })
  }

  return (
    <>
      <Head>
        <title>Slackana | Sign Up</title>
      </Head>
      <main css={styles.main}>
        <section css={styles.section}>
          <nav css={styles.nav}>
            <div css={styles.business_logo}>
              <Logo2Icon />
              <h1>Slackana</h1>
            </div>
            <div css={styles.google_provider}>
              <h1>Sign Up to Slackana</h1>
              <button type="button" className="focus:outline-blue-600">
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
              <div css={styles.or}>
                <span>or</span>
              </div>
            </div>
          </nav>
          <form css={styles.form} onSubmit={handleSubmit(handleSignUp)}>
            <div>
              <label htmlFor="name" css={globals.form_label}>
                Name <span>*</span>
              </label>
              <input
                type="text"
                css={globals.form_control}
                disabled={isSubmitting}
                placeholder="john doe"
                {...register('name')}
              />
              {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
            </div>
            <div>
              <label htmlFor="email" css={globals.form_label}>
                Email address <span>*</span>
              </label>
              <input
                type="email"
                css={globals.form_control}
                disabled={isSubmitting}
                placeholder="name@company.com"
                {...register('email')}
              />
              {errors?.email && <span className="error">{`${errors?.email?.message}`}</span>}
            </div>
            <div>
              <label htmlFor="password" css={globals.form_label}>
                Password <span>*</span>
              </label>
              <input
                type="password"
                css={globals.form_control}
                disabled={isSubmitting}
                placeholder="•••••••••"
                {...register('password')}
              />
              {errors?.password && <span className="error">{`${errors?.password?.message}`}</span>}
            </div>
            <div>
              <label htmlFor="confirm_password" css={globals.form_label}>
                Confirm password <span>*</span>
              </label>
              <input
                type="password"
                css={globals.form_control}
                disabled={isSubmitting}
                placeholder="•••••••••"
                {...register('confirm_password')}
              />
              {errors?.confirm_password && (
                <span className="error">{`${errors?.confirm_password?.message}`}</span>
              )}
            </div>
            <div className="pt-4">
              <button type="submit" css={styles.form_submit} disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Continue'}
              </button>
            </div>
          </form>
          <footer css={styles.footer}>
            <span>Already have an account?</span>
            <a href="#">Sign In</a>
          </footer>
        </section>
      </main>
    </>
  )
}

export default SignUp
