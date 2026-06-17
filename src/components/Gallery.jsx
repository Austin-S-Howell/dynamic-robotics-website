import React from "react";

/**
 * Dynamic Robotics & Integrations — Gallery
 * Selectable image gallery. Users pick one or many machines/services;
 * a floating action bar rises with a CTA that routes to Contact carrying
 * the selection.
 *
 * items: Array<{ id, title, category?, image?, spec? }>
 */
export function Gallery({
  items = [],
  selected = [],            // string[] of item ids
  onChange,
  onRequest,                // (selectedItems) => void
  columns = 3,
  ctaLabel = "Request a quote for selection",
  style = {},
}) {
  const sel = Array.isArray(selected) ? selected : [];

  function toggle(id) {
    const set = new Set(sel);
    set.has(id) ? set.delete(id) : set.add(id);
    onChange && onChange(Array.from(set));
  }

  const selectedItems = items.filter((it) => sel.includes(it.id));

  return (
    <div style={{ position: "relative", fontFamily: "var(--font-body)", ...style }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "var(--space-4)",
        }}
      >
        {items.map((it) => {
          const on = sel.includes(it.id);
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => toggle(it.id)}
              style={{
                position: "relative",
                display: "block",
                padding: 0,
                textAlign: "left",
                background: "var(--surface-card)",
                border: `2px solid ${on ? "var(--color-primary)" : "var(--border-subtle)"}`,
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: on ? "var(--shadow-md)" : "var(--shadow-xs)",
                transition: "border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base), transform var(--dur-base)",
                transform: on ? "translateY(-2px)" : "none",
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.borderColor = "var(--border-strong)"; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
            >
              {/* image / placeholder */}
              <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--surface-sunken)", overflow: "hidden" }}>
                {it.image ? (
                  <img src={it.image} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: on ? "none" : "saturate(0.92)" }} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--neutral-400)" }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Add photo</span>
                  </div>
                )}

                {/* select checkmark */}
                <span style={{
                  position: "absolute", top: 10, right: 10,
                  width: 26, height: 26, borderRadius: "50%",
                  background: on ? "var(--color-primary)" : "rgba(255,255,255,0.85)",
                  border: on ? "none" : "1px solid var(--border-default)",
                  backdropFilter: "blur(4px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background var(--dur-fast), transform var(--dur-fast)",
                  transform: on ? "scale(1)" : "scale(0.92)",
                }}>
                  {on && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </span>

                {it.category && (
                  <span style={{
                    position: "absolute", top: 10, left: 10,
                    padding: "3px 9px", borderRadius: "var(--radius-pill)",
                    background: "rgba(20,22,20,0.72)", backdropFilter: "blur(4px)",
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
                    letterSpacing: "0.05em", textTransform: "uppercase", color: "#fff",
                  }}>{it.category}</span>
                )}
              </div>

              {/* caption */}
              <div style={{ padding: "13px 15px 15px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lg)", color: "var(--text-strong)", lineHeight: 1.2 }}>{it.title}</div>
                {it.spec && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 5 }}>{it.spec}</div>}
              </div>
            </button>
          );
        })}
      </div>

      {/* floating action bar */}
      <div
        style={{
          position: "sticky", bottom: 24, zIndex: 30,
          margin: "24px auto 0", maxWidth: 560,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          padding: "12px 14px 12px 20px",
          background: "var(--surface-ink)", borderRadius: "var(--radius-pill)",
          boxShadow: "var(--shadow-lg)",
          transform: sel.length ? "translateY(0)" : "translateY(20px)",
          opacity: sel.length ? 1 : 0,
          pointerEvents: sel.length ? "auto" : "none",
          transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
          <span style={{
            minWidth: 26, height: 26, padding: "0 7px", borderRadius: "var(--radius-pill)",
            background: "var(--color-primary)", color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: 600,
          }}>{sel.length}</span>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--neutral-300)" }}>{sel.length === 1 ? "item selected" : "items selected"}</span>
        </span>
        <button
          type="button"
          onClick={() => onRequest && onRequest(selectedItems)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 42, padding: "0 20px",
            background: "var(--color-primary)", color: "#fff",
            fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
            border: "none", borderRadius: "var(--radius-pill)", cursor: "pointer", whiteSpace: "nowrap",
            transition: "background var(--dur-fast)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
        >
          {ctaLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
