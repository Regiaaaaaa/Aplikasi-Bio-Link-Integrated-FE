import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon2 from "../assets/icon2.png";
import {
  Music,
  Instagram,
  Gamepad2,
  ShoppingBag,
  Twitter,
  Camera,
  Globe,
  Mail,
  Github,
  Linkedin,
  Headphones,
  Zap,
  Palette,
  BarChart3,
  Lock,
  Smartphone,
  Rocket,
  Link,
  ExternalLink,
  CheckCircle,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Youtube,
  MessageCircle,
  Eye,
  User,
  Check,
  Users,
} from "lucide-react";
import {
  PaintBucket,
  Star,
  Sparkles,
  Palette as PaletteIcon,
  Brush,
  Layers,
} from "lucide-react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState("light");
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  // Daftar icon yang tersedia
  const availableSocialIcons = [
    { id: "twitter", icon: <Twitter />, name: "Twitter" },
    { id: "instagram", icon: <Camera />, name: "Instagram" },
    { id: "music", icon: <Headphones />, name: "Music" },
    { id: "gaming", icon: <Gamepad2 />, name: "Gaming" },
    { id: "youtube", icon: <Youtube />, name: "YouTube" },
    { id: "tiktok", icon: <MessageCircle />, name: "TikTok" },
  ];

  const [selectedDaisyTheme, setSelectedDaisyTheme] = useState("cupcake");
  const [daisyThemes] = useState([
    "light",
    "dark",
    "cupcake",
    "retro",
    "synthwave",
    "forest",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "bumblebee",
  ]);

  const [formData, setFormData] = useState({
    username: "yourname",
    bio: "Content Creator",
    links: [
      {
        icon: <Music className="w-5 h-5" />,
        label: "Latest Music Drop",
        color: "from-blue-500 to-cyan-500",
        url: "#",
      },
      {
        icon: <Instagram className="w-5 h-5" />,
        label: "Instagram Feed",
        color: "from-purple-500 to-pink-500",
        url: "#",
      },
      {
        icon: <Gamepad2 className="w-5 h-5" />,
        label: "Gaming Content",
        color: "from-green-500 to-emerald-500",
        url: "#",
      },
      {
        icon: <ShoppingBag className="w-5 h-5" />,
        label: "Shop My Merch",
        color: "from-orange-500 to-red-500",
        url: "#",
      },
    ],
    // Simpan ID icon yang dipilih
    selectedSocials: ["twitter", "instagram", "music"],
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  const handleSocialToggle = (socialId) => {
    setFormData((prev) => {
      const newSelected = prev.selectedSocials.includes(socialId)
        ? prev.selectedSocials.filter((id) => id !== socialId)
        : [...prev.selectedSocials, socialId];

      return {
        ...prev,
        selectedSocials: newSelected,
      };
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  // Professional color system
  const colors = {
    light: {
      bg: "bg-white",
      text: "text-slate-900",
      textSecondary: "text-slate-700",
      textMuted: "text-slate-500",
      border: "border-slate-200",
      borderStrong: "border-slate-300",
      card: "bg-white/80",
      cardHover: "bg-slate-50/80",
      nav: "bg-white/80",
      navBorder: "border-slate-200/80",
      glass: "backdrop-blur-xl bg-white/70",
      glassStrong: "backdrop-blur-xl bg-white/90",
      accentText: "text-blue-700",
      accentBg: "bg-blue-50",
      buttonPrimary: "from-blue-400 to-blue-600",
      buttonHover: "from-blue-500 to-blue-700",
      inputBg: "bg-white",
      inputBorder: "border-slate-300",
      inputFocus: "ring-blue-500/50",
      shadow: "shadow-lg shadow-slate-200/60",
      shadowStrong: "shadow-xl shadow-slate-300/50",
    },
    dark: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      textSecondary: "text-slate-300",
      textMuted: "text-slate-400",
      border: "border-slate-700/60",
      borderStrong: "border-slate-600/60",
      card: "bg-slate-800/60",
      cardHover: "bg-slate-700/60",
      nav: "bg-slate-900/80",
      navBorder: "border-slate-700/60",
      glass: "backdrop-blur-xl bg-slate-900/60",
      glassStrong: "backdrop-blur-xl bg-slate-900/80",
      accentText: "text-blue-400",
      accentBg: "bg-blue-950/30",
      buttonPrimary: "from-blue-400 to-blue-600",
      buttonHover: "from-blue-500 to-blue-700",
      inputBg: "bg-slate-800/80",
      inputBorder: "border-slate-700",
      inputFocus: "ring-blue-500/50",
      shadow: "shadow-lg shadow-black/20",
      shadowStrong: "shadow-xl shadow-black/30",
    },
  };

  const themeColors = colors[theme];

  const gradients = {
    primary: "from-blue-400 via-blue-500 to-blue-600",
    secondary: "from-slate-600 to-slate-700",
    accent: "from-blue-300 to-blue-500",
  };

  const glassEffect = `${themeColors.glass} border ${themeColors.border} ${themeColors.shadow}`;
  const strongGlassEffect = `${themeColors.glassStrong} border ${themeColors.borderStrong} ${themeColors.shadowStrong}`;

  return (
    <div
      className={`min-h-screen ${themeColors.bg} ${themeColors.text} transition-all duration-500 overflow-hidden`}
    >
      {/* Subtle animated background - Responsive */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full blur-3xl opacity-[0.03] bg-gradient-to-r from-blue-400 to-blue-600 animate-float-slow"
          style={{ left: "-10%", top: "10%" }}
        />
        <div
          className="absolute w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full blur-3xl opacity-[0.02] bg-gradient-to-r from-blue-600 to-blue-400 animate-float-slower"
          style={{ right: "0%", bottom: "20%" }}
        />
      </div>

      {/* Floating Navigation - Responsive */}
      <nav
        className={`fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 transition-all duration-300 ${
          scrollY > 50 ? "top-2" : "top-4"
        }`}
      >
        <div
          className={`${strongGlassEffect} rounded-full px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 ${
            scrollY > 50 ? "shadow-2xl sm:scale-95" : "shadow-xl"
          }`}
        >
          <div className="flex items-center justify-between sm:justify-start sm:space-x-8">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                  <img
                    src={icon2}
                    alt="Synapse Logo"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <span
                className={`text-lg sm:text-xl font-bold ${themeColors.text} hidden sm:block`}
              >
                Synapse
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {["Features", "Pricing", "Templates"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-3 py-2 ${themeColors.textSecondary} hover:${themeColors.accentText} transition-colors duration-300 group font-medium text-sm`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${gradients.primary} group-hover:w-full transition-all duration-300`}
                  ></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleTheme}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${glassEffect} flex items-center justify-center transition-all duration-300 hover:scale-105`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>

              <button
                onClick={() => navigate("/login")}
                className="group relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hidden sm:block"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${gradients.primary}`}
                ></div>
                <span className="relative text-white text-sm">Get Started</span>
              </button>

              <button
                className="md:hidden w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 ${themeColors.bg} bg-opacity-95 backdrop-blur-lg md:hidden`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            {["Features", "Pricing", "Templates"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-semibold ${themeColors.text} hover:${themeColors.accentText} transition-colors duration-300`}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${gradients.primary}`}
              ></div>
              <span className="relative text-white">Get Started</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Responsive */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Form */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              <div
                className={`inline-flex items-center space-x-3 ${glassEffect} px-4 py-2.5 sm:px-5 sm:py-3 rounded-full`}
              >
                <div className="relative">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium ${themeColors.text}`}
                >
                  Live Preview Editing
                </span>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className={themeColors.text}>Professional Links.</span>
                  <br />
                  <span
                    className={`bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}
                  >
                    Made Simple.
                  </span>
                </h1>

                <p
                  className={`text-base sm:text-lg ${themeColors.textSecondary} max-w-lg mx-auto lg:mx-0 leading-relaxed`}
                >
                  Create a stunning link-in-bio page with real-time preview.
                  Professional, customizable, and ready in minutes.
                </p>
              </div>

              {/* Form */}
              <div
                className={`space-y-5 p-6 sm:p-8 rounded-2xl ${strongGlassEffect}`}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${themeColors.text}`}
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeColors.textMuted} text-xs sm:text-sm`}
                      >
                        synapse.link/
                      </div>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className={`w-full pl-28 sm:pl-32 pr-4 py-3 sm:py-3.5 rounded-xl ${themeColors.inputBg} border ${themeColors.inputBorder} focus:outline-none focus:ring-2 ${themeColors.inputFocus} focus:border-blue-500 transition-all duration-300 text-sm font-medium`}
                        placeholder="yourname"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${themeColors.text}`}
                    >
                      Bio
                    </label>
                    <input
                      type="text"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className={`w-full px-4 py-3 sm:py-3.5 rounded-xl ${themeColors.inputBg} border ${themeColors.inputBorder} focus:outline-none focus:ring-2 ${themeColors.inputFocus} focus:border-blue-500 transition-all duration-300 text-sm`}
                      placeholder="Your professional tagline"
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${themeColors.text}`}
                    >
                      Social Links
                    </label>
                    <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                      {availableSocialIcons.map((social) => {
                        const isSelected = formData.selectedSocials.includes(
                          social.id,
                        );
                        return (
                          <button
                            key={social.id}
                            type="button"
                            onClick={() => handleSocialToggle(social.id)}
                            className={`h-10 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                              isSelected
                                ? `bg-gradient-to-br ${gradients.primary} shadow-lg`
                                : `${themeColors.card} border ${themeColors.border} hover:${themeColors.cardHover}`
                            }`}
                          >
                            {React.cloneElement(social.icon, {
                              className: `w-4 h-4 sm:w-5 sm:h-5 ${
                                isSelected ? "text-white" : themeColors.text
                              }`,
                            })}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/login")}
                  className="group relative w-full py-3.5 sm:py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradients.primary}`}
                  ></div>
                  <span className="relative text-white flex items-center justify-center space-x-2">
                    <span>Create Your Link</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                <p className={`text-center text-xs ${themeColors.textMuted}`}>
                  Free forever • No credit card required • 2 minute setup
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
                {[
                  {
                    label: "Users",
                    value: "50K+",
                    icon: <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
                  },
                  {
                    label: "Links",
                    value: "2M+",
                    icon: <Link className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
                  },
                  {
                    label: "Uptime",
                    value: "99.9%",
                    icon: <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`text-center p-3 sm:p-4 rounded-xl ${themeColors.card} border ${themeColors.border} hover:${themeColors.cardHover} transition-all duration-300`}
                  >
                    <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
                      <div
                        className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </div>
                      <div className={themeColors.textMuted}>{stat.icon}</div>
                    </div>
                    <div
                      className={`text-xs ${themeColors.textMuted} mt-1 font-medium`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="relative mt-8 lg:mt-0">
              <div
                className={`absolute -inset-2 sm:-inset-4 bg-gradient-to-r ${gradients.primary} rounded-3xl blur-2xl opacity-5`}
              ></div>

              <div
                className={`relative ${strongGlassEffect} rounded-2xl p-6 sm:p-8 transition-all duration-300`}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${themeColors.card} border ${themeColors.border} text-xs font-semibold shadow-lg`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className={themeColors.text}>Live Preview</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 mt-2">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${gradients.primary} flex items-center justify-center shadow-lg`}
                  >
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold ${themeColors.text}`}
                    >
                      @{formData.username}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${themeColors.textMuted}`}
                    >
                      {formData.bio}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {formData.links.map((link, idx) => (
                    <div
                      key={idx}
                      className={`p-3 sm:p-4 rounded-xl ${themeColors.card} border ${themeColors.border} hover:${themeColors.cardHover} hover:border-blue-400 transition-all duration-300 cursor-pointer flex items-center justify-between group`}
                      onMouseEnter={() => setHoveredFeature(idx)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={themeColors.text}>{link.icon}</div>
                        <span
                          className={`font-medium text-xs sm:text-sm ${themeColors.text}`}
                        >
                          {link.label}
                        </span>
                      </div>
                      <ExternalLink
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
                          hoveredFeature === idx
                            ? "translate-x-0 opacity-100"
                            : "translate-x-2 opacity-0"
                        } ${themeColors.accentText}`}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className={`pt-4 sm:pt-6 mt-4 sm:mt-6 border-t ${themeColors.border}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-medium ${themeColors.text}`}
                    >
                      Connect
                    </span>
                    <div className="flex space-x-1.5 sm:space-x-2">
                      {formData.selectedSocials.map((socialId, idx) => {
                        const social = availableSocialIcons.find(
                          (s) => s.id === socialId,
                        );
                        if (!social) return null;

                        return (
                          <div
                            key={idx}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${glassEffect} flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer`}
                          >
                            {React.cloneElement(social.icon, {
                              className: `w-3.5 h-3.5 sm:w-5 sm:h-5 ${themeColors.text}`,
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Responsive */}
      <section
        id="features"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className={themeColors.text}>Powerful Features. </span>
              <span
                className={`bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}
              >
                Simple Interface.
              </span>
            </h2>
            <p
              className={`text-base sm:text-lg ${themeColors.textSecondary} max-w-2xl mx-auto px-4`}
            >
              Everything you need to create a professional online presence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Instant Updates",
                desc: "See your changes in real-time with live preview",
              },
              {
                icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Custom Design",
                desc: "Personalize colors, fonts, and layouts easily",
              },
              {
                icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Analytics",
                desc: "Track clicks and visitor engagement metrics",
              },
              {
                icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Secure",
                desc: "Enterprise-grade security for your data",
              },
              {
                icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Responsive",
                desc: "Perfect on desktop, tablet, and mobile",
              },
              {
                icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Fast Deploy",
                desc: "Go live instantly with one-click publishing",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group p-6 sm:p-8 rounded-2xl ${themeColors.card} border ${themeColors.border} hover:${themeColors.cardHover} hover:border-blue-400 transition-all duration-300 cursor-pointer`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradients.primary} flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold ${themeColors.text}`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${themeColors.textSecondary} text-sm sm:text-base leading-relaxed`}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DaisyUI Themes Section */}
      <section
        id="daisy-themes"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-700/50">
              <Layers className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                17 Built-in Themes
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className={themeColors.text}>DaisyUI Themes. </span>
              <span
                className={`bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}
              >
                One Click.
              </span>
            </h2>
            <p
              className={`text-base sm:text-lg ${themeColors.textSecondary} max-w-2xl mx-auto px-4`}
            >
              Switch between 17 professionally designed themes instantly with
              daisyUI v4
            </p>
          </div>

          {/* Theme Switcher Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {daisyThemes.map((themeName) => (
              <button
                key={themeName}
                onClick={() => setSelectedDaisyTheme(themeName)}
                className={`group relative p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  selectedDaisyTheme === themeName
                    ? "ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-slate-900"
                    : `${themeColors.card} border ${themeColors.border} hover:border-blue-300 dark:hover:border-blue-700`
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center`}
                      data-theme={themeName}
                    >
                      <div className="w-full h-full rounded-lg flex items-center justify-center bg-base-100">
                        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                          <Brush className="w-3 h-3 text-primary-content" />
                        </div>
                      </div>
                    </div>
                    {selectedDaisyTheme === themeName && (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400" />
                    )}
                  </div>

                  <div className="text-center">
                    <span
                      className={`text-xs sm:text-sm font-medium capitalize ${themeColors.text}`}
                    >
                      {themeName}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Live Preview - Enhanced */}
          <div
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden ${strongGlassEffect} mb-8 sm:mb-12`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

            <div className="relative p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
                  <Eye className={`w-4 h-4 ${themeColors.text}`} />
                  <span className={`text-sm font-medium ${themeColors.text}`}>
                    Live Preview
                  </span>
                </div>
                <h3
                  className={`text-2xl sm:text-3xl font-bold ${themeColors.text} mb-2`}
                >
                  <span className="capitalize">{selectedDaisyTheme}</span> Theme
                </h3>
                <p className={`${themeColors.textMuted}`}>
                  Interactive theme preview
                </p>
              </div>

              {/* Enhanced Preview */}
              <div
                data-theme={selectedDaisyTheme}
                className="rounded-2xl bg-base-100 border-2 border-base-300 overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Header with Gradient */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"></div>
                  <div className="relative flex items-center justify-between p-5 border-b border-base-300 bg-base-200/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-content" />
                      </div>
                      <div>
                        <span className="font-bold text-base-content text-lg">
                          @yourprofile
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-base-content/60">
                          <Eye className="w-3 h-3" />
                          <span>1.2K views</span>
                        </div>
                      </div>
                    </div>
                    <div className="badge badge-primary badge-lg gap-1 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Profile Section */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 shadow-xl">
                        <div className="w-full h-full rounded-full bg-base-100 flex items-center justify-center">
                          <User className="w-12 h-12 text-primary" />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success shadow-lg flex items-center justify-center border-2 border-base-100">
                        <Check className="w-4 h-4 text-success-content" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-base-content mb-1">
                      Your Name
                    </h4>
                    <p className="text-base-content/70 mb-3">
                      ✨ Content Creator & Designer
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-base-content">
                          12.5K
                        </span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-base-content/30"></div>
                      <div className="flex items-center space-x-1">
                        <Link className="w-4 h-4 text-secondary" />
                        <span className="font-semibold text-base-content">
                          8 Links
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="space-y-3 mb-6 max-w-lg mx-auto">
                    {[
                      {
                        icon: Globe,
                        title: "Website",
                        desc: "Visit my portfolio",
                      },
                      {
                        icon: Mail,
                        title: "Newsletter",
                        desc: "Subscribe now",
                      },
                      {
                        icon: Youtube,
                        title: "YouTube",
                        desc: "Watch my content",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group relative p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-all duration-300 cursor-pointer border border-base-300 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="font-bold text-base-content group-hover:text-primary transition-colors">
                                {item.title}
                              </div>
                              <div className="text-sm text-base-content/60">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-base-content/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 mb-6">
                    {[Instagram, Twitter, Github, Linkedin].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full bg-base-200 hover:bg-primary hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center border border-base-300 hover:border-primary shadow-sm hover:shadow-lg group"
                      >
                        <Icon className="w-5 h-5 text-base-content group-hover:text-primary-content transition-colors" />
                      </div>
                    ))}
                  </div>

                  {/* Theme Colors */}
                  <div className="flex justify-center items-center space-x-2 pt-4 border-t border-base-300">
                    <Palette className="w-4 h-4 text-base-content/50" />
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary shadow-sm border-2 border-base-100"></div>
                      <div className="w-4 h-4 rounded-full bg-secondary shadow-sm border-2 border-base-100"></div>
                      <div className="w-4 h-4 rounded-full bg-accent shadow-sm border-2 border-base-100"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Info Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-base-100/80 backdrop-blur-sm border-2 border-base-300 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50"></div>
                    <span className="text-sm font-medium text-base-content">
                      Active Theme:
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">
                    {selectedDaisyTheme}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-200/50 dark:border-blue-700/50">
              <div className="text-left">
                <h4
                  className={`text-xl sm:text-2xl font-bold ${themeColors.text} mb-2`}
                >
                  Ready to try all themes?
                </h4>
                <p
                  className={`${themeColors.textSecondary} text-sm sm:text-base`}
                >
                  Sign up now and get access to all 17 daisyUI themes
                </p>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="group relative px-8 py-3 sm:px-10 sm:py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${gradients.primary}`}
                ></div>
                <span className="relative text-white flex items-center justify-center space-x-2">
                  <span>Get Started Free</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer
        className={`border-t ${themeColors.border} py-12 sm:py-16 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center`}
                >
                  <img
                    src={icon2}
                    alt="Synapse Logo"
                    className="w-full h-full"
                  />
                </div>
                <span
                  className={`text-lg sm:text-xl font-bold ${themeColors.text}`}
                >
                  Synapse
                </span>
              </div>
              <p className={`text-xs sm:text-sm ${themeColors.textSecondary}`}>
                Professional link pages made simple. Join thousands of creators.
              </p>
            </div>

            {["Product", "Resources", "Company"].map((category) => (
              <div key={category}>
                <h4
                  className={`font-semibold mb-3 sm:mb-4 ${themeColors.text}`}
                >
                  {category}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {["Features", "Pricing", "Templates", "Support"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`text-xs sm:text-sm ${themeColors.textSecondary} hover:${themeColors.accentText} transition-colors duration-300`}
                        >
                          {item}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div
            className={`pt-6 sm:pt-8 border-t ${themeColors.border} flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4`}
          >
            <p
              className={`text-xs sm:text-sm ${themeColors.textMuted} text-center sm:text-left`}
            >
              © 2026 Synapse. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a
                href="#"
                className={`text-xs sm:text-sm ${themeColors.textSecondary} hover:${themeColors.accentText} transition-colors duration-300`}
              >
                Privacy
              </a>
              <a
                href="#"
                className={`text-xs sm:text-sm ${themeColors.textSecondary} hover:${themeColors.accentText} transition-colors duration-300`}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, -20px);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;