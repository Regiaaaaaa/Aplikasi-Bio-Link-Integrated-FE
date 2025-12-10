import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function UserRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-600"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  // hanya user biasa
  if (user.role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}