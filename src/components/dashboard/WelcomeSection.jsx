import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const PersonIcon = () => <span style={{ fontSize: "2.5rem" }}>👤</span>;

function WelcomeSection({ user }) {
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
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
        pt: { xs: 3, sm: 4, md: 6 },
        pb: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: 2, sm: 3 },
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 3, sm: 3, md: 3 },
          mb: { xs: 3, md: 4 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 60, sm: 72 },
            height: { xs: 60, sm: 72 },
            bgcolor: "#f1f5f9",
            fontSize: { xs: "2rem", sm: "2.5rem" },
            border: "3px solid #e2e8f0",
            color: "#475569",
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              letterSpacing: "-0.025em",
              mb: 0.5,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
            }}
          >
            Welcome Back, {user?.name?.split(" ")[0] || "User"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              fontWeight: 400,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Member since {formatDate(user?.createdAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WelcomeSection;