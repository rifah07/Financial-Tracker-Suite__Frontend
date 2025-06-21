import FeatureCard from "../components/FeatureCard";

function DashboardSection() {
  return (
    <section
      style={{
        background: "#fff",
        borderRadius: "1.2rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        padding: "2.5rem 2rem",
        marginBottom: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "#1976d2",
        }}
      >
        Welcome to Your Dashboard
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "2rem" }}>
        Effortlessly monitor your spending, set savings goals, and visualize
        your financial health.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
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
  );
}

export default DashboardSection;
