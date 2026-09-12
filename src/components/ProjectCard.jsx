import Icon from './Icon';
import SafeImage from './SafeImage';
import { formatSequenceNumber } from '../utils/formatSequenceNumber';

export default function ProjectCard({ project, index }) {
  const technologies = project.technologies ?? [];
  const hasDemo = Boolean(project.demo);
  const hasSource = Boolean(project.github);
  const visualContent = (
    <>
      <span className="project-card__index">{formatSequenceNumber(index)}</span>
      <SafeImage src={project.image} alt={project.alt || `${project.title} preview`} />
      {hasDemo && <span className="project-card__view"><Icon name="arrowUpRight" /></span>}
    </>
  );

  return (
    <article className={`project-card project-card--${project.accent || 'purple'}`} data-reveal>
      {hasDemo ? (
        <a className="project-card__visual" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open live demo of ${project.title}`}>
          {visualContent}
        </a>
      ) : (
        <div className="project-card__visual">{visualContent}</div>
      )}
      <div className="project-card__content">
        <p className="project-card__type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        {technologies.length > 0 && (
          <ul className="tag-list" aria-label={`${project.title} technologies`}>
            {technologies.map((technology, technologyIndex) => <li key={`${technology}-${technologyIndex}`}>{technology}</li>)}
          </ul>
        )}
        {(hasDemo || hasSource) && (
          <div className="project-card__links">
            {hasDemo && (
              <a className="text-link" href={project.demo} target="_blank" rel="noopener noreferrer">
                View project <Icon name="arrowUpRight" size={17} />
              </a>
            )}
            {hasSource && (
              <a className="project-card__github" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code on GitHub`}>
                <Icon name="github" size={19} /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
