import { TokenProvider } from '../context/token'
import '../global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <TokenProvider>
      <Component {...pageProps} />
    </TokenProvider>
  )
}
