import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";

const EDIT_TRANSACTION_URL = `${import.meta.env.VITE_API_TRANSACTION_URL}/`;

function EditTransactionSection({ transaction, onSuccess, onClose }) {
  const [amount, setAmount] = useState(transaction.amount);
  const [remarks, setRemarks] = useState(transaction.remarks);
  const [transactionType, setTransactionType] = useState(
    transaction.transaction_type
  );
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(EDIT_TRANSACTION_URL, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({
          transaction_id: transaction._id,
          amount,
          remarks,
          transaction_type: transactionType,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.status || "Transaction updated successfully!");
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        setErrorMsg(
          data.message || data.error || "Failed to update transaction."
        );
      }
    } catch {
      setErrorMsg("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
        Edit Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 0, step: "any" }}
        />
        <TextField
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          select
          label="Type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1, fontWeight: 600, borderRadius: 3 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Update"}
        </Button>
      </form>
      {successMsg && (
        <Typography color="success.main" mt={2} fontWeight={500}>
          {successMsg}
        </Typography>
      )}
      {errorMsg && (
        <Typography color="error" mt={2} fontWeight={500}>
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
}

export default EditTransactionSection;
