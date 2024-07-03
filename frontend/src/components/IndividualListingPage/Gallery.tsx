import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Gallery = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const images = [
    "https://images1.apartments.com/i2/nWbsAbHB7_rE-8P7pKn3OuQbo1UwP_IoW3pJ5AIG3TU/111/cortland-apartments-hagerstown-md-primary-photo.jpg",
    "https://images1.apartments.com/i2/nSlZe06JNVAKcZaq0dncFNjMlXwu36GQwu-ncneAnn0/117/sire-kingwood-kingwood-tx-building-photo.jpg",
  ]

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 bg-gray-400 ">
              <DialogHeader className="sr-only">
                <DialogTitle>Image Gallery</DialogTitle>
              </DialogHeader>
              <Carousel setApi={setApi} className="w-full ">
                <CarouselContent>
                  {images.map((img, idx) => (
                    <CarouselItem key={idx} className="flex items-center justify-center h-[80vh]">
                      <img 
                        src={img} 
                        alt={`Gallery image ${idx + 1}`} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 bg-black/50 text-white hover:bg-black/70" />
                <CarouselNext className="absolute right-4 bg-black/50 text-white hover:bg-black/70" />
              </Carousel>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded">
                {current} / {count}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export default Gallery