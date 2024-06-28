import { Button } from '@/components/ui/button'
import Gallery from '../Gallery'

const PropertyDetails = () => {
  return (
    <div className="grid gap-8 border border-red-600">

            

            <div>
              <h2 className="text-3xl font-bold tracking-tighter">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  {/* <RulerIcon className="w-5 h-5" /> */}
                  <span>Apartment</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <BedIcon className="w-5 h-5" /> */}
                  <span>3 Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <BathIcon className="w-5 h-5" /> */}
                  <span>2 Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <RulerIcon className="w-5 h-5" /> */}
                  <span>1,800 sq ft</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <CalendarIcon className="w-5 h-5" /> */}
                  <span>Built in 2018</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <CalendarIcon className="w-5 h-5" /> */}
                  <span>$400</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tighter">Sublease Period</h2>
              <div className="grid gap-0 mt-4">
                <div className="flex items-center gap-2">
                  {/* <RulerIcon className="w-5 h-5" /> */}
                  <span>Sublease Date from and to</span>
                </div>
              </div>
            </div>

            
            <div>
              <h2 className="text-xl font-bold tracking-tighter">Address Details</h2>
              <div className="grid gap-0 mt-4">
                <div className="flex items-center gap-2">
                  {/* <RulerIcon className="w-5 h-5" /> */}
                  <span>Street Address</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <BedIcon className="w-5 h-5" /> */}
                  <span>City, State</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <BathIcon className="w-5 h-5" /> */}
                  <span>Country - ZipCode</span>
                </div>
              </div>
            </div>

            <div className='border border-red-400'>
              <h2 className="text-xl font-bold tracking-tighter">Other Details</h2>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">

                <div>
                  <h2 className="text-l font-bold tracking-tighter">Preferences</h2>
                    <div className="flex flex-wrap items-center gap-2 sm:grid sm:grid-cols-3">
                      {/* <RulerIcon className="w-5 h-5" /> */}
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>

                    </div>
                </div>

                <div>
                  <h2 className="text-l font-bold tracking-tighter">Utilities</h2>
                    <div className="flex flex-wrap items-center gap-2 sm:grid sm:grid-cols-3">
                      {/* <RulerIcon className="w-5 h-5" /> */}
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                    </div>
                </div>

                <div className=''>
                  <h2 className="text-l font-bold tracking-tighter">Amenities</h2>
                    <div className="flex flex-wrap items-center gap-2 sm:grid sm:grid-cols-3">
                      {/* <RulerIcon className="w-5 h-5" /> */}
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                      <span>Amenity 1</span>
                    </div>
                </div>
                
              </div>
            </div>


            <Gallery />      

            <div>
              <div className="text-base font-bold tracking-tighter">Listed By : Ritik Singh</div>
                
            </div>

          </div>
  )
}

export default PropertyDetails