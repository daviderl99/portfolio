import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
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
          <div className="projectLinks">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name}`}
            >
              <FaArrowUpRightFromSquare />
            </a>
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} on GitHub`}
              >
                <FaGithub />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
