import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
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
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 1, sm: 1, md: 4 },
        pt: { xs: 2, sm: 3 },
        pb: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          background: "linear-gradient(to bottom right, #f8fafc, #e0f2fe)",
          boxShadow: 2,
          p: { xs: 2, sm: 1 },
          overflow: "hidden",
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
            background:
              "linear-gradient(to bottom right, rgba(191,219,254,0.4), rgba(199,210,254,0.4))",
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
            background:
              "linear-gradient(to top right, rgba(241,245,249,0.4), rgba(191,219,254,0.4))",
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            minWidth: 0,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            sx={{
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              fontSize: { xs: 28, sm: 32 },
              mb: { xs: 1, sm: 0 },
              background: "linear-gradient(to bottom right, #f1f5f9, #dbeafe)",
              flexShrink: 0,
            }}
          >
            👤
          </Avatar>

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
              overflow: "hidden",
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.5rem" },
              }}
            >
              Welcome Back,&nbsp;
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "inherit",
                }}
              >
                {user?.name?.split(" ")[0] || "User"}
              </Box>
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.85rem", sm: "1rem" },
                display: "block",
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