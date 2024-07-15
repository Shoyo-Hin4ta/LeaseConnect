import { Control, FieldPath, useController } from "react-hook-form"
import {
  FormControl,
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
import { ListingTypes } from "./ListingForm1"

type InputArrayType = {
  value: string,
  desc: string
}

interface SelectTypes {
  name: FieldPath<ListingTypes>,
  formControl: Control<ListingTypes>,
  placeholder?: string,
  label?: string,
  inputArray: InputArrayType[],
  className?: string,
}

const SelectDrop: React.FC<SelectTypes> = ({
  label,
  formControl,
  placeholder,
  name,
  inputArray,
  className = '',
}) => {
  const { field, fieldState: { error } } = useController({
    name,
    control: formControl,
  });

  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-violet-700 dark:text-violet-300">{label}</FormLabel>
      <Select 
        onValueChange={field.onChange} 
        value={field.value as string}
        defaultValue={field.value as string}
      >
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
      {error && <FormMessage className="text-sm text-red-500 dark:text-red-400">{error.message}</FormMessage>}
    </FormItem>
  );
}

export default SelectDrop