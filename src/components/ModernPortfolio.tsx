"use client";

import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import Starfield from "./portfolio/Starfield";
import Navigation from "./portfolio/Navigation";
import HeroSection from "./portfolio/HeroSection";
import SkillsSection from "./portfolio/SkillsSection";
import ProjectsSection from "./portfolio/ProjectsSection";
import ExperienceSection from "./portfolio/ExperienceSection";
import ContactSection from "./portfolio/ContactSection";

interface ModernPortfolioProps {
  data: PortfolioData;
  loading: boolean;
  onSwitchToTerminal: () => void;
}

export default function ModernPortfolio({
  data,
  loading,
  onSwitchToTerminal,
}: ModernPortfolioProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-[#0a0a0f]" : "bg-white"
        }`}
      >
        <div
          className={`text-lg animate-pulse ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-[#0a0a0f] text-white" : "bg-white text-neutral-900"
      }`}
    >
      <Starfield />

      {/* Content */}
      <div className="relative z-10">
        <Navigation
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onSwitchToTerminal={onSwitchToTerminal}
          profileName={data.profile?.name}
        />

        <HeroSection profile={data.profile} darkMode={darkMode} />

        <SkillsSection skills={data.skills} darkMode={darkMode} />

        <ProjectsSection projects={data.projects} darkMode={darkMode} />

        <ExperienceSection
          experience={data.experience}
          education={data.education}
          certifications={data.certifications}
          darkMode={darkMode}
        />

        <ContactSection profile={data.profile} darkMode={darkMode} />

        {/* Footer */}
        <footer
          className={`py-8 px-6 border-t ${
            darkMode ? "border-white/5" : "border-black/5"
          }`}
        >
          <div
            className={`max-w-6xl mx-auto text-center text-sm ${
              darkMode ? "text-neutral-500" : "text-neutral-600"
            }`}
          >
            <p>
              © {new Date().getFullYear()} {data.profile?.name || "Portfolio"}.
              All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
