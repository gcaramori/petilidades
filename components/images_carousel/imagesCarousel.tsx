import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

interface ISlide {
  imagePath: string
  CTA: React.ReactNode
}

export default function ImagesSlider({
  slides,
}: {
  slides: ISlide[]
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
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index} className="relative">
              <Image
                width={1920}
                height={900}
                src={slide.imagePath}
                alt={`banner_image_${index}`}
                priority
              />

              {slide.CTA}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
