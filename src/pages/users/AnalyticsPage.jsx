import { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Package,
  Eye,
  Clock,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ChevronDown,
} from "lucide-react";
import Layout from "../../components/layouts/Layout";

function CustomSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || "";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 sm:max-w-xs" ref={ref}>
      {label && (
        <label className="block text-xs font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="select select-bordered w-full text-left flex items-center justify-between pr-3 appearance-none"
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown
            size={16}
            className={`ml-2 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul className="absolute z-[9999] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-base-200 transition-colors ${
                    opt.value === value
                      ? "bg-primary text-primary-content font-semibold"
                      : "text-base-content"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBundleClicks: 0,
    totalLinkClicks: 0,
    clicksPerBundle: {},
  });
  const [bundles, setBundles] = useState([]);
  const [logBundles, setLogBundles] = useState([]);
  const [logLinks, setLogLinks] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState("all");
  const [timeRange, setTimeRange] = useState("7days");

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      const [statsRes, bundlesRes, logBundlesRes, logLinksRes] =
        await Promise.all([
          fetch(`${API_BASE}/user/stats`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/user/bundles`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/user/log-bundles`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/user/log-links`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

      const statsData = await statsRes.json();
      const bundlesData = await bundlesRes.json();
      const logBundlesData = await logBundlesRes.json();
      const logLinksData = await logLinksRes.json();

      setStats(statsData.data || {});
      setBundles(bundlesData.data || []);
      setLogBundles(logBundlesData.data || []);
      setLogLinks(logLinksData.data || []);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredLogs = (logs) => {
    let filtered = logs;
    if (selectedBundle !== "all") {
      filtered = filtered.filter((log) => log.bundle_id === selectedBundle);
    }
    const now = new Date();
    const cutoffDate = new Date();
    switch (timeRange) {
      case "24hours": cutoffDate.setHours(now.getHours() - 24); break;
      case "7days": cutoffDate.setDate(now.getDate() - 7); break;
      case "30days": cutoffDate.setDate(now.getDate() - 30); break;
      case "90days": cutoffDate.setDate(now.getDate() - 90); break;
      default: return filtered;
    }
    return filtered.filter((log) => new Date(log.created_at) >= cutoffDate);
  };

  const filteredBundleLogs = getFilteredLogs(logBundles);
  const filteredLinkLogs = getFilteredLogs(logLinks);

  const calculateGrowth = (logs) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const thisWeek = logs.filter((log) => new Date(log.created_at) >= weekAgo).length;
    const lastWeek = logs.filter(
      (log) => new Date(log.created_at) >= twoWeeksAgo && new Date(log.created_at) < weekAgo
    ).length;
    if (lastWeek === 0) return { value: 0, isPositive: true };
    const growth = ((thisWeek - lastWeek) / lastWeek) * 100;
    return { value: Math.abs(Math.round(growth)), isPositive: growth >= 0 };
  };

  const bundleGrowth = calculateGrowth(logBundles);
  const linkGrowth = calculateGrowth(logLinks);

  const getBundlesWithClicks = () =>
    bundles
      .map((bundle) => ({ ...bundle, clicks: stats.clicksPerBundle?.[bundle.id] || 0 }))
      .sort((a, b) => b.clicks - a.clicks);

  const getRecentActivity = () => {
    const allLogs = [
      ...filteredBundleLogs.map((log) => ({ ...log, type: "bundle", bundle: bundles.find((b) => b.id === log.bundle_id) })),
      ...filteredLinkLogs.map((log) => ({ ...log, type: "link", bundle: bundles.find((b) => b.id === log.bundle_id) })),
    ];
    return allLogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
  };

  const topBundles = getBundlesWithClicks().slice(0, 5);
  const recentActivity = getRecentActivity();

  const bundleOptions = [
    { value: "all", label: "All Bundles" },
    ...bundles.map((b) => ({ value: b.id, label: b.name })),
  ];

  const timeRangeOptions = [
    { value: "24hours", label: "Last 24 Hours" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "all", label: "All Time" },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto"></div>
            <p className="mt-6 text-gray-700 font-semibold text-lg">Loading analytics...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
        .analytics-page { font-family: "Inter", sans-serif; }
        .stat-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1); }
        .activity-row { transition: all 0.2s ease; }
        .activity-row:hover { background: #f9fafb; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
      `}</style>

      <div className="analytics-page">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">

          {/* Header + Filters */}
          <div className="mb-6 md:mb-8 animate-slide-up" style={{ zIndex: 100, position: "relative" }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Analytics</h1>
                  <p className="text-gray-600 text-sm mt-1">Track your performance and engagement</p>
                </div>
              </div>

              {/* Custom DaisyUI Dropdowns */}
              <div className="flex flex-col sm:flex-row gap-3">
                <CustomSelect
                  label="Filter by Bundle"
                  value={selectedBundle}
                  onChange={setSelectedBundle}
                  options={bundleOptions}
                />
                <CustomSelect
                  label="Time Range"
                  value={timeRange}
                  onChange={setTimeRange}
                  options={timeRangeOptions}
                />
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="stat-card bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Eye className="text-white" size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${bundleGrowth.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {bundleGrowth.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {bundleGrowth.value}%
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{filteredBundleLogs.length.toLocaleString()}</h3>
              <p className="text-sm text-gray-600 font-medium">Bundle Views</p>
            </div>

            <div className="stat-card bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MousePointerClick className="text-white" size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${linkGrowth.isPositive ? "text-green-600" : "text-red-600"}`}>
                  {linkGrowth.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {linkGrowth.value}%
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{filteredLinkLogs.length.toLocaleString()}</h3>
              <p className="text-sm text-gray-600 font-medium">Link Clicks</p>
            </div>

            <div className="stat-card bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Package className="text-white" size={20} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{bundles.length}</h3>
              <p className="text-sm text-gray-600 font-medium">Total Bundles</p>
            </div>

            <div className="stat-card bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {filteredBundleLogs.length > 0
                  ? ((filteredLinkLogs.length / filteredBundleLogs.length) * 100).toFixed(1)
                  : 0}%
              </h3>
              <p className="text-sm text-gray-600 font-medium">Click Through Rate</p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">

              {/* Top Bundles */}
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 animate-slide-up" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="text-blue-600" size={20} />
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Top Performing Bundles</h2>
                </div>
                {topBundles.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="text-gray-300 mx-auto mb-3" size={48} />
                    <p className="text-gray-600 font-medium mb-2">No data available</p>
                    <p className="text-sm text-gray-500">Create bundles and share them to see analytics</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topBundles.map((bundle, index) => {
                      const bundleLogs = filteredBundleLogs.filter((log) => log.bundle_id === bundle.id);
                      const linkLogs = filteredLinkLogs.filter((log) => log.bundle_id === bundle.id);
                      return (
                        <div key={bundle.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                          <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs sm:text-sm">#{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{bundle.name}</h3>
                            <p className="text-xs text-gray-500 font-mono truncate">/{bundle.slug}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                              <div>
                                <p className="font-bold text-blue-600">{bundleLogs.length}</p>
                                <p className="text-xs text-gray-500">views</p>
                              </div>
                              <div>
                                <p className="font-bold text-purple-600">{linkLogs.length}</p>
                                <p className="text-xs text-gray-500">clicks</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 animate-slide-up" style={{ animationDelay: "300ms" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Activity className="text-blue-600" size={20} />
                  <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                </div>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="text-gray-300 mx-auto mb-3" size={48} />
                    <p className="text-gray-600 font-medium">No activity yet</p>
                  </div>
                ) : (
                  <>
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Type</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Bundle</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Time</th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">IP Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentActivity.map((activity, index) => (
                            <tr key={`${activity.type}-${activity.id}-${index}`} className="activity-row border-b border-gray-100 last:border-0">
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${activity.type === "bundle" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                                  {activity.type === "bundle" ? <Eye size={12} /> : <MousePointerClick size={12} />}
                                  {activity.type === "bundle" ? "View" : "Click"}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <p className="font-medium text-sm text-gray-900 truncate max-w-xs">{activity.bundle?.name || "Unknown"}</p>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {new Date(activity.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </td>
                              <td className="py-3 px-4">
                                <code className="text-xs text-gray-500 font-mono">{activity.ip_address || "N/A"}</code>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="md:hidden space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={`${activity.type}-${activity.id}-${index}`} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${activity.type === "bundle" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                              {activity.type === "bundle" ? <Eye size={12} /> : <MousePointerClick size={12} />}
                              {activity.type === "bundle" ? "View" : "Click"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(activity.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="font-semibold text-sm text-gray-900 mb-1">{activity.bundle?.name || "Unknown"}</p>
                          <code className="text-xs text-gray-500 font-mono">{activity.ip_address || "N/A"}</code>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-5 sm:p-6 text-white animate-slide-up" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="text-white" size={20} />
                  <h2 className="text-base sm:text-lg font-bold">Quick Stats</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-blue-100 mb-1">Average Views per Bundle</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {bundles.length > 0 ? Math.round(filteredBundleLogs.length / bundles.length) : 0}
                    </p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-xs sm:text-sm text-blue-100 mb-1">Average Clicks per Bundle</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {bundles.length > 0 ? Math.round(filteredLinkLogs.length / bundles.length) : 0}
                    </p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-xs sm:text-sm text-blue-100 mb-1">Total Interactions</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {(filteredBundleLogs.length + filteredLinkLogs.length).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 animate-slide-up" style={{ animationDelay: "500ms" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Globe className="text-blue-600" size={20} />
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Top Locations</h2>
                </div>
                <div className="space-y-3">
                  {(() => {
                    const ipCounts = {};
                    [...filteredBundleLogs, ...filteredLinkLogs].forEach((log) => {
                      const ip = log.ip_address || "Unknown";
                      ipCounts[ip] = (ipCounts[ip] || 0) + 1;
                    });
                    const topIps = Object.entries(ipCounts).sort(([, a], [, b]) => b - a).slice(0, 5);
                    return topIps.length > 0 ? (
                      topIps.map(([ip, count], index) => (
                        <div key={ip} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 font-bold text-xs">#{index + 1}</span>
                            </div>
                            <code className="text-xs sm:text-sm font-mono text-gray-700 truncate">{ip}</code>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-900 ml-2">{count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 text-sm py-4">No data available</p>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AnalyticsPage;