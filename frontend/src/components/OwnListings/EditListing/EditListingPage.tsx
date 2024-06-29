import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { BathroomInputArray, BedroomInputArray, ListingTypes, PROPERTY_ARRAY } from "@/components/ListingForm/ListingForm1"
import { zodResolver } from "@hookform/resolvers/zod"
import InputBox from "@/components/ListingForm/InputBox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import SelectDrop from "@/components/ListingForm/SelectDrop"
import RadioInput from "@/components/ListingForm/RadioInput"
import { AMENITIES, PREFERENCES, UTILITIES, UTIL_RADIO_ARR, optionsToStrings, stringsToOptions } from "@/components/ListingForm/ListingForm2"
import MultipleSelector from "@/components/ui/multiple-selector"
import { Label } from "@/components/ui/label"
import CustomPriceInput from "@/components/ListingForm/CustomPriceInput"
import { CURRENCY_ARR, TIME_PERIOD_ARR } from "@/components/ListingForm/ListingForm3"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Plus, Trash } from 'lucide-react';
import ListingImageInput from "@/components/ListingForm/ListingImageInput"
import { useState } from "react"
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/components/ListingForm/ListingForm4"
import { AlertCircle } from "lucide-react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const MAX_IMAGES = 8;
const MIN_IMAGES = 1;


const EditListingPageSchema = z.object({
  title: z.string().min(2, {
    message: "Title can't be empty.",
  }),
  propertyType : z
  .enum(["house", "apartment", "studio"], {
    required_error: "You need to select a property type.",
  }),
  bedroom : z
        .string(),
  bathroom : z
        .string(),
  streetAddress : z
        .string(),
  city : z.string(),
  state : z.string(),
  zipcode : z.string(),
  country : z.string(),
  utilities: z.array(z.string()).optional(),
  utilitiesIncludedInRent : z.string(),
  amenities : z.array(z.string()).optional(),
  preferences : z.array(z.string()).optional(),
  description : z
              .string()
              .max(500, {
                  message: "Bio must not be longer than 500 characters.",
              }),
  currency : z.enum(["usd", "inr"]),
  amount : z.string(),
  timePeriod : z.enum(["day", "week", "month"]),
  subleaseDuration: z.string(),
  image: z
    .array(z.instanceof(File).nullable())
    .default([])
    .refine((files) => files.filter((file): file is File => file !== null).length >= MIN_IMAGES, {
      message: `At least ${MIN_IMAGES} image is required.`,
    })
    .refine((files) => files.filter((file): file is File => file !== null).length <= MAX_IMAGES, {
      message: `Maximum ${MAX_IMAGES} images are allowed.`,
    })
    .refine((files) => files.filter((file): file is File => file !== null).every(file => file instanceof File), {
      message: "Each input must be a valid file.",
    })
    .refine((files) => files.filter((file): file is File => file !== null).every(file => file.size <= MAX_FILE_SIZE), {
      message: "Max image size is 5MB.",
    })
    .refine((files) => files.filter((file): file is File => file !== null).every(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    })
    .transform((files) => files.filter((file): file is File => file !== null && file !== undefined))
})

const EditListingPage = () => {


  const parseDateRange = (dateRangeString : string) => {
    const [from, to] = dateRangeString.split(' - ').map(date => new Date(date));
    return { from, to };
  };

  const defaultSubleaseDuration = "2024-06-18T04:00:00.000Z - 2024-06-27T04:00:00.000Z";
  const { from, to } = parseDateRange(defaultSubleaseDuration);

  const [listingImages, setListingImages] = useState<(File | null)[]>([null]);
  const [imgError, setImgError] = useState(false);
  const handleFileChange = (file: File | null, index: number) => {
    setImgError(false)
    setListingImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = file;
      if (!newImages.includes(null) && newImages.length < MAX_IMAGES) {
        newImages.push(null);
      }
      return newImages;
    });
  
    // Update the form state
    const currentImages = editListing.getValues('image');
    if (Array.isArray(currentImages)) {
      currentImages[index] = file;
      editListing.setValue('image', currentImages);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setListingImages(prevImages => {
      const newImages = prevImages.filter((_, i) => i !== index);
      if (!newImages.includes(null) && newImages.length < MAX_IMAGES) {
        newImages.push(null);
      }
      return newImages;
    });
  
    // Update the form state
    const currentImages = editListing.getValues('image');
    if (Array.isArray(currentImages)) {
      const updatedImages = currentImages.filter((_, i) => i !== index);
      editListing.setValue('image', updatedImages);
    }
  };

    const editListing = useForm<ListingTypes>({
      resolver : zodResolver(EditListingPageSchema),
      defaultValues : {
        title : "From backend",
        city : "From backend",
        state : "From backend",
        country : "From backend",
        description : "from backend",
        bathroom : "from backend",
        bedroom : "from backend",
        zipcode : "zipcode f Backend",
        utilities: ['water', 'internet'], // Default selected utilities
        amenities: ['parking', 'gym'],    // Default selected amenities
        preferences: ['no_smoking'],      // Default selected preferences
        currency : "usd",
        amount : "100",
        timePeriod : "week",
        subleaseDuration: defaultSubleaseDuration,
        propertyType:"house",
        streetAddress : "266 Central Avenue",
        utilitiesIncludedInRent : "true",
        image: [] as (File | null)[]
      }
    })

    const {handleSubmit, control} = editListing;

    const onSubmit = async(data) => {
      setImgError(false)
      console.log(data)
    }

    const handleError = () => {
      setImgError(false)
      listingImages.filter(val => val !==null).length === 0 ? setImgError(true) : setImgError(false) ;
    }

    return (
      <div className="flex flex-col min-h-[100dvh]">
        <header className="bg-primary text-primary-foreground py-4 px-6">
          <h1 className="text-2xl font-bold">123 Main St, Anytown USA</h1>
        </header>
        
        <main className="flex-1 grid gap-8 p-6 md:p-10 lg:p-12">
          
            <Form {...editListing}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <section>

                <h2 className="text-xl font-bold mb-4">Property Details</h2>

                  <InputBox
                  name="title"
                  formControl={control}
                  placeholder="from backend"
                  className="font-medium text-sm"
                  label="Title"
                  />

                  <InputBox
                  name="description"
                  formControl={control}
                  placeholder="from backend"
                  className="font-medium text-sm"
                  label="Edit Description"
                  inputType="textbox"
                  />

                  <SelectDrop
                    name="propertyType"
                    formControl={control}
                    placeholder="Select property type"
                    label="Property Type"
                    inputArray={PROPERTY_ARRAY}
                    defaultValue="house"
                  />

                  <div className="grid grid-cols-2 gap-16">
                    <SelectDrop
                    placeholder="from backend"
                    formControl={control}
                    name="bedroom"
                    inputArray={BedroomInputArray}
                    className=""
                    label="Bedrooms"
                    // defaultValue="from backend"
                    />

                    <SelectDrop
                    placeholder="from backend"
                    formControl={control}
                    name="bathroom"
                    inputArray={BathroomInputArray}
                    className=""
                    label="Bathrooms"
                    // defaultValue="from backend"
                    />
                  </div>




                  <div className="grid gap-2">
                    <h2 className="text-xl font-bold my-4">Address Details</h2>

                    <InputBox
                    placeholder="from backend"
                    label="Address 1"
                    id="streetAddress"
                    formControl={control}
                    name="streetAddress"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <InputBox
                      placeholder="from backend"
                      label="City"
                      id="city"
                      formControl={control}
                      name="city"
                      />

                      <InputBox
                      placeholder="from backend"
                      label="State"
                      id="state"
                      formControl={control}
                      name="state"
                      />

                      <InputBox
                      placeholder="from backend"
                      label="Zipcode"
                      id="zipcode"
                      formControl={control}
                      name="zipcode"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold my-4">Other Details</h2>

                    <RadioInput
                            name="utilitiesIncludedInRent"
                            formControl={control}
                            label='Are Utilities Included In The Rent'
                            inputArray={UTIL_RADIO_ARR}
                            placeholder='Please Select...'
                            defaultValue="true"
                        />

                    <div className="grid gap-2 my-4">
                      <Controller
                              name="utilities"
                              control={control}
                              render={({ field }) => (
                                  <MultipleSelector
                                      {...field}
                                      value={stringsToOptions(field.value, UTILITIES)}
                                      onChange={(newValue) => field.onChange(optionsToStrings(newValue))}
                                      defaultOptions={UTILITIES}
                                      placeholder="Edit utilities..."
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
                                    placeholder="Edit amenities..."
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
                                    placeholder="Edit preferences..."
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        No utilities found.
                                        </p>
                                    }
                                />
                                )}
                        />
                    </div>
                    

                    <div>
                      <h2 className="text-l font-bold my-4">Edit Price Details</h2>

                      <div className="flex items-center  gap-1">
                        <div className="h-10 flex items-center">
                          <SelectDrop
                          placeholder="Currency"
                          formControl={control}
                          name="currency"
                          inputArray={CURRENCY_ARR}
                          className="rounded-none rounded-l-lg h-8 p-1"
                          defaultValue='usd'
                          />
                        </div>

                        <div className="h-10 flex items-center  relative -top-1">
                          <InputBox
                          placeholder="from backend 100"
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
                          defaultValue="week"
                          className="rounded-none rounded-r-lg h-8 p-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-l font-bold my-4">Edit Sublease Duration</h2>
                      
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
                            initialDateFrom={from}
                            initialDateTo={to}
                          />
                        )}
                      />
                    </div>

                  </div>

              </section>

              <section>

              <h2 className="text-xl font-bold mb-4">Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listingImages.map((image, index) => (
                  <div key={index} className="relative group">
                    {image ? (
                      <>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Property Image ${index + 1}`}
                          className="w-full aspect-[3/2] rounded-md object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Trash className="w-5 h-5" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="relative group">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="w-full aspect-[3/2] rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 focus:bg-gray-300 flex items-center justify-center"
                          onClick={() => document.getElementById(`imageInput-${index}`)?.click()}
                        >
                          <Plus className="w-8 h-8" />
                        </Button>
                        <ListingImageInput
                          name={`image.${index}`}
                          label="ListingImages"
                          formControl={control}
                          placeholder="Upload Image"
                          type="file"
                          onChange={(file) => handleFileChange(file, index)}
                          id={`imageInput-${index}`}
                          props={{ field: { accept: "image/*" }, css: "hidden" }}
                          currentImage={image}
                        />
                      </div>
                    )}
                        {imgError && (
                          <div className="flex items-center gap-2 p-2 mt-2 text-sm font-medium text-red-800 rounded-lg bg-red-100">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <span>At least one image is required</span>
                          </div>
                        )}             
                  </div>
                ))}
                
              </div>
            </section>


              <div className="rounded-lg bg-primary text-primary-foreground py-4 px-6 flex justify-end gap-2">
                <Button variant="outline" className="text-black">Cancel</Button>
                <Button type="submit" onClick={handleError}>Save Changes</Button>
              </div>


              </form>

            </Form>


          
          
        </main>
        
      </div>
    )
}

export default EditListingPage