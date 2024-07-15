import { Control, FieldPath, useController } from "react-hook-form"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ListingTypes } from "./ListingForm1"

type InputArrayType = {
  value: string,
  desc: string
}

interface RadioTypes {
  name: FieldPath<ListingTypes>,
  formControl: Control<ListingTypes>,
  label?: string,
  inputArray: InputArrayType[],
}

const RadioInput: React.FC<RadioTypes> = ({
  formControl,
  name,
  label,
  inputArray,
}) => {
  const { field, fieldState: { error } } = useController({
    name,
    control: formControl,
  });

  return (
    <FormItem className="space-y-3">
      <FormLabel className="text-sm font-medium text-violet-700 dark:text-violet-300">{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value as string}
          className="flex flex-wrap gap-4 items-center"
        >
          {inputArray.map((item) => (
            <FormItem key={item.value} className="flex items-center space-x-2">
              <FormControl>
                <RadioGroupItem 
                  value={item.value} 
                  className="mt-1 text-violet-600 focus:ring-violet-500 dark:focus:ring-violet-400"
                />
              </FormControl>
              <FormLabel className="font-normal text-gray-700 dark:text-gray-300">
                {item.desc}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      {error && <FormMessage className="text-sm text-red-500 dark:text-red-400">{error.message}</FormMessage>}
    </FormItem>
  )
}

export default RadioInput;