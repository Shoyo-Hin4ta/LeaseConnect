import React from 'react'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import FilterElementContainer from '../FilterElementContainer';

const DateRangeFilter = ({ onChange } : {
  onChange : (dateRange: { from: Date | undefined; to: Date | undefined }) => void,
}) => {
  return (
    <FilterElementContainer>

      <div>Looking For</div>
      <div>   
        <DateRangePicker
          onUpdate={(values) => onChange(values.range)}
          align="start"
          locale="en-GB"
          showCompare={false}
        />
      </div>
    </FilterElementContainer>
  )
}

export default DateRangeFilter