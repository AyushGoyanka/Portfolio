import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const modes = [
  { id: 'ideas', label: 'Generate ideas', icon: 'sparkles' },
  { id: 'build', label: 'Build a concept', icon: 'code' },
  { id: 'explain', label: 'Explain simply', icon: 'layout' },
];

const suggestions = [
  { label: 'Smarter portfolio', prompt: 'Design an AI feature that makes a personal portfolio more useful.' },
  { label: 'Product idea', prompt: 'Create a thoughtful generative AI product for remote creative teams.' },
  { label: 'Explain React', prompt: 'Explain React state like I am new to frontend development.' },
];

const initialResponse = [
  'Choose a creative mode and describe what you want to explore.',
  'This interactive demo generates ideas locally in your browser.',
];

function createResponse(mode, prompt) {
  const subject = prompt.trim().replace(/[.!?]+$/, '');
  const shortSubject = subject.length > 72 ? `${subject.slice(0, 69)}…` : subject;

  if (mode === 'build') {
    return [
      `Concept: ${shortSubject}`,
      'Start with one focused user journey and a calm conversational interface.',
      'Add transparent AI feedback, editable results, and a clear human approval step.',
    ];
  }

  if (mode === 'explain') {
    return [
      `A simple way to think about “${shortSubject}”:` ,
      'It takes an input, keeps the useful context, and produces a result you can refine.',
      'The best experience keeps the person in control at every step.',
    ];
  }

  return [
    `Three directions for “${shortSubject}”:` ,
    'A personal copilot that turns rough notes into a polished, editable story.',
    'A visual idea map that connects related concepts and suggests the next useful action.',
    'A lightweight review assistant that explains its recommendations before applying them.',
  ];
}

export default function GenerativeAiPlayground() {
  const [mode, setMode] = useState('ideas');
  const [prompt, setPrompt] = useState('Design an AI experience that feels useful, calm, and human.');
  const [response, setResponse] = useState(initialResponse);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const timerRef = useRef();
  const studioRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const generate = (event) => {
    event.preventDefault();
    const value = prompt.trim();
    if (!value) {
      setError('Add a prompt to generate a response.');
      return;
    }

    window.clearTimeout(timerRef.current);
    setError('');
    setGenerating(true);
    timerRef.current = window.setTimeout(() => {
      setResponse(createResponse(mode, value));
      setGenerating(false);
    }, 850);
  };

  const chooseSuggestion = (suggestion) => {
    setPrompt(suggestion.prompt);
    setError('');
  };

  const handlePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = studioRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    studioRef.current.style.setProperty('--ai-rotate-x', `${y * -3.2}deg`);
    studioRef.current.style.setProperty('--ai-rotate-y', `${x * 4.2}deg`);
    studioRef.current.style.setProperty('--ai-light-x', `${(x + 0.5) * 100}%`);
    studioRef.current.style.setProperty('--ai-light-y', `${(y + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    studioRef.current.style.setProperty('--ai-rotate-x', '0deg');
    studioRef.current.style.setProperty('--ai-rotate-y', '0deg');
  };

  return (
    <div className="ai-studio" ref={studioRef} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="ai-studio__shell">
        <header className="ai-studio__header">
          <span className="ai-studio__logo"><Icon name="sparkles" size={22} /></span>
          <div>
            <strong>Generative AI Studio</strong>
            <span><i /> Interactive browser demo</span>
          </div>
          <span className="ai-studio__model">AI · 01</span>
        </header>

        <div className="ai-studio__modes" role="tablist" aria-label="AI task">
          {modes.map((item) => (
            <button
              className={mode === item.id ? 'is-active' : ''}
              type="button"
              role="tab"
              aria-selected={mode === item.id}
              onClick={() => setMode(item.id)}
              key={item.id}
            >
              <Icon name={item.icon} size={15} />{item.label}
            </button>
          ))}
        </div>

        <div className={`ai-studio__response ${generating ? 'is-generating' : ''}`} aria-live="polite" aria-busy={generating}>
          <div className="ai-studio__brain" aria-hidden="true">
            <i /><i /><i /><span><Icon name="sparkles" size={24} /></span>
          </div>
          <div className="ai-studio__answer">
            <div><span>AI response</span><small>{generating ? 'thinking…' : 'ready'}</small></div>
            {generating ? (
              <div className="ai-studio__skeleton" aria-label="Generating response"><i /><i /><i /></div>
            ) : (
              <ul key={response[0]}>
                {response.map((line, index) => <li key={`${line}-${index}`}><span>{index ? '✦' : '→'}</span>{line}</li>)}
              </ul>
            )}
          </div>
        </div>

        <form className="ai-studio__composer" onSubmit={generate}>
          <label className="sr-only" htmlFor="ai-prompt">Ask the generative AI demo</label>
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Describe something you want to create…"
            maxLength={220}
            rows={2}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'ai-prompt-error' : 'ai-privacy-note'}
          />
          <button type="submit" disabled={generating}>
            <Icon name="sparkles" size={17} />{generating ? 'Creating…' : 'Generate'}
          </button>
          {error && <span className="ai-studio__error" id="ai-prompt-error" role="alert">{error}</span>}
        </form>

        <div className="ai-studio__suggestions">
          <span>Try a prompt</span>
          {suggestions.map((suggestion) => (
            <button type="button" onClick={() => chooseSuggestion(suggestion)} key={suggestion.label}>{suggestion.label}</button>
          ))}
        </div>

        <footer className="ai-studio__footer" id="ai-privacy-note">
          <span><Icon name="check" size={13} /> Frontend-only interaction</span>
          <span>No data leaves your browser</span>
        </footer>
      </div>
    </div>
  );
}
