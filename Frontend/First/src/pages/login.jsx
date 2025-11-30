import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const res = await fetch(`${base}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || json.message || "Login failed");
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
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input name="email" type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input name="password" type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;