import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface IProductSlider {
  id: string
  images: string[]
  url: string
  name: string
  price?: string
  list_price?: string
  installment?: {
    amount: string
    value: string
  }
}

export default function ProductsSlider({
  title,
  products,
}: {
  title: string
  products: IProductSlider[]
}) {
  return (
    <div className="productsSlider relative block w-full my-10">
      <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-black block text-left font-bold drop-shadow-md relative mb-6">
        {title}
      </h2>

      <Swiper
        modules={[Pagination]}
        pagination={{ enabled: true }}
        slidesPerView={5}
        spaceBetween={15}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} id={product.id} className="pt-4 pb-6">
            <div className="product p-2 rounded-md border border-gray-200 bg-white transition-all hover:shadow-lg">
              <Link href={product.url}>
                <div className="product-image relative w-full block mb-3">
                  {product.images.map((image, index) => (
                    <Image
                      className="object-contain"
                      width={300}
                      height={350}
                      src={image}
                      alt={`product_image_${index}`}
                      key={index}
                    />
                  ))}
                </div>

                <div className="product-details p-2 flex flex-col justify-center items-center">
                  <span className="product-name text-md font-bold text-black drop-shadow-sm">
                    {product.name}
                  </span>
                  <div className="product-prices flex justify-center items-center gap-3">
                    <span className="product-price text-md text-red-600 line-through drop-shadow-sm">
                      {product.price}
                    </span>
                    <span className="product-list-price text-lg font-bold text-black drop-shadow-sm">
                      {product.list_price}
                    </span>
                  </div>
                  {product.installment && (
                    <span className="product-installments text-md text-black drop-shadow-sm">
                      <strong>{product.installment?.amount}x</strong> de
                      <strong>{product.installment.value}</strong>
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
