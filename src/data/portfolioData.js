/**
 * Central content configuration for the portfolio.
 *
 * Keep presentation and interaction logic in components; keep editable copy,
 * links, images, and collection entries here. Array order is display order.
 * Files placed in `public/` are referenced with root-relative paths such as
 * `/images/example.svg`.
 */

/** @typedef {'home' | 'skills' | 'portfolio' | 'experience'} PageId */

/**
 * @typedef {Object} Person
 * @property {string} name Full name used in the hero and brand.
 * @property {string} shortName Initials used in the footer.
 * @property {string} heroRole Professional title displayed in the hero.
 * @property {string} email Contact email used by navigation.
 * @property {string} about About-section biography.
 * @property {string} footerQuote Short statement displayed above the footer.
 * @property {string} heroImage Root-relative hero artwork path.
 * @property {string} heroImageAlt Meaningful hero artwork description.
 * @property {string} resumeUrl Root-relative file path or full hosted PDF URL.
 */

/**
 * @typedef {Object} NavigationItem
 * @property {string} id Stable unique key. Do not derive this from editable copy.
 * @property {string} label Visible navigation label.
 * @property {string} href Hash URL, for example `#/skills`.
 * @property {PageId} page Matching key from the route registry in `src/App.jsx`.
 * @property {string} icon Icon key from `src/components/Icon.jsx`.
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} id Stable unique key.
 * @property {string} label Accessible name and tooltip.
 * @property {string} href Full profile URL.
 * @property {string} icon Icon key from `src/components/Icon.jsx`.
 */

/**
 * @typedef {Object} SkillSection
 * @property {string} id Section key referenced by each skill group's `section`.
 * @property {string} eyebrow Small heading above the section title.
 * @property {string} title Main title text.
 * @property {string} [accent] Optional highlighted title text.
 * @property {string} description Introductory copy for the section.
 */

/**
 * @typedef {Object} SkillGroup
 * @property {string} id Stable unique key.
 * @property {string} section ID of a configured skill section.
 * @property {string} category Descriptive category name used by assistive text.
 * @property {string} [description] Optional category description.
 * @property {string[]} items Skills displayed as individual tiles.
 */

/**
 * @typedef {Object} Project
 * @property {string} id Stable unique key.
 * @property {string} title
 * @property {string} type
 * @property {string} description
 * @property {string} [image] Root-relative image path.
 * @property {string} [alt] Meaningful image description.
 * @property {string[]} [technologies]
 * @property {string} [github] Optional source-code URL.
 * @property {string} [demo] Optional live-project URL.
 * @property {'purple' | 'coral' | 'blue'} [accent]
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id Stable unique key.
 * @property {'work' | 'education'} type Controls timeline placement.
 * @property {string} period
 * @property {string} role
 * @property {string} company
 * @property {boolean} [current] Marks the current employer in the hero rotator.
 * @property {string} [image] Optional company image shown for work entries.
 * @property {string} [imageAlt] Accessible description for the company image.
 * @property {string} [location]
 * @property {string} [description]
 * @property {string[]} [achievements]
 */

/**
 * @typedef {Object} Certificate
 * @property {string} id Stable unique key.
 * @property {string} title
 * @property {string} issuer
 * @property {string} issued
 * @property {string} [credentialId]
 * @property {string} [verificationUrl]
 * @property {string[]} [skills]
 */

/**
 * @typedef {Object} PortfolioData
 * @property {Person} person
 * @property {NavigationItem[]} navigation
 * @property {SocialLink[]} socials
 * @property {Array<{id: string, title: string, description: string}>} principles
 * @property {SkillSection[]} skillSections
 * @property {SkillGroup[]} skills
 * @property {Project[]} projects
 * @property {ExperienceItem[]} experience
 * @property {Certificate[]} certificates
 */

/** @type {PortfolioData} */
export const portfolioData = {
  person: {
    name: 'Ayush Goyanka',
    shortName: 'AG',
    heroRole: 'B.Tech Computer Science and Engineering',
    email: 'ayushgoyanka51@gmail.com',
    about:
      'Bachelor of Technology in Computer Science and Engineering at Lakshmi Narain College of Technology (LNCT), Bhopal, with a CGPA of 8.90/10. Interested in software engineering, web development, Generative AI, and Cybersecurity.',
    footerQuote: '',
    heroImage: '/images/developer-ai-workspace.png',
    heroImageAlt: '',
    resumeUrl: '/alex-morgan-resume.txt',
  },
  navigation: [
    { id: 'home', label: 'Home', href: '#/', page: 'home', icon: 'home' },
    { id: 'skills', label: 'Skills', href: '#/skills', page: 'skills', icon: 'code' },
    { id: 'portfolio', label: 'Portfolio', href: '#/portfolio', page: 'portfolio', icon: 'folder' },
    { id: 'experience', label: 'Experience', href: '#/experience', page: 'experience', icon: 'briefcase' },
  ],
  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/AyushGoyanka', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-goyanka-731aa4293/', icon: 'linkedin' },
  ],
  principles: [
    {
      id: 'jwoc',
      title: 'JWOC',
      description: 'Selected as a contributor in JWOC (JUCE Winter of Code 2025) for consistent open-source contributions, and completed the program with certification.',
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving',
      description: 'Participated in Flipkart Grid 6.0, gaining hands-on experience in solving real-world engineering and problem-solving challenges. Participated in Smart India Hackathon (SIH), collaborating with a team to develop an innovative solution for a real-world problem. Solved 400+ problems on LeetCode, demonstrating strong analytical thinking, problem-solving expertise, and proficiency in data structures and algorithms. Achieved Silver Badge in Problem Solving on HackerRank, reflecting consistent algorithmic practice.',
    },
    {
      id: 'extracurricular',
      title: 'Extracurricular',
      description: 'Awarded the Reliance Foundation Scholarship, a merit-based scholarship recognizing academic excellence among engineering students across India. Team Collaboration: Collaborated effectively on team projects, strengthening communication, problem-solving, and project management skills. Public Speaking: Delivered technical presentations, enhancing communication, confidence, and presentation skills.',
    },
  ],
  skillSections: [
    {
      id: 'professional',
      eyebrow: 'Technical skills',
      title: 'Programming',
      accent: 'Languages',
      description: 'Java and JavaScript.',
    },
    {
      id: 'tools',
      eyebrow: 'Technologies',
      title: 'Frameworks &',
      accent: 'Technologies',
      description: 'HTML, CSS, Node.js, Express, React, REST API’s, Socket.IO, Generative AI.',
    },
    {
      id: 'work',
      eyebrow: 'Databases &',
      title: 'Developer',
      accent: 'Tools',
      description: 'MongoDB, MySQL, Git, GitHub, Visual Studio Code.',
    },
  ],
  skills: [
    {
      id: 'programming-languages',
      section: 'professional',
      category: 'Programming Languages',
      items: ['Java', 'JavaScript'],
    },
    {
      id: 'technologies-frameworks',
      section: 'tools',
      category: 'Technologies/Frameworks',
      items: ['HTML', 'CSS', 'Node.js', 'Express', 'React', 'REST API’s', 'Socket.IO', 'Generative AI'],
    },
    {
      id: 'databases',
      section: 'work',
      category: 'Databases',
      items: ['MongoDB', 'MySQL'],
    },
    {
      id: 'developer-tools',
      section: 'work',
      category: 'Developer Tools',
      items: ['Git', 'GitHub', 'Visual Studio Code'],
    },
  ],
  projects: [
    {
      id: 'algoquest-visualizer',
      title: 'AlgoQuest Visualizer',
      type: 'HTML, CSS, JavaScript, React.js, p5.js',
      description:
        'Engineered an interactive algorithm visualizer with real-time animations, integrating an AI-powered chatbot to answer user queries and dynamically explain algorithmic logic. Designed graph data structures, implemented traversal algorithms, optimized canvas-based rendering, and integrated event-driven UI interactions to enhance algorithm learning and user experience.',
      image: '/images/project-northstar.svg',
      alt: 'AlgoQuest Visualizer',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'p5.js'],
      github: 'https://github.com/yourusername/GraphVisualizer',
      accent: 'purple',
    },
    {
      id: 'nexus-chat',
      title: 'Nexus Chat',
      type: 'React.js, JavaScript, Node.js, Express.js, MongoDB, Socket.IO',
      description:
        'Developed a full-stack real-time chat application supporting private and group messaging using Socket.IO, enabling low-latency bidirectional communication for multiple concurrent users. Built RESTful APIs using Node.js and Express.js, integrating MongoDB for efficient storage and retrieval of user and chat data.',
      image: '/images/project-aperture.svg',
      alt: 'Nexus Chat',
      technologies: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'],
      github: 'https://github.com',
      accent: 'coral',
    },
  ],
  experience: [
    {
      id: 'pwc-launchpad',
      type: 'work',
      period: 'Feb. 2026 — June 2026',
      role: 'Launchpad Program Participant',
      company: 'PricewaterhouseCoopers (PwC)',
      location: 'India (Remote)',
      description:
        'Selected for PwC’s Launchpad Program, gaining exposure to emerging technologies, professional development, and industry best practices.',
      achievements: [
        'Applied Java programming and web development fundamentals to implement interactive applications, reinforcing software engineering and coding best practices.',
        'Leveraged fundamental Generative AI concepts and core Cybersecurity principles to develop secure and responsible applications.',
      ],
    },
    {
      id: 'lnct',
      type: 'education',
      period: 'Sep. 2023 — May 2027',
      role: 'Bachelor of Technology in Computer Science and Engineering',
      company: 'Lakshmi Narain College of Technology (LNCT), Bhopal',
      description: 'CGPA: 8.90/10',
      achievements: [],
    },
  ],
  certificates: [],
};
