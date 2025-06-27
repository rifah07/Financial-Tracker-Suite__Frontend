import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

function HeroSection() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 10, md: 15 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          filter: "blur(100px)",
          animation: `${pulse} 4s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(120px)",
          animation: `${pulse} 6s ease-in-out infinite reverse`,
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Chip
            label="✨ Our Story"
            sx={{
              mb: 4,
              bgcolor: "rgba(255,255,255,0.18)",
              color: "white",
              fontWeight: 700,
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: "1rem",
              px: 3,
              py: 1,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 5,
              fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.5rem" },
              lineHeight: 1.05,
              color: "white",
              letterSpacing: "-0.03em",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            About Financial Tracker Suite
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              opacity: 0.95,
              lineHeight: 1.7,
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              maxWidth: 850,
              mx: "auto",
              fontWeight: 400,
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            We're on a mission to democratize financial management by providing
            powerful, intuitive tools that help individuals take control of
            their financial future with confidence and clarity.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;