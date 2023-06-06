import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'
import PageTransition from '@/components/shared/pageTransition'
import { forwardRef } from 'react'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function Home(prop:{}, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <main className={`flex h-screen flex-col items-center justify-between p-24 ${inter.className} overflow-hidden`}>
        
      </main>
    </PageTransition>
  )
}

export default forwardRef(Home)