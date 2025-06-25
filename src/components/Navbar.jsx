import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";

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

function Navbar({ onRegisterClick, onLoginClick, onLogout, isLoggedIn, user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleAddIncomeSuccess = () => {
    setShowAddIncome(false);
    // Optionally refresh data if needed
  };

  const handleAddExpenseSuccess = () => {
    setShowAddExpense(false);
    // Optionally refresh data if needed
  };

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
          action: () => setShowAddIncome(true),
          icon: <IncomeIcon />,
          color: "success",
        },
        {
          label: "Add Expense",
          action: () => setShowAddExpense(true),
          icon: <ExpenseIcon />,
          color: "error",
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
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 },
            py: 1,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #1565c0 0%, #2e7d32 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
            onClick={() => navigate("/")}
          >
            💼 FinanceTracker
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
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

            {/* Profile Menu for Desktop */}
            {isLoggedIn && (
              <Box sx={{ ml: 2 }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      p: 0,
                      "&:hover": { transform: "scale(1.05)" },
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#f1f5f9",
                        color: "#475569",
                        border: "2px solid #e2e8f0",
                        fontSize: "1.2rem",
                      }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 8,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                      mt: 1.5,
                      minWidth: 180,
                      borderRadius: 2,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {profileMenuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={item.action}
                      sx={{
                        py: 1.5,
                        px: 2,
                        color: item.color === "error" ? "#c62828" : "#374151",
                        "&:hover": {
                          bgcolor:
                            item.color === "error" ? "#ffebee" : "#f8fafc",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {item.icon}
                      </ListItemIcon>
                      <Typography variant="body2" fontWeight={500}>
                        {item.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            sx={{
              display: { lg: "none" },
              color: "#374151",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.04)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: 280, sm: 320 },
            bgcolor: "#fafafa",
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
          {mainNavLinks.map((link, index) => (
            <ListItem
              key={link.label}
              onClick={() => {
                setDrawerOpen(false);
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
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                {link.icon}
              </ListItemIcon>
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

          {isLoggedIn && (
            <>
              <Divider sx={{ my: 2, mx: 2 }} />
              {profileMenuItems.map((item) => (
                <ListItem
                  key={item.label}
                  onClick={() => {
                    setDrawerOpen(false);
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
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
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

      {/* Add Income Modal */}
      <Modal open={showAddIncome} onClose={() => setShowAddIncome(false)}>
        <AddIncomeSection onSuccess={handleAddIncomeSuccess} />
      </Modal>

      {/* Add Expense Modal */}
      <Modal open={showAddExpense} onClose={() => setShowAddExpense(false)}>
        <AddExpenseSection onSuccess={handleAddExpenseSuccess} />
      </Modal>
    </>
  );
}

export default Navbar;
