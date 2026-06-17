import React from "react";

/**
 * Dynamic Robotics & Integrations — Select
 * A polished custom dropdown. Supports single and multi-select,
 * optional groups, smooth open animation, and keyboard escape.
 *
 * options: Array<{ value, label, hint?, group? }>
 */
export function Select({
  options = [],
  value = null,          // string (single) | string[] (multi)
  onChange,
  placeholder = "Select an option",
  label = null,
  multiple = false,
  disabled = false,
  size = "md",
  fullWidth = true,
  style = {},
}) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const rootRef = React.useRef(null);

  const selected = multiple ? (Array.isArray(value) ? value : []) : value;

  React.useEffect(() => {
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const heights = { sm: 36, md: 44, lg: 52 };
  const h = heights[size] || 44;

  function pick(opt) {
    if (multiple) {
      const set = new Set(selected);
      set.has(opt.value) ? set.delete(opt.value) : set.add(opt.value);
      onChange && onChange(Array.from(set));
    } else {
      onChange && onChange(opt.value);
      setOpen(false);
    }
  }

  function isSelected(v) {
    return multiple ? selected.includes(v) : selected === v;
  }

  let triggerText = placeholder;
  let isPlaceholder = true;
  if (multiple && selected.length) {
    triggerText = selected.length === 1
      ? (options.find((o) => o.value === selected[0])?.label || `${selected.length} selected`)
      : `${selected.length} selected`;
    isPlaceholder = false;
  } else if (!multiple && selected != null) {
    const o = options.find((o) => o.value === selected);
    if (o) { triggerText = o.label; isPlaceholder = false; }
  }

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-strong)",
            marginBottom: 7,
          }}
        >
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          width: "100%",
          height: h,
          padding: "0 14px",
          background: "var(--surface-page)",
          border: `1px solid ${open ? "var(--border-focus)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-sm)",
          boxShadow: open ? "var(--shadow-focus)" : "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          fontSize: "var(--text-md)",
          color: isPlaceholder ? "var(--text-muted)" : "var(--text-strong)",
          transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
          textAlign: "left",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {triggerText}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          style={{ flexShrink: 0, transition: "transform var(--dur-base) var(--ease-out)", transform: open ? "rotate(180deg)" : "none", color: "var(--text-muted)" }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="listbox"
        style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          zIndex: 40,
          background: "var(--surface-page)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          padding: 6,
          maxHeight: 280,
          overflowY: "auto",
          transformOrigin: "top",
          transform: open ? "translateY(0) scaleY(1)" : "translateY(-6px) scaleY(0.96)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        }}
      >
        {options.map((opt, i) => {
          const sel = isSelected(opt.value);
          const hot = active === i;
          return (
            <div
              key={opt.value}
              role="option"
              aria-selected={sel}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(-1)}
              onClick={() => pick(opt)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "9px 10px",
                borderRadius: "var(--radius-xs)",
                cursor: "pointer",
                background: sel ? "var(--color-primary-tint)" : hot ? "var(--surface-muted)" : "transparent",
                transition: "background var(--dur-fast)",
              }}
            >
              {multiple && (
                <span
                  style={{
                    width: 18, height: 18, flexShrink: 0,
                    borderRadius: "var(--radius-xs)",
                    border: `1.5px solid ${sel ? "var(--color-primary)" : "var(--border-strong)"}`,
                    background: sel ? "var(--color-primary)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all var(--dur-fast)",
                  }}
                >
                  {sel && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5 9-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              )}
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: "block",
                  fontSize: "var(--text-md)",
                  fontWeight: sel ? "var(--weight-medium)" : "var(--weight-regular)",
                  color: "var(--text-strong)",
                }}>
                  {opt.label}
                </span>
                {opt.hint && (
                  <span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 1 }}>
                    {opt.hint}
                  </span>
                )}
              </span>
              {!multiple && sel && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-primary)", flexShrink: 0 }}>
                  <path d="M5 12l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
