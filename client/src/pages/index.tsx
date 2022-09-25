import Head from 'next/head'
import type { NextPage } from 'next'

import UnderContruction from '~/utils/UnderContruction'

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <UnderContruction />
    </>
  )
}

export default Index
