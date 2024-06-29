import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneInput } from "./ui-profile/phone-input";
import { Pencil } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

type objType = {
    value: string;
    desc: string;
};

interface UpdateFieldTypes {
    label: string;
    id: string;
    type?: string;
    inputType?: string;
    arr?: objType[];
    addressField?: boolean;
    isEditMode: boolean;
    setEditMode: (mode: boolean) => void;
    field: ControllerRenderProps<any, any>;
}

const UpdateField: React.FC<UpdateFieldTypes> = ({
    label,
    type = "text",
    id,
    inputType = "input",
    arr,
    addressField = false,
    isEditMode,
    setEditMode,
    field
}) => {
    const renderInputField = () => {
        switch (inputType) {
            case "input":
                return <Input id={id} type={type} {...field} />;
            case "select":
                return (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id={id}>
                            <SelectValue placeholder={field.value} />
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
                return <PhoneInput placeholder="Enter a phone number" {...field} />;
            default:
                return <p>Unsupported input type</p>;
        }
    };

    return (
        <FormItem>
            <div className="flex items-center justify-between">
                <FormLabel htmlFor={id}>{label}</FormLabel>
                {!addressField && (
                    <div onClick={() => setEditMode(!isEditMode)}>
                        <Pencil size={11} className="cursor-pointer" />
                    </div>
                )}
            </div>
            {isEditMode ? (
                <FormControl>{renderInputField()}</FormControl>
            ) : (
                <h1 className="text-sm">{field.value}</h1>
            )}
            <FormMessage />
        </FormItem>
    );
};

export default UpdateField;