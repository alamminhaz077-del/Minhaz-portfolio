/**
 * Site-wide identity and configuration.
 *
 * Everything a recruiter reads is edited from this folder (`src/data/`).
 * No professional claim here is generated — the wording comes from Minhaz's
 * own resume and offer letter.
 */

/**
 * TODO (one-time): after the first Netlify deploy, replace this with the real
 * URL Netlify gives you. It is used for canonical links, Open Graph images and
 * the sitemap. Nothing else needs to change.
 */
export const siteUrl = 'https://minhaz-alam.netlify.app'

export const profile = {
  name: 'Minhaz Alam',
  firstName: 'Minhaz',
  title: 'Full Stack Developer',
  titleSecondary: 'MERN Stack Developer',
  location: 'Delhi NCR, India',
  email: 'alamminhaz077@gmail.com',
  phone: '+91 88006 36839',
  phoneHref: '+918800636839',
  availability: 'Open to junior frontend, React and MERN stack roles',
  resumePath: '/resume/Minhaz-Alam-Resume.pdf',

  /** Rotating headline words in the hero. */
  roles: ['Frontend Developer', 'React Developer', 'MERN Stack Developer', 'Full Stack Developer'],

  /** Short intro used in the hero. */
  intro:
    'I build modern, responsive web interfaces with React and Tailwind CSS, and I am steadily growing into full-stack work with Node.js, Express and MongoDB. Right now I am a Web Development Intern at KodeToCareer, where I work on real web and SaaS projects alongside the product team.',

  /** Slightly longer version used in the home page "about" preview. */
  aboutPreview:
    "I am a BCA graduate from Maharshi Dayanand University who found programming through curiosity about how websites actually work. Since then I have been building interfaces, breaking them, and rebuilding them with cleaner structure — moving from plain HTML and CSS to component-driven React, and from there into REST APIs, authentication flows and databases. I care about interfaces that feel calm to use and code that another developer can pick up without a tour guide.",

  /** Hero stat strip — only verifiable facts. */
  stats: [
    { value: '6', label: 'Portfolio pages', hint: 'Built with React Router' },
    { value: '5', label: 'Projects shown', hint: 'Frontend and MERN' },
    { value: '2026', label: 'KodeToCareer intern', hint: 'Web Development' },
  ],
}

export const socials = {
  github: {
    label: 'GitHub',
    handle: '@alamminhaz077-del',
    url: 'https://github.com/alamminhaz077-del',
  },
  linkedin: {
    label: 'LinkedIn',
    handle: 'in/minhaz-alam-16a433366',
    url: 'https://www.linkedin.com/in/minhaz-alam-16a433366/',
  },
  email: {
    label: 'Email',
    handle: 'alamminhaz077@gmail.com',
    url: 'mailto:alamminhaz077@gmail.com',
  },
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export const availabilityNote = {
  lookingFor: [
    'Frontend Developer',
    'React.js Developer',
    'JavaScript Developer',
    'MERN Stack Developer',
    'Junior Full Stack Developer',
  ],
  based: 'Delhi NCR, India — open to on-site, hybrid and remote roles',
}
