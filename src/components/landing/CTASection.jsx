import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

function CTASection({ onGetStarted, onLearnMore }) {
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
      {/* Enhanced Background decorations */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
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
          right: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(120px)",
          animation: `${pulse} 6s ease-in-out infinite reverse`,
        }}
      />

      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 5,
              fontSize: { xs: "2.8rem", md: "4rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              textShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            Ready to Transform Your Finances?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 8,
              opacity: 0.95,
              lineHeight: 1.7,
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              maxWidth: 650,
              mx: "auto",
              fontWeight: 400,
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            Join thousands of users who have already taken control of their
            financial future. Start your journey today with our free plan.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              mb: 10,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              sx={{
                py: 3.5,
                px: 8,
                borderRadius: 5,
                fontSize: "1.4rem",
                fontWeight: 800,
                textTransform: "none",
                background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                boxShadow: "0 15px 50px rgba(34, 197, 94, 0.4)",
                border: "2px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 25px 70px rgba(34, 197, 94, 0.5)",
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
              onClick={onLearnMore}
              sx={{
                py: 3.5,
                px: 8,
                borderRadius: 5,
                fontSize: "1.4rem",
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.4)",
                color: "white",
                backdropFilter: "blur(15px)",
                background: "rgba(255,255,255,0.12)",
                borderWidth: "2px",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 50px rgba(255,255,255,0.25)",
                },
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Learn More
            </Button>
          </Box>

          {/* Enhanced trust elements */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
              "& > *": {
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 3,
                border: "1px solid rgba(255,255,255,0.2)",
              },
            }}
          >
            <Box sx={{ textAlign: "center", opacity: 0.9 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                Free Forever
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                No credit card required
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", opacity: 0.9 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                Setup in 2 mins
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                Quick and easy onboarding
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", opacity: 0.9 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                24/7 Support
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                We're here to help
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CTASection;