import axiosInstance from "../utils/axiosConfig";

export const adminAuthService = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post("/admin/login", {
      email,
      password,
    });
    return response.data;
  },
};
