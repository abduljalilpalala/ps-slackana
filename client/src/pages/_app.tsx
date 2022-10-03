import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import { wrapper } from '~/redux/store'
import '~/shared/css/globals.css'

const MyApp = ({ Component, ...rest }: AppProps): JSX.Element => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Toaster />
        <Component {...props.pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
