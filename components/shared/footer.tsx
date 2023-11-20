import Link from "next/link"
import Image from "next/image"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Footer() {
    return (
        <footer className={`block w-full static bottom-0 py-12 bg-black ${inter.className}`}>
            <div className="container mx-auto py-8 px-16 xl:px-4">
                <div className="flex justify-between items-start gap-10">
                    <div className="w-24 h-24 block relative">
                        <Image src="/logo_white.png" alt="logo_branco" fill />
                    </div>

                    <div className="block text-white">
                        <h3 className="text-lg xl:text-xl font-semibold mb-4">Informações de Contato</h3>

                        <p className="text-sm xl:text-md block relative mb-2">Telefone: (19) 99839-1342</p>
                        <p className="text-sm xl:text-md block relative">Email: petilidades@gmail.com</p>
                    </div>

                    <div className="block text-white">
                        <h3 className="text-lg xl:text-xl font-semibold mb-4">Links Úteis</h3>

                        <ul className="flex flex-col gap-2 relative">
                            <li>
                                <Link href="/" className="text-sm xl:text-md block relative transition-all hover:text-gray-400">
                                    Página Inicial
                                </Link>
                            </li>
                            <li>
                                <Link href="/produtos" className="text-sm xl:text-md block relative transition-all hover:text-gray-400">
                                    Produtos
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="text-sm xl:text-md block relative transition-all hover:text-gray-400">
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="text-sm xl:text-md block relative transition-all hover:text-gray-400">
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="block text-white">
                        <h3 className="text-lg xl:text-xl font-semibold mb-4">Siga-nos nas Redes Sociais</h3>

                        <ul className="flex flex-col gap-2 relative">
                            <li>
                                <Link href="https://facebook.com" className="text-sm xl:text-md block relative transition-all hover:text-gray-400">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="https://instagram.com" className="text-sm xl:text-md block relative transition-all hover:text-gray-400">
                                    Instagram
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center items-center my-3">
                    <p></p>
                </div>
            </div>
        </footer>
    )
}