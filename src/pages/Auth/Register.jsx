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

        {/* Left Side */}
        <div className="register-intro">
          <div className="register-intro-content">

            <div className="register-logo">
              🍃
            </div>

            <h1>FoodSave</h1>

            <h2>Join the Movement</h2>

            <p>
              Help reduce food waste by connecting surplus food with
              people and communities that can use it.
            </p>

            <div className="register-benefits">

              <div>
                <span>✓</span>
                <p>Businesses can share surplus food</p>
              </div>

              <div>
                <span>✓</span>
                <p>Recipients can request available food</p>
              </div>

              <div>
                <span>✓</span>
                <p>Together we can reduce food waste</p>
              </div>

            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="register-form-section">

          <div className="register-card">

            <div className="register-header">
              <h2>Create Account</h2>

              <p>
                Join FoodSave and make a difference
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {error && (
                <div className="register-error">
                  {error}
                </div>
              )}

              {success && (
                <div className="register-success">
                  {success}
                </div>
              )}

              {/* Name */}
              <div className="register-form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="register-form-group">
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

              {/* Phone */}
              <div className="register-form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Role */}
              <div className="register-form-group">
                <label htmlFor="role">
                  Account Type
                </label>

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

              {/* Location */}
              <div className="register-form-group">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Polonnaruwa"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="register-form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div className="register-form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            <div className="register-login">

              <p>
                Already have an account?{" "}
                <Link to="/login">
                  Sign In
                </Link>
              </p>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
};

export default Register;