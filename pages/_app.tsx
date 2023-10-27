import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Navbar from '@/components/header/navbar'
import { Analytics } from '@vercel/analytics/react'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const router = useRouter()

  const pageKey = router.asPath

  return (
    <SessionProvider session={pageProps.session}>
      <AnimatePresence initial={false} mode="popLayout">
        <Navbar />

        <Component key={pageKey} {...pageProps} />

        <Analytics />
      </AnimatePresence>
    </SessionProvider>
  )
}
