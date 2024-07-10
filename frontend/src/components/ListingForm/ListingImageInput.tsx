import { useController, Control, FieldPath } from "react-hook-form";
import { 
    FormControl,
    FormItem,
    FormField,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ListingTypes } from "./ListingForm1";

interface InputImageProps {
  name: FieldPath<ListingTypes>;
  label?: string;
  id: string;
  placeholder?: string;
  type?: string;
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl: Control<ListingTypes>;
  onChange: (files: File[]) => void;
  currentImages?: File[];
}

const ListingImageInput: React.FC<InputImageProps> = ({ 
  placeholder, 
  name, 
  formControl, 
  type, 
  props, 
  onChange, 
  id,
  currentImages = []
}) => {
  const { field } = useController({
    name,
    control: formControl,
    defaultValue: currentImages,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onChange(files);
      field.onChange(files);
    } else {
      onChange([]);
      field.onChange([]);
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
              type={type ? type : "file"}
              className={`w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-violet-500 dark:focus:border-violet-400 rounded-md shadow-sm transition-colors duration-200
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                dark:file:bg-violet-900 dark:file:text-violet-300
                dark:hover:file:bg-violet-800
                ${props?.css}`}
              onChange={handleFileChange}
              ref={field.ref}
              multiple
              {...props?.field}
            />
          </FormControl>
          <FormMessage className="text-red-600 dark:text-red-400 text-sm mt-1" />
        </FormItem>
      )}
    />
  );
}

export default ListingImageInput;