import { GetServerSideProps } from 'next'
import { forwardRef } from 'react'
import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { Session } from 'next-auth'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  return {
    props: {
      session
    }
  }
}) satisfies GetServerSideProps<{ session: Session | null }>

function Admin(props: { session: Session }, ref: IndexPageRef) {
  console.log(props)

  return (
    <PageTransition ref={ref}>
      <main
        className={`flex h-full flex-col items-center justify-between ${inter.className} overflow-hidden`}
      >

      </main>
    </PageTransition>
  )
}

export default forwardRef(Admin)
