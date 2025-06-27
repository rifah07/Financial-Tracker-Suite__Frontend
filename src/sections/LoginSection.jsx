import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const BASE_URL = import.meta.env.VITE_API_USER_URL;
const LOGIN_URL = `${BASE_URL}/login`;

function LoginSection({ onLoginSuccess, onForgotPassword }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

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
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200) {
        setSuccessMsg(data.message || "Login successful!");
        setForm({ email: "", password: "" });
        // Save accessToken here:
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        if (onLoginSuccess) onLoginSuccess();
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setErrorMsg(data.error || "Login failed.");
      }
    } catch (err) {
      setErrorMsg("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "1.2rem",
          color: "#1976d2",
          textAlign: "center",
        }}
      >
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
      >
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
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            if (onForgotPassword) onForgotPassword();
            navigate("/forgot-password");
          }}
          sx={{ alignSelf: "flex-end", mb: 1 }}
        >
          Forgot password?
        </Link>
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
          {loading ? "Logging in..." : "Login"}
        </button>
        {successMsg && (
          <div
            style={{
              color: "#388e3c",
              marginTop: "0.5rem",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div
            style={{
              color: "#d32f2f",
              marginTop: "0.5rem",
              fontWeight: 500,
              textAlign: "center",
            }}
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

export default LoginSection;