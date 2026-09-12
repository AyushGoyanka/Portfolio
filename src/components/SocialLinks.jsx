import Icon from './Icon';

const isHttpUrl = (href) => /^https?:\/\//i.test(href);

export default function SocialLinks({ socials = [], className = 'social-links', iconSize = 18 }) {
  const validSocials = Array.isArray(socials)
    ? socials.filter(
      (social) => typeof social?.label === 'string'
        && social.label.trim()
        && typeof social.href === 'string'
        && social.href.trim(),
    )
    : [];

  return (
    <div className={className}>
      {validSocials.map((social) => {
        const label = social.label.trim();
        const href = social.href.trim();
        const external = isHttpUrl(href);

        return (
          <a
            key={social.id || `${label}-${href}`}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={label}
            data-tooltip={label}
          >
            <Icon name={social.icon || 'sparkles'} size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
