import { useState, useEffect, useContext } from "react";
import {
  Shield,
  Users,
  Ban,
  CheckCircle,
  Search,
  RefreshCw,
  Eye,
  X,
  Phone,
  Mail,
  User,
  Hash,
  Calendar,
  Clock,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/layouts/Layout";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingUserId, setProcessingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Users data:", data.users);
        setUsers(data.users || []);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Show user detail
  const handleViewDetail = (userData) => {
    setSelectedUser(userData);
    setShowDetailModal(true);
  };

  // Ban user (deactivate)
  const handleBanUser = async (userId) => {
    if (!confirm("Apakah Anda yakin ingin menonaktifkan user ini?")) {
      return;
    }

    try {
      setProcessingUserId(userId);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/admin/users/${userId}/deactivate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchUsers();
        alert("User berhasil dinonaktifkan");
      } else {
        alert("Gagal menonaktifkan user");
      }
    } catch (error) {
      console.error("Error banning user:", error);
      alert("Terjadi kesalahan saat menonaktifkan user");
    } finally {
      setProcessingUserId(null);
    }
  };

  // Activate user (unban)
  const handleActivateUser = async (userId) => {
    if (!confirm("Apakah Anda yakin ingin mengaktifkan user ini?")) {
      return;
    }

    try {
      setProcessingUserId(userId);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/admin/users/${userId}/activate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchUsers();
        alert("User berhasil diaktifkan");
      } else {
        alert("Gagal mengaktifkan user");
      }
    } catch (error) {
      console.error("Error activating user:", error);
      alert("Terjadi kesalahan saat mengaktifkan user");
    } finally {
      setProcessingUserId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getRelativeTime = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDateShort(dateString);
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_active).length;
  const bannedUsers = users.filter((u) => !u.is_active).length;

  return (
    <Layout>
      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Detail User
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* User Avatar & Name */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={
                    selectedUser.avatar
                      ? `http://localhost:8000/storage/${selectedUser.avatar}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          selectedUser.name || "User"
                        )}&background=6366f1&color=fff`
                  }
                  alt={selectedUser.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900">
                    {selectedUser.name}
                  </h4>
                  <p className="text-gray-500">@{selectedUser.username}</p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                        selectedUser.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedUser.role || "user"}
                    </span>
                    {selectedUser.is_active ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                        <Ban className="w-3 h-3" />
                        Banned
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedUser.bio && (
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <p className="text-gray-700 text-sm italic">
                    "{selectedUser.bio}"
                  </p>
                </div>
              )}

              {/* User Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser.phone_number || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">User ID</p>
                    <p className="text-xs font-mono text-gray-900">
                      {selectedUser.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedUser.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Last Active</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedUser.last_active)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Updated At</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedUser.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedUser.role !== "admin" && (
                <div className="flex gap-3 pt-4 border-t">
                  {selectedUser.is_active ? (
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleBanUser(selectedUser.id);
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                    >
                      Ban User
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleActivateUser(selectedUser.id);
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                      Activate User
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto mt-6 px-6">
        {/* Welcome Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-7 h-7 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Admin Dashboard
                </h2>
              </div>
              <p className="text-gray-600">
                Welcome back, {user?.name} 👋 Manage users and monitor system
                activity.
              </p>
            </div>
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow hover:shadow-lg"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Users
              </h3>
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-indigo-600">{totalUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Active Users
              </h3>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Banned Users
              </h3>
              <Ban className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{bannedUsers}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Daftar Pengguna
              </h2>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Users className="w-12 h-12 mb-3 text-gray-400" />
                <p>Tidak ada user ditemukan</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              u.avatar
                                ? `http://localhost:8000/storage/${u.avatar}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    u.name || "User"
                                  )}&background=6366f1&color=fff`
                            }
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {u.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              @{u.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{u.email}</p>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">
                          {formatDateShort(u.created_at)}
                        </p>
                      </td>

                      {/* Last Active */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">
                          {getRelativeTime(u.last_active)}
                        </p>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {u.role || "user"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {u.is_active ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            <Ban className="w-3 h-3" />
                            Banned
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {/* View Detail Button */}
                          <button
                            onClick={() => handleViewDetail(u)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>

                          {/* Ban/Activate Button */}
                          {u.role !== "admin" && (
                            <>
                              {u.is_active ? (
                                <button
                                  onClick={() => handleBanUser(u.id)}
                                  disabled={processingUserId === u.id}
                                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-lg"
                                >
                                  {processingUserId === u.id
                                    ? "Processing..."
                                    : "Ban User"}
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleActivateUser(u.id)}
                                  disabled={processingUserId === u.id}
                                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-lg"
                                >
                                  {processingUserId === u.id
                                    ? "Processing..."
                                    : "Activate"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
