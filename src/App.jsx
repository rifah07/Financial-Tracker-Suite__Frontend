import React from "react";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f7fafc",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(90deg, #4fc3f7 0%, #1976d2 100%)",
          color: "#fff",
          padding: "4rem 2rem 3rem 2rem",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)",
        }}
      >
        <h1 style={{ fontSize: "2.8rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-1px" }}>
          Financial Tracker Suite
        </h1>
        <p style={{ fontSize: "1.3rem", maxWidth: 600, margin: "0 auto 2rem auto" }}>
          Take control of your finances with ease. Track expenses, manage budgets, and gain actionable insights—all in one place.
        </p>
        <a
          href="#get-started"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "#1976d2",
            fontWeight: 600,
            padding: "0.9rem 2.2rem",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseOver={e => {
            e.target.style.background = "#1976d2";
            e.target.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.target.style.background = "#fff";
            e.target.style.color = "#1976d2";
          }}
        >
          Get Started
        </a>
      </section>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2.5rem 1rem", maxWidth: 900, margin: "0 auto" }}>
        <section style={{
          background: "#fff",
          borderRadius: "1.2rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          padding: "2.5rem 2rem",
          marginBottom: "2rem",
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "1rem", color: "#1976d2" }}>
            Welcome to Your Dashboard
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "2rem" }}>
            Effortlessly monitor your spending, set savings goals, and visualize your financial health.
          </p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}>
            <FeatureCard
              title="Expense Tracking"
              description="Log and categorize your daily expenses for a clear overview."
              icon="💸"
            />
            <FeatureCard
              title="Budget Management"
              description="Set monthly budgets and receive alerts to stay on track."
              icon="📊"
            />
            <FeatureCard
              title="Financial Insights"
              description="Visualize trends and get personalized tips to improve your finances."
              icon="📈"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// FeatureCard component for main features
function FeatureCard({ title, description, icon }) {
  return (
    <div
      style={{
        flex: "1 1 220px",
        minWidth: 220,
        maxWidth: 270,
        background: "#f5faff",
        borderRadius: "0.8rem",
        padding: "1.5rem 1.2rem",
        boxShadow: "0 1px 6px rgba(79,195,247,0.08)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "2.2rem", marginBottom: "0.7rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem", color: "#1976d2" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.98rem", color: "#444" }}>{description}</p>
    </div>
  );
}

export default App;
