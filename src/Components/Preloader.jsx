import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Product.css";

function Product({ item, addToCart, toggleWishlist, wishlist }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // ✅ add kiya
  const isWishlisted = wishlist.some((x) => x._id === item._id);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = () => {
    if (!user) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    addToCart({ ...item, qty: 1 });
  };

  const handleWishlist = () => {
    if (!user) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    toggleWishlist(item);
  };

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="product-card" style={{ position: "relative" }}> {/* ✅ relative */}

        {/* Login Popup */}
        {showPopup && (
          <div className="login-popup">
            <p>Please login first! 🌸</p>
            <div className="popup-btns">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Register</button>
            </div>
          </div>
        )}

        <div className="img-wrap">
          <img src={item.img} alt={item.title} onClick={() => navigate(`/product/${item._id}`)} />
          {item.badge && (
            <span className={`badge-tag ${item.badge === "Sale" ? "sale" : ""}`}>
              {item.badge}
            </span>
          )}
          <button className="wishlist-btn" onClick={handleWishlist}>
            {isWishlisted ? <AiFillHeart className="red-heart" /> : <AiOutlineHeart />}
          </button>
        </div>

        <div className="card-body">
          <h5 onClick={() => navigate(`/product/${item._id}`)}>{item.title}</h5>
          <p className="card-desc">{item.desc}</p>
          <div className="card-bottom">
            <span className="price">₹ {item.price.toLocaleString()}</span>
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Product;