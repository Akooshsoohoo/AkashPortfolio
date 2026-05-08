import React from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

const profile = {
  name: "Akash Saha",
  github: "https://github.com/Akooshsoohoo",
  linkedin: "https://www.linkedin.com/in/akash-saha5111/",
  resume: "/Akash-Saha-Resume.pdf",
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
      "A desktop productivity app for planning, timers, notes, stats, and small personal workflow tools.",
    problem:
      "I wanted one local app for the daily tools I kept rebuilding or tracking separately: planning, timing, notes, and small utilities.",
    built:
      "I built a Tauri and React app with local data storage, session recovery, global shortcuts, settings, notes, timers, Spotify controls, and separate feature modules.",
    highlights: [
      "Built a modular structure so new tools can be added without changing the main app shell.",
      "Used SQLite for local persistence and app state.",
      "Added planning, timer, notes, stats, shortcuts, and module workflows.",
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
      "A workout logger that turns plain-English gym notes into structured workout history.",
    problem:
      "Manual workout logging is slow. I wanted to write a workout naturally and still save clean exercise data.",
    built:
      "I built a Flask app that parses workout text, normalizes exercises against local data, and lets the user review results before saving.",
    highlights: [
      "Added a review step so parsed workouts can be edited before saving.",
      "Kept workout history and exercise data local.",
      "Used CSV and Pandas workflows to keep sessions searchable.",
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
      "A dashboard for analyzing Google Photos Takeout metadata with SQL, charts, and clustering.",
    problem:
      "Google Photos Takeout exports contain useful metadata, but the raw files are hard to inspect or analyze directly.",
    built:
      "I built a pipeline that loads JSON sidecars into SQLite, generates analysis outputs, and displays them in a Flask dashboard.",
    highlights: [
      "Converted raw export metadata into a queryable SQLite dataset.",
      "Built charts for time, media type, seasonality, and photo-taking patterns.",
      "Added clustering and analysis views for higher-level patterns.",
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
      "A Chrome extension for quick notes with pages, autosave, settings, and local browser storage.",
    problem:
      "I wanted a small note tool available from the browser without opening a separate notes app.",
    built:
      "I built a Chrome extension popup with note pages, autosave, customization settings, and persistent storage.",
    highlights: [
      "Created a popup workflow for notes without leaving the current tab.",
      "Added customization for titles, fonts, background color, and page management.",
      "Used extension storage so notes persist across browser sessions.",
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
      "A placeholder for a strategy game project that is not public yet.",
    problem:
      "This project is still in progress, so the portfolio lists it without presenting it as a finished release.",
    built:
      "This page will be updated with the repo, demo, screenshots, and gameplay details when the project is ready.",
    highlights: [
      "Marked as coming soon.",
      "Included without claiming a public launch.",
      "Ready to replace with real details later.",
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
          <h1 id="hero-title">Software projects by Akash Saha.</h1>
          <p className="hero-summary">
            I am a computer science student at Rutgers. I build desktop apps, AI tools, browser extensions, dashboards, and game prototypes. I am also a U.S. Army Reserve Sergeant and previously worked as a civil engineering intern.
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
            <h2>Computer science student building practical tools.</h2>
            <p>
              This site highlights projects from my GitHub, including EverythingApp, GymLLM, PhotoLog Analytics, Scratch Paper, and conquest.io.
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
        <h2>Selected projects.</h2>
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
        <h2>Background.</h2>
      </div>
      <div className="background-grid">
        <article>
          <span>01</span>
          <h3>Computer Science at Rutgers</h3>
          <p>Studying computer science with a focus on software, data, systems, and practical application development.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Civil engineering internship</h3>
          <p>Worked in a civil engineering internship, gaining experience with technical work, coordination, and project constraints.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Sergeant, U.S. Army Reserve</h3>
          <p>Serve as a Sergeant in the U.S. Army Reserve, with experience in leadership, accountability, and communication.</p>
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
        <h2>Open to software internships.</h2>
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
          <h2>Screenshot placeholders.</h2>
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
