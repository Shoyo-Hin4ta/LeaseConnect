import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { ListingInputTypes } from "./InputBox"

type InputArrayType = {
  value : string,
  desc : string
}

interface RadioTypes extends ListingInputTypes{
  inputArray : InputArrayType[]
}

const RadioInput: React.FC<RadioTypes> = ({
    formControl,
    name,
    label,
    inputArray
}) => {

  return (
        <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={undefined}
                  className="flex"
                >
                  {inputArray.map((item) => {
                    return (
                      <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.desc}
                        </FormLabel>
                      </FormItem>
                    )
                  })}
                  
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}


export default RadioInput;