import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioDataProvider>
      <App />
    </PortfolioDataProvider>
  </StrictMode>,
);

/** Fade away the pre-React loader after React has had time to commit a frame. */
function dismissInitialLoader() {
  const loader = document.getElementById('app-loader');
  if (!loader || loader.classList.contains('app-loader--leaving')) return;

  window.requestAnimationFrame(() => {
    loader.classList.add('app-loader--leaving');
    window.setTimeout(() => loader.remove(), 400);
  });
}

// Two frames avoid covering rendered UI without waiting for heavy images/fonts.
window.requestAnimationFrame(() => window.requestAnimationFrame(dismissInitialLoader));
