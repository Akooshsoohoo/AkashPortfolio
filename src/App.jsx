import React from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

const profile = {
  name: "Akash Saha",
  github: "https://github.com/Akooshsoohoo",
  linkedin: "#replace-with-linkedin-url",
  resume: "#replace-with-resume-url",
  avatar: "https://avatars.githubusercontent.com/u/152564278?v=4",
};

const projects = [
  {
    title: "EverythingApp",
    slug: "everythingapp",
    type: "Desktop productivity system",
    status: "Featured build",
    accent: "mint",
    tech: ["Tauri", "React", "TypeScript", "SQLite", "Zustand"],
    links: [{ label: "GitHub", href: "https://github.com/Akooshsoohoo/EverythingApp" }],
    summary:
      "A local-first desktop productivity app for daily planning, focus sessions, notes, stats, modules, and personal operating systems.",
    problem:
      "Most productivity tools split planning, timing, tracking, and notes across separate apps. EverythingApp explores what a focused personal command center can look like when those workflows live in one local desktop app.",
    built:
      "I built the app around a modular Tauri and React architecture, with local persistence, session recovery, global shortcuts, settings, notes, timers, Spotify controls, and standalone feature modules.",
    highlights: [
      "Designed modular feature boundaries so new tools can be added without rewriting the core shell.",
      "Implemented local SQLite-backed persistence for personal data and app state.",
      "Built daily planning, timer, notes, stats, shortcuts, and module workflows around repeated personal use.",
    ],
    screenshots: ["Command center", "Timer workflow", "Module dashboard"],
  },
  {
    title: "GymLLM",
    slug: "gymllm",
    type: "AI workout logger",
    status: "Local-first app",
    accent: "red",
    tech: ["Python", "Flask", "OpenAI API", "Pandas", "CSV"],
    links: [{ label: "GitHub", href: "https://github.com/Akooshsoohoo/GymLLM" }],
    summary:
      "A browser-based workout logger that turns plain-English gym entries into structured, searchable workout history.",
    problem:
      "Workout logging is useful, but manual entry gets tedious fast. GymLLM is built around the idea that users should be able to write naturally and still end up with clean structured exercise data.",
    built:
      "I built a Flask workflow that parses free-form workout text, normalizes exercises against local data, and lets the user review results before saving them.",
    highlights: [
      "Added a review-and-confirm step so AI output remains editable and user-controlled.",
      "Kept workout history and exercise data local by default.",
      "Used structured CSV and Pandas workflows to keep saved sessions searchable and analyzable.",
    ],
    screenshots: ["Workout entry", "Review parsed sets", "Exercise history"],
  },
  {
    title: "PhotoLog Analytics",
    slug: "photolog-analytics",
    type: "Data analytics dashboard",
    status: "Live demo",
    accent: "blue",
    tech: ["Python", "Flask", "SQLite", "Chart.js", "ML"],
    links: [
      { label: "Live demo", href: "https://photolog-analytics.onrender.com" },
      { label: "GitHub", href: "https://github.com/Akooshsoohoo/PhotoLog-Analytics" },
      { label: "Video", href: "https://www.youtube.com/watch?v=Unw3EFVc13o" },
    ],
    summary:
      "A dashboard that turns Google Photos Takeout metadata into SQL analysis, visual charts, clustering, and personal behavior insights.",
    problem:
      "Google Photos Takeout exports are rich but hard to understand directly. PhotoLog Analytics makes the archive inspectable through data cleaning, storage, analysis, and visualization.",
    built:
      "I built an end-to-end data pipeline from JSON sidecars into SQLite, generated analysis outputs, added chart-ready data, and presented the results through a Flask dashboard.",
    highlights: [
      "Converted raw export metadata into a queryable SQLite-backed dataset.",
      "Presented behavior patterns across time, media type, seasonality, and photo-taking habits.",
      "Added ML-style clustering and analysis views to surface patterns that are not obvious from raw files.",
    ],
    screenshots: ["Dashboard overview", "Timeline charts", "Cluster analysis"],
  },
  {
    title: "Scratch Paper",
    slug: "scratch-paper",
    type: "Chrome extension",
    status: "Published-style extension",
    accent: "yellow",
    tech: ["JavaScript", "Chrome Extensions", "HTML", "CSS", "Local storage"],
    links: [{ label: "GitHub", href: "https://github.com/Akooshsoohoo/Scratch-Paper-1.2" }],
    summary:
      "A lightweight browser notepad for quick notes, multiple pages, autosave, settings, and persistent extension storage.",
    problem:
      "Quick notes often happen while browsing, but opening a full notes app breaks flow. Scratch Paper keeps a small persistent writing surface directly in the browser.",
    built:
      "I built a Chrome extension popup with note pages, autosave, customization settings, and local browser storage.",
    highlights: [
      "Created a fast popup workflow for capturing notes without leaving the current tab.",
      "Added customization for titles, fonts, background color, and page management.",
      "Used extension storage to persist notes across browser sessions.",
    ],
    screenshots: ["Extension popup", "Page controls", "Customization settings"],
  },
  {
    title: "conquest.io",
    slug: "conquest",
    type: "Strategy game concept",
    status: "Coming soon",
    accent: "violet",
    tech: ["Python", "Game logic", "Grid systems"],
    links: [{ label: "Placeholder", href: "#projects" }],
    summary:
      "A placeholder for a strategy game concept that will become public once the gameplay, visuals, and deployment are ready.",
    problem:
      "This slot represents a future strategy game project. It is intentionally framed as in-progress so the portfolio can show direction without overstating a launch.",
    built:
      "The detail page reserves space for the eventual public version: gameplay summary, screenshots, repo link, and demo link.",
    highlights: [
      "Clearly marked as coming soon for recruiter-facing honesty.",
      "Keeps the portfolio forward-looking without claiming a finished release.",
      "Ready to replace with real gameplay details when the project is public.",
    ],
    screenshots: ["Map concept", "Turn planning", "Match summary"],
  },
];

function ExternalLink({ href, children, variant = "ghost" }) {
  const isPlaceholder = href.startsWith("#");
  return (
    <a
      className={`button ${variant}${isPlaceholder ? " placeholder-link" : ""}`}
      href={href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noreferrer"}
    >
      {children}
      <span aria-hidden="true">-&gt;</span>
    </a>
  );
}

function ScreenshotFrame({ label, project, compact = false }) {
  return (
    <div className={`screenshot-frame ${project.accent}${compact ? " compact" : ""}`}>
      <div className="screenshot-toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="screenshot-body">
        <strong>{project.title}</strong>
        <p>{label}</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero">
      <nav className="nav" aria-label="Primary navigation">
        <Link to="/" className="brand">{profile.name}</Link>
        <div className="nav-links">
          <a href="/#projects">Projects</a>
          <a href="/#background">Background</a>
          <a href="/#contact">Contact</a>
        </div>
      </nav>

      <div className="hero-grid">
        <section className="hero-copy" aria-labelledby="hero-title">
          <p className="eyebrow">Rutgers CS student / U.S. Army Reserve Sergeant</p>
          <h1 id="hero-title">I build practical software for real workflows.</h1>
          <p className="hero-summary">
            I am a computer science student at Rutgers with experience across AI-assisted tools, desktop apps, browser extensions, data dashboards, and game prototypes. My background as an Army Sergeant and civil engineering intern shapes how I approach software: structured, accountable, and focused on useful systems.
          </p>
          <div className="hero-actions">
            <ExternalLink href={profile.github} variant="primary">GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.resume}>Resume</ExternalLink>
          </div>
        </section>

        <aside className="identity-panel" aria-label="Profile summary">
          <div className="avatar-wrap">
            <img src={profile.avatar} alt="Akash GitHub avatar" />
          </div>
          <div>
            <p className="panel-kicker">Current focus</p>
            <h2>Software that organizes messy real-life systems.</h2>
            <p>
              I like building tools that connect interface, data, and daily use: planners, analytics, logging workflows, extensions, and local-first apps.
            </p>
          </div>
          <div className="signal-grid" aria-label="Profile signals">
            <span>Rutgers Computer Science</span>
            <span>Civil engineering internship</span>
            <span>U.S. Army Reserve Sergeant</span>
          </div>
        </aside>
      </div>
    </header>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card ${project.accent}`} style={{ "--delay": `${index * 70}ms` }}>
      <div className="card-topline">
        <span>{project.type}</span>
        <strong>{project.status}</strong>
      </div>
      <ScreenshotFrame label={project.screenshots[0]} project={project} compact />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="impact-list">
          {project.highlights.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="tech-list" aria-label={`${project.title} technology stack`}>
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="card-links">
          <Link className="button primary" to={`/projects/${project.slug}`}>Case study</Link>
          {project.links.slice(0, 1).map((link) => (
            <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Projects with real workflows behind them.</h2>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Background() {
  return (
    <section id="background" className="section background-section">
      <div className="section-heading">
        <p className="eyebrow">Background</p>
        <h2>Technical work shaped by computer science, service, and field experience.</h2>
      </div>
      <div className="background-grid">
        <article>
          <span>01</span>
          <h3>Computer Science at Rutgers</h3>
          <p>Building a foundation in software engineering, systems, data, algorithms, and practical application development.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Civil engineering internship</h3>
          <p>Experience with real-world constraints, coordination, and technical judgment that carries into how I design software.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Sergeant, U.S. Army Reserve</h3>
          <p>Leadership experience built around accountability, communication, execution, and working under pressure.</p>
        </article>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Open to software internships and project conversations.</h2>
      </div>
      <div className="footer-actions">
        <ExternalLink href={profile.github} variant="primary">GitHub</ExternalLink>
        <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        <ExternalLink href={profile.resume}>Resume</ExternalLink>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main id="top">
      <Hero />
      <Projects />
      <Background />
      <Footer />
    </main>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="detail-shell">
      <nav className="nav detail-nav" aria-label="Project navigation">
        <Link to="/" className="brand">{profile.name}</Link>
        <Link to="/#projects" className="button">Back to projects</Link>
      </nav>

      <section className={`detail-hero ${project.accent}`}>
        <div className="detail-copy">
          <p className="eyebrow">{project.type}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="hero-actions">
            {project.links.map((link) => (
              <ExternalLink key={link.label} href={link.href} variant={link.label === "GitHub" ? "primary" : "ghost"}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </div>
        <ScreenshotFrame label={project.screenshots[0]} project={project} />
      </section>

      <section className="detail-section">
        <div className="detail-panel">
          <p className="panel-kicker">Problem</p>
          <h2>Why it exists</h2>
          <p>{project.problem}</p>
        </div>
        <div className="detail-panel">
          <p className="panel-kicker">Build</p>
          <h2>What I built</h2>
          <p>{project.built}</p>
        </div>
      </section>

      <section className="detail-section split">
        <div>
          <p className="eyebrow">Highlights</p>
          <ul className="detail-list">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Stack</p>
          <div className="tech-list detail-tech">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section gallery-section">
        <div className="section-heading">
          <p className="eyebrow">Screenshots</p>
          <h2>Placeholder gallery for the first version.</h2>
        </div>
        <div className="screenshot-grid">
          {project.screenshots.map((label) => (
            <ScreenshotFrame key={label} label={label} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
