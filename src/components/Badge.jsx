import React from "react";

/**
 * Dynamic Robotics & Integrations — Badge
 * Compact status / category label.
 */
export function Badge({ children, variant = "neutral", size = "md", dot = false, style = {} }) {
  const variants = {
    primary: { bg: "var(--color-primary-tint)", fg: "var(--green-700)", dot: "var(--color-primary)" },
    neutral: { bg: "var(--surface-sunken)", fg: "var(--neutral-700)", dot: "var(--neutral-500)" },
    solid:   { bg: "var(--color-primary)", fg: "#fff", dot: "#fff" },
    success: { bg: "var(--status-success-bg)", fg: "var(--green-700)", dot: "var(--status-success)" },
    warning: { bg: "var(--status-warning-bg)", fg: "#9a6210", dot: "var(--status-warning)" },
    danger:  { bg: "var(--status-danger-bg)", fg: "#a52b2b", dot: "var(--status-danger)" },
    outline: { bg: "transparent", fg: "var(--text-body)", dot: "var(--neutral-400)", border: "1px solid var(--border-default)" },
  };
  const v = variants[variant] || variants.neutral;
  const sizes = {
    sm: { fontSize: "var(--text-2xs)", padding: "2px 8px", gap: 5 },
    md: { fontSize: "var(--text-xs)", padding: "4px 10px", gap: 6 },
  };
  const s = sizes[size] || sizes.md;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: s.gap,
      padding: s.padding,
      fontFamily: "var(--font-mono)", fontSize: s.fontSize, fontWeight: "var(--weight-medium)",
      letterSpacing: "0.04em", textTransform: "uppercase",
      color: v.fg, background: v.bg, border: v.border || "none",
      borderRadius: "var(--radius-pill)", lineHeight: 1.4, whiteSpace: "nowrap",
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: v.dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
