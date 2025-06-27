import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { keyframes } from "@mui/system";

const enhancedFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    filter: drop-shadow(0 20px 40px rgba(102, 126, 234, 0.3));
  }
  50% { 
    transform: translateY(-25px) rotate(2deg); 
    filter: drop-shadow(0 35px 60px rgba(102, 126, 234, 0.4));
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

function MissionSection() {
  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        py: { xs: 12, md: 18 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)",
          filter: "blur(100px)",
          animation: `${pulse} 8s ease-in-out infinite`,
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
          background:
            "linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%)",
          filter: "blur(120px)",
          animation: `${pulse} 10s ease-in-out infinite reverse`,
        }}
      />

      <Container maxWidth="lg">
        <Grid
          container
          spacing={10}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: `${enhancedFloat} 8s ease-in-out infinite`,
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Outer glow ring */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: 280, md: 400 },
                  height: { xs: 280, md: 400 },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)",
                  animation: `${pulse} 4s ease-in-out infinite`,
                }}
              />

              <Box
                sx={{
                  width: { xs: 240, md: 340 },
                  height: { xs: 240, md: 340 },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: { xs: "5rem", md: "8rem" },
                  mx: "auto",
                  boxShadow: "0 30px 80px rgba(102, 126, 234, 0.4)",
                  border: "4px solid rgba(255,255,255,0.2)",
                  position: "relative",
                  zIndex: 2,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -4,
                    left: -4,
                    right: -4,
                    bottom: -4,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #667eea, #764ba2, #667eea)",
                    zIndex: -1,
                    animation: `${pulse} 3s ease-in-out infinite`,
                  },
                }}
              >
                🚀
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  right: "10%",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#4ade80",
                  animation: `${pulse} 2s ease-in-out infinite`,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "25%",
                  left: "15%",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#fbbf24",
                  animation: `${pulse} 2.5s ease-in-out infinite`,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  right: "20%",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#f472b6",
                  animation: `${pulse} 1.8s ease-in-out infinite`,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                borderRadius: 4,
                border: "1px solid rgba(102, 126, 234, 0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #4ade80 100%)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 4, md: 6 },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Chip
                  label="🎯 Our Mission"
                  sx={{
                    mb: 4,
                    bgcolor: "#4ade80",
                    color: "white",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    borderRadius: 4,
                    boxShadow: "0 10px 40px rgba(74, 222, 128, 0.4)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 50px rgba(74, 222, 128, 0.5)",
                    },
                    transition: "all 0.3s ease",
                  }}
                />

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mb: 5,
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "2.4rem", md: "3.2rem" },
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Empowering Financial Freedom
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: 400,
                      mb: 3,
                    }}
                  >
                    We believe that everyone deserves access to sophisticated
                    financial management tools. Our platform combines
                    cutting-edge technology with intuitive design to make
                    personal finance management accessible, engaging, and
                    effective for users of all backgrounds.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: 400,
                    }}
                  >
                    From tracking daily expenses to analyzing long-term
                    financial trends, FinanceTracker provides the insights and
                    tools you need to make informed decisions about your money.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
                  {[
                    "Intuitive Design",
                    "Cutting-edge Tech",
                    "User-Focused",
                  ].map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      sx={{
                        bgcolor: "rgba(102, 126, 234, 0.1)",
                        color: "#667eea",
                        fontWeight: 600,
                        px: 2,
                        py: 1,
                        "&:hover": {
                          bgcolor: "rgba(102, 126, 234, 0.2)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MissionSection;