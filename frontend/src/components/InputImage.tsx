import { useController, Control, FieldPath } from "react-hook-form";
import { 
    FormControl,
    FormItem,
    FormField,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { imageFormSchema } from "./Register/RegisterForm2";

interface InputImageProps {
  name: FieldPath<z.infer<typeof imageFormSchema>>;
  label?: string;
  id: string;
  placeholder: string;
  type?: string;
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl: Control<z.infer<typeof imageFormSchema>>;
  onChange: (file: File | null) => void;
}

const InputImage: React.FC<InputImageProps> = ({
  label, 
  placeholder, 
  name, 
  formControl, 
  type,
  props,
  onChange,
  id
}) => {
  const { field } = useController({
    name,
    control: formControl,
    defaultValue: undefined
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      console.log("File size:", file.size);
      console.log("File type:", file.type);
      onChange(file);
      field.onChange(file);
    }
  };

  return (
    <FormField
      name={name}
      control={formControl}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input 
              placeholder={placeholder}
              id={id}
              type={type ? type : "text"} 
              className={`w-full opacity-0 absolute ${props?.css && props.css}`} 
              onChange={handleFileChange}
              ref={field.ref}
              {...props?.field}
            />
          </FormControl>
          <FormMessage className="text-sm text-violet-500 dark:text-violet-400 mt-1 text-center" />
        </FormItem>
      )}
    />
  );
};

export default InputImage;