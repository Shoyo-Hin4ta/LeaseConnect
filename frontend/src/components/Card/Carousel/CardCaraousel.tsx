import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CardCarouselProps {
  images: string[];
}

const CardCarousel = ({ images }: CardCarouselProps) => {
  return (
    <Carousel className="w-full aspect-[4/3] overflow-hidden">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="w-full h-full">
              <img 
                src={image} 
                alt={`Listing image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}

export default CardCarousel