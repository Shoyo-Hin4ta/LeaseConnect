import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { BathroomInputArray, BedroomInputArray, ListingTypes, PROPERTY_ARRAY } from "@/components/ListingForm/ListingForm1";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "@/components/ListingForm/InputBox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import SelectDrop from "@/components/ListingForm/SelectDrop";
import RadioInput from "@/components/ListingForm/RadioInput";
import { AMENITIES, PREFERENCES, UTILITIES, UTIL_RADIO_ARR, optionsToStrings, stringsToOptions } from "@/components/ListingForm/ListingForm2";
import MultipleSelector from "@/components/ui/multiple-selector";
import { CURRENCY_ARR, TIME_PERIOD_ARR } from "@/components/ListingForm/ListingForm3";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Plus, Trash } from 'lucide-react';
import ListingImageInput from "../../OwnListings/ListingImageInput";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/components/ListingForm/ListingForm4";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import useGetIndividualListing from "@/hooks/useGetIndividualListing";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { EDIT_LISTING_QUERY } from "@/graphql/mutations";
import { setupAddressAutofill } from "./adressAutofill";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";


const MAX_IMAGES = 8;
const titleRegex = /^[a-zA-Z0-9\s.,!?'-]+$/;
const streetAddressRegex = /^[a-zA-Z0-9\s.,#'-]+$/;
const cityStateCountryRegex = /^[a-zA-Z\s'-]+$/;
const zipcodeRegex = /^\d{5}(-\d{4})?$/;
const currencyRegex = /^\d+(\.\d{1,2})?$/;

const EditListingPageSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title can't be empty." })
    .max(100, { message: "Title can't exceed 100 characters." })
    .regex(titleRegex, { message: "Title contains invalid characters." })
    .transform((title) => title.trim()),

  propertyType: z.enum(["house", "apartment", "studio"], {
    required_error: "You need to select a property type.",
  }),

  bedroom: z.string(),

  bathroom: z.string(),

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

  utilities: z.array(z.string()).optional(),
  utilitiesIncludedInRent: z.string({
    required_error: "Please select one",
  }),
  amenities: z.array(z.string()).optional(),
  preferences: z.array(z.string()).optional(),
  description: z
    .string()
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),

  currency: z.enum(["usd", "inr"], {
    required_error: "Currency is required"
  }),
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
  timePeriod: z.enum(["day", "week", "month"], {
    required_error: "Time period is required"
  }),
  subleaseDuration: z.string(),
  image: z.array(
    z.union([
      z.instanceof(File),
      z.string().url(),
      z.null()
    ])
  )
    .default([])
    .transform(files => files.filter((file): file is File | string => file !== null))
});

const EditListingPage: React.FC = () => {
  const { listingID } = useParams<{ listingID: string }>();
  const { listingData, loading, error } = useGetIndividualListing(listingID || '');
  const [listingImages, setListingImages] = useState<(File | string | null)[]>([null]);
  const [imgError, setImgError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [updateListing] = useMutation(EDIT_LISTING_QUERY);

  console.log(listingData);

  const editListing = useForm<ListingTypes>({
    resolver: zodResolver(EditListingPageSchema),
    defaultValues: {
      title: "",
      city: "",
      state: "",
      country: "",
      description: "",
      bathroom: "",
      bedroom: "",
      zipcode: "",
      utilities: [],
      amenities: [],
      preferences: [],
      currency: "usd",
      amount: "",
      timePeriod: "week",
      subleaseDuration: undefined,
      propertyType: "house",
      streetAddress: "",
      utilitiesIncludedInRent: "true",
      image: []
    }
  });

  useGoogleMapsApi(editListing.setValue, 'streetAddress');

  useEffect(() => {
    if (listingData) {
      const initialImages = [...listingData.images];
      while (initialImages.length < MAX_IMAGES) {
        initialImages.push(null);
      }
      const fromDate = new Date(listingData.subleaseDuration.from);
      const toDate = new Date(listingData.subleaseDuration.to);
      editListing.reset({
        title: listingData.title,
        city: listingData.location.city,
        state: listingData.location.state,
        country: listingData.location.country,
        description: listingData.description,
        bathroom: listingData.bathroom,
        bedroom: listingData.bedroom,
        zipcode: listingData.location.zipcode,
        utilities: listingData.utilities,
        amenities: listingData.amenities,
        preferences: listingData.preferences,
        currency: listingData.currency,
        amount: listingData.amount.toString(),
        timePeriod: listingData.timePeriod,
        subleaseDuration: `${fromDate.toISOString()} - ${toDate.toISOString()}`,
        propertyType: listingData.propertyType,
        streetAddress: listingData.location.streetAddress,
        utilitiesIncludedInRent: listingData.utilitiesIncludedInRent.toString(),
        image: initialImages
      });
      setListingImages(initialImages);
      }
  }, [listingData]);

  const handleFileChange = (file: File | null, index: number) => {
    setImgError(false);
    setListingImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  
    const currentImages = editListing.getValues('image');
    if (Array.isArray(currentImages)) {
      currentImages[index] = file;
      editListing.setValue('image', currentImages, { shouldValidate: true });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setListingImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
  
    const currentImages = editListing.getValues('image');
    if (Array.isArray(currentImages)) {
      currentImages[index] = null;
      editListing.setValue('image', currentImages, { shouldValidate: true });
    }
  };

  const { handleSubmit, control } = editListing;

  const onSubmit = async (data: ListingTypes) => {
    setIsSubmitting(true);
    setImgError(false); // Reset the image error state
  
    console.log("Form submitted", data);
  
    // Check if there are any non-null images
    const validImages = listingImages.filter(img => img !== null);
    if (validImages.length === 0) {
      setImgError(true);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "At least one image is required.",
        duration: 2000,
        variant: "destructive",
      });
      return; // Prevent further processing
    }
  
    // Validate image sizes and types
    const invalidImages = validImages.filter((img): img is File => 
      img instanceof File && (img.size > MAX_FILE_SIZE || !ACCEPTED_IMAGE_MIME_TYPES.includes(img.type))
    );
  
    if (invalidImages.length > 0) {
      setImgError(true);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Some images are invalid. Please check size and format.",
        duration: 2000,
        variant: "destructive",
      });
      return; // Prevent further processing
    }
  
    try {
      const { image, subleaseDuration, ...restData } = data;
      const [fromStr, toStr] = subleaseDuration.split(' - ');
      
      const existingImages: string[] = [];
      const newImages: (File | { lastModified: number; name: string; size: number; type: string; data: string | ArrayBuffer | null })[] = [];
  
      await Promise.all(validImages.map(async (image) => {
        if (typeof image === 'string') {
          existingImages.push(image);
        } else if (image instanceof File) {
          const processedImage = await new Promise<{ lastModified: number; name: string; size: number; type: string; data: string | ArrayBuffer | null }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                lastModified: image.lastModified,
                name: image.name,
                size: image.size,
                type: image.type,
                data: event?.target?.result || null
              });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(image);
          });
          newImages.push(processedImage);
        }
      }));
  
      const formattedData = {
        ...restData,
        subleaseDuration: {
          from: new Date(fromStr),
          to: new Date(toStr)
        },
      };
    
        const { data: responseData } = await updateListing({
          variables: {
            listingId: listingID,
            createdBy: listingData.createdBy.id,
            listingDetails : formattedData,
            imagesUrl : existingImages,
            newImages : newImages
          },
        });
        console.log("Response:", responseData);
  
      toast({
        title: "Listing Updated successfully",
        description: "Your listing has been saved.",
        duration: 2000,
      });
  
      setIsSubmitting(false);
      navigate('/browse');
  
    } catch (error) {
      console.error("Error updating listing:", error);
      toast({
        title: "Error updating listing",
        description: "Please try again later.",
        duration: 2000,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-violet-800 dark:text-violet-200 mb-6">Edit Listing</h1>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <Form {...editListing}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <section className="space-y-6">
                  <h2 className="text-xl font-bold text-violet-800 dark:text-violet-200">Property Details</h2>
                  
                  <InputBox
                    name="title"
                    formControl={control}
                    placeholder="Property Title"
                    label="Title"
                  />

                  <InputBox
                    name="description"
                    formControl={control}
                    placeholder="Property Description"
                    label="Description"
                    inputType="textbox"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectDrop
                      name="propertyType"
                      formControl={control}
                      placeholder="Select property type"
                      label="Property Type"
                      inputArray={PROPERTY_ARRAY}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <SelectDrop
                        placeholder="Bedrooms"
                        formControl={control}
                        name="bedroom"
                        inputArray={BedroomInputArray}
                        label="Bedrooms"
                      />

                      <SelectDrop
                        placeholder="Bathrooms"
                        formControl={control}
                        name="bathroom"
                        inputArray={BathroomInputArray}
                        label="Bathrooms"
                      />
                    </div>
                  </div>
                </section>

                <section className="pt-6 space-y-6">
                  <h2 className="text-xl font-bold text-violet-800 dark:text-violet-200">Address Details</h2>
                  
                  <InputBox
                    placeholder="Street Address"
                    label="Address"
                    id="streetAddress"
                    formControl={control}
                    name="streetAddress"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputBox
                      placeholder="City"
                      label="City"
                      id="city"
                      formControl={control}
                      name="city"
                    />

                    <InputBox
                      placeholder="State"
                      label="State"
                      id="state"
                      formControl={control}
                      name="state"
                    />

                    <InputBox
                      placeholder="Zipcode"
                      label="Zipcode"
                      id="zipcode"
                      formControl={control}
                      name="zipcode"
                    />
                  </div>
                </section>

                <section className="pt-6 space-y-6">
                  <h2 className="text-xl font-bold text-violet-800 dark:text-violet-200">Other Details</h2>

                  <RadioInput
                    name="utilitiesIncludedInRent"
                    formControl={control}
                    label='Are Utilities Included In The Rent'
                    inputArray={UTIL_RADIO_ARR}
                  />

                  <div className="space-y-4">
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
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
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
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
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
                          placeholder="Edit preferences..."
                          emptyIndicator={
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                              No preferences found.
                            </p>
                          }
                        />
                      )}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-violet-700 dark:text-violet-300 mb-4">Edit Price Details</h3>

                    <div className="flex items-stretch w-full">
                      <div className="w-1/4">
                        <SelectDrop
                          placeholder="Currency"
                          formControl={control}
                          name="currency"
                          inputArray={CURRENCY_ARR}
                          className="rounded-l-md border-r"
                        />
                      </div>

                      <div className="flex-grow">
                        <InputBox
                          placeholder="Amount"
                          formControl={control}
                          name="amount"
                          className="rounded-none border-x-0 text-center"
                        />
                      </div>
                      
                      <div className="w-1/4">
                        <SelectDrop
                          placeholder="Per"
                          formControl={control}
                          name="timePeriod"
                          inputArray={TIME_PERIOD_ARR}
                          className="rounded-r-md border-l"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-violet-700 dark:text-violet-300">Sublease Duration</h3>
                    <Controller
                      control={control}
                      name="subleaseDuration"
                      render={({ field }) => {
                        const [fromStr, toStr] = field.value ? field.value.split(' - ') : [null, null];
                        const from = fromStr ? new Date(fromStr) : new Date();
                        const to = toStr ? new Date(toStr) : new Date();
            

                        return (
                          <DateRangePicker
                            initialDateFrom={from}
                            initialDateTo={to}
                            onUpdate={({ range }) => {
                              const newFromDate = range.from.toISOString();
                              const newToDate = range.to ? range.to.toISOString() : range.from.toISOString();
                              field.onChange(`${newFromDate} - ${newToDate}`);
                            }}
                            value={{ from, to }}
                          />
                        );
                      }}
                    />
                  </div>

                </section>

                <section className="pt-6 space-y-6">
                  <h2 className="text-xl font-bold text-violet-800 dark:text-violet-200">Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        {image ? (
                          <>
                            <img
                              src={image instanceof File ? URL.createObjectURL(image) : image}
                              alt={`Property Image ${index + 1}`}
                              className="w-full aspect-[3/2] rounded-md object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                              type="button"
                              variant="outline"
                              className="w-full aspect-[3/2] rounded-md bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 dark:focus:ring-violet-400"
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
                      </div>
                    ))}
                  </div>
                  {imgError && (
                    <div className="flex items-center gap-2 p-2 mt-2 text-sm font-medium text-red-800 rounded-lg bg-red-100 dark:bg-red-900 dark:text-red-200">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      <span>At least one image is required</span>
                    </div>
                  )}
                </section>

                <div className="pt-5">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditListingPage;