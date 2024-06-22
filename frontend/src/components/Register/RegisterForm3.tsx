import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Container from "../Container/container"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react";
import { initAutocomplete } from "@/lib/googlemaps.ts"
import RegisterButton from "./RegisterButton"
import { useDispatch } from "react-redux"
import { next, setIsComplete } from "@/appstore/stepperSlice"
import { useNavigate } from "react-router-dom"


interface Form3Types{
    currentStep : number,
    isCompleted : boolean
}

const addressFormSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
});

const RegisterForm3 = ({currentStep, isCompleted} : Form3Types) => {

  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      city: "",
      state:"",
      country: "",
      postcode: "",
    },
  })

  const { control, handleSubmit, setValue } = addressForm;

  useEffect(() => {
    window.initAutocomplete = () => initAutocomplete(setValue);
    window.initAutocomplete();
  }, [setValue]);

  function onSubmit(data: z.infer<typeof addressFormSchema>) {
    dispatch(setIsComplete());
    dispatch(next());
    navigate('/browse');
    console.log(data)
  }

  return (
    <Container>
      <Form {...addressForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 items-center">
          <div>RegisterForm3</div>

          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-center">
                <FormLabel className="w-2/5 mt-2">City</FormLabel>
                <FormControl>
                  <Input className="w-4/5" placeholder="Enter City" id="city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-center">
                <FormLabel className="w-2/5 mt-2">State</FormLabel>
                <FormControl>
                  <Input className="w-4/5" placeholder="Enter State" id="state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-center">
                <FormLabel className="w-2/5 mt-2">Country</FormLabel>
                <FormControl>
                  <Input className="w-4/5" placeholder="Enter Country" id="country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="postcode"
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-center">
                <FormLabel className="w-2/5 mt-2">Postcode</FormLabel>
                <FormControl>
                  <Input className="w-4/5" placeholder="Enter Postcode" id="postcode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <RegisterButton 
            currentStep={currentStep} 
            isCompleted={isCompleted}/>
        </form>
      </Form>
    </Container>
  );
};

export default RegisterForm3;