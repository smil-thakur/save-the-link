import { alpha, type Theme } from "@mui/material";

/** Subtle dot-grid canvas texture — theme-aware, works in light and dark. */
export const dotGridSx = (theme: Theme) => {
  const dot = alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.16 : 0.1);

  return {
    backgroundImage: `radial-gradient(${dot} 1px, transparent 1px)`,
    backgroundSize: "22px 22px",
  };
};
