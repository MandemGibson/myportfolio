"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";
import type { Project } from "@/types/admin";

interface ProjectsTabProps {
  projects: Project[];
  apiKey: string;
  uploading: boolean;
  uploadImage: (
    file: File,
    folder: string,
  ) => Promise<{ url: string; publicId: string } | null>;
  fetchProjects: () => void;
}

export default function ProjectsTab({
  projects,
  apiKey,
  uploading,
  uploadImage,
  fetchProjects,
}: ProjectsTabProps) {
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
