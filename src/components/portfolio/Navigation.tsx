"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Terminal, Moon, Sun, Menu, X } from "lucide-react";

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onSwitchToTerminal: () => void;
  profileName?: string;
}

export default function Navigation({
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  onSwitchToTerminal,
  profileName,
}: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors ${
        darkMode
          ? "bg-[#0a0a0f]/80 border-white/5"
          : "bg-white/80 border-black/5 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold"
          >
            {profileName || "Portfolio"}
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className={`text-sm transition-colors ${
                darkMode ? "hover:text-white/80" : "hover:text-black/60"
              }`}
            >
              About
            </a>
            <a
              href="#skills"
              className={`text-sm transition-colors ${
                darkMode ? "hover:text-white/80" : "hover:text-black/60"
              }`}
            >
              Skills
            </a>
            <a
              href="#work"
              className={`text-sm transition-colors ${
                darkMode ? "hover:text-white/80" : "hover:text-black/60"
              }`}
            >
              Work
            </a>
            <a
              href="#experience"
              className={`text-sm transition-colors ${
                darkMode ? "hover:text-white/80" : "hover:text-black/60"
              }`}
            >
              Experience
            </a>
            <a
              href="#contact"
              className={`text-sm transition-colors ${
                darkMode ? "hover:text-white/80" : "hover:text-black/60"
              }`}
            >
              Contact
            </a>
            <button
              onClick={onSwitchToTerminal}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? "hover:bg-white/5" : "hover:bg-black/5"
              }`}
              title="Terminal Mode"
            >
              <Terminal size={18} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? "hover:bg-white/5" : "hover:bg-black/5"
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              darkMode ? "hover:bg-white/5" : "hover:bg-black/5"
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              darkMode ? "border-white/5" : "border-black/5"
            }`}
          >
            <div className="px-6 py-4 space-y-3">
              <a
                href="#about"
                className={`block py-2 transition-colors ${
                  darkMode ? "hover:text-white/80" : "hover:text-black/60"
                }`}
              >
                About
              </a>
              <a
                href="#skills"
                className={`block py-2 transition-colors ${
                  darkMode ? "hover:text-white/80" : "hover:text-black/60"
                }`}
              >
                Skills
              </a>
              <a
                href="#work"
                className={`block py-2 transition-colors ${
                  darkMode ? "hover:text-white/80" : "hover:text-black/60"
                }`}
              >
                Work
              </a>
              <a
                href="#experience"
                className={`block py-2 transition-colors ${
                  darkMode ? "hover:text-white/80" : "hover:text-black/60"
                }`}
              >
                Experience
              </a>
              <a
                href="#contact"
                className={`block py-2 transition-colors ${
                  darkMode ? "hover:text-white/80" : "hover:text-black/60"
                }`}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
