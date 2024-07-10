import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import ListingFormButton from "./ListingFormButton";
import ImageContainer from "../ui/ImageContainer";
import ListingImageInput from "./ListingImageInput";
import { useDispatch } from "react-redux";
import { next, resetState, setIsComplete } from "@/appstore/stepperSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { ListingTypes } from "./ListingForm1";
import { gql, useMutation } from '@apollo/client';

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const LISTING_DETAILS_MUTATION = gql`
  mutation SignUp($listingDetails: ListingFormInput!, $listingImages: [Upload]!) {
    createListing(listingDetails: $listingDetails, listingImages: $listingImages){
    id
    title
    propertyType
    bedroom
    bathroom
    location {
      streetAddress
      city
      state
      zipcode
      country
    }
    utilitiesIncludedInRent
    utilities
    amenities
    preferences
    description
    currency
    amount
    timePeriod
    dailyRate
    subleaseDuration {
      from
      to
    }
    numberOfDays
    images
    createdAt
    updatedAt
  }
}
`;

const listingForm4Schema = z.object({
  image: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required.")
    .max(8, "Maximum 8 images allowed.")
    .refine((files) => files.every(file => file.size <= MAX_FILE_SIZE), {
      message: "Max image size is 5MB.",
    })
    .refine((files) => files.every(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    }),
});

const ListingForm4 = ({ currentStep }: { currentStep: number }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [showImageError, setShowImageError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createListing, { loading, error }] = useMutation(LISTING_DETAILS_MUTATION);


  const listingForm4 = useForm<ListingTypes>({
    resolver: zodResolver(listingForm4Schema),
  });

  const { handleSubmit, control, setValue } = listingForm4;

  const handleFileChange = (files: File[]) => {
    const newImages = [...selectedImages, ...files].slice(0, 8);
    setSelectedImages(newImages);
    setValue('image', newImages);
    setShowImageError(false);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setValue('image', newImages);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: ListingTypes) => {
    setIsSubmitting(true);

    if (selectedImages.length === 0) {
      setShowImageError(true);
      setIsSubmitting(false);
      return;
    }

    console.log(data);

    try{
      const allData = JSON.parse(localStorage.getItem('listingData') || '{}');

      // Combine all data
      const combinedData  = {
        ...allData,
      };

      const preparedImages = await Promise.all(selectedImages.map(async (image) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              lastModified: image.lastModified,
              name: image.name,
              size: image.size,
              type: image.type,
              data: event?.target?.result
            });
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(image);
        });
      }));
      
      const { data: responseData } = await createListing({
        variables: {
          listingDetails: combinedData,
          listingImages: preparedImages,
        },
      });

      console.log("Response:", responseData);

      //send all the combined data to the backend
      localStorage.removeItem('listingData');

      toast({
        title: "Listing Added successfully",
        description: "Your listing has been saved.",
        duration: 2000,
      });

      dispatch(next());
      dispatch(setIsComplete(true));
      setIsSubmitting(false);

      navigate('/browse');

    }catch (error) {
      console.error('Error submitting listing:', error);
      toast({
        title: "Error submitting listing",
        description: "Please try again later.",
        duration: 2000,
        variant: "destructive",
      });
    } 

    dispatch(setIsComplete(false));
    dispatch(resetState());
    
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200">Add Images</h2>
      <Form {...listingForm4}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ListingImageInput
            name="image"
            label="Listing Images"
            formControl={control}
            placeholder="Upload Images"
            type="file"
            onChange={handleFileChange}
            id="imageInput"
            props={{ field: { accept: "image/*" }, css: "hidden" }}
            currentImages={selectedImages}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedImages.map((image, index) => (
              <ImageContainer
                key={index}
                image={image}
                onRemove={() => handleRemoveImage(index)}
                width="w-full"
                height="h-48"
              />
            ))}
          </div>
          {selectedImages.length < 8 && (
            <label htmlFor="imageInput" className="block w-full cursor-pointer">
              <ImageContainer 
                width="w-full"
                height="h-48"
              />
            </label>
          )}
          {selectedImages.length >= 8 && (
            <p className="text-red-500 mt-2">Maximum number of images reached.</p>
          )}
          {showImageError && (
            <p className="text-red-500 mt-2">Please upload at least one image.</p>
          )}
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
};

export default ListingForm4;