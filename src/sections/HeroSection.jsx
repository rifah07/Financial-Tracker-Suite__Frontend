import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// Free SVG wallet illustration (unDraw, open source)
const walletSvg =
  "https://raw.githubusercontent.com/feathericons/feather/master/icons/wallet.svg";

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ flex: 1, zIndex: 1 }}>
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
          zIndex: 1,
        }}
      >
        <img
          src={walletSvg}
          alt="Wallet illustration"
          style={{
            width: "80%",
            maxWidth: 260,
            minWidth: 140,
            opacity: 0.9,
            filter: "drop-shadow(0 8px 32px rgba(25, 118, 210, 0.10))",
          }}
        />
      </Box>
      {/* Optional: Decorative background SVG */}
      <Box
        sx={{
          position: "absolute",
          right: -80,
          bottom: -60,
          width: 320,
          height: 320,
          opacity: 0.07,
          zIndex: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <img
          src={walletSvg}
          alt=""
          style={{ width: "100%", height: "100%" }}
          draggable={false}
        />
      </Box>
    </Box>
  );
}

export default HeroSection;
