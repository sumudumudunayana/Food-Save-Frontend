import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Auth/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/users/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const user = response.data.user;

      // Store logged-in user information
      localStorage.setItem("foodSaveUser", JSON.stringify(user));

      // Redirect all users to Home
      navigate("/home");

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">

        {/* LEFT SIDE */}
        <div className="login-intro">

          <div className="login-bg-circle circle-one"></div>
          <div className="login-bg-circle circle-two"></div>

          <div className="login-intro-content">

            {/* Brand */}
            <div className="login-brand">

              <div className="login-logo">
                🍃
              </div>

              <div>
                <span className="brand-small">
                  WELCOME TO
                </span>

                <h1>
                  FoodSave
                </h1>
              </div>

            </div>

            {/* Main Heading */}
            <div className="intro-heading">

              <span className="intro-label">
                MAKE AN IMPACT
              </span>

              <h2>
                Save food.
                <br />
                <span>
                  Share kindness.
                </span>
              </h2>

              <p>
                Connect surplus food with people who need it and help
                create a more sustainable Sri Lanka, one meal at a time.
              </p>

            </div>

            {/* Benefits */}
            <div className="login-benefits">

              <div className="benefit-item">

                <div className="benefit-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Discover surplus food
                  </strong>

                  <p>
                    Find available food from local businesses.
                  </p>
                </div>

              </div>

              <div className="benefit-item">

                <div className="benefit-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Request what you need
                  </strong>

                  <p>
                    Connect with businesses and request food.
                  </p>
                </div>

              </div>

              <div className="benefit-item">

                <div className="benefit-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Reduce food waste
                  </strong>

                  <p>
                    Turn surplus food into meaningful support.
                  </p>
                </div>

              </div>

            </div>

            {/* Impact */}
            <div className="login-impact">

              <span className="impact-dot"></span>

              <span>
                Building a more sustainable future together
              </span>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-section">

          <div className="login-card">

            {/* Mobile Brand */}
            <div className="mobile-brand">

              <div className="mobile-logo">
                🍃
              </div>

              <span>
                FoodSave
              </span>

            </div>

            {/* Header */}
            <div className="login-header">

              <span className="form-label">
                WELCOME BACK
              </span>

              <h2>
                Sign in to your account
              </h2>

              <p>
                Enter your details below to continue.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Error */}
              {error && (
                <div className="login-error">

                  <span className="error-icon">
                    !
                  </span>

                  <span>
                    {error}
                  </span>

                </div>
              )}

              {/* Email */}
              <div className="login-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    ✉
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="login-form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="login-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="button-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

            {/* Register */}
            <div className="login-register">

              <p>
                Don't have an account?

                <Link to="/register">
                  Create an account
                </Link>
              </p>

            </div>

            {/* Footer */}
            <div className="login-footer">

              <span>
                🌱
              </span>

              <p>
                Every saved meal makes a difference.
              </p>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
};

export default Login;