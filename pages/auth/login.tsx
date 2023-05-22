import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'
import LoginForm from '@/components/user/loginForm'
import RegisterForm from '@/components/user/registerForm'

const inter = Inter({ subsets: ['latin'] })

export default function Signin() {
  return (
    <main className={`w-full h-full block m-0 p-0 ${inter.className} bg-main overflow-hidden`}>
      <Navbar />
      
      <div className="flex items-center justify-center gap-10 relative py-20 px-10">
        <LoginForm />

        <div className="block h-[650px] w-[2px] drop-shadow-md bg-black relative mx-24"></div>
        
        <RegisterForm />
      </div>
    </main>
  )
}