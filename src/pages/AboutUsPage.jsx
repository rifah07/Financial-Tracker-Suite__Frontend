import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/system";

// Floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

function AboutUsPage() {
  const teamMembers = [
    {
      name: "Rifah Sajida Deya",
      role: "Founder & Lead Developer",
      avatar: "👩‍💻",
      description:
        "Passionate about creating elegant financial solutions that empower users to take control of their money.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      bgGradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    },
    {
      name: "Development Team",
      role: "Full-Stack Engineers",
      avatar: "👥",
      description:
        "Dedicated professionals focused on building secure, scalable, and user-friendly financial management tools.",
      gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
      bgGradient: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
    },
    {
      name: "Design Team",
      role: "UI/UX Specialists",
      avatar: "🎨",
      description:
        "Creative minds crafting intuitive interfaces that make complex financial data simple and beautiful.",
      gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
      bgGradient: "linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)",
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "User-Centric Design",
      description:
        "Every feature is designed with our users in mind, ensuring simplicity without sacrificing functionality.",
    },
    {
      icon: "🔒",
      title: "Privacy & Security",
      description:
        "Your financial data privacy is our top priority. We implement industry-standard security measures.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We continuously evolve our platform with cutting-edge technology and user feedback.",
    },
    {
      icon: "🌱",
      title: "Financial Empowerment",
      description:
        "We believe everyone deserves access to powerful tools for managing their financial future.",
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
            animation: `${pulse} 4s ease-in-out infinite`,
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
            animation: `${pulse} 6s ease-in-out infinite reverse`,
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <Chip
              label="✨ Our Story"
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
                mb: 4,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              About FinanceTracker
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                opacity: 0.95,
                lineHeight: 1.6,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                maxWidth: 800,
                mx: "auto",
                fontWeight: 400,
              }}
            >
              We're on a mission to democratize financial management by
              providing powerful, intuitive tools that help individuals and
              businesses take control of their financial future with confidence
              and clarity.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: `${float} 6s ease-in-out infinite`,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: 200, md: 300 },
                  height: { xs: 200, md: 300 },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: { xs: "4rem", md: "6rem" },
                  mx: "auto",
                  boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
                }}
              >
                🚀
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Chip
                label="🎯 Our Mission"
                sx={{
                  mb: 3,
                  bgcolor: "#4ade80",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: "#1e293b",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Empowering Financial Freedom
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  lineHeight: 1.7,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                  mb: 4,
                }}
              >
                We believe that everyone deserves access to sophisticated
                financial management tools. Our platform combines cutting-edge
                technology with intuitive design to make personal finance
                management accessible, engaging, and effective for users of all
                backgrounds.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  lineHeight: 1.7,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                }}
              >
                From tracking daily expenses to analyzing long-term financial
                trends, FinanceTracker provides the insights and tools you need
                to make informed decisions about your money.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: "white", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              label="💎 Our Values"
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
                fontSize: { xs: "2.5rem", md: "3rem" },
                letterSpacing: "-0.02em",
              }}
            >
              What Drives Us
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 2,
                mx: "auto",
                mb: 4,
              }}
            />
          </Box>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 3,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        mb: 3,
                        mx: "auto",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "#1e293b",
                        fontSize: "1.2rem",
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748b",
                        lineHeight: 1.6,
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

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="👥 Our Team"
            sx={{
              mb: 3,
              bgcolor: "#4ade80",
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
              fontSize: { xs: "2.5rem", md: "3rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Meet the People Behind FinanceTracker
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
            }}
          >
            A passionate team dedicated to revolutionizing personal finance
            management
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    "& .team-bg": {
                      transform: "scale(1.2)",
                      opacity: 0.8,
                    },
                    "& .team-avatar": {
                      transform: "scale(1.1)",
                    },
                  },
                }}
              >
                {/* Background decoration */}
                <Box
                  className="team-bg"
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: member.bgGradient,
                    opacity: 0.5,
                    transition: "all 0.4s ease",
                  }}
                />

                <CardContent
                  sx={{
                    p: 4,
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    className="team-avatar"
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 3,
                      background: member.gradient,
                      fontSize: "2.5rem",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#1e293b",
                      fontSize: "1.3rem",
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#667eea",
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.6,
                    }}
                  >
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(102, 126, 234, 0.1)",
            filter: "blur(100px)",
          }}
        />

        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
                lineHeight: 1.2,
              }}
            >
              Ready to Join Our Community?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.6,
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Experience the difference that thoughtful design and powerful
              features can make in your financial journey.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                📧 Contact: support@financetracker.com
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutUsPage;