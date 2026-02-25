"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

interface Profile {
  name: string;
  email: string;
  linkedin?: string;
  github?: string;
}

interface ContactSectionProps {
  profile: Profile | null;
  darkMode: boolean;
}

export default function ContactSection({
  profile,
  darkMode,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={`py-20 px-6 ${
        darkMode ? "bg-white/[0.02]" : "bg-black/[0.02]"
      }`}
    >
      {" "}
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p
            className={`mb-8 ${
              darkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all font-medium ${
                  darkMode
                    ? "bg-white hover:bg-white/90 text-black"
                    : "bg-black hover:bg-black/90 text-white"
                }`}
              >
                <Mail size={20} />
                <span>Send Message</span>
              </a>
            )}
            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-8 py-4 border rounded-full transition-all ${
                  darkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10"
                    : "bg-black/5 hover:bg-black/10 border-black/10"
                }`}
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-8 py-4 border rounded-full transition-all ${
                  darkMode
                    ? "bg-white/5 hover:bg-white/10 border-white/10"
                    : "bg-black/5 hover:bg-black/10 border-black/10"
                }`}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
