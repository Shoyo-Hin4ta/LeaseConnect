import React, { useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneInput } from "./ui-profile/phone-input";
import { Pencil, Eye, EyeOff } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
    const [showPassword, setShowPassword] = useState(false);

    const renderInputField = () => {
        switch (inputType) {
            case "input":
                if (type === "password") {
                    return (
                        <div className="relative">
                            <Input 
                                id={id} 
                                type={showPassword ? "text" : "password"} 
                                {...field} 
                                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    );
                }
                return <Input 
                    id={id} 
                    type={type} 
                    {...field} 
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400"
                />;
            case "select":
                return (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id={id} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400">
                            <SelectValue  />
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
                return <PhoneInput 
                    placeholder="Enter a phone number" 
                    {...field} 
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400"
                />;
            default:
                return <p>Unsupported input type</p>;
        }
    };

    const getDisplayValue = () => {
        if (inputType === "select" && arr) {
            const selectedOption = arr.find(item => item.value === field.value);
            return selectedOption ? selectedOption.desc : field.value;
        }
        if (type === "password") {
            return "••••••••";
        }
        return field.value;
    };

    return (
        <FormItem className="space-y-1">
            <div className="flex items-center justify-between">
                <FormLabel htmlFor={id} className="text-sm font-medium text-violet-700 dark:text-violet-300">
                    {label}
                </FormLabel>
                {!addressField && (
                    <button 
                        type="button" 
                        onClick={() => setEditMode(!isEditMode)}
                        className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 focus:outline-none"
                    >
                        <Pencil size={14} />
                    </button>
                )}
            </div>
            {isEditMode ? (
                <FormControl>{renderInputField()}</FormControl>
            ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">{getDisplayValue()}</p>
            )}
            <FormMessage className="text-xs text-red-500 dark:text-red-400" />
        </FormItem>
    );
};

export default UpdateField;