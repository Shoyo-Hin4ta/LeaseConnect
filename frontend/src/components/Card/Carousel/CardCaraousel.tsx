import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const CardCarousel = () => {

  const images = [
    { src: "https://images1.apartments.com/i2/nWbsAbHB7_rE-8P7pKn3OuQbo1UwP_IoW3pJ5AIG3TU/111/cortland-apartments-hagerstown-md-primary-photo.jpg", alt: "Image 1" },
    { src: "https://images1.apartments.com/i2/nSlZe06JNVAKcZaq0dncFNjMlXwu36GQwu-ncneAnn0/117/sire-kingwood-kingwood-tx-building-photo.jpg", alt: "Image 2" },
  ]

  return (
    <Carousel className="w-full aspect-[4/3]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}

export default CardCarousel