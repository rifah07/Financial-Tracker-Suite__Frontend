import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_USER_URL;
const REGISTER_URL = `${BASE_URL}/register`;

function RegisterSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    balance: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const payload = {
        ...form,
        balance: form.balance ? Number(form.balance) : undefined,
      };
      if (!payload.balance) delete payload.balance;
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status === 201) {
        setSuccessMsg(data.status);
        setForm({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          balance: "",
        });
      } else {
        setErrorMsg(data.error || "Registration failed.");
      }
    } catch (err) {
      setErrorMsg("Internal server error");
    } finally {
      setLoading(false);
    }
  };

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
      <h2
        style={{
          fontSize: "1.7rem",
          fontWeight: 600,
          marginBottom: "1.2rem",
          color: "#1976d2",
        }}
      >
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 5 chars)"
          value={form.password}
          onChange={handleChange}
          required
          minLength={5}
          style={inputStyle}
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={form.confirm_password}
          onChange={handleChange}
          required
          minLength={5}
          style={inputStyle}
        />
        <input
          type="number"
          name="balance"
          placeholder="Initial Balance (optional)"
          value={form.balance}
          onChange={handleChange}
          min={0}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "2rem",
            padding: "0.8rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "0.5rem",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {successMsg && (
          <div
            style={{ color: "#388e3c", marginTop: "0.5rem", fontWeight: 500 }}
          >
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div
            style={{ color: "#d32f2f", marginTop: "0.5rem", fontWeight: 500 }}
          >
            {errorMsg}
          </div>
        )}
      </form>
    </section>
  );
}

const inputStyle = {
  padding: "0.7rem 1rem",
  borderRadius: "0.5rem",
  border: "1px solid #bdbdbd",
  fontSize: "1rem",
  outline: "none",
};

export default RegisterSection;