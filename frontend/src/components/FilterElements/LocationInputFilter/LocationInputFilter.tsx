import React from 'react'
import { Input } from '@/components/ui/input'
import FilterElementContainer from '../FilterElementContainer';

interface LocationInputFilterProps {
  onChange: (city: string) => void;
}

const LocationInputFilter: React.FC<LocationInputFilterProps> = ({ onChange }) => {
  return (
    
      <FilterElementContainer>
        <div>Enter City</div>
        <div>
          <Input 
            type="text" 
            placeholder="City" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          />
        </div>
      </FilterElementContainer>
    
  )
}

export default LocationInputFilter