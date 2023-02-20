import Head from 'next/head'
import { Inter } from '@next/font/google'
import Navbar from './Navbar'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>Next Task</title>
      <meta name="description" content="Tech Task" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={`${inter.className} xl:w-1/2 xl:mx-auto px-4`}>
      <Navbar />
      {children}
    </main>
  </>
)

export default Layout
