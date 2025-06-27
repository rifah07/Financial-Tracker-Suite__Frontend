import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

function FeaturesSection() {
  const features = [
    {
      icon: "📊",
      title: "Smart Analytics",
      description:
        "Get detailed insights into your spending patterns with beautiful interactive charts and comprehensive financial reports.",
      gradient: "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
      bgGradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      shadowColor: "rgba(21, 101, 192, 0.3)",
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      description:
        "We prioritize the protection of your financial data through robust security measures and state-of-the-art encryption.",
      gradient: "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
      bgGradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      shadowColor: "rgba(13, 71, 161, 0.3)",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description:
        "Access your finances anywhere, anytime with our fully responsive design that works perfectly on all devices.",
      gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
      bgGradient: "linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)",
      shadowColor: "rgba(255, 152, 0, 0.3)",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 12 }}>
          <Chip
            label="🚀 Why Choose Us"
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
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Everything You Need to Succeed
          </Typography>
          <Box
            sx={{
              width: 120,
              height: 6,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 3,
              mx: "auto",
              mb: 5,
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              maxWidth: 750,
              mx: "auto",
              lineHeight: 1.8,
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Powerful features designed to transform how you manage, track, and
            understand your finances with cutting-edge technology and elegant
            design.
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          sx={{
            alignItems: "stretch",
            justifyContent: "center",
            mb: 12,
          }}
        >
          {features.map((feature, index) => (
            <Grid
              item
              xs={12} // 1 card per row on mobile
              sm={12} // 1 card per row on small tablets
              md={4} // 3 cards per row on desktop (12/4 = 3)
              lg={4} // 3 cards per row on large screens
              xl={4} // 3 cards per row on extra large screens
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: 350,
                  maxWidth: 360,
                  borderRadius: 5,
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: `0 25px 50px ${feature.shadowColor}`,
                    "& .feature-icon": {
                      transform: "scale(1.1) rotate(8deg)",
                    },
                    "& .feature-bg": {
                      transform: "scale(1.3)",
                      opacity: 0.9,
                    },
                  },
                }}
              >
                <Box
                  className="feature-bg"
                  sx={{
                    position: "absolute",
                    top: -80,
                    right: -80,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: feature.bgGradient,
                    opacity: 0.7,
                    transition: "all 0.4s ease",
                  }}
                />

                <CardContent
                  sx={{
                    p: 5,
                    position: "relative",
                    zIndex: 1,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <Box
                      className="feature-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 4,
                        background: feature.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        mb: 4,
                        mx: "auto",
                        boxShadow: `0 12px 40px ${feature.shadowColor}`,
                        transition: "all 0.4s ease",
                        border: "2px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {feature.icon}
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
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            borderRadius: 6,
            p: { xs: 8, md: 10 },
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30, 41, 59, 0.3)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -150,
              right: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(102, 126, 234, 0.15)",
              filter: "blur(120px)",
            }}
          />

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Join the Financial Revolution
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.95,
                  lineHeight: 1.8,
                  fontSize: { xs: "1.2rem", md: "1.3rem" },
                  mb: 5,
                  fontWeight: 400,
                }}
              >
                Thousands of users have already transformed their financial
                lives. Experience the power of intelligent money management
                today.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        mb: 2,
                        fontSize: { xs: "2.2rem", md: "3.5rem" },
                        background:
                          "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter:
                          "drop-shadow(0 4px 8px rgba(74, 222, 128, 0.3))",
                      }}
                    >
                      10K+
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Active Users
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        mb: 2,
                        fontSize: { xs: "2.2rem", md: "3.5rem" },
                        background:
                          "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter:
                          "drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))",
                      }}
                    >
                      $2M+
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Tracked
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        mb: 2,
                        fontSize: { xs: "2.2rem", md: "3.5rem" },
                        background:
                          "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 4px 8px rgba(6, 182, 212, 0.3))",
                      }}
                    >
                      99.9%
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Uptime
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
