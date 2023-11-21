import { useState } from 'react'
import { useRouter } from 'next/router'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Spinner from '../shared/spinner'

interface ILoginForm {
    openModal: () => void
    setErrorMessage: (errorMessage: string) => void
}
z
const loginSchema = z.object({
    email: z.string().min(8, { message: 'Digite o email, por favor!' }),
    password: z.string().min(1)
})

export default function LoginForm({ openModal, setErrorMessage }: ILoginForm) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState<boolean>(false)

    const login = async (loginData: FieldValues) => {
        const signInResponse = await signIn('credentials', { ...loginData, redirect: false })

        if (signInResponse?.error) {
            setErrorMessage(signInResponse?.error)

            openModal()

            return
        }

        router.push('/')
    }

    return (
        <div className="relative block w-full xl:w-[500px] h-auto xl:h-[650px] px-6 md:px-0">
            <div className="flex flex-col justify-start items-center relative gap-4 mb-14 xl:mb-24">
                <h1 className="block text-4xl text-black font-bold drop-shadow-md text-center xl:text-left">
                    Já é cliente?
                </h1>

                <span className="block text-center xl:text-left text-gray-400 font-medium text-xl">
                    Faça seu login!
                </span>
            </div>

            <form className="flex flex-col justify-start items-center gap-12 h-auto w-full relative" onSubmit={handleSubmit(loginData => login(loginData))}>
                <div className="block w-full relative">
                    <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Email</label>
                    <input {...register('email')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: exemplo@gmail.com" />
                    {
                        errors.email?.message &&
                        <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                            {errors.email?.message?.toString()}
                        </p>
                    }
                </div>

                <div className="block w-full relative">
                    <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Senha</label>
                    <input type="password" {...register('password')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: x12PT*!z" />
                    {
                        errors.password &&
                        <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                            Digite a senha, por favor!
                        </p>
                    }
                </div>

                <button type="submit" className="flex justify-center items-center bg-black drop-shadow-md text-gray-100 h-12 w-24 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black">
                    {
                        isSubmitting ? (
                            <Spinner />
                        ) : "Login"
                    }
                </button>
            </form>

            <div className="flex justify-between items-center w-full relative mt-10 xl:mt-16">
                <Link href="/auth/forget" className="inline-block drop-shadow-lg font-semibold transition-all hover:text-gray-400">
                    Esqueceu a senha?
                </Link>

                <Link href="/auth/activate" className="inline-block drop-shadow-lg font-semibold transition-all hover:text-gray-400">
                    Precisa ativar sua conta?
                </Link>
            </div>
        </div>
    )
}