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
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onRegisterClick, onLoginClick, onLogout, isLoggedIn }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = !isLoggedIn
    ? [
        { label: "Register", action: onRegisterClick },
        { label: "Login", action: onLoginClick, color: "primary" },
      ]
    : [
        { label: "Dashboard", action: () => navigate("/dashboard") },
        { label: "Profile", action: () => navigate("/profile") },
        { label: "Logout", action: onLogout, color: "error" },
      ];

  return (
    <AppBar position="sticky" color="inherit" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, letterSpacing: "-1px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Financial Tracker
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant={link.color === "primary" ? "contained" : "outlined"}
              color={link.color || "primary"}
              onClick={link.action}
              sx={{
                borderRadius: 8,
                fontWeight: 600,
                px: 3,
                boxShadow: link.color === "primary" ? 2 : 0,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        <IconButton
          edge="end"
          color="primary"
          sx={{ display: { md: "none" } }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 220 }}>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.label}
                onClick={() => {
                  setDrawerOpen(false);
                  link.action();
                }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
