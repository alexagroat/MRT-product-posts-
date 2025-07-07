import { createTheme, alpha } from "@mui/material/styles"

// Brand Colors from the provided palette
const brandColors = {
  teal: "#01CAC5", // Primary - Teal
  purple: "#735BCF", // Secondary - Purple
  coral: "#E24850", // Accent - Coral (use sparingly)
  lavender: "#F3F3F8", // Light background - Lavender
  navy: "#0F263D", // Dark text - Navy
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brandColors.teal, // Teal as primary
      light: alpha(brandColors.teal, 0.7),
      dark: alpha(brandColors.teal, 0.8),
      contrastText: "#ffffff",
    },
    secondary: {
      main: brandColors.purple, // Purple as secondary
      light: alpha(brandColors.purple, 0.7),
      dark: alpha(brandColors.purple, 0.8),
      contrastText: "#ffffff",
    },
    error: {
      main: brandColors.coral, // Coral for errors
      light: alpha(brandColors.coral, 0.7),
      dark: alpha(brandColors.coral, 0.8),
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b", // Keep standard warning orange
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    info: {
      main: brandColors.purple, // Use purple for info states
      light: alpha(brandColors.purple, 0.7),
      dark: alpha(brandColors.purple, 0.8),
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981", // Keep standard success green
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    grey: {
      50: brandColors.lavender, // Use lavender for lightest grey
      100: "#f1f2f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: brandColors.navy, // Use navy for dark grey
      900: alpha(brandColors.navy, 0.9),
    },
    background: {
      default: brandColors.lavender, // Lavender background
      paper: "#ffffff",
    },
    text: {
      primary: brandColors.navy, // Navy for primary text
      secondary: alpha(brandColors.navy, 0.7),
      disabled: alpha(brandColors.navy, 0.4),
    },
    divider: alpha(brandColors.navy, 0.12),
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
      color: brandColors.navy,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.3,
      letterSpacing: "-0.025em",
      color: brandColors.navy,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      letterSpacing: "-0.025em",
      color: brandColors.navy,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
      color: brandColors.navy,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.4,
      color: brandColors.navy,
    },
    body1: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: brandColors.navy,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.8125rem",
      lineHeight: 1.4,
      color: alpha(brandColors.navy, 0.8),
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      textTransform: "none",
      letterSpacing: "0.025em",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.4,
      color: alpha(brandColors.navy, 0.6),
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    `0px 1px 2px ${alpha(brandColors.navy, 0.05)}`,
    `0px 1px 3px ${alpha(brandColors.navy, 0.1)}, 0px 1px 2px ${alpha(brandColors.navy, 0.06)}`,
    `0px 4px 6px -1px ${alpha(brandColors.navy, 0.1)}, 0px 2px 4px -1px ${alpha(brandColors.navy, 0.06)}`,
    `0px 10px 15px -3px ${alpha(brandColors.navy, 0.1)}, 0px 4px 6px -2px ${alpha(brandColors.navy, 0.05)}`,
    `0px 20px 25px -5px ${alpha(brandColors.navy, 0.1)}, 0px 10px 10px -5px ${alpha(brandColors.navy, 0.04)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
    `0px 25px 50px -12px ${alpha(brandColors.navy, 0.25)}`,
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: `${alpha(brandColors.navy, 0.3)} ${brandColors.lavender}`,
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: brandColors.lavender,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(brandColors.navy, 0.3),
            borderRadius: 4,
            "&:hover": {
              backgroundColor: alpha(brandColors.navy, 0.5),
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: `0px 4px 8px ${alpha(brandColors.navy, 0.12)}`,
          },
        },
        contained: {
          boxShadow: `0px 1px 2px ${alpha(brandColors.navy, 0.05)}`,
          "&:hover": {
            boxShadow: `0px 4px 8px ${alpha(brandColors.navy, 0.12)}`,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${brandColors.teal} 0%, ${alpha(brandColors.teal, 0.8)} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${alpha(brandColors.teal, 0.9)} 0%, ${alpha(brandColors.teal, 0.7)} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${brandColors.purple} 0%, ${alpha(brandColors.purple, 0.8)} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${alpha(brandColors.purple, 0.9)} 0%, ${alpha(brandColors.purple, 0.7)} 100%)`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${alpha(brandColors.navy, 0.08)}`,
        },
        elevation1: {
          boxShadow: `0px 1px 2px ${alpha(brandColors.navy, 0.05)}`,
        },
        elevation2: {
          boxShadow: `0px 1px 3px ${alpha(brandColors.navy, 0.1)}, 0px 1px 2px ${alpha(brandColors.navy, 0.06)}`,
        },
        elevation3: {
          boxShadow: `0px 4px 6px -1px ${alpha(brandColors.navy, 0.1)}, 0px 2px 4px -1px ${alpha(brandColors.navy, 0.06)}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${alpha(brandColors.navy, 0.08)}`,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0px 10px 15px -3px ${alpha(brandColors.navy, 0.1)}, 0px 4px 6px -2px ${alpha(brandColors.navy, 0.05)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
          height: 28,
          "& .MuiChip-label": {
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
        outlined: {
          borderWidth: 1.5,
        },
        colorPrimary: {
          backgroundColor: alpha(brandColors.teal, 0.1),
          color: brandColors.teal,
          borderColor: alpha(brandColors.teal, 0.3),
        },
        colorSecondary: {
          backgroundColor: alpha(brandColors.purple, 0.1),
          color: brandColors.purple,
          borderColor: alpha(brandColors.purple, 0.3),
        },
        colorError: {
          backgroundColor: alpha(brandColors.coral, 0.1),
          color: brandColors.coral,
          borderColor: alpha(brandColors.coral, 0.3),
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(brandColors.navy, 0.08)}`,
          padding: "12px 16px",
        },
        head: {
          fontWeight: 600,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: alpha(brandColors.navy, 0.7),
          backgroundColor: alpha(brandColors.lavender, 0.5),
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: alpha(brandColors.teal, 0.03),
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: alpha(brandColors.navy, 0.1),
        },
        bar: {
          borderRadius: 4,
        },
        colorPrimary: {
          "& .MuiLinearProgress-bar": {
            backgroundColor: brandColors.teal,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(brandColors.navy, 0.2),
            borderWidth: 1.5,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(brandColors.teal, 0.5),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: brandColors.teal,
            borderWidth: 2,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: `1px solid ${alpha(brandColors.navy, 0.08)}`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: alpha(brandColors.teal, 0.08),
          },
        },
        colorPrimary: {
          color: brandColors.teal,
          "&:hover": {
            backgroundColor: alpha(brandColors.teal, 0.08),
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: brandColors.teal,
          color: "#ffffff",
        },
        colorPrimary: {
          backgroundColor: brandColors.teal,
        },
        colorSecondary: {
          backgroundColor: brandColors.purple,
        },
      },
    },
  },
})
