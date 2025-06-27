import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

function TransactionViewSection({ transaction, onClose }) {
  if (!transaction) return null;

  const getTxType = (tx) => {
    if (tx.transaction_type) return tx.transaction_type.toLowerCase();
    if (tx.type) return tx.type.toLowerCase();
    if (typeof tx.amount === "number") return tx.amount >= 0 ? "income" : "expense";
    return "income";
  };

  const getTxDescription = (tx) => tx.remarks || tx.description || "Transaction";
  const getTxAmount = (tx) => Math.abs(Number(tx.amount) || 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const txType = getTxType(transaction);
  const isIncome = txType === "income";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        zIndex: 1300,
      }}
      onClick={onClose}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "100%",
          maxWidth: { xs: 350, sm: 450 }, // Responsive width
          maxHeight: { xs: "85vh", sm: "80vh" }, // Limit height
          overflowY: "auto",
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          border: "1px solid #e2e8f0",
          bgcolor: "white",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box
            sx={{
              background: isIncome
                ? "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)"
                : "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
              p: { xs: 3, sm: 4 },
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                borderRadius: "50%",
                background: isIncome
                  ? "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)"
                  : "linear-gradient(135deg, #c62828 0%, #f44336 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                color: "white",
              }}
            >
              {isIncome ? "↗" : "↘"}
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: isIncome ? "#2e7d32" : "#c62828",
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              {isIncome ? "+" : "−"}{formatCurrency(getTxAmount(transaction))}
            </Typography>
            <Chip
              label={txType}
              sx={{
                textTransform: "capitalize",
                bgcolor: isIncome ? "#2e7d32" : "#c62828",
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            />
          </Box>

          {/* Details */}
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Transaction Details
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#64748b", mb: 1, fontWeight: 600 }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  color: "#1e293b", 
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", sm: "1rem" }
                }}
              >
                {getTxDescription(transaction)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#64748b", mb: 1, fontWeight: 600 }}
              >
                Date & Time
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  color: "#1e293b", 
                  fontWeight: 500,
                  fontSize: { xs: "0.9rem", sm: "1rem" }
                }}
              >
                {formatDate(transaction.createdAt)}
              </Typography>
            </Box>

            {transaction.category && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#64748b", mb: 1, fontWeight: 600 }}
                  >
                    Category
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: "#1e293b", 
                      fontWeight: 500,
                      fontSize: { xs: "0.9rem", sm: "1rem" }
                    }}
                  >
                    {transaction.category}
                  </Typography>
                </Box>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#64748b", mb: 1, fontWeight: 600 }}
              >
                Transaction ID
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "#64748b", 
                  fontFamily: "monospace",
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  wordBreak: "break-all"
                }}
              >
                {transaction._id}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={onClose}
              sx={{
                py: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "#1e293b",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                "&:hover": {
                  bgcolor: "#0f172a",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TransactionViewSection;