import { useState } from "react"
// import Input from "../Input"
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form
} from "../ui/form"
import RegisterButton from "./RegisterButton";
import Container from "../Container/container";
import { useDispatch } from "react-redux";
import { next } from "@/appstore/stepperSlice";
import { steps } from "@/lib/utils";
import { Button } from "../ui/button";
import InputImage from "../InputImage";
import ImageContainer from "../ui/ImageContainer";

// type InputVal = string | null;



const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


export const imageFormSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file !== null,
      "Please upload the image to proceed"
    )
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type || ""),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const RegisterForm2 = ({currentStep , isCompleted} : {
  currentStep : number,
  isCompleted : boolean
}) => {

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState< boolean >(false);

  const imageForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver : zodResolver(imageFormSchema),
    defaultValues: {
      image : undefined
    },
  });


  const onSubmit = async(data : z.infer<typeof imageFormSchema>) => {
    setIsSubmitting(true);
    // Api call to backend 
    // Need to print the data
    console.log("submitted")
    console.log(data);
    console.log(selectedImage);
    dispatch(next());
    // if(currentStep > steps.length){
    //   //step iscompleted true 
    //   //and if is completed is true then then we don't show the button
    // }
    setIsSubmitting(false);
  }

  const handleFileChange = (file : File | null) => {
    setSelectedImage(file);    
  }

  return (
    <>
      <Container >
          <div className="my-4">Upload Image</div>
        {/* <form>
          <Input label="First Name" onChange={() => {}} id="name" name="firstName" placeholder="Enter your first name" type="text"/>
        </form> */}

        {/* use switch here to show different form based on current Step */}
          <Form {...imageForm}>
            <form onSubmit = {imageForm.handleSubmit(onSubmit)} className="w-full flex flex-col items-center h-full">

              <InputImage 
              name="image" 
              label="Profile Image" 
              formControl={imageForm.control} 
              placeholder="Upload Image" 
              type="file" 
              onChange={handleFileChange}
              id="imageInput"
              props={{field : {accept : "image/*"}, css: "hidden"}}/>
              
              <label htmlFor="imageInput" className="w-full h-[70%] block" >
                <ImageContainer image={selectedImage}/>
              </label>
              
              <RegisterButton currentStep={currentStep} isCompleted={isCompleted}/>
              
          </form>
        </Form>
      </Container>
    </>
  )
}

export default RegisterForm2

