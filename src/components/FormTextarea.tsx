import { Textarea } from "../components/ui/textarea";
import { FormControl, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormSchemaType } from "../schemas/formSchema";

interface FormTextareaProps {
  name: keyof FormSchemaType;
  label: string;
  placeholder?: string;
  form: UseFormReturn<FormSchemaType>;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ name, label, placeholder, form }) => {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea 
              {...field} 
              placeholder={placeholder || label} 
              className="min-h-32 focus:border-blue-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;