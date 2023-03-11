import { StorageProvider } from '../context/LocalStorage'
import '../global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <StorageProvider>
      <Component {...pageProps} />
    </StorageProvider>
  )
}
