function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div
        style={{
          color: "#888",
          fontSize: "1.05rem",
          textAlign: "center",
          padding: "1.5rem 0",
        }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/money.svg"
          alt="No transactions"
          style={{ width: 48, opacity: 0.5, marginBottom: 12 }}
        />
        <div>
          No recent transactions yet.
          <br />
          Start tracking your finances!
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
      {transactions.map((tx) => (
        <div
          key={tx._id}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f5faff",
            borderRadius: "0.6rem",
            padding: "0.8rem 1rem",
            boxShadow: "0 1px 4px rgba(79,195,247,0.07)",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 600,
                color: tx.type === "debit" ? "#d32f2f" : "#388e3c",
              }}
            >
              {tx.type === "debit" ? "−" : "+"}$
              {Math.abs(tx.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
            <div style={{ color: "#1976d2", fontSize: "0.97rem" }}>
              {tx.description}
            </div>
          </div>
          <div
            style={{ color: "#888", fontSize: "0.93rem", textAlign: "right" }}
          >
            {new Date(tx.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;