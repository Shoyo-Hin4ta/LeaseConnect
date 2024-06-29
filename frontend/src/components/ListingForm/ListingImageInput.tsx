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
  placeholder: string;
  type?: string;
  props?: {
    field?: React.InputHTMLAttributes<HTMLInputElement>;
    css?: string;
  };
  formControl: Control<ListingTypes>;
  onChange: (file: File | null) => void;
  currentImage?: File | null | undefined;

}

const ListingImageInput: React.FC<InputImageProps> = ({ 
  placeholder, 
  name, 
  formControl, 
  type, 
  props, 
  onChange, 
  id,
  currentImage=undefined
}) => {
  const { field } = useController({
    name,
    control: formControl,
    defaultValue: currentImage, // Use undefined to start with no value
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      console.log("File size:", file.size);
      console.log("File type:", file.type);
      onChange(file);
      field.onChange(file);
    } else {
      // If no file is selected, reset the state to null
      onChange(null);
      field.onChange(null);
    }
  };

  return (
    <>
      <FormField
        name={name}
        control={formControl}
        render={({ field }) => (
          <FormItem className="flex w-full items-center justify-center">
            <FormControl>
              <Input 
                placeholder={placeholder}
                id={id}
                type={type ? type : "file"} // Ensure it's a file input
                className={`${props?.css && props.css}`} 
                onChange={handleFileChange}
                ref={field.ref}
                {...props?.field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default ListingImageInput;
