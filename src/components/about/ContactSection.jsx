import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function ContactSection() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
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
          background: "rgba(102, 126, 234, 0.15)",
          filter: "blur(100px)",
        }}
      />

      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 4,
              fontSize: { xs: "2.2rem", md: "2.8rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to Join Our Community?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              opacity: 0.95,
              lineHeight: 1.7,
              fontSize: { xs: "1.2rem", md: "1.3rem" },
              maxWidth: 550,
              mx: "auto",
              fontWeight: 400,
            }}
          >
            Experience the difference that thoughtful design and powerful
            features can make in your financial journey.
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.12)",
              borderRadius: 4,
              px: 4,
              py: 2.5,
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              📧 Contact: rifahsajida7@gmail.com
              {/* support@financetracker.com  */}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection;