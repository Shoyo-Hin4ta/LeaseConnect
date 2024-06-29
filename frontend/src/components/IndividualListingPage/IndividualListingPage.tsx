import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import Gallery from './Gallery'
import MainHeading from './MainHeading'
import PropertyDetails from './PropertyDetails/PropertyDetails'

const IndividualListingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <MainHeading />


      <div className="container grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div>

          <PropertyDetails />
          
        </div>
      </div>
    </div>
  )
}

export default IndividualListingPage;

