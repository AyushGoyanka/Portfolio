const marks = {
  'React': '⚛︎',
  'Next.js': 'N.',
  'TypeScript': 'TS',
  'JavaScript': 'JS',
  'HTML & CSS': '</>',
  'Framer Motion': 'FM',
  'Node.js': 'NODE',
  'Python': 'Py',
  'PostgreSQL': 'PG',
  'GraphQL': 'GQL',
  'REST APIs': 'API',
  'Redis': 'R',
  'Git': 'git',
  'Docker': '▱',
  'AWS': 'AWS',
  'Vercel': '▲',
  'Figma': 'F',
  'CI/CD': 'CI',
  'System Design': 'SD',
  'UX Thinking': 'UX',
  'Mentoring': 'M+',
  'Agile Delivery': '↻',
  'Technical Writing': 'TW',
};

function createMark(label) {
  if (marks[label]) return marks[label];
  return label
    .split(/\s|&|\//)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function SkillTile({ skill, index }) {
  return (
    <li className="skill-tile" style={{ '--tile-index': index }} data-reveal>
      <span className="skill-tile__mark" aria-hidden="true">{createMark(skill)}</span>
      <strong>{skill}</strong>
    </li>
  );
}
