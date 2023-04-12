import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showNavbar = router.pathname === "/auth" || router.pathname === "/" ? false : true
  return (
  <>
    <SessionProvider>
      {showNavbar && <Navbar />}
      <Component {...pageProps}></Component>
    </SessionProvider>
  </>)
}
