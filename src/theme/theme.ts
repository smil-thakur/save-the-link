import { alpha, createTheme, type ThemeOptions } from "@mui/material";

// Design tokens — see design plan: cool ink/paper neutrals, one confident cobalt
// accent (professional/workplace register, distinct from any single vendor's hue),
// a genuinely distinct elevated "surface" tone for dialogs/menus/popovers.
const ink = "#14161C";
const paper = "#FAFAF8";
const surfaceLight = "#FFFFFF";
const accentLight = "#2452E0";
const accentLightDeep = "#152C6B";

const darkBase = "#0F1115";
const surfaceDark = "#1B1E26";
const accentDark = "#5B8DFF";
const accentDarkDeep = "#2452E0";

const fontFamily = '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif';
const monoFontFamily = '"IBM Plex Mono", "SFMono-Regular", Menlo, monospace';

const shared: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily,
    fontWeightBold: 600,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
        contained: ({ theme }) => ({
          boxShadow: `0 1px 2px ${alpha(theme.palette.primary.main, 0.35)}`,
          "&:hover": {
            boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 16px 40px rgba(0,0,0,0.5)"
              : "0 16px 40px rgba(20,22,28,0.16)",
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 24px rgba(0,0,0,0.5)"
              : "0 8px 24px rgba(20,22,28,0.14)",
        }),
      },
    },
  },
};

export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: "dark",
    primary: { main: accentDark, dark: accentDarkDeep, contrastText: "#0A0C10" },
    secondary: { main: "#8B93A1" },
    background: {
      default: darkBase,
      paper: surfaceDark,
    },
  },
});

export const lightTheme = createTheme({
  ...shared,
  palette: {
    mode: "light",
    primary: { main: accentLight, dark: accentLightDeep, contrastText: "#FFFFFF" },
    secondary: { main: "#5B6472" },
    text: {
      primary: ink,
    },
    background: {
      default: paper,
      paper: surfaceLight,
    },
  },
});

export const monoFont = monoFontFamily;
