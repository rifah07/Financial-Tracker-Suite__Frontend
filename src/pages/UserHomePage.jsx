import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SectionCard from "../components/SectionCard";
import ProfileCard from "../components/ProfileCard";
import TransactionList from "../components/TransactionList";
import { useState, useEffect } from "react";
import EditTransactionSection from "../sections/EditTransactionSection";
import Modal from "@mui/material/Modal";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";
import Button from "@mui/material/Button";

function UserHomePage({ user, transactions: initialTransactions = [], isLoading = false }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editTx, setEditTx] = useState(null);

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
    setTransactions(data.data || []);
  };

  useEffect(() => {
    if (initialTransactions.length === 0) {
      fetchTransactions();
    }
  }, [initialTransactions]);

  // Delete handler
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
    if (res.ok) fetchTransactions();
    else alert("Failed to delete transaction.");
  };

  // If data is loading or user is null, show a loading message
  if (isLoading || !user) {
    return (
      <Box sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 }, px: { xs: 1, md: 2 }, textAlign: "center" }}>
        <Typography variant="h5" color="primary">
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
      <Box 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          mb: 4, 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          sx={{ 
            mb: 1, 
            textAlign: "center",
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Here's a summary of your financial activity
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
        <Grid item xs={12} md={4}>
          <ProfileCard user={user} />

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowAddIncome(true)}
              startIcon={<span>+</span>}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                '&:hover': { boxShadow: '0 6px 16px rgba(76, 175, 80, 0.3)' }
              }}
            >
              Add Income
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowAddExpense(true)}
              startIcon={<span>-</span>}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.2)',
                '&:hover': { boxShadow: '0 6px 16px rgba(244, 67, 54, 0.3)' }
              }}
            >
              Add Expense
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <SectionCard sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            '&:hover': { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }
          }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={600}
              sx={{ mb: 3, borderBottom: '2px solid #e3f2fd', pb: 1 }}
            >
              Recent Transactions
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <TransactionList
                transactions={transactions}
                onEdit={setEditTx}
                onFilter={fetchTransactions}
                onDelete={handleDeleteTransaction}
              />
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
      <Modal open={showAddIncome} onClose={() => setShowAddIncome(false)}>
        <AddIncomeSection
          onSuccess={() => {
            setShowAddIncome(false);
            fetchTransactions();
          }}
        />
      </Modal>
      <Modal open={showAddExpense} onClose={() => setShowAddExpense(false)}>
        <AddExpenseSection
          onSuccess={() => {
            setShowAddExpense(false);
            fetchTransactions();
          }}
        />
      </Modal>
      <Modal open={!!editTx} onClose={() => setEditTx(null)}>
        {editTx && (
          <EditTransactionSection
            transaction={editTx}
            onSuccess={() => {
              setEditTx(null);
              fetchTransactions();
            }}
            onClose={() => setEditTx(null)}
          />
        )}
      </Modal>
    </Box>
  );
}

export default UserHomePage;
