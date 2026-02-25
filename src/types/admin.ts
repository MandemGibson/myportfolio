export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imagePublicId?: string;
  status: string;
  type: string;
  featured: boolean;
  preview?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  iconSlug?: string;
}

export interface Profile {
  id: number;
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
  avatarPublicId?: string;
  resume?: string;
  resumePublicId?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  current: boolean;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  description?: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export type Tab =
  | "projects"
  | "skills"
  | "experiences"
  | "education"
  | "certifications"
  | "profile"
  | "settings";
