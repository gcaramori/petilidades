import Link from 'next/link'
import { forwardRef } from 'react'
import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import ImagesSlider from '@/components/images_carousel/imagesCarousel'
import ProductsSlider from '@/components/products_carousel/productsCarousel'
import { BsArrowRight } from 'react-icons/bs'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

const bannerImages = [
  {
    imagePath: '/b1.png',
    CTA: <Link className="flex items-center gap-4 text-4xl font-bold text-white absolute bottom-24 right-16 transition-all hover:opacity-80" href="/mais-vendidos">Ver agora <BsArrowRight size="2rem" /></Link>
  },
  {
    imagePath: '/b2.png',
    CTA: <Link className="flex items-center gap-4 text-4xl font-bold text-white absolute bottom-24 left-16 transition-all hover:opacity-80" href="/mais-vendidos">Ver agora <BsArrowRight size="2rem" /></Link>
  }
]

const products = [
  {
    id: '01',
    url: 'https:/google.com',
    images: [
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
    ],
    name: 'Teste produto',
  },
  {
    id: '02',
    url: 'https:/google.com',
    images: [
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
    ],
    name: 'Teste produto',
  },
  {
    id: '03',
    url: 'https:/google.com',
    images: [
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
    ],
    name: 'Teste produto',
  },
  {
    id: '04',
    url: 'https:/google.com',
    images: [
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
    ],
    name: 'Teste produto',
  },
  {
    id: '05',
    url: 'https:/google.com',
    images: [
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
    ],
    name: 'Teste produto',
  },
  {
    id: '06',
    url: 'https:/google.com',
    images: [
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
    ],
    name: 'Teste produto',
  },
]

function Home(prop: object, ref: IndexPageRef) {
  return (
    <PageTransition ref={ref}>
      <main
        className={`flex h-full flex-col items-center justify-between ${inter.className} overflow-hidden`}
      >
        <div className="flex flex-col justify-center items-start relative max-w-[1280px]">
          <div className="banner block relative pt-4 w-full">
            <ImagesSlider slides={bannerImages} />
          </div>

          <div className="best-sellers block relative pt-4 w-full">
            <ProductsSlider title="Os mais vendidos" products={products} />
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default forwardRef(Home)
