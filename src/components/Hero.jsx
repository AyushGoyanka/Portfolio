import { usePortfolioData } from '../context/PortfolioDataContext';
import GreetingRotator from './GreetingRotator';
import HeroArtwork from './HeroArtwork';
import CompanyRotator from './CompanyRotator';
import SocialLinks from './SocialLinks';

export default function Hero() {
  const { data: portfolioData } = usePortfolioData();
  const { person, socials } = portfolioData;

  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-constellations" aria-hidden="true" />
      <div className="hero__glow hero__glow--one" />
      <div className="hero__glow hero__glow--two" />
      <div className="container hero__grid">
        <div className="hero__content">
          <div className="hero__identity" data-reveal>
            <GreetingRotator />
            <h1 id="hero-title"><small>I’m</small> <strong>{person.name}</strong><span>.</span></h1>
            <CompanyRotator experience={portfolioData.experience} role={person.heroRole || 'Software Engineer'} />
          </div>
          <div className="hero__socials" data-reveal>
            <span>Find me on</span>
            <SocialLinks socials={socials} />
          </div>
        </div>

        <div className="hero__visual" data-reveal>
          <HeroArtwork imageSrc={person.heroImage} imageAlt={person.heroImageAlt} />
        </div>
      </div>

    </section>
  );
}
