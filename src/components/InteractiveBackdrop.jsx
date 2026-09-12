import { useEffect, useRef } from 'react';

const stars = Array.from({ length: 34 }, (_, index) => ({
  x: (index * 37 + 11) % 100,
  y: (index * 61 + 17) % 100,
  size: 1 + (index % 3) * 0.65,
  delay: -((index * 0.37) % 4),
}));

export default function InteractiveBackdrop() {
  const backdropRef = useRef(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!backdrop || reduceMotion) return undefined;

    let frame;
    const updatePosition = (event) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = event.clientX;
        const y = event.clientY;
        const offsetX = (x / window.innerWidth - 0.5) * 24;
        const offsetY = (y / window.innerHeight - 0.5) * 18;
        backdrop.style.setProperty('--pointer-x', `${x}px`);
        backdrop.style.setProperty('--pointer-y', `${y}px`);
        backdrop.style.setProperty('--drift-x', `${offsetX}px`);
        backdrop.style.setProperty('--drift-y', `${offsetY}px`);
      });
    };

    window.addEventListener('pointermove', updatePosition, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', updatePosition);
    };
  }, []);

  return (
    <div className="interactive-backdrop" ref={backdropRef} aria-hidden="true">
      <div className="interactive-backdrop__aurora interactive-backdrop__aurora--pointer" />
      <div className="interactive-backdrop__aurora interactive-backdrop__aurora--ambient" />
      <div className="interactive-backdrop__stars">
        {stars.map((star, index) => (
          <i
            key={index}
            style={{ '--star-x': `${star.x}%`, '--star-y': `${star.y}%`, '--star-size': `${star.size}px`, '--star-delay': `${star.delay}s` }}
          />
        ))}
      </div>
      <div className="interactive-backdrop__grain" />
    </div>
  );
}
