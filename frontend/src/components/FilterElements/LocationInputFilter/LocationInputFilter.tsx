import React from 'react'
import { Input } from '@/components/ui/input'

interface LocationInputFilterProps {
  onChange: (city: string) => void;
}

const LocationInputFilter: React.FC<LocationInputFilterProps> = ({ onChange }) => {
  return (
    <div className='my-2'>
      <div>Enter City</div>
      <div>
        <Input 
          type="text" 
          placeholder="City" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default LocationInputFilter