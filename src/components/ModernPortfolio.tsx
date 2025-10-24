"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Palette,
  Terminal,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

interface ModernPortfolioProps {
  onSwitchToTerminal: () => void;
}

export default function ModernPortfolio({
  onSwitchToTerminal,
}: ModernPortfolioProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const skills = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    backend: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB"],
    tools: ["Docker", "AWS", "Git", "VS Code", "Figma"],
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/300",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates",
      tech: ["React", "Express.js", "MongoDB", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/300",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather application with location-based forecasts",
      tech: ["React", "TypeScript", "OpenWeather API"],
      liveUrl: "#",
      githubUrl: "#",
      image: "/api/placeholder/400/300",
    },
  ];

  const experience = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp",
      period: "2022 - Present",
      highlights: [
        "Led development of microservices architecture",
        "Improved application performance by 40%",
        "Mentored junior developers",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      highlights: [
        "Built responsive web applications",
        "Implemented CI/CD pipelines",
        "Collaborated with cross-functional teams",
      ],
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message! I'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

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
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-2xl shadow-cyan-500/10"
      >
        <div className="flex justify-between items-center space-x-4 md:space-x-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Philip Gibson Cudjoe
          </motion.div>

          <nav className="hidden md:flex space-x-6">
            <a
              href="#about"
              className="px-3 py-1 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
            >
              About
            </a>
            <a
              href="#skills"
              className="px-3 py-1 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="px-3 py-1 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="px-3 py-1 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="px-3 py-1 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden md:block p-2 rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onSwitchToTerminal}
              className="hidden md:block p-2 rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
              title="Switch to Terminal Mode"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
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
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl px-6 py-4 shadow-2xl shadow-cyan-500/10"
          >
            <nav className="flex flex-col space-y-3">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
              >
                Projects
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
              >
                Experience
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300"
              >
                Contact
              </a>
              <div className="border-t border-cyan-400/20 pt-3 mt-3 flex justify-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
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
                  className="p-2 rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
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
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Full Stack
              </span>
              <br />
              <span className="text-white">Developer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
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
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                <Download className="w-5 h-5 inline mr-2" />
                Download Resume
              </button>
              <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300">
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
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-400/20 mb-6">
              <span className="text-cyan-400 font-medium text-sm tracking-wide uppercase">
                Technical Expertise
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Skills & Tools
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30">
                      {category === "frontend" && (
                        <Palette className="w-8 h-8 text-cyan-400" />
                      )}
                      {category === "backend" && (
                        <Database className="w-8 h-8 text-blue-400" />
                      )}
                      {category === "tools" && (
                        <Cloud className="w-8 h-8 text-purple-400" />
                      )}
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-3xl font-bold capitalize mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <p className="text-gray-400">
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
                      className="group/skill relative p-4 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300"
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
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover/skill:opacity-100 transition-opacity"></div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
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
                color: "from-cyan-400 to-blue-500",
              },
              {
                label: "Projects Completed",
                value: "50+",
                color: "from-blue-500 to-purple-500",
              },
              {
                label: "Technologies",
                value: "15+",
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Happy Clients",
                value: "25+",
                color: "from-pink-500 to-red-500",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/30"
              >
                <div
                  className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
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
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Project image/icon section */}
                <div className="relative h-64 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                      <Code className="w-16 h-16 text-cyan-400" />
                    </div>
                  </div>

                  {/* Tech badges */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-black/40 backdrop-blur-sm text-cyan-300 text-xs rounded-full border border-cyan-400/30"
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
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={project.liveUrl}
                        className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-full border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-2 bg-gradient-to-r from-gray-600/20 to-gray-700/20 hover:from-gray-600/30 hover:to-gray-700/30 rounded-full border border-gray-500/30 hover:border-gray-500/50 transition-all duration-300"
                      >
                        <Github className="w-4 h-4 text-gray-400" />
                      </a>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 rounded-full text-sm border border-cyan-400/20 hover:border-cyan-400/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project stats */}
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>
                        Status: <span className="text-green-400">Live</span>
                      </span>
                      <span>
                        Type: <span className="text-blue-400">Full Stack</span>
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
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Building innovative solutions and leading teams to success
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-10 md:left-1/2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 transform md:-translate-x-0.5"></div>

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
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform md:-translate-x-2 z-10 border-4 border-gray-900"></div>

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
                      className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
                      </div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-xs font-medium text-cyan-300 mb-3 border border-cyan-400/30">
                              {index === 0 ? "Current Role" : "Previous Role"}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                              {job.role}
                            </h3>
                            <p className="text-lg text-gray-300 font-medium">
                              {job.company}
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 flex-shrink-0">
                            <div className="px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600/30">
                              <span className="text-gray-300 text-sm font-medium">
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
                              <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 mr-4"></div>
                              <p className="text-gray-300 leading-relaxed group-hover/item:text-gray-200 transition-colors">
                                {highlight}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom accent */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-gray-400 text-sm">
                                Active Experience
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-cyan-400 font-semibold text-sm">
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
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
              <h3 className="text-2xl font-semibold">
                Let&apos;s work together!
              </h3>
              <p className="text-gray-300">
                I&apos;m always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                I&apos;ll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:themaingib@gmail.com"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  themaingib@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/alexdeveloper"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-3" />
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/alexdeveloper"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Philip Gibson Cudjoe. Built with Next.js and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
