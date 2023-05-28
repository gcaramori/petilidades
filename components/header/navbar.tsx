import Image from "next/image"
import Link from 'next/link'
import { Inter } from 'next/font/google'
import HeaderSearch from "./headerSearch"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import UserDropdown from "./userDropdown"
import Tooltip from "../shared/tooltip"
import { useSession } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <header className={`flex w-full py-6 px-10 bg-main ${inter.className}`}>
            <nav className="flex justify-around items-center w-full h-full">
                <div className="headerLogo inline-block w-80 h-10 relative">
                    <Image src="/logo_header_removed_bg.png" alt="logo" fill style={{ objectFit: "contain" }} />
                </div>

                <ul className="flex justify-center items-center gap-8 w-1/4 py-5 font-bold uppercase">
                    <li className="inline-block text-black transition-all hover:text-gray-400">
                        <Link href="/">
                            Início
                        </Link>
                    </li>
                    <li className="inline-block text-black transition-all hover:text-gray-400">
                        <Link href="/cachorros">
                            Cachorros
                        </Link>
                    </li>
                    <li className="inline-block text-black transition-all hover:text-gray-400">
                        <Link href="/gatos">
                            Gatos
                        </Link>
                    </li>
                    <li className="inline-block text-black transition-all hover:text-gray-400">
                        <Link href="/mais-vendidos">
                            Mais vendidos
                        </Link>
                    </li>
                </ul>

                <div className="headerSearch block relative w-1/4">
                    <HeaderSearch />
                </div>

                <div className="w-36 h-full flex gap-6 relative">
                    <div>
                        <button type="button" className="inline-block text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative hover:border-black">
                            <ShoppingCartIcon fontSize="small" />
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        {
                            session?.user?.email ? 
                                <UserDropdown /> 
                            : (
                                <Tooltip text="Fazer login ou cadastrar-se">
                                    <Link href="/auth/login" className="flex justify-center items-center text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative z-10 focus:border-black active:border-black hover:border-black">
                                        <PersonIcon fontSize="small" />
                                    </Link>
                                </Tooltip>
                            )
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}