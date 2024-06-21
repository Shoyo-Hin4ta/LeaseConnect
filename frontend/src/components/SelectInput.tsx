// import { HTMLInputTypeAttribute } from "react";
import { Control, FieldPath } from "react-hook-form";
import { 
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage
} from "./ui/form";
import { z } from "zod";
import { Inputs } from "./Register/RegisterForm";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const formSchema = z.object({
    gender : z.enum(["male", "female", "other"]),
})


// type InputValType = string;



interface SignUpFormFieldProps{
  name : FieldPath<z.infer<typeof formSchema>>;
  label : string ,
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl : Control<Inputs>,
  id? : string,
}

const SelectInput: React.FC<SignUpFormFieldProps> = ({
  label, 
  name, 
  formControl,
  } ) => {
        return ( 
            <>
              <FormField
                name={name}
                control={formControl}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      <FormLabel className="w-2/5 mt-2">{label}</FormLabel>
                      <div className="w-[80%]">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        </SelectContent>
                        </Select>
                      </div>
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

export default SelectInput