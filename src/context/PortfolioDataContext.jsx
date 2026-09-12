import { createContext, useContext, useMemo } from 'react';
import { portfolioData as defaultPortfolioData } from '../data/portfolioData';

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children, data = defaultPortfolioData }) {
  const value = useMemo(() => ({ data }), [data]);
  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) throw new Error('usePortfolioData must be used within PortfolioDataProvider.');
  return context;
}
