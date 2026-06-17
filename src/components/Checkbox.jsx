import React from "react";

/**
 * Dynamic Robotics & Integrations — Checkbox
 */
export function Checkbox({
  checked = false,
  onChange,
  label = null,
  hint = null,
  disabled = false,
  style = {},
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: hint ? "flex-start" : "center",
        gap: 11,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          width: 20, height: 20, flexShrink: 0, marginTop: hint ? 1 : 0,
          borderRadius: "var(--radius-xs)",
          border: `1.5px solid ${checked ? "var(--color-primary)" : "var(--border-strong)"}`,
          background: checked ? "var(--color-primary)" : "var(--surface-page)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all var(--dur-fast) var(--ease-standard)",
        }}
      >
        {checked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5 9-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && (
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", fontSize: "var(--text-md)", color: "var(--text-strong)", lineHeight: 1.3 }}>{label}</span>
          {hint && <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 2 }}>{hint}</span>}
        </span>
      )}
    </label>
  );
}
