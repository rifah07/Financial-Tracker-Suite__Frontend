import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import HeroSection from "./sections/HeroSection";
import DashboardPage from "./pages/DashboardPage";
import RegisterSection from "./sections/RegisterSection";
import LoginSection from "./sections/LoginSection";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [showLogin, showRegister]);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_USER_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });
    } catch {}
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f7fafc" }}>
        <Navbar
          onRegisterClick={() => setShowRegister(true)}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
        <Modal open={showRegister} onClose={() => setShowRegister(false)}>
          <RegisterSection />
        </Modal>
        <Modal open={showLogin} onClose={() => setShowLogin(false)}>
          <LoginSection onLoginSuccess={() => { setShowLogin(false); setIsLoggedIn(true); }} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
