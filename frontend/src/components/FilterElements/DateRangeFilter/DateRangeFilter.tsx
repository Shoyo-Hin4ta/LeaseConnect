import React from 'react'
import { DateRangePicker } from '@/components/ui/date-range-picker'


const DateRangeFilter = ({ onChange } : {
  onChange : (dateRange: { from: Date | undefined; to: Date | undefined }) => void,
}) => {
  return (
    <div className="space-y-4 w-full">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Stay Dates</h3>
      <DateRangePicker
        onUpdate={(values) => onChange(values.range)}
        align="center"
        locale="en-GB"
        showCompare={false}      
      />
    </div>
  )
}

export default DateRangeFilter