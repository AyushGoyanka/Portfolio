import { usePortfolioData } from '../context/PortfolioDataContext';

export default function About() {
  const { data: portfolioData } = usePortfolioData();
  const { person, principles } = portfolioData;

  return (
    <section className="section about about--centered" id="about" aria-labelledby="about-title">
      <div className="about__constellations" aria-hidden="true" />
      <div className="container about__inner">
        <header className="about__header" data-reveal>
          <p>A little about me</p>
          <h2 id="about-title">Let me <span>introduce</span> myself</h2>
        </header>

        <div className="about__grid about__grid--centered">
          <div className="about__copy" data-reveal>
            <p className="about__lead">{person.about}</p>
            <div className="about__highlights">
              {principles.map((principle) => (
                <p className="about__highlight" key={principle.id || principle.title}>
                  <strong>{principle.title}.</strong> {principle.description}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
