import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./AdminLogin.css";

function AdminLogin({ setAdminToken }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/admin/login", form);
      localStorage.setItem("adminToken", data.token);
      setAdminToken(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">

        <div className="admin-logo">
          URBAN <em>Diva</em>
          <span>Admin Panel</span>
        </div>

        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@urbandiva.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="admin-error">{error}</p>}

          <button className="admin-login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AdminLogin;