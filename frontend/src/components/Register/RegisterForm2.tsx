import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import RegisterButton from "./RegisterButton";
import Container from "../Container/container";
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
    .refine((file) => file !== null && file !== undefined, {
      message: "Please upload an image to proceed",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Max image size is 5MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
});

const RegisterForm2 = ({ currentStep }: { currentStep: number }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const imageForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof imageFormSchema>) => {
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
    setSelectedImage(file);
  };

  return (
    <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200 text-center">
          Upload Profile Image
        </h2>
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
                onRemove={() => setSelectedImage(null)}
                isProfilePicture={true}
            />
            </label>
            
            <div className="mt-6">
              <RegisterButton 
                currentStep={currentStep} 
                isSubmitting={isSubmitting} 
                className="w-full py-3 text-lg font-semibold transition-colors duration-200 bg-violet-600 hover:bg-violet-700 text-white"
              />
            </div>
          </form>
        </Form>
      </div>
  );
};

export default RegisterForm2;