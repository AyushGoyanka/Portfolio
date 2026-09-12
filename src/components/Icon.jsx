const icons = {
  award: <><circle cx="12" cy="8" r="5" /><path d="m8.8 12.1-1.3 9 4.5-2.7 4.5 2.7-1.3-9" /><path d="m10 8 1.3 1.3L14 6.7" /></>,
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowDown: <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>,
  arrowUp: <><path d="m18 15-6-6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  copy: <><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>,
  dribbble: <><circle cx="12" cy="12" r="10" /><path d="M8.5 2.8c3 3.8 5.1 7.8 6.3 12.3" /><path d="M2.2 11.5c4.6.1 9.2-.9 13.2-3.1" /><path d="M5.2 19.4c2.2-3.4 5.6-5.7 9.6-6.3 2.3-.3 4.6 0 6.7.8" /></>,
  github: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1.4S17.9 0 15 2a13.4 13.4 0 0 0-7 0C5.1 0 3.9.4 3.9.4A5.4 5.4 0 0 0 3.7 3a5.8 5.8 0 0 0-1.5 4.1c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 8 18v4" />,
  instagram: <><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" /></>,
  layout: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></>,
  leetcode: <><path d="m13.3 3-7.1 7.1a4 4 0 0 0 0 5.7l3.1 3.1a4 4 0 0 0 5.7 0l2-2" /><path d="M9 12h10" /><path d="m8.2 8.1 3-3a3 3 0 0 1 4.2 0l1.1 1.1" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></>,
  trash: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="m19 6-1 15H6L5 6" /><path d="M10 11v5" /><path d="M14 11v5" /></>,
  rotate: <><path d="M21 12a9 9 0 0 1-15.7 6" /><path d="M3 12A9 9 0 0 1 18.7 6" /><path d="M18 2v5h-5" /><path d="M6 22v-5h5" /></>,
  download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
  code: <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
  folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" /><path d="M3 10h18" /></>,
  briefcase: <><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M2 12h20" /><path d="M10 12v2h4v-2" /></>,
  server: <><rect width="20" height="8" x="2" y="3" rx="2" /><rect width="20" height="8" x="2" y="13" rx="2" /><path d="M6 7h.01" /><path d="M6 17h.01" /></>,
  sparkles: <><path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9Z" /><path d="m5 17-.7 1.8L2.5 19.5l1.8.7L5 22l.7-1.8 1.8-.7-1.8-.7Z" /><path d="m19 2-.7 1.8-1.8.7 1.8.7L19 7l.7-1.8 1.8-.7-1.8-.7Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.42 1.42" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>,
  tool: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.8 7.8l-7 7a2.1 2.1 0 0 1-3-3l7-7a6 6 0 0 1 7.8-7.8z" />,
  topmate: <><path d="M12 3.2 13.7 8l4.8 1.7-4.8 1.7-1.7 4.8-1.7-4.8-4.8-1.7L10.3 8 12 3.2Z" /><path d="m18.6 15.2.7 2 .2.1 2 .7-2 .7-.2.1-.7 2-.7-2-.2-.1-2-.7 2-.7.2-.1.7-2Z" /><path d="M5.2 16.1a3.2 3.2 0 0 0-3 3.2v1.5h6v-1.5a3.2 3.2 0 0 0-3-3.2Z" /><circle cx="5.2" cy="12.3" r="2.1" /></>,
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.8 }) {
  // A visible neutral glyph is safer than an empty SVG when a config icon is misspelled.
  const glyph = icons[name] ?? icons.sparkles;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {glyph}
    </svg>
  );
}
