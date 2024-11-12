import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputBoxProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type?: string;
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl: Control<T>;
  id?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputBox = <T extends FieldValues>({
  label,
  placeholder,
  name,
  formControl,
  type,
  props,
  id,
  className = "",
  labelClassName = "",
  inputClassName = "",
}: InputBoxProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <FormField
      name={name}
      control={formControl}
      render={({ field, fieldState }) => (
        <FormItem className={`flex flex-col w-full ${className}`}>
          <div className="flex w-full items-start justify-between relative">
            <FormLabel className={`w-1/3  mt-3 ${labelClassName}`}>{label}</FormLabel>
            <div className="w-2/3 relative">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={isPasswordField ? (showPassword ? "text" : "password") : type || "text"}
                  className={`w-full ${inputClassName} ${
                    fieldState.error ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  id={id}
                  {...props?.field}
                  {...field}
                />
              </FormControl>
              {isPasswordField && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end">
            <div className="w-2/3">
              <FormMessage className="text-red-500 text-sm mt-1" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default InputBox;