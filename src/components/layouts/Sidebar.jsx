import {
  Home, Search, Bell, Mail, Inbox,
  ClipboardList, Settings, HelpCircle, FileText
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import icon2 from "../../assets/icon2.png";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="w-56 h-full bg-white border-r flex flex-col relative">

      {/* TOP SECTION */}
      <div className="flex-1 overflow-y-auto px-4 pt-10 pb-4">

        {/* Logo */}
        <div className="px-2 pb-6 mb-6 border-b flex items-center gap-3 text-xl font-bold text-gray-800">
          <img
            src={icon2}
            alt="logo"
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="text-gray-800">Synapse</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 text-gray-700">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" />
          <SidebarItem icon={<Search size={18} />} label="Search" />

          <div className="mt-4">
            <p className="px-3 text-xs text-gray-400 uppercase">Reporting</p>
            <SidebarItem icon={<ClipboardList size={18} />} label="Check-ins" />
            <SidebarItem icon={<ClipboardList size={18} />} label="Objectives" />
            <SidebarItem icon={<ClipboardList size={18} />} label="Career Hub" />
          </div>

          <SidebarItem icon={<Bell size={18} />} label="Notifications" />
          <SidebarItem icon={<Mail size={18} />} label="Mail" />
          <SidebarItem icon={<Inbox size={18} />} label="Inbox" />
          <SidebarItem icon={<ClipboardList size={18} />} label="Kanban" />
          <SidebarItem icon={<ClipboardList size={18} />} label="Tasks" />

          <div className="mt-4">
            <SidebarItem icon={<FileText size={18} />} label="Documentation" />
            <SidebarItem icon={<HelpCircle size={18} />} label="Support" />
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
          </div>
        </nav>
      </div>

      {/* USER PROFILE */}
      <div
        className="border-t p-4 flex items-center gap-3 sticky bottom-0 bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
        ref={dropdownRef}
      >
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />

        <div className="flex flex-col overflow-hidden">
          <p className="font-medium text-sm text-gray-800 truncate">
            {user?.name || "Guest User"}
          </p>

          <p className="text-sm text-gray-500 truncate max-w-[150px]">
            {user?.email}
          </p>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute bottom-16 left-4 w-44 bg-white border shadow-lg rounded-xl p-2 z-50">
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={logout}
            >
              {/* Logout Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H3m12 0l-4-4m4 4l-4 4m8-12v16"
                />
              </svg>

              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer hover:bg-gray-100 text-gray-700"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
