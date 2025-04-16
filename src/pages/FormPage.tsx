import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "../schemas/formSchema";
import { formService } from "../services/formService";
import FormField from "../components/FormField";
import FormTextarea from "../components/FormTextarea";
import FormSelect from "../components/FormSelect";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";

 
const FormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      nationality: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      pincode: "",
      message: "",
      botField: "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    setIsSubmitting(true);
    try {
      await formService.submitSurveyForm(data);
      toast.success("Form submitted successfully!");
      form.reset();
      navigate("/success");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("There was a problem submitting your form. Please try again.");
      setIsSubmitting(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 p-4">
      <Card className="w-full max-w-6xl shadow-md border border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left panel for form title and description */}
          <div className="bg-black text-white p-8 lg:col-span-1">
            <div className="sticky top-8">
              <h1 className="text-3xl font-semibold mb-4">Survey Form</h1>
              <p className="text-zinc-400 mb-6">
                Please fill out the form to submit your survey response. 
                All fields marked with * are required.
              </p>
              <div className="hidden lg:block mt-12">
                <p className="text-zinc-400 text-sm mt-8">
                  Your information helps us improve our services.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel for form fields */}
          <div className="p-8 lg:col-span-4">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <input
                    type="text"
                    {...form.register("botField")}
                    autoComplete="off"
                    style={{ display: "none" }}
                  />
                  
                  {/* Personal Information Section */}
                  <div>
                    <h2 className="text-xl font-medium text-zinc-900 mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        name="name"
                        label="Name*"
                        placeholder="Enter your full name"
                        form={form}
                      />
                      
                      <FormSelect
                        name="gender"
                        label="Gender*"
                        placeholder="Select your gender"
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        form={form}
                      />
                      
                      <FormField
                        name="nationality"
                        label="Nationality*"
                        placeholder="Enter your nationality"
                        form={form}
                      />
                    </div>
                  </div>
                  
                  {/* Contact Information Section */}
                  <div>
                    <h2 className="text-xl font-medium text-zinc-900 mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="email"
                        label="Email*"
                        placeholder="Enter your email address"
                        type="email"
                        form={form}
                      />
                      
                      <FormField
                        name="phone"
                        label="Phone Number*"
                        placeholder="Enter your phone number"
                        form={form}
                      />
                    </div>
                  </div>
                  
                  {/* Address Information Section */}
                  <div>
                    <h2 className="text-xl font-medium text-zinc-900 mb-6">Address Information</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          name="streetAddress"
                          label="Street Address*"
                          placeholder="Enter your street address"
                          form={form}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          name="city"
                          label="City*"
                          placeholder="Enter your city"
                          form={form}
                        />
                        
                        <FormField
                          name="state"
                          label="State/Province*"
                          placeholder="Enter your state"
                          form={form}
                        />
                        
                        <FormField
                          name="pincode"
                          label="Pincode/ZIP*"
                          placeholder="Enter your pincode"
                          form={form}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Section */}
                  <div>
                    <h2 className="text-xl font-medium text-zinc-900 mb-6">Additional Information</h2>
                    <FormTextarea
                      name="message"
                      label="Message*"
                      placeholder="Enter your message"
                      form={form}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="bg-black hover:bg-zinc-800 text-white font-medium py-2 px-6 rounded-md transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        "Submit Survey"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormPage;