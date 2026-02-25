"use client";

import { useState, useEffect, useCallback, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  Code,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  GraduationCap,
  Award,
  Building2,
  Menu,
} from "lucide-react";
import type {
  Project,
  Skill,
  Profile,
  Experience,
  Education,
  Certification,
  Tab,
} from "@/types/admin";
import ProjectsTab from "@/components/admin/ProjectsTab";
import SkillsTab from "@/components/admin/SkillsTab";
import ExperiencesTab from "@/components/admin/ExperiencesTab";
import EducationTab from "@/components/admin/EducationTab";
import CertificationsTab from "@/components/admin/CertificationsTab";
import ProfileTab from "@/components/admin/ProfileTab";
import SettingsTab from "@/components/admin/SettingsTab";
import {
  GridSkeleton,
  ListSkeleton,
  ProfileSkeleton,
} from "@/components/admin/LoadingSkeleton";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);

  // Skills state
  const [skills, setSkills] = useState<Record<string, Skill[]>>({});

  // Experiences state
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Education state
  const [education, setEducation] = useState<Education[]>([]);

  // Certifications state
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Profile state
  const [profile, setProfile] = useState<Profile | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchProjects(),
        fetchSkills(),
        fetchExperiences(),
        fetchEducation(),
        fetchCertifications(),
        fetchProfile(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchData();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [fetchData]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/portfolio/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/education");
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
      }
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  const fetchCertifications = async () => {
    try {
      const response = await fetch("/api/certifications");
      if (response.ok) {
        const data = await response.json();
        setCertifications(data);
      }
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogin = async () => {
    if (!apiKey) return;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setApiKey(""); // Clear the input for security
        fetchData();
      } else {
        const data = await response.json();
        alert(data.error || "Invalid API key. Please check your credentials.");
        setApiKey("");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to authenticate. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setApiKey("");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const uploadImage = async (
    file: File,
    folder: string = "portfolio",
  ): Promise<{ url: string; publicId: string } | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return { url: data.url, publicId: data.publicId };
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upload image");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800 max-w-md w-full"
        >
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-neutral-900 dark:bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Settings
                className="text-white dark:text-neutral-900"
                size={32}
              />
            </div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Admin Access
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Enter your credentials to continue
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent pr-12 transition-all"
                  placeholder="Enter your admin API key"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2.5 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all"
            >
              Sign In
            </button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-4">
              Secure authentication via environment variables
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center">
                <Settings
                  className="text-white dark:text-neutral-900"
                  size={18}
                />
              </div>
              <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all text-sm font-medium"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
              <button
                onClick={handleLogout}
                className="sm:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-1 mb-8 overflow-x-auto bg-white dark:bg-neutral-900 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
          {[
            { id: "projects" as Tab, icon: Briefcase, label: "Projects" },
            { id: "skills" as Tab, icon: Code, label: "Skills" },
            { id: "experiences" as Tab, icon: Building2, label: "Experience" },
            { id: "education" as Tab, icon: GraduationCap, label: "Education" },
            {
              id: "certifications" as Tab,
              icon: Award,
              label: "Certifications",
            },
            { id: "profile" as Tab, icon: User, label: "Profile" },
            { id: "settings" as Tab, icon: Settings, label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mb-6 overflow-hidden"
            >
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 space-y-1">
                {[
                  { id: "projects" as Tab, icon: Briefcase, label: "Projects" },
                  { id: "skills" as Tab, icon: Code, label: "Skills" },
                  {
                    id: "experiences" as Tab,
                    icon: Building2,
                    label: "Experience",
                  },
                  {
                    id: "education" as Tab,
                    icon: GraduationCap,
                    label: "Education",
                  },
                  {
                    id: "certifications" as Tab,
                    icon: Award,
                    label: "Certifications",
                  },
                  { id: "profile" as Tab, icon: User, label: "Profile" },
                  { id: "settings" as Tab, icon: Settings, label: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                      activeTab === tab.id
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Active Tab Indicator */}
        <div className="lg:hidden mb-6">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {[
                  { id: "projects" as Tab, icon: Briefcase, label: "Projects" },
                  { id: "skills" as Tab, icon: Code, label: "Skills" },
                  {
                    id: "experiences" as Tab,
                    icon: Building2,
                    label: "Experience",
                  },
                  {
                    id: "education" as Tab,
                    icon: GraduationCap,
                    label: "Education",
                  },
                  {
                    id: "certifications" as Tab,
                    icon: Award,
                    label: "Certifications",
                  },
                  { id: "profile" as Tab, icon: User, label: "Profile" },
                  { id: "settings" as Tab, icon: Settings, label: "Settings" },
                ].find((tab) => tab.id === activeTab) && (
                  <>
                    {createElement(
                      [
                        {
                          id: "projects" as Tab,
                          icon: Briefcase,
                          label: "Projects",
                        },
                        { id: "skills" as Tab, icon: Code, label: "Skills" },
                        {
                          id: "experiences" as Tab,
                          icon: Building2,
                          label: "Experience",
                        },
                        {
                          id: "education" as Tab,
                          icon: GraduationCap,
                          label: "Education",
                        },
                        {
                          id: "certifications" as Tab,
                          icon: Award,
                          label: "Certifications",
                        },
                        { id: "profile" as Tab, icon: User, label: "Profile" },
                        {
                          id: "settings" as Tab,
                          icon: Settings,
                          label: "Settings",
                        },
                      ].find((tab) => tab.id === activeTab)!.icon,
                      {
                        size: 20,
                        className: "text-neutral-900 dark:text-white",
                      },
                    )}
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {
                        [
                          {
                            id: "projects" as Tab,
                            icon: Briefcase,
                            label: "Projects",
                          },
                          { id: "skills" as Tab, icon: Code, label: "Skills" },
                          {
                            id: "experiences" as Tab,
                            icon: Building2,
                            label: "Experience",
                          },
                          {
                            id: "education" as Tab,
                            icon: GraduationCap,
                            label: "Education",
                          },
                          {
                            id: "certifications" as Tab,
                            icon: Award,
                            label: "Certifications",
                          },
                          {
                            id: "profile" as Tab,
                            icon: User,
                            label: "Profile",
                          },
                          {
                            id: "settings" as Tab,
                            icon: Settings,
                            label: "Settings",
                          },
                        ].find((tab) => tab.id === activeTab)!.label
                      }
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all"
              >
                <Menu
                  size={18}
                  className="text-neutral-600 dark:text-neutral-400"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loading skeletons
            <>
              {activeTab === "projects" && <GridSkeleton count={6} />}
              {activeTab === "skills" && <GridSkeleton count={9} />}
              {activeTab === "experiences" && <ListSkeleton count={4} />}
              {activeTab === "education" && <ListSkeleton count={3} />}
              {activeTab === "certifications" && <ListSkeleton count={3} />}
              {activeTab === "profile" && <ProfileSkeleton />}
            </>
          ) : (
            // Actual content
            <>
              {activeTab === "projects" && (
                <ProjectsTab
                  projects={projects}
                  apiKey={apiKey}
                  uploading={uploading}
                  uploadImage={uploadImage}
                  fetchProjects={fetchProjects}
                />
              )}
              {activeTab === "skills" && (
                <SkillsTab
                  skills={skills}
                  apiKey={apiKey}
                  uploading={uploading}
                  uploadTechLogo={() => Promise.resolve(null)}
                  fetchSkills={fetchSkills}
                />
              )}
              {activeTab === "experiences" && (
                <ExperiencesTab
                  experiences={experiences}
                  apiKey={apiKey}
                  fetchExperiences={fetchExperiences}
                />
              )}
              {activeTab === "education" && (
                <EducationTab
                  education={education}
                  apiKey={apiKey}
                  fetchEducation={fetchEducation}
                />
              )}
              {activeTab === "certifications" && (
                <CertificationsTab
                  certifications={certifications}
                  apiKey={apiKey}
                  fetchCertifications={fetchCertifications}
                />
              )}
              {activeTab === "profile" && (
                <ProfileTab
                  profile={profile}
                  apiKey={apiKey}
                  uploading={uploading}
                  uploadImage={uploadImage}
                  fetchProfile={fetchProfile}
                />
              )}
              {activeTab === "settings" && <SettingsTab apiKey={apiKey} />}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
