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
          <FormItem className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <FormLabel className="w-1/3">{label}</FormLabel>
            <FormControl className="w-2/3">
              <PhoneInput
                className="w-full text-sm"
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
        )}
    />
       
  );
}

export default InputMobileNumber;