import React from 'react'
import SelectDrop from './SelectDrop'
import InputBox from './InputBox'
import { Control } from 'react-hook-form'
import { ListingTypes } from './ListingForm1'
import { CURRENCY_ARR, TIME_PERIOD_ARR } from './ListingForm3'

const CustomPriceInput = ({control} : {
    control : Control<ListingTypes>,
}) => {
  return (
    <div className="flex items-center justify-start gap-1 ">
                        <div className="h-10 flex items-center">
                          <SelectDrop
                          placeholder="Currency"
                          formControl={control}
                          name="currency"
                          inputArray={CURRENCY_ARR}
                          className="rounded-none rounded-l-lg h-8 p-1"
                          defaultValue=''
                          />
                        </div>

                        <div className="h-10 flex items-center  relative">
                          <InputBox
                          placeholder="Enter Amount"
                          formControl={control}
                          name="amount"
                          className="rounded-none h-8 p-1 top text-center"
                          />
                        </div>
                        
                        <div className="h-10 flex items-center">
                          <SelectDrop
                          placeholder="Duration"
                          formControl={control}
                          name="timePeriod"
                          inputArray={TIME_PERIOD_ARR}
                          className="rounded-none rounded-r-lg h-8 p-1"
                          />
                        </div>
                      </div>
  )
}

export default CustomPriceInput