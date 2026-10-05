import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Project } from "../content";
import "./ProjectCard.scss";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="mockWindow">
      <div className="mockChrome">
        <i />
        <i />
        <i />
        <span>
          {project.tag} · {project.id}
        </span>
      </div>
      <div className="projectBody">
        <div className="projectIndex">{project.id}</div>
        <div>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <small>{project.stack.join("  ·  ")}</small>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
          >
            <FaArrowUpRightFromSquare />
          </a>
        </div>
      </div>
    </article>
  );
}
