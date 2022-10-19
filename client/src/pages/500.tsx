import tw from 'twin.macro'
import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'

import { styles } from '~/shared/twin/404.styles'

const InternalServerError: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Internal Server Error</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main css={styles.wrapper}>
        <div css={styles.container}>
          <header css={styles.header}>
            <span css={tw`-mr-6`}>5</span>
            <div>
              <img
                src="/images/404.png"
                alt="Cry Emoji Image"
                width={192}
                height={192}
                placeholder="blur"
              />
            </div>
            <span css={tw`-ml-6`}>0</span>
          </header>
          <section css={styles.section}>
            <h2>Internal Server Error</h2>
            <p>
              The server encountered an internal error or misconfiguation and was unable to complete
              your request.
            </p>
          </section>
          <Link href="/">
            <a css={styles.btn_homepage}>Back to Homepage</a>
          </Link>
        </div>
      </main>
    </>
  )
}

export default InternalServerError
