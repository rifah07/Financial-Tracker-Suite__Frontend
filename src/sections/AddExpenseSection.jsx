import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const ADD_EXPENSE_URL = `${import.meta.env.VITE_API_TRANSACTION_URL}/addExpense`;

function AddExpenseSection({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
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
      const res = await fetch(ADD_EXPENSE_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify({ amount, remarks }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Expense added successfully!");
        setAmount("");
        setRemarks("");
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg(data.message || data.error || "Failed to add expense.");
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
      <MoneyOffIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h5" fontWeight={700} color="error" mb={2}>
        Add Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 0, step: "any" }}
        />
        <TextField
          label="Remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 100 }}
          helperText="At least 5 characters"
        />
        <Button
          type="submit"
          variant="contained"
          color="error"
          fullWidth
          disabled={loading}
          sx={{ py: 1, fontWeight: 600, borderRadius: 3 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Expense"}
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

export default AddExpenseSection;