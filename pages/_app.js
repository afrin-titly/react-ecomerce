import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'
import { StateContext } from '../context/StateContext'

function MyApp({ Component, pageProps }) {
  console.log(<Toaster />)
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
