import { usePortfolioData } from '../context/PortfolioDataContext';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

export default function Projects() {
  const { data: portfolioData } = usePortfolioData();
  const projects = portfolioData.projects ?? [];

  if (!projects.length) return null;

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="projects__constellations" aria-hidden="true" />
      <div className="container projects__inner">
        <SectionTitle
          eyebrow="Selected work"
          title={(
            <span id="projects-title">
              A few things I’m <span className="projects__title-accent">proud</span> to have made.
            </span>
          )}
          description="A selection of products where strategy, interface, and engineering came together."
        />
        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
