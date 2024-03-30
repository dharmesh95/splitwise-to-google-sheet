import { StorageProvider } from '../context/Storage'
import '../global.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function MyApp({ Component, pageProps }) {
  return (
    <StorageProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </StorageProvider>
  )
}
