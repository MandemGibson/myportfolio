"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Skill {
  id: number;
  name: string;
  category: string;
  iconSlug?: string;
}

interface SkillsSectionProps {
  skills: Record<string, Skill[]>;
  darkMode: boolean;
}

export default function SkillsSection({
  skills,
  darkMode,
}: SkillsSectionProps) {
  const allSkills = Object.values(skills).flat();

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
          className="flex flex-wrap justify-center gap-4"
        >
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-5 py-3 border rounded-full text-sm font-medium transition-all cursor-default flex items-center gap-2 ${
                darkMode
                  ? "bg-white/5 hover:bg-white/10 border-white/10"
                  : "bg-black/5 hover:bg-black/10 border-black/10"
              }`}
            >
              {skill.iconSlug && (
                <Image
                  src={`https://cdn.simpleicons.org/${skill.iconSlug}`}
                  alt={skill.name}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
