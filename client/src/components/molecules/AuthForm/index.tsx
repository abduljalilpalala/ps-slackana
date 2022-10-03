import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { styles } from '~/shared/twin/auth.styles'
import { SignInUpFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { globals } from '~/shared/twin/globals.styles'
import { SignInFormSchema, SignUpFormSchema } from '~/shared/validation'
import { useAuthStatus } from '~/hooks/authStatus'

type Props = {
  isLogin: boolean
  actions: {
    handleAuthSubmit: (data: SignInUpFormValues) => Promise<void>
  }
}

const AuthForm: FC<Props> = (props): JSX.Element => {
  const {
    isLogin,
    actions: { handleAuthSubmit }
  } = props

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignInUpFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(isLogin ? SignInFormSchema : SignUpFormSchema)
  })

  const { isLoading } = useAuthStatus(setError)

  return (
    <form css={styles.form} onSubmit={handleSubmit(handleAuthSubmit)}>
      {!isLogin && (
        <div>
          <label htmlFor="name" css={globals.form_label}>
            Name <span>*</span>
          </label>
          <input
            type="text"
            css={globals.form_control}
            disabled={isLoading}
            placeholder="john doe"
            {...register('name')}
          />
          {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
        </div>
      )}
      <div>
        <label htmlFor="email" css={globals.form_label}>
          Email address <span>*</span>
        </label>
        <input
          type="email"
          css={globals.form_control}
          disabled={isLoading}
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
          disabled={isLoading}
          placeholder="•••••••••"
          {...register('password')}
        />
        {errors?.password && <span className="error">{`${errors?.password?.message}`}</span>}
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="password_confirmation" css={globals.form_label}>
            Confirm password <span>*</span>
          </label>
          <input
            type="password"
            css={globals.form_control}
            disabled={isLoading}
            placeholder="•••••••••"
            {...register('password_confirmation')}
          />
          {errors?.password_confirmation && (
            <span className="error">{`${errors?.password_confirmation?.message}`}</span>
          )}
        </div>
      )}
      <button type="submit" css={styles.form_submit} disabled={isLoading}>
        {isLoading ? <Spinner className="h-5 w-5" /> : 'Continue'}
      </button>
    </form>
  )
}

export default AuthForm
