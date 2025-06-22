function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <section
      style={{
        background: "#fff",
        borderRadius: "1.2rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        padding: "2.5rem 2rem",
        maxWidth: 420,
        margin: "2rem auto",
      }}
    >
      <div
        style={{
          background: "#e3f2fd",
          borderRadius: "50%",
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "#1976d2",
          margin: "0 auto 1rem auto",
        }}
      >
        {user?.name?.[0]?.toUpperCase() || "U"}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "1.2rem", color: "#1976d2" }}>
          {user?.name}
        </div>
        <div style={{ color: "#555", fontSize: "0.98rem", margin: "0.2rem 0" }}>
          {user?.email}
        </div>
        <div style={{ color: "#333", fontWeight: 600, marginTop: "0.7rem" }}>
          Balance:{" "}
          <span style={{ color: "#388e3c", fontWeight: 700 }}>
            $
            {user?.balance?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div
          style={{ color: "#888", fontSize: "0.85rem", marginTop: "0.5rem" }}
        >
          Member since{" "}
          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
        </div>
        <div
          style={{
            color: "#666",
            fontSize: "1rem",
            marginTop: "1.2rem",
            fontStyle: "italic",
          }}
        >
          {user?.bio ? user.bio : "This user has not added a bio yet."}
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;