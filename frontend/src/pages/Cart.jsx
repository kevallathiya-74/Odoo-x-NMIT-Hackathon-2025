import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartService, orderService } from "../services";
import Loader from "../components/Loader";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    setUpdating(true);
    try {
      const response = await cartService.updateCartItem(productId, newQuantity);
      setCart(response.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    setUpdating(true);
    try {
      const response = await cartService.removeFromCart(productId);
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await orderService.createOrder({});
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setCheckingOut(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  if (loading) return <Loader />;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.product?.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.product?.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product?.title}</h3>
                  <p className="item-category">{item.product?.category}</p>
                  <p className="item-price">${item.product?.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      disabled={updating || item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      disabled={updating}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="remove-btn"
                    disabled={updating}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="checkout-btn"
              disabled={checkingOut}
            >
              {checkingOut ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
