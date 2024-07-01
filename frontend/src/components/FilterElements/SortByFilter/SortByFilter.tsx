import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

export type SortByTimeOption = 'date_newest' | 'date_oldest' | '';
export type SortByPriceOption = 'price_high_to_low' | 'price_low_to_high' | '';

export interface SortByFilterProps {
  onChange: (sortBy: { time: SortByTimeOption; price: SortByPriceOption }) => void;
  value: { time: SortByTimeOption; price: SortByPriceOption };
}

const SortByFilter: React.FC<SortByFilterProps> = ({ onChange, value }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-2 block">By Time</Label>
        <RadioGroup 
          onValueChange={(val) => onChange({ ...value, time: val as SortByTimeOption })} 
          value={value.time}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="date_newest" id="date_newest" />
            <Label htmlFor="date_newest">Newest First</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="date_oldest" id="date_oldest" />
            <Label htmlFor="date_oldest">Oldest First</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label className="text-sm font-medium mb-2 block">By Price</Label>
        <RadioGroup 
          onValueChange={(val) => onChange({ ...value, price: val as SortByPriceOption })} 
          value={value.price}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price_high_to_low" id="price_high_to_low" />
            <Label htmlFor="price_high_to_low">Highest to Lowest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price_low_to_high" id="price_low_to_high" />
            <Label htmlFor="price_low_to_high">Lowest to Highest</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default SortByFilter;