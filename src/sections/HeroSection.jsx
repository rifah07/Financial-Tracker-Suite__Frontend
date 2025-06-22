import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SavingsIcon from "@mui/icons-material/Savings";

function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: { xs: 350, md: 420 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#e3f2fd",
        borderRadius: 4,
        px: { xs: 2, md: 6 },
        py: { xs: 5, md: 8 },
        mt: 4,
        boxShadow: 3,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" color="primary" fontWeight={700} gutterBottom>
          Take Control of Your Finances
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Track your income, expenses, and savings with ease. Secure, fast, and
          beautifully simple.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 8,
              fontWeight: 600,
              px: 4,
              boxShadow: 2,
            }}
            href="#"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              borderRadius: 8,
              fontWeight: 600,
              px: 4,
            }}
            href="#"
          >
            Learn More
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 4, md: 0 },
        }}
      >
        <SavingsIcon
          sx={{ fontSize: 160, color: "#1976d2", opacity: 0.15 }}
        />
      </Box>
    </Box>
  );
}

export default HeroSection;