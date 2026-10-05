import { projects } from "../content";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";

export default function Projects() {
  return (
    <section id="work" className="wideSection">
      <div className="sectionHeading">
        <div>
          <p className="kicker">Selected work</p>
          <h2 className="text-section">Projects</h2>
        </div>
        <p className="monoMeta">2023 - 2025</p>
      </div>
      <ul className="projectGrid">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
