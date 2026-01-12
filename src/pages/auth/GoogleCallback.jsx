import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // token save
    localStorage.setItem("token", token);

    // Set header axios
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <span className="loading loading-spinner text-indigo-600 mb-4"></span>
        <p className="text-gray-700 font-medium">Signing you in...</p>
      </div>
    </div>
  );
}
