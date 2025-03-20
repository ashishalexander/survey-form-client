import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormSchemaType } from "../schemas/formSchema";

interface FormSelectProps {
  name: keyof FormSchemaType;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  form: UseFormReturn<FormSchemaType>;
}

const FormSelect: React.FC<FormSelectProps> = ({ name, label, placeholder, options, form }) => {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="focus:border-blue-500">
                <SelectValue placeholder={placeholder || `Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;