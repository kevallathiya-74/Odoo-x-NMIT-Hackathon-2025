import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ cartCount = 0 }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
    setShowDropdown(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">🌿</span>
          <span className="logo-text">EcoFinds</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu desktop-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/add-product" className="nav-link signup-btn">
                  <FaPlus /> <span>Sell Item</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link cart-link">
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="cart-badge"
                    >
                      {cartCount}
                    </motion.span>
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
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                      <Link to="/my-listings" className="dropdown-item">My Listings</Link>
                      <Link to="/orders" className="dropdown-item">My Orders</Link>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <FaSignOutAlt /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link signup-btn">Get Started</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            >
              <motion.div
                className="mobile-menu-content"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-header">
                  <h3>Menu</h3>
                  <button onClick={closeMobileMenu}><FaTimes /></button>
                </div>
                <div className="mobile-links">
                  <Link to="/" onClick={closeMobileMenu} className="mobile-link">Home</Link>
                  {isAuthenticated ? (
                    <>
                      <Link to="/add-product" onClick={closeMobileMenu} className="mobile-link">Sell Item</Link>
                      <Link to="/cart" onClick={closeMobileMenu} className="mobile-link">Cart ({cartCount})</Link>
                      <Link to="/dashboard" onClick={closeMobileMenu} className="mobile-link">Dashboard</Link>
                      <Link to="/my-listings" onClick={closeMobileMenu} className="mobile-link">My Listings</Link>
                      <Link to="/orders" onClick={closeMobileMenu} className="mobile-link">My Orders</Link>
                      <button onClick={handleLogout} className="mobile-link logout">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={closeMobileMenu} className="mobile-link">Login</Link>
                      <Link to="/register" onClick={closeMobileMenu} className="mobile-link highlight">Sign Up</Link>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
