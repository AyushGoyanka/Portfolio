import { usePortfolioData } from '../context/PortfolioDataContext';
import CertificateCard from './CertificateCard';

export default function Certificates() {
  const { data: portfolioData } = usePortfolioData();
  const certificates = portfolioData.certificates || [];

  if (!certificates.length) return null;

  return (
    <section className="section certificates" id="certificates" aria-labelledby="certificates-title">
      <div className="certificates__constellations" aria-hidden="true" />
      <div className="container certificates__inner">
        <header className="certificates__header" data-reveal>
          <p>Continuous learning</p>
          <h2 id="certificates-title">Credentials &amp; <span>certifications</span></h2>
          <span>Focused learning that strengthens the way I design, build, and deliver software.</span>
        </header>
        <div className="certificates__grid">
          {certificates.map((certificate, index) => (
            <CertificateCard certificate={certificate} index={index} key={certificate.id || `${certificate.title}-${certificate.issued}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
