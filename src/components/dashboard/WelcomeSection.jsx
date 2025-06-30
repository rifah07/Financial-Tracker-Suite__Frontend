import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";

function WelcomeSection({ user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 3, md: 5 },
        pt: { xs: 2, sm: 4, md: 6 },
        pb: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: "background.paper",
          background: "linear-gradient(to bottom right, #f8fafc, #e0f2fe)",
          boxShadow: 3,
          position: "relative",
          p: { xs: 2, sm: 4 },
        }}
      >
        {/* Blur circles */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: { xs: 80, sm: 120 },
            height: { xs: 80, sm: 120 },
            borderRadius: "50%",
            background:
              "linear-gradient(to bottom right, rgba(191,219,254,0.4), rgba(199,210,254,0.4))",
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: { xs: 60, sm: 100 },
            height: { xs: 60, sm: 100 },
            borderRadius: "50%",
            background:
              "linear-gradient(to top right, rgba(241,245,249,0.4), rgba(191,219,254,0.4))",
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />

        {/* Foreground Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 3,
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: { xs: 56, sm: 64, md: 72 },
              height: { xs: 56, sm: 64, md: 72 },
              background: "linear-gradient(to bottom right, #f1f5f9, #dbeafe)",
              fontSize: { xs: 28, sm: 32, md: 40 },
              boxShadow: 2,
            }}
          >
            👤
          </Avatar>

          {/* Text */}
          <Box sx={{ textAlign: { xs: "center", sm: "left" }, width: "100%" }}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              color="text.primary"
              sx={{ lineHeight: 1.2 }}
            >
              Welcome Back,{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline",
                  fontWeight: "inherit",
                }}
              >
                {user?.name?.split(" ")[0] || "User"}
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Member since {formatDate(user?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WelcomeSection;
