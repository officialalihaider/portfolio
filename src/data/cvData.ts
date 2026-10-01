import type { TechKey } from '../components/TechIcon';

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  location: string;
  projects?: {
    name: string;
    role: string;
    link?: string;
    bullets: string[];
    techStack?: string[];
    icons?: TechKey[];
  }[];
  techStack?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
  category: 'mern' | 'saas' | 'frontend';
  techStack: { layer: string; tech: string }[];
  icons: TechKey[];
  tags: string[];
}

export const cvData = {
  personal: {
    name: "Ali Haider",
    title: "Full Stack Developer",
    headline: "Full Stack MERN Developer | React.js, Node.js, Express, MongoDB & AWS Specialist",
    email: "aliseeyam@gmail.com",
    phone: "+923156500236",
    location: "Islamabad, Pakistan",
    nationality: "Pakistani",
    linkedin: "linkedin.com/in/ali-haider-command-user",
    linkedinUrl: "https://www.linkedin.com/in/ali-haider-command-user",
    summary: "Full Stack Developer specializing in React and Node.js, creating fast, secure, and user-friendly web applications.",
  },

  skills: {
    frontEnd: {
      label: "Front-End",
      items: ["React.js", "JavaScript", "Vue.js", "HTML5", "CSS3", "Bootstrap"],
      icons: ['react', 'javascript', 'vue', 'html5', 'css3', 'bootstrap'] as TechKey[],
    },
    backEnd: {
      label: "Back-End",
      items: ["Node.js", "Express.js", "JWT Authentication", "Middleware", "Server-Side Logic", "Phishing Simulation & Email Security Testing"],
      icons: ['nodejs', 'express', 'jwt', 'passport'] as TechKey[],
    },
    apiAndState: {
      label: "API Integration & State Handling",
      items: ["RESTful APIs", "Axios", "Fetch API", "Try-Catch Handling", "Error Handling"],
      icons: ['rest', 'javascript'] as TechKey[],
    },
    databases: {
      label: "Databases",
      items: ["MySQL", "MongoDB"],
      icons: ['mysql', 'mongodb'] as TechKey[],
    },
    deploymentAndHosting: {
      label: "Deployment & Hosting",
      items: ["AWS EC2", "Nginx", "PM2", "Vercel", "Netlify", "GoDaddy", "cPanel"],
      icons: ['aws', 'nginx', 'pm2', 'vercel', 'netlify'] as TechKey[],
    },
    versionControl: {
      label: "Version Control",
      items: ["Git", "GitHub", "Bitbucket"],
      icons: ['git', 'github'] as TechKey[],
    },
    otherTools: {
      label: "Other Tools",
      items: ["Figma (UI Design)", "Postman (API Testing)", "Cloudinary", "Tailwind CSS"],
      icons: ['figma', 'postman', 'cloudinary', 'tailwind'] as TechKey[],
    },
  },

  experiences: [
    {
      id: "organix-it",
      company: "Organix-IT",
      companyUrl: "https://www.organix-it.com/",
      role: "Full Stack Developer",
      period: "2024 – present",
      location: "Ghouri Town, Islamabad, Pakistan",
      projects: [
        {
          name: "CyberSense — Learning & Certification Dashboard",
          role: "Frontend Lead",
          link: "https://ui-dev.ethaba.com/",
          bullets: [
            "Developed a fully responsive learning and certification web application using React.js.",
            "Implemented secure user authentication workflows, including login, course access, and completion tracking.",
            "Built a comprehensive admin dashboard to manage users, courses, certificates, phishing campaigns, email templates, and LDAP server data.",
            "Integrated RESTful APIs to enable dynamic content loading, analytics, and reporting.",
            "Implemented multi-language support including Arabic to improve accessibility for international users.",
            "Developed data-driven dashboards for monitoring user activity and system performance.",
          ],
          icons: ['react', 'rest', 'figma'] as TechKey[],
        },
        {
          name: "CyberDefenderPro — Security Awareness & Phishing Simulation SaaS Platform",
          role: "Full Stack Developer",
          link: "https://cyberdefender.organix-it.com/",
          bullets: [
            "Developing a Software-as-a-Service (SaaS) cybersecurity awareness and phishing simulation platform.",
            "Built a React.js based interactive frontend with dashboards, modals, tables, and reporting interfaces.",
            "Developed secure backend APIs using Node.js and Express.js with JWT authentication and middleware-based access control.",
            "Designed and implemented MySQL database architecture for campaigns, users, email templates, attachments, and activity logs.",
            "Implemented file upload and attachment management system for phishing simulation campaigns.",
            "Developed backend services for campaign management, email scheduling, phishing templates, and user activity tracking.",
            "Implemented input validation, error handling, pagination, and query optimization to enhance performance.",
            "Performed API testing and debugging using Postman.",
          ],
          icons: ['react', 'nodejs', 'express', 'mysql', 'jwt', 'postman'] as TechKey[],
        },
      ],
    },
    {
      id: "waywe-gaming",
      company: "Waywe Gaming",
      companyUrl: "https://waywegaming.com/",
      role: "Frontend Developer",
      period: "2023 – 2024",
      location: "PWD, Islamabad, Pakistan",
      projects: [
        {
          name: "Cleaning Service Websites",
          role: "Frontend Developer",
          link: "https://www.arearugcleaner.com/",
          bullets: [
            "Developed and maintained responsive, user-friendly cleaning service websites with modern UI/UX.",
            "Used HTML, CSS, and Bootstrap to create visually appealing and fully mobile-responsive layouts.",
            "Implemented JavaScript for interactive elements and enhanced user experience.",
            "Ensured cross-browser compatibility and optimized performance for faster load times.",
            "Managed version control using Git, maintaining a clean and structured codebase.",
          ],
          icons: ['html5', 'css3', 'bootstrap', 'javascript', 'git'] as TechKey[],
        },
      ],
    },
  ] as ExperienceItem[],

  featuredProjects: [
    {
      id: "autogemz-inspections",
      title: "AutoGemz — Vehicle Inspection Management System",
      subtitle: "Full-Stack MERN Vehicle Inspection & Cloud Platform",
      period: "2024",
      role: "Full Stack Developer & AWS Deployment",
      liveUrl: "#",
      category: 'mern' as const,
      description: "Full-stack MERN application for professional vehicle inspection management with role-based access, Cloudinary image storage, interactive car diagrams, and automated PDF report generation.",
      bullets: [
        "Built a full-stack vehicle inspection platform using React.js, Node.js, Express, MongoDB with JWT authentication and role-based access control (Admin/User)",
        "Implemented Cloudinary cloud storage for inspection images with per-zone and per-item photo uploads, generating permanent HTTPS URLs embedded in PDF reports",
        "Designed interactive SVG car body diagram with clickable zones, defect markers (PakWheels-style), hover tooltips, and collapsible accordion sections",
        "Developed dynamic PDF generation system (HTML-to-print) with vehicle details, category ratings, checklist results, and embedded images — A4 print-optimized",
        "Deployed backend on AWS EC2 with Nginx reverse proxy and PM2 process manager; frontend on Vercel/Netlify with environment-based API configuration",
        "Implemented 2-role system — Admin (full CRUD) and User (view own inspections, download PDF, report issues) with issue notification workflow",
      ],
      techStack: [
        { layer: "Frontend", tech: "React.js 18, Bootstrap 5, React Router v6" },
        { layer: "Backend", tech: "Node.js, Express.js" },
        { layer: "Database", tech: "MongoDB, Mongoose ODM" },
        { layer: "Auth", tech: "JWT (jsonwebtoken), bcryptjs" },
        { layer: "Image Storage", tech: "Cloudinary (multer memory upload)" },
        { layer: "PDF", tech: "Server-side HTML template, browser print-to-PDF" },
        { layer: "Deployment", tech: "AWS EC2 (backend), Vercel (frontend)" },
        { layer: "Process Manager", tech: "PM2" },
        { layer: "Web Server", tech: "Nginx (reverse proxy)" },
      ],
      icons: ['react', 'nodejs', 'express', 'mongodb', 'jwt', 'cloudinary', 'aws', 'nginx', 'pm2', 'vercel'] as TechKey[],
      tags: ["MERN Stack", "AWS EC2", "Nginx", "PM2", "Cloudinary", "Interactive SVG", "PDF Generator", "JWT RBAC"],
    },
    {
      id: "autogemz-marketplace",
      title: "AutoGemz — Car Marketplace Web Application",
      subtitle: "Dynamic Vehicle Inventory & Marketplace Platform",
      period: "2023 – 2024",
      role: "Frontend Developer",
      category: 'frontend' as const,
      description: "Modern car marketplace web application featuring real-time filtering, availability statuses, dynamic gallery modals, and responsive UI.",
      bullets: [
        "Developed a modern car marketplace web application using React.js.",
        "Built responsive UI components for vehicle listings, product cards, and detailed car pages.",
        "Implemented dynamic car listings with filtering and category-based browsing.",
        "Added status indicators such as “Sold” tags and vehicle availability badges.",
        "Developed interactive UI elements including modals, image galleries, and load-more functionality.",
        "Optimized layout and components for fast performance and smooth user experience.",
        "Deployed the application for live access and real-world usage.",
      ],
      techStack: [
        { layer: "Frontend", tech: "React.js, Bootstrap / Tailwind CSS" },
        { layer: "State & Routing", tech: "Context API, React Router v6" },
        { layer: "Hosting", tech: "Vercel" },
      ],
      icons: ['react', 'javascript', 'bootstrap', 'vercel'] as TechKey[],
      tags: ["React.js", "Marketplace UI", "Filters & Search", "Image Modals"],
    },
    {
      id: "cybersense",
      title: "CyberSense — Learning & Certification Dashboard",
      subtitle: "Multi-Language Learning & Certification Platform",
      period: "2024 – Present",
      role: "Frontend Lead",
      liveUrl: "https://ui-dev.ethaba.com/",
      category: 'saas' as const,
      description: "Responsive learning and certification web application with secure authentication workflows, course tracking, and multi-language (Arabic) support.",
      bullets: [
        "Developed a fully responsive learning and certification web application using React.js.",
        "Implemented secure user authentication workflows, including login, course access, and completion tracking.",
        "Built a comprehensive admin dashboard to manage users, courses, certificates, phishing campaigns, email templates, and LDAP server data.",
        "Integrated RESTful APIs to enable dynamic content loading, analytics, and reporting.",
        "Implemented multi-language support including Arabic to improve accessibility for international users.",
        "Developed data-driven dashboards for monitoring user activity and system performance.",
      ],
      techStack: [
        { layer: "Frontend", tech: "React.js 18, Bootstrap 5" },
        { layer: "APIs", tech: "RESTful APIs, Axios" },
        { layer: "Features", tech: "i18n (Arabic), Analytics Dashboards, LDAP" },
      ],
      icons: ['react', 'rest', 'javascript', 'figma'] as TechKey[],
      tags: ["React.js", "Admin Dashboard", "Multi-language", "Analytics"],
    },
    {
      id: "cyberdefenderpro",
      title: "CyberDefenderPro — Phishing Simulation SaaS Platform",
      subtitle: "Security Awareness & Email Phishing Simulation SaaS",
      period: "2024 – Present",
      role: "Full Stack Developer",
      liveUrl: "https://cyberdefender.organix-it.com/",
      category: 'saas' as const,
      description: "SaaS cybersecurity awareness and phishing simulation platform with campaign management, email scheduling, file attachments, and activity tracking.",
      bullets: [
        "Developing a Software-as-a-Service (SaaS) cybersecurity awareness and phishing simulation platform.",
        "Built a React.js based interactive frontend with dashboards, modals, tables, and reporting interfaces.",
        "Developed secure backend APIs using Node.js and Express.js with JWT authentication and middleware-based access control.",
        "Designed and implemented MySQL database architecture for campaigns, users, email templates, attachments, and activity logs.",
        "Implemented file upload and attachment management system for phishing simulation campaigns.",
        "Developed backend services for campaign management, email scheduling, phishing templates, and user activity tracking.",
        "Implemented input validation, error handling, pagination, and query optimization to enhance performance.",
        "Performed API testing and debugging using Postman.",
      ],
      techStack: [
        { layer: "Frontend", tech: "React.js 18, Bootstrap 5" },
        { layer: "Backend", tech: "Node.js, Express.js, JWT, Middleware" },
        { layer: "Database", tech: "MySQL" },
        { layer: "Testing", tech: "Postman" },
      ],
      icons: ['react', 'nodejs', 'express', 'mysql', 'jwt', 'postman'] as TechKey[],
      tags: ["SaaS", "Node.js", "MySQL", "JWT", "Phishing Simulation"],
    },
    {
      id: "mughal-e-azam",
      title: "Mughal e Azam Zari House — Business Inventory System",
      subtitle: "Expense Management & Financial Tracking System",
      period: "02/2023 – 11/2023",
      role: "Full Stack Developer",
      category: 'mern' as const,
      description: "A web-based Business Inventory System designed to streamline expense management and financial tracking for businesses.",
      bullets: [
        "Developed a full-stack web application using EJS (Embedded JavaScript), Node.js, Express.js, and MongoDB.",
        "Implemented Passport.js authentication to ensure secure access for admins.",
        "Designed an expense tracking module where the admin could add monthly expenses like medical bills, electricity bills, employee salaries, fuel expenses, etc.",
        "Automated profit and loss calculation, generating a detailed summary at the end of each month.",
        "Created a user-friendly dashboard for seamless data entry and financial insights.",
      ],
      techStack: [
        { layer: "Frontend & Views", tech: "EJS (Embedded JavaScript), Bootstrap" },
        { layer: "Backend", tech: "Node.js, Express.js" },
        { layer: "Database", tech: "MongoDB" },
        { layer: "Authentication", tech: "Passport.js" },
      ],
      icons: ['ejs', 'nodejs', 'express', 'mongodb', 'passport'] as TechKey[],
      tags: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "P&L Reports"],
    },
    {
      id: "cleaning-websites",
      title: "Cleaning Service Websites (Client Projects)",
      subtitle: "Responsive Marketing & Service Websites",
      period: "2023 – 2024",
      role: "Frontend Developer",
      liveUrl: "https://www.arearugcleaner.com/",
      category: 'frontend' as const,
      description: "Responsive, conversion-focused cleaning service websites built with modern UI/UX and fully mobile-first layouts.",
      bullets: [
        "Developed and maintained responsive, user-friendly cleaning service websites with modern UI/UX.",
        "Used HTML, CSS, and Bootstrap to create visually appealing and fully mobile-responsive layouts.",
        "Implemented JavaScript for interactive elements and enhanced user experience.",
        "Ensured cross-browser compatibility and optimized performance for faster load times.",
        "Managed version control using Git, maintaining a clean and structured codebase.",
      ],
      techStack: [
        { layer: "Frontend", tech: "HTML5, CSS3, Bootstrap 5, JavaScript" },
        { layer: "Version Control", tech: "Git" },
        { layer: "Hosting", tech: "cPanel / GoDaddy" },
      ],
      icons: ['html5', 'css3', 'bootstrap', 'javascript', 'git'] as TechKey[],
      tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Git"],
    },
  ] as ProjectItem[],

  education: {
    degree: "Bachelor in Computer Science",
    institution: "Federal Urdu University of Arts, Science & Technology",
    period: "2019 – 2023",
    location: "Islamabad, Pakistan",
  },
};
