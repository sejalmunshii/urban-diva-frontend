  import { useEffect, useState } from "react";
  import Product from "../Components/Product";
  import { AiOutlineSearch } from "react-icons/ai";
  import "./Collections.css";
import API from "../api";

  function Collections({ addToCart, toggleWishlist, wishlist}) {
    const [price, setPrice] = useState(3000);
      const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

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
 
    const filtered = products.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || item.category === category) &&
       item.price <= Number(price)
      );
    });
    return (
      <div className="collections-wrapper">

        {/* Page Header */}
        <div className="collections-header">
          <h1>Collections</h1>
          <p>Discover our curated women's fashion</p>
        </div>

        <div className="collections-layout">

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-title">Filters</div>

            <div className="filter-group">
              <h6>Category</h6>
              {[
                { label: "All Items", value: "" },
                { label: "Dresses", value: "dress" },
                { label: "Tops & Blouses", value: "tops" },
                { label: "Co-ord Sets", value: "coords" },
                { label: "Bottoms", value: "bottoms" },
                { label: "Ethnic Wear", value: "ethnic" },
              ].map((cat) => (
                <div className={`filter-option ${category === cat.value ? "active" : ""}`} key={cat.value}>
                  <input
                    type="radio"
                    name="cat"
                    id={cat.value || "all"}
                    checked={category === cat.value}
                    onChange={() => setCategory(cat.value)}
                  />
                  <label htmlFor={cat.value || "all"}>{cat.label}</label>
                </div>
              ))}
            </div>
            <div className="price-range-wrap">
              <div className="price-labels">
                <span>Price</span>
                <span className="price-value">₹0 — ₹{Number(price).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-minmax">
                <span>₹0</span>
                <span>₹3,000</span>
              </div>
            </div>

            <div className="filter-group">
              <h6>Size</h6>
              <div className="size-options">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <span className="size-btn" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="right-side">
            <div className="top-bar">
              <div className="search-inner">
                <AiOutlineSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search dresses, tops, sets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <span className="results-count">Showing {filtered.length} results</span>
            </div>

            <div className="row">
              {filtered.map((item) => (
                <Product key={item._id} item={item} addToCart={addToCart}  toggleWishlist={toggleWishlist}
        wishlist={wishlist} />
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  export default Collections;