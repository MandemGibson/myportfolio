"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Edit, Save, Upload, User } from "lucide-react";
import type { Profile } from "@/types/admin";

interface ProfileTabProps {
  profile: Profile | null;
  apiKey: string;
  uploading: boolean;
  uploadImage: (
    file: File,
    folder: string,
  ) => Promise<{ url: string; publicId: string } | null>;
  fetchProfile: () => void;
}

export default function ProfileTab({
  profile,
  apiKey,
  uploading,
  uploadImage,
  fetchProfile,
}: ProfileTabProps) {
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

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const result = await uploadImage(file, "portfolio/resume");
      if (result) {
        setFormData({
          ...formData,
          resume: result.url,
          resumePublicId: result.publicId,
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

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Resume (PDF)
                </label>
                <div className="space-y-2">
                  {formData.resume && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="truncate">Current resume uploaded</span>
                      <a
                        href={formData.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 dark:text-white hover:underline"
                      >
                        View
                      </a>
                    </div>
                  )}
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer transition-all text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    {uploading
                      ? "Uploading..."
                      : formData.resume
                        ? "Replace Resume"
                        : "Upload Resume"}
                    <Upload size={16} />
                  </label>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    PDF only, max 5MB
                  </p>
                </div>
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
