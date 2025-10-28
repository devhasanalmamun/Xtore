import { useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { IHeroImage } from '@/types/landing-home'
import { cn } from '@/lib/utils'

interface IProps {
  hero_images: IHeroImage[]
}
export default function HomepageHeroSection(props: IProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [, setCurrent] = useState(0)
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }))

  useEffect(() => {
    if (!api) return
    api.on('select', () => setCurrent(api?.selectedScrollSnap()))
  }, [api])

  return (
    <Carousel
      className="mx-auto max-w-7xl"
      opts={{ loop: true }}
      setApi={setApi}
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="h-[28dvh] sm:h-[42dvh] md:h-[520px]">
        {props.hero_images.map((item, i) => (
          <CarouselItem key={i}>
            <img className="h-full w-full object-cover" src={item.image} alt={item.title} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-2 sm:right-4" />
      <CarouselPrevious className="left-2 sm:left-4" />

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: api?.scrollSnapList().length || 0 }).map((_, i) => (
          <div
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              'h-2.5 w-2.5 cursor-pointer rounded-full bg-primary/50',
              api?.selectedScrollSnap() === i && 'bg-primary',
            )}
          />
        ))}
      </div>
    </Carousel>
  )
}
