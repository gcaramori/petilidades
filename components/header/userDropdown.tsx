import Link from 'next/link'
import { BsFillPersonFill } from 'react-icons/bs'
import { useState, useCallback } from 'react'
import { signOut } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'

export default function UserDropdown() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const handleUserButton = useCallback(() => {
    setShowDropdown((showDropdown) => {
      return !showDropdown
    })
  }, [])

  return (
    <AnimatePresence>
      <div className="relative block w-auto">
        <button
          type="button"
          className="flex justify-center items-center text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative z-10 focus:border-black active:border-black hover:border-black"
          onMouseEnter={handleUserButton}
        >
          <BsFillPersonFill size="0.9rem" />
        </button>

        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="block absolute left-[-50px] rounded-md drop-shadow-md w-auto h-auto transition-all whitespace-nowrap bg-gray-100 mt-2"
              onMouseLeave={handleUserButton}
            >
              <ul className="block h-full w-full text-sm font-semibold text-black">
                <li className="block text-center h-auto w-auto transition-all bg-gray-100 hover:bg-gray-200">
                  <Link
                    className="block w-full h-full py-3 px-8 focus:outline-none focus:border-0"
                    href="/"
                  >
                    Minha conta
                  </Link>
                </li>
                <li className="block text-center h-auto w-auto transition-all bg-gray-100 hover:bg-gray-200">
                  <Link
                    className="block w-full h-full py-3 px-8 focus:outline-none focus:border-0"
                    href="/pedidos"
                  >
                    Meus pedidos
                  </Link>
                </li>
                <li className="block text-center h-auto w-auto transition-all bg-gray-100 hover:bg-gray-200">
                  <button
                    className="block w-full h-full py-3 px-8 border-0 appearance-none z-50 focus:outline-none focus:border-0"
                    onClick={() => signOut()}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}
