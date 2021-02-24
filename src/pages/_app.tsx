import { ChakraProvider } from '@chakra-ui/react'
import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';

import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp