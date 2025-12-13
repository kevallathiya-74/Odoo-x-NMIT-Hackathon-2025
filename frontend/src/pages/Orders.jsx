import { useState, useEffect } from "react";
import { orderService } from "../services";
import Loader from "../components/Loader";
import { FaBox, FaCalendar } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <FaBox size={60} />
          <p>You haven't made any purchases yet</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p className="order-date">
                    <FaCalendar /> {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className={`order-status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.title}
                    />
                    <div className="order-item-details">
                      <h4>{item.title}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-price">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total Amount:</strong>
                  <span className="total-price">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="order-payment">
                  <strong>Payment:</strong> {order.paymentMethod}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
