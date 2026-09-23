import type { ComponentType } from "react";
import {
  Blocks,
  Code2,
  Database,
  FileCode2,
  Globe,
  Network,
  Terminal,
  Waypoints,
} from "lucide-react";
import {
  SiCss,
  SiDocker,
  SiEthereum,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiSolidity,
  SiSupabase,
  SiPostgresql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
export const skillGroups = [
  { id: "frontend", icon: Code2, skills: ["HTML", "CSS", "JavaScript", "React"] },
  { id: "backend", icon: Terminal, skills: ["Java", "PHP", "Python", "Node.js"] },
  { id: "databases", icon: Database, skills: ["MySQL", "Firebase", "Supabase", "PostgreSQL"] },
  { id: "tools", icon: Blocks, skills: ["Git", "GitHub", "REST APIs", "Docker"] },
  {
    id: "learning",
    icon: Network,
    skills: ["Blockchain", "Web3", "Solidity", "Ethereum", "Smart Contracts"],
  },
];

export const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  React: SiReact,
  Java: FaJava,
  PHP: SiPhp,
  Python: SiPython,
  "Node.js": SiNodedotjs,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  "REST APIs": Waypoints,
  Docker: SiDocker,
  Blockchain: Blocks,
  Web3: Globe,
  Solidity: SiSolidity,
  Ethereum: SiEthereum,
  "Smart Contracts": FileCode2,
};

// Generic concepts retain Lucide metaphors: REST APIs = Waypoints,
// Blockchain = Blocks, Web3 = Globe, Smart Contracts = FileCode2.

// Brand colors for the existing single-color icon silhouettes. GitHub uses its
// white mark on dark backgrounds; generic concepts have no official brand color.
export const skillColors: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#663399",
  JavaScript: "#F7DF1E",
  React: "#61DAFB",
  Java: "#ED8B00",
  PHP: "#777BB4",
  Python: "#3776AB",
  "Node.js": "#5FA04E",
  MySQL: "#4479A1",
  Firebase: "#DD2C00",
  Supabase: "#3FCF8E",
  PostgreSQL: "#4169E1",
  Git: "#F05032",
  GitHub: "#FFFFFF",
  Docker: "#2496ED",
  Solidity: "#363636",
  Ethereum: "#3C3C3D",
};

const allSkills = skillGroups.flatMap(({ skills }) => skills);
export const skillRows = Array.from({ length: 3 }, (_, row) =>
  allSkills.filter((_, index) => index % 3 === row),
);
