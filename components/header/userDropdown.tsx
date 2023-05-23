import Link from "next/link"
import PersonIcon from '@mui/icons-material/Person';
import { useState, useCallback } from 'react'
import { signOut } from "next-auth/react"

export default function UserDropdown() {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleUserButton = useCallback(() => {
    setShowDropdown((showDropdown) => {
        return (showDropdown) ? false : true
    });
  }, [])

  return (
    <div className="relative block w-auto">
        <button type="button" className="inline-block text-sm h-10 w-10 rounded-full border border-grayBorder transition-all relative z-10 focus:border-black active:border-black hover:border-black" onClick={handleUserButton}>
            <PersonIcon fontSize="small" />
        </button>
        
        <div className="block absolute top-12 left-[-50px] rounded-md drop-shadow-md w-auto h-auto transition-all whitespace-nowrap bg-gray-100">  
        {
            showDropdown && (
                <ul className="block h-full w-full text-sm text-bold text-black">
                    <li className="block text-center h-auto w-auto transition-all bg-gray-100 hover:bg-gray-200">
                        <Link className="block w-full h-full py-3 px-8 focus:outline-none focus:border-0" href="/">
                            Minha conta
                        </Link>
                    </li>
                    <li className="block text-center h-auto w-auto transition-all bg-gray-100 hover:bg-gray-200">
                        <Link className="block w-full h-full py-3 px-8 focus:outline-none focus:border-0" href="/pedidos">
                            Meus pedidos
                        </Link>
                    </li>
                    <li className="block text-center h-auto w-auto transition-all bg-gray-100 hover:bg-gray-200">
                        <button className="block w-full h-full py-3 px-8 border-0 appearance-none z-50 focus:outline-none focus:border-0" onClick={() => signOut()}>
                            Sair
                        </button>
                    </li>
                </ul>  
            )
        }
        </div>
    </div>
  );
};