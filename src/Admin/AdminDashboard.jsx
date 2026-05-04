import { useEffect, useState } from "react";
import API from "../api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, o] = await Promise.all([
          API.get("/products"),
          API.get("/orders"),
        ]);
        setProducts(p.data);
        setOrders(o.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const processing = orders.filter((o) => o.status === "Processing").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="dashboard-wrapper">

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fde8e8" }}>📦</div>
          <div className="stat-info">
            <h4>{products.length}</h4>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e8f5ee" }}>🛒</div>
          <div className="stat-info">
            <h4>{orders.length}</h4>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fff8e8" }}>💰</div>
          <div className="stat-info">
            <h4>₹ {totalRevenue.toLocaleString()}</h4>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e8f0ff" }}>🚚</div>
          <div className="stat-info">
            <h4>{processing}</h4>
            <p>Processing</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="dash-section">
        <div className="dash-section-head">
          <h3>Recent Orders</h3>
        </div>
        {orders.length === 0 ? (
          <p className="no-data">No orders yet!</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">#{order._id.slice(-6).toUpperCase()}</td>
                    <td>{order.name}</td>
                    <td>{order.items?.length} items</td>
                    <td>₹ {order.total?.toLocaleString()}</td>
                    <td>
                      <span className={`status-pill ${order.status?.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Products */}
      <div className="dash-section">
        <div className="dash-section-head">
          <h3>Recent Products</h3>
        </div>
        <div className="dash-products">
          {products.slice(0, 4).map((p) => (
            <div className="dash-product-item" key={p._id}>
              <img src={p.img} alt={p.title} />
              <div>
                <h5>{p.title}</h5>
                <p>₹ {p.price?.toLocaleString()}</p>
              </div>
              <span className={`stock-pill ${p.stock < 5 ? "low" : ""}`}>
                Stock: {p.stock}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;