import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "../ui/form";
import InputBox from "../InputBox";
import SelectInput from "../SelectInput";
import InputMobileNumber from "../InputMobileNumber";
import RegisterButton from "./RegisterButton";
import { useDispatch } from "react-redux";
import { next } from "@/appstore/stepperSlice";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters long." })
    .max(50, { message: "Username cannot exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
  age: z.string().refine((age) => !isNaN(parseInt(age)), { message: "Age must be a number." })
    .refine((age) => parseInt(age) >= 18 && parseInt(age) <= 50, { message: "Age should be between 18 and 50." }),
  gender: z.enum(["male", "female", "other"], { message: "Please select one." }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});

export type Inputs = z.infer<typeof formSchema>;

const RegisterForm = ({ currentStep }: { currentStep: number }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      gender: undefined,
      phone: ""
    },
  });

  const onSubmit = async (data: Inputs) => {
    setIsSubmitting(true);
    console.log(data);
    dispatch(next());
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="password"
          label="Password"
          formControl={form.control}
          placeholder="Password"
          type="password"
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
        <RegisterButton 
          currentStep={currentStep} 
          isSubmitting={isSubmitting}
          showPrevButton={true}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600"
        />
      </form>
    </Form>
  );
};

export default RegisterForm;