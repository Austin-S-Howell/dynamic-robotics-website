import React from "react";
import { useNavigate } from "react-router-dom";
import { Gallery, VideoPlayer } from "../components/index.js";
import { MACHINES } from "../data/machines.js";
import { VIDEOS } from "../data/videos.js";
import { usePageContext } from "../App.jsx";
import { useIsMobile } from "../hooks/useIsMobile.js";

export default function Services() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { selected, setSelected } = usePageContext();
  return (
    <main style={{ padding: "var(--space-8) var(--gutter) var(--space-9)", maxWidth: "var(--container-xl)", margin: "0 auto" }}>
      <div style={{ textAlign: isMobile ? "center" : "left" }}>
        <span className="dr-eyebrow">// Services</span>
        <h1 style={{ fontSize: "var(--text-3xl)", margin: "12px 0 10px" }}>Select your machines &amp; services</h1>
        <p style={{ fontSize: "var(--text-lg)", color: "var(--text-body)", maxWidth: isMobile ? "100%" : 560, margin: isMobile ? "0 auto var(--space-6)" : "0 0 var(--space-6)" }}>
          Tap any cell to add it to your request. Choose as many as you like.
        </p>
      </div>
      <Gallery
        items={MACHINES}
        selected={selected}
        onChange={setSelected}
        columns={isMobile ? 1 : 4}
        ctaLabel={isMobile ? "Request a quote" : "Request a quote for selection"}
        onRequest={() => navigate("/contact")}
      />

      <section style={{ marginTop: "var(--space-9)" }}>
        <div style={{ textAlign: isMobile ? "center" : "left", marginBottom: "var(--space-6)" }}>
          <span className="dr-eyebrow">// In the cell</span>
          <h2 style={{ fontSize: "var(--text-2xl)", margin: "12px 0 8px" }}>See our robots in motion</h2>
          <p style={{ fontSize: "var(--text-md)", color: "var(--text-body)", maxWidth: isMobile ? "100%" : 560, margin: isMobile ? "0 auto" : 0 }}>
            Real footage from our floor — laser and MIG welding cells running live. Clips play automatically; tap any one to scrub or unmute.
          </p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
          gap: isMobile ? "var(--space-6)" : "var(--space-4)",
          maxWidth: isMobile ? 420 : "none",
          margin: isMobile ? "0 auto" : undefined,
        }}>
          {VIDEOS.map((v) => (
            <VideoPlayer key={v.id} src={v.src} poster={v.poster} title={v.title} caption={v.caption} />
          ))}
        </div>
      </section>
    </main>
  );
}
