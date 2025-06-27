import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// Professional SVG-based icons
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const IncomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14l5-5 5 5z" />
  </svg>
);

const ExpenseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const AboutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const LoginIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
  </svg>
);

const RegisterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// Professional Button Component
const ProfessionalNavButton = styled(Button)(
  ({ theme, variant, buttoncolor }) => ({
    minHeight: 44,
    paddingX: theme.spacing(3),
    paddingY: theme.spacing(1.5),
    borderRadius: 8,
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "none",
    letterSpacing: "0.025em",
    position: "relative",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

    // Text variant styling
    ...(variant === "text" && {
      color: "#64748b",
      "&:hover": {
        backgroundColor: "rgba(100, 116, 139, 0.08)",
        color: "#334155",
      },
    }),

    // Outlined variant styling
    ...(variant === "outlined" && {
      borderWidth: 1.5,
      borderColor:
        buttoncolor === "success"
          ? "#22c55e"
          : buttoncolor === "error"
          ? "#ef4444"
          : "#e2e8f0",
      color:
        buttoncolor === "success"
          ? "#16a34a"
          : buttoncolor === "error"
          ? "#dc2626"
          : "#64748b",
      "&:hover": {
        borderColor:
          buttoncolor === "success"
            ? "#16a34a"
            : buttoncolor === "error"
            ? "#dc2626"
            : "#94a3b8",
        backgroundColor:
          buttoncolor === "success"
            ? "rgba(34, 197, 94, 0.04)"
            : buttoncolor === "error"
            ? "rgba(239, 68, 68, 0.04)"
            : "rgba(100, 116, 139, 0.04)",
        transform: "translateY(-1px)",
      },
    }),

    // Contained variant styling
    ...(variant === "contained" && {
      backgroundColor: "#1e293b",
      color: "white",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      "&:hover": {
        backgroundColor: "#0f172a",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        transform: "translateY(-1px)",
      },
    }),

    // Icon spacing
    "& .MuiButton-startIcon": {
      marginRight: theme.spacing(1),
      marginLeft: 0,
    },
  })
);

function NavButtons({
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
  onShowAddIncome,
  onShowAddExpense,
  navigate,
}) {
  const mainNavLinks = !isLoggedIn
    ? [
        {
          label: "Home",
          action: () => navigate("/"),
          icon: <HomeIcon />,
          variant: "text",
        },
        {
          label: "About",
          action: () => navigate("/about"),
          icon: <AboutIcon />,
          variant: "text",
        },
        {
          label: "Register",
          action: onRegisterClick,
          icon: <RegisterIcon />,
          variant: "outlined",
          buttoncolor: "success",
        },
        {
          label: "Sign In",
          action: onLoginClick,
          icon: <LoginIcon />,
          variant: "contained",
        },
      ]
    : [
        {
          label: "Home",
          action: () => navigate("/"),
          icon: <HomeIcon />,
          variant: "text",
        },
        {
          label: "About",
          action: () => navigate("/about"),
          icon: <AboutIcon />,
          variant: "text",
        },
        {
          label: "Dashboard",
          action: () => navigate("/dashboard"),
          icon: <DashboardIcon />,
          variant: "text",
        },
        {
          label: "Add Income",
          action: onShowAddIncome,
          icon: <IncomeIcon />,
          variant: "outlined",
          buttoncolor: "success",
        },
        {
          label: "Add Expense",
          action: onShowAddExpense,
          icon: <ExpenseIcon />,
          variant: "outlined",
          buttoncolor: "error",
        },
      ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: "100%",
      }}
    >
      {mainNavLinks.map((link) => (
        <ProfessionalNavButton
          key={link.label}
          variant={link.variant}
          buttoncolor={link.buttoncolor}
          onClick={link.action}
          startIcon={link.icon}
        >
          {link.label}
        </ProfessionalNavButton>
      ))}
    </Box>
  );
}

export default NavButtons;