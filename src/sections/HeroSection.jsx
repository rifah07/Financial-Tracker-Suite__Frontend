function HeroSection() {
  return (
    <section
      style={{
        background: "linear-gradient(90deg, #4fc3f7 0%, #1976d2 100%)",
        color: "#fff",
        padding: "4rem 2rem 3rem 2rem",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)",
      }}
    >
      <h1
        style={{
          fontSize: "2.8rem",
          fontWeight: 700,
          marginBottom: "1rem",
          letterSpacing: "-1px",
        }}
      >
        Financial Tracker Suite
      </h1>
      <p
        style={{
          fontSize: "1.3rem",
          maxWidth: 600,
          margin: "0 auto 2rem auto",
        }}
      >
        Take control of your finances with ease. Track expenses, manage budgets,
        and gain actionable insights—all in one place.
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
        onMouseOver={(e) => {
          e.target.style.background = "#1976d2";
          e.target.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#fff";
          e.target.style.color = "#1976d2";
        }}
      >
        Get Started
      </a>
    </section>
  );
}

export default HeroSection;