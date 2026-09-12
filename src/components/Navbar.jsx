import { useEffect, useRef, useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { formatSequenceNumber } from '../utils/formatSequenceNumber';
import Icon from './Icon';

export default function Navbar({ page, theme, onToggleTheme }) {
  const { data: portfolioData } = usePortfolioData();
  const navigation = portfolioData.navigation ?? [];
  const resumeUrl = portfolioData.person.resumeUrl?.trim();
  const externalResume = /^https?:\/\//i.test(resumeUrl || '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a className="brand" href="#/" aria-label={`${portfolioData.person.name}, back to home`} onClick={closeMenu}>
          <span className="brand__signature">{portfolioData.person.name}</span>
          <span className="brand__slash" aria-hidden="true">/</span>
        </a>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Main navigation">
          <div className="nav__mobile-head">
            <span>Navigate</span>
            <button className="icon-button" type="button" aria-label="Close navigation" onClick={closeMenu}><Icon name="close" /></button>
          </div>
          <ul>
            {navigation.map((item, index) => {
              const itemPage = item.page || item.href.replace(/^#\/?/, '').split('/')[0] || 'home';
              return (
                <li key={item.id || item.href}>
                  <a href={item.href} className={page === itemPage ? 'active' : ''} aria-current={page === itemPage ? 'page' : undefined} onClick={closeMenu}>
                    <span className="nav__number">{formatSequenceNumber(index)}</span>
                    {item.icon && <Icon name={item.icon} size={15} strokeWidth={2.2} />}
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="nav__mobile-email" href={`mailto:${portfolioData.person.email}`}>{portfolioData.person.email}</a>
        </nav>

        <div className="navbar__actions">
          <button className="icon-button theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={onToggleTheme}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          {resumeUrl && (
            <a
              className="button button--small button--outline navbar__cta navbar__resume-icon"
              href={resumeUrl}
              target={externalResume ? '_blank' : undefined}
              rel={externalResume ? 'noopener noreferrer' : undefined}
              download={externalResume ? undefined : true}
              aria-label="Download résumé"
              data-tooltip="Download résumé"
            >
              <Icon name="download" size={17} />
            </a>
          )}
          <button ref={menuButtonRef} className="icon-button menu-button" type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Icon name="menu" />
          </button>
        </div>
      </div>
      {menuOpen && <button className="nav-backdrop" type="button" aria-label="Close navigation" onClick={closeMenu} />}
    </header>
  );
}
