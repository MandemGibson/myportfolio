"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";

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

interface HeroSectionProps {
  profile: Profile | null;
  darkMode: boolean;
}

export default function HeroSection({ profile, darkMode }: HeroSectionProps) {
  return (
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
        {profile?.avatar && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <div
              className={`w-32 h-32 rounded-full overflow-hidden border-2 ${
                darkMode ? "border-white/10" : "border-black/10"
              }`}
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
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
          {profile?.name || "Full Stack Developer"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-xl md:text-2xl mb-4 ${
            darkMode ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          {profile?.title || "Building exceptional digital experiences"}
        </motion.p>

        {profile?.bio && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`max-w-2xl mx-auto mb-8 ${
              darkMode ? "text-neutral-500" : "text-neutral-600"
            }`}
          >
            {profile.bio}
          </motion.p>
        )}

        {profile?.location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`flex items-center justify-center gap-2 mb-8 ${
              darkMode ? "text-neutral-500" : "text-neutral-600"
            }`}
          >
            <MapPin size={16} />
            <span>{profile.location}</span>
            {profile.availability && (
              <>
                <span className="text-neutral-700">•</span>
                <span className="px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400">
                  {profile.availability}
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
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 border rounded-full transition-all ${
                darkMode
                  ? "bg-white/5 hover:bg-white/10 border-white/10"
                  : "bg-black/5 hover:bg-black/10 border-black/10"
              }`}
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          )}
          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 border rounded-full transition-all ${
                darkMode
                  ? "bg-white/5 hover:bg-white/10 border-white/10"
                  : "bg-black/5 hover:bg-black/10 border-black/10"
              }`}
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-medium ${
                darkMode
                  ? "bg-white hover:bg-white/90 text-black"
                  : "bg-black hover:bg-black/90 text-white"
              }`}
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
