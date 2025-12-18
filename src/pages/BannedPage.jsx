import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function BannedPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    if (user?.is_active) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-2">
        Akun Dinonaktifkan
      </h1>

      <p className="text-gray-600 mb-6">
        {user?.ban_message || "Akun kamu dibanned oleh admin."}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/appeal")}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Ajukan Banding
        </button>

        <button
          onClick={logout}
          className="px-5 py-2 bg-gray-300 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
