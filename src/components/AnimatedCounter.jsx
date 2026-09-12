import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ value }) {
  const elementRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const target = Number.parseInt(value, 10) || 0;
  const suffix = value.replace(String(target), '');

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return undefined;
    }

    let animationFrame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const duration = 1350;

        const animate = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplayValue(Math.round(target * eased));
          if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
        };

        animationFrame = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  return (
    <span ref={elementRef} aria-label={value}>
      <span aria-hidden="true">{displayValue}{suffix}</span>
    </span>
  );
}
