import { Input } from "@/components/ui/input";
import { FormControl, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormSchemaType } from "../schemas/formSchema";

interface FormFieldProps {
  name: keyof FormSchemaType;
  label: string;
  placeholder?: string;
  type?: string;
  form: UseFormReturn<FormSchemaType>;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, placeholder, type = "text", form }) => {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              {...field} 
              placeholder={placeholder || label} 
              type={type} 
              className="focus:border-blue-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;