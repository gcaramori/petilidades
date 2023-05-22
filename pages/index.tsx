import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar />

      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        
      </main>
    </>
  )
}