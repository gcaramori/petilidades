import { useState, useCallback, forwardRef } from 'react'
import { Inter } from 'next/font/google'
import LoginForm from '@/components/user/loginForm'
import RegisterForm from '@/components/user/registerForm'
import AlertModal from '@/components/shared/alertModal'
import PageTransition from '@/components/shared/pageTransition'

type LoginPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function Login(props: {}, ref: LoginPageRef): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [])

  return (
    <PageTransition ref={ref}>
      <main className={`w-full h-auto block m-0 p-0 ${inter.className} bg-main overflow-hidden`}>
        <div className="flex flex-col xl:flex-row items-start justify-center gap-10 relative py-12 xl:py-20 px-3 md:px-10 w-full">
          <LoginForm openModal={openModal} setErrorMessage={setErrorMessage} />

          <div className="block h-[1px] xl:h-[650px] w-[90%] xl:w-[2px] drop-shadow-md bg-black relative my-12 xl:my-0 mx-auto xl:mx-24"></div>
          
          <RegisterForm />
        </div>
      </main>

      <AlertModal
        title="Oops..."
        message={errorMessage}
        onClose={closeModal}
        isOpen={showModal}
      />
    </PageTransition>
  )
}

export default forwardRef(Login)