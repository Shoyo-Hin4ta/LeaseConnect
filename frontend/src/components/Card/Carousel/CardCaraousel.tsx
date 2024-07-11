import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CardCarouselProps {
  images: string[];
}

const CardCarousel = ({ images }: CardCarouselProps) => {
  return (
    <Carousel className="w-full aspect-[4/3]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image} alt={`Listing image ${index + 1}`} className="w-full h-full object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}

export default CardCarousel