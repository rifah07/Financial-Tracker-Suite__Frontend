import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { keyframes } from "@mui/system";

// Elegant animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_USER_URL}/dashboard`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token || ""}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) setUser(data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    setDeleteSuccess("");
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${import.meta.env.VITE_API_USER_URL}/deleteAccount/${user._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setDeleteSuccess("Account deleted successfully. Redirecting...");
        localStorage.removeItem("accessToken");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setDeleteError(data.message || "Failed to delete account.");
      }
    } catch {
      setDeleteError("Failed to delete account.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8fafc",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Card
          sx={{
            p: 6,
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            textAlign: "center",
            maxWidth: 400,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            <CircularProgress size={40} sx={{ color: "white" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: 1,
            }}
          >
            Loading Profile
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
            }}
          >
            Please wait while we fetch your information...
          </Typography>
        </Card>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8fafc",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Card
          sx={{
            p: 6,
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            textAlign: "center",
            maxWidth: 400,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              fontSize: "2rem",
            }}
          >
            ⚠️
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: 1,
            }}
          >
            Profile Not Found
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
            }}
          >
            Unable to load your profile information.
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: { xs: 4, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(102, 126, 234, 0.08)",
          filter: "blur(100px)",
          animation: `${pulse} 8s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(74, 222, 128, 0.06)",
          filter: "blur(120px)",
          animation: `${pulse} 10s ease-in-out infinite reverse`,
        }}
      />

      <Container maxWidth="md">
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            animation: `${fadeIn} 0.8s ease-out`,
          }}
        >
          <Chip
            label="👤 User Profile"
            sx={{
              mb: 3,
              bgcolor: "#667eea",
              color: "white",
              fontWeight: 700,
              px: 3,
              py: 1,
              fontSize: "1rem",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 2,
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.2rem", md: "2.8rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Welcome, {user.name || "User"}!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              fontWeight: 400,
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            View and manage your account information
          </Typography>
        </Box>

        {/* Profile Card */}
        <Box
          sx={{
            animation: `${fadeIn} 0.8s ease-out 0.2s both`,
            mb: 6,
          }}
        >
          <ProfileCard user={user} />
        </Box>

        {/* Danger Zone */}
        <Card
          sx={{
            borderRadius: 4,
            border: "2px solid #fecaca",
            background: "linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)",
            boxShadow: "0 10px 40px rgba(239, 68, 68, 0.1)",
            animation: `${fadeIn} 0.8s ease-out 0.4s both`,
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                  fontSize: "1.5rem",
                  boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
                }}
              >
                ⚠️
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#dc2626",
                  mb: 2,
                }}
              >
                Danger Zone
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  mb: 4,
                  maxWidth: 400,
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Once you delete your account, there is no going back. Please be
                certain as this action cannot be undone.
              </Typography>
              <Button
                variant="contained"
                onClick={() => setShowConfirm(true)}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 2,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(239, 68, 68, 0.4)",
                    background:
                      "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Delete Account Permanently
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
            border: "1px solid #e2e8f0",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            textAlign: "center",
            py: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            ⚠️ Confirm Account Deletion
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "1rem",
              },
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              This action is irreversible!
            </Typography>
          </Alert>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              color: "#374151",
            }}
          >
            Are you absolutely sure you want to{" "}
            <Typography component="span" fontWeight={700} color="error">
              permanently delete
            </Typography>{" "}
            your account? This will:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <Typography
              component="li"
              variant="body2"
              sx={{ mb: 1, color: "#64748b" }}
            >
              Delete all your financial data and transaction history
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{ mb: 1, color: "#64748b" }}
            >
              Remove your profile and account information
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{ color: "#64748b" }}
            >
              Cannot be recovered or undone
            </Typography>
          </Box>

          {deleteError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {deleteError}
            </Alert>
          )}
          {deleteSuccess && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {deleteSuccess}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 4, gap: 2 }}>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="error"
            disabled={deleteLoading}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              textTransform: "none",
              minWidth: 140,
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              },
            }}
          >
            {deleteLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Yes, Delete Forever"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfilePage;
