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
    role: "iPhone app",
    blurb: "An iPhone app that turns a workout typed in plain English into logged lifts, cardio, and body weight, with progress charts.",
    long: "Type what you did, like \"benched 185 for 3 sets of 5, then ran 2 miles\", and Levra shows what it understood so you can fix anything before saving. Lifts, cardio, and body weight are charted from 7 days to all time. Friends see your lifts and cardio, never your notes or body weight. A native SwiftUI app on a Flask and PostgreSQL service.",
    stack: [
      "Swift",
      "SwiftUI",
      "Python",
      "Flask",
      "SQLAlchemy",
      "PostgreSQL",
      "Google OAuth",
    ],
    links: [
      { label: "Website", href: "https://levraapp.com/" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/GymLLM" },
    ],
    siteHref: "https://levraapp.com/",
    accent: "#e07a6c",
    shots: ["Entry", "Review", "Progress"],
    imgs: {
      thumb: "levrapics/levrathumb.png",
      hero: "levrapics/levrahero.png",
      gallery: [
        "levrapics/levralog.png",
        "levrapics/levrareview.png",
        "levrapics/levraprogress.png",
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

// ---------- custom cursor ----------
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
        background: mode === "row" ? "rgba(224,138,60,0.06)" : "transparent",
        pointerEvents: "none", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em",
        textTransform: "uppercase", color: mode === "row" ? "var(--accent)" : "var(--muted)",
        transition: "width 320ms cubic-bezier(.2,.8,.2,1), height 320ms cubic-bezier(.2,.8,.2,1), border-color 200ms, background 200ms, color 200ms",
        mixBlendMode: "difference",
      }}>
        {label}
      </div>
    </React.Fragment>
  );
}

// ---------- in-view trigger ----------
function useIsMobile(breakpoint = 768) {
  const [mob, setMob] = useState(
    typeof window !== "undefined" && window.innerWidth <= breakpoint
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setMob(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mob;
}

function useInView(opts = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen) return;
    // Fallback: if IntersectionObserver doesn't fire (sandbox iframes, etc.),
    // reveal after a short timeout so content never gets stuck invisible.
    const fallback = setTimeout(() => setSeen(true), 600);
    if (!ref.current || typeof IntersectionObserver === "undefined") return () => clearTimeout(fallback);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
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
      transform: seen ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 900ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      willChange: "opacity, transform",
    }} {...rest}>{children}</Tag>
  );
}

// ---------- preview slot — uses <image-slot> so user can drag/drop their own ----------
// shape: { id, label, accent, height }
function PreviewSlot({ id, label, accent = "#e08a3c", style = {} }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: "#14110e",
      border: "1px solid rgba(224, 138, 60, 0.45)",
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

// hex with alpha
function hexA(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

Object.assign(window, {
  PROJECTS, PROFILE,
  Cursor, useIsMobile, useInView, Reveal, PreviewSlot, hexA,
});
