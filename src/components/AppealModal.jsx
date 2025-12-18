import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClient";

export default function AppealModal({ show, onClose, onSuccess, userEmail }) {
  const [appealMessage, setAppealMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      // Reset state ketika modal dibuka
      setAppealMessage("");
      setError("");
      setSuccess(false);
      setIsSubmitting(false);
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appealMessage.trim()) {
      setError("Mohon isi pesan banding terlebih dahulu");
      return;
    }

    if (appealMessage.length < 10) {
      setError("Pesan banding minimal 10 karakter");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axiosClient.post("/user/appeals", {
        message: appealMessage,
        email: userEmail,
      });

      setSuccess(true);

      // Reset form setelah 2 detik dan tutup modal
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error submitting appeal:", err);

      if (err.response?.status === 409) {
        setError(
          "Anda sudah memiliki pengajuan banding yang sedang diproses. Tunggu respon dari admin."
        );
      } else if (err.response?.status === 422) {
        setError(
          err.response?.data?.message || "Data yang dimasukkan tidak valid"
        );
      } else {
        setError(
          "Gagal mengirim banding. Silakan coba lagi atau hubungi admin langsung."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-scaleIn">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ajukan Banding
              </h3>
              <p className="text-gray-600">
                Kirimkan alasan mengapa akun Anda harus diaktifkan kembali
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-fadeInUp">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-800">
                    Banding Terkirim!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Pengajuan banding Anda telah dikirim ke admin. Silakan
                    tunggu respon melalui email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl animate-shake">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-red-800">Gagal Mengirim</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Preview */}
              {userEmail && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Email Terkait:
                  </p>
                  <p className="text-gray-800 font-medium">{userEmail}</p>
                </div>
              )}

              {/* Appeal Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pesan Banding *<span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={appealMessage}
                  onChange={(e) => setAppealMessage(e.target.value)}
                  placeholder="Jelaskan mengapa Anda merasa akun Anda harus diaktifkan kembali. Berikan penjelasan yang jelas dan sopan."
                  className="w-full h-40 p-4 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 resize-none"
                  disabled={isSubmitting}
                  maxLength={1000}
                />
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-500">Minimal 10 karakter</p>
                  <p
                    className={`text-xs ${
                      appealMessage.length >= 10
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {appealMessage.length}/1000
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Tips untuk banding yang efektif:
                </p>
                <ul className="text-xs text-blue-700 space-y-1 mt-2">
                  <li>• Jelaskan situasi dengan jujur dan jelas</li>
                  <li>• Sertakan bukti pendukung jika ada</li>
                  <li>• Gunakan bahasa yang sopan dan profesional</li>
                  <li>
                    • Berikan alasan konkrit mengapa akun harus diaktifkan
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || appealMessage.length < 10}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      Mengirim...
                    </span>
                  ) : (
                    "Kirim Banding"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Contact Info */}
          {!success && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                Butuh bantuan segera? Hubungi admin di{" "}
                <a
                  href="mailto:synapsebioapp@gmail.com"
                  className="font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  synapsebioapp@gmail.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}