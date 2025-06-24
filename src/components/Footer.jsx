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
        py: { xs: 3, md: 4 },
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.grey[800],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary.light" gutterBottom>
              Financial Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Take control of your finances with our easy-to-use tracking tools.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              &copy; {new Date().getFullYear()}{" "}
              <Link
                href="https://rifah-sajida-deya-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                color="primary.light"
                sx={{ textDecoration: "none", '&:hover': { textDecoration: 'underline' } }}
              >
                Rifah Sajida Deya
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box>
              <IconButton color="primary" aria-label="GitHub">
                <GitHub />
              </IconButton>
              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
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
