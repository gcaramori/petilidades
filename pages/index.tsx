import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import { forwardRef } from 'react'
import Image from 'next/image'
import banner1 from '../public/banner_1.png'
import banner2 from '../public/banner_2.png'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

function Home(prop: object, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <main
        className={`flex h-full flex-col items-center justify-between ${inter.className} overflow-hidden`}
      >
        <div className="flex justify-between items-start relative w-full h-screen">
          <div className="dog block relative pt-4">
            <Image src={banner1} alt="dog_cover" priority />
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default forwardRef(Home)
