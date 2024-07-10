import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import InputBox from "./InputBox"
import SelectDrop from "./SelectDrop"
import RadioInput from "./RadioInput"
import { useEffect, useState } from "react"
import { initAutocomplete, loadGoogleMapsApi } from "@/lib/autofillListing"
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

const ListingForm1 = ({ currentStep }: {
  currentStep: number,
}) =>{



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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async(data) => {
    setIsSubmitting(true);
    console.log(data);

    const existingData = JSON.parse(localStorage.getItem('listingData') || '{}');
    const updatedData = { ...existingData, ...data };
    localStorage.setItem('listingData', JSON.stringify(updatedData));

    dispatch(next());
    
    setIsSubmitting(false);
  }


  // useEffect(() => {
  //   loadGoogleMapsApi("abc")
  //     .then(() => {
  //       window.initAutocomplete = () => initAutocomplete(setValue);
  //       window.initAutocomplete();
  //     })
  //     .catch((error) => {
  //       console.error('Error loading Google Maps API:', error);
  //       // Show an error message to the user
  //     });
  // }, [setValue]);
 

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200">Property Details</h2>
      <Form {...listingForm1}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RadioInput
              name="bedroom"
              formControl={control}
              label="Bedrooms"
              inputArray={BedroomInputArray}
              placeholder='Please Select...'
            />
            <RadioInput
              name="bathroom"
              formControl={control}
              label="Bathrooms"
              inputArray={BathroomInputArray}
              placeholder='Please Select...'
            />
          </div>
          <InputBox
            name="streetAddress"
            formControl={control}
            placeholder="Enter Street Address"
            label="Street Address"
            id="streetAddress"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default ListingForm1