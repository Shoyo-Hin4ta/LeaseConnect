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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Gallery = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const images = [
    '/one.png',
    '/two.png',
    '/User1.png',
    '/User2.png',
    '/User3.png',
    '/User4.png',
  ]

  useEffect(() => {
    if (!api) {
      return
    }
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
                width="300"
                height="200"
                alt={`Gallery image ${index + 1}`}
                className="rounded-lg object-cover aspect-[3/2] hover:opacity-80 transition-opacity cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[60vh] w-full p-6 bg-white dark:bg-gray-800 flex items-center justify-center">
              <DialogHeader>
                  <DialogTitle className="sr-only">Image Gallery</DialogTitle>
                  <DialogDescription className="sr-only">
                    Navigate through the image gallery using left and right arrows
                  </DialogDescription>
              </DialogHeader>
              <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto">
              <CarouselContent className='object-center'>
                  {images.map((img, idx) => (
                    <CarouselItem key={idx} className="flex items-center justify-center">
                    <img 
                      src={img} 
                      alt={`Gallery image ${idx + 1}`} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-gray-800/70 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-gray-800/70 z-10" />
              </Carousel>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
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