import React from 'react'
import { Button } from '@/components/ui/button'
import Gallery from '../Gallery'
import { FaRegCalendarCheck,FaBed, FaBath, FaHome, FaCalendarAlt, FaMapMarkerAlt, FaListUl, FaBolt, FaSwimmingPool, FaDollarSign, FaCalendarDay } from 'react-icons/fa'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'


const RupeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" className="w-4 h-4">
    <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"/>
  </svg>
)

export const getCurrencyIcon = (currency : string) => {
  switch(currency.toLowerCase()) {
    case 'usd':
      return <FaDollarSign className="mr-1" />;
    case 'inr':
      return <RupeeIcon />;
    default:
      return <RiMoneyDollarCircleLine className="mr-1" />;
  }
}

const PropertyDetails = ({ listingData }) => {
  
  const formatValue = (value) => {
    const specialCases = {
      'usd': 'USD', 'inr': 'INR', 'no_smoking': 'No Smoking', 'no_drinking': 'No Drinking',
      'no_pets': 'No Pets', 'students_only': 'Students Only', 'working_only': 'Working Only',
      'girls_only': 'Girls Only', 'eggeterian': 'Eggetarian',
    };
    if (value in specialCases) return specialCases[value];
    return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  const renderList = (items, emptyMessage) => {
    if (!items || items.length === 0) return <p>{emptyMessage}</p>;
    return (
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <span key={index} className="text-base text-gray-600 dark:text-gray-300">{formatValue(item)}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white">Property Details</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaBed /> <span>{listingData.bedroom} Bedroom(s)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaBath /> <span>{listingData.bathroom} Bathroom(s)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaDollarSign />
          <span>{listingData.amount} / {formatValue(listingData.timePeriod)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaCalendarDay />
          <span>Daily Rate: $ {listingData.dailyRate}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaHome /> <span>{formatValue(listingData.propertyType)}</span>
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">
          <FaCalendarAlt className="inline mr-2" /> Sublease Period
        </h2>
        <div className="text-base text-gray-600 dark:text-gray-300 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{new Date(listingData.subleaseDuration.from).toLocaleDateString()} - {new Date(listingData.subleaseDuration.to).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FaRegCalendarCheck />
            <span>{listingData.numberOfDays} Day(s)</span>
          </div>
        </div>
      </div>


      <div className='space-y-4'>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">
          <FaMapMarkerAlt className="inline mr-2" /> Address Details
        </h2>
        <div className="space-y-2 text-base text-gray-600 dark:text-gray-300">
          <div>{listingData.location.streetAddress}</div>
          <div>{listingData.location.city}, {listingData.location.state}</div>
          <div>{listingData.location.country} - {listingData.location.zipcode}</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">Other Details</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              <FaListUl className="inline mr-2" /> Preferences
            </h3>
            {renderList(listingData.preferences, "Preferences not specified by the user")}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              <FaBolt className="inline mr-2" /> Utilities
            </h3>
            {renderList(listingData.utilities, "Utilities not specified by the user")}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              <FaSwimmingPool className="inline mr-2" /> Amenities
            </h3>
            {renderList(listingData.amenities, "Amenities not specified by the user")}
          </div>
        </div>
      </div>

      <Gallery images={listingData.images} />    

      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Listed By: {listingData.createdBy.name}
      </div>
    </div>
  )
}

export default PropertyDetails