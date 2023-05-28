import React, { useState, forwardRef } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import PageTransition from '@/components/shared/pageTransition'
import { motion } from 'framer-motion'
import Link from 'next/link'

type registerSuccessPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function RegisterSuccess({ cookies }: any, ref: registerSuccessPageRef): JSX.Element {
    const router = useRouter()

    const [isUserActive, setIsUserActive] = useState<Boolean>(false)

    const registerData = (cookies?.register_data) ? JSON.parse(cookies.register_data) : false
    
    if(!registerData) {
        router.push('/auth/login')
    }

    const handleRegisterPinChange = async (e: any) => {
        if(e.target.value == registerData?.pin) {
            const activateUser = await fetch(`/api/users/${registerData?.email}`, {
                method: "PUT",
                body: JSON.stringify({ active: true }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if(!activateUser) {
                alert("erro!")

                return false
            }

            setIsUserActive(true)

            setTimeout(() => {
                router.push('/auth/login')
            }, 10000)
        }
    }

    return (
        <PageTransition ref={ref}>
            <main className={`w-full h-auto block m-0 p-0 ${inter.className} bg-main overflow-hidden`}>
                <Navbar />
                
                {
                    !isUserActive ? 
                    (
                        <div className="flex flex-col items-center justify-start gap-10 relative pt-20 pb-[205px] px-10 h-auto transition-all">
                            <div className="flex flex-col justify-start items-center relative gap-4 mb-16   ">
                                <h1 className="block text-4xl text-black font-bold drop-shadow-md text-left">
                                    Falta pouco para finalizar seu cadastro...
                                </h1>

                                <span className="block text-left text-gray-400 font-medium text-xl">
                                    Digite o código que lhe enviamos por email!
                                </span>
                            </div>

                            <div className="block relative p-2 w-full max-w-sm">
                                <input type="text" className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-xl font-semibold focus:outline-none active:outline-none" placeholder="Ex: 12345678" maxLength={8} onChange={e => handleRegisterPinChange(e)} />
                            </div>
                        </div>
                    )
                    :
                    (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                            <div className="flex flex-col items-center justify-center gap-10 relative px-10 xl:h-[529px] transition-all">
                                <div className="flex flex-col justify-start items-center relative gap-4">
                                    <h1 className="block text-4xl text-black font-bold drop-shadow-md text-left">
                                        Feito!
                                    </h1>

                                    <span className="block text-left text-gray-400 font-medium text-xl">
                                        Você foi cadastrado com sucesso! Agora faça login!
                                    </span>

                                    <Link href="/auth/login" className="inline-block relative mt-10 bg-black py-4 px-6 text-lg font-semibold text-white transition-all hover:bg-gray-200 hover:text-black">
                                        Fazer login
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </main>
        </PageTransition>
    )
}

export default forwardRef(RegisterSuccess)

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context)

  return { props: { cookies } }
}