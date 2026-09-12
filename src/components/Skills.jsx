import { usePortfolioData } from '../context/PortfolioDataContext';
import SkillTile from './SkillTile';

export default function Skills() {
  const { data: portfolioData } = usePortfolioData();
  const skillGroups = portfolioData.skills ?? [];
  const sectionDefinitions = portfolioData.skillSections ?? [];
  const configuredSectionIds = new Set(sectionDefinitions.map((section) => section.id));

  // Explicit section IDs keep presentation stable when a category is renamed.
  // Unconfigured groups still render independently, making draft additions safe.
  const configuredGroups = sectionDefinitions.map((section) => ({
    ...section,
    items: skillGroups
      .filter((group) => group.section === section.id)
      .flatMap((group) => group.items ?? []),
  }));
  const unconfiguredGroups = skillGroups
    .filter((group) => !configuredSectionIds.has(group.section))
    .map((group) => ({
      id: group.id || group.category,
      eyebrow: group.category || 'Additional skills',
      title: group.category || 'Additional',
      accent: group.category ? undefined : 'skills',
      description: group.description,
      items: group.items ?? [],
    }));
  const groups = [...configuredGroups, ...unconfiguredGroups].filter((group) => group.items.length);

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="skills__constellations" aria-hidden="true" />
      <div className="container skills__inner">
        {groups.map((group, groupIndex) => (
          <div className="skills__group" key={group.id || group.eyebrow}>
            <header className="skills__header" data-reveal>
              <p>{group.eyebrow}</p>
              <h2 id={groupIndex === 0 ? 'skills-title' : undefined}>
                {group.title}{group.accent && <> <span>{group.accent}</span></>}
              </h2>
              {group.description && <span>{group.description}</span>}
            </header>
            <ul className="skills__tile-grid" aria-label={`${group.eyebrow} skills`}>
              {group.items.map((skill, index) => (
                <SkillTile skill={skill} index={index} key={`${group.id || group.eyebrow}-${skill}-${index}`} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
