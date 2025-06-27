import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const ProfileIcon = () => <span style={{ fontSize: "20px" }}>👤</span>;
const LogoutIcon = () => <span style={{ fontSize: "20px" }}>🚪</span>;

function ProfileMenu({ user, onLogout, navigate }) {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const profileMenuItems = [
    {
      label: "Profile",
      action: () => navigate("/profile"),
      icon: <ProfileIcon />,
    },
    { label: "Logout", action: onLogout, icon: <LogoutIcon />, color: "error" },
  ];

  return (
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
                bgcolor: item.color === "error" ? "#ffebee" : "#f8fafc",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <Typography variant="body2" fontWeight={500}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default ProfileMenu;
