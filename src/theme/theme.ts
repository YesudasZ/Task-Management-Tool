import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#9C27B0", // Purple color from the design
      light: "#BA68C8",
      dark: "#7B1FA2",
    },
    secondary: {
      main: "#F3E5F5", // Light purple for backgrounds
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
        containedPrimary: {
          color: "#fff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
})