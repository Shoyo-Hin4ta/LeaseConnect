import React, { useState } from 'react'
import { Button } from "../ui/button"
import BathAndFilter from "./BathAndBedFilter/BathAndBedFilter"
import DateRangeFilter from "./DateRangeFilter/DateRangeFilter"
import LocationInputFilter from "./LocationInputFilter/LocationInputFilter"
import PreferencesFilter from "./PreferencesFilter/PreferencesFilter"
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFilter"
import SDFilter from "./SecurityDepositFilter/SDFilter"
import SortByFilter, { SortByPriceOption, SortByTimeOption } from "./SortByFilter/SortByFilter"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { DateRange } from '../ui/date-range-picker'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_SEARCH_LISTINGS } from '@/graphql/queries'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { LayoutContextType } from '../Layout'
import { calculateDateRange } from '@/lib/utils'


interface FilterData {
  location: string;
  bedCount: string;
  bathCount: string;
  priceRange: { min: number; max: number; period: 'per_day' | 'per_week' | 'per_month' };
  dateRange: DateRange ;
  preferences: string[];
  amenities: string[];
  // securityDepositIncluded: boolean;
  utilitiesIncluded: boolean | null;
  sortBy: {
    time: SortByTimeOption;
    price: SortByPriceOption;
  };
}

interface FilterProps {
  toggleSidebar: () => void;
}


const Filter: React.FC<FilterProps> = ({toggleSidebar}) => {


  const [filterData, setFilterData] = useState<FilterData>({
    location: '',
    bedCount: '',
    bathCount: '',
    priceRange: { min: 0, max: 200, period: 'per_day' },
    dateRange: calculateDateRange(),
    preferences: [],
    amenities: [],
    // securityDepositIncluded: false,
    utilitiesIncluded: null,
    sortBy: {
      time: '',
      price: ''
    }
  })

  const navigate = useNavigate();
  

  const handleFilterClick = (e) => {
    e.preventDefault(); // Prevent any default form submission
    
    toggleSidebar();
    
    // Always update the state, regardless of the current page
    navigate('/filterResultsPage', { 
      state: { filterData },
      replace: true // Use replace to avoid adding to history
    });
    
  }


  const handleResetClick = () => {
    setFilterData({
      location: '',
      bedCount: '',
      bathCount: '',
      priceRange: { min: 0, max: 200, period: 'per_day' },
      dateRange: { from: new Date(), to: new Date() },
      preferences: [],
      amenities: [],
      // securityDepositIncluded: false,
      utilitiesIncluded: null,
      sortBy: {
        time: '',
        price: ''
      }
    });
  };
 
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className='p-4 bg-violet-600 dark:bg-violet-800 text-white'>
        <h2 className='text-xl font-semibold'>Filtering Options</h2>
      </div>
      <div className="p-4 space-y-4">

        <Accordion type="single" collapsible className="w-full dark:text-violet-300">
          <AccordionItem value="location">
            <AccordionTrigger>Locations</AccordionTrigger>
            <AccordionContent>
              <LocationInputFilter 
                value={filterData.location}
                onChange={(location: string) => setFilterData(prev => ({ ...prev, location }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sort-by">
            <AccordionTrigger>Sort By</AccordionTrigger>
            <AccordionContent>
              <SortByFilter 
                value={filterData.sortBy}
                onChange={(sortBy) => setFilterData(prev => ({ ...prev, sortBy }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bed-bath">
            <AccordionTrigger>Bedrooms & Bathrooms</AccordionTrigger>
            <AccordionContent>
              <BathAndFilter 
                bedValue={filterData.bedCount}
                bathValue={filterData.bathCount}
                onBedChange={(bedCount: string) => setFilterData(prev => ({ ...prev, bedCount }))}
                onBathChange={(bathCount: string) => setFilterData(prev => ({ ...prev, bathCount }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price-range">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <PriceRangeFilter 
                value={filterData.priceRange}
                onChange={(priceRange: { min: number; max: number }, pricePeriod: 'per_day' | 'per_week' | 'per_month') => 
                  setFilterData(prev => ({ ...prev, priceRange: { ...priceRange, period: pricePeriod } }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date-range">
          <AccordionTrigger>Date Range</AccordionTrigger>
          <AccordionContent>
            <DateRangeFilter 
              value={filterData.dateRange}
              onChange={(dateRange) => setFilterData(prev => ({ ...prev, dateRange }))}
            />
          </AccordionContent>
        </AccordionItem>

          <AccordionItem value="preferences">
            <AccordionTrigger>Preferences & Amenities</AccordionTrigger>
            <AccordionContent>
              <PreferencesFilter 
                preferencesValue={filterData.preferences}
                amenitiesValue={filterData.amenities}
                onPreferencesChange={(preferences: string[]) => setFilterData(prev => ({ ...prev, preferences }))}
                onAmenitiesChange={(amenities: string[]) => setFilterData(prev => ({ ...prev, amenities }))}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security-deposit">
            <AccordionTrigger>Utilities Included</AccordionTrigger>
            <AccordionContent>
              <SDFilter 
                // securityDepositValue={filterData.securityDepositIncluded}
                utilitiesValue={filterData.utilitiesIncluded}
                // onSecurityDepositChange={(securityDepositIncluded: boolean) => setFilterData(prev => ({ ...prev, securityDepositIncluded }))}
                onUtilitiesChange={(utilitiesIncluded: boolean) => setFilterData(prev => ({ ...prev, utilitiesIncluded }))}
              />
            </AccordionContent>
          </AccordionItem>

          

        </Accordion>

        <div className='grid grid-cols-2 gap-2'>
          <Button 
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors duration-200"
              onClick={handleResetClick}
            >
              Reset Filters
          </Button>
          <Button 
            className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-colors duration-200"
            onClick={handleFilterClick}
          >
            Apply Filters
          </Button>
          
        </div>
      </div>
    </div>
  )
}

export default Filter