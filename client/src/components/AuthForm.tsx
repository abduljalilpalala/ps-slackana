import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { styles } from '~/shared/twin/auth.styles'
import { SignInUpFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { globals } from '~/shared/twin/globals.styles'
import { SignInFormSchema, SignUpFormSchema } from '~/shared/validation'

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
    formState: { isSubmitting, errors }
  } = useForm<SignInUpFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(isLogin ? SignInFormSchema : SignUpFormSchema)
  })

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
            disabled={isSubmitting}
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
      {!isLogin && (
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
      )}
      <button type="submit" css={styles.form_submit} disabled={isSubmitting}>
        {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Continue'}
      </button>
    </form>
  )
}

export default AuthForm
