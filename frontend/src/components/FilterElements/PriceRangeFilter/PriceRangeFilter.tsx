import React, { useState } from 'react';
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterElementContainer from '../FilterElementContainer';

interface PriceRangeFilterProps {
  onChange: (priceRange: { min: number; max: number }, pricePeriod: 'per_day' | 'per_week' | 'per_month') => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ onChange }) => {
  const [perDayValues, setPerDayValues] = useState<[number, number]>([10, 200]);
  const [perWeekValues, setPerWeekValues] = useState<[number, number]>([100, 2000]);
  const [perMonthValues, setPerMonthValues] = useState<[number, number]>([200, 4000]);
  const [pricePeriod, setPricePeriod] = useState<'per_day' | 'per_week' | 'per_month'>('per_day');

  const handleValuesChange = (newValues: number[]) => {
    if (pricePeriod === 'per_day') {
      setPerDayValues([newValues[0], newValues[1]]);
    } else if (pricePeriod === 'per_week') {
      setPerWeekValues([newValues[0], newValues[1]]);
    } else {
      setPerMonthValues([newValues[0], newValues[1]]);
    }
    onChange({ min: newValues[0], max: newValues[1] }, pricePeriod);
  };

  const handlePricePeriodChange = (newPeriod: 'per_day' | 'per_week' | 'per_month') => {
    setPricePeriod(newPeriod);
    let currentValues;
    if (newPeriod === 'per_day') {
      currentValues = perDayValues;
    } else if (newPeriod === 'per_week') {
      currentValues = perWeekValues;
    } else {
      currentValues = perMonthValues;
    }
    onChange({ min: currentValues[0], max: currentValues[1] }, newPeriod);
  };

  const getCurrentValues = () => {
    if (pricePeriod === 'per_day') {
      return perDayValues;
    } else if (pricePeriod === 'per_week') {
      return perWeekValues;
    } else {
      return perMonthValues;
    }
  };

  const getSliderProps = () => {
    if (pricePeriod === 'per_day') {
      return { min: 10, max: 200, step: 1 };
    } else if (pricePeriod === 'per_week') {
      return { min: 100, max: 2000, step: 1 };
    } else {
      return { min: 200, max: 4000, step: 1 };
    }
  };

  return (
    <FilterElementContainer>
      <div className="flex gap-4 items-center ">
        Price Range Filter
        <div>
          <Select 
            defaultValue="per_day"     
            onValueChange={handlePricePeriodChange}>
            <SelectTrigger className="h-6 py-2 text-sm">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className='text-sm'>
              <SelectItem value="per_day">/ day</SelectItem>
              <SelectItem value="per_week">/ week</SelectItem>
              <SelectItem value="per_month">/ month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full space-y-5 px-0 mt-7">
        <DualRangeSlider
          label={(value) => <span>{value}</span>}
          value={getCurrentValues()}
          onValueChange={handleValuesChange}
          className='text-sm'
          {...getSliderProps()}
        />
      </div>
    </FilterElementContainer>
    );
};

export default PriceRangeFilter;