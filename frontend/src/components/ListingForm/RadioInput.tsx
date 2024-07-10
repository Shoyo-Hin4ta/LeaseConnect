import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ListingInputTypes } from "./InputBox"

type InputArrayType = {
  value: string,
  desc: string
}

interface RadioTypes extends ListingInputTypes {
  inputArray: InputArrayType[],
  defaultValue?: string | undefined
}

const RadioInput: React.FC<RadioTypes> = ({
  formControl,
  name,
  label,
  inputArray,
  defaultValue = undefined
}) => {
  return (
    <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium text-violet-700 dark:text-violet-300">{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={defaultValue}
                            className="flex flex-wrap gap-4 items-center "
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
                    <FormMessage className="text-sm text-red-500 dark:text-red-400" />
                </FormItem>
            )}
        />
  )
}

export default RadioInput;