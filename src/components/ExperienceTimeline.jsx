import SafeImage from './SafeImage';

export default function ExperienceTimeline({ items }) {
  const timelineItems = items ?? [];

  return (
    <ol className="timeline timeline--career">
      {timelineItems.map((item) => {
        const achievements = item.achievements ?? [];
        const hasCompanyImage = Boolean(item.image);

        return (
          <li className="timeline__item" key={item.id || `${item.company}-${item.period}`} data-reveal>
            <div className="timeline__rail" aria-hidden="true"><span /></div>
            <div className={`timeline__entry${hasCompanyImage ? '' : ' timeline__entry--no-visual'}`}>
              <div className="timeline__content">
                <h3>{item.role}</h3>
                <div className="timeline__meta">
                  <strong>{item.company}</strong>
                  {item.location && <span>{item.location}</span>}
                </div>
                <p className="timeline__period">{item.period}</p>
                {item.description && <p>{item.description}</p>}
                {achievements.length > 0 && (
                  <ul>
                    {achievements.map((achievement, achievementIndex) => (
                      <li key={`${achievement}-${achievementIndex}`}><span aria-hidden="true">✧</span>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
              {hasCompanyImage && (
                <figure className="timeline__company-visual">
                  <SafeImage src={item.image} alt={item.imageAlt || `${item.company} visual identity`} />
                </figure>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
