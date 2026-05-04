import { AiOutlineShoppingCart } from "react-icons/ai";
 import { Link } from "react-router-dom";
import "./OrderHistory.css";
import { useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // User ki email se orders fetch karo
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
        const { data } = await API.get(`/orders/user/${user.email}`);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []); 
  return (
    <div className="oh-wrapper">

      <div className="oh-header">
        <h2>My Orders</h2>
        <p>{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <AiOutlineShoppingCart  className="empty-icon" />
          <h4>No orders yet</h4>
          <p>Looks like you haven't placed any orders yet.</p>
          <Link to="/collections">
            <button className="btn-shop">Start Shopping</button>
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">

            {/* Header */}
            <div className="order-card-header">
              <div className="order-left">
                <div>
                  <div className="order-id">Order <span>#{order._id}</span></div>
                  <div className="order-date">Placed on {order.date}</div>
                </div>
              </div>
              <span className={`status-badge ${order.status?.toLowerCase() || "processing"}`}>
                {order.status || "Processing"}
              </span>
            </div>

            {/* Items */}
            <div className="order-card-body">
              {order.items.map((item) => (
                <div key={item._id} className="order-item-row">
                  <div className="item-left">
                    <div className="item-img-sm">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div>
                      <div className="item-name">{item.title}</div>
                      <div className="item-qty">Qty: {item.qty}{item.size ? ` · Size: ${item.size}` : ""}</div>
                    </div>
                  </div>
                  <span className="item-price-sm">₹ {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="order-card-footer">
              <div className="order-total">Total: <span>₹ {order.total.toLocaleString()}</span></div>
              <div className="footer-btns">
                <button className="btn-track">Track Order</button>
                <button className="btn-reorder">Reorder</button>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;