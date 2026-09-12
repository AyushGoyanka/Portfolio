import { useEffect, useRef, useState } from 'react';

const snippets = [
  {
    id: 'react',
    label: 'Portfolio.jsx',
    language: 'React',
    output: '✓ Portfolio rendered in 42ms',
    lines: [
      "import { useState } from 'react';",
      '',
      'export default function Portfolio() {',
      '  const [ideas] = useState([',
      "    'design', 'code', 'impact'",
      '  ]);',
      '',
      '  return <Build ideas={ideas} />;',
      '}',
    ],
  },
  {
    id: 'api',
    label: 'launch.js',
    language: 'API',
    output: '✓ Idea shipped successfully',
    lines: [
      'export async function launch(idea) {',
      "  const response = await fetch('/build', {",
      "    method: 'POST',",
      '    body: JSON.stringify(idea),',
      '  });',
      '',
      '  const product = await response.json();',
      '  return product.ready;',
      '}',
    ],
  },
  {
    id: 'css',
    label: 'magic.css',
    language: 'CSS',
    output: '✓ Styles polished and responsive',
    lines: [
      '.experience {',
      '  display: grid;',
      '  gap: clamp(1rem, 3vw, 3rem);',
      '  color: #f8f6fb;',
      '}',
      '',
      '.experience:hover {',
      '  transform: translateY(-4px);',
      '}',
    ],
  },
];

const tokenPattern = /(\b(?:import|from|export|default|function|const|return|async|await|new)\b|['"][^'"]*['"]|<[^>]+>|#[a-fA-F0-9]{3,8}|\b\d+(?:ms|rem|vw|px)?\b)/g;

function highlight(line) {
  return line.split(tokenPattern).map((part, index) => {
    let className = '';
    if (/^(import|from|export|default|function|const|return|async|await|new)$/.test(part)) className = 'code-token--keyword';
    else if (/^['"]/.test(part)) className = 'code-token--string';
    else if (/^</.test(part)) className = 'code-token--tag';
    else if (/^#|^\d/.test(part)) className = 'code-token--value';
    return <span className={className} key={`${part}-${index}`}>{part}</span>;
  });
}

export default function InteractiveCodeLab() {
  const [activeId, setActiveId] = useState('react');
  const [status, setStatus] = useState('Ready — choose a file or run the code');
  const [running, setRunning] = useState(false);
  const timerRef = useRef();
  const labRef = useRef(null);
  const activeSnippet = snippets.find((snippet) => snippet.id === activeId);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const selectSnippet = (snippet) => {
    window.clearTimeout(timerRef.current);
    setActiveId(snippet.id);
    setRunning(false);
    setStatus(`${snippet.language} file ready`);
  };

  const runCode = () => {
    window.clearTimeout(timerRef.current);
    setRunning(true);
    setStatus('Running build…');
    timerRef.current = window.setTimeout(() => {
      setRunning(false);
      setStatus(activeSnippet.output);
    }, 720);
  };

  const handlePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = labRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    labRef.current.style.setProperty('--code-rotate-x', `${y * -4}deg`);
    labRef.current.style.setProperty('--code-rotate-y', `${x * 5}deg`);
    labRef.current.style.setProperty('--code-glow-x', `${(x + 0.5) * 100}%`);
    labRef.current.style.setProperty('--code-glow-y', `${(y + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    labRef.current.style.setProperty('--code-rotate-x', '0deg');
    labRef.current.style.setProperty('--code-rotate-y', '0deg');
  };

  return (
    <div className="code-lab" ref={labRef} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="code-lab__window">
        <div className="code-lab__topbar">
          <div className="code-lab__dots" aria-hidden="true"><i /><i /><i /></div>
          <span>creative-workspace</span>
          <button className={running ? 'is-running' : ''} type="button" onClick={runCode} disabled={running}>
            <span aria-hidden="true">▶</span>{running ? 'Running' : 'Run'}
          </button>
        </div>

        <div className="code-lab__tabs" role="tablist" aria-label="Code examples">
          {snippets.map((snippet) => (
            <button
              className={snippet.id === activeId ? 'is-active' : ''}
              type="button"
              role="tab"
              aria-selected={snippet.id === activeId}
              onClick={() => selectSnippet(snippet)}
              key={snippet.id}
            >
              <span>{snippet.id === 'react' ? '⚛︎' : snippet.id === 'css' ? '#' : '{ }'}</span>{snippet.label}
            </button>
          ))}
        </div>

        <div className="code-lab__editor" role="tabpanel" aria-label={`${activeSnippet.label} code`}>
          <ol>
            {activeSnippet.lines.map((line, index) => (
              <li key={`${activeId}-${index}`}><span>{index + 1}</span><code>{line ? highlight(line) : '\u00A0'}</code></li>
            ))}
          </ol>
        </div>

        <div className="code-lab__terminal" aria-live="polite">
          <span aria-hidden="true">›_</span>
          <p className={running ? 'is-running' : ''}>{status}</p>
          <i aria-hidden="true" />
        </div>
      </div>
      <span className="code-lab__float code-lab__float--one" aria-hidden="true">01</span>
      <span className="code-lab__float code-lab__float--two" aria-hidden="true">{'{ }'}</span>
    </div>
  );
}
