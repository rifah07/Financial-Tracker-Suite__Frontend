import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

function MissionSection({ float }) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 } }}>
      <Grid container spacing={8} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              animation: `${float} 6s ease-in-out infinite`,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: 220, md: 320 },
                height: { xs: 220, md: 320 },
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "4.5rem", md: "7rem" },
                mx: "auto",
                boxShadow: "0 25px 70px rgba(102, 126, 234, 0.4)",
                border: "3px solid rgba(255,255,255,0.1)",
              }}
            >
              🚀
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Chip
              label="🎯 Our Mission"
              sx={{
                mb: 4,
                bgcolor: "#4ade80",
                color: "white",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(74, 222, 128, 0.3)",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 4,
                color: "#1e293b",
                fontSize: { xs: "2.2rem", md: "2.8rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Empowering Financial Freedom
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#64748b",
                lineHeight: 1.8,
                fontSize: { xs: "1.15rem", md: "1.25rem" },
                mb: 4,
                fontWeight: 400,
              }}
            >
              We believe that everyone deserves access to sophisticated
              financial management tools. Our platform combines cutting-edge
              technology with intuitive design to make personal finance
              management accessible, engaging, and effective for users of all
              backgrounds.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#64748b",
                lineHeight: 1.8,
                fontSize: { xs: "1.15rem", md: "1.25rem" },
                fontWeight: 400,
              }}
            >
              From tracking daily expenses to analyzing long-term financial
              trends, FinanceTracker provides the insights and tools you need to
              make informed decisions about your money.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MissionSection;