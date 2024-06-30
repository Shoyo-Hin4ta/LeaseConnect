import React, { useState } from 'react'
import { z } from 'zod'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ListingTypes } from './ListingForm1';
import { Form } from '../ui/form';
import ListingFormButton from './ListingFormButton';
import RadioInput from './RadioInput';
import InputBox from './InputBox';
import { useDispatch } from 'react-redux';
import { next } from '@/appstore/stepperSlice';
import { toast } from '../ui/use-toast';


export const stringsToOptions = (strings: string[], options: Option[]): Option[] => {
    return strings.map(s => options.find(o => o.value === s) || { value: s, label: s });
}

// Helper function to convert Option[] to string[]
export const optionsToStrings = (options: Option[]): string[] => {
    return options.map(o => o.value);
}

export const UTIL_RADIO_ARR = [
    { value: "true", desc : "Yes"},
    { value: "false", desc : "No"},
]

export const UTILITIES: Option[] = [
    { label: 'Water', value: 'water' },
    { label: 'Electricity', value: 'electricity' },
    { label: 'Gas', value: 'gas' },
    { label: 'Internet', value: 'internet' },
    { label: 'Trash', value: 'trash' },
]
  
export const AMENITIES: Option[] = [
{ label: 'Parking', value: 'parking' },
{ label: 'Gym', value: 'gym' },
{ label: 'Pool', value: 'pool' },
{ label: 'In Unit Laundry', value: 'laundry' },
]

export const PREFERENCES: Option[] = [
{ label: 'No smoking', value: 'no_smoking' },
{ label: 'No drinking', value: 'no_drinking' },
{ label: 'No pets', value: 'no_pets' },
{ label: 'Students only', value: 'students_only' },
{ label: 'Working only', value: 'working_only' },
{ label: 'Vegetarian', value: 'vegetarian' },
{ label: 'Eggeterian', value: 'eggeterian'},
{ label: 'Girls Only', value: 'girls_only'},
{ label: 'Hygenine/Clean', value: 'cleanliness'}
]

const listingForm2Schema = z.object({
    utilities: z.array(z.string()).optional(),
    utilitiesIncludedInRent : z.string({
        required_error: "Please select one",
      }),
    amenities : z.array(z.string()).optional(),
    preferences : z.array(z.string()).optional(),
    description : z
                .string()
                .max(500, {
                    message: "Bio must not be longer than 500 characters.",
                }),
  })

const ListingForm2 = ({ currentStep }: {
  currentStep: number,
}) =>{

    const dispatch = useDispatch();


    const listingForm2 = useForm<ListingTypes>({
        resolver :zodResolver(listingForm2Schema),
        defaultValues: {
            utilities: [],
            amenities: [],
            preferences: [],
            description : ""
          },
      })

    const { handleSubmit, control } = listingForm2;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async(data) => {
    setIsSubmitting(true);
    console.log(data);
    dispatch(next());
    
    setIsSubmitting(false);
    toast({
      title: "Form submitted successfully",
      description: "Your information has been saved.",
      duration: 3000,
    });
  }
    
    // Helper function to convert string[] to Option[]
    

    return (
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200">Additional Details</h2>
          <Form {...listingForm2}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <RadioInput
                name="utilitiesIncludedInRent"
                formControl={control}
                label='Are Utilities Included In The Rent'
                inputArray={UTIL_RADIO_ARR}
                placeholder='Please Select...'
              />
              <Controller
                name="utilities"
                control={control}
                render={({field}) => (
                  <MultipleSelector
                    {...field}
                    value={stringsToOptions(field.value, UTILITIES)}
                    onChange={(newValue) => field.onChange(optionsToStrings(newValue))}
                    defaultOptions={UTILITIES}
                    placeholder="Select utilities..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        No utilities found.
                      </p>
                    }
                  />
                )}
              />
              <Controller
                name="amenities"
                control={control}
                render={({field}) => (
                  <MultipleSelector
                    {...field}
                    value={stringsToOptions(field.value, AMENITIES)}
                    onChange={(newValue) => field.onChange(optionsToStrings(newValue))}
                    defaultOptions={AMENITIES}
                    placeholder="Select amenities..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        No amenities found.
                      </p>
                    }
                  />
                )}
              />
              <Controller
                name="preferences"
                control={control}
                render={({field}) => (
                  <MultipleSelector
                    {...field}
                    value={stringsToOptions(field.value, PREFERENCES)}
                    onChange={(newValue) => field.onChange(optionsToStrings(newValue))}
                    defaultOptions={PREFERENCES}
                    placeholder="Select preferences..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        No preferences found.
                      </p>
                    }
                  />
                )}
              />
              <InputBox
                name="description"
                label="Listing Description"
                placeholder='You can enter anything you want to highlight the perks or something that was not mentioned. Max char is 500'
                formControl={control}
                inputType='textbox'
                className='h-32 text-left'
              />
              <ListingFormButton 
              currentStep={currentStep} 
              isSubmitting={isSubmitting}
              className="w-full py-3  text-lg font-semibold transition-colors duration-200 bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600"
            />
            </form>
          </Form>
        </div>
      );
}

export default ListingForm2