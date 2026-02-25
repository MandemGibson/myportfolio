"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Edit, Trash2, Save, X, Upload, Code } from "lucide-react";
import type { Skill } from "@/types/admin";

interface SkillsTabProps {
  skills: Record<string, Skill[]>;
  apiKey: string;
  uploading: boolean;
  uploadTechLogo: (
    file: File,
    techName: string,
    skillId?: number,
  ) => Promise<{ url: string; publicId: string } | null>;
  fetchSkills: () => void;
}

export default function SkillsTab({
  skills,
  apiKey,
  uploading,
  uploadTechLogo,
  fetchSkills,
}: SkillsTabProps) {
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
