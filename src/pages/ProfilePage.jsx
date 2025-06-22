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

  if (loading)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2 }}>Loading profile...</Typography>
      </Box>
    );
  if (!user)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>No profile found.</Typography>
      </Box>
    );

  return (
    <>
      <ProfileCard user={user} />
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowConfirm(true)}
          sx={{
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: 2,
          }}
        >
          Delete Account
        </Button>
      </Box>
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle sx={{ color: "error.main" }}>
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to <b>permanently delete</b> your account?
            This action cannot be undone.
          </Typography>
          {deleteError && (
            <Typography color="error" sx={{ mb: 1 }}>
              {deleteError}
            </Typography>
          )}
          {deleteSuccess && (
            <Typography color="success.main" sx={{ mb: 1 }}>
              {deleteSuccess}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Yes, Delete"
            )}
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProfilePage;
