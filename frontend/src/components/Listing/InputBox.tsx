import { Control, FieldPath } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { ListingTypes, listingForm1Schema } from "./ListingForm1"


export interface ListingInputTypes{
    name : FieldPath<ListingTypes>,
    formControl : Control<ListingTypes>,
    placeholder : string,
    label : string,
    id? : string
}

const InputBox: React.FC<ListingInputTypes> = ({
    name,
    label,
    placeholder,
    formControl,
    id
}) => {
  return (
    <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder}
                {...(id && { id })} 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default InputBox