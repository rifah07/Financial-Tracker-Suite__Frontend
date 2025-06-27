import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const IncomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14l5-5 5 5z" />
  </svg>
);

const ExpenseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

function ProfileMenu({
  user,
  onLogout,
  navigate,
  onShowAddIncome,
  onShowAddExpense,
}) {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const profileMenuItems = [
    {
      label: "Add Income",
      action: () => {
        handleProfileMenuClose();
        onShowAddIncome();
      },
      icon: <IncomeIcon />,
      color: "success",
    },
    {
      label: "Add Expense",
      action: () => {
        handleProfileMenuClose();
        onShowAddExpense();
      },
      icon: <ExpenseIcon />,
      color: "error",
    },
    {
      label: "Profile",
      action: () => {
        handleProfileMenuClose();
        navigate("/profile");
      },
      icon: <ProfileIcon />,
    },
    {
      label: "Logout",
      action: () => {
        handleProfileMenuClose();
        onLogout();
      },
      icon: <LogoutIcon />,
      color: "error",
    },
  ];

  return (
    <Box sx={{ ml: 2 }}>
      <Tooltip title="Account menu">
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
              fontWeight: 600,
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
        PaperProps={{
          elevation: 12,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 4px 16px rgba(0,0,0,0.12))",
            mt: 1.5,
            minWidth: 200,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
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
              border: "1px solid #e2e8f0",
              borderBottom: "none",
              borderLeft: "none",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #f1f5f9" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "#1e293b" }}
          >
            {user?.name || "User"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            {user?.email || "user@example.com"}
          </Typography>
        </Box>

        <Box sx={{ py: 1 }}>
          <Typography
            variant="overline"
            sx={{
              px: 3,
              py: 1,
              color: "#64748b",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.5px",
              display: "block",
            }}
          >
            Quick Actions
          </Typography>
          {profileMenuItems.slice(0, 2).map((item) => (
            <MenuItem
              key={item.label}
              onClick={item.action}
              sx={{
                py: 1.5,
                px: 3,
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                color:
                  item.color === "success"
                    ? "#16a34a"
                    : item.color === "error"
                    ? "#dc2626"
                    : "#374151",
                "&:hover": {
                  bgcolor:
                    item.color === "success"
                      ? "rgba(34, 197, 94, 0.08)"
                      : item.color === "error"
                      ? "rgba(239, 68, 68, 0.08)"
                      : "#f8fafc",
                  transform: "translateX(4px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color:
                    item.color === "success"
                      ? "#16a34a"
                      : item.color === "error"
                      ? "#dc2626"
                      : "#64748b",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Typography variant="body2" fontWeight={600}>
                {item.label}
              </Typography>
            </MenuItem>
          ))}
        </Box>

        <Divider sx={{ mx: 2 }} />

        {/* Account Actions */}
        <Box sx={{ py: 1 }}>
          {profileMenuItems.slice(2).map((item) => (
            <MenuItem
              key={item.label}
              onClick={item.action}
              sx={{
                py: 1.5,
                px: 3,
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                color: item.color === "error" ? "#dc2626" : "#374151",
                "&:hover": {
                  bgcolor:
                    item.color === "error"
                      ? "rgba(239, 68, 68, 0.08)"
                      : "#f8fafc",
                  transform: "translateX(4px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: item.color === "error" ? "#dc2626" : "#64748b",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Typography variant="body2" fontWeight={600}>
                {item.label}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
}

export default ProfileMenu;