import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"
import { IBannerImages } from "@/interfaces/IBannerImages"

export const bannerImages: IBannerImages[] = [
    {
        imagePath: '/b1.png',
        CTA: <Link className="flex items-center gap-4 text-4xl font-bold text-white absolute bottom-24 right-16 transition-all hover:opacity-80" href="/mais-vendidos">Ver agora <BsArrowRight size="2rem" /></Link>
    },
    {
        imagePath: '/b2.png',
        CTA: <Link className="flex items-center gap-4 text-4xl font-bold text-white absolute bottom-24 left-16 transition-all hover:opacity-80" href="/mais-vendidos">Ver agora <BsArrowRight size="2rem" /></Link>
    }
]