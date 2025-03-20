import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL || "http://localhost:5000/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
