import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface ILoginUser {
    email: string;
    password: string;
}

const loginSchema = z.object({
    email: z.string().min(8, { message: 'Digite o email, por favor!' }),
    password: z.string().min(1)
})

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    return (
        <div className="relative block w-[500px] h-[650px]">
            <div className="flex flex-col justify-start items-center relative gap-4 mb-24">
                <h1 className="block text-4xl text-black font-bold drop-shadow-md text-left">
                    Já é cliente?
                </h1>

                <span className="block text-left text-gray-400 font-medium text-xl">
                    Faça seu login!
                </span>
            </div>

            <form className="flex flex-col justify-start items-center gap-12 h-full w-full relative" onSubmit={handleSubmit((d) => console.log(d))}>
                <div className="block w-full relative">
                    <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Email</label>
                    <input {...register('email')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: teste@gmail.com" />
                    {
                        errors.email?.message && 
                            <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                {errors.email?.message?.toString()}
                            </p>
                    }
                </div>

                <div className="block w-full relative">
                    <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Senha</label>
                    <input type="password" {...register('password')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: x12PT*!z" />
                    {
                        errors.password &&
                        <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                            Digite a senha, por favor!
                        </p>
                    }
                </div>

                <button type="submit" className="inline-block bg-black drop-shadow-md text-gray-100 px-8 py-2 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black">
                    Login
                </button>
            </form>
        </div>
    )
}