import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { keyframes } from "@mui/system";

// Floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

// Enhanced Wallet Icon with better styling
const WalletIcon = ({ size = 280, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: "drop-shadow(0 20px 40px rgba(21, 101, 192, 0.2))",
      ...style,
    }}
  >
    <defs>
      <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1565c0" />
        <stop offset="50%" stopColor="#2e7d32" />
        <stop offset="100%" stopColor="#1976d2" />
      </linearGradient>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#e3f2fd" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      fill="url(#walletGradient)"
    />
    <path
      d="M6 3H18C19.1 3 20 3.9 20 5V7H4V5C4 3.9 4.9 3 6 3Z"
      fill="url(#cardGradient)"
    />
    <circle cx="17" cy="14" r="2.5" fill="#ffffff" opacity="0.9" />
    <circle cx="17" cy="14" r="1.2" fill="#1565c0" />
    <path
      d="M6 11H10M6 13H12M6 15H9"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M12 8L14 6M14 6L16 8M14 6V10"
      stroke="#4caf50"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Feature icons
const ChartIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      mb: 2,
    }}
  >
    📊
  </Box>
);

const SecurityIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      mb: 2,
    }}
  >
    🔒
  </Box>
);

const MobileIcon = () => (
  <Box
    sx={{
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      mb: 2,
    }}
  >
    📱
  </Box>
);

function LandingPage({ onGetStarted, onLogin }) {
  const features = [
    {
      icon: <ChartIcon />,
      title: "Smart Analytics",
      description:
        "Get detailed insights into your spending patterns with beautiful charts and reports.",
    },
    {
      icon: <SecurityIcon />,
      title: "Bank-Level Security",
      description:
        "Your financial data is protected with enterprise-grade encryption and security.",
    },
    {
      icon: <MobileIcon />,
      title: "Mobile Responsive",
      description:
        "Access your finances anywhere, anytime with our fully responsive design.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(100px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            filter: "blur(120px)",
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Take Control of Your{" "}
                <Box component="span" sx={{ color: "#ffeb3b" }}>
                  Finances
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                Track your income, expenses, and savings with our powerful yet
                simple financial management platform. Get insights, set budgets,
                and achieve your financial goals.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
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
                      "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
                    boxShadow: "0 8px 32px rgba(46, 125, 50, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 40px rgba(46, 125, 50, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={onLogin}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  animation: `${float} 6s ease-in-out infinite`,
                }}
              >
                <WalletIcon size={320} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#f8fafc", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "2.75rem" },
                letterSpacing: "-0.02em",
              }}
            >
              Why Choose FinanceTracker?
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 2,
                mx: "auto",
                mb: 3,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#64748b",
                maxWidth: 650,
                mx: "auto",
                lineHeight: 1.7,
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Everything you need to manage your finances effectively, all in
              one beautiful and intuitive platform designed for modern users.
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* Enhanced Feature Cards */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 25px 50px rgba(21, 101, 192, 0.15)",
                    "& .feature-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                    "& .feature-bg": {
                      transform: "scale(1.2)",
                      opacity: 0.8,
                    },
                  },
                }}
              >
                {/* Background decoration */}
                <Box
                  className="feature-bg"
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    opacity: 0.5,
                    transition: "all 0.4s ease",
                  }}
                />

                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      mb: 3,
                      boxShadow: "0 8px 32px rgba(21, 101, 192, 0.3)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    📊
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#1e293b",
                      fontSize: "1.5rem",
                    }}
                  >
                    Smart Analytics
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    Get detailed insights into your spending patterns with
                    beautiful interactive charts, trend analysis, and
                    comprehensive financial reports.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 25px 50px rgba(46, 125, 50, 0.15)",
                    "& .feature-icon": {
                      transform: "scale(1.1) rotate(-5deg)",
                    },
                    "& .feature-bg": {
                      transform: "scale(1.2)",
                      opacity: 0.8,
                    },
                  },
                }}
              >
                {/* Background decoration */}
                <Box
                  className="feature-bg"
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                    opacity: 0.5,
                    transition: "all 0.4s ease",
                  }}
                />

                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      mb: 3,
                      boxShadow: "0 8px 32px rgba(46, 125, 50, 0.3)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    🔒
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#1e293b",
                      fontSize: "1.5rem",
                    }}
                  >
                    Bank-Level Security
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    Your financial data is protected with enterprise-grade
                    encryption, secure authentication, and industry-standard
                    security protocols.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 25px 50px rgba(255, 152, 0, 0.15)",
                    "& .feature-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                    "& .feature-bg": {
                      transform: "scale(1.2)",
                      opacity: 0.8,
                    },
                  },
                }}
              >
                {/* Background decoration */}
                <Box
                  className="feature-bg"
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)",
                    opacity: 0.5,
                    transition: "all 0.4s ease",
                  }}
                />

                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      mb: 3,
                      boxShadow: "0 8px 32px rgba(255, 152, 0, 0.3)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    📱
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#1e293b",
                      fontSize: "1.5rem",
                    }}
                  >
                    Mobile Responsive
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    Access your finances anywhere, anytime with our fully
                    responsive design that works perfectly on desktop, tablet,
                    and mobile devices.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Additional Stats Section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                filter: "blur(100px)",
              }}
            />

            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.8rem", md: "2.25rem" },
                  }}
                >
                  Trusted by Thousands
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  Join our growing community of users who have successfully
                  taken control of their financial future with FinanceTracker.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          fontSize: { xs: "1.8rem", md: "2.5rem" },
                        }}
                      >
                        10K+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Active Users
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          fontSize: { xs: "1.8rem", md: "2.5rem" },
                        }}
                      >
                        $2M+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Tracked
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          fontSize: { xs: "1.8rem", md: "2.5rem" },
                        }}
                      >
                        99.9%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
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
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          color: "white",
          py: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Ready to Start Your Financial Journey?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              Join thousands of users who have already taken control of their
              finances with FinanceTracker.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              sx={{
                py: 2.5,
                px: 6,
                borderRadius: 3,
                fontSize: "1.2rem",
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 50px rgba(102, 126, 234, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Free Today
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
