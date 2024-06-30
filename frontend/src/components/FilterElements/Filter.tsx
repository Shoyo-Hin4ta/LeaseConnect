import React, { useState } from 'react'
import { Button } from "../ui/button"
import BathAndFilter from "./BathAndBedFilter/BathAndBedFilter"
import DatePostedFilter from "./DatePostedFilter/DatePostedFilter"
import DateRangeFilter from "./DateRangeFilter/DateRangeFilter"
import LocationInputFilter from "./LocationInputFilter/LocationInputFilter"
import PreferencesFilter from "./PreferencesFilter/PreferencesFilter"
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFilter"
import SDFilter from "./SecurityDepositFilter/SDFilter"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

interface FilterData {
  city: string;
  datePosted: string;
  bedCount: string;
  bathCount: string;
  priceRange: { min: number; max: number };
  pricePeriod: 'per_day' | 'per_week' | 'per_month';
  dateRange: { from: Date | undefined; to: Date | undefined };
  preferences: string[];
  amenities: string[];
  securityDepositIncluded: boolean;
  utilitiesIncluded: boolean;
}

const Filter: React.FC = () => {
  const [filterData, setFilterData] = useState<FilterData>({
    city: '',
    datePosted: '',
    bedCount: '',
    bathCount: '',
    priceRange: { min: 0, max: 200 },
    pricePeriod: 'per_day',
    dateRange: { from: undefined, to: undefined },
    preferences: [],
    amenities: [],
    securityDepositIncluded: false,
    utilitiesIncluded: false
  })

  const handleFilterClick = () => {
    console.log('Filter data:', filterData)
    // Here you can use the filterData object to apply filters or send it to an API
  }
 
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className='p-4 bg-violet-600 dark:bg-violet-800 text-white'>
        <h2 className='text-xl font-semibold'>Filtering Options</h2>
      </div>
      <div className="p-4 space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="location">
            <AccordionTrigger>Location</AccordionTrigger>
            <AccordionContent>
              <LocationInputFilter 
                onChange={(city: string) => setFilterData(prev => ({ ...prev, city }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date-posted">
            <AccordionTrigger>Date Posted</AccordionTrigger>
            <AccordionContent>
              <DatePostedFilter 
                onChange={(datePosted: string) => setFilterData(prev => ({ ...prev, datePosted }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bed-bath">
            <AccordionTrigger>Bedrooms & Bathrooms</AccordionTrigger>
            <AccordionContent>
              <BathAndFilter 
                onBedChange={(bedCount: string) => setFilterData(prev => ({ ...prev, bedCount }))}
                onBathChange={(bathCount: string) => setFilterData(prev => ({ ...prev, bathCount }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price-range">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <PriceRangeFilter 
                onChange={(priceRange: { min: number; max: number }, pricePeriod: 'per_day' | 'per_week' | 'per_month') => 
                  setFilterData(prev => ({ ...prev, priceRange, pricePeriod }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date-range">
            <AccordionTrigger>Date Range</AccordionTrigger>
            <AccordionContent>
              <DateRangeFilter 
                onChange={(dateRange: { from: Date | undefined; to: Date | undefined }) => setFilterData(prev => ({ ...prev, dateRange }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="preferences">
            <AccordionTrigger>Preferences & Amenities</AccordionTrigger>
            <AccordionContent>
              <PreferencesFilter 
                onPreferencesChange={(preferences: string[]) => setFilterData(prev => ({ ...prev, preferences }))}
                onAmenitiesChange={(amenities: string[]) => setFilterData(prev => ({ ...prev, amenities }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security-deposit">
            <AccordionTrigger>Security Deposit & Utilities</AccordionTrigger>
            <AccordionContent>
              <SDFilter 
                onSecurityDepositChange={(securityDepositIncluded: boolean) => setFilterData(prev => ({ ...prev, securityDepositIncluded }))}
                onUtilitiesChange={(utilitiesIncluded: boolean) => setFilterData(prev => ({ ...prev, utilitiesIncluded }))}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button 
          className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-colors duration-200"
          onClick={handleFilterClick}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

export default Filter