import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import LandingsLayout from '@/layouts/landings/landings-layout'

export default function HomepageIndex() {
  return (
    <LandingsLayout title="Welcome to Our Site" description="This is the welcome page.">
      {/* Banner */}
      <section className="relative px-0 pb-8 sm:px-6 lg:px-8 lg:pb-16">
        <Carousel className="mx-auto max-w-7xl">
          <CarouselContent className="h-[40dvh] sm:h-[50dvh] md:h-[70dvh]">
            <CarouselItem className="bg-pink-500">yo</CarouselItem>
            <CarouselItem className="bg-pink-500">yo</CarouselItem>
            <CarouselItem className="bg-pink-500">yo</CarouselItem>
          </CarouselContent>

          <CarouselNext className="right-2 sm:right-4" />
          <CarouselPrevious className="left-2 sm:left-4" />
        </Carousel>
      </section>
    </LandingsLayout>
  )
}
