import React from "react";
import { BookOpen, Code, Trophy, Github, Star } from "lucide-react";

export const profile = {
  name: "Ahnaf Hasan Shifat",
  title: "Computer Science Engineer & Competitive Programmer",
  email: "sheikhahnafshifat@gmail.com",
  phoneDisplay: "+880 1639 236 879",
  phoneRaw: "+8801639236879",
  links: {
    linkedin: "#",
    github: "#",
    blog: "#",
  },
};

export const navSections = [
  { id: "summary", label: "Summary", icon: <BookOpen size={18} /> },
  { id: "experience", label: "Experience", icon: <Code size={18} /> },
  {
    id: "competitive",
    label: "Competitive Programming",
    icon: <Trophy size={18} />,
  },
  { id: "projects", label: "Projects", icon: <Github size={18} /> },
  { id: "skills", label: "Skills", icon: <Star size={18} /> },
  { id: "blog", label: "Blog", icon: <BookOpen size={18} /> },
];

/**
 * Competitive coding profiles & meta
 * - totalSolvedAllOJ refers to combined problems solved across all OJs (not just Codeforces).
 */
export const competitiveProfiles = {
  codeforces: {
    handle: "ah_naf",
    url: "http://codeforces.com/profile/ah_naf",
    rankTitle: "Specialist",
    maxRating: 1510,
  },
  codechef: {
    handle: "ah__f",
    url: "https://www.codechef.com/users/ah__f",
    stars: 4,
    maxRating: 1812,
  },
  stopstalk: {
    url: "https://www.stopstalk.com/user/profile/Ah_naf",
  },
  totalSolvedAllOJ: 2500,
};

/**
 * Contest history (full list provided, including onsite + online as specified)
 * Each item: name, position, type, team, url, highlight?
 */
export const contestHistory = [
  {
    name: "CoU IT Fest Programming Contest",
    position: "1st",
    type: "Divisional (Programming Contest)",
    team: "CoU_Segment_Hero(Ahmed.097823)",
    url: "https://toph.co/contests/training/qjqle8v/standings",
    highlight: true,
  },
  {
    name: "Premier University Programming Contest 2024",
    position: "10th",
    type: "Divisional (Programming Contest)",
    team: "CoU_BinaryDebuggers",
    url: "https://media.licdn.com/dms/image/v2/D562DAQEI3pg8jqIPQQ/profile-treasury-image-shrink_1920_1920/profile-treasury-image-shrink_1920_1920/0/1706517852147?e=1729450800&v=beta&t=fmHrVQ-IqUg8a1WvblbSDEvRqiclKlIIrDT65BE3UaI",
  },
  {
    name: "Ahmed Zubayer IUPC, UITS",
    position: "22nd",
    type: "National (Programming Contest)",
    team: "CoU_01_Debuggers",
    url: "https://vjudge.net/contest/538028#rank",
  },
  {
    name: "CUSS Presents IT Fiesta 2024 Inter University Programming Contest",
    position: "26th",
    type: "Divisional (Programming Contest)",
    team: "CoU_Skadooosh",
    url: "https://toph.co/contests/training/rxbqtb6/standings",
  },
  {
    name: "IUT 11th National ICT Fest Programming Contest 2024",
    position: "39th",
    type: "National (Programming Contest)",
    team: "Skadooosh",
    url: "https://toph.co/c/iut-11th-national-ict-fest-2024/standings",
  },
  {
    name: "CoU-BRACNet Inter University Programming Contest 2023",
    position: "40th",
    type: "National (Programming Contest)",
    team: "CoU_01_Debuggers",
    url: "https://toph.co/c/cou-bracnet-inter-university-2023/standings",
  },
  {
    name: "15th IIUC Inter University Programming Contest 2023",
    position: "41st",
    type: "Divisional (Programming Contest)",
    team: "CoU_01_Debuggers",
    url: "https://toph.co/c/15th-iiuc-inter-university-2023/standings",
  },
  {
    name: "IIUC Inter University Programming Contest 2023",
    position: "43rd",
    type: "Divisional (Programming Contest)",
    team: "CoU_01_Debuggers",
    url: "https://toph.co/c/15th-iiuc-inter-university-2023/standings",
  },
  {
    name: "MIAKI Presents KUET IUPC Onsite 2025",
    position: "65th",
    type: "National (Programming Contest)",
    team: "!GivingUp",
    url: "https://bapsoj.org/contests/miaki-presents-kuet-iupc-onsite-2025/standings",
  },
  {
    name: "UIU Inter-University Programming Contest 2025",
    position: "89th",
    type: "National (Programming Contest)",
    team: "!GivingUp",
    url: "https://bapsoj.org/contests/uiu-inter-university-programming-contest-2025/standings",
  },
  {
    name: "SUST CSE Carnival 2024",
    position: "103rd",
    type: "National (Programming Contest)",
    team: "CoU_SegmentHero",
    url: "https://toph.co/c/inter-university-sust-cse-carnival-2024/standings",
  },
  {
    name: "ICPC Asia Dhaka Regional Contest 2024 Onsite Round",
    position: "109th",
    type: "National (Programming Contest)",
    team: "CoU_Skadooosh2.0",
    url: "https://bapsoj.org/contests/icpc-asia-dhaka-regional-contest-2024-onsite-round/standings",
  },
  {
    name: "JU NCPC 2024 (Main Round)",
    position: "148th",
    type: "National (Programming Contest)",
    team: "CoU_SegmentHero",
    url: "https://bapsoj.org/contests/ncpc-onsite-2023-hosted-by-ju/standings",
  },
  {
    name: "JU NCPC 2024 (Preli)",
    position: "184th",
    type: "Online",
    team: "CoU_SegmentHero",
    url: "https://bapsoj.org/contests/ncpc-preliminary-ju-2023/standings",
  },
  {
    name: "ICPC Preliminary Dhaka Site 2024",
    position: "215th",
    type: "National (Programming Contest)",
    team: "CoU_Skadooosh2.0",
    url: "https://bapsoj.org/contests/icpc-preliminary-dhaka-site-2024/standings",
  },
];

/**
 * Updated projects with 'highlights' (array of strings)
 * Keys: name, summary, description, impact, tools, github, video, highlights
 */
export const projects = [
  {
    name: "Merkle‑Chunk File Transfer",
    summary:
      "Go-based chunked file transfer with Merkle tree integrity—upload, verify, and download large files reliably.",
    description: `A Go‑based file transfer service that lets you reliably upload, verify, and download large files in fixed‑size chunks, using a Merkle tree to guarantee integrity at every step.`,
    impact:
      "Ensures end‑to‑end integrity for large file transfers, perfect for unreliable networks and resumable workflows.",
    tools: ["Go", "Gin", "Cobra", "Merkle Tree", "HTTP API", "CLI"],
    github: "https://github.com/ah-naf/merkle-tree",
    video: "https://www.youtube.com/embed/juZQKpriHrM",
    highlights: [
      "Fixed‑size chunked upload with per‑chunk hashing.",
      "Merkle tree over chunk hashes for global integrity.",
      "Verify endpoint to confirm all chunks are present & unmodified.",
      "Streamed chunked download with client‑side merge & progress bar.",
      "Gin server + Cobra CLI; clean endpoints and DX.",
    ],
  },
  {
    name: "Borno",
    summary:
      "A Bangla-based, dynamically typed programming language with Bangla keywords and identifiers.",
    description:
      "Borno lets developers write code using Bangla keywords and identifiers while supporting common programming constructs (variables, functions, arrays, objects, loops, classes). Implemented in Go with a custom lexer, parser, and interpreter, and includes a REPL for interactive execution.",
    impact:
      "Makes programming more accessible for native Bangla speakers and promotes learning in the mother tongue.",
    tools: ["Go", "Interpreter", "Lexer", "Parser", "REPL"],
    github: "https://github.com/ah-naf/Borno",
    video: null,
    highlights: [
      "Bangla keywords & identifiers for code readability.",
      "Custom lexer, parser, and tree‑walk interpreter in Go.",
      "Supports variables, functions, control flow, arrays, objects, classes.",
      "Interactive REPL for quick experimentation.",
      "Focus on accessibility for Bangla learners.",
    ],
  },
  {
    name: "NL→SQL",
    summary:
      "A web app that converts natural-language questions into SQL using LLMs.",
    description:
      "Converts NL queries to SQL (PostgreSQL/MySQL) with an interactive schema browser, confirmation for destructive queries, and a paginated results viewer. Bridges non-technical users to databases without manual SQL.",
    impact:
      "Empowers analysts and non‑developers to query databases confidently, improving data accessibility and speed.",
    tools: ["TypeScript", "Go", "React", "PostgreSQL", "LLM"],
    github: "https://github.com/ah-naf/nlsql",
    video: null,
    highlights: [
      "Natural language → SQL for PostgreSQL/MySQL.",
      "Interactive schema browser for tables & columns.",
      "Safety guardrails for INSERT/UPDATE/DELETE.",
      "Paginated results with validation & tooling.",
      "Bridges non‑technical users to databases.",
    ],
  },
  {
    name: "Course Flow",
    summary:
      "Real-time classroom management platform with posts, comments, notifications, and live chat.",
    description: `Create/join courses, post and comment (with files & Markdown), get real-time notifications, and chat via WebSockets. React (shadcn, React Query, Zustand) frontend + Go backend (REST + WebSocket) with PostgreSQL.`,
    impact:
      "Streamlines class collaboration and engagement, bringing coursework, announcements, and chat into one place.",
    tools: ["React", "Go", "PostgreSQL", "WebSocket", "REST"],
    github: "https://github.com/ah-naf/Course-Flow",
    video: "https://www.youtube.com/embed/plxhcOpebKM",
    highlights: [
      "Create, join, archive, restore, and delete classes.",
      "Privacy controls and granular posting permissions.",
      "Real-time chat & notifications via Gorilla WebSocket.",
      "Instant alerts for posts, comments, messages, role changes.",
      "JWT + OAuth (Google/GitHub) authentication.",
      "React + shadcn UI, React Query, Zustand on frontend.",
      "Go backend with Gorilla Mux & PostgreSQL.",
      "Secure media uploads to a dedicated directory.",
    ],
  },
  {
    name: "ROUTE – Personalized Travel App",
    summary:
      "Plan routes across multiple places, compare time & cost, and leave rich reviews.",
    description:
      "Add places (nodes), specify transport modes, time, and cost between them; highlight optimal routes. Users can review places with media. React frontend + Node/Express/Prisma backend with PostgreSQL; Cloudinary for media.",
    impact:
      "Helps travelers plan efficiently and budget better, while capturing community knowledge via reviews.",
    tools: [
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Cloudinary",
    ],
    github:
      "https://github.com/ah-naf/Route-A-Personalized-Travel-and-Reviewing-App",
    video: "https://www.youtube.com/embed/3bn7vMM7AIw",
    highlights: [
      "Compose routes with multiple places (nodes).",
      "Compare transport modes, time, and cost.",
      "Auto-highlight optimal route by time or cost.",
      "Place reviews with photos/videos.",
      "Cloudinary media storage, Dockerized setup.",
    ],
  },
  {
    name: "SimpleOJ",
    summary:
      "MERN-based online judge supporting C/C++/Java/Python with Google login and live submission feed.",
    description:
      "Users can add problems and custom tests, run code (guest or signed-in), and submit for judgment. Backend executes securely (Docker/child_process) with Bull queue. Tracks submission history and live activity.",
    impact:
      "Facilitates programming practice and assessment for students, educators, and communities.",
    tools: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "PassportJS",
      "Bull",
      "Docker",
    ],
    github: "https://github.com/ah-naf/SimpleOJ",
    video: "https://www.youtube.com/embed/Xfc7_3AgQOw",
    highlights: [
      "Create & manage problems with custom test cases.",
      "Run (anyone) and submit (signed-in) solutions.",
      "Secure code execution with Docker isolation.",
      "Bull queue for concurrent judging.",
      "Google OAuth, submission history & live feed.",
    ],
  },
  {
    name: "Terminal Talk 2.0",
    summary:
      "Retro-style, terminal-based real-time chat built with Go sockets.",
    description:
      "Multi-user chat over TCP sockets with a simple text UI. Includes user management (block/unblock) and demonstrates low-level network programming patterns in Go.",
    impact:
      "Showcases efficient concurrent networking in Go and CLI UX for real-time communication.",
    tools: ["Go", "TCP", "Sockets", "CLI"],
    github: "https://github.com/ah-naf/Terminal-Talk-2.0",
    video: null,
    highlights: [
      "TCP socket server + multiple clients.",
      "Shared chat room in terminal UI.",
      "Block/unblock user management.",
      "Lightweight, dependency-minimal design.",
      "Demonstrates Go concurrency & networking.",
    ],
  },
  {
    name: "Video Editing App",
    summary:
      "Browser-based video edits (trim/merge/effects) with FFmpeg on a Node/NodeRoute backend.",
    description:
      "Upload and edit videos via a React UI. Backend (Node + NodeRoute) manages routes/middleware and orchestrates FFmpeg via child_process & clustering for concurrency. Static files served by NodeRoute.",
    impact:
      "Brings practical media editing to the web and demonstrates scalable server-side processing.",
    tools: ["React", "Node.js", "NodeRoute", "FFmpeg", "Docker"],
    github: "https://github.com/ah-naf/Video-Editing-App",
    video: null,
    highlights: [
      "Upload videos and perform trim/merge/effects.",
      "FFmpeg processing via child_process + clustering.",
      "React UI with intuitive controls.",
      "NodeRoute backend serves static & APIs.",
      "Dockerized workflow for deployment.",
    ],
  },
  {
    name: "NodeRoute",
    summary:
      "Lightweight Node.js HTTP framework with routes, middleware, static serving, and helpers.",
    description:
      "Define routes (GET/POST/PUT/DELETE), add global/route middleware, serve static files, parse params, handle single-file uploads, and set timeouts. Ships as @ah_naf/noderoute.",
    impact:
      "Simplifies building Node servers with clear APIs and pragmatic defaults—an approachable Express-like alternative.",
    tools: ["Node.js", "HTTP", "NPM", "Framework"],
    github: "https://github.com/ah-naf/NodeRoute",
    video: null,
    highlights: [
      "Express-like routing API for Node.",
      "Global & route-level middleware chaining.",
      "Static file serving & response helpers.",
      "Params parsing, single-file uploads, timeouts.",
      "Published as @ah_naf/noderoute on npm.",
    ],
  },
];

export const skills = {
  "Programming Languages": ["C", "C++", "JavaScript", "SQL", "Golang"],
  "Web Frameworks": ["React", "Express (Node.js)", "Gin (Go)"],
  "API Development": [
    "REST API",
    "Postman",
    "Authentication/Authorization",
    "JWT",
  ],
  "DevOps & Tools": ["Docker", "GitHub CI/CD", "Git", "VS Code", "Linux"],
  "Familiar With": ["MongoDB"],
};
