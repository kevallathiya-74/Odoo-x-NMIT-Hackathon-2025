import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services";
import Loader from "../components/Loader";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MyListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await productService.getMyListings();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    setDeleting(id);
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="my-listings-container">
      <div className="listings-header">
        <h1>My Listings</h1>
        <Link to="/add-product" className="btn btn-primary">
          + Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No Listings Yet</h3>
          <p>You haven't listed any products yet.</p>
          <Link to="/add-product" className="btn btn-primary">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="listings-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td data-label="Image">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="table-image"
                    />
                  </td>
                  <td data-label="Title">{product.title}</td>
                  <td data-label="Category">{product.category}</td>
                  <td data-label="Price">₹{product.price}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${product.status}`}>
                      {product.status}
                    </span>
                  </td>
                  <td data-label="Views">
                    <FaEye /> {product.views}
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-secondary"
                        title="View"
                      >
                        <FaEye /> View
                      </Link>
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="edit-btn"
                        title="Edit"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="delete-btn"
                        disabled={deleting === product._id}
                        title="Delete"
                      >
                        <FaTrash /> {deleting === product._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListings;
