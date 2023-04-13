import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react';
import AuthWrapper from '@/components/AuthWrapper';

const publicPages = ["/auth", "/"];
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPublicPage = publicPages.includes(router.pathname);

  return (
  <>
    <SessionProvider session={pageProps.session}>
      {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <AuthWrapper>
            <Navbar />
            <Component {...pageProps} />
          </AuthWrapper>
        )}
    </SessionProvider>
  </>)
}