import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { initAutocomplete, loadGoogleMapsApi } from "@/lib/googlemaps.ts";
import RegisterButton from "./RegisterButton";
import { useDispatch } from "react-redux";
import { next, resetState, setIsComplete } from "@/appstore/stepperSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Form } from "../ui/form";
import InputBox from "../InputBox";

interface Form3Types {
  currentStep: number;
}

const postcodeRegex = /^[A-Za-z0-9]{3,10}$/;
const stateRegex = /^[A-Za-z\s-]+$/;

const addressFormSchema = z.object({
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(50, { message: "City name cannot exceed 50 characters" }),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .max(50, { message: "State name cannot exceed 50 characters" })
    .regex(stateRegex, { message: "State must only contain letters, spaces, or hyphens" }),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(50, { message: "Country name cannot exceed 50 characters" }),
  postcode: z
    .string()
    .min(1, { message: "Postcode is required" })
    .max(10, { message: "Postcode cannot exceed 10 characters" })
    .regex(postcodeRegex, { message: "Postcode format is invalid" }),
});

type AddressFormInputs = z.infer<typeof addressFormSchema>;

const RegisterForm3 = ({ currentStep }: Form3Types) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressForm = useForm<AddressFormInputs>({
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
    loadGoogleMapsApi("abc")
      .then(() => {
        window.initAutocomplete = () => initAutocomplete(setValue);
        window.initAutocomplete();
      })
      .catch((error) => {
        console.error('Error loading Google Maps API:', error);
      });
  }, [setValue]);

  function onSubmit(data: AddressFormInputs) {
    dispatch(setIsComplete(true));
    dispatch(next());
    dispatch(resetState());
    navigate("/browse");
    dispatch(setIsComplete(false));
    console.log(data);
    toast({
      title: "Address submitted successfully",
      description: "Your address has been saved.",
      duration: 3000,
    });
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...addressForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputBox
            name="city"
            label="City"
            formControl={control}
            placeholder="Enter city"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <InputBox
            name="state"
            label="State"
            formControl={control}
            placeholder="Enter state"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <InputBox
            name="country"
            label="Country"
            formControl={control}
            placeholder="Enter country"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <InputBox
            name="postcode"
            label="Postcode"
            formControl={control}
            placeholder="Enter postcode"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <RegisterButton 
            currentStep={currentStep} 
            showPrevButton={true}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600"
          />
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm3;