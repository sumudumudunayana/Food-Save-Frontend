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

      // Redirect based on role
      if (user.role === "business") {
        navigate("/business/requests");
      } else if (user.role === "recipient") {
        navigate("/food");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
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

        {/* Left Side */}
        <div className="login-intro">
          <div className="login-intro-content">
            <div className="login-logo">
              🍃
            </div>

            <h1>FoodSave</h1>

            <h2>Save Food. Make a Difference.</h2>

            <p>
              Connect with surplus food from local businesses and help
              reduce avoidable food waste in Sri Lanka.
            </p>

            <div className="login-benefits">
              <div>
                <span>✓</span>
                <p>Discover surplus food</p>
              </div>

              <div>
                <span>✓</span>
                <p>Request available food</p>
              </div>

              <div>
                <span>✓</span>
                <p>Help reduce food waste</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-form-section">
          <div className="login-card">

            <div className="login-header">
              <h2>Welcome Back</h2>

              <p>
                Sign in to continue to FoodSave
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="login-form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="login-form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <div className="login-register">
              <p>
                Don't have an account?
                {" "}
                <Link to="/register">
                  Create an account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default Login;
