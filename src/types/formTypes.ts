export interface ISurveyFormData {
    name: string;
    gender: "male" | "female" ;
    nationality: string;
    email: string;
    phone: string;
    streetAddress: string,
    city: string,
    state: string,
    pincode: string,   
    message: string;
    botField?: string; 
  }
  