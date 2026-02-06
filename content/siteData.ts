import type { StaticImageData } from "next/image";
import metaLogo from "./metalogo.png";
import scaleLogo from "./scalelogo.png";
import surveymonkeyLogo from "./surveymonkeylogo.png";
import teckLogo from "./tecklogo.png";
import transaltaLogo from "./transaltalogo.png";
import ecopickerLogo from "./ecopickerlogo.png";
import motivLogo from "./motivlogo.png";
import triviaLogo from "./trivialogo.png";
import ttLogo from "./TTlogo.png";
import yycLogo from "./yyclogo.png";
import ecoPickerScreenshot from "./EcoPicker.png";
import ecoPickerScreenshot1 from "./EP2.png";
import ecoPickerScreenshot2 from "./EP3.png";
import ecoPickerScreenshot3 from "./EP4.png";
import ecoPickerScreenshot4 from "./EP5.png";
import torontoTechJobsScreenshot from "./TorontoTechJobs.png";
import motiveScreenshot from "./Motiv.png";
import triviaScreenshot from "./Trivia.png";
import yourYycScreenshot from "./Youryyc.png";
import yourYycScreenshot1 from "./Youryyc1.png";
import yourYycScreenshot2 from "./Youryyc2.png";
import yourYycScreenshot3 from "./Youryyc3.png";
import yourYycScreenshot4 from "./Youryyc4.png";
import yourYycScreenshot5 from "./Youryyc5.png";

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
  logo: StaticImageData;
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
  screenshots: StaticImageData[];
  oneLiner: string;
  bullets: string[]; // 2–3
  techBadges: string[];
  links?: Partial<Record<"live" | "github", string>>; // hide if missing
};

export type LeadershipItem = {
  id: string;
  role: string;
  organization: string;
  dates: string;
  bullets: string[];
  image?: StaticImageData;
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
  leadership: LeadershipItem[];
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
      "AI & Data Engineer focused on analytics, automation, and AI quality.",
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
    resume:
      "https://docs.google.com/document/d/12bbdvrhqOOigYMyawyt522LCqM8lmUzG5MehkuxENME/edit?usp=sharing", // placeholder (you'll replace later)
    linkedin: "https://www.linkedin.com/in/minji-kim19/", // placeholder
    github: "https://github.com/minjikim19", // placeholder
    email: "mailto:elliemjkim1@gmail.com", // placeholder
    website: "https://minji-kim19.github.io", // optional
  },

  hero: {
    headline:
      "AI & Data Systems Developer | Analytics · Automation · AI Systems Development",
    subheadline:
      "I design and build data pipelines, \n AI evaluation workflows, \n and scalable operational systems.",
  },

  whatIDo: [
    {
      id: "ai",
      title: "AI Development & Evaluation",
      description:
        "Design and refine LLM prompts, evaluate model outputs, and build quality workflows that improve reliability, safety, and real-world usability.",
      badges: [
        "LLM Prompting",
        "Model Evaluation",
        "AI Workflows",
        "Prompt Quality",
        "Error Analysis",
      ],
    },
    {
      id: "data",
      title: "Data Analytics & Automation",
      description:
        "Analyze operational data and build lightweight automation and dashboards that translate raw data into clear business decisions.",
      badges: ["SQL", "Dashboards", "Automation", "ETL"],
    },
    {
      id: "ops",
      title: "AI Operations & Coordination",
      description:
        "Coordinate cross-functional projects, streamline processes, and align stakeholders to deliver AI and data initiatives efficiently.",
      badges: [
        "Process Design",
        "Stakeholder Mgmt",
        "Scaling",
        "Project Coordination",
      ],
    },
  ],

  // IMPORTANT: Keep newest-first order (reverse-chronological).
  experience: [
    {
      id: "meta-prompt-quality",
      company: "Meta",
      title: "Prompt Engineer (Prompt Quality & Instruction Design)",
      logo: metaLogo,
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
      logo: scaleLogo,
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
      logo: surveymonkeyLogo,
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
      logo: teckLogo,
      dates: "Sept 2021 – Apr 2022",
      location: "Calgary, AB",
      defaultExpanded: true,
      bullets: [
        "Built automated ETL pipelines using shell scripting and Azure DevOps to process large daily datasets.",
        "Improved workflow efficiency by ~200%, reducing manual processing time and operational overhead.",
        "Developed Databricks SQL queries and integrated analytics into Power BI dashboards for non-technical stakeholders.",
      ],
      keySkills: [
        "ETL",
        "Shell Scripting",
        "Azure DevOps",
        "Databricks SQL",
        "Power BI",
      ],
    },
    {
      id: "transalta-it-intern",
      company: "TransAlta",
      title: "IT Collaborative Solutions Intern",
      logo: transaltaLogo,
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

  // Projects
  projects: [
    {
      id: "eco-picker",
      name: "Eco Picker",
      logo: ecopickerLogo,
      screenshots: [
        ecoPickerScreenshot,
        ecoPickerScreenshot1,
        ecoPickerScreenshot2,
        ecoPickerScreenshot3,
        ecoPickerScreenshot4,
      ],
      oneLiner:
        "A Flutter app that gamifies everyday trash-picking by rewarding users with points based on waste impact.",
      bullets: [
        "Led front-end development in Flutter, including authentication and UX/UI design.",
        "Integrated REST APIs for data visualization and Google Maps for location-based experiences.",
        "Contributed to the project’s submission for the Gemini API Developer Competition.",
      ],
      techBadges: [
        "Gemini API",
        "Flutter",
        "Dart",
        "REST APIs",
        "Google Maps API",
      ],
      links: {
        github: "https://github.com/Eco-Picker/eco-picker",
      },
    },

    {
      id: "motive-optimize",
      name: "Motive Optimize",
      logo: motivLogo,
      screenshots: [motiveScreenshot],
      oneLiner:
        "A web application for web testing and analytics dashboards that helps marketing teams optimize user impressions and design efficiency.",
      bullets: [
        "Led UX/UI design and implemented front-end components using TypeScript and Next.js.",
        "Built dashboard visualizations for 100+ entities using Chart.js.",
        "Delivered an end-to-end workflow showcasing full-stack collaboration and product polish.",
        "Achieved 2nd place at the 2023 University of Calgary Engineering Design Fair.",
      ],
      techBadges: ["Next.js", "TypeScript", "Chart.js", "UI/UX"],
      links: {
        live: "https://motiv-optimize.vercel.app/",
      },
    },

    {
      id: "your-yyc",
      name: "Your YYC",
      logo: yycLogo,
      screenshots: [
        yourYycScreenshot,
        yourYycScreenshot1,
        yourYycScreenshot2,
        yourYycScreenshot3,
        yourYycScreenshot4,
        yourYycScreenshot5,
      ],
      oneLiner:
        "An interactive C# tourist information kiosk designed to help short-term visitors explore Calgary, build itineraries, and export personalized trip plans.",
      bullets: [
        "Collaborated in a 5-person team to conduct user interviews, define personas, and design end-to-end user workflows.",
        "Designed UI prototypes and implemented core kiosk features in C# (.NET desktop), including itinerary management and QR/PDF export.",
        "Developed interactive maps, attraction previews, and multilingual navigation to enhance short-stay traveler experience.",
      ],
      techBadges: [
        "C#",
        ".NET",
        "User Research",
        "Prototyping",
        "UX/UI Design",
        "Workflow Design",
      ],
      links: {
        github: "https://github.com/sebcontreras/YourYYC",
      },
    },

    {
      id: "toronto-tech-jobs",
      name: "TorontoTechJobs",
      logo: ttLogo,
      screenshots: [torontoTechJobsScreenshot],
      oneLiner:
        "A job board application focused on tech jobs in the Greater Toronto Area (GTA) and remote positions.",
      bullets: [
        "Developed backend services using Node.js/Express and MongoDB to support core features.",
        "Implemented data modeling and API endpoints for job ingestion and retrieval.",
        "Designed front-end components and integrated them with backend APIs to create a seamless user experience.",
      ],
      techBadges: ["Node.js", "Express", "MongoDB", "JavaScript"],
      links: {
        github: "https://github.com/minjikim19/TorontoTechJobs",
      },
    },

    {
      id: "endless-trivia",
      name: "Endless Trivia",
      logo: triviaLogo,
      screenshots: [triviaScreenshot],
      oneLiner:
        "A real-time online trivia game that allows friends and family to play together remotely.",
      bullets: [
        "Designed and implemented UI/UX for the main lobby and game room.",
        "Built interactive front-end components using React and Bootstrap.",
        "Integrated Firebase and Socket.io to support real-time multiplayer interactions.",
      ],
      techBadges: [
        "React",
        "JavaScript",
        "Bootstrap",
        "Firebase",
        "Express",
        "Socket.io",
      ],
      links: {
        // live: "",
        // github: "",
      },
    },
  ],

  leadership: [
    {
      id: "ckschool-volunteer-manager",
      role: "Volunteer Operations Lead",
      organization: "Calgary Korean School",
      dates: "Sept 2017 – Apr 2023",
      bullets: [
        "Coordinated communication and scheduling across 60+ volunteers, teachers, students, and school leadership.",
        "Standardized volunteer operations to improve planning consistency across school programs.",
        "Designed and maintained the school website using Wix.",
      ],
    },
    {
      id: "dwnn-hr-manager",
      role: "HR Team Lead",
      organization: "DWNN",
      dates: "Apr 2019 – Apr 2023",
      bullets: [
        "Planned and executed large community events including K-Poppers (2020/2022) and Talknet (2019/2023).",
        "Managed participant logistics for 250+ attendees and coordinated volunteer teams end-to-end.",
        "Led recruiting and scheduling to ensure smooth event-day execution and staffing coverage.",
      ],
    },
    {
      id: "kwcc-board-member",
      role: "Board Member",
      organization: "Korean War Commemorative Committee",
      dates: "Jul 2021 – Present",
      bullets: [
        "Prepared and performed wreath-laying ceremonies for Korean War Veterans Day.",
        "Arranged and delivered relief supplies to veterans and their families.",
        "Coordinated the installation of the Korean War Gapyeong Battle Victory Monument in Airdrie through stakeholder presentations to the Mayor of Airdrie and RCL 288.",
      ],
    },
    {
      id: "cka-general-affairs",
      role: "Director of General Affairs",
      organization: "Calgary Korean Association",
      dates: "2022 – 2023",
      bullets: [
        "Managed documentation, meeting minutes, and internal coordination workflows.",
        "Improved information flow across leadership and operations teams.",
      ],
    },
  ],

  contact: {
    title: "Contact Me!",
    description: "Any questions about my background? Just shoot me a message!",
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
