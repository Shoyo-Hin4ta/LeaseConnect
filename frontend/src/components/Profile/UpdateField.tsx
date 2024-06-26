import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "./ui-profile/phone-input";

type objType = {
    value: string;
    desc: string;
};

interface UpdateFieldTypes {
    label: string;
    id: string;
    value: string;
    type?: string;
    inputType?: string;
    arr?: objType[];
}

const UpdateField: React.FC<UpdateFieldTypes> = ({
    label,
    type = "text",
    value,
    id,
    inputType = "input",
    arr
}) => {
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false);

    const handleInputChange = (newValue?: string) => {
        console.log(`Updated value: ${newValue || ""}`);
        // Here, you can add logic to update the value if needed.
    };

    const renderInputField = () => {
        switch (inputType) {
            case "input":
                return <Input id={id} type={type} value={value} />;
            case "select":
                return (
                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder={value} defaultValue={value} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{label}</SelectLabel>
                                {arr?.map((item, index) => (
                                    <SelectItem key={index} value={item.value}>{item.desc}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                );
            case "phonenumber":
                return (
                    <PhoneInput
                        value={value}
                        onChange={handleInputChange} // Pass the change handler here
                    />
                );
            default:
                return <p>Unsupported input type</p>;
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-0 mb-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor={id}>{label}</Label>
                    <Button variant="outline" size="sm" onClick={() => setIsEditClicked(!isEditClicked)}>
                        Edit
                    </Button>
                </div>
                {isEditClicked ? renderInputField() : (
                    <h1 className="text-sm">{value}</h1>
                )}
            </div>
        </div>
    );
};

export default UpdateField;
