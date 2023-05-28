import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  const router = useRouter()
  
  const pageKey = router.asPath

  return (
    <SessionProvider>
      <AnimatePresence  initial={false} mode="popLayout">
        <Component key={pageKey} {...pageProps} />
      </AnimatePresence>
    </SessionProvider>
  )
}
