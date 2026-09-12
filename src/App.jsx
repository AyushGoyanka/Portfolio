import { useEffect, useLayoutEffect, useState } from 'react';
import Footer from './components/Footer';
import InteractiveBackdrop from './components/InteractiveBackdrop';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { useReveal } from './hooks/useReveal';
import ExperiencePage from './pages/ExperiencePage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import SkillsPage from './pages/SkillsPage';

const pages = {
  home: HomePage,
  skills: SkillsPage,
  portfolio: PortfolioPage,
  experience: ExperiencePage,
};

/** Normalize supported hash aliases while safely falling back to Home. */
function getPageFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0].toLowerCase();
  if (!route || route === 'home' || route === 'about') return 'home';
  if (route === 'projects' || route === 'certificates') return 'portfolio';
  return pages[route] ? route : 'home';
}

/** Prefer a saved choice, then use the visitor's operating-system preference. */
function getInitialTheme() {
  const bootTheme = document.documentElement.dataset.theme;
  if (bootTheme === 'light' || bootTheme === 'dark') return bootTheme;
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage may be unavailable in hardened/private browser contexts.
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [page, setPage] = useState(getPageFromHash);
  useReveal(page);

  useLayoutEffect(() => {
    // Apply before paint so direct route loads do not flash the wrong theme.
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e0c16' : '#f7f3fa');
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Theme switching still works for the current visit without persistence.
    }
  }, [theme]);

  useEffect(() => {
    const handleRouteChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  const CurrentPage = pages[page];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <InteractiveBackdrop />
      <Navbar page={page} theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <main className={`page-shell page-shell--${page}`} id="main-content" key={page}>
        <CurrentPage />
      </main>
      <Footer />
    </>
  );
}
