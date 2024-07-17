import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { ListingTypes } from "./ListingForm1"
import { Form } from "../ui/form"
import SelectDrop from "./SelectDrop"
import InputBox from "./InputBox"
import { DateRangePicker } from "../ui/date-range-picker"
import ListingFormButton from "./ListingFormButton"
import CustomPriceInput from "./CustomPriceInput"
import { next } from "@/appstore/stepperSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { toast } from "../ui/use-toast"

export const CURRENCY_ARR = [
  {value: "usd", desc : "USD"},
  {value: "inr", desc : "INR"},
]

export const TIME_PERIOD_ARR = [
  {value: "day", desc : "/ day"},
  {value: "week", desc : "/ week"},
  {value: "month", desc : "/ month"},
]


const currencyRegex = /^\d+(\.\d{1,2})?$/;

const listingForm3Schema = z.object({
  currency: z.enum(["usd", "inr"]),
  amount: z
    .string({
      required_error: "Amount is required"
    })
    .regex(currencyRegex, { message: "Not Valid amount" })
    .refine((value) => {
      const numberValue = parseFloat(value);
      return !isNaN(numberValue) && numberValue > 0;
    }, {
      message: "Amount must be a positive number.",
    }),
  timePeriod: z.enum(["day", "week", "month"]),
  subleaseDuration: z.string().min(1, "Sublease duration is required")
  .refine((value) => {
    const [from, to] = value.split(' - ');
    return from && to && new Date(from) < new Date(to);
  }, {
    message: "Please select a valid date range for sublease duration",
  })
})

const ListingForm3 = ({ currentStep }: {
  currentStep: number,
}) =>{

  const dispatch = useDispatch();


  const listingForm3 = useForm<ListingTypes>({
    resolver : zodResolver(listingForm3Schema),
    defaultValues : {
      amount : "",
      subleaseDuration: ""
    }
  })

  const {handleSubmit, control, setValue} =  listingForm3;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async(data) => {
    setIsSubmitting(true);

    const existingData = JSON.parse(localStorage.getItem('listingData') || '{}');
    const updatedData = { ...existingData, ...data };
    localStorage.setItem('listingData', JSON.stringify(updatedData));
    
    dispatch(next());
    
    setIsSubmitting(false);
    // toast({
    //   title: "Form submitted successfully",
    //   description: "Your information has been saved.",
    //   duration: 3000,
    // });
  }

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200 ">Pricing</h2>
      <Form {...listingForm3}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <CustomPriceInput control={control} />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-violet-700 dark:text-violet-300">Sublease Period</label>
            <Controller
  control={control}
  name="subleaseDuration"
  render={({ field, fieldState: { error } }) => (
    <>
      <DateRangePicker
        onUpdate={(values) => {
          if (values.range.from && values.range.to) {
            const fromDate = values.range.from.toLocaleDateString();
            const toDate = values.range.to.toLocaleDateString();
            field.onChange(`${fromDate} - ${toDate}`);
          } else {
            field.onChange('');
          }
        }}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </>
  )}
/>
          </div>
          <ListingFormButton 
            currentStep={currentStep} 
            isSubmitting={isSubmitting}
            showPrevButton={true}
            className="bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600"
          />
        </form>
      </Form>
    </div>
  );
}

export default ListingForm3