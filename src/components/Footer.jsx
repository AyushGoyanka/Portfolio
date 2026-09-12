import { usePortfolioData } from '../context/PortfolioDataContext';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { data: portfolioData } = usePortfolioData();
  const year = new Date().getFullYear();
  const quote = portfolioData.person.footerQuote || 'Build with purpose. Refine with care. Ship something meaningful.';
  return (
    <footer className="footer">
      <div className="footer__constellations" aria-hidden="true" />
      <div className="container footer__inner">
        <blockquote className="footer__quote">
          <p>“{quote}”</p>
          <cite>— {portfolioData.person.shortName}</cite>
        </blockquote>

        <div className="footer__bottom">
          <p>Copyright © {year} {portfolioData.person.shortName}</p>
          <p className="footer__credit">Developed with <span aria-label="love">♥</span> by {portfolioData.person.name}</p>
          <div className="footer__actions">
            <SocialLinks socials={portfolioData.socials} iconSize={17} />
          </div>
        </div>
      </div>
    </footer>
  );
}
