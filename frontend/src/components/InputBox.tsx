import { Control, FieldPath, FieldValue, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input"
import { z } from "zod";
import { Inputs } from "./Register/RegisterForm";

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Username must be at least 2 characters."
  }),
  email: z.string().trim(),
  password: z.string().trim().min(8, {
    message: 'Password must be 8 characters long'
  }),
  age: z.string().trim()
    .refine((age) => !isNaN(parseInt(age)), {
      message: "Age is required",
    })
    .transform((age) => Number(age)),
})

interface SignUpFormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string,
  placeholder: string,
  type?: string,
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl: Control<T>,
  id?: string,
  className?: string,
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
  className,
  labelClassName = "",
  inputClassName = ""
} : SignUpFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={formControl}
      render={({ field }) => (
        <FormItem className={`flex flex-col w-full ${className}`}>
          <div className="flex w-full items-center justify-between">
            <FormLabel className={`w-1/3 mt-2 ${labelClassName}`}>{label}</FormLabel>
            <FormControl className="w-2/3">
              <Input
                placeholder={placeholder}
                type={type ? type : "text"}
                className={`w-full ${inputClassName}`}
                id={id}
                {...props?.field}
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage className="" />
        </FormItem>
      )}
    />
  );
}

export default InputBox
