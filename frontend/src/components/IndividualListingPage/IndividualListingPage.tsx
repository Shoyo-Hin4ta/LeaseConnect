import React from 'react'
import MainHeading from './MainHeading'
import PropertyDetails from './PropertyDetails/PropertyDetails'

const IndividualListingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainHeading />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <PropertyDetails />
      </div>
    </div>
  )
}

export default IndividualListingPage;