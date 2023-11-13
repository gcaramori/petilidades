import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function ImagesSlider({
  imagesPaths,
}: {
  imagesPaths: string[]
}) {
  return (
    <div className="imageSlider relative block w-full">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        slidesPerView={1}
      >
        {imagesPaths.map((imagePath, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                className="object-contain"
                width={1920}
                height={900}
                src={imagePath}
                alt={`banner_image_${index}`}
                priority
              />

              <Link
                href="/mais-vendidos"
                className={`absolute ${imagePath === '/banner_1.png'
                    ? 'bottom-32 right-64 bg-mainGreen border-mainGreen hover:text-mainGreen'
                    : 'bottom-48  left-16 bg-mainPink border-mainPink hover:text-mainPink'
                  } flex justify-center w-72 h-20 items-center z-50 text-2xl font-bold text-white border-2 rounded-md transition-all hover:bg-transparent`}
              >
                Veja agora
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
