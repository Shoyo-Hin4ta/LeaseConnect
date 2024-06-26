import React, { useState } from 'react'
import { Button } from "../ui/button"
import BathAndFilter from "./BathAndBedFilter/BathAndBedFilter"
import DatePostedFilter from "./DatePostedFilter/DatePostedFilter"
import DateRangeFilter from "./DateRangeFilter/DateRangeFilter"
import LocationInputFilter from "./LocationInputFilter/LocationInputFilter"
import PreferencesFilter from "./PreferencesFilter/PreferencesFilter"
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFilter"
import SDFilter from "./SecurityDepositFilter/SDFilter"

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
    <div className="border border-red-300 w-[90%]">
      <div>Filter</div>
      <div className="flex flex-col">
        <LocationInputFilter 
          onChange={(city: string) => setFilterData(prev => ({ ...prev, city }))}
        />
        
        <DatePostedFilter 
          onChange={(datePosted: string) => setFilterData(prev => ({ ...prev, datePosted }))}
        />
        
        <BathAndFilter 
          onBedChange={(bedCount: string) => setFilterData(prev => ({ ...prev, bedCount }))}
          onBathChange={(bathCount: string) => setFilterData(prev => ({ ...prev, bathCount }))}
        />

        <PriceRangeFilter 
          onChange={(priceRange: { min: number; max: number }, pricePeriod: 'per_day' | 'per_week' | 'per_month') => 
            setFilterData(prev => ({ ...prev, priceRange, pricePeriod }))}
        />
        
        <DateRangeFilter 
          onChange={(dateRange: { from: Date | undefined; to: Date | undefined }) => setFilterData(prev => ({ ...prev, dateRange }))}
        />

        <PreferencesFilter 
          onPreferencesChange={(preferences: string[]) => setFilterData(prev => ({ ...prev, preferences }))}
          onAmenitiesChange={(amenities: string[]) => setFilterData(prev => ({ ...prev, amenities }))}
        />

        <SDFilter 
          onSecurityDepositChange={(securityDepositIncluded: boolean) => setFilterData(prev => ({ ...prev, securityDepositIncluded }))}
          onUtilitiesChange={(utilitiesIncluded: boolean) => setFilterData(prev => ({ ...prev, utilitiesIncluded }))}
        />

        <Button onClick={handleFilterClick}>Filter</Button>
      </div>
    </div>
  )
}

export default Filter