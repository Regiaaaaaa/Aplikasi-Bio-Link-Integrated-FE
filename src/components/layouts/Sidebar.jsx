import {
  Home,
  Search,
  Bell,
  Mail,
  Inbox,
  ClipboardList,
  Settings,
  HelpCircle,
  FileText,
  Users,
  UserCircle,
  X,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import icon2 from "../../assets/icon2.png";

export default function Sidebar({
  onCollapseChange,
  isMobile,
  mobileMenuOpen,
  onCloseMobileMenu,
  isCollapsed,
}) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(isCollapsed);

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Sync with parent collapsed state
  useEffect(() => {
    setInternalCollapsed(isCollapsed);
  }, [isCollapsed]);

  // Close dropdown ketika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get avatar URL from user or use default
  const avatarUrl = user?.avatar_url || "https://i.pravatar.cc/40";

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  }, [location.pathname, isMobile, onCloseMobileMenu]);

  // Toggle sidebar collapse (desktop only)
  const toggleCollapse = () => {
    const newCollapsed = !internalCollapsed;
    setInternalCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  // Handle menu item click
  const handleMenuItemClick = (to) => {
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
    navigate(to);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setOpen(false);
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="h-full w-full bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Mobile Header dengan close button yang jelas */}
      {isMobile && mobileMenuOpen && (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={icon2}
              alt="logo"
              className="w-8 h-8 rounded-md object-cover"
            />
            <span className="text-lg font-bold text-gray-800">Synapse</span>
          </div>
          <button
            onClick={onCloseMobileMenu}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>
      )}

      {/* Collapse/Expand button for desktop */}
      {!isMobile && (
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-8 p-2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-50 z-10 transition-all"
          aria-label={internalCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {internalCollapsed ? (
            <ChevronRight size={18} className="text-gray-600" />
          ) : (
            <ChevronLeft size={18} className="text-gray-600" />
          )}
        </button>
      )}

      {/* TOP SECTION */}
      <div
        className={`flex-1 overflow-y-auto px-4 pb-4 ${
          isMobile && mobileMenuOpen ? "pt-4" : "pt-10"
        }`}
      >
        {/* Logo hanya untuk desktop atau mobile ketika sidebar closed */}
        {(!isMobile || !mobileMenuOpen) && (
          <div className="px-2 pb-6 mb-6 border-b border-gray-200 flex items-center gap-3">
            <img
              src={icon2}
              alt="logo"
              className="w-8 h-8 rounded-md object-cover flex-shrink-0"
            />
            <span className="text-xl font-bold text-gray-800">Synapse</span>
          </div>
        )}

        {/* Menu */}
        <nav className="flex flex-col gap-1 text-gray-700">
          {/* Main Navigation */}
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            to="/dashboard"
            onClick={() => handleMenuItemClick("/dashboard")}
          />
          <SidebarItem
            icon={<Search size={20} />}
            label="Search"
            to="/search"
            onClick={() => handleMenuItemClick("/search")}
          />

          {/* Reporting Section */}
          <div className="mt-6 mb-2">
            <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Reporting
            </p>
          </div>
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="Check-ins"
            to="/checkins"
            onClick={() => handleMenuItemClick("/checkins")}
          />
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="Objectives"
            to="/objectives"
            onClick={() => handleMenuItemClick("/objectives")}
          />
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="Career Hub"
            to="/career"
            onClick={() => handleMenuItemClick("/career")}
          />

          {/* Communication */}
          <div className="mt-6 mb-2">
            <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Communication
            </p>
          </div>
          <SidebarItem
            icon={<Bell size={20} />}
            label="Notifications"
            to="/notifications"
            onClick={() => handleMenuItemClick("/notifications")}
          />
          <SidebarItem
            icon={<Mail size={20} />}
            label="Mail"
            to="/mail"
            onClick={() => handleMenuItemClick("/mail")}
          />
          <SidebarItem
            icon={<Inbox size={20} />}
            label="Inbox"
            to="/inbox"
            onClick={() => handleMenuItemClick("/inbox")}
          />

          {/* Productivity */}
          <div className="mt-6 mb-2">
            <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Productivity
            </p>
          </div>
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="Kanban"
            to="/kanban"
            onClick={() => handleMenuItemClick("/kanban")}
          />
          <SidebarItem
            icon={<ClipboardList size={20} />}
            label="Tasks"
            to="/tasks"
            onClick={() => handleMenuItemClick("/tasks")}
          />

          {/* Help & Settings */}
          <div className="mt-6 mb-2">
            <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Support
            </p>
          </div>
          <SidebarItem
            icon={<FileText size={20} />}
            label="Documentation"
            to="/docs"
            onClick={() => handleMenuItemClick("/docs")}
          />
          <SidebarItem
            icon={<HelpCircle size={20} />}
            label="Support"
            to="/support"
            onClick={() => handleMenuItemClick("/support")}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            to="/settings"
            onClick={() => handleMenuItemClick("/settings")}
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            label="Profile"
            to="/profile"
            onClick={() => handleMenuItemClick("/profile")}
          />
        </nav>
      </div>

      {/* USER PROFILE SECTION */}
      <div
        className="border-t border-gray-200 p-4 flex items-center gap-3 sticky bottom-0 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        ref={dropdownRef}
      >
        <img
          src={avatarUrl}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          alt="User avatar"
        />

        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">
            {user?.name || "Guest User"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user?.email || "guest@example.com"}
          </p>
        </div>

        {/* DROPDOWN MENU */}
        {open && (
          <div
            className="
            absolute left-4 right-4
            bottom-16 bg-white border border-gray-300 shadow-xl rounded-xl p-2 z-50
            animate-scaleIn
          "
          >
            {/* Profile Link */}
            <Link
              to="/profile"
              className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                setOpen(false);
                if (isMobile && onCloseMobileMenu) onCloseMobileMenu();
              }}
            >
              <UserCircle size={18} className="text-gray-500" />
              <div className="flex-1">
                <p className="font-medium">My Profile</p>
                <p className="text-xs text-gray-500">
                  View and edit your profile
                </p>
              </div>
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                setOpen(false);
                if (isMobile && onCloseMobileMenu) onCloseMobileMenu();
              }}
            >
              <Settings size={18} className="text-gray-500" />
              <div className="flex-1">
                <p className="font-medium">Settings</p>
                <p className="text-xs text-gray-500">
                  Customize your preferences
                </p>
              </div>
            </Link>

            <div className="border-t border-gray-200 my-2"></div>

            {/* LOGOUT */}
            <button
              className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <div className="flex-1 text-left">
                <p>Logout</p>
                <p className="text-xs text-red-500">Sign out of your account</p>
              </div>
            </button>

            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="px-3 py-1">
                <p className="text-xs text-gray-500">Version 1.0.0</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, to, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer
        ${
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
      onClick={handleClick}
    >
      <div
        className={`
        ${isActive ? "text-white" : "text-gray-500"}
      `}
      >
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>

      {isActive && (
        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
      )}
    </Link>
  );
}