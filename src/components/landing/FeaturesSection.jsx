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
        "Get detailed insights into your spending patterns with beautiful interactive charts, trend analysis, and comprehensive financial reports that help you make informed decisions.",
      gradient: "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
      bgGradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      shadowColor: "rgba(21, 101, 192, 0.3)",
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      description:
        "We prioritize the protection of your financial data through robust security measures, including state-of-the-art encryption and strict access controls for your peace of mind.",
      gradient: "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
      bgGradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      shadowColor: "rgba(13, 71, 161, 0.3)",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description:
        "Access your finances anywhere, anytime with our fully responsive design that works perfectly on desktop, tablet, and mobile devices with seamless user experience.",
      gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
      bgGradient: "linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)",
      shadowColor: "rgba(255, 152, 0, 0.3)",
    },
  ];

  return (
    <Box sx={{ py: { xs: 12, md: 18 } }}>
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
              fontSize: { xs: "2.8rem", md: "4rem" },
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
              fontSize: { xs: "1.2rem", md: "1.4rem" },
            }}
          >
            Powerful features designed to transform how you manage, track, and
            understand your finances with cutting-edge technology and elegant
            design.
          </Typography>
        </Box>

        <Grid container spacing={6} sx={{ alignItems: "stretch" }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: "flex" }}>
              <Card
                sx={{
                  width: "100%",
                  minHeight: 450,
                  borderRadius: 6,
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-20px) scale(1.03)",
                    boxShadow: `0 40px 80px ${feature.shadowColor}`,
                    "& .feature-icon": {
                      transform: "scale(1.2) rotate(15deg)",
                    },
                    "& .feature-bg": {
                      transform: "scale(1.4)",
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Enhanced Background decoration */}
                <Box
                  className="feature-bg"
                  sx={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    background: feature.bgGradient,
                    opacity: 0.7,
                    transition: "all 0.5s ease",
                  }}
                />

                <CardContent
                  sx={{
                    p: 6,
                    position: "relative",
                    zIndex: 1,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 5,
                      background: feature.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                      mb: 5,
                      boxShadow: `0 15px 50px ${feature.shadowColor}`,
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: "2px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: "#1e293b",
                      fontSize: "1.7rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                      flex: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Stats Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            borderRadius: 6,
            p: { xs: 8, md: 10 },
            color: "white",
            position: "relative",
            overflow: "hidden",
            mt: 12,
            boxShadow: "0 20px 60px rgba(30, 41, 59, 0.3)",
          }}
        >
          {/* Background decoration */}
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