import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import TransactionList from "../components/TransactionList";

function DashboardSection() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const DASHBOARD_URL = `${import.meta.env.VITE_API_USER_URL}/dashboard`;

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(DASHBOARD_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.data);
          setTransactions(data.transactions);
        } else {
          setError(data.message || "Failed to load dashboard.");
        }
      } catch (err) {
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <section style={sectionStyle}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <span className="loader" />
          <div style={{ marginTop: "1rem", color: "#1976d2" }}>
            Loading dashboard...
          </div>
        </div>
        <style>
          {`
            .loader {
              display: inline-block;
              width: 36px;
              height: 36px;
              border: 4px solid #e3f2fd;
              border-top: 4px solid #1976d2;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </section>
    );
  }

  if (error) {
    return (
      <section style={sectionStyle}>
        <div
          style={{
            color: "#d32f2f",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      </section>
    );
  }

  return (
    <section style={sectionStyle}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 220px", minWidth: 220, maxWidth: 270 }}>
          <ProfileCard user={user} />
        </div>
        <div style={{ flex: "1 1 320px", minWidth: 260 }}>
          <h3
            style={{
              color: "#1976d2",
              fontWeight: 600,
              fontSize: "1.15rem",
              marginBottom: "1rem",
            }}
          >
            Recent Transactions
          </h3>
          <TransactionList transactions={transactions} />
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            section {
              padding: 1.2rem 0.5rem !important;
            }
          }
          @media (max-width: 700px) {
            section > div {
              flex-direction: column !important;
              gap: 1.5rem !important;
            }
          }
        `}
      </style>
    </section>
  );
}

const sectionStyle = {
  background: "#fff",
  borderRadius: "1.2rem",
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  padding: "2.5rem 2rem",
  marginBottom: "2rem",
  minHeight: 320,
};

export default DashboardSection;