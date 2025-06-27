import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        px: 2,
        mt: "auto",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2
              }}
            >
              💼 Financial Tracker Suite
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                maxWidth: 280
              }}
            >
              Take control of your finances with our comprehensive tracking and
              analytics platform.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "center" } }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "rgba(255,255,255,0.8)",
                mb: 1
              }}
            >
              &copy; {new Date().getFullYear()} FinanceTracker
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
              Made with ❤️ by{" "}
              <Link
                href="https://rifah-sajida-deya-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { 
                    textDecoration: "underline",
                    color: "#764ba2"
                  }
                }}
              >
                Rifah Sajida Deya
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
            <Box>
              <IconButton 
                sx={{ 
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { 
                    color: "#667eea",
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.2s ease"
                }}
                aria-label="GitHub"
              >
                <GitHub />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { 
                    color: "#667eea",
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.2s ease"
                }}
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { 
                    color: "#667eea",
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.2s ease"
                }}
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;