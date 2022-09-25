import tw from 'twin.macro'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { NextPage } from 'next'

import { styles } from '~/shared/twin/404.styles'

const NotFound: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main css={styles.wrapper}>
        <div css={styles.container}>
          <header css={styles.header}>
            <span css={tw`-mr-6`}>4</span>
            <div>
              <Image
                src="/images/404.png"
                alt="Cry Emoji Image"
                width={192}
                height={192}
                blurDataURL="/images/emoji.png"
                placeholder="blur"
                layout="intrinsic"
              />
            </div>
            <span css={tw`-ml-8`}>4</span>
          </header>
          <section css={styles.section}>
            <h2>Oops! Page not be found</h2>
            <p>
              Sorry but the page you are looking for does not exist, have been removed. name changed
              or is temporarily unavailable
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

export default NotFound
