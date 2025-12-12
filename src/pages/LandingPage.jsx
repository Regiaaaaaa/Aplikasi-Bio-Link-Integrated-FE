import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon2.png";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState("light");
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  // State untuk form data
  const [formData, setFormData] = useState({
    username: "yourname",
    bio: "Content Creator",
    links: [
      {
        icon: "🎵",
        label: "Latest Music Drop",
        color: "from-blue-500 to-cyan-500",
        url: "#",
      },
      {
        icon: "📸",
        label: "Instagram Feed",
        color: "from-purple-500 to-pink-500",
        url: "#",
      },
      {
        icon: "🎮",
        label: "Gaming Content",
        color: "from-green-500 to-emerald-500",
        url: "#",
      },
      {
        icon: "🛍️",
        label: "Shop My Merch",
        color: "from-orange-500 to-red-500",
        url: "#",
      },
    ],
    socials: ["🐦", "📷", "🎵"],
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Handler untuk update form data
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

  // Fungsi untuk generate link preview
  const generateLinkPreview = () => {
    return `synapse.link/${formData.username
      .toLowerCase()
      .replace(/\s+/g, "")}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Theme variables - Light mode dengan background putih bersih
  const isDark = theme === "dark";

  // Color system untuk light mode yang lebih clean
  const colors = {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      textSecondary: "text-gray-700",
      textMuted: "text-gray-600",
      border: "border-gray-200",
      borderStrong: "border-gray-300",
      card: "bg-white",
      cardHover: "bg-blue-50",
      nav: "bg-white",
      navBorder: "border-gray-200",
      footerBorder: "border-gray-200",
      glass: "backdrop-blur-xl bg-white/90",
      glassStrong: "backdrop-blur-xl bg-white/95",
      accentText: "text-blue-600",
      accentBg: "bg-blue-50",
      buttonPrimary: "from-blue-500 to-blue-600",
      buttonHover: "from-blue-600 to-blue-700",
      inputBg: "bg-white",
      inputBorder: "border-gray-300",
      inputFocus: "ring-blue-500",
      shadow: "shadow-lg shadow-gray-200/50",
      shadowStrong: "shadow-xl shadow-gray-300/50",
      shadowHover: "shadow-2xl shadow-blue-200/50",
    },
    dark: {
      bg: "bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900",
      text: "text-white",
      textSecondary: "text-gray-300",
      textMuted: "text-gray-400",
      border: "border-white/15",
      borderStrong: "border-white/25",
      card: "bg-gray-800/70",
      cardHover: "bg-gray-700/70",
      nav: "bg-gray-900/90",
      navBorder: "border-white/15",
      footerBorder: "border-white/15",
      glass: "backdrop-blur-xl bg-gray-900/70",
      glassStrong: "backdrop-blur-xl bg-gray-900/85",
      accentText: "text-blue-400",
      accentBg: "bg-blue-900/20",
      buttonPrimary: "from-blue-500 to-purple-500",
      buttonHover: "from-blue-600 to-purple-600",
      inputBg: "bg-gray-800/80",
      inputBorder: "border-gray-700",
      inputFocus: "ring-blue-500/50",
      shadow: "shadow-lg shadow-black/20",
      shadowStrong: "shadow-xl shadow-black/30",
      shadowHover: "shadow-2xl shadow-black/40",
    },
  };

  const themeColors = colors[theme];

  // Gradients - tetap fokus ke warna biru untuk light mode
  const gradients = {
    primary: isDark
      ? "from-blue-500 via-cyan-500 to-purple-500"
      : "from-blue-500 to-blue-600",
    secondary: isDark
      ? "from-purple-500 via-pink-500 to-blue-500"
      : "from-blue-400 to-cyan-500",
    accent: isDark ? "from-cyan-400 to-blue-400" : "from-blue-400 to-cyan-400",
    success: isDark
      ? "from-green-400 to-emerald-400"
      : "from-green-500 to-emerald-500",
    cardHover: isDark
      ? "from-blue-900/10 via-purple-900/10 to-cyan-900/10"
      : "from-blue-50 to-blue-100",
  };

  // Glass effect styles
  const glassEffect = `${themeColors.glass} border ${themeColors.border} ${themeColors.shadow}`;
  const strongGlassEffect = `${themeColors.glassStrong} border ${themeColors.borderStrong} ${themeColors.shadowStrong}`;

  return (
    <div
      className={`min-h-screen ${themeColors.bg} ${themeColors.text} transition-all duration-500 overflow-hidden`}
    >
      {/* Animated Background - Light mode dengan efek biru subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {isDark ? (
          // Dark mode gradients
          <>
            <div
              className="absolute w-[60rem] h-[60rem] rounded-full blur-3xl opacity-10 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-cyan-900/30 animate-float-slow"
              style={{ left: "10%", top: "20%" }}
            />
            <div
              className="absolute w-[50rem] h-[50rem] rounded-full blur-3xl opacity-5 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-blue-900/30 animate-float-slower"
              style={{ right: "15%", bottom: "30%" }}
            />
          </>
        ) : (
          // Light mode - efek biru subtle di background
          <>
            <div
              className="absolute w-[80rem] h-[80rem] rounded-full blur-3xl opacity-5 bg-gradient-to-r from-blue-100/30 via-cyan-100/20 to-blue-50/10 animate-float-slow"
              style={{ left: "-20%", top: "0%" }}
            />
            <div
              className="absolute w-[70rem] h-[70rem] rounded-full blur-3xl opacity-3 bg-gradient-to-r from-blue-50/20 via-cyan-50/10 to-blue-100/5 animate-float-slower"
              style={{ right: "-15%", bottom: "10%" }}
            />
          </>
        )}
      </div>

      {/* Navigation - Light mode clean dengan biru */}
      <nav
        className={`fixed w-full top-0 z-50 ${themeColors.nav} border-b ${themeColors.navBorder} backdrop-blur-xl transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div
                  className={`absolute -inset-2 bg-gradient-to-r ${gradients.primary} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <span
                className={`text-2xl font-black bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}
              >
                Synapse
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "Templates"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-3 py-2 ${themeColors.textSecondary} hover:text-blue-600 transition-colors duration-300 group`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${gradients.primary} group-hover:w-full transition-all duration-300`}
                  ></span>
                </a>
              ))}
              <button
                onClick={() => navigate("/login")}
                className="group relative px-7 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${themeColors.buttonPrimary}`}
                ></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${themeColors.buttonHover} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300`}
                ></div>
                <span className="relative text-white">Get Started →</span>
              </button>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full ${glassEffect} p-1 transition-all duration-300 hover:scale-110`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                    gradients.primary
                  } transform transition-transform duration-300 shadow-md ${
                    isDark ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
              <button
                className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="text-2xl">{mobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean white background dengan aksen biru */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Form Input Section */}
            <div className="text-center lg:text-left space-y-10">
              <div
                className={`inline-flex items-center space-x-3 ${glassEffect} px-6 py-4 rounded-full animate-fadeIn`}
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur opacity-75 animate-pulse"></div>
                  <div className="relative w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                </div>
                <span className={`font-medium ${themeColors.text}`}>
                  Customize your link in real-time ✨
                </span>
              </div>

              <div className="space-y-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                  <span
                    className={`block ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Your Link.
                  </span>
                  <span
                    className={`block bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent animate-gradient`}
                  >
                    Your Style.
                  </span>
                </h1>

                <p
                  className={`text-xl ${themeColors.textSecondary} max-w-lg mx-auto lg:mx-0 leading-relaxed`}
                >
                  Preview changes instantly. See your custom link come to life
                  in real-time. 🔥
                </p>
              </div>

              {/* Form Inputs */}
              <div
                className={`space-y-6 p-8 rounded-3xl ${strongGlassEffect} animate-fadeIn shadow-lg`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${themeColors.textSecondary}`}
                    >
                      Your Username
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeColors.textMuted}`}
                      >
                        synapse.link/
                      </div>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className={`w-full pl-32 pr-4 py-4 rounded-xl ${themeColors.inputBg} border ${themeColors.inputBorder} focus:outline-none focus:ring-2 ${themeColors.inputFocus} focus:border-blue-500 transition-all duration-300 shadow-sm`}
                        placeholder="yourname"
                      />
                    </div>
                    <div className="mt-2 text-sm text-blue-600">
                      Your link:{" "}
                      <span className="font-medium">
                        {generateLinkPreview()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${themeColors.textSecondary}`}
                    >
                      Bio / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className={`w-full px-4 py-4 rounded-xl ${themeColors.inputBg} border ${themeColors.inputBorder} focus:outline-none focus:ring-2 ${themeColors.inputFocus} focus:border-blue-500 transition-all duration-300 shadow-sm`}
                      placeholder="What describes you best?"
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${themeColors.textSecondary}`}
                    >
                      Social Links
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["🐦", "📷", "🎵", "🎮"].map((emoji, idx) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            const newSocials = formData.socials.includes(emoji)
                              ? formData.socials.filter((s) => s !== emoji)
                              : [...formData.socials, emoji];
                            handleInputChange("socials", newSocials);
                          }}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-300 hover:scale-105 ${
                            formData.socials.includes(emoji)
                              ? `${glassEffect} scale-110 bg-gradient-to-br ${gradients.primary}`
                              : `${
                                  isDark ? "bg-gray-800/70" : "bg-white"
                                } border ${themeColors.border} hover:bg-blue-50`
                          }`}
                        >
                          {formData.socials.includes(emoji) ? (
                            <span className="text-white">{emoji}</span>
                          ) : (
                            <span>{emoji}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="group relative w-full py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradients.primary}`}
                  ></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradients.primary} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300`}
                  ></div>
                  <span className="relative text-white flex items-center justify-center space-x-2">
                    <span>Claim Your Link Now</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      🚀
                    </span>
                  </span>
                </button>

                <p className={`text-center text-sm ${themeColors.textMuted}`}>
                  Free forever • Instant setup • No credit card needed
                </p>
              </div>

              {/* Quick Stats */}
              <div
                className="grid grid-cols-3 gap-4 pt-8 animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                {[
                  { label: "Active Users", value: "10K+" },
                  { label: "Links Created", value: "500K+" },
                  { label: "Satisfaction", value: "99%" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`text-center group cursor-pointer p-4 rounded-2xl ${
                      isDark ? "bg-gray-800/50" : "bg-white"
                    } border ${themeColors.border} hover:${
                      themeColors.cardHover
                    } transition-all duration-300 shadow-md hover:shadow-lg`}
                  >
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-xs ${themeColors.textSecondary} mt-1`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="relative">
              {/* Background glow */}
              <div
                className={`absolute -inset-8 bg-gradient-to-r ${gradients.primary} rounded-4xl blur-3xl opacity-10 animate-pulse-slow`}
              ></div>

              {/* Main Card */}
              <div
                className={`relative ${strongGlassEffect} rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] animate-card-float shadow-xl`}
              >
                {/* Live Preview Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${themeColors.card} border ${themeColors.borderStrong} text-sm font-medium animate-pulse-subtle shadow-md`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className={`font-medium ${themeColors.text}`}>
                      Live Preview
                    </span>
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center space-x-4 mb-8 mt-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients.primary} flex items-center justify-center text-2xl animate-bounce-subtle shadow-lg`}
                  >
                    <span className="text-white">👤</span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${themeColors.text}`}>
                      @{formData.username}
                    </h3>
                    <p className={themeColors.textMuted}>{formData.bio}</p>
                    <div
                      className={`text-xs ${themeColors.textMuted} mt-1 font-mono`}
                    >
                      {generateLinkPreview()}
                    </div>
                  </div>
                </div>

                {/* Links dengan animasi bertahap */}
                <div className="space-y-4">
                  {formData.links.map((link, idx) => (
                    <div key={idx} className="group relative">
                      <div
                        className={`p-4 rounded-2xl ${themeColors.card} border ${themeColors.border} hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer flex items-center justify-between animate-fadeIn shadow-sm hover:shadow-md`}
                        style={{ animationDelay: `${0.1 * idx}s` }}
                        onMouseEnter={() => setHoveredFeature(idx)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="relative flex items-center space-x-3">
                          <span className="text-2xl animate-wiggle-slow">
                            {link.icon}
                          </span>
                          <div>
                            <div className={`font-medium ${themeColors.text}`}>
                              {link.label}
                            </div>
                            <div
                              className={`text-xs ${themeColors.textMuted} flex items-center space-x-1`}
                            >
                              <span>synapse.link/</span>
                              <span className="text-blue-600">
                                {formData.username.toLowerCase()}/{idx + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-xl transition-all duration-300 ${
                            hoveredFeature === idx
                              ? "translate-x-0 opacity-100 text-blue-600"
                              : "translate-x-2 opacity-0"
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links Preview */}
                <div className="pt-8 border-t border-gray-200 dark:border-white/20">
                  <div
                    className={`text-sm font-medium mb-4 flex items-center space-x-2 ${themeColors.text}`}
                  >
                    <span>Connect with me</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                      Online
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    {formData.socials.map((emoji, idx) => (
                      <button
                        key={idx}
                        className={`w-12 h-12 rounded-full ${glassEffect} flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:bg-blue-50 shadow-md animate-bounce-subtle`}
                        style={{ animationDelay: `${0.2 * idx}s` }}
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {emoji}
                        </span>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* QR Code Preview */}
              <div
                className={`mt-8 p-6 rounded-3xl ${strongGlassEffect} text-center animate-fadeIn shadow-lg`}
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-32 h-32 rounded-xl ${themeColors.card} border ${themeColors.border} flex items-center justify-center text-4xl animate-qr-scan shadow-inner`}
                  >
                    <div
                      className={`w-24 h-24 rounded-lg bg-gradient-to-br ${gradients.primary} flex items-center justify-center`}
                    >
                      <span className="text-white text-3xl">📱</span>
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${themeColors.textMuted}`}>
                  Scan to visit{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {generateLinkPreview()}
                  </span>
                </p>
              </div>

              {/* Animated Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-r ${gradients.secondary} opacity-20 animate-spin-slow`}
                ></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-r ${gradients.accent} opacity-20 animate-spin-reverse-slow`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean dengan cards putih */}
      <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6 animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Edit{" "}
              <span
                className={`bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent`}
              >
                Everything
              </span>
              <span
                className={`ml-4 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                ✨
              </span>
            </h2>
            <p
              className={`text-xl ${themeColors.textSecondary} max-w-2xl mx-auto`}
            >
              Customize every aspect of your link page in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎨",
                title: "Live Preview",
                desc: "See changes instantly as you edit",
                feature: "Real-time updates",
              },
              {
                icon: "🔗",
                title: "Custom Links",
                desc: "Add unlimited links with custom icons",
                feature: "Drag & drop",
              },
              {
                icon: "🎯",
                title: "Smart Analytics",
                desc: "Track clicks and engagement in real-time",
                feature: "Real-time stats",
              },
              {
                icon: "📱",
                title: "Mobile Ready",
                desc: "Perfectly optimized for all devices",
                feature: "Responsive design",
              },
              {
                icon: "🌈",
                title: "Themes",
                desc: "Switch between light/dark mode",
                feature: "Theme editor",
              },
              {
                icon: "🚀",
                title: "Instant Deploy",
                desc: "Go live with one click",
                feature: "No waiting",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl ${themeColors.card} border ${themeColors.border} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-blue-50 cursor-pointer animate-card-enter shadow-lg`}
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients.primary} flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-icon-float shadow-lg`}
                    >
                      <span className="text-white">{feature.icon}</span>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${themeColors.card} border ${themeColors.border} animate-pulse-subtle`}
                    >
                      {feature.feature}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold ${themeColors.text}`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${themeColors.textSecondary}`}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t ${
          themeColors.footerBorder
        } py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-900/50" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients.primary} flex items-center justify-center text-2xl animate-bounce-subtle shadow-lg`}
                >
                  <span className="text-white">⚡</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r ${gradients.primary} bg-clip-text text-transparent">
                  Synapse
                </span>
              </div>
              <p className={`${themeColors.textSecondary} max-w-xs`}>
                Create your custom link page in minutes. See changes instantly.
              </p>
              <div
                className={`text-sm p-4 rounded-xl ${themeColors.card} border ${themeColors.border} animate-pulse-subtle shadow-sm`}
              >
                <div className={`font-medium mb-2 ${themeColors.text}`}>
                  Your Preview Link:
                </div>
                <div className="text-blue-600 dark:text-blue-400 truncate font-mono">
                  {generateLinkPreview()}
                </div>
              </div>
            </div>

            {["Product", "Resources", "Company", "Legal"].map((category) => (
              <div key={category}>
                <h4 className={`font-bold text-lg mb-6 ${themeColors.text}`}>
                  {category}
                </h4>
                <ul className="space-y-3">
                  {["Features", "Pricing", "Templates", "Examples"]
                    .slice(0, 4)
                    .map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className={`${themeColors.textSecondary} hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 hover:scale-105 inline-block transform`}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className={`pt-8 border-t ${themeColors.border} flex flex-col md:flex-row justify-between items-center gap-6`}
          >
            <p className={`${themeColors.textMuted} text-sm`}>
              © 2024 Synapse. Create your link in minutes. Free forever. 💯
            </p>
            <button className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 animate-pulse-subtle shadow-lg hover:shadow-xl">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${gradients.primary}`}
              ></div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${gradients.primary} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300`}
              ></div>
              <span className="relative text-white flex items-center space-x-2">
                <span>Create Your Link Now</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes card-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes wiggle-slow {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg);
          }
          75% {
            transform: rotate(3deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes qr-scan {
          0% {
            box-shadow: inset 0 0 0 0 rgba(59, 130, 246, 0.3);
          }
          70% {
            box-shadow: inset 0 0 0 20px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: inset 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        @keyframes icon-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes card-enter {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-wiggle-slow {
          animation: wiggle-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 25s linear infinite;
        }

        .animate-qr-scan {
          animation: qr-scan 2s ease-in-out infinite;
        }

        .animate-icon-float {
          animation: icon-float 3s ease-in-out infinite;
        }

        .animate-card-enter {
          animation: card-enter 0.6s ease-out forwards;
        }

        .rounded-4xl {
          border-radius: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;