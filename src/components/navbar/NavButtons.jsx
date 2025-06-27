import Button from "@mui/material/Button";

// Icons
const HomeIcon = () => <span style={{ fontSize: "20px" }}>🏠</span>;
const DashboardIcon = () => <span style={{ fontSize: "20px" }}>📊</span>;
const IncomeIcon = () => (
  <span style={{ fontSize: "20px", color: "#2e7d32" }}>💰</span>
);
const ExpenseIcon = () => (
  <span style={{ fontSize: "20px", color: "#c62828" }}>💸</span>
);
const LoginIcon = () => <span style={{ fontSize: "20px" }}>🔑</span>;
const RegisterIcon = () => <span style={{ fontSize: "20px" }}>📝</span>;

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
        { label: "Home", action: () => navigate("/"), icon: <HomeIcon /> },
        { label: "Register", action: onRegisterClick, icon: <RegisterIcon /> },
        {
          label: "Login",
          action: onLoginClick,
          icon: <LoginIcon />,
          color: "primary",
        },
      ]
    : [
        { label: "Home", action: () => navigate("/"), icon: <HomeIcon /> },
        {
          label: "Dashboard",
          action: () => navigate("/dashboard"),
          icon: <DashboardIcon />,
        },
        {
          label: "Add Income",
          action: onShowAddIncome,
          icon: <IncomeIcon />,
          color: "success",
        },
        {
          label: "Add Expense",
          action: onShowAddExpense,
          icon: <ExpenseIcon />,
          color: "error",
        },
      ];

  return (
    <>
      {mainNavLinks.map((link) => (
        <Button
          key={link.label}
          variant={link.color === "primary" ? "contained" : "text"}
          color={link.color || "inherit"}
          onClick={link.action}
          startIcon={link.icon}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 2.5,
            py: 1,
            textTransform: "none",
            fontSize: "0.9rem",
            color: link.color ? undefined : "#374151",
            "&:hover": {
              bgcolor:
                link.color === "primary" ? undefined : "rgba(0,0,0,0.04)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
            boxShadow:
              link.color === "primary"
                ? "0 4px 12px rgba(21, 101, 192, 0.3)"
                : "none",
          }}
        >
          {link.label}
        </Button>
      ))}
    </>
  );
}

export default NavButtons;