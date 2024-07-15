import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { initAutocomplete, loadGoogleMapsApi, setupAddressAutofill } from "@/lib/googlemaps.ts";
import RegisterButton from "./RegisterButton";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setIsComplete } from "@/appstore/stepperSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Form } from "../ui/form";
import InputBox from "../InputBox";
import { RootState } from "@/appstore/appStore";
import { gql, useMutation } from '@apollo/client';
import { GOOGLE_MAPS_API_KEY } from "@/lib/utils";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: UserSignUpInput!, $profileImage: Upload!) {
    signUp(input: $input, profileImage: $profileImage) {
      id
      name
      email
      age
      gender
      phone
      profileImage
      address {
        city
        state
        country
        zipcode
      }
    }
  }
`;

interface Form3Types {
  currentStep: number;
}

const zipcodeRegex = /^[A-Za-z0-9]{3,10}$/;
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
  zipcode: z
    .string()
    .min(1, { message: "Zipcode is required" })
    .max(10, { message: "Zipcode cannot exceed 10 characters" })
    .regex(zipcodeRegex, { message: "Zipcode format is invalid" }),
});

type AddressFormInputs = z.infer<typeof addressFormSchema>;

const RegisterForm3 = ({ currentStep }: Form3Types) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.registerFormData);
  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addressForm = useForm<AddressFormInputs>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  });

  const { control, handleSubmit, setValue } = addressForm;

  useGoogleMapsApi(addressForm.setValue, 'city');


  async function onSubmit(data: AddressFormInputs) {
    setIsSubmitting(true);

    const storedImage = localStorage.getItem('selectedImage');
    let imageData = null;
    if (storedImage) {
      imageData = JSON.parse(storedImage);
    }

    const allFormData = {
      address: {
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode,
      },
      ...formData,
    };

    try {
      const { data: responseData } = await signUp({
        variables: {
          input: allFormData,
          profileImage: imageData,
        },
      });

      dispatch(setIsComplete(true));
      localStorage.removeItem('selectedImage');
      dispatch(resetState());
      dispatch(setIsComplete(false));
      navigate("/login");

      toast({
        title: "Registration completed successfully",
        description: "Your information has been saved.",
        duration: 3000,
      });

    } catch (err) {
      console.error("Error during sign up:", err.message);
      toast({
        title: "Registration failed",
        description: err.message || "There was an error during registration. Please try again.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...addressForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputBox
            name="city"
            id='city'
            label="City"
            formControl={control}
            placeholder="Enter city"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <InputBox
            name="state"
            id='state'
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
            id='country'
            formControl={control}
            placeholder="Enter country"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <InputBox
            name="zipcode"
            id='zipcode'
            label="Zipcode"
            formControl={control}
            placeholder="Enter zipcode"
            className="w-full"
            labelClassName="text-violet-700 dark:text-violet-300"
            inputClassName="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
          <RegisterButton 
            currentStep={currentStep} 
            showPrevButton={true}
            isSubmitting={isSubmitting}
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm3;