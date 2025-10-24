"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalInterfaceProps {
  onSwitchToModern: () => void;
}

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

export default function TerminalInterface({
  onSwitchToModern,
}: TerminalInterfaceProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: `Available commands:
    about     - About me
    skills    - Technical skills
    projects  - My projects
    experience - Work experience
    education - Education & certifications
    contact   - Contact information
    resume    - Download resume
    clear     - Clear terminal
    modern    - Switch to modern UI
    sudo hire-me - Easter egg command
    help      - Show this help`,

    about: `Hello! I'm Philip Gibson Cudjoe, a passionate Full Stack Developer with 5+ years of experience.
    
I specialize in building modern web applications using React, Next.js, Node.js, and various cloud technologies.
My passion lies in creating efficient, scalable solutions that solve real-world problems.

When I'm not coding, you can find me contributing to open-source projects, 
learning new technologies, or sharing knowledge with the developer community.`,

    skills: `Frontend:
    • React, Next.js, TypeScript
    • Tailwind CSS, Styled Components
    • Framer Motion, GSAP
    
Backend:
    • Node.js, Express.js
    • Python, Django/FastAPI
    • PostgreSQL, MongoDB
    
Tools & Cloud:
    • Docker, Kubernetes
    • AWS, Vercel, Netlify
    • Git, GitHub Actions
    • Figma, VS Code`,

    projects: `Featured Projects:
    
1. E-Commerce Platform (2024)
   Tech: Next.js, Node.js, PostgreSQL, Stripe
   Live: https://example-ecommerce.com
   GitHub: https://github.com/alex/example-ecommerce
   
2. Task Management App (2024)
   Tech: React, Express.js, MongoDB
   Live: https://example-tasks.com
   GitHub: https://github.com/alex/example-tasks
   
3. Weather Dashboard (2023)
   Tech: React, TypeScript, OpenWeather API
   Live: https://example-weather.com
   GitHub: https://github.com/alex/example-weather`,

    experience: `Work Experience:
    
Senior Full Stack Developer - TechCorp (2022-Present)
• Led development of microservices architecture
• Improved application performance by 40%
• Mentored junior developers

Full Stack Developer - StartupXYZ (2020-2022)
• Built responsive web applications
• Implemented CI/CD pipelines
• Collaborated with cross-functional teams`,

    education: `Education & Certifications:
    
Bachelor of Computer Science - University of Technology (2018-2020)
• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Database Systems

Certifications:
• AWS Certified Developer Associate (2023)
• Google Cloud Professional Developer (2022)
• React Developer Certification (2021)`,

    contact: `Get in touch:
    
Email: alex.developer@example.com
LinkedIn: https://linkedin.com/in/alexdeveloper
GitHub: https://github.com/alexdeveloper
Twitter: @alexdev_tech

I'm always interested in new opportunities and collaborations!`,

    resume: `Resume download initiated...
    
Downloading resume.pdf...
[████████████████████] 100%
    
Resume downloaded successfully!
You can also view it online at: https://alexdeveloper.dev/resume`,

    clear: "",

    modern: "Switching to modern UI...",

    "sudo hire-me": `$ sudo hire-me
Password: ********
[SUCCESS] You have been granted permission to hire Philip Gibson Cudjoe!
    
Congratulations! 🎉
You've discovered the easter egg command!
    
Here's what happens when you hire me:
• I bring enthusiasm and expertise to your team
• I write clean, maintainable code
• I'm always learning and adapting
• I contribute to a positive team culture
    
Contact me at alex.developer@example.com to discuss opportunities!`,
  };

  useEffect(() => {
    // Add initial welcome message
    setCommandHistory([
      {
        input: "",
        output: `Welcome to Philip Gibson Cudjoe's Terminal Interface!
Type 'help' to see available commands.`,
        timestamp: new Date(),
      },
    ]);

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const output =
      commands[trimmedInput as keyof typeof commands] ||
      `Command not found: ${input}
Type 'help' to see available commands.`;

    const newCommand: Command = {
      input,
      output,
      timestamp: new Date(),
    };

    setCommandHistory((prev) => [...prev, newCommand]);

    // Handle special commands
    if (trimmedInput === "modern") {
      setTimeout(() => onSwitchToModern(), 1000);
    }

    if (trimmedInput === "clear") {
      setCommandHistory([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // Navigate command history (simplified - placeholder for future implementation)
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono p-4"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-gray-900 rounded-t-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-300">
            gibson@portfolio:~$
          </span>
        </div>

        {/* Terminal Body */}
        <div className="bg-black border border-green-400 rounded-b-lg p-4 min-h-[600px] overflow-y-auto">
          {/* Command History */}
          <div className="space-y-2 mb-4">
            {commandHistory.map((command, index) => (
              <div key={index} className="space-y-1">
                {command.input && (
                  <div className="flex items-center">
                    <span className="text-cyan-400">gibson@portfolio:~$</span>
                    <span className="ml-2">{command.input}</span>
                  </div>
                )}
                {command.output && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-pre-wrap text-green-300 ml-0"
                  >
                    {command.output}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Current Input */}
          <div className="flex items-center">
            <span className="text-cyan-400">gibson@portfolio:~$</span>
            {/* <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-5 bg-green-400 ml-1"
            /> */}
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-2 bg-transparent text-green-400 outline-none flex-1 caret-green-400"
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => executeCommand("help")}
            className="px-3 py-1 text-xs border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
          >
            help
          </button>
          <button
            onClick={() => executeCommand("about")}
            className="px-3 py-1 text-xs border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
          >
            about
          </button>
          <button
            onClick={() => executeCommand("projects")}
            className="px-3 py-1 text-xs border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
          >
            projects
          </button>
          <button
            onClick={() => executeCommand("contact")}
            className="px-3 py-1 text-xs border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
          >
            contact
          </button>
          <button
            onClick={onSwitchToModern}
            className="px-3 py-1 text-xs border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
          >
            modern
          </button>
        </div>
      </div>
    </div>
  );
}
