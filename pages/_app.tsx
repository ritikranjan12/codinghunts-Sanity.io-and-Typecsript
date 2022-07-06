import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {UserProvider} from '@auth0/nextjs-auth0'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover  />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
