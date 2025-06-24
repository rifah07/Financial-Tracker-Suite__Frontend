import { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import EditTransactionSection from "../sections/EditTransactionSection";
import Modal from "../components/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

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
    <main
      style={{
        flex: 1,
        padding: "2.5rem 1rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
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

      <TransactionList
        transactions={transactions}
        onFilter={fetchTransactions}
        onDelete={handleDeleteTransaction}
        onEdit={setEditTx}
      />

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
    </main>
  );
}

export default DashboardPage;
