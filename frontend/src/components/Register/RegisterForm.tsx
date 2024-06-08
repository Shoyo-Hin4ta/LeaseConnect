import { useState } from "react"
// import Input from "../Input"
import { useToast } from "../ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form
} from "../ui/form"
import { Button } from "../ui/button";
import InputBox from "../InputBox";


// type InputVal = string | null;

export type Inputs = {
  email: string,
  name:string,
  password:string,
  age:string,
}

const RegisterForm = () => {

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
          .transform((age) => Number(age) )
          
    // mobileNumber : z.string().regex(
    //   phoneRegex, 'Please enter a valid number'
    // ),
    // bio : z.string().max(200, {
    //   message : "Bio cannot be more than 200 characters"
    // }), 
  })


  const form = useForm<Inputs>({
    resolver : zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      // mobileNumber: "",
      // bio: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setIsSubmitting(true);
    // Api call to backend 
    // Need to print the data
    console.log(data);
    setIsSubmitting(false);
  }

  return (
    <div className="border border-red-500 flex flex-col items-center w-4/5 p-2 font-roboto my-">
      <div className="my-4">Register Form</div>
      {/* <form>
        <Input label="First Name" onChange={() => {}} id="name" name="firstName" placeholder="Enter your first name" type="text"/>
      </form> */}

      <Form {...form}>
        <form onSubmit = {form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <InputBox name="name" label="Name" formControl={form.control} placeholder="Full Name" />
          <InputBox name="email" label="Email" formControl={form.control} placeholder="Email" type="email"/>
          <InputBox name="age" label="Age" formControl={form.control} placeholder="Age" type="number"/>
          <InputBox name="password" label="Password" formControl={form.control} placeholder="Password" type="password"/>

          <Button type="submit" className="mt-5" disabled={isSubmitting}>
            Next (1/2)
          </Button>
        </form>
      </Form>

    </div>
  )
}

export default RegisterForm

