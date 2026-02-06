import type { StaticImageData } from "next/image";
import ecopickerLogo from "./ecopickerlogo.png";
import motivLogo from "./motivlogo.png";
import triviaLogo from "./trivialogo.png";
import ttLogo from "./TTlogo.png";
import yycLogo from "./yyclogo.png";

export type SiteLinkKey =
  | "resume"
  | "linkedin"
  | "github"
  | "email"
  | "website";

export type SiteLinks = Partial<Record<SiteLinkKey, string>>;

export type NavItem = {
  id: string;
  label: string;
};

export type UiLabels = {
  navLabel: string;
  menuOpen: string;
  menuClose: string;
  closeModal: string;
  resumeCta: string;
  linkedinCta: string;
  githubCta: string;
  liveLink: string;
  githubLink: string;
  emailLink: string;
  websiteLink: string;
  accordionOpen: string;
  accordionClose: string;
  projectOpen: string;
};

export type SectionTitles = {
  whatIDo: string;
  experience: string;
  projects: string;
  leadership: string;
  contact: string;
};

export type ContactLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type WhatIDoCard = {
  id: "ai" | "data" | "ops";
  title: string;
  description: string;
  badges?: string[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  title: string;
  dates: string; // e.g., "Oct 2024 – Jul 2025"
  location: string; // e.g., "Toronto, ON" or "Remote"
  bullets: string[]; // 3–5
  keySkills: string[]; // 3–6
  defaultExpanded?: boolean; // Scale + Meta true
};

export type ProjectLink = {
  label: "Live" | "GitHub";
  href: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  logo: StaticImageData;
  period?: string;
  oneLiner: string;
  bullets: string[]; // 2–3
  techBadges: string[];
  links?: Partial<Record<"live" | "github", string>>; // hide if missing
};

export type SiteData = {
  meta: {
    title: string;
    description: string;
    ogImagePath: string; // placeholder path
  };
  nav: NavItem[];
  sectionTitles: SectionTitles;
  ui: UiLabels;
  links: SiteLinks;
  hero: {
    headline: string;
    subheadline?: string;
  };
  whatIDo: WhatIDoCard[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  leadershipBullets: string[];
  contact: {
    title: string;
    description: string;
    links: ContactLink[];
  };
};

export const siteData: SiteData = {
  meta: {
    title: "Minji Kim | AI / Data / Ops",
    description:
      "AI & Data Operations professional working across analytics, automation, and AI quality systems.",
    ogImagePath: "/og.png", // placeholder
  },
  nav: [
    { id: "hero", label: "Home" },
    { id: "what-i-do", label: "What I Do" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "leadership", label: "Leadership" },
    { id: "contact", label: "Contact" },
  ],
  sectionTitles: {
    whatIDo: "What I Do",
    experience: "Experience",
    projects: "Projects",
    leadership: "Leadership",
    contact: "Contact",
  },
  ui: {
    navLabel: "Primary navigation",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    closeModal: "Close project details",
    resumeCta: "Resume",
    linkedinCta: "LinkedIn",
    githubCta: "GitHub",
    liveLink: "Live",
    githubLink: "GitHub",
    emailLink: "Email",
    websiteLink: "Website",
    accordionOpen: "Expand experience details",
    accordionClose: "Collapse experience details",
    projectOpen: "Open project details",
  },

  links: {
    resume: "https://docs.google.com/document/d/12bbdvrhqOOigYMyawyt522LCqM8lmUzG5MehkuxENME/edit?usp=sharing", // placeholder (you'll replace later)
    linkedin: "https://www.linkedin.com/in/minji-kim19/", // placeholder
    github: "https://github.com/minjikim19", // placeholder
    email: "mailto:elliemjkim1@gmail.com", // placeholder
    website: "https://minji-kim19.github.io", // optional
  },

  hero: {
    headline:
      "AI & Data Operations Professional | Working across analytics, automation, and AI quality systems.",
    subheadline:
      "I build reliable data pipelines, evaluation workflows, and operational systems that help teams scale.",
  },

  whatIDo: [
    {
      id: "ai",
      title: "AI Quality & Evaluation",
      description:
        "Evaluate LLM outputs, run structured error analysis, and improve prompt and instruction quality for safer, more reliable behavior.",
      badges: ["LLM Evaluation", "Prompt Quality", "Error Analysis"],
    },
    {
      id: "data",
      title: "Data Automation & Analytics",
      description:
        "Build and maintain automated pipelines and dashboards that turn operational data into decisions for non-technical teams.",
      badges: ["ETL", "SQL", "Dashboards"],
    },
    {
      id: "ops",
      title: "Operations & Coordination",
      description:
        "Scale processes across people and systems—aligning stakeholders, unblocking execution, and improving quality and throughput.",
      badges: ["Process Design", "Stakeholder Mgmt", "Scaling"],
    },
  ],

  // IMPORTANT: Keep newest-first order (reverse-chronological).
  experience: [
    {
      id: "meta-prompt-quality",
      company: "Meta",
      title: "Prompt Engineer (Prompt Quality & Instruction Design)",
      dates: "Sept 2025 – Jan 2026",
      location: "Remote / Canada",
      defaultExpanded: true,
      bullets: [
        "Designed, tested, and refined system prompts and instruction templates for Korean and English LLM use cases to improve clarity, safety, and response relevance.",
        "Evaluated single-turn and multi-turn outputs, identifying hallucination, ambiguity, verbosity, and instruction-following failures.",
        "Conducted structured qualitative error analysis using internal evaluation tools, documenting failure patterns and recommendations.",
        "Reduced hallucinations and improved instruction adherence by up to 20% through prompt rewording and contextual hints.",
      ],
      keySkills: [
        "LLM Evaluation",
        "Prompt Design",
        "Error Analysis",
        "Quality Frameworks",
        "Korean/English",
      ],
    },
    {
      id: "scale-ai-qt-manager",
      company: "Scale AI",
      title: "AI Trainer Quality Manager",
      dates: "Oct 2024 – Jul 2025",
      location: "Remote / Canada",
      defaultExpanded: true,
      bullets: [
        "Managed 3 high-impact AI training projects, including one contributing ~25% of quarterly company revenue.",
        "Trained and supported 200–1,000 contributors via onboarding sessions, office hours, and training materials to scale throughput and quality.",
        "Acted as the primary interface between stakeholders and contributors to resolve blockers and align daily workflows.",
        "Applied SFT and RLHF-based auditing to improve data quality and consistency for model training.",
      ],
      keySkills: [
        "Code Reviews",
        "AI Operations",
        "Data Quality",
        "SFT / RLHF",
        "Stakeholder Management",
        "Process Improvement",
      ],
    },
    {
      id: "surveymonkey-swe-intern",
      company: "SurveyMonkey",
      title: "Software Engineer Intern",
      dates: "May 2022 – Aug 2022",
      location: "Ottawa, ON",
      defaultExpanded: true,
      bullets: [
        "Integrated TypeScript into an existing JavaScript front-end project, contributing to a 20% drop in bug reports and improved maintainability.",
        "Resolved issues across React, GraphQL, and TypeScript layers on an analytics/dashboard product surface.",
        "Boosted test coverage by ~10% using Jest and React Testing Library to improve reliability and regression safety.",
      ],
      keySkills: ["React", "TypeScript", "GraphQL", "Jest", "Debugging"],
    },
    {
      id: "teck-data-dev-coop",
      company: "Teck Resources",
      title: "Data Developer Co-op",
      dates: "Sept 2021 – Apr 2022",
      location: "Calgary, AB",
      defaultExpanded: true,
      bullets: [
        "Built automated ETL pipelines using shell scripting and Azure DevOps to process large daily datasets.",
        "Improved workflow efficiency by ~200%, reducing manual processing time and operational overhead.",
        "Developed Databricks SQL queries and integrated analytics into Power BI dashboards for non-technical stakeholders.",
      ],
      keySkills: ["ETL", "Shell Scripting", "Azure DevOps", "Databricks SQL", "Power BI"],
    },
    {
      id: "transalta-it-intern",
      company: "TransAlta",
      title: "IT Collaborative Solutions Intern",
      dates: "Jun 2021 – Aug 2021",
      location: "Calgary, AB",
      defaultExpanded: true,
      bullets: [
        "Created internal PowerApps applications, including a COVID pre-screening tool and an on-call alarm system.",
        "Gathered requirements from security/operations stakeholders and translated them into UX/UI designs with high adoption.",
        "Automated internal workflows using Power Automate and supported troubleshooting for internal C# applications.",
      ],
      keySkills: [
        "PowerApps",
        "Power Automate",
        "Stakeholder Requirements",
        "UX/UI",
        "SharePoint",
      ],
    },
  ],

  // Projects: exactly 5 cards, modal details per item.
  projects: [
    {
      id: "eco-picker",
      name: "Eco Picker",
      logo: ecopickerLogo,
      period: "Jul 2024 – Present",
      oneLiner:
        "A Flutter app that turns trash-picking into a gamified challenge with maps and data-driven progress.",
      bullets: [
        "Led front-end development in Flutter, including authentication and UX/UI design.",
        "Integrated REST APIs for data visualization and Google Maps for location-based experiences.",
        "Contributed to the project’s submission for the Gemini API Developer Competition.",
      ],
      techBadges: ["Flutter", "Dart", "REST APIs", "Google Maps API"],
      links: {
        github: "https://github.com/Eco-Picker/eco-picker",
        // live: "", // add later if available
      },
    },
    {
      id: "toronto-tech-jobs",
      name: "TorontoTechJobs",
      logo: ttLogo,
      period: "Jun 2024 – Jul 2024",
      oneLiner:
        "A web app that aggregates and displays Toronto tech job postings with search and filtering.",
      bullets: [
        "Developed backend services using Node.js/Express and MongoDB to support core features.",
        "Implemented data modeling and API endpoints for job ingestion and retrieval.",
      ],
      techBadges: ["Node.js", "Express", "MongoDB", "JavaScript"],
      links: {
        live: "http://torontotechjob.com/",
        // github: "", // add if public
      },
    },
    {
      id: "motive-optimize",
      name: "Motive Optimize",
      logo: motivLogo,
      period: "Oct 2022 – Mar 2023",
      oneLiner:
        "A dashboard-focused web application featuring data visualization for 100+ entities; 2nd place at UCalgary Engineering Design Fair.",
      bullets: [
        "Led UX/UI design and implemented front-end components using TypeScript and Next.js.",
        "Built dashboard visualizations for 100+ entities using Chart.js.",
        "Delivered an end-to-end workflow showcasing full-stack collaboration and product polish.",
      ],
      techBadges: ["Next.js", "TypeScript", "Chart.js", "UI/UX"],
      links: {
        live: "https://motiv-optimize.vercel.app/",
        // github: "", // add if available
      },
    },
    {
      id: "endless-trivia",
      name: "Endless Trivia",
      logo: triviaLogo,
      period: "Nov 2020 – Dec 2020",
      oneLiner:
        "A multiplayer-style trivia web app with a lobby and game room experience.",
      bullets: [
        "Designed and implemented UI/UX for the main lobby and game room.",
        "Built interactive front-end components using React and Bootstrap.",
      ],
      techBadges: ["React", "JavaScript", "Bootstrap"],
      links: {
        // live: "", // add if available
        // github: "", // add if available
      },
    },
    {
      id: "your-yyc",
      name: "Your YYC",
      logo: yycLogo,
      period: "—",
      oneLiner:
        "A personal/community project (placeholder) — highlight impact, users, or the problem solved.",
      bullets: [
        "Add 2–3 impact bullets here (what you built, for whom, and the result).",
        "Keep this aligned with AI/Data/Ops positioning (automation, analytics, ops).",
      ],
      techBadges: ["—"],
      links: {
        // live: "",
        // github: "",
      },
    },
  ],

  leadershipBullets: [
    "Led volunteer operations for Calgary Korean School, coordinating communication and scheduling across 60+ volunteers (2017–2023).",
    "HR Team Lead at DWNN: planned and executed large community events with 250+ participants; recruited and managed volunteer teams (2019–2023).",
    "Committee member at KWCC: helped run veteran commemorations and led execution of a Korean War memorial installation project in Airdrie (2021–2024).",
    "Director of General Affairs at Calgary Korean Association: managed documentation, meeting minutes, and internal coordination (2022–2023).",
  ],

  contact: {
    title: "Contact Me!",
    description:
      "Any questions about my background? Just shoot me a message!",
    links: [
      {
        label: "Email",
        href: "mailto:elliemjkim1@gmail.com",
        ariaLabel: "Send an email",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/minji-kim19/",
        ariaLabel: "Visit LinkedIn profile",
      },
      {
        label: "GitHub",
        href: "https://github.com/minjikim19",
        ariaLabel: "Visit GitHub profile",
      },
    ],
  },
};

export default siteData;
