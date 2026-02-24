"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  User,
  Briefcase,
  Code,
  Settings,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imagePublicId?: string;
  status: string;
  type: string;
  featured: boolean;
  preview?: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  logo?: string;
  publicId?: string;
}

interface Profile {
  id: number;
  name: string;
  title: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio: string;
  location?: string;
  availability?: string;
  avatar?: string;
  avatarPublicId?: string;
}

type Tab = "projects" | "skills" | "profile" | "settings";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);

  // Skills state
  const [skills, setSkills] = useState<Record<string, Skill[]>>({});

  // Profile state
  const [profile, setProfile] = useState<Profile | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      await Promise.all([fetchProjects(), fetchSkills(), fetchProfile()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("admin_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsAuthenticated(true);
      fetchData();
    }
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

  const handleLogin = () => {
    if (apiKey) {
      localStorage.setItem("admin_api_key", apiKey);
      setIsAuthenticated(true);
      fetchData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_api_key");
    setApiKey("");
    setIsAuthenticated(false);
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

  const uploadTechLogo = async (
    file: File,
    techName: string,
    skillId?: number,
  ): Promise<{ url: string; publicId: string } | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("techName", techName);
      if (skillId) formData.append("skillId", skillId.toString());

      const response = await fetch("/api/upload/tech-logo", {
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
        alert(error.error || "Failed to upload logo");
        return null;
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo");
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all text-sm font-medium"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto bg-white dark:bg-neutral-900 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
          {[
            { id: "projects" as Tab, icon: Briefcase, label: "Projects" },
            { id: "skills" as Tab, icon: Code, label: "Skills" },
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

        {/* Content */}
        <AnimatePresence mode="wait">
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
              uploadTechLogo={uploadTechLogo}
              fetchSkills={fetchSkills}
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
        </AnimatePresence>
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({
  projects,
  apiKey,
  uploading,
  uploadImage,
  fetchProjects,
}: {
  projects: Project[];
  apiKey: string;
  uploading: boolean;
  uploadImage: (
    file: File,
    folder: string,
  ) => Promise<{ url: string; publicId: string } | null>;
  fetchProjects: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    tech: [],
    liveUrl: "",
    githubUrl: "",
    image: "",
    imagePublicId: "",
    status: "Live",
    type: "Full Stack",
    featured: false,
    preview: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadImage(file, "portfolio/projects");
      if (result) {
        setFormData({
          ...formData,
          image: result.url,
          imagePublicId: result.publicId,
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingProject
      ? `/api/portfolio/projects/${editingProject.id}`
      : "/api/portfolio/projects";
    const method = editingProject ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          `Project ${editingProject ? "updated" : "created"} successfully!`,
        );
        setShowForm(false);
        setEditingProject(null);
        setFormData({
          title: "",
          description: "",
          tech: [],
          liveUrl: "",
          githubUrl: "",
          image: "",
          imagePublicId: "",
          status: "Live",
          type: "Full Stack",
          featured: false,
          preview: "",
        });
        fetchProjects();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/portfolio/projects/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        alert("Project deleted successfully!");
        fetchProjects();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Projects
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {projects.length} total projects
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProject(null);
            setFormData({
              title: "",
              description: "",
              tech: [],
              liveUrl: "",
              githubUrl: "",
              image: "",
              imagePublicId: "",
              status: "Live",
              type: "Full Stack",
              featured: false,
              preview: "",
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {editingProject ? "Edit Project" : "Create New Project"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProject(null);
              }}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option>Full Stack</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Mobile</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Preview Text
              </label>
              <textarea
                value={formData.preview}
                onChange={(e) =>
                  setFormData({ ...formData, preview: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tech?.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tech: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Live URL
                </label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, liveUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                >
                  <option>Live</option>
                  <option>In Development</option>
                  <option>Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                  />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Featured Project
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Project Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="project-image"
                />
                <label
                  htmlFor="project-image"
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer transition-all text-sm font-medium"
                >
                  <Upload size={16} />
                  {uploading ? "Uploading..." : "Upload Image"}
                </label>
                {formData.image && (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all disabled:opacity-50 text-sm font-medium"
              >
                <Save size={16} />
                {editingProject ? "Update Project" : "Create Project"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {project.type}
                  </span>
                </div>
                {project.featured && (
                  <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-md font-medium">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-md">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-lg transition-all text-sm font-medium"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-all text-sm font-medium"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Skills Tab Component
function SkillsTab({
  skills,
  apiKey,
  uploading,
  uploadTechLogo,
  fetchSkills,
}: {
  skills: Record<string, Skill[]>;
  apiKey: string;
  uploading: boolean;
  uploadTechLogo: (
    file: File,
    techName: string,
    skillId?: number,
  ) => Promise<{ url: string; publicId: string } | null>;
  fetchSkills: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    logo: "",
    publicId: "",
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formData.name) {
      const result = await uploadTechLogo(
        file,
        formData.name,
        editingSkill?.id,
      );
      if (result) {
        setFormData({
          ...formData,
          logo: result.url,
          publicId: result.publicId,
        });
      }
    } else if (!formData.name) {
      alert("Please enter a skill name first");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = "/api/skills";
    const method = editingSkill ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(
          editingSkill ? { id: editingSkill.id, ...formData } : formData,
        ),
      });

      if (response.ok) {
        alert(`Skill ${editingSkill ? "updated" : "created"} successfully!`);
        setShowForm(false);
        setEditingSkill(null);
        setFormData({ name: "", category: "frontend", logo: "", publicId: "" });
        fetchSkills();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save skill");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      logo: skill.logo || "",
      publicId: skill.publicId || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/skills?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        alert("Skill deleted successfully!");
        fetchSkills();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill");
    }
  };

  const totalSkills = Object.values(skills).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Skills
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {totalSkills} total skills
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingSkill(null);
            setFormData({
              name: "",
              category: "frontend",
              logo: "",
              publicId: "",
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
        >
          <Plus size={16} />
          New Skill
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {editingSkill ? "Edit Skill" : "Create New Skill"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingSkill(null);
              }}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="tools">Tools</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Tech Logo
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="skill-logo"
                />
                <label
                  htmlFor="skill-logo"
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer transition-all text-sm font-medium"
                >
                  <Upload size={16} />
                  {uploading ? "Uploading..." : "Upload Logo"}
                </label>
                {formData.logo && (
                  <Image
                    src={formData.logo}
                    alt="Logo Preview"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain rounded-lg bg-white dark:bg-neutral-800 p-2 border border-neutral-200 dark:border-neutral-700"
                  />
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                Enter skill name first, then upload logo
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all disabled:opacity-50 text-sm font-medium"
              >
                <Save size={16} />
                {editingSkill ? "Update Skill" : "Create Skill"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                }}
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-5">
        {Object.entries(skills).map(([category, categorySkills]) => (
          <div
            key={category}
            className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800"
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 capitalize">
              {category}{" "}
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                ({categorySkills.length})
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all group border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    {skill.logo ? (
                      <Image
                        src={skill.logo}
                        alt={skill.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
                        <Code
                          size={24}
                          className="text-neutral-400 dark:text-neutral-500"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      {skill.name}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded transition-all"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Profile Tab Component
function ProfileTab({
  profile,
  apiKey,
  uploading,
  uploadImage,
  fetchProfile,
}: {
  profile: Profile | null;
  apiKey: string;
  uploading: boolean;
  uploadImage: (
    file: File,
    folder: string,
  ) => Promise<{ url: string; publicId: string } | null>;
  fetchProfile: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>(
    profile || {
      name: "",
      title: "",
      email: "",
      bio: "",
      location: "",
      availability: "",
      linkedin: "",
      github: "",
      twitter: "",
      avatar: "",
      avatarPublicId: "",
    },
  );

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadImage(file, "portfolio/avatar");
      if (result) {
        setFormData({
          ...formData,
          avatar: result.url,
          avatarPublicId: result.publicId,
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setEditing(false);
        fetchProfile();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Profile Information
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your portfolio profile
          </p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {formData.avatar ? (
                  <Image
                    src={formData.avatar}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover border-4 border-neutral-200 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border-4 border-neutral-200 dark:border-neutral-700">
                    <User
                      size={48}
                      className="text-neutral-400 dark:text-neutral-500"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full cursor-pointer hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all"
                >
                  <Upload size={16} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="Available for new opportunities"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Bio *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                rows={4}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all disabled:opacity-50 text-sm font-medium"
              >
                <Save size={16} />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  if (profile) setFormData(profile);
                }}
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name || "Avatar"}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-4 border-neutral-200 dark:border-neutral-700"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border-4 border-neutral-200 dark:border-neutral-700">
                  <User
                    size={40}
                    className="text-neutral-400 dark:text-neutral-500"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {profile?.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {profile?.title}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {profile?.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Email
                </p>
                <p className="text-neutral-900 dark:text-white">
                  {profile?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                  Availability
                </p>
                <p className="text-neutral-900 dark:text-white">
                  {profile?.availability || "N/A"}
                </p>
              </div>

              {profile?.linkedin && (
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    LinkedIn
                  </p>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 break-all underline decoration-neutral-300 dark:decoration-neutral-700"
                  >
                    {profile.linkedin}
                  </a>
                </div>
              )}

              {profile?.github && (
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    GitHub
                  </p>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 break-all underline decoration-neutral-300 dark:decoration-neutral-700"
                  >
                    {profile.github}
                  </a>
                </div>
              )}

              {profile?.twitter && (
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    Twitter
                  </p>
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 break-all underline decoration-neutral-300 dark:decoration-neutral-700"
                  >
                    {profile.twitter}
                  </a>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Bio
              </p>
              <p className="text-neutral-900 dark:text-white">{profile?.bio}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Settings Tab Component
function SettingsTab({ apiKey }: { apiKey: string }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Settings
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Manage your admin configuration
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            API Configuration
          </h3>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Current API Key
            </label>
            <div className="flex gap-2">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 text-sm"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            API Endpoints
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                Projects
              </span>
              <code className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                /api/portfolio/projects
              </code>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                Skills
              </span>
              <code className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                /api/skills
              </code>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                Profile
              </span>
              <code className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                /api/profile
              </code>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                Upload Image
              </span>
              <code className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                /api/upload
              </code>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                Upload Tech Logo
              </span>
              <code className="text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                /api/upload/tech-logo
              </code>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Documentation
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
            For detailed API documentation, see BACKEND_API.md in the project
            root.
          </p>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
              <strong>Authentication:</strong> All write operations require the
              x-api-key header
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              <strong>Image Uploads:</strong> Automatically optimized and stored
              in Cloudinary
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
