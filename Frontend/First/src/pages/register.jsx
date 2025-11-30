import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const res = await fetch(`${base}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || json.message || "Registration failed");
        return;
      }
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user || null));
      navigate("/");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        <input name="name" type="text" placeholder="Full Name" value={form.name}
               onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input name="email" type="email" placeholder="Email" value={form.email}
               onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input name="password" type="password" placeholder="Password" value={form.password}
               onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;