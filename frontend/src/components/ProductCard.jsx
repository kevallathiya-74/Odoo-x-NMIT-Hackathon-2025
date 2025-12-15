import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import LazyImage from "./LazyImage";
import { useAuth } from "../context/AuthContext";
import { cartService } from "../services";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { isAuthenticated, user } = useAuth();
  const [adding, setAdding] = useState(false);
  const isOwner = user?._id && user._id === product.seller?._id;

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? "#ffc107" : "#e4e5e9"} size={14} />
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-container">
        <LazyImage
          src={product.images[0] || "https://via.placeholder.com/400x300"}
          alt={product.title}
          className="product-image"
        />

        {/* Badges */}
        <div className="card-badges">
          <span className={`status-badge ${product.status}`}>
            {product.status}
          </span>
          {product.condition && (
            <span className="condition-badge-card">{product.condition}</span>
          )}
        </div>
      </Link>

      <div className="product-info">
        <div className="product-meta-top">
          <span className="product-brand">{product.brand || product.category}</span>
          <div className="product-rating">
            {renderStars(product.avgRating || 0)}
            <span className="review-count">({product.numReviews || 0})</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>

          {!isOwner && product.status === 'available' ? (
            <button
              className="add-to-cart-btn-card"
              onClick={handleAddToCart}
              disabled={adding}
              title="Add to Cart"
            >
              <FaShoppingCart />
            </button>
          ) : (
            <div className="product-stats">
              <FaEye /> {product.views || 0}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
