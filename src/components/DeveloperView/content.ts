export type Project = {
  id: string;
  name: string;
  tag: string;
  summary: string;
  stack: string[];
  demo: string;
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
    name: "Another ToDo List",
    tag: "Interface",
    summary:
      "A focused task manager with drag and drop, real-time updates, and a minimalist responsive interface.",
    stack: ["Svelte", "TypeScript", "Tailwind CSS"],
    demo: "https://another-to-do-list-two.vercel.app",
    github: "https://github.com/daviderl99/AnotherToDoList",
  },
];

export const stackItems = [
  "React",
  "Angular",
  "TypeScript",
  "Next.js",
  "Svelte",
  "Python",
  "Firebase",
  "SCSS",
  "Tailwind",
  "Git",
];
