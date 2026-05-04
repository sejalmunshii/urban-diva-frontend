import { useEffect, useState } from "react";
import API from "../api";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
      if (selectedOrder?._id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await API.delete(`/orders/${id}`);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="ao-wrapper">

      {/* Header */}
      <div className="ao-header">
        <div>
          <h2>Orders</h2>
          <p>{orders.length} total orders</p>
        </div>
      </div>

      <div className="ao-layout">

        {/* Orders List */}
        <div className="ao-list">
          {orders.length === 0 ? (
            <div className="ao-empty">
              <p>No orders yet!</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className={`ao-item ${selectedOrder?._id === order._id ? "active" : ""}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="ao-item-top">
                  <span className="ao-order-id">#{order._id.slice(-6).toUpperCase()}</span>
                  <span className={`status-pill ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="ao-item-name">{order.name}</div>
                <div className="ao-item-bottom">
                  <span>₹ {order.total?.toLocaleString()}</span>
                  <span>{new Date(order.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Detail */}
        {selectedOrder ? (
          <div className="ao-detail">

            <div className="ao-detail-header">
              <div>
                <h3>Order #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
                <p>{new Date(selectedOrder.createdAt).toLocaleString("en-IN")}</p>
              </div>
              <button className="ao-delete-btn" onClick={() => deleteOrder(selectedOrder._id)}>
                Delete
              </button>
            </div>

            {/* Customer Info */}
            <div className="ao-detail-section">
              <h4>Customer Details</h4>
              <div className="ao-info-grid">
                <div className="ao-info-item">
                  <span>Name</span>
                  <p>{selectedOrder.name}</p>
                </div>
                <div className="ao-info-item">
                  <span>Phone</span>
                  <p>{selectedOrder.phone || "—"}</p>
                </div>
                <div className="ao-info-item">
                  <span>Email</span>
                  <p>{selectedOrder.email || "—"}</p>
                </div>
                <div className="ao-info-item">
                  <span>City</span>
                  <p>{selectedOrder.city || "—"}</p>
                </div>
                <div className="ao-info-item" style={{ gridColumn: "1/-1" }}>
                  <span>Address</span>
                  <p>{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="ao-detail-section">
              <h4>Order Items</h4>
              <div className="ao-items-list">
                {selectedOrder.items?.map((item, i) => (
                  <div className="ao-order-item" key={i}>
                    <img src={item.img} alt={item.title} />
                    <div className="ao-order-item-info">
                      <h5>{item.title}</h5>
                      <p>Qty: {item.qty}</p>
                    </div>
                    <span className="ao-item-price">
                      ₹ {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="ao-total">
                <span>Total</span>
                <span>₹ {selectedOrder.total?.toLocaleString()}</span>
              </div>
            </div>

            {/* Update Status */}
            <div className="ao-detail-section">
              <h4>Update Status</h4>
              <div className="ao-status-btns">
                {["Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                  <button
                    key={s}
                    className={`ao-status-btn ${selectedOrder.status === s ? "active" : ""} ${s.toLowerCase()}`}
                    onClick={() => updateStatus(selectedOrder._id, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="ao-no-select">
            <p>Select an order to view details</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminOrders;