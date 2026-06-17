import React from "react";

/**
 * Dynamic Robotics & Integrations — Input
 * Text field for forms (contact, quote, discovery).
 */
export function Input({
  label = null,
  hint = null,
  error = null,
  type = "text",
  size = "md",
  fullWidth = true,
  multiline = false,
  rows = 4,
  iconLeft = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { sm: 36, md: 44, lg: 52 };
  const h = heights[size] || 44;
  const borderColor = error
    ? "var(--status-danger)"
    : focus
    ? "var(--border-focus)"
    : "var(--border-default)";

  const fieldStyle = {
    width: "100%",
    height: multiline ? "auto" : h,
    minHeight: multiline ? h + 24 : undefined,
    padding: multiline ? "11px 14px" : iconLeft ? "0 14px 0 40px" : "0 14px",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-md)",
    color: "var(--text-strong)",
    background: disabled ? "var(--surface-muted)" : "var(--surface-page)",
    border: `1px solid ${borderColor}`,
    borderRadius: "var(--radius-sm)",
    boxShadow: focus ? "var(--shadow-focus)" : "none",
    outline: "none",
    resize: multiline ? "vertical" : undefined,
    lineHeight: multiline ? 1.5 : undefined,
    transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
    boxSizing: "border-box",
  };

  const Field = multiline ? "textarea" : "input";

  return (
    <div style={{ width: fullWidth ? "100%" : "auto", fontFamily: "var(--font-body)", ...style }}>
      {label && (
        <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-strong)", marginBottom: 7 }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {iconLeft && !multiline && (
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", pointerEvents: "none" }}>
            {iconLeft}
          </span>
        )}
        <Field
          type={multiline ? undefined : type}
          rows={multiline ? rows : undefined}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={fieldStyle}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <div style={{ marginTop: 6, fontSize: "var(--text-xs)", color: error ? "var(--status-danger)" : "var(--text-muted)" }}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
