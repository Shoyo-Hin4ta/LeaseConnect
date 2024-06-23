// import { HTMLInputTypeAttribute } from "react";
import {  useController, Control, FieldPath } from "react-hook-form";
import { 
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input"
import { z } from "zod";
import { imageFormSchema } from "./Register/RegisterForm2";
import { Button } from "./ui/button";
import { ListingTypes } from "./ListingForm1";


interface InputImageProps{
  name : FieldPath<ListingTypes>;
  label? : string,
  id:  string,
  placeholder : string,
  type? : string,
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl : Control<ListingTypes>,
  onChange: (file: File | null) => void
}

const InputImage: React.FC<InputImageProps> = ({
  label, 
  placeholder, 
  name, 
  formControl, 
  type,
  props,
  onChange,
  id
  } ) => {

    const { field  } = useController({
      name,
      control : formControl,
      defaultValue : undefined
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      // console.log(file);
      if (file) {
        console.log("File size:", file.size);
        console.log("File type:", file.type);
        onChange(file);
        field.onChange(file);
      }
      
    };
        return ( 
            <>
                <FormField
                name={name}
                control={formControl}
                render={({ field }) => (
                    <FormItem className="flex w-full items-center justify-center">
                    {/* {props?.field ? '' : <FormLabel className="w-2/5 mt-2">{label}</FormLabel>} */}
                    <FormControl>
                        {/* <Button size="lg" type="button"> */}
                        <Input 
                        placeholder={placeholder}
                        id={id}
                        type={type ? type : "text"} 
                        className={`w-4/5 ${props?.css && props.css}`} 
                        onChange={handleFileChange}
                        ref={field.ref}
                        {...props?.field}
                        />
                        {/* </Button> */}
                    </FormControl>
                    {/* <FormDescription>
                        Choose Your Image
                    </FormDescription> */}
                    <FormMessage />
                </FormItem>
                )}
            />
            </>
        )
}

export default InputImage