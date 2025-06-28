import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Chip from "@mui/material/Chip";

const TrendingUpIcon = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: { xs: 36, sm: 40 },
      height: { xs: 36, sm: 40 },
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
      color: "#2e7d32",
      fontSize: { xs: "16px", sm: "20px" },
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
      width: { xs: 36, sm: 40 },
      height: { xs: 36, sm: 40 },
      borderRadius: "50%",
      background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
      color: "#c62828",
      fontSize: { xs: "16px", sm: "20px" },
      fontWeight: "bold",
    }}
  >
    ↘
  </Box>
);

const MoreVertIcon = () => (
  <span style={{ fontSize: "16px", color: "#666" }}>⋮</span>
);

function RecentTransactions({
  transactions,
  onEditTransaction,
  onViewTransaction,
  onViewAll,
}) {
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

  const recentTransactions = transactions.slice(0, 5);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
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
          <Box sx={{ p: { xs: 3, sm: 4 }, pb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: "#1e293b",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Recent Transactions
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
            >
              Your latest financial activity
            </Typography>
          </Box>

          {recentTransactions.length === 0 ? (
            <Box sx={{ textAlign: "center", py: { xs: 6, sm: 8 } }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "#64748b",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                No transactions yet
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
              >
                Start by adding your first income or expense
              </Typography>
            </Box>
          ) : (
            <List sx={{ pt: 0 }}>
              {recentTransactions.map((transaction, index) => (
                <Box key={transaction._id}>
                  <ListItem
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 2, sm: 3 },
                      transition: "all 0.2s ease",
                      borderRadius: 2,
                      mx: { xs: 1, sm: 2 },
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
                    onClick={() => onEditTransaction(transaction)}
                    secondaryAction={
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewTransaction(transaction);
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
                    <ListItemIcon sx={{ minWidth: { xs: 50, sm: 60 } }}>
                      {getTransactionIcon(transaction)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#1e293b",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                          }}
                        >
                          {getTxDescription(transaction)}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                        >
                          {formatDate(transaction.createdAt)}
                        </Typography>
                      }
                      sx={{ flex: 1, mr: { xs: 0, sm: 2 } }}
                    />
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: getTransactionColor(transaction),
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
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
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          height: { xs: 20, sm: 24 },
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
                  {index < recentTransactions.length - 1 && (
                    <Divider sx={{ mx: { xs: 3, sm: 4 } }} />
                  )}
                </Box>
              ))}
            </List>
          )}

          {recentTransactions.length > 0 && (
            <Box sx={{ p: { xs: 3, sm: 4 }, pt: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={onViewAll}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
  );
}

export default RecentTransactions;