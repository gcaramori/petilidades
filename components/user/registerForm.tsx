import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface IRegisterUser {
    email: string;
    password: string;
    name: string;
    birth: string;
    gender: string;
    cpf: string;
    phone: string;
}

const registerSchema = z.object({
    email: z.string().min(8, { message: 'Digite o email, por favor!' }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Digite o email corretamente, por favor!' }),
    password: z.string().min(8, { message: 'Digite a senha, por favor!' }).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/, { message: 'Digite a senha seguindo os padrões de segurança!' }),
    name: z.string().min(10, { message: 'Digite o nome completo, por favor!' }),
    birth: z.coerce.date(),
    gender: z.string().min(1, { message: 'Escolha o gênero, por favor!' }),
    cpf: z.string().min(8, { message: 'Digite o CPF, por favor!' }).regex(/^(?!(\d)\1{10}$)(\d{3})(\.\d{3}){2}-\d{2}$/, { message: 'Digite o CPF corretamente, por favor!' }),
    phone: z.string().min(8, { message: 'Digite o celular, por favor!' }).regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/, { message: 'Digite o celular corretamente, por favor!' })
})

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    return (
        <div className="relative block w-[700px] h-[650px]">
            <div className="flex flex-col justify-start items-center relative gap-4 mb-24">
                <h1 className="block text-4xl text-black font-bold drop-shadow-md text-left">
                    Ainda não é cliente?
                </h1>

                <span className="block text-left text-gray-400 font-medium text-xl">
                    Se cadastre imediatamente!
                </span>
            </div>

            <form className="flex flex-col justify-start items-center gap-16 h-full w-full relative" onSubmit={handleSubmit((d) => console.log(d))}>
                <div className="form-row w-full flex justify-center items-center gap-6 relative">
                    <div className="block w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Email</label>
                        <input {...register('email')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: teste@gmail.com" />
                        {
                            errors.email?.message && 
                                <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                    {errors.email?.message?.toString()}
                                </p>
                        }
                    </div>

                    <div className="block w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Senha</label>
                        <input type="password" {...register('password')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: x12PT*!z" />
                        {
                            errors.password &&
                            <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                Digite a senha, por favor!
                            </p>
                        }
                    </div>
                </div>

                <div className="form-row w-full flex justify-center items-center gap-6 relative">
                    <div className="block w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Nome</label>
                        <input {...register('name')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: José Alves da Silva" />
                        {
                            errors.name?.message && 
                                <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                    {errors.name?.message?.toString()}
                                </p>
                        }
                    </div>

                    <div className="block w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">CPF</label>
                        <input type="text" {...register('cpf')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: 188.678.455-0" />
                        {
                            errors.cpf &&
                            <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                {errors.cpf?.message?.toString()}
                            </p>
                        }
                    </div>
                </div>

                <div className="form-row w-full flex justify-center items-center gap-6 relative">
                    <div className="block w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Celular</label>
                        <input type="text" {...register('phone')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: (19) 98503-2392" />
                        {
                            errors.phone &&
                            <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                {errors.phone?.message?.toString()}
                            </p>
                        }
                    </div>

                    <div className="block w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Gênero</label>
                        <input type="text" {...register('gender')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: Masculino, etc" />
                        {
                            errors.gender &&
                            <p className="block absolute top-20 inset-x-0 text-md font-semibold text-red-600 text-center">
                                {errors.gender?.message?.toString()}
                            </p>
                        }
                    </div>
                </div>

                <button type="submit" className="inline-block bg-black drop-shadow-md text-gray-100 px-8 py-2 text-lg font-semibold mt-10 transition-all hover:bg-gray-200 hover:text-black">
                    Cadastrar
                </button>   
            </form>
        </div>
    )
}