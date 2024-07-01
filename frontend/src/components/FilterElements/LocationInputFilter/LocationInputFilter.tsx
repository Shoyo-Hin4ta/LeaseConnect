import React from 'react'
import { Input } from '@/components/ui/input'

interface LocationInputFilterProps {
  onChange: (city: string) => void;
  value: string
}

const LocationInputFilter: React.FC<LocationInputFilterProps> = ({ onChange, value }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Location</h3>
      <Input 
        type="text" 
        placeholder="Enter city" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full"
        value={value}
      />
    </div>
  )
}

export default LocationInputFilter