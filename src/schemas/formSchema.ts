import { z } from "zod";

export const formSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  gender: z.enum(["male", "female"], { 
    required_error: "Please select your gender" 
  }),
  nationality: z.string().trim().min(1, "Please enter your nationality"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().regex(
    /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\-.\s]{7,}$/,
    "Please enter a valid phone number (e.g., +1 (123) 456-7890)"
  ),
  streetAddress: z.string().trim().min(1, "Please enter your street address"),
  city: z.string().trim().min(1, "Please enter your city"),
  state: z.string().trim().min(1, "Please enter your state/province"),
  pincode: z.string().trim().regex(/^\d{5,10}$/, "Please enter a valid pincode/zip code"),
  message: z.string().trim().min(1, "Please enter your message"),
  botField: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;