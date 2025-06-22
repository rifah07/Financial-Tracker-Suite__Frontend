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
      <h3
        style={{
          fontSize: "1.15rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: "#1976d2",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.98rem", color: "#444" }}>{description}</p>
    </div>
  );
}

export default FeatureCard;