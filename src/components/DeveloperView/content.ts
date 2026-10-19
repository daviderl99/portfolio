export type Project = {
  id: string;
  name: string;
  tag: string;
  summary: string;
  stack: string[];
  demo: string | null;
  github?: string;
};

export const projects: Project[] = [
  {
    id: "01",
    name: "AI Video Subtitler",
    tag: "Platform",
    summary:
      "An end-to-end video subtitle pipeline for transcription, translation, SRT export, and burned-in captions.",
    stack: ["Angular", "TypeScript", "Python", "FastAPI"],
    demo: "https://video-subtitler-fe.vercel.app",
    github: "https://github.com/daviderl99/video-sub-api",
  },
  {
    id: "02",
    name: "File Storage Drive",
    tag: "Product",
    summary:
      "A Google Drive-inspired storage interface with nested folders, uploads, and secure Firebase authentication.",
    stack: ["React", "Firebase", "SCSS"],
    demo: "https://daviderl99.github.io/Storage-Drive/#/login",
    github: "https://github.com/daviderl99/Storage-Drive",
  },
  {
    id: "03",
    name: "Chatter",
    tag: "Realtime",
    summary:
      "A room-based chat application with authentication, Firestore messaging, image uploads, and profiles.",
    stack: ["React", "Vite", "Firebase"],
    demo: "https://daviderl99.github.io/chatter-firebase",
    github: "https://github.com/daviderl99/chatter-firebase",
  },
  {
    id: "04",
    name: "Employee Manager",
    tag: "Product",
    summary:
      "A product management tool for tracking employee information and performance.",
    stack: ["Svelte", "TypeScript", "Tailwind CSS"],
    demo: null,
    github: "https://github.com/daviderl99/EmployeeManager",
  },
];

export type StackItem = {
  name: string;
  description: string;
};

export const stackItems: StackItem[] = [
  {
    name: "React",
    description: "Component-driven UIs with hooks and reusable state logic.",
  },
  {
    name: "Angular",
    description: "Structured, scalable front ends with RxJS and strong typing.",
  },
  {
    name: "TypeScript",
    description: "Type-safe code that stays maintainable as projects grow.",
  },
  {
    name: "Next.js",
    description: "Server-rendered and static React apps with fast page loads.",
  },
  {
    name: "Svelte",
    description: "Lightweight, reactive interfaces with minimal boilerplate.",
  },
  {
    name: "Python",
    description: "Backend services, automation, and data processing pipelines.",
  },
  {
    name: "Firebase",
    description: "Authentication, Firestore, and storage for realtime apps.",
  },
  {
    name: "Spring Boot",
    description: "Production-ready Java backends with clean layered design.",
  },
  {
    name: "REST API",
    description: "Well-structured, documented endpoints connecting clients and services.",
  },
  {
    name: "Docker",
    description: "Containerized builds for consistent local and deployed environments.",
  },
];
