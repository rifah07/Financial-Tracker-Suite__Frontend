import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

function ValuesSection({ values }) {
  return (
    <Box sx={{ bgcolor: "white", py: { xs: 10, md: 15 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Chip
            label="💎 Our Values"
            sx={{
              mb: 4,
              bgcolor: "#667eea",
              color: "white",
              fontWeight: 700,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 4,
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.8rem", md: "3.5rem" },
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            What Drives Us
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 3,
              mx: "auto",
              mb: 5,
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
            }}
          />
        </Box>

        <Grid container spacing={5} sx={{ alignItems: "stretch" }}>
          {values.map((value, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  width: "100%",
                  minHeight: 380,
                  borderRadius: 5,
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    "& .value-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                    "& .value-bg": {
                      transform: "scale(1.3)",
                      opacity: 0.8,
                    },
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Background decoration */}
                <Box
                  className="value-bg"
                  sx={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    opacity: 0.6,
                    transition: "all 0.4s ease",
                  }}
                />

                <CardContent
                  sx={{
                    p: 5,
                    textAlign: "center",
                    flex: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    className="value-icon"
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.5rem",
                      mb: 4,
                      mx: "auto",
                      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                      transition: "all 0.4s ease",
                      border: "2px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: "#1e293b",
                      fontSize: "1.4rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: "1.05rem",
                    }}
                  >
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ValuesSection;