import React from 'react'
import { z } from 'zod'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ListingTypes } from './ListingForm1';
import { Form } from '../ui/form';
import ListingFormButton from './ListingFormButton';

const UTILITIES: Option[] = [
    { label: 'Water', value: 'water' },
    { label: 'Electricity', value: 'electricity' },
    { label: 'Gas', value: 'gas' },
    { label: 'Internet', value: 'internet' },
    { label: 'Trash', value: 'trash' },
]
  
const AMENITIES: Option[] = [
{ label: 'Parking', value: 'parking' },
{ label: 'Gym', value: 'gym' },
{ label: 'Pool', value: 'pool' },
{ label: 'In Unit Laundry', value: 'laundry' },
]

const PREFERENCES: Option[] = [
{ label: 'No smoking', value: 'no_smoking' },
{ label: 'No drinking', value: 'no_drinking' },
{ label: 'No pets', value: 'no_pets' },
{ label: 'Students only', value: 'students_only' },
{ label: 'Vegetarian', value: 'vegetarian' },
{ label: 'Eggeterian', value: 'eggeterian'},
{ label: 'Girls Only', value: 'girls_only'},
{ label: 'Hygenine/Clean', value: 'cleanliness'}
]

const listingForm2Schema = z.object({
    utilities: z.array(z.string()).optional(),
    utilitiesIncudedInRent : z.string().optional(),
    amenities : z.array(z.string()).optional(),
    preferences : z.array(z.string()).optional()
  })

const ListingForm2 = () => {

    const listingForm2 = useForm<ListingTypes>({
        resolver :zodResolver(listingForm2Schema),
        defaultValues: {
            utilities: [],
            utilitiesIncludedInRent: '',
            amenities: [],
            preferences: []
          },
      })

    const { handleSubmit, control } = listingForm2;

    const onSubmit = async(data) => {
        console.log(data)
    }
    // Helper function to convert string[] to Option[]
    const stringsToOptions = (strings: string[], options: Option[]): Option[] => {
        return strings.map(s => options.find(o => o.value === s) || { value: s, label: s });
    }

    // Helper function to convert Option[] to string[]
    const optionsToStrings = (options: Option[]): string[] => {
        return options.map(o => o.value);
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div>
                Additional Details
            </div>
           <div className='w-full'>
                <Form {...listingForm2}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
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
                                        No amentites found.
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
                                        No utilities found.
                                        </p>
                                    }
                                />
                                )}
                        />

                        
                        <ListingFormButton />

                    </form>
                </Form>

           </div>
        </div>
    )
}

export default ListingForm2