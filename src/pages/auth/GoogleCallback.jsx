import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../utils/axiosClient";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/login?error=google_failed", { replace: true });
        return;
      }

      try {
        // Save token
        localStorage.setItem("token", token);
        axiosClient.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;

        // Fetch user data
        const { data } = await axiosClient.get("/user");

        // Ensure avatar_url
        if (data.avatar) {
          data.avatar_url =
            data.avatar_url ||
            `${import.meta.env.VITE_API_BASE_URL}/storage/${data.avatar}`;
        }

        // Set user to context
        setUser(data);

        // Check banned status
        if (data.is_active === false) {
          navigate("/banned", { replace: true });
          return;
        }

        // Redirect role
        if (data.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        console.error("Google callback error:", err);
        localStorage.removeItem("token");
        delete axiosClient.defaults.headers.common["Authorization"];
        navigate("/login?error=google_failed", { replace: true });
      }
    };

    handleGoogleCallback();
  }, [navigate, setUser]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-indigo-600 mb-4"></span>
        <p className="text-gray-700 font-medium text-lg">
          Signing you in with Google...
        </p>
        <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}