import '@next-task/styles/globals.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '@next-task/store'
import Layout from '@next-task/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
