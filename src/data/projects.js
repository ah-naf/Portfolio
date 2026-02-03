export const projects = [
  {
    "name": "GitHub Repository RAG Chat",
    "summary": "Full-stack RAG application enabling conversational querying of GitHub repositories using LangChain, FastAPI, and Angular.",
    "description": "A comprehensive Retrieval-Augmented Generation system that allows developers to chat with and extract knowledge from GitHub codebases. The application combines a Python FastAPI backend with an Angular frontend, leveraging Google's Gemini API for embeddings, GitHub API for repository access, and LangChain for RAG orchestration. Users can ask natural language questions about any public GitHub repository and receive contextually-aware answers based on the actual codebase.",
    "impact": "Dramatically reduces the learning curve for understanding unfamiliar codebases by enabling natural language exploration of repositories. Perfect for code review, onboarding new developers, and documentation discovery without manually navigating through files.",
    "tools": [
      "Python",
      "FastAPI",
      "Angular",
      "TypeScript",
      "LangChain",
      "Google Gemini API",
      "GitHub API",
      "LangSmith",
      "RAG Pipeline",
      "Vector Embeddings"
    ],
    "github": "https://github.com/ah-naf/Github-RAG",
    "video": null,
    "highlights": [
      "Natural language querying of entire GitHub repositories through conversational interface.",
      "FastAPI backend with robust RAG pipeline powered by LangChain framework.",
      "Angular-based frontend providing intuitive chat experience for code exploration.",
      "Integration with Google Gemini API for advanced language understanding and embeddings.",
      "GitHub token authentication for accessing both public and private repositories.",
      "LangSmith integration for tracking and debugging RAG chain performance.",
      "Modular architecture separating frontend and backend for scalable deployment.",
      "Environment-based configuration supporting development and production modes."
    ]
  },
  {
    "name": "AWS AI Agent Automation",
    "summary": "LangGraph-powered agentic system for autonomous AWS infrastructure management across IAM, S3, and VPC services.",
    "description": "An intelligent AI agent built with LangGraph that autonomously manages AWS cloud infrastructure through natural language commands. The system uses state machines to orchestrate complex multi-step workflows, including user approval gates for critical operations. The agent can create IAM users and policies, manage S3 buckets and objects, configure VPC networks, subnets, and security groups—all through conversational interaction while maintaining safety through human-in-the-loop approval mechanisms.",
    "impact": "Transforms AWS infrastructure management from manual console clicks and CLI commands into natural language conversations. Reduces operational complexity and human error while maintaining security through approval workflows for sensitive operations.",
    "tools": [
      "Python",
      "LangGraph",
      "AWS SDK (Boto3)",
      "IAM",
      "S3",
      "VPC",
      "State Machines",
      "Approval Workflows",
      "Agentic AI"
    ],
    "github": "https://github.com/ah-naf/aws-ai-agent",
    "video": null,
    "highlights": [
      "LangGraph state machine orchestration for complex multi-step AWS workflows.",
      "Human-in-the-loop approval system for critical infrastructure changes via approval.py.",
      "Modular service organization with dedicated folders for IAM, S3, and VPC operations.",
      "Automated IAM user creation, policy attachment, and permission management.",
      "S3 bucket lifecycle management including creation, configuration, and object operations.",
      "VPC network provisioning with subnet allocation and security group configuration.",
      "Conversational interface transforming infrastructure-as-code into infrastructure-as-conversation.",
      "LangGraph.json configuration enabling deployment and monitoring of agent workflows.",
      "Prompt engineering via prompt.py for reliable AWS service interaction.",
      "Safety-first architecture preventing unauthorized changes through approval gates."
    ]
  },
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
