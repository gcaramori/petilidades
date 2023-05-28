import { useState, useCallback, forwardRef } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/header/navbar'
import LoginForm from '@/components/user/loginForm'
import RegisterForm from '@/components/user/registerForm'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import AlertModal from '@/components/shared/alertModal'
import PageTransition from '@/components/shared/pageTransition'

type LoginPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function Login(props: {}, ref: LoginPageRef): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [])

  return (
    <PageTransition ref={ref}>
      <main className={`w-full h-auto block m-0 p-0 ${inter.className} bg-main overflow-hidden`}>
        <Navbar />
        
        <div className="flex items-start justify-center gap-10 relative py-20 px-10">
          <LoginForm openModal={openModal} />

          <div className="block h-[650px] w-[2px] drop-shadow-md bg-black relative mx-24"></div>
          
          <RegisterForm />
        </div>
      </main>

      <AlertModal
        title="Oops..."
        message="Usuário e/ou senha incorretos!"
        onClose={closeModal}
        isOpen={showModal}
      />
    </PageTransition>
  )
}

export default forwardRef(Login)

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}