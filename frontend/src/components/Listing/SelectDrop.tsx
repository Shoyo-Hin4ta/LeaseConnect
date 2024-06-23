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
import { toast } from "@/components/ui/use-toast"
import { ListingInputTypes } from "./InputBox"

type InputArrayType = {
  value : string,
  desc : string
}

interface SelectTypes extends ListingInputTypes{
  inputArray : InputArrayType[],
  className? : string,
}


const SelectDrop: React.FC<SelectTypes> = ({
    label,
    formControl,
    placeholder,
    name,
    inputArray,
    className=''
}) => {
    return (
        <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem >
              {label && <FormLabel>{label}</FormLabel>}
              <Select onValueChange={field.onChange} defaultValue={undefined}>
                <FormControl>
                  <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* run a map using the array */}
                  {inputArray.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.desc}</SelectItem>
                  ))} 
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
  )

}

export default SelectDrop;

  

