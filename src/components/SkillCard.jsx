import Icon from './Icon';

export default function SkillCard({ skill }) {
  return (
    <article className="skill-card" data-reveal>
      <div className="skill-card__icon"><Icon name={skill.icon} size={23} /></div>
      <h3>{skill.category}</h3>
      <p>{skill.description}</p>
      <ul aria-label={`${skill.category} skills`}>
        {skill.items.map((item, index) => <li key={item} style={{ '--skill-index': index }}>{item}</li>)}
      </ul>
    </article>
  );
}
