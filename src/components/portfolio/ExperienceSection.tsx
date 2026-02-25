"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Check, GraduationCap, Award } from "lucide-react";

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

interface ExperienceSectionProps {
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  darkMode: boolean;
}

export default function ExperienceSection({
  experience,
  education,
  certifications,
  darkMode,
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className={darkMode ? "text-neutral-400" : "text-neutral-600"}>
            My professional journey
          </p>
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative pl-8 border-l-2 ${
                darkMode ? "border-white/10" : "border-black/10"
              }`}
            >
              <div
                className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-2 ${
                  darkMode
                    ? "bg-white border-[#0a0a0f]"
                    : "bg-black border-white"
                }`}
              ></div>
              <div
                className={`border rounded-xl p-6 ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <div
                      className={`flex items-center gap-2 ${
                        darkMode ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      <Briefcase size={14} />
                      <span>{exp.company}</span>
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm mt-2 md:mt-0 ${
                      darkMode ? "text-neutral-500" : "text-neutral-600"
                    }`}
                  >
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm ${
                        darkMode ? "text-neutral-300" : "text-neutral-700"
                      }`}
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
        {education.length > 0 && (
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
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-xl p-5 ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-black/5 border-black/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        darkMode ? "bg-white/5" : "bg-black/5"
                      }`}
                    >
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{edu.degree}</h4>
                      <p
                        className={`text-sm mb-1 ${
                          darkMode ? "text-neutral-400" : "text-neutral-600"
                        }`}
                      >
                        {edu.institution}
                      </p>
                      <div
                        className={`flex items-center gap-3 text-xs ${
                          darkMode ? "text-neutral-500" : "text-neutral-600"
                        }`}
                      >
                        <span>{edu.period}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      </div>
                      {edu.description && (
                        <p
                          className={`text-sm mt-2 ${
                            darkMode ? "text-neutral-400" : "text-neutral-600"
                          }`}
                        >
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
        {certifications.length > 0 && (
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
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border rounded-xl p-4 text-center ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-black/5 border-black/10"
                  }`}
                >
                  <div
                    className={`inline-flex p-3 rounded-full mb-3 ${
                      darkMode ? "bg-white/5" : "bg-black/5"
                    }`}
                  >
                    <Award size={24} />
                  </div>
                  <h4 className="font-semibold mb-1">{cert.name}</h4>
                  <p
                    className={`text-sm mb-1 ${
                      darkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {cert.issuer}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-neutral-500" : "text-neutral-600"
                    }`}
                  >
                    {cert.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
