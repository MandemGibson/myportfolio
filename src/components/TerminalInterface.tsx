"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";

interface TerminalInterfaceProps {
  data: PortfolioData;
  loading: boolean;
  onSwitchToModern: () => void;
}

interface Command {
  input: string;
  output: string | JSX.Element;
  timestamp: Date;
}

export default function TerminalInterface({
  data,
  loading,
  onSwitchToModern,
}: TerminalInterfaceProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const TerminalLink = ({ url, text }: { url: string; text?: string }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:underline cursor-pointer inline-flex items-center group relative"
      title="Click to follow link"
    >
      {text || url}
      <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500">
        [Ctrl+Click]
      </span>
    </a>
  );

  const getAboutCommand = () => {
    if (!data.profile) return "Loading profile data...";
    return `Hello! I'm ${data.profile.name}, ${data.profile.title}.

${data.profile.bio}

${data.profile.location ? `Location: ${data.profile.location}` : ""}
${data.profile.availability ? `Status: ${data.profile.availability}` : ""}`;
  };

  const getSkillsCommand = () => {
    if (Object.keys(data.skills).length === 0) return "Loading skills...";

    return (
      <>
        {Object.entries(data.skills).map(([category, skills]) => (
          <div key={category}>
            <div className="text-green-400 font-bold capitalize mb-1">
              {category}:
            </div>
            <div className="ml-4 mb-3">
              {skills.map((skill, i) => (
                <div key={i}>• {skill}</div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  const getProjectsCommand = () => {
    if (data.projects.length === 0) return "Loading projects...";

    return (
      <div>
        <div className="mb-3">Featured Projects:</div>
        {data.projects
          .filter((p) => p.featured)
          .map((project, index) => (
            <div key={project.id} className="mb-4">
              <div className="text-cyan-400 font-bold">
                {index + 1}. {project.title} ({project.status})
              </div>
              <div className="ml-4 mt-1">
                <div>Tech: {project.tech.join(", ")}</div>
                <div className="mt-1">{project.description}</div>
                {project.liveUrl && (
                  <div className="mt-1">
                    Live: <TerminalLink url={project.liveUrl} />
                  </div>
                )}
                {project.githubUrl && (
                  <div className="mt-1">
                    GitHub: <TerminalLink url={project.githubUrl} />
                  </div>
                )}
              </div>
            </div>
          ))}
        {data.projects.filter((p) => !p.featured).length > 0 && (
          <>
            <div className="mt-4 mb-3">Other Projects:</div>
            {data.projects
              .filter((p) => !p.featured)
              .map((project) => (
                <div key={project.id} className="mb-3">
                  <div className="text-cyan-400">• {project.title}</div>
                  <div className="ml-4 text-sm">
                    <div>{project.tech.slice(0, 3).join(", ")}</div>
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="mt-1">
                        {project.liveUrl && (
                          <TerminalLink url={project.liveUrl} text="Live" />
                        )}
                        {project.liveUrl && project.githubUrl && " | "}
                        {project.githubUrl && (
                          <TerminalLink url={project.githubUrl} text="Code" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    );
  };

  const getExperienceCommand = () => {
    if (data.experience.length === 0) return "Loading experience...";

    return (
      <div>
        <div className="mb-3">Work Experience:</div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="text-cyan-400 font-bold">
              {exp.role} - {exp.company} {exp.current && "(Current)"}
            </div>
            <div className="text-gray-400 text-sm mb-1">{exp.period}</div>
            <div className="ml-4">
              {exp.highlights.map((highlight, i) => (
                <div key={i}>• {highlight}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getEducationCommand = () => {
    const eduContent = [];

    if (data.education.length > 0) {
      eduContent.push(
        <div key="education" className="mb-4">
          <div className="mb-2">Education:</div>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="text-cyan-400">{edu.degree}</div>
              <div className="ml-4">
                <div>{edu.institution}</div>
                <div className="text-gray-400 text-sm">
                  {edu.period} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
                {edu.description && (
                  <div className="text-sm mt-1">{edu.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>,
      );
    }

    if (data.certifications.length > 0) {
      eduContent.push(
        <div key="certifications">
          <div className="mb-2">Certifications:</div>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="text-cyan-400">• {cert.name}</div>
              <div className="ml-4 text-sm">
                {cert.issuer} ({cert.year})
                {cert.credentialId && ` • ID: ${cert.credentialId}`}
              </div>
            </div>
          ))}
        </div>,
      );
    }

    return eduContent.length > 0 ? (
      <div>{eduContent}</div>
    ) : (
      "Loading education data..."
    );
  };

  const getContactCommand = () => {
    if (!data.profile) return "Loading contact info...";

    return (
      <div>
        <div className="mb-3">Get in touch:</div>
        {data.profile.email && (
          <div className="mb-2">
            Email:{" "}
            <TerminalLink
              url={`mailto:${data.profile.email}`}
              text={data.profile.email}
            />
          </div>
        )}
        {data.profile.linkedin && (
          <div className="mb-2">
            LinkedIn: <TerminalLink url={data.profile.linkedin} />
          </div>
        )}
        {data.profile.github && (
          <div className="mb-2">
            GitHub: <TerminalLink url={data.profile.github} />
          </div>
        )}
        {data.profile.twitter && (
          <div className="mb-2">
            Twitter: <TerminalLink url={data.profile.twitter} />
          </div>
        )}
        <div className="mt-3 text-green-400">
          I&apos;m always interested in new opportunities and collaborations!
        </div>
      </div>
    );
  };

  const commands: Record<string, string | JSX.Element> = {
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

    about: getAboutCommand(),
    skills: getSkillsCommand(),
    projects: getProjectsCommand(),
    experience: getExperienceCommand(),
    education: getEducationCommand(),
    contact: getContactCommand(),

    resume: data.profile?.resume ? (
      <div>
        <div className="mb-2">Resume download initiated...</div>
        <div className="mb-2">Downloading resume.pdf...</div>
        <div className="mb-2">[████████████████████] 100%</div>
        <div className="mb-3 text-green-400">
          Resume downloaded successfully!
        </div>
        <div>
          View online:{" "}
          <TerminalLink url={data.profile.resume} text="Click here" />
        </div>
      </div>
    ) : (
      "Resume not available at the moment. Please contact me directly for my latest resume."
    ),

    clear: "",

    modern: "Switching to modern UI...",

    "sudo hire-me": data.profile ? (
      <div>
        <div className="text-cyan-400 mb-3">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div className="text-green-400 mb-3">✓ Authentication successful</div>
        <div className="mb-4">Initiating hiring protocol...</div>

        <div className="mb-3">
          <div className="text-yellow-400">CANDIDATE PROFILE:</div>
          <div className="ml-4 mt-2">
            <div>Name: {data.profile.name}</div>
            <div>Role: {data.profile.title}</div>
            <div>Status: {data.profile.availability || "Available"}</div>
            {data.profile.location && (
              <div>Location: {data.profile.location}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-yellow-400">KEY STRENGTHS:</div>
          <div className="ml-4 mt-2">
            <div>→ Full-stack development expertise</div>
            <div>→ Clean, maintainable, scalable code</div>
            <div>→ Continuous learning and adaptation</div>
            <div>→ Strong team collaboration</div>
            <div>→ Problem-solving oriented mindset</div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-yellow-400">NEXT STEPS:</div>
          <div className="ml-4 mt-2">
            <div>
              1. Review my work: Type &apos;projects&apos; or
              &apos;experience&apos;
            </div>
            <div>2. Download resume: Type &apos;resume&apos;</div>
            <div>3. Get in touch: Type &apos;contact&apos;</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-green-400">Direct contact:</div>
          <div className="ml-4 mt-1">
            <TerminalLink
              url={`mailto:${data.profile.email}`}
              text={data.profile.email}
            />
          </div>
        </div>

        <div className="text-cyan-400 mt-3">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
      </div>
    ) : (
      "Loading..."
    ),
  };

  useEffect(() => {
    // Add initial welcome message after data is loaded
    if (!loading && data.profile) {
      setCommandHistory([
        {
          input: "",
          output: `Welcome to ${data.profile.name}'s Terminal Interface!
Type 'help' to see available commands.`,
          timestamp: new Date(),
        },
      ]);
    }

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading, data.profile]);

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

    // Add to input history if it's not empty and not a duplicate of the last command
    if (
      input.trim() &&
      (inputHistory.length === 0 ||
        inputHistory[inputHistory.length - 1] !== input)
    ) {
      setInputHistory((prev) => [...prev, input]);
    }

    // Reset history index
    setHistoryIndex(-1);

    // Handle special commands
    if (trimmedInput === "modern") {
      setTimeout(() => onSwitchToModern(), 1000);
    }

    if (trimmedInput === "clear") {
      setCommandHistory([]);
      setInputHistory([]);
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Navigate up in command history
      if (inputHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? inputHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(inputHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // Navigate down in command history
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= inputHistory.length) {
          // Reached the end, clear input
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(inputHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="h-screen bg-black text-green-400 font-mono p-2 
      max-w-full sm:p-4 flex flex-col"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="max-w-4xl w-full h-full mx-auto flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 p-2 sm:p-3 bg-gray-900 rounded-t-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-gray-300">
            gibson@portfolio:~$
          </span>
        </div>

        {/* Terminal Body */}
        <div
          className="bg-black border border-green-400 rounded-b-lg
          flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-hide"
        >
          {/* Command History */}
          <div className="space-y-2 mb-4">
            {commandHistory.map((command, index) => (
              <div key={index} className="space-y-1">
                {command.input && (
                  <div className="flex items-center flex-wrap">
                    <span className="text-cyan-400 text-xs sm:text-sm">
                      gibson@portfolio:~$
                    </span>
                    <span className="ml-2 text-xs sm:text-sm break-all">
                      {command.input}
                    </span>
                  </div>
                )}
                {command.output && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-pre-wrap text-green-300 ml-0 text-xs sm:text-sm"
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
