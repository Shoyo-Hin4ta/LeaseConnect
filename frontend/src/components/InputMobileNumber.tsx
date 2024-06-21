import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { Control } from "react-hook-form";
import { Inputs } from "./Register/RegisterForm";


interface InputPhoneTypes{
    label : string,
    placeholder : string,
    formControl : Control<Inputs>
}

const InputMobileNumber: React.FC<InputPhoneTypes> = ({
    formControl,
    placeholder,
    label
}) => {
  return (
      
    <FormField
        control={formControl}
        name="phone"
        render={({ field }) => (
        <FormItem className="flex flex-col w-full items-center justify-center">
            <div className="flex w-full items-center justify-center">

                <FormLabel className="w-2/5 mt-2">{label}</FormLabel>
                <FormControl >
                <PhoneInput className="w-4/5 text-sm" placeholder={placeholder} {...field} />
                </FormControl>
                {/* <FormDescription className="text-left">
                Enter a phone number
                </FormDescription> */}
                <FormMessage />

            </div>
        </FormItem>
        )}
    />
       
  );
}

export default InputMobileNumber;