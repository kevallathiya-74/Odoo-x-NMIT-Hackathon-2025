import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = ({ cartCount = 0 }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">🌿</span>
          <span className="logo-text">EcoFinds</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/add-product" className="nav-link add-product-btn" onClick={closeMobileMenu}>
                  <FaPlus /> <span>Sell Item</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link cart-link" onClick={closeMobileMenu}>
                  <FaShoppingCart />
                  <span className="nav-link-text">Cart</span>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </li>
              <li
                className="nav-item profile-dropdown"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="nav-link profile-btn">
                  <FaUser /> <span>{user?.username}</span>
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/dashboard" className="dropdown-item" onClick={closeMobileMenu}>
                      Dashboard
                    </Link>
                    <Link to="/my-listings" className="dropdown-item" onClick={closeMobileMenu}>
                      My Listings
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={closeMobileMenu}>
                      My Orders
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link signup-btn" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
