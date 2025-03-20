import { Routes, Route } from "react-router-dom";
import FormPage from "../pages/FormPage";
import AdminLoginPage from "@/pages/AdminLoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
