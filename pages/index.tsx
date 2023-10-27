import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import { forwardRef } from 'react'
import Image from 'next/image'
import dog from '../public/dog_cover.png'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function Home(prop: object, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <main
        className={`flex h-full flex-col items-center justify-between ${inter.className} overflow-hidden`}
      >
        <div className="flex justify-between items-center relative w-full h-screen">
          <div className="dog block relative translate-y-20">
            <Image src={dog} alt="dog_cover" />
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default forwardRef(Home)
