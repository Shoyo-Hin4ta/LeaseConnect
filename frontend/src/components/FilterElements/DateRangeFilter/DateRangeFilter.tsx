import React from 'react'
import { DateRangePicker, DateRange } from '@/components/ui/date-range-picker'

interface DateRangeFilterProps {
  onChange: (dateRange: DateRange) => void;
  value: DateRange;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onChange, value }) => {
  return (
    <div className="space-y-4 w-full">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Stay Dates</h3>
      <DateRangePicker
        onUpdate={(values) => onChange(values.range)}
        align="center"
        locale="en-GB"
        showCompare={false}
        value={value}
      />
    </div>
  )
}

export default DateRangeFilter