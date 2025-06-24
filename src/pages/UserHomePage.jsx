import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import EditTransactionSection from "../sections/EditTransactionSection";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";

// Elegant icons with professional styling
const TrendingUpIcon = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
      color: "#2e7d32",
      fontSize: "20px",
      fontWeight: "bold",
    }}
  >
    ↗
  </Box>
);

const TrendingDownIcon = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
      color: "#c62828",
      fontSize: "20px",
      fontWeight: "bold",
    }}
  >
    ↘
  </Box>
);

const AccountBalanceWalletIcon = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      borderRadius: "12px",
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      color: "#1565c0",
      fontSize: "24px",
    }}
  >
    💳
  </Box>
);

const AddIcon = () => (
  <span style={{ fontSize: "18px", fontWeight: "bold" }}>+</span>
);
const RemoveIcon = () => (
  <span style={{ fontSize: "18px", fontWeight: "bold" }}>−</span>
);
const MoreVertIcon = () => (
  <span style={{ fontSize: "16px", color: "#666" }}>⋮</span>
);
const PersonIcon = () => <span style={{ fontSize: "2.5rem" }}>👤</span>;

function UserHomePage({
  user,
  transactions: initialTransactions = [],
  isLoading = false,
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const navigate = useNavigate();

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

  const handleDeleteTransaction = async (transactionId) => {
    const token = localStorage.getItem("accessToken");
    const url = `${import.meta.env.VITE_API_TRANSACTION_URL}/${transactionId}`;
    try {
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
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction.");
    }
  };

  const handleViewAllTransactions = () => {
    navigate("/dashboard");
  };

  // Helper functions
  const getTxType = (tx) => {
    if (tx.transaction_type) return tx.transaction_type.toLowerCase();
    if (tx.type) return tx.type.toLowerCase();
    if (typeof tx.amount === "number")
      return tx.amount >= 0 ? "income" : "expense";
    return "income";
  };
  const getTxDescription = (tx) =>
    tx.remarks || tx.description || "Transaction";
  const getTxAmount = (tx) => Math.abs(Number(tx.amount) || 0);
  const getTransactionIcon = (tx) =>
    getTxType(tx) === "income" ? <TrendingUpIcon /> : <TrendingDownIcon />;
  const getTransactionColor = (tx) =>
    getTxType(tx) === "income" ? "#2e7d32" : "#c62828";

  // Dashboard metrics
  const calculateMetrics = () => {
    const recentTransactions = transactions.slice(0, 5);
    const totalIncome = transactions
      .filter((tx) => getTxType(tx) === "income")
      .reduce((sum, tx) => sum + getTxAmount(tx), 0);
    const totalExpenses = transactions
      .filter((tx) => getTxType(tx) === "expense")
      .reduce((sum, tx) => sum + getTxAmount(tx), 0);
    return {
      recentTransactions,
      totalIncome,
      totalExpenses,
      transactionCount: transactions.length,
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading || !user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            maxWidth: 450,
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <LinearProgress
              sx={{
                borderRadius: 2,
                height: 8,
                bgcolor: "#e3f2fd",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#1976d2",
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 600, color: "#1565c0" }}
          >
            Loading your dashboard...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we fetch your data
          </Typography>
        </Card>
      </Box>
    );
  }

  const metrics = calculateMetrics();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        pb: 8,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e2e8f0",
          mb: { xs: 4, md: 6 },
          px: { xs: 0, md: 0 },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 3, md: 5 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  fontWeight: 700,
                  color: "#1e293b",
                  letterSpacing: "-0.025em",
                }}
              >
                Welcome back, {user?.name?.split(" ")[0] || "User"}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#64748b", fontWeight: 400, mb: 2 }}
              >
                Here's what's happening with your finances today
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                Member since {formatDate(user?.createdAt)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { xs: "center", md: "right" } }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#f1f5f9",
                  fontSize: "2rem",
                  mx: { xs: "auto", md: 0 },
                  border: "3px solid #e2e8f0",
                  color: "#475569",
                }}
              >
                <PersonIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 0 } }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
          {/* Balance Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <AccountBalanceWalletIcon />
                  <Typography
                    variant="h6"
                    sx={{ ml: 2, fontWeight: 600, color: "#1e293b" }}
                  >
                    Current Balance
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    color: "#1565c0",
                  }}
                >
                  {formatCurrency(user?.balance || 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available funds
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Income Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <TrendingUpIcon />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    color: "#2e7d32",
                  }}
                >
                  {formatCurrency(metrics.totalIncome)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Income
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Expenses Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <TrendingDownIcon />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    color: "#c62828",
                  }}
                >
                  {formatCurrency(metrics.totalExpenses)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Expenses
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions & Transactions */}
        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 4, fontWeight: 600, color: "#1e293b" }}
                >
                  Quick Actions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setShowAddIncome(true)}
                    startIcon={<AddIcon />}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 600,
                      bgcolor: "#2e7d32",
                      boxShadow: "0 4px 14px rgba(46, 125, 50, 0.3)",
                      "&:hover": {
                        bgcolor: "#1b5e20",
                        boxShadow: "0 6px 20px rgba(46, 125, 50, 0.4)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Add Income
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setShowAddExpense(true)}
                    startIcon={<RemoveIcon />}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 600,
                      bgcolor: "#c62828",
                      boxShadow: "0 4px 14px rgba(198, 40, 40, 0.3)",
                      "&:hover": {
                        bgcolor: "#b71c1c",
                        boxShadow: "0 6px 20px rgba(198, 40, 40, 0.4)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Add Expense
                  </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mb: 2, color: "#64748b" }}>
                    Total Transactions
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: "#1565c0",
                    }}
                  >
                    {metrics.transactionCount}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 4, pb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 600, color: "#1e293b" }}
                  >
                    Recent Transactions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your latest financial activity
                  </Typography>
                </Box>

                {metrics.recentTransactions.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: "#64748b" }}>
                      No transactions yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start by adding your first income or expense
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ pt: 0 }}>
                    {metrics.recentTransactions.map((transaction, index) => (
                      <Box key={transaction._id}>
                        <ListItem
                          sx={{
                            px: 4,
                            py: 3,
                            transition: "all 0.2s ease",
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: "rgba(0,0,0,0.01)",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                            "&:hover": {
                              bgcolor: "#f8fafc",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => setEditTx(transaction)}
                          secondaryAction={
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTransaction(transaction._id);
                              }}
                              sx={{
                                color: "#94a3b8",
                                "&:hover": { bgcolor: "#f1f5f9" },
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          }
                        >
                          <ListItemIcon sx={{ minWidth: 60 }}>
                            {getTransactionIcon(transaction)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600, color: "#1e293b" }}
                              >
                                {getTxDescription(transaction)}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatDate(transaction.createdAt)}
                              </Typography>
                            }
                          />
                          <Box sx={{ textAlign: "right", mr: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: getTransactionColor(transaction),
                              }}
                            >
                              {getTxType(transaction) === "income" ? "+" : "−"}
                              {formatCurrency(getTxAmount(transaction))}
                            </Typography>
                            <Chip
                              label={getTxType(transaction)}
                              size="small"
                              sx={{
                                textTransform: "capitalize",
                                fontSize: "0.75rem",
                                height: 24,
                                mt: 1,
                                bgcolor:
                                  getTxType(transaction) === "income"
                                    ? "#e8f5e8"
                                    : "#ffebee",
                                color: getTransactionColor(transaction),
                                fontWeight: 500,
                              }}
                            />
                          </Box>
                        </ListItem>
                        {index < metrics.recentTransactions.length - 1 && (
                          <Divider sx={{ mx: 4 }} />
                        )}
                      </Box>
                    ))}
                  </List>
                )}

                {metrics.recentTransactions.length > 0 && (
                  <Box sx={{ p: 4, pt: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleViewAllTransactions}
                      sx={{
                        py: 2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#d1d5db",
                        color: "#374151",
                        "&:hover": {
                          borderColor: "#1565c0",
                          color: "#1565c0",
                          bgcolor: "#f8fafc",
                        },
                      }}
                    >
                      View All Transactions
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

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
    </Box>
  );
}

export default UserHomePage;
