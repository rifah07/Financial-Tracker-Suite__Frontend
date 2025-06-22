import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import TransactionList from "../components/TransactionList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

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
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2 }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, px: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <ProfileCard user={user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 2 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={600}
              sx={{ mb: 2 }}
            >
              Recent Transactions
            </Typography>
            <TransactionList transactions={transactions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardSection;
