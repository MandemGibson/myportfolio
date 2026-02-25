import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create profile
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Philip Gibson Cudjoe",
      title: "Full Stack Developer",
      email: "philipgibsoncudjoe@gmail.com",
      linkedin: "https://linkedin.com/in/philip-gibson-cudjoe",
      github: "https://github.com/MandemGibson",
      twitter: "https://x.com/Mandem_Gibson",
      bio: "Building modern web applications with passion and precision. Specializing in React, Node.js, and cloud technologies.",
      location: "Ghana",
      availability: "Available for new opportunities",
    },
  });

  // Create skills with icon slugs
  const frontendSkills = [
    { name: "React", iconSlug: "react" },
    { name: "Next.js", iconSlug: "nextdotjs" },
    { name: "TypeScript", iconSlug: "typescript" },
    { name: "Tailwind CSS", iconSlug: "tailwindcss" },
    { name: "Framer Motion", iconSlug: "framer" },
  ];
  const backendSkills = [
    { name: "Node.js", iconSlug: "nodedotjs" },
    { name: "Express.js", iconSlug: "express" },
    { name: "Python", iconSlug: "python" },
    { name: "PostgreSQL", iconSlug: "postgresql" },
    { name: "MongoDB", iconSlug: "mongodb" },
  ];
  const toolSkills = [
    { name: "Docker", iconSlug: "docker" },
    { name: "AWS", iconSlug: "amazonaws" },
    { name: "Git", iconSlug: "git" },
    { name: "VS Code", iconSlug: "visualstudiocode" },
    { name: "Figma", iconSlug: "figma" },
  ];

  // Clear existing skills first
  await prisma.skill.deleteMany();

  for (const skill of frontendSkills) {
    await prisma.skill.create({
      data: {
        name: skill.name,
        category: "frontend",
        iconSlug: skill.iconSlug,
      },
    });
  }

  for (const skill of backendSkills) {
    await prisma.skill.create({
      data: { name: skill.name, category: "backend", iconSlug: skill.iconSlug },
    });
  }

  for (const skill of toolSkills) {
    await prisma.skill.create({
      data: { name: skill.name, category: "tools", iconSlug: skill.iconSlug },
    });
  }

  // Create projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/MandemGibson/example-ecommerce",
      image:
        "https://res.cloudinary.com/dyzlw51f9/image/upload/v1771977757/portfolio/projects/parflwecfrbuevy40r1r.png",
      status: "Live",
      type: "Full Stack",
      featured: true,
      preview:
        "A comprehensive e-commerce platform built with modern technologies, featuring secure payment processing, inventory management, and responsive design.",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates",
      tech: ["React", "Express.js", "MongoDB", "Socket.io"],
      liveUrl: "https://example-tasks.com",
      githubUrl: "https://github.com/MandemGibson/example-tasks",
      image:
        "https://res.cloudinary.com/dyzlw51f9/image/upload/v1771977757/portfolio/projects/parflwecfrbuevy40r1r.png",
      status: "Live",
      type: "Full Stack",
      featured: true,
      preview:
        "Real-time collaborative task management with drag-and-drop functionality, team collaboration features, and progress tracking.",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather application with location-based forecasts",
      tech: ["React", "TypeScript", "OpenWeather API"],
      liveUrl: "https://example-weather.com",
      githubUrl: "https://github.com/MandemGibson/example-weather",
      image:
        "https://res.cloudinary.com/dyzlw51f9/image/upload/v1771977757/portfolio/projects/parflwecfrbuevy40r1r.png",
      status: "Live",
      type: "Frontend",
      featured: false,
      preview:
        "Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  // Create experience
  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp",
      period: "2022 - Present",
      highlights: [
        "Led development of microservices architecture",
        "Improved application performance by 40%",
        "Mentored junior developers",
      ],
      current: true,
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
      current: false,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: exp,
    });
  }

  // Create education
  await prisma.education.create({
    data: {
      degree: "Bachelor of Science in Computer Science",
      institution: "Kwame Nkrumah University of Science and Technology",
      period: "2023 - Present",
      description:
        "Relevant coursework: Data Structures, Algorithms, Database Systems",
    },
  });

  // Create certifications
  const certifications = [
    {
      name: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-DEV-2023",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      year: "2022",
      credentialId: "GCP-DEV-2022",
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      year: "2021",
      credentialId: "REACT-2021",
    },
  ];

  for (const cert of certifications) {
    await prisma.certification.create({
      data: cert,
    });
  }

  // Create stats
  const stats = [
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
    { label: "Happy Clients", value: "25+", color: "from-pink-500 to-red-500" },
  ];

  for (const stat of stats) {
    await prisma.stat.create({
      data: stat,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
