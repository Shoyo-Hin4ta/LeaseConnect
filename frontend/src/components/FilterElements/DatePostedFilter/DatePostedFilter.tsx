import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const DatePostedFilter = ({ onChange, value } : {
    onChange: (city: string) => void;
    value : string;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Date Posted</h3>
      <RadioGroup value={value} defaultValue="recently" className="flex flex-wrap gap-2" onValueChange={onChange}>
        {["Recently", "3 days", "1 week"].map((option) => (
          <div key={option} className="flex items-center">
            <RadioGroupItem value={option.toLowerCase().replace(' ', '_')} id={option.toLowerCase().replace(' ', '_')} className="peer sr-only" />
            <Label
              htmlFor={option.toLowerCase().replace(' ', '_')}
              className="px-3 py-2 rounded-full border-2 border-violet-200 bg-white peer-checked:bg-violet-600 peer-checked:text-white hover:bg-violet-100 cursor-pointer transition-colors"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default DatePostedFilter