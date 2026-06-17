import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/index.js";
import { useIsMobile } from "../hooks/useIsMobile.js";

const ArrowR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

function ImagePanel({ label, height = 360 }) {
  return (
    <div style={{
      height, borderRadius: "var(--radius-lg)",
      background: "var(--surface-sunken)", border: "1px solid var(--border-subtle)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      color: "var(--neutral-400)", overflow: "hidden",
      backgroundImage: "repeating-linear-gradient(135deg, rgba(0,0,0,0.025) 0 1px, transparent 1px 11px)",
    }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const caps = [
    { n: "01", t: "Robotic Welding", d: "MIG, TIG and spot cells with seam tracking and fume control." },
    { n: "02", t: "Palletizing & Packaging", d: "End-of-line stacking, case packing and shrink up to 210 kg." },
    { n: "03", t: "Machine Tending", d: "CNC, press and injection-mold loading with quick-change EOAT." },
    { n: "04", t: "Vision & Inspection", d: "2D/3D guided pick-and-place and 100% inline verification." },
  ];
  const stats = [
    { k: "Cells delivered", v: "320+" },
    { k: "Avg. uptime", v: "99.2%" },
    { k: "Years integrating", v: "12" },
    { k: "Payload max", v: "1500kg" },
  ];
  return (
    <main>
      <section style={{ padding: "var(--space-9) var(--gutter) var(--space-8)", maxWidth: "var(--container-xl)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr", gap: "var(--space-7)", alignItems: "center" }}>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <span className="dr-eyebrow">// Robotic system integrator · Springfield, MO</span>
            <h1 style={{ fontSize: isMobile ? "var(--text-3xl)" : "var(--text-4xl)", lineHeight: 1.02, marginTop: 18, marginBottom: 22 }}>
              Automation,<br/>engineered for<br/><span style={{ color: "var(--color-primary)" }}>your floor.</span>
            </h1>
            <p style={{ fontSize: "var(--text-lg)", lineHeight: 1.55, color: "var(--text-body)", maxWidth: isMobile ? "100%" : 460, margin: isMobile ? "0 auto 30" : "0 0 30" }}>
              We design, build and integrate robotic cells that weld, pack, tend and inspect — from a single cobot to a full automated line.
            </p>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
              <Button size="lg" fullWidth={isMobile} iconRight={<ArrowR/>} onClick={() => navigate("/services")}>Browse services</Button>
              <Button size="lg" fullWidth={isMobile} variant="secondary" onClick={() => navigate("/contact")}>Talk to an engineer</Button>
            </div>
          </div>
          <ImagePanel label="Hero — integration floor photo" height={isMobile ? 240 : 420} />
        </div>
      </section>

      <section style={{ background: "var(--surface-ink)", color: "#fff" }}>
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-6) var(--gutter)", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "var(--space-5)" }}>
          {stats.map((s) => (
            <div key={s.k} style={{ textAlign: isMobile ? "center" : "left" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-3xl)", color: "#fff" }}>{s.v}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green-400)", marginTop: 4 }}>{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "var(--space-9) var(--gutter)", maxWidth: "var(--container-xl)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: isMobile ? "center" : "space-between", alignItems: isMobile ? "center" : "flex-end", gap: 16, flexWrap: "wrap", textAlign: isMobile ? "center" : "left", marginBottom: "var(--space-6)" }}>
          <div>
            <span className="dr-eyebrow">// Capabilities</span>
            <h2 style={{ fontSize: "var(--text-2xl)", marginTop: 12 }}>What we integrate</h2>
          </div>
          <Button variant="ghost" iconRight={<ArrowR/>} onClick={() => navigate("/services")}>See all machines</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "var(--space-4)" }}>
          {caps.map((c) => (
            <Card key={c.n} accent interactive onClick={() => navigate("/services")}>
              <span className="dr-eyebrow">// {c.n}</span>
              <h3 style={{ fontSize: "var(--text-lg)", margin: "10px 0 8px" }}>{c.t}</h3>
              <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.55, color: "var(--text-body)", margin: 0 }}>{c.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 var(--gutter) var(--space-9)", maxWidth: "var(--container-xl)", margin: "0 auto" }}>
        <div style={{ background: "var(--color-primary)", borderRadius: "var(--radius-xl)", padding: isMobile ? "var(--space-6)" : "var(--space-8)", display: "flex", justifyContent: isMobile ? "center" : "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", textAlign: isMobile ? "center" : "left" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-2xl)", marginBottom: 8 }}>Know what you need? Build a request.</h2>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "var(--text-md)", margin: 0 }}>Pick the machines you need and we'll scope a cell around them.</p>
          </div>
          <Button size="lg" fullWidth={isMobile} variant="inverse" iconRight={<ArrowR/>} onClick={() => navigate("/services")}>View services</Button>
        </div>
      </section>
    </main>
  );
}
