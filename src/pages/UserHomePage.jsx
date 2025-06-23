import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SectionCard from "../components/SectionCard";
import ProfileCard from "../components/ProfileCard";
import TransactionList from "../components/TransactionList";
import { useState, useEffect } from "react";

function UserHomePage({ user }) {
  const [transactions1, setTransactions1] = useState([]);

  const fetchTransactions = async (type = "") => {
    const token = localStorage.getItem("accessToken");
    let url = `${import.meta.env.VITE_API_TRANSACTION_URL}/`;
    if (type) url += `?transaction_type=${type}`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    });
    const data = await res.json();
    setTransactions1(data.data || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDeleteTransaction = async (transactionId) => {
    const token = localStorage.getItem("accessToken");
    const url = `${import.meta.env.VITE_API_TRANSACTION_URL}/${transactionId}`;
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    });
    if (res.ok) {
      fetchTransactions();
    } else {
      alert("Failed to delete transaction.");
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        color="primary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Welcome back, {user?.name?.split(" ")[0] || "User"}!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <ProfileCard user={user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <SectionCard>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={600}
              sx={{ mb: 2 }}
            >
              Recent Transactions
            </Typography>
            <TransactionList
              transactions={transactions1}
              onFilter={fetchTransactions}
              onDelete={handleDeleteTransaction}
            />
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserHomePage;