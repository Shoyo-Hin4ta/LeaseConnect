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
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={defaultValue}>
            <FormControl>
              <SelectTrigger className={`w-full ${className}`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {inputArray.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.desc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        
          <FormMessage className="absolute text-red-600 text-sm mt-1" />
            
        </FormItem>
      )}
    />
  )
}

export default SelectDrop
