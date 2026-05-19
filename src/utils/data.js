// Portfolio Content Data

// Hero Section Data
export const heroData = {
  tagline: "Consider it done —",
  name: "Vince Carl Viaña",
  title: "Full-Stack Developer",
  education: "Bachelor of Science in Information Technology",
  university: "University of Santo Tomas",
  expertise: "Expertise in Web & Mobile Development",
  image: {
    light: "/images/me/mewhite.png",  // Light mode image
    dark: "/images/me/meblack.png"      // Dark mode image
  },
  buttons: [
    { label: "Download CV", type: "outline" },
    { label: "See Projects", type: "solid", link: "#projects" },
  ],
  status: "Available for Work",
};

// About Section Data
export const aboutData = {
  title: "About Me",
  cards: [
    {
      period: "The Past",
      subtitle: "Done",
      icon: "MdSchool",
      content:
        "My journey started in Grade 10, not in a Computer Science class, but in a basic web design subject. The task was simple: build a website using HTML and CSS. While my classmates struggled to understand tags and layouts, I found myself researching late into the night, not because it was required, but because I was genuinely curious. I was one of the first to submit that final project, and something clicked. That website took me an entire school year to build. Now? I could rebuild it in minutes. That realization, that growth, is what hooked me.",
    },
    {
      period: "The Present",
      subtitle: "Done",
      icon: "MdComputer",
      content:
        "Fast forward to 4th year BSIT at UST, and that curiosity has evolved into real skill. I build full-stack applications, not as an expert, but as someone who can ship working products. I've taken on freelance projects, mostly student-level work, but real clients with real deadlines. I haven't disappointed them yet. One of my proudest moments? Being able to side hustle while maintaining academic excellence, covering my daily needs and helping with expenses. That Grade 10 spark? It's now a steady flame I've learned to control.",
    },
    {
      period: "The Future",
      subtitle: "Done",
      icon: "MdRocket",
      content:
        "Looking ahead, I'm ready for my first real developer role. I'm not chasing titles like 'Senior Engineer' or trying to 'revolutionize tech', not yet. Right now, I want to join a team where I can contribute from day one, learn from experienced developers, and keep that Grade 10 curiosity alive. Long-term? I want to look back at today the same way I look at that first HTML project, amazed at how far I've come. If it took me 6 years to go from 'HTML in a school year' to 'full-stack apps in months,' imagine where I'll be in the next 6. That's the story I'm writing.",
    },
  ],
};

// Skills Section Data - Categorized
export const skillsData = {
  // Featured skills for carousel (top skills to showcase)
  featured: [
    { name: "ReactJS", icon: "SiReact", description: "Developed component-based interfaces with state management, applied in portfolio features, client projects, and coursework." },
    { name: "Next.js", icon: "SiNextdotjs", description: "Built server-rendered and statically generated web apps with file-based routing and optimized performance." },
    { name: "Node.js", icon: "SiNodedotjs", description: "Built backend services and RESTful APIs with efficient server-side JavaScript runtime." },
    { name: "Express.js", icon: "SiExpress", description: "Created scalable web applications and APIs with minimalist Node.js framework." },
    { name: "Laravel", icon: "SiLaravel", description: "Developed full-featured web applications with elegant PHP framework and MVC architecture." },
    { name: "Flutter", icon: "SiFlutter", description: "Built cross-platform mobile apps with expressive UI using Dart and Flutter SDK." },
    { name: "MySQL", icon: "SiMysql", description: "Designed databases and handled data persistence with CRUD operations across academic and client projects." },
    { name: "Firebase", icon: "SiFirebase", description: "Integrated real-time database, authentication, and cloud functions in full-stack applications." },
    { name: "Supabase", icon: "SiSupabase", description: "Used open-source Firebase alternative for auth, real-time subscriptions, and PostgreSQL-backed storage." },
    { name: "JavaScript", icon: "SiJavascript", description: "Enhanced user interaction with validation, dynamic components, and logic handling across client and academic builds." },
    { name: "Tailwind CSS", icon: "SiTailwindcss", description: "Built modern utility-first UIs for rapid prototyping and deployment." },
    { name: "Figma", icon: "SiFigma", description: "Designed user interfaces, wireframes, and prototypes with collaborative design tooling." },
    { name: "Git", icon: "SiGit", description: "Managed version control with branching, commits, and collaboration workflows." },
    { name: "Azure DevOps", icon: "MdOutlineDevices", description: "Used Azure DevOps for CI/CD pipelines, sprint planning, and project tracking in team environments." },
  ],

  // All skills organized by category
  categories: [
    {
      name: "Frontend",
      skills: [
        { name: "HTML5", icon: "SiHtml5", description: "Structured semantic layouts for pages and forms across portfolio sites, client projects, and academic coursework." },
        { name: "CSS3", icon: "SiCss3", description: "Styled responsive designs with consistent typography and spacing across coursework, client projects, and portfolio work." },
        { name: "JavaScript", icon: "SiJavascript", description: "Enhanced user interaction with validation, dynamic components, and logic handling in client and academic builds." },
        { name: "ReactJS", icon: "SiReact", description: "Developed component-based interfaces with state management, applied in portfolio features, client projects, and coursework." },
        { name: "Next.js", icon: "SiNextdotjs", description: "Built server-rendered and statically generated web apps with file-based routing and optimized performance." },
        { name: "AngularJS", icon: "SiAngular", description: "Practiced building SPAs with data binding and modular code in coursework projects and client demos." },
        { name: "Tailwind CSS", icon: "SiTailwindcss", description: "Built modern utility-first UIs for rapid prototyping and deployment across portfolio, class, and client projects." },
        { name: "Bootstrap", icon: "SiBootstrap", description: "Accelerated development with grid systems and prebuilt components in coursework dashboards and class projects." },
        { name: "Materialize", icon: "SiMaterialdesign", description: "Built responsive Material Design interfaces applied in tourism platform and client projects." },
        { name: "shadcn/ui", icon: "SiRadixui", description: "Used component library built on Radix UI and Tailwind for accessible, composable UI primitives." },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: "SiNodedotjs", description: "Built backend services and RESTful APIs with efficient server-side JavaScript runtime." },
        { name: "Express.js", icon: "SiExpress", description: "Created scalable web applications and APIs with minimalist Node.js framework." },
        { name: "Laravel", icon: "SiLaravel", description: "Developed full-featured web applications with elegant PHP framework and MVC architecture." },
        { name: "RESTful APIs", icon: "SiExpress", description: "Designed and consumed REST APIs with proper HTTP methods, status codes, and JSON data exchange." },
        { name: "MVC Architecture", icon: "SiDotnet", description: "Applied Model-View-Controller pattern in Laravel, ASP.NET, and AngularJS projects for clean separation of concerns." },
        { name: "ASP.NET Core", icon: "SiDotnet", description: "Developed server-side web applications and REST APIs using MVC and CQRS architecture with C# and .NET framework." },
        { name: "Blazor WebAssembly", icon: "SiDotnet", description: "Built interactive web UIs running in the browser via WebAssembly using C# and the .NET ecosystem." },
        { name: "GraphQL", icon: "SiGraphql", description: "Queried and consumed GraphQL APIs with typed schemas, reducing over-fetching in data-heavy applications." },
      ],
    },
    {
      name: "Mobile",
      skills: [
        { name: "Flutter", icon: "SiFlutter", description: "Built cross-platform mobile apps with expressive UI using Dart and Flutter SDK." },
        { name: "Dart", icon: "SiDart", description: "Wrote type-safe, performant mobile logic using Dart as the primary Flutter language." },
        { name: "Android Studio", icon: "SiAndroidstudio", description: "Created mobile interfaces and event-driven apps in coursework mobile projects and small client apps." },
        { name: "Kotlin", icon: "SiKotlin", description: "Developed modern Android applications with concise and expressive programming language." },
      ],
    },
    {
      name: "Database & CMS",
      skills: [
        { name: "MySQL", icon: "SiMysql", description: "Designed relational databases with CRUD operations across academic systems and personal projects." },
        { name: "Supabase", icon: "SiSupabase", description: "Used for auth, real-time subscriptions, and PostgreSQL-backed storage in modern web apps." },
        { name: "Firebase", icon: "SiFirebase", description: "Integrated real-time database, authentication, and cloud functions in full-stack applications." },
        { name: "HeidiSQL", icon: "SiMysql", description: "Managed and queried MySQL databases visually during development and debugging." },
        { name: "PostgreSQL", icon: "SiPostgresql", description: "Designed and queried relational databases using PostgreSQL, applied via Supabase and direct connections." },
        { name: "SQL Server", icon: "SiDotnet", description: "Used Microsoft SQL Server for data storage and querying in ASP.NET Core and Entity Framework Core projects." },
        { name: "Strapi", icon: "SiStrapi", description: "Set up headless CMS with custom content types and REST/GraphQL API endpoints." },
      ],
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: "Git", icon: "SiGit", description: "Managed version control with branching, commits, and collaboration workflows." },
        { name: "GitHub", icon: "SiGithub", description: "Collaborated on projects with pull requests, code reviews, and repository management." },
        { name: "Azure DevOps", icon: "MdOutlineDevices", description: "Used for CI/CD pipelines, sprint planning, and project tracking in team environments." },
        { name: "Digital Ocean", icon: "SiDigitalocean", description: "Deployed and managed web applications on cloud droplets with DNS and server configuration." },
        { name: "Docker", icon: "SiDocker", description: "Containerized applications for consistent development and deployment environments." },
        { name: "GitHub Copilot", icon: "SiGithubcopilot", description: "Leveraged AI-assisted code completion and suggestions to accelerate development workflows." },
        { name: "Claude Code", icon: "MdOutlineTerminal", description: "Used AI-powered CLI for code generation, refactoring, and multi-file edits in complex projects." },
      ],
    },
    {
      name: "Design & QA",
      skills: [
        { name: "Figma", icon: "SiFigma", description: "Designed user interfaces, wireframes, and prototypes with collaborative design tooling." },
        { name: "Adobe Photoshop", icon: "SiAdobephotoshop", description: "Created and edited graphics, mockups, and visual assets for web and mobile projects." },
        { name: "UI/UX Design", icon: "MdOutlineDevices", description: "Applied user-centered design principles to create intuitive, accessible, and visually consistent interfaces." },
        { name: "Manual Testing", icon: "MdOutlineCheckCircle", description: "Conducted manual test cases covering functional, regression, and edge-case scenarios." },
        { name: "Cross-browser Compatibility", icon: "MdOutlineDevices", description: "Verified consistent rendering and behavior across Chrome, Firefox, Edge, and Safari." },
        { name: "UX Validation", icon: "MdOutlineCheckCircle", description: "Evaluated user flows and interaction patterns against usability heuristics and feedback." },
        { name: "Postman", icon: "SiPostman", description: "Tested and documented REST APIs with request collections, environment variables, and response validation." },
        { name: "Python", icon: "SiPython", description: "Wrote automated test scripts and validation pipelines for AI model outputs in capstone research." },
        { name: "Bug Tracking", icon: "MdOutlineBugReport", description: "Logged, prioritized, and tracked issues using project management tools during QA cycles." },
        { name: "Copywriting", icon: "MdOutlineEditNote", description: "Wrote clear, concise web copy and social media content tailored to target audiences." },
        { name: "Social Media Mgmt", icon: "MdOutlineEditNote", description: "Managed content calendars, posting schedules, and audience engagement across platforms." },
      ],
    },
  ],
};

// Projects Section Data
export const projectsData = [
  {
    title: "TLL Daily Drill (WikayGaling) - Filipino Vocabulary Quiz App",
    role: "Software Engineer Intern (Full-Stack) · Blackfort Consulting PH",
    period: "Mar 2026 - May 2026",
    tech: ["ReactJS", "Tailwind CSS", "REST API", "Strapi v5", "Azure DevOps", "GitHub"],
    highlights: [
      "Worked directly with a real client (The Learning Library) to gather requirements and translate their vision into Figma designs, then into a production-ready React interface",
      "Built a daily Filipino vocabulary quiz with multiple question formats including image-based, word cloud, and pure text, with 15-second timers, star-based scoring, and localStorage progress persistence for mid-session resume",
      "Consumed Strapi v5 REST API for quiz content and delivered features across Agile/Scrum sprints using Azure DevOps CI/CD, Azure Repos, and PR-based code review in a professional team environment"
    ],
    images: [
      "/images/TLL1.png",
      "/images/TLL2.png",
      "/images/TLL3.png",
      "/images/TLL4.png",
      "/images/TLL5.png",
    ],
    link: "https://wikaygaling-dev.blackfortconsulting.com/",
    isPrivate: false,
  },
  {
    title: "NamNam - Restaurant Discovery and Review App",
    role: "Team Lead & Lead Developer · Academic Project",
    period: "May 2026",
    tech: ["Flutter", "Dart", "Cloud Firestore", "Firebase Authentication", "Firebase Storage", "GitHub"],
    highlights: [
      "Led UI/UX design in Figma as mockup author, then led a 3-person team from project setup to final build, overseeing architecture decisions and overall code quality",
      "Built restaurant discovery with category filtering and real-time search across name, category, and star rating, plus community reviews with photo upload and auto-updating ratings on submission",
      "Implemented Firebase Authentication with Google Sign-In, Cloud Firestore for real-time data, Firebase Storage for image uploads, and bookmark and personal profile features"
    ],
    images: [
      "/images/NAM1.png",
      "/images/NAM2.png",
      "/images/NAM3.png",
    ],
    link: null,
    github: "https://github.com/ItsyBinsy/namnam",
    isPrivate: false,
  },
  {
    title: "BF Timesheet - Timesheet Management System",
    role: "Software Engineer Intern (Full-Stack) · Blackfort Consulting PH",
    period: "Feb 2026 - Apr 2026",
    tech: ["ASP.NET Core", "Entity Framework Core", "Telerik Blazor UI", "Blazor WebAssembly", "SQL", "Docker", "GitHub"],
    highlights: [
      "Participated in Agile sprints as a full-stack intern, resolving bug tickets across the Blazor WebAssembly client and ASP.NET Core Web API backend",
      "Worked within a CQRS architecture using MediatR handlers and Entity Framework Core for data access on a .NET 9 multi-project solution",
      "Contributed to timesheet and attendance workflows including approval flows, corrections, and reporting features built with Telerik Blazor UI components"
    ],
    images: ["/images/BFT.png"],
    link: null,
    isPrivate: true,
  },
  {
    title: "StudAI - AI-Driven Study Buddy",
    role: "Full-Stack Developer · Capstone Project",
    period: "Aug - Dec 2025",
    tech: ["ReactJS", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "Firebase", "DigitalOcean", "GitHub"],
    highlights: [
      "Built quiz module with three game modes (Normal, Shuffled, Adaptive Difficulty) and real-time multiplayer quiz battles using Firebase",
      "Developed AI-powered study recommendations, achievement systems, and progress tracking features",
      "Managed deployment with Digital Ocean and version control with GitHub"
    ],
    images: [
      "/images/STUDAI.png",
      "/images/STUDAI2.png",
      "/images/STUDAI3.png",
      "/images/STUDAI4.png",
      "/images/STUDAI5.png",
      "/images/STUDAI6.png",
      "/images/STUDAI7.png",
      "/images/STUDAI8.png",
      "/images/STUDAI9.png",
      "/images/STUDAI10.png",
      "/images/STUDAI11.png",
    ],
    link: "https://studai.dev/",
    isPrivate: false,
  },
  {
    title: "Star Coloroof - Roofing Products E-Commerce Platform",
    role: "Full-Stack Developer",
    period: "Dec 2025",
    tech: ["ReactJS", "Node.js", "Tailwind CSS", "REST API", "GitHub"],
    highlights: [
      "Built online storefront with product catalog, detailed specifications, and shopping cart",
      "Developed booking system and customer inquiry features",
      "Managed version control and team collaboration using GitHub"
    ],
    images: ["/images/STARCOLOROOF.png"],
    link: null,
    github: "https://github.com/npsangco/Coloroof-App",
    isPrivate: false,
  },
  {
    title: "Barangay 24/7 - Digital Barangay Management Platform",
    role: "Full-Stack Developer",
    period: "Dec 2025",
    tech: ["Laravel", "MySQL", "Bootstrap", "DigitalOcean", "GitHub"],
    highlights: [
      "Built role-based management system with three-tier access control (Administrator, Employee, Resident)",
      "Developed household registrations, resident profiles, employee records, infrastructure project tracking, and incident reporting modules",
      "Managed deployment with Digital Ocean and version control with GitHub"
    ],
    images: ["/images/BARANGAY.png"],
    link: null,
    github: "https://github.com/npsangco/barangay247",
    isPrivate: false,
  },
  {
    title: "FAST Laboratories - HR Payroll Management System",
    role: "Front-End Developer · Software Engineering Final Requirement",
    period: "Sep 2024 - May 2025",
    tech: ["AngularJS", "ASP.NET MVC", "MySQL", "HTML5", "CSS", "GitHub"],
    highlights: [
      "Built automated payroll interface with employee record management and salary calculation modules",
      "Developed payroll report generation features",
      "Solved critical HR issues: inconsistent records, salary miscalculations, and processing delays"
    ],
    images: ["/images/FAST.jpg"],
    link: null,
    isPrivate: true,
  },
  {
    title: "Mobile App Collection - Netflix, Instagram & Maya Inspired",
    role: "Frontend Developer",
    period: "2024",
    tech: ["Android Studio", "Kotlin", "XML Layouts"],
    highlights: [
      "Built multiple mobile applications showcasing diverse UI patterns including streaming platforms, social media feeds, and digital wallet interfaces",
      "Implemented visual-first navigation with category-based content browsing, responsive grid layouts, and Netflix-inspired design patterns",
      "Developed user profile management with follower tracking, account features, messaging systems, and referral rewards functionality"
    ],
    images: ["/images/ANDROID.png"],
    link: null,
    github: "https://github.com/ItsyBinsy/MyAndroidLayouts",
    isPrivate: false,
  },
  {
    title: "Viva La Vigan - Tourism & Cultural Heritage Platform",
    role: "Full-Stack Developer",
    period: "2024",
    tech: ["AngularJS", "ASP.NET MVC", "MySQL", "Materialize", "GitHub"],
    highlights: [
      "Built role-based content management system with three-tier access control (User, Writer, Admin) and application approval workflow",
      "Developed tourism showcase features including attractions gallery, experience posts, writer dashboard for content submission, and admin moderation panel",
      "Implemented user authentication with status-based login (pending, approved, rejected) and dynamic role-based dashboard routing"
    ],
    images: ["/images/LVV.png"],
    link: null,
    isPrivate: true,
  },
  {
    title: "Webinar Platform UX Testing & Feedback",
    role: "Software QA & Tester · Freelance (Upwork)",
    period: "May 2026",
    tech: ["Software QA", "Software Testing"],
    highlights: [
      "Conducted guided usability testing sessions on a browser-based webinar platform for professionals, founders, and creators",
      "Evaluated key features and engagement tools, providing structured feedback on usability and overall user experience",
      "Delivered targeted written analysis covering pain points, strengths, and improvement suggestions based on real-world webinar and virtual event experience"
    ],
    images: ["/images/WG.png"],
    link: null,
    isPrivate: false,
  },
  {
    title: "ExperienceMIMAROPA - Regional Tourism Platform",
    role: "Front-End Developer & Quality Assurance",
    period: "2023",
    tech: ["HTML5", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    highlights: [
      "Built responsive tourism website with destination showcase pages, tour packages, and user authentication",
      "Developed blog system and direct booking integration",
      "Implemented quality assurance testing for cross-browser compatibility"
    ],
    images: ["/images/EXPERIENCEMIMAROPA.png"],
    link: null,
    isPrivate: true,
  },
];

// Certifications Section Data
export const certificationsData = [
  {
    name: "PhilNITS Information Technology Passport (IP) Certification",
    issuer: "PhilNITS",
    date: "Nov 2025",
    badge: "/images/PHILNITS.png",
    preview: "/images/PHILNITS.png",
    link: "#"
  },
  {
    name: "CSS Essentials",
    issuer: "Cisco",
    date: "Oct 2025",
    badge: "/images/CSS.png",
    preview: "/images/CSS.png",
    link: "#"
  },
  {
    name: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "Sep 2025",
    badge: "/images/AI.png",
    preview: "/images/AI.png",
    link: "#"
  },
  {
    name: "HTML Essentials",
    issuer: "Cisco",
    date: "Sep 2025",
    badge: "/images/HTML.png",
    preview: "/images/HTML.png",
    link: "#"
  },
  {
    name: "Certificate of Appreciation – HR Information and Payroll System",
    issuer: "First Analytical Services and Technical Cooperative",
    date: "May 2025",
    badge: "/images/FASTCERT.jpg",
    preview: "/images/FASTCERT.jpg",
    link: "#"
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco",
    date: "Dec 2023",
    badge: "/images/JS.png",
    preview: "/images/JS.png",
    link: "#"
  },
  {
    name: "CompTIA IT Fundamentals+ (ITF+) Certification",
    issuer: "CompTIA",
    date: "May 2023",
    badge: "/images/ITF.png",
    preview: "/images/ITF.png",
    link: "#"
  },
];

// Contact Section Data
export const contactData = {
  title: "Contact Me",
  subtitle: "Your success is one conversation away.",
  methods: [
    {
      type: "email",
      icon: "SiGmail",
      label: "Email",
      value: "vincecvviana@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&to=vincecvviana@gmail.com",
      buttonText: "Send Email",
    },
    {
      type: "phone",
      icon: "MdPhone",
      label: "Phone",
      value: "+63 938 472 9243",
      link: "tel:+639384729243",
      buttonText: "Call Me",
    },
    {
      type: "social",
      icon: "MdShare",
      label: "Socials",
      socials: [
        {
          name: "Facebook",
          icon: "RiFacebookLine",
          link: "https://www.facebook.com/vincecvv",
        },
        {
          name: "LinkedIn",
          icon: "RiLinkedinLine",
          link: "https://www.linkedin.com/in/vincecvv/",
        },
      ],
    },
  ],
};
