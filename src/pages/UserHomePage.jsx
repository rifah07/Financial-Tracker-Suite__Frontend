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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Modal from "../components/Modal";
import EditTransactionSection from "../sections/EditTransactionSection";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";

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
const PersonIcon = () => <span style={{ fontSize: "2.5rem" }}>👤</span>;
const MoreVertIcon = () => (
  <span style={{ fontSize: "16px", color: "#666" }}>⋮</span>
);

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

  // Dashboard metrics and chart data
  const calculateMetrics = () => {
    const recentTransactions = transactions.slice(0, 5);
    const totalIncome = transactions
      .filter((tx) => getTxType(tx) === "income")
      .reduce((sum, tx) => sum + getTxAmount(tx), 0);
    const totalExpenses = transactions
      .filter((tx) => getTxType(tx) === "expense")
      .reduce((sum, tx) => sum + getTxAmount(tx), 0);

    // Generate monthly data for charts
    const monthlyData = generateMonthlyData(transactions);
    const categoryData = generateCategoryData(transactions);

    return {
      recentTransactions,
      totalIncome,
      totalExpenses,
      transactionCount: transactions.length,
      monthlyData,
      categoryData,
    };
  };

  const generateMonthlyData = (transactions) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const monthlyStats = {};
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = months[monthIndex];
      monthlyStats[monthName] = { income: 0, expenses: 0, month: monthName };
    }
    transactions.forEach((tx) => {
      const txDate = new Date(tx.createdAt);
      const monthName = months[txDate.getMonth()];
      if (monthlyStats[monthName]) {
        const amount = getTxAmount(tx);
        if (getTxType(tx) === "income") {
          monthlyStats[monthName].income += amount;
        } else {
          monthlyStats[monthName].expenses += amount;
        }
      }
    });
    return Object.values(monthlyStats);
  };

  const generateCategoryData = (transactions) => {
    const categories = {};
    transactions.forEach((tx) => {
      const type = getTxType(tx);
      const category = tx.category || type;
      if (!categories[category]) {
        categories[category] = { name: category, value: 0, type };
      }
      categories[category].value += getTxAmount(tx);
    });
    return Object.values(categories).slice(0, 6); // Top 6 categories
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
  const COLORS = [
    "#1565c0",
    "#2e7d32",
    "#c62828",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Welcome Section */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 5 },
          pt: { xs: 4, md: 6 },
          pb: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            px: { xs: 3, md: 5 },
            py: { xs: 2, md: 3 },
            mb: { xs: 3, md: 4 },
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "#f1f5f9",
              fontSize: "2.5rem",
              border: "3px solid #e2e8f0",
              color: "#475569",
            }}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                letterSpacing: "-0.025em",
                mb: 0.5,
              }}
            >
              Welcome Back, {user?.name?.split(" ")[0] || "User"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#64748b", fontWeight: 400 }}
            >
              Member since {formatDate(user?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 5 },
          mb: { xs: 3, md: 4 },
        }}
      >
        <Grid container spacing={3}>
          {/* Current Balance */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: { xs: 160, md: 140 },
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: { xs: 40, sm: 40, md: 36 },
                      width: { xs: 246, sm: 400, md: 173 },

                      borderRadius: "10px",
                      bgcolor: "rgba(255,255,255,0.2)",
                      fontSize: "18px",
                    }}
                  >
                    💳
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ ml: 2, fontWeight: 600, color: "white" }}
                  >
                    Current Balance
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {formatCurrency(user?.balance || 0)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Available funds
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Total Income */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: { sm: 160, md: 140 },
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 1,
                    height: { xs: 40, sm: 40, md: 36 },
                    width: { xs: 148, sm: 128, md: 162 },
                  }}
                >
                  <TrendingUpIcon />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
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
          {/* Total Expenses */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: { sm: 160, md: 140 },
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 1,
                    height: { xs: 40, sm: 40, md: 36 },
                    width: { xs: 148, sm: 128, md: 162 },
                  }}
                >
                  <TrendingDownIcon />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
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
          {/* Transaction Count */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: { xs: 180, sm: 160, md: 140 },
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: { xs: 60, sm: 40, md: 36 },
                      width: { xs: 500, sm: 128, md: 162 },
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                      color: "#1565c0",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    📊
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#1565c0",
                  }}
                >
                  {metrics.transactionCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Transactions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 5 },
          mb: { xs: 3, md: 4 },
        }}
      >
        <Grid container spacing={2}>
          {/* Monthly Income vs Expenses Chart */}
          <Grid item xs={12} sm={2} md={7}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                height: { xs: 320, md: 380 },
                width: { xs: 420, sm: 574, md: 640 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, fontWeight: 600, color: "#1e293b" }}
                >
                  Monthly Income vs Expenses
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Financial overview for the last 6 months
                </Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metrics.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                      <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(value), ""]}
                        labelStyle={{ color: "#1e293b" }}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#2e7d32"
                        fill="#2e7d32"
                        fillOpacity={0.6}
                        name="Income"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stackId="2"
                        stroke="#c62828"
                        fill="#c62828"
                        fillOpacity={0.6}
                        name="Expenses"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {/* Category Breakdown Chart */}
          <Grid item xs={12} sm={2} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                height: { xs: 350, sm: 350, md: 380 },
                width: { xs: 420, sm: 574, md: 410 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, fontWeight: 600, color: "#1e293b" }}
                >
                  Category Breakdown
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Distribution by category
                </Typography>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={metrics.categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {metrics.categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [formatCurrency(value), "Amount"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Transactions Table */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 5 },
          mb: { xs: 4, md: 6 },
        }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
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
                          transform: "translateY(-1px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                          <Typography variant="body2" color="text.secondary">
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
