"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import type { Education } from "@/types/admin";

interface EducationTabProps {
  education: Education[];
  apiKey: string;
  fetchEducation: () => void;
}

export default function EducationTab({
  education,
  apiKey,
  fetchEducation,
}: EducationTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    gpa: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/education", {
        method: editingEducation ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(
          editingEducation
            ? { id: editingEducation.id, ...formData }
            : formData,
        ),
      });

      if (response.ok) {
        alert(
          `Education ${editingEducation ? "updated" : "created"} successfully!`,
        );
        setShowForm(false);
        setEditingEducation(null);
        setFormData({
          degree: "",
          institution: "",
          period: "",
          gpa: "",
          description: "",
        });
        fetchEducation();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save education");
      }
    } catch (error) {
      console.error("Error saving education:", error);
      alert("Failed to save education");
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      gpa: edu.gpa || "",
      description: edu.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      const response = await fetch(`/api/education?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        alert("Education deleted successfully!");
        fetchEducation();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      alert("Failed to delete education");
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
            Education
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {education.length} entries
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingEducation(null);
            setFormData({
              degree: "",
              institution: "",
              period: "",
              gpa: "",
              description: "",
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
        >
          <Plus size={16} />
          Add Education
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
              {editingEducation ? "Edit Education" : "Add New Education"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingEducation(null);
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
                  Degree *
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="Bachelor of Science in Computer Science"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Institution *
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
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
                  placeholder="2018 - 2022"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={(e) =>
                    setFormData({ ...formData, gpa: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                rows={3}
                placeholder="Honors, relevant coursework, activities..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
              >
                <Save size={16} />
                {editingEducation ? "Update Education" : "Add Education"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingEducation(null);
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
        {education.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {edu.institution}
                </p>
                <div className="flex gap-3 mt-2 text-sm text-neutral-500 dark:text-neutral-500">
                  <span>{edu.period}</span>
                  {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                </div>
                {edu.description && (
                  <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                    {edu.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
