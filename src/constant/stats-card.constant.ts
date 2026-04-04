export const statsCardVariants = {
  primary: {
    border: "border-(--color-primary)/30",
    corner: "border-(--color-primary)",
    iconBg: "bg-primary/10",
    glow: "shadow-[0_4px_16px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
  },
  danger: {
    border: "border-(--color-danger)/30",
    corner: "border-(--color-danger)",
    iconBg: "bg-danger/10",
    glow: "shadow-[0_4px_16px_color-mix(in_srgb,var(--color-danger)_12%,transparent)]",
  },
  accent: {
    border: "border-(--color-accent)/30",
    corner: "border-(--color-accent)",
    iconBg: "bg-accent/10",
    glow: "shadow-[0_4px_16px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]",
  },
  warning: {
    border: "border-(--color-warning)/30",
    corner: "border-(--color-warning)",
    iconBg: "bg-warning/10",
    glow: "shadow-[0_4px_16px_color-mix(in_srgb,var(--color-warning)_12%,transparent)]",
  },
} as const;
