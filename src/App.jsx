import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/TransactionsPage";
import RegisterSection from "./sections/RegisterSection";
import LoginSection from "./sections/LoginSection";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ForgotPasswordSection from "./sections/ForgotPasswordSection";
import ResetPasswordSection from "./sections/ResetPasswordSection";
import UserHomePage from "./pages/UserHomePage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [showLogin, showRegister]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      fetch(`${import.meta.env.VITE_API_USER_URL}/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data.data);
          setTransactions(data.transactions || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
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
    } catch (error) {
      console.error("Cannot logout. Error:", error);
    }
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
          bgcolor: "#f8fafc",
        }}
      >
        <Navbar
          onRegisterClick={() => setShowRegister(true)}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          user={user}
        />

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 5 } }}>
                  <UserHomePage
                    user={user}
                    transactions={transactions}
                    isLoading={isLoading}
                  />
                </Box>
              ) : (
                <LandingPage
                  onGetStarted={() => setShowRegister(true)}
                  onLogin={() => setShowLogin(true)}
                />
              )
            }
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordSection />} />
          <Route path="/reset-password" element={<ResetPasswordSection />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>

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
