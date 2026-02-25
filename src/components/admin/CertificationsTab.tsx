"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, Award } from "lucide-react";
import type { Certification } from "@/types/admin";

interface CertificationsTabProps {
  certifications: Certification[];
  apiKey: string;
  fetchCertifications: () => void;
}

export default function CertificationsTab({
  certifications,
  apiKey,
  fetchCertifications,
}: CertificationsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    year: "",
    credentialId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/certifications", {
        method: editingCertification ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(
          editingCertification
            ? { id: editingCertification.id, ...formData }
            : formData,
        ),
      });

      if (response.ok) {
        alert(
          `Certification ${editingCertification ? "updated" : "created"} successfully!`,
        );
        setShowForm(false);
        setEditingCertification(null);
        setFormData({ name: "", issuer: "", year: "", credentialId: "" });
        fetchCertifications();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save certification");
      }
    } catch (error) {
      console.error("Error saving certification:", error);
      alert("Failed to save certification");
    }
  };

  const handleEdit = (cert: Certification) => {
    setEditingCertification(cert);
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      year: cert.year,
      credentialId: cert.credentialId || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;

    try {
      const response = await fetch(`/api/certifications?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        alert("Certification deleted successfully!");
        fetchCertifications();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete certification");
      }
    } catch (error) {
      console.error("Error deleting certification:", error);
      alert("Failed to delete certification");
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
            Certifications
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {certifications.length} certifications
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCertification(null);
            setFormData({ name: "", issuer: "", year: "", credentialId: "" });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
        >
          <Plus size={16} />
          Add Certification
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
              {editingCertification
                ? "Edit Certification"
                : "Add New Certification"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingCertification(null);
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
                  Certification Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="Amazon Web Services"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Year Obtained *
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) =>
                    setFormData({ ...formData, credentialId: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all text-sm"
                  placeholder="ABC-123-DEF"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all text-sm font-medium"
              >
                <Save size={16} />
                {editingCertification
                  ? "Update Certification"
                  : "Add Certification"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCertification(null);
                }}
                className="px-6 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Award
                  size={20}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(cert)}
                  className="p-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-all"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-1 line-clamp-2">
              {cert.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {cert.issuer}
            </p>
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
              <span>{cert.year}</span>
              {cert.credentialId && (
                <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  {cert.credentialId}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
