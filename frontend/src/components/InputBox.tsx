// import { HTMLInputTypeAttribute } from "react";
import { Control, FieldPath } from "react-hook-form";
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
  name : z.string().trim().min(2, {
    message : "Username must be at least 2 characters."
  }),
  email : z.string().trim(),
  password : z.string().trim().min(8, {
    message : 'Password must be 8 characters long'
  }),
  age : z.string().trim()
        .refine((age) => !isNaN(parseInt(age)), {
          message: "Age is required",
        })
        .transform((age) => Number(age) ),
  image : z.instanceof(File),
})


// type InputValType = string;



interface SignUpFormFieldProps{
  name : FieldPath<z.infer<typeof formSchema>>;
  label : string ,
  placeholder : string,
  type? : string,
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl : Control<Inputs>,
  id? : string,
 
}

const InputBox: React.FC<SignUpFormFieldProps> = ({
  label, 
  placeholder, 
  name, 
  formControl, 
  type,
  props,
  id,
  } ) => {
        return ( 
            <>
              <FormField
                name={name}
                control={formControl}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      {props?.field ? '' : <FormLabel className="w-2/5 mt-2">{label}</FormLabel>}
                      <FormControl>
                        <Input 
                        placeholder={placeholder} 
                        type={type ? type : "text"} 
                        className={`w-4/5 ${props?.css && props.css}`} 
                        id={id}
                        {...props?.field}
                        {...field} 
                        />
                      </FormControl>
                    </div>
                    
                    {/* <FormDescription>
                      Enter Full Name
                    </FormDescription> */}
                    <FormMessage className=""/>
                  </FormItem>
              )}
            />
            </>
        )
}

export default InputBox