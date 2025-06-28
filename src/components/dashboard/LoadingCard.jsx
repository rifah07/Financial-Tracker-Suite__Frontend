import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";

function LoadingCard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          p: { xs: 4, sm: 6 },
          textAlign: "center",
          maxWidth: { xs: 350, sm: 450 },
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <LinearProgress
            sx={{
              borderRadius: 2,
              height: 8,
              bgcolor: "#e3f2fd",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#1976d2",
                borderRadius: 2,
              },
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#1565c0",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
          }}
        >
          Loading your dashboard...
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          Please wait while we fetch your data
        </Typography>
      </Card>
    </Box>
  );
}

export default LoadingCard;