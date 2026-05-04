import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import API from "../api";
import "./OrderSuccess.css";

function OrderSuccess({ clearCart }) {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    clearCart();
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  const steps = ["Processing", "Confirmed", "Shipped", "Delivered"];

  const currentStep = order ? steps.indexOf(order.status) : 0;

  return (
    <div className="success-wrapper">
      <div className="success-card">

        <div className="check-circle">
          <div className="check-icon">
            <AiOutlineCheck />
          </div>
        </div>

        <p className="success-tag">Order Confirmed</p>
        <h2 className="success-title">Thank You for<br />Shopping with <em>Us!</em></h2>
        <p className="success-sub">
          Your order has been placed successfully.<br />
          You'll receive a confirmation on your email shortly.
        </p>

        {/* Order ID */}
        <div className="order-id-box">
          <span>Order ID</span>
          <span>#{orderId?.slice(-6).toUpperCase()}</span>
        </div>

        {/* Delivery Steps */}
        <div className="delivery-steps">
          {steps.map((step, i, arr) => (
            <div key={step} className="step-wrap">
              <div className="step">
                <div className={`step-dot ${i <= currentStep ? "" : "inactive"}`}>
                  {i <= currentStep ? <AiOutlineCheck /> : "○"}
                </div>
                <span>{step}</span>
              </div>
              {i < arr.length - 1 && <div className={`step-line ${i < currentStep ? "done" : ""}`} />}
            </div>
          ))}
        </div>

        {/* Order Items */}
        {order && (
          <div className="success-items">
            <h4>Order Items</h4>
            {order.items?.map((item, i) => (
              <div className="success-item" key={i}>
                <img src={item.img} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <span>Qty: {item.qty} × ₹ {item.price?.toLocaleString()}</span>
                </div>
                <span className="success-item-price">
                  ₹ {(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="success-total">
              <span>Total</span>
              <span>₹ {order.total?.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="btn-group">
          <Link to="/"><button className="btn-primary-ud">Continue Shopping</button></Link>
          <Link to="/orders"><button className="btn-outline-ud">My Orders</button></Link>
        </div>

        <p className="success-note">Expected delivery in 3–5 business days</p>
      </div>
    </div>
  );
}

export default OrderSuccess;