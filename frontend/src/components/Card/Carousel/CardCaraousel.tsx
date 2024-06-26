import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const CardCarousel = () => {
  
  return (

      <Carousel className="mt-4 rounded-lg h-full border border-red-800">
        <CarouselContent className="h-full">
          <CarouselItem className="bg-red-600">red</CarouselItem>
          <CarouselItem className="bg-blue-600">blue</CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-0"/>
        <CarouselNext className="right-0"/>
      </Carousel>

  )
}

export default CardCarousel