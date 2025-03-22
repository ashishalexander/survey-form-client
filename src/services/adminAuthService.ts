import axiosInstance from "../utils/axiosConfig";

export const adminAuthService = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post("/admin/login", {
      email,
      password,
    });
    return response.data;
  },
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/admin/check-auth", {
      });
      return response.data.success;
    } catch (error) {
      console.error("Auth check failed:", error);
      return false;
    }
  },
  logout: async () => {
    const response = await axiosInstance.post("/admin/logout");
    return response.data;
  },
};
