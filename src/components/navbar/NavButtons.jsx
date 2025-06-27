import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Minimal SVG icons
const icons = {
  home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  dashboard: (
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  ),
  about: (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  ),
  login: (
    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
  ),
  register: (
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  ),
};

const Icon = ({ name }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    {icons[name]}
  </svg>
);

function NavButtons({ isLoggedIn, onRegisterClick, onLoginClick, navigate }) {
  const links = isLoggedIn
    ? [
        { label: "Home", icon: "home", action: () => navigate("/") },
        { label: "About", icon: "about", action: () => navigate("/about") },
        {
          label: "Transactions",
          icon: "dashboard",
          action: () => navigate("/dashboard"),
        },
      ]
    : [
        { label: "Home", icon: "home", action: () => navigate("/") },
        { label: "About", icon: "about", action: () => navigate("/about") },
        {
          label: "Register",
          icon: "register",
          action: onRegisterClick,
          variant: "outlined",
          color: "success",
        },
        {
          label: "Sign In",
          icon: "login",
          action: onLoginClick,
          variant: "contained",
        },
      ];

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {links.map(({ label, icon, action, variant = "text", color }) => (
        <Button
          key={label}
          variant={variant}
          color={color}
          onClick={action}
          startIcon={<Icon name={icon} />}
          sx={{
            minHeight: 44,
            px: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "0.875rem",
            textTransform: "none",
            color: variant === "text" ? "#64748b" : undefined,
            borderWidth: variant === "outlined" ? 1.5 : undefined,
            bgcolor: variant === "contained" ? "#1e293b" : undefined,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              bgcolor:
                variant === "text"
                  ? "rgba(100,116,139,0.08)"
                  : variant === "contained"
                  ? "#0f172a"
                  : undefined,
              boxShadow:
                variant === "contained"
                  ? "0 4px 12px rgba(0,0,0,0.15)"
                  : undefined,
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}

export default NavButtons;