import React from 'react'
import { Button } from '../ui/button'

const MainHeading = () => {
  return (
    <section className="w-full bg-muted py-8 md:py-12">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Image */}
          <div className="w-full aspect-video">
            <img
              src="/placeholder.svg"
              alt="Property"
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Cozy Mountain Retreat
            </h1>
            
            {/* Description with scroll */}
            <div className="h-48 overflow-y-auto pr-4">
              <p className="text-muted-foreground text-lg">
                Experience the tranquility of the mountains in this charming retreat, perfect for a relaxing getaway.
                This cozy hideaway offers breathtaking views, fresh mountain air, and a peaceful ambiance that will
                help you unwind and reconnect with nature. Ideal for couples, families, or anyone seeking a serene
                escape from the bustle of everyday life. Nestled in the heart of nature, this retreat provides an 
                authentic mountain experience with modern comforts. Wake up to stunning vistas, spend your days 
                exploring scenic trails, and unwind in the evenings by a cozy fireplace. Our retreat is designed 
                to help you disconnect from the world and reconnect with what truly matters.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Enquire</Button>
              <Button size="lg" variant="outline">View Ritik's Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHeading