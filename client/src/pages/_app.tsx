import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import '~/shared/css/globals.css'
import { wrapper } from '~/redux/store'
import NextProgress from '~/shared/lib/next-progress'

const MyApp = ({ Component, ...rest }: AppProps): JSX.Element => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <NextProgress />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#2D3D63',
              color: '#fff'
            }
          }}
        />
        <Component {...props.pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
