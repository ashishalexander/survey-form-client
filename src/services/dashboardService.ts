import axiosInstance from "../utils/axiosConfig";

export const surveyService = {
  getSurveys: async (page = 1, limit = 10, searchTerm = "") => {
    try {
      const response = await axiosInstance.get("/admin/surveys", {
        params: {
          page,
          limit,
          search: searchTerm
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching surveys:", error);
      throw error;
    }
  },
  
};