import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../services";
import Loader from "../components/Loader";

const categories = [
  "Electronics",
  "Clothing",
  "Furniture",
  "Books",
  "Sports",
  "Toys",
  "Home & Garden",
  "Automotive",
  "Other",
];

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Electronics",
    condition: "Good",
    images: [""],
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductById(id);
      const product = response.data;
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition,
        images: product.images,
      });
    } catch (error) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUpdating(true);

    try {
      await productService.updateProduct(id, {
        ...formData,
        price: parseFloat(formData.price),
      });
      navigate("/my-listings");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update product. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Edit Product</h1>
        <p className="form-subtitle">Update your listing</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="title">Product Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition *</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Image URL</label>
            <input
              type="url"
              id="images"
              name="images"
              value={formData.images[0]}
              onChange={(e) =>
                setFormData({ ...formData, images: [e.target.value] })
              }
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/my-listings")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={updating}>
              {updating ? "Updating..." : "Update Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
