import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { initAutocomplete } from "@/lib/googlemaps.ts";
import RegisterButton from "./RegisterButton";
import { useDispatch } from "react-redux";
import { next, resetState, setIsComplete } from "@/appstore/stepperSlice";
import { useNavigate } from "react-router-dom";

interface Form3Types {
  currentStep: number;
}

const postcodeRegex = /^[A-Za-z0-9]{3,10}$/;
const stateRegex = /^[A-Za-z\s-]+$/;

const addressFormSchema = z.object({
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(50, { message: "City name cannot exceed 50 characters" })
    .transform((city) => city.trim()),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .max(50, { message: "State name cannot exceed 50 characters" })
    .regex(stateRegex, { message: "State must only contain letters, spaces, or hyphens" })
    .transform((state) => state.trim()),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(50, { message: "Country name cannot exceed 50 characters" })
    .transform((country) => country.trim()),
  postcode: z
    .string()
    .min(1, { message: "Postcode is required" })
    .max(10, { message: "Postcode cannot exceed 10 characters" })
    .regex(postcodeRegex, { message: "Postcode format is invalid" })
    .transform((postcode) => postcode.trim()),
});

const RegisterForm3 = ({ currentStep }: Form3Types) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "",
      postcode: "",
    },
  });

  const { control, handleSubmit, setValue } = addressForm;

  useEffect(() => {
    window.initAutocomplete = () => initAutocomplete(setValue);
    window.initAutocomplete();
  }, [setValue]);

  function onSubmit(data: z.infer<typeof addressFormSchema>) {
    dispatch(setIsComplete(true));
    dispatch(next());
    dispatch(resetState());
    navigate("/browse");
    dispatch(setIsComplete(false));
    console.log(data);
  }

  return (
    <div className="w-full max-w-md mx-auto ">
      <Form {...addressForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {['city', 'state', 'country', 'postcode'].map((field) => (
            <FormField
              key={field}
              control={control}
              name={field as keyof z.infer<typeof addressFormSchema>}
              render={({ field: inputField }) => (
                <FormItem className="flex flex-col w-full">
                  <div className="flex items-center w-full">
                    <FormLabel className="w-1/3 text-violet-700 dark:text-violet-300">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </FormLabel>
                    <FormControl className="w-2/3">
                      <Input
                        className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
                        placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        id={field}
                        {...inputField}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-center gap-4">
          <RegisterButton 
            currentStep={currentStep} 
            showPrevButton={true}
            className="bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600"
          />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm3;