import { useState, useEffect } from "react";
import EditTransactionSection from "../sections/EditTransactionSection";
import Modal from "../components/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";

// Enhanced icons for income/expense
const TrendingUpIcon = () => (
  <Avatar
    sx={{
      bgcolor: "#e8f5e8",
      color: "#2e7d32",
      width: 48,
      height: 48,
      fontSize: "1.5rem",
      fontWeight: "bold",
    }}
  >
    ↗
  </Avatar>
);

const TrendingDownIcon = () => (
  <Avatar
    sx={{
      bgcolor: "#ffebee",
      color: "#c62828",
      width: 48,
      height: 48,
      fontSize: "1.5rem",
      fontWeight: "bold",
    }}
  >
    ↘
  </Avatar>
);

const EmptyStateIcon = () => (
  <Box
    sx={{
      width: 120,
      height: 120,
      borderRadius: "50%",
      bgcolor: "rgba(99, 102, 241, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mx: "auto",
      mb: 3,
    }}
  >
    <Typography sx={{ fontSize: "3rem", opacity: 0.6 }}>💰</Typography>
  </Box>
);

function getTxType(tx) {
  if (tx.transaction_type) return tx.transaction_type.toLowerCase();
  if (tx.type) return tx.type.toLowerCase();
  if (typeof tx.amount === "number")
    return tx.amount >= 0 ? "income" : "expense";
  return "income";
}

function getTxDescription(tx) {
  return tx.remarks || tx.description || "Transaction";
}

function getTxAmount(tx) {
  return Math.abs(Number(tx.amount) || 0);
}

function getTransactionIcon(tx) {
  return getTxType(tx) === "income" ? <TrendingUpIcon /> : <TrendingDownIcon />;
}

function getTransactionColor(tx) {
  return getTxType(tx) === "income" ? "#2e7d32" : "#c62828";
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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

  // Sort transactions by latest date first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header Card */}
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            mb: 4,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              transform: "translate(50%, -50%)",
            }}
          />
          <CardContent
            sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "center" },
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: "-0.5px",
                    mb: 1,
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Transactions
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "1.1rem",
                  }}
                >
                  Manage your income and expenses
                </Typography>
              </Box>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => setShowAddIncome(true)}
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    bgcolor: "#4caf50",
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)",
                    textTransform: "none",
                    minWidth: 140,
                    "&:hover": {
                      bgcolor: "#388e3c",
                      boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Add Income
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowAddExpense(true)}
                  startIcon={<RemoveIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    bgcolor: "#f44336",
                    boxShadow: "0 6px 20px rgba(244, 67, 54, 0.3)",
                    textTransform: "none",
                    minWidth: 140,
                    "&:hover": {
                      bgcolor: "#d32f2f",
                      boxShadow: "0 8px 25px rgba(244, 67, 54, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Add Expense
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            border: "1px solid #e2e8f0",
            bgcolor: "white",
            overflow: "hidden",
          }}
        >
          {sortedTransactions.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <EmptyStateIcon />
              <Typography
                variant="h5"
                sx={{ mb: 2, color: "#64748b", fontWeight: 600 }}
              >
                No transactions yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Start by adding your first income or expense to track your
                finances
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => setShowAddIncome(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Add Income
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowAddExpense(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Add Expense
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              {sortedTransactions.map((transaction, index) => (
                <Fade
                  in={true}
                  timeout={300 + index * 100}
                  key={transaction._id || index}
                >
                  <Box>
                    <Box
                      sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "#f8fafc",
                          transform: "translateX(4px)",
                        },
                      }}
                      onClick={() => setEditTx(transaction)}
                    >
                      {/* Transaction Icon */}
                      <Box sx={{ flexShrink: 0 }}>
                        {getTransactionIcon(transaction)}
                      </Box>

                      {/* Transaction Details */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#1e293b",
                            mb: 0.5,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                          }}
                        >
                          {getTxDescription(transaction)}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "#64748b", fontSize: "0.95rem" }}
                          >
                            {formatDate(transaction.createdAt)}
                          </Typography>
                          <Chip
                            label={getTxType(transaction)}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "0.75rem",
                              height: 24,
                              bgcolor:
                                getTxType(transaction) === "income"
                                  ? "#e8f5e8"
                                  : "#ffebee",
                              color: getTransactionColor(transaction),
                              fontWeight: 600,
                              border: `1px solid ${getTransactionColor(
                                transaction
                              )}20`,
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Amount and Actions */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexShrink: 0,
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "flex-end", sm: "center" },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: getTransactionColor(transaction),
                            fontSize: { xs: "1.1rem", sm: "1.3rem" },
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getTxType(transaction) === "income" ? "+" : "−"}
                          {formatCurrency(getTxAmount(transaction))}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditTx(transaction);
                            }}
                            sx={{
                              color: "#1976d2",
                              bgcolor: "#e3f2fd",
                              width: 36,
                              height: 36,
                              "&:hover": {
                                bgcolor: "#bbdefb",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.2s ease",
                            }}
                            aria-label="Edit"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this transaction?"
                                )
                              ) {
                                handleDeleteTransaction(transaction._id);
                              }
                            }}
                            sx={{
                              color: "#c62828",
                              bgcolor: "#ffebee",
                              width: 36,
                              height: 36,
                              "&:hover": {
                                bgcolor: "#ffcdd2",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.2s ease",
                            }}
                            aria-label="Delete"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    {index < sortedTransactions.length - 1 && (
                      <Divider sx={{ mx: { xs: 2, sm: 4 } }} />
                    )}
                  </Box>
                </Fade>
              ))}
            </Box>
          )}
        </Card>
      </Container>

      {/* Modals */}
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
    </Box>
  );
}

export default DashboardPage;