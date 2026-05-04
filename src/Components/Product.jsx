import { useNavigate } from "react-router-dom";
import "./Product.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Product({ item, addToCart, toggleWishlist, wishlist }) {
    const navigate = useNavigate();
    const isWishlisted = wishlist.some((x) => x.id === item._id);
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="product-card">

        {/* Image */}
        <div className="img-wrap">
          <img src={item.img} alt={item.title}  onClick={() => navigate(`/product/${item._id}`)} />
          {item.badge && (
            <span className={`badge-tag ${item.badge === "Sale" ? "sale" : ""}`}>
              {item.badge}
            </span>
          )}
          <button className="wishlist-btn" onClick={() => toggleWishlist(item)}>{isWishlisted ? <AiFillHeart className="red-heart" /> : <AiOutlineHeart className="white-heart" />}</button>
        </div>

        {/* Info */}
        <div className="card-body">
          <h5  onClick={() => navigate(`/product/${item._id}`)}>{item.title}</h5>
          <p className="card-desc">{item.desc}</p>
          <div className="card-bottom">
            <span className="price">₹ {item.price.toLocaleString()}</span>
           <button className="add-btn" onClick={() => addToCart({ ...item, qty: 1 })}>
  Add to Cart
</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Product;