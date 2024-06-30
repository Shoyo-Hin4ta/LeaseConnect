import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const CardCarousel = () => {
  return (
    <Carousel className="w-full aspect-[4/3]">
      <CarouselContent>
        <CarouselItem className="bg-red-600">red</CarouselItem>
        <CarouselItem className="bg-blue-600">blue</CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}

export default CardCarousel