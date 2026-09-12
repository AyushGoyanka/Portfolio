import { useEffect, useState } from 'react';

const greetings = [
  { text: 'Hello', language: 'English', lang: 'en' },
  { text: 'नमस्ते', language: 'Hindi', lang: 'hi' },
  { text: 'ನಮಸ್ಕಾರ', language: 'Kannada', lang: 'kn' },
  { text: 'Bonjour', language: 'French', lang: 'fr' },
  { text: 'Hola', language: 'Spanish', lang: 'es' },
  { text: 'Ciao', language: 'Italian', lang: 'it' },
  { text: 'こんにちは', language: 'Japanese', lang: 'ja' },
  { text: 'Olá', language: 'Portuguese', lang: 'pt' },
];

export default function GreetingRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % greetings.length);
    }, 2300);
    return () => window.clearInterval(interval);
  }, []);

  const greeting = greetings[index];

  return (
    <div className="hero-greeting">
      <span className="sr-only">A greeting in multiple languages:</span>
      <span key={greeting.text} className="hero-greeting__word" lang={greeting.lang} aria-hidden="true">
        {greeting.text}
      </span>
      <span className="hero-greeting__language" aria-hidden="true">{greeting.language}</span>
    </div>
  );
}
