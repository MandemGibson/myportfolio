"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  status: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  darkMode: boolean;
}

export default function ProjectsSection({
  projects,
  darkMode,
}: ProjectsSectionProps) {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className={`py-20 px-6 ${
        darkMode ? "bg-white/[0.02]" : "bg-black/[0.02]"
      }`}
    >
      {" "}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className={darkMode ? "text-neutral-400" : "text-neutral-600"}>
            Recent work and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-all group ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:border-white/20"
                  : "bg-black/5 border-black/10 hover:border-black/20"
              }`}
            >
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    {project.status}
                  </span>
                </div>
                <p
                  className={`mb-4 text-sm ${
                    darkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs rounded-md ${
                        darkMode
                          ? "bg-white/5 text-neutral-300"
                          : "bg-black/5 text-neutral-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:text-white/80 transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:text-white/80 transition-colors"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border rounded-xl p-5 transition-all ${
                    darkMode
                      ? "bg-white/5 border-white/10 hover:border-white/20"
                      : "bg-black/5 border-black/10 hover:border-black/20"
                  }`}
                >
                  <h4 className="font-semibold mb-2">{project.title}</h4>
                  <p
                    className={`text-sm mb-3 ${
                      darkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 text-xs rounded ${
                          darkMode
                            ? "bg-white/5 text-neutral-300"
                            : "bg-black/5 text-neutral-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white/80 transition-colors"
                      >
                        <ExternalLink size={14} className="inline" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white/80 transition-colors"
                      >
                        <Github size={14} className="inline" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
