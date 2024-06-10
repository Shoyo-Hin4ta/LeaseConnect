import { useState } from "react"
// import Input from "../Input"
import { useToast } from "../ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form
} from "../ui/form"
import InputBox from "../InputBox";
import RegisterButton from "./RegisterButton";
import Container from "../Container/container";
import { useDispatch } from "react-redux";
import { next } from "@/appstore/stepperSlice";
import { steps } from "@/lib/utils";
import { Button } from "../ui/button";

// type InputVal = string | null;

export type Inputs = {
  email: string,
  name:string,
  password:string,
  age:string,
  image: string
}


const formSchema = z.object({
  name : z.string().min(2, {
    message : "Username must be at least 2 characters."
  }),
  email : z.string(),
  password : z.string().min(8, {
    message : 'Password must be 8 characters long'
  }),
  age : z.string()
        .refine((age) => !isNaN(parseInt(age)), {
          message: "Age is required",
        })
        .transform((age) => Number(age) ),
  image : z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
        
  // mobileNumber : z.string().regex(
  //   phoneRegex, 'Please enter a valid number'
  // ),
  // bio : z.string().max(200, {
  //   message : "Bio cannot be more than 200 characters"
  // }), 
})

const RegisterForm = ({currentStep , isCompleted} : {
  currentStep : number,
  isCompleted : boolean
}) => {

  const dispatch = useDispatch();
  const { toast } = useToast();

  // const [name, setName] = useState<InputVal>("");
  // const [email, setEmail] = useState<InputVal>("");
  // const [password, setPassword] = useState<InputVal>("");
  // const [mobileNumber, setMobileNumber] = useState<InputVal>("");
  // const [bio, setBio] = useState<InputVal>("");
  // const [error, setError] = useState<InputVal>("");
  // const [age, setAge] = useState<InputVal>("");

  const [isSubmitting, setIsSubmitting] = useState< boolean >(false);

  //zod implementation
  // const phoneRegex = new RegExp(
  //   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  // );

  const form = useForm<Inputs>({
    resolver : zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      image : undefined
      // mobileNumber: "",
      // bio: "",
    },
  });


  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setIsSubmitting(true);
    // Api call to backend 
    // Need to print the data
    console.log(data);
    dispatch(next());
    if(currentStep > steps.length){
      //step iscompleted true 
      //and if is completed is true then then we don't show the button
    }
    setIsSubmitting(false);
  }

  return (
    <Container >
        <div className="my-4">Register Form</div>
      {/* <form>
        <Input label="First Name" onChange={() => {}} id="name" name="firstName" placeholder="Enter your first name" type="text"/>
      </form> */}


      {/* use switch here to show different form based on current Step */}
      <Form {...form}>
        <form onSubmit = {form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <InputBox name="name" label="Name" formControl={form.control} placeholder="Full Name" />
          <InputBox name="email" label="Email" formControl={form.control} placeholder="Email" type="email"/>
          <InputBox name="age" label="Age" formControl={form.control} placeholder="Age" type="number"/>
          <InputBox name="password" label="Password" formControl={form.control} placeholder="Password" type="password"/>

          <RegisterButton currentStep={currentStep} isCompleted={isCompleted}/>
          
        </form>
      </Form>
      
    </Container>
      
  )
}

export default RegisterForm

