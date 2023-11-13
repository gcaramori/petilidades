import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import { forwardRef } from 'react'
import ImagesSlider from '@/components/images_carousel/imagesCarousel'
import ProductsSlider from '@/components/products_carousel/productsCarousel'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

const bannerImages = ['/banner_1.png', '/banner_2.png']

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
            <ImagesSlider imagesPaths={bannerImages} />
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
