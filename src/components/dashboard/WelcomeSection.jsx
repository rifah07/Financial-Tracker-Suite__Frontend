import { Box, Typography } from "@mui/material";

const WelcomeSection = ({ user }) => {

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
        width: { xs: "70%", sm: "100%", md: "100%" },
        maxWidth: "100%",
        px: { xs: 1, sm: 3, md: 4 },
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          boxShadow: 2,
          border: "1px solid #e2e8f0",
          backdropFilter: "blur(6px)",
          background: "linear-gradient(to bottom right, #f8fafc, #e0f2fe)",
        }}
      >
        {/* Blurry background shapes */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 80,
            height: 80,
            background:
              "linear-gradient(to bottom right, #dbeafe88, #c7d2fe88)",
            filter: "blur(40px)",
            borderRadius: "50%",
            transform: "translate(30%, -30%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 64,
            height: 64,
            background: "linear-gradient(to top right, #f1f5f988, #dbeafe88)",
            filter: "blur(40px)",
            borderRadius: "50%",
            transform: "translate(-30%, 30%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            px: { xs: 1, sm: 3, md: 4 },
            py: { xs: 3, sm: 4 },
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              width: 56,
              height: 56,
              fontSize: "2rem",
              background: "linear-gradient(to bottom right, #f1f5f9, #dbeafe)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
              boxShadow: 1,
            }}
          >
            👤
          </Box>

          {/* Greeting */}
          <Box
            sx={{
              textAlign: { xs: "center", sm: "left" },
              flex: 1,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "#1e293b",
                mb: 0.5,
              }}
            >
              Welcome Back,{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(to right, #2563eb, #4f46e5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {user?.name?.split(" ")[0] || "User"}
              </Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Member since {formatDate(user?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeSection;