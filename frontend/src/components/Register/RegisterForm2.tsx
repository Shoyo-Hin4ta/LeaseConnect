import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import RegisterButton from "./RegisterButton";
import { useDispatch } from "react-redux";
import { next } from "@/appstore/stepperSlice";
import InputImage from "../InputImage";
import ImageContainer from "../ui/ImageContainer";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageFormSchema = z.object({
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, {
      message: "Profile image is required",
    })
    .refine((file) => file === null || file.size <= MAX_FILE_SIZE, {
      message: `Max image size is 5MB.`,
    })
    .refine((file) => file === null || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
});

const RegisterForm2 = ({ currentStep }: { currentStep: number }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const imageForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      image: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof imageFormSchema>) => {
    if (!selectedImage) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    console.log("submitted");
    console.log(data);
    console.log(selectedImage);
    dispatch(next());
    setIsSubmitting(false);
    toast({
      title: "Image uploaded successfully",
      description: "Your profile image has been updated.",
      duration: 3000,
    });
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedImage(file);
      imageForm.setValue("image", file);
      setShowError(false);
    }
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedImage(null);
    imageForm.setValue("image", null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...imageForm}>
        <form onSubmit={imageForm.handleSubmit(onSubmit)} className="space-y-6">
          <InputImage
            name="image"
            label="Profile Image"
            formControl={imageForm.control}
            placeholder="Upload Image"
            type="file"
            onChange={handleFileChange}
            id="imageInput"
            props={{ field: { accept: "image/*" }, css: "hidden" }}
          />
          
          <label htmlFor="imageInput" className="block cursor-pointer transition-transform hover:scale-105">
            <ImageContainer 
              image={selectedImage} 
              onRemove={handleRemove}
              isProfilePicture={true}
            />
          </label>
          
          {showError && !selectedImage && (
            <p className="text-red-500 text-sm text-center mt-2">
              Profile image is required
            </p>
          )}
          
          <RegisterButton 
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

export default RegisterForm2;

