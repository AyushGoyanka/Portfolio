import { usePortfolioData } from '../context/PortfolioDataContext';
import ExperienceTimeline from './ExperienceTimeline';

export default function Experience() {
  const { data: portfolioData } = usePortfolioData();
  const experience = portfolioData.experience ?? [];
  const isEducation = (item) => item.type === 'education' || item.education === true;
  const career = experience.filter((item) => !isEducation(item));
  const education = experience.filter(isEducation);
  const highlights = career
    .flatMap((item) => (item.achievements ?? []).map((achievement) => ({ achievement, company: item.company })));
  const lowerPanelCount = Number(education.length > 0) + Number(highlights.length > 0);

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="experience__constellations" aria-hidden="true" />
      <div className="container experience__inner">
        <header className="experience__header" data-reveal>
          <p>The journey so far</p>
          <h2 id="experience-title">Professional <span>experience</span></h2>
          <span>A timeline of the teams, products, and challenges that have shaped my work.</span>
        </header>

        {career.length > 0 && <ExperienceTimeline items={career} />}

        {lowerPanelCount > 0 && (
          <div className={`experience__lower${lowerPanelCount === 1 ? ' experience__lower--single' : ''}`}>
            {education.length > 0 && (
              <section className="experience-panel" aria-labelledby="education-title" data-reveal>
                <h3 id="education-title">Education</h3>
                <ol className="education-timeline">
                  {education.map((item) => (
                    <li key={item.id || `${item.company}-${item.period}`}>
                      <span className="education-timeline__dot" aria-hidden="true" />
                      <h4>{item.role}</h4>
                      <strong>{item.company}</strong>
                      <p>{[item.period, item.location].filter(Boolean).join(' · ')}</p>
                      {item.description && <span>{item.description}</span>}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {highlights.length > 0 && (
              <section className="experience-panel" aria-labelledby="highlights-title" data-reveal>
                <h3 id="highlights-title">Career <span>highlights</span></h3>
                <ul className="career-highlights">
                  {highlights.map(({ achievement, company }, index) => (
                    <li key={`${company}-${achievement}-${index}`}>
                      <span aria-hidden="true">✧</span>
                      <p>{achievement} <small>— {company}</small></p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
