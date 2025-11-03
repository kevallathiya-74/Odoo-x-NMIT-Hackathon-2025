import { Link } from "react-router-dom";
import { FaHeart, FaEye } from "react-icons/fa";
import LazyImage from "./LazyImage";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image-container">
          <LazyImage
            src={product.images[0] || "https://via.placeholder.com/400x300"}
            alt={product.title}
            className="product-image"
          />
          <span className={`status-badge ${product.status}`}>
            {product.status}
          </span>
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <div className="product-stats">
              <span className="stat">
                <FaEye /> {product.views || 0}
              </span>
            </div>
          </div>
          {product.condition && (
            <span className="condition-badge">{product.condition}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
