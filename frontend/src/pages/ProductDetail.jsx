import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService, cartService } from "../services";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { FaShoppingCart, FaUser, FaTag, FaEye } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("Added to cart successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add to cart");
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

  const isOwnProduct = user?._id === product.seller._id;

  return (
    <div className="product-detail-container">
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img
            src={product.images[0] || "https://via.placeholder.com/600x400"}
            alt={product.title}
          />
          <span className={`status-badge ${product.status}`}>
            {product.status}
          </span>
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <div className="product-meta">
            <span className="category">
              <FaTag /> {product.category}
            </span>
            <span className="views">
              <FaEye /> {product.views} views
            </span>
          </div>

          <div className="product-price-section">
            <span className="price">₹{product.price}</span>
            <span className="condition-badge">{product.condition}</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="seller-info">
            <h3>
              <FaUser /> Seller Information
            </h3>
            <p>
              <strong>Name:</strong> {product.seller.username}
            </p>
            <p>
              <strong>Email:</strong> {product.seller.email}
            </p>
            {product.seller.phone && (
              <p>
                <strong>Phone:</strong> {product.seller.phone}
              </p>
            )}
          </div>

          {message && <div className="success-message">{message}</div>}

          {!isOwnProduct && product.status === "available" && (
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="btn btn-primary add-to-cart-btn"
            >
              <FaShoppingCart />
              {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
          )}

          {isOwnProduct && (
            <div className="owner-actions">
              <button
                onClick={() => navigate(`/edit-product/${product._id}`)}
                className="btn btn-secondary"
              >
                Edit Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
