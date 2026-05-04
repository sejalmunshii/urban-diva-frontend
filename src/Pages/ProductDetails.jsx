import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductDetails.css";
import API from "../api";

function ProductDetails({ addToCart, toggleWishlist, wishlist = [] }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const { data } = await API.get("/products");
         setProducts(data);
       } catch (err) {
         console.error("Products load nahi hue:", err);
       } finally {
         setLoading(false);
       }
     };
     fetchProducts();
   }, []);
  const product = products.find((item) => item._id == id);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const isWishlisted = wishlist.some((i) => i._id === product?.id);

  if (!product) return <h2 style={{ padding: "40px", fontFamily: "Playfair Display" }}>Product not found</h2>;

  return (
    <div className="pd-wrapper">

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / <span>{product.title}</span>
      </div>

      <div className="pd-layout">

        {/* Image */}
        <div className="pd-img-wrap">
          <img src={product.img} alt={product.title} />
          {product.badge && <span className={`pd-badge ${product.badge === "Sale" ? "sale" : ""}`}>{product.badge}</span>}
        </div>

        {/* Info */}
        <div className="pd-info">
          <h1 className="pd-title">{product.title}</h1>
          <p className="pd-desc">{product.desc}. Crafted with premium quality fabric for all-day comfort and style. A must-have addition to your wardrobe.</p>
          <div className="pd-price">₹ {product.price.toLocaleString()}</div>

          <div className="pd-divider" />

          {/* Size */}
          <div className="pd-label">Select Size</div>
          <div className="size-btns">
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                className={`size-btn ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >{s}</button>
            ))}
          </div>

          {/* Qty */}
          <div className="pd-label">Quantity</div>
          <div className="qty-row">
            <div className="qty-ctrl">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <button className="btn-cart" onClick={() => addToCart({ ...product, qty, size: selectedSize })}>
              Add to Cart
            </button>
            <button className="btn-wish" onClick={() => toggleWishlist && toggleWishlist(product)}>
              {isWishlisted ? <AiFillHeart color="#c96c6c" /> : <AiOutlineHeart />}
            </button>
          </div>

          {/* Tags */}
          <div className="pd-tags">
            <span className="pd-tag">Free Shipping</span>
            <span className="pd-tag">Easy Returns</span>
            <span className="pd-tag">Premium Fabric</span>
            <span className="pd-tag">Summer Collection</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;