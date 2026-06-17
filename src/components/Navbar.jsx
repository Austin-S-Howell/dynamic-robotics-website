import React from "react";
import { useIsMobile } from "../hooks/useIsMobile.js";

/**
 * Dynamic Robotics And Integration — Navbar
 * Sticky marketing-site top navigation. Desktop: inline links + CTA with a
 * wipe-in underline and a springy, sheened CTA. Mobile (<820px): emblem +
 * wordmark with a hamburger that opens a stacked menu.
 */

const SPRING = "cubic-bezier(0.34, 1.4, 0.5, 1)";
const SNAP = "cubic-bezier(0.2, 0, 0.1, 1)";

function NavLink({ link, active }) {
  const [hover, setHover] = React.useState(false);
  const on = active || hover;
  return (
    <a
      href={link.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: "8px 14px",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)",
        color: on ? "var(--text-strong)" : "var(--text-body)",
        textDecoration: "none",
        transition: "color var(--dur-fast) var(--ease-standard), transform var(--dur-base) " + SPRING,
        transform: hover ? "translateY(-1px)" : "translateY(0)",
        display: "inline-block",
      }}
    >
      {link.label}
      <span
        style={{
          position: "absolute", left: 14, right: 14, bottom: 4, height: 2, borderRadius: 2,
          background: "var(--color-primary)",
          transformOrigin: active ? "left" : hover ? "left" : "right",
          transform: on ? "scaleX(1)" : "scaleX(0)",
          opacity: on ? 1 : 0,
          transition: "transform var(--dur-base) " + SPRING + ", opacity var(--dur-fast)",
        }}
      />
    </a>
  );
}

function CtaButton({ label, onClick, fullWidth = false }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: "relative", overflow: "hidden",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        height: 42, padding: "0 18px", width: fullWidth ? "100%" : "auto",
        background: hover ? "var(--color-primary-hover)" : "var(--color-primary)",
        color: "#fff", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
        border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
        transform: press ? "translateY(0) scale(0.96)" : hover ? "translateY(-2px) scale(1.015)" : "translateY(0) scale(1)",
        boxShadow: press ? "0 1px 3px rgba(20,22,20,0.18)" : hover ? "0 10px 22px rgba(46,151,62,0.34), 0 3px 8px rgba(20,22,20,0.12)" : "0 1px 2px rgba(20,22,20,0.10)",
        transition: "transform var(--dur-base) " + SPRING + ", box-shadow var(--dur-base) " + SNAP + ", background var(--dur-fast)",
      }}
    >
      <span style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "60%", background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)", transform: hover ? "translateX(220%) skewX(-12deg)" : "translateX(-160%) skewX(-12deg)", transition: "transform 620ms " + SNAP, pointerEvents: "none" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: "relative", zIndex: 1, transform: hover ? "translateX(3px)" : "translateX(0)", transition: "transform var(--dur-base) " + SPRING }}>
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Wordmark({ logoSrc, mobile }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Dynamic Robotics And Integration — home"
      title="Back to home"
      style={{
        display: "inline-flex", alignItems: "center", gap: mobile ? 10 : 13, textDecoration: "none",
        transform: hover ? "scale(1.04)" : "scale(1)", transformOrigin: "left center",
        transition: "transform var(--dur-base) " + SPRING,
      }}
    >
      <img src={logoSrc} alt="" style={{ height: mobile ? 40 : 52, width: "auto", display: "block" }} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: "var(--font-logo)", fontWeight: 700, fontSize: mobile ? 16 : 20, letterSpacing: "0.01em", color: "var(--text-strong)" }}>
          DYNAMIC <span style={{ color: "var(--color-primary)" }}>ROBOTICS</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: mobile ? 8.5 : 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 4 }}>&amp; Integration</span>
      </span>
    </a>
  );
}

export function Navbar({
  links = [
    { label: "Capabilities", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Industries", href: "#" },
    { label: "About", href: "#" },
  ],
  activeHref = null,
  ctaLabel = "Request a quote",
  onCta,
  logoSrc = "assets/logo-emblem.png",
  style = {},
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  // Close the mobile menu whenever we switch to desktop or a link is tapped.
  React.useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: isMobile ? 64 : 80, padding: "0 var(--gutter)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-subtle)",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      <Wordmark logoSrc={logoSrc} mobile={isMobile} />

      {!isMobile && (
        <React.Fragment>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {links.map((l) => <NavLink key={l.label} link={l} active={activeHref === l.href} />)}
          </nav>
          <CtaButton label={ctaLabel} onClick={onCta} />
        </React.Fragment>
      )}

      {isMobile && (
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "inline-flex", flexDirection: "column", justifyContent: "center", gap: 5,
            width: 44, height: 44, padding: 0, border: "1px solid var(--border-subtle)",
            background: "var(--surface-page)", borderRadius: "var(--radius-sm)", cursor: "pointer",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", height: 2, width: 20, margin: "0 auto", borderRadius: 2, background: "var(--text-strong)",
              transition: "transform var(--dur-base) " + SNAP + ", opacity var(--dur-fast)",
              transform: open ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "scaleX(0)") : "none",
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      )}

      {/* mobile dropdown panel */}
      {isMobile && (
        <div
          style={{
            position: "absolute", top: 64, left: 0, right: 0, zIndex: 49,
            background: "var(--surface-page)", borderBottom: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-lg)", padding: "var(--space-4) var(--gutter) var(--space-5)",
            display: "flex", flexDirection: "column", gap: 4,
            transformOrigin: "top",
            transform: open ? "translateY(0)" : "translateY(-8px)",
            opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
            transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
          }}
        >
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                style={{
                  padding: "13px 12px", borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-lg)", fontWeight: "var(--weight-medium)",
                  color: active ? "var(--color-primary)" : "var(--text-strong)",
                  background: active ? "var(--color-primary-tint)" : "transparent",
                  textDecoration: "none",
                }}>
                {l.label}
              </a>
            );
          })}
          <div style={{ marginTop: 8 }}>
            <CtaButton label={ctaLabel} fullWidth onClick={() => { setOpen(false); onCta && onCta(); }} />
          </div>
        </div>
      )}
    </header>
  );
}
