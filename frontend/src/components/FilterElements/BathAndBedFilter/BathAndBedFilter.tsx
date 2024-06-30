import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const BathAndFilter = ({onBathChange, onBedChange} : {
    onBedChange : (bedCount : string) => void,
    onBathChange : (bathCount : string) => void
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Beds & Baths</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block text-sm font-medium">Beds</Label>
          <RadioGroup defaultValue="" className="flex flex-wrap gap-2" onValueChange={onBedChange}>
            {["1", "2", "3", "4+"].map((value) => (
              <div key={value} className="flex items-center">
                <RadioGroupItem value={`${value}bed${value !== '1' ? 's' : ''}`} id={`${value}bed`} className="peer sr-only" />
                <Label
                  htmlFor={`${value}bed`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-violet-200 bg-white peer-checked:bg-violet-600 peer-checked:text-white hover:bg-violet-100 cursor-pointer transition-colors"
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label className="mb-2 block text-sm font-medium">Baths</Label>
          <RadioGroup defaultValue="" className="flex flex-wrap gap-2" onValueChange={onBathChange}>
            {["1", "2", "3+"].map((value) => (
              <div key={value} className="flex items-center">
                <RadioGroupItem value={`${value}bath${value !== '1' ? 's' : ''}`} id={`${value}bath`} className="peer sr-only" />
                <Label
                  htmlFor={`${value}bath`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-violet-200 bg-white peer-checked:bg-violet-600 peer-checked:text-white hover:bg-violet-100 cursor-pointer transition-colors"
                >
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default BathAndFilter