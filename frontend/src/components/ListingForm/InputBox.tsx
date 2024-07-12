import { Control, FieldPath } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ListingTypes } from "./ListingForm1"

export interface ListingInputTypes {
  name: FieldPath<ListingTypes>,
  formControl: Control<ListingTypes>,
  placeholder?: string,
  label?: string,
  id?: string,
  className?: string,
  inputType?: "textbox" | "inputbox",
}

const InputBox: React.FC<ListingInputTypes> = ({
  name,
  label,
  placeholder,
  formControl,
  id,
  className = "",
  inputType = "inputbox"
}) => {
  return (
    <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm font-medium text-violet-700 dark:text-violet-300">{label}</FormLabel>
                    <FormControl>
                        {inputType === "inputbox" ? (
                            <Input 
                                placeholder={placeholder}
                                {...field}
                                id={id}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${className}`}
                            />
                        ) : (
                            <Textarea
                                placeholder={placeholder}
                                {...field}
                                id={id}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm ${className}`}
                            />
                        )}
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 dark:text-red-400" />
                </FormItem>
            )}
    />
  )
}

export default InputBox