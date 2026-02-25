"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Moon,
  Sun,
  Menu,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Code2,
  Check,
} from "lucide-react";
import Image from "next/image";

interface ModernPortfolioProps {
  onSwitchToTerminal: () => void;
}

interface Profile {
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
}

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

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  current: boolean;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  description?: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

interface PortfolioData {
  profile: Profile | null;
  skills: Record<string, string[]>;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  stats: any[];
}

export default function ModernPortfolio({
  onSwitchToTerminal,
}: ModernPortfolioProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<PortfolioData>({
    profile: null,
    skills: {},
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    stats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch("/api/portfolio");
      if (response.ok) {
        const portfolioData = await response.json();
        setData(portfolioData);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  // Flatten all skills into a single array
  const allSkills = Object.values(data.skills).flat();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0f] to-[#0a0a0f]"></div>
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [
                Math.random() * 0.7 + 0.3,
                Math.random() * 0.3,
                Math.random() * 0.7 + 0.3,
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-semibold"
              >
                {data.profile?.name || "Portfolio"}
              </motion.div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#about"
                  className="text-sm hover:text-white/80 transition-colors"
                >
                  About
                </a>
                <a
                  href="#skills"
                  className="text-sm hover:text-white/80 transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#work"
                  className="text-sm hover:text-white/80 transition-colors"
                >
                  Work
                </a>
                <a
                  href="#experience"
                  className="text-sm hover:text-white/80 transition-colors"
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  className="text-sm hover:text-white/80 transition-colors"
                >
                  Contact
                </a>
                <button
                  onClick={onSwitchToTerminal}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="Terminal Mode"
                >
                  <Terminal size={18} />
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/5"
              >
                <div className="px-6 py-4 space-y-3">
                  <a
                    href="#about"
                    className="block py-2 hover:text-white/80 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#skills"
                    className="block py-2 hover:text-white/80 transition-colors"
                  >
                    Skills
                  </a>
                  <a
                    href="#work"
                    className="block py-2 hover:text-white/80 transition-colors"
                  >
                    Work
                  </a>
                  <a
                    href="#experience"
                    className="block py-2 hover:text-white/80 transition-colors"
                  >
                    Experience
                  </a>
                  <a
                    href="#contact"
                    className="block py-2 hover:text-white/80 transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center px-6 pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {data.profile?.avatar && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-block"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10">
                  <Image
                    src={data.profile.avatar}
                    alt={data.profile.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              {data.profile?.name || "Full Stack Developer"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-neutral-400 mb-4"
            >
              {data.profile?.title ||
                "Building exceptional digital experiences"}
            </motion.p>

            {data.profile?.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-500 max-w-2xl mx-auto mb-8"
              >
                {data.profile.bio}
              </motion.p>
            )}

            {data.profile?.location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-neutral-500 mb-8"
              >
                <MapPin size={16} />
                <span>{data.profile.location}</span>
                {data.profile.availability && (
                  <>
                    <span className="text-neutral-700">•</span>
                    <span className="text-emerald-400">
                      {data.profile.availability}
                    </span>
                  </>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {data.profile?.github && (
                <a
                  href={data.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              )}
              {data.profile?.linkedin && (
                <a
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              )}
              {data.profile?.email && (
                <a
                  href={`mailto:${data.profile.email}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black rounded-full transition-all font-medium"
                >
                  <Mail size={18} />
                  <span>Contact Me</span>
                </a>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Skills & Technologies
              </h2>
              <p className="text-neutral-400">
                Tools and technologies I work with
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {allSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="py-20 px-6 bg-white/[0.02]">
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
              <p className="text-neutral-400">
                Recent work and personal projects
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
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
                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-neutral-400 mb-4 text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 text-neutral-300 text-xs rounded-md"
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

            {data.projects.filter((p) => !p.featured).length > 0 && (
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
                  {data.projects
                    .filter((p) => !p.featured)
                    .map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                      >
                        <h4 className="font-semibold mb-2">{project.title}</h4>
                        <p className="text-neutral-400 text-sm mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-white/5 text-neutral-300 text-xs rounded"
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

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience
              </h2>
              <p className="text-neutral-400">My professional journey</p>
            </motion.div>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-white/10"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-white border-2 border-[#0a0a0f]"></div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Briefcase size={14} />
                          <span>{exp.company}</span>
                          {exp.current && (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-500 text-sm mt-2 md:mt-0">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-neutral-300 text-sm"
                        >
                          <Check
                            size={16}
                            className="text-emerald-400 mt-0.5 flex-shrink-0"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            {data.education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-16"
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/5 rounded-lg">
                          <GraduationCap size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{edu.degree}</h4>
                          <p className="text-neutral-400 text-sm mb-1">
                            {edu.institution}
                          </p>
                          <div className="flex items-center gap-3 text-neutral-500 text-xs">
                            <span>{edu.period}</span>
                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                          </div>
                          {edu.description && (
                            <p className="text-neutral-400 text-sm mt-2">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-16"
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                    >
                      <div className="inline-flex p-3 bg-white/5 rounded-full mb-3">
                        <Award size={24} />
                      </div>
                      <h4 className="font-semibold mb-1">{cert.name}</h4>
                      <p className="text-neutral-400 text-sm mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-neutral-500 text-xs">{cert.year}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-white/[0.02]">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Work Together
              </h2>
              <p className="text-neutral-400 mb-8">
                I'm always open to discussing new projects, creative ideas or
                opportunities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {data.profile?.email && (
                  <a
                    href={`mailto:${data.profile.email}`}
                    className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-black rounded-full transition-all font-medium"
                  >
                    <Mail size={20} />
                    <span>Send Message</span>
                  </a>
                )}
                {data.profile?.github && (
                  <a
                    href={data.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                )}
                {data.profile?.linkedin && (
                  <a
                    href={data.profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center text-neutral-500 text-sm">
            <p>
              © {new Date().getFullYear()} {data.profile?.name || "Portfolio"}.
              All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
