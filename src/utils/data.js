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
    light: "/images/me/mewhite.webp",  // Light mode image
    dark: "/images/me/meblack.webp"      // Dark mode image
  },
  buttons: [
    { label: "Download CV", type: "outline" },
    { label: "See Projects", type: "solid", link: "#projects" },
  ],
  status: "Available for Work",
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
        { name: "HTML5", icon: "SiHtml5", description: "Used across every web project, from tourism platforms to quiz apps, writing semantic and accessible markup that structures real shipped products." },
        { name: "CSS3", icon: "SiCss3", description: "Hand-crafted responsive layouts and animations, including custom keyframes and transitions, before reaching for frameworks." },
        { name: "JavaScript", icon: "SiJavascript", description: "The foundation of every frontend built, covering event handling, async logic, DOM manipulation, and vanilla problem-solving before frameworks abstract it away." },
        { name: "ReactJS", icon: "SiReact", description: "Primary frontend framework across internship and personal projects, building production quiz UIs, PWA game modes, and component libraries shipped to real users." },
        { name: "Next.js", icon: "SiNextdotjs", description: "Built Saan Tayo Kakain with Next.js, covering server-side API routes, dynamic OG image generation, PWA config, and edge-ready deployment on Vercel." },
        { name: "AngularJS", icon: "SiAngular", description: "Built SPAs with two-way data binding and role-based routing in Viva La Vigan and FAST Laboratories, including MVC integration with ASP.NET." },
        { name: "Tailwind CSS", icon: "SiTailwindcss", description: "Default styling tool across all recent projects, building full design systems, dark mode, responsive breakpoints, and custom components entirely in Tailwind." },
        { name: "Bootstrap", icon: "SiBootstrap", description: "Used for rapid grid-based layouts and responsive UI in academic and client projects before moving to utility-first approaches." },
        { name: "Materialize", icon: "SiMaterialdesign", description: "Applied Material Design components to build the UI for ExperienceMIMAROPA, a multi-role tourism platform." },
        { name: "shadcn/ui", icon: "SiRadixui", description: "Integrated into the portfolio and quiz projects for accessible, composable primitives like dialogs, badges, and sheets, built on Radix UI and Tailwind." },
        { name: "TypeScript", icon: "SiTypescript", description: "Used throughout Saan Tayo Kakain, with typed API responses, custom Playwright fixtures, Zustand store slices, and component props enforced at compile time." },
        { name: "PWA", icon: "SiPwa", description: "Shipped Saan Tayo Kakain as a fully installable PWA with offline support, a custom app manifest, and service worker, live with real users at saantayokakain.today." },
        { name: "Zustand", icon: "MdOutlineTerminal", description: "Managed game state in Saan Tayo Kakain with Zustand persist middleware, including a custom useHydrated hook to prevent SSR hydration mismatches." },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: "SiNodedotjs", description: "Built the entire backend for StudAI including the REST API, real-time battle logic, scoring engine, and database integration, all running on Node.js." },
        { name: "Express.js", icon: "SiExpress", description: "Scaffolded and structured REST APIs for StudAI and Star Coloroof, handling routing, middleware, and error handling in production environments." },
        { name: "Laravel", icon: "SiLaravel", description: "Built Barangay 24/7 with Laravel, covering full MVC structure, role-based access control, Eloquent ORM, and deployment to DigitalOcean." },
        { name: "RESTful APIs", icon: "SiExpress", description: "Designed and consumed REST APIs across multiple projects, from building them in Express and Laravel to integrating third-party APIs like Google Places and Strapi." },
        { name: "MVC Architecture", icon: "SiDotnet", description: "Applied MVC consistently across Laravel, ASP.NET, and AngularJS projects. Separation of concerns is second nature across different stacks." },
        { name: "ASP.NET Core", icon: "SiDotnet", description: "Contributed to a .NET 9 CQRS backend at Blackfort, resolving bug tickets across MediatR handlers, Entity Framework Core, and Web API controllers in a professional codebase." },
        { name: "Blazor WebAssembly", icon: "SiDotnet", description: "Worked on the Blazor WebAssembly client for BF Timesheet during internship, fixing frontend bugs across Telerik UI components and wasm-rendered pages." },
        { name: "GraphQL", icon: "SiGraphql", description: "Queried GraphQL APIs with typed schemas in projects using Strapi's GraphQL endpoint, understanding query structure, fragments, and reducing over-fetching." },
      ],
    },
    {
      name: "Mobile",
      skills: [
        { name: "Flutter", icon: "SiFlutter", description: "Led NamNam from Figma mockups to a working Flutter app, covering real-time Firestore queries, Firebase auth, photo uploads, and automated rating aggregation across documents." },
        { name: "Dart", icon: "SiDart", description: "Wrote all Flutter logic in Dart, including async streams, typed models, Firestore listeners, and widget composition across the NamNam app." },
        { name: "Android Studio", icon: "SiAndroidstudio", description: "Built native Android UIs in Kotlin and XML through coursework, recreating real-world app interfaces including Netflix, Instagram, and Maya." },
        { name: "Kotlin", icon: "SiKotlin", description: "Developed Android applications with Kotlin covering activities, intents, RecyclerViews, and event-driven UI patterns across mobile coursework projects." },
      ],
    },
    {
      name: "Database & CMS",
      skills: [
        { name: "MySQL", icon: "SiMysql", description: "Designed relational schemas and wrote queries for StudAI, Barangay 24/7, FAST Laboratories, and more, including complex joins, transactions, and server-side score enforcement." },
        { name: "Supabase", icon: "SiSupabase", description: "Used Supabase for auth, real-time subscriptions, and PostgreSQL-backed storage as an open-source Firebase alternative in modern web projects." },
        { name: "Firebase", icon: "SiFirebase", description: "Used across two projects: Cloud Firestore with composite queries and cascading updates in NamNam, and Realtime Database for live quiz battles with connection tracking in StudAI." },
        { name: "HeidiSQL", icon: "SiMysql", description: "Primary tool for inspecting, querying, and debugging MySQL databases during development, used across all MySQL-backed projects." },
        { name: "PostgreSQL", icon: "SiPostgresql", description: "Worked with PostgreSQL through Supabase, covering schema design, row-level security, and real-time subscriptions backed by Postgres under the hood." },
        { name: "SQL Server", icon: "SiDotnet", description: "Used SQL Server with Entity Framework Core for data access in the BF Timesheet system at Blackfort, covering migrations, relationships, and LINQ-based querying." },
        { name: "Strapi", icon: "SiStrapi", description: "Consumed Strapi v5 REST API in the TLL Daily Drill project, working with content types, media fields, and relational data served from a headless CMS in production." },
      ],
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: "Git", icon: "SiGit", description: "Used Git daily across all projects, covering branching, rebasing, conflict resolution, and maintaining clean commit history in solo and team environments." },
        { name: "GitHub", icon: "SiGithub", description: "Managed repositories, submitted PRs for code review, and collaborated with teams on GitHub across internship and academic projects." },
        { name: "Azure DevOps", icon: "MdOutlineDevices", description: "Used daily during internship at Blackfort, covering sprint boards, CI/CD pipelines, Azure Repos, and PR-based code review in a real consulting team environment." },
        { name: "Digital Ocean", icon: "SiDigitalocean", description: "Deployed and managed StudAI and Barangay 24/7 on DigitalOcean droplets, covering server config, DNS, and keeping production environments running." },
        { name: "Docker", icon: "SiDocker", description: "Worked with Docker in the BF Timesheet project at Blackfort, with containerized .NET services as part of the internship development environment." },
        { name: "GitHub Copilot", icon: "SiGithubcopilot", description: "Used as an AI pair programmer to accelerate boilerplate, explore APIs, and validate patterns without losing understanding of what gets generated." },
        { name: "Claude Code", icon: "MdOutlineTerminal", description: "Used Claude Code as an AI CLI for multi-file refactors, architecture decisions, and shipping this portfolio, treating it as a senior collaborator and not just autocomplete." },
        { name: "Vercel", icon: "SiVercel", description: "Deployed Saan Tayo Kakain and this portfolio on Vercel, covering serverless functions for the chatbot API, automatic CI/CD from GitHub, and custom domain configuration." },
      ],
    },
    {
      name: "Design & QA",
      skills: [
        { name: "Figma", icon: "SiFigma", description: "Designed mockups and UI flows for NamNam before leading its development, and contributed to TLL Daily Drill's design-to-code handoff during internship." },
        { name: "Adobe Photoshop", icon: "SiAdobephotoshop", description: "Used for creating and editing visual assets, mockup graphics, and image treatments across web and social media projects." },
        { name: "UI/UX Design", icon: "MdOutlineDevices", description: "Designed the full UI for NamNam, contributed to TLL wireframes, and built this portfolio's bento layout, mobile experience, and dark mode system from scratch." },
        { name: "Manual Testing", icon: "MdOutlineCheckCircle", description: "Conducted structured manual test cases across internship bug tickets, academic projects, and two paid Upwork QA contracts covering full platform walkthroughs." },
        { name: "Cross-browser Compatibility", icon: "MdOutlineDevices", description: "Verified UI consistency and behavior across Chrome, Firefox, Edge, and Safari as part of QA work on ExperienceMIMAROPA and Upwork client platforms." },
        { name: "UX Validation", icon: "MdOutlineCheckCircle", description: "Delivered structured UX feedback on two Upwork client platforms, evaluating onboarding flows, engagement tools, and usability pain points with written deliverables." },
        { name: "Postman", icon: "SiPostman", description: "Tested and documented REST APIs during development and QA, verifying endpoints, inspecting payloads, and catching integration issues before they reach the frontend." },
        { name: "Python", icon: "SiPython", description: "Built an AI evaluation suite in Python using DeepEval and GPT-3.5-turbo as an LLM judge, testing 9 cases across summarization and chatbot response quality metrics." },
        { name: "Playwright", icon: "MdOutlineBugReport", description: "Wrote a full E2E test suite for Saan Tayo Kakain, covering all screens, network route mocking, localStorage injection, custom typed fixtures, and mobile viewport testing." },
        { name: "Bug Tracking", icon: "MdOutlineBugReport", description: "Resolved bug tickets on Azure DevOps during internship at Blackfort, triaging, reproducing, fixing, and submitting PRs across both the TLL and BF Timesheet projects." },
        { name: "Copywriting", icon: "MdOutlineEditNote", description: "Wrote web copy for client projects and managed content for social media pages with followings ranging from 10K to over 1M." },
        { name: "Social Media Mgmt", icon: "MdOutlineEditNote", description: "Managed content calendars and audience engagement for online influencer pages from 2022 to 2025, growing and maintaining accounts across platforms." },
      ],
    },
  ],
};

// Projects Section Data
export const projectsData = [
  {
    title: "Saan Tayo Kakain",
    useContain: true,
    role: "Full-Stack Developer & QA · Personal Project",
    period: "May 2026",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Google Places API", "Playwright", "Lottie", "Tally", "PWA", "Vercel"],
    highlights: [
      "Built and shipped a GPS-based restaurant picker PWA with a custom design system, 3 interactive game modes with Framer Motion animations, Lottie loading screens, server-side API proxy, E2E test suite, and dynamic OG image generation. Live at saantayokakain.today with real users. End-to-end, from architecture to deployment. ",
      "Architected a server-side API proxy with strict input allowlisting, AbortController timeouts, and a per-IP rate limiter, then identified its serverless multi-instance weakness (each Vercel function has isolated memory, making the limiter bypassable under load) and migrated it to Upstash Redis using the INCR + EXPIRE pattern, giving all instances a shared atomic counter.",
      "Built a complete Playwright E2E suite covering all screens, edge cases, and back-button loopholes, including network route mocking, custom typed fixtures, localStorage injection for state manipulation, and mobile viewport testing at real phone dimensions.",
      "Solved a hydration race condition where Zustand persist middleware started empty on mount, causing redirect guards to fire on ghost data, fixed with a custom useHydrated hook using a lazy useState initializer and onFinishHydration subscription.",
      "Engineered a contextual feedback trigger using Tally's JS SDK that fires once after users return from Google Maps directions, using visibilitychange and a 15s idle fallback, never repeating after submit.",
      "Built dynamic OG image generation with Next.js ImageResponse and a custom font loaded via readFileSync, shipping proper Twitter card previews for social sharing without a third-party service.",
    ],
    images: [
      "/images/STK2.webp",
      "/images/STK3.webp",
      "/images/STK4.webp",
      "/images/STK5.webp",
      "/images/STK6.webp",
    ],
    link: "https://www.saantayokakain.today",
    github: "https://github.com/ItsyBinsy/saan-tayo-kakain",
    isPrivate: false,
  },
  {
    title: "TLL Daily Drill (WikayGaling) - Filipino Vocabulary Quiz App",
    role: "Software Engineer Intern (Full-Stack) · Blackfort Consulting PH",
    period: "Mar 2026 - May 2026",
    tech: ["ReactJS", "Tailwind CSS", "REST API", "Strapi v5", "Azure DevOps", "GitHub"],
    highlights: [
      "Collaborated on Figma designs and translated them into production-ready React components, adapting to client feedback and requests throughout the design-to-code workflow across a real client project",
      "Worked in a professional Agile/Scrum team environment at a consulting firm, navigating Azure DevOps boards, resolving bug tickets, submitting PRs for code review, and shipping features across sprints alongside senior engineers",
      "Built the complete quiz frontend in React including multiple question formats (image-based, word cloud, pure text), countdown timers, star-based scoring, and localStorage persistence that saves progress on every answer so users on unstable connections never lose their session mid-quiz",
      "Consumed Strapi v5 REST API to fetch quiz content, gaining hands-on experience with headless CMS architecture, content schema design, and how media and relational fields are structured and served to a frontend"
    ],
    images: [
      "/images/TLL1.webp",
      "/images/TLL2.webp",
      "/images/TLL3.webp",
      "/images/TLL4.webp",
      "/images/TLL5.webp",
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
      "Led a 3-person team through a full mobile app lifecycle, from wireframes and mockups to a working Flutter build, overseeing architecture decisions, NoSQL schema design, and overall code quality",
      "Built a multi-parameter real-time search across name, category, and star rating using Cloud Firestore composite queries, with results updating live as users type",
      "Implemented an automated rating aggregation system using Firestore listeners that recalculates and propagates restaurant average ratings instantly on every new review submission",
      "Handled cross-document data cascading so profile picture updates reflect across all existing review documents, maintaining data consistency without a traditional backend",
      "Integrated Firebase Authentication with Google Sign-In and email/password login, Cloud Firestore for real-time data, and Firebase Storage for photo uploads, covering the full Firebase suite across auth, database, and storage"
    ],
    images: [
      "/images/NAM1.webp",
      "/images/NAM2.webp",
      "/images/NAM3.webp",
    ],
    link: null,
    github: "https://github.com/ItsyBinsy/namnam",
    isPrivate: false,
  },
  {
    title: "BF Timesheet - Timesheet Management System",
    role: "Software Engineer Intern (Full-Stack) · Blackfort Consulting PH",
    period: "Feb 2026 - May 2026",
    tech: [".NET 9 Web API", "Blazor WebAssembly", "Telerik UI", "Entity Framework Core", "PostgreSQL", ".NET Aspire", "Docker", "MediatR (CQRS)", "Azure DevOps"],
    highlights: [
      "Contributed to an active enterprise-scale timesheet and HR system as a full-stack intern, navigating a Clean Architecture codebase with CQRS, MediatR, and Blazor WebAssembly alongside senior engineers across multiple professional roles",
      "Resolved bug tickets across the Blazor WebAssembly client and ASP.NET Core Web API backend, reading and adapting to the team's established code style and architecture patterns to deliver fixes within sprint estimates",
      "Gained first-hand exposure to a professional Agile workflow using Azure DevOps, managing work items, submitting pull requests for code review, and meeting sprint-based delivery timelines for the first time outside of academic settings",
      "Worked within a Docker-containerized development environment and observed .NET Aspire orchestration, building familiarity with how distributed systems are provisioned, configured, and run locally in an enterprise context",
      "Navigated a 14-project Clean Architecture solution (Api, Client, Core, Infrastructure, Shared, Test, Tools layers), building practical understanding of how enterprise codebases separate concerns across bounded layers compared to the single-project academic apps built in school"
    ],
    images: ["/images/BFT.webp", "/images/BF2.webp"],
    link: null,
    isPrivate: true,
  },
  {
    title: "StudAI - AI-Driven Study Buddy",
    role: "Full-Stack Developer · Capstone Project",
    period: "Aug - Dec 2025",
    tech: ["ReactJS", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "Firebase", "DigitalOcean", "GitHub"],
    highlights: [
      "Built a complete quiz platform covering manual creation, AI-powered quiz generation from note content, four question types including matching with partial credit, 6-digit share codes with cross-user import, unified leaderboards across original and imported quiz copies via shared quiz ID, and server-side scoring with daily cap enforcement",
      "Implemented adaptive difficulty mode that dynamically reorders the question queue mid-quiz based on rolling accuracy every 2 questions, with difficulty-weighted scoring (Easy=1, Medium=2, Hard=3) and the full adaptive journey recorded per attempt for review",
      "Built the real-time quiz battle system using Firebase Realtime Database for live score sync, emoji reactions, and per-player connection status, with a 5-minute disconnect grace period, reconnection resume, forfeit handling, and final results synced to MySQL in a single transaction",
      "Hardened the quiz system against production edge cases including timer expiry race conditions, non-host start attempts rejected server-side, duplicate PIN retry loops, and graceful battle termination when the source quiz is deleted mid-game",
      "Collaborated on QA by fixing bug tickets reported by the testing team and contributing to test case writing, participating in the full bug lifecycle from report to resolution",
      "Designed and built an AI evaluation suite solo using the DeepEval framework with GPT-3.5-turbo as an LLM judge, testing note summarization and chatbot responses across 9 test cases using SummarizationMetric, FaithfulnessMetric, and AnswerRelevancyMetric with all 9 cases passed with scores synced to the Confident AI dashboard"
    ],
    images: [
      "/images/STUDAI.webp",
      "/images/STUDAI2.webp",
      "/images/STUDAI3.webp",
      "/images/STUDAI4.webp",
      "/images/STUDAI5.webp",
      "/images/STUDAI6.webp",
      "/images/STUDAI7.webp",
      "/images/STUDAI8.webp",
      "/images/STUDAI9.webp",
      "/images/STUDAI10.webp",
      "/images/STUDAI11.webp",
    ],
    link: "https://studai.dev/",
    isPrivate: false,
  },
  {
    title: "Star Coloroof - Roofing Products E-Commerce Platform",
    role: "Full-Stack Developer",
    period: "Dec 2025",
    tech: ["ReactJS", "React Router v7", "Node.js", "Express", "Nodemailer", "Tailwind CSS", "Framer Motion", "Axios", "GitHub"],
    highlights: [
      "Built a multi-page React application for a real construction materials supplier, defended as an academic final requirement, with full client-side routing using React Router v7, implementing protected admin routes with a custom AuthContext, useContext, and ProtectedRoute pattern that redirects unauthenticated users back to their intended destination after login",
      "Applied core React patterns throughout including useState for local UI state, useEffect with cleanup functions for event listeners and timers, useRef for click-outside modal detection, lifting state up between parent and child components, and controlled form inputs with inline validation",
      "Built a product catalog with real-time search, multi-select category filtering, a detail modal with scroll lock and keyboard close, and parallel data fetching using Promise.all to avoid sequential waterfall requests",
      "Connected the frontend to three Node.js servers handling REST data (JSON Server), email delivery (Nodemailer with HTML templates), and image uploads (Multer with MIME validation), integrating all three via Axios"
    ],
    images: ["/images/STAR1.webp", "/images/STAR2.webp"],
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
      "Built a role-based access control system with three user tiers (admin, employee, resident) using Laravel middleware and route grouping, applying authentication and authorization patterns in a real multi-user application context",
      "Designed and managed database layer using Laravel migrations, Eloquent ORM, and seeders across 7 models and 15 migrations, implementing soft deletes for record archiving and relational data modeling for a government use case",
      "Containerized the application with Docker and deployed to DigitalOcean App Platform with a managed MySQL 8 database and auto-deploy on push to main"
    ],
    images: [
      "/images/BARANGAY.webp",
      "/images/BARANGAY2.webp",
      "/images/BARANGAY3.webp",
      "/images/BARANGAY4.webp",
      "/images/BARANGAY5.webp",
    ],
    link: null,
    github: "https://github.com/npsangco/barangay247",
    isPrivate: false,
  },
  {
    title: "HR Payroll Management System - FAST Laboratories",
    role: "Front-End Developer & Software QA · Software Engineering Final Requirement",
    period: "Sep 2024 - May 2025",
    tech: ["AngularJS", "ASP.NET MVC", "MySQL", "HTML5", "CSS", "GitHub"],
    highlights: [
      "Built and defended the payroll management interface as a Software Engineering final requirement for a real company client (FAST Laboratories), developing employee record views, salary display modules, and payslip report screens using AngularJS and ASP.NET MVC, directly addressing the client's critical HR issues including inconsistent records, salary miscalculations, and processing delays",
      "Designed entity-relationship diagrams and class diagrams during the system planning phase, translating business requirements into a structured data model before development",
      "Conducted manual QA testing across payroll workflows, validating that UI outputs correctly reflected statutory deduction computations for SSS and PhilHealth, and tracked identified bugs through to resolution",
      "Developed payroll report generation views and ensured accurate data presentation across employee records and salary summaries"
    ],
    images: ["/images/FAST.webp"],
    link: null,
    isPrivate: true,
  },
  {
    title: "Mobile App Collection - Flutter Course",
    useContain: true,
    role: "Mobile App Developer",
    period: "2026",
    tech: ["Flutter", "Dart"],
    highlights: [
      "Built multiple Flutter mobile applications throughout a semester of mobile development coursework, applying core Dart and Flutter fundamentals including widgets, Scaffold, layouts, and navigation across recreations of real-world app interfaces"
    ],
    images: ["/images/FLUTTER.webp"],
    link: null,
    isPrivate: false,
  },
  {
    title: "Viva La Vigan - Tourism & Cultural Heritage Platform",
    role: "Full-Stack Developer",
    period: "2024",
    tech: ["C#", "ASP.NET MVC", "Entity Framework", "AngularJS", "Materialize CSS", "MySQL", "GitHub",],
    highlights: [
      "Built a multi-role blogging and content management platform using ASP.NET MVC and AngularJS, with three access tiers (User, Writer, Admin) each routed to their own dashboard, views, and business logic, with Materialize CSS for the responsive UI",
      "Designed the data layer using Entity Framework Code-First with segregated DbContexts per domain (users, blogs, comments) and kept data responsibilities separated across bounded contexts",
      "Implemented status-based authentication where accounts cycle through pending, approved, and rejected states, with a role escalation flow that locks writer applicants in a pending state until processed through an admin moderation queue",
      "Built full CRUD operations for blog posts and user management across both the ASP.NET MVC backend and the AngularJS frontend, writing the services, controllers, and async HTTP calls that connect the client to the server without full page refreshes"
    ],
    images: ["/images/LVV.webp"],
    link: null,
    isPrivate: true,
  },
  {
    title: "Webinar Platform UX Testing & Feedback",
    role: "Software QA & Product Tester  · Freelance (Upwork)",
    period: "May-June 2026",
    tech: ["Software QA", "Software Testing"],
    highlights: [
      "Tested a private-label jewelry dropshipping platform end-to-end, evaluating the store setup flow, branding asset generation, product catalog management, and Shopify integration for automated order fulfillment",
      "Evaluated a browser-based webinar platform across all available modes and features including hosting, engagement tools, and audience interaction, delivering structured written feedback on usability, pain points, and improvement suggestions",
      "Produced screen-recorded proof-of-testing sessions and written deliverables for two separate client platforms, documenting real user experience with actionable insights for each product team"
    ],
    images: ["/images/ST1.webp", "/images/ST.webp"],
    link: null,
    isPrivate: false,
  },
  {
    title: "Mobile App Collection - Android Development Course",
    role: "Mobile App Developer",
    period: "2024",
    tech: ["Android Studio", "Kotlin", "XML Layouts"],
    highlights: [
      "Built multiple Android applications in Kotlin using Android Studio throughout a semester of mobile development coursework, recreating responsive UI patterns from popular apps",
      "Applied Android fundamentals including XML layouts, responsive grid-based content browsing, visual navigation, and user profile management across multiple hands-on laboratory exercises"
    ],
    images: ["/images/ANDROID.webp"],
    link: null,
    github: "https://github.com/ItsyBinsy/MyAndroidLayouts",
    isPrivate: false,
  },
  {
    title: "ExperienceMIMAROPA - Regional Tourism Platform",
    role: "Front-End Developer & Software QA",
    period: "2023",
    tech: ["HTML5", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    highlights: [
      "One of the earlier projects that shaped a full-stack approach, applying HTML5, CSS, JavaScript, Bootstrap, and MySQL end-to-end across responsive layouts, dynamic content, role-based access control (User, Writer, Admin), and database-backed user authentication",
      "Collaborated in a team setting for a defended academic project, coordinating across members and delivering a working product under real academic pressure",
      "Performed manual QA across all pages, catching UI inconsistencies and broken flows before the project defense"
    ],
    images: ["/images/EXPERIENCEMIMAROPA.webp"],
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
    badge: "/images/PHILNITS.webp",
    preview: "/images/PHILNITS.webp",
    link: "#"
  },
  {
    name: "CSS Essentials",
    issuer: "Cisco",
    date: "Oct 2025",
    badge: "/images/CSS.webp",
    preview: "/images/CSS.webp",
    link: "#"
  },
  {
    name: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "Sep 2025",
    badge: "/images/AI.webp",
    preview: "/images/AI.webp",
    link: "#"
  },
  {
    name: "HTML Essentials",
    issuer: "Cisco",
    date: "Sep 2025",
    badge: "/images/HTML.webp",
    preview: "/images/HTML.webp",
    link: "#"
  },
  {
    name: "Certificate of Appreciation – HR Information and Payroll System",
    issuer: "First Analytical Services and Technical Cooperative",
    date: "May 2025",
    badge: "/images/FASTCERT.webp",
    preview: "/images/FASTCERT.webp",
    link: "#"
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco",
    date: "Dec 2023",
    badge: "/images/JS.webp",
    preview: "/images/JS.webp",
    link: "#"
  },
  {
    name: "CompTIA IT Fundamentals+ (ITF+) Certification",
    issuer: "CompTIA",
    date: "May 2023",
    badge: "/images/ITF.webp",
    preview: "/images/ITF.webp",
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
