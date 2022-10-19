import tw from 'twin.macro'
import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'

import { styles } from '~/shared/twin/404.styles'

const UnauthorizedPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Unauthorized Page</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main css={styles.wrapper}>
        <div css={styles.container}>
          <header css={styles.header}>
            <span css={tw`-mr-5`}>4</span>
            <div>
              <img
                src="/images/404.png"
                alt="Cry Emoji Image"
                width={192}
                height={192}
                placeholder="blur"
              />
            </div>
            <span css={tw`-ml-4`}>1</span>
          </header>
          <section css={styles.section}>
            <h2>Unauthorized</h2>
            <p className="text-justify">
              This server could not verify that you are authorized to access the page. Either you
              supplied the wrong credentials (e.g., bad password), or your browser doesn't
              understand how to supply the credentials required.
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

export default UnauthorizedPage
