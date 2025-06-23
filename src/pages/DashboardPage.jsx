import { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import EditTransactionSection from "../sections/EditTransactionSection";
import Modal from "../components/Modal";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);

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

  const handleDeleteTransaction = async (transactionId) => {
    const token = localStorage.getItem("accessToken");
    const url = `${import.meta.env.VITE_API_TRANSACTION_URL}/${transactionId}`;
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    });
    if (res.ok) {
      fetchTransactions();
    } else {
      alert("Failed to delete transaction.");
    }
  };

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
        onDelete={handleDeleteTransaction}
        onEdit={setEditTx}
      />
      <Modal open={!!editTx} onClose={() => setEditTx(null)}>
        {editTx && (
          <EditTransactionSection
            transaction={editTx}
            onSuccess={() => {
              setEditTx(null);
              fetchTransactions();
            }}
            onClose={() => setEditTx(null)}
          />
        )}
      </Modal>
    </main>
  );
}

export default DashboardPage;
