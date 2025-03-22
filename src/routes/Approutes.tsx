import { Routes, Route } from "react-router-dom";
import FormPage from "../pages/FormPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import SuccessPage from "@/pages/SuccessPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />}/>  
        <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
