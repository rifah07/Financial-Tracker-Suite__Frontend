import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Modal from "../components/Modal";

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
      <div style={{ padding: 32, textAlign: "center" }}>Loading profile...</div>
    );
  if (!user)
    return (
      <div style={{ padding: 32, textAlign: "center" }}>No profile found.</div>
    );

  return (
    <>
      <ProfileCard user={user} />
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "2rem",
            padding: "0.7rem 2rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "0.5rem",
            transition: "background 0.2s",
          }}
        >
          Delete Account
        </button>
      </div>
      <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h3
            style={{
              color: "#d32f2f",
              marginBottom: 16,
            }}
          >
            Confirm Account Deletion
          </h3>
          <p style={{ marginBottom: 24 }}>
            Are you sure you want to{" "}
            <b>permanently delete</b> your account? This action cannot be undone.
          </p>
          {deleteError && (
            <div
              style={{
                color: "#d32f2f",
                marginBottom: 12,
              }}
            >
              {deleteError}
            </div>
          )}
          {deleteSuccess && (
            <div
              style={{
                color: "#388e3c",
                marginBottom: 12,
              }}
            >
              {deleteSuccess}
            </div>
          )}
          <button
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
            style={{
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "2rem",
              padding: "0.7rem 2rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: deleteLoading ? "not-allowed" : "pointer",
              marginRight: 10,
            }}
          >
            {deleteLoading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            style={{
              background: "#e3f2fd",
              color: "#1976d2",
              border: "none",
              borderRadius: "2rem",
              padding: "0.7rem 2rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              marginLeft: 10,
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProfilePage;