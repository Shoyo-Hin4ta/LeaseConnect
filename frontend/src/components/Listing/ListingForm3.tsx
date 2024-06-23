import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { ListingTypes } from "./ListingForm1"
import { Form } from "../ui/form"
import SelectDrop from "./SelectDrop"
import InputBox from "./InputBox"
import { DateRangePicker } from "../ui/date-range-picker"
import ListingFormButton from "./ListingFormButton"

export const CURRENCY_ARR = [
  {value: "usd", desc : "USD"},
  {value: "inr", desc : "INR"},
]

export const TIME_PERIOD_ARR = [
  {value: "day", desc : "/ day"},
  {value: "week", desc : "/ week"},
  {value: "month", desc : "/ month"},
]



const listingForm3Schema = z.object({
  currency : z.enum(["usd", "inr"]),
  amount : z.string(),
  timePeriod : z.enum(["day", "week", "month"]),
  subleaseDuration: z.string()
})

const ListingForm3 = () => {


  const listingForm3 = useForm<ListingTypes>({
    resolver : zodResolver(listingForm3Schema),
    defaultValues : {
      amount : "",
      subleaseDuration: ""
    }
  })

  const {handleSubmit, control, setValue} =  listingForm3;

  const onSubmit = async(data) => {
    console.log(data)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
          <div className="my-7">
              Pricing 
          </div>
           <div className='w-full'>
                <Form {...listingForm3}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-2">
                      <div className="flex items-center justify-center gap-1">

                        <div className="h-10 flex items-center">
                          <SelectDrop
                          placeholder="Currency"
                          formControl={control}
                          name="currency"
                          inputArray={CURRENCY_ARR}
                          className="rounded-none rounded-l-lg h-8 p-1"
                          />
                        </div>

                        <div className="h-10 flex items-center  relative -top-1">
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

                      <div className="flex flex-col gap-2">
                        <div className="text-md">
                          Sublease Period
                        </div>

                        <Controller
                          control={control}
                          name="subleaseDuration"
                          render={({ field }) => (
                            <DateRangePicker
                              onUpdate={(values) => {
                                const fromDate = values.range.from.toISOString();
                                const toDate = values.range.to ? values.range.to.toISOString() : '';
                                field.onChange(`${fromDate} - ${toDate}`);
                              }}
                            />
                          )}
                        />

                      </div>
                      

                        
                      <ListingFormButton />

                    </form>
                </Form>

           </div>
    </div>
  )
}

export default ListingForm3