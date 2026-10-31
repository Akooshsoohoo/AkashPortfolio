// components.jsx — shared primitives
const { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } = React;

// ---------- data ----------
// <career-hub:begin> generated from career-hub/data/profile.yaml — edit there, not here
const PROJECTS = [
  {
    n: "01",
    slug: "easybillsplitting",
    title: "EasyBillSplitting",
    year: "2026",
    role: "Web app",
    blurb: "A bill splitter that handles shared items, tax, tip, and discounts. Runs entirely in the browser.",
    long: "Split a bill evenly, or by item with tax, tip, and discounts. Items are assigned to people by drag and drop, including on touch screens. There are no accounts and no backend, and past splits are saved in the browser.",
    stack: ["React", "Vite", "React Router", "Vercel"],
    links: [
      { label: "Live site", href: "https://www.easybillsplitting.com" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/easybillsplitting" },
    ],
    siteHref: "https://www.easybillsplitting.com",
    accent: "#40dca5",
    shots: ["Split evenly", "Assign items", "Results"],
    imgs: {
      thumb: "easybillsplittingpics/easybillsplittingthumb.png",
      hero: "easybillsplittingpics/easybillsplittinghero.png",
      gallery: [
        "easybillsplittingpics/easybillsplittingeven.png",
        "easybillsplittingpics/easybillsplittingassign.png",
        "easybillsplittingpics/easybillsplittingresults.png",
      ],
    },
  },
  {
    n: "02",
    slug: "everythingapp",
    title: "SidePlaza",
    year: "2026",
    role: "Desktop + web app",
    blurb: "A productivity app that puts planning, focus timers, notes, and stats in one window.",
    long: "A productivity app for daily planning, focus timers, notes, and session stats. Built with a modular shell so new tools can be added without changing the core. Runs as a Tauri desktop app and on the web, with a local SQLite cache and Supabase sync.",
    stack: ["Tauri", "React", "TypeScript", "Supabase", "Zustand"],
    links: [
      { label: "Website", href: "https://sideplaza.com/" },
    ],
    siteHref: "https://sideplaza.com/",
    accent: "#9bd6b3",
    shots: ["Today", "Focus timer", "Stats"],
    imgs: {
      thumb: "everythingapp pics/everythingappthumb.png",
      hero: "everythingapp pics/everythingapphero.png",
      gallery: [
        "everythingapp pics/everythingapptoday.png",
        "everythingapp pics/everythingapptimer.png",
        "everythingapp pics/everythingappstats.png",
      ],
    },
  },
  {
    n: "03",
    slug: "gymllm",
    title: "Levra",
    year: "2025",
    role: "Workout logger",
    blurb: "A workout logger that turns plain-English notes into structured workout data and progress charts.",
    long: "A Flask app that parses workout notes written in plain English, shows a review step before saving, and charts lifts, cardio, and body weight over time. Works with several LLM providers, including local models. Sign-in is through Google.",
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Google OAuth"],
    links: [
      { label: "Website", href: "https://levraapp.com/" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/GymLLM" },
    ],
    siteHref: "https://levraapp.com/",
    accent: "#e07a6c",
    shots: ["Entry", "Review", "Progress"],
    imgs: {
      thumb: "gymllmpics/gymllmthumb.png",
      hero: "gymllmpics/gymllmhero.png",
      gallery: [
        "gymllmpics/gymllmentry.png",
        "gymllmpics/gymllmreview.png",
        "gymllmpics/gymllmprogress.png",
      ],
    },
  },
  {
    n: "04",
    slug: "photolog",
    title: "PhotoLog Analytics",
    year: "2026",
    role: "Dashboard",
    blurb: "A dashboard for Google Photos Takeout metadata with charts and clustering.",
    long: "Loads Google Photos JSON sidecars into SQLite, then exposes them through SQL queries, time charts, and basic clustering. Built as a Flask dashboard with a live demo.",
    stack: ["Python", "Flask", "SQLite", "Chart.js", "scikit-learn"],
    links: [
      { label: "Live demo", href: "https://photolog-analytics.onrender.com" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/PhotoLog-Analytics" },
      { label: "Video", href: "https://www.youtube.com/watch?v=Unw3EFVc13o" },
    ],
    accent: "#7aa6e0",
    shots: ["Overview", "Timeline", "Clusters"],
    imgs: {
      thumb: "photologanalyticspics/Screenshot 2026-05-21 185334.png",
      hero: "photologanalyticspics/Screenshot 2026-05-21 185334.png",
      gallery: [
        "photologanalyticspics/Screenshot 2026-05-21 185334.png",
        "photologanalyticspics/Screenshot 2026-05-21 185339.png",
        "photologanalyticspics/Screenshot 2026-05-21 185342.png",
      ],
    },
  },
  {
    n: "05",
    slug: "scratch",
    title: "Scratch Paper",
    year: "2024",
    role: "Chrome extension",
    blurb: "A Chrome extension for quick notes with pages, autosave, and local storage.",
    long: "A browser extension popup for quick notes. Supports multiple pages, autosave, and a few customization options. All notes are stored locally in extension storage.",
    stack: ["JavaScript", "Chrome MV3", "HTML", "CSS"],
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/scratch-paper/omlgcphcnbplaaiolgnpkdhdkgkjedel?hl=en",
      },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/Scratch-Paper-1.2" },
    ],
    accent: "#e0c46a",
    shots: ["Popup", "Pages", "Settings"],
    imgs: {
      thumb: "scratchpaperpics/unnamed.png",
      hero: "scratchpaperpics/Screenshot 2026-05-21 184914.png",
      gallery: [
        "scratchpaperpics/unnamed.png",
        "scratchpaperpics/unnamed (3).png",
        "scratchpaperpics/unnamed (1).png",
      ],
    },
  },
];

const PROFILE = {
  name: "Akash Saha",
  short: "Akash",
  github: "https://github.com/Akooshsoohoo",
  linkedin: "https://www.linkedin.com/in/akash-saha5111/",
  resume: "/Resume - Akash Saha.pdf",
  email: "mailto:1sahakash1@gmail.com",
  location: "Hillsborough, NJ",
  intro: "Computer science student at Rutgers (graduating December 2026) and a sergeant in the U.S. Army Reserve. I build and ship my own software, mostly full-stack web apps and, more recently, an iPhone app.",
  education: [
    {
      start: "2022-12",
      end: "2026-12",
      school: "Rutgers University",
      degree: "B.S. Computer Science",
      coursework: [
        "Data Structures",
        "Computer Architecture",
        "Systems Programming",
        "Software Methodology",
      ],
    },
  ],
  experience: [
    {
      start: "2026-06",
      end: "2026-10",
      org: "New Jersey Courts",
      title: "Information Technology Intern",
      location: "Trenton, NJ",
      bullets: [
        "Tested application changes and documented defects through resolution within a 20+ person team",
        "Resolved software bugs in a Java/XHTML/JavaScript case management system, improving stability for users",
      ],
    },
    {
      start: "2025-06",
      end: "2025-08",
      org: "STV",
      title: "Project Engineer Intern",
      location: "Brooklyn, NY",
      bullets: [
        "Tracked 1,000+ assets in e-Builder for a $38.5M NYCHA upgrade and coordinated MEP punch list resolutions",
        "Standardized closeout records across 1,000+ tracked assets to support regulatory compliance and project handover",
        "Standardized closeout documentation and verified data consistency for regulatory compliance and system handover",
      ],
    },
    {
      start: "2022-06",
      end: null,
      org: "United States Army Reserve",
      title: "Cargo Specialist",
      location: "Staten Island, NY",
      bullets: [
        "Processed 50+ cargo movements using GATES and ICODES and trained 11+ soldiers on vessel loading procedures",
        "Validated 400+ vehicle label records with 100% accuracy and maintained operational records for a 30+ soldier unit",
      ],
    },
  ],
  skills: {
    languages: ["Python", "Java", "JavaScript", "C", "C#", "R", "SQL", "HTML/CSS"],
    technologies: [
      "Flask",
      "SQLAlchemy",
      "REST APIs",
      "OAuth 2.0",
      "Git",
      "Linux",
      "Azure",
    ],
    tools: [
      "AutoCAD",
      "SolidWorks",
      "Technical Drawings",
      "GitHub",
      "E-Builder",
    ],
    certifications: [
      "SST Supervisor (62-Hour)",
      "SST Worker (40-Hour)",
      "OSHA 30-Hour Construction",
    ],
  },
};
// <career-hub:end>

// ---------- SVG Icons ----------
const Icons = {
  Github: ({ size = 18, color = "currentColor", style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  Linkedin: ({ size = 18, color = "currentColor", style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  Mail: ({ size = 18, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  FileText: ({ size = 18, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  ExternalLink: ({ size = 14, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  ),
  ArrowRight: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  ArrowLeft: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  ),
  ArrowDown: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  ),
  Check: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Copy: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Terminal: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  ),
  Shield: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  GraduationCap: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Briefcase: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Layers: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Globe: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  MapPin: ({ size = 14, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Code: ({ size = 16, style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

// ---------- custom cursor (kept for compatibility) ----------
function Cursor({ mode }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    const onLeave = () => { target.current.x = -200; target.current.y = -200; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    let raf;
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isCoarse = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if (isCoarse) return null;

  const sized = mode === "row" ? 88 : mode === "link" ? 40 : 22;
  const label = mode === "row" ? "open" : mode === "link" ? "→" : "";

  return (
    <React.Fragment>
      <div ref={dotRef} style={{
        position: "fixed", left: 0, top: 0, width: 4, height: 4, borderRadius: 999,
        background: "var(--fg)", pointerEvents: "none", zIndex: 200,
      }} />
      <div ref={ringRef} style={{
        position: "fixed", left: 0, top: 0, width: sized, height: sized, borderRadius: 999,
        border: mode === "row" ? "1px solid var(--accent)" : "1px solid var(--line-strong)",
        background: mode === "row" ? "rgba(56, 189, 248, 0.08)" : "transparent",
        pointerEvents: "none", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em",
        textTransform: "uppercase", color: mode === "row" ? "var(--accent)" : "var(--fg-muted)",
        transition: "width 320ms cubic-bezier(.2,.8,.2,1), height 320ms cubic-bezier(.2,.8,.2,1), border-color 200ms, background 200ms, color 200ms",
        mixBlendMode: "difference",
      }}>
        {label}
      </div>
    </React.Fragment>
  );
}

// ---------- responsive & visibility hooks ----------
function useIsMobile(breakpoint = 768) {
  const [mob, setMob] = useState(
    typeof window !== "undefined" && window.innerWidth <= breakpoint
  );
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setMob(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return mob;
}

function useInView(opts = { threshold: 0.1 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen) return;
    // If prefers-reduced-motion, reveal immediately without animation delay
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const fallback = setTimeout(() => setSeen(true), 500);
    if (!ref.current || typeof IntersectionObserver === "undefined") return () => clearTimeout(fallback);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.unobserve(e.target);
        }
      });
    }, opts);
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [seen]);
  return [ref, seen];
}

function Reveal({ children, delay = 0, as = "div", style = {}, ...rest }) {
  const [ref, seen] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      ...style,
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: "opacity, transform",
    }} {...rest}>{children}</Tag>
  );
}

// ---------- preview slot — uses <image-slot> ----------
function PreviewSlot({ id, label, accent = "#38bdf8", style = {} }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: "var(--panel)",
      border: `1px solid ${accent}`,
      overflow: "hidden",
      lineHeight: 0,
      ...style,
    }}>
      <image-slot
        id={id}
        placeholder={label}
        shape="rect"
        fit="cover"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      ></image-slot>
    </div>
  );
}

// hex with alpha converter
function hexA(hex, a = 1) {
  if (!hex || typeof hex !== "string") return `rgba(56, 189, 248, ${a})`;
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

Object.assign(window, {
  PROJECTS, PROFILE,
  Cursor, useIsMobile, useInView, Reveal, PreviewSlot, hexA,
  Icons,
});
