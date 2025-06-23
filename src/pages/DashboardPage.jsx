import { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (type = "") => {
    const token = localStorage.getItem("accessToken");
    let url = `${import.meta.env.VITE_API_TRANSACTION_URL}/`;
    if (type) url += `?transaction_type=${type}`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    });
    const data = await res.json();
    setTransactions(data.data || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main
      style={{
        flex: 1,
        padding: "2.5rem 1rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <TransactionList
        transactions={transactions}
        onFilter={fetchTransactions}
      />
    </main>
  );
}

export default DashboardPage;