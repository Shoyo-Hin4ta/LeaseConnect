import { Control, FieldPath } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { ListingTypes, listingForm1Schema } from "./ListingForm1"
import { Textarea } from "@/components/ui/textarea"


export interface ListingInputTypes{
    name : FieldPath<ListingTypes>,
    formControl : Control<ListingTypes>,
    placeholder : string,
    label? : string,
    id? : string,
    className? : string,
    inputType? : "textbox" | "inputbox",
}

const InputBox: React.FC<ListingInputTypes> = ({
    name,
    label,
    placeholder,
    formControl,
    id,
    className="",
    inputType="inputbox"
}) => {
  return (
    <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-sm font-medium">{label}</FormLabel>
              <FormControl>
                {inputType === "inputbox" ? (
                  <Input 
                  placeholder={placeholder}
                  {...(id && { id })} 
                  className={`${className}`}
                  {...field} />
                ) : (
                  <Textarea
                    placeholder={placeholder}
                    {...(id && { id })} 
                    className={`resize-none ${className}`}
                    {...field}
                />
                )
              
              }
              </FormControl>
              <FormMessage className="absolute text-red-600 text-sm mt-1" />
              </FormItem>
          )}
        />
  )
}

export default InputBox