import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        profileImage: user.profileImage || "",
        address: user.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await authService.updateProfile(formData);
      updateUser(response.data);
      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <img
            src={formData.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />
          <h1>User Dashboard</h1>
          <p>Manage your profile information</p>
        </div>

        {message && (
          <div
            className={
              message.includes("success") ? "success-message" : "error-message"
            }
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-section">
            <h3>
              <FaUser /> Personal Information
            </h3>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!editing}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone /> Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="profileImage">Profile Image URL</label>
              <input
                type="url"
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                disabled={!editing}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>
              <FaMapMarkerAlt /> Address Information
            </h3>

            <div className="form-group">
              <label htmlFor="address.street">Street Address</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={!editing}
                placeholder="123 Main St"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.city">City</label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address.state">State</label>
                <input
                  type="text"
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="State"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.zipCode">Zip Code</label>
                <input
                  type="text"
                  id="address.zipCode"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="12345"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address.country">Country</label>
                <input
                  type="text"
                  id="address.country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setMessage("");
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
