import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import {
  ArrowLeft,
  ExternalLink,
  User,
  Mail,
  Calendar,
  Link as LinkIcon,
  Palette,
  Trash2,
  Package,
  BarChart2,
  X,
} from "lucide-react";

const BundlePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Delete confirm modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const showNotification = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchBundleDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE}/admin/bundles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setBundle(data.data);
    } catch (error) {
      console.error("Error fetching bundle detail:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBundle = () => setShowDeleteModal(true);

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE}/admin/bundles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      setShowDeleteModal(false);

      if (data.success) {
        showNotification("Bundle berhasil dihapus!", "success");
        setTimeout(() => navigate("/admin/bundles"), 1500);
      } else {
        showNotification("Gagal menghapus bundle!", "error");
      }
    } catch (error) {
      console.error("Error deleting bundle:", error);
      setShowDeleteModal(false);
      showNotification("Gagal menghapus bundle!", "error");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchBundleDetail();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-200 border-t-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading bundle preview...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !bundle) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="text-center bg-white rounded-xl p-12 shadow-sm border border-gray-200 max-w-md w-full">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Bundle not found</h2>
            {error && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">
                Error: {error}
              </p>
            )}
            <p className="text-gray-500 text-sm mb-6">
              Bundle dengan ID{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">{id}</code>{" "}
              tidak ditemukan.
            </p>
            <button
              onClick={() => navigate("/admin/bundles")}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Back to Bundles
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const themeName = bundle.theme?.name || "light";

  return (
    <Layout>
      <style jsx>{`
        /* ── iPhone Mockup ── */
        .iphone-mockup-compact {
          width: 100%;
          max-width: 280px;
          margin: 0 auto;
          position: relative;
        }

        .iphone-frame-compact {
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          border-radius: 38px;
          padding: 10px;
          box-shadow:
            0 0 0 2px #4a4a4a,
            0 20px 50px rgba(0, 0, 0, 0.4),
            inset 0 1px 3px rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .iphone-notch-compact {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 22px;
          background: #0a0a0a;
          border-radius: 0 0 14px 14px;
          z-index: 10;
          box-shadow:
            inset 0 -2px 4px rgba(0, 0, 0, 0.5),
            0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .iphone-speaker-compact {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 4px;
          background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);
        }

        .iphone-camera-compact {
          position: absolute;
          top: 7px;
          right: 24px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #1a2a3a 30%, #0a0a0a 70%);
          border: 1.5px solid #2a2a2a;
          border-radius: 50%;
          box-shadow:
            inset 0 1px 2px rgba(0, 0, 0, 0.5),
            0 1px 2px rgba(255, 255, 255, 0.1);
        }

        .iphone-camera-compact::after {
          content: "";
          position: absolute;
          top: 1.5px;
          left: 1.5px;
          width: 2px;
          height: 2px;
          background: rgba(100, 150, 255, 0.6);
          border-radius: 50%;
        }

        .iphone-screen-compact {
          background: #ffffff;
          border-radius: 32px;
          overflow: hidden;
          height: 560px;
          position: relative;
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1279px) {
          .iphone-mockup-compact { max-width: 240px; }
          .iphone-screen-compact { height: 480px; }
        }

        @media (max-width: 640px) {
          .iphone-mockup-compact { max-width: 260px; }
          .iphone-screen-compact { height: 500px; }
        }

        .iphone-content-compact {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .iphone-content-compact::-webkit-scrollbar { width: 3px; }
        .iphone-content-compact::-webkit-scrollbar-track { background: transparent; }
        .iphone-content-compact::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
        .iphone-content-compact::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }

        /* Phone side buttons */
        .phone-btn-r1 { position: absolute; right: -3px; top: 96px;  width: 3px; height: 48px; background: #3a3a3a; border-radius: 0 2px 2px 0; }
        .phone-btn-r2 { position: absolute; right: -3px; top: 160px; width: 3px; height: 64px; background: #3a3a3a; border-radius: 0 2px 2px 0; }
        .phone-btn-r3 { position: absolute; right: -3px; top: 240px; width: 3px; height: 64px; background: #3a3a3a; border-radius: 0 2px 2px 0; }
        .phone-btn-l  { position: absolute; left: -3px;  top: 128px; width: 3px; height: 32px; background: #3a3a3a; border-radius: 2px 0 0 2px; }

        /* ── Toast ── */
        .toast-notification {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          animation: slideInRight 0.3s ease-out;
          max-width: 400px;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        @media (max-width: 640px) {
          .toast-notification {
            top: 16px; right: 16px; left: 16px;
            max-width: none;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div
            className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border-l-4 bg-white ${
              toastType === "success" ? "border-green-500" : "border-red-500"
            }`}
          >
            <div className="flex-shrink-0">
              {toastType === "success" ? (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${toastType === "success" ? "text-green-800" : "text-red-800"}`}>
                {toastMessage}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">

        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2">

              {/* Left: back identity */}
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <button
                  onClick={() => navigate("/admin/bundles")}
                  className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 font-medium flex-shrink-0 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Back</span>
                </button>

                <div className="border-l border-gray-200 pl-2 sm:pl-4 flex items-center gap-2 sm:gap-3 min-w-0">
                  {bundle.profile_image_url ? (
                    <img
                      src={bundle.profile_image_url}
                      alt={bundle.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {bundle.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h1 className="text-sm sm:text-lg font-bold text-gray-900 truncate">
                      {bundle.name}
                    </h1>
                    <p className="text-xs text-gray-500 font-mono truncate">
                      /{bundle.slug}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/${bundle.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 font-medium text-xs sm:text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">View as User</span>
                </a>

                <button
                  onClick={deleteBundle}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200 font-medium text-xs sm:text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

            {/* Left: Info Cards */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4">

              {/* Owner */}
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 mb-3 sm:mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5" />
                  Bundle Owner
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0">
                    {bundle.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-900 font-semibold text-sm sm:text-base truncate">
                      {bundle.user?.name}
                    </p>
                    <p className="text-gray-500 text-xs flex items-center gap-1 truncate">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      {bundle.user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 mb-3 sm:mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <BarChart2 className="w-3.5 h-3.5" />
                  Statistics
                </h3>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                    {bundle.links_count ?? bundle.links?.length ?? 0}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Total Links</div>
                </div>
              </div>

              {/* Theme */}
              {bundle.theme && (
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 sm:mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Palette className="w-3.5 h-3.5" />
                    Theme
                  </h3>
                  <div className="flex items-center gap-3">
                    <div
                      data-theme={themeName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex-shrink-0 border border-gray-200 shadow-sm"
                    />
                    <div>
                      <p className="text-gray-900 font-semibold capitalize text-sm sm:text-base">
                        {bundle.theme.name}
                      </p>
                      <p className="text-gray-500 text-xs">DaisyUI Theme</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Created At */}
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <Calendar className="w-3.5 h-3.5" />
                  Created At
                </h3>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  {new Date(bundle.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(bundle.created_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* ── Right: iPhone Preview ── */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Mobile Preview</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Tampilan bundle di perangkat user
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      📱 LIVE PREVIEW
                    </span>
                    {bundle.theme && (
                      <span className="text-xs text-gray-500 font-medium capitalize bg-gray-100 px-2.5 py-1.5 rounded-full">
                        {bundle.theme.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center">
                  <div className="iphone-mockup-compact">
                    <div className="iphone-frame-compact">
                      <div className="iphone-notch-compact">
                        <div className="iphone-speaker-compact"></div>
                        <div className="iphone-camera-compact"></div>
                      </div>

                      <div className="iphone-screen-compact">
                        <div
                          data-theme={themeName}
                          className="iphone-content-compact bg-base-100"
                        >
                          <div className="p-6 text-center min-h-full">

                            {/* Avatar */}
                            <div className="w-16 h-16 mx-auto mb-3 mt-6">
                              {bundle.profile_image_url ? (
                                <img
                                  src={bundle.profile_image_url}
                                  alt={bundle.name}
                                  className="w-full h-full rounded-full object-cover border-2 border-base-200 shadow-lg"
                                />
                              ) : (
                                <div className="w-full h-full bg-base-300 rounded-full flex items-center justify-center border-2 border-base-200 text-2xl font-bold text-base-content">
                                  {bundle.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>

                            {/* Name */}
                            <h3 className="text-sm font-bold mb-1.5 text-base-content px-2">
                              {bundle.name}
                            </h3>

                            {/* Description */}
                            {bundle.description && (
                              <p className="text-xs text-base-content/70 mb-4 px-2 line-clamp-3">
                                {bundle.description}
                              </p>
                            )}

                            {/* Social Icons */}
                            <div className="flex gap-1.5 justify-center mb-4 flex-wrap px-2">
                              {bundle.instagram_url && (
                                <a href={bundle.instagram_url} target="_blank" rel="noopener noreferrer"
                                  className="btn btn-circle btn-xs bg-gradient-to-br from-purple-500 to-pink-500 border-0 text-white">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                  </svg>
                                </a>
                              )}
                              {bundle.github_url && (
                                <a href={bundle.github_url} target="_blank" rel="noopener noreferrer"
                                  className="btn btn-circle btn-xs bg-gray-800 border-0 text-white">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                </a>
                              )}
                              {bundle.tiktok_url && (
                                <a href={bundle.tiktok_url} target="_blank" rel="noopener noreferrer"
                                  className="btn btn-circle btn-xs bg-black border-0 text-white">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                  </svg>
                                </a>
                              )}
                              {bundle.youtube_url && (
                                <a href={bundle.youtube_url} target="_blank" rel="noopener noreferrer"
                                  className="btn btn-circle btn-xs bg-red-600 border-0 text-white">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                  </svg>
                                </a>
                              )}
                              {bundle.facebook_url && (
                                <a href={bundle.facebook_url} target="_blank" rel="noopener noreferrer"
                                  className="btn btn-circle btn-xs bg-blue-600 border-0 text-white">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                  </svg>
                                </a>
                              )}
                              {bundle.x_url && (
                                <a href={bundle.x_url} target="_blank" rel="noopener noreferrer"
                                  className="btn btn-circle btn-xs bg-black border-0 text-white">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                </a>
                              )}
                            </div>

                            {/* Links */}
                            <div className="space-y-2 px-2">
                              {bundle.links && bundle.links.length > 0 ? (
                                bundle.links.map((link) => (
                                  <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm w-full text-xs font-medium shadow-sm normal-case"
                                  >
                                    {link.name}
                                  </a>
                                ))
                              ) : (
                                <div className="text-center py-8 text-base-content/40">
                                  <LinkIcon className="w-8 h-8 mx-auto mb-2" />
                                  <p className="text-xs">No links available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Side buttons */}
                      <div className="phone-btn-r1"></div>
                      <div className="phone-btn-r2"></div>
                      <div className="phone-btn-r3"></div>
                      <div className="phone-btn-l"></div>
                    </div>
                  </div>

                  {/* Action buttons below phone */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`/${bundle.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 font-medium text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Live
                    </a>
                    <button
                      onClick={deleteBundle}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200 font-medium text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Bundle
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setShowDeleteModal(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-[fadeInScale_0.2s_ease-out]">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-600" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Hapus Bundle?
            </h3>
            <p className="text-gray-500 text-center text-sm mb-1">
              Kamu yakin mau hapus bundle ini?
            </p>
            <p className="text-red-500 text-center text-xs font-medium mb-6">
              ⚠️ Aksi ini tidak bisa dibatalkan!
            </p>

            {/* Bundle info preview */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6 border border-gray-200">
              {bundle.profile_image_url ? (
                <img
                  src={bundle.profile_image_url}
                  alt={bundle.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {bundle.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{bundle.name}</p>
                <p className="text-gray-500 text-xs font-mono truncate">/{bundle.slug}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Hapus Bundle
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BundlePreviewPage;