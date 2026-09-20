// components.jsx — shared primitives
const { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } = React;

// ---------- data ----------
const PROJECTS = [
  {
    n: "01",
    slug: "easybillsplitting",
    title: "EasyBillSplitting",
    year: "2026",
    role: "Web app",
    blurb: "A bill splitter that handles shared items, tax, tip, and discounts. Runs entirely in the browser.",
    long:
      "Split a bill evenly, or by item with tax, tip, and discounts. Items are assigned to people by drag and drop, including on touch screens. There are no accounts and no backend, and past splits are saved in the browser.",
    stack: ["React", "Vite", "React Router", "Vercel"],
    // TODO: add { label: "GitHub", href: "https://github.com/Akooshsoohoo/easybillsplitting" } once the repo is public
    links: [
      { label: "Live site", href: "https://www.easybillsplitting.com" },
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
    title: "EverythingApp",
    year: "2026",
    role: "Desktop + web app",
    blurb: "A productivity app that puts planning, focus timers, notes, and stats in one window.",
    long:
      "A productivity app for daily planning, focus timers, notes, and session stats. Built with a modular shell so new tools can be added without changing the core. Runs as a Tauri desktop app and on the web, with a local SQLite cache and Supabase sync.",
    stack: ["Tauri", "React", "TypeScript", "Supabase", "Zustand"],
    links: [
      { label: "Install", href: "https://github.com/Akooshsoohoo/EverythingApp/releases/latest" },
      { label: "Website", href: "https://everything-app-rose.vercel.app/" },
    ],
    siteHref: "https://everything-app-rose.vercel.app/",
    accent: "#9bd6b3",
    shots: ["Command center", "Timer", "Modules"],
    imgs: {
      thumb: "everythingapp pics/Screenshot 2026-05-21 184443.png",
      hero: "everythingapp pics/Screenshot 2026-05-21 184513.png",
      gallery: [
        "everythingapp pics/Screenshot 2026-05-21 184443.png",
        "everythingapp pics/Screenshot 2026-05-21 184726.png",
        "everythingapp pics/Screenshot 2026-05-21 184646.png",
      ],
    },
  },
  {
    n: "03",
    slug: "gymllm",
    title: "GymLLM",
    year: "2025",
    role: "Workout logger",
    blurb: "A workout logger that turns plain-English notes into structured workout data and progress charts.",
    long:
      "A Flask app that parses workout notes written in plain English, shows a review step before saving, and charts lifts, cardio, and body weight over time. Works with several LLM providers, including local models. Sign-in is through Google.",
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Google OAuth"],
    links: [
      { label: "Live demo", href: "https://gymllm.onrender.com/" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/GymLLM" },
    ],
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
    long:
      "Loads Google Photos JSON sidecars into SQLite, then exposes them through SQL queries, time charts, and basic clustering. Built as a Flask dashboard with a live demo.",
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
    long:
      "A browser extension popup for quick notes. Supports multiple pages, autosave, and a few customization options. All notes are stored locally in extension storage.",
    stack: ["JavaScript", "Chrome MV3", "HTML", "CSS"],
    links: [
      { label: "Chrome Web Store", href: "https://chromewebstore.google.com/detail/scratch-paper/omlgcphcnbplaaiolgnpkdhdkgkjedel?hl=en" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/Scratch-Paper-1.2" },
    ],
    accent: "#e0c46a",
    shots: ["Popup", "Pages", "Settings"],
    imgs: {
      thumb: "scratchpaperpics/unnamed (3).png",
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
};

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
