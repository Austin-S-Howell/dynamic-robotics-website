import React from "react";

/**
 * Dynamic Robotics & Integrations — VideoPlayer
 * A muted, looping shop clip that starts playing automatically when it scrolls
 * into view and pauses when it leaves — so a wall of them stays light on CPU
 * and bandwidth. Native `controls` let visitors scrub or unmute, which is the
 * only way to hear sound (browsers block autoplay with audio).
 *
 * Accessibility: honors `prefers-reduced-motion` — when motion is reduced we
 * never autoplay; the poster shows and the controls still work on tap.
 */
export function VideoPlayer({ src, poster, title, caption, aspect = "9 / 16", style = {} }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // React doesn't reliably reflect the `muted` attribute to the DOM property,
    // and muted is required for autoplay — so force it imperatively.
    el.muted = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave paused on the poster; controls remain usable

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {}); // autoplay may still be rejected — ignore
        } else if (!el.paused) {
          el.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure style={{ margin: 0, ...style }}>
      <div
        style={{
          position: "relative",
          aspectRatio: aspect,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "#0b0e0c",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {(title || caption) && (
        <figcaption style={{ padding: "10px 2px 0" }}>
          {title && (
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-strong)", lineHeight: 1.25 }}>{title}</div>
          )}
          {caption && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", letterSpacing: "0.04em", color: "var(--text-muted)", marginTop: 3 }}>{caption}</div>
          )}
        </figcaption>
      )}
    </figure>
  );
}
