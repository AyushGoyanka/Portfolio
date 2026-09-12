import Icon from './Icon';
import { formatSequenceNumber } from '../utils/formatSequenceNumber';

export default function CertificateCard({ certificate, index }) {
  const skills = certificate.skills ?? [];
  const hasFooter = Boolean(certificate.credentialId || certificate.verificationUrl);

  return (
    <article className="certificate-card" style={{ '--certificate-index': index }} data-reveal>
      <div className="certificate-card__top">
        <span className="certificate-card__badge" aria-hidden="true"><Icon name="award" size={29} /></span>
        <span className="certificate-card__number">{formatSequenceNumber(index)}</span>
      </div>
      <p className="certificate-card__issuer">{certificate.issuer}</p>
      <h3>{certificate.title}</h3>
      <p className="certificate-card__date">Issued {certificate.issued}</p>
      {skills.length > 0 && (
        <ul aria-label={`${certificate.title} skills`}>
          {skills.map((skill, skillIndex) => <li key={`${skill}-${skillIndex}`}>{skill}</li>)}
        </ul>
      )}
      {hasFooter && (
        <div className="certificate-card__footer">
          {certificate.credentialId && <span>{certificate.credentialId}</span>}
          {certificate.verificationUrl && (
            <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
              View credential <Icon name="arrowUpRight" size={15} />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
