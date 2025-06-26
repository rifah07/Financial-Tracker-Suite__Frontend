import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/system";

// Floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

// Enhanced Wallet Icon with modern styling
const WalletIcon = ({ size = 320, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: "drop-shadow(0 25px 50px rgba(102, 126, 234, 0.25))",
      ...style,
    }}
  >
    <defs>
      <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="50%" stopColor="#764ba2" />
        <stop offset="100%" stopColor="#667eea" />
      </linearGradient>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.8" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      fill="url(#walletGradient)"
      filter="url(#glow)"
    />
    <path
      d="M6 3H18C19.1 3 20 3.9 20 5V7H4V5C4 3.9 4.9 3 6 3Z"
      fill="url(#cardGradient)"
    />
    <circle cx="17" cy="14" r="2.5" fill="#ffffff" opacity="0.95" />
    <circle cx="17" cy="14" r="1.2" fill="#667eea" />
    <path
      d="M6 11H10M6 13H12M6 15H9"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M12 8L14 6M14 6L16 8M14 6V10"
      stroke="#4ade80"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function LandingPage({ onGetStarted, onLogin }) {
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
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 10, md: 15 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(120px)",
            animation: `${pulse} 4s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            filter: "blur(150px)",
            animation: `${pulse} 6s ease-in-out infinite reverse`,
          }}
        />

        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            alignItems="center"
            sx={{ minHeight: "70vh" }}
          >
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Chip
                  label="✨ New: Advanced Analytics Dashboard"
                  sx={{
                    mb: 3,
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "white",
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    mb: 3,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    lineHeight: 1.1,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Master Your{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#ffd54f",
                      textShadow: "0 0 30px rgba(255, 213, 79, 0.5)",
                    }}
                  >
                    Financial
                  </Box>{" "}
                  Future
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 5,
                    opacity: 0.95,
                    lineHeight: 1.6,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    maxWidth: 500,
                    fontWeight: 400,
                  }}
                >
                  Transform your relationship with money through intelligent
                  tracking, powerful insights, and beautiful visualizations that
                  make financial management effortless and engaging.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    sx={{
                      py: 2.5,
                      px: 5,
                      borderRadius: 4,
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      textTransform: "none",
                      background:
                        "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                      boxShadow: "0 10px 40px rgba(34, 197, 94, 0.4)",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 15px 50px rgba(34, 197, 94, 0.5)",
                        background:
                          "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    Start Free Today
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={onLogin}
                    sx={{
                      py: 2.5,
                      px: 5,
                      borderRadius: 4,
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 30px rgba(255,255,255,0.2)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    Sign In
                  </Button>
                </Box>

                {/* Trust indicators */}
                <Box
                  sx={{
                    mt: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, fontSize: "0.9rem" }}
                  >
                    Trusted by 10,000+ users
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{ color: "#ffd54f", fontSize: "1.2rem" }}
                      >
                        ⭐
                      </Box>
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, fontSize: "0.9rem" }}
                  >
                    4.9/5 rating
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  animation: `${float} 6s ease-in-out infinite`,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <WalletIcon size={380} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 10, md: 15 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Chip
              label="🚀 Why Choose Us"
              sx={{
                mb: 3,
                bgcolor: "#667eea",
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Everything You Need to Succeed
            </Typography>
            <Box
              sx={{
                width: 100,
                height: 5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 3,
                mx: "auto",
                mb: 4,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#64748b",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.7,
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              Powerful features designed to transform how you manage, track, and
              understand your finances with cutting-edge technology and elegant
              design.
            </Typography>
          </Box>

          <Grid container spacing={5} sx={{ mb: 10, alignItems: "stretch" }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: 420,
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
                      transform: "translateY(-15px) scale(1.02)",
                      boxShadow: `0 30px 60px ${feature.shadowColor}`,
                      "& .feature-icon": {
                        transform: "scale(1.15) rotate(10deg)",
                      },
                      "& .feature-bg": {
                        transform: "scale(1.3)",
                        opacity: 0.9,
                      },
                    },
                  }}
                >
                  {/* Background decoration */}
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
                      opacity: 0.6,
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
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: 4,
                        background: feature.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                        mb: 4,
                        boxShadow: `0 10px 40px ${feature.shadowColor}`,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: "#1e293b",
                        fontSize: "1.6rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#64748b",
                        lineHeight: 1.7,
                        fontSize: "1.05rem",
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

          {/* Stats Section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              borderRadius: 5,
              p: { xs: 6, md: 8 },
              color: "white",
              position: "relative",
              overflow: "hidden",
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
                background: "rgba(102, 126, 234, 0.1)",
                filter: "blur(120px)",
              }}
            />

            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: "2rem", md: "2.8rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Join the Financial Revolution
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.7,
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    mb: 4,
                  }}
                >
                  Thousands of users have already transformed their financial
                  lives. Experience the power of intelligent money management
                  today.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onGetStarted}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                >
                  Get Started Free
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 900,
                          mb: 1,
                          fontSize: { xs: "2rem", md: "3rem" },
                          background:
                            "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        10K+
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.8, fontWeight: 500 }}
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
                          mb: 1,
                          fontSize: { xs: "2rem", md: "3rem" },
                          background:
                            "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        $2M+
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.8, fontWeight: 500 }}
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
                          mb: 1,
                          fontSize: { xs: "2rem", md: "3rem" },
                          background:
                            "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        99.9%
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.8, fontWeight: 500 }}
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

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 10, md: 15 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(100px)",
            animation: `${pulse} 4s ease-in-out infinite`,
          }}
        />

        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 4,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}
            >
              Ready to Transform Your Finances?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                opacity: 0.95,
                lineHeight: 1.6,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Join thousands of users who have already taken control of their
              financial future. Start your journey today with our free plan.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                sx={{
                  py: 3,
                  px: 6,
                  borderRadius: 4,
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                  boxShadow: "0 10px 40px rgba(34, 197, 94, 0.4)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 50px rgba(34, 197, 94, 0.5)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Start Free Today
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={onLogin}
                sx={{
                  py: 3,
                  px: 6,
                  borderRadius: 4,
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Learn More
              </Button>
            </Box>

            {/* Additional trust elements */}
            <Box
              sx={{
                mt: 8,
                display: "flex",
                justifyContent: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ textAlign: "center", opacity: 0.8 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Free Forever
                </Typography>
                <Typography variant="body2">No credit card required</Typography>
              </Box>
              <Box sx={{ textAlign: "center", opacity: 0.8 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Setup in 2 mins
                </Typography>
                <Typography variant="body2">
                  Quick and easy onboarding
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", opacity: 0.8 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  24/7 Support
                </Typography>
                <Typography variant="body2">We're here to help</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
