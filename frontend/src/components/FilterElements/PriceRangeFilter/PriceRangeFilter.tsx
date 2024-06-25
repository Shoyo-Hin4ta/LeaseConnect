import { DualRangeSlider } from "@/components/ui/dual-range-slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"

const PriceRangeFilter = () => {

     
    const [per_day_values, per_day_setValues] = useState([10, 200]);
    const [per_week_values, per_week_setValues] = useState([100, 2000]);
    const [per_month_values, per_month_setValues] = useState([200, 4000]);
    const [pricePeriod, setPricePeriod] = useState("per_day"); 
  
    const handlePricePeriodChange = (e:string) => {
        console.log(e)
        setPricePeriod(e);
    }

    return (
        <div className='my-4'>
            <div className="flex gap-4 items-center ">
                Price Range Filter
                <div>
                    <Select 
                        defaultValue="per_day"
                        onValueChange={(e) => handlePricePeriodChange(e)}>
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
            {pricePeriod === "per_day" ? (
                <div>
                    <DualRangeSlider
                    label={(value) => <span>{value}</span>}
                    value={per_day_values}
                    onValueChange={per_day_setValues}
                    min={10}
                    max={200}
                    step={1}
                />
                </div>
            ) : pricePeriod === "per_week" ? (
                <div>
                    <DualRangeSlider
                    label={(value) => <span>{value}</span>}
                    value={per_week_values}
                    onValueChange={per_week_setValues}
                    min={100}
                    max={2000}
                    step={1}
                />
                </div>
            ) : (
                <div>
                    <DualRangeSlider
                    label={(value) => <span>{value}</span>}
                    value={per_month_values}
                    onValueChange={per_month_setValues}
                    min={200}
                    max={4000}
                    step={1}
                />
                </div>
            )}
            </div>
        </div>
        
  )
}

export default PriceRangeFilter