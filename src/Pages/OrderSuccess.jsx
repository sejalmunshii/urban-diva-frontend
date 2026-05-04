import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import "./OrderSuccess.css";

function OrderSuccess() {
  const orderId = `UD-${Math.floor(Math.random() * 90000) + 10000}`;

  return (
    <div className="success-wrapper">
      <div className="success-card">

        {/* Check Circle */}
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
          <span>#{orderId}</span>
        </div>

        {/* Delivery Steps */}
        <div className="delivery-steps">
          {[
            { label: "Ordered", done: true },
            { label: "Packed",  done: false },
            { label: "Shipped", done: false },
            { label: "Delivered", done: false },
          ].map((step, i, arr) => (
            <div key={step.label} className="step-wrap">
              <div className="step">
                <div className={`step-dot ${step.done ? "" : "inactive"}`}>
                  {step.done ? <AiOutlineCheck /> : "○"}
                </div>
                <span>{step.label}</span>
              </div>
              {i < arr.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="btn-group">
          <Link to="/">
            <button className="btn-primary-ud">Continue Shopping</button>
          </Link>
          <Link to="/">
            <button className="btn-outline-ud">Track Order</button>
          </Link>
        </div>

        <p className="success-note">Expected delivery in 3–5 business days</p>

      </div>
    </div>
  );
}

export default OrderSuccess;