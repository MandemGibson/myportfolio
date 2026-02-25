"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface SettingsTabProps {
  apiKey: string;
}

export default function SettingsTab({ apiKey }: SettingsTabProps) {
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
