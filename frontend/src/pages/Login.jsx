import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast.jsx";
import { getUserFriendlyError, successMessages } from "../utils/errorMessages";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      showToast('warning', 'Please enter both email and password.');
      return;
    }

    if (!formData.email.includes('@')) {
      showToast('warning', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await login(formData);
      showToast('success', successMessages.login);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = getUserFriendlyError(err);
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🌿</span>
          <h1>Welcome Back</h1>
          <p>Login to EcoFinds</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
