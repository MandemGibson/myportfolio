"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
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
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg"
      >
        <div className="flex justify-between items-center space-x-4 md:space-x-8">
          <div className="text-lg font-semibold text-neutral-900 dark:text-white">
            philipgibsoncudjoe
          </div>

          <nav className="hidden md:flex space-x-6">
            <a
              href="#about"
              className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
            >
              About
            </a>
            <a
              href="#skills"
              className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-all duration-200"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden md:block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onSwitchToTerminal}
              className="hidden md:block p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
              title="Switch to Terminal Mode"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-2xl px-6 py-4 shadow-lg"
          >
            <nav className="flex flex-col space-y-3">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-all duration-300"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-all duration-300"
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-all duration-300"
              >
                Projects
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-all duration-300"
              >
                Experience
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-all duration-300"
              >
                Contact
              </a>
              <div className="border-t border-neutral-700 pt-3 mt-3 flex justify-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all duration-300"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchToTerminal();
                  }}
                  className="p-2 rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all duration-300"
                  title="Switch to Terminal Mode"
                >
                  <Terminal className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-neutral-900 dark:text-white">
                Full Stack
              </span>
              <br />
              <span className="text-neutral-600 dark:text-neutral-400">
                Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto"
            >
              Building modern web applications with passion and precision.
              Specializing in React, Node.js, and cloud technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200">
                <Download className="w-5 h-5 inline mr-2" />
                Download Resume
              </button>
              <button className="px-8 py-3 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200">
                <Mail className="w-5 h-5 inline mr-2" />
                Get In Touch
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm tracking-wide uppercase">
                Technical Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
              Skills & Tools
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building exceptional digital
              experiences
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      {category === "frontend" && (
                        <Palette className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
                      )}
                      {category === "backend" && (
                        <Database className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
                      )}
                      {category === "tools" && (
                        <Cloud className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
                      )}
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold capitalize mb-1 text-neutral-900 dark:text-white">
                      {category}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {category === "frontend" &&
                        "User interface and experience"}
                      {category === "backend" && "Server-side development"}
                      {category === "tools" && "Development and deployment"}
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      className="group/skill relative p-4 rounded-xl bg-neutral-800/40 backdrop-blur-sm border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {/* Skill Logo */}
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            {skill === "React" && (
                              <div className="w-5 h-5 bg-blue-400 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  R
                                </span>
                              </div>
                            )}
                            {skill === "Next.js" && (
                              <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  N
                                </span>
                              </div>
                            )}
                            {skill === "TypeScript" && (
                              <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  TS
                                </span>
                              </div>
                            )}
                            {skill === "Tailwind CSS" && (
                              <div className="w-5 h-5 bg-cyan-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  T
                                </span>
                              </div>
                            )}
                            {skill === "Framer Motion" && (
                              <div className="w-5 h-5 bg-pink-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  F
                                </span>
                              </div>
                            )}
                            {skill === "Node.js" && (
                              <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  N
                                </span>
                              </div>
                            )}
                            {skill === "Express.js" && (
                              <div className="w-5 h-5 bg-gray-700 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  E
                                </span>
                              </div>
                            )}
                            {skill === "Python" && (
                              <div className="w-5 h-5 bg-yellow-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  P
                                </span>
                              </div>
                            )}
                            {skill === "PostgreSQL" && (
                              <div className="w-5 h-5 bg-blue-800 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  P
                                </span>
                              </div>
                            )}
                            {skill === "MongoDB" && (
                              <div className="w-5 h-5 bg-green-700 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  M
                                </span>
                              </div>
                            )}
                            {skill === "Docker" && (
                              <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  D
                                </span>
                              </div>
                            )}
                            {skill === "AWS" && (
                              <div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  A
                                </span>
                              </div>
                            )}
                            {skill === "Git" && (
                              <div className="w-5 h-5 bg-red-600 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  G
                                </span>
                              </div>
                            )}
                            {skill === "VS Code" && (
                              <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  V
                                </span>
                              </div>
                            )}
                            {skill === "Figma" && (
                              <div className="w-5 h-5 bg-purple-600 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  F
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="font-semibold text-gray-200 group-hover/skill:text-white transition-colors">
                            {skill}
                          </span>
                        </div>
                        <div className="w-2 h-2 bg-neutral-600 rounded-full opacity-60 group-hover/skill:opacity-100 transition-opacity"></div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-neutral-700/5 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                label: "Years Experience",
                value: "5+",
              },
              {
                label: "Projects Completed",
                value: "50+",
              },
              {
                label: "Technologies",
                value: "15+",
              },
              {
                label: "Happy Clients",
                value: "25+",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-neutral-800/40 backdrop-blur-sm border border-neutral-700"
              >
                <div className="text-4xl font-bold mb-2 text-neutral-100 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-neutral-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-neutral-900 dark:text-white">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Innovative solutions that push the boundaries of web development
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group relative bg-neutral-800/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-neutral-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Project image/icon section */}
                <div className="relative h-64 bg-neutral-800/40 overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                      <Code className="w-16 h-16 text-neutral-400" />
                    </div>
                  </div>

                  {/* Tech badges */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neutral-900/40 backdrop-blur-sm text-neutral-300 text-xs rounded-full border border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project content */}
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-neutral-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={project.liveUrl}
                        className="p-2 bg-neutral-700/20 hover:bg-neutral-700/30 rounded-full border border-neutral-600 hover:border-neutral-500 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 text-neutral-400" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-2 bg-neutral-700/20 hover:bg-neutral-700/30 rounded-full border border-neutral-600 hover:border-neutral-500 transition-all duration-300"
                      >
                        <Github className="w-4 h-4 text-neutral-400" />
                      </a>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neutral-700/20 text-neutral-300 rounded-full text-sm border border-neutral-600 hover:border-neutral-500 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project stats */}
                  <div className="mt-6 pt-6 border-t border-neutral-700">
                    <div className="flex justify-between text-sm text-neutral-400">
                      <span>
                        Status: <span className="text-neutral-300">Live</span>
                      </span>
                      <span>
                        Type:{" "}
                        <span className="text-neutral-300">Full Stack</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-neutral-900 dark:text-white">
                Career Journey
              </span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Building innovative solutions and leading teams to success
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-10 md:left-1/2 top-8 bottom-0 w-0.5 bg-neutral-700 transform md:-translate-x-0.5"></div>

            <div className="space-y-16">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-neutral-600 rounded-full transform md:-translate-x-2 z-10 border-4 border-gray-900"></div>

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-neutral-700 transition-all duration-500 overflow-hidden"
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-neutral-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-700/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-neutral-600/20 rounded-full blur-2xl"></div>
                      </div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-neutral-700/30 rounded-full text-xs font-medium text-neutral-300 mb-3 border border-neutral-600">
                              {index === 0 ? "Current Role" : "Previous Role"}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                              {job.role}
                            </h3>
                            <p className="text-lg text-neutral-300 font-medium">
                              {job.company}
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 flex-shrink-0">
                            <div className="px-4 py-2 bg-neutral-700/30 rounded-2xl border border-neutral-600">
                              <span className="text-neutral-300 text-sm font-medium">
                                {job.period}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-3">
                          {job.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.5 }}
                              className="flex items-start group/item"
                            >
                              <div className="flex-shrink-0 w-2 h-2 bg-neutral-600 rounded-full mt-2 mr-4"></div>
                              <p className="text-neutral-300 leading-relaxed group-hover/item:text-neutral-200 transition-colors">
                                {highlight}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom accent */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-neutral-600 rounded-full animate-pulse"></div>
                              <span className="text-neutral-400 text-sm">
                                Active Experience
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-neutral-400 font-semibold text-sm">
                                {index === 0 ? "2+ Years" : "Completed"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            <span className="text-neutral-900 dark:text-white">
              Get In Touch
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                Let&apos;s work together!
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                I&apos;m always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                I&apos;ll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:themaingib@gmail.com"
                  className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  themaingib@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/alexdeveloper"
                  className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-3" />
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/alexdeveloper"
                  className="flex items-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5 mr-3" />
                  GitHub Profile
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleContactSubmit}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:border-neutral-500 focus:outline-none transition-colors text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:border-neutral-500 focus:outline-none transition-colors text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-300">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:border-neutral-500 focus:outline-none transition-colors resize-none text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-neutral-800 text-white rounded-lg font-semibold hover:bg-neutral-700 hover:shadow-lg transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-400">
            © 2024 Philip Gibson Cudjoe. Built with Next.js and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
