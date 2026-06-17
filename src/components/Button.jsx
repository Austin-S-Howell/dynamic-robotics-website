import React from "react";

/**
 * Dynamic Robotics & Integrations — Button
 * Primary action element. Spring lift on hover, colored glow, a light-sweep
 * sheen on filled variants, sliding icons, and a snappy tactile press.
 */

const SPRING = "cubic-bezier(0.34, 1.4, 0.5, 1)";
const SNAP = "cubic-bezier(0.2, 0, 0.1, 1)";

export function Button({
  children,
  variant = "primary",
  size = "md",
  onDark = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: "var(--text-sm)", padding: "0 14px", height: 36, gap: 7 },
    md: { fontSize: "var(--text-md)", padding: "0 20px", height: 44, gap: 9 },
    lg: { fontSize: "var(--text-lg)", padding: "0 28px", height: 54, gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: { background: "var(--color-primary)", color: "var(--color-on-primary)", border: "1px solid var(--color-primary)" },
    secondary: { background: "var(--surface-page)", color: "var(--text-strong)", border: "1px solid var(--border-default)" },
    ghost: { background: "transparent", color: "var(--text-strong)", border: "1px solid transparent" },
    inverse: { background: "#ffffff", color: "var(--neutral-900)", border: "1px solid #ffffff" },
    danger: { background: "var(--status-danger)", color: "#fff", border: "1px solid var(--status-danger)" },
  };
  const v = variants[variant] || variants.primary;

  // On dark backgrounds, ghost/secondary need light text + a translucent hover
  // (their default light surface fill would render white-on-white otherwise).
  const vDark = onDark
    ? {
        ghost: { color: "#fff", border: "1px solid transparent" },
        secondary: { color: "#fff", border: "1px solid rgba(255,255,255,0.32)", background: "transparent" },
      }[variant]
    : null;
  const vBase = { ...v, ...(vDark || {}) };

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const active = hover && !disabled;

  const hoverBg = {
    primary: "var(--color-primary-hover)",
    secondary: onDark ? "rgba(255,255,255,0.10)" : "var(--surface-muted)",
    ghost: onDark ? "rgba(255,255,255,0.14)" : "var(--surface-muted)",
    inverse: "var(--neutral-100)",
    danger: "#b93131",
  }[variant];

  const filled = variant === "primary" || variant === "danger";

  // Hover elevation per variant.
  const hoverShadow = {
    primary: "0 10px 22px rgba(46,151,62,0.32), 0 3px 8px rgba(20,22,20,0.12)",
    danger: "0 10px 22px rgba(207,59,59,0.30), 0 3px 8px rgba(20,22,20,0.12)",
    inverse: "0 10px 22px rgba(20,22,20,0.22), 0 3px 8px rgba(20,22,20,0.14)",
    secondary: "0 6px 16px rgba(20,22,20,0.10), 0 2px 5px rgba(20,22,20,0.06)",
    ghost: "none",
  }[variant];

  const restShadow = variant === "ghost" ? "none" : "0 1px 2px rgba(20,22,20,0.08)";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: s.height,
        padding: s.padding,
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-body)",
        fontSize: s.fontSize,
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1,
        letterSpacing: "0.01em",
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transform: disabled ? "none" : press ? "translateY(0) scale(0.96)" : active ? "translateY(-2px) scale(1.015)" : "translateY(0) scale(1)",
        boxShadow: disabled ? "none" : press ? "0 1px 3px rgba(20,22,20,0.18)" : active ? hoverShadow : restShadow,
        transition: "transform var(--dur-base) " + SPRING + ", box-shadow var(--dur-base) " + SNAP + ", background var(--dur-fast), border-color var(--dur-fast)",
        ...vBase,
        ...(active ? { background: hoverBg, ...(variant === "secondary" ? { borderColor: onDark ? "rgba(255,255,255,0.5)" : "var(--border-strong)" } : {}) } : {}),
        ...style,
      }}
      {...rest}
    >
      {/* light-sweep sheen (filled variants only) */}
      {filled && !disabled && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, bottom: 0, left: 0, width: "55%",
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)",
            transform: hover ? "translateX(240%) skewX(-12deg)" : "translateX(-170%) skewX(-12deg)",
            transition: "transform 640ms " + SNAP,
            pointerEvents: "none",
          }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: s.gap }}>
        {iconLeft && (
          <span style={{ display: "inline-flex", transform: active ? "translateX(-2px)" : "none", transition: "transform var(--dur-base) " + SPRING }}>
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span style={{ display: "inline-flex", transform: active ? "translateX(3px)" : "none", transition: "transform var(--dur-base) " + SPRING }}>
            {iconRight}
          </span>
        )}
      </span>
    </button>
  );
}
