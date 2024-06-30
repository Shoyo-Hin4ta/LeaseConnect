import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ListingTypes } from "./ListingForm1";
import { Form } from "../ui/form";
import ListingFormButton from "./ListingFormButton";
import ImageContainer from "../ui/ImageContainer";
import { useState } from "react";
import ListingImageInput from "./ListingImageInput";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { next, resetState, setIsComplete } from "@/appstore/stepperSlice";
import { useNavigate } from "react-router-dom";

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const listingForm4Schema = z.object({
  image: z
    .array(z.any()) // Start with a general array to handle empty cases
    .default([]) // Initialize the array to avoid null issues
    .refine((files) => files.length > 0, {
      message: "At least one image is required.",
    }) // Ensure there is at least one file
    .refine((files) => files.filter(Boolean).every(file => file instanceof File), {
      message: "Each input must be a valid file.",
    }) // Ensure all files are of type File
    .refine((files) => files.filter(Boolean).every(file => file.size <= MAX_FILE_SIZE), {
      message: "Max image size is 5MB.",
    }) // Ensure all files are within the size limit
    .refine((files) => files.filter(Boolean).every(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    }) // Ensure all files are of an accepted MIME type
    .transform((files) => files.filter(file => file !== null)) // Remove null values
});

const ListingForm4 = () => {
  const [imageFields, setImageFields] = useState([{ id: 1 }]);
  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([null]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showImageError, setShowImageError] = useState(false);

  const handleFileChange = (file: File | null, index: number) => {
    const newImages = [...selectedImages];
    newImages[index] = file;
    setSelectedImages(newImages);
    setValue('image', newImages);
    setShowImageError(false);
  };

  const addImageField = () => {
    if (selectedImages.some(img => img === null)) {
      setShowImageError(true);
    } else if (imageFields.length < 8) {
      const newId = Math.max(...imageFields.map(field => field.id)) + 1;
      setImageFields([...imageFields, { id: newId }]);
      setSelectedImages([...selectedImages, null]);
      setValue('image', [...selectedImages, null]);
      setShowImageError(false);
    }
  };

  const listingForm4 = useForm<ListingTypes>({
    resolver: zodResolver(listingForm4Schema),
  });

  const handleRemoveImage = (index: number) => {
    setShowImageError(false);
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newImageFields = imageFields.filter((_, i) => i !== index);

    if (newImages.length === 0) {
      newImages.push(null);
      newImageFields.push({ id: 1 });
    }

    setSelectedImages(newImages);
    setImageFields(newImageFields);
    setValue('image', newImages);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, formState: { errors } } = listingForm4;

  const onSubmit = async (data: ListingTypes) => {
    setSubmitAttempted(true);

    dispatch(next());
    dispatch(setIsComplete(true));
    console.log(data);
    navigate('/mylistings');
    dispatch(setIsComplete(false));
    dispatch(resetState());
    setSubmitAttempted(false);
  }

  const hasValidImage = selectedImages.some(img => img !== null);
  const allExistingFieldsFilled = selectedImages.every(img => img !== null);

  console.log(selectedImages);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="my-7">
        Add Images
      </div>
      <div className='w-full border border-red-600'>
        <Form {...listingForm4}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-2">
            <div>
              {imageFields.map((field, index) => (
                <div key={field.id} className="my-2">
                  
                  <ListingImageInput
                    name={`image.${index}`}
                    label="ListingImages"
                    formControl={control}
                    placeholder="Upload Image"
                    type="file"
                    onChange={(file: File | null) => handleFileChange(file, index)}
                    id={`imageInput-${field.id}`}
                    props={{ field: { accept: "image/*" }, css: "hidden" }}
                  />

                  <label htmlFor={`imageInput-${field.id}`} className="w-full border-red-500">
                    <ImageContainer
                      key={field.id}
                      image={selectedImages[index]}
                      onRemove={() => handleRemoveImage(index)}
                    />
                  </label>
                </div>
              ))}
              <div className="my-2">
                <Button
                  onClick={addImageField}
                  disabled={imageFields.length >= 8 || selectedImages.some(img => img === null)}
                  type="button"
                >
                  Add More Image
                </Button>
                {imageFields.length >= 8 && (
                  <p className="text-red-500 mt-2">Maximum number of images reached.</p>
                )}
                {showImageError && (
                  <p className="text-red-500 mt-2">Please fill all existing image containers before adding a new one.</p>
                )}
              </div>
            </div>

            {submitAttempted && !hasValidImage && (
              <p className="text-red-500">Please upload at least one image.</p>
            )}

            <ListingFormButton />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ListingForm4;