import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showNavbar = router.pathname === "/auth" || router.pathname === "/" ? false : true
  return (<><SessionProvider><Toaster />{showNavbar && <Navbar />}<Component {...pageProps} /></SessionProvider></>)
}
