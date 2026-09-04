import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Auth/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!formData.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!formData.password) {
      return "Please create a password.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      return "Please confirm your password.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!formData.role) {
      return "Please select your account type.";
    }

    if (!formData.location.trim()) {
      return "Please enter your location.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
        location: formData.location.trim(),
      };

      await API.post("/users", userData);

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        location: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-container">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="register-intro">

          {/* Decorative Background */}
          <div className="register-bg-circle register-circle-one"></div>
          <div className="register-bg-circle register-circle-two"></div>

          <div className="register-intro-content">

            {/* Brand */}
            <div className="register-brand">

              <div className="register-logo">
                🍃
              </div>

              <div>
                <span className="register-brand-small">
                  WELCOME TO
                </span>

                <h1>FoodSave</h1>
              </div>

            </div>

            {/* Heading */}
            <div className="register-intro-heading">

              <span className="register-intro-label">
                JOIN THE MOVEMENT
              </span>

              <h2>
                Be part of the
                <br />
                <span>food-saving community.</span>
              </h2>

              <p>
                Join FoodSave and help connect surplus food with
                people and communities that can use it.
              </p>

            </div>

            {/* Benefits */}
            <div className="register-benefits">

              <div className="register-benefit-item">

                <div className="register-benefit-icon">
                  ✓
                </div>

                <div>
                  <strong>Businesses can share surplus food</strong>

                  <p>
                    Give surplus food a meaningful destination.
                  </p>
                </div>

              </div>

              <div className="register-benefit-item">

                <div className="register-benefit-icon">
                  ✓
                </div>

                <div>
                  <strong>Recipients can request food</strong>

                  <p>
                    Discover and request available food.
                  </p>
                </div>

              </div>

              <div className="register-benefit-item">

                <div className="register-benefit-icon">
                  ✓
                </div>

                <div>
                  <strong>Help reduce food waste</strong>

                  <p>
                    Together, small actions create real impact.
                  </p>
                </div>

              </div>

            </div>

            {/* Impact */}
            <div className="register-impact">

              <span className="register-impact-dot"></span>

              <span>
                Every meal saved is a step towards a better future
              </span>

            </div>

          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="register-form-section">

          <div className="register-card">

            {/* Mobile Brand */}
            <div className="register-mobile-brand">

              <div className="register-mobile-logo">
                🍃
              </div>

              <span>FoodSave</span>

            </div>

            {/* Header */}
            <div className="register-header">

              <span className="register-form-label">
                GET STARTED
              </span>

              <h2>Create your account</h2>

              <p>
                Join FoodSave and make a difference.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Error */}
              {error && (
                <div className="register-error">

                  <span className="register-error-icon">
                    !
                  </span>

                  <span>
                    {error}
                  </span>

                </div>
              )}

              {/* Success */}
              {success && (
                <div className="register-success">

                  <span className="register-success-icon">
                    ✓
                  </span>

                  <span>
                    {success}
                  </span>

                </div>
              )}

              {/* =================================================
                  NAME
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    👤
                  </span>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />

                </div>

              </div>

              {/* =================================================
                  EMAIL
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
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

              {/* =================================================
                  PHONE
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    ☎
                  </span>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />

                </div>

              </div>

              {/* =================================================
                  ACCOUNT TYPE
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="role">
                  Account Type
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    ◉
                  </span>

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select account type
                    </option>

                    <option value="business">
                      Business
                    </option>

                    <option value="recipient">
                      Recipient
                    </option>

                  </select>

                </div>

              </div>

              {/* =================================================
                  LOCATION
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="location">
                  Location
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    📍
                  </span>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Polonnaruwa"
                    value={formData.location}
                    onChange={handleChange}
                    autoComplete="address-level2"
                  />

                </div>

              </div>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                </div>

                <small className="register-password-hint">
                  Minimum 6 characters
                </small>

              </div>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================== */}

              <div className="register-form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="register-input-wrapper">

                  <span className="register-input-icon">
                    🔒
                  </span>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}

              <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="register-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="register-button-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

            {/* Login */}
            <div className="register-login">

              <p>
                Already have an account?
                <Link to="/login">
                  Sign In
                </Link>
              </p>

            </div>

            {/* Footer */}
            <div className="register-footer">

              <span>🌱</span>

              <p>
                Together, we can save more food.
              </p>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
};

export default Register;