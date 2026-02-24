import {
  Home, Settings, UserCircle, X, LogOut,
  ChevronRight, ChevronLeft, LifeBuoy,
  Star, BarChart2, Package, Bell,
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon2 from "../../assets/icon2.png";

function LogoutToast({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        .logout-toast {
          position: fixed; top: 24px; right: 24px; z-index: 99999;
          animation: toastIn 0.3s ease-out;
          width: calc(100vw - 48px); max-width: 340px;
        }
      `}</style>
      <div className="logout-toast">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-2xl border-l-4 border-green-500">
          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Logout Berhasil!</p>
            <p className="text-xs text-gray-500 mt-0.5">Sampai jumpa lagi 👋</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

export default function Sidebar({ onCollapseChange, isMobile, mobileMenuOpen, onCloseMobileMenu, isCollapsed }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [showToast, setShowToast] = useState(false);

  const dropdownRef = useRef(null);
  const isAdmin = user?.role === "admin";
  const avatarUrl = user?.avatar_url || "https://i.pravatar.cc/40";

  useEffect(() => { setCollapsed(isCollapsed); }, [isCollapsed]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isMobile && onCloseMobileMenu) onCloseMobileMenu();
  }, [location.pathname]);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  };

  const go = (to) => {
    if (isMobile && onCloseMobileMenu) onCloseMobileMenu();
    navigate(to);
  };

  const handleLogout = () => {
    setOpen(false);
    if (isMobile && onCloseMobileMenu) onCloseMobileMenu();
    setShowToast(true);
    setTimeout(() => logout(), 1200);
  };

  return (
    <>
      {showToast && <LogoutToast onClose={() => setShowToast(false)} />}

      <div className="h-full w-full bg-white border-r border-gray-200 flex flex-col">

        {/* Header — Mobile */}
        {isMobile && mobileMenuOpen && (
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={icon2} alt="logo" className="w-8 h-8 rounded-md object-cover" />
              <span className="text-lg font-bold text-gray-800">Menu</span>
            </div>
            <button onClick={onCloseMobileMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        )}

        {/* Header — Desktop */}
        {!isMobile && (
          <div className={`sticky top-0 z-50 bg-white border-b border-gray-200 py-4 flex items-center
            ${collapsed ? "justify-center px-4" : "justify-between px-5"}`}>
            <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
              <img src={icon2} alt="logo" className="w-8 h-8 rounded-md object-cover" />
              {!collapsed && <span className="text-lg font-bold text-gray-800">Synapse</span>}
            </div>
            {!collapsed && (
              <button onClick={toggleCollapse} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Nav */}
        <div className={`flex-1 overflow-y-auto pb-4 ${collapsed && !isMobile ? "px-3" : "px-4"}
          ${isMobile && mobileMenuOpen ? "pt-4" : "pt-6"}`}>

          {/* Collapsed (desktop only) */}
          {!isMobile && collapsed ? (
            <nav className="flex flex-col gap-2 pt-4">
              {isAdmin ? (
                <>
                  <ColItem icon={<Home size={22} />}        label="Dashboard"      to="/admin"         onClick={() => go("/admin")} />
                  <ColItem icon={<Package size={22} />}     label="Manage Bundles" to="/admin/bundles"  onClick={() => go("/admin/bundles")} />
                  <ColItem icon={<UserCircle size={22} />}  label="Appeals"        to="/banding"        onClick={() => go("/banding")} />
                  <ColItem icon={<Settings size={22} />}    label="Settings"       to="/settings"       onClick={() => go("/settings")} />
                </>
              ) : (
                <>
                  <ColItem icon={<Home size={22} />}        label="Dashboard"    to="/dashboard"    onClick={() => go("/dashboard")} />
                  <ColItem icon={<Home size={22} />}        label="My Page"      to="/bundles-page" onClick={() => go("/bundles-page")} />
                  <ColItem icon={<Star size={22} />}        label="Premium Pack" to="/premium-pack" onClick={() => go("/premium-pack")} />
                  <ColItem icon={<BarChart2 size={22} />}   label="Analytics"    to="/analytics"    onClick={() => go("/analytics")} />
                  <ColItem icon={<LifeBuoy size={22} />}    label="Support"      to="/support"      onClick={() => go("/support")} />
                  <ColItem icon={<Settings size={22} />}    label="Settings"     to="/settings"     onClick={() => go("/settings")} />
                </>
              )}
              <ColItem icon={<UserCircle size={22} />} label="Profile" to="/profile" onClick={() => go("/profile")} />
              <div className="mt-6 pt-6 border-t border-gray-200">
                <ColItem icon={<ChevronRight size={22} />} label="Expand" onClick={toggleCollapse} />
              </div>
            </nav>

          ) : (
            /* Expanded / Mobile */
            <nav className="flex flex-col gap-1.5 text-gray-700">
              {isAdmin ? (
                <>
                  <NavItem icon={<Home size={20} />}    label="Dashboard"      to="/admin"        onClick={() => go("/admin")} />
                  <NavItem icon={<Package size={20} />} label="Manage Bundles" to="/admin/bundles" onClick={() => go("/admin/bundles")} />
                  <SectionLabel>Support</SectionLabel>
                  <NavItem icon={<UserCircle size={20} />} label="Appeals"  to="/banding"  onClick={() => go("/banding")} />
                  <NavItem icon={<Settings size={20} />}   label="Settings" to="/settings" onClick={() => go("/settings")} />
                </>
              ) : (
                <>
                  <NavItem icon={<Home size={20} />} label="Dashboard" to="/dashboard" onClick={() => go("/dashboard")} />
                  <SectionLabel>Main Menu</SectionLabel>
                  <NavItem icon={<Home size={20} />}      label="My Page"      to="/bundles-page" onClick={() => go("/bundles-page")} />
                  <NavItem icon={<Star size={20} />}      label="Premium Pack" to="/premium-pack" onClick={() => go("/premium-pack")} />
                  <NavItem icon={<BarChart2 size={20} />} label="Analytics"    to="/analytics"    onClick={() => go("/analytics")} />
                  
                  <SectionLabel>Support</SectionLabel>
                  <NavItem icon={<LifeBuoy size={20} />}  label="Support"  to="/support"  onClick={() => go("/support")} />
                  <NavItem icon={<Settings size={20} />}  label="Settings" to="/settings" onClick={() => go("/settings")} />
                </>
              )}
              <SectionLabel>Account</SectionLabel>
              <NavItem icon={<UserCircle size={20} />} label="Profile" to="/profile" onClick={() => go("/profile")} />
            </nav>
          )}
        </div>

        {/* User profile bottom */}
        {(!isMobile && !collapsed) || (isMobile && mobileMenuOpen) ? (
          <div
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
            className="border-t border-gray-200 px-4 py-4 flex items-center gap-3 sticky bottom-0 bg-white cursor-pointer hover:bg-gray-50 transition-colors group"
          >
            <div className="relative flex-shrink-0">
              <img src={avatarUrl} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" alt="avatar" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{user?.name || "Guest"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || "guest@example.com"}</p>
            </div>

            {open && (
              <div className="absolute left-4 right-4 bottom-16 bg-white border border-gray-200 shadow-xl rounded-lg p-2 z-50">
                <button
                  onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} className="text-red-500 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-500">Logout</p>
                    <p className="text-xs text-red-400">Sign out of your account</p>
                  </div>
                </button>
              </div>
            )}
          </div>

        ) : !isMobile && collapsed ? (
          <div className="border-t border-gray-200 p-4 flex justify-center">
            <div className="relative">
              <img src={avatarUrl} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                alt="avatar" onClick={() => setOpen(!open)} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mt-6 mb-2">
      <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">{children}</p>
    </div>
  );
}

function NavItem({ icon, label, to, onClick }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link to={to} onClick={(e) => { e.preventDefault(); onClick?.(); }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all border-l-4
        ${active ? "bg-indigo-50 text-indigo-700 border-indigo-500" : "text-gray-700 hover:bg-gray-100 border-transparent"}`}>
      <span className={active ? "text-indigo-600" : "text-gray-500"}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function ColItem({ icon, label, to, onClick }) {
  const { pathname } = useLocation();
  const active = to && pathname === to;
  return (
    <div onClick={(e) => { if (to) e.preventDefault(); onClick?.(); }} title={label}
      className={`flex items-center justify-center p-2.5 rounded-lg transition-all cursor-pointer
        ${active ? "bg-indigo-50" : "hover:bg-gray-100"}`}>
      <span className={active ? "text-indigo-600" : "text-gray-500"}>{icon}</span>
    </div>
  );
}