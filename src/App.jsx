import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import HeroSection from "./sections/HeroSection";
import DashboardPage from "./pages/DashboardPage";
import RegisterSection from "./sections/RegisterSection";
import LoginSection from "./sections/LoginSection";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ForgotPasswordSection from "./sections/ForgotPasswordSection";
import ResetPasswordSection from "./sections/ResetPasswordSection";
import UserHomePage from "./pages/UserHomePage";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [showLogin, showRegister]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("accessToken");
      fetch(`${import.meta.env.VITE_API_USER_URL}/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
          setTransactions(data.transactions || []);
        });
    } else {
      setUser(null);
      setTransactions([]);
    }
  }, [isLoggedIn]);

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
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f7fafc",
        }}
      >
        <Navbar
          onRegisterClick={() => setShowRegister(true)}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 2, md: 4 } }}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <UserHomePage user={user} transactions={transactions} />
                ) : (
                  <HeroSection />
                )
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordSection />} />
            <Route path="/reset-password" element={<ResetPasswordSection />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer />
        <Modal open={showRegister} onClose={() => setShowRegister(false)}>
          <RegisterSection />
        </Modal>
        <Modal open={showLogin} onClose={() => setShowLogin(false)}>
          <LoginSection
            onLoginSuccess={() => {
              setShowLogin(false);
              setIsLoggedIn(true);
            }}
            onForgotPassword={() => setShowLogin(false)}
          />
        </Modal>
      </Box>
    </Router>
  );
}

export default App;
