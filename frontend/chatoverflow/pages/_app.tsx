import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider, useSession } from 'next-auth/react';
import AuthWrapper from '@/components/AuthWrapper';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const publicPages = ["/auth", "/", "/401"];
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isPublicPage = publicPages.includes(router.pathname);

  const [chatChanged, setChatChanged] = useState<boolean>(false);

  const changeChat = () => {
    setChatChanged((prev) => !prev);
  }

  return (
  <>
    <SessionProvider session={pageProps.session}>
      <div className='flex flex-col h-screen'>
      <Toaster />
      {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <AuthWrapper>
            <Navbar />
            <Component {...{changeChat, chatChanged, ...pageProps}}/>
          </AuthWrapper>
        )}
      </div>
    </SessionProvider>
  </>)
}