import { useEffect, useMemo, useState } from 'react';

export default function CompanyRotator({ experience = [], role = 'Software Engineer' }) {
  const companies = useMemo(() => {
    const entries = experience
      .filter((item) => item.type !== 'education' && !item.education && item.company)
      .map((item) => ({
        name: item.company.trim(),
        current: typeof item.current === 'boolean' ? item.current : /present|current/i.test(item.period || ''),
      }))
      .filter((item, itemIndex, items) => item.name && items.findIndex((candidate) => candidate.name === item.name) === itemIndex);

    // Keep older data compatible, while preferring an explicit `current` flag.
    if (entries.length && !entries.some((item) => item.current)) {
      return entries.map((item, itemIndex) => ({ ...item, current: itemIndex === 0 }));
    }
    return entries;
  }, [experience]);
  const [index, setIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState(companies[0]?.name || 'Your Company');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setDisplayedName(companies[0]?.name || 'Your Company');
    setDeleting(false);
  }, [companies]);

  useEffect(() => {
    if (companies.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const company = companies[index];
    let delay = 92;

    if (!deleting && displayedName === company.name) delay = 1650;
    if (deleting) delay = displayedName ? 52 : 230;

    // Type the active company, pause, erase it, then advance to the next entry.
    const timer = window.setTimeout(() => {
      if (!deleting && displayedName === company.name) {
        setDeleting(true);
        return;
      }

      if (deleting && displayedName) {
        setDisplayedName((current) => current.slice(0, -1));
        return;
      }

      if (deleting && !displayedName) {
        setIndex((current) => (current + 1) % companies.length);
        setDeleting(false);
        return;
      }

      setDisplayedName(company.name.slice(0, displayedName.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [companies, deleting, displayedName, index]);

  const company = companies[index] || { name: 'Your Company', current: true };
  const accessibleCompanies = companies
    .map((item) => `${item.current ? 'currently at' : 'previously at'} ${item.name}`)
    .join(' and ');

  return (
    <p className="hero__role-line hero-company-line hero-company-line--single">
      <span className="sr-only">{role}, {accessibleCompanies || 'at your company'}</span>
      <span className="hero-company-line__role" aria-hidden="true">{role}</span>
      <span className="hero-company-line__organization" aria-hidden="true">
        {!company.current && <span className="hero-company-line__former">ex.&nbsp;</span>}
        <span className="hero-company-line__at">@</span>
        <span className="hero-company-line__viewport">
          <strong className="hero-company-line__name">{displayedName || '\u00A0'}</strong>
        </span>
        <i />
      </span>
    </p>
  );
}
