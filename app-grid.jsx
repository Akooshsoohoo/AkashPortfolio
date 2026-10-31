// app-grid.jsx — Main portfolio view for Akash Saha
const { useState, useEffect, useRef } = React;

// ---------- Navigation Bar ----------
function Navbar({ activeSection = "projects" }) {
  const mob = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resumeHref = PROFILE.resume || "Resume - Akash Saha.pdf";

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: scrolled ? "rgba(9, 10, 15, 0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background 240ms, border-color 240ms, backdrop-filter 240ms",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: mob ? "16px 20px" : "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Brand / Logo */}
        <a href="#hero" style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "var(--fg)",
          fontWeight: 600,
          fontSize: mob ? 16 : 17,
          letterSpacing: "-0.02em",
        }}>
          <span style={{
            display: "inline-block",
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 10px rgba(34, 197, 94, 0.7)",
          }} />
          <span>Akash Saha</span>
          {!mob && (
            <span style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              fontWeight: 400,
              color: "var(--fg-dim)",
              marginLeft: 4,
            }}>
              / SWE New-Grad Dec '26
            </span>
          )}
        </a>

        {/* Desktop Nav Items */}
        {!mob ? (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <a href="#projects" style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--fg-muted)",
                transition: "color 180ms",
              }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}>
                Projects
              </a>
              <a href="#background" style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--fg-muted)",
                transition: "color 180ms",
              }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}>
                Background
              </a>
              <a href="#contact" style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--fg-muted)",
                transition: "color 180ms",
              }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}>
                Contact
              </a>
            </div>

            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--line-strong)",
                background: "rgba(255, 255, 255, 0.04)",
                color: "var(--fg)",
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.02em",
                transition: "all 200ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--panel-hover)";
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.borderColor = "var(--line-strong)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              <Icons.FileText size={14} />
              <span>Resume PDF</span>
              <Icons.ExternalLink size={12} />
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--line-strong)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "var(--fg)",
                fontFamily: "var(--mono)",
                fontSize: 12,
              }}
            >
              <span>Resume</span>
              <Icons.ExternalLink size={11} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                color: "var(--fg)",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ width: 16, height: 2, background: "var(--fg)", display: "block" }} />
              <span style={{ width: 16, height: 2, background: "var(--fg)", display: "block" }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mob && menuOpen && (
        <div style={{
          background: "var(--panel)",
          borderBottom: "1px solid var(--line)",
          padding: "16px 20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          <a
            href="#projects"
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--fg)" }}
          >
            Projects
          </a>
          <a
            href="#background"
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--fg)" }}
          >
            Background
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--fg)" }}
          >
            Contact
          </a>
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              background: "var(--panel-hover)",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-sm)",
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: 13,
            }}
          >
            <Icons.FileText size={15} />
            <span>Open Resume (PDF)</span>
            <Icons.ExternalLink size={13} />
          </a>
        </div>
      )}
    </nav>
  );
}

// ---------- Hero Section ----------
function HeroSection() {
  const mob = useIsMobile();
  const resumeHref = PROFILE.resume || "Resume - Akash Saha.pdf";

  return (
    <header id="hero" style={{
      padding: mob ? "108px 20px 56px" : "140px 48px 84px",
      maxWidth: 1280,
      margin: "0 auto",
      position: "relative",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.45fr) minmax(0, 1fr)",
        gap: mob ? 40 : 64,
        alignItems: "center",
      }}>
        {/* Left Column: Role, Name, Narrative & Primary Actions */}
        <div style={{ minWidth: 0 }}>
          {/* Status Chip */}
          <Reveal delay={60}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.04em",
              marginBottom: 24,
            }}>
              <span style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
              }} />
              <span>Rutgers '26 · Available for Software Engineering Roles</span>
            </div>
          </Reveal>

          {/* Name & Title */}
          <Reveal as="h1" delay={120} style={{
            margin: 0,
            fontFamily: "var(--sans)",
            fontWeight: 800,
            fontSize: mob ? "clamp(44px, 12vw, 68px)" : "clamp(56px, 6.2vw, 86px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
          }}>
            Akash Saha
          </Reveal>

          <Reveal as="p" delay={180} style={{
            margin: "16px 0 0",
            fontFamily: "var(--sans)",
            fontWeight: 500,
            fontSize: mob ? 18 : 22,
            lineHeight: 1.4,
            color: "var(--fg-secondary)",
            letterSpacing: "-0.015em",
          }}>
            Software Engineer &amp; Full-Stack Builder
          </Reveal>

          {/* Verified Biography */}
          <Reveal as="p" delay={260} style={{
            margin: "24px 0 0",
            fontFamily: "var(--sans)",
            fontSize: mob ? 15 : 16.5,
            lineHeight: 1.68,
            color: "var(--fg-muted)",
            maxWidth: "60ch",
          }}>
            {PROFILE.intro}
          </Reveal>

          {/* Primary Action Buttons */}
          <Reveal delay={340} style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}>
            <a
              href="#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "13px 24px",
                borderRadius: "var(--radius-sm)",
                background: "var(--accent)",
                color: "#090a0f",
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.02em",
                boxShadow: "0 4px 18px rgba(56, 189, 248, 0.35)",
                transition: "transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(56, 189, 248, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(56, 189, 248, 0.35)";
              }}
            >
              <span>Explore Projects</span>
              <Icons.ArrowDown size={15} />
            </a>

            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "13px 22px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--line-strong)",
                background: "var(--panel-card)",
                color: "var(--fg)",
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--line-highlight)";
                e.currentTarget.style.background = "var(--panel-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line-strong)";
                e.currentTarget.style.background = "var(--panel-card)";
              }}
            >
              <Icons.FileText size={15} />
              <span>Resume (PDF)</span>
              <Icons.ExternalLink size={13} />
            </a>

            {/* Social quick links */}
            <div style={{ display: "flex", gap: 10, marginLeft: mob ? 0 : 6 }}>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--line)",
                  background: "var(--panel-card)",
                  color: "var(--fg-muted)",
                  transition: "all 180ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--fg)";
                  e.currentTarget.style.borderColor = "var(--line-strong)";
                  e.currentTarget.style.background = "var(--panel-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--fg-muted)";
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "var(--panel-card)";
                }}
              >
                <Icons.Github size={18} />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--line)",
                  background: "var(--panel-card)",
                  color: "var(--fg-muted)",
                  transition: "all 180ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--fg)";
                  e.currentTarget.style.borderColor = "var(--line-strong)";
                  e.currentTarget.style.background = "var(--panel-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--fg-muted)";
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "var(--panel-card)";
                }}
              >
                <Icons.Linkedin size={18} />
              </a>

              <a
                href={PROFILE.email}
                title="Send Email"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--line)",
                  background: "var(--panel-card)",
                  color: "var(--fg-muted)",
                  transition: "all 180ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--fg)";
                  e.currentTarget.style.borderColor = "var(--line-strong)";
                  e.currentTarget.style.background = "var(--panel-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--fg-muted)";
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "var(--panel-card)";
                }}
              >
                <Icons.Mail size={18} />
              </a>
            </div>
          </Reveal>

          {/* Quick Metrics Bar */}
          <Reveal delay={420} style={{
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid var(--line)",
            display: "grid",
            gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: 20,
          }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>
                5 Projects
              </div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--fg-muted)", marginTop: 2 }}>
                Live sites &amp; extensions
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>
                Dec 2026
              </div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--fg-muted)", marginTop: 2 }}>
                Rutgers University CS
              </div>
            </div>
            <div style={mob ? { gridColumn: "1 / -1" } : {}}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>
                USAR Sergeant
              </div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--fg-muted)", marginTop: 2 }}>
                Leadership &amp; discipline
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Headshot with Modern Frame */}
        <div style={{
          display: "flex",
          justifyContent: mob ? "center" : "flex-end",
          alignItems: "center",
        }}>
          <Reveal delay={240} style={{ position: "relative", width: "100%", maxWidth: mob ? 320 : 400 }}>
            {/* Ambient Backlight */}
            <div style={{
              position: "absolute",
              inset: -12,
              borderRadius: "calc(var(--radius-xl) + 12px)",
              background: "radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.18), transparent 75%)",
              filter: "blur(20px)",
              pointerEvents: "none",
              zIndex: 0,
            }} />

            {/* Photo Card */}
            <div style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--line-strong)",
              background: "var(--panel-card)",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              aspectRatio: "3 / 4",
            }}>
              <img
                src="headshot.jpg"
                alt="Akash Saha"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                }}
              />

              {/* Floating Location Badge */}
              <div style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                background: "rgba(15, 18, 29, 0.88)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icons.MapPin size={14} style={{ color: "var(--accent)" }} />
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--fg)",
                    fontWeight: 500,
                  }}>
                    {PROFILE.location} · NJ / NYC
                  </span>
                </div>
                <span style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--fg-dim)",
                }}>
                  Relocating OK
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

// ---------- Project Card (Product Showcase) ----------
function ProjectCard({ p, index, isFlagship = false }) {
  const [hovered, setHovered] = useState(false);
  const mob = useIsMobile();

  const accentColor = p.accent || "#38bdf8";
  const detailUrl = `project.html?slug=${p.slug}`;

  // Find primary external link if any
  const externalLink = p.siteHref
    ? { label: "Live Demo", href: p.siteHref }
    : p.links?.find((l) => /site|website|demo|store/i.test(l.label)) || p.links?.[0];

  const githubLink = p.links?.find((l) => /github/i.test(l.label));
  const videoLink = p.links?.find((l) => /video/i.test(l.label));

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${hovered ? hexA(accentColor, 0.45) : "var(--line)"}`,
        background: hovered ? "var(--panel-hover)" : "var(--panel-card)",
        boxShadow: hovered
          ? `0 20px 40px -12px rgba(0, 0, 0, 0.65), 0 0 24px ${hexA(accentColor, 0.15)}`
          : "var(--shadow-card)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 260ms cubic-bezier(.2,.8,.2,1), border-color 240ms, box-shadow 260ms, background 240ms",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...(isFlagship && !mob ? { gridColumn: "1 / -1" } : {}),
      }}
    >
      {/* Top Browser / Product Window Chrome */}
      <div style={{
        padding: "12px 18px",
        background: "rgba(0, 0, 0, 0.28)",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: "var(--fg-dim)",
      }}>
        {/* Mock Window Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(239, 68, 68, 0.75)" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(245, 158, 11, 0.75)" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(34, 197, 94, 0.75)" }} />
        </div>

        {/* Mock Browser URL Pill */}
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
          maxWidth: mob ? 180 : 320,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          <Icons.Globe size={11} />
          <span>{p.siteHref ? p.siteHref.replace(/^https?:\/\//, "") : `${p.slug}.app`}</span>
        </div>

        {/* Index Pill */}
        <span style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          color: hovered ? accentColor : "var(--fg-dim)",
          fontWeight: 600,
          transition: "color 200ms",
        }}>
          {p.n}
        </span>
      </div>

      {/* Flagship Side-by-Side on Desktop OR Standard Stack */}
      <div style={{
        display: isFlagship && !mob ? "grid" : "flex",
        gridTemplateColumns: isFlagship && !mob ? "minmax(0, 1.35fr) minmax(0, 1fr)" : undefined,
        flexDirection: isFlagship && !mob ? undefined : "column",
        flex: 1,
      }}>
        {/* Screenshot Viewport */}
        <a
          href={detailUrl}
          style={{
            position: "relative",
            aspectRatio: isFlagship && !mob ? "16 / 10" : "16 / 10",
            background: "#07080b",
            overflow: "hidden",
            lineHeight: 0,
            display: "block",
            borderRight: isFlagship && !mob ? "1px solid var(--line)" : "none",
            borderBottom: isFlagship && !mob ? "none" : "1px solid var(--line)",
          }}
        >
          {p.imgs?.thumb ? (
            <img
              src={p.imgs.thumb}
              alt={p.title}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hovered ? "scale(1.03)" : "scale(1)",
                transition: "transform 420ms cubic-bezier(.2,.8,.2,1)",
              }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-dim)" }}>
              {p.title}
            </div>
          )}

          {/* Quick Hover Overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: hovered ? "rgba(9, 10, 15, 0.45)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 240ms",
          }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(15, 18, 29, 0.9)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${accentColor}`,
              color: "#ffffff",
              fontFamily: "var(--mono)",
              fontSize: 12,
              fontWeight: 600,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0.92)",
              transition: "opacity 220ms, transform 220ms",
            }}>
              <span>Open Case Study</span>
              <Icons.ArrowRight size={13} />
            </span>
          </div>
        </a>

        {/* Card Body */}
        <div style={{
          padding: mob ? "24px 20px 28px" : isFlagship ? "36px 40px" : "28px 30px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          flex: 1,
          justifyContent: "space-between",
        }}>
          <div>
            {/* Meta Tags: Role & Year */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
              <span style={{
                display: "inline-block",
                fontFamily: "var(--mono)",
                fontSize: 11,
                fontWeight: 600,
                color: accentColor,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {p.role}
              </span>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--fg-dim)",
              }}>
                {p.year}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              margin: 0,
              fontFamily: "var(--sans)",
              fontWeight: 700,
              fontSize: isFlagship && !mob ? 34 : 26,
              letterSpacing: "-0.025em",
              color: "var(--fg)",
            }}>
              <a href={detailUrl} style={{ color: "inherit" }}>
                {p.title}
              </a>
            </h3>

            {/* Product Blurb */}
            <p style={{
              margin: "12px 0 0",
              fontFamily: "var(--sans)",
              fontSize: isFlagship && !mob ? 16 : 14.5,
              lineHeight: 1.62,
              color: "var(--fg-secondary)",
            }}>
              {p.blurb}
            </p>

            {/* Architectural Highlights on Flagship */}
            {isFlagship && !mob && (
              <p style={{
                margin: "14px 0 0",
                fontFamily: "var(--sans)",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--fg-muted)",
              }}>
                {p.long}
              </p>
            )}

            {/* Tech Stack Chips */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 18,
            }}>
              {p.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    padding: "4px 9px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--line-strong)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{
            marginTop: 20,
            paddingTop: 18,
            borderTop: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}>
            <a
              href={detailUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                background: hovered ? accentColor : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${hovered ? accentColor : "var(--line-strong)"}`,
                color: hovered ? "#090a0f" : "var(--fg)",
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.02em",
                transition: "all 200ms",
              }}
            >
              <span>Architecture &amp; Case Study</span>
              <Icons.ArrowRight size={13} />
            </a>

            {/* External App / Repo Links */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {externalLink && (
                <a
                  href={externalLink.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--fg-muted)",
                    transition: "color 180ms",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
                >
                  <span>{externalLink.label}</span>
                  <Icons.ExternalLink size={12} />
                </a>
              )}

              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--fg-muted)",
                    transition: "color 180ms",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
                >
                  <Icons.Github size={13} />
                  <span>Code</span>
                </a>
              )}

              {videoLink && (
                <a
                  href={videoLink.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--fg-muted)",
                    transition: "color 180ms",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
                >
                  <span>Video</span>
                  <Icons.ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Projects Section ----------
function ProjectsSection() {
  const mob = useIsMobile();

  return (
    <section id="projects" style={{
      padding: mob ? "56px 20px 64px" : "96px 48px 112px",
      maxWidth: 1280,
      margin: "0 auto",
    }}>
      {/* Section Header */}
      <div style={{
        display: "flex",
        flexDirection: mob ? "column" : "row",
        justifyContent: "space-between",
        alignItems: mob ? "flex-start" : "flex-end",
        gap: 16,
        marginBottom: 48,
      }}>
        <div>
          <Reveal as="div" style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--accent)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Portfolio &amp; Production Work
          </Reveal>
          <Reveal as="h2" delay={80} style={{
            margin: 0,
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: mob ? 32 : 44,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
          }}>
            Featured Engineering Projects
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--line-strong)",
            color: "var(--fg-muted)",
          }}>
            {PROJECTS.length} Shipped Systems
          </div>
        </Reveal>
      </div>

      {/* Projects Grid: Top Flagship + 2x2 Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gap: mob ? 28 : 36,
      }}>
        {PROJECTS.map((project, idx) => (
          <Reveal key={project.slug} delay={idx * 80}>
            <ProjectCard
              p={project}
              index={idx}
              isFlagship={idx === 0}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- Background & Experience Section ----------
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (ym) => {
  if (!ym) return "Present";
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

// Everything in this section comes from PROFILE (career-hub/data/profile.yaml), so it never drifts.
function BackgroundSection() {
  const mob = useIsMobile();
  const { education, experience, skills } = PROFILE;
  const card = {
    padding: "28px 26px",
    borderRadius: "var(--radius-lg)",
    background: "var(--panel-card)",
    border: "1px solid var(--line)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  };
  const eyebrow = { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", textTransform: "uppercase" };
  const title = { margin: "6px 0 4px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 20, color: "var(--fg)" };
  const sub = { fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500, color: "var(--fg-secondary)" };
  const body = { margin: 0, fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.6, color: "var(--fg-muted)" };
  const skillGroups = [
    ["Languages", skills.languages],
    ["Technologies", skills.technologies],
    ["Tools", skills.tools],
    ["Certifications", skills.certifications],
  ].filter(([, items]) => items && items.length);

  return (
    <section id="background" style={{
      padding: mob ? "56px 20px 64px" : "96px 48px 112px",
      maxWidth: 1280,
      margin: "0 auto",
      borderTop: "1px solid var(--line)",
    }}>
      <div style={{ marginBottom: 48 }}>
        <Reveal as="div" style={{
          fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "var(--accent)",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8,
        }}>
          Background &amp; Discipline
        </Reveal>
        <Reveal as="h2" delay={80} style={{
          margin: 0, fontFamily: "var(--sans)", fontWeight: 700, fontSize: mob ? 32 : 44,
          letterSpacing: "-0.03em", color: "var(--fg)",
        }}>
          Experience &amp; Technical Foundation
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 80} style={card}>
            <span style={eyebrow}>Education · {monthLabel(e.start)} – {monthLabel(e.end)}</span>
            <div>
              <h3 style={title}>{e.school}</h3>
              <div style={sub}>{e.degree}</div>
            </div>
            {e.coursework && e.coursework.length > 0 && (
              <p style={body}>Coursework: {e.coursework.join(" · ")}</p>
            )}
          </Reveal>
        ))}
        {experience.map((x, i) => (
          <Reveal key={x.org + x.start} delay={(i + education.length) * 80} style={card}>
            <span style={eyebrow}>{monthLabel(x.start)} – {monthLabel(x.end)} · {x.location}</span>
            <div>
              <h3 style={title}>{x.org}</h3>
              <div style={sub}>{x.title}</div>
            </div>
            <ul style={{ ...body, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              {x.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} style={{ ...card, marginTop: 24, padding: "32px 32px" }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "var(--fg-dim)",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}>
          Skills
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : `repeat(${skillGroups.length}, 1fr)`, gap: 24 }}>
          {skillGroups.map(([label, items]) => (
            <div key={label}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "var(--fg)", marginBottom: 10 }}>
                {label}
              </div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 13, lineHeight: 1.8, color: "var(--fg-muted)" }}>
                {items.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ---------- Contact Section ----------
function ContactSection() {
  const mob = useIsMobile();
  const [copied, setCopied] = useState(false);

  const emailRaw = "1sahakash1@gmail.com";
  const resumeHref = PROFILE.resume || "Resume - Akash Saha.pdf";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailRaw).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  return (
    <section id="contact" style={{
      padding: mob ? "56px 20px 40px" : "96px 48px 48px",
      maxWidth: 1280,
      margin: "0 auto",
      borderTop: "1px solid var(--line)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.2fr) minmax(0, 1.8fr)",
        gap: mob ? 36 : 64,
        alignItems: "start",
      }}>
        {/* Left Headline */}
        <div>
          <Reveal as="div" style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--accent)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>
            Get In Touch
          </Reveal>
          <Reveal as="h2" delay={60} style={{
            margin: 0,
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: mob ? 32 : 42,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
          }}>
            Let's discuss opportunities.
          </Reveal>
          <Reveal as="p" delay={120} style={{
            margin: "16px 0 0",
            fontFamily: "var(--sans)",
            fontSize: 15.5,
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "38ch",
          }}>
            Graduating December 2026 and actively interviewing for full-time Software Engineering roles. Open to opportunities in the New York / New Jersey area or remote.
          </Reveal>
        </div>

        {/* Right Contact Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)",
          gap: 16,
        }}>
          {/* Email Card with Copy Action */}
          <Reveal delay={100}>
            <div style={{
              padding: "24px 22px",
              borderRadius: "var(--radius-md)",
              background: "var(--panel-card)",
              border: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "border-color 200ms",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    background: copied ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${copied ? "#22c55e" : "var(--line)"}`,
                    borderRadius: "var(--radius-sm)",
                    color: copied ? "#22c55e" : "var(--fg-muted)",
                    padding: "3px 8px",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all 180ms",
                  }}
                >
                  {copied ? <Icons.Check size={11} /> : <Icons.Copy size={11} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <a
                href={PROFILE.email}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--fg)",
                  marginTop: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{emailRaw}</span>
                <Icons.ExternalLink size={12} style={{ color: "var(--fg-dim)" }} />
              </a>
            </div>
          </Reveal>

          {/* LinkedIn Card */}
          <Reveal delay={160}>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "24px 22px",
                borderRadius: "var(--radius-md)",
                background: "var(--panel-card)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "border-color 200ms, transform 200ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  LinkedIn
                </span>
                <Icons.Linkedin size={15} style={{ color: "var(--accent)" }} />
              </div>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fg)",
                marginTop: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span>akash-saha5111</span>
                <Icons.ExternalLink size={12} style={{ color: "var(--fg-dim)" }} />
              </span>
            </a>
          </Reveal>

          {/* GitHub Card */}
          <Reveal delay={220}>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "24px 22px",
                borderRadius: "var(--radius-md)",
                background: "var(--panel-card)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "border-color 200ms, transform 200ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  GitHub
                </span>
                <Icons.Github size={15} style={{ color: "var(--fg)" }} />
              </div>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fg)",
                marginTop: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span>@Akooshsoohoo</span>
                <Icons.ExternalLink size={12} style={{ color: "var(--fg-dim)" }} />
              </span>
            </a>
          </Reveal>

          {/* Resume Card */}
          <Reveal delay={280}>
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "24px 22px",
                borderRadius: "var(--radius-md)",
                background: "var(--panel-card)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "border-color 200ms, transform 200ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  Resume
                </span>
                <Icons.FileText size={15} style={{ color: "var(--accent)" }} />
              </div>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fg)",
                marginTop: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span>Akash-Saha-Resume.pdf</span>
                <Icons.ExternalLink size={12} style={{ color: "var(--fg-dim)" }} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 64,
        paddingTop: 28,
        borderTop: "1px solid var(--line)",
        display: "flex",
        flexDirection: mob ? "column" : "row",
        justifyContent: "space-between",
        alignItems: mob ? "flex-start" : "center",
        gap: 16,
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: "var(--fg-dim)",
      }}>
        <div>
          <span>&copy; {new Date().getFullYear()} Akash Saha · Rutgers University</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span>{PROFILE.location}</span>
          <a
            href="#hero"
            style={{
              color: "var(--fg-muted)",
              transition: "color 180ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            &uarr; Back to top
          </a>
        </div>
      </footer>
    </section>
  );
}

// ---------- Main Application ----------
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <BackgroundSection />
        <ContactSection />
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);