import { useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import HeroSection from "./sections/HeroSection";
import DashboardSection from "./sections/DashboardSection";
import RegisterSection from "./sections/RegisterSection";
import LoginSection from "./sections/LoginSection";
import Footer from "./components/Footer";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f7fafc",
      }}
    >
      <Navbar
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
      />
      <HeroSection />
      <main
        style={{
          flex: 1,
          padding: "2.5rem 1rem",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <DashboardSection />
      </main>
      <Footer />

      {/* Register Modal */}
      <Modal open={showRegister} onClose={() => setShowRegister(false)}>
        <RegisterSection />
      </Modal>
      {/* Login Modal */}
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginSection />
      </Modal>
    </div>
  );
}

export default App;
