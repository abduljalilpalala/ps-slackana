import Head from 'next/head'
import Image from 'next/image'
import React, { FC } from 'react'

import { styles } from '~/shared/twin/under-construction.styles'

const UnderContruction: FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Under Construction</title>
      </Head>
      <main css={styles.main}>
        <div>
          <Image
            src="/images/under-construction.png"
            alt="Cry Emoji Image"
            width={400}
            height={302}
            blurDataURL="/images/emoji.png"
            placeholder="blur"
            layout="intrinsic"
          />
        </div>
        <section css={styles.section}>
          <h1>This page is under construction</h1>
          <p>We're working on it!</p>
        </section>
      </main>
    </>
  )
}

export default UnderContruction
