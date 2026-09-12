# React Portfolio

A responsive, frontend-only portfolio built with React, Vite, and plain CSS. Personal content is kept in one data file so experience, skills, projects, certificates, navigation, and social links can be extended without rewriting presentational components.

This is the developer and customization guide. For architecture diagrams, installation flow, deployment notes, and GitHub-facing technical documentation, see [docs/README.md](docs/README.md).

## Quick start

From the `portfolio` directory:

```bash
npm ci
npm run dev
```

Vite prints the local development URL. The remaining scripts are:

```bash
npm run build    # Create an optimized production build in dist/
npm run preview  # Serve dist/ locally for a production-style check
```

There are currently no lint or automated test scripts. A successful production build plus the manual checks below are the baseline verification steps.

## Project structure

```text
portfolio/
├── index.html                    # Metadata, pre-React loader, and app mount
├── public/                       # Images, résumé, favicon, and other static files
├── src/
│   ├── main.jsx                  # React entry point and data provider
│   ├── App.jsx                   # App shell, hash routing, theme, and page registry
│   ├── pages/                    # Route-level page composition
│   ├── components/               # Reusable sections, cards, controls, and artwork
│   ├── context/                  # Makes portfolio data available to components
│   ├── data/portfolioData.js     # Main content and navigation configuration
│   ├── hooks/                    # Shared behavior such as scroll reveals
│   └── styles/global.css         # Tokens, component styles, responsive rules, themes
├── package.json
└── package-lock.json
```

## Customize the content

Edit `src/data/portfolioData.js`. Arrays render in file order. Every configurable record has a stable `id`; keep IDs unique and avoid changing them merely because visible text changes.

Optional fields should be omitted when unused instead of being set to an empty string. Components hide optional images, links, tags, descriptions, and achievements when they are absent.

### Profile and hero

Update the `person` object for the site identity, email, résumé, biography, footer text, and hero artwork:

```js
person: {
  name: 'Your Name',
  shortName: 'YN',
  heroRole: 'Software Engineer',
  email: 'you@example.com',
  about: 'A short introduction about your work and interests.',
  footerQuote: 'A short personal statement.',
  resumeUrl: '/your-name-resume.pdf',
  heroImage: '/images/your-hero.webp',
  heroImageAlt: 'Developer working at a laptop with a code editor open',
},
```

When `heroImage` is meaningful, provide a concise `heroImageAlt`. Place the files in `public/` as described in [Assets](#assets).

`resumeUrl` accepts either a local public-file path such as `/your-name-resume.pdf` or a complete hosted URL such as `https://example.com/your-name-resume.pdf`. Local files use the browser's download behavior; hosted URLs open safely in a new tab, where the PDF host controls viewing or downloading.

### Navigation

Navigation is data-driven. A link's `page` must match a key registered in the `pages` map in `src/App.jsx`.

```js
navigation: [
  { id: 'home', label: 'Home', href: '#/', page: 'home', icon: 'home' },
  { id: 'skills', label: 'Skills', href: '#/skills', page: 'skills', icon: 'code' },
],
```

Adding a navigation item does not create a page. To add a route:

1. Create its component in `src/pages/`.
2. Import it and register it in the `pages` map in `src/App.jsx`.
3. Add a navigation entry whose `href` and `page` use that route key.

### Social links

Social entries automatically appear wherever the shared social list is rendered:

```js
socials: [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/your-name',
    icon: 'github',
  },
],
```

The `icon` value must exist in the registry in `src/components/Icon.jsx`. See [Icons](#icons) before introducing a new name.

### About principles

Add or reorder the short principles displayed in the About section:

```js
principles: [
  {
    id: 'clear-communication',
    title: 'Clear communication',
    description: 'I make technical decisions understandable and actionable.',
  },
],
```

### Skill sections and skills

`skillSections` controls the headings and order of the page's groups. A skill group's `section` must match a section `id`.

```js
skillSections: [
  {
    id: 'core',
    eyebrow: 'Core technologies',
    title: 'Professional',
    accent: 'Skillset',
    description: 'Languages, frameworks, and systems I use to build products.',
  },
  {
    id: 'tools',
    eyebrow: 'Workflow',
    title: 'Tools',
    accent: 'I use',
    description: 'Tools that support reliable delivery.',
  },
],

skills: [
  {
    id: 'frontend',
    section: 'core',
    category: 'Frontend',
    items: ['React', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    id: 'delivery-tools',
    section: 'tools',
    category: 'Delivery',
    items: ['Git', 'Docker', 'CI/CD'],
  },
],
```

`accent` is the optional highlighted text appended to `title`. Skill names that are not explicitly mapped in `SkillTile.jsx` receive an automatically generated text mark.

Multiple skill groups may reference the same section; their items are combined in data order. A group whose `section` has no matching definition is rendered as its own fallback section using `category` as the heading.

### Projects

Append a project to `projects`. `demo`, `github`, `image`, and `technologies` are optional:

```js
projects: [
  {
    id: 'signal-dashboard',
    title: 'Signal Dashboard',
    type: 'Analytics · Product engineering',
    description: 'A concise description of the problem and the result.',
    image: '/images/project-signal.webp',
    alt: 'Signal Dashboard showing a weekly analytics overview',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    demo: 'https://example.com/signal',
    github: 'https://github.com/your-name/signal',
    accent: 'blue',
  },
],
```

If `image` is present, also provide meaningful `alt` text. The built-in accent tokens are `purple`, `coral`, and `blue`; a new token also needs a matching `.project-card--<accent>` style in `global.css`.

### Work experience and education

Both use the `experience` array. Set `type` explicitly to `work` or `education`. The array order is the display order, and at most one work item should normally have `current: true`.

```js
experience: [
  {
    id: 'example-senior-engineer',
    type: 'work',
    current: true,
    period: '2024 — Present',
    role: 'Senior Software Engineer',
    company: 'Example Labs',
    location: 'Bengaluru, India',
    description: 'Leading a team that builds dependable customer-facing products.',
    achievements: [
      'Reduced a critical workflow from minutes to seconds.',
      'Created a shared frontend platform used by three teams.',
    ],
    image: '/images/company-example.svg',
    imageAlt: 'Example Labs logo',
  },
  {
    id: 'computer-science-degree',
    type: 'education',
    period: '2018 — 2022',
    role: 'B.Tech. Computer Science',
    company: 'Example University',
    location: 'Bengaluru, India',
    description: 'Focused on distributed systems and human-computer interaction.',
  },
],
```

`location`, `description`, `achievements`, `image`, and `imageAlt` are optional. Work achievements also feed the derived career-highlights panel in data order.

### Certificates

Append credentials to `certificates`. The entire section is hidden when the array is empty.

```js
certificates: [
  {
    id: 'aws-developer-associate',
    title: 'AWS Certified Developer — Associate',
    issuer: 'Amazon Web Services',
    issued: 'March 2026',
    credentialId: 'AWS-EXAMPLE-123',
    skills: ['AWS', 'Serverless'],
    verificationUrl: 'https://www.credly.com/example',
  },
],
```

`skills` and `verificationUrl` are optional. Omit `verificationUrl` when a public credential page is unavailable.

## Routes and theme

The site uses a lightweight hash router, so it needs no routing package and works on static hosting without server rewrite rules.

| URL | Page |
| --- | --- |
| `#/` | Home |
| `#/skills` | Skills |
| `#/portfolio` | Projects and certificates |
| `#/experience` | Work and education |

`#/home` and `#/about` resolve to Home. `#/projects` and `#/certificates` resolve to Portfolio. Unknown routes fall back to Home.

Theme selection is resolved in this order:

1. A saved `light` or `dark` value from the `portfolio-theme` local-storage key.
2. The operating system's preferred color scheme.

The active value is applied as `data-theme` on `<html>`, updates the browser theme color, and is persisted after the toggle is used. Theme rules live in `src/styles/global.css`.

The lightweight initial loader is defined inline in `index.html` so it can appear before the React and CSS bundles finish downloading. It waits briefly before appearing to avoid flashing on fast loads, follows the saved theme, respects reduced motion, and is dismissed by `src/main.jsx` after page load with a timeout fail-safe.

## Assets

Files under `public/` are served from the site root:

```text
public/images/project-signal.webp -> /images/project-signal.webp
public/your-name-resume.pdf       -> /your-name-resume.pdf
```

- Configure the hero image and résumé in `person`.
- Configure project and company images on their respective data entries.
- Update the favicon, page title, and meta description in `index.html`.
- Decorative constellation and texture paths are referenced from `src/styles/global.css`.
- Prefer optimized SVG, WebP, AVIF, or appropriately compressed PNG assets.

These examples use root-relative URLs. If the portfolio is deployed below a domain sub-path rather than at `/`, configure Vite's `base` option and update asset URL handling accordingly.

## Icons

`src/components/Icon.jsx` is the single SVG icon registry. Data entries refer to a registry key such as `github`, `linkedin`, `home`, or `code`.

Common configuration keys currently include `github`, `linkedin`, `leetcode`, `topmate`, `instagram`, `home`, `code`, `folder`, and `briefcase`. An unknown key displays the neutral `sparkles` fallback instead of leaving a blank control.

To add an icon:

1. Add its SVG paths under a unique key in the `icons` object.
2. Use that exact key in the data entry.
3. Keep the SVG compatible with the shared `24 × 24` view box and `currentColor` styling.

The `Icon` component is intentionally hidden from assistive technology. Its surrounding link or button must provide visible text or an `aria-label`.

## Accessibility and verification

The app includes a skip link, semantic headings and lists, labelled icon controls, keyboard-operable navigation and hero artwork, image fallbacks, focus-visible styles, and reduced-motion handling. Preserve these behaviors when extending components.

Before shipping a content or UI change:

- Run `npm run build` and resolve all errors.
- Open every route directly and through the navigation.
- Check all external links, the résumé download, and optional-link states.
- Test both light and dark themes at desktop and narrow mobile widths.
- Navigate using only the keyboard, including Tab, Enter, Space, Escape, and any documented arrow-key interaction.
- Enable reduced motion and confirm content remains visible without required animation.
- Give informative images concise alt text; use empty alt text for decorative images.
- Give each new section a unique heading ID and matching `aria-labelledby`.
- Check the browser console for duplicate IDs, missing list keys, and unknown icon names.

## Deployment notes

`npm run build` produces the deployable `dist/` directory. Publish that directory to any static host. Because the app is frontend-only:

- No application server or database is required.
- Portfolio data is bundled into public JavaScript; never place secrets or private credentials in it.
- Any future contact form, analytics, authentication, or private API integration requires a separate service and appropriate environment-variable handling.
- Hash routes work without host-specific fallback configuration.
