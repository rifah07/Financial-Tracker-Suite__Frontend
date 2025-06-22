import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import LockResetIcon from "@mui/icons-material/LockReset";

const RESET_PW_URL = `${import.meta.env.VITE_API_USER_URL}/resetpw`;

function ResetPasswordSection() {
  const [form, setForm] = useState({
    email: "",
    reset_code: "",
    new_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await fetch(RESET_PW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Password updated successfully!");
        setForm({ email: "", reset_code: "", new_password: "" });
      } else {
        setErrorMsg(data.error || "Failed to reset password.");
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
        mt: 6,
        p: 4,
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      <LockResetIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
        Reset Password
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Enter your email, the reset code sent to your email, and your new
        password.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Reset Code"
          name="reset_code"
          value={form.reset_code}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Password"
          type="password"
          name="new_password"
          value={form.new_password}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1, fontWeight: 600, borderRadius: 3 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
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

export default ResetPasswordSection;
