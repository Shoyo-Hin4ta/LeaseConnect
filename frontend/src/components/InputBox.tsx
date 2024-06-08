// import { HTMLInputTypeAttribute } from "react";
import {  Control, FieldPath } from "react-hook-form";
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
  name : z.string().min(2, {
    message : "Username must be at least 2 characters."
  }),
  email : z.string(),
  password : z.string().min(8, {
    message : 'Password must be 8 characters long'
  }),
  age : z.string()
        .refine((age) => !isNaN(parseInt(age)), {
          message: "Age is required",
        })
        .transform((age) => Number(age) )
      
})


// type InputValType = string;



interface SignUpFormFieldProps{
  name : FieldPath<z.infer<typeof formSchema>>;
  label : string,
  placeholder : string,
  type? : string,
  formControl : Control<Inputs>,
}

const InputBox: React.FC<SignUpFormFieldProps> = ({
  label, 
  placeholder, 
  name, 
  formControl, 
  type} ) => {
        return ( 
            <>
            <FormField
              name={name}
              control={formControl}
              render={({ field }) => (
                <FormItem className="flex w-full items-center justify-center">
                  <FormLabel className="w-2/5 mt-2">{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type={type ? type : "text"} className="w-4/5"
                    {...field} 
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Enter Full Name
                  </FormDescription> */}
                  <FormMessage />
              </FormItem>
            )}
          />
            </>
        )
}

export default InputBox