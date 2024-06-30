import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { Control } from "react-hook-form";
import { Inputs } from "./Register/RegisterForm";

interface InputMobileNumberProps {
  label: string;
  placeholder: string;
  formControl: Control<Inputs>;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputMobileNumber: React.FC<InputMobileNumberProps> = ({
  formControl,
  placeholder,
  label,
  className = "",
  labelClassName = "",
  inputClassName = "",
}) => {
  return (
    <FormField
      control={formControl}
      name="phone"
      render={({ field }) => (
        <FormItem className={`flex flex-col w-full ${className}`}>
          <div className="flex items-center justify-between w-full">
            <FormLabel className={`w-1/3 ${labelClassName}`}>{label}</FormLabel>
            <FormControl className="w-2/3">
              <PhoneInput
                className={`w-full text-sm ${inputClassName}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage className="text-sm text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
}

export default InputMobileNumber;