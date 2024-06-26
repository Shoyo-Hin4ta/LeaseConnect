import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const BathAndFilter = ({onBathChange, onBedChange} : {
    onBedChange : (bedCount : string) => void,
    onBathChange : (bathCount : string) => void
}) => {
  return (
    <div className="my-2">
        <div>Select Bed and Bath</div>
        <div className="flex justify-between">
            <div>
                <RadioGroup defaultValue="" className="flex" onValueChange={onBedChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1bed" id="1bed" />
                        <Label htmlFor="1bed">1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2beds" id="2beds" />
                        <Label htmlFor="2beds">2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3beds" id="3beds" />
                        <Label htmlFor="3beds">3</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4+beds" id="4+beds" />
                        <Label htmlFor="4+beds">4+</Label>
                    </div>
                </RadioGroup>
            </div>
            <div>
                <RadioGroup defaultValue="" className="flex" onValueChange={onBathChange}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1bath" id="1bath" />
                            <Label htmlFor="1bath">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2baths" id="2baths" />
                            <Label htmlFor="2baths">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3+baths" id="3+baths" />
                            <Label htmlFor="3+baths">3+</Label>
                        </div>
                </RadioGroup>
            </div>
        </div>
    </div>
   
  )
}

export default BathAndFilter