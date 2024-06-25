import { DateRangePicker } from "../ui/date-range-picker"
import BathAndFilter from "./BathAndBedFilter.tsx/BathAndFilter"
import DatePostedFilter from "./DatePostedFilter/DatePostedFilter"
import DateRangeFilter from "./DateRangeFilter/DateRangeFilter"
import PreferencesFilter from "./PreferencesFilter/PreferencesFilter"
import PriceRangeFilter from "./PriceRangeFilter/PriceRangeFilter"
import SDFilter from "./SecurityDepositFilter/SDFilter"

const Filter = () => {



  return (
    <div className="border border-red-300 w-[90%]">
        <div>
            Filter
        </div>
        <div className="flex flex-col">

                {/* City Filter */}
            
                <DatePostedFilter />
                
                <BathAndFilter />

                <PriceRangeFilter />
                
                <DateRangeFilter />

                <PreferencesFilter />

                <SDFilter />

            

        </div>
    </div>
  )
}

export default Filter