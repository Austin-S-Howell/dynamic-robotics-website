import React from "react";

/**
 * Dynamic Robotics & Integrations — Card
 * Surface container. Optional hover lift and accent top-rule.
 */
export function Card({
  children,
  interactive = false,
  accent = false,
  padding = "var(--space-5)",
  style = {},
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: interactive && hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: interactive && hover ? "translateY(-3px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {accent && (
        <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--color-primary)" }} />
      )}
      {children}
    </div>
  );
}
