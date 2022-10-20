import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'

import Logo2Icon from '~/shared/icons/Logo2Icon'
import GoogleIcon from '~/shared/icons/GoogleIcon'
import { styles } from '~/shared/twin/auth.styles'

type Props = {
  children: ReactNode
  metaTitle: string
}

const AuthLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()

  const isSignUp = router.pathname === '/sign-up'

  return (
    <>
      <Head>
        <title key="auth">{`Slackana | ${metaTitle}`}</title>
      </Head>
      <main css={styles.main}>
        <section css={styles.section}>
          <nav css={styles.nav}>
            <div css={styles.business_logo}>
              <Logo2Icon />
              <h1>Slackana</h1>
            </div>
            <div css={styles.google_provider}>
              <h1>{isSignUp ? 'Sign Up' : 'Sign In'} to Slackana</h1>
            </div>
          </nav>
          {children}
          <footer css={styles.footer}>
            <span>{isSignUp ? 'Do you have an account?' : "You don't have an account?"}</span>
            <Link href={isSignUp ? '/sign-in' : '/sign-up'}>
              <a>{isSignUp ? 'Sign In' : 'Sign Up'}</a>
            </Link>
          </footer>
        </section>
      </main>
    </>
  )
}

export default AuthLayout
