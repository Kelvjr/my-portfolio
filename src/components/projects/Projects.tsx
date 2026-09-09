import Image from "next/image";
import { projects } from "@/data/projects";
import { ProjectInteraction } from "./ProjectInteraction";
import { ProjectsMotion } from "./ProjectsMotion";
import { AegisCase } from "./AegisCase";
import { KasvinCase } from "./KasvinCase";
import { GrainsCase } from "./GrainsCase";

const caseStudies: Record<string, React.ReactNode> = {
  aegis: <AegisCase />,
  kasvin: <KasvinCase />,
  grains: <GrainsCase />,
};

export function Projects() {
  return (
    <section
      className="projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      <header className="projects-heading">
        <h2 id="projects-title">Selected work</h2>
        <span>
          Independent projects / 01–{String(projects.length).padStart(2, "0")}
        </span>
      </header>
      <div className="projects-stage">
        {projects.map((project, index) => (
          <ProjectInteraction
            key={project.id}
            id={project.id}
            title={project.name}
            detail={caseStudies[project.id]}
          >
            <figure className="project-image">
              <Image
                src={project.preview}
                alt={project.alt}
                width={1600}
                height={1000}
                sizes="(max-width: 760px) 92vw, 58vw"
              />
            </figure>
            <div className="project-info">
              <div className="project-index">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </div>
              <h3 id={`project-title-${project.id}`}>{project.name}</h3>
              <div className="project-status">
                <span>[VIEW PROJECT +]</span>
              </div>
              <dl>
                {[
                  ["Discipline", project.type],
                  ["Built with", project.technology],
                  ["My role", project.role],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="project-description">{project.description}</p>
            </div>
          </ProjectInteraction>
        ))}
      </div>
      <footer className="projects-footer">
        <span>Selected explorations</span>
        <span>Scroll to explore ↓</span>
      </footer>
      <ProjectsMotion />
    </section>
  );
}
