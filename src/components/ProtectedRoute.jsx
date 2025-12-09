import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner text-indigo-600"></span>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admin ke /admin (admin tidak bisa akses dashboard user)
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}