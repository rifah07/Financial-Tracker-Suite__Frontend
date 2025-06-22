import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ onRegisterClick, onLoginClick, onLogout, isLoggedIn }) {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav
      style={{
        background: "#fff",
        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
        padding: "0.7rem 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.4rem",
            color: "#1976d2",
            letterSpacing: "-1px",
          }}
        >
          Financial Tracker
        </div>
        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}
        >
          {!isLoggedIn ? (
            <>
              <button onClick={onRegisterClick} style={navBtnStyle}>
                Register
              </button>
              <button
                onClick={onLoginClick}
                style={{ ...navBtnStyle, background: "#1976d2", color: "#fff" }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                style={navBtnStyle}
              >
                Profile
              </button>
              <button
                onClick={onLogout}
                style={{ ...navBtnStyle, background: "#d32f2f", color: "#fff" }}
              >
                Logout
              </button>
            </>
          )}
        </div>
        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "1.7rem",
            color: "#1976d2",
            cursor: "pointer",
          }}
          onClick={() => setMobileMenu((prev) => !prev)}
        >
          ☰
        </button>
      </div>
      {/* Responsive mobile menu */}
      {mobileMenu && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
          }}
        >
          {!isLoggedIn ? (
            <>
              <button onClick={onRegisterClick} style={navBtnStyle}>
                Register
              </button>
              <button
                onClick={onLoginClick}
                style={{ ...navBtnStyle, background: "#1976d2", color: "#fff" }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                style={navBtnStyle}
              >
                Profile
              </button>
              <button
                onClick={onLogout}
                style={{ ...navBtnStyle, background: "#d32f2f", color: "#fff" }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
      <style>
        {`
          @media (max-width: 600px) {
            .nav-links {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }
        `}
      </style>
    </nav>
  );
}

const navBtnStyle = {
  background: "#e3f2fd",
  color: "#1976d2",
  border: "none",
  borderRadius: "2rem",
  padding: "0.5rem 1.3rem",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  marginLeft: "0.7rem",
};

export default Navbar;