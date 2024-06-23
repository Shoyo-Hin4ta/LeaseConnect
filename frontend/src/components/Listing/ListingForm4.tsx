import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { ListingTypes } from "./ListingForm1"
import { Form } from "../ui/form"
import SelectDrop from "./SelectDrop"
import InputBox from "./InputBox"
import { DateRangePicker } from "../ui/date-range-picker"
import ListingFormButton from "./ListingFormButton"
import ImageContainer from "../ui/ImageContainer"
import { useState } from "react"
import InputImage from "../InputImage"


const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];



export const lisitngForm4Schema = z.object({
    image: z
      .any()
      .array()
      .nonempty()
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



const ListingForm4 = () => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleFileChange = (file : File | null) => {
    setSelectedImage(file);    
    }

  const listingForm4 = useForm<ListingTypes>({
    resolver : zodResolver(lisitngForm4Schema),

  })

  const {handleSubmit, control, setValue} =  listingForm4;

  const onSubmit = async(data) => {
    console.log(data)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
    <div className="my-7">
        Pricing 
    </div>
     <div className='w-full'>
          <Form {...listingForm4}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-2">
                <div className="flex items-center justify-center">


                    <InputImage
                    name="image" 
                    label="Profile Image" 
                    formControl={control} 
                    placeholder="Upload Image" 
                    type="file" 
                    onChange={handleFileChange}
                    id="imageInput"
                    props={{field : {accept : "image/*"}, css: "hidden"}}/>
                    
                    <label htmlFor="imageInput" className="w-full h-[70%] block" >
                        <ImageContainer image={selectedImage}/>
                    </label>
                  
                </div>
                
                
                  
                <ListingFormButton />

              </form>
          </Form>

     </div>
  </div>
  )
}

export default ListingForm4