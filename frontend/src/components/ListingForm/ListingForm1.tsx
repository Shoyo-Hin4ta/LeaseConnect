import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import InputBox from "./InputBox"
import SelectDrop from "./SelectDrop"
import RadioInput from "./RadioInput"
import { useEffect } from "react"
import { initAutocomplete } from "@/lib/autofillLisitng"
import ListingFormButton from "./ListingFormButton"
import { useDispatch } from "react-redux"
import { next } from "@/appstore/stepperSlice"


export const BedroomInputArray = [{
  value : "1",
  desc : "1",
}, {
  value : "2",
  desc : "2",
},{
  value : "3",
  desc : "3",
},{
  value : "4+",
  desc : "4+",
}]

export const BathroomInputArray = [
  { value: "1", desc : "1"},
  { value: "2", desc : "2"},
  { value: "3+", desc : "3+"},
  ]


  

export type ListingTypes = {
  title : string,
  propertyType : string,
  bedroom : string,
  bathroom : string,
  streetAddress : string,
  city : string,
  state : string,
  zipcode : string,
  country : string,
  amenities : string[],
  utilitiesIncludedInRent : string,
  utilities : string[],
  preferences : string[],
  currency : string,
  amount : string,
  timePeriod : string,
  subleaseDuration : string,
  image : (File | null)[],
  description : string,
}

const titleRegex = /^[a-zA-Z0-9\s,.'-]{2,100}$/; // Example regex for title
const streetAddressRegex = /^[a-zA-Z0-9\s,.'-]{5,100}$/; // Example regex for street address
const cityStateCountryRegex = /^[a-zA-Z\s-]{2,50}$/; // Example regex for city, state, country
const zipcodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/; // Example regex for US ZIP code

const listingForm1Schema = z.object({
  title: z
    .string()
    .min(2, { message: "Title can't be empty." })
    .max(100, { message: "Title can't exceed 100 characters." })
    .regex(titleRegex, { message: "Title contains invalid characters." })
    .transform((title) => title.trim()),

  propertyType: z.enum(["house", "apartment", "studio"], {
    required_error: "You need to select a property type.",
  }),

  bedroom: z
    .string(),

  bathroom: z
    .string(),

  streetAddress: z
    .string()
    .min(5, { message: "Street address must be at least 5 characters long." })
    .max(100, { message: "Street address can't exceed 100 characters." })
    .regex(streetAddressRegex, { message: "Street address contains invalid characters." })
    .transform((address) => address.trim()),

  city: z
    .string()
    .min(2, { message: "City is required." })
    .max(50, { message: "City name can't exceed 50 characters." })
    .regex(cityStateCountryRegex, { message: "City name contains invalid characters." })
    .transform((city) => city.trim()),

  state: z
    .string()
    .min(2, { message: "State is required." })
    .max(50, { message: "State name can't exceed 50 characters." })
    .regex(cityStateCountryRegex, { message: "State name contains invalid characters." })
    .transform((state) => state.trim()),

  zipcode: z
    .string()
    .min(5, { message: "Zip code is required." })
    .max(10, { message: "Zip code can't exceed 10 characters." })
    .regex(zipcodeRegex, { message: "Invalid zip code format." })
    .transform((zipcode) => zipcode.trim()),

  country: z
    .string()
    .min(2, { message: "Country is required." })
    .max(50, { message: "Country name can't exceed 50 characters." })
    .regex(cityStateCountryRegex, { message: "Country name contains invalid characters." })
    .transform((country) => country.trim()),
});

export const PROPERTY_ARRAY = [
  { value : "house", desc : "House" },
  { value : "studio", desc : "Studio" },
  { value : "apartment", desc : "Apartment" }
]

const ListingForm1 = () => {

  const dispatch = useDispatch();

  const listingForm1 = useForm<ListingTypes>({
    resolver :zodResolver(listingForm1Schema),
    defaultValues: {
      title : "",
      streetAddress : "",
      state:"",
      city:"",
      zipcode:"",
      country:"",
    },
  })

  const { handleSubmit, control, setValue } = listingForm1;

  const onSubmit = async(data) => {
    dispatch(next());
    console.log(data)
  }

  useEffect(() => {
    window.initAutocomplete = () => initAutocomplete(setValue);
    window.initAutocomplete();
  }, [setValue]);
 

  return (
      <div className="w-full flex flex-col justify-center items-center">
          <div className="border">
            Property Details
          </div>
          <div className="border w-full">
            <Form {...listingForm1}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
                <InputBox  
                  name="title"
                  formControl={control}
                  placeholder="What are you subleasing..."
                  label="Listing Title"
                />

                <SelectDrop
                  name="propertyType"
                  formControl={control}
                  placeholder="Select property type"
                  label="Property Type"
                  inputArray={PROPERTY_ARRAY}
                />

              <div className="flex justify-between">
                <RadioInput
                  name="bedroom"
                  formControl={control}
                  placeholder="Number of bedroom in the property"
                  label="Bedrooms"
                  inputArray={BedroomInputArray}
                />

                <RadioInput
                  name="bathroom"
                  formControl={control}
                  placeholder="Number of bathrooms in the property"
                  label="Bathrooms"
                  inputArray={BathroomInputArray}
                />
              </div>

              <div className="">
                <div className="mb-2">
                  <InputBox  
                    name="streetAddress"
                    formControl={control}
                    placeholder="Enter Street Address"
                    label="Street Address"
                    id="streetAddress"
                  />
                </div>
                
                <div className="grid gap-2 grid-cols-2">
                  <InputBox  
                    name="city"
                    formControl={control}
                    placeholder="Enter City"
                    label="City"
                    id="city"
                  />

                  <InputBox  
                    name="state"
                    formControl={control}
                    placeholder="Enter State"
                    label="State"
                    id="state"
                  />

                  <InputBox  
                    name="zipcode"
                    formControl={control}
                    placeholder="Enter Zipcode"
                    label="ZipCode"
                    id="zipcode"
                  />

                  <InputBox  
                    name="country"
                    formControl={control}
                    placeholder="Enter Country"
                    label="Country"
                    id="country"
                  />

                </div>
              </div>
              <ListingFormButton />
              </form>
            </Form>
          </div>

      </div>
    
  ) 
}

export default ListingForm1