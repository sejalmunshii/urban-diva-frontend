import { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

function Checkout({ cart, addOrder, clearCart  }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const total = cart.reduce((sum, item) => sum + Number(item.price) * (item.qty || 1), 0);
  const shipping = total >= 999 ? 0 : 99;
  const [payMethod, setPayMethod] = useState("card");
  const [form, setForm] = useState({ name: "", email: "", phone: "", pincode: "", address: "", city: "", state: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const placeOrder = async () => {
  if (!validate()) return;

  const newOrder = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    city: form.city,
    state: form.state,
    pincode: form.pincode,
    items: cart.map(item => ({
      productId: item._id,
      title: item.title,
      price: item.price,
      qty: item.qty || 1,
      img: item.img
    })),
    total: total + shipping
  };

 try {
    const { data } = await API.post("/orders", newOrder);
    addOrder(data);
    clearCart();
    navigate(`/success/${data._id}`);
    toast.success("Order Placed Successfully!", {
      className: "ud-toast",
      progressClassName: "ud-toast-progress",
      icon: "🎀",
    });
  } catch (error) {
    console.log("Order failed:", error);
    toast.error("Order failed!");
  }
};
  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.includes("@"))
      newErrors.email = "Valid email required";

    if (form.phone.length !== 10)
      newErrors.phone = "Phone must be 10 digits";

    if (form.pincode.length !== 6)
      newErrors.pincode = "Pincode must be 6 digits";

    if (!form.address.trim())
      newErrors.address = "Address required";

    if (!form.city.trim())
      newErrors.city = "City required";

    if (!form.state.trim())
      newErrors.state = "State required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Complete your order</p>
      </div>

      <div className="checkout-layout">

        {/* Left */}
        <div>
          {/* Shipping */}
          {/* Shipping */}
          <div className="section-card">
            <h4>Shipping Details</h4>

            <div className="input-group">
              <label className="ud-label">Full Name</label>
              <input className="ud-input" name="name" placeholder="e.g. Priya Sharma" onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label className="ud-label">Email Address</label>
              <input className="ud-input" name="email" placeholder="e.g. priya@gmail.com" onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="ud-label">Phone Number</label>
                <input className="ud-input" name="phone" placeholder="10-digit number" onChange={handleChange} />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="input-group">
                <label className="ud-label">Pincode</label>
                <input className="ud-input" name="pincode" placeholder="6-digit pincode" onChange={handleChange} />
                {errors.pincode && <p className="error">{errors.pincode}</p>}
              </div>
            </div>

            <div className="input-group">
              <label className="ud-label">Full Address</label>
              <input className="ud-input" name="address" placeholder="House no, Street, Area" onChange={handleChange} />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="ud-label">City</label>
                <input className="ud-input" name="city" placeholder="e.g. Mumbai" onChange={handleChange} />
                {errors.city && <p className="error">{errors.city}</p>}
              </div>
              <div className="input-group">
                <label className="ud-label">State</label>
                <input className="ud-input" name="state" placeholder="e.g. Maharashtra" onChange={handleChange} />
                {errors.state && <p className="error">{errors.state}</p>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="section-card" style={{ marginTop: "20px" }}>
            <h4>Payment Method</h4>
            <div className="pay-options">
              {[{ key: "card", label: "💳 Card" }, { key: "upi", label: "📱 UPI" }, { key: "cod", label: "💵 COD" }].map((p) => (
                <div key={p.key} className={`pay-opt ${payMethod === p.key ? "active" : ""}`} onClick={() => setPayMethod(p.key)}>
                  {p.label}
                </div>
              ))}
            </div>

            {payMethod === "card" && (
              <>
                <div className="input-group">
                  <label className="ud-label">Card Number</label>
                  <input className="ud-input" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label className="ud-label">Expiry Date</label>
                    <input className="ud-input" placeholder="MM / YY" />
                  </div>
                  <div className="input-group">
                    <label className="ud-label">CVV</label>
                    <input className="ud-input" placeholder="•••" />
                  </div>
                </div>
              </>
            )}

            {payMethod === "upi" && (
              <div className="input-group">
                <label className="ud-label">UPI ID</label>
                <input className="ud-input" placeholder="e.g. priya@upi" />
              </div>
            )}

            {payMethod === "cod" && (
              <p className="cod-note">Cash on Delivery available. Extra ₹30 handling fee may apply.</p>
            )}
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="section-card order-sticky">
          <h4>Order Summary</h4>
          {cart.length === 0
            ? <p style={{ color: "#a07878", fontSize: "13px" }}>No items in cart.</p>
            : cart.map((item) => (
              <div className="order-item" key={item._id}>
                <span>{item.title} × {item.qty || 1}</span>
                <span>₹ {(Number(item.price) * (item.qty || 1)).toLocaleString()}</span>
              </div>
            ))
          }
          <div className="sum-row"><span>Subtotal</span><span>₹ {total.toLocaleString()}</span></div>
          <div className="sum-row"><span>Shipping</span><span className={shipping === 0 ? "free" : ""}>{shipping === 0 ? "Free" : `₹ ${shipping}`}</span></div>
          <div className="sum-row total"><span>Total</span><span>₹ {(total + shipping).toLocaleString()}</span></div>
          <button className="place-btn" onClick={placeOrder}>Place Order</button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;