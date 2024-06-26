import React, { useState } from 'react'
import { DualRangeSlider } from "@/components/ui/dual-range-slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PriceRangeFilterProps {
  onChange: (priceRange: { min: number; max: number }, pricePeriod: 'per_day' | 'per_week' | 'per_month') => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ onChange }) => {
  const [values, setValues] = useState<[number, number]>([10, 200]);
  const [pricePeriod, setPricePeriod] = useState<'per_day' | 'per_week' | 'per_month'>('per_day');

  const handleValuesChange = (newValues: number[]) => {
    setValues([newValues[0], newValues[1]]);
    onChange({ min: newValues[0], max: newValues[1] }, pricePeriod);
  }

  const handlePricePeriodChange = (newPeriod: 'per_day' | 'per_week' | 'per_month') => {
    setPricePeriod(newPeriod);
    onChange({ min: values[0], max: values[1] }, newPeriod);
  }

  return (
    <div className='my-4'>
      <div className="flex gap-4 items-center ">
        Price Range Filter
        <div>
          <Select 
            defaultValue="per_day"
            onValueChange={handlePricePeriodChange}>
            <SelectTrigger className="">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="per_day">/ day</SelectItem>
              <SelectItem value="per_week">/ week</SelectItem>
              <SelectItem value="per_month">/ month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full space-y-5 px-5 mt-10">
        <DualRangeSlider
          label={(value) => <span>{value}</span>}
          value={values}
          onValueChange={handleValuesChange}
          min={10}
          max={200}
          step={1}
        />
      </div>
    </div>
  )
}

export default PriceRangeFilter