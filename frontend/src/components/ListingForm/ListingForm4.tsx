import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import ListingFormButton from "./ListingFormButton";
import ImageContainer from "../ui/ImageContainer";
import ListingImageInput from "./ListingImageInput";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { next, resetState, setIsComplete } from "@/appstore/stepperSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { ListingTypes } from "./ListingForm1";

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const listingForm4Schema = z.object({
  image: z
    .array(z.instanceof(File).nullable())
    .min(1, "At least one image is required.")
    .refine((files) => files.filter(Boolean).every(file => file instanceof File), {
      message: "Each input must be a valid file.",
    })
    .refine((files) => files.filter(Boolean).every(file => file.size <= MAX_FILE_SIZE), {
      message: "Max image size is 5MB.",
    })
    .refine((files) => files.filter(Boolean).every(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    }),
});

const ListingForm4 = ({ currentStep }: { currentStep: number }) => {
  const [imageFields, setImageFields] = useState([{ id: 1 }]);
  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([null]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showImageError, setShowImageError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listingForm4 = useForm<ListingTypes>({
    resolver: zodResolver(listingForm4Schema),
  });

  const { handleSubmit, control, setValue } = listingForm4;

  const handleFileChange = (file: File | null, index: number) => {
    const newImages = [...selectedImages];
    newImages[index] = file || newImages[index]; // Keep the previous image if no new file is selected
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

  const handleRemoveImage = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: ListingTypes) => {
    setIsSubmitting(true);
    setSubmitAttempted(true);

    if (selectedImages.every(img => img === null)) {
      setShowImageError(true);
      setIsSubmitting(false);
      return;
    }

    dispatch(next());
    dispatch(setIsComplete(true));
    console.log(data);
    navigate('/mylistings');

    dispatch(setIsComplete(false));
    dispatch(resetState());

    setSubmitAttempted(false);
    setIsSubmitting(false);
    
    toast({
      title: "Form submitted successfully",
      description: "Your information has been saved.",
      duration: 3000,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200">Add Images</h2>
      <Form {...listingForm4}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {imageFields.map((field, index) => (
              <div key={field.id}>
                <ListingImageInput
                  name={`image.${index}`}
                  label="Listing Images"
                  formControl={control}
                  placeholder="Upload Image"
                  type="file"
                  onChange={(file: File | null) => handleFileChange(file, index)}
                  id={`imageInput-${field.id}`}
                  props={{ field: { accept: "image/*" }, css: "hidden" }}
                  currentImage={selectedImages[index]}
                />
                <label htmlFor={`imageInput-${field.id}`} className="block w-full cursor-pointer">
                  <ImageContainer 
                    image={selectedImages[index]} 
                    onRemove={(event) => handleRemoveImage(index, event)}
                    width="w-full"
                    height="h-48 md:h-64"
                  />
                </label>
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={addImageField}
              disabled={imageFields.length >= 8 || selectedImages.some(img => img === null)}
              type="button"
              className="bg-violet-600 hover:bg-violet-700 text-white"
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
          {submitAttempted && selectedImages.every(img => img === null) && (
            <p className="text-red-500">Please upload at least one image.</p>
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