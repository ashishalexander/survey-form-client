import axiosInstance from "../utils/axiosConfig";
import { FormSchemaType } from "../schemas/formSchema";

export const formService = {
  submitSurveyForm: async (formData: FormSchemaType) => {
    const response = await axiosInstance.post("/survey/submit", formData);
    return response.data;
  },
};