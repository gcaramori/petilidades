import React, { useState, forwardRef, useCallback } from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import PageTransition from '@/components/shared/pageTransition'
import { motion } from 'framer-motion'
import { getCookies } from 'cookies-next'
import Link from 'next/link'
import AlertModal from '@/components/shared/alertModal'

type registerSuccessPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function RegisterSuccess(cookies: {
    register_data: string
}, ref: registerSuccessPageRef): JSX.Element {
    const router = useRouter()

    const [isUserActive, setIsUserActive] = useState<Boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const registerData = (cookies?.register_data) ? JSON.parse(cookies.register_data) : false

    if (!registerData) {
        router.push('/auth/login')
    }

    const openModal = useCallback(() => {
        setShowModal(true);
    }, [])

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, [])

    const handleRegisterPinChange = async (e: any) => {
        if (e.target.value == registerData?.pin) {
            const activateUser = await fetch(`/api/users/${registerData?.email}`, {
                method: "PUT",
                body: JSON.stringify({ active: true }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if (activateUser.error) {
                setErrorMessage(activateUser.error)

                openModal()

                return false
            }

            setIsUserActive(true)

            setTimeout(() => {
                router.push('/auth/login')
            }, 10000)
        }
    }

    return (
        <>
            <PageTransition ref={ref}>
                <main className={`w-full h-auto block m-0 p-0 ${inter.className} bg-main overflow-hidden`}>
                    {
                        !isUserActive ?
                            (
                                <div className="flex flex-col items-center justify-start gap-10 relative pt-20 pb-[205px] px-10 h-auto transition-all">
                                    <div className="flex flex-col justify-start items-center relative gap-4 mb-16">
                                        <h1 className="block text-xl md:text-4xl text-black font-bold drop-shadow-md text-center xl:text-left">
                                            Falta pouco para finalizar seu cadastro...
                                        </h1>

                                        <span className="block text-center xl:text-left text-gray-400 font-medium text-sm md:text-xl">
                                            Digite o código que lhe enviamos por email!
                                        </span>
                                    </div>

                                    <div className="block relative p-2 w-full max-w-sm">
                                        <input type="text" className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-md md:text-xl font-semibold focus:outline-none active:outline-none" placeholder="Ex: 12345678" maxLength={8} onChange={e => handleRegisterPinChange(e)} />
                                    </div>
                                </div>
                            )
                            :
                            (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                    <div className="flex flex-col items-center justify-center gap-10 relative px-10 xl:h-[529px] transition-all">
                                        <div className="flex flex-col justify-start items-center relative gap-4">
                                            <h1 className="block text-xl md:text-4xl text-black font-bold drop-shadow-md text-left">
                                                Feito!
                                            </h1>

                                            <span className="block text-left text-gray-400 font-medium text-sm md:text-xl">
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

            <AlertModal
                title="Oops..."
                message={errorMessage}
                onClose={closeModal}
                isOpen={showModal}
            />
        </>
    )
}

export default forwardRef(RegisterSuccess)

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {
    const cookies = getCookies({ req, res })

    return { props: { cookies } }
}