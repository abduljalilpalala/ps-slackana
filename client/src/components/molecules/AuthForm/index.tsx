import { useForm } from 'react-hook-form'
import React, { FC, useState } from 'react'
import { EyeOff, Eye } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuthStatus } from '~/hooks/authStatus'
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
  const [showPass, setShowPass] = useState(false)
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

  const handleShowPasswordToggle = (): void => setShowPass(!showPass)

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
        <div className="relative flex items-center">
          <input
            type={showPass ? 'text' : 'password'}
            css={globals.form_control}
            disabled={isLoading}
            placeholder="•••••••••"
            {...register('password')}
            className="!pr-10"
          />
          <button
            type="button"
            className={`
               group absolute inset-y-0 right-0 block overflow-hidden rounded-r 
               px-2.5 outline-none transition duration-75 ease-in-out
               focus:bg-slate-100 hover:bg-slate-100
            `}
            onClick={handleShowPasswordToggle}
          >
            {showPass ? (
              <Eye
                className={`
                h-4 w-4 text-slate-500 group-hover:text-slate-800 
                group-focus:text-slate-800
            `}
              />
            ) : (
              <EyeOff
                className={`
                h-4 w-4 text-slate-500 group-hover:text-slate-800 
                group-focus:text-slate-800
            `}
              />
            )}
          </button>
        </div>
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
