import Link from "next/link"
import Image from "next/image"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Footer() {
    return (
        <footer className={`block w-full static bottom-0 py-12 bg-black ${inter.className}`}>
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-start gap-10">
                    <div className="w-24 h-24 block relative">
                        <Image src="/logo_white.png" alt="logo_branco" fill />
                    </div>

                    <div className="text-white">
                        <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
                        <p>Telefone: (19) 99839-1342</p>
                        <p>Email: petilidades@gmail.com</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Links Úteis</h3>
                        <ul>
                        <li><Link href="/" className="text-white transition-all hover:text-gray-400">Página Inicial</Link></li>
                        <li><Link href="/produtos" className="text-white transition-all hover:text-gray-400">Produtos</Link></li>
                        <li><Link href="/sobre" className="text-white transition-all hover:text-gray-400">Sobre Nós</Link></li>
                        <li><Link href="/contato" className="text-white transition-all hover:text-gray-400">Contato</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Siga-nos nas Redes Sociais</h3>
                        <ul>
                            <li><Link href="https://facebook.com" className="text-white transition-all hover:text-gray-400">Facebook</Link></li>
                            <li><Link href="https://twitter.com" className="text-white transition-all hover:text-gray-400">Twitter</Link></li>
                            <li><Link href="https://instagram.com" className="text-white transition-all hover:text-gray-400">Instagram</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}