import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const DatePostedFilter = () => {
  return (
    <div className="my-2">
        <div>
            Date Posted
        </div>
        <div>
            <RadioGroup defaultValue="recently" className="flex">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recently" id="recently" />
                    <Label htmlFor="recently">Recently</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="three_days" id="three_days" />
                    <Label htmlFor="three_days">3 days</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one_week" id="one_week" />
                    <Label htmlFor="one_week">1 week</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
  )
}

export default DatePostedFilter