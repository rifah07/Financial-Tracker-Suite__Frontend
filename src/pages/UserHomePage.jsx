import { useState, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "../components/Modal";
import EditTransactionSection from "../sections/EditTransactionSection";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";
import TransactionViewSection from "../components/TransactionViewSection";

// Modular components
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsCards from "../components/dashboard/StatsCards";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import LoadingCard from "../components/dashboard/LoadingCard";

function UserHomePage({
  user,
  transactions: initialTransactions = [],
  isLoading = false,
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [viewTx, setViewTx] = useState(null);
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const fetchTransactions = async (type = "") => {
    const token = localStorage.getItem("accessToken");
    let url = `${import.meta.env.VITE_API_TRANSACTION_URL}/`;
    if (type) url += `?transaction_type=${type}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTransactions(data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (initialTransactions.length === 0) {
      fetchTransactions();
    }
  }, [initialTransactions]);

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.location.reload();
    }
  }, [navigationType]);

  const handleViewAllTransactions = () => {
    navigate("/dashboard");
  };

  if (isLoading || !user) {
    return <LoadingCard />;
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <WelcomeSection user={user} />
      <StatsCards transactions={transactions} user={user} />
      <ChartsSection transactions={transactions} />
      <RecentTransactions
        transactions={transactions}
        onEditTransaction={setEditTx}
        onViewTransaction={setViewTx}
        onViewAll={handleViewAllTransactions}
      />

      {/* Modals */}
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
        <EditTransactionSection
          transaction={editTx}
          onSuccess={() => {
            setEditTx(null);
            fetchTransactions();
          }}
          onClose={() => setEditTx(null)}
        />
      </Modal>
      {viewTx && (
        <TransactionViewSection
          transaction={viewTx}
          onClose={() => setViewTx(null)}
        />
      )}
    </Box>
  );
}

export default UserHomePage;