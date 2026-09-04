import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/common/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const storedUser = localStorage.getItem("foodSaveUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("foodSaveUser");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          FoodSave
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">

          <Link to="/home">
            Home
          </Link>

          <Link to="/food">
            Browse Food
          </Link>

          {/* Business / Admin Navigation */}
          {user &&
            (user.role === "business" || user.role === "admin") && (
              <>
                <Link to="/business/add-food">
                  Add Food
                </Link>

                <Link to="/business/requests">
                  Requests
                </Link>
              </>
            )}

          {/* Recipient Navigation */}
          {user && user.role === "recipient" && (
            <Link to="/recipient/requests">
              My Requests
            </Link>
          )}

          <Link to="/about">
            About
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="navbar-actions">

          {!user ? (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="navbar-user">
                Hi, {user.name}
              </span>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`mobile-menu-btn ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <div className="mobile-menu-links">

          <Link to="/home" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/food" onClick={closeMenu}>
            Browse Food
          </Link>

          {/* Business / Admin Navigation */}
          {user &&
            (user.role === "business" || user.role === "admin") && (
              <>
                <Link
                  to="/business/add-food"
                  onClick={closeMenu}
                >
                  Add Food
                </Link>

                <Link
                  to="/business/requests"
                  onClick={closeMenu}
                >
                  Requests
                </Link>
              </>
            )}

          {/* Recipient Navigation */}
          {user && user.role === "recipient" && (
            <Link
              to="/recipient/requests"
              onClick={closeMenu}
            >
              My Requests
            </Link>
          )}

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          {/* Mobile Authentication */}
          <div className="mobile-menu-actions">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="mobile-login-btn"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="mobile-register-btn"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <div className="mobile-user">
                  Hi, {user.name}
                </div>

                <button
                  type="button"
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;