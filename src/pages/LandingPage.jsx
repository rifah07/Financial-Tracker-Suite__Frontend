import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CTASection from "../components/landing/CTASection";

function LandingPage({ onGetStarted, onLogin }) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", overflow: "hidden" }}>
      <HeroSection onGetStarted={onGetStarted} onLogin={onLogin} />
      <FeaturesSection />
      <CTASection onGetStarted={onGetStarted} onLearnMore={handleLearnMore} />
    </Box>
  );
}
export default LandingPage;