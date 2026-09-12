import { useEffect } from 'react';

/**
 * Reveals elements marked with `[data-reveal]` as they enter the viewport.
 * `routeKey` re-registers elements after a hash-page change; reduced-motion
 * visitors receive the content immediately without transition dependencies.
 */
export function useReveal(routeKey) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [routeKey]);
}
