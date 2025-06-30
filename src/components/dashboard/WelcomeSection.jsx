import React from "react";
import { Box, Typography, Avatar, useTheme, useMediaQuery } from "@mui/material";

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
        px: 2,
        pt: 2,
        pb: 1,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          background: "linear-gradient(to bottom right, #f8fafc, #e0f2fe)",
          boxShadow: 2,
          p: 2,
        }}
      >
        {/* Blur Circles */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(to bottom right, rgba(191,219,254,0.4), rgba(199,210,254,0.4))",
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "linear-gradient(to top right, rgba(241,245,249,0.4), rgba(191,219,254,0.4))",
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        {/* Foreground Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: "linear-gradient(to bottom right, #f1f5f9, #dbeafe)",
              fontSize: 24,
            }}
          >
            👤
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              noWrap
              sx={{
                display: "block",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Welcome Back,&nbsp;
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                {user?.name?.split(" ")[0] || "User"}
              </Box>
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Member since {formatDate(user?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WelcomeSection;
