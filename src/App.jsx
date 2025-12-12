import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/users/DashboardUsers";
import GoogleCallback from "./pages/auth/GoogleCallback";
import AdminDashboard from "./pages/admins/DashboardAdmin";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./pages/Profile";

// Route 
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/google/callback" element={<GoogleCallback />} />

          {/* User-only */}
          <Route
            path="/dashboard"
            element={
              <UserRoute>
                <Dashboard />
              </UserRoute>
            }
          />

          {/* Shared (user & admin) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin-only */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}