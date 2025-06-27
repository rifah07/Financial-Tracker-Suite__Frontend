import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/system";
import WalletIcon from "./WalletIcon";

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

function HeroSection({ onGetStarted, onLogin }) {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 12, md: 18 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: -150,
          right: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          filter: "blur(120px)",
          animation: `${pulse} 4s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(150px)",
          animation: `${pulse} 6s ease-in-out infinite reverse`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          filter: "blur(80px)",
          animation: `${pulse} 8s ease-in-out infinite`,
        }}
      />

      <Container maxWidth="lg">
        <Grid
          container
          spacing={8}
          alignItems="center"
          sx={{ minHeight: "75vh" }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Chip
                label="✨ New: Advanced Analytics Dashboard"
                sx={{
                  mb: 4,
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "white",
                  fontWeight: 700,
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontSize: "0.9rem",
                  px: 2,
                  py: 0.5,
                  boxShadow: "0 8px 32px rgba(255,255,255,0.1)",
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.5rem" },
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  textShadow: "0 0 40px rgba(255,255,255,0.3)",
                  color: "white",
                }}
              >
                Master Your{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(135deg, #ffd54f 0%, #ffeb3b 50%, #ffc107 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    // Fallback for browsers that don't support background-clip
                    color: "#ffd54f",
                    textShadow: "0 0 40px rgba(255, 213, 79, 0.6)",
                    filter: "drop-shadow(0 4px 8px rgba(255, 213, 79, 0.3))",
                    fontWeight: 900,
                  }}
                >
                  Financial
                </Box>{" "}
                Future
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  opacity: 0.95,
                  lineHeight: 1.7,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  maxWidth: 520,
                  fontWeight: 400,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Transform your relationship with money through intelligent
                tracking, powerful insights, and beautiful visualizations that
                make financial management effortless and engaging.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  mb: 6,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={onGetStarted}
                  sx={{
                    py: 3,
                    px: 6,
                    borderRadius: 4,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                    boxShadow: "0 12px 48px rgba(34, 197, 94, 0.4)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 60px rgba(34, 197, 94, 0.5)",
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Start Free Today
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onLogin}
                  sx={{
                    py: 3,
                    px: 6,
                    borderRadius: 4,
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "white",
                    backdropFilter: "blur(15px)",
                    background: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 40px rgba(255,255,255,0.25)",
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Sign In
                </Button>
              </Box>

              {/* Enhanced Trust indicators */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, fontSize: "1rem", fontWeight: 500 }}
                  >
                    Trusted by 10,000+ users
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        color: "#ffd54f",
                        fontSize: "1.3rem",
                        filter:
                          "drop-shadow(0 2px 4px rgba(255, 213, 79, 0.3))",
                      }}
                    >
                      ⭐
                    </Box>
                  ))}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, fontSize: "1rem", fontWeight: 500 }}
                >
                  4.9/5 rating
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                animation: `${float} 6s ease-in-out infinite`,
                position: "relative",
                zIndex: 1,
              }}
            >
              <WalletIcon size={420} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
