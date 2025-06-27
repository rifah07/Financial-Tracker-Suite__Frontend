import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

function TeamSection() {
  const creator = {
    name: "Rifah Sajida Deya",
    role: "Full-Stack Developer & Designer",
    avatar: "💻",
    description:
      "Passionate full-stack developer who single-handedly created this comprehensive financial tracking platform. Specialized in backend development with expertise in building robust, scalable, and efficient server-side applications using modern technologies.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    bgGradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "JavaScript",
      "API Development",
      "MERN Stack",
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 } }}>
      <Box sx={{ textAlign: "center", mb: 10 }}>
        <Chip
          label="💻 The Creator"
          sx={{
            mb: 4,
            bgcolor: "#4ade80",
            color: "white",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            boxShadow: "0 8px 32px rgba(74, 222, 128, 0.3)",
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
          Meet the Mind Behind FinanceTracker
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#64748b",
            maxWidth: 650,
            mx: "auto",
            lineHeight: 1.8,
            fontSize: { xs: "1.2rem", md: "1.3rem" },
            fontWeight: 400,
          }}
        >
          A solo developer's journey to revolutionize personal finance
          management
        </Typography>
      </Box>

      <Grid container justifyContent="center" sx={{ alignItems: "center" }}>
        <Grid
          item
          xs={12}
          sm={10}
          md={12}
          lg={10}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: { xs: 400, sm: 450, md: 900 },
              minHeight: { xs: 500, sm: 500, md: 350 },
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-15px) scale(1.02)",
                boxShadow: "0 40px 80px rgba(102, 126, 234, 0.25)",
                "& .creator-bg": {
                  transform: "scale(1.4)",
                  opacity: 1,
                },
                "& .creator-avatar": {
                  transform: "scale(1.15)",
                },
              },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              className="creator-bg"
              sx={{
                position: "absolute",
                top: { xs: -80, md: -60 },
                right: { xs: -80, md: -100 },
                width: { xs: 250, md: 300 },
                height: { xs: 250, md: 300 },
                borderRadius: "50%",
                background: creator.bgGradient,
                opacity: 0.7,
                transition: "all 0.4s ease",
              }}
            />

            <CardContent
              sx={{
                p: { xs: 6, md: 8 },
                position: "relative",
                zIndex: 1,
                flex: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 0, md: 6 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: { md: 280 },
                  mb: { xs: 4, md: 0 },
                }}
              >
                <Avatar
                  className="creator-avatar"
                  sx={{
                    width: { xs: 120, md: 100 },
                    height: { xs: 120, md: 100 },
                    mb: 3,
                    background: creator.gradient,
                    fontSize: { xs: "3.5rem", md: "3rem" },
                    boxShadow: "0 15px 50px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.4s ease",
                    border: "4px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {creator.avatar}
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    color: "#1e293b",
                    fontSize: { xs: "1.8rem", md: "1.6rem" },
                    lineHeight: 1.2,
                    textAlign: "center",
                  }}
                >
                  {creator.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#667eea",
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: "1.1rem", md: "1rem" },
                    textAlign: "center",
                  }}
                >
                  {creator.role}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {/* Skills chips */}
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {creator.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      sx={{
                        bgcolor: "rgba(102, 126, 234, 0.1)",
                        color: "#667eea",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        px: 1,
                        py: 0.5,
                        "&:hover": {
                          bgcolor: "rgba(102, 126, 234, 0.2)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.8,
                    fontSize: { xs: "1.1rem", md: "1.15rem" },
                  }}
                >
                  {creator.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Box
          sx={{
            display: "inline-block",
            bgcolor: "rgba(102, 126, 234, 0.05)",
            borderRadius: 4,
            px: 6,
            py: 4,
            border: "1px solid rgba(102, 126, 234, 0.1)",
            maxWidth: 700,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              fontStyle: "italic",
              lineHeight: 1.7,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
              fontWeight: 500,
            }}
          >
            "Built from the ground up with passion for clean code, elegant
            design, and user-centric functionality. Every feature crafted with
            attention to detail."
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default TeamSection;
