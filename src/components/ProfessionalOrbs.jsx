import Icon from './Icon';

export default function ProfessionalOrbs({ socials, className = '' }) {
  const github = socials.find((social) => social.icon === 'github');
  const linkedin = socials.find((social) => social.icon === 'linkedin');

  return (
    <div className={`about__visual professional-orbs ${className}`.trim()} aria-label="Professional links and interests">
      <a
        className="about-orb about-orb--linkedin"
        href={linkedin?.href || 'https://www.linkedin.com'}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit LinkedIn profile"
        data-tooltip="LinkedIn"
      >
        <Icon name="linkedin" size={86} strokeWidth={1.55} />
      </a>
      <a
        className="about-orb about-orb--code"
        href={github?.href || 'https://github.com'}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit GitHub profile"
        data-tooltip="GitHub"
      >
        <span>&lt;/&gt;</span>
      </a>
      <a className="about-orb about-orb--craft" href="#/skills" aria-label="Explore my skills" data-tooltip="Skills">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M5 67 35 42c6-5 11-5 17 0l10 8c5 4 9 4 14 0l19-16v61H5V67Z" />
          <path d="M5 54 30 33c6-5 11-5 17 0l13 11" />
        </svg>
      </a>
      <a className="about-orb about-orb--ideas" href="#/portfolio" aria-label="Explore my portfolio" data-tooltip="Portfolio">
        <Icon name="sparkles" size={82} strokeWidth={1.3} />
      </a>
    </div>
  );
}
