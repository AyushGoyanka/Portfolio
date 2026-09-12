export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-title section-title--${align}`} data-reveal>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-title__description">{description}</p>}
    </div>
  );
}
