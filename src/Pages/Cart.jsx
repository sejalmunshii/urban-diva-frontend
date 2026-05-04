import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Cart({ cart, removeFromCart, increaseQty, decreaseQty }) {
      const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const shipping = total >= 999 ? 0 : 99;


    return (
        <div className="cart-wrapper">

            {/* Header */}
            <div className="cart-header">
                <h2>My Cart</h2>
                <p>{cart.length} item{cart.length !== 1 ? "s" : ""} in your bag</p>
            </div>

            {cart.length === 0 ? (

                /* Empty Cart */
                <div className="empty-cart">
                    <div className="empty-icon">🛍️</div>
                    <h4>Your cart is empty</h4>
                    <p>Looks like you haven't added anything yet.</p>
                    <Link to="/">
                        <button className="shop-btn">Continue Shopping</button>
                    </Link>
                </div>

            ) : (

                <div className="cart-layout">

                    {/* Cart Items */}
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <div className="item-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="item-info">
                                    <div className="top-section">

                                        <div className="left">
                                            <h5>{item.title}</h5>
                                            <p>{item.desc}</p>
                                        </div>

                                        <div className="qty-box">
                                            <button
                                                className="qty-btn"
                                                onClick={() => decreaseQty(item._id)}
                                            >
                                                <AiOutlineMinus />
                                            </button>

                                            <span className="qty">{item.qty}</span>

                                            <button
                                                className="qty-btn"
                                                onClick={() => increaseQty(item._id)}
                                            >
                                                <AiOutlinePlus />
                                            </button>
                                        </div>

                                    </div>

                                    <div className="item-bottom">
                                        <span className="item-price">
                                            ₹ {item.price.toLocaleString()}
                                        </span>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h4>Order Summary</h4>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹ {total.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className={shipping === 0 ? "free" : ""}>
                                {shipping === 0 ? "Free" : `₹ ${shipping}`}
                            </span>
                        </div>
                        <div className="summary-row">
                            <span>Discount</span>
                            <span>— ₹ 0</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹ {(total + shipping).toLocaleString()}</span>
                        </div>

                        {/* Promo Code */}
                        <div className="promo-wrap">
                            <input type="text" placeholder="Promo code" />
                            <button>Apply</button>
                        </div>

                        <button className="checkout-btn"   onClick={() => navigate("/checkout")}>Proceed to Checkout</button>

                        {/* Trust Badges */}
                        <div className="trust-badges">
                            <div className="badge-item">🔒 Secure Payment</div>
                            <div className="badge-item">🚚 Free Shipping</div>
                            <div className="badge-item">↩️ Easy Returns</div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Cart;