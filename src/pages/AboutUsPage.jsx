import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";
import HeroSection from "../components/about/HeroSection";
import MissionSection from "../components/about/MissionSection";
import ValuesSection from "../components/about/ValuesSection";
import TeamSection from "../components/about/TeamSection";
import ContactSection from "../components/about/ContactSection";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

/* const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`; */

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
      <HeroSection />
      <MissionSection float={float} />
      <ValuesSection values={values} />
      <TeamSection teamMembers={teamMembers} />
      <ContactSection />
    </Box>
  );
}

export default AboutUsPage;
