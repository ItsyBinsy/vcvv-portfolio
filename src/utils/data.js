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
    light: "/images/ME2.jpg",  // Light mode image
    dark: "/images/ME.png"      // Dark mode image
  },
  buttons: [
    { label: "Download CV", type: "outline" },
    { label: "See Projects", type: "solid", link: "#projects" },
  ],
  status: "Available for OJT",
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
    {
      name: "ReactJS",
      icon: "SiReact",
      description:
        "Developed component-based interfaces with state management, applied in portfolio features, client projects, and coursework.",
    },
    {
      name: "Node.js",
      icon: "SiNodedotjs",
      description:
        "Built backend services and RESTful APIs with efficient server-side JavaScript runtime.",
    },
    {
      name: "Express.js",
      icon: "SiExpress",
      description:
        "Created scalable web applications and APIs with minimalist Node.js framework.",
    },
    {
      name: "Laravel",
      icon: "SiLaravel",
      description:
        "Developed full-featured web applications with elegant PHP framework and MVC architecture.",
    },
    {
      name: "ASP.NET",
      icon: "SiDotnet",
      description:
        "Developed server-side web applications using MVC architecture with C# and .NET framework.",
    },
    {
      name: "MySQL",
      icon: "SiMysql",
      description:
        "Designed databases and handled data persistence with CRUD operations, applied in academic systems and personal practice projects.",
    },
    {
      name: "JavaScript",
      icon: "SiJavascript",
      description:
        "Enhanced user interaction with validation, dynamic components, and logic handling, applied in client projects and academic builds.",
    },
    {
      name: "Tailwind CSS",
      icon: "SiTailwindcss",
      description:
        "Built modern, utility-first UIs for rapid prototyping and deployment, applied in portfolio, class projects, and client pages.",
    },
    {
      name: "AngularJS",
      icon: "SiAngular",
      description:
        "Practiced building SPAs with data binding and modular code, applied in coursework projects and client demos.",
    },
    {
      name: "Bootstrap",
      icon: "SiBootstrap",
      description:
        "Accelerated development with grid systems and prebuilt components, applied in coursework dashboards and class projects.",
    },
    {
      name: "Materialize",
      icon: "SiMaterialdesign",
      description:
        "Built responsive Material Design interfaces with component library, applied in tourism platform and client projects.",
    },
    {
      name: "Android Studio",
      icon: "SiAndroidstudio",
      description:
        "Created mobile interfaces and event-driven apps, applied in coursework mobile projects and small client apps.",
    },
    {
      name: "Kotlin",
      icon: "SiKotlin",
      description:
        "Developed modern Android applications with concise and expressive programming language.",
    },
    {
      name: "Git",
      icon: "SiGit",
      description:
        "Managed version control with branching, commits, and collaboration workflows.",
    },
    {
      name: "GitHub",
      icon: "SiGithub",
      description:
        "Collaborated on projects with pull requests, code reviews, and repository management.",
    },
    {
      name: "HTML5",
      icon: "SiHtml5",
      description:
        "Structured semantic layouts for pages and forms, applied in portfolio sites, client projects, and academic coursework.",
    },
    {
      name: "CSS3",
      icon: "SiCss3",
      description:
        "Styled responsive designs with consistent typography and spacing, applied across coursework, client projects, and portfolio work.",
    },
    {
      name: "Figma",
      icon: "SiFigma",
      description:
        "Designed user interfaces and prototypes with collaborative design tool.",
    },
    {
      name: "Photoshop",
      icon: "SiAdobephotoshop",
      description:
        "Created and edited graphics, mockups, and visual assets for web and mobile projects.",
    },
  ],

  // All skills organized by category
  categories: [
    {
      name: "Frontend Development",
      skills: [
        {
          name: "HTML5",
          icon: "SiHtml5",
          description:
            "Structured semantic layouts for pages and forms, applied in portfolio sites, client projects, and academic coursework.",
        },
        {
          name: "CSS3",
          icon: "SiCss3",
          description:
            "Styled responsive designs with consistent typography and spacing, applied across coursework, client projects, and portfolio work.",
        },
        {
          name: "JavaScript",
          icon: "SiJavascript",
          description:
            "Enhanced user interaction with validation, dynamic components, and logic handling, applied in client projects and academic builds.",
        },
        {
          name: "ReactJS",
          icon: "SiReact",
          description:
            "Developed component-based interfaces with state management, applied in portfolio features, client projects, and coursework.",
        },
        {
          name: "AngularJS",
          icon: "SiAngular",
          description:
            "Practiced building SPAs with data binding and modular code, applied in coursework projects and client demos.",
        },
        {
          name: "Tailwind CSS",
          icon: "SiTailwindcss",
          description:
            "Built modern, utility-first UIs for rapid prototyping and deployment, applied in portfolio, class projects, and client pages.",
        },
        {
          name: "Bootstrap",
          icon: "SiBootstrap",
          description:
            "Accelerated development with grid systems and prebuilt components, applied in coursework dashboards and class projects.",
        },
        {
          name: "Materialize",
          icon: "SiMaterialdesign",
          description:
            "Built responsive Material Design interfaces with component library, applied in tourism platform and client projects.",
        },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        {
          name: "Node.js",
          icon: "SiNodedotjs",
          description:
            "Built backend services and RESTful APIs with efficient server-side JavaScript runtime.",
        },
        {
          name: "Express.js",
          icon: "SiExpress",
          description:
            "Created scalable web applications and APIs with minimalist Node.js framework.",
        },
        {
          name: "Laravel",
          icon: "SiLaravel",
          description:
            "Developed full-featured web applications with elegant PHP framework and MVC architecture.",
        },
        {
          name: "ASP.NET",
          icon: "SiDotnet",
          description:
            "Developed server-side web applications using MVC architecture with C# and .NET framework.",
        },
      ],
    },
    {
      name: "Mobile Development",
      skills: [
        {
          name: "Android Studio",
          icon: "SiAndroidstudio",
          description:
            "Created mobile interfaces and event-driven apps, applied in coursework mobile projects and small client apps.",
        },
        {
          name: "Kotlin",
          icon: "SiKotlin",
          description:
            "Developed modern Android applications with concise and expressive programming language.",
        },
      ],
    },
    {
      name: "Database",
      skills: [
        {
          name: "MySQL",
          icon: "SiMysql",
          description:
            "Designed databases and handled data persistence with CRUD operations, applied in academic systems and personal practice projects.",
        },
      ],
    },
    {
      name: "Tools & Design",
      skills: [
        {
          name: "Git",
          icon: "SiGit",
          description:
            "Managed version control with branching, commits, and collaboration workflows.",
        },
        {
          name: "GitHub",
          icon: "SiGithub",
          description:
            "Collaborated on projects with pull requests, code reviews, and repository management.",
        },
        {
          name: "Figma",
          icon: "SiFigma",
          description:
            "Designed user interfaces and prototypes with collaborative design tool.",
        },
        {
          name: "Photoshop",
          icon: "SiAdobephotoshop",
          description:
            "Created and edited graphics, mockups, and visual assets for web and mobile projects.",
        },
      ],
    },
  ],
};

// Projects Section Data
export const projectsData = [
  {
    title: "StudAI - AI-Driven Study Buddy",
    role: "Full-Stack Developer",
    period: "Aug 2025 - Present",
    tech: ["ReactJS", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "Firebase"],
    highlights: [
      "Built quiz module with three game modes (Normal, Shuffled, Adaptive Difficulty) and real-time multiplayer quiz battles using Firebase",
      "Developed AI-powered study recommendations, achievement systems, and progress tracking features",
      "Managed deployment with Digital Ocean and version control with GitHub"
    ],
    image: "/images/STUDAI.png",
    link: "#",
  },
  {
    title: "Star Coloroof - Roofing Products E-Commerce Platform",
    role: "Full-Stack Developer",
    tech: ["ReactJS", "Tailwind CSS", "Node.js", "REST APIs", "GitHub"],
    highlights: [
      "Built online storefront with product catalog, detailed specifications, and shopping cart",
      "Developed booking system and customer inquiry features",
      "Managed version control and team collaboration using GitHub"
    ],
    image: "/images/STARCOLOROOF.png",
    link: "#",
  },
  {
    title: "ExperienceMIMAROPA - Regional Tourism Platform",
    role: "Front-End Developer & Quality Assurance",
    tech: ["HTML5", "CSS", "Bootstrap", "MySQL", "JavaScript"],
    highlights: [
      "Built responsive tourism website with destination showcase pages, tour packages, and user authentication",
      "Developed blog system and direct booking integration",
      "Implemented quality assurance testing for cross-browser compatibility"
    ],
    image: "/images/EXPERIENCEMIMAROPA.png",
    link: "#",
  },
  {
    title: "FAST Laboratories - HR Payroll Management System",
    role: "Front-End Developer",
    tech: ["AngularJS", "HTML5", "CSS", "MySQL", "GitHub"],
    highlights: [
      "Built automated payroll interface with employee record management and salary calculation modules",
      "Developed payroll report generation features",
      "Solved critical HR issues: inconsistent records, salary miscalculations, and processing delays"
    ],
    image: "/images/FAST.jpg",
    link: "#",
  },
  {
    title: "Barangay 24/7 - Digital Barangay Management Platform",
    role: "Full-Stack Developer",
    tech: ["Laravel", "Bootstrap", "MySQL", "DigitalOcean", "GitHub"],
    highlights: [
      "Built role-based management system with three-tier access control (Administrator, Employee, Resident)",
      "Developed household registrations, resident profiles, employee records, infrastructure project tracking, and incident reporting modules",
      "Managed deployment with Digital Ocean and version control with GitHub"
    ],
    image: "/images/BARANGAY.png",
    link: "#",
  },
  {
    title: "Viva La Vigan - Tourism & Cultural Heritage Platform",
    role: "Full-Stack Developer",
    tech: ["AngularJS", "ASP.NET MVC", "MySQL", "Materialize"],
    highlights: [
      "Built role-based content management system with three-tier access control (User, Writer, Admin) and application approval workflow",
      "Developed tourism showcase features including attractions gallery, experience posts, writer dashboard for content submission, and admin moderation panel",
      "Implemented user authentication with status-based login (pending, approved, rejected) and dynamic role-based dashboard routing"
    ],
    image: "/images/LVV.png",
    link: "#",
  },
  {
    title: "Mobile App Collection - Netflix, Instagram & PayMaya Inspired",
    role: "Frontend Developer",
    tech: ["Android Studio", "Kotlin", "XML Layouts"],
    highlights: [
      "Built multiple mobile applications showcasing diverse UI patterns including streaming platforms, social media feeds, and digital wallet interfaces",
      "Implemented visual-first navigation with category-based content browsing, responsive grid layouts, and Netflix-inspired design patterns",
      "Developed user profile management with follower tracking, account features, messaging systems, and referral rewards functionality"
    ],
    image: "/images/ANDROID.png",
    link: "#",
  },
];

// Certifications Section Data
export const certificationsData = [
  {
    name: "PhilNITS Information Technology Passport (IP) Certification",
    issuer: "PhilNITS",
    date: "Nov 2025",
    badge: "/images/PHILNITS.png",
    link: "#"
  },
  {
    name: "CSS Essentials",
    issuer: "Cisco",
    date: "Oct 2025",
    badge: "/images/CSS.png",
    link: "#"
  },
  {
    name: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "Sep 2025",
    badge: "/images/AI.png", 
    link: "#"
  },
  {
    name: "HTML Essentials",
    issuer: "Cisco",
    date: "Sep 2025",
    badge: "/images/HTML.png",
    link: "#"
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco",
    date: "Dec 2023",
    badge: "/images/JS.png",
    link: "#"
  },
  {
    name: "CompTIA IT Fundamentals+ (ITF+) Certification",
    issuer: "CompTIA",
    date: "May 2023",
    badge: "/images/ITF.png",
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
      value: "+63 977 625 1107",
      link: "tel:+639776251107",
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
