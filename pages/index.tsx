import { GetStaticProps } from 'next'
import { forwardRef } from 'react'
import { Inter } from 'next/font/google'
import PageTransition from '@/components/shared/pageTransition'
import ImagesSlider from '@/components/images_carousel/imagesCarousel'
import ProductsSlider from '@/components/products_carousel/productsCarousel'
import { loadProductsForSlider } from '@/lib/loadProductsForSlider'
import { IProductSlider } from '@/interfaces/IProductsSlider'
import { bannerImages } from '@/lib/loadBannerImages'

type IndexPageRef = React.ForwardedRef<HTMLDivElement>

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = (async (context) => {
  const products = await loadProductsForSlider()

  return { props: { products } }
}) satisfies GetStaticProps<{ products: IProductSlider[] }>

function Home(props: { products: IProductSlider[] }, ref: IndexPageRef) {
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
            <ProductsSlider title="Os mais vendidos" products={props.products} />
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default forwardRef(Home)
