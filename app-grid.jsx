// app-grid.jsx — Variant B: engineering grid layout
const { useState: gS, useEffect: gE, useRef: gR } = React;

function GHero() {
  const mob = useIsMobile();
  return (
    <header style={{
      padding: mob ? "20px 20px 40px" : "32px 48px 64px",
      borderBottom: "1px solid var(--line)",
    }}>
      {/* topbar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr auto" : "1fr auto 1fr",
        alignItems: "center", gap: 24,
        fontFamily: "var(--mono)", fontSize: 12,
        color: "var(--muted)",
        marginBottom: mob ? 40 : 80,
      }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{
            display: "inline-block", width: 10, height: 10,
            background: "var(--accent)",
          }} />
          <span style={{ color: "var(--fg)" }}>akash-saha</span>
          {!mob && <span>~/portfolio</span>}
        </div>
        <nav style={{ display: "flex", gap: mob ? 16 : 24, fontSize: 13 }}>
          <a href="#projects" style={{ color: "var(--muted)" }}>./projects</a>
          <a href="#contact" style={{ color: "var(--muted)" }}>./contact</a>
        </nav>
        {!mob && (
          <div style={{ textAlign: "right" }}>
            <span>{PROFILE.location}</span>
          </div>
        )}
      </div>

      {/* hero grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "minmax(0, 3fr) minmax(0, 2fr)",
        gap: mob ? 32 : 48,
        alignItems: "center",
      }}>
        <div style={{ minWidth: 0 }}>
          <Reveal as="p" style={{
            margin: 0, marginBottom: 16,
            fontFamily: "var(--mono)", fontSize: 13,
            color: "var(--accent)",
          }} delay={100}>
            <span style={{ color: "var(--muted)" }}>{"// "}</span>
            Computer science student · Rutgers '27
          </Reveal>

          <Reveal as="h1" delay={200} style={{
            margin: 0,
            fontFamily: "var(--sans)",
            fontWeight: 600,
            fontSize: mob ? "clamp(48px, 13vw, 80px)" : "clamp(56px, 8.5vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
          }}>
            Akash Saha
          </Reveal>

          <Reveal as="p" delay={360} style={{
            margin: "24px 0 0",
            fontFamily: "var(--sans)",
            fontSize: mob ? 16 : 20,
            lineHeight: 1.6,
            color: "var(--fg)",
            maxWidth: mob ? "100%" : "62ch",
            opacity: 0.9,
          }}>
            Computer science student at Rutgers University with experience developing web applications, dashboards, browser extensions, and data-focused software projects. Background includes leadership experience as a Sergeant in the United States Army Reserve and prior work as a civil engineering intern supporting large-scale infrastructure projects.
          </Reveal>
        </div>

        {/* headshot */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Reveal delay={300} style={{
            width: mob ? "clamp(160px, 55vw, 240px)" : "clamp(240px, 22vw, 320px)",
            height: mob ? "clamp(160px, 55vw, 240px)" : "clamp(240px, 22vw, 320px)",
            position: "relative",
            border: "2px solid rgba(224, 138, 60, 0.55)",
            background: "var(--panel)",
            overflow: "hidden",
            lineHeight: 0,
            flexShrink: 0,
          }}>
            <img
              src="headshot.jpg"
              alt="Akash Saha"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", transform: "scale(1.35)", transformOrigin: "center 10%" }}
            />
          </Reveal>
        </div>
      </div>
    </header>
  );
}

// ---------- project card ----------
function GCard({ p, i }) {
  const [hov, setHov] = gS(false);
  return (
    <a
      href={`project.html?slug=${p.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 240ms, box-shadow 240ms, transform 360ms cubic-bezier(.2,.8,.2,1)",
        borderColor: hov ? "rgba(224, 138, 60, 0.55)" : "var(--line)",
        boxShadow: hov ? "0 0 0 1px rgba(224, 138, 60, 0.55)" : "none",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      {/* image */}
      <div style={{
        position: "relative",
        aspectRatio: "16 / 10",
        borderBottom: "1px solid var(--line)",
        background: "#0a0a0b",
        overflow: "hidden",
        lineHeight: 0,
      }}>
        {p.imgs?.thumb
          ? <img src={p.imgs.thumb} alt={p.title} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          : <image-slot id={`grid-${p.slug}-0`} placeholder={p.shots[0]} shape="rect" fit="cover" style={{ display: "block", width: "100%", height: "100%" }}></image-slot>
        }
        <div style={{
          position: "absolute",
          left: 0, top: 0,
          padding: "8px 12px",
          fontFamily: "var(--mono)", fontSize: 11,
          background: "rgba(0,0,0,0.6)",
          color: "var(--muted)",
          pointerEvents: "none",
        }}>{p.n}</div>
      </div>

      {/* body */}
      <div style={{
        padding: "28px 32px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flex: 1,
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "var(--mono)", fontSize: 11,
          color: "var(--muted)",
          textTransform: "uppercase", letterSpacing: "0.06em",
        }}>
          <span>{p.role}</span>
          <span>{p.year}</span>
        </div>

        <h3 style={{
          margin: 0,
          fontFamily: "var(--sans)",
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: "-0.02em",
          color: "var(--fg)",
        }}>{p.title}</h3>

        <p style={{
          margin: 0,
          fontFamily: "var(--sans)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--muted)",
          flex: 1,
        }}>{p.blurb}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.stack.slice(0, 5).map((s) => (
            <span key={s} style={{
              fontFamily: "var(--mono)", fontSize: 11,
              padding: "3px 7px",
              border: "1px solid var(--line-strong)",
              color: "var(--fg)",
            }}>{s}</span>
          ))}
        </div>

        {/* prominent CTA — whole card is a link, this is the visual anchor */}
        <div style={{
          marginTop: 8,
          paddingTop: 18,
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px",
            background: hov ? "var(--accent)" : "transparent",
            border: `2px solid ${hov ? "var(--accent)" : "var(--line-strong)"}`,
            color: hov ? "#0b0b0c" : "var(--fg)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "background 220ms, color 220ms, border-color 220ms, gap 240ms",
          }}>
            Read more
            <span style={{
              display: "inline-block",
              transform: hov ? "translateX(4px)" : "translateX(0)",
              transition: "transform 240ms cubic-bezier(.2,.8,.2,1)",
            }}>→</span>
          </span>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>{p.slug}</span>
        </div>
      </div>
    </a>
  );
}

function GProjects() {
  const mob = useIsMobile();
  return (
    <section id="projects" style={{
      padding: mob ? "48px 20px 56px" : "72px 80px 80px",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 40,
      }}>
        <h2 style={{
          margin: 0,
          fontFamily: "var(--sans)",
          fontWeight: 600,
          fontSize: mob ? 28 : 36,
          letterSpacing: "-0.02em",
        }}>Projects</h2>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 12,
          color: "var(--muted)",
        }}>{"// "}{PROJECTS.length} entries</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gap: 24,
      }}>
        {PROJECTS.map((p, i) => (
          <GCard key={p.slug} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function GContact() {
  const mob = useIsMobile();
  return (
    <section id="contact" style={{
      padding: mob ? "40px 20px 24px" : "60px 48px 32px",
      borderTop: "1px solid var(--line)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "1fr 2fr",
        gap: mob ? 32 : 64,
        alignItems: "start",
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--sans)",
            fontWeight: 600,
            fontSize: mob ? 28 : 36,
            letterSpacing: "-0.02em",
          }}>Contact</h2>
          <p style={{
            margin: "16px 0 0",
            fontFamily: "var(--sans)",
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "32ch",
          }}>
            Reach out about internships, projects, or anything else.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }}>
          <GContactCell k="email" v="1sahakash1@gmail.com" copyText="1sahakash1@gmail.com" />
          <GContactCell k="github" v="@Akooshsoohoo" href={PROFILE.github} />
          <GContactCell k="linkedin" v="akash-saha5111" href={PROFILE.linkedin} />
          <GContactCell k="resume" v="resume.pdf" href={PROFILE.resume} />
        </div>
      </div>

      <footer style={{
        marginTop: 48,
        paddingTop: 20,
        borderTop: "1px solid var(--line)",
        display: "flex", justifyContent: "space-between",
        fontFamily: "var(--mono)", fontSize: 11,
        color: "var(--muted)",
      }}>
        <span>© Akash Saha — 2026</span>
        <span>{PROFILE.location}</span>
      </footer>
    </section>
  );
}

function GContactCell({ k, v, href, copyText }) {
  const [hov, setHov] = gS(false);
  const [copied, setCopied] = gS(false);

  if (copyText) {
    const handleCopy = () => {
      navigator.clipboard.writeText(copyText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    };
    return (
      <button
        onClick={handleCopy}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "20px 22px",
          background: hov ? "var(--accent)" : "var(--bg)",
          color: hov ? "#0b0b0c" : "var(--fg)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          transition: "background 280ms, color 280ms",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "var(--mono)", fontSize: 11,
          color: hov ? "#0b0b0c" : "var(--muted)",
          transition: "color 280ms",
        }}>{k}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 15 }}>
          {v} <span style={{ opacity: 0.6 }}>{copied ? "✓" : "⎘"}</span>
        </span>
      </button>
    );
  }

  const ext = href.startsWith("http") || href.startsWith("mailto");
  return (
    <a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "20px 22px",
        background: hov ? "var(--accent)" : "var(--bg)",
        color: hov ? "#0b0b0c" : "var(--fg)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        transition: "background 280ms, color 280ms",
      }}
    >
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11,
        color: hov ? "#0b0b0c" : "var(--muted)",
        transition: "color 280ms",
      }}>{k}</span>
      <span style={{
        fontFamily: "var(--mono)", fontSize: 15,
      }}>{v} <span style={{ opacity: 0.6 }}>↗</span></span>
    </a>
  );
}

function GApp() {
  return (
    <React.Fragment>
      <GHero />
      <GProjects />
      <GContact />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<GApp />);
