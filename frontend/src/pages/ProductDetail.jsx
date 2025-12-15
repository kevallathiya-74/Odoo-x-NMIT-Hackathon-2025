import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService, cartService } from "../services";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { FaShoppingCart, FaUser, FaCheckCircle, FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setAddingToCart(true);
    try {
      await cartService.addToCart(product._id);
      // Ideally show a toast here
    } catch (error) {
      console.error("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="container">
        <p>Product not found</p>
      </div>
    );
  }

  const isOwnProduct = user?._id && user._id === product.seller?._id;

  return (
    <div className="product-detail-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span onClick={() => navigate('/')} className="link">Home</span>
        <span className="separator">&gt;</span>
        <span className="link" style={{ textTransform: 'capitalize' }}>{product.category || 'Category'}</span>
        <span className="separator">&gt;</span>
        <span className="current">{product.title}</span>
      </div>

      <div className="product-detail-grid">
        {/* Left: Product Images */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img
              src={product.images[activeImage] || "https://via.placeholder.com/600x400"}
              alt={product.title}
              className="main-image"
            />
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="product-info-content">
          <span className="product-brand">{product.brand || product.category}</span>
          <h1 className="product-title-large">{product.title}</h1>

          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={18} color={i < (product.avgRating || 0) ? "#fbbf24" : "#e5e7eb"} />
              ))}
            </div>
            <span className="review-count">({product.numReviews || 0} reviews)</span>
          </div>

          <div className="price-block">
            <div>
              <span className="price-label">Price</span>
              <span className="current-price">₹{product.price}</span>
            </div>
            {product.condition && (
              <span className={`status-badge ${product.condition.toLowerCase().replace(' ', '-')}`}>
                {product.condition}
              </span>
            )}
          </div>

          <div className="description-block">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {!isOwnProduct && product.status === "available" ? (
              <>
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="btn btn-primary btn-lg"
                >
                  <FaShoppingCart />
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
                <button className="btn btn-buy-now btn-lg">
                  Buy Now
                </button>
              </>
            ) : (
              <div style={{ padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', textAlign: 'center', gridColumn: '1 / -1' }}>
                {isOwnProduct ? "You are selling this item." : "Item Unavailable"}
                {isOwnProduct && <button onClick={() => navigate(`/edit-product/${product._id}`)} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>Edit Listing</button>}
              </div>
            )}
          </div>

          {/* Seller Card */}
          <div className="seller-card">
            <div className="seller-avatar">
              <FaUser />
            </div>
            <div className="seller-info">
              <h4>
                {product.seller?.username || 'EcoFinds Seller'}
                <FaCheckCircle className="verified-badge" title="Verified Seller" />
              </h4>
              <span className="seller-role">Verified Seller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <button className="write-review-btn">Write a Review</button>
        </div>

        {(!product.reviews || product.reviews.length === 0) ? (
          <div className="review-empty">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <p>Reviews list would go here...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
