export interface Profile {
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
  resume?: string;
}

export interface Project {
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

export interface PortfolioData {
  profile: Profile | null;
  skills: Record<string, string[]>;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any[];
}
