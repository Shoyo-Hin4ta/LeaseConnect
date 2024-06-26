import React from 'react'
import { DateRangePicker } from '@/components/ui/date-range-picker'

const DateRangeFilter = ({ onChange } : {
  onChange : (dateRange: { from: Date | undefined; to: Date | undefined }) => void,
}) => {
  return (
    <div className='my-2'>
      <div>Looking For</div>
      <div>   
        <DateRangePicker
          onUpdate={(values) => onChange(values.range)}
          align="start"
          locale="en-GB"
          showCompare={false}
        />
      </div>
    </div>
  )
}

export default DateRangeFilter