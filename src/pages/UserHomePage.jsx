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
import Modal from "../components/Modal";
import EditTransactionSection from "../sections/EditTransactionSection";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";

// Icons (using text symbols for compatibility)
const TrendingUpIcon = () => <span style={{ color: '#4caf50', fontSize: '22px' }}>↗</span>;
const TrendingDownIcon = () => <span style={{ color: '#f44336', fontSize: '22px' }}>↘</span>;
const AccountBalanceWalletIcon = () => <span style={{ color: '#2196f3', fontSize: '22px' }}>💳</span>;
const AddIcon = () => <span style={{ fontSize: '18px' }}>+</span>;
const RemoveIcon = () => <span style={{ fontSize: '18px' }}>-</span>;
const MoreVertIcon = () => <span style={{ fontSize: '18px' }}>⋮</span>;
const PersonIcon = () => <span style={{ fontSize: '24px' }}>👤</span>;

function UserHomePage({ user, transactions: initialTransactions = [], isLoading = false }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editTx, setEditTx] = useState(null);

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

  // Delete handler
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

  // Helper: robust type detection
  const getTxType = (tx) => {
    if (tx.transaction_type) return tx.transaction_type.toLowerCase();
    if (tx.type) return tx.type.toLowerCase();
    if (typeof tx.amount === "number") return tx.amount >= 0 ? "income" : "expense";
    return "income";
  };
  const getTxDescription = (tx) => tx.remarks || tx.description || "Transaction";
  const getTxAmount = (tx) => Math.abs(Number(tx.amount) || 0);
  const getTransactionIcon = (tx) => getTxType(tx) === "income" ? <TrendingUpIcon /> : <TrendingDownIcon />;
  const getTransactionColor = (tx) => getTxType(tx) === "income" ? "#4caf50" : "#f44336";

  // Dashboard metrics
  const calculateMetrics = () => {
    const recentTransactions = transactions.slice(0, 5);
    const totalIncome = transactions
      .filter(tx => getTxType(tx) === "income")
      .reduce((sum, tx) => sum + getTxAmount(tx), 0);
    const totalExpenses = transactions
      .filter(tx => getTxType(tx) === "expense")
      .reduce((sum, tx) => sum + getTxAmount(tx), 0);
    return {
      recentTransactions,
      totalIncome,
      totalExpenses,
      transactionCount: transactions.length
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading || !user) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center'
      }}>
        <Box sx={{ width: '100%', maxWidth: 400, mb: 3 }}>
          <LinearProgress sx={{ borderRadius: 1, height: 6 }} />
        </Box>
        <Typography variant="h5" color="primary" fontWeight={600}>
          Loading your dashboard...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please wait while we fetch your data
        </Typography>
      </Box>
    );
  }

  const metrics = calculateMetrics();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7fb', pb: 6 }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 5,
          borderRadius: 4,
          background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                mb: 1,
                fontSize: { xs: '2rem', md: '2.7rem' },
                letterSpacing: '-1px'
              }}
            >
              Welcome, {user?.name?.split(" ")[0] || "User"}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.93, mb: 2 }}>
              Your personal finance dashboard
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Member since {formatDate(user?.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'rgba(255,255,255,0.18)',
                fontSize: '2.5rem',
                mx: { xs: 'auto', md: 0 },
                border: '3px solid #fff'
              }}
            >
              <PersonIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            zIndex: 1
          }}
        />
      </Paper>

      {/* Stats and Actions */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWalletIcon />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                  Balance
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
                {formatCurrency(user?.balance || 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Available balance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={6}>
              <Card sx={{
                height: '100%',
                borderRadius: 4,
                background: 'linear-gradient(120deg, #43e97b 0%, #38f9d7 100%)',
                color: '#222',
                boxShadow: '0 4px 16px rgba(67,233,123,0.08)'
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <TrendingUpIcon />
                  <Typography variant="h4" color="success.main" fontWeight={800} sx={{ mt: 1, mb: 1 }}>
                    {formatCurrency(metrics.totalIncome)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Income
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{
                height: '100%',
                borderRadius: 4,
                background: 'linear-gradient(120deg, #fa709a 0%, #fee140 100%)',
                color: '#222',
                boxShadow: '0 4px 16px rgba(250,112,154,0.08)'
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <TrendingDownIcon />
                  <Typography variant="h4" color="error.main" fontWeight={800} sx={{ mt: 1, mb: 1 }}>
                    {formatCurrency(metrics.totalExpenses)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Expenses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => setShowAddIncome(true)}
                  startIcon={<AddIcon />}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.13)',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(76, 175, 80, 0.18)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Add Income
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => setShowAddExpense(true)}
                  startIcon={<RemoveIcon />}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(244, 67, 54, 0.13)',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(244, 67, 54, 0.18)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Add Expense
                </Button>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Total Transactions
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={800}>
                  {metrics.transactionCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4, height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, pb: 1 }}>
                <Typography variant="h6" fontWeight={700} color="primary">
                  Recent Transactions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your latest financial activity
                </Typography>
              </Box>
              {metrics.recentTransactions.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
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
                          px: 3,
                          py: 2,
                          borderRadius: 2,
                          mb: 1,
                          bgcolor: 'rgba(0,0,0,0.01)',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                          '&:hover': {
                            bgcolor: 'rgba(102,126,234,0.07)',
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => setEditTx(transaction)}
                        secondaryAction={
                          <IconButton size="small" onClick={e => { e.stopPropagation(); handleDeleteTransaction(transaction._id); }}>
                            <MoreVertIcon />
                          </IconButton>
                        }
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {getTransactionIcon(transaction)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight={600}>
                              {getTxDescription(transaction)}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(transaction.createdAt)}
                            </Typography>
                          }
                        />
                        <Box sx={{ textAlign: 'right', mr: 1 }}>
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            sx={{ color: getTransactionColor(transaction) }}
                          >
                            {getTxType(transaction) === "income" ? "+" : "-"}
                            {formatCurrency(getTxAmount(transaction))}
                          </Typography>
                          <Chip
                            label={getTxType(transaction)}
                            size="small"
                            variant="outlined"
                            sx={{
                              textTransform: 'capitalize',
                              fontSize: '0.75rem',
                              height: 20,
                              mt: 0.5
                            }}
                          />
                        </Box>
                      </ListItem>
                      {index < metrics.recentTransactions.length - 1 && (
                        <Divider sx={{ mx: 3 }} />
                      )}
                    </Box>
                  ))}
                </List>
              )}
              {metrics.recentTransactions.length > 0 && (
                <Box sx={{ p: 3, pt: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2
                    }}
                    onClick={() => fetchTransactions()}
                  >
                    View All Transactions
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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