import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { cartService } from "./services";
import { useAuth } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import MyListings from "./pages/MyListings";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import "./responsive.css";
import "./components-styles.css";
import "./product-card-styles.css";
import "./hero-category-styles.css";
import "./toast-styles.css";
import "./product-detail-styles.css";
import "./sidebar-styles.css";

// App Content Component to use auth context
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartCount();
    }
  }, [isAuthenticated]);

  const fetchCartCount = async () => {
    try {
      const response = await cartService.getCart();
      setCartCount(response.data.items.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-listings"
          element={
            <PrivateRoute>
              <MyListings />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
