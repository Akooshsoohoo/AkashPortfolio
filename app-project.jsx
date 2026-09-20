// app-project.jsx — individual project case-study page
const { useState: pS, useEffect: pE } = React;

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || PROJECTS[0].slug;
}

function projectIndex(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return i === -1 ? 0 : i;
}

// extra copy per project — overview, role, problem, approach, outcome
const DETAIL = {
  easybillsplitting: {
    tagline: "A bill splitter for shared items, tax, tip, and discounts. It runs entirely in the browser.",
    period: "Aug 2026 — ongoing",
    role: "Solo build · design + engineering",
    stack: ["React", "Vite", "React Router", "Vercel"],
    sections: [
      {
        h: "Why",
        p: "Splitting a restaurant bill is easy until people share appetizers and the tax, tip, and a coupon all need to be divided fairly. Most tools either split evenly or make you enter everything on a tiny screen. I wanted one that works well on a phone at the table.",
      },
      {
        h: "How",
        p: "Client-side React with no backend or accounts. You can split evenly, or by item: add items, tax, tip, and discounts, then assign items to people by dragging them or tapping. Pointer events keep drag and drop working on touch screens. Tip is split proportionally by default, with an option to split it evenly. Finished splits can be exported as an image card and are saved to the browser's local storage.",
      },
      {
        h: "Outcome",
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
        h: "Why",
        p: "I was switching between several separate apps to manage a single work session — a to-do list, a timer, a notes app, and a habit tracker. The overhead added up, so I built one app that covers all of it.",
      },
      {
        h: "How",
        p: "Modular architecture — each tool (timer, planner, notes, stats) is a self-contained module that mounts into the shell. State is centralized in a Zustand store, cached locally in SQLite, and synced to Supabase after Google sign-in. It runs as a Tauri desktop app and as a web app.",
      },
      {
        h: "Outcome",
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
        h: "Why",
        p: "Existing logging apps still require a fair amount of manual input per set. I wanted to write a workout in natural language and have the app handle the parsing and categorization.",
      },
      {
        h: "How",
        p: "Free-text input is sent to an LLM with a strict schema prompt, and the response is normalized so variations of the same exercise resolve to the same entry. The provider is configurable: hosted models (OpenAI, Anthropic, Gemini, Groq) or a local Ollama or LM Studio model called straight from the browser. A review step allows corrections before saving. Users sign in with Google and only see their own entries.",
      },
      {
        h: "Outcome",
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
        h: "Why",
        p: "Google Photos Takeout exports contain detailed metadata across thousands of sidecar files, but the data is not easy to query or visualize directly. This project loads that data into SQLite and surfaces patterns through a web dashboard.",
      },
      {
        h: "How",
        p: "A Python ingest script flattens the sidecar JSON into a normalized SQLite schema. Flask serves a dashboard with timeline charts (Chart.js) and KMeans clusters over geo and EXIF features (scikit-learn). The live demo runs on Render with sample data.",
      },
      {
        h: "Outcome",
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
        h: "Why",
        p: "I wanted a lightweight note-taking tool available directly from the browser toolbar, without switching to a separate app or opening a new tab.",
      },
      {
        h: "How",
        p: "Manifest V3 extension. The popup is a small HTML page with multi-page tabs, autosave on every keystroke (debounced 200ms), and chrome.storage.local for persistence. Includes optional dark mode and font-size controls.",
      },
      {
        h: "Outcome",
        p: "Published on the Chrome Web Store. Free to install, no account required, all notes stored locally in extension storage.",
      },
    ],
  },
};

function ProjectApp() {
  const [slug, setSlug] = pS(getSlug());
  const [heroHov, setHeroHov] = pS(false);
  const [lightbox, setLightbox] = pS(null);
  const mob = useIsMobile();

  pE(() => {
    const onPop = () => setSlug(getSlug());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const idx = projectIndex(slug);
  const p = PROJECTS[idx];
  const d = DETAIL[p.slug] || { tagline: p.long, sections: [] };
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  pE(() => {
    document.title = `${p.title} — Akash Saha`;
    window.scrollTo(0, 0);
    setLightbox(null);
  }, [slug]);

  pE(() => {
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
      {/* topbar */}
      <header style={{
        padding: mob ? "16px 20px" : "24px 48px",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: "var(--muted)",
      }}>
        <a href="index.html" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          color: "var(--fg)",
        }}>
          <span style={{
            display: "inline-block", width: 10, height: 10,
            background: "var(--accent)",
          }} />
          <span>akash-saha</span>
          <span style={{ color: "var(--muted)" }}>~/portfolio/{p.slug}</span>
        </a>
        <nav style={{ display: "flex", gap: 24 }}>
          <a href="index.html" style={{ color: "var(--muted)" }}>← all projects</a>
          <a href="index.html#contact" style={{ color: "var(--muted)" }}>./contact</a>
        </nav>
      </header>

      {/* hero */}
      <section style={{
        padding: mob ? "40px 20px 40px" : "72px 48px 56px",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
      }}>
        <Reveal as="p" delay={80} style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: 13,
          color: "var(--accent)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          <span style={{ color: "var(--muted)" }}>{"// "}</span>
          {p.n} · {p.role} · {p.year}
        </Reveal>

        <Reveal as="h1" delay={160} style={{
          margin: "20px 0 28px",
          fontFamily: "var(--sans)",
          fontWeight: 600,
          fontSize: mob ? "clamp(44px, 13vw, 80px)" : "clamp(56px, 9vw, 132px)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
        }}>
          {p.title}
        </Reveal>

        <Reveal as="p" delay={240} style={{
          margin: 0,
          maxWidth: "62ch",
          fontFamily: "var(--sans)",
          fontSize: 20,
          lineHeight: 1.55,
          color: "var(--fg)",
          opacity: 0.92,
        }}>
          {d.tagline || p.long}
        </Reveal>

        {/* meta strip */}
        <Reveal delay={320} style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }}>
          {[
            ["Period", d.period || p.year],
            ["Role", d.role || p.role],
            ["Stack", (d.stack || p.stack).slice(0, 4).join(" · ")],
            ["Status", /^Live/.test(p.links[0]?.label || "") ? "Live" : "Shipped"],
          ].map(([k, v]) => (
            <div key={k} style={{
              padding: "18px 22px",
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 11,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>{k}</span>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 13,
                color: "var(--fg)",
              }}>{v}</span>
            </div>
          ))}
        </Reveal>

        {/* CTA strip — external links */}
        <Reveal delay={380} style={{
          marginTop: 32,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}>
          {p.links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 18px",
                background: i === 0 ? "var(--accent)" : "transparent",
                border: `1px solid ${i === 0 ? "var(--accent)" : "var(--line-strong)"}`,
                color: i === 0 ? "#0b0b0c" : "var(--fg)",
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {l.label} <span>↗</span>
            </a>
          ))}
        </Reveal>
      </section>

      {/* hero shot */}
      <section style={{
        padding: mob ? "0 20px 48px" : "0 48px 80px",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
      }}>
        <Reveal
          as={(p.siteHref || p.links[0]) ? "a" : "div"}
          href={p.siteHref || p.links[0]?.href}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHeroHov(true)}
          onMouseLeave={() => setHeroHov(false)}
          delay={120}
          style={{
            aspectRatio: "16 / 9",
            border: "2px solid rgba(224,138,60,0.45)",
            background: "var(--panel)",
            overflow: "hidden",
            lineHeight: 0,
            display: "block",
            cursor: p.links[0] ? "pointer" : "default",
          }}
        >
          {p.imgs?.hero
            ? <img src={p.imgs.hero} alt={p.title} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", transform: heroHov ? "scale(1.04)" : "scale(1)", transition: "transform 600ms cubic-bezier(.2,.8,.2,1)" }} />
            : <image-slot id={`detail-${p.slug}-hero`} placeholder={`${p.title} — hero shot`} shape="rect" fit="cover" style={{ display: "block", width: "100%", height: "100%" }}></image-slot>
          }
        </Reveal>
      </section>

      {/* body sections */}
      <section style={{
        padding: mob ? "0 20px 48px" : "0 48px 80px",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--line)",
      }}>
        {(d.sections || []).map((s, i) => (
          <Reveal key={s.h} delay={i * 80} style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "240px minmax(0, 1fr)",
            gap: mob ? 16 : 64,
            padding: mob ? "36px 0" : "56px 0",
            borderBottom: "1px solid var(--line)",
            alignItems: "start",
          }}>
            <div>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 12,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>{`0${i + 1}`}</span>
              <h2 style={{
                margin: "8px 0 0",
                fontFamily: "var(--sans)",
                fontWeight: 600,
                fontSize: 32,
                letterSpacing: "-0.02em",
              }}>{s.h}</h2>
            </div>
            <p style={{
              margin: 0,
              fontFamily: "var(--sans)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--fg)",
              opacity: 0.88,
              maxWidth: "62ch",
            }}>{s.p}</p>
          </Reveal>
        ))}
      </section>

      {/* secondary shots */}
      <section style={{
        padding: mob ? "0 20px 64px" : "0 48px 96px",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 32,
        }}>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--sans)",
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "-0.02em",
          }}>Gallery</h2>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 12,
            color: "var(--muted)",
          }}>{"// "}{p.shots.length} shots</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {p.shots.map((s, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              onClick={() => setLightbox(i)}
              style={{
                aspectRatio: "4 / 3",
                border: "1px solid var(--line-strong)",
                background: "var(--panel)",
                overflow: "hidden",
                lineHeight: 0,
                cursor: "pointer",
              }}
            >
              {p.imgs?.gallery?.[i]
                ? <img src={p.imgs.gallery[i]} alt={s} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
                : <image-slot id={`detail-${p.slug}-${i}`} placeholder={s} shape="rect" fit="cover" style={{ display: "block", width: "100%", height: "100%" }}></image-slot>
              }
            </Reveal>
          ))}
        </div>
      </section>

      {/* prev / next */}
      <section style={{
        padding: mob ? "32px 20px 16px" : "48px 48px 24px",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--line)",
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
        gap: 1,
      }}>
        <PrevNext p={prev} dir="prev" />
        <PrevNext p={next} dir="next" />
      </section>

      <footer style={{
        padding: mob ? "16px 20px 32px" : "20px 48px 40px",
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
        borderTop: "1px solid var(--line)",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--muted)",
      }}>
        <span>© Akash Saha — 2026</span>
        <a href="index.html" style={{ color: "var(--muted)" }}>← back to all projects</a>
      </footer>
      {/* lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* image */}
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "82vw", maxHeight: "82vh" }}>
            {p.imgs?.gallery?.[lightbox]
              ? <img
                  src={p.imgs.gallery[lightbox]}
                  alt={p.shots[lightbox]}
                  style={{ display: "block", maxWidth: "82vw", maxHeight: "82vh", objectFit: "contain" }}
                />
              : <div style={{
                  width: 640, height: 480,
                  background: "var(--panel)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--mono)", fontSize: 13, color: "var(--muted)",
                }}>{p.shots[lightbox]}</div>
            }
          </div>

          {/* prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + p.shots.length) % p.shots.length); }}
            style={{
              position: "fixed", left: 28, top: "50%", transform: "translateY(-50%)",
              background: "rgba(11,11,12,0.75)", border: "1px solid var(--line-strong)",
              color: "var(--fg)", width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontFamily: "var(--mono)", fontSize: 20,
              backdropFilter: "blur(8px)",
            }}
          >←</button>

          {/* next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % p.shots.length); }}
            style={{
              position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
              background: "rgba(11,11,12,0.75)", border: "1px solid var(--line-strong)",
              color: "var(--fg)", width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontFamily: "var(--mono)", fontSize: 20,
              backdropFilter: "blur(8px)",
            }}
          >→</button>

          {/* counter + close hint */}
          <div style={{
            position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
            fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)",
            display: "flex", gap: 24, alignItems: "center",
            pointerEvents: "none",
          }}>
            <span>{lightbox + 1} / {p.shots.length}</span>
            <span style={{ opacity: 0.45 }}>esc to close</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function PrevNext({ p, dir }) {
  const [hov, setHov] = pS(false);
  const isPrev = dir === "prev";
  return (
    <a
      href={`project.html?slug=${p.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "32px 28px",
        background: hov ? "var(--accent)" : "var(--bg)",
        color: hov ? "#0b0b0c" : "var(--fg)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: isPrev ? "flex-start" : "flex-end",
        textAlign: isPrev ? "left" : "right",
        transition: "background 240ms, color 240ms",
      }}
    >
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11,
        letterSpacing: "0.1em", textTransform: "uppercase",
        opacity: 0.7,
      }}>
        {isPrev ? "← previous" : "next →"}
      </span>
      <span style={{
        fontFamily: "var(--sans)",
        fontWeight: 600,
        fontSize: 26,
        letterSpacing: "-0.02em",
      }}>{p.title}</span>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11,
        opacity: 0.7,
      }}>{p.role} · {p.year}</span>
    </a>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<ProjectApp />);
