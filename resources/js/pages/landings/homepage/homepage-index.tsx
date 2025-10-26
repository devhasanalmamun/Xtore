import { useState, useEffect, useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import LandingsLayout from '@/layouts/landings/landings-layout'
import { cn } from '@/lib/utils'

interface IBannerImage {
  image: string
  title: string
}

interface ICategory {
  name: string
  slug: string
}

interface IProps {
  banner_hero_images: IBannerImage[]
  categories: ICategory[]
}

export default function HomepageIndex(props: IProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [, setCurrent] = useState(0)
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  useEffect(() => {
    if (!api) return

    api.on('select', () => setCurrent(api?.selectedScrollSnap()))
  }, [api])

  return (
    <LandingsLayout title="Welcome to Our Site" description="This is the welcome page.">
      {/* Banner */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <Carousel
          className="mx-auto max-w-7xl"
          opts={{ loop: true }}
          setApi={setApi}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent className="h-[40dvh] sm:h-[50dvh] md:h-[70dvh]">
            {props.banner_hero_images.map((item, i) => (
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
                  'h-2.5 w-2.5 cursor-pointer rounded-full bg-primary/20',
                  api?.selectedScrollSnap() === i && 'bg-primary',
                )}
              />
            ))}
          </div>
        </Carousel>
      </section>
    </LandingsLayout>
  )
}
