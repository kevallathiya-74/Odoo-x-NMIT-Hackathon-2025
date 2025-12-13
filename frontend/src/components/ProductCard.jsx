import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";
import LazyImage from "./LazyImage";
import { useAuth } from "../context/AuthContext";
import { cartService } from "../services";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { isAuthenticated, user } = useAuth();
  const [adding, setAdding] = useState(false);
  const isOwner = user?._id === product.seller?._id;

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    if (!isAuthenticated) return;

    setAdding(true);
    try {
      await cartService.addToCart(product._id);
      // Optional: Show toast
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-container">
        <LazyImage
          src={product.images[0] || "https://via.placeholder.com/400x300"}
          alt={product.title}
          className="product-image"
        />
        <span className={`status-badge ${product.status}`} style={{ position: 'absolute', top: '10px', left: '10px' }}>
          {product.status}
        </span>

        {/* Overlay Action Button */}
        {!isOwner && product.status === 'available' && (
          <button
            className="card-action-btn"
            onClick={handleAddToCart}
            disabled={adding}
            title="Add to Cart"
          >
            <FaShoppingCart />
          </button>
        )}
      </Link>

      <div className="product-info">
        <Link to={`/product/${product._id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>
        <p className="product-category">{product.category}</p>

        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <div className="product-stats" style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
            <FaEye /> {product.views || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
