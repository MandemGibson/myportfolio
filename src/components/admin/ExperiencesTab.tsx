"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import type { Experience } from "@/types/admin";

interface ExperiencesTabProps {
  experiences: Experience[];
  apiKey: string;
  fetchExperiences: () => void;
}

export default function ExperiencesTab({
  experiences,
  apiKey,
  fetchExperiences,
}: ExperiencesTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    period: "",
    highlights: [""],
    current: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/experiences", {
        method: editingExperience ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(
          editingExperience
            ? { id: editingExperience.id, ...formData }
            : formData,
        ),
      });

      if (response.ok) {
        alert(
          `Experience ${editingExperience ? "updated" : "created"} successfully!`,
        );
        setShowForm(false);
        setEditingExperience(null);
        setFormData({
          role: "",
          company: "",
          period: "",
          highlights: [""],
          current: false,
        });
        fetchExperiences();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save experience");
      }
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Failed to save experience");
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      role: experience.role,
      company: experience.company,
      period: experience.period,
      highlights:
        experience.highlights.length > 0 ? experience.highlights : [""],
      current: experience.current,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const response = await fetch(`/api/experiences?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        alert("Experience deleted successfully!");
        fetchExperiences();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Failed to delete experience");
    }
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
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
            Work Experience
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {experiences.length} positions
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingExperience(null);
            setFormData({
              role: "",
              company: "",
              period: "",
              highlights: [""],
              current: false,
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
        >
          <Plus size={16} />
          New Experience
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
              {editingExperience ? "Edit Experience" : "Add New Experience"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingExperience(null);
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
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Company *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Period *
                </label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) =>
                    setFormData({ ...formData, period: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="Jan 2020 - Present"
                  required
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) =>
                      setFormData({ ...formData, current: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                  />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Current Position
                  </span>
                </label>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Key Achievements & Responsibilities
                </label>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-all"
                >
                  <Plus size={14} />
                  Add Point
                </button>
              </div>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                      placeholder="Describe an achievement or responsibility"
                    />
                    {formData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
              >
                <Save size={16} />
                {editingExperience ? "Update Experience" : "Add Experience"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingExperience(null);
                }}
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {experience.role}
                  </h3>
                  {experience.current && (
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {experience.company}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {experience.period}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(experience)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {experience.highlights.length > 0 && (
              <ul className="space-y-1 ml-4">
                {experience.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="text-sm text-neutral-700 dark:text-neutral-300 list-disc"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
