import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react';
import SettingsComponent from '@/components/SettingsComponent'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showNavbar = router.pathname === "/auth" || router.pathname === "/" ? false : true
// Set showSettings to true when the current route is '/settings'
const showSettings = router.pathname === "/settings";
  return (
  <>
    <SessionProvider>
      {showNavbar && <Navbar />}
      <Component {...pageProps}>
        {showSettings && <SettingsComponent />}
      </Component>
    </SessionProvider>
  </>)
}
