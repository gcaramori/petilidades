import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'
import PageTransition from '@/components/shared/pageTransition'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

export default function Home(ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <Navbar />

      <main className={`flex h-screen flex-col items-center justify-between p-24 ${inter.className} overflow-hidden`}>
        
      </main>
    </PageTransition>
  )
}