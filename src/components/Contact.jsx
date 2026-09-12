import { usePortfolioData } from '../context/PortfolioDataContext';
import SocialLinks from './SocialLinks';

export default function Contact() {
  const { data: portfolioData } = usePortfolioData();
  const { socials } = portfolioData;

  return (
    <section className="section contact contact--social-only" id="contact" aria-labelledby="contact-title">
      <div className="contact__constellations" aria-hidden="true" />
      <div className="contact__orb contact__orb--one" />
      <div className="contact__orb contact__orb--two" />
      <div className="container contact__layout">
        <div className="contact__find-me" data-reveal>
          <p>Keep in touch</p>
          <h2 id="contact-title">Find me on</h2>
          <span>Feel free to <strong>connect</strong> with me</span>
          <SocialLinks socials={socials} className="contact__social-orbs" iconSize={25} />
        </div>
      </div>
    </section>
  );
}
