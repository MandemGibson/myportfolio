"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalInterface from "@/components/TerminalInterface";
import ModernPortfolio from "@/components/ModernPortfolio";
import { PortfolioData } from "@/types/portfolio";

export default function Home() {
  const [viewMode, setViewMode] = useState<"landing" | "terminal" | "modern">(
    "landing",
  );
  const [data, setData] = useState<PortfolioData>({
    profile: null,
    skills: {},
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    stats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch("/api/portfolio");
      if (response.ok) {
        const portfolioData = await response.json();
        setData(portfolioData);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModeSelection = (mode: "terminal" | "modern") => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <AnimatePresence mode="wait">
        {viewMode === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center p-8"
          >
            <div className="max-w-2xl w-full space-y-8">
              {/* Terminal Header */}
              <div className="border border-green-400 p-6 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-green-400 text-lg">
                      Welcome to{" "}
                      <span className="text-cyan-400 font-bold">
                        Philip Gibson Cudjoe
                      </span>
                      &apos;s Dev Terminal
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-green-300">
                      Want to stay in terminal mode or switch to modern view?
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-8"
                  >
                    <button
                      onClick={() => handleModeSelection("terminal")}
                      className="border border-green-400 px-6 py-3 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    >
                      [ Stay in Terminal Mode ]
                    </button>
                    <button
                      onClick={() => handleModeSelection("modern")}
                      className="border border-cyan-400 px-6 py-3 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
                    >
                      [ Switch to Modern UI ]
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Blinking cursor effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="text-green-400 text-center text-2xl"
              >
                _
              </motion.div>
            </div>
          </motion.div>
        )}

        {viewMode === "terminal" && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <TerminalInterface
              data={data}
              loading={loading}
              onSwitchToModern={() => setViewMode("modern")}
            />
          </motion.div>
        )}

        {viewMode === "modern" && (
          <motion.div
            key="modern"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ModernPortfolio
              data={data}
              loading={loading}
              onSwitchToTerminal={() => setViewMode("terminal")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
