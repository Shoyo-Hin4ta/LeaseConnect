import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ListingInputTypes } from "./InputBox"

type InputArrayType = {
  value: string,
  desc: string
}

interface SelectTypes extends ListingInputTypes {
  inputArray: InputArrayType[],
  className?: string,
  defaultValue?: string
}

const SelectDrop: React.FC<SelectTypes> = ({
  label,
  formControl,
  placeholder,
  name,
  inputArray,
  className = '',
  defaultValue = undefined
}) => {
  return (
    <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="text-sm font-medium text-violet-700 dark:text-violet-300">{label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={defaultValue}>
                    <FormControl>
                        <SelectTrigger className={`w-full mt-1 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${className}`}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {inputArray.map((item) => (
                            <SelectItem key={item.value} value={item.value}>{item.desc}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500 dark:text-red-400" />
            </FormItem>
        )}
    />
);
}

export default SelectDrop