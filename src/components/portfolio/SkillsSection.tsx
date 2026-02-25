"use client";

import { motion } from "framer-motion";

interface SkillsSectionProps {
  skills: string[];
  darkMode: boolean;
}

export default function SkillsSection({
  skills,
  darkMode,
}: SkillsSectionProps) {
  return (
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
          <p className={darkMode ? "text-neutral-400" : "text-neutral-600"}>
            Tools and technologies I work with
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-5 py-2.5 border rounded-full text-sm font-medium transition-all cursor-default ${
                darkMode
                  ? "bg-white/5 hover:bg-white/10 border-white/10"
                  : "bg-black/5 hover:bg-black/10 border-black/10"
              }`}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
