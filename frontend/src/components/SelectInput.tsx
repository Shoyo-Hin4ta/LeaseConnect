import { Control, FieldPath } from "react-hook-form";
import { 
    FormControl,
    FormItem,
    FormLabel,
    FormField,
    FormMessage
} from "./ui/form";
import { z } from "zod";
import { Inputs } from "./Register/RegisterForm";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    gender: z.enum(["male", "female", "others"]),
})

interface SelectInputProps {
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    formControl: Control<Inputs>;
    className?: string;
    labelClassName?: string;
    selectClassName?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    name,
    formControl,
    className = "",
    labelClassName = "",
    selectClassName = "",
}) => {
    return (
        <FormField
            name={name}
            control={formControl}
            render={({ field }) => (
                <FormItem className={`flex flex-col w-full ${className}`}>
                    <div className="flex w-full items-center justify-between">
                        <FormLabel className={`w-1/2 ${labelClassName}`}>{label}</FormLabel>
                        <div className="w-[100%]">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={`w-full ${selectClassName}`}>
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />
    )
}

export default SelectInput;