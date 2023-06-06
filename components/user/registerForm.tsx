import { useForm, Controller, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import InputMask from 'react-input-mask'
import { useRouter } from 'next/router'

const registerSchema = z.object({
    email: z.string().min(8, { message: 'Digite o email, por favor!' }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Digite o email corretamente, por favor!' }),
    password: z.string().min(8, { message: 'Digite a senha, por favor!' }).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/, { message: 'Digite a senha seguindo os padrões de segurança!' }),
    name: z.string().min(10, { message: 'Digite o nome completo, por favor!' }),
    birth: z.coerce.date(),
    gender: z.string().min(1, { message: 'Escolha o gênero, por favor!' }),
    cpf: z.string().min(8, { message: 'Digite o CPF, por favor!' }).regex(/^(?!(\d)\1{10}$)(\d{3})(\.\d{3}){2}-\d{2}$/, { message: 'Digite o CPF corretamente, por favor!' }),
    telephone: z.string().min(8, { message: 'Digite o celular, por favor!' }).regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/, { message: 'Digite o celular corretamente, por favor!' })
})

export default function RegisterForm() {
    const router = useRouter()

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const registerUser = async (registerData : FieldValues) => {
        const newUser = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                ...registerData,
                active: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        console.log(newUser)

        if(!newUser) return false

        const sendActivationEmail = await fetch('/api/register/success', {
            method: 'POST',
            body: JSON.stringify({ email: registerData?.email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!sendActivationEmail) return false

        router.push('/register/success')

        return true
    }

    return (
        <div className="relative block w-full xl:w-[700px] h-auto xl:h-[750px] px-6 md:px-0">
            <div className="flex flex-col justify-start items-center relative gap-4 mb-14 xl:mb-24">
                <h1 className="block text-4xl text-black font-bold drop-shadow-md text-center xl:text-left">
                    Ainda não é cliente?
                </h1>

                <span className="block text-center xl:text-left text-gray-400 font-medium text-xl">
                    Se cadastre imediatamente!
                </span>
            </div>

            <form className="flex flex-col justify-start items-center gap-10 xl:gap-16 h-full w-full relative" onSubmit={handleSubmit((registerData) => registerUser(registerData))}>
                <div className="form-row w-full flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-6 relative">
                    <div className="block w-full md:w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Email</label>
                        <input {...register('email')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: teste@gmail.com" />
                        {
                            errors.email?.message && 
                                <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                                    {errors.email?.message?.toString()}
                                </p>
                        }
                    </div>

                    <div className="block w-full md:w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Senha</label>
                        <input type="password" {...register('password')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: x12PT*!z" />
                        {
                            errors.password &&
                            <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                                Digite a senha, por favor!
                            </p>
                        }
                    </div>
                </div>

                <div className="form-row w-full flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-6 relative">
                    <div className="block w-full md:w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Nome</label>
                        <input {...register('name')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: José Alves da Silva" />
                        {
                            errors.name?.message && 
                                <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                                    {errors.name?.message?.toString()}
                                </p>
                        }
                    </div>

                    <div className="block w-full md:w-1/2 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">CPF</label>
                        <Controller
                            name="cpf"
                            control={control}
                            render={({ 
                                field: {
                                    onChange,
                                    onBlur,
                                    name,
                                    ref
                                }
                            }) => (
                                <InputMask
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    inputRef={ref}
                                    name={name}
                                    mask="999.999.999-99"
                                    placeholder="Ex: 123.456.789-0"
                                    className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none"
                                />
                            )}
                        />
                        {
                            errors.cpf &&
                            <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                                Digite seu CPF corretamente, por favor!
                            </p>
                        }
                    </div>
                </div>

                <div className="form-row w-full flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-6 relative">
                    <div className="block w-full md:w-1/3 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Data de nascimento</label>
                        <Controller
                            name="birth"
                            control={control}
                            render={({ 
                                field: {
                                    onChange,
                                    onBlur,
                                    name,
                                    ref
                                }
                            }) => (
                                <InputMask
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    inputRef={ref}
                                    name={name}
                                    mask="99/99/9999"
                                    placeholder="Ex: 10/02/1998"
                                    className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none"
                                />
                            )}
                        />
                        {
                            errors.birth &&
                            <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                                Digite a data de nascimento corretamente, por favor!
                            </p>
                        }
                    </div>

                    <div className="block w-full md:w-1/3 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Celular</label>
                        <Controller
                            name="telephone"
                            control={control}
                            render={({ 
                                field: {
                                    onChange,
                                    onBlur,
                                    name,
                                    ref
                                }
                            }) => (
                                <InputMask
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    inputRef={ref}
                                    name={name}
                                    mask="(99) 99999-9999"
                                    placeholder="Ex: (19) 994838-2329"
                                    className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none"
                                />
                            )}
                        />
                        {
                            errors.telephone &&
                            <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
                                Digite seu telefone corretamente, por favor!
                            </p>
                        }
                    </div>

                    <div className="block w-full md:w-1/3 relative">
                        <label className="inline-block text-left text-black drop-shadow-sm text-sm font-bold mb-2">Gênero</label>
                        <input type="text" {...register('gender')} className="block w-full h-10 bg-transparent border-b-2 border-black text-center text-lg focus:outline-none active:outline-none" placeholder="Ex: Masculino, etc" />
                        {
                            errors.gender &&
                            <p className="block absolute top-20 inset-x-0 text-xs xl:text-md font-semibold text-red-600 text-left xl:text-center">
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