import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const MainHeading = () => {

  const navigate = useNavigate();
  return (
    <section className="w-full bg-white dark:bg-gray-800 py-8 md:py-12 shadow-md">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="w-full lg:w-2/3 aspect-video">
            <img
              src="/placeholder.svg"
              alt="Property"
              className="rounded-xl object-cover w-full h-full shadow-lg"
            />
          </div>
          
          {/* Content */}
          <div className="lg:w-1/3 space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Cozy Mountain Retreat
            </h1>
            
            <div className="h-48 overflow-y-auto pr-4 text-gray-600 dark:text-gray-300">
              <p className="text-lg">
                Experience the tranquility of the mountains in this charming retreat, perfect for a relaxing getaway.
                This cozy hideaway offers breathtaking views, fresh mountain air, and a peaceful ambiance that will
                help you unwind and reconnect with nature.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/messages")} size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">Enquire</Button>
              <Button onClick={() => navigate("/profilepage")} size="lg" variant="outline" className="text-violet-600 border-violet-600 hover:bg-violet-100 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-violet-900">View Ritik's Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHeading