import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import EmailIcon from "@mui/icons-material/Email";

const FORGOT_PW_URL = `${import.meta.env.VITE_API_USER_URL}/forgotpw`;

function ForgotPasswordSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await fetch(FORGOT_PW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.status || "Reset code sent to email successfully.");
        setEmail("");
      } else {
        setErrorMsg(data.error || "Failed to send reset code.");
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
      <EmailIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
        Forgot Password
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Enter your email address and we'll send you a 5-digit reset code.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            "Send Reset Code"
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

export default ForgotPasswordSection;