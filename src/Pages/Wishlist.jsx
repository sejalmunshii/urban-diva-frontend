import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./Wishlist.css";

function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        <p>{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wish">
          <div className="empty-icon">🤍</div>
          <h4>Your wishlist is empty</h4>
          <p>Save your favourite pieces here.</p>
          <Link to="/collections"><button className="shop-btn">Explore Collections</button></Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="w-card" key={item._id}>
              <div className="w-img">
                <img src={item.img} alt={item.title} />
                <button className="remove-x" onClick={() => toggleWishlist(item)}>
                  <AiOutlineClose />
                </button>
              </div>
              <div className="w-info">
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
                <div className="w-price">₹ {item.price.toLocaleString()}</div>
                <button className="move-btn" onClick={() => { addToCart({ ...item, qty: 1 }); toggleWishlist(item); }}>
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;