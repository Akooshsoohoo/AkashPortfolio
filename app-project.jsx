// app-project.jsx — Individual project case study and architectural deep-dive
const { useState, useEffect, useRef } = React;

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || PROJECTS[0].slug;
}

function projectIndex(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return i === -1 ? 0 : i;
}

// Extra copy per project — overview, role, problem, approach, outcome
const DETAIL = {
  easybillsplitting: {
    tagline: "A bill splitter for shared items, tax, tip, and discounts. It runs entirely in the browser.",
    period: "Aug 2026 — ongoing",
    role: "Solo build · design + engineering",
    stack: ["React", "Vite", "React Router", "Vercel"],
    sections: [
      {
        h: "The Problem & Motivation",
        p: "Splitting a restaurant bill is easy until people share appetizers and the tax, tip, and a coupon all need to be divided fairly. Most tools either split evenly or make you enter everything on a tiny screen. I wanted one that works well on a phone at the table.",
      },
      {
        h: "Architecture & Implementation",
        p: "Client-side React with no backend or accounts. You can split evenly, or by item: add items, tax, tip, and discounts, then assign items to people by dragging them or tapping. Pointer events keep drag and drop working on touch screens. Tip is split proportionally by default, with an option to split it evenly. Finished splits can be exported as an image card and are saved to the browser's local storage.",
      },
      {
        h: "Results & Outcome",
        p: "Live on its own domain and hosted on Vercel. It has an even-split mode, a by-item mode, a shareable breakdown, and a history page, plus guide, FAQ, and policy pages.",
      },
    ],
  },
  everythingapp: {
    tagline: "A productivity app that combines daily planning, focus timers, notes, and session stats in one window.",
    period: "April 2026 — ongoing",
    role: "Solo build · design + engineering",
    stack: ["Tauri", "React", "TypeScript", "Supabase", "SQLite", "Zustand"],
    sections: [
      {
        h: "The Problem & Motivation",
        p: "I was switching between several separate apps to manage a single work session — a to-do list, a timer, a notes app, and a habit tracker. The overhead added up, so I built one app that covers all of it.",
      },
      {
        h: "Architecture & Implementation",
        p: "Modular architecture — each tool (timer, planner, notes, stats) is a self-contained module that mounts into the shell. State is centralized in a Zustand store, cached locally in SQLite, and synced to Supabase after Google sign-in. It runs as a Tauri desktop app and as a web app.",
      },
      {
        h: "Results & Outcome",
        p: "In daily use since April 2026. Covers planning, timing, notes, and session tracking in a single window. Redesigned in September 2026.",
      },
    ],
  },
  gymllm: {
    tagline: "A workout logger that accepts plain-English input and parses it into structured lifts, cardio, and body weight.",
    period: "May 2025 — ongoing",
    role: "Solo build · backend-heavy",
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Google OAuth"],
    sections: [
      {
        h: "The Problem & Motivation",
        p: "Existing logging apps still require a fair amount of manual input per set. I wanted to write a workout in natural language and have the app handle the parsing and categorization.",
      },
      {
        h: "Architecture & Implementation",
        p: "Free-text input is sent to an LLM with a strict schema prompt, and the response is normalized so variations of the same exercise resolve to the same entry. The provider is configurable: hosted models (OpenAI, Anthropic, Gemini, Groq) or a local Ollama or LM Studio model called straight from the browser. A review step allows corrections before saving. Users sign in with Google and only see their own entries.",
      },
      {
        h: "Results & Outcome",
        p: "Cuts down the manual input required to log a workout. A Progress section charts exercises, cardio, and body weight by day, week, or month, with per-exercise trends and personal records. Each day has its own page with a shareable image.",
      },
    ],
  },
  photolog: {
    tagline: "A dashboard for analyzing Google Photos Takeout metadata using SQLite, charts, and clustering.",
    period: "Feb 2026 — ongoing",
    role: "Solo build · data + viz",
    stack: ["Python", "Flask", "SQLite", "Chart.js", "scikit-learn", "Render"],
    sections: [
      {
        h: "The Problem & Motivation",
        p: "Google Photos Takeout exports contain detailed metadata across thousands of sidecar files, but the data is not easy to query or visualize directly. This project loads that data into SQLite and surfaces patterns through a web dashboard.",
      },
      {
        h: "Architecture & Implementation",
        p: "A Python ingest script flattens the sidecar JSON into a normalized SQLite schema. Flask serves a dashboard with timeline charts (Chart.js) and KMeans clusters over geo and EXIF features (scikit-learn). The live demo runs on Render with sample data.",
      },
      {
        h: "Results & Outcome",
        p: "Surfaces photo volume trends by month, location clusters across multi-year ranges, and media type distributions. Includes a live demo running on Render with sample data.",
      },
    ],
  },
  scratch: {
    tagline: "A Chrome extension for quick notes with multiple pages, autosave, and local storage.",
    period: "Aug 2024 — ongoing",
    role: "Solo build · frontend only",
    stack: ["JavaScript", "Chrome MV3", "HTML", "CSS", "chrome.storage"],
    sections: [
      {
        h: "The Problem & Motivation",
        p: "I wanted a lightweight note-taking tool available directly from the browser toolbar, without switching to a separate app or opening a new tab.",
      },
      {
        h: "Architecture & Implementation",
        p: "Manifest V3 extension. The popup is a small HTML page with multi-page tabs, autosave on every keystroke (debounced 200ms), and chrome.storage.local for persistence. Includes optional dark mode and font-size controls.",
      },
      {
        h: "Results & Outcome",
        p: "Published on the Chrome Web Store. Free to install, no account required, all notes stored locally in extension storage.",
      },
    ],
  },
};

function ProjectApp() {
  const [slug, setSlug] = useState(getSlug());
  const [lightbox, setLightbox] = useState(null);
  const [heroHovered, setHeroHovered] = useState(false);
  const mob = useIsMobile();

  useEffect(() => {
    const onPop = () => setSlug(getSlug());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const idx = projectIndex(slug);
  const p = PROJECTS[idx];
  const d = DETAIL[p.slug] || { tagline: p.long, sections: [] };
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const accentColor = p.accent || "#38bdf8";
  const resumeHref = PROFILE.resume || "Resume - Akash Saha.pdf";

  useEffect(() => {
    document.title = `${p.title} — Case Study | Akash Saha`;
    window.scrollTo(0, 0);
    setLightbox(null);
  }, [slug]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((l) => (l - 1 + p.shots.length) % p.shots.length);
      if (e.key === "ArrowRight") setLightbox((l) => (l + 1) % p.shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, p.shots.length]);

  return (
    <React.Fragment>
      {/* Top Navbar */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(9, 10, 15, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--line)",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: mob ? "16px 20px" : "18px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 12,
        }}>
          {/* Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="index.html" style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--fg)",
              fontWeight: 600,
              fontSize: 14,
            }}>
              <span style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: accentColor,
              }} />
              <span>Akash Saha</span>
            </a>
            <span style={{ color: "var(--fg-dim)" }}>/</span>
            <a href="index.html#projects" style={{ color: "var(--fg-muted)" }}>
              projects
            </a>
            <span style={{ color: "var(--fg-dim)" }}>/</span>
            <span style={{ color: accentColor, fontWeight: 500 }}>
              {p.slug}
            </span>
          </div>

          {/* Quick Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: mob ? 14 : 24 }}>
            <a
              href="index.html#projects"
              style={{
                color: "var(--fg-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color 180ms",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
            >
              <Icons.ArrowLeft size={13} />
              <span>All Projects</span>
            </a>

            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: mob ? "none" : "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--line-strong)",
                background: "rgba(255, 255, 255, 0.04)",
                color: "var(--fg)",
              }}
            >
              <Icons.FileText size={13} />
              <span>Resume</span>
              <Icons.ExternalLink size={11} />
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        {/* Project Hero Header */}
        <section style={{
          padding: mob ? "40px 20px 36px" : "72px 48px 56px",
        }}>
          {/* Overline Spec Chip */}
          <Reveal delay={60}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: "var(--radius-sm)",
              background: hexA(accentColor, 0.1),
              border: `1px solid ${hexA(accentColor, 0.3)}`,
              color: accentColor,
              fontFamily: "var(--mono)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>
              <span>{p.n}</span>
              <span>·</span>
              <span>{p.role}</span>
              <span>·</span>
              <span>{p.year}</span>
            </div>
          </Reveal>

          {/* Project Title */}
          <Reveal as="h1" delay={120} style={{
            margin: "0 0 20px",
            fontFamily: "var(--sans)",
            fontWeight: 800,
            fontSize: mob ? "clamp(40px, 11vw, 64px)" : "clamp(54px, 6.5vw, 84px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
          }}>
            {p.title}
          </Reveal>

          {/* Tagline / Subtitle */}
          <Reveal as="p" delay={180} style={{
            margin: 0,
            maxWidth: "68ch",
            fontFamily: "var(--sans)",
            fontSize: mob ? 18 : 22,
            lineHeight: 1.55,
            color: "var(--fg-secondary)",
          }}>
            {d.tagline || p.long}
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={240} style={{
            marginTop: 32,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}>
            {p.links.map((link, idx) => {
              const isPrimary = idx === 0;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 22px",
                    borderRadius: "var(--radius-sm)",
                    background: isPrimary ? accentColor : "var(--panel-card)",
                    border: `1px solid ${isPrimary ? accentColor : "var(--line-strong)"}`,
                    color: isPrimary ? "#090a0f" : "var(--fg)",
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    boxShadow: isPrimary ? `0 4px 18px ${hexA(accentColor, 0.35)}` : "none",
                    transition: "transform 180ms, box-shadow 180ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/github/i.test(link.label) && <Icons.Github size={15} />}
                  <span>{link.label}</span>
                  <Icons.ExternalLink size={13} />
                </a>
              );
            })}
          </Reveal>

          {/* Specifications Matrix */}
          <Reveal delay={300} style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 16,
          }}>
            {[
              ["Period", d.period || p.year],
              ["Role & Scope", d.role || p.role],
              ["Tech Stack", (d.stack || p.stack).join(" · ")],
              ["Deployment", /^Live/i.test(p.links[0]?.label || "") ? "Live Production" : "Shipped System"],
            ].map(([k, v]) => (
              <div key={k} style={{
                padding: "20px 22px",
                borderRadius: "var(--radius-md)",
                background: "var(--panel-card)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
                <span style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--fg-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  {k}
                </span>
                <span style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1.4,
                }}>
                  {v}
                </span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Hero Product Screenshot Showcase */}
        <section style={{
          padding: mob ? "0 20px 48px" : "0 48px 80px",
        }}>
          <Reveal delay={120}>
            <div style={{
              borderRadius: "var(--radius-lg)",
              border: `1px solid ${hexA(accentColor, 0.4)}`,
              background: "var(--panel-card)",
              boxShadow: `0 20px 48px -12px rgba(0, 0, 0, 0.7), 0 0 32px ${hexA(accentColor, 0.12)}`,
              overflow: "hidden",
            }}>
              {/* Browser Mockup Top Bar */}
              <div style={{
                padding: "12px 18px",
                background: "rgba(0, 0, 0, 0.35)",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--fg-dim)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(239, 68, 68, 0.75)" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(245, 158, 11, 0.75)" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(34, 197, 94, 0.75)" }} />
                </div>
                <div style={{
                  padding: "4px 14px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--line)",
                  fontSize: 11,
                  color: "var(--fg-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  <Icons.Globe size={11} />
                  <span>{p.siteHref ? p.siteHref.replace(/^https?:\/\//, "") : `${p.slug}.app`}</span>
                </div>
                <span style={{ fontSize: 11, color: "var(--fg-dim)" }}>
                  Hero Preview
                </span>
              </div>

              {/* Image Viewport */}
              <div
                onMouseEnter={() => setHeroHovered(true)}
                onMouseLeave={() => setHeroHovered(false)}
                onClick={() => setLightbox(0)}
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  background: "#07080b",
                  overflow: "hidden",
                  cursor: "zoom-in",
                  lineHeight: 0,
                }}
              >
                {p.imgs?.hero ? (
                  <img
                    src={p.imgs.hero}
                    alt={p.title}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: heroHovered ? "scale(1.02)" : "scale(1)",
                      transition: "transform 480ms cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.title}
                  </div>
                )}

                {/* Click to Expand Overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  padding: "8px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(15, 18, 29, 0.85)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid var(--line-strong)",
                  color: "var(--fg)",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  opacity: heroHovered ? 1 : 0.75,
                  transition: "opacity 180ms",
                }}>
                  <Icons.ExternalLink size={12} />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Case Study Chapters (Why, How, Outcome) */}
        <section style={{
          padding: mob ? "0 20px 48px" : "0 48px 80px",
          borderTop: "1px solid var(--line)",
        }}>
          <div style={{
            paddingTop: mob ? 36 : 56,
            marginBottom: 36,
          }}>
            <Reveal as="div" style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              fontWeight: 600,
              color: accentColor,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Engineering Deep Dive
            </Reveal>
            <Reveal as="h2" delay={60} style={{
              margin: 0,
              fontFamily: "var(--sans)",
              fontWeight: 700,
              fontSize: mob ? 28 : 38,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
            }}>
              Problem, Architecture &amp; Execution
            </Reveal>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {(d.sections || []).map((section, sIdx) => (
              <Reveal key={section.h} delay={sIdx * 80}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: mob ? "1fr" : "260px minmax(0, 1fr)",
                  gap: mob ? 14 : 48,
                  padding: mob ? "28px 24px" : "36px 40px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--panel-card)",
                  border: "1px solid var(--line)",
                  alignItems: "start",
                }}>
                  <div>
                    <span style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: accentColor,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      Chapter 0{sIdx + 1}
                    </span>
                    <h3 style={{
                      margin: "8px 0 0",
                      fontFamily: "var(--sans)",
                      fontWeight: 700,
                      fontSize: mob ? 22 : 26,
                      letterSpacing: "-0.02em",
                      color: "var(--fg)",
                    }}>
                      {section.h}
                    </h3>
                  </div>

                  <p style={{
                    margin: 0,
                    fontFamily: "var(--sans)",
                    fontSize: mob ? 15 : 16.5,
                    lineHeight: 1.75,
                    color: "var(--fg-secondary)",
                    maxWidth: "68ch",
                  }}>
                    {section.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Product Gallery Section */}
        <section style={{
          padding: mob ? "0 20px 56px" : "0 48px 96px",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 32,
          }}>
            <div>
              <Reveal as="div" style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 600,
                color: accentColor,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}>
                Interface &amp; Workflows
              </Reveal>
              <Reveal as="h2" delay={60} style={{
                margin: 0,
                fontFamily: "var(--sans)",
                fontWeight: 700,
                fontSize: mob ? 26 : 34,
                letterSpacing: "-0.025em",
                color: "var(--fg)",
              }}>
                Screenshots &amp; Workflows
              </Reveal>
            </div>

            <Reveal delay={100}>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--fg-dim)",
              }}>
                {p.shots.length} Interactive Views
              </span>
            </Reveal>
          </div>

          {/* Gallery Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}>
            {p.shots.map((shotLabel, sIdx) => (
              <Reveal key={sIdx} delay={sIdx * 80}>
                <div
                  onClick={() => setLightbox(sIdx)}
                  style={{
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--line)",
                    background: "var(--panel-card)",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 220ms, border-color 220ms, box-shadow 220ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 12px 28px -6px rgba(0, 0, 0, 0.6), 0 0 16px ${hexA(accentColor, 0.15)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    background: "#07080b",
                    lineHeight: 0,
                    overflow: "hidden",
                  }}>
                    {p.imgs?.gallery?.[sIdx] ? (
                      <img
                        src={p.imgs.gallery[sIdx]}
                        alt={shotLabel}
                        loading="lazy"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {shotLabel}
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div style={{
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                  }}>
                    <span style={{ color: "var(--fg)", fontWeight: 500 }}>
                      {shotLabel}
                    </span>
                    <span style={{ color: "var(--fg-dim)", fontSize: 11 }}>
                      0{sIdx + 1}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Adjacent Projects Navigation */}
        <section style={{
          padding: mob ? "40px 20px 20px" : "60px 48px 32px",
          borderTop: "1px solid var(--line)",
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: 20,
        }}>
          <ProjectNavCard targetProject={prev} direction="prev" />
          <ProjectNavCard targetProject={next} direction="next" />
        </section>

        {/* Footer */}
        <footer style={{
          padding: mob ? "24px 20px 40px" : "28px 48px 48px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 12,
          color: "var(--fg-dim)",
        }}>
          <span>&copy; {new Date().getFullYear()} Akash Saha · Rutgers University</span>
          <a
            href="index.html#projects"
            style={{
              color: "var(--fg-muted)",
              transition: "color 180ms",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <Icons.ArrowLeft size={13} />
            <span>Back to all projects</span>
          </a>
        </footer>
      </main>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5, 7, 10, 0.94)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {/* Main Modal Image Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "88vw",
              maxHeight: "84vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--line-strong)",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8)",
              background: "var(--panel)",
            }}
          >
            {p.imgs?.gallery?.[lightbox] ? (
              <img
                src={p.imgs.gallery[lightbox]}
                alt={p.shots[lightbox]}
                style={{
                  display: "block",
                  maxWidth: "88vw",
                  maxHeight: "75vh",
                  objectFit: "contain",
                }}
              />
            ) : p.imgs?.hero ? (
              <img
                src={p.imgs.hero}
                alt={p.title}
                style={{
                  display: "block",
                  maxWidth: "88vw",
                  maxHeight: "75vh",
                  objectFit: "contain",
                }}
              />
            ) : null}

            {/* Bottom Modal Caption Bar */}
            <div style={{
              padding: "14px 24px",
              background: "rgba(0, 0, 0, 0.4)",
              borderTop: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: "var(--fg)",
            }}>
              <span style={{ fontWeight: 600 }}>{p.shots[lightbox]}</span>
              <span style={{ color: "var(--fg-dim)" }}>
                {lightbox + 1} / {p.shots.length} · Esc to close
              </span>
            </div>
          </div>

          {/* Left / Prev Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + p.shots.length) % p.shots.length);
            }}
            aria-label="Previous image"
            style={{
              position: "fixed",
              left: mob ? 12 : 32,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(19, 23, 36, 0.85)",
              border: "1px solid var(--line-strong)",
              borderRadius: "50%",
              color: "var(--fg)",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "border-color 180ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = accentColor}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line-strong)"}
          >
            <Icons.ArrowLeft size={18} />
          </button>

          {/* Right / Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % p.shots.length);
            }}
            aria-label="Next image"
            style={{
              position: "fixed",
              right: mob ? 12 : 32,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(19, 23, 36, 0.85)",
              border: "1px solid var(--line-strong)",
              borderRadius: "50%",
              color: "var(--fg)",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "border-color 180ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = accentColor}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line-strong)"}
          >
            <Icons.ArrowRight size={18} />
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

// Prev / Next Navigation Card
function ProjectNavCard({ targetProject, direction }) {
  const isPrev = direction === "prev";
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`project.html?slug=${targetProject.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 24px",
        borderRadius: "var(--radius-md)",
        background: hovered ? "var(--panel-hover)" : "var(--panel-card)",
        border: `1px solid ${hovered ? targetProject.accent : "var(--line)"}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: isPrev ? "flex-start" : "flex-end",
        textAlign: isPrev ? "left" : "right",
        transition: "all 200ms",
      }}
    >
      <span style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--fg-dim)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}>
        {isPrev && <Icons.ArrowLeft size={12} />}
        <span>{isPrev ? "Previous Project" : "Next Project"}</span>
        {!isPrev && <Icons.ArrowRight size={12} />}
      </span>

      <span style={{
        fontFamily: "var(--sans)",
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: "-0.02em",
        color: "var(--fg)",
      }}>
        {targetProject.title}
      </span>

      <span style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: targetProject.accent || "var(--accent)",
      }}>
        {targetProject.role} · {targetProject.year}
      </span>
    </a>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<ProjectApp />);