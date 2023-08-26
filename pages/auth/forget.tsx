import React, { useState, useCallback, forwardRef } from 'react'
import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import { motion } from 'framer-motion'
import AlertModal from '@/components/shared/alertModal'
import Spinner from '@/components/shared/spinner'
import Link from 'next/link'
import { getCookies } from 'cookies-next'

type recoverPasswordPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function RecoverPassword({ cookies }: any, ref: recoverPasswordPageRef): JSX.Element {  
    const [activeStep, setActiveStep] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const [pin, setPin] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [sendPinCodeLoading, setSendPinCodeLoading] = useState<boolean>(false)
    const [validatePinCodeLoading, setValidatePinCodeLoading] = useState<boolean>(false)
    const [changePasswordLoading, setChangePasswordLoading] = useState<boolean>(false)
  
    const openModal = useCallback(() => {
      setShowModal(true);
    }, [])
  
    const closeModal = useCallback(() => {
      setShowModal(false);
    }, [])

    const handleEmailInputChange = useCallback((e: any) => {
        setEmail(e.target.value)
    }, []);

    const handlePinInputChange = useCallback((e: any) => {
        setPin(e.target.value)
    }, []);

    const handlePasswordInputChange = useCallback((e: any) => {
        setNewPassword(e.target.value)
    }, []);

    const handleSendPinCodeSubmit = async () => {
        setSendPinCodeLoading(true)

        if(email === "") {
            setErrorMessage("Digite um email, por favor!")

            openModal()
            
            setSendPinCodeLoading(false)

            return
        }

        const emailReponse = await fetch('/api/auth/forget', {
            method: 'POST',
            body: JSON.stringify({
                email: email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())

        if(emailReponse.code) {
            setErrorMessage("Erro ao enviar email!")

            openModal()
            
            setSendPinCodeLoading(false)

            return
        }

        setActiveStep(1)
    }

    const handleValidatePin = async () => {
        setValidatePinCodeLoading(true)

        if(pin === "") {
            setErrorMessage("Digite o PIN, por favor!")

            openModal()
            
            setValidatePinCodeLoading(false)

            return
        }

        if(cookies.change_password === undefined || cookies.change_password === "") {
            setErrorMessage("O cookie não foi gerado!")

            openModal()

            setActiveStep(0)

            return
        }

        if(pin != cookies.change_password) {
            setErrorMessage("O PIN não foi validado!")

            openModal()
            
            setValidatePinCodeLoading(false)

            return
        }

        setValidatePinCodeLoading(false)

        setActiveStep(2)
    }

    const handleChangePassword = async () => {
        setChangePasswordLoading(true)

        if(newPassword === "") {
            setErrorMessage("Digite a senha, por favor!")

            openModal()
            
            setValidatePinCodeLoading(false)

            return
        }

        if(!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/)) {
            setErrorMessage("A senha precisa ter pelo menos 8 dígitos, contendo 1 caractere maíusculo, 1 caractere especial e 1 número!")

            openModal()
            
            setChangePasswordLoading(false)

            return
        }

        await fetch("/api/users", {
            method: 'PUT',
            body: JSON.stringify({
                email,
                newPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            setChangePasswordLoading(false)

            setActiveStep(3)
        })
        .catch(err => {
            setErrorMessage(err)

            openModal()
        })
    }

    return (
        <>
            <PageTransition ref={ref}>
                <main className={`w-full h-auto block m-0 p-0 ${inter.className} bg-main overflow-hidden`}>
                    {
                        activeStep === 0 && 
                        (
                            <div className="flex flex-col items-center justify-start gap-10 relative pt-20 pb-[205px] px-10 h-auto transition-all">
                                <div className="flex flex-col justify-start items-center relative gap-4 mb-16">
                                    <h1 className="block text-xl md:text-4xl text-black font-bold drop-shadow-md text-center xl:text-left">
                                        Digite seu email
                                    </h1>

                                    <span className="block text-center xl:text-left text-gray-400 font-medium text-sm md:text-xl">
                                        Para receber o código de validação
                                    </span>
                                </div>

                                <div className="block relative p-2 w-full max-w-sm">
                                    <input type="text" className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-md md:text-xl font-semibold focus:outline-none active:outline-none" placeholder="Ex: exemplo@gmail.com" onChange={handleEmailInputChange} />
                                </div>

                                <button type="submit" className="flex justify-center items-center bg-black drop-shadow-md text-gray-100 h-10 w-28 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black" onClick={handleSendPinCodeSubmit}>
                                    {
                                        sendPinCodeLoading ? (
                                            <Spinner />
                                        ) : "Enviar"
                                    }
                                </button>
                            </div>
                        )
                    }
                    {
                        activeStep === 1 && 
                        (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                <div className="flex flex-col items-center justify-center gap-10 relative px-10 xl:h-[529px] transition-all">
                                    <div className="flex flex-col justify-start items-center relative gap-4">
                                        <h1 className="block text-xl md:text-4xl text-black font-bold drop-shadow-md text-left">
                                            Valide o PIN de segurança
                                        </h1>
                                        
                                        <div className="block relative p-2 w-full max-w-sm">
                                            <input type="text" className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-md md:text-xl font-semibold focus:outline-none active:outline-none" placeholder="Ex: 8612690916" onChange={handlePinInputChange} />
                                        </div>

                                        <button type="submit" className="flex justify-center items-center bg-black drop-shadow-md text-gray-100 h-10 w-32 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black" onClick={handleValidatePin}>
                                            {
                                                validatePinCodeLoading ? (
                                                    <Spinner />
                                                ) : "Validar PIN"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                    {
                        activeStep === 2 && 
                        (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                <div className="flex flex-col items-center justify-center gap-10 relative px-10 xl:h-[529px] transition-all">
                                    <div className="flex flex-col justify-start items-center relative gap-4">
                                        <h1 className="block text-xl md:text-4xl text-black font-bold drop-shadow-md text-left">
                                            Digite sua nova senha
                                        </h1>
                                        
                                        <div className="block relative p-2 w-full max-w-sm">
                                            <input type="text" className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-md md:text-xl font-semibold focus:outline-none active:outline-none" placeholder="Ex: 8612690916" onChange={handlePasswordInputChange} />
                                        </div>

                                        <button type="submit" className="flex justify-center items-center bg-black drop-shadow-md text-gray-100 h-10 w-32 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black" onClick={handleChangePassword}>
                                            {
                                                changePasswordLoading ? (
                                                    <Spinner />
                                                ) : "Trocar senha"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                    {
                        activeStep === 3 && 
                        (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                <div className="flex flex-col items-center justify-center gap-10 relative px-10 xl:h-[529px] transition-all">
                                    <div className="flex flex-col justify-start items-center relative gap-4">
                                        <h1 className="block text-xl md:text-4xl text-black font-bold drop-shadow-md text-left">
                                            Pronto!
                                        </h1>
                                        
                                        <span className="block text-center xl:text-left text-gray-400 font-medium text-xl">
                                            Sua senha foi trocada com sucesso!
                                        </span>

                                        <Link href="/auth/login" className="flex justify-center items-center bg-black drop-shadow-md text-gray-100 h-10 w-32 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black">
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

export default forwardRef(RecoverPassword)

export async function getServerSideProps({ req, res }: any) {
    const cookies = getCookies({ req, res })
        
    return { props: { cookies } }
}