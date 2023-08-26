import { forwardRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from 'next/link'
import { Inter } from 'next/font/google'
import HeaderSearch from "./headerSearch"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
import UserDropdown from "./userDropdown"
import Tooltip from "../shared/tooltip"
import { useSession } from "next-auth/react"
import useDeviceType from "@/hooks/useDeviceType"
import { motion } from "framer-motion"

const inter = Inter({ subsets: ['latin'] })

function Navbar() {
    const { data: session } = useSession()

    const device = useDeviceType()

    const [isSidemenuOpen, setIsSidemenuOpen] = useState<boolean>(false)

    const handleOpenSidemenu = useCallback(() => {
        setIsSidemenuOpen(true)
    }, [])

    const handleCloseSidemenu = useCallback(() => {
        setIsSidemenuOpen(false)
    }, [])

    useEffect(() => {}, [handleOpenSidemenu, handleCloseSidemenu])

    return (
        <header className={`flex w-full py-2 lg:py-6 px-4 xl:px-10 bg-main ${inter.className}`}>
            {
                device === 'desktop' ? (
                    <nav className="flex justify-around items-center w-full h-full">
                        <div className="headerLogo inline-block w-32 xl:w-[200px] 2xl:w-[250px] h-8 xl:h-[72px] relative">
                            <Image 
                                src="/logo_header_removed_bg.png" 
                                alt="logo" 
                                fill 
                                style={{ objectFit: "contain" }}
                                sizes="(max-width: 1024px) 128px, (max-width: 1450px) 200px, 250px"
                                priority
                            />
                        </div>

                        <ul className="flex justify-center items-center gap-8 w-auto xl:w-1/3 py-5 font-bold uppercase">
                            <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                <Link href="/">
                                    Início
                                </Link>
                            </li>
                            <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                <Link href="/cachorros">
                                    Cachorros
                                </Link>
                            </li>
                            <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                <Link href="/gatos">
                                    Gatos
                                </Link>
                            </li>
                            <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                <Link href="/mais-vendidos">
                                    Mais vendidos
                                </Link>
                            </li>
                        </ul>

                        <div className="headerSearch block relative w-56 xl:w-80">
                            <HeaderSearch />
                        </div>

                        <div className="w-36 h-full flex justify-center items-center gap-6 relative">
                            <div>
                                <button type="button" className="flex justify-center items-center text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative hover:border-black">
                                    <FaShoppingCart size="0.9rem" />
                                </button>
                            </div>

                            <div className="flex justify-center items-center">
                                {
                                    session?.user?.email ? 
                                        <UserDropdown /> 
                                    : (
                                        <Tooltip text="Fazer login ou cadastrar-se">
                                            <Link href="/auth/login" className="flex justify-center items-center text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative z-10 focus:border-black active:border-black hover:border-black">
                                                <BsFillPersonFill size="0.9rem" />
                                            </Link>
                                        </Tooltip>
                                    )
                                }
                            </div>
                        </div>
                    </nav>
                ) : (
                    <>
                        <div className="block w-full relative pb-3">
                            <nav className="w-full h-auto p-2 flex justify-center items-center gap-10 md:gap-44 relative bg-main">
                                <button className="flex justify-center items-center z-20 relative p-4 bg-transparent border-none md:mr-10 active:outline-none focus:outline-none" onClick={handleOpenSidemenu}>
                                    <AiOutlineMenu size="0.9rem" />
                                </button>

                                <div className="headerLogo inline-block w-[128px] h-[72px] relative">
                                    <Image 
                                        src="/logo.png" 
                                        alt="logo" 
                                        fill 
                                        style={{ objectFit: "contain" }}
                                        sizes="128px"
                                        priority
                                    />
                                </div>

                                <div className="w-36 h-full flex justify-center items-center gap-3 relative">
                                    <div>
                                        <button type="button" className="flex justify-center items-center text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative hover:border-black">
                                            <FaShoppingCart size="small" />
                                        </button>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        {
                                            session?.user?.email ? 
                                                <UserDropdown /> 
                                            : (
                                                <Tooltip text="Fazer login ou cadastrar-se">
                                                    <Link href="/auth/login" className="flex justify-center items-center text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative z-10 focus:border-black active:border-black hover:border-black">
                                                        <BsFillPersonFill size="0.9rem" />
                                                    </Link>
                                                </Tooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </nav>
                            
                            <div className="w-full relative flex justify-center items-center pt-3">
                                <HeaderSearch />
                            </div>
                        </div>

                        {
                            isSidemenuOpen && (
                                <div className="sidemenu h-screen w-48 fixed top-0 left-0 z-30">    
                                    <motion.div className="block h-full w-full relative" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .2, ease: 'easeInOut' }}>
                                        <div className="block h-full w-full relative py-12 bg-main z-30 shadow-md">
                                            <button className="block w-6 h-6 absolute top-2 right-2 z-40" onClick={handleCloseSidemenu}>
                                                <AiOutlineClose size="0.9rem" />
                                            </button>

                                            <ul className="flex flex-col justify-start items-center gap-8 w-full h-full font-bold uppercase">
                                                <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                                    <Link href="/">
                                                        Início
                                                    </Link>
                                                </li>
                                                <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                                    <Link href="/cachorros">
                                                        Cachorros
                                                    </Link>
                                                </li>
                                                <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                                    <Link href="/gatos">
                                                        Gatos
                                                    </Link>
                                                </li>
                                                <li className="inline-block text-black text-xs xl:text-sm 2xl:text-lg transition-all hover:text-gray-400">
                                                    <Link href="/mais-vendidos">
                                                        Mais vendidos
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </header>
    )
}

export default forwardRef(Navbar)