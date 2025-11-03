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
        <Link to="/add-product" className="btn-primary">
          + Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="no-listings">
          <p>You haven't listed any products yet.</p>
          <Link to="/add-product" className="btn-primary">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="listings-table-container">
          <table className="listings-table">
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
                  <td>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="listing-thumb"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className={`status-badge ${product.status}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <FaEye /> {product.views}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/product/${product._id}`}
                        className="btn-icon"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="btn-icon"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn-icon delete"
                        disabled={deleting === product._id}
                        title="Delete"
                      >
                        <FaTrash />
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
