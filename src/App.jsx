import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import HeroSection from "./sections/HeroSection";
import DashboardPage from "./pages/DashboardPage";
import RegisterSection from "./sections/RegisterSection";
import LoginSection from "./sections/LoginSection";
import Footer from "./components/Footer";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
        </Routes>
        <Footer />

        {/* Register Modal */}
        <Modal open={showRegister} onClose={() => setShowRegister(false)}>
          <RegisterSection />
        </Modal>
        {/* Login Modal */}
        <Modal open={showLogin} onClose={() => setShowLogin(false)}>
          <LoginSection onLoginSuccess={() => setShowLogin(false)} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
