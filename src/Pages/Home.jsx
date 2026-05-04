import { useState, useEffect } from "react";
import Product from "../Components/Product";
import "./Home.css";
import { Link } from "react-router-dom";
import API from "../api";

function Home({ addToCart, toggleWishlist, wishlist }) {
  const [search, setSearch] = useState("");
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

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-wrapper">

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <p className="hero-tag">New Collection 2025</p>
          <h1>Style That<br />Speaks <em>You</em></h1>
          <p className="hero-sub">Curated fashion for the modern woman.<br />Elegant. Bold. Effortlessly you.</p>
          <Link to="/collections"><button className="hero-btn">Shop Now</button></Link>
        </div>
        <div className="hero-img-wrap">
          <img src="/img/home.jpg" alt="hero" className="hero-img" />
        </div>
      </div>

      {/* Marquee Bar */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span>Free Shipping Above ₹999</span>
              <span>New Collection 2025</span>
              <span>Easy Returns</span>
              <span>Exclusive Deals</span>
              <span>Trending Styles</span>
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="section-wrap">
        <div className="sec-head">
          <h2>Shop by Category</h2>
          <span className="sec-line"></span>
          <Link to="/collections"><span className="sec-view">View All →</span></Link>
        </div>
        <div className="cat-grid">
          {[
            { label: "Dresses", sub: "42 styles", img: "https://img105.savana.com/v1/goods-pic/4d732227e82046b2a10960da3777a3c0_w540_q85.webp" },
            { label: "Tops", sub: "38 styles", img: "https://img105.savana.com/v1/goods-pic/c747fedd548f430a8de54ae9ca1f0912_w540_q85.webp" },
            { label: "Co-ords", sub: "24 styles", img: "https://img105.savana.com/v1/goods-pic/09dfb0c5bd834f7e9af62e173f2f8ff3_w540.webp" },
            { label: "Bottoms", sub: "31 styles", img: "https://img105.savana.com/v1/goods-pic/5746c2434192426d9542fa0dcb5fa2c2_w540.webp" },
            
          ].map((cat) => (
            <Link to="/collections" key={cat.label} className="cat-card">
              <img src={cat.img} alt={cat.label} />
              <div className="cat-overlay">
                <div>
                  <div className="cat-label">{cat.label}</div>
                  <div className="cat-sub">{cat.sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-text">
          <p>Limited Time Offer</p>
          <h2>Summer Sale<br /><em>Is Here!</em></h2>
          <span>Shop the hottest styles of the season</span>
        </div>
        <div className="promo-right">
          <div className="promo-discount">50%<small>OFF</small></div>
          <Link to="/collections">
            <button className="promo-btn">Shop the Sale</button>
          </Link>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-section">
        {[
          { icon: "🚚", title: "Free Shipping", sub: "On orders above ₹999" },
          { icon: "↩️", title: "Easy Returns", sub: "7-day return policy" },
          { icon: "🔒", title: "Secure Payment", sub: "100% safe & encrypted" },
          { icon: "💬", title: "24/7 Support", sub: "Always here to help" },
        ].map((b) => (
          <div className="trust-item" key={b.title}>
            <div className="trust-icon">{b.icon}</div>
            <div className="trust-text">
              <h6>{b.title}</h6>
              <p>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New Arrivals */}
      <div className="section-wrap" id="new-arrivals">
        <div className="sec-head">
          <h2>New Arrivals</h2>
          <span className="sec-line"></span>
          <span className="sec-view">View All →</span>
        </div>

        <div className="search-wrap">
          <div className="search-inner">
            <input
              type="text"
              placeholder="Search for dresses, tops, sets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="loading-wrap">
            <div className="loading-dots">
              <div className="dot" /><div className="dot" /><div className="dot" />
            </div>
          </div>
        ) : (
          <div className="row px-2 mt-3">
            {filtered.map((item) => (
              <Product
                key={item._id}
                item={item}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            ))}
          </div>
        )}
      </div>

      {/* Instagram Grid */}
      <div className="section-wrap" style={{ paddingBottom: "50px" }}>
        <div className="sec-head" style={{ marginTop: "40px" }}>
          <h2>Shop Our Instagram</h2>
          <span className="sec-line"></span>
          <span className="sec-view">@urbandiva</span>
        </div>
        <div className="insta-grid">
          {[
            "https://img105.savana.com/v1/goods-pic/89ac5279058e4f9a969f9cbdcf25f436_w540.webp",
            "https://img105.savana.com/v1/goods-pic/dc49813de29b4646b1bbc320dbb2fbf0_w540_q85.webp",
            "https://img105.savana.com/v1/goods-pic/491b5569fd544853a9c83e5d09e49db5_w540_q85.webp",
            "https://img105.savana.com/v1/goods-pic/86ee0cee7d984ea4b57030aae4c7b8e8_w540.webp",
            "https://img105.savana.com/v1/goods-pic/33bf7ea67c0e46ae8ac923e33b3fe08f_w540_q85.webp",
          ].map((img, i) => (
            <div className="insta-item" key={i}>
              <img src={img} alt="instagram" />
              <div className="insta-overlay"><span>♡</span></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;