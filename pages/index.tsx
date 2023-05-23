import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />

      <main className={`flex h-full flex-col items-center justify-between p-24 ${inter.className} overflow-hidden`}>
        
      </main>
    </>
  )
}