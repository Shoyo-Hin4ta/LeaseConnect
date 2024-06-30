import { useState } from "react"
import { useToast } from "../ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form"
import InputBox from "../InputBox";
import RegisterButton from "./RegisterButton";
import Container from "../Container/container";
import { useDispatch } from "react-redux";
import { next } from "@/appstore/stepperSlice";
import { steps } from "@/lib/utils";
import SelectInput from "../SelectInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import InputMobileNumber from "../InputMobileNumber";

export type Inputs = {
  email: string,
  name: string,
  password: string,
  age: string,
  image: string,
  gender: string,
  phone: string
}

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(50, { message: "Username cannot exceed 50 characters." })
    .transform((name) => name.trim()),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
  age: z
    .string()
    .refine((age) => !isNaN(parseInt(age)), { message: "Age must be a number." })
    .transform((age) => Number(age))
    .refine((age) => age >= 18 && age <= 50, { message: "Age should be between 18 and 50." }),
  gender: z.enum(["male", "female", "other"], { message: "Please select one." }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
})

const RegisterForm = ({ currentStep, isCompleted }: {
  currentStep: number,
  isCompleted?: boolean
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      image: undefined,
      gender: "",
      phone: ""
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    dispatch(next());
    if (currentStep > steps.length) {
      // step isCompleted true 
      // and if is completed is true then we don't show the button
    }
    setIsSubmitting(false);
    toast({
      title: "Form submitted successfully",
      description: "Your information has been saved.",
      duration: 3000,
    });
  }

  return (
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-violet-200 text-center">
          Personal Information
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <InputBox
            name="name"
            label="Name"
            formControl={form.control}
            placeholder="Full Name"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
            <InputBox
              name="email"
              label="Email"
              formControl={form.control}
              placeholder="Email"
              type="email"
              className="w-full"
              labelClassName="text-violet-700 dark:text-violet-300"
              inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
            <InputBox
              name="age"
              label="Age"
              formControl={form.control}
              placeholder="Age"
              type="number"
              className="w-full"
              labelClassName="text-violet-700 dark:text-violet-300"
              inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />

            <InputBox
              name="password"
              label="Password"
              formControl={form.control}
              placeholder="Password"
              type="password"
              className="w-full"
              labelClassName="text-violet-700 dark:text-violet-300"
              inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />

            <SelectInput
              name="gender"
              label="Gender"
              formControl={form.control}
              className="w-full"
              labelClassName="text-violet-700 dark:text-violet-300"
              selectClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
            <InputMobileNumber
                formControl={form.control}
                label="Mobile Number"
                placeholder="Mobile Number"
                className="w-full"
                labelClassName="text-violet-700 dark:text-violet-300"
                inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              />
            <div className="mt-6">
              <RegisterButton 
                currentStep={currentStep} 
                isSubmitting={isSubmitting}
                className="w-full py-3  text-lg font-semibold transition-colors duration-200 bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600"
              />
            </div>
          </form>
        </Form>
      </div>
  );
}

export default RegisterForm;