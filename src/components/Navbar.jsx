import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import NavButtons from "./Navbar_Components/NavButtons";
import ProfileMenu from "./Navbar_Components/ProfileMenu";
import ReportsMenu from "./Navbar_Components/ReportsMenu";
import MobileDrawer from "./Navbar_Components/MobileDrawer";
import ReportModals from "./Navbar_Components/ReportModals";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import LoadingDialog from "./LoadingDialog";
import ErrorDialog from "./ErrorDialog";

import {useReportsAPI} from "../hooks/useReportsAPI";

function Navbar({ onRegisterClick, onLoginClick, onLogout, isLoggedIn, user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const reportsAPI = useReportsAPI(setLoading, setError);

  const handleAddIncomeSuccess = () => {
    setShowAddIncome(false);
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const handleAddExpenseSuccess = () => {
    setShowAddExpense(false);
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 },
            py: 1,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #1565c0 0%, #2e7d32 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
            onClick={() => navigate("/")}
          >
            💼 Financial Tracker Suite
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <NavButtons
              isLoggedIn={isLoggedIn}
              onRegisterClick={onRegisterClick}
              onLoginClick={onLoginClick}
              onShowAddIncome={() => setShowAddIncome(true)}
              onShowAddExpense={() => setShowAddExpense(true)}
              navigate={navigate}
            />

            {isLoggedIn && (
              <>
                <ReportsMenu reportsAPI={reportsAPI} />
                <ProfileMenu user={user} onLogout={onLogout} navigate={navigate} />
              </>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            sx={{
              display: { lg: "none" },
              color: "#374151",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.04)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        onRegisterClick={onRegisterClick}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onShowAddIncome={() => setShowAddIncome(true)}
        onShowAddExpense={() => setShowAddExpense(true)}
        navigate={navigate}
        reportsAPI={reportsAPI}
      />

      {/* Modals */}
      <ReportModals reportsAPI={reportsAPI} />
      <AddIncomeModal
        open={showAddIncome}
        onClose={() => setShowAddIncome(false)}
        onSuccess={handleAddIncomeSuccess}
      />
      <AddExpenseModal
        open={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSuccess={handleAddExpenseSuccess}
      />
      <LoadingDialog open={loading} />
      <ErrorDialog error={error} onClose={() => setError("")} />
    </>
  );
}

export default Navbar;
