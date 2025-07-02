import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// Icons
const HomeIcon = () => <span style={{ fontSize: "20px" }}>🏠</span>;
const DashboardIcon = () => <span style={{ fontSize: "20px" }}>📊</span>;
const IncomeIcon = () => (
  <span style={{ fontSize: "20px", color: "#2e7d32" }}>💰</span>
);
const ExpenseIcon = () => (
  <span style={{ fontSize: "20px", color: "#c62828" }}>💸</span>
);
const ProfileIcon = () => <span style={{ fontSize: "20px" }}>👤</span>;
const LogoutIcon = () => <span style={{ fontSize: "20px" }}>🚪</span>;
const LoginIcon = () => <span style={{ fontSize: "20px" }}>🔑</span>;
const RegisterIcon = () => <span style={{ fontSize: "20px" }}>📝</span>;
const SummaryIcon = () => <span style={{ fontSize: "18px" }}>📋</span>;
const ReportIcon = () => <span style={{ fontSize: "18px" }}>📄</span>;
const DownloadIcon = () => <span style={{ fontSize: "18px" }}>💾</span>;
const AboutIcon = () => <span style={{ fontSize: "20px" }}>ℹ️</span>;

function MobileDrawer({
  open,
  onClose,
  isLoggedIn,
  user,
  onRegisterClick,
  onLoginClick,
  onLogout,
  onShowAddIncome,
  onShowAddExpense,
  navigate,
  reportsAPI,
}) {
  const mainNavLinks = !isLoggedIn
    ? [
        { label: "Home", action: () => navigate("/"), icon: <HomeIcon /> },
        { label: "About Us", action: () => navigate("/about"), icon: <AboutIcon /> },
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
        { label: "About Us", action: () => navigate("/about"), icon: <AboutIcon /> },
        {
          label: "Transactions",
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

  const reportsMenuItems = [
    {
      label: "Daily Summary",
      action: () => reportsAPI.handleGetSummary("daily"),
      icon: <SummaryIcon />,
      description: "View daily financial summary",
    },
    {
      label: "Monthly Summary",
      action: () => reportsAPI.handleGetSummary("monthly"),
      icon: <SummaryIcon />,
      description: "View monthly financial summary",
    },
    {
      label: "Yearly Summary",
      action: () => reportsAPI.handleGetSummary("yearly"),
      icon: <SummaryIcon />,
      description: "View yearly financial summary",
    },
    {
      label: "Custom Report",
      action: reportsAPI.handleCustomReport,
      icon: <ReportIcon />,
      description: "Generate custom filtered report",
    },
    {
      label: "Daily PDF",
      action: () => reportsAPI.handleDownloadReport("daily"),
      icon: <DownloadIcon />,
      description: "Download daily report as PDF",
    },
    {
      label: "Monthly PDF",
      action: () => reportsAPI.handleDownloadReport("monthly"),
      icon: <DownloadIcon />,
      description: "Download monthly report as PDF",
    },
    {
      label: "Yearly PDF",
      action: () => reportsAPI.handleDownloadReport("yearly"),
      icon: <DownloadIcon />,
      description: "Download yearly report as PDF",
    },
  ];

  const profileMenuItems = [
    {
      label: "Profile",
      action: () => navigate("/profile"),
      icon: <ProfileIcon />,
    },
    { label: "Logout", action: onLogout, icon: <LogoutIcon />, color: "error" },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: { xs: 280, sm: 320 },
          bgcolor: "#fafafa",
          zIndex: (theme) => theme.zIndex.drawer + 5,
        },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 5,
        "& .MuiDrawer-paper": {
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ p: 3, bgcolor: "white", borderBottom: "1px solid #e2e8f0" }}>
        {isLoggedIn && user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: "#f1f5f9",
                color: "#475569",
                border: "2px solid #e2e8f0",
                fontSize: "1.5rem",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color="#1e293b">
                {user?.name || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "user@example.com"}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="h6" fontWeight={600} color="#1e293b">
            💼 FinanceTracker
          </Typography>
        )}
      </Box>

      <List sx={{ pt: 2 }}>
        {mainNavLinks.map((link) => (
          <ListItem
            key={link.label}
            onClick={() => {
              onClose();
              link.action();
            }}
            sx={{
              py: 1.5,
              px: 3,
              mx: 2,
              mb: 1,
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                bgcolor:
                  link.color === "primary"
                    ? "rgba(21, 101, 192, 0.08)"
                    : link.color === "success"
                    ? "rgba(46, 125, 50, 0.08)"
                    : link.color === "error"
                    ? "rgba(198, 40, 40, 0.08)"
                    : "rgba(0,0,0,0.04)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{link.icon}</ListItemIcon>
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{
                fontWeight: 600,
                color:
                  link.color === "primary"
                    ? "#1565c0"
                    : link.color === "success"
                    ? "#2e7d32"
                    : link.color === "error"
                    ? "#c62828"
                    : "#374151",
              }}
            />
          </ListItem>
        ))}

        {/* Reports Section */}
        {isLoggedIn && (
          <>
            <Divider sx={{ my: 2, mx: 2 }} />
            <Typography
              variant="overline"
              sx={{
                px: 3,
                color: "#64748b",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              Reports
            </Typography>
            {reportsMenuItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => {
                  onClose();
                  item.action();
                }}
                sx={{
                  py: 1.5,
                  px: 3,
                  mx: 2,
                  mb: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: "#374151",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "0.75rem",
                  }}
                />
              </ListItem>
            ))}
          </>
        )}

        {/* Profile */}
        {isLoggedIn && (
          <>
            <Divider sx={{ my: 2, mx: 2 }} />
            {profileMenuItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => {
                  onClose();
                  item.action();
                }}
                sx={{
                  py: 1.5,
                  px: 3,
                  mx: 2,
                  mb: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor:
                      item.color === "error"
                        ? "rgba(198, 40, 40, 0.08)"
                        : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: item.color === "error" ? "#c62828" : "#374151",
                  }}
                />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
}

export default MobileDrawer;