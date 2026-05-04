import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/users/signup", form);
      setSuccess(data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-logo">
          URBAN <em>Diva</em>
          <span>Create your account</span>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {success ? (
          <div className="auth-success">
            <h4>🎉 Check your email!</h4>
            <p>{success}</p>
            <p style={{ fontSize: "12px", marginTop: "8px" }}>
              Redirecting to login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="auth-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;